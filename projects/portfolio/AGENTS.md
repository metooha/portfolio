# Portfolio Agent Rules

**This project composes UI from Living Design components in `src/app/components/`.** Before creating anything new, search that directory. Priority: reuse → compose → create (last resort).

## Required Reading — Follow IN ORDER

Before writing UI code for this project, read these files in `agent-context/`:

1. **`project-overview.md`** — Project structure, import paths (`@/app/components/`), tiers (core / patterns / pages), dev commands.
2. **`core-adherence.md`** — Raw HTML → LD component mapping, API patterns (`TextField`, `Button`, `Link`), SharedForm integration, verification checklist.
3. **`page-migration.md`** — Which pages still need migration, phased plan, per-file replacement table.

For LD token/CSS authoring and component structure, also see:

- `notes/ld-kit-agent-kits/agent-context/living-design-system.md`
- `notes/ld-kit-agent-kits/agent-context/component-constraints.md`

For file naming: `.cursor/skills/portfolio-naming-convention/SKILL.md` (repo root).

## Quick Constraints

- Import from `@/app/components/<Name>/<Name>` or `@/app/components` barrel
- Never raw `<button>`, `<input>`, `<textarea>`, `<select>` in pages when LD core exists
- Never `lucide-react` in `src/app/pages/`, `src/app/auth/`, `header.tsx`, `footer.tsx`
- Internal routes: `react-router-dom` `Link`; external URLs: LD `Link`
- After UI changes: `pnpm run build` from `projects/portfolio/`

## Case Study Skills

Mirrored under `.cursor/skills/` and `.claude/skills/` (same content, both
agents):

| Skill | Use for |
|-------|---------|
| `case-study-create` | Building a new case study page in the real React app, from scratch |
| `case-study-brief-handoff` | Implementing a case study from a brief pack (`manifest.yaml` / `content/*.md`) |
| `case-study-html-draft` | Storyboarding/pitching a case study as a single static HTML/CSS file *before* any React build |

Saved static-HTML drafts (built via `case-study-html-draft`) live under
`references/case-studies/<slug>/` at the repo root, not in `src/`.

## Cursor Rules

Scoped rules live in `.cursor/rules/`:

| Rule | Scope |
|------|-------|
| `core-adherence.mdc` | Always applies in this project |
| `page-migration.mdc` | When editing `src/app/pages/` or auth/shell files |
