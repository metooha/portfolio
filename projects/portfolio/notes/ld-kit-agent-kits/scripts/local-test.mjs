#!/usr/bin/env node

/**
 * Local testing for ld-kit. One disposable kit instance, two loops around it:
 *
 *   OUTER (fidelity): npm run test:local
 *     `npm pack` the exact tarball CI publishes → run the real
 *     living-design-lite skill scaffold.sh (npx installs the tarball) into a
 *     simulated "parent" folder → assert the agent-context routing contract.
 *
 *   INNER (iteration): npm run test:local:dev
 *     watch:portable + the instance's Vite dev server. Edits to
 *     src/components / src/context/*.mdc live-sync into the SAME scaffolded
 *     instance (build-portable/build-context/extract-guidelines target it
 *     directly — see scripts/sandbox-instance.mjs).
 *
 *   RESET: npm run test:local:reset
 *     Wipe agent-authored files from the instance (preserving node_modules)
 *     and restore the pristine template — a ~2s clean slate between
 *     agent experiments, no npx / npm install required.
 *
 * The harness instance lives at .sandbox/e2e/instance/demo-app (open
 * `demo-app/` in a tool to test agent behavior inside the kit; fixture
 * prompts are in demo-app/prompts/). For the full interactive flow, open the
 * ALWAYS-EMPTY .sandbox/e2e/playground/ as the tool root — it mirrors a real
 * user's folder (no pre-existing app) — and invoke the skill from there.
 *
 * Flags (e2e): --skip-pack  reuse the newest tarball in .sandbox/e2e
 *              --dev        boot `npm run dev` after asserting and curl it
 *
 * Env: LD_SKILL_DIR — path to the living-design-lite skill dir (defaults to
 *      searching ~/.claude, ~/.wibey, ~/.cursor, ~/.copilot, ~/.code_puppy,
 *      then the sibling ai-registry-marketplace checkout).
 */
import {createHash} from 'node:crypto';
import {
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  mkdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import fs from 'node:fs/promises';
import {spawn, spawnSync} from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {SANDBOX_INSTANCE_REL} from './sandbox-instance.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');
const TEMPLATE_DIR = path.join(ROOT, 'living-design');
const E2E_DIR = path.join(ROOT, '.sandbox', 'e2e');
// Harness-owned instance (asserted by e2e, served by dev, restored by reset).
// Derived from the shared constant so the build scripts' live-sync target and
// this harness can never drift apart.
const PROJECT_DIR = path.join(ROOT, SANDBOX_INSTANCE_REL);
const PARENT_DIR = path.dirname(PROJECT_DIR);
const PROJECT_NAME = path.basename(PROJECT_DIR);
// Always-empty folder for interactive testing: open it in wibey / code puppy /
// Claude Code and invoke the skill — exactly what a real user's folder looks
// like (no pre-existing app for the agent to latch onto).
const PLAYGROUND_DIR = path.join(E2E_DIR, 'playground');

const log = (msg) => console.log(`[local-test] ${msg}`);
const fail = (msg) => {
  console.error(`[local-test] FAIL: ${msg}`);
  process.exit(1);
};

// e2e and reset rewrite the shared instance — two concurrent runs corrupt
// each other (half-scaffolded trees, vanishing node_modules). Fail fast.
const LOCK_FILE = path.join(E2E_DIR, '.lock');
function acquireLock() {
  mkdirSync(E2E_DIR, {recursive: true});
  if (existsSync(LOCK_FILE)) {
    const pid = Number(readFileSync(LOCK_FILE, 'utf8'));
    let alive = false;
    try {
      process.kill(pid, 0);
      alive = true;
    } catch {
      /* stale lock */
    }
    if (alive) {
      fail(
        `another test:local run is active (pid ${pid}) — both runs share one instance; wait for it to finish or kill it`
      );
    }
    rmSync(LOCK_FILE, {force: true});
  }
  writeFileSync(LOCK_FILE, String(process.pid));
  process.on('exit', () => {
    try {
      rmSync(LOCK_FILE, {force: true});
    } catch {
      /* best effort */
    }
  });
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {stdio: 'inherit', ...opts});
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited ${code}`))
    );
  });
}

// ---------------------------------------------------------------------------
// Tarball
// ---------------------------------------------------------------------------
function findNewestTarball() {
  if (!existsSync(E2E_DIR)) return null;
  const tgz = readdirSync(E2E_DIR)
    .filter((f) => f.endsWith('.tgz'))
    .map((f) => path.join(E2E_DIR, f))
    .sort((a, b) => statSync(a).mtimeMs - statSync(b).mtimeMs);
  return tgz.at(-1) ?? null;
}

function pack() {
  mkdirSync(E2E_DIR, {recursive: true});
  log('npm pack (runs prepack: build:portable + build:cli) — takes a minute or two …');
  const res = spawnSync('npm', ['pack', '--pack-destination', E2E_DIR], {
    cwd: ROOT,
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  if (res.status !== 0) fail('npm pack failed');
  const tarball = findNewestTarball();
  if (!tarball) fail(`npm pack produced no .tgz in ${E2E_DIR}`);
  return tarball;
}

// ---------------------------------------------------------------------------
// Skill discovery (same search order as the skill's own SKILL.md)
// ---------------------------------------------------------------------------
function findSkillDir() {
  if (process.env.LD_SKILL_DIR) {
    if (!existsSync(path.join(process.env.LD_SKILL_DIR, 'scripts/scaffold.sh')))
      fail(`LD_SKILL_DIR has no scripts/scaffold.sh: ${process.env.LD_SKILL_DIR}`);
    return process.env.LD_SKILL_DIR;
  }
  const home = os.homedir();
  const candidates = [
    ...['.claude', '.wibey', '.cursor', '.copilot', '.code_puppy'].map((d) =>
      path.join(home, d, 'skills', 'living-design-lite')
    ),
    path.resolve(ROOT, '..', 'ai-registry-marketplace', 'design', 'living-design-lite'),
  ];
  const hit = candidates.find((d) => existsSync(path.join(d, 'scripts/scaffold.sh')));
  if (!hit)
    fail(
      'living-design-lite skill not found. Symlink it into ~/.claude/skills/ or set LD_SKILL_DIR.'
    );
  return hit;
}

// ---------------------------------------------------------------------------
// Scaffold via the real skill script (output streams live — npx + the
// in-project npm install take several minutes and would otherwise look hung)
// ---------------------------------------------------------------------------
function scaffold(skillDir, tarball) {
  rmSync(PARENT_DIR, {recursive: true, force: true});
  mkdirSync(PARENT_DIR, {recursive: true});

  // npx caches by name@version, not tarball content — key a dedicated npm
  // cache on the tarball hash so a repacked same-version tarball is never
  // served stale.
  const hash = createHash('sha256').update(readFileSync(tarball)).digest('hex').slice(0, 12);
  const cacheRoot = path.join(E2E_DIR, 'npm-cache');
  const npmCache = path.join(cacheRoot, hash);

  // Prune caches keyed to other tarball builds — each is only valid for one
  // build and they accumulate fast.
  if (existsSync(cacheRoot)) {
    for (const entry of readdirSync(cacheRoot)) {
      if (entry !== hash) rmSync(path.join(cacheRoot, entry), {recursive: true, force: true});
    }
  }

  const scaffoldSh = path.join(skillDir, 'scripts', 'scaffold.sh');
  log(`scaffolding via ${scaffoldSh}`);
  log(`LD_KIT_PACKAGE=${tarball}`);
  log('this takes a few minutes (npx installs the kit, then npm install in the project) …');

  return new Promise((resolve, reject) => {
    const child = spawn('bash', [scaffoldSh, PROJECT_NAME, PARENT_DIR], {
      cwd: PARENT_DIR,
      env: {
        ...process.env,
        LD_KIT_PACKAGE: tarball,
        npm_config_cache: npmCache,
        // The kit's dependency tree pulls in playwright; its postinstall
        // browser download is irrelevant to `init` and dominates runtime.
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: '1',
      },
    });
    let out = '';
    child.stdout.on('data', (d) => {
      out += d;
      process.stdout.write(d);
    });
    child.stderr.on('data', (d) => {
      out += d;
      process.stderr.write(d);
    });
    // npx prints nothing while it downloads/installs the kit package — keep
    // proof of life on screen so a quiet minute doesn't read as a hang.
    const started = Date.now();
    const heartbeat = setInterval(() => {
      const s = Math.round((Date.now() - started) / 1000);
      log(`still working — ${s}s elapsed (npx downloads quietly before any output appears)`);
    }, 30_000);
    child.on('error', (err) => {
      clearInterval(heartbeat);
      reject(err);
    });
    child.on('exit', (code) => {
      clearInterval(heartbeat);
      code === 0 ? resolve(out) : reject(new Error(`scaffold.sh exited ${code}`));
    });
  });
}

// ---------------------------------------------------------------------------
// Routing-contract assertions
// ---------------------------------------------------------------------------
function assertContract(output, tarballUsed) {
  const checks = [];
  const check = (name, ok) => {
    checks.push([name, ok]);
    console.log(`  ${ok ? '✓' : '✗'} ${name}`);
  };

  check('stdout contains the AI AGENT routing block', output.includes('AI AGENT — REQUIRED'));
  check(
    'stdout routing block carries the absolute AGENTS.md path',
    output.includes(path.join(PROJECT_DIR, 'AGENTS.md'))
  );
  check(
    'scaffold confirmed the requested package (Package: <tarball>)',
    output.includes(`Package:  ${tarballUsed}`)
  );

  const agentsPath = path.join(PROJECT_DIR, 'AGENTS.md');
  check('AGENTS.md exists in the project root', existsSync(agentsPath));
  const agents = existsSync(agentsPath) ? readFileSync(agentsPath, 'utf8') : '';
  check(
    'AGENTS.md is the slim router (parent-directory section present)',
    agents.includes('Reading This From a Parent Directory')
  );
  check('AGENTS.md routes to the 6 rule files', agents.includes('Required Reading'));

  // CLAUDE.md is rendered from the same template but with Claude-specific
  // variables (.claude/rules/ vs .cursor/rules/), so byte-equality with
  // AGENTS.md is not expected — assert it is the same slim router.
  const claudePath = path.join(PROJECT_DIR, '.claude', 'CLAUDE.md');
  check(
    '.claude/CLAUDE.md is the slim router',
    existsSync(claudePath) &&
      readFileSync(claudePath, 'utf8').includes('Reading This From a Parent Directory')
  );

  for (const [tool, dir] of [
    ['visible tool-agnostic', 'rules'],
    ['Claude Code', '.claude/rules'],
    ['Cursor', '.cursor/rules'],
    ['Copilot', '.github/instructions'],
  ]) {
    const p = path.join(PROJECT_DIR, dir);
    const count = existsSync(p) ? readdirSync(p).length : 0;
    check(`${tool} rules present (${dir}: ${count} files)`, count >= 6);
  }

  check(
    'dependencies installed (node_modules present)',
    existsSync(path.join(PROJECT_DIR, 'node_modules'))
  );

  const failed = checks.filter(([, ok]) => !ok);
  if (failed.length) fail(`${failed.length} assertion(s) failed`);
}

// ---------------------------------------------------------------------------
// Optional dev-server smoke (e2e --dev)
// ---------------------------------------------------------------------------
async function devSmoke() {
  log('booting `npm run dev` for a smoke check …');
  const child = spawn('npm', ['run', 'dev'], {cwd: PROJECT_DIR, encoding: 'utf8'});
  let buf = '';
  const url = await new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), 60_000);
    child.stdout.on('data', (d) => {
      buf += d.toString();
      const m = buf.match(/Local:\s+(http:\/\/\S+)/);
      if (m) {
        clearTimeout(timer);
        resolve(m[1]);
      }
    });
  });
  if (!url) {
    child.kill('SIGTERM');
    fail(`dev server did not report a Local: URL within 60s\n${buf}`);
  }
  const ok = await fetch(url).then((r) => r.ok).catch(() => false);
  child.kill('SIGTERM');
  if (!ok) fail(`dev server at ${url} did not return 200`);
  log(`✓ dev server responded at ${url}`);
}

// ---------------------------------------------------------------------------
// Fixture prompts (agent-driven a11y / rule experiments)
// ---------------------------------------------------------------------------
const PROMPTS = {
  'a11y-cart-page.md': `# Fixture prompt — Cart page

Build \`src/pages/CartPage.tsx\` with:
- An **order summary** section listing 3 line items (image + name + price + quantity stepper).
- A **delivery address** form (email, phone, delivery notes textarea).
- A **promo** banner at the top using LD Banner.
- A primary **Checkout** button at the bottom.

Wire the header with \`useHeaderCartBindings\`. Wire each line item with \`useStoreConnectedItemBindings\`.

Render it from \`src/App.tsx\` in place of the placeholder.

## What this prompt exercises
- \`<Page title="Cart">\` wraps the whole thing (single h1, skip link, main landmark).
- Section headings start at h2 and step by one.
- Every \`<Image>\` has a meaningful \`alt\` (product name, not "product image").
- Every icon-only control (remove from cart, edit address, …) is an \`IconButton\` with \`a11yLabel\`.
- Email / phone / notes use \`TextField\` + \`TextArea\`, with \`error\` and \`helperText\` wired through props — no sibling error divs.

## How to verify
1. \`npm run test:local:dev\` (from the ld-kit repo root).
2. Open http://localhost:3099 and navigate to the cart view.
3. Confirm the Vite overlay does NOT throw any \`LD a11y:\` or \`A11Y:\` errors.
4. Tab through the page: focus order is sensible, focus is always visible.
5. Submit the form with an invalid email and confirm the error is tied to the field (screen reader would announce it).
`,

  'a11y-pdp-page.md': `# Fixture prompt — Product detail page (PDP)

Build \`src/pages/ProductDetailPage.tsx\` with:
- An **image gallery** on the left (main image + 3 thumbnails), constrained to \`maxWidth: 500px\`.
- A **product info** panel on the right: product name as \`<h2>\`, price, rating, heart control, and ONE add-to-cart control.
- A **"You may also like"** Store-connected carousel below using \`CarouselProductCard\`.

Use \`useStoreConnectedItemBindings\` for the main product AND every carousel item. Use \`product.cartQty === 0\` to conditionally swap between "Add to cart" Button and QuantityStepper.

Render it from \`src/App.tsx\` in place of the placeholder.

## What this prompt exercises
- \`<Page title={productName} titleVisuallyHidden>\` — the visible product heading is an h2 under the hidden page h1.
- Gallery images have meaningful \`alt\` text (or justified \`unsafeDecorative\`).
- Only ONE add-to-cart control per product.
- Store bindings — no local \`useState\` for cart qty or heart state.
- Carousel uses LD components (built-in keyboard support).

## How to verify
1. \`npm run test:local:dev\` (from the ld-kit repo root).
2. Open http://localhost:3099.
3. Confirm NO \`LD a11y:\` errors in the Vite overlay.
4. Click heart on the main product, then on a card in "You may also like" with the same SKU. Both should stay in sync.
5. Tab to the carousel: arrow keys move between items; Esc does nothing destructive.
`,

  'a11y-search-filters.md': `# Fixture prompt — Search results with filters

Build \`src/pages/SearchPage.tsx\` with:
- A \`SearchBar\` at the top (value/onChange wired to a piece of local state or \`useSharedSearchQuery\`).
- A row of filter \`Chip\`s (Category, Price, Brand — each toggleable).
- A \`ProductCardGrid\` result grid inside \`Grid\` / \`GridColumn\`.
- When the filter selection changes, call \`useAnnounce().polite(\\\`\${n} results for "\${query}"\\\`)\` so screen readers hear the update.

Render it from \`src/App.tsx\` in place of the placeholder.

## What this prompt exercises
- Dynamic-content announcement via \`useAnnounce()\`.
- Heading hierarchy (\`<Page title="Search">\` + h2 for the result section).
- \`Chip\` usage with proper selected state (no color-only signaling — rely on the Chip's built-in selected styling + label).
- Grid with required \`hasGutter\` + all three breakpoints set on each \`GridColumn\`.
- Icons inside chips are \`decorative\` (label already conveys the meaning).

## How to verify
1. \`npm run test:local:dev\` (from the ld-kit repo root).
2. Toggle a filter — the visible result count should change AND a screen reader (VoiceOver / NVDA) should hear "N results for X".
3. Confirm NO \`LD a11y:\` errors in the Vite overlay.
4. Tab through the filter chips: each is focusable, Space/Enter toggles selection.
`,

  'README.md': `# Fixture prompts

Paste one of these into wibey / Claude Code / Cursor / Copilot after opening the
scaffolded instance (\`.sandbox/e2e/instance/demo-app/\`). For the full scaffold
flow (wrong-root scenario included), open the always-empty
\`.sandbox/e2e/playground/\` instead and invoke the skill like a real user.
These prompts are reproducible exercises for whether the kit's rules (a11y
directive + the runtime scanner) actually steer an agent toward accessible code.

## Workflow

1. \`npm run test:local\` (from the ld-kit repo root) — scaffolds this instance.
2. \`npm run test:local:dev\` — live-syncs src/components + src/context edits into
   the instance and serves it at http://localhost:3099.
3. Open the instance in your tool and paste a prompt from this folder.
4. After the agent writes files, check http://localhost:3099 — runtime a11y
   violations surface as \`LD a11y:\` / \`A11Y:\` errors in the Vite overlay.
5. To start clean: \`npm run test:local:reset\` (fast — keeps node_modules).

## When tweaking \`src/context/*.mdc\` (the canonical rule files)

Re-run a fixture prompt after each rule change and compare:
- Does the agent's output now respect the new rule?
- If not, does the runtime scanner catch what slipped through?
- Any false positives from the scanner on correct code?
`,
};

async function writePrompts() {
  const promptsDir = path.join(PROJECT_DIR, 'prompts');
  await fs.mkdir(promptsDir, {recursive: true});
  for (const [filename, contents] of Object.entries(PROMPTS)) {
    await fs.writeFile(path.join(promptsDir, filename), contents, 'utf-8');
  }
  log(`wrote ${Object.keys(PROMPTS).length} fixture prompts to ${path.relative(ROOT, promptsDir)}/`);
}

// ---------------------------------------------------------------------------
// Subcommand: e2e (default)
// ---------------------------------------------------------------------------
async function e2e({skipPack, runDev}) {
  acquireLock();
  const tarball = skipPack ? findNewestTarball() ?? pack() : pack();
  log(`tarball: ${path.relative(ROOT, tarball)}`);
  const skillDir = findSkillDir();
  log(`skill:   ${skillDir}`);
  const output = await scaffold(skillDir, tarball);
  log('asserting agent-context routing contract:');
  assertContract(output, tarball);
  await writePrompts();
  // Empty playground for interactive testing — a real user's folder has no
  // pre-existing app, so neither should this one.
  rmSync(PLAYGROUND_DIR, {recursive: true, force: true});
  mkdirSync(PLAYGROUND_DIR, {recursive: true});
  if (runDev) await devSmoke();

  log('');
  log('PASS — full local pipeline verified.');
  log(`Instance: ${path.relative(ROOT, PROJECT_DIR)}  (fixture prompts in ./prompts/)`);
  log(`- Inner loop:  npm run test:local:dev   (live-sync + Vite at :3099)`);
  log(`- Interactive full-flow test: open the EMPTY ${path.relative(ROOT, PLAYGROUND_DIR)}/ as the`);
  log(`  tool root after exporting LD_KIT_PACKAGE=${tarball}`);
  log('  then invoke the skill like a real user — it scaffolds fresh into that folder.');
}

// ---------------------------------------------------------------------------
// Subcommand: dev — watch:portable + instance Vite server
// ---------------------------------------------------------------------------
async function dev() {
  if (!existsSync(path.join(PROJECT_DIR, 'package.json'))) {
    fail('no scaffolded instance — run `npm run test:local` first');
  }

  // One-shot build first so the instance has up-to-date output before Vite boots.
  log('running build-portable once to hydrate the instance');
  await run('node', ['scripts/build-portable.mjs'], {cwd: ROOT});

  log('launching watch:portable + instance Vite dev server');
  const processes = [
    {
      name: 'watch:portable',
      child: spawn('node', ['scripts/watch-portable.mjs'], {cwd: ROOT, stdio: 'inherit'}),
    },
    {
      name: 'instance-vite',
      child: spawn('npm', ['run', 'dev'], {cwd: PROJECT_DIR, stdio: 'inherit'}),
    },
  ];

  const shutdown = (signal) => {
    log(`received ${signal} — shutting down`);
    for (const {child} of processes) {
      if (!child.killed) child.kill(signal);
    }
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  await Promise.race(
    processes.map(
      ({name, child}) =>
        new Promise((resolve) => {
          child.on('exit', (code) => {
            log(`${name} exited with code ${code ?? 'unknown'}`);
            resolve();
          });
        })
    )
  );
  shutdown('SIGTERM');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Subcommand: reset — fast clean slate, preserving node_modules
// ---------------------------------------------------------------------------
const RESET_PRESERVE = new Set(['node_modules', 'package-lock.json']);

async function reset() {
  acquireLock();
  if (!existsSync(PROJECT_DIR)) {
    fail('no scaffolded instance to reset — run `npm run test:local` first');
  }
  log(`wiping instance (preserving: ${[...RESET_PRESERVE].join(', ')})`);
  for (const entry of await fs.readdir(PROJECT_DIR)) {
    if (RESET_PRESERVE.has(entry)) continue;
    await fs.rm(path.join(PROJECT_DIR, entry), {recursive: true, force: true});
  }
  // `init` copies living-design/ verbatim, so restoring from the template
  // reproduces a pristine instance without npx or npm install.
  log(`restoring template from ${path.relative(ROOT, TEMPLATE_DIR)}`);
  await fs.cp(TEMPLATE_DIR, PROJECT_DIR, {
    recursive: true,
    force: true,
    filter: (src) => {
      const rel = path.relative(TEMPLATE_DIR, src);
      return !rel.startsWith('node_modules') && !rel.startsWith('dist');
    },
  });
  await writePrompts();
  log('instance reset — pristine template, deps preserved.');
}

// ---------------------------------------------------------------------------
async function main() {
  const argv = process.argv.slice(2);
  const flags = new Set(argv.filter((a) => a.startsWith('--')));
  const subcommand = argv.find((a) => !a.startsWith('--')) ?? 'e2e';

  switch (subcommand) {
    case 'e2e':
      await e2e({skipPack: flags.has('--skip-pack'), runDev: flags.has('--dev')});
      return;
    case 'dev':
      await dev();
      return;
    case 'reset':
      await reset();
      return;
    default:
      console.error('Usage: node scripts/local-test.mjs [e2e|dev|reset] [--skip-pack] [--dev]');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
