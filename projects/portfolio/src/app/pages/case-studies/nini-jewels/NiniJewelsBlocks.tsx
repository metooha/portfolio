import React from "react";
import { Body } from "@/app/components/Text/Text";

interface TensionColumn {
  who: string;
  title: string;
  items: string[];
}

function TensionCard({ column, accentColor }: { column: TensionColumn; accentColor: string }) {
  return (
    <div
      className="rounded-lg p-6"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}
    >
      <Body
        as="p"
        size="small"
        weight="alt"
        UNSAFE_className="uppercase tracking-[0.14em] mb-2"
        UNSAFE_style={{ color: accentColor, fontSize: "10px" }}
      >
        {column.who}
      </Body>
      <Body as="p" size="medium" weight="alt" UNSAFE_className="mb-3" UNSAFE_style={{ color: "#ffffff" }}>
        {column.title}
      </Body>
      <ul className="flex flex-col gap-1.5">
        {column.items.map((item) => (
          <li
            key={item}
            className="text-[13px] leading-[1.5] pl-4 relative"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            <span className="absolute left-0" style={{ color: accentColor }}>
              &ndash;
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Card grid, like the shared ProblemGrid but without its blue tint, with a caller-supplied accent color for the "who" label and a configurable column count. */
export function NiniCardGrid({
  cards,
  accentColor = "#000000",
  columns = 2,
}: {
  cards: { who: string; title: string; description: string }[];
  accentColor?: string;
  columns?: 2 | 3;
}) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {cards.map((card) => (
        <div
          key={card.who}
          className="rounded-[10px] p-6"
          style={{ background: "#f7f7f7", border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)" }}
        >
          <Body
            as="p"
            size="small"
            weight="alt"
            UNSAFE_className="uppercase tracking-[0.1em] mb-2"
            UNSAFE_style={{ fontSize: "10px", color: accentColor }}
          >
            {card.who}
          </Body>
          <Body as="p" size="medium" weight="alt" UNSAFE_className="mb-2" UNSAFE_style={{ color: "#000000" }}>
            {card.title}
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.65]">
            {card.description}
          </Body>
        </div>
      ))}
    </div>
  );
}

/** Side-by-side before/after full-page screenshots, each in a fixed-height scrollable frame so the two compare at the same visual size regardless of native page length. */
export function NiniWebsiteCompare({
  before,
  after,
  height = 560,
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  height?: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { ...before, label: "Before" },
        { ...after, label: "After" },
      ].map((col) => (
        <div
          key={col.label}
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)" }}
        >
          <div className="px-4 py-2" style={{ background: "#000000" }}>
            <Body
              as="p"
              size="small"
              weight="alt"
              UNSAFE_className="uppercase tracking-[0.1em]"
              UNSAFE_style={{ fontSize: "10px", color: "#ffffff" }}
            >
              {col.label}
            </Body>
          </div>
          <div className="w-full overflow-y-auto" style={{ height }}>
            <img src={col.src} alt={col.alt} className="block w-full h-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Two-column "old approach vs. what luxury needs" split, used on a dark Section. */
export function NiniTensionSplit({
  left,
  right,
  accentColor = "#ffffff",
}: {
  left: TensionColumn;
  right: TensionColumn;
  accentColor?: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
      <TensionCard column={left} accentColor={accentColor} />
      <Body
        as="p"
        size="large"
        weight="alt"
        UNSAFE_className="text-center hidden md:block"
        UNSAFE_style={{ color: "rgba(255,255,255,0.3)" }}
      >
        vs
      </Body>
      <TensionCard column={right} accentColor={accentColor} />
    </div>
  );
}
