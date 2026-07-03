# `@walmart/ld-kit` — Looper pipeline contract

This directory documents the pipeline defined in `../.looper.yml`. The pipeline is the canonical release path for `@walmart/ld-kit`. Do NOT publish from a developer workstation — Walmart Artifactory releases are immutable.

## Trigger conditions

| Event | Looper flow | Effect |
|---|---|---|
| Pull request opened/updated | `pr` | Runs `npm ci` and `npm pack --dry-run` (which fires `prepack` → `build:portable` + `build:cli`). No publish. Fast contributor feedback. |
| Push to `main` (human-authored) | `publish` | Injects Artifactory auth (`~/.npmrc` written via `printf` BEFORE `npm ci` so the install resolves against Artifactory deterministically), re-installs deps, runs `npx changeset version`, runs an explicit `build:portable` + `build:cli` + bin-presence assertion, runs `npx changeset publish` (→ `npm publish`), then `git fetch origin main && git rebase origin/main && git push origin HEAD:main` to commit the version bump back to `main` with `[skip ci]`. The publish-before-push order ensures a failed publish leaves `main` clean for retry, since Walmart Artifactory enforces immutable releases. The inverse failure mode — publish succeeds but commit-back fails — exits with status code **42** and is documented under *Recovering from a half-failed release* below. |
| Push to `main` (release-bot-authored) | _ignored_ | Both `ignoreAuthors:` (Looper-side) and an in-flow author/`[skip ci]` check (script-side) bail out. See *Loop-safety* below. |

## Secrets required

All secrets are **auto-injected by Looper** for any `.looper.yml` registered against this repo's GitHub org — no per-repo provisioning required.

| Secret | Provider | Used for |
|---|---|---|
| `${reposolnsUsername}` | Looper `reposolns/ci_write/<github-org>` vault | Artifactory username (rarely used directly for npm; the token is the auth) |
| `${reposolnsPassword}` | Looper `reposolns/ci_write/<github-org>` vault | Artifactory token written to `~/.npmrc` as `_authToken` |
| `git push` credentials | Looper-managed (transparent inside `dockguardAgent`) | Pushing the version-bump commit back to `main` |
| `${GITHUB_ACCESS_TOKEN}` | Optional Looper repo-secret | Only needed if the pipeline gains a `gh release create` step in a later task. Not used today. |

If a Looper run fails with `401 Unauthorized` against `npm.ci.artifacts.walmart.com`, the Artifactory token has likely rotated — open a Looper support ticket at https://dx.walmart.com/artifactory/documentation/ and request a fresh `reposolns` scope binding for this repo.

## Loop-safety

The `publish` flow modifies `main` (commits the version bump). Without protection, that commit would re-trigger the same flow indefinitely. Two redundant guards are in place:

1. **Trigger-level filter** — `branches: - spec: main: ignoreAuthors: [SVCelectrodeops@walmartlabs.com]` excludes commits authored by the release-bot identity from triggering `publish`.
2. **In-flow author + message check** — the `publish` shell inspects `git log -1 --pretty=format:'%ae'` and `'%B'`. If the HEAD author is the release bot, OR the message contains `[skip ci]` / `[looper skip]`, the script `exit 0`s before doing any work. This is the backup defense in case the Looper version in use does not honor `ignoreAuthors`.

The release-bot identity is hard-coded as `Electrode Looper <SVCelectrodeops@walmartlabs.com>` to match the Walmart-internal convention used by `wibey-agent-sdk` and other npm-publish pipelines in this workspace.

## Rollback

Walmart Artifactory enforces **immutable releases** — a published `@walmart/ld-kit@X.Y.Z` cannot be replaced. Two recovery actions:

1. **Deprecate the bad version** (preferred, no new release needed):
   ```bash
   npm deprecate @walmart/ld-kit@<bad-version> "<reason>" \
     --registry=https://npm.ci.artifacts.walmart.com/artifactory/api/npm/npme-npm
   ```
   Run from inside Walmart network with credentials for the `reposolns/ci_write/<github-org>` scope.

2. **Cut a new patch release** with the fix. Add a `.changeset/<random>.md` file with `patch` bump, merge to `main`, let Looper publish the next version. The `latest` dist-tag automatically advances.

## Recovering from a half-failed release

The `publish` flow runs `changeset publish` (which calls `npm publish`) **before** pushing the version-bump commit back to `main`. The publish-first ordering is intentional — see *Trigger conditions* row 2 — but it creates a residual half-failed state when:

- `changeset publish` succeeds → Artifactory now has `@walmart/ld-kit@X.Y.Z` (immutable, cannot be unpublished).
- `git fetch origin main` / `git rebase origin/main` / `git push origin HEAD:main` fails afterwards (non-fast-forward because `main` advanced during the run, branch protection rejection, transient network) → `main`'s `package.json` still claims the previous version, the `.changeset/*.md` files are still on `main`, and no commit references X.Y.Z.

The publish flow exits with **status code 42** in this case and the catch block sends a Slack message that explicitly names this failure mode.

### Detection

```bash
# (1) Confirm the registry has the new version.
npm view @walmart/ld-kit@<version-from-Looper-log> version \
  --registry=https://npm.ci.artifacts.walmart.com/artifactory/api/npm/npme-npm

# (2) Confirm `main` does NOT have the bump commit.
git fetch origin main
git log origin/main -1 --pretty=format:'%s'
# If the most recent commit is NOT `chore(release): @walmart/ld-kit@<version> [skip ci]`,
# you are in the half-failed state.
```

### Manual recovery (do NOT re-trigger Looper)

Re-triggering Looper will re-run `changeset version` against the still-unconsumed `.changeset/*.md` files and attempt to publish the same X.Y.Z again — Artifactory will reject the duplicate with HTTP 409 and the pipeline will wedge again.

Instead, reconcile `main` by hand:

```bash
git fetch origin main
git checkout -B fix/half-failed-release origin/main

# Re-create the bump commit locally (changeset version is idempotent against
# the same .changeset/*.md inputs — it produces the same X.Y.Z bump and the
# same CHANGELOG.md entry as the failed Looper run).
npx changeset version
git add package.json CHANGELOG.md .changeset
git commit -m "chore(release): @walmart/ld-kit@<version> [skip ci]"
git push origin HEAD:main
```

No re-publish is needed — Artifactory already has the version. The `[skip ci]` token + the loop-safety guards prevent the manual push from re-triggering the publish flow.

### When to deprecate instead

If the half-failed publish shipped a version you don't actually want users to consume (the build was correct but the rollout decision changed), `npm deprecate` it (see *Rollback* above) **and** still push the bump commit so `main` stays in sync with the registry. Deprecation does not delete the version; it only marks it as discouraged.

## `[skip ci]` caveat

The MCP-cited DX docs note that Looper does not _universally_ honor `[skip ci]` as a built-in convention. The in-flow author check (item 2 of *Loop-safety* above) is the defense-of-record; `[skip ci]` is belt-and-suspenders. If the loop still triggers despite both guards on a future Looper version upgrade, file a Looper support request and tighten the `ignoreAuthors` schema or move the version-bump commit into a tag-based trigger.

## Files in this directory

- `README.md` — this file. Read-only documentation.
- (No other files.) The `.npmrc` injection lives inline in `../.looper.yml` (written via `printf`, not a heredoc — see the inline comment for the YAML-indentation rationale) to keep credentials-adjacent code colocated with the pipeline.

## See also

- `../.looper.yml` — the pipeline.
- `../package.json:publishConfig` — the registry URL the pipeline publishes to (`https://npm.ci.artifacts.walmart.com/artifactory/api/npm/npme-npm`).
- `../.changeset/config.json` — the changeset config that drives `npx changeset version` and `npx changeset publish`.
- `../CONTRIBUTING.md` — contributor flow for adding a `.changeset/*.md` to a PR.
- DX reference: https://dx.walmart.com/artifactory/documentation/confluence/Overview-2345358635
