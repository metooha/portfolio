import React from "react";
import {
  Eyebrow as EdsEyebrow,
  ImageFull as EdsImageFull,
  Lead as EdsLead,
  SectionTitle as EdsSectionTitle,
  StatsRow as EdsStatsRow,
} from "@/app/components/CaseStudyPrimitives";
import {
  OportunArchitectureTimeline,
  OportunComponentAnatomy,
  OportunDecisionGrid,
  OportunGovernanceTable,
  OportunNumberedChallengeCards,
  OportunPipeline,
  OportunToken,
  OportunTokenTierDiagram,
  type OportunAnatomyItem,
  type OportunChallengeItem,
  type OportunDecisionCard,
  type OportunGovernanceRow,
  type OportunPipeStep,
  type OportunTimelineItem,
  type OportunTokenTier,
} from "./OportunDsCaseStudyBlocks";
import {
  OportunDsChallengeVisual,
  OportunDsLoanCalculatorPrototype,
  OportunDsTransferMoneyPrototype,
} from "./OportunDsCaseStudyVisuals";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
} from "@/app/components/Carousel/Carousel";
import { Body, Heading } from "@/app/components/Text/Text";
import imgInitialPlanning from "@/app/assets/pages/case-study/oportun-ds/01-initial-planning.png";
import imgPersonasAndUserScenarios from "@/app/assets/pages/case-study/oportun-ds/02-personas-and-user-scenarios.png";
import imgTeamAuditOfComponents from "@/app/assets/pages/case-study/oportun-ds/03-team-audit-of-components.png";
import imgRoadmapAndPainPoints from "@/app/assets/pages/case-study/oportun-ds/04-roadmap-and-pain-points.png";
import imgRoadmapWithEngTeam from "@/app/assets/pages/case-study/oportun-ds/05-roadmap-with-eng-team.png";
import { OportunSnackbarMockup } from "./OportunSnackbarMockup";
import imgTokenNaming from "@/app/assets/pages/case-study/oportun-ds/token-naming.png";
import imgFoundationColor from "@/app/assets/pages/case-study/oportun-ds/color-palettes-themes-brand-and-use-cases.png";
import imgFoundationType from "@/app/assets/pages/case-study/oportun-ds/typography-scale-fundamentals-and-tokens.png";
import imgFoundationSpacing from "@/app/assets/pages/case-study/oportun-ds/spacing-handoff-units-and-icon-screens.png";
import imgFoundationIconsControls from "@/app/assets/pages/case-study/oportun-ds/icons-glyphs-handoff-and-usage-guide.png";
import imgFoundationBrandExplorations from "@/app/assets/pages/case-study/oportun-ds/brand-guidelines-toolkit-and-mobile-flows.png";
import {
  imgTrainingGuidesOfficeHours,
  imgContributionsGuideOverview,
  imgContributionsComponents,
  imgTrainingGuidesReadingList,
  imgContributionsIcons,
  imgTrainingGuidesFigmaOportun,
  imgTrainingGuidesOnboarding,
} from "@/app/assets/pages/case-study/oportun-ds/assets";

const SECTION_OUTER = "w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px]";
const SECTION_INNER = "w-full max-w-4xl lg:max-w-[1046px] flex flex-col gap-6";

const SURFACE = "var(--ld-semantic-color-fill, #ffffff)";
const SURFACE_SUBTLE = "var(--ld-semantic-color-fill-subtle, #f0f1f2)";
const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";
const GREEN_TINT = "#f0f7f3";

function Section({
  id,
  background = SURFACE,
  gap = "gap-10",
  children,
}: {
  id?: string;
  background?: string;
  gap?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="w-full shrink-0 border-b"
      style={{
        background,
        borderColor: SEPARATOR,
        paddingTop: "var(--ld-semantic-spacing-1000, 5rem)",
        paddingBottom: "var(--ld-semantic-spacing-1000, 5rem)",
      }}
    >
      <div className={`${SECTION_OUTER} flex flex-col ${gap}`}>{children}</div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className={SECTION_INNER}>
      <EdsEyebrow>{eyebrow}</EdsEyebrow>
      <EdsSectionTitle>{title}</EdsSectionTitle>
      {lead ? <EdsLead>{lead}</EdsLead> : null}
    </div>
  );
}

// ── Data ────────────────────────────────────────────────────────────

const CHALLENGE_ITEMS: OportunChallengeItem[] = [
  {
    number: "01",
    title: "Two incompatible systems",
    body: "Neither existing system could serve a unified product without a full rebuild.",
  },
  {
    number: "02",
    title: "Building while shipping",
    body: "Product teams needed components before the foundation was complete.",
  },
  {
    number: "03",
    title: "No stress-test window",
    body: "Adoption had to happen in parallel with construction. Governance had to work from day one.",
  },
  {
    number: "04",
    title: "Design & technical debt risk",
    body: "Every shortcut needed to be a deliberate tradeoff, not an oversight.",
  },
];

const APPROACH_ITEMS: OportunTimelineItem[] = [
  {
    date: "Week 1–2",
    phase: "Audit & scope",
    who: ["design", "engineering"],
    title: "Mapping the inheritance problem",
    body: "Audited both systems to identify what to preserve, rebuild, and where token overlap was highest, separating rebranding effort from net-new work.",
    decision: (
      <>
        Adopted a three-tier token model: <OportunToken>colors/green/300</OportunToken> →{" "}
        <OportunToken>surface.brand.primary</OportunToken> →{" "}
        <OportunToken>button.surface.primary.default</OportunToken>, so both brands share one
        primitive set with differentiation at the alias layer, and light/dark mode handled
        automatically.
      </>
    ),
  },
  {
    date: "Week 2–3",
    phase: "Roadmap & OKRs",
    who: ["design", "engineering", "product"],
    title: "Defining success before building anything",
    body: "Outlined OKRs with engineering and product leadership, then built a phased delivery roadmap that prioritized the components covering the most product surface first.",
  },
  {
    date: "Week 3–4",
    phase: "Foundations",
    who: ["design"],
    title: "Token infrastructure",
    body: "Built the full token hierarchy (color, typography, spacing, radius, elevation, motion) and defined the theming model that lets both brands switch expression at the semantic layer without touching components.",
    decision: (
      <>
        Generated the color scale from WCAG contrast-ratio targets rather than hand-picked values.
        Each index (50→900) hits a specific contrast ratio against <OportunToken>gray50</OportunToken>
        , ensuring AA/AAA compliance at every step across both brand themes automatically.
      </>
    ),
  },
  {
    date: "Month 2–4",
    phase: "Component library",
    who: ["design"],
    title: "100+ components, built against real product flows",
    body: "Every component was designed against live product needs, not hypothetical use cases, so stress testing happened through actual product work instead of a separate QA phase.",
  },
  {
    date: "Month 3–5",
    phase: "Testing",
    who: ["design"],
    title: "Designers as first adopters",
    body: "Product designers used the system in live work and gave structured critique, surfacing governance gaps and missing states before engineering handoff, while changes were still low-cost.",
  },
  {
    date: "Month 4–6",
    phase: "Dev handoff",
    who: ["design", "engineering"],
    title: "From Figma to production infrastructure",
    body: "Added full developer documentation (use cases, component specs, token references, accessibility requirements) and partnered with engineering to move from project assets to shared platform infrastructure.",
  },
];

const TOKEN_TIERS: OportunTokenTier[] = [
  {
    tier: "Tier 1",
    name: "Primitives",
    desc: "Raw values. Never used directly in components.",
    connector: "Alias tokens reference primitives: light / dark mode values swap here",
    tokens: [
      { label: "colors/gray/50" },
      { label: "colors/gray/300" },
      { label: "colors/gray/900" },
      { label: "colors/green/300" },
      { label: "colors/green/800" },
      { label: "colors/orange/300" },
      { label: "colors/blue/300" },
      { label: "colors/red/300" },
      { label: "overlay/dark/30" },
    ],
  },
  {
    tier: "Tier 2",
    name: "Aliases",
    desc: "Semantic intent. Light & dark values defined here.",
    connector: "Component tokens reference aliases only, never primitives directly",
    tokens: [
      { label: "surface.neutral.primary", tone: "green" },
      { label: "surface.brand.primary", tone: "green" },
      { label: "surface.primary.btn.default", tone: "green" },
      { label: "text.neutral.primary", tone: "green" },
      { label: "text.semantic.critical", tone: "orange" },
      { label: "text.semantic.success", tone: "orange" },
      { label: "stroke.brand.brand1", tone: "green" },
      { label: "icon-fill.intent.critical", tone: "orange" },
      { label: "text-link.brand1.default", tone: "green" },
    ],
  },
  {
    tier: "Tier 3",
    name: "Component",
    desc: "Scoped to a component. What engineers consume.",
    tokens: [
      { label: "button.surface.primary.default" },
      { label: "button.surface.primary.hover" },
      { label: "button.foreground.default.onDark" },
      { label: "input.stroke.default" },
      { label: "snackbar.surface.default" },
      { label: "intent.success.default" },
      { label: "intent.critical.default" },
    ],
  },
];

const FOUNDATION_SLIDES = [
  { src: imgFoundationColor, alt: "Oportun design system color foundations, palettes, brand swatches, and use cases", label: "Color" },
  { src: imgFoundationType, alt: "Oportun design system typography foundations, typescale, and tokens", label: "Typography" },
  { src: imgFoundationSpacing, alt: "Oportun design system spacing grid units, characteristics, and usage guidance", label: "Spacing" },
  { src: imgFoundationIconsControls, alt: "Oportun design system icons, glyphs, controls, and handoff specs", label: "Icons & controls" },
  { src: imgFoundationBrandExplorations, alt: "Brand explorations applying the design system tokens across product design", label: "Brand explorations" },
] as const;

const DECISION_CARDS: OportunDecisionCard[] = [
  {
    symbol: "⬡",
    title: "Headless token model over per-brand component sets",
    body: "One shared component library; both brands reference through their own semantic token sets. Maintenance cost halved, brand differentiation fully preserved.",
    badge: "Scalability",
  },
  {
    symbol: "⊞",
    title: "Formula-based color scales, not curated palettes",
    body: "A consistent lightness formula guarantees contrast at every step and keeps the palette extensible for future brand needs.",
    badge: "Governance",
  },
  {
    symbol: "◈",
    title: "Standardized component page architecture",
    body: "Every component: Overview → Guidelines → References → Handoff & Theming → Inventory → Versioning. Engineers and designers self-serve without re-learning the structure.",
    badge: "Adoption",
  },
  {
    symbol: "↗",
    title: "Prioritized by product surface coverage",
    body: "Built highest-coverage components first (buttons, inputs, cards, nav) so product teams could adopt immediately, creating real-world stress testing early.",
    badge: "Velocity",
  },
];

const ANATOMY_SPEC: OportunAnatomyItem[] = [
  { name: "Guidelines", value: "Usage rules, best practices, accessibility requirements", dot: "design" },
  { name: "References & Best Practices", value: "Live product usage examples and implementation patterns", dot: "engineering" },
  { name: "Handoff & Theming", value: "Token bindings, size / color / stroke, theming for both brands", dot: "orange" },
  { name: "Inventory & Requests", value: "Current usage, contribution requests, enhancement backlog", dot: "product" },
  { name: "Versioning", value: "Deprecated assets flagged, not deleted, engineers redirected", dot: "design" },
];

const ANATOMY_BINDINGS: OportunAnatomyItem[] = [
  { name: "background", value: "snackbar.surface.default → surface.neutral.primary-invert", dot: "design" },
  { name: "label", value: "snackbar.text → text.neutral.primary-invert", dot: "orange" },
  { name: "action link", value: "snackbar.action → text-link.brand1.default-invert", dot: "engineering" },
  { name: "icon", value: "snackbar.icon → icon-fill.neutral.primary-invert", dot: "product" },
  { name: "overlay / scrim", value: "snackbar.overlay → surface.overlay.primary → overlay/dark/30", dot: "design" },
];

const PIPELINE_STEPS: OportunPipeStep[] = [
  { label: "Source", tool: "Figma", desc: "Token variables + component library with full states and theming." },
  { label: "Export", tool: "Tokens Plugin", desc: "Structured JSON: global, semantic, and component tiers." },
  { label: "Version control", tool: "GitHub", desc: "Token diffs visible to engineering on every PR." },
  { label: "Docs", tool: "Storybook", desc: "Live examples, token references, accessibility notes." },
  { label: "Output", tool: "Production", desc: "CSS variables consumed directly from token JSON." },
];

const GOVERNANCE_COLUMNS = ["Designer", "Engineer", "DS Owner"];

const GOVERNANCE_ROWS: OportunGovernanceRow[] = [
  {
    action: "Use existing components",
    cells: [
      { label: "Autonomous", color: "positive" },
      { label: "Autonomous", color: "positive" },
      { label: "Not needed", color: "gray" },
    ],
  },
  {
    action: "Request a new component",
    cells: [
      { label: "Submit via Inventory", color: "green" },
      { label: "Submit via Inventory", color: "green" },
      { label: "Reviews & prioritizes", color: "info" },
    ],
  },
  {
    action: "Modify a semantic token",
    cells: [
      { label: "Propose + rationale", color: "warning" },
      { label: "Propose + rationale", color: "warning" },
      { label: "Approves", color: "positive" },
    ],
  },
  {
    action: "Add a global primitive",
    cells: [
      { label: "Escalate", color: "neutral" },
      { label: "Escalate", color: "neutral" },
      { label: "Owner decision", color: "positive" },
    ],
  },
  {
    action: "Deprecate a component",
    cells: [
      { label: "Flag for review", color: "warning" },
      { label: "Flag for review", color: "warning" },
      { label: "Executes protocol", color: "positive" },
    ],
  },
];

const DOCS_SLIDES = [
  { src: imgTrainingGuidesOfficeHours, alt: "Office Hours for Design Systems title slide with a clock, calendar, and study illustrations", label: "Office hours" },
  { src: imgContributionsGuideOverview, alt: "Contribution guides overview page covering icons, emojis, documentation, patterns/subcomponents, and engineering", label: "Contribution guides" },
  { src: imgContributionsComponents, alt: "Components contribution guide covering creation process, properties, atoms, molecules, native UI components, and component review", label: "Components" },
  { src: imgTrainingGuidesReadingList, alt: "Reading list table organizing onboarding and foundations content by category, tags, and assignment", label: "Reading list" },
  { src: imgContributionsIcons, alt: "Icons contribution guide detailing how to find, request, and add new icons to the design system", label: "Icons" },
  { src: imgTrainingGuidesFigmaOportun, alt: "Figma and Oportun onboarding illustration introducing how the team uses Figma", label: "Figma + Oportun" },
  { src: imgTrainingGuidesOnboarding, alt: "Onboarding page with team mission and onboarding checklist covering Figma, FigJam, plugins, and reading list", label: "Onboarding" },
] as const;

const VALIDATION_CARDS: OportunDecisionCard[] = [
  {
    icon: "CheckCircle",
    title: "What these flows tested",
    body: "Multi-step forms, calculator inputs, data display, empty states, error handling, progressive disclosure: the complex patterns that reveal whether a system is production-ready or just a component showcase.",
  },
  {
    icon: "Refresh",
    title: "How findings fed back into the system",
    body: "Every gap surfaced during product work was triaged: immediate fixes for blockers, backlog items for the rest. This feedback loop is what makes a system a living product, not a static artifact.",
  },
];

const RESULTS_IMPACT = [
  "Led design systems work across a two-brand fintech ecosystem, architecting the foundation rather than inheriting one.",
  "Partnered with engineering to move from per-project assets to shared platform infrastructure, with tokens as the design-to-code contract.",
  "Established documentation, adoption tracking, and accessibility standards across design and engineering.",
  "Reduced per-feature design decision overhead by creating a single source of truth across both brands.",
];

// ── Sections ────────────────────────────────────────────────────────

export function OportunDsChallengeSection() {
  return (
    <Section id="challenge">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8 lg:gap-12 items-center">
        <div className="flex flex-col gap-6">
          <EdsEyebrow>The challenge</EdsEyebrow>
          <EdsSectionTitle>Not a rebrand. An infrastructure problem.</EdsSectionTitle>
          <EdsLead>
            Oportun acquired Digit in March 2022, combining two products, two design teams, and two
            incompatible design systems under one org. We had to design and build simultaneously,
            with no runway to architect first and hand off later.
          </EdsLead>
        </div>
        <OportunDsChallengeVisual />
      </div>
      <OportunNumberedChallengeCards items={CHALLENGE_ITEMS} />
    </Section>
  );
}

export function OportunDsApproachSection() {
  return (
    <Section id="approach" background={SURFACE_SUBTLE}>
      <SectionHeader
        eyebrow="The approach"
        title="Architecture first, components second."
        lead="Before any component was built, the team aligned on the token model, the roadmap, and the OKRs that would tell us the system was working."
      />
      <div className="w-full max-w-4xl lg:max-w-[1046px]">
        <OportunArchitectureTimeline items={APPROACH_ITEMS} />
      </div>
      <div className="w-full max-w-4xl lg:max-w-[1046px]">
        <Carousel aria-label="Design system planning and roadmapping">
          <CarouselContent>
            <CarouselItem cols={1}>
              <EdsImageFull
                src={imgInitialPlanning}
                alt="Initial planning board for the design system architecture"
                label="Initial planning"
              />
            </CarouselItem>
            <CarouselItem cols={1}>
              <EdsImageFull
                src={imgPersonasAndUserScenarios}
                alt="Personas and user scenarios mapped out for the design system"
                label="Personas & user scenarios"
              />
            </CarouselItem>
            <CarouselItem cols={1}>
              <EdsImageFull
                src={imgTeamAuditOfComponents}
                alt="Team audit of existing components across both brands"
                label="Team audit of components"
              />
            </CarouselItem>
            <CarouselItem cols={1}>
              <EdsImageFull
                src={imgRoadmapAndPainPoints}
                alt="Roadmap and pain points identified during planning"
                label="Roadmap & pain points"
              />
            </CarouselItem>
            <CarouselItem cols={1}>
              <EdsImageFull
                src={imgRoadmapWithEngTeam}
                alt="Roadmap workshop session with the engineering team"
                label="Roadmap with eng team"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselPagination />
        </Carousel>
      </div>
    </Section>
  );
}

export function OportunDsTokenArchitectureSection() {
  return (
    <Section id="tokens">
      <SectionHeader
        eyebrow="Foundation architecture"
        title="Three-tier token system: one shared foundation."
        lead="Both brands share a single token hierarchy. Brand differentiation lives entirely at the semantic layer: one component file, two brand expressions, zero duplication."
      />
      <div className="w-full max-w-4xl lg:max-w-[1046px]">
        <OportunTokenTierDiagram tiers={TOKEN_TIERS} />
      </div>
      <div className="w-full max-w-4xl lg:max-w-[1046px] flex flex-col gap-10">
        <EdsImageFull
          src={imgTokenNaming}
          alt="Token naming convention diagram showing how #000000 resolves through gray900 → surface.primary.default → button.surface.primary.default"
          label="Token naming convention"
        />
        <div className="flex flex-col gap-6">
          <EdsLead>
            The token file drives the foundations designers actually work from (color, typography,
            spacing, and iconography), so a change at the source ripples predictably through every
            surface.
          </EdsLead>
          <Carousel aria-label="Design system foundations">
            <CarouselContent>
              {FOUNDATION_SLIDES.map((slide) => (
                <CarouselItem key={slide.label} cols={1}>
                  <EdsImageFull src={slide.src} alt={slide.alt} label={slide.label} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselPagination />
          </Carousel>
        </div>
      </div>
    </Section>
  );
}

export function OportunDsDecisionsSection() {
  return (
    <Section id="decisions" background={SURFACE_SUBTLE}>
      <SectionHeader eyebrow="Architecture decisions" title="The calls that determined scalability." />
      <div className="w-full max-w-4xl lg:max-w-[1046px]">
        <OportunDecisionGrid cards={DECISION_CARDS} />
      </div>
    </Section>
  );
}

export function OportunDsComponentLifeCycleSection() {
  return (
    <Section id="component-life-cycle">
      <SectionHeader
        eyebrow="Component life cycle"
        title="A component is a contract, not a UI element."
        lead="Every component ships with its full specification, not just visuals. The Snack Bar shows how the architecture works in practice."
      />
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-stretch">
        <figure className="m-0 w-fit max-w-full shrink-0 self-start">
          <OportunSnackbarMockup className="rounded-xl" />
        </figure>
        <OportunComponentAnatomy
          specLabel="Component specification"
          spec={ANATOMY_SPEC}
          bindingsLabel="Token bindings: Snack Bar"
          bindings={ANATOMY_BINDINGS}
          className="min-h-0"
        />
      </div>
    </Section>
  );
}

export function OportunDsPipelineSection() {
  return (
    <Section id="pipeline" background={SURFACE_SUBTLE}>
      <SectionHeader
        eyebrow="Design-to-code workflow"
        title="Tokens as the contract between Figma and production."
      />
      <div className="w-full max-w-4xl lg:max-w-[1046px] flex flex-col gap-10">
        <OportunPipeline steps={PIPELINE_STEPS} />
      </div>
    </Section>
  );
}

export function OportunDsGovernanceSection() {
  return (
    <Section id="governance">
      <SectionHeader
        eyebrow="Governance model"
        title="Systems without governance become libraries."
      />
      <div className="w-full max-w-4xl lg:max-w-[1046px]">
        <OportunGovernanceTable columns={GOVERNANCE_COLUMNS} rows={GOVERNANCE_ROWS} />
      </div>
      <div className="w-full max-w-4xl lg:max-w-[1046px] flex flex-col gap-6">
        <EdsLead>
          Governance only works when it is documented and teachable. I built the docs, contribution
          guides, and onboarding syllabus that turned the system into something teams could learn
          and extend on their own.
        </EdsLead>
        <Carousel aria-label="Design system documentation and governance">
          <CarouselContent>
            {DOCS_SLIDES.map((slide) => (
              <CarouselItem key={slide.label} cols={1}>
                <EdsImageFull src={slide.src} alt={slide.alt} label={slide.label} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselPagination />
        </Carousel>
      </div>
    </Section>
  );
}

export function OportunDsInActionSection() {
  return (
    <Section id="in-action" background={GREEN_TINT}>
      <SectionHeader
        eyebrow="Design system in action"
        title="Validating the system in high-stakes flows."
        lead="The system wasn't validated in isolation. It was stress-tested against the most complex product flows first. The loan calculator and Transfer Money flows were among the first full surfaces built on the unified system, exposing real component gaps and token edge cases before wide adoption."
      />
      <div className="w-full max-w-4xl lg:max-w-[1046px] flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Body
            as="p"
            size="small"
            weight="alt"
            color="brand"
            UNSAFE_className="uppercase tracking-[0.1em]"
            UNSAFE_style={{ fontSize: "10px" }}
          >
            Interactive prototype: Transfer Money
          </Body>
          <OportunDsTransferMoneyPrototype />
        </div>
        <div className="flex flex-col gap-4">
          <Body
            as="p"
            size="small"
            weight="alt"
            color="brand"
            UNSAFE_className="uppercase tracking-[0.1em]"
            UNSAFE_style={{ fontSize: "10px" }}
          >
            Interactive prototype: Loan calculator
          </Body>
          <OportunDsLoanCalculatorPrototype />
        </div>
        <OportunDecisionGrid cards={VALIDATION_CARDS} />
      </div>
    </Section>
  );
}

export function OportunDsResultsSection() {
  return (
    <Section id="results">
      <SectionHeader
        eyebrow="Results"
        title="From project assets to shared platform infrastructure."
        lead="The system gave teams a single source of truth for patterns, documentation, and implementation, accelerating delivery across web and mobile."
      />
      <div className="w-full max-w-4xl lg:max-w-[1046px] flex flex-col gap-10">
        <EdsStatsRow
          variant="brand"
          cellBackground={SURFACE_SUBTLE}
          borderColor="#6cdb8c"
          stats={[
            { value: "4", label: "Foundation pillars", valueColor: "#000000" },
            { value: "100+", label: "Components documented", valueColor: "#000000" },
            { value: "2", label: "Brands unified", valueColor: "#000000" },
            { value: "6 mo", label: "Delivered while shipping", valueColor: "#000000" },
          ]}
        />
        <div
          className="rounded-[24px] p-8 flex flex-col gap-4"
          style={{
            background: SURFACE_SUBTLE,
            border: "1px solid #6cdb8c",
          }}
        >
          <Heading
            as="h3"
            size="small"
            weight="alt"
            UNSAFE_className="m-0"
            UNSAFE_style={{ fontSize: "clamp(20px, 2.5vw, 28px)", color: "#000000" }}
          >
            Success &amp; impact
          </Heading>
          <ul className="m-0 p-0 list-none flex flex-col gap-3">
            {RESULTS_IMPACT.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#000000" }} />
                <Body
                  as="span"
                  size="medium"
                  UNSAFE_className="leading-relaxed m-0"
                  UNSAFE_style={{ color: "#000000" }}
                >
                  {item}
                </Body>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
