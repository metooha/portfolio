import React from "react";
import { parseHex, contrastColor } from "@/app/components/utils/colorUtils";
import { Body } from "@/app/components/Text/Text";

interface BulletItem {
  text: string;
  /** Overrides the auto-incremented number label */
  label?: string;
}

interface BulletListProps {
  items: BulletItem[];
  /** Overrides the default positive fill token for the number badge */
  accentColor?: string;
  className?: string;
}

export function BulletList({
  items,
  accentColor,
  className = "",
}: BulletListProps) {
  const markerStyle = accentColor
    ? ({
        "--case-study-bullet-fill": accentColor,
        ...(parseHex(accentColor)
          ? { "--case-study-bullet-text": contrastColor(parseHex(accentColor)!) }
          : {}),
      } as React.CSSProperties)
    : undefined;

  return (
    <div
      className={`flex flex-col items-start relative shrink-0 w-full ${className}`}
      style={{ gap: "var(--ld-semantic-spacing-200, 1rem)" }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start relative shrink-0 w-full"
          style={{ gap: "var(--ld-semantic-spacing-200, 1rem)" }}
          data-name="Body / Bullet Point"
        >
          <div className="ld-case-study-bullet-marker" style={markerStyle}>
            {item.label ?? i + 1}
          </div>
          <Body
            as="p"
            size="medium"
            color="subtle"
            UNSAFE_className="flex-[1_0_0] min-h-px min-w-px relative whitespace-pre-wrap"
          >
            {item.text}
          </Body>
        </div>
      ))}
    </div>
  );
}
