import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import imgCover from "@/app/assets/pages/case-study/breakout-network/cover.jpeg";
import imgLogo from "@/app/assets/pages/case-study/breakout-network/breakout-logo.png";
import {
  BreakoutApproachSection,
  BreakoutBrandSection,
  BreakoutChallengeSection,
  BreakoutGuidelinesSection,
  BreakoutInUseSection,
  BreakoutMarketingSection,
  BreakoutStrategySection,
  BreakoutVisualIdentitySection,
} from "./BreakoutNetworkSections";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "The challenge", href: "#challenge" },
  { label: "The approach", href: "#approach" },
  { label: "Defining the strategy", href: "#strategy" },
  { label: "Brand", href: "#brand" },
  { label: "Visual identity", href: "#visual-identity" },
  { label: "Brand guidelines", href: "#guidelines" },
  { label: "The brand in use", href: "#in-use" },
  { label: "Marketing", href: "#marketing" },
] as const;

const ACCENT = "#D0201C";

function BreakoutHero() {
  return (
    <CaseStudyHero
      image={imgCover}
      title={"A system as credible as its ambitions."}
      titleColor="#ffffff"
      imageClassName="grayscale opacity-60"
      backgroundColor="#141414"
      className="max-w-[2048px] mx-auto"
    />
  );
}

const OVERVIEW_TITLE = "A brand identity and set of guidelines built to bridge strategy and product design.";
const OVERVIEW_DESCRIPTION =
  "It needed more than a logo. It needed a brand system product teams could build from with confidence. The project defined the strategy, visual identity, and guidelines that closed that gap.";
const OVERVIEW_META = [
  { label: "Role", value: "Art Director/Brand Designer" },
  { label: "Project Scope", value: "Brand Guidelines" },
  { label: "Project Tools", value: "Figma/Adobe Creative Suite" },
  { label: "Timeline", value: "July 2022 – Aug 2022" },
] as const;

export default function BreakoutNetworkCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("5");

  return (
    <div data-ld-theme="Portfolio" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<BreakoutHero />}
        overviewLogo={<img src={imgLogo} alt="Breakout Athletic Network logo" className="w-full h-full object-cover" />}
        overviewClient="Breakout Athletic Network"
        overviewCategory="Brand Identity, Guidelines"
        overviewTitle={OVERVIEW_TITLE}
        overviewDescription={OVERVIEW_DESCRIPTION}
        metaItems={[...OVERVIEW_META]}
        navSections={NAV}
        navAccentColor={ACCENT}
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <BreakoutChallengeSection />
          <BreakoutApproachSection />
          <BreakoutStrategySection />
          <BreakoutBrandSection />
          <BreakoutVisualIdentitySection />
          <BreakoutGuidelinesSection />
          <BreakoutInUseSection />
          <BreakoutMarketingSection />
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
