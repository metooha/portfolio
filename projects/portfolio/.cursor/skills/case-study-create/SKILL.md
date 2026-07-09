---
name: case-study-create
description: >-
  Builds a new portfolio case study page from scratch (not from a brief pack —
  see case-study-brief-handoff for that flow). Use when the user asks to add,
  create, or build a new case study, work sample, or project write-up for the
  portfolio site.
---

# Case study create (portfolio)

## When to use

The user wants a **new case study page** added to the portfolio without a
brief pack (`manifest.yaml` / `content/*.md`). If a brief folder exists,
use `case-study-brief-handoff` instead.

## Before writing code, gather from the user (don't guess)

1. **Theme** — which entry in `THEME_NAMES` (`src/app/components/utils/Theming.tsx`)
   applies: `Portfolio`, `WM`, `Oportun`, `Xense`, `Carbon`, `Walmart`, `Sam's Club`,
   `Sam's Club Maverick`, `Walmart B2B`, `Bodega`, `Cashi MX`, `Walmart Legacy`.
   If none fit, ask before inventing one.
2. **Password protection** — ask whether the page should be gated, and if so
   the exact password. If not mentioned, leave it unprotected.
3. **Reference material** — ask if the user has a reference (doc, deck, Figma,
   prior case study, notes) to build from. If they supply one, treat it as the
   source of truth for content — don't invent facts, metrics, or narrative
   beats it doesn't contain. Ask before filling gaps with your own copy.
4. **Chronological placement** — ask (or infer from dates in the reference)
   where this project falls relative to the existing case studies so it can
   be inserted in the right position (see "Ordering" below).

## Reuse the existing layout — don't invent a new one

Every case study is built from the same shared kit. Do not create bespoke
page chrome; reuse:

- `CaseStudyTemplate` (`src/app/components/CaseStudyTemplate.tsx`) — page shell:
  nav, hero slot, overview block, prev/next cards, "All Projects" button.
- `CaseStudyHero` (`src/app/components/CaseStudyHero.tsx`) — parallax hero with
  a title over an image. **Don't pass `subtitle`** — the hero is title-only;
  no body copy. Save the descriptive paragraph for `overviewDescription`
  in the overview block right below the hero, where it belongs.
- `CaseStudyPrimitives` (`src/app/components/CaseStudyPrimitives.tsx`) — section
  building blocks: `Section`, `Eyebrow`, `SectionTitle`, `Lead`, `ImageFull`,
  `ImageFrame`, `ImageGrid2`, `BeforeAfter`, `StatsRow`, `StatCards`,
  `QuoteBlock`, `VideoFull`, `EmbedFull`, `ProblemGrid`, `NextGrid`, `FrameCycle`.
  Only add case-study-specific primitives (e.g. `EdsCaseStudyPrimitives.tsx`)
  when the shared set genuinely can't express something.
- `CaseStudyMeta`, `CaseStudyPageNav` — used internally by `CaseStudyTemplate`;
  you only pass data (`metaItems`, `navSections`) into it.

### File scaffold

Look at `src/app/pages/case-studies/figma-to-code/` or `carbon-auto-orientation/`
as the reference pattern. For a new case study at slug `<slug>`, create
`src/app/pages/case-studies/<slug>/`:

- `<Name>CaseStudy.tsx` — default-exported page component. Builds the hero,
  overview copy/meta, wraps `<CaseStudyTemplate>`, renders the section list,
  wired with `getAdjacentCaseStudies(id)` for prev/next.
- `<Name>Sections.tsx` — one exported component per chapter, built from
  `CaseStudyPrimitives`, each wrapped in `<Section id="...">` matching a
  `navSections` anchor.
- `<Name>Blocks.tsx` — bespoke one-off visual components specific to this
  case study's story (diagrams, custom cards) that don't belong in the shared
  primitives file.

Wrap the page root in `<div data-ld-theme="<Theme>" style={{ display: "contents" }}>`
so the case study renders in the theme the user specified, independent of the
site-wide theme.

## Grouped same-size images — use a carousel

When an asset folder (or subfolder) holds multiple images that are the same
size/aspect ratio and clearly belong together — a slide-deck export, a photo
set, a run of guideline pages — present them as a carousel instead of
stacking every one as a static grid. Use the shared `ImageCarousel`
primitive (`src/app/components/CaseStudyPrimitives.tsx`, wraps
`src/app/components/Carousel/Carousel.tsx`):

```tsx
<ImageCarousel
  images={[{ src: imgFoo, alt: "..." }, { src: imgBar, alt: "..." }]}
  ariaLabel="Descriptive label for this carousel"
  fit="contain" // or "cover" for decorative photography that can crop safely
/>
```

- Sort images in the folder's natural order (usually the numeric suffix in
  the filename) unless the reference material specifies a different order.
- **Check what's actually in the images before adding your own heading.**
  Deck/slide exports frequently have their own title, section tag, and
  supporting copy baked into the image itself (open a couple of them with
  Read first). If the first slide already renders the heading you were about
  to write in JSX, drop the JSX heading — don't duplicate it. Use `fit="contain"`
  for text-bearing slides so nothing gets cropped; reserve `fit="cover"` for
  purely decorative photography where cropping is safe.
- For `CarouselItem`/lower-level primitives directly (`Carousel`,
  `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`,
  `CarouselPagination` from `@/app/components/Carousel/Carousel`), see the
  Oportun DS case study for a worked example — `ImageCarousel` is a thin
  wrapper around exactly that composition for the common case.

## Icons — never use emoji

Never use emoji (or raw Unicode glyphs like ✓/✕) as icons in case study
content — question-list markers, reflection-card icons, before/after
indicators, etc. Always use the theme's icon system instead:

- `Icon` (`src/app/components/Icons/Icons.tsx`) — renders a glyph from the
  Living Design icon font. Usage: `<Icon name="Eye" size="medium" decorative />`.
  A curated set of names already has dedicated wrapper exports in that file
  (`CheckIcon`, `CloseIcon`, `LockIcon`, `FlashIcon`, etc.) — prefer those
  when one exists, otherwise call `Icon` directly with the glyph name.
- The full glyph name list lives in `LD_ICON_CODEPOINTS`
  (`src/app/assets/walmart-assets/fonts/ld/LDIcons.tsx`) — grep it for
  available names (e.g. `Eye`, `Flag`, `Flash`, `Box`, `Magic`, `Globe`,
  `Notebook`, `CheckCircle`, `Check`, `Close`). Pick the closest semantic
  match; don't invent a name that isn't in that list.
- Set color via `style={{ color: ... }}` on a wrapping element or on the
  icon itself — icons inherit `currentColor` via the icon font, same as any
  other text-colored glyph.
- Pass `decorative` when the icon sits next to text that already conveys the
  meaning (the normal case in case study copy); use `a11yLabel` only for a
  standalone icon with no adjacent label.

## Assets

All assets live under `src/app/assets/pages/case-study/<slug>/` — never place
case study images/video elsewhere. Prefer an `optimized/` subfolder for the
web-ready exports (as `figma-to-code` does) if the user hands you originals
that need compressing. Import each asset explicitly at the top of the file
that uses it (`import imgFoo from "@/app/assets/pages/case-study/<slug>/optimized/foo.jpg"`) —
don't dynamically construct asset paths.

## Wire it into `case-studies-config.ts`

Add one `CaseStudyConfig` entry in `src/app/data/case-studies-config.ts`:

- `id` / `path: "/case-study/<id>"` — next sequential id, but see Ordering below.
- `defaultTheme` — the theme the user specified.
- `isPublished: true` once ready to go live (`false` keeps it built but hidden
  from routing, home cards, and prev/next).
- `accessPassword` — only if the user asked for password protection; this is
  the single field that drives gating end-to-end (`page-protection.ts` reads
  it via `getCaseStudyAccessPassword`, `App.tsx` wraps routes in
  `PagePasswordGate`, and `CaseStudyCard` auto-shows a "Password protected"
  tag). No other wiring needed.
- `shortDescription` / `fullDescription` / optional `cardTitle` /
  `cardDescription` — pull from the reference material if one was supplied.
- `metaItems`, `navSections` (anchors must match `id="..."` in the sections
  file), `navAccentColor` (the theme's brand color), `tags`.
- `heroType: "image"` with `heroImage`/`thumbnail` imports (or `"component"`
  with `HeroComponent` for a non-photo hero).
- `PageComponent: <Name>CaseStudy` for a fully custom page (this is the norm —
  matches every recent case study). Only use `ContentComponent` (generic
  template routing) for simple pages with no custom hero/overview treatment.

## Ordering (home page + prev/next)

`getFeaturedCaseStudies()` and `getAdjacentCaseStudies()` both iterate the
`CASE_STUDIES` array **in array order** — that order is what renders on the
home page grid and drives prev/next navigation. It is not auto-sorted by
date. When adding a new case study:

1. Insert the new entry into the array at the position matching its place in
   the overall timeline relative to the other case studies (compare
   `metaItems` timelines / the reference material's dates), not just at the end.
2. Renumber `id`/`path` for any entries that shift, and double check every
   `PageComponent`'s own `getAdjacentCaseStudies("<id>")` call still points at
   the right id.
3. Leave `featuredOnHome: false` off unless the user asked for the card to be
   hidden from the home grid while still reachable by direct link.
4. This keeps the home page preview card grid — and the case study's own
   internal narrative — in chronological order, per the user's requirement.

## Story order within the case study

Within `<Name>Sections.tsx`, order sections to match how the project actually
unfolded (problem → discovery → approach → build → results → reflection, or
whatever the reference material's real timeline was) rather than an arbitrary
or purely thematic order. If a reference is supplied, mirror its sequence of
events unless the user says otherwise.

## Copy — minimize first person, no duplicated sentences

Case study prose should read like professional writing about a project, not
a personal narrative. This applies everywhere except the `metaItems` "Role"
label (a role title is inherently first-person-adjacent and fine as-is —
"Lead Product Designer", not "I was the lead designer").

- **Avoid "I/me/my/we/our"** in body copy, leads, and descriptions. Rewrite
  around the work instead of the author: "I rebuilt it end to end" →
  "The redesign rebuilt it end to end"; "we opted for solid colors" → "the
  redesign leaned into solid color." This is almost always a small rewrite,
  not a rewording that loses meaning.
- Avoid casual first-person narrative framing too ("a friend approached me
  for help," "I embarked on a journey"). State the context plainly instead.
- **Keep it clear and concise** — cut filler words and prefer the shorter
  phrasing when two say the same thing equally well.
- **Never restate the same sentence** across the hero title, overview
  description, `cardDescription`, `fullDescription`, and section leads for
  the same project. These surfaces get read back-to-back (home card →
  overview → first section), so a repeated sentence reads as copy-pasted.
- **Never use em dashes ("—" or the `&mdash;` entity)** anywhere in case
  study copy: titles, descriptions, leads, captions, card text, even code
  comments in the section files. Use a period to split into two sentences,
  a colon when introducing a list or elaboration, or a comma before a
  conjunction ("...without a developer, so it rarely changed"). Check both
  the literal `—` character and the `&mdash;` entity, since JSX text often
  uses the entity form.
  Say the same underlying fact in genuinely different words each time, or
  cut the repeat entirely and let one surface own that beat.

## Finish

- `npm run dev` and click through the new card from the home page, confirm
  password gate (if any) blocks/unlocks correctly, confirm prev/next cards
  point at the right neighbors.
- `npm run build` to catch type errors before handing back.
