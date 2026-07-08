import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Body } from "@/app/components/Text/Text";
import {
  BeforeAfter,
  EmbedFull,
  Eyebrow as EdsEyebrow,
  ImageFull,
  Lead as EdsLead,
  Section as EdsSection,
  SectionTitle as EdsSectionTitle,
  StatsRow,
  VideoFull,
} from "@/app/components/CaseStudyPrimitives";
import { EdsJourneyTimeline, type EdsJourneyItem } from "../everyday-sans/EdsCaseStudyPrimitives";
import {
  FigmaCallout,
  FigmaDayCard,
  FigmaEyebrowOnDark,
  FigmaGenAiJourney,
  FigmaPullQuote,
  FigmaSignalGrid,
  FigmaTierChain,
  FigmaUnlockGrid,
} from "./FigmaToCodeBlocks";
import imgDesignEngineering from "@/app/assets/pages/case-study/figma-to-code/optimized/design-engineering.jpg";
import imgPipeline from "@/app/assets/pages/case-study/figma-to-code/optimized/discovery-flow-diagram.jpg";
import imgInheritance from "@/app/assets/pages/case-study/figma-to-code/optimized/Simple-inheritance-Model.jpg";
import videoB2bKit from "@/app/assets/pages/case-study/figma-to-code/optimized/kit-demo.mp4";
import imgAirtableDatabase from "@/app/assets/pages/case-study/figma-to-code/optimized/airtable-database.jpg";
import imgTempoEngSpecs from "@/app/assets/pages/case-study/figma-to-code/optimized/tempo-eng-specs.jpg";
import imgDayZero from "@/app/assets/pages/case-study/figma-to-code/optimized/day-zero.jpg";
import imgDayOne from "@/app/assets/pages/case-study/figma-to-code/optimized/day-one.jpg";
import imgMultiplayer from "@/app/assets/pages/case-study/figma-to-code/optimized/builder.io-multi-player.jpg";
import imgYbmPhotos from "@/app/assets/pages/case-study/figma-to-code/optimized/ybm-photos.jpg";
import imgProof from "@/app/assets/pages/case-study/figma-to-code/optimized/builder.jpg";

const BRAND = "var(--ld-semantic-color-text-brand, #0053e2)";

// ── 1 · The problem ────────────────────────────────────────────────

export function FigmaToCodeProblemSection() {
  return (
    <EdsSection id="problem">
      <EdsEyebrow>The problem</EdsEyebrow>
      <EdsSectionTitle>Two teams. Same spec. Every time.</EdsSectionTitle>
      <EdsLead>
        The design is done: every token, spacing value, and state defined in Figma. Then an engineer rebuilds
        all of it by hand. That&rsquo;s the handoff, and it runs thousands of times a year.
      </EdsLead>
      <ImageFull
        src={imgDesignEngineering}
        alt="Two panels: Design specifies tokens and spacing in Figma; Engineering rebuilds it in code and the values start to drift"
        caption="The same work, twice. Design sets every token and spec in Figma; engineering re-implements the exact same values in code, so the spec now lives in two places and drifts."
        surface="subtle"
      />
      <FigmaCallout lead="The reframe:">
        the spec already exists. What&rsquo;s missing is a system that carries it into code without a human
        retyping it.
      </FigmaCallout>
    </EdsSection>
  );
}

// ── 2 · Discovery ──────────────────────────────────────────────────

const DISCOVERY_ITEMS: EdsJourneyItem[] = [
  {
    date: "Kickoff",
    phase: "Why design-to-code",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Leadership", variant: "engineering" },
    ],
    story: "Framed the cost of manual handoff and got the green light to run a hands-on discovery workshop with engineering and Builder.io.",
    mood: "progress",
  },
  {
    date: "Analysis",
    phase: "Component & complexity",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
    ],
    story: "Real components were broken into atomic pieces and scored, breakpoints, states, layout, custom styling, accessibility, to know exactly what automation would have to handle.",
    mood: "progress",
  },
  {
    date: "Workshop",
    phase: "Two days, one room",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
      { label: "Builder.io", variant: "foundry" },
    ],
    story: "Components were walked end to end, Figma to generated code, and the tooling split got settled: designers on the visual GUI, engineers on the CLI with delta updates.",
    win: "the full Figma-to-code path works on real components.",
    mood: "win",
  },
  {
    date: "Alignment",
    phase: "The non-negotiables",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
    ],
    story: "The bar any automation had to clear got agreed: compatibility with existing tools, design fidelity, code integration, iteration speed, and team standards.",
    win: "a shared component lifecycle that later became the pipeline.",
    mood: "win",
  },
];

export function FigmaToCodeDiscoverySection() {
  return (
    <EdsSection id="discovery" variant="mid">
      <EdsEyebrow>How it started</EdsEyebrow>
      <EdsSectionTitle>First, it got figured out together.</EdsSectionTitle>
      <EdsLead>
        Before scaling anything, a six-week discovery phase ran with engineering and the Builder.io team:
        pressure-testing feasibility, scoring component complexity, and agreeing on what getting design-to-code
        right would actually take.
      </EdsLead>
      <EdsJourneyTimeline items={DISCOVERY_ITEMS} />
    </EdsSection>
  );
}

// ── 3 · Real project ──────────────────────────────────────────────

export function FigmaToCodeProjectSection() {
  return (
    <EdsSection id="project">
      <EdsEyebrow>Where it started</EdsEyebrow>
      <EdsSectionTitle>One real component. Real scope.</EdsSectionTitle>
      <EdsLead>
        This didn&rsquo;t begin as a platform vision. It began with a single component, the Segmented Control,
        built to the design system&rsquo;s full spec, with one measurable goal: cut design-to-code time by 50 to
        70 percent.
      </EdsLead>
      <StatsRow
        variant="light"
        stats={[
          { value: "50–70%", label: "Target cut in design-to-code time" },
          { value: "70%", label: "Production-ready on generation" },
          { value: "3", label: "Platforms: DWeb, MWeb, iOS/Android" },
          { value: "3 mo", label: "Phase 1 timeline" },
        ]}
      />
      <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em] m-0 mt-2" UNSAFE_style={{ fontSize: "11px", color: BRAND }}>
        Component creation with a seed file
      </Body>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7] -mt-3">
        This is what got tested first: engineering specs annotated directly on the component in Figma, then
        translated into a seed file so generation had structured data to build from, not just a static design.
      </Body>
      <ImageFull
        src={imgTempoEngSpecs}
        alt="Figma engineering specs for the adjustable carousel card component: anatomy, breakpoint variants, and design tokens by platform"
        caption="The engineering specs tested against the real component: anatomy, breakpoint variants, and tokens by platform, annotated directly in Figma."
        surface="subtle"
      />
      <ImageFull
        src={imgAirtableDatabase}
        alt="Airtable base modeling module configs, option types, and required fields for each component"
        caption="Those specs became the seed file. Module configs, option types, and required fields, modeled in Airtable, the structured data generation builds from."
        surface="subtle"
      />
    </EdsSection>
  );
}

// ── 4 · The kit ────────────────────────────────────────────────────

export function FigmaToCodeKitSection() {
  return (
    <EdsSection id="kit" variant="mid">
      <EdsEyebrow>The kit</EdsEyebrow>
      <EdsSectionTitle>Making it repeatable for any designer.</EdsSectionTitle>
      <EdsLead>
        One component proved it worked. A kit made it repeatable: real components, ready to prototype in, with a
        clean path to code.
      </EdsLead>
      <FigmaUnlockGrid
        items={[
          { title: "Rapid prototyping", description: "Ideate and test complex interactions instantly through the Figma and Chrome plugins." },
          { title: "Dynamic context", description: "Design with real CMS assets, conditional logic, and localization, not static screens." },
          { title: "Walmart Design System integration", description: "AI and developers build against strict, on-brand component rules by default." },
          { title: "Frictionless handoff", description: "Turn visual designs into production-ready blueprints, not specs to reinterpret." },
        ]}
      />
      <VideoFull
        src={videoB2bKit}
        alt="Demo of the B2B kit inside Builder.io: the full component library and page templates for the kit"
        caption="The B2B kit inside Builder.io. The full component library and guidelines, themed with real tokens, every project starts from a shared foundation."
        surface="subtle"
        playback="controls"
      />
      <FigmaDayCard
        tag="Day Zero"
        title="Onboarding & setup"
        items={[
          { lead: "Get connected.", description: "Desktop app, corporate VPN." },
          { lead: "Prep files.", description: "Figma assets exportable, Auto Layout on." },
          { lead: "Capture intent.", description: "Annotations for complex interactions." },
          { lead: "Load the kit.", description: "Drop in the B2B kit, pre-approved components, instantly." },
        ]}
      />
      <ImageFull
        src={imgDayZero}
        alt="Builder.io's Smart Export panel exporting a Figma frame into a live project"
        caption="Day Zero. Builder.io connects to the Figma source, then a component exports straight into a live project."
      />
      <FigmaDayCard
        tag="Day One"
        title="Rapid iteration"
        items={[
          { lead: "Complex flows.", description: "Build and test real interactions fast." },
          { lead: "100% compliant.", description: "Approved tokens and typography, automatically." },
          { lead: "High-fidelity reviews.", description: "Interactive prototypes for PMs, no dev sprint needed." },
        ]}
      />
      <ImageFull
        src={imgDayOne}
        alt="Walmart Connect Ad Center dashboard running as a live prototype in the browser"
        caption="Day One. An AI agent reads the Figma designs and builds a working, high-fidelity Ad Center prototype from real components."
      />
      <EmbedFull
        src="https://metooha.github.io/px-sub-theme-editor/page-template"
        title="B2B kit — live page template prototype"
        label="Try it live"
        caption="A live page template built from the B2B kit, running the same Walmart Design System components the pipeline generates against."
        aspectRatio="16 / 10"
        bordered
      />
    </EdsSection>
  );
}

// ── 5 · Walmart Connect ────────────────────────────────────────────

export function FigmaToCodeConnectSection() {
  return (
    <EdsSection id="connect">
      <EdsEyebrow>First real test</EdsEyebrow>
      <EdsSectionTitle>Walmart Connect, built live.</EdsSectionTitle>
      <EdsLead>
        The kit&rsquo;s first real test: co-designing a working Ad Center prototype with the Walmart Connect
        team, in real components, reviewed like a product, not a mockup.
      </EdsLead>
      <ImageFull
        src={imgMultiplayer}
        alt="Builder.io editor with an AI agent chat fixing a runtime error and multiple named cursors editing the same file"
        caption="Co-designed live, in the real build. Product, design, and engineering in the same Ad Center prototype at once, real components, live cursors, reviewed like a product instead of walked through as slides."
      />
      <FigmaCallout lead="Why it worked:">
        one shared URL replaced the static deck. Feedback happened on the actual build, and the AI agent
        resolved issues in real time, so reviews turned into progress, not a backlog.
      </FigmaCallout>
    </EdsSection>
  );
}

// ── 6 · Going wide ─────────────────────────────────────────────────

export function FigmaToCodeConferenceSection() {
  return (
    <EdsSection id="conference" variant="mid">
      <EdsEyebrow>Going wide</EdsEyebrow>
      <EdsSectionTitle>Then it went to the whole org.</EdsSectionTitle>
      <EdsLead>
        A booth at the internal design conference. Live demos all day, real components generating real code in
        front of hundreds of designers, PMs, and engineers.
      </EdsLead>
      <ImageFull
        src={imgYbmPhotos}
        alt="Photo collage of the team demoing the AI prototyping pipeline at a company event, including an attendee holding a handmade 'AI advice' sign"
        caption="Demoing the workflow at the org-wide conference. Hands-on, all day. The booth drew a line, and turned curiosity into a signup sheet."
      />
    </EdsSection>
  );
}

// ── 7 · The demand ─────────────────────────────────────────────────

export function FigmaToCodeDemandSection() {
  return (
    <EdsSection id="demand">
      <EdsEyebrow>The demand</EdsEyebrow>
      <EdsSectionTitle>Teams weren&rsquo;t waiting to be sold.</EdsSectionTitle>
      <EdsLead>The interest was already there, and it showed up as sign-ups.</EdsLead>
      <StatsRow
        variant="light"
        stats={[
          { value: "150+", label: "Sign-ups" },
          { value: "75+", label: "Unique teams" },
          { value: "80%+", label: "Product managers" },
          { value: "80%+", label: "Leadership or senior IC" },
        ]}
      />
      <FigmaSignalGrid
        items={[
          {
            quote: "Just what I've been wanting. I hate explaining prototypes that don't look like they belong in our ecosystem.",
            attribution: "Director, Product Management",
            label: "Signal 1",
            title: "UI kits & prototypes",
            description: "Rapid prototyping tools and reusable components that speed up delivery.",
          },
          {
            quote: "I want to build prototypes that support operations across multiple teams, ideations given life.",
            attribution: "Senior Manager, Operations",
            label: "Signal 2",
            title: "Implementation support",
            description: "Vibe-coding support and hands-on training to adopt the system at scale.",
          },
          {
            quote: "When are you going to offer support for code-puppy?",
            attribution: "Staff, Product Management",
            label: "Signal 3",
            title: "AI-assisted workflows",
            description: "Strong interest in AI as the bridge between product and design.",
          },
        ]}
      />
    </EdsSection>
  );
}

// ── 8 · The pipeline ───────────────────────────────────────────────

export function FigmaToCodePipelineSection() {
  return (
    <EdsSection id="pipeline" variant="mid">
      <EdsEyebrow>The pipeline</EdsEyebrow>
      <EdsSectionTitle>Then it got built to scale.</EdsSectionTitle>
      <EdsLead>
        Demand meant one prototype wasn&rsquo;t enough. The pipeline made it repeatable: Figma to code, with a
        data backbone that keeps design, content, and tokens in sync.
      </EdsLead>

      <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em] m-0" UNSAFE_style={{ fontSize: "11px", color: BRAND }}>
        Library inheritance model
      </Body>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7] -mt-3">
        The Walmart Design System provides the core tokens and components most products and teams need.
        Subsystems can add tokens and components specific to their domain. Those libraries can use everything
        above them, with one caveat: their components carry content, details, and interactions specific to a
        team&rsquo;s features.
      </Body>
      <FigmaTierChain tiers={["Core library", "Business pillar", "Tenant theme", "Product team"]} />
      <ImageFull
        src={imgInheritance}
        alt="Inheritance diagram: a core library of tokens and components branches into Customer, Internal, and B2B business pillars, then tenant brand themes, then product-team-specific components"
        caption="The system it has to respect. The core library cascades tokens and components down through business pillars, tenants, and product teams, so generation can't be a one-off. It has to honor the whole inheritance model."
        surface="subtle"
      />

      <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em] m-0 mt-2" UNSAFE_style={{ fontSize: "11px", color: BRAND }}>
        How the pipeline works
      </Body>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7] -mt-3">
        Figma is the input. A processor trained on the design system maps it to code, a fine-tuned LLM refines
        the result, and it ships out to every surface: web, mobile web, native apps, and content seeds.
      </Body>
      <ImageFull
        src={imgPipeline}
        alt="Pipeline diagram: Figma input into a processor trained on the design system, generating code, refined by a fine-tuned LLM, output to GitHub and then DWeb, MWeb, native apps, and Tempo seed JSONs"
        caption="Figma in, production code out. The processor knows the design system; the LLM refines the generated code; GitHub carries it to DWeb, MWeb, native apps, and Tempo seed JSONs."
      />

      <Body as="p" size="small" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7] mt-2">
        Every component now follows one lifecycle:
      </Body>
      <FigmaTierChain
        tiers={["Build", "Token map", "Generate", "Storybook", "A11y + analytics", "Test", "Document"]}
        highlight={["Generate"]}
      />
      <FigmaCallout lead="What lands with the engineer:">
        a pull request, roughly 70% production-ready, with accessibility and analytics scaffolded in, a diff to
        review, not a Figma file to reinterpret.
      </FigmaCallout>
      <Body as="p" size="small" UNSAFE_className="max-w-[660px] leading-[1.7] m-0" UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)" }}>
        <strong>It runs inside real infrastructure.</strong> Version-locked repos, VPN, native theming, each
        blocker hit in Phase 1 became a Phase 2 requirement, not a dead end.
      </Body>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
        This inheritance tree is the same token infrastructure documented in{" "}
        <RouterLink to="/case-study/6" style={{ color: BRAND, textDecoration: "underline" }}>
          A Quest for a Source of Truth
        </RouterLink>
        . This pipeline is one of the things it made possible.
      </Body>
    </EdsSection>
  );
}

// ── 9 · The proof ──────────────────────────────────────────────────

export function FigmaToCodeProofSection() {
  return (
    <EdsSection id="proof">
      <EdsEyebrow>The proof</EdsEyebrow>
      <EdsSectionTitle>Already scaling across teams.</EdsSectionTitle>
      <EdsLead>
        Beyond one team, designers and engineers across the org are co-designing in Builder.io and shipping from
        the system.
      </EdsLead>
      <ImageFull
        src={imgProof}
        alt="Innovative builders using AI tools collaboratively to create prototypes, with quotes from an engineering manager and senior designers across customer, B2B, and internal product teams"
        caption="Innovative builders, using AI collaboratively. Engineering and design across customer, B2B, and internal products, all prototyping faster on the same foundation."
      />
    </EdsSection>
  );
}

// ── 10 · The change ────────────────────────────────────────────────

export function FigmaToCodeChangeSection() {
  return (
    <EdsSection id="change" variant="mid">
      <EdsEyebrow>The change</EdsEyebrow>
      <EdsSectionTitle>What lands in the engineer&rsquo;s hands.</EdsSectionTitle>
      <EdsLead>One thing changed. A Figma file to reinterpret becomes a pull request to review.</EdsLead>
      <BeforeAfter
        before={[
          { who: "Handoff", title: "Full spec, annotated", description: "Designer annotates the full spec for an engineer to read." },
          { who: "Rebuild", title: "Every value, by hand", description: "Engineer rebuilds every value by hand. The spec now lives in two places." },
          { who: "Review", title: "Several cycles", description: "First pass rarely matches. Several review cycles follow." },
          { who: "A11y", title: "Bolted on late", description: "Accessibility and analytics get bolted on late, or missed." },
        ]}
        after={[
          { who: "Handoff", title: "Auto Layout is the spec", description: "Designer builds with Auto Layout and real tokens. The structure is the spec." },
          { who: "Rebuild", title: "~70% ready on generation", description: "Builder.io opens a pull request at roughly 70% production-ready." },
          { who: "Review", title: "One cycle, not three", description: "Engineer reviews and extends, one cycle instead of three." },
          { who: "A11y", title: "Ships with the component", description: "Accessibility, analytics, and localization ship with the component." },
        ]}
      />
    </EdsSection>
  );
}

// ── 11 · Reflection ────────────────────────────────────────────────

const GEN_AI_STEPS: { number: string; title: string; description: string; status: "done" | "current" | "upcoming" }[] = [
  { number: "1", title: "Business opportunity", description: "Explore and analyze the business problem to derive solutions.", status: "done" },
  { number: "2", title: "Insights generation", description: "Develop the insights through POVs and MVPs.", status: "done" },
  { number: "3", title: "Scale & automation", description: "Deploy scalable models across categories, departments, and segments.", status: "done" },
  { number: "4", title: "Channel-agnostic deployments", description: "Automate solutions to scale across channels via system architecture.", status: "current" },
  { number: "5", title: "Data products", description: "Tools and applications that use data to improve decisions and processes.", status: "upcoming" },
];

export function FigmaToCodeReflectionSection() {
  return (
    <EdsSection id="reflection" variant="dark">
      <FigmaEyebrowOnDark>Why this work</FigmaEyebrowOnDark>
      <EdsSectionTitle onDark>Design systems do their best work invisibly.</EdsSectionTitle>
      <EdsLead onDark>
        When the pipeline is right, components just work and specs just ship. This is the foundation for that,
        proven on real work, pulled forward by real demand.
      </EdsLead>
      <Body
        as="p"
        size="small"
        weight="alt"
        UNSAFE_className="uppercase tracking-[0.12em] m-0"
        UNSAFE_style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}
      >
        Gen AI product journey
      </Body>
      <FigmaGenAiJourney steps={GEN_AI_STEPS} />
      <Body as="p" size="small" UNSAFE_className="max-w-[720px] leading-[1.7] m-0" UNSAFE_style={{ color: "rgba(255,255,255,0.5)" }}>
        <Body as="span" size="small" weight="alt" color="inverse">
          Where this sits in the bigger picture.{" "}
        </Body>
        One stretch of the broader design-to-code journey, now scaling channel-agnostic deployments, with data
        products next.
      </Body>
      <FigmaPullQuote onDark>
        The bridge between design and code isn&rsquo;t a process to manage. It&rsquo;s infrastructure to build,
        and build once.
      </FigmaPullQuote>
    </EdsSection>
  );
}
