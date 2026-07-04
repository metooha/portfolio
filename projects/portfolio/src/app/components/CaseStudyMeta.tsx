import React from "react";
import { Body } from "@/app/components/Text/Text";

export interface MetaItem {
  label: string;
  value: string;
}

interface CaseStudyMetaProps {
  /** Up to 4 metadata items split into two columns */
  items: MetaItem[];
  className?: string;
}

function MetaColumn({ items }: { items: MetaItem[] }) {
  return (
    <div
      className="flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative whitespace-pre-wrap"
      style={{ gap: "var(--ld-semantic-spacing-300, 1.5rem)" }}
    >
      {items.map((item) => (
        <Body as="p" key={item.label} size="medium" color="subtle" UNSAFE_className="relative shrink-0 w-full">
          <Body as="span" size="medium" weight="alt">
            {item.label}:
          </Body>{" "}
          {item.value}
        </Body>
      ))}
    </div>
  );
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
        className="flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative"
        data-name="metrics"
      >
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center relative shrink-0 w-full"
          style={{
            gap: "var(--ld-semantic-spacing-300, 1.5rem)",
            rowGap: "var(--ld-semantic-spacing-300, 1.5rem)",
            columnGap: "var(--ld-semantic-spacing-700, 3.5rem)",
          }}
        >
          <div className="flex flex-1 flex-row items-center self-stretch min-w-0">
            <MetaColumn items={col1} />
          </div>
          <MetaColumn items={col2} />
        </div>
      </div>
    </div>
  );
}
