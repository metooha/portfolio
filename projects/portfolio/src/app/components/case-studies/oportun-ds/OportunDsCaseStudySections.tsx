import {
  EdsEyebrow,
  EdsImageFull,
  EdsJourneyTimeline,
  EdsLead,
  EdsSection,
  EdsSectionTitle,
  EdsStatsRow,
  type EdsJourneyItem,
} from "../everyday-sans/EdsCaseStudyPrimitives";
import {
  OportunDsChallengeCards,
  OportunDsChallengeVisual,
  OportunDsComponentLifeCycleVisual,
  OportunDsLoanCalculatorPrototype,
  OportunDsTransferMoneyPrototype,
  OportunIllustrationColorUsageFigure,
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
import imgMappingPlanning from "@/app/assets/pages/case-study/oportun-ds/mapping-planning.png";
import imgRoadmapping from "@/app/assets/pages/case-study/oportun-ds/roadmapping.png";
import {
  imgFoundationColor,
  imgFoundationIconsControls,
  imgFoundationSpacing,
  imgFoundationType,
  imgDesignSystemAssetLibraries,
  imgDesignSystemBanner,
  imgDesignSystemComponentFiles,
  imgDesignSystemContributing,
  imgDesignSystemFilesTheming,
  imgDesignSystemLearningTraining,
  imgDesignSystemLibraries,
  imgDesignSystemSyllabus,
} from "@/app/assets/pages/case-study/oportun-ds/assets";
import imgLoanCalculatorFlow from "@/app/assets/pages/case-study/oportun-ds/loan-calculator-flow.png";

const FOUNDATION_SLIDES = [
  {
    src: imgFoundationColor,
    alt: "Oportun design system color foundations, palettes, brand swatches, and use cases",
    label: "Color",
  },
  {
    src: imgFoundationType,
    alt: "Oportun design system typography foundations, typescale, and tokens",
    label: "Typography",
  },
  {
    src: imgFoundationSpacing,
    alt: "Oportun design system spacing grid units, characteristics, and usage guidance",
    label: "Spacing",
  },
  {
    src: imgFoundationIconsControls,
    alt: "Oportun design system icons, glyphs, controls, and handoff specs",
    label: "Icons & controls",
  },
] as const;

const ROADMAP_SLIDES = [
  {
    src: imgMappingPlanning,
    alt: "Design system planning board with phased crawl walk run strategy",
    label: "Planning & phased rollout",
  },
  {
    src: imgRoadmapping,
    alt: "FigJam roadmapping workshop with sticky notes across seven themes",
    label: "Roadmapping workshop",
  },
] as const;

const DESIGN_SYSTEM_SLIDES = [
  {
    src: imgDesignSystemBanner,
    alt: "Design Systems documentation banner with apple, books, gears, and peace sign illustrations",
    label: "Overview",
  },
  {
    src: imgDesignSystemAssetLibraries,
    alt: "Design system asset libraries page covering emojis, icons, graphics, and illustrations in Figma",
    label: "Asset libraries",
  },
  {
    src: imgDesignSystemLibraries,
    alt: "Design system libraries panel in Figma showing foundational, component, asset, and local libraries",
    label: "Libraries",
  },
  {
    src: imgDesignSystemFilesTheming,
    alt: "Headless design system files and theming documentation with light and dark mode component previews",
    label: "Files & theming",
  },
  {
    src: imgDesignSystemComponentFiles,
    alt: "Component files documentation for handoff, usage, variants, and engineering specs in Figma",
    label: "Component files",
  },
  {
    src: imgDesignSystemContributing,
    alt: "Contribution guides in Coda covering icons, emojis, documentation, patterns, and engineering",
    label: "Contributing",
  },
  {
    src: imgDesignSystemLearningTraining,
    alt: "Learning and training syllabus organizing onboarding materials for design system enthusiasts",
    label: "Learning & training",
  },
  {
    src: imgDesignSystemSyllabus,
    alt: "Design system syllabus table with categorized pages, tags, and assignment status",
    label: "Syllabus",
  },
] as const;

const SECTION_OUTER = "w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px]";
const SECTION_INNER = "w-full max-w-4xl lg:max-w-[1046px] flex flex-col gap-6";

const APPROACH_ITEMS: EdsJourneyItem[] = [
  {
    date: "",
    phase: "Audit",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
    ],
    mood: "progress",
    story: "Determined the level of effort for rebranding and building new assets.",
  },
  {
    date: "",
    phase: "Roadmap",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
    ],
    mood: "progress",
    story: "Created tasks for the upcoming quarter after assessing the workload.",
  },
  {
    date: "",
    phase: "Success metrics",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
    ],
    mood: "progress",
    story: "Outlined the OKRs.",
  },
  {
    date: "",
    phase: "New brand",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
    ],
    mood: "progress",
    story: "Identified areas where the brand impacted product the most.",
  },
  {
    date: "",
    phase: "Foundations",
    who: [{ label: "Design", variant: "brand" }],
    mood: "progress",
    story: "Utilized a headless design system, tokens, and implemented a formula for scalability.",
  },
  {
    date: "",
    phase: "UI designs",
    who: [{ label: "Design", variant: "brand" }],
    mood: "progress",
    story: "Built component prototypes with the new themes, styles, and interactions.",
  },
  {
    date: "",
    phase: "Testing",
    who: [{ label: "Design", variant: "brand" }],
    mood: "progress",
    story: "Product designers used the design system and provided critiques.",
  },
  {
    date: "",
    phase: "Dev handoff",
    who: [{ label: "Design", variant: "brand" }],
    mood: "progress",
    story:
      "Documentation for use cases, developer guidelines, and component specs were added to the backlog.",
  },
];

export function OportunDsChallengeSection() {
  return (
    <section
      id="challenge"
      className="w-full shrink-0 border-b"
      style={{
        background: "var(--ld-semantic-color-fill, #ffffff)",
        borderColor: "var(--ld-semantic-color-separator, #e3e4e5)",
        paddingTop: "var(--ld-semantic-spacing-1000, 5rem)",
        paddingBottom: "var(--ld-semantic-spacing-1000, 5rem)",
      }}
    >
      <div className={`${SECTION_OUTER} flex flex-col gap-10`}>
        <div className={SECTION_INNER}>
          <EdsEyebrow>The challenge</EdsEyebrow>
          <EdsSectionTitle>Unifying two brands under one design language</EdsSectionTitle>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8 lg:gap-12 items-center">
          <OportunDsChallengeCards />
          <OportunDsChallengeVisual />
        </div>
      </div>
    </section>
  );
}

export function OportunDsApproachSection() {
  return (
    <EdsSection id="approach">
      <EdsEyebrow>The approach</EdsEyebrow>
      <EdsSectionTitle>Defining the strategy</EdsSectionTitle>
      <EdsLead>
        As a team we worked on figuring out what our game plan was, and how to create our roadmap and define our
        deliverables.
      </EdsLead>
      <EdsJourneyTimeline items={APPROACH_ITEMS} />
    </EdsSection>
  );
}

export function OportunDsAssetLibrariesSection() {
  return (
    <section
      id="asset-libraries"
      className="w-full shrink-0 border-b"
      style={{
        background: "var(--ld-semantic-color-fill, #ffffff)",
        borderColor: "var(--ld-semantic-color-separator, #e3e4e5)",
        paddingTop: "var(--ld-semantic-spacing-1000, 5rem)",
        paddingBottom: "var(--ld-semantic-spacing-1000, 5rem)",
      }}
    >
      <div className={SECTION_OUTER}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] gap-8 lg:gap-12 items-start">
          <div className="flex flex-col gap-6">
            <EdsEyebrow>Asset libraries</EdsEyebrow>
            <EdsSectionTitle>Illustration / Color Usage</EdsSectionTitle>
            <EdsLead>
              Illustrations help to communicate the design intent and aesthetic of a product, as well as its key
              features and functions. Illustrations can also be used to create technical drawings that can be used to
              guide the users to make informed decisions. Additionally, illustrations can be used to create
              marketing materials, such as product catalogs and advertisements, that can help to promote a product
              and increase sales.
            </EdsLead>
          </div>
          <OportunIllustrationColorUsageFigure />
        </div>
      </div>
    </section>
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
      <Carousel aria-label="Design system planning and roadmapping">
        <CarouselContent>
          {ROADMAP_SLIDES.map((slide) => (
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

export function OportunDsComponentLifeCycleSection() {
  return (
    <section
      id="component-life-cycle"
      className="w-full shrink-0 border-b"
      style={{
        background: "var(--ld-semantic-color-fill, #ffffff)",
        borderColor: "var(--ld-semantic-color-separator, #e3e4e5)",
        paddingTop: "var(--ld-semantic-spacing-1000, 5rem)",
        paddingBottom: "var(--ld-semantic-spacing-1000, 5rem)",
      }}
    >
      <div className={`${SECTION_OUTER} flex flex-col gap-10`}>
        <div className={SECTION_INNER}>
          <EdsEyebrow>Component life cycle</EdsEyebrow>
          <EdsSectionTitle>A component in action</EdsSectionTitle>
          <EdsLead>
            Here&apos;s an example of the Snack bar component, and everything that is involved in creating it.
          </EdsLead>
        </div>
        <OportunDsComponentLifeCycleVisual />
      </div>
    </section>
  );
}

export function OportunDsUsageExamplesSection() {
  return (
    <section
      id="usage-examples"
      className="w-full shrink-0 border-b"
      style={{
        background: "var(--ld-semantic-color-fill, #ffffff)",
        borderColor: "var(--ld-semantic-color-separator, #e3e4e5)",
        paddingTop: "var(--ld-semantic-spacing-1000, 5rem)",
        paddingBottom: "var(--ld-semantic-spacing-1000, 5rem)",
      }}
    >
      <div className={`${SECTION_OUTER} flex flex-col gap-10`}>
        <div className={SECTION_INNER}>
          <EdsEyebrow>Usage examples</EdsEyebrow>
          <EdsSectionTitle>Prototype Mobile App: Transfer Money</EdsSectionTitle>
          <EdsLead>
            Here&apos;s an example of the Snack bar component, and everything that is involved in creating it.
          </EdsLead>
        </div>
        <OportunDsTransferMoneyPrototype />
      </div>
    </section>
  );
}

export function OportunDsDesignSystemSection() {
  return (
    <section
      id="design-system"
      className="w-full shrink-0 border-b"
      style={{
        background: "var(--ld-semantic-color-fill, #ffffff)",
        borderColor: "var(--ld-semantic-color-separator, #e3e4e5)",
        paddingTop: "var(--ld-semantic-spacing-1000, 5rem)",
        paddingBottom: "var(--ld-semantic-spacing-1000, 5rem)",
      }}
    >
      <div className={`${SECTION_OUTER} flex flex-col gap-6`}>
        <div className={SECTION_INNER}>
          <Heading
            as="h2"
            size="medium"
            weight="default"
            UNSAFE_className="leading-[1.15]"
            UNSAFE_style={{
              color: "var(--ld-semantic-color-text-accent-yellow-bold, #5b3fae)",
              fontSize: "clamp(24px, 3vw, 38px)",
            }}
          >
            Design System
          </Heading>
          <EdsLead>
            A design system is not a system without users. I created documents for designers, engineers, and
            cross-functional teams to learn about design systems. These pages include but are not limited to using a
            design system, onboarding, using Figma, accessibility, contributions, component documentation, release
            notes, and more.
          </EdsLead>
        </div>
        <Carousel aria-label="Design system documentation">
          <CarouselContent>
            {DESIGN_SYSTEM_SLIDES.map((slide) => (
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
    </section>
  );
}

export function OportunDsFoundationsSection() {
  return (
    <section
      id="foundations"
      className="w-full shrink-0 border-b"
      style={{
        background: "var(--ld-semantic-color-fill-subtle, #f0f1f2)",
        borderColor: "var(--ld-semantic-color-separator, #e3e4e5)",
        paddingTop: "var(--ld-semantic-spacing-1000, 5rem)",
        paddingBottom: "var(--ld-semantic-spacing-1000, 5rem)",
      }}
    >
      <div className={`${SECTION_OUTER} flex flex-col gap-6`}>
        <div className={SECTION_INNER}>
          <EdsEyebrow>Process</EdsEyebrow>
          <EdsSectionTitle>Building the design system</EdsSectionTitle>
          <EdsLead>
            The design system&apos;s language encompasses essential elements such as color palettes, typography
            styles, spacing guidelines, padding, corner radii, and the use of icons, controls, and logos. It
            also includes comprehensive usage and token guidelines, along with brand exploration exercises to
            ensure consistency and clarity in design.
          </EdsLead>
        </div>
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
    </section>
  );
}

export function OportunDsProductSection() {
  return (
    <section
      id="product"
      className="w-full shrink-0 border-b"
      style={{
        background: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)",
        borderColor: "var(--ld-semantic-color-separator, #e3e4e5)",
        paddingTop: "var(--ld-semantic-spacing-1000, 5rem)",
        paddingBottom: "var(--ld-semantic-spacing-1000, 5rem)",
      }}
    >
      <div className={SECTION_OUTER}>
        <div className={`${SECTION_INNER} !gap-10`}>
          <div className="flex w-full flex-col gap-6">
            <EdsEyebrow>Product work</EdsEyebrow>
            <EdsSectionTitle>Validating the system in high-stakes flows</EdsSectionTitle>
            <EdsLead>
              Loan calculator flows tested the system in a high-stakes product context before wide adoption.
            </EdsLead>
            <EdsImageFull
              src={imgLoanCalculatorFlow}
              alt="Loan calculator happy path user flow diagram"
            />
          </div>
          <div className="flex w-full flex-col gap-6">
            <EdsSectionTitle>Homepage / Loan calculator</EdsSectionTitle>
            <EdsLead>Interactive prototype for the loan calculator happy path.</EdsLead>
            <OportunDsLoanCalculatorPrototype />
          </div>
        </div>
      </div>
    </section>
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
        variant="brand"
        stats={[
          { value: "4", label: "Foundation pillars" },
          { value: "100+", label: "Components documented" },
          { value: "2", label: "Brands unified" },
          { value: "6 mo", label: "Delivery timeline" },
        ]}
      />
      <div
        className="rounded-xl p-8 mt-6 flex flex-col gap-4"
        style={{
          background: "var(--ld-semantic-color-fill-brand, #00c859)",
          border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
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
          {[
            "Led design systems work supporting consumer-facing products within a complex marketplace ecosystem.",
            "Defined system-level UX patterns and information architecture across web and mobile platforms.",
            "Partnered with engineering to transition design systems from project-based assets to shared platform infrastructure.",
            "Established documentation, adoption tracking, and accessibility standards across teams.",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span
                className="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                style={{ background: "#000000" }}
              />
              <Body as="span" size="medium" UNSAFE_className="leading-relaxed m-0" UNSAFE_style={{ color: "#000000" }}>
                {item}
              </Body>
            </li>
          ))}
        </ul>
      </div>
    </EdsSection>
  );
}
