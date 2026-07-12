import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import { Logo } from "@/app/components/Logo/Logo";
import imgUcUiKitCover from "@/app/assets/pages/case-study/uc-uikit/Coverpreview.png";
import {
  ProblemSection,
  DefiningSection,
  ScopeSection,
  BuildingTeamSection,
  ProcessSection,
  GovernanceSection,
  ImpactSection,
  ClosingSection,
} from "./UcUiKitSections";

const ACCENT = "#0053e2";
const CASE_STUDY_ID = "12";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "The Problem", href: "#problem" },
  { label: "Defining the Work", href: "#defining" },
  { label: "The Scope", href: "#scope" },
  { label: "Building the Team", href: "#team" },
  { label: "The Process", href: "#process" },
  { label: "Governance", href: "#governance" },
  { label: "Impact", href: "#impact" },
  { label: "What's Next", href: "#next" },
] as const;

/** Full-bleed cover image used as both the case-study hero and the home-card thumbnail. */
export function UcUiKitHero() {
  return (
    <img
      alt=""
      className="block w-full h-full object-cover object-center"
      src={imgUcUiKitCover}
      decoding="async"
    />
  );
}

const HERO_TITLE = "A united kit for all";
const OVERVIEW_TITLE =
  "A conversational UI design system for Walmart, built across a platform migration and a market merger.";
const OVERVIEW_DESCRIPTION =
  "Product teams could no longer maintain their own chat UIs. Engineering and product brought the problem to design: define the system, build and mentor a contributor team, and hand it to the standing teams to maintain.";
const OVERVIEW_META = [
  { label: "Role", value: "Principal Product Designer" },
  { label: "Scope", value: "Strategy, Team, System, Governance" },
  { label: "Products", value: "Sparky (AI shopping assistant), Support chat, Associate tools" },
  { label: "Status", value: "In build, SDK shipping Q3/Q4" },
] as const;

export default function UcUiKitCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies(CASE_STUDY_ID);

  return (
    <div data-ld-theme="Walmart" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<CaseStudyHero background={<UcUiKitHero />} title={HERO_TITLE} titleColor="#001e60" backgroundColor="#001e60" />}
        overviewLogo={
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "#0053e2" }}
          >
            <Logo tenant="Walmart" size={26} a11yLabel="Walmart" />
          </div>
        }
        overviewClient="Walmart"
        overviewCategory="Conversational AI, Design Systems, Governance"
        overviewTitle={OVERVIEW_TITLE}
        overviewDescription={OVERVIEW_DESCRIPTION}
        metaItems={[...OVERVIEW_META]}
        navSections={NAV}
        navAccentColor={ACCENT}
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <ProblemSection />
          <DefiningSection />
          <ScopeSection />
          <BuildingTeamSection />
          <ProcessSection />
          <GovernanceSection />
          <ImpactSection />
          <ClosingSection />
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
