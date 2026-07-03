# Living Design System — Component Authoring Guide

> Practical reference for building new LD Portable and WCP components.
> Every rule below is extracted from the existing codebase. When in doubt, match what Button, Checkbox, or Modal already do.

---

## 1. File Structure & Naming

**Directory layout — one directory per component, PascalCase everywhere:**

```
src/components/
  Button/
    Button.tsx
    Button.css
  Checkbox/
    Checkbox.tsx
    Checkbox.css
```

**Rules:**

- **No index files** per component. Pages import directly from the component file (e.g., `import { Button } from '../components/core/Button/Button'`).
- **Sub-components are inlined** in the parent `.tsx` file, separated by section comments:
  ```tsx
  // ---------------------------------------------------------------------------
  // ButtonGroup (inlined sub-component)
  // ---------------------------------------------------------------------------
  ```
  *(from Button/Button.tsx:5-7)*
- **`'use client'` directive** at the top of every component file that uses hooks or browser APIs:
  ```tsx
  'use client';

  import * as React from 'react';
  ```
  *(from Checkbox/Checkbox.tsx:1)*

---

## 2. CSS Class Naming

**Pattern:** `.ld-[component]-[element]-[modifier]` — always kebab-case, always `ld-` prefix.

```css
/* Root element */
.ld-button-button { }

/* Variant modifier */
.ld-button-primary { }
.ld-button-destructive { }

/* Size modifier */
.ld-button-small { }
.ld-button-large { }

/* State modifier */
.ld-button-isFullWidth { }
.ld-button-loading { }

/* Child elements */
.ld-button-leading { }
.ld-button-trailing { }
```

**Sub-component classes** include the sub-component name:

```css
/* ButtonGroup sub-component */
.ld-button-buttongroup-buttonGroup { }

/* GridColumn sub-component */
.ld-grid-gridcolumn-gridColumn { }
.ld-grid-small6 { }
```

**CSS file header comment** — every file starts with:

```css
/* LD Portable – ComponentName */
```

---

## 3. CSS Design Tokens

Two tiers of CSS custom properties:

### Primitive tokens (raw scale values)

```css
var(--ld-primitive-scale-space-100, 8px)
var(--ld-primitive-scale-space-150, 12px)
var(--ld-primitive-scale-space-200, 16px)
var(--ld-primitive-scale-space-250, 20px)
var(--ld-primitive-scale-borderradius-round, 9999px)
var(--ld-primitive-scale-borderwidth-100, 1px)
var(--ld-primitive-scale-borderwidth-200, 2px)
```

### Semantic tokens (contextual meaning)

```css
/* Action fills */
var(--ld-semantic-color-action-fill-primary, #0053e2)
var(--ld-semantic-color-action-fill-primary-hovered, #114ab6)
var(--ld-semantic-color-action-fill-primary-pressed, #002e99)
var(--ld-semantic-color-action-fill-primary-disabled, #babbbe)
var(--ld-semantic-color-action-fill-secondary, #ffffff)
var(--ld-semantic-color-action-fill-negative, #ea1100)

/* Action text */
var(--ld-semantic-color-action-text-on-fill-primary, #ffffff)
var(--ld-semantic-color-action-text-on-fill-secondary, #2e2f32)

/* Action borders */
var(--ld-semantic-color-action-border-secondary, #2e2f32)
var(--ld-semantic-color-action-border-tertiary, #babbbe)

/* Focus */
var(--ld-semantic-color-action-focus-outline, #0053e2)

/* Field tokens (inputs, search bars) */
var(--ld-semantic-color-field-fill, #FFFFFF)
var(--ld-semantic-color-field-fill-hovered, #FFFFFF)
var(--ld-semantic-color-field-fill-focused, #FFFFFF)
var(--ld-semantic-color-field-fill-disabled, #FFFFFF)
var(--ld-semantic-color-field-border, #B8BABC)
var(--ld-semantic-color-field-border-hovered, #8E9093)
var(--ld-semantic-color-field-border-focused, #2E2F32)
var(--ld-semantic-color-field-border-disabled, #E3E4E5)
var(--ld-semantic-color-field-text-onfill, #2E2F32)
var(--ld-semantic-color-field-text-subtle-onfill, #515357)
var(--ld-semantic-color-field-text-subtle-onfill-disabled, #BABBBB)

/* Font tokens */
var(--ld-semantic-font-body-medium-size, 16px)
var(--ld-semantic-font-body-medium-weight-default, 400)
var(--ld-semantic-font-body-medium-lineheight, 1.5)
var(--ld-semantic-font-body-small-size, 14px)

/* Icon scale */
var(--ld-semantic-scale-icon-medium, 24px)
```

**Always provide a hardcoded fallback** — the system must work without the theme loaded:

```css
/* CORRECT */
background: var(--ld-semantic-color-action-fill-primary, #0053e2);

/* WRONG — no fallback */
background: var(--ld-semantic-color-action-fill-primary);
```

### Color palette reference

| Category | Base | Bold | Hex |
|---|---|---|---|
| Blue (brand/info) | `#0053e2` | `#002e99` | `#114ab6` (hovered) |
| Red (negative) | `#ea1100` | `#a20c00` | `#ce0f00` (hovered) |
| Green (positive) | `#2a8703` | `#1d5f02` | |
| Gray (subtle) | `#74767c` | `#515357` | `#babbbe` (disabled) |
| Orange (warning) | `#c83c00` | `#af2f00` | |
| Purple (edited) | `#63327e` | `#452358` | |
| Pink (accent) | `#cb2c90` | `#8c1e64` | |
| Cyan (accent) | `#0076b3` | `#004a70` | |
| Teal (accent) | `#00809e` | `#005a6f` | |
| Yellow (accent) | `#996900` | `#663800` | |
| Spark (accent) | `#995213` | `#662b0d` | |
| Default text | `#2e2f32` | | |
| On-fill (light) | `#ffffff` | | |
| Disabled | `#babbbe` | | |
| Surface hovered | `#f1f1f2` | | `#e3e4e5` (pressed) |

### Theming Architecture

The design system supports **multi-brand theming** through CSS custom property overrides. Themes work by overriding primitive and/or semantic tokens at the `:root` level — every component that uses tokens automatically picks up the new values.

#### Two-Tier Override Model

Themes can override at either tier:

1. **Primitive overrides** — change raw color values (e.g., swap the entire blue scale). This cascades through all semantic tokens that reference those primitives.
2. **Semantic overrides** — change contextual mappings directly (e.g., make primary button fill navy instead of blue). More surgical, doesn't affect unrelated semantic tokens.

Most themes use **semantic overrides** for targeted brand changes. Only themes with a completely different color palette (like Sam's Club) also override primitives.

#### Theme File Locations

```
notes/LD-CX-Starter-Kit V1/public/styles/themes/
├── base/              ← Default Walmart theme (LD base)
├── sams-club/         ← Sam's Club brand
│   ├── primitive.css  ← Blue scale overrides, Gibson font
│   └── semantic.css   ← Primary=#0062ad, black membership CTA
├── walmart-b2b/       ← Walmart Business
│   └── semantic.css   ← Navy primary (#002e99), cyan alt buttons
├── wcp/               ← WCP-specific tokens (spark yellow, confidence fills)
│   └── semantic.css
├── ax/                ← Associate Experience
├── customer/          ← Customer-facing
├── developer/         ← Developer portal
├── walmart-plus/      ← Walmart+ membership
└── ... (22 theme dirs total)

src/themes/
└── base.css           ← Combined primitive+semantic base tokens (~99KB, auto-generated)
```

#### Key Brand Themes

| Theme | Primary Color | Key Differences |
|-------|--------------|-----------------|
| **Base (Walmart)** | `#0053e2` (blue-100) | Default — no overrides needed |
| **Sam's Club** | `#0062ad` (blue-130) | Different blue scale, Gibson font, black membership CTA |
| **Walmart B2B** | `#002e99` (navy) | Darker professional palette, cyan alt buttons |
| **WCP** | `#0053e2` (inherits base) | Adds `wcp-` prefixed tokens (spark yellow, confidence, scarcity fills) |

#### WCP-Specific Tokens

WCP components use an additional set of `wcp-` prefixed semantic tokens that themes can override independently:

```css
/* WCP primary alt button (e.g., "Join" membership CTA) */
var(--wcp-semantic-color-action-fill-primary-alt, #ffc220)

/* Confidence badge fills */
var(--wcp-semantic-color-fill-confidence, #001e60)

/* Savings/scarcity flags */
var(--wcp-semantic-color-fill-savings-bold, #ea1100)
var(--wcp-semantic-color-fill-scarcity, #fef6de)

/* Rating stars */
var(--wcp-semantic-color-rating-fill-activated, #ffc220)
```

#### Runtime Theme Switching

The OverviewPage implements live theme switching using `document.documentElement.style.setProperty()`. This is the pattern for runtime theming:

```tsx
// Apply overrides
for (const [key, val] of Object.entries(overrides)) {
  document.documentElement.style.setProperty(key, val);
}

// Reset (remove all overrides, revert to base theme)
for (const prop of appliedProps) {
  document.documentElement.style.removeProperty(prop);
}
```

**Rules for runtime theming:**
- Always track which properties were set so they can be cleaned up
- Clean up on unmount to avoid leaking overrides to other pages
- "Base" theme = empty overrides (remove all, revert to stylesheet defaults)
- Only override tokens that actually differ from base — don't duplicate the entire token set

#### Writing Theme-Compatible CSS

When authoring component CSS, follow these rules so themes work correctly:

```css
/* CORRECT — uses semantic token, theme can override */
background: var(--ld-semantic-color-action-fill-primary, #0053e2);

/* CORRECT — uses primitive token, theme can swap the whole scale */
color: var(--ld-primitive-color-blue-130, #002e99);

/* WRONG — hardcoded brand color, theme cannot override */
background: #0053e2;

/* WRONG — no fallback, breaks without theme loaded */
background: var(--ld-semantic-color-action-fill-primary);
```

**Key principle:** Never hardcode brand-specific hex values (blues, brand fills, action colors) directly in component CSS. Always use the corresponding semantic or primitive token. Neutral values (white, black, grays for borders/shadows) are acceptable as hardcoded fallbacks since they rarely change across themes.

---

## 4. Typography Scale

**Font families:**

```css
font-family: EverydaySans, 'Helvetica Neue', 'Arial', 'sans-serif';
font-family: EverydaySansMono, 'Courier New', 'monospace';
```

**Type scale (from Text/Text.css):**

| Category | Size | Mobile | Desktop (>=56.25rem) | Weight default | Weight alt |
|---|---|---|---|---|---|
| Display lg | `font-size` | `2rem` / `2.5rem` | `2.625rem` / `3.25rem` | 400 | 700 |
| Display sm | `font-size` | `1.75rem` / `2.25rem` | `2.25rem` / `3rem` | 400 | 700 |
| Heading lg | `font-size` | `1.5rem` / `2rem` | `2rem` / `2.5rem` | 700 | 400 |
| Heading md | `font-size` | `1.25rem` / `1.75rem` | `1.5rem` / `2.25rem` | 700 | 400 |
| Heading sm | `font-size` | `1.125rem` / `1.5rem` | `1.25rem` / `1.75rem` | 700 | 400 |
| Body lg | `font-size` | `1.125rem` / `1.5rem` | — | 400 | 700 |
| Body md | `font-size` | `1rem` / `1.5rem` | — | 400 | 700 |
| Body sm | `font-size` | `0.875rem` / `1.25rem` | — | 400 | 700 |
| Caption | `font-size` | `0.75rem` / `1rem` | — | 400 | 700 |

**Note:** Heading `weightDefault` is **700** (bold); Heading `weightAlt` is **400** (regular). This is the inverse of Body/Display.

---

## 5. Spacing & Layout

**Units:** `rem` exclusively in LD Portable core. WCP components may use `px` as fallback values in token references.

**Spacing scale:**

| Token | Value |
|---|---|
| `--ld-primitive-scale-space-50` | `4px` / `0.25rem` |
| `--ld-primitive-scale-space-100` | `8px` / `0.5rem` |
| `--ld-primitive-scale-space-150` | `12px` / `0.75rem` |
| `--ld-primitive-scale-space-200` | `16px` / `1rem` |
| `--ld-primitive-scale-space-250` | `20px` / `1.25rem` |

**Layout patterns:**

- **Flexbox-first** — use `display: flex` with `gap` for spacing children:
  ```css
  /* from Button/Button.css — ButtonGroup */
  .ld-button-buttongroup-buttonGroup {
    display: flex;
    gap: 1rem;
  }
  ```
- **Grid** — 12-column system via the `Grid` / `GridColumn` components using percentage widths and flex:
  ```css
  .ld-grid-grid {
    display: flex;
    flex-wrap: wrap;
  }
  .ld-grid-gridcolumn-gridColumn {
    box-sizing: border-box;
    flex: 0 0 auto;
    width: 100%;
  }
  ```
- Gutter spacing: `0.5rem` default, `0.75rem` at `>=75rem`

---

## 6. Responsive Breakpoints

| Name | Value | Pixels |
|---|---|---|
| small | `0` | 0px |
| medium | `37.5rem` | 600px |
| large | `56.25rem` | 900px |
| xlarge | `75rem` | 1200px |
| xxlarge | `120rem` | 1920px |

**Always mobile-first with `min-width`:**

```css
/* Base (mobile) styles first */
.ld-text-heading-large.ld-text-heading-weightDefault {
  font-size: 1.5rem;
  line-height: 2rem;
}

/* Desktop override */
@media screen and (min-width: 56.25rem) {
  .ld-text-heading-large.ld-text-heading-weightDefault {
    font-size: 2rem;
    line-height: 2.5rem;
  }
}
```

**Reduced motion:**

```css
@media (prefers-reduced-motion: reduce) {
  .ld-button-spinner {
    animation: none;
  }
}
```

---

## 7. Interactive States

**Dual selector pattern** — every pseudo-state has a matching class for testing/storybook:

```css
.ld-button-primary:hover, .ld-button-primary.hover {
  background: var(--ld-semantic-color-action-fill-primary-hovered, #114ab6);
}
.ld-button-primary:active, .ld-button-primary.active {
  background: var(--ld-semantic-color-action-fill-primary-pressed, #002e99);
}
```

**Focus (keyboard navigation):**

```css
.ld-button-button:focus-visible {
  outline: 0.125rem solid var(--ld-semantic-color-action-focus-outline, #0053e2);
  outline-offset: 0.125rem;
}
```

**Disabled:**

```css
.ld-button-button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

/* Variant-specific disabled uses muted fill instead of opacity */
.ld-button-primary:disabled {
  background: var(--ld-semantic-color-action-fill-primary-disabled, #babbbe);
}
```

**Loading:**

```css
.ld-button-loading {
  cursor: wait;
  pointer-events: none;
}
.ld-button-loading:disabled {
  opacity: 1; /* override default disabled opacity */
}
```

---

## 8. Animation & Transitions

### Standard easings

```css
/* Quick interactions (buttons, hover) */
transition: all 0.1s cubic-bezier(0.77, 0, 0.175, 1);

/* Standard (inputs, field borders) */
transition: border-color 0.15s ease, background 0.15s ease;

/* Dialogs/modals — enter */
transition: opacity 0.3s linear, transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

/* Dialogs/modals — exit */
transition: opacity 0.5s linear;
```

### Duration scale

| Duration | Use case |
|---|---|
| `0.1s` | Button transitions, micro-interactions |
| `0.15s` | Field borders, background color changes |
| `0.3s` | Dialog content enter |
| `0.5s` | Modal/panel enter/exit, scrim fade |
| `0.75s` | Continuous spinner animation |

### CSSTransition class pattern

Transition classes follow `.ld-[component]-[subcomponent]-transition{Enter,EnterActive,Exit,ExitActive}`:

```css
/* from Modal/Modal.css */
.ld-modal-modalportal-transitionEnter .ld-modal-modalportal-modal {
  opacity: 0;
  transform: scale(0);
}
.ld-modal-modalportal-transitionEnterActive .ld-modal-modalportal-modal {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.3s linear, transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.ld-modal-modalportal-transitionExit .ld-modal-modalportal-modal {
  opacity: 1;
  transform: scale(1);
}
.ld-modal-modalportal-transitionExitActive .ld-modal-modalportal-modal {
  opacity: 0;
  transition: opacity 0.5s linear;
}
```

### Keyframe animations

Scope with component prefix:

```css
@keyframes ld-button-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.ld-button-spinner {
  animation: ld-button-spin 0.75s linear infinite;
}
```

### Reduced motion

Always disable animations for `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  .ld-wcp-searchbar-pill,
  .ld-wcp-searchbar-clearBtn {
    transition: none;
  }
}
```

---

## 9. Component TypeScript Patterns

### Always functional components

```tsx
export const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = (props) => {
  // ...
};
```

### Props extend native element props, blocking className/style

```tsx
export interface ButtonGroupProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  children: React.ReactNode;
}
```

### UNSAFE_className / UNSAFE_style escape hatch

Users pass `UNSAFE_className` and `UNSAFE_style` instead of `className` and `style`. The `applyCommonProps()` helper transforms them:

```tsx
const {children, className, ...rest} = applyCommonProps(props);

return (
  <div className={cx('ld-button-buttongroup-buttonGroup', className)} {...rest}>
    {children}
  </div>
);
```

### Variant/size as string union types

```tsx
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonVariant = 'destructive' | 'primary' | 'secondary' | 'tertiary';
```

### displayName on every exported component

```tsx
ButtonGroup.displayName = 'ButtonGroup';
Checkbox.displayName = 'Checkbox';
```

### cx() for conditional class composition

```tsx
const classes = cx(
  'ld-button-button',
  variant === 'primary' && 'ld-button-primary',
  variant === 'secondary' && 'ld-button-secondary',
  isFullWidth && 'ld-button-isFullWidth',
  isLoading && 'ld-button-loading',
  size === 'large' && 'ld-button-large',
  className
);
```

### Polymorphic components (anchor or button)

When a component can render as different elements, use a type guard and a polymorphic type:

```tsx
const isAnchor = (props: ButtonProps): props is ButtonAnchorProps =>
  'href' in props;

export type ButtonPolymorphicType = {
  (props: ButtonAnchorProps): JSX.Element;
  (props: ButtonButtonProps): JSX.Element;
  displayName?: string;
};
```

### forwardRef pattern

```tsx
const _Button = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  // ...
});

_Button.displayName = 'Button';
export const Button = _Button as ButtonPolymorphicType;
```

---

## 10. Shared Utilities

**Reuse these — do not reinvent them.**

### `cx()` — class name joiner
*`src/components/common/cx.ts`*

```ts
export function cx(...args: CxArg[]): string {
  return args.filter(Boolean).join(' ');
}
```

### `applyCommonProps()` — UNSAFE_className/style transformer
*`src/components/common/helpers.tsx`*

Strips `className`/`style`, maps `UNSAFE_className` to `className` and `UNSAFE_style` to `style`:

```ts
export function applyCommonProps<T>(props: T): T & { className?: string; style?: React.CSSProperties } {
  const result: any = {};
  for (const [key, value] of Object.entries(props as any)) {
    if (key === 'UNSAFE_className') result.className = value;
    else if (key === 'UNSAFE_style') result.style = value;
    else if (key !== 'className' && key !== 'style') result[key] = value;
  }
  return result;
}
```

### `useStableId()` — SSR-safe ID generation
*`src/components/common/helpers.tsx`*

```ts
export function useStableId(providedId?: string): string {
  const [id] = React.useState(() => providedId || `ld-id-${++_idCounter}`);
  return providedId || id;
}
```

### `invariant()` — dev-mode assertion
*`src/components/common/helpers.tsx`*

Throws in development, logs in production:

```ts
export function invariant(condition: boolean, message: string): void {
  if (condition) return;
  const error = `LD: ${message}`;
  if (process.env.NODE_ENV === 'production') {
    console.error(error);
  } else {
    throw new Error(error);
  }
}
```

### `mergeRefs()` — combine multiple refs
*`src/components/common/helpers.tsx`*

```ts
export function mergeRefs<T extends HTMLElement>(...refs: Array<MergeRefsItem<T>>): React.RefCallback<T> {
  return (instance: T | null) =>
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(instance);
      else if (typeof ref === 'object' && ref) ref.current = instance;
    });
}
```

### `debounce()` — debounce utility
*`src/components/common/helpers.tsx`*

```ts
export function debounce<T extends unknown[]>(fn: (...args: T) => void, timeout: number) {
  let timerID: ReturnType<typeof setTimeout>;
  const cancel = () => { clearTimeout(timerID); };
  const debounced = (...args: T) => {
    clearTimeout(timerID);
    timerID = setTimeout(() => { fn(...args); }, timeout);
  };
  debounced.cancel = cancel;
  return debounced;
}
```

### `getTarget()` — safe link target handling
*`src/components/common/helpers.tsx`*

Automatically adds `rel="noopener noreferrer"` for `_blank` targets:

```ts
export function getTarget(target?: string): { rel?: string; target?: string } {
  if (target === '') return {};
  if (target === '_blank') return { target, rel: 'noopener noreferrer' };
  return { target };
}
```

### `onAnchorKeyDown()` — make anchors act like buttons
*`src/components/common/helpers.tsx`*

Fires `onClick` and navigates on Space key press:

```ts
export function onAnchorKeyDown(anchorProps: {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement>;
}) {
  return (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.key !== ' ') return;
    onClick?.(event as unknown as React.MouseEvent<HTMLAnchorElement>);
    if (event.defaultPrevented || !href) return;
    location.assign(href);
  };
}
```

### `CSSTransition` — enter/exit animation component
*`src/components/common/CSSTransition.tsx`*

```tsx
<CSSTransition
  classNames={{
    enter: 'ld-modal-modalportal-transitionEnter',
    enterActive: 'ld-modal-modalportal-transitionEnterActive',
    exit: 'ld-modal-modalportal-transitionExit',
    exitActive: 'ld-modal-modalportal-transitionExitActive',
  }}
  in={isOpen}
  mountOnEnter
  nodeRef={overlayRef}
  timeout={500}
  unmountOnExit
>
  {children}
</CSSTransition>
```

### `useCSSTransition` — hook version for imperative control
*`src/components/common/useCSSTransition.tsx`*

Returns `{ shouldMount }` — use to conditionally render:

```tsx
const { shouldMount } = useCSSTransition({
  classNames: {
    enter: 'ld-modal-modalportal-transitionEnter',
    enterActive: 'ld-modal-modalportal-transitionEnterActive',
    exit: 'ld-modal-modalportal-transitionExit',
    exitActive: 'ld-modal-modalportal-transitionExitActive',
  },
  in: isOpen,
  mountOnEnter: true,
  nodeRef: overlayRef,
  onExited: () => onClosed?.(),
  timeout: 500,
});
```

### `VisuallyHidden` — screen-reader-only content
*`src/components/VisuallyHidden/VisuallyHidden.tsx`*

```tsx
<VisuallyHidden>Close dialog</VisuallyHidden>
```

### `FocusLock` — focus management
*`src/components/common/FocusLock.tsx`*

Traps tab focus within a container. Supports `returnFocus` to restore focus on unmount.

### Additional helpers
*`src/components/common/helpers.tsx`*

- `useLockBodyScroll()` — sets `document.body.style.overflow = 'hidden'`
- `usePointerOutside(ref, callback)` — fires callback on mousedown outside ref
- `useOnKeyDown(keys, callback)` — global keydown listener
- `remToPxValue(remValue)` — converts rem string to px number
- `setStyleProperty(node, property, value)` — wrapper around `node.style.setProperty`

---

## 11. Accessibility Rules

### Every interactive component requires a label

Use the discriminated union pattern — exactly one of `label` or `a11yLabelledBy` must be provided:

```tsx
export interface CheckboxA11yProps extends CheckboxBaseProps {
  a11yLabelledBy: string;
  label?: never;
}

export interface CheckboxLabelProps extends CheckboxBaseProps {
  label: React.ReactNode;
  a11yLabelledBy?: never;
}

export type CheckboxProps = CheckboxA11yProps | CheckboxLabelProps;
```

**Enforce at runtime with `invariant()`:**

```tsx
const labelCount = (label ? 1 : 0) + (a11yLabelledBy ? 1 : 0) === 1;

invariant(
  labelCount,
  '`Checkbox` accessibility violation. `Checkbox` requires a `label` OR an `a11yLabelledBy`.'
);
```

### Decorative icons

Always `aria-hidden="true"` on decorative SVGs:

```tsx
<svg aria-hidden="true" className="ld-button-spinner" viewBox="0 0 32 32" fill="none">
```

### Screen-reader-only content

Use `VisuallyHidden` for labels that should not be visible:

```tsx
<VisuallyHidden>Close dialog</VisuallyHidden>
```

### Semantic roles

Use `role` attributes for groupings that need screen reader context:

```tsx
/* ButtonGroup wraps children in list semantics */
<div role="list">
  <div role="listitem">{child}</div>
</div>
```

### Keyboard navigation

- **Tab trapping:** Use `FocusLock` for modals, dialogs, and panels
- **Anchor-as-button:** Use `onAnchorKeyDown()` so Space triggers navigation on anchor elements
- **Safe link targets:** Use `getTarget()` to add `rel="noopener noreferrer"` for `_blank` targets
- **Loading state:** Set `aria-busy={true}` on buttons in loading state:
  ```tsx
  <button aria-busy={isLoading || undefined} disabled={disabled || isLoading}>
  ```

---

## 12. Material Components (`src/components/material/`)

Material components live under `src/components/material/` and follow patterns adapted for the LD token system.

### Directory structure

```
src/components/material/
  Slider/
    Slider.tsx
    Slider.css
```

### Slider

The **Slider** (`src/components/material/Slider/`) provides both single-value and range selection. It uses LD semantic tokens throughout and follows Walmart design conventions:

- **White thumb** with primary-colored border (matches LD field/input patterns)
- **Active track** in primary color, inactive track in field-border gray
- **Value label tooltip** appears on hover/focus/drag with primary background
- **Tick marks** at step intervals (optional)
- **Hidden native `<input type="range">`** underneath for keyboard accessibility
- **Pointer capture** for smooth drag interaction
- Two exported components: `Slider` (single) and `RangeSlider` (dual thumbs)

### Authoring rules for Material components

- Follow the same CSS naming convention: `.ld-[component]-[element]`
- Use LD semantic tokens with hardcoded fallbacks (same as all other components)
- Include dual selector pattern (`:hover, .hover`) for interactive states
- Include `@media (prefers-reduced-motion: reduce)` for animations
- Use `forwardRef` pattern for ref forwarding
- Use `invariant()` for accessibility enforcement
- Use `applyCommonProps()` and `cx()` from shared utilities

---

## Quick Checklist for New Components

- [ ] PascalCase directory and filenames
- [ ] `'use client'` directive if using hooks/browser APIs
- [ ] CSS file with `/* LD Portable – ComponentName */` header
- [ ] All classes prefixed `ld-[component]-`
- [ ] CSS tokens with hardcoded fallbacks
- [ ] Props extend `Omit<ComponentPropsWithoutRef<'el'>, 'className' | 'style'>`
- [ ] `applyCommonProps(props)` called first in component body
- [ ] `cx()` for class composition
- [ ] `displayName` set on every exported component
- [ ] `invariant()` for a11y label requirement
- [ ] `aria-hidden="true"` on decorative icons
- [ ] `:hover, .hover` dual selector pattern for interactive states
- [ ] `:focus-visible` with standard outline
- [ ] `@media (prefers-reduced-motion: reduce)` for animations
- [ ] Mobile-first responsive breakpoints with `min-width`
