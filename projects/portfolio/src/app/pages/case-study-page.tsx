import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { getCaseStudyById, getAdjacentCaseStudies } from "@/data/case-studies-config";
import WmDesignSystem2026 from "@/imports/WmDesignSystem2026";

function CaseStudyTemplatePage({ caseStudy }: { caseStudy: NonNullable<ReturnType<typeof getCaseStudyById>> }) {
  const { prev, next } = getAdjacentCaseStudies(caseStudy.id);

  const gradientClass =
    caseStudy.id === "2"
      ? "bg-gradient-to-br from-purple-50 to-indigo-50"
      : caseStudy.id === "3"
        ? "bg-gradient-to-br from-blue-50 to-cyan-50"
        : caseStudy.id === "4"
          ? "bg-gradient-to-br from-orange-50 to-red-50"
          : "";

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

  const ContentComponent = caseStudy.ContentComponent;

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

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (id === "1") {
    return <WmDesignSystem2026 />;
  }

  const caseStudy = getCaseStudyById(id);
  if (!caseStudy) {
    return <Navigate to="/" replace />;
  }

  return <CaseStudyTemplatePage caseStudy={caseStudy} />;
}
