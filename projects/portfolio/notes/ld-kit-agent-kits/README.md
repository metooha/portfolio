# @walmart/ld-kit

Walmart Living Design starter kit. `npx @walmart/ld-kit init my-app` scaffolds a Vite + React + Living Design project that's byte-equivalent to a fresh clone of the historical `ld-kit-skill` repo, fully wired and dependency-installed. Typically invoked by Walmart-internal tooling (Wibey / Claude Code), but the bin works as a standalone command too.

> **Audience:** this top section is for **consumers** of the published `@walmart/ld-kit` package — engineers (and tools) scaffolding a Living Design app. Kit-internal development docs (running `npm run dev`, `build:portable`, sync, sandbox) live below the divider and target kit maintainers.

## Install

Two install paths — pick the one that matches your workflow.

```bash
# One-shot scaffold (no global install required)
npx @walmart/ld-kit init my-app

# Or install globally and reuse across projects
npm install -g @walmart/ld-kit
ld-kit init my-app
```

`init` always runs `npm ci` (if the bundled template ships a lockfile) or `npm install` — see [What `init` does](#what-init-does) for the full behavior contract.

## Registry configuration

`@walmart/ld-kit` is published to the Walmart Artifactory `npme-npm` repo (the trailing path segment of the registry URL is the Artifactory repo name), not to the public npmjs.org registry. The `@walmart` scope must point at Walmart Artifactory:

```bash
npm config set @walmart:registry https://npm.ci.artifacts.walmart.com/artifactory/api/npm/npme-npm
```

Or pin it per-project via an `.npmrc` at the project root:

```
@walmart:registry=https://npm.ci.artifacts.walmart.com/artifactory/api/npm/npme-npm
```

**Anonymous read works inside the Walmart network** — `npx @walmart/ld-kit init` and `npm install -g @walmart/ld-kit` succeed without auth credentials. No Artifactory token required for consumers.

## Quick start

```bash
npm config set @walmart:registry https://npm.ci.artifacts.walmart.com/artifactory/api/npm/npme-npm
npx @walmart/ld-kit init my-app
cd my-app
npm run dev
```

The dev server starts on http://localhost:3099 — open it in a browser to see the starter, then edit `src/App.tsx` to begin building.

## What `init` does

`ld-kit init <project-name> [dest]` is intentionally minimal:

1. Resolves the destination path to `<dest>/<project-name>` (default `dest` is `.`). Errors if the directory already exists.
2. Copies the bundled Living Design starter template (`living-design/` from the package tarball) into the destination via `cpSync(..., { recursive: true })`.
3. Runs `npm ci` if the copied tree contains `package-lock.json`, else `npm install`. Pass `--no-install` to skip this step.
4. Prints next steps (`cd <project>` / `npm run dev`).

The output tree is **byte-equivalent (modulo timestamps, `.git/`, `node_modules/`) to a fresh `git clone` of `ld-kit-skill`**. The bundled template is built into the published tarball by the kit's `prepack` step, so every released version of `@walmart/ld-kit` ships a self-contained starter.

## Contributing

PRs welcome. Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the local-dev loop, the changeset-driven release workflow, and how Looper publishes to Artifactory on merges to `main`.

## Releases

Release notes live in [`CHANGELOG.md`](./CHANGELOG.md). Versions are managed by [Changesets](https://github.com/changesets/changesets) and published by Looper.

**Artifactory releases are immutable** — once a version is published, it cannot be republished or overwritten. A bad release can only be deprecated (`npm deprecate @walmart/ld-kit@<version> "<reason>"`) and superseded by a new version.

---

# ld-kit

Component library and showcase app for Walmart's Living Design system.

## 1) Registry setup

This project already includes a local `.npmrc`:

```sh
registry=https://npm.ci.artifacts.walmart.com/artifactory/api/npm/npme-npm
```

## 2) Install dependencies

From this folder:

```sh
npm install
```

## 3) Run dev

Start the Vite dev server:

```sh
npm run dev
```

The app imports components directly from `src/components/` — no pre-build step needed.

## 4) Build

Build the app bundle:

```sh
npm run build
```

Preview the built app:

```sh
npm run preview
```

## 5) Build portable (for sync targets)

Generate portable component copies for the published starter template and Builder:

```sh
npm run build:portable
```

## 6) Run Builder sync (maintainers only)

Builder sync is maintainer-only tooling and is not published in the npm package. Run it directly from source via tsx:

1) Create `.env` from `.env.example` and set your Builder URL (`BUILDER_URL`).

2) Install the browser channel once (if needed):

```sh
npm run install:browsers:msedge
```

3) Run sync:

```sh
npm run sync:builder
```

Notes:
- Builder sync uses a persistent browser profile at `sync/builder/.browser-profile`.
- On first run, complete login in the opened browser window; later runs reuse that session.
- Override the URL from CLI with `--url`.

## Structure

- `src/components/`: canonical component source (core, shared, CX)
- `src/pages/`: demo/showcase pages importing directly from components
- `scripts/build-portable.mjs`: generates portable output for the published starter template and the Builder sync target
- `sync/builder/`: Builder sync tooling (maintainer-only, not published)
- `living-design/`: the starter template shipped via `ld-kit init`

## 7) Test the skill in an isolated sandbox

Use the sandbox to reproduce how an agent (Claude Code, Cursor, Copilot) experiences the synced skill — useful when iterating on `src/context/a11y.mdc` or component a11y invariants and you want to verify the rules plus the runtime scanner (`A11yDevAssertions` + component `invariant()` calls) actually catch what slips through.

```sh
npm run skill:seed   # create .sandbox/skill/ OR refresh it (agent files preserved)
npm run skill:dev    # initial build + watch:portable + sandbox Vite on :3099
npm run skill:reset  # clear agent-authored files (keeps node_modules, ~2s)
```

The sandbox lives at `.sandbox/skill/` (gitignored). Changes to `src/components/**`, `src/utils/**`, and `src/context/*.mdc` flow through `watch:portable` → the sandbox → Vite HMR, so you can iterate on rules and see the effect without manual copies. Point your agent at `.sandbox/skill/`; pre-seeded fixture prompts live under `.sandbox/skill/prompts/`. Runtime a11y regressions surface as full-screen `LD a11y:` / `A11Y:` errors in the Vite overlay.

Seed vs. reset:
- **`skill:seed`** is idempotent. First run creates the sandbox and `npm install`s. Subsequent runs leave your agent's pages and custom components alone — they just rewrite fixture prompts and re-run `build-portable` (which refreshes `src/components/ld/**`, rule files, `App.tsx`, utils).
- **`skill:reset`** wipes the sandbox source tree (pages, custom components, any agent edits to `App.tsx` / `main.tsx` / config) and re-copies the synced template over the top, preserving `node_modules/` + `package-lock.json`. Use this between agent experiments when you want a clean slate without waiting on another install.
- To nuke dependencies too: `rm -rf .sandbox/skill && npm run skill:seed`.

## Optional packages

```sh
npm install -S @livingdesign/icons
npm install -S @livingdesign/everyday-sans
```
