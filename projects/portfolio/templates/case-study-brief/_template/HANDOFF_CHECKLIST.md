# Handoff checklist: `__BRIEF_SLUG__` → portfolio

Work in `projects/portfolio`. Check boxes as you go.

## 0. Read the brief

- [ ] Open `manifest.yaml` and confirm `routing`, `caseStudy.id`, and `navSections` match the story you are shipping.
- [ ] Skim all `content/*.md` files and note every `asset:…` reference and layout note.

## 1. Assets

- [ ] Copy brief `assets/` files into `src/app/assets/` (or adopt `figma:asset/<hash>.png` names if supplied by a Figma export pipeline).
- [ ] Ensure hero and thumbnail used on the home case study card resolve in dev (Vite + [`figma:asset` plugin](../vite.config.ts) if applicable).
- [ ] Add alt text from manifest `assets[].alt` or from markdown.

## 2. Main component

- [ ] Create `src/app/components/case-studies/<slug>/__COMPONENT_NAME__.tsx` (or merge exported code into that path).
- [ ] Use `CaseStudyTemplate` with `hero`, `overviewTitle` (= `caseStudy.title` or dedicated hero title), `overviewDescription` (= `fullDescription`), `metaItems`, `navSections`, `navAccentColor`, `overviewClient`, `overviewCategory` from `manifest.yaml`.
- [ ] Implement body sections; each `navSections` target must exist as `id="<anchor>"` (without `#`).
- [ ] Reuse shared components (see `WmDesignSystemCaseStudy.tsx` imports) instead of duplicating primitives.
- [ ] Apply responsive patterns per `notes/docs/RESPONSIVE-GUIDELINES.md`.

## 3. Config

- [ ] Add or update an entry in `src/app/data/case-studies-config.ts` `CASE_STUDIES` array:
  - All required `CaseStudyConfig` fields.
  - Imports for `heroImage` and `thumbnail`.
  - `PageComponent`: full page component for `special` routing (WM-style).
  - `ContentComponent`: body component for `generic` routing only.
- [ ] Confirm card copy (`cardTitle`, `cardDescription`, `shortDescription`) matches marketing intent.

## 4. Routing

- [ ] **`routing: generic`**: ensure config has `ContentComponent` and no `PageComponent` (template page renders automatically).
- [ ] **`routing: special`**: set `PageComponent` on the config entry to `<__COMPONENT_NAME__ />` (mirror id `"1"` + `WmDesignSystemCaseStudy`).

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
| `routing` | `special` → `PageComponent` in config; `generic` → `ContentComponent` only |
| `componentName` | React file name in `src/app/components/case-studies/<slug>/` |
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
