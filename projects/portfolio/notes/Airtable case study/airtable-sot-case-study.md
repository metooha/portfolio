# Airtable as Source of Truth
### Design & Engineering Alignment Through a Shared Token Infrastructure
**Living Design · Walmart Commerce Platform**
*Amy Ha · 2024–2025*

---

## The Short Version

We went from 17+ teams maintaining their own copies of design tokens — manually, inconsistently, and constantly out of sync — to a single automated pipeline where a designer updates a value in Airtable and it's live in production in 10 minutes. Zero manual steps. Zero coordination. Zero errors.

---

## STAR Case Study

### Situation

The Living Design system is built on a white-label core library where theming is owned at the subsystem level. The core team intentionally restricted access to their Figma files and did not support direct token contribution or distribution — leaving Figma off the table as a source of truth. At the same time, each platform (iOS, Android, Web) maintained its own independent token repositories, making GitHub equally fragmented. Critical token categories — including motion, layout, and composition — had no single authoritative home.

The result was decentralized, manually-maintained work: teams kept their own copies of tokens, and without a shared source of truth, design intent was consistently lost in translation during engineering handoff.

For commerce applications specifically, the problem was compounded. We needed an extended token set for branding, commerce-specific components, and the ability to serve multiple engineering organizations — none of which the core system was scoped to support.

**The human cost:** Teams were doing the same work twice. Designers and engineers couldn't trust they were looking at the same thing, which meant decisions made in design were constantly re-litigated during implementation. Commerce teams had no clear place to go for answers, so they built in isolation — creating more inconsistency and more overhead. The cost wasn't just inefficiency, it was eroded trust between teams.

---

### Task

Establish Airtable as a shared, human-readable source of truth for design tokens that:

- Designers could actually use and maintain without engineering skills
- Engineers across iOS, Android, and Web could pull from on their own cadence
- Supported multiple brands and themes (Walmart US, Sam's Club, Bodega, Cashi)
- Didn't require access to restricted Figma files or raw GitHub repositories
- Could scale to support subsystem teams beyond the core Living Design team

---

### Action

The work unfolded in three phases across roughly 18 months.

**Phase 1 — Establish the Foundation (Q3–Q4 2024)**

The first challenge was alignment, not tooling. No one agreed on what the source of truth should be. Engineering wanted code-native workflows. Design wanted visibility and simplicity. The core team had restrictions. Platform teams had their own habits.

I mapped the full stakeholder landscape — decision makers, platform leads, subsystem designers, and engineering collaborators — and ran structured working sessions to surface the real blockers. The outcome was a proposal: Airtable as the human-readable source, connected to engineering workflows through a lightweight script layer.

I partnered with Shawn (WCP engineering lead) on a proof of concept that demonstrated tokens could be pulled from Airtable via API and consumed by platform tooling. This gave us something concrete to show leadership and resolved the abstract debate with working code.

Key decisions made during this phase:
- Airtable as SoT (not Figma, not GitHub) because designers would actually use it correctly at scale
- Token taxonomy and information architecture defined so all platforms could write consistent pull scripts
- RACI model established to clarify who owned what — a gap that had caused friction for months

**Phase 2 — Automate and Scale (Q1–Q2 2025)**

Once Airtable was established as the SoT, the next problem surfaced: it was still too manual. Setting up a new tenant took 4 hours. Human errors were causing script failures. New team members couldn't onboard without extensive hand-holding.

I led the design of an automation strategy to remove the manual steps that were creating the most friction:

- Restructured the Airtable information architecture to remove legacy bloat and standardize naming conventions (base name confusion was the single biggest source of human error in scripts)
- Designed user flows for a designer-friendly form to onboard new tenants without requiring deep knowledge of token structure
- Worked with Zach (iOS/Web engineering lead) to define an intermediate JSON representation — a contract between Airtable and all consuming platforms — so column changes in Airtable wouldn't create breaking changes in engineering scripts
- Defined the theme inheritance model: each tenant contains only overrides, with a hierarchy file providing inheritance rules (Sam's Club inherits from WCP, WCP inherits from LD Base)

**Phase 3 — End-to-End Automation (Q3–Q4 2025)**

The final phase closed the loop. I worked with Zach to implement a fully automated CI/CD pipeline:

`Airtable → Style Dictionary → GitHub Actions → Artifactory/npm`

The pipeline handles token validation, semantic versioning (Major/Minor/Patch based on change impact), and multi-channel distribution — Artifactory for production, GitHub for development. 347 automated tests run on every sync. If a token breaks — an alias pointing to nothing, a hardcoded hex value where a token reference should be — the pipeline stops and designers get a Slack alert within 5 minutes.

Asset tokens (icons, SVGs, logos) were also brought into the pipeline, which required solving a different class of problem: physical files that needed optimization (SVGO), platform-specific conversion (PDF for iOS, VectorDrawables for Android), and versioned packaging alongside JSON.

---

### Result

| Before | After |
|--------|-------|
| 2–3 days per token update | 10 minutes from edit to production |
| ~15% error rate on manual exports | 0% error rate with 347 automated tests |
| 17+ teams maintaining separate copies | Single source of truth for all platforms |
| Dark mode broken for 1+ year | Full dark mode support restored |
| 4 hours to onboard a new tenant | Automated onboarding flow |
| Constant design/eng coordination | Zero coordination required |

The theme hierarchy system alone eliminated duplication across 650+ tokens and 17 brand themes. When LD Base updates, all downstream tenants receive the change automatically on the next sync.

The approach became the reference architecture for onboarding new tenants — Cashi, Walmart Business, Bodega — and earned sign-off from Living Design leadership (Logan) and Global Tech leadership (Satya).

---

## Presentation Slides (with Speaker Notes)

---

**Slide 1: Title**
> *From 3 Days to 10 Minutes: Airtable as Design & Engineering Source of Truth*

**Speaker notes:** This is a story about trust. Before this project, designers and engineers couldn't agree on what the right answer even looked like. After it, the question became irrelevant — the system just worked.

---

**Slide 2: The Situation**
> *No shared source of truth. Tokens were duplicated, platforms were fragmented, and commerce needs were unmet.*

**Speaker notes:** Teams were doing the same work twice. Designers and engineers couldn't trust they were looking at the same thing, which meant decisions made in design were constantly re-litigated during implementation. Commerce teams had no clear place to go for answers, so they built in isolation. The cost wasn't just inefficiency — it was eroded trust between teams.

---

**Slide 3: The Scale of the Problem**
> *17+ brand themes. iOS, Android, Web. Each team maintaining their own copy.*

**Speaker notes:** Every token update required 2–3 days of manual coordination. A designer exported, handed off to an engineer, who manually verified and committed. Errors were common and rollbacks were painful. And because every team had their own version, there was no way to know which one was actually right.

---

**Slide 4: Why Figma and GitHub Weren't the Answer**
> *Figma: access restricted. GitHub: too much engineering overhead. Design ownership broke down.*

**Speaker notes:** The core team restricted Figma access by design. GitHub required engineering skills to safely edit structured data — and when the source of truth lives in a JSON file in a repo, designers stop being owners. We needed something in between.

---

**Slide 5: The Decision — Airtable as SoT**
> *Tool selection should follow team behavior. Designers will actually use Airtable correctly at scale.*

**Speaker notes:** This wasn't the most technically elegant choice. But it was the right one. Airtable gave designers ownership. It gave engineers a reliable API. And it gave leadership an auditable, governed system. The pipeline was the bridge — not a tool mandate for either side.

---

**Slide 6: The Pipeline**
> *Airtable → Style Dictionary → GitHub Actions → Artifactory*

**Speaker notes:** Designers work in Airtable. Engineers consume versioned tokens. The pipeline validates, transforms, versions, and deploys — automatically. No coordination needed. The pipeline is the governance.

---

**Slide 7: Theme Inheritance**
> *Each theme contains only overrides. One change in LD Base cascades to all 17 tenants.*

**Speaker notes:** Sam's Club defines about 10% of its tokens. The other 90% fall through to the core semantic layer automatically. This eliminated duplication across 650+ tokens and made it possible for one person to maintain a system that serves 17 brands.

---

**Slide 8: Safety Net**
> *347 automated tests. If something breaks, the pipeline stops — not the product.*

**Speaker notes:** The hardest part wasn't building the system. It was getting people to trust it. The 347 tests were how we earned that trust. Fail fast, fail loud. Designers get a Slack alert within 5 minutes. The system — not a person — is the gatekeeper.

---

**Slide 9: The Result**
> *95% faster. 0% error rate. 17 themes. Zero coordination required.*

**Speaker notes:** A designer updates a color in Airtable. Ten minutes later it's in production on iOS, Android, and Web. Nobody had to ask anyone. Nobody had to wait. That's what alignment actually looks like.

---

**Slide 10: What's Next**
> *Automated dynamic SVG theming for illustrations and brand assets.*

**Speaker notes:** Icons and SVGs are solved. The next frontier is illustrations — pictograms that need to respond to theme changes dynamically. The infrastructure is in place. Now we extend it.

---

## Interview Q&A Bank

### On Conflict and Governance

**Q: Tell me about a time you had to balance design flexibility with engineering governance.**

The 17 platform teams had fragmented tokens — each team maintained their own copy, and drift between what designers specified and what shipped was constant. Design wanted Airtable for collaborative documentation; engineering wanted a code-native, automatable workflow. I needed to satisfy both without mandating a full tooling change for either side.

I brokered a hybrid solution: Airtable as the human-readable source, transformed via Style Dictionary into JSON and synced through GitHub Actions CI. Designers kept Airtable. Engineers kept Git. The pipeline was the bridge.

The outcome was 0% error rate post-launch and restored consistent dark mode support across all 17 platforms — something that had been broken for over a year because the manual export process was too fragile.

---

### On Efficiency and Impact

**Q: Describe a situation where you identified a massive efficiency gap.**

Every token update required 3 days of manual coordination — a designer exported, handed off to an engineer, who manually verified and committed. Errors were common and rollbacks were painful. My goal was to reduce that cycle and give designers a path to publish changes directly, without requiring engineering intervention for routine updates.

I designed the Airtable information architecture, defined the JSON contract with the engineering lead, and oversaw implementation of the CI/CD pipeline end to end.

Token updates now take 10 minutes from edit to production across all platforms, with 347 automated tests on every sync catching issues before they reach any consumer.

---

### On Stakeholder Trust

**Q: How do you handle stakeholder skepticism when introducing a new tool?**

Key stakeholders raised real concerns — Airtable's cost model, long-term viability, whether governance could actually be enforced at scale. These weren't unreasonable questions.

I didn't argue against them. I built a RACI model to assign clear ownership, ran a live proof of concept with the WCP engineering lead, and implemented 347 automated safety tests that block any broken token from reaching production. The safety net was the argument.

Leadership approved the full multi-brand rollout. The approach became the reference architecture for every new tenant onboarding after that.

---

### On Cross-Team Collaboration

**Q: Tell me about a time you had to bridge a significant gap between two teams.**

Design and engineering were at odds — designers needed the ease of Airtable, engineers required the version control and safety of Git. These weren't compatible preferences on the surface.

I partnered with engineering to build an automated pipeline that translated Airtable rows into Git-committed JSON. We defined a governance model where Airtable is the source, Style Dictionary is the transformer, and GitHub Actions is the delivery engine.

We moved from 72 hours of manual effort to a 10-minute automated flow. Neither team had to give up their tool. The pipeline did the translation.

---

### On Simplification

**Q: Describe a time you simplified a complex system for non-technical stakeholders.**

The technical architecture — Airtable → GitHub Actions → Style Dictionary → Artifactory — was a black box to most stakeholders. They were skeptical and afraid of losing control.

I reframed the narrative around outcomes, not architecture. The story wasn't "we built a pipeline." It was "a designer changes a color and it's live in 10 minutes." I also built a preview mode so stakeholders could see changes in Airtable before they were committed to Git — giving them visibility without requiring technical fluency.

They approved project funding and became internal advocates.

---

### On Scale

**Q: How do you handle design system architecture at massive scale?**

Across Walmart US and Sam's Club, we had to support 17+ platforms using one design language while they were all shipping different versions. We needed brand-specific flexibility without duplicating core tokens.

I implemented a Theme Inheritance Architecture: LD Base holds 650+ tokens. WCP adds commerce-specific overrides. Brand themes (Sam's Club, Walmart+, Bodega) contain only their specific overrides. Each level inherits everything above it.

Each theme now contains only what's unique to it. One change in LD Base cascades automatically to all 17 tenants.

---

## Technical Deep Dives

**Why Airtable over Figma Variables?**
Figma Variables lacked versioning, a collaborative audit history, and a production-grade API at our scale. They're scoped to a single file and don't support cross-team inheritance. Airtable provides relational data structures critical for alias tokens and was already being adopted by non-engineering collaborators. Tool selection followed team behavior — not the other way around.

**Why not GitHub JSON directly?**
GitHub requires engineering skills to safely edit structured data. Design ownership of tokens breaks down when the source of truth is a JSON file in a repo. Governance becomes implicit, and routine updates require engineering review cycles. We needed designers to own their work end to end.

**The 347 tests — what do they catch?**
Two failure modes dominated our test coverage because they caused the most silent, hard-to-debug production issues:
- **Alias breaks** — a token referencing another token that no longer exists. These create silent fallback failures on native platforms that are nearly impossible to debug without a full token audit.
- **Hex-to-token mismatches** — hardcoded hex values accidentally committed in place of token references, undermining the entire governance model.

**How does the theme hierarchy work?**
Three layers:
1. **Primitive** — raw values (hex, px, font sizes). No semantic meaning.
2. **Semantic** — alias tokens that map intent to primitives (e.g. `colorTextDefault → gray-900`). Shared by all brands inheriting from LD Base.
3. **Subsystem** — brand-specific overrides only. Sam's Club defines ~10% of tokens here; the remaining 90% fall through to the semantic layer automatically.

---

## Key Metrics

- **Speed:** 95% faster deployment (2–3 days → 10 minutes)
- **Quality:** 0% error rate (347 automated tests, zero manual steps)
- **Scale:** 17 themes, 650+ tokens, self-service distribution
- **Adoption:** Zero coordination required — teams pull versioned tokens on their own schedule
- **Tenant setup:** 4 hours → automated onboarding flow
- **Dark mode:** Restored across all 17 platforms after 1+ year broken

---

*Living Design · Walmart Commerce Platform · Amy Ha*
