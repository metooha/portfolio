import {
  EdsBeforeAfter,
  EdsEyebrow,
  EdsJourneyTimeline,
  EdsLead,
  EdsProblemGrid,
  EdsQuoteBlock,
  EdsSection,
  EdsSectionTitle,
  EdsStatsRow,
  type EdsJourneyItem,
} from "../everyday-sans/EdsCaseStudyPrimitives";
import { Body, Heading } from "@/app/components/Text/Text";

const PHASE_ITEMS: EdsJourneyItem[] = [
  {
    date: "Q3–Q4 2024",
    phase: "Foundation",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
    ],
    mood: "progress",
    story:
      "The first challenge was getting people to agree before anything was built. I mapped the full stakeholder landscape and ran structured working sessions. Partnered with Shawn (WCP engineering lead) on a proof of concept that demonstrated tokens could be pulled from Airtable via API.",
    win: "Airtable established as SoT, token taxonomy and IA defined across all platforms, RACI model locked in.",
  },
  {
    date: "Q1–Q2 2025",
    phase: "Automate",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
    ],
    mood: "progress",
    story:
      "Restructured the Airtable IA to remove legacy bloat and standardize naming conventions. Designed user flows for designer-friendly tenant onboarding. Worked with Zach to define an intermediate JSON representation.",
    win: "Theme inheritance model defined — each tenant contains only overrides, with a hierarchy file providing inheritance rules (Sam's Club ← WCP ← LD Base).",
  },
  {
    date: "Q3–Q4 2025",
    phase: "Ship",
    who: [
      { label: "Engineering", variant: "engineering" },
      { label: "CI/CD", variant: "engineering" },
    ],
    mood: "win",
    story:
      "Implemented a fully automated CI/CD pipeline: Airtable → Style Dictionary → GitHub Actions → Artifactory/npm. 347 automated tests run on every sync. Asset tokens (icons, SVGs, logos) were also brought into the pipeline.",
    win: "If a token breaks, the pipeline stops and designers get a Slack alert within 5 minutes.",
  },
];

const THEME_LAYERS = [
  {
    label: "01",
    title: "LD Base — Primitives",
    description:
      "650+ tokens. Raw values — hex colors, px scale, font sizes. Shared by every brand that inherits from Living Design. (100% shared)",
  },
  {
    label: "02",
    title: "Semantic Layer",
    description:
      "Alias tokens that map intent to primitives — e.g. colorTextDefault → gray-900. Shared across all brands. (~90% inherited)",
  },
  {
    label: "03",
    title: "WCP Theme",
    description:
      "Commerce-specific overrides only. Sam's Club, Walmart+, and Bodega all branch from this layer. (~20% override)",
  },
  {
    label: "04",
    title: "Tenant Overrides",
    description:
      "Brand-specific. Cashi, Walmart Business, international markets. Each tenant contains only its unique overrides. (~10% override)",
  },
] as const;

function AirtableBulletList({
  items,
  accentColor,
}: {
  items: { text: string }[];
  accentColor?: string;
}) {
  return (
    <ul className="list-none m-0 p-0 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.text} className="flex gap-3 items-start">
          <span
            className="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
            style={{
              background: accentColor ?? "var(--ld-semantic-color-text-brand, #0053e2)",
            }}
          />
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.7]">
            {item.text}
          </Body>
        </li>
      ))}
    </ul>
  );
}

function AirtablePipelineGrid() {
  const steps = [
    {
      who: "Step 1",
      whoColor: "#1a4f8a",
      title: "Airtable — Source of Truth",
      description:
        "Designers update tokens. Human-readable. Relational. API-accessible. No engineering skills required.",
    },
    {
      who: "Step 2",
      whoColor: "#1a5c3a",
      title: "Style Dictionary — Transform",
      description:
        "Converts tokens to platform-specific formats for iOS, Android, and Web. One source, three outputs.",
    },
    {
      who: "Step 3",
      whoColor: "#553c9a",
      title: "GitHub Actions — CI / Validate",
      description:
        "347 automated tests run on every sync. Fail loud, fail fast. Broken tokens never reach production.",
    },
    {
      who: "Step 4",
      whoColor: "#7b3a00",
      title: "Artifactory — Deploy",
      description:
        "Versioned packages distributed. Teams pull on their own schedule — fully self-service, zero coordination.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {steps.map((step) => (
        <div
          key={step.title}
          className="rounded-[10px] p-6"
          style={{
            background: "var(--ld-primitive-color-blue-5, #f0f5ff)",
            border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
          }}
        >
          <Body
            as="p"
            size="small"
            weight="alt"
            UNSAFE_className="uppercase tracking-[0.1em] mb-2"
            UNSAFE_style={{ fontSize: "10px", color: step.whoColor }}
          >
            {step.who}
          </Body>
          <Body
            as="p"
            size="medium"
            weight="alt"
            UNSAFE_className="mb-2"
            UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)" }}
          >
            {step.title}
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.65]">
            {step.description}
          </Body>
        </div>
      ))}
    </div>
  );
}

function AirtableThemeLayers() {
  return (
    <div className="flex flex-col gap-3">
      {THEME_LAYERS.map((layer) => (
        <div
          key={layer.label}
          className="rounded-[10px] px-6 py-5"
          style={{
            background: "var(--ld-semantic-color-fill, #ffffff)",
            border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
          }}
        >
          <Body
            as="p"
            size="small"
            weight="alt"
            color="brand"
            UNSAFE_className="uppercase tracking-[0.1em] mb-2"
            UNSAFE_style={{ fontSize: "10px" }}
          >
            {layer.label}
          </Body>
          <Body
            as="p"
            size="medium"
            weight="alt"
            UNSAFE_className="mb-1.5"
            UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)" }}
          >
            {layer.title}
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.65]">
            {layer.description}
          </Body>
        </div>
      ))}
      <Body as="p" size="small" color="subtlest" UNSAFE_className="italic leading-[1.7] mt-2">
        When LD Base updates, all 17 downstream tenants receive the change automatically on the next sync — no
        manual propagation required.
      </Body>
    </div>
  );
}

export function AirtableSituationSection() {
  return (
    <EdsSection id="situation">
      <EdsEyebrow>Problem Space</EdsEyebrow>
      <EdsSectionTitle>No shared source of truth. Everyone was working alone.</EdsSectionTitle>
      <EdsLead>
        Figma was locked down, GitHub was fragmented across platforms, and commerce teams had needs the core
        system was never scoped to meet.
      </EdsLead>
      <EdsProblemGrid
        cards={[
          {
            who: "Design / Core",
            whoColor: "#7b4f00",
            title: "Figma was restricted",
            description:
              "The core team locked down their files — no direct access, no token contributions, no syncing. Figma couldn't be a source of truth.",
          },
          {
            who: "Engineering",
            whoColor: "#1d5f02",
            title: "GitHub was fragmented",
            description:
              "iOS, Android, and Web each maintained their own token repos with no shared inheritance model. Each platform was an island.",
          },
          {
            who: "Commerce",
            whoColor: "#1a4f8a",
            title: "Commerce needs were unmet",
            description:
              "Commerce teams needed branding tokens, extended components, and multi-org support — none of which the core system was scoped to provide.",
          },
        ]}
      />
    </EdsSection>
  );
}

export function AirtableHumanCostSection() {
  return (
    <EdsSection id="human-cost" variant="mid">
      <EdsEyebrow>Human Cost</EdsEyebrow>
      <EdsSectionTitle>The cost wasn&apos;t just inefficiency. It was eroded trust.</EdsSectionTitle>
      <EdsLead>
        Teams duplicated work, decisions were re-litigated in implementation, and manual exports carried a
        ~15% error rate with painful rollbacks.
      </EdsLead>
      <AirtableBulletList
        items={[
          { text: "Teams were doing the same work twice — every team kept their own copy of the same tokens." },
          {
            text: "Designers and engineers couldn't trust they were looking at the same thing. Decisions made in design were constantly re-litigated during implementation.",
          },
          {
            text: "Commerce teams had no clear place to go for answers, so they built in isolation — creating more inconsistency and more overhead with every release.",
          },
          {
            text: "Manual exports took 2–3 days per update with a ~15% error rate, and rollbacks were painful for everyone involved.",
          },
        ]}
      />
    </EdsSection>
  );
}

export function AirtableTheWorkSection() {
  return (
    <EdsSection id="the-work">
      <EdsEyebrow>The Work</EdsEyebrow>
      <EdsSectionTitle>Three phases. Eighteen months. One source everyone could trust.</EdsSectionTitle>
      <EdsLead>
        Foundation first — alignment and proof of concept. Then automation and inheritance. Then a fully shipped
        pipeline with guardrails.
      </EdsLead>
      <EdsJourneyTimeline items={PHASE_ITEMS} />
    </EdsSection>
  );
}

export function AirtablePipelineSection() {
  return (
    <EdsSection id="pipeline" variant="mid">
      <EdsEyebrow>The Pipeline</EdsEyebrow>
      <EdsSectionTitle>Airtable → Style Dictionary → GitHub Actions → Artifactory</EdsSectionTitle>
      <EdsLead>
        Designers edit in Airtable. Engineering consumes versioned packages. Validation runs on every sync.
      </EdsLead>
      <AirtablePipelineGrid />
    </EdsSection>
  );
}

export function AirtableThemeHierarchySection() {
  return (
    <EdsSection id="theme-hierarchy">
      <EdsEyebrow>Theme Hierarchy</EdsEyebrow>
      <EdsSectionTitle>17 brands. One base. Each layer only defines its overrides.</EdsSectionTitle>
      <EdsLead>
        Primitives at the bottom, semantic aliases in the middle, commerce and tenant overrides at the top —
        inheritance does the propagation work.
      </EdsLead>
      <AirtableThemeLayers />
    </EdsSection>
  );
}

export function AirtableResultsSection() {
  return (
    <EdsSection id="results" variant="dark">
      <EdsEyebrow onDark>Results</EdsEyebrow>
      <EdsSectionTitle onDark>Design changes now reach production in 10 minutes.</EdsSectionTitle>
      <EdsStatsRow
        stats={[
          { value: "95%", label: "Faster deployment — 2–3 days → 10 minutes" },
          { value: "0%", label: "Error rate with 347 automated tests", valueColor: "#68d391" },
          { value: "17", label: "Brand themes, all self-service" },
          { value: "650+", label: "Tokens managed from a single source" },
        ]}
      />
      <EdsBeforeAfter
        before={[
          {
            who: "Deployment",
            title: "2–3 days per token update.",
            description: "Manual coordination required on every change.",
          },
          {
            who: "Quality",
            title: "~15% error rate on exports.",
            description: "Frequent rollbacks and broken dark mode for 1+ year.",
          },
          {
            who: "Scale",
            title: "17+ separate token copies.",
            description: "4 hours to onboard a new tenant. Constant cross-team coordination.",
          },
        ]}
        after={[
          {
            who: "Deployment",
            title: "10 minutes from edit to production.",
            description: "Fully automated — zero coordination required.",
          },
          {
            who: "Quality",
            title: "0% error rate on every sync.",
            description: "347 automated tests. Full dark mode restored across all 17 platforms.",
          },
          {
            who: "Scale",
            title: "Single source of truth.",
            description: "Automated tenant onboarding. Teams pull on their own schedule.",
          },
        ]}
      />
    </EdsSection>
  );
}

export function AirtableQuoteSection() {
  return (
    <EdsQuoteBlock
      quote="The cost wasn't just inefficiency. It was eroded trust between teams."
      attribution="Lead Designer, Living Design · Airtable as Source of Truth"
    />
  );
}

export function AirtableClosingSection() {
  return (
    <div
      className="relative w-full shrink-0 text-center overflow-hidden py-[120px] px-6 md:px-12"
      style={{ background: "var(--ld-semantic-color-fill-brand, #0053e2)" }}
    >
      <div className="max-w-[700px] mx-auto">
        <Heading
          as="h2"
          size="large"
          weight="alt"
          color="inverse"
          UNSAFE_className="leading-[48px] font-light"
          UNSAFE_style={{ fontSize: "clamp(26px, 4vw, 52px)" }}
        >
          Designers work in Airtable.
          <br />
          Engineers consume versioned tokens.
          <br />
          <span style={{ fontWeight: 700, color: "var(--ld-primitive-color-spark-100, #ffc220)" }}>
            No coordination needed.
          </span>
        </Heading>
      </div>
    </div>
  );
}
