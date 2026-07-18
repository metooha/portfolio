import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import imgCover from "@/app/assets/pages/case-study/academy-sports/hero-cover.jpg";
import imgLogo from "@/app/assets/pages/case-study/academy-sports/logo.png";
import {
  AcademyChallengeSection,
  AcademySolutionSection,
  AcademyImpactSection,
} from "./AcademySections";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "The Challenge", href: "#challenge" },
  { label: "The Solution", href: "#solution" },
  { label: "Impact", href: "#impact" },
] as const;

const ACCENT = "#0055A6";

function AcademyHero() {
  return (
    <CaseStudyHero
      image={imgCover}
      title="Unifying brand identity across sports categories through visual storytelling"
      titleColor="#ffffff"
      backgroundColor="#1a1a1a"
      className="max-w-[2048px] mx-auto"
    />
  );
}

const OVERVIEW_TITLE = "Art direction that unifies brand voice across distinct sporting communities.";
const OVERVIEW_DESCRIPTION =
  "As art director, I stewarded Academy's quarterly catalog program across six major sporting categories. Each campaign required balancing a cohesive brand identity with authentic visual language unique to golf, fishing, hunting, and athletics. From strategic direction through print production, I ensured every catalog spoke to enthusiasts in their sport's visual dialect while reinforcing Academy's position as a trusted partner across all communities.";
const OVERVIEW_META = [
  { label: "Role", value: "Art Director, Brand Strategist" },
  { label: "Scope", value: "Quarterly catalog program across 6 sport categories" },
  { label: "Categories", value: "Golf, Fishing (fresh & saltwater), Hunting, Athletics" },
  { label: "Focus", value: "Brand voice, visual identity systems, community-authentic storytelling" },
] as const;

export default function AcademyCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("11");

  return (
    <div data-ld-theme="Portfolio" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<AcademyHero />}
        overviewLogo={<img src={imgLogo} alt="Academy Sports + Outdoors logo" className="w-full h-full object-contain" />}
        overviewClient="Academy Sports + Outdoors"
        overviewCategory="Print Design, Brand Campaigns"
        overviewTitle={OVERVIEW_TITLE}
        overviewDescription={OVERVIEW_DESCRIPTION}
        metaItems={[...OVERVIEW_META]}
        navSections={NAV}
        navAccentColor={ACCENT}
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <AcademyChallengeSection />
          <AcademySolutionSection />
          <AcademyImpactSection />
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
