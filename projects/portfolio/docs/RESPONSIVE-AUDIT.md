# Responsive layout audit

## 1. Key entry points

| Route / Page | File | Notes |
|--------------|------|--------|
| Home | `app/pages/home.tsx` | Hero, skills pills, case study cards |
| About | `app/pages/about.tsx` | Hero, experience, timeline, values, hobbies |
| Contact | `app/pages/contact.tsx` | Two-column grid, form |
| Case studies | `app/pages/case-study-page.tsx` | Single route `/case-study/:id`; id 1 = `WmDesignSystem2026`, ids 2–4 = `CaseStudyTemplate` + `case-studies-config.ts` |
| Other work | `app/pages/other-work.tsx`, `app/pages/other-work-detail.tsx` | List/detail |

**WmDesignSystem2026** is rendered by `case-study-page.tsx` when `id === "1"`. The design system component is a large single file (`imports/WmDesignSystem2026.tsx`) with many fixed-width sections, comparison panels, and value-prop rows.

## 2. Non-responsive patterns found

### 2.1 Fixed widths and heights (magic numbers)

- **about.tsx**: Hero image `w-[600px]` (no max-w-full); main content section uses `px-4 md:px-[68px]` with redundant overrides (`pt-[0px] md:pr-[68px] pb-[100px] md:pl-[68px] pr-[0px] pl-[0px]`).
- **home.tsx**: Hero text uses `text-[90px]` / `text-[80px]` (not responsive); container `px-4 md:px-[68px]`.
- **contact.tsx**: Uses `max-w-7xl mx-auto` and `grid md:grid-cols-2` (good); padding `px-4 md:px-[68px]`.
- **WmDesignSystem2026.tsx**: ~210+ instances of `w-[Npx]`, `h-[Npx]`, `min-w-[Npx]`, `max-w-[Npx]` (e.g. `w-[1180px]`, `w-[587px]`, `w-[1184px]`, `COMPARISON_FRAME_H` 700px). Comparison frames and scrollable panels use fixed pixel dimensions. Rows with fixed widths (e.g. `w-[574px]`, `w-[647px]`) will overflow on narrow viewports.

### 2.2 Rigid flex and non-wrapping layouts

- **WmDesignSystem2026.tsx**: Many `flex-[1_0_0]` and `min-w-px min-h-px` patterns that prevent flex children from shrinking. One explicit `flex-nowrap` (Row 1 around line 1898). Rows using `flex` without `flex-wrap` and with `shrink-0 w-[Npx]` children cause horizontal overflow.
- **about.tsx**: Timeline strip uses `flex justify-start` with `min-w-[200px]` cards—acceptable but horizontal scroll on small screens is intentional for that section. Hero grid uses `grid md:grid-cols-2` (good).
- **home.tsx**: Hero paragraph uses `flex flex-wrap` (good); skills use `flex flex-wrap` (good).

### 2.3 Absolute positioning for layout

- **about.tsx**: Hero wavy border uses `absolute bottom-0` (decoration, OK). No other layout-critical absolute positioning in pages.
- **WmDesignSystem2026.tsx**: Comparison components use absolute positioning for left/right panels and caret. Design panel (`DesignPanelProperties`) uses `absolute -left-10`. Callouts use absolute pixel positions (`left-[180px] top-[460px]`, etc.)—problematic on small viewports. Many inner sections use absolute for overlay/content stacking rather than full-page layout.

### 2.4 Breakpoints to validate

- **&lt; 375px**: Small phones—hero typography (home, about), single-column stacking, no horizontal scroll on body.
- **375–767px**: Large phones—padding consistency (`px-4`), image scaling (about hero image, contact), timeline horizontal scroll acceptable.
- **768px (md)**: Tablet—two-column grids kick in (about hero, contact), `px-[68px]` applied; WmDesignSystem case study likely still fixed width.
- **1024px (lg)**: Desktop—full layouts; comparison panels 1180px need to either scale or get max-w-full.
- **1280–1440px**: Large desktop—max-width containers (e.g. max-w-7xl) prevent over-wide content.

## 3. Summary

- **Pages**: About has the most layout complexity (hero, timeline, sections with inconsistent padding). Home has oversized hero type. Contact is in good shape. Case study page is dominated by WmDesignSystem2026’s fixed-width layout.
- **WmDesignSystem2026**: Highest impact. Fix value-prop/section rows (flex-wrap, min-w-0, responsive widths), comparison frame (max-w-full, responsive height), and callout/panel positions where they break on small screens.
- **Consistent padding**: Standardize on `px-4 md:px-6 lg:px-8` or `px-4 md:px-[68px]` and remove redundant overrides (e.g. about.tsx main section).
