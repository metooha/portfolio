# Conversational UI Kit — case study

Two versions of this case study live here, both built with the
`case-study-builder` skill (`~/.claude/skills/case-study-builder`).

## `rebuilt.html` (current) — polished, debranded, Distinguished Principal framing

Built from `rebuilt_uc.html` via `build_cs.py`, `part_head_nav.html`, and
`part_footer.html`, following the skill's modular build pattern. Regenerate
with:

```
python3 build_cs.py
```

What changed from the raw draft:

- **Debranded for external audiences**: removed the literal "Walmart"
  mention (a stray CSS comment), renamed internal-codename CSS classes
  (`b-sparky` → `b-shop`, `b-wmt` → `b-storefront`, `b-bodega` → `b-market`,
  `b-sams` → `b-club`, `al-wcp` → `al-platform`), replaced "Associate tools"
  with "Staff tools", replaced "LD taxonomy" with "design system taxonomy",
  and swapped the internal `Everyday Sans` font reference for the generic
  `DM Sans` stack. Visible copy was already using neutral product labels
  ("Shopping Assistant", "Regional Market", etc.) — the leaks were all in
  markup/CSS that only shows up in view-source.
- **All emoji replaced with inline SVG icons** (stroke-style, 20-22px,
  `currentColor`), per the skill's mandatory no-emoji rule. The `✓`
  checkmarks for binary outcomes were kept — the skill explicitly allows
  those.
- **Targeted Distinguished Principal** (the craft-and-influence IC ladder,
  not Design Director/people-leadership). The draft already carried strong
  DP signals (the tradeoff-decision box, the ambiguity callout, "leading
  through influence, not authority," the framework-reuse block) — largely
  no framing rewrite was needed.
- **One dedup trim**: the Governance section's "Handoff to standing teams"
  card restated the Alignment timeline's handoff beat almost verbatim; cut
  to a single new-information clause (decision rights/escalation paths)
  since the Impact section's multiplier block already owns the full
  handoff explanation.
- Zero em dashes, verified by grep (one was hiding in a CSS comment).

Still open, same as the original draft: `impact-grid` / `mb-stats` numbers
are `[ # ]` placeholders, and several `capture-ph` blocks mark real
screenshots (audit spread, project brief, team structure, recipe output,
analysis tracker, impact dashboard, live product) that still need to be
captured.

## `rebuilt_uc.html` (original) — raw draft, first-person, not debranded

Kept as-is for reference/audit trail. Built from `build_uc.py`, which
depends on two partials (`part_head_nav_uc.html`, `part_footer_uc.html`)
that were never captured, so it can't be re-run.

## Not yet in the live portfolio

Neither version is wired into `case-studies-config.ts`. This is still a
standalone HTML deliverable. Porting it into a real `CaseStudyConfig`
entry in the React app is a separate step (see the `case-study-create`
skill in `.cursor/skills/` / `.claude/skills/`).
