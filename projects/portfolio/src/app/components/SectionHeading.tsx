import React from "react";

type BadgeColor = "yellow" | "green" | "muted" | "none";
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

const BADGE_STYLES: Record<BadgeColor, string> = {
  yellow: "bg-[#e9f722] text-black font-normal text-[16px] min-h-[48px] min-w-[48px] w-[48px] p-[12px]",
  green:  "bg-[#207442] text-white font-semibold text-[12px] min-h-[32px] min-w-[32px] p-[6px]",
  muted:  "bg-[#dae4e1] text-black font-normal text-[12px] min-h-[32px] min-w-[32px] p-[6px]",
  none:   "",
};

const TITLE_SIZES: Record<TitleSize, string> = {
  xl: "text-[40px] font-medium font-['Inter:Medium',sans-serif]",
  lg: "text-[32px] font-medium font-['Inter:Medium',sans-serif]",
  md: "text-[20px] font-semibold font-['Inter:Semi_Bold',sans-serif]",
  sm: "text-[16px] font-semibold font-['Inter:Semi_Bold',sans-serif]",
};

export function SectionHeading({
  badge,
  badgeColor = "yellow",
  title,
  description,
  layout = "horizontal",
  titleSize = "xl",
  className = "",
}: SectionHeadingProps) {
  const badgeEl = badge && badgeColor !== "none" ? (
    <div
      className={`flex flex-col items-center justify-center overflow-clip rounded-full shrink-0 text-center leading-normal not-italic ${BADGE_STYLES[badgeColor]}`}
      data-name="Count"
    >
      {badge}
    </div>
  ) : null;

  if (layout === "vertical") {
    return (
      <div
        className={`flex flex-col gap-4 items-start justify-center not-italic relative shrink-0 w-full whitespace-pre-wrap ${className}`}
        data-name="Section Heading / Vertical"
      >
        {badgeEl}
        <p className={`leading-normal relative shrink-0 text-black w-full ${TITLE_SIZES[titleSize]}`}>
          {title}
        </p>
        {description && (
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-6 max-w-[800px] relative shrink-0 text-[#4e4f4e] text-[16px] w-full">
            {description}
          </p>
        )}
      </div>
    );
  }

  // horizontal layout
  return (
    <div
      className={`flex flex-wrap gap-8 items-start relative shrink-0 w-full ${className}`}
      data-name="Section Heading / Full"
    >
      <div className="flex flex-[1_0_0] min-h-[72px] items-center min-w-px relative">
        <div className="flex gap-4 items-center relative shrink-0" data-name="Count + Title">
          {badgeEl}
          <p className={`leading-normal not-italic relative shrink-0 text-black ${TITLE_SIZES[titleSize]}`}>
            {title}
          </p>
        </div>
      </div>
      {description && (
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-6 min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px]">
          {description}
        </p>
      )}
    </div>
  );
}
