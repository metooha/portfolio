# Core Component Adherence Rules

When and how to use LD core components instead of raw HTML. Pages (`src/app/pages/`), auth (`src/app/auth/`), and shell components (`header.tsx`, `footer.tsx`) must prefer LD equivalents so styling, accessibility, and theming stay consistent.

Adapted from `notes/ld-kit-agent-kits/agent-context/core-adherence.md` for this portfolio's paths.

---

## 1. Core vs. Patterns vs. Raw HTML

| Tier | Location | Purpose |
|------|----------|---------|
| **Core** | `src/app/components/<Name>/` | LD primitives: TextField, TextArea, Select, Button, Checkbox, Link, etc. |
| **Patterns** | `src/app/components/patterns/`, `layout/` | Compound components: Accordion, SharedForm, PageContainer, CaseStudyTemplate |
| **Pages** | `src/app/pages/` | Compose from core + patterns |

### The rule

**Never use raw HTML form elements (`<input>`, `<textarea>`, `<select>`, `<button>`) when an LD core component exists for the same purpose.**

| Raw HTML | LD Replacement | Import |
|----------|----------------|--------|
| `<input type="text\|email\|password\|…">` | `TextField` | `@/app/components/TextField/TextField` |
| `<textarea>` | `TextArea` | `@/app/components/TextArea/TextArea` |
| `<select>` | `Select` or `SelectDropdown` | `@/app/components/Select/Select` |
| `<input type="checkbox">` | `Checkbox` | `@/app/components/Checkbox/Checkbox` |
| `<input type="radio">` | `Radio` / `RadioGroup` | `@/app/components/Radio/Radio` |
| `<button>` | `Button` or `IconButton` | `@/app/components/Button/Button` |
| `<a href="https://…">` (external) | `Link` | `@/app/components/Link/Link` |
| `<label>` for form fields | Built into core components | — |

### Exceptions

Raw HTML is acceptable when:

- Structural/non-form purpose (hidden `<input type="file">` for upload triggers)
- No LD equivalent exists
- Inside a core component's own implementation
- **Internal SPA navigation** — `Link` from `react-router-dom` for `/about`, `/contact`, etc.

### Do not use in pages/auth/header

- `lucide-react` — use `@/app/components/Icons/Icons`
- `@mui/*`, `@radix-ui/*` directly in page files
- Tailwind-only buttons/inputs that duplicate LD primitives

---

## 2. Core Component API Patterns

LD form components are self-contained: each manages label, error, helper text, and a11y internally.

### TextField

```tsx
<TextField
  label="Admin password"
  value={password}
  onChange={(event) => setPassword(event.target.value)}
  type="password"
  size="small"
  error={error || undefined}
  textFieldProps={{
    id: 'admin-password',
    autoComplete: 'current-password',
  }}
/>
```

### TextArea

```tsx
<TextArea
  label="Message"
  value={message}
  onChange={(event) => setMessage(event.target.value)}
  size="small"
  textAreaProps={{ name: 'message', rows: 6 }}
/>
```

### Button

```tsx
<Button variant="primary" size="medium" type="submit">
  Sign in
</Button>

<Button variant="secondary" size="medium" onClick={handleCancel}>
  Cancel
</Button>
```

### Link (external only)

```tsx
<Link href="https://www.linkedin.com/in/haamy/" target="_blank">
  LinkedIn
</Link>
```

### Key API characteristics

- **`label`** — core form components render their own label via `FormLabel`
- **`error`** — shows error state + message; do not render a separate red `<p>` unless using `ErrorMessage` standalone
- **`helperText`** — descriptive text below the field
- **Inner props** — route `name`, `placeholder`, `onBlur`, `autoComplete` through `textFieldProps`, `textAreaProps`, or `selectProps`
- **`onChange`** — top-level prop on core components

---

## 3. Composing with SharedForm

When using `src/app/components/patterns/SharedForm/`:

**For LD core components inside FormControl:**

```tsx
<FormField name="email">
  <FormItem>
    <FormControl>
      <TextField
        label="Email"
        type="email"
        onChange={() => {}}
        textFieldProps={{ placeholder: 'Enter your email' }}
      />
    </FormControl>
  </FormItem>
</FormField>
```

**Incorrect — raw HTML:**

```tsx
<FormControl>
  <input type="email" placeholder="Enter your email" />
</FormControl>
```

Rules:

1. Pass `value` as a controlled prop
2. Pass `error` to the core component, not a separate error element
3. Route `name` and `onBlur` through inner-element props
4. Do not duplicate label/error rendering

---

## 4. Page-Level Usage

### Correct

```tsx
import { Button } from '@/app/components/Button/Button';
import { TextField } from '@/app/components/TextField/TextField';
import { PageContainer } from '@/app/components/layout';

export function Login() {
  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Admin password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
        />
        <Button variant="primary" size="medium" type="submit">
          Sign in
        </Button>
      </form>
    </PageContainer>
  );
}
```

### Incorrect

```tsx
<label htmlFor="admin-password">Admin password</label>
<input id="admin-password" type="password" className="rounded-md border …" />
<button type="submit" className="bg-indigo-600 …">Sign in</button>
```

---

## 5. Verification Checklist

Before considering a UI change complete:

- [ ] No raw `<input>`, `<textarea>`, `<select>`, or styled `<button>` where LD core exists
- [ ] Core components receive `label`, `error`, `helperText` as props
- [ ] `value` is controlled on form components
- [ ] `name` / `onBlur` routed through inner-element props
- [ ] No `lucide-react` in pages, auth, header, footer
- [ ] `pnpm run build` passes from `projects/portfolio/`

### Quick grep checks

```sh
cd projects/portfolio

# Should be empty or justified in pages
rg '<input\b|<textarea\b|<select\b|<button\b' src/app/pages/ --glob '*.tsx'
rg 'from ["\']lucide-react' src/app/pages/ src/app/auth/ src/app/components/header.tsx

# Should find LD imports in migrated pages
rg 'TextField|TextArea|Button' src/app/pages/login.tsx
```

---

## 6. Core Component Inventory

Available in `src/app/components/` (see also `index.ts`):

| Component | Replaces | Key props |
|-----------|----------|-----------|
| `TextField` | `<input type="text\|email\|password\|…">` | `label`, `value`, `onChange`, `error`, `helperText`, `type`, `size`, `textFieldProps` |
| `TextArea` | `<textarea>` | `label`, `value`, `onChange`, `error`, `maxLength`, `textAreaProps` |
| `Select` | `<select>` | `label`, `value`, `onChange`, `selectProps`, `children` |
| `Checkbox` | `<input type="checkbox">` | `label`, `checked`, `onChange` |
| `Radio` | `<input type="radio">` | `label`, `checked`, `onChange` |
| `Button` | `<button>` | `variant`, `size`, `isLoading`, `leading`, `trailing` |
| `IconButton` | icon `<button>` | `a11yLabel`, `size`, `children` (icon) |
| `Link` | external `<a>` | `href`, `target`, `children` |
| `LinkButton` | button-styled link | `href` or button props |
| `Tag` | styled pill `<span>` | `variant`, `size`, `children` |
| `DataTable` | raw `<table>` | composable head/body/row/cell exports |
| `ErrorMessage` | error `<p>` | standalone error display |
| `Body`, `Heading` | unstyled text | `@/app/components/Text/Text` |

When a core equivalent exists, always prefer it over raw HTML.
