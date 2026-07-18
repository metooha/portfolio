
import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import imgWmEmailCover from "@/app/assets/pages/case-study/wm-email-rebrand/coverpreview-card.jpg";
import imgWmLogo from "@/app/assets/pages/case-study/wm-email-rebrand/wm-logo.png";
import {
  WmEmailApproachSection,
  WmEmailCompetitiveSection,
  WmEmailContextSection,
  WmEmailDesignSystemSection,
  WmEmailExamplesSection,
  WmEmailFinalDesignsSection,
  WmEmailNextStepsSection,
  WmEmailReflectionSection,
  WmEmailResearchSection,
  WmEmailResultsSection,
} from "./WmEmailSections";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "Context", href: "#context" },
  { label: "The approach", href: "#approach" },
  { label: "Research & audit", href: "#research" },
  { label: "Competitive analysis", href: "#competitive" },
  { label: "Final designs", href: "#final-designs" },
  { label: "Design system", href: "#design-system" },
  { label: "Email examples", href: "#examples" },
  { label: "Results & impact", href: "#results" },
  { label: "Next steps", href: "#next-steps" },
  { label: "Reflections", href: "#reflection" },
] as const;

const ACCENT = "var(--ld-semantic-color-text-brand, #006937)";
const HERO_TITLE = "Fragmented sends.\nOne modular system.";

function WmEmailOverviewLogo() {
  return (
    <img
      alt=""
      className="block size-full object-cover"
      src={imgWmLogo}
      decoding="async"
    />
  );
}

function WmEmailHero() {
  return (
    <CaseStudyHero
      background={
        <div className="relative w-full h-full">
          <img
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={imgWmEmailCover}
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{ background: "var(--ld-primitive-color-transparentLight-50, rgba(255, 255, 255, 0.5))" }}
            aria-hidden="true"
          />
        </div>
      }
      title={HERO_TITLE}
      titleColor="var(--ld-semantic-color-fill-brand-bold, #003a14)"
      className="max-w-[2048px] mx-auto"
    />
  );
}

const OVERVIEW_TITLE =
  "An architecture, not a redesign: a modular block system built to scale past a single campaign.";
const OVERVIEW_DESCRIPTION =
  "WM had rebranded, but the inbox was still a patchwork of one-off templates. I led the design work to create an Email Tool Kit. This enabled every send to feel on-brand and scale without starting from scratch.";
const OVERVIEW_META = [
  { label: "My Role", value: "Lead Product Designer" },
  { label: "My Team", value: "1 UX Researcher1 Designer, 1 Content Writer 2 Sales Force Engineers" },
  { label: "Project Scope", value: "50+ Blocks · Documentation · Style Guide" },
  { label: "Tools", value: "Sketch · Salesforce CRM · Invision DSM / Prototyping" },
  { label: "Platform", value: "Salesforce Marketing Cloud" },
] as const;

export default function WmEmailCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("9");

  return (
    <div data-ld-theme="WM" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<WmEmailHero />}
        overviewLogo={<WmEmailOverviewLogo />}
        overviewClient="Waste Management"
        overviewCategory="Email Design System"
        overviewTitle={OVERVIEW_TITLE}
        overviewDescription={OVERVIEW_DESCRIPTION}
        overviewDescriptionColor="subtlest"
        metaItems={[...OVERVIEW_META]}
        navSections={NAV}
        navAccentColor={ACCENT}
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <WmEmailContextSection />
          <WmEmailApproachSection />
          <WmEmailResearchSection />
          <WmEmailCompetitiveSection />
          <WmEmailFinalDesignsSection />
          <WmEmailDesignSystemSection />
          <WmEmailExamplesSection />
          <WmEmailResultsSection />
          <WmEmailNextStepsSection />
          <WmEmailReflectionSection />
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
