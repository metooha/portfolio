import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getCaseStudyById, getAdjacentCaseStudies, isCaseStudyPublished } from "@/app/data/case-studies-config";

/** Scroll to top when navigating to a case study (so user lands at top of page). */
function useScrollToTopOnCaseStudy() {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);
}

function CaseStudyTemplatePage({ caseStudy }: { caseStudy: NonNullable<ReturnType<typeof getCaseStudyById>> }) {
  const { prev, next } = getAdjacentCaseStudies(caseStudy.id);
  const gradientClass = caseStudy.heroGradientClass ?? "";

  const hero =
    caseStudy.heroType === "image" && caseStudy.heroImage ? (
      <div className="relative w-full shrink-0 overflow-hidden" id="hero">
        <div className={`h-[60vh] min-h-[400px] flex items-center justify-center ${gradientClass}`}>
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    ) : caseStudy.HeroComponent ? (
      <div className="relative w-full shrink-0 overflow-hidden" id="hero">
        <div className={`h-[60vh] min-h-[400px] flex items-center justify-center ${gradientClass}`}>
          <div className="w-full h-full">
            <caseStudy.HeroComponent />
          </div>
        </div>
      </div>
    ) : null;

  const ContentComponent = caseStudy.ContentComponent ?? (() => null);

  return (
    <CaseStudyTemplate
      hero={hero!}
      overviewTitle={caseStudy.title}
      overviewDescription={caseStudy.fullDescription}
      metaItems={caseStudy.metaItems}
      navSections={caseStudy.navSections}
      navAccentColor={caseStudy.navAccentColor}
      prevProject={prev}
      nextProject={next}
    >
      <ContentComponent />
    </CaseStudyTemplate>
  );
}

export function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();

  useScrollToTopOnCaseStudy();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const caseStudy = getCaseStudyById(id);
  if (!caseStudy) {
    return <Navigate to="/" replace />;
  }

  if (!isCaseStudyPublished(id)) {
    return <Navigate to="/" replace />;
  }

  if (caseStudy.PageComponent) {
    const PageComponent = caseStudy.PageComponent;
    return <PageComponent />;
  }

  return <CaseStudyTemplatePage caseStudy={caseStudy} />;
}
