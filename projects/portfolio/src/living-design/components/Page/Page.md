Page shell — renders the `<main>` landmark, the single page `<h1>`, and the skip-to-content link.

> ⚠️ **Exactly ONE `<Page>` per app.** The page module for the active route is the
> only thing that should render `<Page>`. Do NOT also wrap it in another `<Page>`
> inside `App.tsx` or any layout shell. Two `<Page>` wrappers produce two
> `<main>` landmarks and two `<h1>` elements, which breaks assistive-tech
> navigation; the runtime a11y scanner throws on this.

```tsx
// CORRECT — App.tsx renders the page module directly; the page module owns Page
// App.tsx
return (
  <A11yAnnouncementProvider>
    <CartPage />
  </A11yAnnouncementProvider>
);

// CartPage.tsx
return (
  <Page title="Cart">
    {/* page content */}
  </Page>
);

// WRONG — double Page wrapper (two <main>, two <h1>; a11y scanner throws)
// App.tsx
return (
  <Page title="My App">
    <CartPage />        {/* CartPage already renders its own <Page> inside */}
  </Page>
);
```

If you need a non-route-specific shell (theming/store init/global providers),
mount those providers in `App.tsx` **around** the page module, not inside another
`<Page>`. Each route's page module is responsible for its own `<Page>`.
