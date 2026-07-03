# Portable Source Constraints

This document defines how portable source files must be authored so generated output remains portable in sync targets (Builder, Skill).

## Source of Truth

- Edit canonical portable source in the repo's configured portable source roots (not tied to a single folder).
- New modules/components created from scratch must follow the same portability rules regardless of source location.
- Treat generated code/style directories as build output (configured by build script flags: `--app-dir` (repeatable), `--styles-dir` (repeatable)).
- Do not patch generated files directly; regenerate from source.
- If a portable module is synced from `libs/react/src/*`, mirror the same fix there to avoid regressions on future syncs.

## Import and Dependency Rules (Portable-Safe)

For any portable source module used through generated output:

- Runtime imports must resolve to `react` or local relative files (`./*`, `../*`) that are also portable.
- No direct dependency on external packages from portable runtime code.
  - Example of problematic external import: `@livingdesign/tokens/*`.
- Do not depend on shared modules that transitively import external packages.
  - Current known risky path: `hooks` (because it imports token packages).
- Prefer small, local helpers for simple behavior (e.g. debounce resize hook) instead of importing broad shared utility modules.
- Avoid path aliases in portable source intended for generation.

## CSS Portability Rules (Portable-Safe)

For styles that must survive portable generation:

- Edit source styles in canonical CSS files within the configured portable source roots.
- Each component has its own CSS file co-located with the component source (e.g., `Button/Button.css`).
- Do not patch generated CSS directly; regenerate from source CSS.
- Keep portable CSS self-contained:
  - No external package imports (`@livingdesign/tokens/*`, npm CSS packages, etc.).
  - No preprocessor-only syntax in source `.css` files (`@use`, nesting that requires Sass transforms, mixins, variables from Sass modules).
  - No `@import` dependencies from portable source CSS files.
- Preserve class-name contracts between TSX/JSX and CSS:
  - Class names emitted by portable source files must exactly match selectors in source CSS.
  - If a shared primitive (for example `Text`) changes class names, verify all dependents still resolve their selectors.
- Prefer static values or CSS custom properties with local fallbacks; do not rely on token build-time transforms in portable source CSS.

## Theme-Aware CSS Rules

Components must be authored so multi-brand theming works via CSS custom property overrides on `:root`. The system supports 22+ brand themes (Walmart, Sam's Club, Walmart B2B, etc.) that override tokens at runtime.

### Use semantic tokens for all brand-dependent colors

Any color that changes across brands (action fills, brand text, nav fills, link colors) **must** use a semantic or primitive CSS variable, never a hardcoded hex:

```css
/* CORRECT — theme can override primary fill */
background: var(--ld-semantic-color-action-fill-primary, #0053e2);
color: var(--ld-semantic-color-text-brand, #0053e2);

/* WRONG — hardcoded brand color, invisible to theming */
background: #0053e2;
color: #0053e2;
```

### Hardcoded neutrals are acceptable

Neutral values that don't change across themes (structural borders, shadows, backgrounds that are always white/gray) may be hardcoded:

```css
/* OK — structural gray border, same across all themes */
border: 1px solid #E6E6E8;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
```

### Always provide fallback values in `var()`

Every `var()` must include a hardcoded fallback so components render correctly without any theme loaded:

```css
/* CORRECT */
background: var(--ld-semantic-color-action-fill-primary, #0053e2);

/* WRONG — breaks if theme CSS hasn't loaded yet */
background: var(--ld-semantic-color-action-fill-primary);
```

### WCP components use `wcp-` prefixed tokens

WCP-specific semantic tokens use the `--wcp-semantic-*` prefix. These are defined in `notes/LD-CX-Starter-Kit V1/public/styles/themes/wcp/semantic.css` and can be overridden per brand:

```css
/* WCP primary alt button — yellow by default, black for Sam's Club */
background: var(--wcp-semantic-color-action-fill-primary-alt, #ffc220);

/* Rating star fill — spark yellow */
fill: var(--wcp-semantic-color-rating-fill-activated, #ffc220);
```

### Token tier selection guide

| Need | Use | Example |
|------|-----|---------|
| Brand-dependent action color | `--ld-semantic-color-action-*` | Button fills, link colors |
| Brand-dependent text/border | `--ld-semantic-color-text-brand`, `--ld-semantic-color-border-brand` | Brand headings, active borders |
| Raw color from the scale | `--ld-primitive-color-blue-130` | Only when you need a specific shade and semantic tokens don't cover it |
| WCP-specific brand value | `--wcp-semantic-color-*` | Rating stars, confidence badges, savings flags |
| Neutral/structural | Hardcoded hex | Borders, shadows, always-white backgrounds |

### Theme file reference

Source theme files live at `notes/LD-CX-Starter-Kit V1/public/styles/themes/`. Each brand directory contains:
- `semantic.css` — Semantic token overrides (always present)
- `primitive.css` — Primitive color/font overrides (only for themes with different color scales)

When creating a new component, check these files to understand which tokens are overridden across brands and ensure your component uses the correct tokens.

## Selector Prefix and Isolation

- Use deterministic `ld-<scope>-<slot>` naming so selectors are stable after generation.
- Keep selectors scoped to their module/feature prefix; avoid styles that bleed into unrelated UI.
- Avoid unscoped global selectors in portable source CSS (`*`, bare tags, broad descendant chains) unless intentionally defining shared base behavior.
- If shared prefixes are used (for example `ld-text-*`), treat them as explicit shared contracts and validate all consumers when they change.

## Transitive Graph Requirement

For each generated file in a sync target's component directory, every reachable import must be resolvable from:

- `react`
- other files in that component directory

No node-only modules, unresolved package imports, or environment-specific aliases.

## Build Workflow

1. Implement change in canonical portable source (component, shared primitive, or portable helper).
2. Regenerate portable output for sync targets:
   - `node scripts/build-portable.mjs <ModuleName>` for targeted rebuilds where supported.
   - or `npm run build:portable` for full rebuilds.
3. Verify generated styles were updated:
   - Confirm per-component CSS files are present in sync target style directories.
4. Build app to verify compilation:
   - `npm run build`

## Verification Checklist

Before considering a portable change safe:

- Generated module imports contain only `react` and local `./...` imports.
- No external package imports exist in the generated graph.
- Per-component CSS files include selectors expected by rendered TSX/JSX class names.
- Affected UI renders correctly in local app.

## Known Pitfall (DataTable Incident)

- `DataTable` previously imported `useDebouncedWindowResize` from `hooks`.
- Generated `hooks` imported `@livingdesign/tokens`, which broke portability.
- Fix pattern: inline a local debounced resize hook inside `DataTable` and use `debounce` from local common helpers.
