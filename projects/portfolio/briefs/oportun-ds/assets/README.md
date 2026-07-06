# Brief pack assets

Place final exports here before zipping or handing off. After implementation, files typically land in `src/app/assets/` (and may use `figma:asset/<hash>.png` if tied to Figma exports—see Vite config).

## Required (for manifest)

| File | Use |
|------|-----|
| `hero.png` (or `.jpg`) | Hero image when `heroType: image`. |
| `thumbnail.png` | Home card and prev/next thumbnails. |

Paths in `manifest.yaml` should match these names or your chosen extensions.

## Section assets (recommended pattern)

```
assets/sections/<section-slug>--<role>--<nn>.<ext>
```

Examples:

- `sections/overview--hero--01.png`
- `sections/system-audit--grid--01.png`
- `sections/approach--flow--02.jpg`

**section-slug** must match the content filename stem (e.g. `problem-space.md` → `problem-space`).

**role** is a short hint: `hero`, `diagram`, `screen`, `photo`, `annotation`, etc.

**nn** is a zero-padded index when there are multiple in one section.

## Registering in the manifest

List each logical asset under `assets:` in `manifest.yaml` with a stable `id`, `file`, and `alt`. In markdown, reference with:

```markdown
![Descriptive alt](asset:your-id)
```

Implementers map `asset:…` to real imports in React.

## Optional alt table

You can duplicate alts in a small table at the bottom of each `content/*.md` for faster TSX `alt` attributes.
