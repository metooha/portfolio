# Contributing to `@walmart/ld-kit`

Thanks for contributing! `@walmart/ld-kit` is the source of the Living Design starter that powers `npx @walmart/ld-kit init`. This guide covers the local-dev loop and the changeset-driven release workflow.

## Prerequisites

- **Node.js** `>=22` (matches `engines.node` in `package.json`).
- **npm** `>=10` (ships with Node 22).
- Network access to Walmart Artifactory for `npm install` (the `@walmart` scope resolves there).

## Local development

```bash
git clone git@gecgithub01.walmart.com:Design/ld-kit.git
cd ld-kit
npm ci
npm run dev          # Vite dev server for kit-internal exploration
npm run build:portable   # build the embedded ld-kit-skill template tree
```

## Testing your changes end-to-end (no publish needed)

```bash
npm run test:local   # pack the kit → run the real skill scaffold → assert agent routing
```

See [TESTING.md](./TESTING.md) for the full guide: testing through wibey / code puppy /
Claude Code interactively, targeting the `dev`/`next` channels, and how the
`LD_KIT_PACKAGE` / `LD_KIT_ENV` env knobs select what gets pulled down.

## Adding a changeset (required for every PR that ships behaviour)

We use [Changesets](https://github.com/changesets/changesets) to manage versions. Every PR that changes published behaviour must include a changeset file under `.changeset/`.

```bash
npm run changeset
```

You'll be prompted to:

1. Pick the bump type: **patch** (bug fix), **minor** (new feature, backwards-compatible), or **major** (breaking change).
2. Write a one-line summary that will appear in `CHANGELOG.md`.

The command writes a new `.changeset/<random-name>.md` file. **Commit it as part of your PR.**

PRs that change README content, internal scripts, tests, or repo plumbing without affecting the published artefact may skip the changeset; tag those PRs `chore` and Looper will not gate on the missing changeset.

## How releases work

1. PR is merged to `main`.
2. Looper (`.looper/`) runs:
   - `npm ci`
   - `npm run version-packages` (alias for `changeset version`) — bumps `package.json:version`, writes the new entry to `CHANGELOG.md`, deletes the consumed `.changeset/*.md` files.
   - `npm run release` (alias for `changeset publish`) — runs `npm publish` against the Walmart Artifactory `npme-npm` registry.
3. Looper commits the version bump back to `main` with a `[skip ci]` marker so the publish job does not retrigger itself (loop-safe per PUBLISH_5 DoD).
4. New tarball appears at `https://npm.ci.artifacts.walmart.com/artifactory/api/npm/npme-npm/@walmart/ld-kit/-/ld-kit-<version>.tgz` within ~30s of pipeline success.

**Do NOT run `npm run release` locally.** Artifactory releases are immutable; a bad release can only be deprecated, not replaced.

## Reporting issues

File issues at `https://gecgithub01.walmart.com/Design/ld-kit/issues`.
