# Case study brief template

This folder defines a **zip-friendly brief pack** for new portfolio case studies that match the depth and layout style of the Waste Management study ([`src/app/components/case-studies/wm-rebrand/WmDesignSystemCaseStudy.tsx`](../../src/app/components/case-studies/wm-rebrand/WmDesignSystemCaseStudy.tsx)): long-form React content, `CaseStudyTemplate`, shared UI building blocks, and many assets.

## Quick start

From the `portfolio` directory:

```bash
npm run new-case-study-brief <kebab-slug> [caseStudyId]
```

Example:

```bash
npm run new-case-study-brief acme-platform 5
```

This copies `_template/` to `briefs/<kebab-slug>/` and substitutes placeholders. Edit `manifest.yaml` (especially `id` if you did not pass it), fill `content/*.md`, add files under `assets/`, then zip `briefs/<slug>/` or point Cursor at that folder.

## Layout

| Path | Role |
|------|------|
| [`_template/`](_template/) | Master copy used by the scaffold script; treat each generated `briefs/<slug>/` as a disposable or versioned working pack. |
| `_template/manifest.yaml` | Maps to `CaseStudyConfig` in [`src/app/data/case-studies-config.ts`](../../src/app/data/case-studies-config.ts). |
| `_template/content/` | One markdown file per nav section; copy source for narrative and image references. |
| `_template/assets/` | Binary exports; see `assets/README.md` for naming. |

## Cursor

The project skill **`case-study-brief-handoff`** (in [`.cursor/skills/case-study-brief-handoff/`](../../.cursor/skills/case-study-brief-handoff/SKILL.md)) tells the agent to implement a brief using [`_template/HANDOFF_CHECKLIST.md`](_template/HANDOFF_CHECKLIST.md) (or the same file in a generated `briefs/<slug>/` folder).

## Scope reminder

This workflow is **briefing + hand implementation** in the repo. There is no MDX runtime and no CI codegen step; the app still ships React/TSX and static assets as today.
