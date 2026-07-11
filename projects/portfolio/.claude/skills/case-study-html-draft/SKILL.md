---
name: case-study-html-draft
description: >-
  Drafts a case study's narrative and visual structure as a single
  self-contained static HTML/CSS file (Python-generated), before any React
  build. Use when the user wants to storyboard, pitch, or rapidly draft case
  study content and layout without touching the live portfolio app — not for
  building the real page (see case-study-create for that).
---

# Case study HTML draft (portfolio)

## When to use

The user wants to **draft or storyboard a case study** quickly: content,
narrative order, and a rough visual system, without editing the React app or
worrying about `CaseStudyTemplate`/`CaseStudyPrimitives`. Good for:

- A first pass to review with the user before committing to a real build.
- A pitch-style leave-behind (a single HTML file someone can open directly).
- Prototyping a visual pattern (e.g. a new diagram or stand-in component)
  before deciding whether it belongs in the shared primitives.

If the user wants the actual portfolio page built or updated, use
**`case-study-create`** (from scratch) or **`case-study-brief-handoff`**
(from a brief pack) instead. This skill is upstream of both — a draft made
this way should eventually be ported into a real `CaseStudyConfig` entry,
not shipped as-is.

## Reference example

`references/case-studies/conversational-ui-kit/` (repo root of this
project) holds a full worked example: `build_uc.py` (generator source) and
`rebuilt_uc.html` (the rendered, browser-openable output). Read
`README.md` in that folder first — it also lists what still needs a copy
pass before this specific draft could become a real case study.

## The pattern

A single Python script assembles one static HTML file from string
constants, no build tooling, no dependencies beyond the standard library:

1. **Shared chrome** — `HEADNAV`/`FOOTER` are read from small partial HTML
   files (nav bar, `<head>`/`<style>` boilerplate, closing footer) so
   multiple case study drafts can share the same look without copy-pasting
   it into every script.
2. **CSS custom properties** for the whole palette (`--blue`, `--dark`,
   `--yellow`, `--sky`, `--blue2`, `--muted`, `--light`, `--border`) defined
   once in `:root`, plus a handful of semantic aliases (`--red`, `--green`,
   `--orange`, `--purple`) mapped onto those same brand colors. Swap the
   `:root` values to retheme the whole draft in one place.
3. **"Illustrated stand-in" components** — instead of embedding real
   screenshots (which the author may not have captured yet), hand-code a
   miniature HTML/CSS recreation of the real UI: a grid of six chat widget
   mockups, an atomic-design layer diagram, a component documentation panel
   (anatomy + tokens + specs), a naming-taxonomy hierarchy, an Airtable-style
   tracker table. Each is its own string constant (e.g. `UI_GRID`,
   `ATOMIC_DIAGRAM`, `COMP_DOC`, `HIER_DIAGRAM`, `TRACKER`) with matching CSS
   in `EXTRA_CSS`, and gets dropped into a section via an f-string. This
   keeps the draft fully self-contained and reviewable without waiting on
   asset exports.
4. **`capture-ph` placeholders** — dashed-border boxes (`cap-badge` /
   `cap-title` / `cap-desc`) marking exactly where a *real* screenshot
   should eventually replace the illustrated stand-in or fill a gap (audit
   spreads, planning docs, team-structure slides, live product shots).
   Leave these in; they're the porting checklist.
5. **Section constants** (`HERO`, `PROBLEM`, `DEFINING`, `SCOPE`,
   `ALIGNMENT`, `PROCESS`, `GOVERNANCE`, `IMPACT`, `CLOSING` in the
   reference example) — one triple-quoted HTML string per narrative beat,
   joined in `body = "\n\n".join([...])` at the bottom in the order they
   should read. Reordering the story is reordering that list.
6. **Assemble and write** — `head = HEADNAV.replace("</style>", EXTRA_CSS +
   STYLE_PATCHES + "\n</style>")`, then `html = head + body + FOOTER`,
   written to a single output `.html` file. Open that file directly in a
   browser; no dev server needed.

## Building a new draft

1. Ask the user (don't guess) what the case study is about, its narrative
   beats, and whether they have a reference (deck, notes, prior case study)
   — same sourcing discipline as `case-study-create`: don't invent metrics
   or narrative beats a reference doesn't contain.
2. Reuse the existing partials/palette pattern if the user has drafted one
   before (check `references/case-studies/` for prior examples) rather than
   inventing new CSS class names for the same concepts (stat grids, timeline
   items, tradeoff boxes, etc. — the reference example has a wide vocabulary
   of these already).
3. Write section constants in narrative order, mark anything without a real
   screenshot yet as a `capture-ph` block, and build illustrated stand-ins
   only for visuals central to the story (not everything needs one).
4. Run the script (`python3 build_uc.py` or equivalent) and open the output
   HTML in a browser to review with the user before writing any React.
5. Save the finished draft under `references/case-studies/<slug>/` in this
   repo (script + rendered HTML + a short README noting what's still a
   placeholder) so it's findable later, the same way
   `conversational-ui-kit` is saved.

## Porting to the real site

Once the draft is approved, hand off to `case-study-create` treating the
draft's `rebuilt_*.html` as the reference material input that skill asks
for. Flag explicitly during porting:

- Rewrite first-person copy ("I built...", "I recruited...") per
  `case-study-create`'s "Copy" rules — the portfolio's voice avoids
  first person in body copy; a drafting pass in this skill's format
  commonly still has it.
- Replace every `capture-ph` placeholder with a real asset or an explicit
  decision to keep it out of the shipped page.
- Illustrated stand-ins (the hand-coded mockups) are a drafting aid, not
  a delivery pattern — decide per-visual whether the real case study needs
  a real screenshot, a proper React diagram component, or nothing.
