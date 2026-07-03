# Project Overview & Sync Architecture

## What ld-kit Is

ld-kit is a **component library and showcase app** for Walmart's Living Design system. It contains ~65 base LD components plus 24 custom Walmart Customer Platform (WCP) components. Components are authored once in `src/components/` and used directly by the local Vite app. A build script generates portable copies for two external sync targets:

1. **Builder.io** — Visual code builder with SSO-authenticated editing
2. **Skill** — IDE integrations (Cursor, Claude Code, GitHub Copilot)

## Why Portable Sync Exists

Builder.io runs user code in a sandboxed environment that **cannot resolve npm packages at runtime**. A component that imports `@livingdesign/tokens` or uses path aliases (`@/components/...`) will crash. The `build-portable.mjs` script solves this by:

- Rewriting all imports to `react` + local relative files (`./common`, `./ComponentName`)
- Copying per-component CSS files to sync targets
- Inlining all dependencies (hooks, icons, helpers) into portable source files
- Stripping build-time-only concerns (Sass, Tailwind, i18next, router, context providers)

The local Vite app does **not** use generated output — it imports directly from `src/components/`.

## Project Structure

```
ld-kit/
├── src/
│   ├── components/          ← Canonical source (edit here)
│   │   ├── common/          ← Shared helpers, icons, cx, types, transitions
│   │   ├── core/            ← ~65 LD base components (Button/, Alert/, etc.)
│   │   ├── shared/          ← Compound components (Accordion/, SharedForm/, etc.)
│   │   └── CX/              ← 24 WCP components (.tsx + .css pairs)
│   ├── themes/
│   │   └── base.css         ← Combined primitive+semantic base tokens (~99KB)
│   ├── pages/               ← Demo/showcase pages (import from src/components/)
│   │   ├── wcpPatternHelpers/ ← Demo-only pattern components (not portable)
│   │   └── navigation.ts    ← Nav config
│   ├── utils/               ← DevToolsPanel, Store, Theming, themeManager
│   └── App.tsx              ← Main app entry
│
├── scripts/
│   └── build-portable.mjs   ← Generates portable output for sync targets
│
├── sync/                    ← Platform sync tooling (see below)
├── libs/                    ← Local copies of LD packages (build-time reference)
├── agent-context/           ← Context docs for coding agents
└── notes/
    └── LD-CX-Starter-Kit V1/  ← Vibe-coded source project
        └── public/styles/themes/ ← 22 brand theme CSS files (source of truth for overrides)
```

## Theming Infrastructure

ld-kit supports **multi-brand theming** via CSS custom property overrides. The design system uses a two-tier token architecture (primitive → semantic), and themes work by overriding tokens at the `:root` level.

### Token Tiers

1. **Primitive tokens** — raw scale values (`--ld-primitive-color-blue-130: #002e99`). Changing these cascades to all semantic tokens that reference them.
2. **Semantic tokens** — contextual mappings (`--ld-semantic-color-action-fill-primary: var(--ld-primitive-color-blue-100, #0053e2)`). Themes override these for targeted brand changes.
3. **WCP tokens** — extended tokens prefixed `--wcp-semantic-*` for WCP-specific components (rating stars, confidence fills, scarcity flags). These are additive to the LD base.

### Theme Sources

- **`notes/LD-CX-Starter-Kit V1/public/styles/themes/`** — 22 brand theme directories. Each contains a `semantic.css` and optionally a `primitive.css` with `:root` overrides. These are the source of truth for token values.
- **`src/themes/base.css`** — Auto-generated combined primitive+semantic base tokens (~99KB). Loaded as the default theme in the app.

### Runtime Theme Switching

Theme state is owned by `src/themes/themeManager.ts`, a plain TypeScript module that:

- Defines **10 theme presets** (`THEME_PRESETS`) with CSS custom property overrides
- Persists the active theme to `localStorage` (key: `ld-kit-theme`)
- Applies overrides via `document.documentElement.style.setProperty()` — all components respond automatically
- Exposes `window.ldKit` for agent/console access (`setTheme`, `getTheme`, `getThemeNames`, `THEME_PRESETS`)
- Dispatches `CustomEvent('ld-kit-theme-change')` so React UI can sync

The OverviewPage's theme selector dropdown is a consumer of this module. `initTheme()` is called once on app mount in `IndexPage.tsx`. See `agent-context/theming.md` for full API docs.

### OverviewPage Sections

The OverviewPage organizes the component library into three sections with visual dividers:

1. **Core Components** (37 items) — LD base components with live previews
2. **WCP Components** (14 items) — WCP individual components with previews where feasible
3. **WCP Patterns** (8 items) — Full-width horizontal cards for composed pattern pages

Search filters across all three sections. Section dividers only appear when the section has matching results.

### Adding a New Theme Preset

To add a new theme preset to the OverviewPage:

1. Read the theme's `semantic.css` (and `primitive.css` if it exists) from `notes/LD-CX-Starter-Kit V1/public/styles/themes/<theme-name>/`
2. Extract only the **key visual tokens** — primary action fills, brand colors, top-nav fills, and any tokens that make the brand visually distinct
3. Resolve `var()` references to their fallback hex values (runtime overrides must be concrete values, not `var()` chains)
4. Add the preset to `THEME_PRESETS` in `src/themes/themeManager.ts`

## The sync/ Directory

`sync/` contains the CLI tooling that pushes portable code and styles to Builder.io and Skill targets. It is a Playwright-based browser automation system — not an API integration — because Builder requires browser-based file tree manipulation.

### Directory Layout

```
sync/
├── src/
│   └── cli.ts               ← Unified entry point (interactive menu or direct flags)
├── tsconfig.json             ← Shared TS config for sync code
│
├── builder/                  ← Builder.io sync
│   ├── src/
│   │   ├── cli.ts            ← Builder-specific CLI
│   │   ├── config.ts         ← Load Builder URL from env/file
│   │   ├── browser.ts        ← Persistent browser profile + SSO login
│   │   ├── sync.ts           ← Orchestration: navigate, file tree, upload
│   │   ├── tree.ts           ← Tree manipulation (expand, select, ensure paths)
│   │   ├── upload.ts         ← File upload via drag-drop
│   │   └── inspect-tree.ts   ← Inspect remote file tree structure
│   ├── projects/
│   │   ├── living-design/    ← LD component library project for Builder
│   │   │   ├── client/components/ld/ ← Generated component files (sync target)
│   │   │   ├── client/*.css  ← Per-component CSS files (sync target)
│   │   │   ├── AGENTS.MD     ← Agent instructions for Builder's AI
│   │   │   └── .builder/rules/ ← Rule files (.mdc) for Builder's AI
│   │   └── component-viewer/ ← Showcase app project for Builder
│   └── .browser-profile/     ← Persistent SSO session (gitignored)
│
└── skill/                    ← IDE/Cursor/Claude Code integration
    ├── src/
    │   └── cli.ts            ← Skill-specific CLI
    └── projects/
        └── living-design/
            ├── src/components/ld/ ← Generated component files (sync target)
            ├── src/styles/    ← Per-component CSS files (sync target)
            ├── .claude/rules/ ← Claude Code rules
            ├── .cursor/rules/ ← Cursor rules (.mdc files)
            ├── .github/instructions/ ← Copilot instructions
            ├── AGENTS.md
            └── CLAUDE.md
```

### How Sync Works

**Entry point:** `npx tsx sync/src/cli.ts` (or `npm run sync:builder` / `npm run sync:skill`)

Builder sync follows this flow:
1. **Authenticate** — Builder uses persistent browser SSO
2. **Launch browser** — Playwright opens Builder's web editor
3. **Navigate to project** — Open the target project's code view
4. **Discover local files** — Walk the sync project directory for `.tsx`, `.ts`, `.css` files
5. **Ensure remote structure** — Create missing folders in the platform's file tree
6. **Upload each file** — Select/create each file in the tree, drag-drop content
7. **Wait for settlement** — Monitor WebSocket to confirm sync

### What Gets Synced

The `build-portable.mjs` script writes generated output to sync targets:

```
src/components/WCPFoo/WCPFoo.tsx  ──┐
src/components/WCPFoo/WCPFoo.css  ──┤
src/components/common/*           ──┤──> build-portable.mjs
                                    │
          ┌─────────────────────────┘
          │
          ├──> sync/builder/.../client/components/ld/  (Builder code)
          ├──> sync/builder/.../client/               (Builder styles)
          ├──> sync/skill/.../src/components/ld/      (Skill code)
          └──> sync/skill/.../src/styles/             (Skill styles)
```

After building, running the sync CLI pushes those files into the platform's browser-based editor.

## Agent Rule Files

Each platform has AI agent rule files that guide the platform's built-in coding AI. These are **separate from ld-kit's own agent-context/**. They tell the platform's AI how to use the synced components correctly.

### Builder Rules (`.builder/rules/*.mdc`)

- **living-design-guidelines.mdc** — Maps user intent to LD/WCP components, enforces import patterns (`./ld/Component`), accessibility requirements
- **components-index.mdc** — Always-on index: every component with category, import path, and one-line intent. Generated by `scripts/extract-guidelines.mjs`.

### Component discovery

The agent loads the small `components-index.{mdc,md,instructions.md}` every turn. For prop API + usage notes on a specific component, it either:

- opens the `<Name>.md` co-located with its `.tsx` inside `src/components/ld/<dir>/` (Skill) or `client/components/ld/<dir>/` (Builder), where `<dir>` matches the import path (e.g. `Button.md` and `ButtonGroup.md` both live in `src/components/ld/Button/`), **or**
- runs `npx ld-kit show <Name>` from the project root.

The machine-readable manifest is the top-level `components.json` next to the package root (`living-design/components.json` for Skill, `sync/builder/projects/living-design/client/components.json` for Builder). Both the per-component `.md` files and `components.json` are emitted by `scripts/extract-guidelines.mjs`.

### AGENTS.MD

`sync/builder/projects/living-design/AGENTS.MD` provides high-level context for Builder's AI about the project structure and available components.

## Workflow Summary

1. **Edit** canonical source in `src/components/`
2. **Dev** with `npm run dev` (Vite, port 3099) — imports directly from source
3. **Build portable** with `node scripts/build-portable.mjs` (generates to sync targets)
4. **Sync** with `npm run sync:builder` or `npm run sync:skill`
5. **Validate** in the target platform's preview

See `component-constraints.md` for the rules that keep source portable. See `vibe-conversion.md` for the current WCP component conversion work.
