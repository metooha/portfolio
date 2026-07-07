import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getAdjacentCaseStudies } from "@/app/data/case-studies-config";
import XenseHero from "@/app/components/case-studies/heroes/XenseHero";
import { CaseStudyXenseContent } from "./CaseStudyXenseContent";

const NAV_SECTIONS = [
  { label: "Overview", href: "#overview" },
  { label: "The Challenge", href: "#challenge" },
  { label: "The Solution", href: "#solution" },
  { label: "Impact", href: "#impact" },
] as const;

const OVERVIEW_TITLE = "Xense Biotech";
const OVERVIEW_DESCRIPTION =
  "Xense Biotech is a leading company in the medical imaging industry, specializing in advanced x-ray technology. Their flagship product, uTomoTM, is a groundbreaking image acquisition and reconstruction system that enhances diagnostic capabilities. I was tasked with designing a comprehensive UI kit to support their software platform and establish a cohesive visual language.";

export default function XenseCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("3");

  return (
    <div data-ld-theme="Xense" style={{ display: "contents" }}>
      <CaseStudyTemplate
        hero={
          <div className="relative w-full shrink-0 overflow-hidden" id="hero">
            <div
              className="h-[60vh] min-h-[400px] flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(to bottom right, var(--ld-semantic-color-background, #2b2b2b), var(--ld-semantic-color-surface, #1f1f1f))",
              }}
            >
              <div className="w-full h-full">
                <XenseHero />
              </div>
            </div>
          </div>
        }
        overviewTitle={OVERVIEW_TITLE}
        overviewDescription={OVERVIEW_DESCRIPTION}
        metaItems={[
          { label: "Role", value: "UI/UX Designer" },
          { label: "Industry", value: "Medical Imaging & Biotech" },
          { label: "Tags", value: "Desktop, Biotech, UI Kit" },
          { label: "Focus", value: "Medical software interface design system" },
        ]}
        navSections={[...NAV_SECTIONS]}
        navAccentColor="#17d3b9"
        prevProject={prevProject}
        nextProject={nextProject}
      >
        <CaseStudyXenseContent />
      </CaseStudyTemplate>
    </div>
  );
}
