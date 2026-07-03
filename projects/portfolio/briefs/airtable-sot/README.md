# Case study brief: airtable-sot

This folder is a **self-contained brief** for implementing one case study in the portfolio. Fill it, add assets, optionally zip it, then hand it to Cursor (with the `case-study-brief-handoff` skill) or implement manually.

## Fill order

1. **`manifest.yaml`** — Set `caseStudy` copy fields, colors, tags, `navSections` (must match section anchors). Set `routing` to `special` if you need a dedicated page component like Waste Management, or `generic` for template + `ContentComponent` only.
2. **`content/*.md`** — One file per nav section; keep `anchor` in frontmatter aligned with `href` in the manifest (`#overview` → `overview`).
3. **`assets/`** — Add `hero`, `thumbnail`, and section images; update `assets:` entries in the manifest.
4. **`HANDOFF_CHECKLIST.md`** — Follow at implementation time in the portfolio repo.

## Zipping

From `portfolio/briefs` (parent of this folder):

```bash
zip -r airtable-sot-case-study-brief.zip airtable-sot/
```

After scaffolding, `airtable-sot` matches the folder name (e.g. `acme-platform-case-study-brief.zip`).

## Reference implementation

In the portfolio repo, the Waste Management study is the richest example:

- [`src/imports/WmDesignSystem2026.tsx`](../src/imports/WmDesignSystem2026.tsx)
- Config entry with `id: "1"` in [`src/data/case-studies-config.ts`](../src/data/case-studies-config.ts)
- Special route in [`src/app/pages/case-study-page.tsx`](../src/app/pages/case-study-page.tsx)
