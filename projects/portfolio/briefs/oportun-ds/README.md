# Case study brief: oportun-ds

This folder is a **self-contained brief** for implementing one case study in the portfolio. Fill it, add assets, optionally zip it, then hand it to Cursor (with the `case-study-brief-handoff` skill) or implement manually.

## Fill order

1. **`manifest.yaml`** — Set `caseStudy` copy fields, colors, tags, `navSections` (must match section anchors). Set `routing` to `special` if you need a dedicated page component like Waste Management, or `generic` for template + `ContentComponent` only.
2. **`content/*.md`** — One file per nav section; keep `anchor` in frontmatter aligned with `href` in the manifest (`#overview` → `overview`).
3. **`assets/`** — Add `hero`, `thumbnail`, and section images; update `assets:` entries in the manifest.
4. **`HANDOFF_CHECKLIST.md`** — Follow at implementation time in the portfolio repo.

## Zipping

From `portfolio/briefs` (parent of this folder):

```bash
zip -r oportun-ds-case-study-brief.zip oportun-ds/
```

After scaffolding, `oportun-ds` matches the folder name (e.g. `acme-platform-case-study-brief.zip`).

## Reference implementation

In the portfolio repo, the Waste Management study is the richest example:

- [`src/app/components/case-studies/wm-rebrand/WmDesignSystemCaseStudy.tsx`](../src/app/components/case-studies/wm-rebrand/WmDesignSystemCaseStudy.tsx)
- Config entry with `id: "1"` in [`src/app/data/case-studies-config.ts`](../src/app/data/case-studies-config.ts)
- `PageComponent` on config entry in [`src/app/data/case-studies-config.ts`](../src/app/data/case-studies-config.ts)
