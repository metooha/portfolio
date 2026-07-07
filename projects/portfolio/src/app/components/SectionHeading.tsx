import React from "react";
import { Body, Heading, type HeadingSize, type HeadingWeight } from "@/app/components/Text/Text";
import { CaseStudyBadge, type CaseStudyBadgeColor } from "@/app/components/CaseStudyText/CaseStudyText";

type BadgeColor = CaseStudyBadgeColor | "none";
type Layout = "horizontal" | "vertical";
type TitleSize = "xl" | "lg" | "md" | "sm";

interface SectionHeadingProps {
  /** Optional numbered/lettered badge (e.g. "1.0", "A", "1") */
  badge?: string;
  badgeColor?: BadgeColor;
  title: string;
  description?: string;
  layout?: Layout;
  titleSize?: TitleSize;
  className?: string;
}

const sectionGapStyle: React.CSSProperties = {
  gap: "var(--ld-semantic-spacing-200, 1rem)",
};

function headingProps(titleSize: TitleSize): { size: HeadingSize; weight: HeadingWeight } {
  switch (titleSize) {
    case "xl":
      return { size: "large", weight: "alt" };
    case "lg":
      return { size: "medium", weight: "alt" };
    case "md":
      return { size: "medium", weight: "default" };
    case "sm":
      return { size: "small", weight: "default" };
  }
}

export function SectionHeading({
  badge,
  badgeColor = "yellow",
  title,
  description,
  layout = "horizontal",
  titleSize = "xl",
  className = "",
}: SectionHeadingProps) {
  const { size, weight } = headingProps(titleSize);
  const badgeEl =
    badge && badgeColor !== "none" ? (
      <CaseStudyBadge color={badgeColor}>{badge}</CaseStudyBadge>
    ) : null;

  if (layout === "vertical") {
    return (
      <div
        className={`flex flex-col items-start justify-center relative shrink-0 w-full whitespace-pre-wrap ${className}`}
        style={sectionGapStyle}
        data-name="Section Heading / Vertical"
      >
        <div
          className="flex items-center relative shrink-0 w-full"
          style={{ gap: "var(--ld-semantic-spacing-200, 1rem)" }}
          data-name="Count + Title"
        >
          {badgeEl}
          <Heading as="p" size={size} weight={weight} UNSAFE_className="relative shrink-0 w-full">
            {title}
          </Heading>
        </div>
        {description && (
          <Body as="p" size="medium" color="subtle" UNSAFE_className="max-w-[800px] relative shrink-0 w-full">
            {description}
          </Body>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap items-start relative shrink-0 w-full ${className}`}
      style={{ gap: "var(--ld-semantic-spacing-400, 2rem)" }}
      data-name="Section Heading / Full"
    >
      <div className="flex flex-[1_0_0] items-center min-w-px relative">
        <div
          className="flex items-center relative shrink-0"
          style={{ gap: "var(--ld-semantic-spacing-200, 1rem)" }}
          data-name="Count + Title"
        >
          {badgeEl}
          <Heading as="p" size={size} weight={weight} UNSAFE_className="relative shrink-0">
            {title}
          </Heading>
        </div>
      </div>
      {description && (
        <Body as="p" size="medium" color="subtle" UNSAFE_className="flex-[1_0_0] min-h-px min-w-px relative">
          {description}
        </Body>
      )}
    </div>
  );
}
