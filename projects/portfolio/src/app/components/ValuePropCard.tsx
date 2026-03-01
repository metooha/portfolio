import React from "react";

interface ValuePropCardProps {
  icon: React.ReactNode;
  title?: string;
  description: string;
  className?: string;
}

export function ValuePropCard({ icon, title, description, className = "" }: ValuePropCardProps) {
  return (
    <div
      className={`flex flex-[1_0_0] flex-col gap-3 items-start min-h-px min-w-px relative ${className}`}
      data-name="Value Prop"
    >
      <div className="shrink-0">{icon}</div>
      <div className="flex flex-col gap-[6px] items-start relative shrink-0 w-full">
        {title && (
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-normal not-italic relative shrink-0 text-[16px] text-black w-full">
            {title}
          </p>
        )}
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-normal not-italic relative shrink-0 text-[#4e4f4e] text-[16px] w-full whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </div>
  );
}

interface ValuePropGridProps {
  children: React.ReactNode;
  className?: string;
}

/** Wraps multiple ValuePropCards in a responsive flex-wrap row */
export function ValuePropGrid({ children, className = "" }: ValuePropGridProps) {
  return (
    <div
      className={`content-center flex flex-wrap gap-4 items-start pt-4 relative shrink-0 w-full ${className}`}
    >
      {children}
    </div>
  );
}
