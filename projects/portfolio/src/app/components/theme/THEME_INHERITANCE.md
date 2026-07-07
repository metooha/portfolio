# Theme Inheritance Model

## Overview

This theme system follows the Airtable / LD Kit inheritance structure: **LD Base** holds the complete token set; every other theme declares **only what it overrides**. CSS cascade handles the rest.

See also: `client/styles/themes/THEME_INHERITANCE.md` in the Theme Editor reference project.

## Inheritance Tree

```
LD Base (:root / base-tokens.css)
│
├─→ Walmart              (minimal — mostly inherits base)
├─→ Walmart B2B          (semantic overrides + WCP tokens)
├─→ Walmart Legacy
├─→ Sam's Club
├─→ Sam's Club Maverick
├─→ Bodega
├─→ Cashi MX
│
└─→ Client themes (override-only files)
    ├─→ Portfolio
    ├─→ WM
    ├─→ Oportun
    ├─→ Xense
    └─→ Carbon
```

## How It Works in This Repo

### 1. LD Base (always loaded)

`base-tokens.css` on `:root` — complete primitive + semantic token set (~95KB equivalent).

### 2. Theme overrides (loaded after base)

Each `[data-ld-theme="…"]` block in `brands/*.css`, `portfolio.css`, etc. declares **only tokens that differ** from LD Base.

Example — Walmart B2B (~40 lines, not 800):

```css
[data-ld-theme="Walmart B2B"] {
  --ld-semantic-color-action-fill-primary: #002e99;
  --ld-semantic-color-text-brand: #001e60;
  /* … ~30 more semantic overrides … */
}
```

Example — Portfolio (~50 lines of primitive overrides + nav semantics):

```css
[data-ld-theme="Portfolio"] {
  --ld-primitive-font-family-sans: 'Inter', …;
  /* blue scale overrides only */
  --ld-primitive-color-blue-100: #4f39f6;
  /* spark inherits LD Base (#ffc220) — never overridden per theme */
  /* … semantic nav overrides … */
}
```

### 3. CSS load order (`index.css`)

```css
@import './base-tokens.css';      /* LD Base — always */
@import './brands/walmart.css';   /* Official overrides */
@import './brands/sams-club.css';
@import './portfolio.css';        /* Client themes last */
```

### 4. Theme Editor / Palette Generator preview

Because `<html>` runs `data-ld-theme="Portfolio"`, preview scopes inject layers explicitly:

1. **LD Base primitives** (isolates from Portfolio parent)
2. **Theme primitive overrides** (delta from `theme-primitives.ts`)
3. **Theme semantic overrides**
4. Seed derivations + user token overrides

This mirrors the CSS cascade without duplicating 800-line theme files.

## Token Prefixes

| Prefix | Scope |
|--------|--------|
| `ld-` | Living Design 3.5 — all themes |
| `wcp-` | Walmart Commerce Platform — Walmart, B2B |

## Quick Reference

| Theme | Inherits | Brand / special |
|-------|----------|-----------------|
| Walmart | LD Base | Blue `#0053e2`, spark `#ffc220` |
| Sam's Club | LD Base | Blue `#0062ad`, Gibson (spark inherits base) |
| Sam's Maverick | LD Base | Blue `#0a6cff` |
| Walmart B2B | LD Base | Navy `#002e99`, semantic-only |
| Portfolio | LD Base | Purple `#4f39f6`, indigo spark |
| WM | LD Base | Green `#006937` |
| Xense | LD Base | Dark mode, mint green `#0bfc06` |
| Carbon | LD Base | Blue `#2a0eff`, dark nav |

## Regenerating client themes

```bash
cd projects/portfolio && node scripts/generate-brand-theme-css.mjs
```

Emits override-only CSS + `theme-primitives.ts` (base + delta maps).

## Rule of Thumb

If a generated theme file exceeds **~150 lines**, it is probably duplicating base instead of inheriting.
