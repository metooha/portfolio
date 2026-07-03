# Testing `@walmart/ld-kit` locally

How to test the **full pipeline** — skill → `scaffold.sh` → `npx ld-kit init` → scaffolded
project → agent context routing — without publishing anything to Artifactory.

Release-channel promotion (dev → next → latest) is a separate concern: see [PROMOTE.md](./PROMOTE.md).

## How the pipeline works in production

When a user prompts wibey / code puppy / Claude Code and the **living-design-lite** skill
triggers, this chain runs:

```
skill (SKILL.md)
  → scripts/scaffold.sh <project-name> [dest-dir]
    → npx --package="@walmart/ld-kit@latest" ld-kit init <project-name>
      → copies the bundled living-design/ template into <dest-dir>/<project-name>/
      → npm install inside the new project
      → prints the "AI AGENT — REQUIRED" routing block (stdout lands in the agent's context)
```

`@latest` is an npm **dist-tag**. Merging to main does NOT change what users get:
CI publishes every main merge to the `dev` tag; humans promote `dev → next → latest`
via LooperPro buttons ([PROMOTE.md](./PROMOTE.md)). Users always receive `latest`.

### The env knobs scaffold.sh understands

All of these are environment variables. The agent never sees them, and no prompt
wording changes them — they must be set **in the shell that launches the tool**.

| Variable | Controls | Default | Example |
|---|---|---|---|
| `LD_KIT_PACKAGE` | which package/version npx installs | `@walmart/ld-kit@latest` | a local tarball path, or `@walmart/ld-kit@dev` |
| `LD_KIT_ENV` | which design Artifactory repo serves the `@walmart` scope (`design-npm-<env>-local`) | `prod` | `LD_KIT_ENV=dev` |
| `LD_KIT_REGISTRY` | full `@walmart`-scope registry URL (trumps `LD_KIT_ENV`) | — | off-pattern repos |
| `LD_KIT_DEPS_REGISTRY` | registry for everything that is NOT the kit (its dependency tree) | `npme-npm` aggregator | rarely needed |

> Why two registries? `design-npm-*-local` is a **local** Artifactory repo that holds
> only `@walmart/ld-kit`. The kit's dependencies (`@livingdesign/react`, etc.) must
> resolve through the `npme-npm` aggregator. scaffold.sh routes the `@walmart` scope
> at the design repo and everything else at the aggregator.

## Recipe 1 — automated check, no agent (`npm run test:local`)

```bash
cd ld-kit
npm run test:local                  # pack → scaffold via the real skill script → assert
npm run test:local -- --skip-pack   # reuse the last tarball (fast iteration)
npm run test:local -- --dev         # also boot `npm run dev` and curl it
```

Heads-up: the scaffold step takes **a few minutes** (npx installs the kit, then
`npm install` runs inside the new project). Output streams live — if nothing has
printed for a long time, check your VPN/proxy, not the script.

What it does (`scripts/local-test.mjs`):

1. `npm pack` → builds the **exact tarball CI publishes** (prepack runs
   `build:portable` + `build:cli`, including rule generation) into `.sandbox/e2e/`.
2. Finds your installed **living-design-lite** skill (searches `~/.claude/skills/`,
   `~/.wibey/skills/`, `~/.code_puppy/skills/`, …; override with `LD_SKILL_DIR=<path>`).
3. Runs the skill's real `scaffold.sh` with `LD_KIT_PACKAGE=<tarball>` into a fresh
   `.sandbox/e2e/instance/` — the scaffold runs from the instance's parent dir,
   simulating a tool opened at the **parent** folder, not the project root.
   The scaffold output echoes `Package: <spec>` and the harness asserts it matches
   the tarball — proof the run used your local build, not the registry.
4. Asserts the agent-context routing contract:
   - stdout contains the `AI AGENT — REQUIRED` block with the absolute `AGENTS.md` path
   - `AGENTS.md` is the slim router (parent-directory section + Required Reading)
   - `.claude/CLAUDE.md` matches, and all three rules dirs exist
     (`.claude/rules/`, `.cursor/rules/`, `.github/instructions/`)
   - dependencies installed; with `--dev`, the Vite dev server answers HTTP 200

Green `PASS` = the whole chain works with your local edits.

## Recipe 2 — interactive: drive your local build through wibey / code puppy

This is the "real user experience, but with my unpublished code" test.

```bash
# 1. Build the tarball (test:local does this; npm pack alone also works)
cd ld-kit
npm run test:local

# 2. Launch the tool FROM A SHELL WITH THE OVERRIDE SET, opened at the empty playground
cd .sandbox/e2e/playground      # ALWAYS EMPTY — exactly what a real user's folder looks like
LD_KIT_PACKAGE=$PWD/../walmart-ld-kit-<version>.tgz wibey   # or claude / code-puppy
```

The playground is wiped on every `test:local` run, so the agent starts with no
pre-existing app to latch onto — the skill must scaffold from scratch, and the
scaffold output's `Package:` line confirms which build was installed.

Then prompt **exactly like a real user** — no magic words:

> Build me a Walmart homepage with a header and flash deals.

The skill triggers, scaffold.sh runs, and npx installs **your tarball** instead of
pulling from Artifactory. The agent cannot tell the difference — that's the point.

**The one rule:** the env var must be exported in the same terminal you launch the
tool from. Setting it after launch, or in a different terminal, does nothing.

## Recipe 3 — test a published channel (dev / next) instead of local code

```bash
LD_KIT_PACKAGE=@walmart/ld-kit@dev wibey     # CI's freshest main build
LD_KIT_PACKAGE=@walmart/ld-kit@next wibey    # staging channel
```

## Recipe 4 — the inner loop: iterate on rules/components against the instance

Recipe 1 leaves a ready-made instance at `.sandbox/e2e/instance/demo-app/` (with
fixture prompts in `demo-app/prompts/`). Two more commands work against it:

```bash
npm run test:local:dev     # watch:portable + the instance's Vite server (:3099)
npm run test:local:reset   # wipe agent-authored files, restore pristine template (~2s)
```

`test:local:dev` live-syncs your edits to `src/components/` and `src/context/*.mdc`
into the **same scaffolded instance** (the build scripts target it directly; the
shared path constant lives in `scripts/sandbox-instance.mjs`) — change a rule,
re-run a fixture prompt, watch the a11y overlay.
`test:local:reset` keeps `node_modules`, so it's a fast clean slate between
agent experiments; no npx or npm install.

Where to open the tool:

- Open `instance/demo-app/` → tests the kit's rules/context when opened correctly.
- Open `playground/` (always empty) → the full real-user flow including the
  **wrong-root** scenario: the skill scaffolds fresh, context does not auto-load,
  and the agent must be routed via the stdout block / AGENTS.md router.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Local edits don't show up in Recipe 2 | npx caches by `name@version`, and a repacked tarball keeps the same version. `npm run test:local` defeats this with a content-hash cache; for manual sessions, re-run the harness once or temporarily bump the version. |
| `404 @livingdesign/react` during scaffold | The kit's deps are being resolved against `design-npm-*-local`. Don't point `LD_KIT_REGISTRY` at a local repo for deps — that's what `LD_KIT_DEPS_REGISTRY` (npme-npm) is for. |
| `Permission denied` running a tarball | npx treats a bare tarball path as a command. scaffold.sh already uses `--package="$LD_KIT_PACKAGE" ld-kit`; if you call npx by hand, do the same. |
| Skill not found by the harness | Symlink it: `ln -s <ai-registry-marketplace>/design/living-design-lite ~/.claude/skills/living-design-lite`, or set `LD_SKILL_DIR=<path>`. |
| Pack is slow | `prepack` runs the full portable build. Iterating on the skill/scaffold only? Use `--skip-pack`. |

Everything under `.sandbox/` is gitignored and disposable — delete it freely.
