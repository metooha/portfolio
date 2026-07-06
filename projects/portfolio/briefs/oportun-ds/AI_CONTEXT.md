# AI context: implement case study `oportun-ds`

Use this file when implementing the brief in the **portfolio** project (`projects/portfolio`). Do not assume MD renders at runtime; **produce React/TSX** (and asset wiring) as the shipping surface.

## Goal

Ship a case study page that matches the **Waste Management** pattern when `routing: special` in `manifest.yaml`: one primary component (e.g. `OportunDsCaseStudy`) that wraps `CaseStudyTemplate`, supplies hero/overview/meta/nav from manifest data, and contains rich static sections with many images—similar depth to [`src/app/components/case-studies/wm-rebrand/WmDesignSystemCaseStudy.tsx`](../src/app/components/case-studies/wm-rebrand/WmDesignSystemCaseStudy.tsx).

If `routing: generic`, implement `ContentComponent` only and rely on [`CaseStudyTemplatePage`](../src/app/pages/case-study-page.tsx) for the shell (like Hover/Xense).

## Source files in this brief

| Brief file | Use |
|------------|-----|
| `manifest.yaml` | Authoritative copy for `CaseStudyConfig` fields; `navSections`, colors, hero paths. |
| `content/*.md` | Narrative, lists, tables; `asset:id` image references must map to real imports. |
| `assets/` | Copy into `src/app/assets/` (or align with existing `figma:asset/<hash>.png` convention if merging Figma output). |

## Portfolio targets

| Brief concept | Code location |
|---------------|---------------|
| Case study list / home card metadata | [`src/app/data/case-studies-config.ts`](../src/app/data/case-studies-config.ts) — extend `CASE_STUDIES`, export if needed. |
| Route ` /case-study/:id` | [`src/app/pages/case-study-page.tsx`](../src/app/pages/case-study-page.tsx). |
| Shared page chrome | [`src/app/components/CaseStudyTemplate.tsx`](../src/app/components/CaseStudyTemplate.tsx). |
| WM-style building blocks | Reuse imports from WM: `CaseStudyHero`, `CaseStudyPageNav`, `CaseStudyMeta`, `SectionHeading`, `BulletList`, `ValuePropCard` / `ValuePropGrid`, `ComparisonSlider`, etc. (see top of `WmDesignSystemCaseStudy.tsx`). |

## Implementation paths (choose one per project)

1. **Figma → React export**  
   Export TSX from Figma Make/dev mode, then **merge** into the portfolio: wrap with `CaseStudyTemplate`, replace absolute layout where needed with responsive patterns, normalize imports to `figma:asset/...` or `@/app/assets/...` per project conventions.

2. **Compose from brief assets**  
   Build TSX manually from `content/*.md` + files in `assets/`. Map each `![alt](asset:some-id)` to an imported image; preserve section order and anchors.

## Anchors and nav

Every `navSections[].href` in `manifest.yaml` (e.g. `#system-audit`) must have a matching **`id`** on a wrapper in TSX (e.g. `id="system-audit"`). The overview block is usually `#overview`. Mismatches break sticky nav.

## Responsive behavior

Follow [`notes/docs/RESPONSIVE-GUIDELINES.md`](../../../notes/docs/RESPONSIVE-GUIDELINES.md): fluid typography, responsive grids, `min-w-0` on flex children, avoid fixed multi-column desktop-only layouts without breakpoints.

## Config mapping (`manifest.yaml` → TypeScript)

- `caseStudy.id`, `path`, `title`, `shortDescription`, `fullDescription`, `cardTitle`, `cardDescription` → same keys on `CaseStudyConfig`.
- `metaItems` → `metaItems: { label, value }[]`.
- `navSections` → `navSections: { label, href }[]`.
- `navAccentColor`, `tags`, `overviewClient`, `overviewCategory` → direct.
- `heroType` + `heroAsset` / `thumbnailAsset` → after copying assets, use `figma:asset/...` or `import x from '@/app/assets/...'` as elsewhere in the repo; set `heroImage` / `thumbnail` on config for cards and prev/next.
- For WM-style `special` routes, set `PageComponent` on the config entry; keep **titles and thumbnails** in sync.

## Checklist

Execute steps in `HANDOFF_CHECKLIST.md` in order and verify `npm run dev` with no broken imports.
