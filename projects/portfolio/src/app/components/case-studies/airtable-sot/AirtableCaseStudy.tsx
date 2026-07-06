import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import imgCover from "@/app/assets/pages/case-study/airtable-sot/cover.png";
import imgLogo from "@/app/assets/pages/case-study/everyday-sans/logo.png";
import {
  AirtableClosingSection,
  AirtableHumanCostSection,
  AirtablePipelineSection,
  AirtableQuoteSection,
  AirtableResultsSection,
  AirtableSituationSection,
  AirtableThemeHierarchySection,
  AirtableTheWorkSection,
} from "./AirtableCaseStudySections";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "Situation", href: "#situation" },
  { label: "Human cost", href: "#human-cost" },
  { label: "The work", href: "#the-work" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Theme hierarchy", href: "#theme-hierarchy" },
  { label: "Results", href: "#results" },
];

function AirtableHero() {
  return (
    <CaseStudyHero
      image={imgCover}
      imageWidth={1024}
      imageHeight={603}
      aspectRatio="1024 / 603"
      imageFit="fill"
      className="max-w-[1024px] mx-auto"
    />
  );
}

function AirtableOverviewLogo() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "var(--ld-semantic-color-fill, #ffffff)" }}
    >
      <img alt="" className="size-full object-cover" src={imgLogo} />
    </div>
  );
}

export default function AirtableCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("6");

  return (
    <div data-ld-theme="Walmart" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<AirtableHero />}
        overviewLogo={<AirtableOverviewLogo />}
        overviewClient="Walmart"
        overviewCategory="Living Design, Design Tokens"
        overviewTitle="Airtable as Source of Truth"
        overviewDescription="We went from 17+ teams maintaining their own copies of design tokens — manually, inconsistently, and constantly out of sync — to a single automated pipeline where a designer updates a value in Airtable and it's live in production in 10 minutes. Zero manual steps. Zero coordination. Zero errors."
        metaItems={[
          { label: "Role", value: "Lead Designer, Living Design" },
          { label: "Timeline", value: "Aug 2024 – Nov 2025" },
          { label: "Scope", value: "17 brand themes · iOS · Android · Web" },
          { label: "Focus", value: "Token infrastructure, automation, theme hierarchy" },
        ]}
        navSections={NAV}
        navAccentColor="#0053e2"
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <AirtableSituationSection />
          <AirtableHumanCostSection />
          <AirtableTheWorkSection />
          <AirtablePipelineSection />
          <AirtableThemeHierarchySection />
          <AirtableResultsSection />
          <AirtableQuoteSection />
          <AirtableClosingSection />
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
