# Core Component Adherence Rules

This document defines when and how to use LD core components instead of raw HTML elements. Shared components (`src/components/shared/`) and page-level code (`src/pages/`) must prefer LD core equivalents so that styling, accessibility, theming, and error handling are consistent across the design system.

---

## 1. Core vs. Shared vs. Raw HTML

The component library has three tiers:

| Tier | Location | Purpose |
|------|----------|---------|
| **Core** | `src/components/core/` | LD design-system primitives (TextField, TextArea, Select, Button, Checkbox, etc.). These handle their own labels, errors, helper text, theming, and accessibility. |
| **Shared** | `src/components/shared/` | Higher-level compound components (SharedForm, Accordion, Carousel, etc.) that compose core components and add behavior (state management, validation, animations). |
| **Pages** | `src/pages/` | Demo/showcase pages that import from `src/components/` and render examples. |

### The rule

**Never use raw HTML form elements (`<input>`, `<textarea>`, `<select>`) when an LD core component exists for the same purpose.**

| Raw HTML | LD Core Replacement | Notes |
|----------|-------------------|-------|
| `<input type="text">` | `TextField` | Handles label, error, helperText, size, disabled, readOnly |
| `<input type="email">` | `TextField type="email"` | Same component, different `type` prop |
| `<input type="password">` | `TextField type="password"` | Same component, different `type` prop |
| `<input type="search">` | `TextField type="search"` | Same component, different `type` prop |
| `<input type="tel">` | `TextField type="tel"` | Same component, different `type` prop |
| `<input type="url">` | `TextField type="url"` | Same component, different `type` prop |
| `<input type="number">` | `TextField type="number"` | Same component, different `type` prop |
| `<textarea>` | `TextArea` | Handles label, error, helperText, maxLength with counter |
| `<select>` | `Select` | Handles label, error, helperText, leading icon, caret icon |
| `<input type="checkbox">` | `Checkbox` | Handles label, a11y, indeterminate state |
| `<input type="radio">` | `Radio` / `RadioGroup` | Handles label, a11y, group semantics |
| `<button>` | `Button` | Handles variant, size, loading state, polymorphic anchor/button |
| `<label>` (for form fields) | Built into each core component | Core components render their own `<label>` via `FormLabel` |

### Exceptions

Raw HTML elements are acceptable when:
- The element serves a structural/non-form purpose (e.g., hidden file `<input type="file">` for upload triggers)
- No LD core equivalent exists for that element type
- The element is inside a core component's implementation (core components themselves use raw HTML internally)

---

## 2. Core Component API Patterns

LD core form components follow a self-contained API pattern. Each component manages its own label, error display, helper text, and accessibility internally.

### TextField

```tsx
<TextField
  label="Field Label"
  value={value}
  onChange={handleChange}
  error="Error message"           // Renders error state + message via FormHelperText
  helperText="Descriptive text"   // Renders below the input via FormHelperText
  type="text"                     // "text" | "email" | "password" | "search" | "tel" | "url" | "number"
  size="large"                    // "large" | "small"
  disabled={false}
  readOnly={false}
  leadingIcon={<SearchIcon />}
  trailing={<ClearButton />}
  textFieldProps={{               // Spread onto the inner <input>
    placeholder: 'Enter value',
    name: 'fieldName',
    onBlur: handleBlur,
  }}
/>
```

### TextArea

```tsx
<TextArea
  label="Field Label"
  value={value}
  onChange={handleChange}
  error="Error message"
  helperText="Descriptive text"
  maxLength={200}                 // Enables character counter
  size="large"
  disabled={false}
  readOnly={false}
  textAreaProps={{                 // Spread onto the inner <textarea>
    placeholder: 'Enter text',
    name: 'fieldName',
    rows: 4,
    onBlur: handleBlur,
  }}
/>
```

### Select

```tsx
<Select
  label="Field Label"
  value={value}
  onChange={handleChange}
  error="Error message"
  helperText="Descriptive text"
  size="large"
  disabled={false}
  leadingIcon={<SomeIcon />}
  selectProps={{                   // Spread onto the inner <select>
    name: 'fieldName',
    onBlur: handleBlur,
  }}
>
  <option value="">Choose...</option>
  <option value="a">Option A</option>
</Select>
```

### Key API characteristics

- **`label` is required** — core form components always render their own label via `FormLabel`.
- **`error` prop** — when provided (and component is not disabled/readOnly), the component shows the error state visually and renders the error message via `FormHelperText`.
- **`helperText` prop** — descriptive text rendered below the field. When `error` is present, error takes precedence over helperText.
- **Inner element props** (`textFieldProps`, `textAreaProps`, `selectProps`) — these are spread onto the actual native element inside the component. Use these for `name`, `placeholder`, `onBlur`, `onFocus`, `aria-*` attributes, and other native HTML attributes.
- **`onChange`** — top-level prop, receives the native change event from the inner element.
- **No separate label, description, or message components needed** — these are all built into the core component.

---

## 3. Composing Core Components in Shared Components

When a shared component wraps form inputs (like SharedForm does), it must integrate with core component APIs rather than bypassing them.

### The FormControl integration pattern

SharedForm's `FormControl` uses `React.cloneElement` to inject form state into child components. It detects whether the child is an LD core component (React component, `typeof child.type !== 'string'`) or a native HTML element (string tag name) and adjusts the injected props accordingly:

**For LD core components:**
```tsx
{
  id: formItemId,
  value,                          // Controlled value from form state
  error: errorMessage,            // Error from validation, displayed by the core component
  onChange: handleChange,          // Updates form state, calls original onChange
  textFieldProps: { name, onBlur: handleBlur, ...originalTextFieldProps },
  textAreaProps: { name, onBlur: handleBlur, ...originalTextAreaProps },
  selectProps: { name, onBlur: handleBlur, ...originalSelectProps },
}
```

**For native HTML elements (backward compatibility):**
```tsx
{
  id: formItemId,
  name,
  value,
  onChange: handleChange,
  onBlur: handleBlur,
}
```

### Rules for shared component authors

1. **Pass `value` as a controlled prop.** LD core components are controlled — they require a `value` prop to reflect current state.
2. **Pass `error` to the core component** instead of rendering a separate error message element. The core component handles error display with proper styling and accessibility.
3. **Route `name` and `onBlur` through the inner-element props** (`textFieldProps`, `textAreaProps`, `selectProps`). These must reach the actual `<input>`/`<textarea>`/`<select>` for form submission and touch tracking to work.
4. **Pass `onChange` at the top level.** Core components forward `onChange` to their inner element.
5. **Don't duplicate label/description/error rendering.** When using a core component, its built-in `label`, `helperText`, and `error` props replace the need for separate `SharedFormLabel`, `FormDescription`, and `FormMessage` wrapper components.

---

## 4. Page-Level Usage

Demo pages (`src/pages/`) import from `src/components/` and should use LD core components.

### Correct — using LD core components in SharedForm

```tsx
<FormField name="email" rules={{required: 'Email is required'}}>
  <FormItem>
    <FormControl>
      <TextField
        label="Email"
        type="email"
        onChange={() => {}}
        textFieldProps={{placeholder: 'Enter your email'}}
        helperText="We will use this email for communications."
      />
    </FormControl>
  </FormItem>
</FormField>
```

### Incorrect — using raw HTML elements

```tsx
<FormField name="email" rules={{required: 'Email is required'}}>
  <FormItem>
    <SharedFormLabel>Email</SharedFormLabel>
    <FormControl>
      <input type="email" placeholder="Enter your email" />
    </FormControl>
    <FormDescription>We will use this email for communications.</FormDescription>
    <FormMessage />
  </FormItem>
</FormField>
```

### Why the correct pattern is better

- **Consistent styling**: TextField uses LD design tokens, `FormLabel`, and `FormHelperText` internally — the field looks the same everywhere.
- **Theming**: TextField responds to theme token overrides automatically. A raw `<input>` with inline styles does not.
- **Accessibility**: TextField generates proper `aria-describedby` linking between the input, helper text, and error message. Manual wiring is error-prone.
- **Error display**: TextField's error state includes the exclamation icon, correct color tokens, and screen reader announcements via `VisuallyHidden`.
- **Less boilerplate**: No need for separate `SharedFormLabel`, `FormDescription`, and `FormMessage` components around each field.

---

## 5. Verification Checklist

Before considering a form-related change complete:

- [ ] No raw `<input>`, `<textarea>`, or `<select>` elements where an LD core component exists
- [ ] Core components receive `label`, `error`, and `helperText` props (not rendered via separate wrapper components)
- [ ] `value` is passed as a controlled prop to core components
- [ ] `name` and `onBlur` are routed through inner-element props (`textFieldProps`, `textAreaProps`, `selectProps`)
- [ ] No duplicate label/error/description rendering (core component handles it OR wrapper components handle it — not both)
- [ ] Theme token adherence: no hardcoded brand colors on form field wrappers (use `var(--ld-semantic-color-field-*, fallback)`)
- [ ] Core component `size` prop is used consistently across a form (don't mix `"large"` and `"small"` arbitrarily)

### Quick grep checks

```sh
# Find raw form elements in pages (should be empty or justified)
rg '<input\b' src/pages/ --glob '*.tsx'
rg '<textarea\b' src/pages/ --glob '*.tsx'
rg '<select\b' src/pages/ --glob '*.tsx'

# Find raw form elements in shared components (should be empty or justified)
rg '<input\b' src/components/shared/ --glob '*.tsx'
rg '<textarea\b' src/components/shared/ --glob '*.tsx'
rg '<select\b' src/components/shared/ --glob '*.tsx'

# Verify core components are imported where form fields exist
rg 'TextField|TextArea|Select' src/pages/FormPage.tsx
```

---

## 6. Core Component Inventory

Available LD core form components (in `src/components/core/`):

| Component | Replaces | Key Props |
|-----------|----------|-----------|
| `TextField` | `<input type="text\|email\|password\|search\|tel\|url\|number">` | `label`, `value`, `onChange`, `error`, `helperText`, `type`, `size`, `disabled`, `readOnly`, `leadingIcon`, `trailing`, `textFieldProps` |
| `TextArea` | `<textarea>` | `label`, `value`, `onChange`, `error`, `helperText`, `maxLength`, `size`, `disabled`, `readOnly`, `textAreaProps` |
| `Select` | `<select>` | `label`, `value`, `onChange`, `error`, `helperText`, `size`, `disabled`, `leadingIcon`, `selectProps`, `children` (options) |
| `Checkbox` | `<input type="checkbox">` | `label` or `a11yLabelledBy`, `checked`, `onChange`, `indeterminate`, `disabled` |
| `Radio` | `<input type="radio">` | `label` or `a11yLabelledBy`, `checked`, `onChange`, `disabled` |
| `Button` | `<button>` | `variant`, `size`, `isLoading`, `isFullWidth`, `disabled`, `leading`, `trailing` |
| `Switch` | `<input type="checkbox">` (toggle) | `label`, `checked`, `onChange`, `disabled` |
| `DatePicker` | `<input type="date">` | `label`, `value`, `onChange`, date-specific props |
| `Slider` | `<input type="range">` | `label`, `value`, `onChange`, `min`, `max`, `step` |
| `FormGroup` | Fieldset/legend grouping | `label`, `children`, groups related form controls |

When a core equivalent exists, always prefer it over raw HTML.
