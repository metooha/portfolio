import React from "react";
import {
  Section,
  Eyebrow,
  SectionTitle,
  Lead,
  ProblemGrid,
  ImageFull,
  BeforeAfter,
  StatsRow,
  QuoteBlock,
  NextGrid,
  JourneyTimeline,
  TestimonialShowcase,
  CaptureMedia,
  VideoFull,
  EmbedFull,
} from "@/app/components/CaseStudyPrimitives";
import { Body, Heading } from "@/app/components/Text/Text";
import { Icon } from "@/app/components/Icons/Icons";
import imgFragmentation from "@/app/assets/pages/case-study/uc-uikit/different-chats.png";
import imgConverseTool from "@/app/assets/pages/case-study/uc-uikit/converse-tool.jpg";
import imgTeamStructure from "@/app/assets/pages/case-study/uc-uikit/team-structure.png";
import imgProjectBrief from "@/app/assets/pages/case-study/uc-uikit/project-brief.png";
import imgAuditSpread from "@/app/assets/pages/case-study/uc-uikit/audit-spread.png";
import imgPatternAnalysisTracker from "@/app/assets/pages/case-study/uc-uikit/pattern-analysis-tracker-1.png";
import imgComponentBuild from "@/app/assets/pages/case-study/uc-uikit/component-build.png";
import videoThemeValidation from "@/app/assets/pages/case-study/uc-uikit/theme-validation-script.mp4";
import videoRecipeBuild from "@/app/assets/pages/case-study/uc-uikit/recipe-build.mp4";
import {
  UseCaseGrid,
  PlatformMatrix,
  NamingTaxonomy,
  FrameworkKits,
  LayerStack,
} from "./UcUiKitBlocks";

const DARK = "#001e60";
const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";

/* ── Problem ─────────────────────────────────────────────────────── */

export function ProblemSection() {
  return (
    <Section id="problem">
      <Eyebrow>The Problem</Eyebrow>
      <SectionTitle>The platform changed. The UI hadn&rsquo;t.</SectionTitle>
      <Lead>
        Two structural changes were happening at once. Neither could work without a shared UI
        foundation that didn&rsquo;t exist yet. The ask from engineering and product was clear: support
        multi-tenancy and theming at scale, and stop teams managing it alone.
      </Lead>

      <ProblemGrid
        columns={3}
        cards={[
          {
            who: "Platform migration",
            whoColor: DARK,
            title: "Moving to a closed framework to support tokens and theming",
            description:
              "Teams could no longer maintain their own UI, and everyone had to rebuild to spec.",
          },
          {
            who: "Market consolidation",
            whoColor: "#0053e2",
            title: "Merging platforms built for separate brands & markets",
            description:
              "When the platforms merged, the chat UIs were nearly identical, too similar to justify separate builds.",
          },
          {
            who: "Cost of scale",
            whoColor: "#1a3a5c",
            title: "Every new chatbot carried duplicate design and engineering effort",
            description:
              "With over 50 chatbot generated through the AI Bot Generator, each custom UI path risked weeks of repeated design and engineering work.",
          },
        ]}
      />
      <Heading as="h3" size="small" weight="default" UNSAFE_className="pt-10 mb-2" UNSAFE_style={{ color: DARK }}>
        Engineering had the engine. The UI layer needed a system.
      </Heading>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-snug" UNSAFE_style={{ marginBottom: 24 }}>
        The internal tool powered conversation logic. The design challenge was turning those
        flows into reusable UI patterns for shopping, support, and handoff experiences.
      </Body>
      <ImageFull
        src={imgConverseTool}
        alt="Internal flow builder showing a chatbot conversation map with bot responses, API steps, and jump-to-project nodes connected across a canvas."
        fit="natural"
        surface="subtle"
        frameClassName="p-6"
        clipEdges={false}
      />

      <ImageFull
        src={imgFragmentation}
        alt="Six chat UIs across Walmart products: Ask Sparky, Chat with Walmart, Chat with Bodega, Chat with Sam, a generic support assistant, and Merchant AI"
        surface="subtle"
        frameClassName="py-10 px-[100px] h-[600px]"
        clipEdges={false}
      />

      <TestimonialShowcase
        ariaLabel="What teams told design before the system existed"
        statement="Six products, six different answers to the same problem."
        testimonials={[
          {
            role: "Small product teams",
            team: "No design resources",
            quote:
              "We do not have the design resources to build our own chatbot UI. We want guidelines or tools to create the essentials quickly.",
          },
          {
            role: "Teams with its own UI",
            team: "Not portable",
            quote:
              "We have our own design resources, but our components are unique. They are not built for other teams to borrow.",
          },
          {
            role: "Teams facing a merger",
            team: "Forced rebuild",
            quote:
              "Our tool is set to merge with another, but our UIs are inconsistent. When we merge, we would redo everything from scratch.",
          },
        ]}
      />

    </Section>
  );
}

/* ── Defining the Work ──────────────────────────────────────────── */

const DEFINE_STEPS = [
  {
    title: "Understand each team's position in the migration",
    body: "The migration hit everyone, but from different starting points. The system had to serve everyone all at once, not just the best-resourced.",
  },
  {
    title: "Map what existed and what the framework required",
    body: "The Core Design system had the atoms. The new framework required tokens and theming at the sub-system level, not team by team. Local components weren't token-compliant, and nothing was structured for what the framework now required.",
  },
  {
    title: "Translate the technical mandate into design goals",
    body: "Design goals had be themeable from day one, remove duplication across merging markets, and give every team a clear starting point.",
  },
  {
    title: "Make the hard call: patterns and recipes paired with automation, not just components",
    body: "A component library was the obvious answer, faster to build and easier to scope. But it solves a delivery problem, not a design one. Teams didn't just need shared buttons. They needed shared thinking for each use case.",
  },
];

export function DefiningSection() {
  return (
    <Section id="defining" variant="mid">
      <Eyebrow>Defining the Work</Eyebrow>
      <SectionTitle>The problem was clear. The solution wasn&rsquo;t.</SectionTitle>
      <Lead>The job was to turn a technical mandate into a system teams could actually adopt. Engineering and product knew what was needed, but  did not know what it should look like, how to govern it, or who should build it. That was the design problem.

</Lead>

      <div className="flex flex-col">
        {DEFINE_STEPS.map((step, i) => (
          <div
            key={step.title}
            className="grid grid-cols-[44px_1fr] gap-x-5 py-6"
            style={{ borderBottom: i < DEFINE_STEPS.length - 1 ? `1px solid ${SEPARATOR}` : undefined }}
          >
            <div className="font-black leading-none" style={{ fontSize: "28px", color: "#a9bcdc" }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <Heading as="h3" size="small" weight="default" UNSAFE_className="mb-2" UNSAFE_style={{ color: DARK }}>
                {step.title}
              </Heading>
              <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.7]">
                {step.body}
              </Body>
            </div>
          </div>
        ))}
      </div>


    </Section>
  );
}

/* ── Scope ──────────────────────────────────────────────────────── */

export function ScopeSection() {
  return (
    <Section id="scope">
      <Eyebrow>The Scope</Eyebrow>
      <SectionTitle>Not just a UI kit, but a pattern system for many different use cases.</SectionTitle>
      <Lead>
        The scope was not generic chat. It was the ecommerce layer: the reusable patterns that
        made AI-powered shopping, support, and handoff experiences feel product-ready.
      </Lead>

      <div className="flex flex-col gap-2">
        <Heading as="h3" size="small" weight="default" UNSAFE_style={{ color: DARK, paddingBottom: "0px" }}>
          The chat experiences weren't variations of one thing.
        </Heading>
        <Body as="p" size="small" UNSAFE_className="leading-[1.7]" UNSAFE_style={{ color: "#7a7a7a" }}>
          While ecommerce requires distinct interaction models offs, they all share the same foundation.
        </Body>
      </div>

      <UseCaseGrid
        items={[
          {
            icon: "Sparky",
            headerColor: DARK,
            type: "AI Shopping Assistant",
            example: "Sparky, Walmart.com storefront",
            description:
              "Proactive. The assistant initiates, surfaces products, and handles rich media. Shoppers are browsing.",
            patterns: ["Product carousel", "Image-rich bubbles", "Quick replies", "Persistent launcher"],
          },
          {
            icon: "ServicesFill",
            headerColor: "#1a3a5c",
            type: "AI Support Agent",
            example: "Support center, customer care",
            description:
              "Resolution-focused. The shopper has a problem. Trust is lower and stakes are higher, so structure matters more than richness.",
            patterns: ["Structured response cards", "Feedback rail", "Escalation to agent", "Session header"],
          },
          {
            icon: "Chat",
            headerColor: "#0d3b2e",
            type: "Person-to-Person Chat",
            example: "Delivery chat, staff tools",
            description:
              "Two people, not a bot. Real-time and presence-aware, so it can't be treated as a variant of AI chat.",
            patterns: ["Typing indicator", "Read receipts", "Presence state", "Dual-avatar header"],
          },
        ]}
      />

      <div>
        <Heading as="h3" size="small" weight="default" UNSAFE_className="mb-2" UNSAFE_style={{ color: DARK }}>
          It also had to support across three platforms.
        </Heading>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="mb-4 leading-[1.7]">
          <span style={{ display: "block", marginBottom: 24 }}>
            Desktop web, native iOS and Android, and React Native, each with a different token
            pipeline. A component that worked on web could break on native.
          </span>
     
        </Body>
        <PlatformMatrix
          columns={["Desktop Web", "Native iOS / Android", "React Native"]}
          rows={[
            { label: "AI Shopping Assistant", cells: ["Carousel, FAB, rich media", "Full-screen, native SDK", "React Native SDK"] },
            { label: "AI Support Agent", cells: ["Widget, collapse pattern", "Sheet, native SDK", "React Native SDK"] },
            { label: "Person-to-Person", cells: ["Full window, presence", "Messaging UI, native", "In scope, P2"] },
            { label: "Token pipeline", cells: ["Living Design tokens", "Platform SDK tokens", "Engineering SDK path"], infra: true },
          ]}
        />
      </div>

    </Section>
  );
}

/* ── Building the Team ──────────────────────────────────────────── */

const TEAM_MOOD_COLOR: Record<"friction" | "win", string> = {
  friction: "var(--ld-semantic-color-text-negative, #ea1100)",
  win: "var(--ld-semantic-color-text-positive, #2a8703)",
};

const TEAM_STEPS: { title: string; body: string; mood: "friction" | "win" }[] = [
  {
    title: "The starting conditions",
    body: "The core design system and the platform design sub-system were on separate timelines. Engineering was reconciling two sources of truth by hand. No shared process, no shared tooling. Design wasn't in the room yet.",
    mood: "friction",
  },
  {
    title: "Being first had a cost",
    body: "This was the first team to run end-to-end on the platform. There was no playbook for this process. It had to be invented, then taught.",
    mood: "friction",
  },
  {
    title: "Contributors, not headcount",
    body: "There was no standing team. Designers were recruited from across product teams to contribute, with a case made to leadership for their time. Each brought product knowledge no central team could replicate.",
    mood: "win",
  },
  {
    title: "Mentoring on a new process",
    body: "None of the contributors had built a design system this way. They were mentored through it: the audit method, the pattern-and-recipe model, token discipline, and reviews, leading through influence, not authority, since they didn't report in.",
    mood: "win",
  },
  {
    title: "Design leadership buy-in",
    body: "The case to leadership: embedded expertise would build a better, more adopted system than a central team alone, and cost less in rework. Leadership committed the contributors' time.",
    mood: "win",
  },
  {
    title: "How the team stayed coordinated",
    body: "Weekly syncs with engineering and product. Batched reviews with the full team. A shared intake tracker. Clear ownership so decisions didn't require escalation.",
    mood: "win",
  },
  {
    title: "Then it was handed off",
    body: "Once the system was proven, maintenance transferred to the standing engineering and design teams. It was built to be owned by them, not to depend on any one person. That was the goal from the start.",
    mood: "win",
  },
];

export function BuildingTeamSection() {
  return (
    <Section id="team">
      <Eyebrow>Building the Team</Eyebrow>
      <SectionTitle>The system wasn&rsquo;t built alone. That was the point.</SectionTitle>
      <Lead>
        A system built by one person fails when that person leaves. So it was built to be owned
        by many: contributors recruited from across the org, mentored on a new process, then
        handed to the standing teams to maintain.
      </Lead>

      <div className="flex flex-col">
        {TEAM_STEPS.map((step, i) => (
          <div
            key={step.title}
            className="grid grid-cols-[44px_1fr] gap-x-5 py-6"
            style={{ borderBottom: i < TEAM_STEPS.length - 1 ? `1px solid ${SEPARATOR}` : undefined }}
          >
            <div className="font-black leading-none" style={{ fontSize: "28px", color: "#a9bcdc" }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full shrink-0"
                  style={{ background: TEAM_MOOD_COLOR[step.mood] }}
                />
                <Heading as="h3" size="small" weight="default" UNSAFE_style={{ color: DARK }}>
                  {step.title}
                </Heading>
              </div>
              <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.7]">
                {step.body}
              </Body>
            </div>
          </div>
        ))}
      </div>

      <CaptureMedia
        image={imgTeamStructure}
        alt="Team structure slide showing key stakeholders (decision makers, collaborators, informed) and design partners across Conversational Commerce, Help Center, AI Shopping Assistant, B2B AI Assistant, and Social Commerce teams"
        surface="subtle"
      />
    </Section>
  );
}

/* ── Process ────────────────────────────────────────────────────── */

export function ProcessSection() {
  return (
    <Section id="process" variant="mid">
      <Eyebrow>Defining Goverance</Eyebrow>
      <SectionTitle>A repeatable loop, not a one-off.</SectionTitle>
      <Lead>With alignment in place, the work followed a clear loop that any team joining later can follow.</Lead>

      <JourneyTimeline
        phaseColor={DARK}
        lineColor="var(--ld-semantic-color-separator-bold, #b8c7e0)"
        items={[
          {
            date: "Discovery",
            phase: "Map what exists",
            story: "Audit existing chat screens across consumer, staff, and enterprise products. Build from what's real, not assumptions.",
            mood: "progress",
            captures: [
              {
                image: imgProjectBrief,
                alt: "Universal Chat UI Kit project brief showing the problem statement, key results, success criteria, and project goals",
              },
              {
                image: imgAuditSpread,
                alt: "Side-by-side audit of chat UI screens across products, annotated with header patterns and specimen breakdowns",
              },
            ],
          },
          {
            date: "Analysis",
            phase: "Group and prioritize",
            story: "Group patterns in Airtable with effort levels, timelines, and designer ownership. Track actual progress, not just a wishlist.",
            mood: "progress",
            captures: [
              {
                image: imgPatternAnalysisTracker,
                alt: "Project planning and progress tracker showing component names, build status, filter category, paired components, and priority/effort level",
              },
            ],
          },
          {
            date: "Review",
            phase: "Test with the teams",
            story: "Review components in batches with the contributor team: patterns, design tokens, naming, accessibility, and engineering specs for the SDK.",
            win: "Reviews only work with full attendance. A shared review template made that consistent.",
            mood: "win",
            captures: [
              {
                video: videoRecipeBuild,
                alt: "Screen recording of the recipe generator automation assembling a recipe in Figma",
              },
            ],
          },
          {
            date: "Build",
            phase: "Assemble the hierarchy",
            story: "The design system provides the atoms, the chat system extends upward into molecules, organisms, and templates. The team built the components against it, each named precisely so any team can navigate without asking.",
            mood: "progress",
          },
          {
            date: "Recipes",
            phase: "Find the repeating flows",
            story: "Start from user flows to surface recipe patterns, the common interaction shapes every chatbot reuses. Break each recipe into element-level UI patterns.",
            mood: "progress",
          },
          {
            date: "Document",
            phase: "Write it down",
            story: "Design guidelines, token references, engineering specs, and accessibility annotations, so any designer or engineer can pick up a component cold.",
            win: "The review template, onboarding structure, and contribution path let partner designers contribute without anyone in the room to guide them.",
            mood: "win",
          },
        ]}
      />

    </Section>
  );
}

/* ── Governance ─────────────────────────────────────────────────── */

const GOVERNANCE_CARDS = [
  { title: "Intake and tracking", body: "Contributors and product teams submit requests via a shared tracker. Every component is logged with designer ownership, effort level, and design file links." },
  { title: "Batched reviews", body: "The full contributor team reviews components in batches before anything merges. Domain expertise from each product team shapes every decision." },
  { title: "Contribution path", body: "Any contributor can propose, build, and publish components. The path is documented so new contributors can join without needing to ask how." },
  { title: "Handoff to standing teams", body: "The handoff defined clear decision rights and escalation paths, so ownership moved with the authority to run it, not just the workload." },
];

const TOOL_STACK = [
  { icon: "Grid", title: "Airtable", body: "Component intake, build tracking, and documentation. One source of truth for what's in flight." },
  { icon: "Flash", title: "Scripter + Automator", body: "Figma plugins that automate component builds, documentation exports, and recipe generation." },
  { icon: "Video", title: "Video documentation", body: "Screen recordings embedded directly in design files for onboarding and review sessions." },
  { icon: "Link", title: "Figma branching", body: "Ticket-named branches for every component. Designs lock after engineering handoff." },
];

export function GovernanceSection() {
  return (
    <Section id="The Playbook">
      <Eyebrow>Governance</Eyebrow>
      <SectionTitle>Owned, reviewed, open to contribute.</SectionTitle>
      <Lead>The system only stays accurate if ownership is clear, now and as it scales.</Lead>

      <div>
        <Heading as="h3" size="small" weight="default" UNSAFE_className="mb-4" UNSAFE_style={{ color: DARK, paddingBottom: "0px" }}>
          How it fits into Design System's at Walmart
        </Heading>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="mb-4 leading-[1.7]" UNSAFE_style={{ paddingBottom: "24px" }}>
          The Conversational UI Kit doesn't replace the core system, it extends it. Each layer
          inherits from the one below, so a token update at the core still flows through to every
          chat surface without a manual re-sync.
        </Body>
        <LayerStack
          layers={[
            { title: "Core Design systemn", detail: "Color tokens, type scale, spacing, icon set. 644 components." },
            { title: "Platform Sub-system", detail: "Platform tokens, product themes, accessibility base." },
            { title: "Conversational UI Kit", detail: "834 components, 50 variables: bubbles, input bar, headers, carousels.", highlight: true },
            { title: "Recipes", detail: "Automated, prompt-based user flow outputs, detached on generation." },
          ]}
        />
      </div>

      <div>
        <Heading as="h3" size="small" weight="default" UNSAFE_className="mb-2" UNSAFE_style={{ color: DARK }}>
          The naming taxonomy
        </Heading>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="mb-4 leading-[1.7]">
          <span style={{ display: "block", marginBottom: 24 }}>
            Every component name encodes its layer: whether it's in code, who owns it, and how it
            relates to others. That consistency keeps the system navigable as more teams contribute.
          </span>
     
        </Body>
        <div className="mt-2 mb-2">
          <ImageFull
            src={imgComponentBuild}
            alt="Chat Navigation component handoff documentation: usage guidelines, engineering specs, behaviors and specifications, and accessibility guidance"
            surface="subtle"
            frameClassName="p-6"
          />
        </div>
        <NamingTaxonomy
          levels={[
            {
              badge: "Global, Published",
              title: "[UI KIT] Chat Header-collapsed",
              description: "All-caps prefix, Title Case name, hyphen-variant. Built in code with locked tokens.",
              examples: ["UI KIT] ChatBubble", "[CHAT] InputBar", "[CHAT] Avatar-image"],
              tone: "published",
            },
            {
              badge: "Subcomponent",
              title: "Action / Collapsible + Close-default",
              description: "No prefix. Parent / Slash / Name. Not built in code; feeds into published components.",
              examples: ["Feedback / ThumbsUp & Down", "Input / SendButton"],
              tone: "sub",
            },
            {
              badge: "Base",
              title: ".icon buttons-feedback",
              description: "Period prefix, lower case. Never published, nested inside larger components.",
              examples: [".avatar-dot", ".status-pill"],
              tone: "base",
            },
            {
              badge: "Atoms, from Living Design",
              title: "[CORE] IconButton",
              description: "The chat kit only adds atoms when Living Design doesn't cover the gap, like React Native dark-background support.",
              examples: ["Color tokens", "Type scale", "Spacing", "Radius"],
              tone: "atom",
            },
          ]}
        />
      </div>

      <div>
        <Heading as="h3" size="small" weight="default" UNSAFE_className="mb-4" UNSAFE_style={{ color: DARK }}>
          How the system stays current
          <span style={{ display: "block", marginBottom: 24 }} />
     
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOVERNANCE_CARDS.map((card) => (
            <div key={card.title} className="rounded-lg p-6" style={{ background: "#ffffff", border: `1px solid ${SEPARATOR}`, borderLeft: "3px solid #0053e2" }}>
              <Body as="p" size="small" weight="alt" UNSAFE_className="mb-2" UNSAFE_style={{ color: DARK }}>
                {card.title}
              </Body>
              <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
                {card.body}
              </Body>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Heading as="h3" size="small" weight="default" UNSAFE_className="mt-10 mb-4" UNSAFE_style={{ color: DARK }}>
          The tooling stack
        </Heading>
        <span style={{ display: "block", marginBottom: 24 }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {TOOL_STACK.map((tool) => (
            <div key={tool.title} className="rounded-lg p-5 flex gap-3.5 items-start" style={{ background: "#ffffff", border: `1px solid ${SEPARATOR}` }}>
              <span style={{ color: "#0053e2" }}>
                <Icon name={tool.icon} size="medium" decorative />
              </span>
              <div>
                <Body as="p" size="small" weight="alt" UNSAFE_className="mb-1.5" UNSAFE_style={{ color: DARK }}>
                  {tool.title}
                </Body>
                <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.55]">
                  {tool.body}
                </Body>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Heading as="h3" size="small" weight="default" UNSAFE_className="mb-4" UNSAFE_style={{ color: DARK }}>
          End results
        </Heading>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="mb-4 leading-[1.7]">
          The automation closes the loop: the same tooling that keeps the system in sync also
          builds the deliverables teams hand off to engineering.
        </Body>
        <div className="flex flex-col gap-8">
          <div className="mt-2 mb-2">
            <VideoFull
              src={videoThemeValidation}
              alt="Screen recording of a script running automated theme validation tests across the design system"
              label="Theme validation"
              caption="A script that runs automated checks across every theme, catching token drift before it ships."
              playback="controls"
              surface="subtle"
            />
          </div>
          <div className="mt-2 mb-2">
            <VideoFull
              src={videoRecipeBuild}
              alt="Screen recording of the recipe generator automation assembling a recipe in Figma"
              label="Recipe generator"
              caption="The Scripter automation that assembles a recipe from its component parts, pulling in components, tokens, and variant states automatically."
              playback="controls"
              surface="subtle"
            />
          </div>
          <div className="mt-2 mb-2">
            <EmbedFull
              src="https://metooha.github.io/walmart-demo-app/walmart"
              title="Conversational UI Kit: live demo site"
              label="Try it live"
              caption="Click the FAB at the bottom right and open the chat to test some of the components."
              aspectRatio="16 / 10"
              mobileAspectRatio="375 / 812"
              surface="subtle"
            />
          </div>
          <div className="mt-2 mb-2">
            <EmbedFull
              src="https://metooha.github.io/px-sub-theme-editor/campaign-dashboard"
              title="B2B enterprise example: campaign dashboard"
              label="Try it live"
              caption="A B2B enterprise pattern with a moveable FAB that can dock into the masthead or a data table, just like the Marty example. Docked in the masthead, it opens as a side panel instead of a floating bubble."
              aspectRatio="16 / 10"
              mobileAspectRatio="375 / 812"
              surface="subtle"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Impact ─────────────────────────────────────────────────────── */

export function ImpactSection() {
  return (
    <Section id="impact" variant="mid">
      <Eyebrow>Impact</Eyebrow>
      <SectionTitle>What changed.</SectionTitle>
      <Lead>
        The goal wasn&rsquo;t a design system. It was to change how product teams work, and to
        build something the org could reuse.
      </Lead>

      <StatsRow
        variant="light"
        stats={[
          { value: "[ 10+ ]", label: "Product teams onboarded" },
          { value: "[ 45+ ]", label: "Components & patterns published" },
          { value: "[ 12+ ]", label: "Engineering weeks saved per launch" },
          { value: "[ 6+ ]", label: "Designers grown as contributors" },
        ]}
      />

      <div className="rounded-lg p-6" style={{ background: "#ffffff", border: `1px solid ${SEPARATOR}`, borderLeft: "4px solid #0053e2" }}>
        <div className="mb-2">
          <Eyebrow>How it scales without scaling the team</Eyebrow>
        </div>
        <Body as="p" size="small" UNSAFE_className="leading-[1.7] mb-4" UNSAFE_style={{ color: DARK }}>
          Contributors were recruited and mentored on a process none had run before, then
          maintenance transferred to the standing teams once it was proven. The goal from day
          one: build people and a process, not a dependency on any one person.
        </Body>
        <div style={{ height: 16 }} />
   
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-2.5">
            <span className="font-black" style={{ color: "#0053e2", fontSize: "15px" }}>[ 6+ ]</span>
            <Body as="p" size="small" UNSAFE_style={{ color: DARK }}>Contributors recruited and mentored on the process</Body>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-black" style={{ color: "#0053e2", fontSize: "15px" }}>[ 20 ]</span>
            <Body as="p" size="small" UNSAFE_style={{ color: DARK }}>Components & patterns shipped by the contributor team</Body>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span style={{ color: "#0053e2" }}>
              <Icon name="Check" size="small" decorative />
            </span>
            <Body as="p" size="small" UNSAFE_style={{ color: DARK }}>Maintenance handed to standing engineering and design teams</Body>
          </div>
        </div>
      </div>

      <div className="rounded-lg p-6" style={{ background: DARK }}>
        <div className="mb-3">
          <Eyebrow onDark>The biggest outcome: a reusable framework</Eyebrow>
        </div>
        <Body as="p" size="small" UNSAFE_className="leading-[1.7] mt-6 mb-6 pb-6" UNSAFE_style={{ color: "rgba(255,255,255,0.78)" }}>
          The chat kit was the first, not the only. The process, taxonomy, and governance built
          for it became the blueprint the org now uses to stand up new kits.
        </Body>
        <FrameworkKits
          kits={[
            { icon: "Chat", name: "Conversational UI", status: "Shipped, the first kit", done: true },
            { icon: "Terminal", name: "Agent Canvas", status: "Built on the framework" },
            { icon: "Map", name: "Maps", status: "Built on the framework" },
            { icon: "Grid", name: "Data Tables", status: "Built on the framework" },
            { icon: "Plus", name: "Recipes & more", status: "Same pattern, new domains" },
          ]}
        />
        <Body as="p" size="small" UNSAFE_className="mt-5 py-4 leading-[1.7]" UNSAFE_style={{ color: "rgba(255,255,255,0.78)" }}>
          A one-off design system solves one problem. A framework for building design systems
          solves every problem of that shape. That was the real deliverable.
        </Body>
      </div>
    </Section>
  );
}

/* ── Closing ────────────────────────────────────────────────────── */

export function ClosingSection() {
  return (
    <>
      <Section id="next" variant="dark">
        <Eyebrow onDark>What&rsquo;s Next</Eyebrow>
        <SectionTitle onDark>Still a long way to go.</SectionTitle>
        <Lead onDark>
          The foundation is built and shipped. The team is onboarding partners and running in
          maintenance mode. Next is scale.
        </Lead>

        <NextGrid
          items={[
            { when: "Done", title: "Build the foundation", description: "Audit, build, document, and review the core chat patterns with partner teams." },
            { when: "Done", title: "Ship the SDK", description: "Engineering SDK P1-P2 in Q3/Q4. Native and React Native support." },
            { when: "Now", title: "Onboard and maintain", description: "Onboarding teams onto the system, formalized intake, in maintenance mode with teams requesting contributions." },
            { when: "Next", title: "Decentralize further", description: "Standing teams own maintenance. Next, expand contribution to every product team.", future: true },
          ]}
        />
      </Section>
      
    </>
  );
}
