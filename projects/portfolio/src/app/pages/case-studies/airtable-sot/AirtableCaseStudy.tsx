import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import { imgAirtableCoverSource, imgAirtableLogo } from "@/app/assets/pages/case-study/airtable-sot/assets";
import {
  AirtableArchitectureSection,
  AirtableBridgeSection,
  AirtableHumanCostSection,
  AirtableResultsSection,
  AirtableSituationSection,
  AirtableTheWorkSection,
  AirtableWhatsNextSection,
} from "./AirtableCaseStudySections";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "Problem space", href: "#situation" },
  { label: "Human cost", href: "#human-cost" },
  { label: "The bridge", href: "#bridge" },
  { label: "The work", href: "#the-work" },
  { label: "Architecture", href: "#architecture" },
  { label: "Results", href: "#results" },
  { label: "What's next", href: "#whats-next" },
];

function AirtableHero() {
  return (
    <CaseStudyHero
      image={imgAirtableCoverSource}
      title="17 themes."
      subtitle="One design language."
      titleColor="#001e60"
      imageWidth={2048}
      imageHeight={1024}
      aspectRatio="2 / 1"
      imageFit="cover"
      imageClassName="opacity-20"
      backgroundColor="#e8f2fa"
      className="max-w-[2048px] mx-auto"
    />
  );
}

function AirtableOverviewLogo() {
  return (
    <div
      className="absolute inset-0 overflow-hidden flex items-center justify-center"
      style={{ background: "var(--ld-semantic-color-fill, #ffffff)" }}
    >
      <img alt="" className="size-12 object-contain" src={imgAirtableLogo} />
    </div>
  );
}

export default function AirtableCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("3");

  return (
    <div data-ld-theme="Walmart" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<AirtableHero />}
        overviewLogo={<AirtableOverviewLogo />}
        overviewClient="Walmart"
        overviewCategory="Design Tokens"
        overviewTitle={"The Quest for a\nSingle Source of Truth"}
        overviewDescription="17+ teams were maintaining their own copies of design tokens manually, inconsistently, and constantly out of sync. I proposed a single automated pipeline as the fix and presented the plan to engineering leadership to secure approval and the support to build it, then extended that support into Figma and our design system kits. The result: a designer updates a value in Airtable and it's live in production in 10 minutes. Zero manual steps. Zero coordination. Zero errors."
        metaItems={[
          { label: "Role", value: "Principal Product Designer" },
          { label: "Team", value: "Partnered with product, engineering, design leadership" },
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
          <AirtableBridgeSection />
          <AirtableTheWorkSection />
          <AirtableArchitectureSection />
          <AirtableResultsSection />
          <AirtableWhatsNextSection />
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
