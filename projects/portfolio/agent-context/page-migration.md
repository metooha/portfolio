# Page Migration Plan — Raw HTML → LD Components

Migrate all portfolio pages to use only `src/app/components/` primitives. Follow `core-adherence.md` for API patterns.

Run `pnpm run build` from `projects/portfolio/` after each phase.

---

## Status

| File | Status | Replacements |
|------|--------|--------------|
| `src/app/pages/case-study-page.tsx` | OK | Uses `CaseStudyTemplate` |
| `src/app/pages/home.tsx` | OK | `Button`, `Tag`, `Body`/`Heading` |
| `src/app/pages/about.tsx` | OK | `Accordion`, LD `Link` for external links |
| `src/app/pages/contact.tsx` | OK | `TextField`, `TextArea`, `Button`, `Link`, `IconButton`, `SocialIcons` |
| `src/app/pages/login.tsx` | OK | `TextField`, `Button`, `Body`/`Heading` |
| `src/app/pages/dashboard.tsx` | OK | `DataTable`, `TextField`, `Button`, `Tag`, LD icons |
| `src/app/pages/theme-editor.tsx` | OK | `LinkButton` + `ChevronLeftIcon` |
| `src/app/pages/other-work.tsx` | OK | `Card`, `PageContainer`, `Heading`/`Body` |
| `src/app/pages/other-work-detail.tsx` | OK | `LinkButton`, `PageContainer`, `Heading`/`Body` |
| `src/app/components/header.tsx` | OK | `Button`, `IconButton`, `MenuIcon`/`CloseIcon` |
| `src/app/components/footer.tsx` | OK | `Body` |
| `src/app/components/CaseStudyPageNav.tsx` | OK | `LinkButton`, `ChevronLeftIcon`, `Body` |
| `src/app/components/CaseStudyNavigation.tsx` | OK | `LinkButton`, `ChevronLeftIcon`, `Body` |
| `src/app/components/CaseStudyCard.tsx` | OK | No raw form primitives (already compliant) |
| `src/app/components/CaseStudyTemplate.tsx` | OK | No raw form primitives (already compliant) |
| `src/app/auth/page-password-gate.tsx` | OK | `TextField`, `Button`, `LockIcon` |

**Deferred:** `src/app/components/case-studies/wm-rebrand/WmDesignSystemCaseStudy.tsx` (WM monolith) — left unchanged for LD migration.

**Guardrail:** `pnpm run lint:components` blocks `lucide-react` in pages/auth/header/footer.

---

## Phase 1 — Auth & admin

Highest raw-HTML density; isolated from public design.

### `login.tsx`

```tsx
// Before
<input type="password" … />
<button type="submit">Sign in</button>

// After
<TextField label="Admin password" type="password" value={password} onChange={…} error={error} size="small" … />
<Button variant="primary" size="medium" type="submit">Sign in</Button>
```

### `page-password-gate.tsx`

Same form pattern. Replace lucide `Lock` with `LockIcon` from `@/app/components/Icons/Icons`.

### `dashboard.tsx`

| Raw element | LD replacement |
|-------------|----------------|
| Password `<input>` in table rows | `TextField type="password" size="small"` |
| Save / Remove / Sign out `<button>` | `Button` (`primary` / `secondary`) |
| Admin password form inputs | `TextField` ×3 |
| `<table>` for site pages | `DataTable` + row/cell components |
| lucide icons | `LockIcon`, `ChevronRightIcon`, `SettingsIcon`, etc. |

Keep `react-router-dom` `Link` for page name links in the table.

---

## Phase 2 — Public forms & CTAs

### `contact.tsx`

| Raw element | LD replacement |
|-------------|----------------|
| First / last name inputs | `TextField` ×2 in a grid |
| Email input | `TextField type="email"` |
| Message | `TextArea` |
| Submit | `Button variant="primary"` |
| External `<a href>` | LD `Link` |
| Social lucide icons | Add portfolio icons to `Icons/` or use `IconButton` + custom SVG |

### `home.tsx`

| Raw element | LD replacement |
|-------------|----------------|
| CTA `<button>` inside `Link` | `Button` as child of `react-router-dom` `Link`, or `LinkButton` styled via router wrapper |
| Skill pills `<span>` | `Tag variant="secondary"` (optional — preserve hover animation via `UNSAFE_className`) |

---

## Phase 3 — Content & navigation

### `about.tsx`

- LinkedIn / resume `<a>` → LD `Link href="…" target="_blank"`
- Optional: hero copy → `Body` / `Heading` from `Text/Text`

### `other-work.tsx` / `other-work-detail.tsx`

- Wrap in `PageContainer`
- Card grid → `ContentCard` or `Card`
- Back link → `LinkButton` with `leading={<ChevronLeftIcon />}` inside `react-router-dom` `Link`

### `header.tsx` / `footer.tsx`

- Mobile menu toggle → `IconButton` with `MenuIcon` / `CloseIcon` (or nearest LD icon)
- Nav items → keep `react-router-dom` `Link`; style with LD typography if desired

### `theme-editor.tsx`

- Back link → same pattern as `other-work-detail.tsx`

---

## Phase 4 — Shared portfolio components

Audit and migrate:

- `CaseStudyCard.tsx`
- `CaseStudyTemplate.tsx`
- `CaseStudyNavigation.tsx`
- `CaseStudyPageNav.tsx`

Defer `src/app/components/case-studies/wm-rebrand/` (WM monolith) unless doing a dedicated LD refactor.

---

## Phase 5 — Guardrails

Run from `projects/portfolio/`:

```sh
pnpm run lint:components
```

This script fails if `lucide-react` is imported in `src/app/pages/`, `src/app/auth/`, `header.tsx`, or `footer.tsx`.

---

## Per-file verification

After migrating each file:

1. `pnpm run build`
2. Visual check in dev server
3. Run grep checks from `core-adherence.md`
4. Mark row OK in status table above
