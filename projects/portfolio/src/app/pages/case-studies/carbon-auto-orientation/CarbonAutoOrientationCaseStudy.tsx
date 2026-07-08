import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import imgDesignEngine from "@/app/assets/pages/case-study/carbon/design-engine.jpg";
import imgLogo from "@/app/assets/pages/case-study/carbon/carbon-logo.png";
import {
  CarbonApproachSection,
  CarbonBeforeAfterSection,
  CarbonDecisionsSection,
  CarbonProblemStatementSection,
  CarbonProcessSection,
  CarbonReflectionSection,
  CarbonSuccessMetricsSection,
  CarbonTargetsSection,
  CarbonTensionSection,
  CarbonUserTestingSection,
  CarbonVideoWalkthroughSection,
} from "./CarbonAutoOrientationSections";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "Problem statement", href: "#problem" },
  { label: "Tension", href: "#tension" },
  { label: "The approach", href: "#approach" },
  { label: "The process", href: "#process" },
  { label: "Goals & targets", href: "#targets" },
  { label: "How we'll know it worked", href: "#success-metrics" },
  { label: "Product decisions", href: "#decisions" },
  { label: "See it in action", href: "#video" },
  { label: "User testing", href: "#user-testing" },
  { label: "Before & after", href: "#before-after" },
  { label: "Reflection", href: "#reflection" },
] as const;

const ACCENT = "#2a0eff";

function CarbonHero() {
  return (
    <CaseStudyHero
      background={
        <div className="relative w-full h-full">
          <img
            src={imgDesignEngine}
            alt=""
            className="absolute inset-0 block w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: "rgba(7,2,46,0.45)" }} />
        </div>
      }
      title={"Fast enough to trust.\nClear enough to choose."}
      titleColor="#ffffff"
      aspectRatio="2 / 1"
      curvedDivider
      className="w-full"
    />
  );
}

const OVERVIEW_TITLE = "Print success shouldn't require orientation expertise.";
const OVERVIEW_DESCRIPTION =
  "A resin-printing feature at Carbon, redesigned so a first-time user and a seasoned technician could both trust it, without one losing simplicity or the other losing control.";
const OVERVIEW_META = [
  { label: "Role", value: "Lead Product Designer" },
  { label: "Team", value: "1 UI engineer · 1 back-end engineer" },
  { label: "Scope", value: "Auto-Orientation 2.0: replacing Advanced Options with guided automation" },
  { label: "Tools", value: "Figma · Storybook · Confluence / Jira" },
] as const;

function CarbonOverviewLogo() {
  return (
    <div
      className="absolute inset-0 overflow-hidden flex items-center justify-center"
      style={{ background: "#000000" }}
    >
      <img alt="" className="size-full object-cover" src={imgLogo} />
    </div>
  );
}

export default function CarbonAutoOrientationCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("5");

  return (
    <div data-ld-theme="Carbon" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<CarbonHero />}
        overviewLogo={<CarbonOverviewLogo />}
        overviewClient="Carbon Inc."
        overviewCategory="Feature Design, Resin 3D Printing"
        overviewTitle={OVERVIEW_TITLE}
        overviewDescription={OVERVIEW_DESCRIPTION}
        metaItems={[...OVERVIEW_META]}
        navSections={NAV}
        navAccentColor={ACCENT}
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <CarbonProblemStatementSection />
          <CarbonTensionSection />
          <CarbonApproachSection />
          <CarbonProcessSection />
          <CarbonTargetsSection />
          <CarbonSuccessMetricsSection />
          <CarbonDecisionsSection />
          <CarbonVideoWalkthroughSection />
          <CarbonUserTestingSection />
          <CarbonBeforeAfterSection />
          <CarbonReflectionSection />
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
