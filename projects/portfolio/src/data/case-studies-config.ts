import React from "react";
import imgDesign from "figma:asset/840e6895ac600c62a54c6dbd6cbb35a7f6faa2e0.png";
import imgXense from "figma:asset/1ea8d1f27e915c6e54282fce05a4bfbf9fd1b925.png";
import imgAcademy from "figma:asset/42ca637efa8254de788bf106bc9cc80a6048f696.png";
import hoverImage from "figma:asset/c22af8bfcb65f93d01f2862c0d18f313ac7bc96a.png";
import wmNewImage from "figma:asset/aaa7dd8ee1fac7cf707385537cb8b691c2a4157e.png";
import Xense from "@/imports/Xense";
import Academy from "@/imports/Academy";
import { CaseStudyHoverContent } from "@/app/components/content/CaseStudyHoverContent";
import { CaseStudyXenseContent } from "@/app/components/content/CaseStudyXenseContent";
import { CaseStudyAcademyContent } from "@/app/components/content/CaseStudyAcademyContent";
import type { ProjectLink } from "@/app/components/CaseStudyTemplate";

export interface CaseStudyConfig {
  id: string;
  path: string;
  title: string;
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
  HeroComponent?: React.ComponentType;
  thumbnail: string;
  ContentComponent: React.ComponentType;
  overviewLogo?: React.ReactNode;
  overviewClient?: string;
  overviewCategory?: string;
}

const CASE_STUDIES: CaseStudyConfig[] = [
  {
    id: "1",
    path: "/case-study/1",
    title: "Designing a scalable system for a digital rebrand",
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
    ContentComponent: (() => null) as React.ComponentType,
    overviewClient: "Waste Management",
    overviewCategory: "Design Systems, Branding",
  },
  {
    id: "2",
    path: "/case-study/2",
    title: "Hover - Digital Assistant Design System",
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
    thumbnail: hoverImage,
    ContentComponent: CaseStudyHoverContent,
  },
  {
    id: "3",
    path: "/case-study/3",
    title: "Xense Biotech",
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
    HeroComponent: Xense,
    thumbnail: imgXense,
    ContentComponent: CaseStudyXenseContent,
  },
  {
    id: "4",
    path: "/case-study/4",
    title: "Academy Sports + Outdoors Branding",
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
    HeroComponent: Academy,
    thumbnail: imgAcademy,
    ContentComponent: CaseStudyAcademyContent,
  },
];

export function getCaseStudyById(id: string): CaseStudyConfig | undefined {
  return CASE_STUDIES.find((cs) => cs.id === id);
}

export function getAdjacentCaseStudies(id: string): {
  prev?: ProjectLink;
  next?: ProjectLink;
} {
  const index = CASE_STUDIES.findIndex((cs) => cs.id === id);
  if (index === -1) return {};
  const prev = CASE_STUDIES[index === 0 ? CASE_STUDIES.length - 1 : index - 1];
  const next = CASE_STUDIES[index === CASE_STUDIES.length - 1 ? 0 : index + 1];
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
  return CASE_STUDIES;
}
