import React from "react";
import { Body, Heading } from "@/app/components/Text/Text";
import { Tag, type TagColor } from "@/app/components/Tag/Tag";
import { Icon } from "@/app/components/Icons/Icons";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableCellStatus,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "@/app/components/DataTable/DataTable";

/**
 * Oportun / Digit accent palette. Mirrors the reference case study —
 * a dark Oportun green for legible accent text plus a Digit orange as a
 * secondary intent color. Kept as named constants so the whole
 * infrastructure narrative reads from one source of truth.
 */
const GREEN = "#1a6b4a";
const GREEN_SOFT = "#e8f5ee";
const GREEN_LINE = "rgba(26,107,74,0.22)";
const ORANGE = "#c2410c";
const ORANGE_SOFT = "#fff0ea";
const ORANGE_LINE = "rgba(255,107,53,0.25)";
const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";
const SURFACE = "var(--ld-semantic-color-fill, #ffffff)";
const SURFACE_SUBTLE = "var(--ld-semantic-color-fill-subtle, #f0f1f2)";
const INK = "var(--ld-semantic-color-text, #1a1a1a)";
const INK_SUBTLE = "var(--ld-semantic-color-text-subtlest, #74767c)";
const MONO = "'SF Mono', 'Fira Code', 'Courier New', monospace";

// ── Visual placeholder ─────────────────────────────────────────────
// Styled slot for artwork that will be dropped in later. Matches the
// reference's icon + label + hint + tag treatment so it is obvious what
// belongs there.

export type OportunVizHeight = "sm" | "md" | "lg" | "xl";

const VIZ_MIN_HEIGHT: Record<OportunVizHeight, string> = {
  sm: "160px",
  md: "240px",
  lg: "340px",
  xl: "440px",
};

export function OportunVizPlaceholder({
  icon,
  label,
  hint,
  tag,
  stripLabel,
  height = "md",
  className = "",
}: {
  icon: string;
  label: string;
  hint?: string;
  tag?: string;
  stripLabel?: string;
  height?: OportunVizHeight;
  className?: string;
}) {
  return (
    <figure className={`m-0 flex flex-col gap-3 ${className}`}>
      {stripLabel ? (
        <Body
          as="p"
          size="small"
          weight="alt"
          UNSAFE_className="uppercase tracking-[0.1em]"
          UNSAFE_style={{ fontSize: "10px", color: INK_SUBTLE }}
        >
          {stripLabel}
        </Body>
      ) : null}
      <div
        className="w-full rounded-xl flex flex-col items-center justify-center text-center gap-2 px-6 py-10"
        style={{
          minHeight: VIZ_MIN_HEIGHT[height],
          background: SURFACE_SUBTLE,
          border: `1px dashed ${SEPARATOR}`,
        }}
      >
        <span className="text-[28px] leading-none" aria-hidden="true">
          {icon}
        </span>
        <Body as="p" size="medium" weight="alt" UNSAFE_className="m-0" UNSAFE_style={{ color: INK }}>
          {label}
        </Body>
        {hint ? (
          <Body
            as="p"
            size="small"
            color="subtlest"
            UNSAFE_className="m-0 max-w-[440px] leading-[1.6]"
          >
            {hint}
          </Body>
        ) : null}
        {tag ? (
          <span className="mt-1">
            <Tag color="green" size="small" variant="secondary">
              {tag}
            </Tag>
          </span>
        ) : null}
      </div>
    </figure>
  );
}

// ── Numbered challenge cards ────────────────────────────────────────

export interface OportunChallengeItem {
  number: string;
  title: string;
  body: string;
}

export function OportunNumberedChallengeCards({ items }: { items: OportunChallengeItem[] }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-[10px] overflow-hidden"
      style={{ background: SEPARATOR, border: `1px solid ${SEPARATOR}` }}
    >
      {items.map((item) => (
        <div key={item.number} className="flex flex-col gap-2 p-6" style={{ background: SURFACE }}>
          <span className="text-[30px] font-bold leading-none" style={{ color: SEPARATOR }}>
            {item.number}
          </span>
          <Body as="h3" size="small" weight="alt" UNSAFE_className="m-0" UNSAFE_style={{ color: INK }}>
            {item.title}
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.6]">
            {item.body}
          </Body>
        </div>
      ))}
    </div>
  );
}

// ── Architecture timeline (with decision callouts) ──────────────────

export type OportunWhoVariant = "design" | "engineering" | "product";

const WHO_CHIP: Record<OportunWhoVariant, { bg: string; color: string; border: string }> = {
  design: { bg: GREEN_SOFT, color: GREEN, border: GREEN_LINE },
  engineering: { bg: "#eaf0ff", color: "#2b4eaf", border: "#c9d8f5" },
  product: { bg: "#f5f0ff", color: "#6b3daf", border: "#dcccf5" },
};

export interface OportunTimelineItem {
  date: string;
  phase: string;
  who: OportunWhoVariant[];
  title: string;
  body: string;
  decision?: React.ReactNode;
}

const WHO_LABEL: Record<OportunWhoVariant, string> = {
  design: "Design",
  engineering: "Engineering",
  product: "Product",
};

export function OportunArchitectureTimeline({ items }: { items: OportunTimelineItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <div key={`${item.date}-${item.phase}`} className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
          <div className="relative py-7 pr-5 md:border-r-2" style={{ borderColor: SEPARATOR }}>
            <div
              className="hidden md:block absolute -right-[7px] top-8 w-3 h-3 rounded-full border-2 border-white"
              style={{
                background: GREEN,
                boxShadow: `0 0 0 2px ${GREEN}`,
              }}
            />
            <Body
              as="p"
              size="small"
              weight="alt"
              color="subtlest"
              UNSAFE_className="tracking-wide mb-1 uppercase"
              UNSAFE_style={{ fontSize: "11px" }}
            >
              {item.date}
            </Body>
            <Body
              as="p"
              size="small"
              weight="alt"
              UNSAFE_className="leading-snug mb-2"
              UNSAFE_style={{ color: INK }}
            >
              {item.phase}
            </Body>
            <div className="flex flex-wrap gap-1">
              {item.who.map((w) => (
                <span
                  key={w}
                  className="text-[9px] font-bold uppercase tracking-wide px-[7px] py-0.5 rounded-full border"
                  style={WHO_CHIP[w]}
                >
                  {WHO_LABEL[w]}
                </span>
              ))}
            </div>
          </div>
          <div className="py-7 md:pl-9">
            <Body as="p" size="medium" weight="alt" UNSAFE_className="mb-1.5" UNSAFE_style={{ color: INK }}>
              {item.title}
            </Body>
            <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.7]">
              {item.body}
            </Body>
            {item.decision ? (
              <div
                className="mt-4 pl-4 pr-4 py-3 rounded-r-[6px]"
                style={{ background: GREEN_SOFT, borderLeft: `3px solid ${GREEN}` }}
              >
                <Body
                  as="p"
                  size="small"
                  weight="alt"
                  UNSAFE_className="uppercase tracking-[0.1em] mb-1"
                  UNSAFE_style={{ fontSize: "10px", color: GREEN }}
                >
                  Architecture decision
                </Body>
                <Body as="p" size="small" UNSAFE_className="m-0 leading-[1.65]" UNSAFE_style={{ color: INK }}>
                  {item.decision}
                </Body>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Inline monospace token reference for use inside decision copy. */
export function OportunToken({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="rounded px-1.5 py-0.5"
      style={{ fontFamily: MONO, fontSize: "0.82em", background: SURFACE_SUBTLE, color: GREEN }}
    >
      {children}
    </code>
  );
}

// ── Three-tier token diagram ────────────────────────────────────────

export type OportunTokenTone = "neutral" | "green" | "orange";

const TOKEN_TONE: Record<OportunTokenTone, { bg: string; border: string; color: string }> = {
  neutral: { bg: SURFACE_SUBTLE, border: SEPARATOR, color: "var(--ld-semantic-color-text-subtle, #444)" },
  green: { bg: GREEN_SOFT, border: GREEN_LINE, color: GREEN },
  orange: { bg: ORANGE_SOFT, border: ORANGE_LINE, color: ORANGE },
};

export interface OportunTokenTier {
  tier: string;
  name: string;
  desc: string;
  tokens: { label: string; tone?: OportunTokenTone }[];
  connector?: string;
}

export function OportunTokenTierDiagram({ tiers }: { tiers: OportunTokenTier[] }) {
  return (
    <div
      className="w-full rounded-[10px] overflow-hidden flex flex-col gap-px"
      style={{ background: SEPARATOR, border: `1px solid ${SEPARATOR}` }}
    >
      {tiers.map((tier, index) => (
        <React.Fragment key={tier.tier}>
          <div className="grid grid-cols-1 md:grid-cols-[150px_1fr]" style={{ background: SURFACE }}>
            <div
              className="flex flex-col justify-center px-4 py-5 md:border-r"
              style={{ background: SURFACE_SUBTLE, borderColor: SEPARATOR }}
            >
              <Body
                as="p"
                size="small"
                weight="alt"
                UNSAFE_className="uppercase tracking-[0.1em] mb-1"
                UNSAFE_style={{ fontSize: "10px", color: INK_SUBTLE }}
              >
                {tier.tier}
              </Body>
              <Body as="p" size="small" weight="alt" UNSAFE_className="m-0" UNSAFE_style={{ color: INK }}>
                {tier.name}
              </Body>
              <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 mt-1 leading-[1.5]" UNSAFE_style={{ fontSize: "12px" }}>
                {tier.desc}
              </Body>
            </div>
            <div className="flex flex-wrap gap-2 items-start content-start px-5 py-5">
              {tier.tokens.map((token) => {
                const tone = TOKEN_TONE[token.tone ?? "neutral"];
                return (
                  <span
                    key={token.label}
                    className="rounded px-2.5 py-1"
                    style={{
                      fontFamily: MONO,
                      fontSize: "12px",
                      background: tone.bg,
                      border: `1px solid ${tone.border}`,
                      color: tone.color,
                    }}
                  >
                    {token.label}
                  </span>
                );
              })}
            </div>
          </div>
          {index < tiers.length - 1 && tiers[index].connector ? (
            <div
              className="px-5 py-2 text-center"
              style={{ background: SURFACE }}
            >
              <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0" UNSAFE_style={{ fontSize: "12px" }}>
                ↓&nbsp;&nbsp;{tiers[index].connector}
              </Body>
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Decision / insight card grid ────────────────────────────────────

export interface OportunDecisionCard {
  symbol?: string;
  icon?: string;
  title: string;
  body: string;
  badge?: string;
}

export function OportunDecisionGrid({
  cards,
  columns = 2,
}: {
  cards: OportunDecisionCard[];
  columns?: 1 | 2;
}) {
  return (
    <div className={`grid grid-cols-1 ${columns === 2 ? "md:grid-cols-2" : ""} gap-4`}>
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex flex-col gap-2 rounded-[10px] p-6"
          style={{ background: SURFACE, border: `1px solid ${SEPARATOR}` }}
        >
          {card.icon ? (
            <Icon name={card.icon} size="medium" style={{ color: GREEN }} decorative />
          ) : (
            <span className="text-[22px] leading-none" style={{ color: GREEN }} aria-hidden="true">
              {card.symbol}
            </span>
          )}
          <Body as="h3" size="small" weight="alt" UNSAFE_className="m-0" UNSAFE_style={{ color: INK }}>
            {card.title}
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.65]">
            {card.body}
          </Body>
          {card.badge ? (
            <span className="mt-1">
              <Tag color="green" size="small" variant="secondary">
                {card.badge}
              </Tag>
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

// ── Component anatomy (spec panel + token bindings) ─────────────────

export interface OportunAnatomyItem {
  name: string;
  value: string;
  dot: OportunWhoVariant | "orange";
}

const ANATOMY_DOT: Record<OportunAnatomyItem["dot"], string> = {
  design: GREEN,
  engineering: "#2b4eaf",
  product: "#6b3daf",
  orange: ORANGE,
};

function AnatomyItem({ item, onDark }: { item: OportunAnatomyItem; onDark: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="shrink-0 mt-1.5 w-2 h-2 rounded-full"
        style={{ background: ANATOMY_DOT[item.dot] }}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-0.5">
        <Body
          as="p"
          size="small"
          weight="alt"
          UNSAFE_className="m-0"
          UNSAFE_style={{ color: onDark ? "#ffffff" : INK }}
        >
          {item.name}
        </Body>
        <Body
          as="p"
          size="small"
          UNSAFE_className="m-0 leading-[1.5]"
          UNSAFE_style={{
            fontSize: "12px",
            color: onDark ? "rgba(255,255,255,0.6)" : INK_SUBTLE,
            fontFamily: item.value.includes(".") ? MONO : undefined,
          }}
        >
          {item.value}
        </Body>
      </div>
    </div>
  );
}

export function OportunComponentAnatomy({
  specLabel,
  spec,
  bindingsLabel,
  bindings,
  className = "",
}: {
  specLabel: string;
  spec: OportunAnatomyItem[];
  bindingsLabel: string;
  bindings: OportunAnatomyItem[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-px rounded-[10px] overflow-hidden h-full items-stretch ${className}`}
      style={{ background: SEPARATOR, border: `1px solid ${SEPARATOR}` }}
    >
      <div className="flex h-full min-h-0 flex-col gap-4 p-6" style={{ background: SURFACE }}>
        <Body
          as="p"
          size="small"
          weight="alt"
          UNSAFE_className="uppercase tracking-[0.1em] shrink-0"
          UNSAFE_style={{ fontSize: "10px", color: GREEN }}
        >
          {specLabel}
        </Body>
        <div className="flex flex-1 flex-col justify-between gap-4">
          {spec.map((item) => (
            <AnatomyItem key={item.name} item={item} onDark={false} />
          ))}
        </div>
      </div>
      <div className="flex h-full min-h-0 flex-col gap-4 p-6" style={{ background: "#1a1a1a" }}>
        <Body
          as="p"
          size="small"
          weight="alt"
          UNSAFE_className="uppercase tracking-[0.1em] shrink-0"
          UNSAFE_style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}
        >
          {bindingsLabel}
        </Body>
        <div className="flex flex-1 flex-col justify-between gap-4">
          {bindings.map((item) => (
            <AnatomyItem key={item.name} item={item} onDark />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Design-to-code pipeline ─────────────────────────────────────────

export interface OportunPipeStep {
  label: string;
  tool: string;
  desc: string;
}

export function OportunPipeline({ steps }: { steps: OportunPipeStep[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {steps.map((step, index) => (
        <div
          key={step.label}
          className="relative flex flex-col gap-1.5 rounded-[10px] p-5"
          style={{ background: SURFACE, border: `1px solid ${SEPARATOR}` }}
        >
          <Body
            as="p"
            size="small"
            weight="alt"
            UNSAFE_className="uppercase tracking-[0.1em]"
            UNSAFE_style={{ fontSize: "10px", color: INK_SUBTLE }}
          >
            {step.label}
          </Body>
          <Body as="p" size="medium" weight="alt" UNSAFE_className="m-0" UNSAFE_style={{ color: GREEN }}>
            {step.tool}
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.55]" UNSAFE_style={{ fontSize: "12px" }}>
            {step.desc}
          </Body>
          {index < steps.length - 1 ? (
            <span
              className="hidden lg:block absolute top-1/2 -right-[10px] -translate-y-1/2 text-[14px]"
              style={{ color: INK_SUBTLE }}
              aria-hidden="true"
            >
              →
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

// ── Governance matrix ───────────────────────────────────────────────

export interface OportunGovernanceCell {
  label: string;
  color: TagColor;
}

export interface OportunGovernanceRow {
  action: string;
  cells: OportunGovernanceCell[];
}

export function OportunGovernanceTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: OportunGovernanceRow[];
}) {
  return (
    <div
      className="w-full overflow-x-auto rounded-[10px]"
      style={{ border: `1px solid ${SEPARATOR}` }}
    >
      <DataTable style={{ width: "100%" }}>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeader>Action</DataTableHeader>
            {columns.map((column) => (
              <DataTableHeader key={column}>{column}</DataTableHeader>
            ))}
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {rows.map((row) => (
            <DataTableRow key={row.action}>
              <DataTableCell>
                <Body as="span" size="small" weight="alt" UNSAFE_style={{ color: INK }}>
                  {row.action}
                </Body>
              </DataTableCell>
              {row.cells.map((cell, index) => (
                <DataTableCellStatus key={`${row.action}-${index}`}>
                  <Tag color={cell.color} size="small" variant="secondary">
                    {cell.label}
                  </Tag>
                </DataTableCellStatus>
              ))}
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    </div>
  );
}
