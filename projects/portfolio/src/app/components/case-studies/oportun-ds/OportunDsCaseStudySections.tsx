import {
  EdsEyebrow,
  EdsImageFull,
  EdsImageGrid2,
  EdsLead,
  EdsSection,
  EdsSectionTitle,
  EdsStatsRow,
} from "../everyday-sans/EdsCaseStudyPrimitives";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
} from "@/app/components/Carousel/Carousel";
import { Body, Heading } from "@/app/components/Text/Text";
import imgApproachFlowchart from "@/app/assets/pages/case-study/oportun-ds/approach-flowchart.png";
import imgMappingPlanning from "@/app/assets/pages/case-study/oportun-ds/mapping-planning.png";
import imgRoadmapping from "@/app/assets/pages/case-study/oportun-ds/roadmapping.png";
import imgType from "@/app/assets/pages/case-study/oportun-ds/type.png";
import imgSpacing from "@/app/assets/pages/case-study/oportun-ds/spacing.png";
import imgIconsControls from "@/app/assets/pages/case-study/oportun-ds/icons-controls.png";
import imgStorybook from "@/app/assets/pages/case-study/oportun-ds/storybook.png";
import imgPrototypingComponents from "@/app/assets/pages/case-study/oportun-ds/prototyping-components.png";
import imgRebrandExploration from "@/app/assets/pages/case-study/oportun-ds/rebrand-exploration.png";
import imgLoanCalculatorFlow from "@/app/assets/pages/case-study/oportun-ds/loan-calculator-flow.png";
import imgUserflowsOptionsAb from "@/app/assets/pages/case-study/oportun-ds/userflows-options-ab.png";

const LAVENDER = "var(--ld-semantic-color-text-accent-yellow-bold, #5b3fae)";

const FOUNDATION_SLIDES = [
  { src: imgType, alt: "Oportun design system typography foundations and typescale", label: "Typography" },
  { src: imgSpacing, alt: "Oportun design system spacing grid units and layout specs", label: "Spacing" },
  {
    src: imgIconsControls,
    alt: "Oportun design system icons, glyphs, and controls documentation",
    label: "Icons & controls",
  },
] as const;

const STRATEGY_STEPS = [
  {
    num: "1",
    title: "Audit existing libraries",
    body: "Determine the effort required to rebrand and build new assets across Digit and Oportun product surfaces.",
  },
  {
    num: "2",
    title: "Roadmap & sprint plan",
    body: "Define success metrics and phase work across crawl, walk, and run milestones with engineering partners.",
  },
  {
    num: "3",
    title: "Build foundational libraries",
    body: "Establish color, typography, spacing, and icon foundations as the shared language for all teams.",
  },
  {
    num: "4",
    title: "Leverage new brand for product",
    body: "Identify high-impact product areas where the rebrand could accelerate trust and consistency.",
  },
  {
    num: "5",
    title: "Build components",
    body: "Ship atomic and molecular components in Figma and Storybook with documentation for every state.",
  },
  {
    num: "6",
    title: "UI designs & prototyping",
    body: "Validate patterns through loan calculator flows, mobile dashboards, and desktop parity explorations.",
  },
  {
    num: "7",
    title: "Testing & developer handoff",
    body: "Build screens to test quality and scalability, then hand off specs engineers can implement without guesswork.",
  },
] as const;

function OportunStrategyGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {STRATEGY_STEPS.map((step) => (
        <div
          key={step.num}
          className="rounded-[10px] px-6 py-5 h-full flex flex-col gap-2"
          style={{
            background: "var(--ld-semantic-color-fill, #ffffff)",
            border: "1px solid var(--ld-semantic-color-border-brand, #6cdb8c)",
          }}
        >
          <Heading as="span" size="small" color="brand" UNSAFE_className="m-0">
            {step.num}
          </Heading>
          <Body
            as="p"
            size="medium"
            weight="alt"
            UNSAFE_className="m-0"
            UNSAFE_style={{ color: "var(--ld-semantic-color-text-brand-bold, #1d6b3b)" }}
          >
            {step.title}
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.65]">
            {step.body}
          </Body>
        </div>
      ))}
    </div>
  );
}

function OportunMissionQuote() {
  return (
    <blockquote className="m-0 mt-8 max-w-3xl">
      <Body
        as="p"
        size="large"
        UNSAFE_className="leading-snug m-0"
        UNSAFE_style={{
          fontSize: "clamp(1.25rem, 3vw, 2rem)",
          color: "var(--ld-semantic-color-text, #2e2f32)",
        }}
      >
        To give you <strong style={{ color: LAVENDER }}>confidence</strong>, to{" "}
        <strong style={{ color: LAVENDER }}>seize</strong> every{" "}
        <strong style={{ color: LAVENDER }}>opportunity</strong>. We are your savvy money friend.
      </Body>
    </blockquote>
  );
}

export function OportunDsChallengeSection() {
  return (
    <EdsSection id="challenge">
      <EdsEyebrow>The challenge</EdsEyebrow>
      <EdsSectionTitle>Unifying two brands under one design language</EdsSectionTitle>
      <EdsLead>
        Oportun&apos;s acquisition of Digit created an urgent need to rebrand and unify two distinct product
        experiences. Teams were maintaining parallel libraries, inconsistent patterns, and fragmented
        documentation — slowing delivery and eroding trust in the system as a shared platform.
      </EdsLead>
      <OportunMissionQuote />
    </EdsSection>
  );
}

export function OportunDsApproachSection() {
  return (
    <EdsSection
      id="approach"
      variant="dark"
      className="[&_h2]:!text-white [&_.ld-text-body-body]:!text-white/75"
    >
      <EdsEyebrow onDark>The approach</EdsEyebrow>
      <EdsSectionTitle onDark>A phased process from audit to handoff</EdsSectionTitle>
      <EdsLead onDark>
        Documentation ran through every stage — from auditing existing libraries to shipping components and
        validating them in product prototypes before developer handoff.
      </EdsLead>
      <EdsImageFull
        src={imgApproachFlowchart}
        alt="Design system process flowchart from audit to developer handoff"
        surface="white"
      />
    </EdsSection>
  );
}

export function OportunDsStrategySection() {
  return (
    <EdsSection id="strategy" variant="mid">
      <EdsEyebrow>Defining the strategy</EdsEyebrow>
      <EdsSectionTitle>Seven interconnected steps toward a north-star system</EdsSectionTitle>
      <EdsLead>
        A crawl-walk-run roadmap aligned product, brand, and engineering around shared foundations, components,
        and adoption.
      </EdsLead>
      <OportunStrategyGrid />
      <div className="mt-10">
        <EdsImageFull
          src={imgMappingPlanning}
          alt="Design system planning board with phased crawl walk run strategy"
          label="Planning & phased rollout"
        />
      </div>
    </EdsSection>
  );
}

export function OportunDsRoadmapSection() {
  return (
    <EdsSection id="roadmap">
      <EdsEyebrow>Roadmapping</EdsEyebrow>
      <EdsSectionTitle>Problems, opportunities, and team alignment</EdsSectionTitle>
      <EdsLead>
        Cross-functional workshops surfaced team expectations, technical debt, documentation gaps, and process
        improvements — shaping the DS 4.0 roadmap.
      </EdsLead>
      <EdsImageFull
        src={imgRoadmapping}
        alt="FigJam roadmapping workshop with sticky notes across seven themes"
      />
    </EdsSection>
  );
}

export function OportunDsFoundationsSection() {
  return (
    <EdsSection id="foundations" variant="mid">
      <EdsEyebrow>Foundations</EdsEyebrow>
      <EdsSectionTitle>Typography, spacing, and iconography</EdsSectionTitle>
      <EdsLead>
        Documented for designers and engineers with do/don&apos;t guidance, token specs, and handoff examples
        across mobile and web.
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
    </EdsSection>
  );
}

export function OportunDsComponentsSection() {
  return (
    <EdsSection id="components">
      <EdsEyebrow>Components & Storybook</EdsEyebrow>
      <EdsSectionTitle>Building the component library architecture</EdsSectionTitle>
      <EdsLead>
        A living library in Storybook bridged design and code — with props, states, and accessibility controls
        for every pattern.
      </EdsLead>
      <EdsImageGrid2
        items={[
          { src: imgStorybook, alt: "Digit Storybook component documentation with Large Card preview" },
          {
            src: imgPrototypingComponents,
            alt: "Oportun prototype components including loan offer cards and form patterns",
          },
        ]}
      />
    </EdsSection>
  );
}

export function OportunDsProductSection() {
  return (
    <EdsSection id="product" variant="mid">
      <EdsEyebrow>Product work</EdsEyebrow>
      <EdsSectionTitle>Validating the system in high-stakes flows</EdsSectionTitle>
      <EdsLead>
        Rebrand explorations and loan calculator flows tested the system in real product contexts before wide
        adoption.
      </EdsLead>
      <EdsImageGrid2
        stacked
        items={[
          { src: imgRebrandExploration, alt: "Oportun mobile rebrand exploration screens" },
          { src: imgLoanCalculatorFlow, alt: "Loan calculator happy path user flow diagram" },
          { src: imgUserflowsOptionsAb, alt: "Loan calculator options A and B visual user flows" },
        ]}
      />
    </EdsSection>
  );
}

export function OportunDsResultsSection() {
  return (
    <EdsSection id="results">
      <EdsEyebrow>Results</EdsEyebrow>
      <EdsSectionTitle>From project assets to shared platform infrastructure</EdsSectionTitle>
      <EdsLead>
        The system gave teams a single source of truth for patterns, documentation, and implementation —
        accelerating delivery across web and mobile.
      </EdsLead>
      <EdsStatsRow
        variant="light"
        stats={[
          { value: "3", label: "Foundation pillars" },
          { value: "100+", label: "Components documented" },
          { value: "2", label: "Brands unified" },
          { value: "6 mo", label: "Delivery timeline" },
        ]}
      />
      <div
        className="rounded-xl p-8 mt-6 flex flex-col gap-4"
        style={{
          background: "var(--ld-semantic-color-fill-brand, #6cdb8c)",
          border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
        }}
      >
        <Heading
          as="h3"
          size="small"
          weight="alt"
          color="inverse"
          UNSAFE_className="m-0"
          UNSAFE_style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
        >
          Success &amp; impact
        </Heading>
        <ul className="m-0 p-0 list-none flex flex-col gap-3">
          {[
            "Led design systems work supporting consumer-facing products within a complex marketplace ecosystem.",
            "Defined system-level UX patterns and information architecture across web and mobile platforms.",
            "Partnered with engineering to transition design systems from project-based assets to shared platform infrastructure.",
            "Established documentation, adoption tracking, and accessibility standards across teams.",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span
                className="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                style={{ background: "var(--ld-primitive-color-white, #ffffff)" }}
              />
              <Body as="span" size="medium" UNSAFE_className="leading-relaxed m-0" color="inverse">
                {item}
              </Body>
            </li>
          ))}
        </ul>
      </div>
    </EdsSection>
  );
}
