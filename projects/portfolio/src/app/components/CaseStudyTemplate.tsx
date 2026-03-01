import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaseStudyPageNav } from "@/app/components/CaseStudyPageNav";
import { CaseStudyMeta } from "@/app/components/CaseStudyMeta";
import type { NavSection } from "@/app/components/CaseStudyPageNav";
import type { MetaItem } from "@/app/components/CaseStudyMeta";

export interface ProjectLink {
  path: string;
  title: string;
  description: string;
  image: React.ReactNode;
  thumbnail: string;
}

export interface CaseStudyTemplateProps {
  hero: React.ReactNode;
  overviewLogo?: React.ReactNode;
  overviewClient?: string;
  overviewCategory?: string;
  overviewTitle: string;
  overviewDescription: string;
  metaItems: MetaItem[];
  navSections?: NavSection[];
  navAccentColor?: string;
  prevProject?: ProjectLink;
  nextProject?: ProjectLink;
  children: React.ReactNode;
}

function NavCard({
  direction,
  project,
}: {
  direction: "prev" | "next";
  project: ProjectLink;
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      to={project.path}
      className={`content-stretch flex flex-[1_0_0] flex-col gap-[16px] min-h-px min-w-px relative no-underline group ${
        isPrev ? "items-start" : "items-end"
      }`}
    >
      <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
        {isPrev && (
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="shrink-0">
            <path d="M6 12l4-4-4-4" stroke="#4E4F4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#4e4f4e] text-[16px]">
          {isPrev ? "Previous" : "Next"}
        </p>
        {!isPrev && (
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="shrink-0">
            <path d="M10 4l4 4-4 4" stroke="#4E4F4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div className="content-stretch flex h-[200px] items-center relative shrink-0 w-full overflow-hidden rounded-[16px]">
        <div className="flex-[1_0_0] h-full min-h-px min-w-px rounded-[16px] overflow-hidden">
          {project.image}
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
        <div className="relative shrink-0 size-[48px] overflow-hidden rounded-[16px]">
          <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="content-stretch flex flex-col gap-[6px] items-start not-italic relative shrink-0 w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black">
            {project.title}
          </p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[#4e4f4e] text-[16px] w-[min-content] whitespace-pre-wrap">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function CaseStudyTemplate({
  hero,
  overviewLogo,
  overviewClient,
  overviewCategory,
  overviewTitle,
  overviewDescription,
  metaItems,
  navSections = [],
  navAccentColor = "#207442",
  prevProject,
  nextProject,
  children,
}: CaseStudyTemplateProps) {
  const [navVisible, setNavVisible] = useState(false);
  const showNav = navSections.length > 0;

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden -my-12">
      <div className="w-full min-w-0">
        <div className="bg-white w-full max-w-full overflow-x-hidden flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-[80px] items-center justify-center pb-12 md:pb-16 lg:pb-[100px] relative">
          {/* Slide-out nav */}
          {showNav && (
            <CaseStudyPageNav
              sections={navSections}
              accentColor={navAccentColor}
              onVisibleChange={setNavVisible}
            />
          )}

          {/* Hero */}
          {hero}

          {/* Main content with optional padding for nav */}
          <div
            className="w-full flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-[80px] items-center justify-center"
            style={{
              paddingLeft: showNav && navVisible ? "240px" : "0px",
              transition: "padding-left 400ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {/* Overview section */}
            <div id="overview" className="relative shrink-0 w-full">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px]">
                <div className="content-stretch flex flex-1 flex-col gap-6 md:gap-9 items-start min-h-px min-w-0 w-full max-w-4xl lg:max-w-[1046px] pt-8 md:pt-16 lg:pt-[100px] relative">
                  {(overviewLogo || overviewClient) && (
                    <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
                      {overviewLogo && (
                        <div className="overflow-clip relative rounded-[16px] shrink-0 size-[48px]">
                          {overviewLogo}
                        </div>
                      )}
                      {(overviewClient || overviewCategory) && (
                        <div className="content-stretch flex flex-col gap-[6px] h-[49px] items-start leading-[normal] not-italic relative shrink-0">
                          {overviewClient && (
                            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[20px] text-black">
                              {overviewClient}
                            </p>
                          )}
                          {overviewCategory && (
                            <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4e4f4e] text-[16px]">
                              {overviewCategory}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-tight md:leading-[1.2] not-italic relative shrink-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[84px] text-black w-full max-w-[1200px]">
                    {overviewTitle}
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-snug md:leading-[36px] max-w-[1200px] not-italic relative shrink-0 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[26px] text-black w-full">
                    {overviewDescription}
                  </p>
                  <CaseStudyMeta items={metaItems} />
                </div>
              </div>
            </div>

            {/* Main content (Challenge, Solution, custom sections, etc.) */}
            {children}

            {/* Prev / Next project navigation */}
            {(prevProject || nextProject) && (
              <div className="relative shrink-0 w-full">
                <div className="content-stretch flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px] relative">
                  <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
                    {prevProject ? (
                      <NavCard direction="prev" project={prevProject} />
                    ) : (
                      <div className="flex-[1_0_0]" />
                    )}
                    {nextProject && <NavCard direction="next" project={nextProject} />}
                  </div>
                </div>
              </div>
            )}

            {/* All Projects button */}
            <div className="flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#4F39F6] text-white rounded-full hover:bg-[#3d2bc4] transition-colors font-semibold w-fit shrink-0 no-underline"
              >
                All Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
