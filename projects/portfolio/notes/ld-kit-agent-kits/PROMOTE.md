# `@walmart/ld-kit` release promotion

Owned by the **[ld-platform-team](https://gecgithub01.walmart.com/orgs/Design/teams/ld-platform-team)**.

## Tier model

| Tier  | npm dist-tag | Who installs it                                  |
|-------|--------------|--------------------------------------------------|
| dev   | `dev`        | Internal contributors who opt in via `LD_KIT_ENV=dev` |
| stage | `next`       | Dogfooders (auto-enrolled) + anyone with `LD_KIT_ENV=stage` |
| prod  | `latest`     | **All customers.** Plain `npm install @walmart/ld-kit`. |

Each tier corresponds to a single npm dist-tag. Promotion is a **tag move**, not a republish — the same tarball/version is repointed by a different tag. This is instant, reversible, and avoids the Artifactory immutability footgun.

## Automatic flow

1. PR merges to `main` → `.looper.yml` runs `changeset publish --tag dev`.
2. The new version is now on the `dev` tag. Internal contributors and the dogfooder set can pull it.
3. Customers are unaffected — they remain pinned to whatever the `latest` tag points at.

## Promotion (recommended: LooperPro UI manual triggers)

Promotions are driven from the **LooperPro UI** at <https://dx.walmart.com/nextgenci/>. Open the `@walmart/ld-kit` job page; under **Manual Trigger** in the right sidebar you will see three buttons:

| Button                                       | Action                                  |
|----------------------------------------------|-----------------------------------------|
| **Promote dev → next (stage)**               | Move `dev` → `next`                     |
| **Promote next → latest (prod)**             | Move `next` → `latest`                  |
| **Pin version to a tag (rollback / re-issue)** | Prompts for `pinVersion` + `pinTargetTag` (`dev` / `next` / `latest`) and pins the tag |

Click the button. Looper runs the named flow in `.looper.yml`, writes the Artifactory `.npmrc` from its existing `${reposolnsPassword}` secret, runs `scripts/promote-tag.mjs`, scrubs creds, and posts a Slack message to `#ld-kit-releases`.

No local npm auth, no commit on `main`, no `git push` — the entire operation lives in the LooperPro build log + Slack notification + the resulting dist-tag state.

### Operator workflow (ld-platform-team)

1. Open <https://dx.walmart.com/nextgenci/> and select the `@walmart/ld-kit` job.
2. In the right sidebar, click the appropriate button under **Manual Trigger**.
3. For **Pin version**, fill in `pinVersion` (e.g. `1.4.5`) and `pinTargetTag` (e.g. `latest`) when prompted.
4. Confirm; watch the build complete; verify the Slack notification.

### Rollback example

Click **Pin version to a tag**, set:

- `pinVersion = 1.4.5` (the last-known-good version)
- `pinTargetTag = latest`

Confirm. The bad version is still in the registry but customers running `npm install @walmart/ld-kit` immediately resolve to `1.4.5` again.

### Safety guarantees

- **ACL-gated at the click**: only members of the LooperPro job's ACL group see the buttons as clickable. Everyone else gets the "Please get added to your team's ACL group" message.
- **CODEOWNERS-gated at the edit**: changes to `.looper.yml`, `scripts/promote-tag.mjs`, and `PROMOTE.md` require `@Design/ld-platform-team` review, so the trigger definitions themselves cannot be modified without their approval.
- **No version bump**: the promote flows never run `changeset version` / `changeset publish` / build. There is no risk of an accidental release.
- **Broken tarball cannot block a rollback**: `npm pack` is not run on the promote path.
- **`pinTargetTag` validation**: the `promotePin` flow refuses any tag outside `dev | next | latest`.

## Manual promotion (local fallback / break-glass)

Use only if Looper is unavailable. Requires the operator to be authenticated against `design-npm-prod-local` locally.

```bash
npm run promote:stage   # dev → next
npm run promote:prod    # next → latest
node scripts/promote-tag.mjs --version=1.4.7 --to=latest --yes
```

Both commands print the resolved version, show the before/after state, and require y/N confirmation (auto-confirms in non-TTY contexts). Pass `--yes` to skip the prompt explicitly.

### Pin a specific version to a specific tag

```bash
node scripts/promote-tag.mjs --version=1.4.7 --to=latest --yes
```

Use this to:

- **Seed `latest`** on a brand-new package (first ever release).
- **Roll back** a bad prod release: re-point `latest` at the previous version.
- Recover from a bad stage promotion without waiting for a new build.

### Inspect current state

```bash
npm view @walmart/ld-kit dist-tags \
  --registry=https://npm.ci.artifacts.walmart.com/artifactory/api/npm/design-npm-prod-local/
```

## Rollback

Primary path: click **Pin version to a tag** in the LooperPro UI sidebar; set `pinVersion=<last-good>`, `pinTargetTag=latest`.

Local break-glass (requires npm auth against `design-npm-prod-local`):

```bash
node scripts/promote-tag.mjs --version=<previous> --to=latest --yes
```

Tag move is effective globally within seconds. The bad version is still in the registry but no longer reachable by `npm install @walmart/ld-kit` without an explicit `@<version>`.

## Promote gating (recommended)

Before running `promote:prod`, confirm:

- [ ] The candidate version has been live on `next` (stage) for ≥ 48 hours.
- [ ] Dogfooders have built ≥ 1 net-new project against it with no regressions.
- [ ] `npm run check:builder` and the eval suite pass against the candidate.
- [ ] CHANGELOG entry has been reviewed and the breaking-change column is empty (or has a migration note).

These checks are advisory today; codify them as a CI gate once the team is comfortable with the cadence.

## FAQ

**Q: A contributor needs the bleeding edge for their feature work. What do they do?**
A: They set `LD_KIT_ENV=dev` and re-run the skill scaffold — the scaffolded project will pin the resolved `dev` version into its own `package.json`. Their project is reproducible from that point on.

**Q: A customer reported a bug introduced by the last prod promote. How do we roll back?**
A: Run `node scripts/promote-tag.mjs --version=<previous-good> --to=latest --yes`. Effective globally in seconds. File a follow-up to fix forward.

**Q: Can I publish directly to `latest` from CI?**
A: No. CI only writes to `dev`. The only path to `latest` is through `promote:prod`, which requires an `ld-platform-team` operator at a keyboard.
