#!/usr/bin/env node
/**
 * Interactive launcher CLI with arrow-key selectable menus.
 *
 * Reads .vscode/launch.json, discovers project folders, and presents
 * dropdown-style selections for every choice. Resolves ${input:...}
 * variables automatically by scanning the filesystem instead of
 * asking for raw text input.
 *
 * Usage:  npm run launch
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { resolve, dirname, join, basename } from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import prompts from "prompts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MAKE_SYNC = join(ROOT, "make-sync");

function abort() {
  console.log("\nAborted.");
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------

/** Syncable project folders inside make-sync/ (excludes src/, node_modules). */
function discoverSyncDirs() {
  const skip = new Set(["src", "node_modules", ".git"]);
  return readdirSync(MAKE_SYNC)
    .filter((name) => {
      if (skip.has(name) || name.startsWith(".")) return false;
      try {
        return statSync(join(MAKE_SYNC, name)).isDirectory();
      } catch {
        return false;
      }
    })
    .sort();
}

// ---------------------------------------------------------------------------
// launch.json helpers
// ---------------------------------------------------------------------------

function readLaunchJson() {
  return JSON.parse(readFileSync(join(ROOT, ".vscode", "launch.json"), "utf8"));
}

function collectInputRefs(obj) {
  const refs = new Set();
  const str = JSON.stringify(obj);
  let m;
  const re = /\$\{input:(\w+)\}/g;
  while ((m = re.exec(str)) !== null) refs.add(m[1]);
  return refs;
}

/**
 * For each ${input:id} in the config, present a select dropdown
 * instead of a raw text prompt. If the input is "syncDir", auto-discover
 * folders. Otherwise fall back to a text field.
 */
async function resolveInputs(config, inputDefs) {
  const values = {};
  for (const id of collectInputRefs(config)) {
    const def = inputDefs?.find((i) => i.id === id);

    if (id === "syncDir") {
      const dirs = discoverSyncDirs();
      if (dirs.length === 0) {
        console.error("No syncable folders found in make-sync/");
        process.exit(1);
      }
      const { value } = await prompts(
        {
          type: "select",
          name: "value",
          message: "Project folder",
          choices: dirs.map((d) => ({ title: d, value: d })),
          initial: dirs.indexOf(def?.default || "") >= 0
            ? dirs.indexOf(def.default)
            : 0,
        },
        { onCancel: abort }
      );
      values[id] = value;
    } else {
      const { value } = await prompts(
        {
          type: "text",
          name: "value",
          message: def?.description || id,
          initial: def?.default || "",
        },
        { onCancel: abort }
      );
      values[id] = value;
    }
  }
  return values;
}

function sub(value, inputValues) {
  return value
    .replace(/\$\{workspaceFolder\}/g, ROOT)
    .replace(/\$\{input:(\w+)\}/g, (_, id) => inputValues[id] || "");
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

async function runConfig(config, inputDefs) {
  const inputValues = await resolveInputs(config, inputDefs);

  const cwd = config.cwd ? sub(config.cwd, inputValues) : ROOT;
  const extraArgs = (config.args || []).map((a) => sub(a, inputValues));

  let cmd, args;
  if (config.runtimeExecutable) {
    cmd = sub(config.runtimeExecutable, inputValues);
    args = extraArgs;
  } else if (config.program) {
    cmd = "node";
    args = [sub(config.program, inputValues), ...extraArgs];
  } else {
    console.error("Cannot determine how to run this configuration.");
    process.exit(1);
  }

  console.log(`\n> ${cmd} ${args.join(" ")}`);
  console.log(`  cwd: ${cwd}\n`);

  const child = spawn(cmd, args, { cwd, stdio: "inherit", shell: false });
  child.on("exit", (code) => process.exit(code || 0));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const launch = readLaunchJson();
  const configs = (launch.configurations || []).filter(
    (c) => c.name !== "Launch CLI (interactive menu)"
  );

  if (configs.length === 0) {
    console.error("No launch configurations found.");
    process.exit(1);
  }

  const { configIdx } = await prompts(
    {
      type: "select",
      name: "configIdx",
      message: "What do you want to run?",
      choices: configs.map((c, i) => ({ title: c.name, value: i })),
    },
    { onCancel: abort }
  );

  const selected = configs[configIdx];
  console.log(`\n  ${selected.name}`);

  await runConfig(selected, launch.inputs);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
