import React from "react";
import {
  Section,
  Eyebrow,
  SectionTitle,
  Lead,
  ProblemGrid,
  Callout,
  ImageFull,
  BeforeAfter,
  StatsRow,
  QuoteBlock,
  NextGrid,
  JourneyTimeline,
} from "@/app/components/CaseStudyPrimitives";
import { Body, Heading } from "@/app/components/Text/Text";
import { Icon } from "@/app/components/Icons/Icons";
import imgFragmentation from "@/app/assets/pages/case-study/uc-uikit/different-chats.png";
import {
  TestimonialGrid,
  UseCaseGrid,
  PlatformMatrix,
  NamingTaxonomy,
  TrackerTable,
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
        foundation that didn&rsquo;t exist yet.
      </Lead>

      <ProblemGrid
        cards={[
          {
            who: "Platform migration",
            whoColor: DARK,
            title: "Moving to a closed framework that requires tokens and theming",
            description:
              "Walmart moved its products to a new closed framework requiring shared tokens and theming. Teams could no longer maintain their own UI, and everyone had to rebuild to spec.",
          },
          {
            who: "Market consolidation",
            whoColor: "#0053e2",
            title: "Merging platforms built for separate markets",
            description:
              "Walmart.com, Sam's Club, and Bodega Aurrera had each built their own chat UI. As the platforms merged, the UIs weren't just different, they were incompatible.",
          },
        ]}
      />

      <div className="mt-2">
        <Callout tone="warning">
          The ask from engineering and product was clear: support multi-tenancy and theming at
          scale, and stop teams managing it alone. A system was needed. What should it be?
        </Callout>
      </div>

      <ImageFull
        src={imgFragmentation}
        alt="Six chat UIs across Walmart products: Ask Sparky, Chat with Walmart, Chat with Bodega, Chat with Sam, a generic support assistant, and Merchant AI"
        caption="Sparky, Walmart.com, Bodega Aurrera, Sam's Club, a support assistant, and Merchant AI. Six real implementations of the same interaction, all built in isolation."
      />

      <TestimonialGrid
        quotes={[
          {
            quote:
              "We do not have the design resources to build our own chatbot UI. We want guidelines or tools to create the essentials quickly.",
            who: "A small product team",
            tag: "No design resources",
          },
          {
            quote:
              "We have our own design resources, but our components are unique. They are not built for other teams to borrow.",
            who: "A team with its own UI",
            tag: "Not portable",
          },
          {
            quote:
              "Our tool is set to merge with another, but our UIs are inconsistent. When we merge, we would redo everything from scratch.",
            who: "A team facing a merger",
            tag: "Forced rebuild",
          },
        ]}
      />

      <Callout tone="neutral">
        <strong style={{ color: DARK }}>This is where design came in.</strong> Engineering and
        product knew what was needed: a shared, themeable, multi-tenant chat system. They did not
        know what it should look like, how to govern it, or who should build it. That was the
        design problem.
      </Callout>
    </Section>
  );
}

/* ── Defining the Work ──────────────────────────────────────────── */

const DEFINE_STEPS = [
  {
    title: "Understand each team's position in the migration",
    body: "The migration hit everyone, but from different starting points, as the three teams above show. The system had to serve all of them at once, not just the best-resourced.",
  },
  {
    title: "Map what existed and what the framework required",
    body: "The Living Design system had the atoms. The new framework required tokens and theming at the system level, not team by team. Local components weren't token-compliant, and nothing was structured for what the framework now required.",
  },
  {
    title: "Translate the technical mandate into design goals",
    body: "Multi-tenancy and theming weren't optional features. They were requirements the framework imposed. The design goals had to start there and work outward: themeable from day one, remove duplication across merging markets, and give every team a clear starting point.",
  },
  {
    title: "Make the hard call: patterns and recipes, not just components",
    body: "A component library was the obvious answer, faster to build and easier to scope. But it solves a delivery problem, not a design one. Teams didn't just need shared buttons. They needed shared thinking for each use case.",
  },
];

export function DefiningSection() {
  return (
    <Section id="defining" variant="mid">
      <Eyebrow>Defining the Work</Eyebrow>
      <SectionTitle>The problem was clear. The solution wasn&rsquo;t.</SectionTitle>
      <Lead>The job was to turn a technical mandate into a system teams could actually adopt.</Lead>

      <div className="flex flex-col">
        {DEFINE_STEPS.map((step, i) => (
          <div
            key={step.title}
            className="grid grid-cols-[44px_1fr] gap-x-5 py-6"
            style={{ borderBottom: i < DEFINE_STEPS.length - 1 ? `1px solid ${SEPARATOR}` : undefined }}
          >
            <div className="font-black leading-none" style={{ fontSize: "28px", color: SEPARATOR }}>
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

      <div>
        <Body as="p" size="small" weight="alt" UNSAFE_className="mb-3" UNSAFE_style={{ color: DARK }}>
          The tradeoff
        </Body>
        <BeforeAfter
          before={[
            {
              who: "What wasn't built",
              title: "A component library",
              description:
                "Fast to ship, but teams would still make the same design decisions alone. Fragmentation would just move up one layer.",
            },
          ]}
          after={[
            {
              who: "What was built instead",
              title: "A pattern and recipe system",
              description:
                "Slower to define, but it solved the real problem: how to design well for each use case, on top of shared components.",
            },
          ]}
        />
      </div>
    </Section>
  );
}

/* ── Scope ──────────────────────────────────────────────────────── */

export function ScopeSection() {
  return (
    <Section id="scope">
      <Eyebrow>The Scope</Eyebrow>
      <SectionTitle>Not a component kit. A pattern system for three different experiences.</SectionTitle>
      <Lead>
        The chat experiences weren&rsquo;t variations of one thing. They were three distinct use
        cases, each with its own interaction model.
      </Lead>

      <UseCaseGrid
        items={[
          {
            icon: "Sparky",
            headerColor: DARK,
            type: "AI Shopping Assistant (Sparky)",
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

      <Callout tone="brand">
        All three share a base layer: bubbles, input bar, avatars, timestamps. The patterns and
        recipes on top are entirely different for each. The base had to be flexible, and the
        recipe layer had to be specific.
      </Callout>

      <div>
        <Heading as="h3" size="small" weight="default" UNSAFE_className="mb-1" UNSAFE_style={{ color: DARK }}>
          And across three platforms
        </Heading>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="mb-4 leading-[1.7]">
          Desktop web, native iOS and Android, and React Native, each with a different token
          pipeline. A component that worked on web could break on native.
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

      <Callout tone="neutral">
        <strong style={{ color: DARK }}>The implication:</strong> every design decision had to
        hold across all three use cases and all three platforms, not just the screen in front of
        you.
      </Callout>
    </Section>
  );
}

/* ── Building the Team ──────────────────────────────────────────── */

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

      <JourneyTimeline
        phaseColor={DARK}
        items={[
          {
            date: "",
            phase: "The starting conditions",
            story:
              "Living Design and the platform were on separate timelines. Engineering was reconciling two sources of truth by hand. No shared process, no shared tooling. Design wasn't in the room yet.",
            mood: "friction",
          },
          {
            date: "",
            phase: "Being first had a cost",
            story:
              "This was the first team to run end-to-end on the platform. There was no playbook for this process. It had to be invented, then taught.",
            mood: "friction",
          },
          {
            date: "",
            phase: "Contributors, not headcount",
            story:
              "There was no standing team. Designers were recruited from across product teams to contribute, with a case made to leadership for their time. Each brought product knowledge no central team could replicate.",
            mood: "win",
          },
          {
            date: "",
            phase: "Mentoring on a new process",
            story:
              "None of the contributors had built a design system this way. They were mentored through it: the audit method, the pattern-and-recipe model, token discipline, and reviews, leading through influence, not authority, since they didn't report in.",
            mood: "win",
          },
          {
            date: "",
            phase: "Design leadership buy-in",
            story:
              "The case to leadership: embedded expertise would build a better, more adopted system than a central team alone, and cost less in rework. Leadership committed the contributors' time.",
            mood: "win",
          },
          {
            date: "",
            phase: "How the team stayed coordinated",
            story:
              "Weekly syncs with engineering and product. Batched reviews with the full team. A shared intake tracker. Clear ownership so decisions didn't require escalation.",
            mood: "win",
          },
          {
            date: "",
            phase: "Then it was handed off",
            story:
              "Once the system was proven, maintenance transferred to the standing engineering and design teams. It was built to be owned by them, not to depend on any one person. That was the goal from the start.",
            mood: "win",
          },
        ]}
      />

      <Callout tone="brand">
        <strong style={{ color: DARK }}>The leadership move:</strong> don&rsquo;t build the
        system alone. Bring together the people who can, mentor them through a process no one had
        run before, then hand off ownership so it outlasts you.
      </Callout>
    </Section>
  );
}

/* ── Process ────────────────────────────────────────────────────── */

export function ProcessSection() {
  return (
    <Section id="process" variant="mid">
      <Eyebrow>The Process</Eyebrow>
      <SectionTitle>A repeatable loop, not a one-off.</SectionTitle>
      <Lead>With alignment in place, the work followed a clear loop that any team joining later can follow.</Lead>

      <JourneyTimeline
        phaseColor={DARK}
        items={[
          {
            date: "Audit",
            phase: "Map what exists",
            story: "Audit existing chat screens across consumer, staff, and enterprise products. Build from what's real, not assumptions.",
            mood: "progress",
          },
          {
            date: "Recipes",
            phase: "Find the repeating flows",
            story: "Start from user flows to surface recipe patterns, the common interaction shapes every chatbot reuses. Break each recipe into element-level UI patterns.",
            mood: "progress",
          },
          {
            date: "Analysis",
            phase: "Group and prioritize",
            story: "Group patterns in Airtable with effort levels, timelines, and designer ownership. Track actual progress, not just a wishlist.",
            mood: "progress",
          },
          {
            date: "Review",
            phase: "Test with the teams",
            story: "Review components in batches with the contributor team: patterns, design tokens, naming, accessibility, and engineering specs for the SDK.",
            win: "Reviews only work with full attendance. A shared review template made that consistent.",
            mood: "win",
          },
          {
            date: "Build",
            phase: "Assemble the hierarchy",
            story: "The design system provides the atoms, the chat system extends upward into molecules, organisms, and templates. The team built the components against it, each named precisely so any team can navigate without asking.",
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

      <div>
        <Heading as="h3" size="small" weight="default" UNSAFE_className="mb-4" UNSAFE_style={{ color: DARK }}>
          How it fits into Living Design
        </Heading>
        <LayerStack
          layers={[
            { title: "Living Design", detail: "Color tokens, type scale, spacing, icon set. 644 components." },
            { title: "Platform SDK", detail: "Platform tokens, product themes, accessibility base." },
            { title: "Conversational UI Kit", detail: "834 components, 50 variables: bubbles, input bar, headers, carousels.", highlight: true },
            { title: "Recipes", detail: "Automated, prompt-based user flow outputs, detached on generation." },
          ]}
        />
      </div>
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
    <Section id="governance">
      <Eyebrow>Governance</Eyebrow>
      <SectionTitle>Owned, reviewed, open to contribute.</SectionTitle>
      <Lead>The system only stays accurate if ownership is clear, now and as it scales.</Lead>

      <div>
        <Heading as="h3" size="small" weight="default" UNSAFE_className="mb-1" UNSAFE_style={{ color: DARK }}>
          The naming taxonomy
        </Heading>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="mb-4 leading-[1.7]">
          Every component name encodes its layer: whether it's in code, who owns it, and how it
          relates to others. That consistency keeps the system navigable as more teams contribute.
        </Body>
        <NamingTaxonomy
          levels={[
            {
              badge: "Global, Published",
              title: "[CHAT] Chat Header-collapsed",
              description: "All-caps prefix, Title Case name, hyphen-variant. Built in code with locked tokens.",
              examples: ["[CHAT] ChatBubble", "[CHAT] InputBar", "[CHAT] Avatar-image"],
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
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOVERNANCE_CARDS.map((card) => (
            <div key={card.title} className="rounded-lg p-5" style={{ background: "#ffffff", border: `1px solid ${SEPARATOR}`, borderLeft: "3px solid #0053e2" }}>
              <Body as="p" size="small" weight="alt" UNSAFE_className="mb-1.5" UNSAFE_style={{ color: DARK }}>
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
        <Heading as="h3" size="small" weight="default" UNSAFE_className="mb-4" UNSAFE_style={{ color: DARK }}>
          The tooling stack
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {TOOL_STACK.map((tool) => (
            <div key={tool.title} className="rounded-lg p-4 flex gap-3 items-start" style={{ background: "#ffffff", border: `1px solid ${SEPARATOR}` }}>
              <span style={{ color: "#0053e2" }}>
                <Icon name={tool.icon} size="medium" decorative />
              </span>
              <div>
                <Body as="p" size="small" weight="alt" UNSAFE_className="mb-0.5" UNSAFE_style={{ color: DARK }}>
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
          One place to track it all
        </Heading>
        <TrackerTable
          rows={[
            { name: "[CHAT] Chat Header", status: "Published" },
            { name: "[CHAT] Chat Header-collapsed", status: "Published" },
            { name: "[CHAT] Avatar-initials", status: "In review" },
            { name: "[CHAT] Avatar-dynamic", status: "In build" },
            { name: "[CHAT] Avatar-button", status: "Queued" },
          ]}
        />
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
          { value: "[ # ]", label: "Product teams onboarded" },
          { value: "[ # ]", label: "Components published" },
          { value: "[ # ]", label: "Engineering weeks saved per launch" },
          { value: "[ # ]", label: "Designers grown as contributors" },
        ]}
      />

      <div className="rounded-lg p-6" style={{ background: "#ffffff", border: `1px solid ${SEPARATOR}`, borderLeft: "4px solid #0053e2" }}>
        <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em] mb-2" UNSAFE_style={{ fontSize: "11px", color: "#0053e2" }}>
          How it scales without scaling the team
        </Body>
        <Body as="p" size="small" UNSAFE_className="leading-[1.7] mb-4" UNSAFE_style={{ color: DARK }}>
          Contributors were recruited and mentored on a process none had run before, then
          maintenance transferred to the standing teams once it was proven. The goal from day
          one: build people and a process, not a dependency on any one person.
        </Body>
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-2.5">
            <span className="font-black" style={{ color: "#0053e2", fontSize: "15px" }}>[ # ]</span>
            <Body as="p" size="small" UNSAFE_style={{ color: DARK }}>Contributors recruited and mentored on the process</Body>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-black" style={{ color: "#0053e2", fontSize: "15px" }}>[ # ]</span>
            <Body as="p" size="small" UNSAFE_style={{ color: DARK }}>Components shipped by the contributor team</Body>
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
        <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em] mb-3" UNSAFE_style={{ fontSize: "11px", color: "#ffc220" }}>
          The biggest outcome: a reusable framework
        </Body>
        <Body as="p" size="small" UNSAFE_className="leading-[1.7] mb-5" UNSAFE_style={{ color: "rgba(255,255,255,0.7)" }}>
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
        <Body as="p" size="small" UNSAFE_className="mt-5 leading-[1.7]" UNSAFE_style={{ color: "rgba(255,255,255,0.7)" }}>
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
      <QuoteBlock
        quote="The measure of a design system isn't what it ships. It's how many teams build better because it exists."
        attribution="Principal Product Designer, Walmart"
      />
    </>
  );
}
