import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import { Icon } from "@/app/components/Icons/Icons";
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

/** Gradient panel standing in for a screenshot, used as both the hero background and the home-card thumbnail. */
export function UcUiKitHero() {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #001e60 0%, #0053e2 100%)" }}
    >
      <div
        className="absolute -right-16 -top-16 rounded-full opacity-20"
        style={{ width: 260, height: 260, background: "#ffc220" }}
        aria-hidden="true"
      />
      <div
        className="absolute -left-10 -bottom-16 rounded-full opacity-10"
        style={{ width: 220, height: 220, background: "#4ebdf5" }}
        aria-hidden="true"
      />
      <span className="relative" style={{ color: "#ffc220" }}>
        <Icon name="Chat" size="large" decorative style={{ fontSize: "56px" }} />
      </span>
    </div>
  );
}

const HERO_TITLE = "One system, many teams.";
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
        hero={<CaseStudyHero background={<UcUiKitHero />} title={HERO_TITLE} titleColor="#ffffff" backgroundColor="#001e60" />}
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
