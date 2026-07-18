import React from "react";
import imgDesign from "@/app/assets/pages/case-study/wm-rebrand/design.png";
import imgXense from "@/app/assets/pages/case-study/xense/xense.png";
import imgAcademy from "@/app/assets/pages/case-study/academy-sports/hero-cover.jpg";
import wmNewImage from "@/app/assets/pages/case-study/wm-rebrand/wm-new-image.png";
import XenseCaseStudy from "@/app/pages/case-studies/xense/XenseCaseStudy";
import WmDesignSystemCaseStudy from "@/app/pages/case-studies/wm-rebrand/WmDesignSystemCaseStudy";
import EverydaySansCaseStudy from "@/app/pages/case-studies/everyday-sans/EverydaySansCaseStudy";
import AirtableCaseStudy from "@/app/pages/case-studies/airtable-sot/AirtableCaseStudy";
import OportunDsCaseStudy from "@/app/pages/case-studies/oportun-ds/OportunDsCaseStudy";
import CarbonAutoOrientationCaseStudy from "@/app/pages/case-studies/carbon-auto-orientation/CarbonAutoOrientationCaseStudy";
import FigmaToCodeCaseStudy from "@/app/pages/case-studies/figma-to-code/FigmaToCodeCaseStudy";
import WmEmailCaseStudy from "@/app/pages/case-studies/wm-email-rebrand/WmEmailCaseStudy";
import NiniJewelsCaseStudy from "@/app/pages/case-studies/nini-jewels/NiniJewelsCaseStudy";
import BreakoutNetworkCaseStudy from "@/app/pages/case-studies/breakout-network/BreakoutNetworkCaseStudy";
import UcUiKitCaseStudy, { UcUiKitHero } from "@/app/pages/case-studies/uc-uikit/UcUiKitCaseStudy";
import AcademyCaseStudy from "@/app/pages/case-studies/academy/AcademyCaseStudy";
import imgEverydaySansCover from "@/app/assets/pages/case-study/everyday-sans/cover.jpg";
import { imgAirtableCoverPreview, imgAirtableCoverSource } from "@/app/assets/pages/case-study/airtable-sot/assets";
import imgOportunDsCover from "@/app/assets/pages/case-study/oportun-ds/cover.jpg";
import imgOportunDsLogo from "@/app/assets/pages/case-study/oportun-ds/logo.png";
import imgCarbonCover from "@/app/assets/pages/case-study/carbon/design-engine.jpg";
import imgCarbonLogo from "@/app/assets/pages/case-study/carbon/carbon-logo.png";
import imgFigmaToCodeCover from "@/app/assets/pages/case-study/figma-to-code/optimized/cover.jpg";
import imgWmEmailCover from "@/app/assets/pages/case-study/wm-email-rebrand/coverpreview-card.jpg";
import imgNiniJewelsCover from "@/app/assets/pages/case-study/nini-jewels/nini-cover.jpg";
import imgNiniJewelsLogo from "@/app/assets/pages/case-study/nini-jewels/nini-logo.png";
import imgBreakoutCover from "@/app/assets/pages/case-study/breakout-network/cover.jpeg";
import imgBreakoutLogo from "@/app/assets/pages/case-study/breakout-network/BNW-logo-new.png";
import imgWalmartLogo from "@/app/assets/pages/case-study/everyday-sans/logo.png";
import imgUcUiKitCover from "@/app/assets/pages/case-study/uc-uikit/Coverpreview.png";
import imgUcUiKitCoverCard from "@/app/assets/pages/case-study/uc-uikit/coverpreview-card.png";
import type { ProjectLink } from "@/app/components/CaseStudyTemplate";
import type { ThemeName } from "@/app/components/utils/Theming";

export interface CaseStudyConfig {
  id: string;
  path: string;
  title: string;
  /** Theme applied when no page-level override is set. */
  defaultTheme?: ThemeName;
  /** Hide detail route while content is still in progress */
  isPublished?: boolean;
  /** Show on the home page featured work section (defaults to true) */
  featuredOnHome?: boolean;
  /** Default client-side access password (overridable via admin dashboard). */
  accessPassword?: string;
  /** For home card & prev/next */
  shortDescription: string;
  /** For overview section */
  fullDescription: string;
  /** Optional title for home card (defaults to title) */
  cardTitle?: string;
  /** Optional description for home card (defaults to shortDescription) */
  cardDescription?: string;
  metaItems: { label: string; value: string }[];
  navSections: { label: string; href: string }[];
  navAccentColor: string;
  tags: string[];
  heroType: "image" | "component";
  heroImage?: string;
  /** Optional gradient behind hero for generic template pages */
  heroGradientClass?: string;
  HeroComponent?: React.ComponentType;
  thumbnail: string;
  thumbnailFit?: "cover" | "contain";
  thumbnailBorder?: boolean;
  /** Overrides the home-page card image only, leaving heroImage/HeroComponent for the case study page. */
  cardImage?: string;
  /** Body content for generic template pages */
  ContentComponent?: React.ComponentType;
  /** Full-page component for special routing (replaces template page) */
  PageComponent?: React.ComponentType;
  overviewLogo?: React.ReactNode;
  overviewClient?: string;
  overviewCategory?: string;
  /** Groups featured case studies into sections on the home page. */
  homeGroup?: "Design Systems" | "Branding" | "Product";
}

/** Order featured home-page sections should render in. */
export const HOME_GROUP_ORDER = ["Design Systems", "Branding", "Product"] as const;

const CASE_STUDIES: CaseStudyConfig[] = [
  {
    id: "1",
    path: "/case-study/1",
    title: "Enabling AI-Assisted Prototyping",
    defaultTheme: "Walmart",
    isPublished: true,
    accessPassword: "Indigo",
    cardTitle: "Enabling AI-Assisted Prototyping",
    shortDescription:
      "A Figma-to-code pipeline trained on the Core Design System, turning design intent into a pull request engineering can review.",
    cardDescription:
      "Set the direction when the path wasn't obvious: defined the component lifecycle and operating model, led engineering and Builder.io through discovery, and mentored pilot teams as ambiguity turned into a company-wide pilot with 150+ sign-ups across 75+ teams.",
    fullDescription:
      "Every token, spacing value, and state already existed in Figma, but the organization still rebuilt that source of truth by hand. I framed the opportunity as infrastructure, secured the discovery partnership, defined the component lifecycle, and turned a one-component test into an org-wide pilot with real adoption demand.",
    metaItems: [
      { label: "Role", value: "Principal UX Designer" },
      { label: "Platform", value: "Builder.io · Core Design System" },
      { label: "Timeline", value: "Mar 2025 – Jan 2026" },
      { label: "Focus", value: "Design-to-code infrastructure, component lifecycle, adoption" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "The problem", href: "#problem" },
      { label: "Discovery", href: "#discovery" },
      { label: "Framing", href: "#framing" },
      { label: "Real project", href: "#project" },
      { label: "The kit", href: "#kit" },
      { label: "The proof", href: "#proof" },
      { label: "First pilot", href: "#connect" },
      { label: "Going wide", href: "#conference" },
      { label: "The demand", href: "#demand" },
      { label: "Operating model", href: "#operating-model" },
      { label: "The pipeline", href: "#pipeline" },
      { label: "The change", href: "#change" },
      { label: "Reflection", href: "#reflection" },
    ],
    navAccentColor: "#0053e2",
    tags: ["Platform", "Infrastructure", "Architecture", "Workflow Automation"],
    heroType: "image",
    heroImage: imgFigmaToCodeCover,
    thumbnail: imgFigmaToCodeCover,
    PageComponent: FigmaToCodeCaseStudy,
    overviewClient: "Walmart",
    overviewCategory: "Platform Systems, AI Tooling & Acceleration",
    homeGroup: "Design Systems",
  },
  {
    id: "2",
    path: "/case-study/2",
    title: "Unlocking Typographic Expression: When Brand Ambition Meets Platform Reality",
    defaultTheme: "Walmart",
    isPublished: true,
    cardTitle: "Unlocking Typographic Expression",
    shortDescription:
      "Resolved a brand-engineering deadlock by proposing and architecting a variable font strategy that unlocked typographic flexibility without performance compromise.",
    cardDescription:
      "Brand wanted broader hierarchy but performance constraints blocked progress. I proposed a variable font strategy, secured buy-in from Brand leadership, and defined the audit framework and cross-platform specification that enabled seamless consolidation—unblocking Brand's ability to express hierarchy and giving Engineering control over performance.",
    fullDescription:
      "Walmart Brand needed more typographic flexibility, but every new font weight came with a performance cost. When Engineering rejected a new weight request, I proposed a variable font as the solution and convinced Brand to fund it. The work required reframing the tradeoff between brand expression and platform constraints, then defining the audit framework and cross-platform spec that made it safe to ship across web, iOS, Android, and email.",
    metaItems: [
      { label: "Role", value: "Lead Designer, Branding & Platform Systems" },
      { label: "Timeline", value: "Jun 2024 – Dec 2025" },
      { label: "Scope", value: "Web, iOS, Android, Email" },
      { label: "Focus", value: "Branding strategy, variable font platform enablement, accessibility" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "The compromise", href: "#tension" },
      { label: "Weight scale", href: "#weight-scale" },
      { label: "Before & after", href: "#before-after" },
      { label: "The journey", href: "#journey" },
      { label: "User testing", href: "#user-testing" },
      { label: "What's next", href: "#whats-next" },
    ],
    navAccentColor: "#207442",
    tags: ["Branding", "Typography", "Platform Enablement", "Variable Font"],
    heroType: "image",
    heroImage: imgEverydaySansCover,
    thumbnail: imgEverydaySansCover,
    PageComponent: EverydaySansCaseStudy,
    overviewClient: "Walmart",
    overviewCategory: "Branding",
    homeGroup: "Branding",
  },
  {
    id: "3",
    path: "/case-study/3",
    title: "A Quest for a Source of Truth",
    defaultTheme: "Walmart",
    isPublished: true,
    cardTitle: "A Quest for a Source of Truth",
    shortDescription:
      "I proposed a shared token pipeline and pitched it to engineering leadership, cutting deployment time from 3 days to 10 minutes.",
    cardDescription:
      "Pitched the pipeline to engineering leadership to secure approval and support, then defined the bridge between Airtable and GitHub so 17+ teams could inherit shared tokens and ship without manual coordination.",
    fullDescription:
      "The token problem was an ownership problem: designers needed Airtable, engineers needed GitHub, and brands needed inheritance instead of duplication. It was my idea to solve it with a single automated pipeline. I presented the plan to engineering leadership to secure approval and the support to build it, then extended that support into Figma and our design system kits.",
    metaItems: [
      { label: "Role", value: "Lead Designer, Core Design System" },
      { label: "Timeline", value: "Aug 2024 – Nov 2025" },
      { label: "Scope", value: "17 brand themes · iOS · Android · Web" },
      { label: "Focus", value: "Token contracts, automation, theme inheritance" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "Problem space", href: "#situation" },
      { label: "Human cost", href: "#human-cost" },
      { label: "The bridge", href: "#bridge" },
      { label: "The pivot", href: "#pivot" },
      { label: "The work", href: "#the-work" },
      { label: "Architecture", href: "#architecture" },
      { label: "Results", href: "#results" },
      { label: "What's next", href: "#whats-next" },
    ],
    navAccentColor: "#0053e2",
    tags: ["Design Tokens", "Design System", "Automation", "Core Design System"],
    heroType: "image",
    heroImage: imgAirtableCoverSource,
    thumbnail: imgAirtableCoverPreview,
    PageComponent: AirtableCaseStudy,
    overviewClient: "Walmart",
    overviewCategory: "Core Design System, Design Tokens",
    homeGroup: "Design Systems",
  },
  {
    id: "12",
    path: "/case-study/12",
    title:
      "A conversational UI design system for Walmart, built across a platform migration and a market merger.",
    defaultTheme: "Walmart",
    isPublished: true,
    accessPassword: "Indigo",
    cardTitle: "A Cross-Platform Pattern System for Conversational AI",
    shortDescription:
      "A shared, themeable chat and conversational AI system for Walmart's shopping assistant, support chat, and staff tools, built across a platform migration and a market merger.",
    cardDescription:
      "Proposed a shared pattern and recipe system, then defined the taxonomy, process, and governance that let a recruited contributor team and Walmart's standing teams build every conversational surface from one system.",
    fullDescription:
      "Product teams could no longer maintain their own chat UIs. Engineering and product brought the problem to design: define the system, build and mentor a contributor team, and hand it to the standing teams to maintain.",
    metaItems: [
      { label: "Role", value: "Principal Product Designer" },
      { label: "Scope", value: "Strategy, Team, System, Governance" },
      { label: "Products", value: "Sparky (AI shopping assistant), Support chat, Associate tools" },
      { label: "Team", value: "2 Designers, iOS/Android/Web Engineers, 1 TMP" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "The Problem", href: "#problem" },
      { label: "Defining the Work", href: "#defining" },
      { label: "The Scope", href: "#scope" },
      { label: "Building the Team", href: "#team" },
      { label: "The Process", href: "#process" },
      { label: "Governance", href: "#governance" },
      { label: "Impact", href: "#impact" },
      { label: "What's Next", href: "#next" },
    ],
    navAccentColor: "#0053e2",
    tags: ["Conversational AI", "Governance", "Platform", "Patterns & Recipes", "Automation", "Design System"],
    heroType: "component",
    HeroComponent: UcUiKitHero,
    thumbnail: imgUcUiKitCover,
    cardImage: imgUcUiKitCoverCard,
    PageComponent: UcUiKitCaseStudy,
    overviewClient: "Walmart",
    overviewCategory: "Conversational AI, Design Systems, Governance",
    homeGroup: "Design Systems",
  },
  {
    id: "4",
    path: "/case-study/4",
    title: "One App, One Brand: De-Risking a Post-Acquisition Mobile Consolidation",
    defaultTheme: "Oportun",
    isPublished: true,
    cardTitle: "One App, One Brand",
    shortDescription:
      "Architected a mobile consolidation strategy that de-risked a post-acquisition merge, enabling rapid unification without product fragmentation or engineering rework.",
    cardDescription:
      "Post-acquisition required merging two distinct mobile applications at speed. I built a design system that unified foundations, components, and mobile patterns—enabling the product and engineering teams to consolidate iOS and Android without rework while protecting brand consistency and shipping velocity.",
    fullDescription:
      "Oportun's acquisition of Digit created an urgent need to merge two distinct mobile applications and rebrand under one design language. I led the platform systems work: defining strategy, building foundational libraries, shipping components in Storybook, and validating patterns through critical product flows like the loan calculator to ensure seamless mobile experience.",
    metaItems: [
      { label: "Role", value: "Lead Product Designer, Design Systems" },
      { label: "Timeline", value: "July 2022 – Jan 2023" },
      { label: "Scope", value: "Mobile App · iOS & Android · Figma · Storybook" },
      { label: "Focus", value: "App merger, foundations, components, mobile unification" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "The challenge", href: "#challenge" },
      { label: "The approach", href: "#approach" },
      { label: "Roadmapping", href: "#roadmap" },
      { label: "Foundations", href: "#foundations" },
      { label: "Component life cycle", href: "#component-life-cycle" },
      { label: "Usage examples", href: "#usage-examples" },
      { label: "Product work", href: "#product" },
      { label: "Results", href: "#results" },
      { label: "Design system", href: "#design-system" },
    ],
    navAccentColor: "#00C859",
    tags: ["Platform Systems", "Mobile App", "Design System", "Storybook"],
    heroType: "image",
    heroImage: imgOportunDsCover,
    thumbnail: imgOportunDsLogo,
    thumbnailFit: "contain",
    PageComponent: OportunDsCaseStudy,
    overviewClient: "Oportun / Digit",
    overviewCategory: "Platform Systems",
    homeGroup: "Design Systems",
  },
  {
    id: "5",
    path: "/case-study/5",
    title: "The Breakout Network",
    defaultTheme: "Portfolio",
    isPublished: true,
    cardTitle: "The Breakout Network",
    shortDescription:
      "A brand identity and set of guidelines for an athletic networking app, bridging brand strategy and product design.",
    cardDescription:
      "A scrappy startup needed a brand system as credible as its ambitions. Strategy, visual identity, and guidelines gave product teams a clear North Star to build from.",
    fullDescription:
      "The Breakout Network mobile application lacked a cohesive brand identity, leaving product designers without a clear direction. Drawing on prior experience in athletic branding, the project delivered a new visual identity and a full set of brand guidelines, the system product teams needed to build with confidence.",
    metaItems: [
      { label: "Role", value: "Art Director/Brand Designer" },
      { label: "Project Scope", value: "Brand Guidelines" },
      { label: "Project Tools", value: "Figma/Adobe Creative Suite" },
      { label: "Timeline", value: "July 2022 – Aug 2022" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "The challenge", href: "#challenge" },
      { label: "The approach", href: "#approach" },
      { label: "Defining the strategy", href: "#strategy" },
      { label: "Brand", href: "#brand" },
      { label: "Visual identity", href: "#visual-identity" },
      { label: "Brand guidelines", href: "#guidelines" },
      { label: "The brand in use", href: "#in-use" },
      { label: "Marketing", href: "#marketing" },
    ],
    navAccentColor: "#D0201C",
    tags: ["Branding", "Brand Guidelines", "Art Direction"],
    heroType: "image",
    heroImage: imgBreakoutCover,
    thumbnail: imgBreakoutLogo,
    thumbnailFit: "contain",
    thumbnailBorder: true,
    PageComponent: BreakoutNetworkCaseStudy,
    overviewClient: "Breakout Athletic Network",
    overviewCategory: "Brand Identity, Guidelines",
    homeGroup: "Branding",
  },
  {
    id: "6",
    path: "/case-study/6",
    title: "Carbon Auto-Orientation: Print success without orientation expertise",
    defaultTheme: "Carbon",
    isPublished: true,
    cardTitle: "Carbon Auto-Orientation",
    shortDescription:
      "Redesigning a resin-printing feature so novices and experts could both trust the same tool.",
    cardDescription:
      "Replaced an all-or-nothing Advanced Options panel with a guided, ranked set of orientations: fast enough for a first-time user, transparent enough for an expert.",
    fullDescription:
      "A resin-printing feature at Carbon, redesigned so a first-time user and a seasoned technician could both trust it, without one losing simplicity or the other losing control.",
    metaItems: [
      { label: "Role", value: "Lead Product Designer" },
      { label: "Team", value: "1 UI engineer · 1 back-end engineer" },
      { label: "Scope", value: "Auto-Orientation 2.0" },
      { label: "Focus", value: "Guided automation, decision UI, sub-10s runtime" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "Problem statement", href: "#problem" },
      { label: "Tension", href: "#tension" },
      { label: "The approach", href: "#approach" },
      { label: "The process", href: "#process" },
      { label: "Goals & targets", href: "#targets" },
      { label: "How we'll know it worked", href: "#success-metrics" },
      { label: "Product decisions", href: "#decisions" },
      { label: "See it in action", href: "#video" },
      { label: "User testing", href: "#user-testing" },
      { label: "Before & after", href: "#before-after" },
      { label: "Reflection", href: "#reflection" },
    ],
    navAccentColor: "#2a0eff",
    tags: ["Product Design", "3D Printing", "Decision UI", "Manufacturing"],
    heroType: "image",
    heroImage: imgCarbonCover,
    thumbnail: imgCarbonLogo,
    thumbnailFit: "contain",
    PageComponent: CarbonAutoOrientationCaseStudy,
    overviewClient: "Carbon Inc.",
    overviewCategory: "Feature Design, Resin 3D Printing",
    homeGroup: "Product",
  },
  {
    id: "7",
    path: "/case-study/7",
    title: "Xense Biotech",
    defaultTheme: "Xense",
    isPublished: false,
    featuredOnHome: false,
    shortDescription:
      "Xense Biotech is a leading company in the medical imaging industry, specializing in advanced x-ray technology. Their flagship product, uTomoTM, is a groundbreaking image acquisition and reconstruction system.",
    cardDescription:
      "Xense's main technological platform, uTomoTM x-ray imaging, reduces the time it takes to diagnose, intervene, and recover from illness. The non-toroid tomographic imaging system from Xense allows for low-radiation quick diagnostic imaging in an all-in-one architecture with no performance restrictions.",
    fullDescription:
      "Xense Biotech is a leading company in the medical imaging industry, specializing in advanced x-ray technology. Their flagship product, uTomoTM, is a groundbreaking image acquisition and reconstruction system that enhances diagnostic capabilities. I was tasked with designing a comprehensive UI kit to support their software platform and establish a cohesive visual language.",
    metaItems: [
      { label: "Role", value: "UI/UX Designer" },
      { label: "Industry", value: "Medical Imaging & Biotech" },
      { label: "Tags", value: "Desktop, Biotech, UI Kit" },
      { label: "Focus", value: "Medical software interface design system" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "The Challenge", href: "#challenge" },
      { label: "The Solution", href: "#solution" },
      { label: "Impact", href: "#impact" },
    ],
    navAccentColor: "#17d3b9",
    tags: ["Desktop", "Biotech", "UI Kit"],
    heroType: "component",
    thumbnail: imgXense,
    PageComponent: XenseCaseStudy,
    overviewClient: "Xense Biotech",
    overviewCategory: "Medical Imaging, UI Kit",
  },
  {
    id: "8",
    path: "/case-study/8",
    title: "One System, Three Markets: Scaling Digital Consistency Without Fragmentation",
    defaultTheme: "WM",
    isPublished: true,
    cardTitle: "One System, Three Markets",
    shortDescription:
      "Transformed a rebrand into platform infrastructure that enabled rapid migration of 1,000+ pages, reduced maintenance overhead, and scaled consistency across markets.",
    cardDescription:
      "A platform-first approach to rebrand: 40+ reusable AEM components enabling product teams to migrate 1,000+ localized pages across three markets, while slashing maintenance overhead.",
    fullDescription:
      "In 2021, Waste Management launched a company-wide rebrand alongside a broader digital transformation focused on improving customer self-service. I worked with the branding agency and led the platform systems work behind the rebrand, building scalable UX infrastructure and shared component patterns on the AEM platform rather than redesigning individual pages.",
    metaItems: [
      { label: "Role", value: "Principal Product Designer" },
      { label: "Team", value: "Partnered with product, engineering, and brand leadership" },
      { label: "Scope", value: "Company-wide platform rebrand" },
      { label: "Focus", value: "Platform UX patterns, information architecture, and component systems" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "Problem Space", href: "#problem-space" },
      { label: "Our Goals", href: "#our-goals" },
      { label: "Approach", href: "#approach" },
      { label: "System Audit", href: "#system-audit" },
      { label: "Information Architecture", href: "#information-architecture" },
      { label: "Compromises", href: "#compromises" },
    ],
    navAccentColor: "#207442",
    tags: ["Platform Systems", "Design System", "AEM", "Web"],
    heroType: "image",
    heroImage: imgDesign,
    thumbnail: wmNewImage,
    PageComponent: WmDesignSystemCaseStudy,
    overviewClient: "Waste Management",
    overviewCategory: "Platform Systems",
    homeGroup: "Design Systems",
  },
  {
    id: "9",
    path: "/case-study/9",
    title: "From Chaos to Strategy: Building Email as a Scalable Platform",
    defaultTheme: "WM",
    isPublished: true,
    cardTitle: "From Chaos to Strategy",
    shortDescription:
      "Delivered a 50+ block platform system that transformed email from fragmented, costly sends into strategic, personalized communication—enabling all business lines to reach customers at scale.",
    cardDescription:
      "A 50+ block modular system on Salesforce Marketing Cloud: enabled all business lines to send on-brand, personalized emails without rebuilding infrastructure. Result: 18.5M emails with measurable increases in engagement and adoption.",
    fullDescription:
      "In 2021, Waste Management's Email Marketing team led a rebrand of the email program in collaboration with the Digital Studio and Brand Team. I led the platform systems work: heuristic analysis, competitive research, and a modular Email Toolkit with 50+ blocks across five categories, built on Salesforce Marketing Cloud and grounded in the psychology of how people actually read email.",
    metaItems: [
      { label: "My Role", value: "Lead Product Designer, w/ team of 4" },
      { label: "Project Scope", value: "50+ Blocks · Documentation · Style Guide" },
      { label: "Tools", value: "Sketch · Salesforce CRM · Invision DSM / Prototyping" },
      { label: "Platform", value: "Salesforce Marketing Cloud" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "Context", href: "#context" },
      { label: "The approach", href: "#approach" },
      { label: "Research & audit", href: "#research" },
      { label: "Competitive analysis", href: "#competitive" },
      { label: "Design system", href: "#design-system" },
      { label: "Email examples", href: "#examples" },
      { label: "Results & impact", href: "#results" },
      { label: "Next steps", href: "#next-steps" },
      { label: "Reflections", href: "#reflection" },
    ],
    navAccentColor: "#006B38",
    tags: ["Salesforce Marketing Cloud", "Platform Systems", "Design System"],
    heroType: "image",
    heroImage: imgWmEmailCover,
    thumbnail: imgWmEmailCover,
    PageComponent: WmEmailCaseStudy,
    overviewClient: "Waste Management",
    overviewCategory: "Platform Systems",
    homeGroup: "Design Systems",
  },
  {
    id: "10",
    path: "/case-study/10",
    title: "Fine jewelry the old site made look like costume",
    defaultTheme: "Portfolio",
    isPublished: true,
    cardTitle: "Nini Jewels",
    shortDescription:
      "A full website redesign, build, illustration, and film for a celebrated Thai jewelry designer: brand, code, and story, end to end.",
    cardDescription:
      "The old site made fine jewelry look like costume. The redesign delivered a black-and-white brand system, illustrated collections, and a site the team can update themselves.",
    fullDescription:
      "Nini Hale is a celebrated Thai jewelry designer. Her website was dated, hard to update, and didn't match the work: fine pieces using rare, striking stones, presented like costume jewelry. The redesign covered design, front-end development, illustration, and film, delivered end to end.",
    metaItems: [
      { label: "Role", value: "UI design, front-end development, illustration & video editing" },
      { label: "Scope", value: "Full website redesign: brand, build, and content" },
      { label: "Deliverables", value: "Design → live site: UI, build, illustrations, video introduction" },
      { label: "Timeline", value: "2020" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "The problem", href: "#problem" },
      { label: "The Challenge", href: "#tension" },
      { label: "Homepage", href: "#homepage" },
      { label: "The approach", href: "#approach" },
      { label: "Brand guidelines", href: "#brand-system" },
      { label: "Collections", href: "#collections" },
      { label: "More pages", href: "#pages" },
      { label: "Reflection", href: "#reflection" },
    ],
    navAccentColor: "#27A6A0",
    tags: ["Branding", "Web Design", "Front-End", "Illustration"],
    heroType: "image",
    heroImage: imgNiniJewelsCover,
    thumbnail: imgNiniJewelsLogo,
    thumbnailFit: "contain",
    PageComponent: NiniJewelsCaseStudy,
    overviewClient: "Nini Jewels",
    overviewCategory: "Website Redesign, Build & Illustration",
    homeGroup: "Branding",
  },
  {
    id: "11",
    path: "/case-study/11",
    title: "Academy Sports + Outdoors Branding",
    isPublished: true,
    featuredOnHome: true,
    shortDescription:
      "Quarterly direct mail catalogs across golf, baseball, football, athletics, fishing, and hunting. From conception through print production, I created cohesive designs that maintained brand consistency while bringing each sport's story to life.",
    cardDescription:
      "Quarterly catalog campaigns covering golf, baseball, football, athletics, fishing, and hunting. I led design from conception through print production, ensuring brand consistency and engaging visual storytelling.",
    fullDescription:
      "Academy Sports + Outdoors needed quarterly direct mail catalogs spanning diverse sporting categories. From conception through print production, I created cohesive designs that maintained brand consistency while bringing each sport's unique story to life, delivering compelling campaigns that drove customer engagement.",
    metaItems: [
      { label: "Role", value: "Brand Designer" },
      { label: "Client", value: "Academy Sports + Outdoors" },
      { label: "Scope", value: "Quarterly catalog design and production" },
      { label: "Focus", value: "Print design, brand campaigns, seasonal storytelling" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "The Challenge", href: "#challenge" },
      { label: "The Solution", href: "#solution" },
      { label: "Impact", href: "#impact" },
    ],
    navAccentColor: "#0055A6",
    tags: ["Branding", "Print", "Digital", "Campaigns"],
    heroType: "image",
    heroImage: imgAcademy,
    thumbnail: imgAcademy,
    PageComponent: AcademyCaseStudy,
    overviewClient: "Academy Sports + Outdoors",
    overviewCategory: "Print Design, Brand Campaigns",
    homeGroup: "Branding",
  },
];

export function getAllCaseStudies(): CaseStudyConfig[] {
  return CASE_STUDIES;
}

export function getCaseStudyAccessPassword(path: string): string | null {
  const study = CASE_STUDIES.find((entry) => entry.path === path);
  const password = study?.accessPassword;
  return password?.trim() ? password : null;
}

export function getCaseStudyById(id: string): CaseStudyConfig | undefined {
  return CASE_STUDIES.find((cs) => cs.id === id);
}

export function getAdjacentCaseStudies(id: string): {
  prev?: ProjectLink;
  next?: ProjectLink;
} {
  const published = CASE_STUDIES.filter((cs) => cs.isPublished !== false);
  const index = published.findIndex((cs) => cs.id === id);
  if (index === -1) return {};
  const prev = published[index === 0 ? published.length - 1 : index - 1];
  const next = published[index === published.length - 1 ? 0 : index + 1];
  return {
    prev: configToProjectLink(prev),
    next: configToProjectLink(next),
  };
}

function configToProjectLink(config: CaseStudyConfig): ProjectLink {
  const HeroComp = config.HeroComponent;
  const image =
    config.heroType === "image" && config.heroImage
      ? React.createElement("img", {
          src: config.heroImage,
          alt: config.title,
          className: "w-full h-full object-cover",
        })
      : HeroComp
        ? React.createElement(HeroComp, {})
        : React.createElement("img", {
            src: config.thumbnail,
            alt: config.title,
            className: "w-full h-full object-cover",
          });
  return {
    path: config.path,
    title: config.title,
    description: config.shortDescription,
    image,
    thumbnail: config.overviewClient === "Walmart" ? imgWalmartLogo : config.thumbnail,
    thumbnailFit: config.overviewClient === "Walmart" ? "cover" : config.thumbnailFit,
    thumbnailBorder: config.thumbnailBorder,
  };
}

export function getFeaturedCaseStudies(): CaseStudyConfig[] {
  return CASE_STUDIES.filter(
    (cs) => cs.isPublished !== false && cs.featuredOnHome !== false,
  );
}

/** Featured case studies grouped by homeGroup, in HOME_GROUP_ORDER. Ungrouped studies are dropped. */
export function getFeaturedCaseStudiesByGroup(): {
  group: (typeof HOME_GROUP_ORDER)[number];
  caseStudies: CaseStudyConfig[];
}[] {
  const featured = getFeaturedCaseStudies();
  return HOME_GROUP_ORDER.map((group) => ({
    group,
    caseStudies: featured.filter((cs) => cs.homeGroup === group),
  })).filter((section) => section.caseStudies.length > 0);
}

export function isCaseStudyPublished(id: string): boolean {
  return getCaseStudyById(id)?.isPublished !== false;
}
