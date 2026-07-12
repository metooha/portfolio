import {
  BeforeAfter as EdsBeforeAfter,
  Eyebrow as EdsEyebrow,
  Lead as EdsLead,
  Section as EdsSection,
  SectionTitle as EdsSectionTitle,
  StatsRow as EdsStatsRow,
} from "@/app/components/CaseStudyPrimitives";
import {
  EdsJourneyTimeline,
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
      "The first challenge was alignment, not tooling. I proposed the single-pipeline model and presented it to engineering leadership to secure approval and staffing, then mapped the stakeholder landscape, ran structured working sessions, and built the first proof of concept pulling tokens from Airtable via API.",
    win: "Airtable established as the authoring source, token taxonomy and IA defined across all platforms, RACI model locked in.",
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
      "Restructured the Airtable IA to remove legacy bloat and standardize naming conventions. Defined designer-friendly tenant onboarding and the intermediate JSON contract engineering needed.",
    win: "Theme inheritance model defined: each tenant contains only overrides, with a hierarchy file providing inheritance rules (membership club ← platform theme ← core base).",
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
      "The team shipped a fully automated CI/CD pipeline: Airtable → Style Dictionary → GitHub Actions → Artifactory/npm. 347 automated tests run on every sync. Asset tokens also moved into the same model.",
    win: "If a token breaks, the pipeline stops and designers get a Slack alert within 5 minutes.",
  },
];

const PROBLEM_CARDS = [
  {
    who: "Design / Core",
    whoColor: "#7b4f00",
    title: "Figma was restricted",
    description:
      "The core team locked down their files: no direct access, no token contributions, no syncing. Figma couldn't be a source of truth.",
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
      "Commerce teams needed branding tokens, extended components, and multi-org support, none of which the core system was scoped to provide.",
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
      <EdsSectionTitle>The token problem was an ownership problem.</EdsSectionTitle>
      <EdsLead>
        Every team had a rational local workflow. The system failed because no one owned the contract between
        design decisions, platform code, and brand inheritance.
      </EdsLead>
      <AirtableSituationVisual />
      <AirtableProblemGrid />
      <Body as="p" size="medium" UNSAFE_className="leading-[1.7]">
        <strong>The pitch:</strong> this wasn&rsquo;t an assignment, it was a proposal. I identified the ownership
        gap, designed the Airtable-to-GitHub pipeline as the fix, and presented the plan to engineering leadership
        to secure approval and the support to build it, then extended that support into Figma and our design
        system kits.
      </Body>
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
        {"Designers needed Airtable. Engineers needed Git.\nThe bridge was the product."}
      </EdsSectionTitle>
      <EdsLead>
        The decision was not to force one team into another team&rsquo;s tool. I defined the contract between
        the tools so each group could keep its source of control.
      </EdsLead>
      <AirtableBridgeVisual />
      <EdsEyebrow>The Pivot</EdsEyebrow>
      <EdsLead>
        The breakthrough was agreeing on a shared JSON schema before building automation. That single architecture
        decision turned a tooling disagreement into an integration model.
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
        The work moved from alignment to automation to governance. Each phase reduced one kind of risk: stakeholder
        disagreement, technical drift, then operational trust.
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
      <EdsSectionTitle>The architecture decision: inherit what is shared, override only what is different.</EdsSectionTitle>
      <EdsLead>
        The defining move was treating brand variation as inheritance, not duplication. Each brand specifies only
        what differs from its parent.
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
          The branching architecture keeps 650+ foundation tokens stable while letting brand-specific overrides
          travel independently.
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
        The outcome was not just faster deployment. It was a system of trust: designers could edit safely,
        engineers could review automatically, and teams could adopt without coordination.
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
            If a change breaks a platform, the pipeline fails fast and fails loud. The system moved teams from
            fear of breaking production to trust in the release path.
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
                description: "Fully automated. Zero coordination required.",
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
        The same inheritance model can apply beyond tokens. Illustrations can inherit token values directly, so
        accessibility and brand compliance are built into the asset itself.
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
