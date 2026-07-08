import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import imgCover from "@/app/assets/pages/case-study/oportun-ds/cover.jpg";
import imgLogo from "@/app/assets/pages/case-study/oportun-ds/logo.png";
import { OportunDsOverview } from "./OportunDsCaseStudyVisuals";
import { EdsQuoteBlock } from "../everyday-sans/EdsCaseStudyPrimitives";
import {
  OportunDsApproachSection,
  OportunDsChallengeSection,
  OportunDsComponentLifeCycleSection,
  OportunDsDecisionsSection,
  OportunDsGovernanceSection,
  OportunDsInActionSection,
  OportunDsPipelineSection,
  OportunDsResultsSection,
  OportunDsTokenArchitectureSection,
} from "./OportunDsCaseStudySections";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "The challenge", href: "#challenge" },
  { label: "The approach", href: "#approach" },
  { label: "Token architecture", href: "#tokens" },
  { label: "Architecture decisions", href: "#decisions" },
  { label: "Component life cycle", href: "#component-life-cycle" },
  { label: "Design-to-code", href: "#pipeline" },
  { label: "Governance", href: "#governance" },
  { label: "In action", href: "#in-action" },
  { label: "Results", href: "#results" },
] as const;

const HERO_TITLE_COLOR = "#000000";
const PEACH_HERO = "#FFB08A";

function OportunDsHero() {
  return (
    <CaseStudyHero
      image={imgCover}
      title={"A Unified\nInfrastructure"}
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

const OVERVIEW_TITLE =
  "Architecting shared design infrastructure for two merged fintech brands, all while shipping product.";
const OVERVIEW_DESCRIPTION =
  "When Oportun acquired Digit in March 2022, the real challenge wasn't a rebrand. It was an infrastructure problem: architect a shared, token-based design system and 100+ components, and ship production product simultaneously, in six months.";
const OVERVIEW_META = [
  { label: "Role", value: "Principal Product Designer · Design Systems Architecture" },
  { label: "Scope", value: "Token infrastructure · Component library · Governance · Mobile & Web" },
  { label: "Team", value: "Partnered with design, engineering, product, and brand" },
  { label: "Timeline", value: "July 2022 – Jan 2023" },
  { label: "Focus", value: "Token architecture, theming, and adoption" },
] as const;

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
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("4");

  return (
    <div data-ld-theme="Oportun" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<OportunDsHero />}
        overviewTitle={OVERVIEW_TITLE}
        overviewDescription={OVERVIEW_DESCRIPTION}
        metaItems={[...OVERVIEW_META]}
        overviewContent={
          <OportunDsOverview
            logo={<OportunDsOverviewLogo />}
            client="Oportun / Digit"
            category="Design Systems Architecture"
            title={OVERVIEW_TITLE}
            description={OVERVIEW_DESCRIPTION}
            metaItems={[...OVERVIEW_META]}
          />
        }
        navSections={NAV}
        navAccentColor="#00C859"
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <OportunDsChallengeSection />
          <OportunDsApproachSection />
          <OportunDsTokenArchitectureSection />
          <OportunDsDecisionsSection />
          <OportunDsComponentLifeCycleSection />
          <OportunDsPipelineSection />
          <OportunDsGovernanceSection />
          <OportunDsInActionSection />
          <OportunDsResultsSection />
          
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
