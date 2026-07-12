---
name: case-study-brief-handoff
description: >-
  Implements a portfolio case study from a brief pack (manifest.yaml, content/*.md,
  assets). Use when the user attaches or mentions a case study brief folder or zip,
  or paths under portfolio/briefs/ or portfolio/templates/case-study-brief.
---

# Case study brief handoff (portfolio)

## When to use

The user provides a **case study brief** folder containing:

- `manifest.yaml`
- `content/*.md`
- `assets/` (and `README.md`, `AI_CONTEXT.md`, `HANDOFF_CHECKLIST.md`)

The brief may live at `projects/portfolio/briefs/<slug>/` (after `npm run new-case-study-brief`) or be unzipped anywhere the user attaches it.

## Instructions

1. **Read** `manifest.yaml` and `AI_CONTEXT.md` in the brief folder first.
2. **Follow** `HANDOFF_CHECKLIST.md` in **strict order** — do not skip routing or config steps.
3. **Target repo**: `projects/portfolio` (paths like `src/app/components/case-studies/<slug>/`, `src/app/data/case-studies-config.ts`, `src/app/pages/case-study-page.tsx`).
4. **Routing**:
   - `routing: special` → set `PageComponent` on the config entry to the main component from `manifest.componentName` (same pattern as `WmDesignSystemCaseStudy` for id `"1"`). No changes to `case-study-page.tsx` needed.
   - `routing: generic` → set `ContentComponent` only; omit `PageComponent`.
5. **Reuse** shared pieces from `WmDesignSystemCaseStudy.tsx` imports (`CaseStudyTemplate`, `SectionHeading`, `BulletList`, `ComparisonSlider`, etc.) for WM-style fidelity.
6. **Anchors**: every `navSections[].href` (`#foo`) must match an element `id="foo"` in the TSX.
7. **Responsive**: align with `notes/docs/RESPONSIVE-GUIDELINES.md`.
8. **Finish** with `npm run dev` and `npm run build` verification when possible.

## Output expectations

- No MDX or runtime markdown — shipping code is **React/TSX** plus asset imports.
- Keep `CaseStudyConfig` consistent with `manifest.yaml` case study fields.

## Reference

Template source and scaffold: `portfolio/templates/case-study-brief/README.md`.
