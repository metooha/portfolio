import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import imgCover from "@/app/assets/pages/case-study/everyday-sans/cover.jpg";
import imgLogo from "@/app/assets/pages/case-study/everyday-sans/logo.png";
import {
  EdsAccessibilityResearchSection,
  EdsClosingSection,
  EdsFontCompareSection,
  EdsJourneySection,
  EdsLanguageSection,
  EdsOutcomeSection,
  EdsProblemSpaceSection,
  EdsQuoteSection,
  EdsRealPageTestingSection,
  EdsSamsSansSection,
  EdsTechnicalFixesSection,
  EdsTypeRampSection,
  EdsWeightScaleSection,
  EdsWhatsNextSection,
} from "./EdsCaseStudySections";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "The compromise", href: "#tension" },
  { label: "Weight scale", href: "#weight-scale" },
  { label: "The journey", href: "#journey" },
  { label: "Type ramp", href: "#type-ramp" },
  { label: "Technical fixes", href: "#technical-fixes" },
  { label: "Real-page testing", href: "#real-page-testing" },
  { label: "User testing", href: "#user-testing" },
  { label: "Outcome", href: "#outcome" },
  { label: "What's next", href: "#whats-next" },
];

function EverydaySansHero() {
  return (
    <CaseStudyHero
      image={imgCover}
      title="Everyday Sans UI"
      titleColor="#ffffff"
    />
  );
}

function EverydaySansOverviewLogo() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "var(--ld-semantic-color-fill, #ffffff)" }}
    >
      <img alt="" className="size-full object-cover" src={imgLogo} />
    </div>
  );
}

export default function EverydaySansCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("5");

  return (
    <div data-ld-theme="Walmart" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<EverydaySansHero />}
        overviewLogo={<EverydaySansOverviewLogo />}
        overviewClient="Walmart"
        overviewCategory="Living Design, Typography"
        overviewTitle="Brand and performance, without compromise"
        overviewDescription="Every new font weight came with a performance cost. So Brand held back. The result was visual hierarchy that never reached its potential, and a design system that had to make peace with compromise. The variable font ended that trade-off — permanently."
        metaItems={[
          { label: "Role", value: "Principal Designer, Living Design" },
          { label: "Timeline", value: "Jun 2024 – Dec 2025" },
          { label: "Scope", value: "Web, iOS, Android, React Native" },
          { label: "Foundry", value: "Commercial Type" },
        ]}
        navSections={NAV}
        navAccentColor="#0053e2"
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <EdsProblemSpaceSection />
          <EdsWeightScaleSection />
          <EdsJourneySection />
          <EdsTypeRampSection />
          <EdsTechnicalFixesSection />
          <EdsRealPageTestingSection />
          <EdsAccessibilityResearchSection />
          <EdsLanguageSection />
          <EdsOutcomeSection />
          <EdsQuoteSection />
          <EdsWhatsNextSection />
          <EdsSamsSansSection />
          <EdsFontCompareSection />
        </div>
        <EdsClosingSection />
      </CaseStudyTemplate>
    </div>
  );
}
