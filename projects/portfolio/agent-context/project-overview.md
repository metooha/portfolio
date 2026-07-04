# Portfolio Project Overview

## What This Project Is

Amy Ha's portfolio site — a React + Vite app showcasing case studies, about/contact pages, and admin tools (dashboard, theme editor, component library). UI is built with **Living Design (LD)** components migrated from `ld-kit-agent-kits` into `src/app/components/`.

## Component Tiers

| Tier | Location | Purpose |
|------|----------|---------|
| **Core (LD primitives)** | `src/app/components/<Name>/` | Design-system atoms and molecules: `Button`, `TextField`, `TextArea`, `Select`, `Checkbox`, `Link`, `DataTable`, etc. |
| **Patterns & layout** | `src/app/components/patterns/`, `layout/`, portfolio-specific | Composed sections: `Accordion`, `SharedForm`, `PageContainer`, `CaseStudyTemplate`, `CaseStudyCard` |
| **Pages** | `src/app/pages/` | Route-level modules. Compose from core + patterns — no raw form primitives. |
| **Auth & shell** | `src/app/auth/`, `header.tsx`, `footer.tsx` | Same rules as pages: use LD components. |
| **Component library showcase** | `src/component-library/` | Admin-only demo pages; already import from `@/app/components/`. |
| **Case studies** | `src/app/components/case-studies/` | Full-page case study components (WM rebrand, Everyday Sans, Airtable, heroes). Defer LD migration of WM monolith unless doing a dedicated refactor. |

## Import Convention

The `@` alias maps to `src/` (see `vite.config.ts`).

```tsx
// Core component (direct import — preferred for tree-shaking)
import { Button } from '@/app/components/Button/Button';
import { TextField } from '@/app/components/TextField/TextField';

// Barrel import (when exported from index.ts)
import { Button, Tag, DataTable } from '@/app/components';

// Layout / portfolio patterns
import { PageContainer } from '@/app/components/layout';
import { Accordion, AccordionItem } from '@/app/components/patterns/Accordion';

// Icons — never lucide-react in pages/auth/header
import { LockIcon, ChevronLeftIcon } from '@/app/components/Icons/Icons';
```

**Internal SPA routes:** keep `Link` from `react-router-dom` for in-app navigation (`/about`, `/contact`). LD `Link` is for external `href` only.

## Project Structure

```
projects/portfolio/
├── src/
│   ├── app/
│   │   ├── components/       ← LD core + patterns (canonical UI source)
│   │   │   ├── Button/
│   │   │   ├── TextField/
│   │   │   ├── patterns/
│   │   │   ├── layout/
│   │   │   ├── theme/        ← LD theme CSS
│   │   │   └── index.ts      ← Barrel exports
│   │   ├── pages/            ← Route pages (compose components here)
│   │   ├── auth/             ← Login, password gates
│   │   ├── components/case-studies/  ← Full-page case study components
│   │   └── assets/
│   ├── component-library/    ← Admin showcase pages
│   └── main.tsx
├── agent-context/            ← Agent instruction docs (this folder)
├── AGENTS.md                 ← Slim router — read first
└── .cursor/rules/            ← Cursor rule files (.mdc)
```

## Theming

- Theme CSS: `src/app/components/theme/index.css`
- Runtime theme manager: `src/app/components/utils/themeManager.ts`
- LD components expect a themed subtree (`data-ld-theme` on an ancestor)
- Theme editor route: `/theme-editor`

For LD token and CSS authoring details, see `notes/ld-kit-agent-kits/agent-context/living-design-system.md`.

## Development Commands

From `projects/portfolio/`:

```bash
pnpm run dev       # Vite dev server
pnpm run build     # Production build (required after UI changes)
pnpm run preview   # Preview production build
```

## Related Reference Docs

| Doc | Location |
|-----|----------|
| Core adherence (raw HTML → LD) | `agent-context/core-adherence.md` |
| Page migration plan | `agent-context/page-migration.md` |
| LD component authoring | `notes/ld-kit-agent-kits/agent-context/living-design-system.md` |
| LD portable constraints | `notes/ld-kit-agent-kits/agent-context/component-constraints.md` |
| Portfolio naming | `.cursor/skills/portfolio-naming-convention/SKILL.md` (repo root) |
