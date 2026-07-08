import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import { WmCaseStudyHero, WmOverviewLogo } from "./sections/WmCaseStudyHero";
import { WmCaseStudyVisualGrid } from "./sections/WmCaseStudyVisualGrid";
import { WmCaseStudyProblemSpaceSection } from "./sections/WmCaseStudyProblemSpaceSection";
import { WmCaseStudyApproachSection } from "./sections/WmCaseStudyApproachSection";
import { WmCaseStudyInformationArchitectureSection } from "./sections/WmCaseStudyInformationArchitectureSection";
import { WmCaseStudyComparisonSection } from "./sections/WmCaseStudyComparisonSection";
import { WmCaseStudyCompromisesSection } from "./sections/WmCaseStudyCompromisesSection";
import { WmCaseStudyClosingSection } from "./sections/WmCaseStudyClosingSection";

const WM_NAV_SECTIONS = [
  { label: "Overview", href: "#overview" },
  { label: "Problem Space", href: "#problem-space" },
  { label: "Our Goals", href: "#our-goals" },
  { label: "Approach", href: "#approach" },
  { label: "System Audit", href: "#system-audit" },
  { label: "Information Architecture", href: "#information-architecture" },
  { label: "Compromises", href: "#compromises" },
];

const SECTION_LAYOUT =
  "content-stretch flex flex-1 flex-col gap-12 md:gap-16 lg:gap-[80px] items-stretch min-h-px w-full max-w-full min-w-0 relative";

export default function WmDesignSystemCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("7");

  return (
    // Scope the Living Design "WM" theme to this case study. `display:
    // contents` carries the data-ld-theme attribute (so --ld-* tokens resolve
    // to the WM greens for any Living Design components rendered inside) without
    // adding a layout box, keeping the existing Figma layout untouched.
    <div data-ld-theme="WM" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={<WmCaseStudyHero />}
        overviewLogo={<WmOverviewLogo />}
        overviewClient="Waste Management"
        overviewCategory="Design Systems, Branding"
        overviewTitle="Designing a scalable system for a digital rebrand"
        overviewDescription="In 2021, Waste Management launched a company-wide rebrand alongside a broader digital transformation focused on improving customer self-service. I worked with the branding agency and led the systems work behind the rebrand, treating it as an opportunity to establish shared UX infrastructure rather than redesign individual pages."
        metaItems={[
          { label: "Role", value: "Principal Product Designer" },
          { label: "Team", value: "Partnered with product, engineering, and brand leadership" },
          { label: "Scope", value: "Company-wide rebrand across web platforms" },
          { label: "Focus", value: "Platform UX patterns, information architecture, and shared systems" },
        ]}
        navSections={WM_NAV_SECTIONS}
        navAccentColor="#207442"
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <div className="relative shrink-0 w-full overflow-x-hidden">
          <div className="flex flex-row items-stretch justify-center w-full">
            <div className="content-stretch flex flex-col items-stretch w-full max-w-[1660px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px] relative">
              <div className={SECTION_LAYOUT}>
                <WmCaseStudyVisualGrid />
                <WmCaseStudyProblemSpaceSection />
                <WmCaseStudyApproachSection />
                <WmCaseStudyInformationArchitectureSection />
                <WmCaseStudyComparisonSection />
                <WmCaseStudyCompromisesSection />
                <WmCaseStudyClosingSection />
              </div>
            </div>
          </div>
        </div>
      </CaseStudyTemplate>
    </div>
  );
}
