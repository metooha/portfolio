import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import imgCover from "@/app/assets/pages/case-study/figma-to-code/optimized/cover.jpg";
import imgLogo from "@/app/assets/pages/case-study/everyday-sans/logo.png";
import {
  FigmaToCodeChangeSection,
  FigmaToCodeConferenceSection,
  FigmaToCodeConnectSection,
  FigmaToCodeDemandSection,
  FigmaToCodeDiscoverySection,
  FigmaToCodeFramingSection,
  FigmaToCodeKitSection,
  FigmaToCodeOperatingModelSection,
  FigmaToCodePipelineSection,
  FigmaToCodeProblemSection,
  FigmaToCodeProjectSection,
  FigmaToCodeProofSection,
  FigmaToCodeReflectionSection,
} from "./FigmaToCodeSections";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "The problem", href: "#problem" },
  { label: "Discovery", href: "#discovery" },
  { label: "Framing", href: "#framing" },
  { label: "Real project", href: "#project" },
  { label: "The kit", href: "#kit" },
  { label: "The proof", href: "#proof" },
  { label: "First pilot", href: "#connect" },
  { label: "Going wide", href: "#conference" },
  { label: "The demand", href: "#demand" },
  { label: "Operating model", href: "#operating-model" },
  { label: "The pipeline", href: "#pipeline" },
  { label: "The change", href: "#change" },
  { label: "Reflection", href: "#reflection" },
] as const;

const ACCENT = "#0053e2";

function FigmaToCodeHero() {
  return (
    <CaseStudyHero
      image={imgCover}
      title={"Building the\nBridge."}
      titleColor="#ffffff"
      imageWidth={1800}
      imageHeight={470}
      aspectRatio="2.2 / 1"
      imageFit="cover"
      imageClassName="opacity-25"
      backgroundColor={ACCENT}
      className="max-w-[2048px] mx-auto"
    />
  );
}

const OVERVIEW_TITLE = "A pipeline that turns Figma specs into pull requests, not reinterpretations.";
const OVERVIEW_DESCRIPTION =
  "The design is done: every token, spacing value, and state already defined in Figma. Then it gets rebuilt by hand in code, thousands of times a year. I framed the opportunity, secured the discovery partnership, defined the component lifecycle, and turned a one-component test into an org-wide pilot with real adoption demand.";
const OVERVIEW_META = [
  { label: "Role", value: "Principal UX Designer" },
  { label: "Platform", value: "Builder.io · Core Design System" },
  { label: "Timeline", value: "Mar 2025 – Jan 2026" },
  { label: "Focus", value: "AI-assisted design-to-code, component lifecycle, adoption model" },
] as const;

function FigmaToCodeOverviewLogo() {
  return (
    <div
      className="absolute inset-0 overflow-hidden flex items-center justify-center"
      style={{ background: ACCENT }}
    >
      <img alt="" className="size-8 object-contain" src={imgLogo} />
    </div>
  );
}

export default function FigmaToCodeCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("1");

  return (
    <div data-ld-theme="Walmart" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<FigmaToCodeHero />}
        overviewLogo={<FigmaToCodeOverviewLogo />}
        overviewClient="Walmart"
        overviewCategory="Core Design System, Builder.io, AI Tooling"
        overviewTitle={OVERVIEW_TITLE}
        overviewDescription={OVERVIEW_DESCRIPTION}
        metaItems={[...OVERVIEW_META]}
        navSections={NAV}
        navAccentColor={ACCENT}
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <FigmaToCodeProblemSection />
          <FigmaToCodeDiscoverySection />
          <FigmaToCodeFramingSection />
          <FigmaToCodeProjectSection />
          <FigmaToCodeKitSection />
          <FigmaToCodeProofSection />
          <FigmaToCodeConnectSection />
          <FigmaToCodeConferenceSection />
          <FigmaToCodeDemandSection />
          <FigmaToCodeOperatingModelSection />
          <FigmaToCodePipelineSection />
          <FigmaToCodeChangeSection />
          <FigmaToCodeReflectionSection />
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
