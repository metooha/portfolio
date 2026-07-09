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
  /** Replaces the default overview block (logo, title, description, meta) when provided. */
  overviewContent?: React.ReactNode;
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
      className={`flex h-full min-h-0 w-full flex-col no-underline group ${
        isPrev ? "items-start text-left" : "items-end text-right"
      }`}
      style={{ gap: "var(--ld-semantic-spacing-200, 1rem)" }}
    >
      <div
        className={`flex shrink-0 items-center ${isPrev ? "justify-start" : "justify-end"}`}
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
        className="relative h-[200px] w-full shrink-0 overflow-hidden"
        style={{ borderRadius: "var(--ld-primitive-scale-border-radius-200, 1rem)" }}
      >
        <div className="absolute inset-0 [&_img]:block [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&>*]:h-full [&>*]:w-full">
          {project.image}
        </div>
      </div>
      <div
        className={`flex w-full flex-1 flex-col ${isPrev ? "items-start" : "items-end"}`}
        style={{ gap: "var(--ld-semantic-spacing-150, 0.75rem)" }}
      >
        <div
          className="relative size-12 shrink-0 overflow-hidden"
          style={{ borderRadius: "var(--ld-primitive-scale-border-radius-200, 1rem)" }}
        >
          <img src={project.thumbnail} alt="" className="h-full w-full object-cover" />
        </div>
        <div
          className={`flex w-full flex-col ${isPrev ? "items-start" : "items-end"}`}
          style={{ gap: "var(--ld-semantic-spacing-100, 0.5rem)" }}
        >
          <Heading
            as="p"
            size="medium"
            weight="default"
            UNSAFE_className={`relative shrink-0 ${isPrev ? "text-left" : "text-right"}`}
          >
            {project.title}
          </Heading>
          <Body
            as="p"
            size="medium"
            color="subtle"
            UNSAFE_className={`w-full whitespace-pre-wrap ${isPrev ? "text-left" : "text-right"}`}
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
  overviewContent,
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
            // Fixed, scroll-reveal Footer overlays page content rather than pushing it up,
            // so this needs to clear the footer's tallest (mobile, stacked) rendered height.
            paddingBottom: "max(var(--ld-semantic-spacing-1000, 5rem), 10rem)",
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
              <div className="w-full max-w-[1660px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px]">
                <div
                  className="content-stretch flex flex-1 flex-col items-start min-h-px min-w-0 w-full max-w-[1300px] pt-8 md:pt-16 lg:pt-0 relative"
                  style={{ gap: "var(--ld-semantic-spacing-400, 2rem)" }}
                >
                  {overviewContent ?? (
                    <>
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
                              style={{ gap: 0 }}
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
                        UNSAFE_className="relative shrink-0 w-full max-w-[1300px] whitespace-pre-line"
                      >
                        {overviewTitle}
                      </PageTitleText>
                      <Body as="p" size="large" UNSAFE_className="max-w-[1300px] relative shrink-0 w-full">
                        {overviewDescription}
                      </Body>
                      <CaseStudyMeta items={metaItems} />
                    </>
                  )}
                </div>
              </div>
            </div>

            {children}

            {(prevProject || nextProject) && (
              <div className="relative w-full shrink-0">
                <div className="relative mx-auto w-full max-w-[1660px] px-4 sm:px-6 md:px-12 lg:px-[68px]">
                  <div
                    className="grid w-full grid-cols-1 items-stretch md:grid-cols-2"
                    style={{ gap: "var(--ld-semantic-spacing-300, 1.5rem)" }}
                  >
                    {prevProject ? <NavCard direction="prev" project={prevProject} /> : <div />}
                    {nextProject ? <NavCard direction="next" project={nextProject} /> : <div />}
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
