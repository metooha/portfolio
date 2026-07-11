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
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("2");

  return (
    <div data-ld-theme="Walmart" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<EverydaySansHero />}
        overviewLogo={<EverydaySansOverviewLogo />}
        overviewClient="Walmart"
        overviewCategory="Core Design System, Typography"
        overviewTitle={"Brand and performance,\nwithout compromise"}
        overviewDescription="When Brand asked for a new weight and Engineering said no on performance grounds, I proposed a variable font as the fix and made the case to Brand to fund it. That decision reframed the work as a platform tradeoff across Brand, Engineering, Accessibility, and the foundry, and I defined the audit framework and cross-platform spec that made the variable font safe to ship."
        metaItems={[
          { label: "Role", value: "Principal Designer, Core Design System" },
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
