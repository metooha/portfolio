import React from "react";
import { Body } from "@/app/components/Text/Text";

const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";
const SURFACE = "var(--ld-semantic-color-fill, #ffffff)";
const SURFACE_SUBTLE = "var(--ld-semantic-color-fill-subtle, #f0f1f2)";
const INK = "var(--ld-semantic-color-text, #1a1a1a)";
const INK_SUBTLE = "var(--ld-semantic-color-text-subtlest, #74767c)";
const BRAND = "var(--ld-semantic-color-text-brand, #0053e2)";

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
    <div
      className="flex items-start gap-3 rounded-[10px] p-5"
      style={{
        background: onDark ? "rgba(120,140,255,0.14)" : "var(--ld-primitive-color-blue-5, #f0f5ff)",
        border: `1px solid ${onDark ? "rgba(120,140,255,0.3)" : SEPARATOR}`,
      }}
    >
      <span
        className="shrink-0 rounded-full mt-2"
        style={{ width: "5px", height: "5px", background: onDark ? "#ffffff" : BRAND }}
        aria-hidden="true"
      />
      <Body
        as="p"
        size="small"
        UNSAFE_className="m-0 leading-[1.65]"
        UNSAFE_style={{ color: onDark ? "rgba(255,255,255,0.82)" : undefined }}
      >
        <Body as="span" size="small" weight="alt" UNSAFE_style={{ color: onDark ? "#ffffff" : BRAND }}>
          {lead}{" "}
        </Body>
        {children}
      </Body>
    </div>
  );
}

// ── Unlock grid — title + description cards, 2x2 ─────────────────────

export function FigmaUnlockGrid({ items }: { items: { title: string; description: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
}

export function FigmaDayCard({
  tag,
  title,
  items,
}: {
  tag: string;
  title: string;
  items: FigmaDayItem[];
}) {
  return (
    <div className="rounded-[10px] overflow-hidden" style={{ border: `1px solid ${SEPARATOR}` }}>
      <div className="flex items-center gap-3 px-6 py-4" style={{ background: SURFACE_SUBTLE }}>
        <span
          className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full text-white"
          style={{ background: BRAND }}
        >
          {tag}
        </span>
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
            <span className="shrink-0 rounded-full mt-2" style={{ width: "5px", height: "5px", background: BRAND }} aria-hidden="true" />
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
          className="flex flex-col gap-4 rounded-[10px] p-6"
          style={{ background: SURFACE, border: `1px solid ${SEPARATOR}` }}
        >
          <Body as="p" size="small" UNSAFE_className="m-0 leading-[1.6] italic" UNSAFE_style={{ color: INK }}>
            &ldquo;{item.quote}&rdquo;
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0" UNSAFE_style={{ fontSize: "12px" }}>
            {item.attribution}
          </Body>
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
              className="text-[22px] font-bold leading-none"
              style={{ color: isCurrent ? "var(--ld-primitive-color-spark-100, #ffc220)" : "#ffffff" }}
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
