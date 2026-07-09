import React from "react";
import imgDesign from "@/app/assets/pages/case-study/wm-rebrand/design.png";
import imgXense from "@/app/assets/pages/case-study/wm-rebrand/xense.png";
import imgAcademy from "@/app/assets/pages/case-study/wm-rebrand/academy.png";
import wmNewImage from "@/app/assets/pages/case-study/wm-rebrand/wm-new-image.png";
import XenseCaseStudy from "@/app/pages/case-studies/xense/XenseCaseStudy";
import AcademyHero from "@/app/pages/case-studies/heroes/AcademyHero";
import WmDesignSystemCaseStudy from "@/app/pages/case-studies/wm-rebrand/WmDesignSystemCaseStudy";
import EverydaySansCaseStudy from "@/app/pages/case-studies/everyday-sans/EverydaySansCaseStudy";
import AirtableCaseStudy from "@/app/pages/case-studies/airtable-sot/AirtableCaseStudy";
import OportunDsCaseStudy from "@/app/pages/case-studies/oportun-ds/OportunDsCaseStudy";
import CarbonAutoOrientationCaseStudy from "@/app/pages/case-studies/carbon-auto-orientation/CarbonAutoOrientationCaseStudy";
import FigmaToCodeCaseStudy from "@/app/pages/case-studies/figma-to-code/FigmaToCodeCaseStudy";
import WmEmailCaseStudy from "@/app/pages/case-studies/wm-email-rebrand/WmEmailCaseStudy";
import NiniJewelsCaseStudy from "@/app/pages/case-studies/nini-jewels/NiniJewelsCaseStudy";
import BreakoutNetworkCaseStudy from "@/app/pages/case-studies/breakout-network/BreakoutNetworkCaseStudy";
import { CaseStudyAcademyContent } from "@/app/pages/case-studies/academy/CaseStudyAcademyContent";
import imgEverydaySansCover from "@/app/assets/pages/case-study/everyday-sans/cover.jpg";
import { imgAirtableCoverPreview, imgAirtableCoverSource } from "@/app/assets/pages/case-study/airtable-sot/assets";
import imgOportunDsCover from "@/app/assets/pages/case-study/oportun-ds/cover.jpg";
import imgCarbonCover from "@/app/assets/pages/case-study/carbon/design-engine.jpg";
import imgFigmaToCodeCover from "@/app/assets/pages/case-study/figma-to-code/optimized/cover.jpg";
import imgWmEmailCover from "@/app/assets/pages/case-study/wm-email-rebrand/mockup-min.png";
import imgNiniJewelsCover from "@/app/assets/pages/case-study/nini-jewels/nini-cover.jpg";
import imgBreakoutCover from "@/app/assets/pages/case-study/breakout-network/cover.jpeg";
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
  /** Body content for generic template pages */
  ContentComponent?: React.ComponentType;
  /** Full-page component for special routing (replaces template page) */
  PageComponent?: React.ComponentType;
  overviewLogo?: React.ReactNode;
  overviewClient?: string;
  overviewCategory?: string;
}

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
      "A Figma-to-code pipeline trained on the Walmart Design System, so what engineering receives is a pull request to review, not a Figma file to reinterpret.",
    cardDescription:
      "Validated across the Walmart Design System's component library, then scaled into a company-wide pilot with 150+ sign-ups across 75+ teams cutting design-to-code time in half.",
    fullDescription:
      "The design is done: every token, spacing value, and state already defined in Figma. Then it gets rebuilt by hand in code, thousands of times a year. This case study covers a Figma-to-code pipeline trained on the Walmart Design System that closes that gap, from a single validated component to a company-wide pilot with real adoption demand.",
    metaItems: [
      { label: "Role", value: "Principal UX Designer" },
      { label: "Platform", value: "Builder.io · Walmart Design System" },
      { label: "Timeline", value: "Mar 2025 – Jan 2026" },
      { label: "Focus", value: "Design-to-code automation, component lifecycle, adoption" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "The problem", href: "#problem" },
      { label: "Discovery", href: "#discovery" },
      { label: "Real project", href: "#project" },
      { label: "The kit", href: "#kit" },
      { label: "The proof", href: "#proof" },
      { label: "Walmart Connect", href: "#connect" },
      { label: "Going wide", href: "#conference" },
      { label: "The demand", href: "#demand" },
      { label: "The pipeline", href: "#pipeline" },
      { label: "The change", href: "#change" },
      { label: "Reflection", href: "#reflection" },
    ],
    navAccentColor: "#0053e2",
    tags: ["AI", "Design Systems", "Prototyping", "Automation"],
    heroType: "image",
    heroImage: imgFigmaToCodeCover,
    thumbnail: imgFigmaToCodeCover,
    PageComponent: FigmaToCodeCaseStudy,
    overviewClient: "Walmart",
    overviewCategory: "Walmart Design System, AI Tooling",
  },
  {
    id: "2",
    path: "/case-study/2",
    title: "Everyday Sans UI — Brand and performance, without compromise",
    defaultTheme: "Walmart",
    isPublished: true,
    cardTitle: "Everyday Sans UI",
    shortDescription:
      "How a variable font ended the trade-off between brand hierarchy and web performance at Walmart.",
    cardDescription:
      "Brand held back on font weights because each new file carried a performance cost. The variable font ended that compromise — permanently.",
    fullDescription:
      "Every new font weight came with a performance cost. So Brand held back. The result was visual hierarchy that never reached its potential, and a design system that had to make peace with compromise. The variable font ended that trade-off — permanently.",
    metaItems: [
      { label: "Role", value: "Lead Designer, Living Design" },
      { label: "Timeline", value: "Jun 2024 – Dec 2025" },
      { label: "Scope", value: "Web, iOS, Android, Email" },
      { label: "Focus", value: "Variable font adoption, design tokens, accessibility" },
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
    tags: ["Typography", "Design System", "Performance", "Accessibility"],
    heroType: "image",
    heroImage: imgEverydaySansCover,
    thumbnail: imgEverydaySansCover,
    PageComponent: EverydaySansCaseStudy,
    overviewClient: "Walmart",
    overviewCategory: "Living Design, Typography",
  },
  {
    id: "3",
    path: "/case-study/3",
    title: "A Quest for a Source of Truth",
    defaultTheme: "Walmart",
    isPublished: true,
    cardTitle: "A Quest for a Source of Truth",
    shortDescription:
      "How a shared token infrastructure cut deployment time from 3 days to 10 minutes.",
    cardDescription:
      "From 17+ teams maintaining separate token copies to a single automated pipeline — zero coordination, zero errors.",
    fullDescription:
      "We went from 17+ teams maintaining their own copies of design tokens — manually, inconsistently, and constantly out of sync — to a single automated pipeline where a designer updates a value in Airtable and it's live in production in 10 minutes.",
    metaItems: [
      { label: "Role", value: "Lead Designer, Living Design" },
      { label: "Timeline", value: "Aug 2024 – Nov 2025" },
      { label: "Scope", value: "17 brand themes · iOS · Android · Web" },
      { label: "Focus", value: "Token infrastructure, automation, theme hierarchy" },
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
    tags: ["Design Tokens", "Design System", "Automation", "Living Design"],
    heroType: "image",
    heroImage: imgAirtableCoverSource,
    thumbnail: imgAirtableCoverPreview,
    PageComponent: AirtableCaseStudy,
    overviewClient: "Walmart",
    overviewCategory: "Living Design, Design Tokens",
  },
  {
    id: "4",
    path: "/case-study/4",
    title: "Oportun Design System",
    defaultTheme: "Oportun",
    isPublished: true,
    cardTitle: "Oportun Design System",
    shortDescription:
      "Rebranding and unifying Digit and Oportun under one design language — from foundations through adoption.",
    cardDescription:
      "Led the design system through a full rebrand: foundations, components, Storybook, documentation, and product validation across mobile and web.",
    fullDescription:
      "Oportun's acquisition of Digit created an urgent need to rebrand and unify two distinct product experiences. I led the design systems work — defining strategy, building foundational libraries, shipping components in Storybook, and validating patterns through high-stakes product flows like the loan calculator.",
    metaItems: [
      { label: "Role", value: "Lead Product Designer, Design Systems" },
      { label: "Timeline", value: "July 2022 – Jan 2023" },
      { label: "Scope", value: "Mobile & Web · Figma · Storybook" },
      { label: "Focus", value: "Rebrand, foundations, components, adoption" },
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
    tags: ["Design System", "Rebrand", "Storybook", "Fintech"],
    heroType: "image",
    heroImage: imgOportunDsCover,
    thumbnail: imgOportunDsCover,
    PageComponent: OportunDsCaseStudy,
    overviewClient: "Oportun / Digit",
    overviewCategory: "Design Systems, Rebrand",
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
    thumbnail: imgBreakoutCover,
    PageComponent: BreakoutNetworkCaseStudy,
    overviewClient: "Breakout Athletic Network",
    overviewCategory: "Brand Identity, Guidelines",
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
    thumbnail: imgCarbonCover,
    PageComponent: CarbonAutoOrientationCaseStudy,
    overviewClient: "Carbon Inc.",
    overviewCategory: "Feature Design, Resin 3D Printing",
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
    title: "Designing a scalable system for a digital rebrand",
    defaultTheme: "WM",
    isPublished: true,
    cardTitle: "Rebranding Waste Management",
    shortDescription:
      "Designing a scalable system for a digital rebrand. In 2021, Waste Management launched a company-wide rebrand alongside a broader digital transformation.",
    cardDescription:
      "A company-wide rebrand of WM.com, built on a new design system and 40+ AEM components that powered the migration of 1,000+ localized pages across the ecommerce site, marketing, and educational content in the US, France, and Mexico.",
    fullDescription:
      "In 2021, Waste Management launched a company-wide rebrand alongside a broader digital transformation focused on improving customer self-service. I worked with the branding agency and led the systems work behind the rebrand, treating it as an opportunity to establish shared UX infrastructure rather than redesign individual pages.",
    metaItems: [
      { label: "Role", value: "Principal Product Designer" },
      { label: "Team", value: "Partnered with product, engineering, and brand leadership" },
      { label: "Scope", value: "Company-wide rebrand across web platforms" },
      { label: "Focus", value: "Platform UX patterns, information architecture, and shared systems" },
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
    tags: ["WEB", "Mobile App", "Design System", "Branding"],
    heroType: "image",
    heroImage: imgDesign,
    thumbnail: wmNewImage,
    PageComponent: WmDesignSystemCaseStudy,
    overviewClient: "Waste Management",
    overviewCategory: "Design Systems, Branding",
  },
  {
    id: "9",
    path: "/case-study/9",
    title: "Redesigning WM email from fragmented sends to a modular digital system",
    defaultTheme: "WM",
    isPublished: false,
    featuredOnHome: false,
    cardTitle: "WM Email Rebrand",
    shortDescription:
      "A collaborative rebranding of Waste Management's email program — purpose, audience strategy, and a 50+ block design system that made every email feel like WM.",
    cardDescription:
      "70 new templates and a 50+ block modular toolkit built on research into how people actually read email — 18.5M emails sent under the new system in 2021.",
    fullDescription:
      "In 2021, Waste Management's Email Marketing team led a rebrand of the email program in collaboration with the Digital Studio and Brand Team. I led the design work: heuristic analysis, competitive research, and a modular Email Tool Kit — 50+ blocks across five categories — built on SFMC and grounded in the psychology of how people actually read email.",
    metaItems: [
      { label: "My Role", value: "Lead Product Designer, w/ team of 4" },
      { label: "Project Scope", value: "50+ Blocks · Documentation · Style Guide" },
      { label: "Tools", value: "Sketch · Salesforce CRM · Invision DSM / Prototyping" },
      { label: "Platform", value: "Salesforce Marketing Cloud (SFMC)" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "Context", href: "#context" },
      { label: "The approach", href: "#approach" },
      { label: "Research & audit", href: "#research" },
      { label: "Competitive analysis", href: "#competitive" },
      { label: "Design system", href: "#design-system" },
      { label: "Final designs", href: "#final-designs" },
      { label: "Results & impact", href: "#results" },
      { label: "Next steps", href: "#next-steps" },
      { label: "Reflections", href: "#reflection" },
    ],
    navAccentColor: "#006B38",
    tags: ["Email Design", "Design System", "SFMC", "Branding"],
    heroType: "image",
    heroImage: imgWmEmailCover,
    thumbnail: imgWmEmailCover,
    PageComponent: WmEmailCaseStudy,
    overviewClient: "Waste Management",
    overviewCategory: "Email Design System, SFMC",
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
    thumbnail: imgNiniJewelsCover,
    PageComponent: NiniJewelsCaseStudy,
    overviewClient: "Nini Jewels",
    overviewCategory: "Website Redesign, Build & Illustration",
  },
  {
    id: "11",
    path: "/case-study/11",
    title: "Academy Sports + Outdoors Branding",
    isPublished: false,
    featuredOnHome: false,
    shortDescription:
      "Direct Mail catalogs are delivered every quarter at Academy Sports + Outdoors. The main categories are for sports such as golf, baseball/softball, football, athletics, fishing, and hunting.",
    cardDescription:
      "Direct Mail catalogs are delivered every quarter at Academy Sports + Outdoors. The main categories are for sports such as golf, baseball/softball, football, athletics, fishing, and hunting. I created these catalogs from conception to print production.",
    fullDescription:
      "Direct Mail catalogs are delivered every quarter at Academy Sports + Outdoors. The main categories are for sports such as golf, baseball/softball, football, athletics, fishing, and hunting. I created these catalogs from conception to print production, ensuring brand consistency and engaging visual storytelling.",
    metaItems: [
      { label: "Role", value: "Brand Designer" },
      { label: "Client", value: "Academy Sports + Outdoors" },
      { label: "Tags", value: "Branding, Print, Digital, Campaigns" },
      { label: "Focus", value: "Quarterly catalog design and brand campaigns" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "The Challenge", href: "#challenge" },
      { label: "The Solution", href: "#solution" },
      { label: "Impact", href: "#impact" },
    ],
    navAccentColor: "#ea580c",
    tags: ["Branding", "Print", "Digital", "Campaigns"],
    heroType: "component",
    HeroComponent: AcademyHero,
    heroGradientClass: "bg-gradient-to-br from-orange-50 to-red-50",
    thumbnail: imgAcademy,
    ContentComponent: CaseStudyAcademyContent,
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
    thumbnail: config.thumbnail,
  };
}

export function getFeaturedCaseStudies(): CaseStudyConfig[] {
  return CASE_STUDIES.filter(
    (cs) => cs.isPublished !== false && cs.featuredOnHome !== false,
  );
}

export function isCaseStudyPublished(id: string): boolean {
  return getCaseStudyById(id)?.isPublished !== false;
}
