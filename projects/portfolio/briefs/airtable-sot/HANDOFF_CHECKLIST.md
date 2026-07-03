# Handoff checklist: `airtable-sot` → portfolio

Work in `projects/portfolio`. Check boxes as you go.

## 0. Read the brief

- [ ] Open `manifest.yaml` and confirm `routing`, `caseStudy.id`, and `navSections` match the story you are shipping.
- [ ] Skim all `content/*.md` files and note every `asset:…` reference and layout note.

## 1. Assets

- [ ] Copy brief `assets/` files into `src/assets/` (or adopt `figma:asset/<hash>.png` names if supplied by a Figma export pipeline).
- [ ] Ensure hero and thumbnail used on the home case study card resolve in dev (Vite + [`figma:asset` plugin](../vite.config.ts) if applicable).
- [ ] Add alt text from manifest `assets[].alt` or from markdown.

## 2. Main component

- [ ] Create `src/imports/AirtableSotCaseStudy.tsx` (or merge exported code into that path).
- [ ] Use `CaseStudyTemplate` with `hero`, `overviewTitle` (= `caseStudy.title` or dedicated hero title), `overviewDescription` (= `fullDescription`), `metaItems`, `navSections`, `navAccentColor`, `overviewClient`, `overviewCategory` from `manifest.yaml`.
- [ ] Implement body sections; each `navSections` target must exist as `id="<anchor>"` (without `#`).
- [ ] Reuse shared components (see `WmDesignSystem2026.tsx` imports) instead of duplicating primitives.
- [ ] Apply responsive patterns per `docs/RESPONSIVE-GUIDELINES.md`.

## 3. Config

- [ ] Add or update an entry in `src/data/case-studies-config.ts` `CASE_STUDIES` array:
  - All required `CaseStudyConfig` fields.
  - Imports for `heroImage` and `thumbnail`.
  - `ContentComponent`: real component for `generic` routing; for `special` (WM-style), a no-op stub is acceptable if the route renders the full page component (match existing id `1` pattern).
- [ ] Confirm card copy (`cardTitle`, `cardDescription`, `shortDescription`) matches marketing intent.

## 4. Routing

- [ ] **`routing: generic`**: ensure `case-study-page.tsx` uses `CaseStudyTemplatePage` for this id (no new branch).
- [ ] **`routing: special`**: add a branch in `case-study-page.tsx` that returns `<AirtableSotCaseStudy />` for this `id` (mirror `id === "1"`).

## 5. Prev / next and home

- [ ] Confirm `getAdjacentCaseStudies` order in `case-studies-config.ts` includes the new entry in the desired sequence.
- [ ] Load home and navigate prev/next; thumbnails and titles look correct.

## 6. Verify

- [ ] `npm run dev` — case study page scrolls; nav clicks scroll to sections.
- [ ] Spot-check breakpoints ~320, 768, 1280 per responsive guidelines.
- [ ] `npm run build` succeeds.

---

## Manifest field reference (schema)

| `manifest.yaml` path | `CaseStudyConfig` / code |
|----------------------|---------------------------|
| `routing` | `special` → extra branch in `case-study-page.tsx`; `generic` → template page only |
| `componentName` | React file name in `src/imports/` |
| `caseStudy.id` | `id` string |
| `caseStudy.path` | `path` (usually `/case-study/{id}`) |
| `caseStudy.title` | `title`, `overviewTitle` in template |
| `caseStudy.cardTitle` | `cardTitle` optional |
| `caseStudy.shortDescription` | `shortDescription` |
| `caseStudy.cardDescription` | `cardDescription` optional |
| `caseStudy.fullDescription` | `fullDescription` / overview body |
| `caseStudy.navAccentColor` | `navAccentColor` |
| `caseStudy.tags` | `tags` |
| `caseStudy.heroType` | `heroType` |
| `caseStudy.heroAsset` | becomes `heroImage` import |
| `caseStudy.thumbnailAsset` | becomes `thumbnail` import |
| `caseStudy.overviewClient` | `overviewClient` |
| `caseStudy.overviewCategory` | `overviewCategory` |
| `metaItems` | `metaItems` |
| `navSections` | `navSections` (labels + `href` with `#` anchors) |
