import React from "react";
import imgDesign from "@/app/assets/pages/case-study/wm-rebrand/design.png";
import imgXense from "@/app/assets/pages/case-study/wm-rebrand/xense.png";
import imgAcademy from "@/app/assets/pages/case-study/wm-rebrand/academy.png";
import wmNewImage from "@/app/assets/pages/case-study/wm-rebrand/wm-new-image.png";
import XenseCaseStudy from "@/app/components/case-studies/xense/XenseCaseStudy";
import AcademyHero from "@/app/components/case-studies/heroes/AcademyHero";
import WmDesignSystemCaseStudy from "@/app/components/case-studies/wm-rebrand/WmDesignSystemCaseStudy";
import EverydaySansCaseStudy from "@/app/components/case-studies/everyday-sans/EverydaySansCaseStudy";
import AirtableCaseStudy from "@/app/components/case-studies/airtable-sot/AirtableCaseStudy";
import OportunDsCaseStudy from "@/app/components/case-studies/oportun-ds/OportunDsCaseStudy";
import { CaseStudyAcademyContent } from "@/app/components/case-studies/academy/CaseStudyAcademyContent";
import imgEverydaySansCover from "@/app/assets/pages/case-study/everyday-sans/cover.jpg";
import { imgAirtableCoverPreview, imgAirtableCoverSource } from "@/app/assets/pages/case-study/airtable-sot/assets";
import imgOportunDsCover from "@/app/assets/pages/case-study/oportun-ds/cover.jpg";
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
    id: "3",
    path: "/case-study/3",
    title: "Xense Biotech",
    defaultTheme: "Xense",
    isPublished: true,
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
    id: "4",
    path: "/case-study/4",
    title: "Academy Sports + Outdoors Branding",
    isPublished: true,
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
  {
    id: "5",
    path: "/case-study/5",
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
    id: "6",
    path: "/case-study/6",
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
    id: "1",
    path: "/case-study/1",
    title: "Designing a scalable system for a digital rebrand",
    defaultTheme: "WM",
    isPublished: true,
    cardTitle: "WM.com Rebrand: Re-branding WM.com",
    shortDescription:
      "Designing a scalable system for a digital rebrand. In 2021, Waste Management launched a company-wide rebrand alongside a broader digital transformation.",
    cardDescription:
      "with a new design system and 40+ AEM components to support migration of 1000+ localized pages, ecommerce site, marketing, and educational resources in the US, France, and Mexico markets.",
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
    id: "7",
    path: "/case-study/7",
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
