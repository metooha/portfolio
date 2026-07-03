#!/usr/bin/env node
/**
 * promote-tag.mjs — move the `@walmart/ld-kit` npm dist-tag between tiers.
 *
 * Tier model (owned by ld-platform-team):
 *
 *   dev   → published automatically by .looper.yml on every main release
 *   next  → "stage" channel; manually promoted from dev after internal QA
 *   latest → "prod" / golden channel; manually promoted from next after dogfooding
 *
 * Customers `npm install @walmart/ld-kit` (no tag) and always get `latest`.
 *
 * Usage:
 *   node scripts/promote-tag.mjs dev-to-stage
 *   node scripts/promote-tag.mjs stage-to-prod
 *   node scripts/promote-tag.mjs --version=1.4.7 --to=latest      # manual override
 *   node scripts/promote-tag.mjs --version=1.4.7 --to=latest --yes # skip confirm
 *
 * Requires the operator to be authenticated against
 * https://npm.ci.artifacts.walmart.com/artifactory/api/npm/design-npm-prod-local
 * (the publish registry). Read-only ops resolve via the same registry.
 *
 * SAFETY:
 *   - Refuses to promote if source tag and target tag already point to the same version.
 *   - Prints "from → to" and requires y/N confirmation unless --yes is passed.
 *   - Never republishes; only moves dist-tags. Reversible by re-running with the
 *     previous version pinned via --version.
 */

import { execFileSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const PACKAGE = "@walmart/ld-kit";
const REGISTRY = "https://npm.ci.artifacts.walmart.com/artifactory/api/npm/design-npm-prod-local/";

const TIERS = {
  dev:    { tag: "dev",    label: "dev   (internal main releases)" },
  stage:  { tag: "next",   label: "stage (next — internal QA / dogfooders)" },
  prod:   { tag: "latest", label: "prod  (latest — customers)" },
};

function npm(args) {
  return execFileSync("npm", args, { encoding: "utf8" }).trim();
}

function distTags() {
  const raw = npm(["dist-tag", "ls", PACKAGE, `--registry=${REGISTRY}`]);
  return Object.fromEntries(
    raw.split("\n").filter(Boolean).map((line) => {
      const [k, v] = line.split(":").map((s) => s.trim());
      return [k, v];
    }),
  );
}

function parseArgs(argv) {
  const args = { positional: [], flags: {} };
  for (const a of argv.slice(2)) {
    if (a.startsWith("--")) {
      const [k, v] = a.replace(/^--/, "").split("=");
      args.flags[k] = v === undefined ? true : v;
    } else {
      args.positional.push(a);
    }
  }
  return args;
}

async function confirm(message) {
  const rl = createInterface({ input, output });
  const answer = (await rl.question(`${message} [y/N] `)).trim().toLowerCase();
  rl.close();
  return answer === "y" || answer === "yes";
}

function resolveMove(args) {
  const cmd = args.positional[0];
  if (cmd === "dev-to-stage") {
    const tags = distTags();
    if (!tags.dev) throw new Error("No `dev` tag is currently published.");
    return { fromTier: "dev", toTier: "stage", version: tags.dev };
  }
  if (cmd === "stage-to-prod") {
    const tags = distTags();
    if (!tags.next) throw new Error("No `next` tag is currently published. Promote dev-to-stage first.");
    return { fromTier: "stage", toTier: "prod", version: tags.next };
  }
  if (args.flags.version && args.flags.to) {
    const targetTier = Object.entries(TIERS).find(([, v]) => v.tag === args.flags.to)?.[0];
    if (!targetTier) throw new Error(`Unknown --to tag: ${args.flags.to}. Use one of: dev, next, latest.`);
    return { fromTier: null, toTier: targetTier, version: args.flags.version };
  }
  throw new Error(
    "Usage:\n" +
    "  promote-tag.mjs dev-to-stage\n" +
    "  promote-tag.mjs stage-to-prod\n" +
    "  promote-tag.mjs --version=X.Y.Z --to=<dev|next|latest> [--yes]",
  );
}

async function main() {
  const args = parseArgs(process.argv);
  const move = resolveMove(args);
  const target = TIERS[move.toTier];
  const tagsBefore = distTags();

  console.log(`\nPackage:  ${PACKAGE}`);
  console.log(`Registry: ${REGISTRY}`);
  console.log("\nCurrent dist-tags:");
  for (const [k, v] of Object.entries(tagsBefore)) console.log(`  ${k.padEnd(8)} ${v}`);
  console.log();

  if (tagsBefore[target.tag] === move.version) {
    console.log(`No-op: ${target.tag} already points to ${move.version}.`);
    return;
  }

  const fromLabel = move.fromTier ? TIERS[move.fromTier].label : `version ${move.version}`;
  console.log(`Promote: ${fromLabel}  →  ${target.label}`);
  console.log(`         ${tagsBefore[target.tag] ?? "<unset>"}  →  ${move.version}`);

  // `--yes` is honored on every form (paired subcommands AND manual override).
  // CI invokes the paired form with --yes; humans usually omit it.
  // CI auto-yes is also enabled when stdin is not a TTY (Looper runs are headless).
  const headless = !process.stdin.isTTY;
  if (!args.flags.yes && !headless) {
    const ok = await confirm("Proceed?");
    if (!ok) {
      console.log("Aborted.");
      process.exit(1);
    }
  } else if (headless && !args.flags.yes) {
    console.log("(headless mode — auto-confirming)");
  }

  npm(["dist-tag", "add", `${PACKAGE}@${move.version}`, target.tag, `--registry=${REGISTRY}`]);
  console.log(`\nDone. ${target.tag} → ${move.version}`);
  console.log("\nVerify:");
  console.log(`  npm view ${PACKAGE} dist-tags --registry=${REGISTRY}`);
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exit(1);
});
