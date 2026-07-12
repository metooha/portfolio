import React from "react";
import { Body, Heading } from "@/app/components/Text/Text";
import { Icon } from "@/app/components/Icons/Icons";

const ACCENT = "#0053e2";
const DARK = "#001e60";
const SPARK = "#ffc220";
const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";
const SUBTLE_FILL = "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)";

/** Three testimonial-style quote cards, one per team starting position. */
export function TestimonialGrid({
  quotes,
}: {
  quotes: { quote: string; who: string; tag: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {quotes.map((q) => (
        <div
          key={q.who}
          className="rounded-[10px] p-6"
          style={{ background: SUBTLE_FILL, border: `1px solid ${SEPARATOR}` }}
        >
          <Body as="p" size="small" UNSAFE_className="italic leading-[1.65] mb-4">
            {q.quote}
          </Body>
          <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: DARK }}>
            {q.who}
          </Body>
          <Body as="p" size="small" UNSAFE_className="mt-0.5" UNSAFE_style={{ color: ACCENT }}>
            {q.tag}
          </Body>
        </div>
      ))}
    </div>
  );
}

/** Three use-case cards with a dark header, icon, and pattern chips. */
export function UseCaseGrid({
  items,
}: {
  items: {
    icon: string;
    headerColor: string;
    type: string;
    example: string;
    description: string;
    patterns: string[];
  }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.type}
          className="rounded-[10px] overflow-hidden flex flex-col"
          style={{ border: `1px solid ${SEPARATOR}` }}
        >
          <div className="p-6 flex flex-col gap-3" style={{ background: item.headerColor }}>
            <span style={{ color: "#ffffff" }}>
              <Icon name={item.icon} size="medium" decorative />
            </span>
            <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: "#ffffff" }}>
              {item.type}
            </Body>
          </div>
          <div className="p-6 bg-white flex-1 flex flex-col gap-4">
            <Body
              as="p"
              size="small"
              weight="alt"
              UNSAFE_className="uppercase tracking-[0.1em]"
              UNSAFE_style={{ fontSize: "10px", color: "var(--ld-semantic-color-text-subtlest, #74767c)" }}
            >
              {item.example}
            </Body>
            <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.65]">
              {item.description}
            </Body>
            <div
              className="mt-auto pt-3 flex flex-wrap gap-1.5"
              style={{ borderTop: `1px solid ${SEPARATOR}` }}
            >
              {item.patterns.map((p) => (
                <span
                  key={p}
                  className="text-[11px] px-2 py-1 rounded"
                  style={{ background: "var(--ld-semantic-color-fill-subtle, #f8f8f8)", color: DARK, border: `1px solid ${SEPARATOR}` }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Use case x platform requirements matrix. */
export function PlatformMatrix({
  columns,
  rows,
}: {
  columns: string[];
  rows: { label: string; cells: string[]; infra?: boolean }[];
}) {
  return (
    <div className="rounded-[10px] overflow-hidden" style={{ border: `1px solid ${SEPARATOR}` }}>
      <div
        className="grid"
        style={{ gridTemplateColumns: `1.4fr repeat(${columns.length}, 1fr)`, background: DARK }}
      >
        <div />
        {columns.map((c) => (
          <div key={c} className="px-4 py-4">
            <Body
              as="p"
              size="small"
              weight="alt"
              UNSAFE_className="uppercase tracking-[0.08em]"
              UNSAFE_style={{ fontSize: "10px", color: "rgba(255,255,255,0.75)" }}
            >
              {c}
            </Body>
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid border-t"
          style={{
            gridTemplateColumns: `1.4fr repeat(${columns.length}, 1fr)`,
            borderColor: SEPARATOR,
            background: row.infra ? "var(--ld-semantic-color-fill-subtle, #f8f8f8)" : "#ffffff",
          }}
        >
          <div className="px-4 py-4 flex items-center" style={{ borderRight: `1px solid ${SEPARATOR}` }}>
            <Body
              as="p"
              size="small"
              weight={row.infra ? "default" : "alt"}
              UNSAFE_className={row.infra ? "uppercase tracking-[0.08em]" : ""}
              UNSAFE_style={{ fontSize: row.infra ? "10px" : "13px", color: row.infra ? "var(--ld-semantic-color-text-subtlest, #74767c)" : DARK }}
            >
              {row.label}
            </Body>
          </div>
          {row.cells.map((cell, i) => (
            <div key={i} className="px-4 py-4 flex items-center" style={{ borderLeft: `1px solid ${SEPARATOR}` }}>
              <Body as="p" size="small" UNSAFE_style={{ color: row.infra ? "var(--ld-semantic-color-text-subtlest, #74767c)" : DARK, fontSize: "13px" }}>
                {cell}
              </Body>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Component naming taxonomy: four stacked levels from published down to atoms. */
export function NamingTaxonomy({
  levels,
}: {
  levels: {
    badge: string;
    title: string;
    description: string;
    examples: string[];
    tone: "published" | "sub" | "base" | "atom";
    connector?: string;
  }[];
}) {
  const TONE: Record<string, { bg: string; badgeBg: string; badgeColor: string; titleColor: string; descColor: string; chipBg: string; chipColor: string }> = {
    published: { bg: DARK, badgeBg: SPARK, badgeColor: DARK, titleColor: "#ffffff", descColor: "rgba(255,255,255,0.78)", chipBg: "rgba(255,255,255,0.16)", chipColor: "rgba(255,255,255,0.92)" },
    sub: { bg: "rgba(0,83,226,0.06)", badgeBg: ACCENT, badgeColor: "#ffffff", titleColor: DARK, descColor: "var(--ld-semantic-color-text-subtlest, #74767c)", chipBg: "rgba(0,83,226,0.1)", chipColor: ACCENT },
    base: { bg: "rgba(78,189,245,0.1)", badgeBg: "#4ebdf5", badgeColor: DARK, titleColor: DARK, descColor: "var(--ld-semantic-color-text-subtlest, #74767c)", chipBg: "rgba(78,189,245,0.18)", chipColor: "#0369a1" },
    atom: { bg: "#ffffff", badgeBg: SEPARATOR, badgeColor: "var(--ld-semantic-color-text-subtlest, #74767c)", titleColor: DARK, descColor: "var(--ld-semantic-color-text-subtlest, #74767c)", chipBg: "var(--ld-semantic-color-fill-subtle, #f8f8f8)", chipColor: "var(--ld-semantic-color-text-subtlest, #74767c)" },
  };

  return (
    <div className="rounded-[10px] p-6 flex flex-col gap-0" style={{ background: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)" }}>
      {levels.map((level, i) => {
        const t = TONE[level.tone];
        return (
          <React.Fragment key={level.title}>
            <div
              className="rounded-lg p-5 flex flex-col gap-2.5"
              style={{ background: t.bg, border: level.tone === "atom" ? `1px solid ${SEPARATOR}` : level.tone === "sub" ? "1px solid rgba(0,83,226,0.15)" : level.tone === "base" ? "1px solid rgba(78,189,245,0.2)" : undefined }}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full self-start"
                style={{ background: t.badgeBg, color: t.badgeColor }}
              >
                {level.badge}
              </span>
              <code className="text-[13px] font-bold" style={{ color: t.titleColor }}>
                {level.title}
              </code>
              <Body as="p" size="small" UNSAFE_style={{ color: t.descColor, fontSize: "12px" }}>
                {level.description}
              </Body>
              <div className="flex flex-wrap gap-1.5">
                {level.examples.map((ex) => (
                  <code
                    key={ex}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded"
                    style={{ background: t.chipBg, color: t.chipColor }}
                  >
                    {ex}
                  </code>
                ))}
              </div>
            </div>
            {i < levels.length - 1 && (
              <div className="text-center py-2" style={{ fontSize: "11px", color: "var(--ld-semantic-color-text-subtlest, #74767c)" }}>
                {level.connector ?? "↓"}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/** Simplified Airtable-style build tracker table. */
export function TrackerTable({
  rows,
}: {
  rows: { name: string; status: "Published" | "In review" | "In build" | "Queued" }[];
}) {
  const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
    Published: { bg: "rgba(0,83,226,0.1)", color: ACCENT },
    "In review": { bg: "rgba(255,194,32,0.2)", color: "#92640a" },
    "In build": { bg: "rgba(78,189,245,0.18)", color: "#0369a1" },
    Queued: { bg: "var(--ld-semantic-color-fill-subtle, #f8f8f8)", color: "var(--ld-semantic-color-text-subtlest, #74767c)" },
  };
  return (
    <div className="rounded-[10px] overflow-hidden" style={{ border: `1px solid ${SEPARATOR}` }}>
      <div className="px-5 py-3" style={{ background: DARK }}>
        <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: "#ffffff" }}>
          Subsystem Planning Base &middot; Build Tracker
        </Body>
      </div>
      {rows.map((row, i) => {
        const s = STATUS_STYLE[row.status];
        return (
          <div
            key={row.name}
            className="flex items-center justify-between px-5 py-3"
            style={{ background: i % 2 === 0 ? "#ffffff" : "var(--ld-semantic-color-fill-subtle, #f8f8f8)", borderTop: `1px solid ${SEPARATOR}` }}
          >
            <code className="text-[12px] font-semibold" style={{ color: DARK }}>
              {row.name}
            </code>
            <span
              className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full"
              style={{ background: s.bg, color: s.color }}
            >
              {row.status}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Row of kit chips showing the framework reused across other systems. */
export function FrameworkKits({
  kits,
}: {
  kits: { icon: string; name: string; status: string; done?: boolean }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
      {kits.map((kit) => (
        <div
          key={kit.name}
          className="rounded-lg p-4 flex flex-col gap-2.5"
          style={{
            background: kit.done ? "rgba(255,194,32,0.14)" : "rgba(255,255,255,0.06)",
            border: kit.done ? "1px solid rgba(255,194,32,0.3)" : "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span style={{ color: kit.done ? SPARK : "rgba(255,255,255,0.75)" }}>
            <Icon name={kit.icon} size="medium" decorative />
          </span>
          <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: "#ffffff", fontSize: "13px" }}>
            {kit.name}
          </Body>
          <Body as="p" size="small" UNSAFE_style={{ color: kit.done ? SPARK : "rgba(255,255,255,0.72)", fontSize: "11px" }}>
            {kit.status}
          </Body>
        </div>
      ))}
    </div>
  );
}

/** Horizontal layer chips connected by arrows, showing where the kit sits in the design system stack. */
export function LayerStack({
  layers,
}: {
  layers: { title: string; detail: string; highlight?: boolean }[];
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-2">
      {layers.map((layer, i) => (
        <React.Fragment key={layer.title}>
          <div
            className="flex-1 rounded-lg p-5"
            style={{
              background: layer.highlight ? "rgba(0,83,226,0.05)" : "#ffffff",
              border: layer.highlight ? `1px solid ${ACCENT}` : `1px solid ${SEPARATOR}`,
            }}
          >
            <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: layer.highlight ? ACCENT : DARK, fontSize: "13px" }}>
              {layer.title}
            </Body>
            <Body as="p" size="small" color="subtlest" UNSAFE_className="mt-2 leading-snug" UNSAFE_style={{ fontSize: "12px" }}>
              {layer.detail}
            </Body>
          </div>
          {i < layers.length - 1 && (
            <div className="flex items-center justify-center shrink-0" style={{ color: "#9aa9c9" }}>
              <Icon name="ArrowRight" size="small" decorative />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
