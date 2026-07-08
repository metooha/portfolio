import React from "react";

/**
 * Standard page content container: max-width, horizontal padding, vertical padding.
 * Use for main content areas that should not span full viewport on large screens.
 */
export function PageContainer({
  children,
  className = "",
  as: Tag = "div",
  maxWidth = "max-w-[1660px]",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "main" | "section";
  maxWidth?: "max-w-6xl" | "max-w-[1300px]" | "max-w-[1660px]" | "max-w-full";
}) {
  return (
    <Tag
      className={`w-full ${maxWidth} mx-auto px-4 md:px-[68px] ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
