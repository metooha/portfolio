---
"@walmart/ld-kit": patch
---

Fix WCAG 2.1 AA accessibility violations identified in the June 2026 axe-core audit.

- Button: visually-hidden loading label (i18n via loadingLabel prop, default "Loading...") and aria-busy during loading state
- Carousel: tabIndex moved to labeled role="region"; progress bar nested-interactive fix
- Command: aria-label on input and listbox; separator aria-hidden
- CountryCodePhoneInput, Form, RichTextEditor, SearchBar, UploadFile: disabled text color contrast
- DatePickerCalendar: outside-month day contrast; aria-pressed replaces aria-selected
- IconButton: flex alignment baseline (touch target sizing owned by the button size system)
- Pagination: navigationLabel prop for unique nav landmarks
- QuantityStepper: nested-interactive fix — buttons only rendered when expanded
- Rating: disabled state uses direct color tokens instead of opacity
- ScrollArea: tabIndex=0 on scrollable viewport (WCAG 2.1.1)
- Slider: ariaLabel wired to thumb span; range thumbs labeled Minimum/Maximum
- Tag: all 13 tertiary color variants switched to text-accent-*-bold tokens
- Header: unique role="search" landmark labels
- ListTeam: stretched-link pattern replaces display:contents button
- 80+ demo pages: heading hierarchy, landmark labels, unique nav labels
- OverviewPage: inert="" on preview wrapper for all component thumbnails
