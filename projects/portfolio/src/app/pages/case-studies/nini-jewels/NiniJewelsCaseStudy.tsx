import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import imgCover from "@/app/assets/pages/case-study/nini-jewels/nini-cover.jpg";
import imgLogo from "@/app/assets/pages/case-study/nini-jewels/nini-logo.png";
import {
  NiniApproachSection,
  NiniBrandSystemSection,
  NiniCollectionsSection,
  NiniHomepageSection,
  NiniPagesSection,
  NiniProblemSection,
  NiniReflectionSection,
  NiniTensionSection,
} from "./NiniJewelsSections";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "The problem", href: "#problem" },
  { label: "The Challenge", href: "#tension" },
  { label: "Homepage", href: "#homepage" },
  { label: "The approach", href: "#approach" },
  { label: "Brand guidelines", href: "#brand-system" },
  { label: "Collections", href: "#collections" },
  { label: "More pages", href: "#pages" },
  { label: "Reflection", href: "#reflection" },
] as const;

const ACCENT = "#27A6A0";

function NiniHero() {
  return (
    <CaseStudyHero
      image={imgCover}
      title={"Fine jewelry the old site\nmade look like costume."}
      titleColor="#ffffff"
      imageClassName="opacity-40"
      backgroundColor="#141414"
      className="max-w-[2048px] mx-auto"
    />
  );
}

const OVERVIEW_TITLE = "A redesign that let the jewelry lead: brand, build, and story end to end.";
const OVERVIEW_DESCRIPTION =
  "Nini Hale's website undersold the work: fine jewelry using the rarest colored stones, presented like costume jewelry. The redesign rebuilt it end to end: redefining the brand, stripping back the color, retelling the story, and shipping a site the team can update without a developer.";
const OVERVIEW_META = [
  { label: "Role", value: "UI design, front-end development, illustration & video editing" },
  { label: "Scope", value: "Full website redesign: brand, build, and content" },
  { label: "Deliverables", value: "Design → live site: UI, build, illustrations, video introduction" },
  { label: "Timeline", value: "2020" },
] as const;

export default function NiniJewelsCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("10");

  return (
    <div data-ld-theme="Portfolio" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<NiniHero />}
        overviewLogo={<img src={imgLogo} alt="Nini Jewels logo" className="w-full h-full object-cover" />}
        overviewClient="Nini Jewels"
        overviewCategory="Website Redesign, Build & Illustration"
        overviewTitle={OVERVIEW_TITLE}
        overviewDescription={OVERVIEW_DESCRIPTION}
        metaItems={[...OVERVIEW_META]}
        navSections={NAV}
        navAccentColor={ACCENT}
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <NiniProblemSection />
          <NiniTensionSection />
          <NiniHomepageSection />
          <NiniApproachSection />
          <NiniBrandSystemSection />
          <NiniCollectionsSection />
          <NiniPagesSection />
          <NiniReflectionSection />
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
