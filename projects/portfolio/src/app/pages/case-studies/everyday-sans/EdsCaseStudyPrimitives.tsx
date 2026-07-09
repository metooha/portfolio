import React from "react";
import { Body } from "@/app/components/Text/Text";
import { fluidSize } from "@/app/components/common/fluidSize";
import {
  BeforeAfter,
  EmbedFull,
  Eyebrow,
  FrameCycle,
  ImageFull,
  VideoFull,
  ImageGrid2,
  JourneyTimeline,
  Lead,
  NextGrid,
  ProblemGrid,
  QuoteBlock,
  Section,
  SectionTitle,
  StatCards,
  StatsRow,
  type ImageSurface,
  type JourneyItem,
} from "@/app/components/CaseStudyPrimitives";

/**
 * Generic case-study primitives now live in @/app/components/CaseStudyPrimitives
 * (shared across Everyday Sans, Airtable, Oportun, and Carbon Auto-Orientation).
 * Re-exported here under their original `Eds`-prefixed names so existing call
 * sites in this case study don't need to change.
 */
export {
  BeforeAfter as EdsBeforeAfter,
  EmbedFull as EdsEmbedFull,
  Eyebrow as EdsEyebrow,
  FrameCycle as EdsFrameCycle,
  ImageFull as EdsImageFull,
  VideoFull as EdsVideoFull,
  ImageGrid2 as EdsImageGrid2,
  JourneyTimeline as EdsJourneyTimeline,
  Lead as EdsLead,
  NextGrid as EdsNextGrid,
  ProblemGrid as EdsProblemGrid,
  QuoteBlock as EdsQuoteBlock,
  Section as EdsSection,
  SectionTitle as EdsSectionTitle,
  StatCards as EdsStatCards,
  StatsRow as EdsStatsRow,
};
export type { ImageSurface as EdsImageSurface, JourneyItem as EdsJourneyItem };

const WEIGHT_ROWS = [
  { weight: "400", name: "Regular", role: "Captions, helper text", isNew: false, fontWeight: 400, gradient: "linear-gradient(90deg,#001335 0%,#001e60 100%)" },
  { weight: "500", name: "Medium", role: "Body copy, UI labels", isNew: true, fontWeight: 500, gradient: "linear-gradient(90deg,#001e60 0%,#0029a3 100%)" },
  { weight: "600", name: "Semibold", role: "Prices, subheadings", isNew: true, fontWeight: 600, gradient: "linear-gradient(90deg,#0029a3 0%,#0038c2 100%)" },
  { weight: "700", name: "Bold", role: "Headings, CTAs", isNew: false, fontWeight: 700, gradient: "linear-gradient(90deg,#0038c2 0%,#0046d6 100%)" },
  { weight: "800", name: "Black", role: "Display, hero text", isNew: true, fontWeight: 900, gradient: "linear-gradient(90deg,#0046d6 0%,#0053e2 100%)" },
] as const;

export function EdsWeightScale() {
  return (
    <div className="flex flex-col gap-2.5">
      {WEIGHT_ROWS.map((row) => (
        <div
          key={row.weight}
          className="flex flex-wrap items-center gap-3 md:gap-5 px-4 md:px-6 py-4 rounded-full"
          style={{ background: row.gradient }}
        >
          <span className="text-[12px] font-bold w-[38px] shrink-0 tracking-wide" style={{ color: "rgba(255,255,255,0.45)" }}>
            {row.weight}
          </span>
          <span className="text-[17px] text-white flex-1 min-w-0" style={{ fontWeight: row.fontWeight }}>
            {row.name}
          </span>
          <span className="text-[13px] text-right" style={{ color: "rgba(255,255,255,0.45)" }}>
            {row.role}
          </span>
          {row.isNew && (
            <span
              className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shrink-0"
              style={{
                background: "var(--ld-primitive-color-spark-100, #ffc220)",
                color: "var(--ld-semantic-color-fill-brand-bold, #001e60)",
              }}
            >
              new
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function EdsResearchCard({
  variant,
  eyebrow,
  title,
  subtitle,
  rating,
  ratingNote,
  findings,
}: {
  variant: "pre" | "post";
  eyebrow: string;
  title: string;
  subtitle: string;
  rating: string;
  ratingNote: string;
  findings: { type: "positive" | "negative"; text: string }[];
}) {
  const headerBg =
    variant === "pre"
      ? "var(--ld-semantic-color-text-brand, #0053e2)"
      : "var(--ld-semantic-color-text-positive, #2a8703)";

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)" }}
    >
      <div className="px-6 py-5" style={{ background: headerBg }}>
        <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em] mb-1" UNSAFE_style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>
          {eyebrow}
        </Body>
        <Body as="p" size="medium" weight="alt" color="inverse">
          {title}
        </Body>
        <Body as="p" size="small" UNSAFE_className="mt-1" UNSAFE_style={{ color: "rgba(255,255,255,0.75)" }}>
          {subtitle}
        </Body>
      </div>
      <div className="p-6 bg-white">
        <div className="flex items-baseline gap-2 mb-5">
          <span
            className="font-bold leading-none"
            style={{
              fontSize: fluidSize(26, 38),
              color: variant === "pre" ? "var(--ld-semantic-color-text-brand, #0053e2)" : "var(--ld-semantic-color-text-positive, #2a8703)",
            }}
          >
            {rating}
          </span>
          <span className="text-[15px]" style={{ color: "var(--ld-semantic-color-text-subtlest, #74767c)" }}>/ 5</span>
          <span className="text-[13px]" style={{ color: "var(--ld-semantic-color-text-subtlest, #74767c)" }}>{ratingNote}</span>
        </div>
        <ul className="list-none m-0 p-0">
          {findings.map((f) => (
            <li
              key={f.text}
              className="flex gap-2 py-2 border-b items-start text-[13px] leading-snug"
              style={{ borderColor: "var(--ld-semantic-color-separator, #e3e4e5)" }}
            >
              <span
                className="shrink-0 font-bold text-[11px] pt-0.5 w-[15px]"
                style={{ color: f.type === "positive" ? "var(--ld-semantic-color-text-positive, #2a8703)" : "var(--ld-semantic-color-text-negative, #ea1100)" }}
              >
                {f.type === "positive" ? "✓" : "✕"}
              </span>
              {f.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
