# Responsive design guidelines

Use these patterns across the portfolio for consistent, accessible layouts from ~320px through large desktop.

## Breakpoints (Tailwind defaults)

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

Validate key widths: 320, 375, 768, 1024, 1280, 1440.

---

## 1. Layout and spacing

### Page container

- Prefer **max-width + auto margins** for main content:
  - `max-w-7xl mx-auto` or `max-w-[1200px] mx-auto` for readable line length.
- Horizontal padding: **one wrapper** per section with symmetric padding.
  - Standard: `px-4 sm:px-6 md:px-8` or, where matching existing design, `px-4 md:px-[68px]`.
  - Avoid nested containers with different padding (e.g. no inner `px-[100px]` inside a responsive wrapper).
- Vertical rhythm: use a consistent scale for sections, e.g. `py-8 md:py-12 lg:py-16` or `pb-12 md:pb-16 lg:pb-24`.

### Columns and grids

- Use **responsive grid columns**: `grid-cols-1 md:grid-cols-2` or `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` so columns stack on small screens.
- For card/hobby grids: avoid `grid-cols-4` on mobile; use `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` or similar.
- Gaps: `gap-6 md:gap-8` or `gap-4 sm:gap-6 md:gap-8`.

### Flex rows

- Allow wrapping: use `flex-wrap` (default) and avoid `flex-nowrap` unless horizontal scroll is intentional (e.g. timeline strip).
- Prevent overflow: give flex children `min-w-0` when they should shrink (e.g. text blocks). Use `min-w-[200px]` or similar only when you need a minimum column width before wrapping.
- Prefer `flex-1 min-w-0` over `flex-[1_0_0]` for flexible columns that should shrink on narrow viewports.

---

## 2. Typography

- **Headings**: scale by breakpoint so they’re readable on small screens.
  - Hero: `text-4xl sm:text-5xl md:text-6xl` instead of fixed `text-[80px]`.
  - Section: `text-2xl md:text-3xl lg:text-4xl`.
- **Body**: `text-base` or `text-lg`; avoid fixed `text-[Npx]` unless needed for pixel-perfect match.
- **Long text**: use `line-clamp-2` or `line-clamp-3` only where truncation is acceptable; pair with `min-w-0` on the container so text can shrink.

---

## 3. Images and media

- **Hero / content images**: constrain to container so they don’t overflow.
  - `max-w-full h-auto` and, if needed, `w-full` with a max width on the container.
  - Avoid fixed `w-[600px]` without `max-w-full` on small screens.
- **Decorative / edge-to-edge**: `object-cover` with a defined aspect ratio or height.
- **UI mockups / devices**: `object-contain` so the asset isn’t cropped.
- **High-DPI**: keep using `srcSet` with 1x and 2x where already implemented; ensure fallback to 1x if 2x is missing.

---

## 4. Scrollable regions and comparisons

- **Scrollable panels** (e.g. before/after comparisons): use a shared height (e.g. `COMPARISON_FRAME_H`) and the existing `scrollbarHide` utility for a consistent look.
- **Scroll sync**: keep refs and sync logic in both directions; use a single source of truth for viewport and content height so left and right stay aligned.
- **Comparison frame width**: use `max-w-full` and a reasonable `max-w-[1180px]` (or similar) so the component doesn’t force horizontal page scroll on tablets/phones.

---

## 5. Absolute positioning and overlays

- Use **absolute** for decoration (e.g. wavy borders, pins) and overlay UI (callouts, design panel), not for primary page structure.
- For **callouts / panels** with fixed pixel positions: add breakpoint-specific offsets (e.g. `md:left-[180px]` and smaller values for mobile) or make them relative to a container that scales, so they don’t sit off-screen or overlap content on small viewports.
- **Touch targets**: keep interactive elements (buttons, drag handles) at least ~44px for touch.

---

## 6. Shared layout components

- **PageContainer** (`@/app/components/layout`): standard page wrapper with `max-w-7xl` (or override), `mx-auto`, and configurable horizontal padding. Use for main content areas.
- **TwoColumnSection**: grid that stacks on mobile (`grid-cols-1 md:grid-cols-2`) with configurable gap. Use for text + media or text + form layouts.
- Override padding via `className` when matching a specific design (e.g. `px-4 md:px-[68px]`).

## 7. Applying these in code

- **New components**: use the patterns above and the layout components from the start.
- **Existing pages**: refactor one section at a time—start with hero and main content wrapper, then grids and flex rows, then typography and images.
- **WmDesignSystem2026**: apply the same rules to section rows (flex-wrap, min-w-0), image slots (max-w-full, aspect ratios), and comparison frames (max-w-full, responsive height). Prefer a few shared layout patterns rather than one-off flex configs.

See `docs/RESPONSIVE-AUDIT.md` for where non-responsive patterns were found and breakpoints to validate.

## 8. Responsive testing checklist

When changing layout or adding pages, validate at these viewport widths to avoid regressions:

| Width | Device type | Checks |
|-------|-------------|--------|
| 320px | Small phone | No horizontal scroll on body; hero text readable; tap targets ≥44px |
| 375px | Phone | Same as above; grids stack to one column |
| 768px | Tablet | Two-column layouts where used; comparison panels may show horizontal scroll within frame |
| 1024px | Desktop | Full layouts; comparison frame at max 1180px |
| 1280–1440px | Large desktop | Content centered with max-width; no over-wide content |

**Quick checks:** Toggle device toolbar in devtools; test Home, About, Contact, and the Walmart case study (case-study route). Ensure no clipped headings, overlapping callouts, or broken comparison drag/sync.
