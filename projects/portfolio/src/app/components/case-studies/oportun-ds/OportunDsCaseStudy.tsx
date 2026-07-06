import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import imgCover from "@/app/assets/pages/case-study/oportun-ds/cover.jpg";
import imgLogo from "@/app/assets/pages/case-study/oportun-ds/logo.png";
import { OportunDsOverview } from "./OportunDsCaseStudyVisuals";
import {
  OportunDsApproachSection,
  OportunDsAssetLibrariesSection,
  OportunDsChallengeSection,
  OportunDsComponentLifeCycleSection,
  OportunDsDesignSystemSection,
  OportunDsFoundationsSection,
  OportunDsProductSection,
  OportunDsResultsSection,
  OportunDsRoadmapSection,
  OportunDsUsageExamplesSection,
} from "./OportunDsCaseStudySections";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "The challenge", href: "#challenge" },
  { label: "The approach", href: "#approach" },
  { label: "Roadmapping", href: "#roadmap" },
  { label: "Asset libraries", href: "#asset-libraries" },
  { label: "Foundations", href: "#foundations" },
  { label: "Component life cycle", href: "#component-life-cycle" },
  { label: "Usage examples", href: "#usage-examples" },
  { label: "Product work", href: "#product" },
  { label: "Results", href: "#results" },
  { label: "Design system", href: "#design-system" },
] as const;

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

const OVERVIEW_TITLE = "The mission to unify two distinct brands into a single language.";
const OVERVIEW_DESCRIPTION =
  "In March of 2022, Oportun acquired Digit and combined their borrowing and neobanking products. This meant a complete rebranding opportunity and redesigning Oportun's mobile app.";
const OVERVIEW_META = [
  { label: "Role", value: "Lead Product Designer, Design Systems" },
  { label: "Team", value: "Partnered with product, engineering, design leadership" },
  { label: "Timeline", value: "July 2022 – Jan 2023" },
  { label: "Scope", value: "Mobile & Web · Foundations · Components · Adoption" },
  { label: "Focus", value: "Token infrastructure, components, design language" },
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
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("7");

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
            category="Design System"
            title={OVERVIEW_TITLE}
            description={OVERVIEW_DESCRIPTION}
            metaItems={[...OVERVIEW_META]}
          />
        }
        navSections={NAV}
        navAccentColor="#6CDB8C"
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <OportunDsChallengeSection />
          <OportunDsApproachSection />
          <OportunDsRoadmapSection />
          <OportunDsAssetLibrariesSection />
          <OportunDsFoundationsSection />
          <OportunDsComponentLifeCycleSection />
          <OportunDsUsageExamplesSection />
          <OportunDsProductSection />
          <OportunDsResultsSection />
          <OportunDsDesignSystemSection />
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
