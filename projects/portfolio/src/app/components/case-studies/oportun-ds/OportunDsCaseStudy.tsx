import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import imgCover from "@/app/assets/pages/case-study/oportun-ds/cover.png";
import imgLogo from "@/app/assets/pages/case-study/oportun-ds/logo.png";
import {
  OportunDsApproachSection,
  OportunDsChallengeSection,
  OportunDsComponentsSection,
  OportunDsFoundationsSection,
  OportunDsProductSection,
  OportunDsResultsSection,
  OportunDsRoadmapSection,
  OportunDsStrategySection,
} from "./OportunDsCaseStudySections";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "The challenge", href: "#challenge" },
  { label: "The approach", href: "#approach" },
  { label: "Strategy", href: "#strategy" },
  { label: "Roadmapping", href: "#roadmap" },
  { label: "Foundations", href: "#foundations" },
  { label: "Components", href: "#components" },
  { label: "Product work", href: "#product" },
  { label: "Results", href: "#results" },
];

const HERO_TITLE_COLOR = "#000000";
const PEACH_HERO = "#FFB08A";

function OportunDsHero() {
  return (
    <CaseStudyHero
      image={imgCover}
      title={"A United\nExperience"}
      titleColor={HERO_TITLE_COLOR}
      imageWidth={1024}
      imageHeight={512}
      aspectRatio="2 / 1"
      imageFit="fill"
      imageClassName="object-cover object-center"
      backgroundColor={PEACH_HERO}
      curvedDivider
      className="w-full"
    />
  );
}

function OportunDsOverviewLogo() {
  return (
    <div
      className="absolute inset-0 overflow-hidden flex items-center justify-center"
      style={{ background: "var(--ld-semantic-color-fill, #ffffff)" }}
    >
      <img alt="" className="size-12 object-contain" src={imgLogo} />
    </div>
  );
}

export default function OportunDsCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("7");

  return (
    <div data-ld-theme="Oportun" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<OportunDsHero />}
        overviewLogo={<OportunDsOverviewLogo />}
        overviewClient="Oportun / Digit"
        overviewCategory="Design Systems, Rebrand"
        overviewTitle="Oportun Design System"
        overviewDescription="Oportun's acquisition of Digit created an urgent need to rebrand and unify two distinct product experiences. I led the design systems work — defining strategy, building foundational libraries, shipping components in Storybook, and validating patterns through high-stakes product flows."
        metaItems={[
          { label: "Role", value: "Lead Product Designer, Design Systems" },
          {
            label: "Team",
            value: "1 Engineering Manager · 1 UI Lead · 2 UI Engineers · 1 Brand Designer",
          },
          { label: "Timeline", value: "July 2022 – Jan 2023" },
          { label: "Tools", value: "Figma / FigJam · Coda · Storybook / GitHub" },
          { label: "Scope", value: "Mobile & Web · Foundations · Components · Adoption" },
        ]}
        navSections={NAV}
        navAccentColor="#6CDB8C"
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <OportunDsChallengeSection />
          <OportunDsApproachSection />
          <OportunDsStrategySection />
          <OportunDsRoadmapSection />
          <OportunDsFoundationsSection />
          <OportunDsComponentsSection />
          <OportunDsProductSection />
          <OportunDsResultsSection />
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
