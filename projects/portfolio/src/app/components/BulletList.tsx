import React from "react";

interface BulletItem {
  text: string;
  /** Overrides the auto-incremented number label */
  label?: string;
}

interface BulletListProps {
  items: BulletItem[];
  /** Accent color for the number badge */
  accentColor?: string;
  className?: string;
}

export function BulletList({ items, accentColor = "#207442", className = "" }: BulletListProps) {
  return (
    <div className={`flex flex-col gap-4 items-start relative shrink-0 w-full ${className}`}>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex gap-4 items-start relative shrink-0 w-full"
          data-name="Body / Bullet Point"
        >
          <div
            className="flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-full shrink-0 text-center"
            style={{ backgroundColor: accentColor }}
          >
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-normal not-italic text-[12px] text-white">
              {item.label ?? i + 1}
            </span>
          </div>
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-5 min-h-px min-w-px not-italic relative text-[#4e4f4e] text-[16px] whitespace-pre-wrap">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}
