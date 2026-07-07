import {
  EdsBeforeAfter,
  EdsEyebrow,
  EdsJourneyTimeline,
  EdsLead,
  EdsSection,
  EdsSectionTitle,
  EdsStatsRow,
  type EdsJourneyItem,
} from "../everyday-sans/EdsCaseStudyPrimitives";
import { Body, Heading } from "@/app/components/Text/Text";
import {
  AirtableBridgeVisual,
  AirtableDynamicSvgsVisual,
  AirtableHumanCostVisual,
  AirtableInheritanceVisual,
  AirtablePipelineVisual,
  AirtablePivotVisual,
  AirtableScaleVisual,
  AirtableSituationVisual,
  AirtableValidationVisual,
} from "./AirtableCaseStudyVisuals";

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

const PROBLEM_CARDS = [
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
] as const;

const ROADMAP_ITEMS = [
  {
    title: "Dynamic SVG Theming",
    description: "Tokenized fills + strokes → 1 illustration ships as 17 branded variants",
  },
  {
    title: "Automated Visual Regression",
    description: "Every illustration update validated before it ships",
  },
  {
    title: "Figma Variables API v2",
    description: "Bidirectional sync · Extended collections · Programmatic mode creation",
  },
  {
    title: "One Zip File. 17 Platforms.",
    description: "Zero manual steps. That's what a Single Source of Truth looks like in practice.",
  },
  {
    title: "The Bridge Pattern",
    description: "Designers keep Airtable. Engineers keep Git. The pipeline is the translator between both worlds.",
  },
] as const;

function AirtableProblemGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {PROBLEM_CARDS.map((card) => (
        <div
          key={card.who}
          className="rounded-[16px] overflow-hidden"
          style={{
            background: "var(--ld-semantic-color-fill, #ffffff)",
            border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
          }}
        >
          <div className="h-[3px]" style={{ background: card.whoColor }} />
          <div className="px-6 py-6">
            <Body
              as="p"
              size="small"
              weight="alt"
              UNSAFE_className="uppercase tracking-[0.1em] mb-2"
              UNSAFE_style={{ fontSize: "10px", color: card.whoColor }}
            >
              {card.who}
            </Body>
            <Body
              as="p"
              size="medium"
              weight="alt"
              UNSAFE_className="mb-2"
              UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)" }}
            >
              {card.title}
            </Body>
            <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.65]">
              {card.description}
            </Body>
          </div>
        </div>
      ))}
    </div>
  );
}

function AirtableRoadmapList() {
  return (
    <div className="flex flex-col gap-3">
      {ROADMAP_ITEMS.map((item) => (
        <div
          key={item.title}
          className="rounded-[16px] px-9 py-5"
          style={{
            background: "var(--ld-semantic-color-fill, #ffffff)",
            border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
          }}
        >
          <Body
            as="p"
            size="medium"
            weight="alt"
            UNSAFE_className="mb-1"
            UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)" }}
          >
            {item.title}
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
            {item.description}
          </Body>
        </div>
      ))}
    </div>
  );
}

export function AirtableSituationSection() {
  return (
    <EdsSection id="situation">
      <EdsEyebrow>Problem Space</EdsEyebrow>
      <EdsSectionTitle>No shared source of truth. Everyone was working alone.</EdsSectionTitle>
      <AirtableSituationVisual />
      <AirtableProblemGrid />
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
      <AirtableHumanCostVisual />
    </EdsSection>
  );
}

export function AirtableBridgeSection() {
  return (
    <EdsSection id="bridge">
      <EdsEyebrow>Designer Ease vs. Engineer Control</EdsEyebrow>
      <EdsSectionTitle>
        {"Designers wanted Airtable. Engineers needed Git.\nWe built a bridge."}
      </EdsSectionTitle>
      <EdsLead>
        Tool selection should follow team behavior — that&apos;s the core principle behind this architecture.
      </EdsLead>
      <AirtableBridgeVisual />
      <EdsEyebrow>The Pivot</EdsEyebrow>
      <EdsLead>
        The breakthrough was agreeing on a contract — a shared JSON schema — before building anything. A single
        alignment decision eliminated almost all integration friction.
      </EdsLead>
      <AirtablePivotVisual />
    </EdsSection>
  );
}

export function AirtableTheWorkSection() {
  return (
    <EdsSection id="the-work">
      <EdsEyebrow>The Work</EdsEyebrow>
      <EdsSectionTitle>
        {"Three phases. Eighteen months.\nOne source everyone could trust."}
      </EdsSectionTitle>
      <EdsLead>
        Foundation first — alignment and proof of concept. Then automation and inheritance. Then a fully shipped
        pipeline with guardrails.
      </EdsLead>
      <EdsJourneyTimeline items={PHASE_ITEMS} />
      <div className="mt-6 flex flex-col gap-3">
        <Body
          as="p"
          size="small"
          weight="alt"
          color="brand"
          UNSAFE_className="uppercase tracking-[0.1em]"
          UNSAFE_style={{ fontSize: "10px" }}
        >
          The pipeline
        </Body>
        <AirtablePipelineVisual />
      </div>
    </EdsSection>
  );
}

export function AirtableArchitectureSection() {
  return (
    <EdsSection id="architecture" variant="mid">
      <EdsEyebrow>Architecture</EdsEyebrow>
      <EdsSectionTitle>The Inheritance Model</EdsSectionTitle>
      <EdsLead>
        The key innovation was an inheritance model where each brand only specifies what differs from its parent.
      </EdsLead>
      <AirtableInheritanceVisual />
      <div className="flex flex-col gap-4 mt-10">
        <Heading
          as="h3"
          size="small"
          weight="alt"
          UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)", fontSize: "clamp(20px, 2.5vw, 28px)" }}
        >
          Scale Without Duplication
        </Heading>
        <EdsLead>
          Our branching architecture allows brand-specific overrides, while maintaining a core set of 650+
          foundation tokens.
        </EdsLead>
        <AirtableScaleVisual />
      </div>
    </EdsSection>
  );
}

export function AirtableResultsSection() {
  return (
    <EdsSection id="results">
      <EdsEyebrow>Results</EdsEyebrow>
      <EdsSectionTitle>One zip file. 17 platforms. Zero manual steps.</EdsSectionTitle>
      <EdsLead>
        That&apos;s what a Single Source of Truth looks like in practice — and this is the system we built to make
        it real.
      </EdsLead>
      <EdsStatsRow
        variant="light"
        stats={[
          { value: "17+", label: "Platforms" },
          { value: "10 min", label: "Edit to prod" },
          { value: "347", label: "Tests passing" },
          { value: "0%", label: "Error rate", valueColor: "#68d391" },
        ]}
      />
      <div
        className="rounded-[24px] p-8 mt-6"
        style={{
          background: "var(--ld-semantic-color-fill-brand, #0053e2)",
          border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
        }}
      >
        <div className="p-4">
          <Heading
            as="h3"
            size="small"
            weight="alt"
            color="inverse"
            UNSAFE_className="mb-2"
            UNSAFE_style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
          >
            347 Automated Tests Passed
          </Heading>
          <Body as="p" size="small" UNSAFE_className="mb-6 leading-[1.7]" UNSAFE_style={{ color: "rgba(255,255,255,0.75)" }}>
            If a change breaks a platform, the pipeline &apos;fails fast and fails loud&apos;. This moved us from a
            &apos;fear of breaking&apos; to absolute &apos;trust in the system&apos;.
          </Body>
        </div>
        <AirtableValidationVisual />
        <div className="mt-6">
          <EdsBeforeAfter
            before={[
              {
                who: "Manual",
                title: "2–3 days per token update.",
                description: "Manual coordination required on every change.",
              },
              {
                who: "Prone to errors",
                title: "~15% error rate on exports.",
                description: "Frequent rollbacks and broken dark mode for 1+ year.",
              },
              {
                who: "Unnecessary duplication",
                title: "17+ separate token copies.",
                description: "4 hours to onboard a new tenant. Constant cross-team coordination.",
              },
            ]}
            after={[
              {
                who: "Deployment",
                title: "95% reduction in deployment time.",
                description: "Fully automated — zero coordination required.",
              },
              {
                who: "Quality",
                title: "0% production error rate post-launch.",
                description: "347 automated tests. Full dark mode restored across all 17 platforms.",
              },
              {
                who: "Scale",
                title: "Single source of truth for 17+ themes.",
                description: "Automated tenant onboarding. Teams pull on their own schedule.",
              },
            ]}
          />
        </div>
      </div>
    </EdsSection>
  );
}

export function AirtableWhatsNextSection() {
  return (
    <EdsSection id="whats-next" variant="mid">
      <EdsEyebrow>What&apos;s Next</EdsEyebrow>
      <EdsSectionTitle>Dynamic SVGs and Beyond</EdsSectionTitle>
      <EdsLead>
        Illustrations that inherit token values directly, ensuring accessibility and branding compliance is baked
        into the asset itself.
      </EdsLead>
      <AirtableDynamicSvgsVisual />
      <div className="flex flex-col gap-4 mt-10">
        <Heading
          as="h3"
          size="small"
          weight="alt"
          UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)", fontSize: "clamp(20px, 2.5vw, 28px)" }}
        >
          The Next Frontier: Dynamic SVGs &amp; Figma
        </Heading>
        <EdsLead>
          By tokenizing SVG fills and strokes, one illustration can adapt across all 17 brand themes automatically.
        </EdsLead>
        <AirtableRoadmapList />
      </div>
    </EdsSection>
  );
}
