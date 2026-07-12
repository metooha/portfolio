import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Body } from "@/app/components/Text/Text";
import {
  BeforeAfter,
  EmbedFull,
  Eyebrow as EdsEyebrow,
  ImageFrame,
  ImageFull,
  Lead as EdsLead,
  Section as EdsSection,
  SectionTitle as EdsSectionTitle,
  TestimonialShowcase,
  VideoFull,
} from "@/app/components/CaseStudyPrimitives";
import { EdsJourneyTimeline, type EdsJourneyItem } from "../everyday-sans/EdsCaseStudyPrimitives";
import {
  FigmaDayCard,
  FigmaDesignEngineeringPanel,
  FigmaEyebrowOnDark,
  FigmaGenAiJourney,
  FigmaIconBadge,
  FigmaSignalGrid,
  FigmaStatCards,
  FigmaTierChain,
  FigmaUnlockGrid,
} from "./FigmaToCodeBlocks";
import imgCasestudyBrief from "@/app/assets/pages/case-study/figma-to-code/jpegs/casestudy-brief.jpg";
import imgCliChecklist from "@/app/assets/pages/case-study/figma-to-code/jpegs/cli-checklist.jpg";
import imgPipeline from "@/app/assets/pages/case-study/figma-to-code/optimized/discovery-flow-diagram.jpg";
import imgInheritance from "@/app/assets/pages/case-study/figma-to-code/optimized/Simple-inheritance-Model.jpg";
import videoB2bKit from "@/app/assets/pages/case-study/figma-to-code/optimized/kit-demo.mp4";
import imgAirtableDatabase from "@/app/assets/pages/case-study/figma-to-code/optimized/airtable-database.jpg";
import imgTempoEngSpecs from "@/app/assets/pages/case-study/figma-to-code/optimized/tempo-eng-specs.jpg";
import imgDayZero from "@/app/assets/pages/case-study/figma-to-code/optimized/day-zero.jpg";
import imgDayOne from "@/app/assets/pages/case-study/figma-to-code/optimized/day-one.jpg";
import imgMultiplayer from "@/app/assets/pages/case-study/figma-to-code/optimized/builder.io-multi-player.jpg";
import imgYbmPhotos from "@/app/assets/pages/case-study/figma-to-code/optimized/ybm-photos.jpg";
import avatarEngManager from "@/app/assets/pages/case-study/figma-to-code/jpegs/builder-4.png";
import avatarDesignerCustomer from "@/app/assets/pages/case-study/figma-to-code/jpegs/builder-3.png";
import avatarDesignerB2b1 from "@/app/assets/pages/case-study/figma-to-code/jpegs/builder-2.png";
import avatarDesignerB2b2 from "@/app/assets/pages/case-study/figma-to-code/jpegs/builder-1.png";

const BRAND = "var(--ld-semantic-color-text-brand, #0053e2)";

// ── 1 · The problem ────────────────────────────────────────────────

export function FigmaToCodeProblemSection() {
  return (
    <EdsSection id="problem">
      <EdsEyebrow>The problem</EdsEyebrow>
      <EdsSectionTitle>The handoff problem was really an infrastructure problem.</EdsSectionTitle>
      <EdsLead>
        The spec already existed in Figma, but the files weren&rsquo;t built to convert to code: inconsistent
        auto-layout, unclear layer names, no direct tie to the design system. Engineering re-implemented every
        value by hand in code, and the spec drifted further with each update. The organization was paying to
        build the same system twice.
      </EdsLead>
      <FigmaDesignEngineeringPanel />
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
    story: "Framed manual handoff as duplicated infrastructure, not design polish, and secured approval for a hands-on discovery workshop with engineering and Builder.io.",
    mood: "progress",
  },
  {
    date: "Analysis",
    phase: "Component & complexity",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
    ],
    story: "Real components were broken into atomic pieces and scored across breakpoints, states, layout, custom styling, and accessibility. That became the evaluation model for automation.",
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
    story: "Components were walked end to end, Figma to generated code, and I defined the tooling split: designers stay in the visual GUI, engineers own CLI review and delta updates.",
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
    story: "The bar any automation had to clear became explicit: existing-tool compatibility, design fidelity, code integration, iteration speed, accessibility, and team standards.",
    win: "a shared component lifecycle that could scale beyond the workshop.",
    mood: "win",
  },
];

export function FigmaToCodeDiscoverySection() {
  return (
    <EdsSection id="discovery" variant="mid">
      <div className="flex items-center gap-2">
        <FigmaIconBadge icon="Search" />
        <EdsEyebrow>How it started</EdsEyebrow>
      </div>
      <EdsSectionTitle>First, the evaluation model had to be defined.</EdsSectionTitle>
      <EdsLead>
        Before scaling anything, I structured a six-week discovery with engineering and Builder.io to pressure-test
        feasibility, score component complexity, and define the bar for trustworthy design-to-code.
      </EdsLead>
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
        <EdsJourneyTimeline items={DISCOVERY_ITEMS} lineColor="var(--ld-semantic-color-text-subtlest, #74767c)" />
        <ImageFull
          src={imgCasestudyBrief}
          alt="Project brief scoping the six-week discovery: goals, success metrics, and plan"
          surface="subtle"
        />
      </div>
    </EdsSection>
  );
}

// ── 3 · Defining the work ───────────────────────────────────────────

export function FigmaToCodeFramingSection() {
  return (
    <EdsSection id="framing">
      <EdsEyebrow>Defining the work</EdsEyebrow>
      <EdsSectionTitle>The hard call was making automation reviewable, not magical.</EdsSectionTitle>
      <EdsLead>
        The opportunity wasn&rsquo;t a demo that produced code once. It was an operating model engineers could
        trust, designers could use, and product teams could adopt without changing how they worked. The defining
        decision wasn&rsquo;t whether AI could generate UI, it was how to make that output accountable to the
        organization&rsquo;s design and engineering standards.
      </EdsLead>
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
        <FigmaUnlockGrid
          columns={1}
          items={[
            {
              title: "Chose pull requests over handoff artifacts",
              description: "The output had to land where engineering already worked: GitHub. A reviewable diff mattered more than a perfect first pass.",
            },
            {
              title: "Kept designers in Figma",
              description: "The workflow could not depend on designers learning a developer tool. Auto Layout, tokens, and annotations became the source of intent.",
            },
            {
              title: "Made the seed file the contract",
              description: "The structured data model became the bridge between design intent and generated code. It made the pipeline auditable and repeatable beyond one component.",
            },
            {
              title: "Scaled through standards, not a vendor demo",
              description: "The pilot had to respect existing tokens, repositories, theming, accessibility, and analytics. Every blocker became a Phase 2 requirement.",
            },
          ]}
        />
        <ImageFull
          src={imgCliChecklist}
          alt="CLI checklist reviewing generated components against Storybook and Figma hygiene standards"
          caption="Design Handoff checklist to ensure CLI export runs smoothly."
          surface="subtle"
        />
      </div>
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
        This didn&rsquo;t begin as a platform vision. It began with component testing, from simple buttons to
        complex breakpoint specific marketing modules. They were built to the design system&rsquo;s full spec,
        with one measurable goal: cut design-to-code time.
      </EdsLead>
      <FigmaStatCards
        stats={[
          { value: "50–70%", label: "Target cut in design-to-code time" },
          { value: "70%", label: "Production-ready on generation" },
          { value: "3", label: "Platforms: web, mobile web, native apps" },
          { value: "3 mo", label: "Phase 1 timeline" },
        ]}
      />
      <div className="w-full border-t" style={{ borderColor: "var(--ld-semantic-color-separator, #e3e4e5)" }} aria-hidden="true" />
      <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em] m-0 mt-2" UNSAFE_style={{ fontSize: "11px", color: BRAND }}>
        Marketing module creation with a seed file, with Figma + automated seed configurations + CLI
      </Body>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7] -mt-3">
        This is what got tested first: engineering specs annotated directly on the component in Figma, then
        translated into a seed file so generation had structured data to build from, not just a static design.
      </Body>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageFrame
          src={imgTempoEngSpecs}
          alt="Figma engineering specs for the adjustable carousel card component: anatomy, breakpoint variants, and design tokens by platform"
          surface="subtle"
        />
        <ImageFrame
          src={imgAirtableDatabase}
          alt="Airtable base modeling module configs, option types, and required fields for each component"
          surface="subtle"
        />
      </div>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-snug">
        Engineering specs, anatomy, breakpoint variants, and tokens by platform, were annotated directly on the
        real component in Figma. Airtable then turned those specs into the seed file: module configs, option
        types, and required fields, paired with a visual system that pulled assets and content details straight
        from Figma.
      </Body>
    </EdsSection>
  );
}

// ── 4 · The kit ────────────────────────────────────────────────────

export function FigmaToCodeKitSection() {
  return (
    <EdsSection id="kit" variant="mid">
      <div className="flex items-center gap-2">
        <FigmaIconBadge icon="Box" />
        <EdsEyebrow>Design System Kit</EdsEyebrow>
      </div>
      <EdsSectionTitle>Making it repeatable for any designer.</EdsSectionTitle>
      <EdsLead>
        One component proved the path. The kit made the behavior repeatable: real components, ready to prototype
        in, with a clean path to code review. This kit was built from those earlier tests, and was now ready to
        put in front of real users to generate AI-assisted prototypes.
      </EdsLead>
      <FigmaUnlockGrid
        items={[
          { title: "Rapid prototyping", description: "Ideate and test complex interactions instantly through the Figma and Chrome plugins." },
          { title: "Dynamic context", description: "Design with real CMS assets, conditional logic, and localization, not static screens." },
          { title: "Core Design System integration", description: "AI and developers build against strict, on-brand component rules by default." },
          { title: "Frictionless handoff", description: "Turn visual designs into production-ready blueprints, not specs to reinterpret." },
        ]}
      />
      <VideoFull
        src={videoB2bKit}
        alt="Demo of the business platform kit inside Builder.io: the full component library and page templates for the kit"
        caption="The business platform kit inside Builder.io. The full component library and guidelines, themed with real tokens, every project starts from a shared foundation."
        surface="subtle"
        playback="controls"
      />
      <div className="w-full border-t" style={{ borderColor: "var(--ld-semantic-color-separator, #e3e4e5)" }} aria-hidden="true" />
      <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em] m-0 mt-2" UNSAFE_style={{ fontSize: "11px", color: BRAND }}>
        Onboarding designers
      </Body>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7] -mt-3">
        We onboarded designers with a few simple steps so they could start ideating, prototyping, and
        accelerating their work with cross-functional teams.
      </Body>
      <FigmaDayCard
        title="Onboarding & setup"
        items={[
          { lead: "Get connected.", description: "Desktop app, corporate VPN.", icon: "SignIn" },
          { lead: "Prep files.", description: "Figma assets exportable, Auto Layout on.", icon: "Folder" },
          { lead: "Capture intent.", description: "Annotations for complex interactions.", icon: "Note" },
          { lead: "Load the kit.", description: "Drop in the business platform kit, pre-approved components, instantly.", icon: "Box" },
        ]}
      />
      <ImageFull
        src={imgDayZero}
        alt="Export panel moving a Figma frame into a live project"
        caption="Builder.io connects to the Figma source, then a component exports straight into a live project."
      />
      <FigmaDayCard
        title="Rapid iteration"
        items={[
          { lead: "Complex flows.", description: "Build and test real interactions fast.", icon: "Loop" },
          { lead: "100% compliant.", description: "Approved tokens and typography, automatically.", icon: "CheckCircle" },
          { lead: "High-fidelity reviews.", description: "Interactive prototypes for PMs, no dev sprint needed.", icon: "Eye" },
        ]}
      />
      <ImageFull
        src={imgDayOne}
        alt="Retail media dashboard running as a live prototype in the browser"
        caption="An AI agent reads the Figma designs and builds a working, high-fidelity advertising dashboard from real components."
      />
      <Body as="p" size="small" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
        Ready-made template pages shipped alongside the kit too, so teams didn&rsquo;t have to start from a blank
        canvas, just drop into a template and start playing around.
      </Body>
      <EmbedFull
        src="https://metooha.github.io/px-sub-theme-editor/page-template"
        title="Business platform kit: live page template prototype"
        label="Try it live"
        aspectRatio="16 / 10"
        bordered
      />
    </EdsSection>
  );
}

// ── 5 · First pilot ─────────────────────────────────────────────────

export function FigmaToCodeConnectSection() {
  return (
    <EdsSection id="connect">
      <EdsEyebrow>First real test</EdsEyebrow>
      <EdsSectionTitle>Real applications, built live, with multiplayer capabilities.</EdsSectionTitle>
      <EdsLead>
        The kit&rsquo;s first real test: co-designing a working advertising prototype live with the retail media
        team, product, design, and engineering all in the same build at once, real components, live cursors,
        reviewed like a product instead of walked through as slides. One shared URL replaced the static deck:
        feedback happened on the actual build, and the AI agent resolved issues in real time, turning reviews
        into progress instead of a backlog.
      </EdsLead>
      <ImageFull
        src={imgMultiplayer}
        alt="AI prototyping editor with an agent chat fixing a runtime error and multiple named cursors editing the same file"
      />
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
        A booth at the internal design conference: live demos all day, real components generating real code in
        front of hundreds of designers, PMs, and engineers. Hands-on, all day, the booth drew a line and turned
        curiosity into a signup sheet.
      </EdsLead>
      <ImageFull
        src={imgYbmPhotos}
        alt="Photo collage of the team demoing the AI prototyping pipeline at a company event, including an attendee holding a handmade 'AI advice' sign"
      />
    </EdsSection>
  );
}

// ── 7 · The demand ─────────────────────────────────────────────────

export function FigmaToCodeDemandSection() {
  return (
    <EdsSection id="demand">
      <div className="flex items-center gap-2">
        <FigmaIconBadge icon="Chat" />
        <EdsEyebrow>The demand</EdsEyebrow>
      </div>
      <EdsSectionTitle>Teams weren&rsquo;t waiting to be sold.</EdsSectionTitle>
      <EdsLead>
        The pilot moved from technical proof to organizational demand. The strongest signal was who signed up:
        product leaders, senior ICs, and teams with real prototyping gaps.
      </EdsLead>
      <FigmaStatCards
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
            quote: "When will this support our internal code assistant?",
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

// ── 8 · Operating model ─────────────────────────────────────────────

export function FigmaToCodeOperatingModelSection() {
  return (
    <EdsSection id="operating-model">
      <EdsEyebrow>Operating model</EdsEyebrow>
      <EdsSectionTitle>Built to be owned by many, not managed by one.</EdsSectionTitle>
      <EdsLead>
        Demand made governance the product. I defined how design and platform systems, engineering, Builder.io,
        and pilot teams would share ownership as the workflow scaled. What this proves: the system was designed
        to create ownership, not dependency. My role was to set the model others could run, improve, and adopt.
      </EdsLead>
      <FigmaUnlockGrid
        items={[
          {
            title: "Design systems owned the source of truth",
            description: "Tokens, component rules, and Figma annotations stayed anchored in the system so generated work could inherit trusted standards.",
          },
          {
            title: "Engineering owned review quality",
            description: "Generated code landed as a pull request. Engineers reviewed, extended, and hardened it instead of rebuilding the design from scratch.",
          },
          {
            title: "Pilot teams supplied real constraints",
            description: "Each team brought production use cases, edge states, and adoption friction. Those findings shaped the next version of the pipeline.",
          },
          {
            title: "Leadership got a repeatable adoption path",
            description: "The conference booth, signup sheet, and enablement plan turned interest into a queue of teams ready to pilot the workflow.",
          },
        ]}
      />
      <FigmaStatCards
        stats={[
          { value: "1", label: "Lifecycle from Figma to pull request" },
          { value: "4", label: "Owner groups with clear decision rights" },
          { value: "75+", label: "Teams informing pilot demand" },
          { value: "70%", label: "Generated code ready for review" },
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
        Demand meant one prototype was not enough. The pipeline made the workflow repeatable: Figma to code, with
        a data backbone that keeps design, content, and tokens in sync.
      </EdsLead>

      <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em] m-0" UNSAFE_style={{ fontSize: "11px", color: BRAND }}>
        Library inheritance model
      </Body>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7] -mt-3">
        The Core Design System provides the core tokens and components most products and teams need.
        Subsystems can add tokens and components specific to their domain. Those libraries can use everything
        above them, with one caveat: their components carry content, details, and interactions specific to a
        team&rsquo;s features.
      </Body>
      <FigmaTierChain tiers={["Core library", "Business unit", "Tenant theme", "Product team"]} />
      <ImageFull
        src={imgInheritance}
        alt="Inheritance diagram: a core library of tokens and components branches into consumer, staff tools, and business platform libraries, then tenant brand themes, then product-team-specific components"
        surface="subtle"
      />
      <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-snug">
        The system it has to respect. The core library cascades tokens and components down through business
        pillars, tenants, and product teams, so generation can&rsquo;t be a one-off, it has to honor the whole
        inheritance model. This is the same token infrastructure documented in{" "}
        <RouterLink to="/case-study/3" style={{ color: BRAND, textDecoration: "underline" }}>
          A Quest for a Source of Truth
        </RouterLink>
        , and this pipeline is one of the things it made possible.
      </Body>

      <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em] m-0 mt-2" UNSAFE_style={{ fontSize: "11px", color: BRAND }}>
        How the pipeline works
      </Body>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7] -mt-3">
        Figma is the input. A processor trained on the design system maps it to code, a fine-tuned LLM refines
        the result, and it ships out to every surface: web, mobile web, native apps, and content seeds.
      </Body>
      <ImageFull
        src={imgPipeline}
        alt="Pipeline diagram: Figma input into a processor trained on the design system, generating code, refined by a fine-tuned LLM, output to GitHub and then web, mobile web, native apps, and content seed JSONs"
        caption="Figma in, production code out. The processor knows the design system; the LLM refines the generated code; GitHub carries it to web, mobile web, native apps, and content seed JSONs."
      />

      <Body as="p" size="small" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7] mt-2">
        Every component now follows one lifecycle:
      </Body>
      <FigmaTierChain
        tiers={["Build", "Token map", "Generate", "Storybook", "A11y + analytics", "Test", "Document"]}
        highlight={["Generate"]}
      />
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
      <TestimonialShowcase
        ariaLabel="Testimonials from teams using Builder.io"
        statement="Innovative builders using AI tools collaboratively to create prototypes."
        testimonials={[
          {
            role: "Engineering Manager",
            team: "Internal dev tools",
            avatarSrc: avatarEngManager,
            avatarAlt: "Portrait of an engineering manager",
            quote:
              "Builder.io has significantly enhanced our team’s productivity… convert Figma designs into code… enabling us to accelerate our workflows.",
          },
          {
            role: "Sr. Designer",
            team: "Customer Product",
            avatarSrc: avatarDesignerCustomer,
            avatarAlt: "Portrait of a senior designer on the customer product team",
            quote:
              "It enables us to quickly create high-quality, data-driven prototypes that effectively showcase our commitment to customers.",
          },
          {
            role: "Sr. Designer",
            team: "B2B Product",
            avatarSrc: avatarDesignerB2b1,
            avatarAlt: "Portrait of a senior designer on the B2B product team",
            quote:
              "Builder.io has been a game changer for our team… creates prototypes that closely mirror our Figma designs.",
          },
          {
            role: "Sr. Designer",
            team: "B2B Product",
            avatarSrc: avatarDesignerB2b2,
            avatarAlt: "Portrait of a senior designer on the B2B product team",
            quote: "Builder.io has sped up Connect’s prototyping process… without starting from scratch.",
          },
        ]}
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
      <Body as="p" size="small" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
        What lands with the engineer is a pull request, not a Figma file to reinterpret: roughly 70%
        production-ready, with accessibility and analytics scaffolded in, and a diff to review. It runs inside
        real infrastructure, version-locked repos, VPN, native theming, where each blocker hit in Phase 1 became
        a Phase 2 requirement instead of a dead end.
      </Body>
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
    </EdsSection>
  );
}
