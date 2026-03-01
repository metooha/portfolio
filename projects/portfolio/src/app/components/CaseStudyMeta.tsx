import React from "react";

export interface MetaItem {
  label: string;
  value: string;
}

interface CaseStudyMetaProps {
  /** Up to 4 metadata items split into two columns */
  items: MetaItem[];
  className?: string;
}

/**
 * Displays role/team/scope/focus metadata at the top of a case study.
 * Renders two columns, each holding up to two MetaItems.
 */
export function CaseStudyMeta({ items, className = "" }: CaseStudyMetaProps) {
  const col1 = items.slice(0, Math.ceil(items.length / 2));
  const col2 = items.slice(Math.ceil(items.length / 2));

  return (
    <div
      className={`flex items-start justify-between relative shrink-0 w-full ${className}`}
      data-name="Metrics and Links"
    >
      <div
        className="flex flex-[1_0_0] flex-col gap-6 items-start min-h-px min-w-px relative"
        data-name="metrics"
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-[141px] items-start sm:items-center relative shrink-0 w-full">
          {/* Column 1 */}
          <div className="flex flex-1 flex-row items-center self-stretch min-w-0">
            <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal gap-6 h-full items-start min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">
              {col1.map((item) => (
                <p key={item.label} className="leading-normal relative shrink-0 w-full">
                  <span className="font-semibold text-black">{item.label}:</span>{" "}
                  {item.value}
                </p>
              ))}
            </div>
          </div>
          {/* Column 2 */}
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal gap-6 items-start min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">
            {col2.map((item) => (
              <p key={item.label} className="leading-5 relative shrink-0 w-full">
                <span className="font-semibold text-black">{item.label}:</span>{" "}
                {item.value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
