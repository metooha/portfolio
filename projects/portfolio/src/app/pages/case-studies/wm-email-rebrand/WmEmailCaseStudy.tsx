import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import imgMockup from "@/app/assets/pages/case-study/wm-email-rebrand/mockup-min.png";
import {
  WmEmailApproachSection,
  WmEmailCompetitiveSection,
  WmEmailContextSection,
  WmEmailDesignSystemSection,
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
  { label: "Design system", href: "#design-system" },
  { label: "Final designs", href: "#final-designs" },
  { label: "Results & impact", href: "#results" },
  { label: "Next steps", href: "#next-steps" },
  { label: "Reflections", href: "#reflection" },
] as const;

const ACCENT = "#006B38";

function WmEmailHero() {
  return (
    <CaseStudyHero
      image={imgMockup}
      title={"Redesigning WM email from\nfragmented sends to a modular system"}
      subtitle="How I led a collaborative rebranding of Waste Management's email program — defining purpose, audience strategy, and a 50+ block design system that made every email feel like WM."
      titleColor="#ffffff"
      imageFit="cover"
      imageClassName="opacity-25"
      backgroundColor={ACCENT}
      className="max-w-[2048px] mx-auto"
    />
  );
}

const OVERVIEW_TITLE = "From fragmented sends to a modular digital system, built for scale.";
const OVERVIEW_DESCRIPTION =
  "The Email Marketing team led the initial rebranding efforts in collaboration with the Digital Studio and the Brand Team. The goal: consolidate the email process by defining purpose, audience, and strategy — to increase engagement and traffic to wm.com.";
const OVERVIEW_META = [
  { label: "My Role", value: "Lead Product Designer, w/ team of 4" },
  { label: "Project Scope", value: "50+ Blocks · Documentation · Style Guide" },
  { label: "Tools", value: "Sketch · Salesforce CRM · Invision DSM / Prototyping" },
  { label: "Platform", value: "Salesforce Marketing Cloud (SFMC)" },
] as const;

export default function WmEmailCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("9");

  return (
    <div data-ld-theme="WM" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<WmEmailHero />}
        overviewClient="Waste Management"
        overviewCategory="Email Design System, SFMC"
        overviewTitle={OVERVIEW_TITLE}
        overviewDescription={OVERVIEW_DESCRIPTION}
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
          <WmEmailDesignSystemSection />
          <WmEmailFinalDesignsSection />
          <WmEmailResultsSection />
          <WmEmailNextStepsSection />
          <WmEmailReflectionSection />
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
