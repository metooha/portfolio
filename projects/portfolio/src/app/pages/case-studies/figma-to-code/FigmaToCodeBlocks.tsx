import React from "react";
import { Body } from "@/app/components/Text/Text";
import { Icon } from "@/app/components/Icons/Icons";
import { fluidSize } from "@/app/components/common/fluidSize";
import iconPalette from "@/app/assets/pages/case-study/figma-to-code/icons/palette.svg";
import iconCollection from "@/app/assets/pages/case-study/figma-to-code/icons/collection-icon.svg";

const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";
const SURFACE = "var(--ld-semantic-color-fill, #ffffff)";
const SURFACE_SUBTLE = "var(--ld-semantic-color-fill-subtle, #f0f1f2)";
const INK = "var(--ld-semantic-color-text, #1a1a1a)";
const INK_SUBTLE = "var(--ld-semantic-color-text-subtlest, #74767c)";
const BRAND = "var(--ld-semantic-color-text-brand, #0053e2)";

// ── Icon badge — a design-system icon in a small rounded card, paired
// with an eyebrow to punctuate a key narrative beat ───────────────────

export function FigmaIconBadge({ icon }: { icon: string }) {
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 rounded-[8px] size-8"
      style={{ background: SURFACE, border: `1px solid ${SEPARATOR}` }}
    >
      <Icon name={icon} decorative style={{ fontSize: "18px", color: BRAND }} />
    </span>
  );
}

// ── Stat cards — hero-scale numbers on shades of blue, label on one
// line beneath ────────────────────────────────────────────────────────

const STAT_TONES = [
  { bg: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)", value: "#0053e2" },
  { bg: "#dce8fc", value: "#114ab6" },
  { bg: "#cfe0fb", value: "#0b3fae" },
  { bg: "#c2d8f9", value: "#002e99" },
];

/** Same fluid clamp as the case study hero title, so the number carries the same visual weight. */
const HERO_VALUE_FONT_SIZE =
  "clamp(var(--ld-semantic-font-case-study-hero-size-min, 2.25rem), 4vw + 1.25rem, var(--ld-semantic-font-case-study-hero-size-max, 8.75rem))";

export interface FigmaStatItem {
  value: string;
  label: string;
}

export function FigmaStatCards({ stats }: { stats: FigmaStatItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const tone = STAT_TONES[index % STAT_TONES.length];
        return (
          <div key={stat.label} className="rounded-[20px] p-6" style={{ background: tone.bg }}>
            <div
              className="font-bold leading-[0.95] mb-2"
              style={{ fontSize: HERO_VALUE_FONT_SIZE, color: tone.value }}
            >
              {stat.value}
            </div>
            <p className="m-0 leading-snug" style={{ fontSize: "15px", color: INK }}>
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ── Callout — an icon-led insight, light or dark surface ─────────────

export function FigmaCallout({
  lead,
  children,
  onDark = false,
}: {
  lead: string;
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
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
        UNSAFE_className="underline"
        UNSAFE_style={{ color: onDark ? "#ffffff" : BRAND, textDecorationColor: onDark ? "#ffffff" : BRAND }}
      >
        {lead}{" "}
      </Body>
      {children}
    </Body>
  );
}

// ── Unlock grid — title + description cards, 2x2 ─────────────────────

export function FigmaUnlockGrid({
  items,
  columns = 2,
}: {
  items: { title: string; description: string }[];
  columns?: 1 | 2;
}) {
  return (
    <div className={`grid grid-cols-1 ${columns === 2 ? "md:grid-cols-2" : ""} gap-4`}>
      {items.map((item) => (
        <div
          key={item.title}
          className="flex flex-col gap-1.5 rounded-[10px] p-6"
          style={{ background: SURFACE, border: `1px solid ${SEPARATOR}` }}
        >
          <Body as="p" size="medium" weight="alt" UNSAFE_className="m-0" UNSAFE_style={{ color: INK }}>
            {item.title}
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.6]">
            {item.description}
          </Body>
        </div>
      ))}
    </div>
  );
}

// ── Day card — tag + heading + checklist, matches the onboarding /
// iteration framing used for Day Zero and Day One ────────────────────

export interface FigmaDayItem {
  lead: string;
  description: string;
  /** LD icon name to lead the row with, instead of the default dot bullet. */
  icon?: string;
}

export function FigmaDayCard({
  title,
  items,
}: {
  title: string;
  items: FigmaDayItem[];
}) {
  return (
    <div className="rounded-[10px] overflow-hidden" style={{ border: `1px solid ${SEPARATOR}` }}>
      <div className="flex items-center gap-3 px-6 py-4" style={{ background: SURFACE_SUBTLE }}>
        <Body as="p" size="medium" weight="alt" UNSAFE_className="m-0" UNSAFE_style={{ color: INK }}>
          {title}
        </Body>
      </div>
      <ul className="m-0 p-0 list-none flex flex-col" style={{ background: SURFACE }}>
        {items.map((item) => (
          <li
            key={item.lead}
            className="flex gap-3 px-6 py-3.5 border-t items-start"
            style={{ borderColor: SEPARATOR }}
          >
            {item.icon ? (
              <Icon name={item.icon} decorative style={{ fontSize: "16px", color: BRAND, marginTop: "1px" }} />
            ) : (
              <span className="shrink-0 rounded-full mt-2" style={{ width: "5px", height: "5px", background: BRAND }} aria-hidden="true" />
            )}
            <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.6]">
              <Body as="span" size="small" weight="alt" UNSAFE_style={{ color: INK }}>
                {item.lead}{" "}
              </Body>
              {item.description}
            </Body>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Tier / lifecycle chain — a readable chip row, with an optional
// highlighted step ────────────────────────────────────────────────────

export function FigmaTierChain({ tiers, highlight }: { tiers: string[]; highlight?: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tiers.map((tier, index) => {
        const isHighlighted = highlight?.includes(tier);
        return (
          <React.Fragment key={tier}>
            <span
              className="text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full"
              style={
                isHighlighted
                  ? { background: BRAND, color: "#ffffff" }
                  : { background: SURFACE_SUBTLE, color: INK, border: `1px solid ${SEPARATOR}` }
              }
            >
              {tier}
            </span>
            {index < tiers.length - 1 && (
              <span aria-hidden="true" style={{ color: INK_SUBTLE }}>
                &rarr;
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── Signal grid — a demand quote paired with what it signaled ────────

export interface FigmaSignal {
  quote: string;
  attribution: string;
  label: string;
  title: string;
  description: string;
}

export function FigmaSignalGrid({ items }: { items: FigmaSignal[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.quote}
          className="flex flex-col gap-4 rounded-[10px] p-6 h-full"
          style={{ background: SURFACE, border: `1px solid ${SEPARATOR}` }}
        >
          <div className="flex flex-col gap-4 flex-1">
            <Body as="p" size="small" UNSAFE_className="m-0 leading-[1.6] italic" UNSAFE_style={{ color: INK }}>
              &ldquo;{item.quote}&rdquo;
            </Body>
            <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0" UNSAFE_style={{ fontSize: "12px" }}>
              {item.attribution}
            </Body>
          </div>
          <div className="pt-3 border-t" style={{ borderColor: SEPARATOR }}>
            <Body
              as="p"
              size="small"
              weight="alt"
              UNSAFE_className="uppercase tracking-[0.1em] m-0 mb-1.5"
              UNSAFE_style={{ fontSize: "9px", color: BRAND }}
            >
              {item.label}
            </Body>
            <Body as="p" size="small" weight="alt" UNSAFE_className="m-0 mb-1" UNSAFE_style={{ color: INK }}>
              {item.title}
            </Body>
            <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.55]">
              {item.description}
            </Body>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Gen AI product journey — a 5-step stepper with a "current" state ──

export interface FigmaJourneyStep {
  number: string;
  title: string;
  description: string;
  status: "done" | "current" | "upcoming";
}

export function FigmaGenAiJourney({ steps }: { steps: FigmaJourneyStep[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {steps.map((step) => {
        const isCurrent = step.status === "current";
        return (
          <div
            key={step.number}
            className="relative flex flex-col gap-2.5 rounded-[10px] p-5"
            style={{
              background: isCurrent ? "rgba(255,194,32,0.1)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${isCurrent ? "rgba(255,194,32,0.4)" : "rgba(255,255,255,0.12)"}`,
            }}
          >
            {isCurrent && (
              <span
                className="absolute -top-3 left-5 text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                style={{ background: "var(--ld-primitive-color-spark-100, #ffc220)", color: "#1a1200" }}
              >
                We are here
              </span>
            )}
            <span
              className="font-bold leading-none"
              style={{ fontSize: fluidSize(18, 22), color: isCurrent ? "var(--ld-primitive-color-spark-100, #ffc220)" : "#ffffff" }}
            >
              {step.number}
            </span>
            <Body as="p" size="small" weight="alt" color="inverse" UNSAFE_className="m-0">
              {step.title}
            </Body>
            <Body as="p" size="small" UNSAFE_className="m-0 leading-[1.55]" UNSAFE_style={{ color: "rgba(255,255,255,0.6)" }}>
              {step.description}
            </Body>
          </div>
        );
      })}
    </div>
  );
}

export function FigmaEyebrowOnDark({ children }: { children: React.ReactNode }) {
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

export function FigmaPullQuote({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div
      className="rounded-[10px] p-7"
      style={{
        background: "rgba(255,194,32,0.08)",
        border: "1px solid rgba(255,194,32,0.25)",
      }}
    >
      <Body
        as="p"
        size="medium"
        UNSAFE_className="m-0 italic leading-[1.65]"
        UNSAFE_style={{ color: onDark ? "#ffffff" : INK, fontSize: "clamp(17px, 2vw, 20px)" }}
      >
        {children}
      </Body>
    </div>
  );
}

// ── Design vs. engineering comparison — the token drift illustration:
// a Figma variables panel next to the CSS an engineer hand-rewrites
// from it, matches the source Figma component 1:1 ─────────────────────

const DESIGN_ENGINEERING_DARK = "#1e1e1e";
const DESIGN_ENGINEERING_PANEL = "#2a2a2a";
const DESIGN_ENGINEERING_BORDER = "#3a3a3a";
const DESIGN_ENGINEERING_CYAN = "#90d6f9";
const DESIGN_ENGINEERING_GRAY = "#9ca3af";

const BRAND_COLOR_TOKENS = [
  { name: "Builder Purple", cssVar: "--builder-purple", light: "4C2883", dark: "AC7EF4" },
  { name: "Lemon Lime", cssVar: "--lemon-lime", light: "718B14", dark: "CAF829" },
  { name: "Sunny Day", cssVar: "--sunny-day", light: "BE9A21", dark: "F7C92E" },
];

function DesignEngineeringPanel({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-1 flex-col justify-center gap-8 md:gap-16 h-full min-w-0 rounded-[24px] p-6 sm:p-10 md:p-[60px]"
      style={{ background: DESIGN_ENGINEERING_DARK }}
    >
      <div className="flex flex-col gap-2">
        <Body
          as="p"
          size="small"
          weight="alt"
          UNSAFE_className="uppercase tracking-[0.12em] m-0"
          UNSAFE_style={{ color: DESIGN_ENGINEERING_CYAN, fontSize: "12px" }}
        >
          {eyebrow}
        </Body>
        <p className="m-0" style={{ color: "#ffffff", fontSize: "22px", fontWeight: 500, lineHeight: 1.2 }}>
          {title}
        </p>
        <p className="m-0" style={{ color: "#ffffff", fontSize: "16px", lineHeight: 1.5 }}>
          {body}
        </p>
      </div>
      {children}
    </div>
  );
}

function BrandVariablesTable() {
  return (
    <div
      className="rounded-[12px] border overflow-hidden md:h-[267px]"
      style={{
        background: DESIGN_ENGINEERING_PANEL,
        borderColor: DESIGN_ENGINEERING_BORDER,
        boxShadow: "0px 12px 12px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex items-center gap-2 px-3 py-2.5 border-b" style={{ borderColor: DESIGN_ENGINEERING_BORDER }}>
        <img src={iconCollection} alt="" className="shrink-0" style={{ width: "14px", height: "14px" }} />
        <span style={{ color: "#ffffff", fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap" }}>Brand Colors</span>
      </div>
      <div
        className="grid grid-cols-[1.1fr_1fr_1fr] gap-2 px-3 h-7 items-center border-b"
        style={{ borderColor: DESIGN_ENGINEERING_BORDER }}
      >
        {["Name", "Light", "Dark"].map((label) => (
          <span
            key={label}
            className="uppercase tracking-wide truncate"
            style={{ color: DESIGN_ENGINEERING_GRAY, fontSize: "10px", fontWeight: 600 }}
          >
            {label}
          </span>
        ))}
      </div>
      {BRAND_COLOR_TOKENS.map((token) => (
        <div
          key={token.name}
          className="grid grid-cols-[1.1fr_1fr_1fr] gap-2 px-3 h-9 items-center border-b last:border-b-0"
          style={{ borderColor: DESIGN_ENGINEERING_BORDER }}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <img src={iconPalette} alt="" className="shrink-0" style={{ width: "14px", height: "14px" }} />
            <span className="truncate" style={{ color: "#ffffff", fontSize: "12px" }}>{token.name}</span>
          </div>
          {[token.light, token.dark].map((hex) => (
            <div key={hex} className="flex items-center gap-1.5 min-w-0">
              <span
                className="shrink-0 rounded-[2px]"
                style={{ width: "12px", height: "12px", background: `#${hex}` }}
                aria-hidden="true"
              />
              <span className="truncate" style={{ color: "#ffffff", fontSize: "12px" }}>{hex}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const CODE_LINE_STYLE: React.CSSProperties = {
  fontFamily: "var(--ld-semantic-font-family-mono, EverydaySansMono, 'Courier New', monospace)",
  fontSize: "13px",
  lineHeight: "20px",
  whiteSpace: "nowrap",
};
const CODE_PROPERTY = "#c3d5ff";
const CODE_KEYWORD = "#ee2f5d";
const CODE_NUMBER = "#ff8000";
const CODE_VAR = "#86efac";

function CssEditorPanel() {
  return (
    <div
      className="rounded-[12px] border p-4 sm:p-6 md:h-[267px]"
      style={{
        background: DESIGN_ENGINEERING_PANEL,
        borderColor: DESIGN_ENGINEERING_BORDER,
        boxShadow: "0px 12px 12px rgba(0,0,0,0.4)",
      }}
    >
      <div className="overflow-x-auto">
      <div className="flex flex-col" style={CODE_LINE_STYLE}>
        <div>
          <span style={{ color: CODE_PROPERTY }}>align-items: </span>
          <span style={{ color: CODE_KEYWORD }}>flex-start</span>
          <span style={{ color: CODE_PROPERTY }}>;</span>
        </div>
        <div>
          <span style={{ color: CODE_PROPERTY }}>justify-content: </span>
          <span style={{ color: CODE_KEYWORD }}>flex-start</span>
          <span style={{ color: CODE_PROPERTY }}>;</span>
        </div>
        <div>
          <span style={{ color: CODE_PROPERTY }}>gap: </span>
          <span style={{ color: CODE_NUMBER }}>25</span>
          <span style={{ color: CODE_KEYWORD }}>px</span>
          <span style={{ color: CODE_PROPERTY }}>;</span>
        </div>
        <div style={{ color: CODE_PROPERTY }}>{"}"}</div>
        <div style={{ height: "20px" }} aria-hidden="true" />
        <div style={{ color: CODE_KEYWORD }}>{":root {"}</div>
        {BRAND_COLOR_TOKENS.map((token) => (
          <div key={token.cssVar} className="flex items-center gap-2">
            <span style={{ color: CODE_VAR }}>{`  ${token.cssVar}: `}</span>
            <span
              className="shrink-0 rounded-[2px]"
              style={{ width: "12px", height: "12px", background: `#${token.dark}` }}
              aria-hidden="true"
            />
            <span style={{ color: CODE_KEYWORD }}>{`#${token.dark};`}</span>
          </div>
        ))}
        <div style={{ color: CODE_PROPERTY }}>{"}"}</div>
      </div>
      </div>
    </div>
  );
}

/** The "Design specifies it in Figma / Engineering rebuilds it in code" comparison — built as real markup instead of a flattened screenshot, so the drift it illustrates isn't itself a static image. Sized to fill the standard content column width, matching the rest of the case study's sections. */
export function FigmaDesignEngineeringPanel() {
  return (
    <div
      className="w-full grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-6 md:gap-10 rounded-[24px] p-4 sm:p-6 md:p-10"
      style={{ background: "#f5f6fa" }}
    >
      <DesignEngineeringPanel
        eyebrow="DESIGN"
        title="Specifies it in Figma"
        body="Tokens, spacing, states are all precisely defined."
      >
        <BrandVariablesTable />
      </DesignEngineeringPanel>
      <div
        className="flex items-center justify-center self-center shrink-0 rotate-90 md:rotate-0"
        style={{ width: "40px", height: "40px" }}
        aria-hidden="true"
      >
        <Icon name="ArrowRight" style={{ fontSize: "24px", color: DESIGN_ENGINEERING_GRAY }} />
      </div>
      <DesignEngineeringPanel
        eyebrow="ENGINEERING"
        title="Rebuilds it in code"
        body="Reads the file, re-implements every value. First pass rarely matches. Now the specs live in two places, and starts to drift."
      >
        <CssEditorPanel />
      </DesignEngineeringPanel>
    </div>
  );
}
