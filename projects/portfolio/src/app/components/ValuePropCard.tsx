import React from "react";
import { Body } from "@/app/components/Text/Text";

interface ValuePropCardProps {
  icon: React.ReactNode;
  title?: string;
  description: string;
  className?: string;
}

export function ValuePropCard({ icon, title, description, className = "" }: ValuePropCardProps) {
  return (
    <div
      className={`flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative ${className}`}
      style={{ gap: "var(--ld-semantic-spacing-150, 0.75rem)" }}
      data-name="Value Prop"
    >
      <div className="shrink-0">{icon}</div>
      <div
        className="flex flex-col items-start relative shrink-0 w-full"
        style={{ gap: "var(--ld-semantic-spacing-100, 0.5rem)" }}
      >
        {title && (
          <Body as="p" size="medium" weight="alt" UNSAFE_className="relative shrink-0 w-full">
            {title}
          </Body>
        )}
        <Body as="p" size="medium" color="subtle" UNSAFE_className="relative shrink-0 w-full whitespace-pre-wrap">
          {description}
        </Body>
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
      className={`content-center flex flex-wrap items-start pt-4 relative shrink-0 w-full ${className}`}
      style={{ gap: "var(--ld-semantic-spacing-200, 1rem)" }}
    >
      {children}
    </div>
  );
}
