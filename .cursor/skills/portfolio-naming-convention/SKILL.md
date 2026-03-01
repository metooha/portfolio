---
name: portfolio-naming-convention
description: Naming conventions for portfolio project components, pages, images, and routes. Use when creating or renaming files, components, assets, or pages in the portfolio codebase.
---

# Portfolio Naming Conventions

Apply these conventions when adding or refactoring code in `projects/portfolio/`.

## Pages

| Item | Convention | Example |
|------|------------|---------|
| File name | kebab-case | `case-study.tsx`, `about.tsx`, `other-work-detail.tsx` |
| Component name | PascalCase (matches page purpose) | `CaseStudy`, `About`, `OtherWorkDetail` |
| Export | Named: `export function Name()` | `export function Home() { ... }` |
| Route path | kebab-case, nested with `/` | `/case-study/1`, `/other-work/:id` |

**Rule:** One page component per file. Component name = PascalCase version of the primary route segment.

---

## Components

### App components (`app/components/`)

| Item | Convention | Example |
|------|-------------|---------|
| File name | PascalCase | `CaseStudyTemplate.tsx`, `ValuePropCard.tsx` |
| Component name | PascalCase | Matches filename without extension |
| Export | Named: `export function Name()` | `export function CaseStudyTemplate() { ... }` |

### UI components (`app/components/ui/`)

| Item | Convention | Example |
|------|-------------|---------|
| File name | kebab-case | `button.tsx`, `dropdown-menu.tsx` |
| Component name | PascalCase | Matches shadcn/radix export |
| Export | Barrel: `export { Name, nameVariants }` | `export { Button, buttonVariants }` |

### Layout / shared (`header`, `footer`)

| Item | Convention | Example |
|------|-------------|---------|
| File name | kebab-case | `header.tsx`, `footer.tsx` |

---

## Imports and Figma-generated code

| Item | Convention | Example |
|------|-------------|---------|
| File name | PascalCase for components; `svg-<hash>.ts` for SVG modules | `WmDesignSystem2026.tsx`, `Xense.tsx`, `svg-bny7f.ts` |
| Component export | Default: `export default function Name()` | `export default function WmDesignSystem2026()` |
| Internal helpers | PascalCase, non-exported | `function Frame112() { ... }` |

**Note:** Names like `Frame43`, `Row10`, `Column5` come from Figma exports. Preserve them unless refactoring for clarity. Do not rename generated pieces unnecessarily.

---

## Images and assets

### Import variable names

Use `imgDescriptor` format (camelCase with `img` prefix):

```
img + PascalCase descriptor
```

| Type | Example |
|------|---------|
| By subject | `imgAcademy`, `imgDesign`, `imgXense`, `imgHero` |
| By purpose | `imgConfluenceSprint`, `imgVisualGrid`, `imgJimFish` |

**Avoid:** `academyImage`, `designImage` (use `imgAcademy`, `imgDesign` instead).

### Asset file names (in `src/assets/`)

| Type | Convention | Example |
|------|------------|---------|
| Local images | kebab-case | `jim-fish.png`, `roll-off-dumpster.png`, `recycling-truck.png` |
| Figma imports | Hash (cannot change) | `figma:asset/<sha>.png` |

---

## Routes

| Item | Convention | Example |
|------|-------------|---------|
| Path segments | kebab-case | `/case-study`, `/other-work` |
| Dynamic params | `:paramName` camelCase | `/other-work/:id` |
| Numeric variants | Prefer path over query | `/case-study/1` not `/case-study?id=1` |

---

## Quick reference

```
Pages:        kebab-case.tsx  →  export function PascalCase()
Components:   PascalCase.tsx  →  export function PascalCase()
UI:           kebab-case.tsx  →  export { PascalCase }
Images:       imgDescriptor   →  imgAcademy, imgDesign
Routes:       /kebab-case/1   →  /case-study/1
```
