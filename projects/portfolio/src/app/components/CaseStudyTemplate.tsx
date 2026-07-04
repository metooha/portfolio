import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/app/components/Button/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/app/components/Icons/Icons";
import { CaseStudyPageNav } from "@/app/components/CaseStudyPageNav";
import { CaseStudyMeta } from "@/app/components/CaseStudyMeta";
import { PageTitleText } from "@/app/components/CaseStudyText/CaseStudyText";
import { Body, Heading } from "@/app/components/Text/Text";
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

const sectionStackStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--ld-semantic-spacing-section-gap-large, var(--ld-primitive-scale-space-500, 2.5rem))",
};

const pageSurfaceStyle: React.CSSProperties = {
  background: "var(--ld-semantic-color-fill, #ffffff)",
};

const subtleIconColor = "var(--ld-semantic-color-text-subtle, #515357)";

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
      className={`content-stretch flex flex-[1_0_0] flex-col min-h-px min-w-px relative no-underline group ${
        isPrev ? "items-start" : "items-end"
      }`}
      style={{ gap: "var(--ld-semantic-spacing-200, 1rem)" }}
    >
      <div
        className="content-stretch flex items-center relative shrink-0"
        style={{ gap: "var(--ld-semantic-spacing-100, 0.5rem)" }}
      >
        {isPrev && (
          <ChevronLeftIcon size="small" decorative style={{ color: subtleIconColor }} />
        )}
        <Body as="p" size="medium" color="subtle" UNSAFE_className="relative shrink-0">
          {isPrev ? "Previous" : "Next"}
        </Body>
        {!isPrev && (
          <ChevronRightIcon size="small" decorative style={{ color: subtleIconColor }} />
        )}
      </div>
      <div
        className="content-stretch flex h-[200px] items-center relative shrink-0 w-full overflow-hidden"
        style={{ borderRadius: "var(--ld-primitive-scale-border-radius-200, 1rem)" }}
      >
        <div
          className="flex-[1_0_0] h-full min-h-px min-w-px overflow-hidden"
          style={{ borderRadius: "var(--ld-primitive-scale-border-radius-200, 1rem)" }}
        >
          {project.image}
        </div>
      </div>
      <div
        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
        style={{ gap: "var(--ld-semantic-spacing-150, 0.75rem)" }}
      >
        <div
          className="relative shrink-0 size-[48px] overflow-hidden"
          style={{ borderRadius: "var(--ld-primitive-scale-border-radius-200, 1rem)" }}
        >
          <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
        </div>
        <div
          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
          style={{ gap: "var(--ld-semantic-spacing-100, 0.5rem)" }}
        >
          <Heading as="p" size="medium" weight="default" UNSAFE_className="relative shrink-0">
            {project.title}
          </Heading>
          <Body
            as="p"
            size="medium"
            color="subtle"
            UNSAFE_className="min-w-full relative shrink-0 w-[min-content] whitespace-pre-wrap"
          >
            {project.description}
          </Body>
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
  navAccentColor = "var(--ld-semantic-color-text-positive, #207442)",
  prevProject,
  nextProject,
  children,
}: CaseStudyTemplateProps) {
  const [navVisible, setNavVisible] = useState(false);
  const [heroOffset, setHeroOffset] = useState(0);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const showNav = navSections.length > 0;

  useEffect(() => {
    const onScroll = () => {
      if (!heroContainerRef.current) return;
      const rect = heroContainerRef.current.getBoundingClientRect();
      const heroHeight = heroContainerRef.current.offsetHeight;
      const scrollProgress = Math.min(1, Math.max(0, -rect.top / (heroHeight * 0.8)));
      setHeroOffset(scrollProgress * heroHeight * 0.15);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden -my-12" style={pageSurfaceStyle}>
      <div className="w-full min-w-0">
        <div
          className="w-full max-w-full overflow-x-hidden flex flex-col items-center justify-center relative"
          style={{
            ...pageSurfaceStyle,
            ...sectionStackStyle,
            paddingBottom: "var(--ld-semantic-spacing-1000, 5rem)",
          }}
        >
          {showNav && (
            <CaseStudyPageNav
              sections={navSections}
              accentColor={navAccentColor}
              onVisibleChange={setNavVisible}
            />
          )}

          <div ref={heroContainerRef} className="relative w-full shrink-0 overflow-hidden">
            <div style={{ transform: `translateY(${-heroOffset}px)` }}>{hero}</div>
          </div>

          <div
            className="w-full flex flex-col items-center justify-center"
            style={{
              ...sectionStackStyle,
              paddingLeft: showNav && navVisible ? "240px" : "0px",
              transition: "padding-left 400ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div id="overview" className="relative shrink-0 w-full">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px]">
                <div
                  className="content-stretch flex flex-1 flex-col items-start min-h-px min-w-0 w-full max-w-4xl lg:max-w-[1046px] pt-8 md:pt-16 lg:pt-0 relative"
                  style={{ gap: "var(--ld-semantic-spacing-400, 2rem)" }}
                >
                  {(overviewLogo || overviewClient) && (
                    <div
                      className="content-stretch flex items-start relative shrink-0"
                      style={{ gap: "var(--ld-semantic-spacing-150, 0.75rem)" }}
                    >
                      {overviewLogo && (
                        <div
                          className="overflow-clip relative shrink-0 size-[48px]"
                          style={{ borderRadius: "var(--ld-primitive-scale-border-radius-200, 1rem)" }}
                        >
                          {overviewLogo}
                        </div>
                      )}
                      {(overviewClient || overviewCategory) && (
                        <div
                          className="content-stretch flex flex-col items-start relative shrink-0"
                          style={{ gap: "var(--ld-semantic-spacing-100, 0.5rem)" }}
                        >
                          {overviewClient && (
                            <Heading as="p" size="medium" weight="default" UNSAFE_className="relative shrink-0">
                              {overviewClient}
                            </Heading>
                          )}
                          {overviewCategory && (
                            <Body as="p" size="medium" color="subtle" UNSAFE_className="relative shrink-0">
                              {overviewCategory}
                            </Body>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  <PageTitleText
                    as="p"
                    UNSAFE_className="relative shrink-0 w-full max-w-[1200px]"
                  >
                    {overviewTitle}
                  </PageTitleText>
                  <Body as="p" size="large" UNSAFE_className="max-w-[1200px] relative shrink-0 w-full">
                    {overviewDescription}
                  </Body>
                  <CaseStudyMeta items={metaItems} />
                </div>
              </div>
            </div>

            {children}

            {(prevProject || nextProject) && (
              <div className="relative shrink-0 w-full">
                <div className="content-stretch flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px] relative">
                  <div
                    className="content-stretch flex items-center relative shrink-0 w-full"
                    style={{ gap: "var(--ld-semantic-spacing-300, 1.5rem)" }}
                  >
                    {prevProject ? <NavCard direction="prev" project={prevProject} /> : <div className="flex-[1_0_0]" />}
                    {nextProject && <NavCard direction="next" project={nextProject} />}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Link to="/" className="no-underline">
                <Button variant="primary" size="medium">
                  All Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
