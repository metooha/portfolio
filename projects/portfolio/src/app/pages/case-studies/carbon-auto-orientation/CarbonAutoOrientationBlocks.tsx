import React from "react";
import { Body, Heading } from "@/app/components/Text/Text";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "@/app/components/DataTable/DataTable";

const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";
const SURFACE = "var(--ld-semantic-color-fill, #ffffff)";
const SURFACE_SUBTLE = "var(--ld-semantic-color-fill-subtle, #f0f1f2)";
const INK = "var(--ld-semantic-color-text, #1a1a1a)";
const INK_SUBTLE = "var(--ld-semantic-color-text-subtlest, #74767c)";
const BRAND = "var(--ld-semantic-color-text-brand, #2a0eff)";
const BRAND_FILL = "var(--ld-semantic-color-fill-brand, #2a0eff)";
const POSITIVE = "var(--ld-semantic-color-text-positive, #2a8703)";
const NEGATIVE = "var(--ld-semantic-color-text-negative, #ea1100)";

// ── Tension split — two opposing needs, side by side ────────────────

export interface CarbonTensionSide {
  who: string;
  title: string;
  body: string;
}

export function CarbonTensionSplit({
  left,
  right,
}: {
  left: CarbonTensionSide;
  right: CarbonTensionSide;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-5 md:gap-6 items-center">
      <TensionCard side={left} />
      <Heading
        as="span"
        size="small"
        weight="alt"
        UNSAFE_className="hidden md:flex items-center justify-center italic m-0"
        UNSAFE_style={{ color: "rgba(255,255,255,0.3)" }}
      >
        vs
      </Heading>
      <TensionCard side={right} />
    </div>
  );
}

function TensionCard({ side }: { side: CarbonTensionSide }) {
  return (
    <div
      className="flex flex-col gap-3 rounded-[10px] p-6"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}
    >
      <Body
        as="p"
        size="small"
        weight="alt"
        UNSAFE_className="uppercase tracking-[0.14em] m-0"
        UNSAFE_style={{ fontSize: "10px", color: "var(--ld-primitive-color-blue-40, #9e91ff)" }}
      >
        {side.who}
      </Body>
      <Body as="p" size="medium" weight="alt" color="inverse" UNSAFE_className="m-0">
        {side.title}
      </Body>
      <Body
        as="p"
        size="small"
        UNSAFE_className="m-0 leading-[1.6]"
        UNSAFE_style={{ color: "rgba(255,255,255,0.6)" }}
      >
        {side.body}
      </Body>
    </div>
  );
}

// ── Callout note — sparkle-marked insight, light or dark surface ────

export function CarbonNote({
  lead,
  children,
  onDark = false,
}: {
  lead: string;
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <div
      className="flex items-start gap-3 rounded-[10px] p-5"
      style={{
        background: onDark ? "rgba(120,140,255,0.14)" : "var(--ld-primitive-color-blue-5, #f1efff)",
        border: `1px solid ${onDark ? "rgba(120,140,255,0.3)" : SEPARATOR}`,
      }}
    >
      <span
        className="shrink-0 leading-none mt-0.5"
        style={{ color: onDark ? "var(--ld-primitive-color-blue-40, #9e91ff)" : BRAND, fontSize: "16px" }}
        aria-hidden="true"
      >
        &#10022;
      </span>
      <Body
        as="p"
        size="small"
        UNSAFE_className="m-0 leading-[1.65]"
        UNSAFE_style={{ color: onDark ? "rgba(255,255,255,0.82)" : undefined }}
      >
        <Body
          as="span"
          size="small"
          weight="alt"
          UNSAFE_style={{ color: onDark ? "#ffffff" : BRAND }}
        >
          {lead}{" "}
        </Body>
        {children}
      </Body>
    </div>
  );
}

// ── Competitive analysis cards ───────────────────────────────────────

export interface CarbonCompetitorImage {
  src: string;
  alt: string;
}

export interface CarbonCompetitorCard {
  name: string;
  maker: string;
  images: CarbonCompetitorImage[];
  took: string;
  cut: string;
}

export function CarbonCompetitorGrid({ cards }: { cards: CarbonCompetitorCard[] }) {
  return (
    <div className="flex flex-col gap-4">
      {cards.map((card) => (
        <div
          key={card.name}
          className="flex flex-col md:flex-row rounded-[10px] overflow-hidden"
          style={{ border: `1px solid ${SEPARATOR}` }}
        >
          <div className="flex flex-col md:w-[36%] shrink-0" style={{ background: SURFACE_SUBTLE }}>
            <div className="px-6 py-5" style={{ background: BRAND_FILL }}>
              <Body as="p" size="medium" weight="alt" color="inverse" UNSAFE_className="m-0">
                {card.name}
              </Body>
              <Body
                as="p"
                size="small"
                UNSAFE_className="m-0"
                UNSAFE_style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px" }}
              >
                {card.maker}
              </Body>
            </div>
            <div className="flex flex-col gap-3 p-6">
              <CompetitorVerdictRow label="Took" text={card.took} color={POSITIVE} />
              <CompetitorVerdictRow label="Cut" text={card.cut} color={NEGATIVE} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 flex-1" style={{ background: SURFACE }}>
            {card.images.map((image) => (
              <div key={image.src} className="w-full overflow-hidden rounded-[6px]" style={{ background: SURFACE }}>
                <img src={image.src} alt={image.alt} className="block w-full h-auto" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CompetitorVerdictRow({ label, text, color }: { label: string; text: string; color: string }) {
  return (
    <div className="flex gap-2">
      <span
        className="shrink-0 font-bold uppercase tracking-wide"
        style={{ fontSize: "10px", color, paddingTop: "2px", width: "34px" }}
      >
        {label}
      </span>
      <Body as="span" size="small" color="subtlest" UNSAFE_className="leading-[1.55]">
        {text}
      </Body>
    </div>
  );
}

// ── Trade-off cards — tension / choice / trade-off rows ──────────────

export interface CarbonTradeoffCard {
  number: string;
  title: string;
  tension: string;
  choice: string;
  tradeoff: string;
}

export function CarbonTradeoffGrid({ cards }: { cards: CarbonTradeoffCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card) => (
        <div
          key={card.number}
          className="flex flex-col gap-3 rounded-[10px] p-6"
          style={{
            background: SURFACE,
            border: `1px solid ${SEPARATOR}`,
            borderTop: `3px solid ${BRAND_FILL}`,
          }}
        >
          <span
            className="text-[26px] font-bold leading-none"
            style={{ color: "var(--ld-primitive-color-blue-10, #d8d3ff)" }}
          >
            {card.number}
          </span>
          <Body as="h3" size="small" weight="alt" UNSAFE_className="m-0" UNSAFE_style={{ color: INK }}>
            {card.title}
          </Body>
          <div className="flex flex-col gap-2">
            <TradeoffRow label="Tension" text={card.tension} color={INK_SUBTLE} />
            <TradeoffRow label="Choice" text={card.choice} color={BRAND} />
            <TradeoffRow label="Trade-off" text={card.tradeoff} color={INK_SUBTLE} />
          </div>
        </div>
      ))}
    </div>
  );
}

function TradeoffRow({ label, text, color }: { label: string; text: string; color: string }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] gap-2">
      <span className="text-[10px] font-bold uppercase tracking-wide pt-0.5" style={{ color }}>
        {label}
      </span>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.55]">
        {text}
      </Body>
    </div>
  );
}

// ── Success metrics table — baseline → beta → full release ──────────

export interface CarbonMetricRow {
  metric: string;
  baseline: string;
  beta: string;
  full: string;
}

export function CarbonMetricsTable({ rows }: { rows: CarbonMetricRow[] }) {
  return (
    <div className="w-full overflow-x-auto rounded-[10px]" style={{ border: `1px solid ${SEPARATOR}` }}>
      <DataTable style={{ width: "100%" }}>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeader>Metric</DataTableHeader>
            <DataTableHeader>Baseline</DataTableHeader>
            <DataTableHeader>Beta target</DataTableHeader>
            <DataTableHeader>Full release target</DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {rows.map((row) => (
            <DataTableRow key={row.metric}>
              <DataTableCell>
                <Body as="span" size="small" weight="alt" UNSAFE_style={{ color: INK }}>
                  {row.metric}
                </Body>
              </DataTableCell>
              <DataTableCell>
                <Body as="span" size="small" color="subtlest">
                  {row.baseline}
                </Body>
              </DataTableCell>
              <DataTableCell>
                <Body as="span" size="small" color="subtlest">
                  {row.beta}
                </Body>
              </DataTableCell>
              <DataTableCell>
                <Body as="span" size="small" weight="alt" UNSAFE_style={{ color: BRAND }}>
                  {row.full}
                </Body>
              </DataTableCell>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </div>
  );
}

// ── Ranked-option list — the archetypes behind each of the 5 slots ──

export interface CarbonOptionItem {
  number: string;
  title: string;
  optimizesFor: string;
  future?: boolean;
}

export function CarbonOptionList({ items }: { items: CarbonOptionItem[] }) {
  return (
    <div
      className="flex flex-col gap-px rounded-[10px] overflow-hidden"
      style={{ background: SEPARATOR, border: `1px solid ${SEPARATOR}` }}
    >
      {items.map((item) => (
        <div
          key={item.number}
          className="flex items-center gap-4 px-5 py-4"
          style={{ background: item.future ? SURFACE_SUBTLE : SURFACE }}
        >
          <span
            className="shrink-0 flex items-center justify-center rounded-full text-[12px] font-bold"
            style={{
              width: "28px",
              height: "28px",
              background: item.future ? SEPARATOR : BRAND_FILL,
              color: item.future ? INK_SUBTLE : "#ffffff",
            }}
          >
            {item.number}
          </span>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Body as="p" size="small" weight="alt" UNSAFE_className="m-0" UNSAFE_style={{ color: INK }}>
                {item.title}
              </Body>
              {item.future ? (
                <span
                  className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                  style={{ background: SEPARATOR, color: INK_SUBTLE }}
                >
                  TBD
                </span>
              ) : null}
            </div>
            <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.5]">
              {item.optimizesFor}
            </Body>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Stats row — divider-separated, for dark brand-blue sections ─────

export interface CarbonStat {
  value: string;
  label: string;
}

// index 0: no dividers. index 1: left divider (2nd of a pair, and 2nd of 4).
// index 2: top divider on the 2-col mobile row wrap, left divider once at 4-col.
// index 3: left + top on mobile (2nd item of row 2), left only at 4-col.
const STAT_BORDER_CLASSES = [
  "",
  "border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-l border-t lg:border-t-0",
];

export function CarbonStatsRow({ stats }: { stats: CarbonStat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 w-full">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`text-center px-6 py-6 ${STAT_BORDER_CLASSES[index] ?? ""}`}
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          <div className="text-[44px] font-bold leading-none mb-2" style={{ color: "#ffffff" }}>
            {stat.value}
          </div>
          <Body
            as="p"
            size="small"
            UNSAFE_className="leading-snug"
            UNSAFE_style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}
          >
            {stat.label}
          </Body>
        </div>
      ))}
    </div>
  );
}

// ── Eyebrow, white-on-dark — the shared Eyebrow hardcodes yellow for
// onDark (correct for Walmart's spark branding), so dark Carbon sections
// use this instead to stay white and readable on brand blue.

export function CarbonEyebrowOnDark({ children }: { children: React.ReactNode }) {
  return (
    <Body
      as="p"
      size="small"
      weight="alt"
      UNSAFE_className="uppercase tracking-[0.12em]"
      UNSAFE_style={{ color: "#ffffff", fontSize: "11px" }}
    >
      {children}
    </Body>
  );
}
