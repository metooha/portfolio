import React from "react";

/**
 * Two-column section that stacks on mobile (grid-cols-1 md:grid-cols-2).
 * Use for text + media or text + form layouts.
 */
export function TwoColumnSection({
  children,
  className = "",
  gap = "gap-8 md:gap-12",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 ${gap} items-start w-full ${className}`.trim()}
    >
      {children}
    </div>
  );
}
