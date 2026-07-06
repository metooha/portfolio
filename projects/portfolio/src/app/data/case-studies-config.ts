import React from "react";
import imgDesign from "@/app/assets/pages/case-study/wm-rebrand/design.png";
import imgXense from "@/app/assets/pages/case-study/wm-rebrand/xense.png";
import imgAcademy from "@/app/assets/pages/case-study/wm-rebrand/academy.png";
import hoverImage from "figma:asset/c22af8bfcb65f93d01f2862c0d18f313ac7bc96a.png";
import wmNewImage from "@/app/assets/pages/case-study/wm-rebrand/wm-new-image.png";
import XenseHero from "@/app/components/case-studies/heroes/XenseHero";
import AcademyHero from "@/app/components/case-studies/heroes/AcademyHero";
import WmDesignSystemCaseStudy from "@/app/components/case-studies/wm-rebrand/WmDesignSystemCaseStudy";
import EverydaySansCaseStudy from "@/app/components/case-studies/everyday-sans/EverydaySansCaseStudy";
import AirtableCaseStudy from "@/app/components/case-studies/airtable-sot/AirtableCaseStudy";
import { CaseStudyHoverContent } from "@/app/components/case-studies/hover/CaseStudyHoverContent";
import { CaseStudyXenseContent } from "@/app/components/case-studies/xense/CaseStudyXenseContent";
import { CaseStudyAcademyContent } from "@/app/components/case-studies/academy/CaseStudyAcademyContent";
import imgEverydaySansCover from "@/app/assets/pages/case-study/everyday-sans/cover.jpg";
import imgAirtableThumb from "@/app/assets/pages/case-study/everyday-sans/font-compare-tool.png";
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
    id: "2",
    path: "/case-study/2",
    title: "Hover - Digital Assistant Design System",
    accessPassword: import.meta.env.VITE_HOVER_CASE_STUDY_PASSWORD ?? "hover",
    isPublished: true,
    shortDescription:
      "Hover is a digital assistant web app concept for teachers in which they can find resources and assignments to share with students.",
    cardDescription:
      "Hover is a digital assistant web app concept for teachers in which they can find resources and assignments to share with students. Working with one other designer, I developed the vision and design system for this concept.",
    fullDescription:
      "Hover is a digital assistant web app concept for teachers in which they can find resources and assignments to share with students. Working with one other designer, I developed the vision and design system for this concept.",
    metaItems: [
      { label: "Role", value: "Lead Designer" },
      { label: "Team", value: "2 Designers" },
      { label: "Tags", value: "Design System, Digital Assistant, Education" },
      { label: "Focus", value: "Visual design system and component library" },
    ],
    navSections: [
      { label: "Overview", href: "#overview" },
      { label: "The Challenge", href: "#challenge" },
      { label: "The Solution", href: "#solution" },
    ],
    navAccentColor: "#4F39F6",
    tags: ["Design System", "Digital Assistant", "Education"],
    heroType: "image",
    heroImage: hoverImage,
    heroGradientClass: "bg-gradient-to-br from-purple-50 to-indigo-50",
    thumbnail: hoverImage,
    ContentComponent: CaseStudyHoverContent,
  },
  {
    id: "3",
    path: "/case-study/3",
    title: "Xense Biotech",
    isPublished: true,
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
    navAccentColor: "#0891b2",
    tags: ["Desktop", "Biotech", "UI Kit"],
    heroType: "component",
    HeroComponent: XenseHero,
    heroGradientClass: "bg-gradient-to-br from-blue-50 to-cyan-50",
    thumbnail: imgXense,
    ContentComponent: CaseStudyXenseContent,
  },
  {
    id: "4",
    path: "/case-study/4",
    title: "Academy Sports + Outdoors Branding",
    isPublished: true,
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
    overviewClient: "Walmart Commerce Platform",
    overviewCategory: "Living Design, Typography",
  },
  {
    id: "6",
    path: "/case-study/6",
    title: "Airtable as Source of Truth",
    defaultTheme: "Walmart",
    isPublished: true,
    cardTitle: "Airtable as Source of Truth",
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
      { label: "Situation", href: "#situation" },
      { label: "Human cost", href: "#human-cost" },
      { label: "The work", href: "#the-work" },
      { label: "Pipeline", href: "#pipeline" },
      { label: "Theme hierarchy", href: "#theme-hierarchy" },
      { label: "Results", href: "#results" },
    ],
    navAccentColor: "#207442",
    tags: ["Design Tokens", "Design System", "Automation", "Living Design"],
    heroType: "image",
    heroImage: imgAirtableThumb,
    thumbnail: imgAirtableThumb,
    PageComponent: AirtableCaseStudy,
    overviewClient: "Walmart Commerce Platform",
    overviewCategory: "Living Design, Design Tokens",
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
  return CASE_STUDIES.filter((cs) => cs.isPublished !== false);
}

export function isCaseStudyPublished(id: string): boolean {
  return getCaseStudyById(id)?.isPublished !== false;
}
