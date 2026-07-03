# @walmart/ld-kit

## 1.3.2

### Patch Changes

- 39457a7: Slim the published package to a single runtime dependency (`commander`). All build-time tooling (playwright, airtable, fantasticon, react, recharts, …) moved to devDependencies — the CLI only uses node builtins + commander, and the bundled template installs its own dependencies. `npx @walmart/ld-kit init` now downloads a few MB instead of ~700MB.

## 1.3.1

### Patch Changes

- 120ba20: Fix starter scaffold build failures produced by `ld-kit init`.

  - Include missing starter dependencies used by generated components: `recharts` and `react-resizable-panels`.
  - Include missing `@types/node` devDependency so generated projects type-check references to `process`.
  - Avoid duplicate top-level exports by skipping `components/DatePickerCalendar` in generated barrel output (DatePicker already re-exports `DatePickerCalendar` symbols).

  This resolves TypeScript build errors in fresh scaffolded apps (`TS2307`, `TS2580`, and `TS2308`).

## 1.3.0

### Minor Changes

- 47b9313: Introduce tiered npm release channels (`dev` / `next` / `latest`) owned by `ld-platform-team`.

  - CI now publishes every main release to the `dev` dist-tag instead of `latest`. Customers running `npm install @walmart/ld-kit` (no tag) continue to receive whatever `latest` points at and are unaffected by in-flight internal work.
  - Promotions are now **driven from the LooperPro UI** via manual triggers (`Promote dev → next (stage)`, `Promote next → latest (prod)`, `Pin version to a tag`) defined under `triggers:` in `.looper.yml`. CI uses its existing Artifactory credentials to move the dist-tag, no local npm auth required, and posts the result to Slack.
  - Added `scripts/promote-tag.mjs` plus `npm run promote:stage` / `npm run promote:prod` as a local break-glass fallback if Looper is unavailable.
  - Added `PROMOTE.md` documenting the tier model, centralized + local promotion flows, rollback, and gating checklist.
  - CODEOWNERS now scopes `.looper.yml`, `scripts/promote-tag.mjs`, and `PROMOTE.md` to `@Design/ld-platform-team`.

## 1.2.1

### Patch Changes

- e0af555: Disable the `A11yDevAssertions` blocking modal overlay in dev. The full-viewport modal and thrown error fired on every DOM mutation, blocking prototype interaction for designers. Console and terminal signals are preserved for agent use.

## 1.2.0

### Minor Changes

- 1617c79: Component cleanup, new size variants, tokenization, and accessibility fixes.

  ## New (alpha) APIs

  - `Badge` — `size='small'` (8×8 dot variant, marked `@alpha`)
  - `Checkbox` — `size='small'` (20×20 control, marked `@alpha`)
  - `Radio` — `size='small'` (20×20 control, marked `@alpha`)
  - `Tag` — `size='small'` (2×4 padded variant, marked `@alpha`)
  - `Tag` — new colors `brandBold` and `neutral` (palette parity with Badge, marked `@alpha`)
  - `Icons` — `StarFillIcon` wrapper (marked `@alpha`)
  - `CategoryNav` — new item flags `chevron` and `pushRight`

  ## Stable changes

  - `Tag` — default border-radius changed from `0.125rem` (2 px) to `0.25rem` (4 px). Visual-only change; no API or token impact.
  - `RatingDisplay` — refactored to use `StarIcon` / `StarFillIcon` from the icon font; the previous embedded SVG paths (with hard-coded gold/amber hex values) are removed. Public props are unchanged.
  - `Rating` — same icon-library refactor; full WAI-ARIA radiogroup keyboard support (roving tabindex, Arrow/Home/End), focus-driven hover preview, AT-only live region.
  - `RatingStars` — **deprecated**; the module now re-exports `Rating` so existing imports keep working. Schedule removal for the next major.
  - `LocationBreadcrumb` — `countLoading` now renders the standard `Skeleton`, not the `isMagic` `SkeletonText` shimmer.
  - `SideNavigation` `Tree` — restored to LD page-nav design tokens (was rendering as a solid-blue rectangle).

  ## Pattern updates

  - `AccountSideNav`, `GetItNowModal`, `ServicesCard` — `Badge` → `Tag` where the affordance was a textual label, not a count. See `BADGE_TO_TAG_MIGRATION.md` for the decision rule and variant rationale.
  - `ServicesCard` — hard-coded material-design hex pairs replaced with LD `--ld-semantic-color-fill-accent-*-subtle` / `--ld-semantic-color-text-accent-*` tokens; inline SVGs replaced with `Icon` font glyphs.
  - `OrderCardPatternsPage` — removed three sections (Get It Now upsell, Delayed Delivery warning, Auto Care vehicle health + upsell); replaced with `Alert`-based deprecation notices that anchor-link to canonical examples.

  ## Removed

  - `AgentsPage` and the entire `src/components/agents/` subtree (Marty / Sidekick / Squiggly / Wibey / Sparky).
  - `ChartPage` and `src/components/Chart/`.
  - `recharts` and `@lottiefiles/dotlottie-react` dependencies (no consumers remain).

  ## Tooling

  - New `.stylelintrc.cjs` with `color-no-hex` + `stylelint-declaration-strict-value` scoped to `src/components/**` and `src/patterns/**`. New `npm run lint:css` script and `.github/workflows/lint-css.yml` runs the check on PRs.
  - `stylelint` and `stylelint-declaration-strict-value` added as devDependencies.
  - `npm audit fix` reduced runtime advisories from 18 → 8 (all 8 sit in `fantasticon`'s dev-only `tar/node-gyp` chain). Details in `SECURITY_ADVISORIES.md`.

  ## Docs

  - `BADGE_TO_TAG_MIGRATION.md` — decision table, migration rules, color parity, variant rationale.
  - `SECURITY_ADVISORIES.md` — post-fix audit snapshot.

  ## Notes for consumers

  - `Badge` and `Tag` are different components with different shapes, sizes, and information density. Use `Badge` for numeric counts and presence dots; use `Tag` for short textual status labels. The migration guide spells this out.
  - The new `size` props are all marked `@alpha` and may change before stabilizing — pin behavior in tests if you adopt them now.

## 1.1.4

### Patch Changes

- 3563d86: Add brand media assets and icon fixes across multiple banners.

  - Add media registries for Bodega, Members Mark, Sam's Club (Maverick), Walmart Business, Walmart CA, Walmart Legacy, Walmart MX, Walmart Plus, and WCP brands
  - Update icon fonts (AX, PX, LD, WCP, Sam's Club, Bodega) with latest glyph sets
  - Fix icon targeting, photo-center, and sunglasses rendering issues
  - Sync theme tokens for Bodega, Cashi MX, Data Ventures, Members Mark, Sam's Club, Sparky, Walmart B2B, Walmart Legacy, Walmart Plus, and Walmart banners
  - Add `iconManager`, `illustrationManager`, and `mediaManager` utilities
  - Introduce brand inheritance model for theming

## 1.1.3

### Patch Changes

- 5ecb61c: Disambiguate the two components that were both called `ButtonGroup`.

  The legacy `ButtonGroup` inside `Button.tsx` is a byte-for-byte match for the upstream Living Design primitive — it takes `Button` children and renders `<div role="list">`. It is now restored to the public barrel (`import { ButtonGroup } from "@livingdesign/react"`).

  The Walmart-specific structured pattern that lived at `src/components/ButtonGroup/` — different API (`pattern="primary-secondary"`, `preferredLabel`, `alternateLabel`, prescribed Button variants) — is renamed to **`ActionGroup`** and now lives at `src/components/ActionGroup/`. The demo page (`ButtonGroupPage` → `ActionGroupPage`) and overview card move with it.

  **Breaking change for consumers of the renamed component:**

  ```diff
  - import { ButtonGroup } from "@walmart/ld-kit/components/ButtonGroup";
  - <ButtonGroup pattern="primary-secondary" preferredLabel="Save" alternateLabel="Cancel" onPreferred={save} onAlternate={cancel} />
  + import { ActionGroup } from "@walmart/ld-kit/components/ActionGroup";
  + <ActionGroup  pattern="primary-secondary" preferredLabel="Save" alternateLabel="Cancel" onPreferred={save} onAlternate={cancel} />
  ```

  CSS classes also rename: `ld-wcp-buttongroup-*` → `ld-wcp-actiongroup-*`. Emit event names rename: `ui:button-group:click` → `ui:action-group:click`.

  Consumers using the LD-canonical `ButtonGroup` (`<ButtonGroup>{button1}{button2}</ButtonGroup>`) are unaffected — that import path keeps working as before.

## 1.1.2

### Patch Changes

- d846ce6: Fix `ld-kit list` crashing with `TypeError: Cannot read properties of undefined (reading 'push')`. The CLI was grouping results by the pre-May-2026 category names (`core`/`shared`/`wcp`), but `components.json` now categorizes everything as `components` (atoms + molecules) or `patterns` (composed organisms), so every entry fell into an undefined bucket. Updated the CLI to match the current taxonomy, and refreshed the `--category` help text accordingly.

## 1.1.1

### Patch Changes

- b0324f5: Update patterns and pages: refresh AccountSideNav, AutoCareUpsellOfferCard, DelayedDeliveryCard, GetItNowModal, MaintenanceHealthCard, QueueSection, SearchResults, and ServicesCard patterns; update CarouselPage, ComponentCommunicationPage, DataTablePage, OverviewPage, and ProductCatalogPage; update a11y and agents context rules and living-design guidelines; improve Button and RatingDisplay components and common exports.

## 1.1.0

### Minor Changes

- 2b7df6b: Add component discovery surface: hybrid component index, per-component documentation files, and `ld-kit list` / `ld-kit show` CLI commands (replaces the prior monolithic overview file). Includes security fixes, living-design template updates, and various build and packaging improvements.

## 1.0.0

### Major Changes

- 675d61a: Initial public release of @walmart/ld-kit on Walmart Artifactory (npme-npm).

  Bootstraps the package from 0.0.0 to 1.0.0:

  - `npx @walmart/ld-kit init` scaffolds a Vite/React project preconfigured with the Living Design system (template at `sync/skill/projects/living-design/`).
  - `ld-sync` CLI for Builder ↔ Skill bidirectional content sync.
  - Looper-driven publish pipeline (changesets-versioned, Artifactory-published) with loop-safe commit-back to main.

Changelog managed by [@changesets/cli](https://github.com/changesets/changesets). Each release entry below is generated from the corresponding `.changeset/*.md` files merged into `main`.

## 1.0.0

Initial release of `@walmart/ld-kit` on Walmart Artifactory.

- Renamed from `ld-kit` (private workspace) to `@walmart/ld-kit` (published scoped package).
- Adds top-level `ld-kit` bin with `init <project> [dest]` subcommand that scaffolds a Living Design Vite/React starter byte-equivalent to `ld-kit-skill`.
- Retains `ld-sync` bin for internal sync flows; the bundled Living Design starter template is shipped under `dist/sync/skill/projects/living-design/` (via `prepack` copy) so the runtime template-resolution path inside `sync/skill/src/sync.ts` works in the published artifact.
- Publishes to the Walmart Artifactory `npme-npm` repo (URL: `https://npm.ci.artifacts.walmart.com/artifactory/api/npm/npme-npm`) with anonymous-read inside Walmart network.
- Looper-driven release pipeline: PR runs `npm pack --dry-run` for fast feedback; merges to `main` run `changeset version` + `changeset publish` and commit the bump back to `main` with `[skip ci]`.
