import React from "react";
import { Body, Heading } from "@/app/components/Text/Text";
import { Icon } from "@/app/components/Icons/Icons";
import { Tag } from "@/app/components/Tag/Tag";

const ACCENT = "#0053e2";
const DARK = "#001e60";
const SPARK = "#ffc220";
const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";

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
          <div className="p-6 flex flex-row items-center gap-3" style={{ background: item.headerColor }}>
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
                <Tag key={p} color="gray" size="small">
                  {p}
                </Tag>
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
  const TONE: Record<
    string,
    { bg: string; titleColor: string; descColor: string; tagColor: React.ComponentProps<typeof Tag>["color"] }
  > = {
    published: { bg: DARK, titleColor: "#ffffff", descColor: "rgba(255,255,255,0.78)", tagColor: "spark" },
    sub: { bg: "rgba(0,83,226,0.06)", titleColor: DARK, descColor: "var(--ld-semantic-color-text-subtlest, #74767c)", tagColor: "brand" },
    base: { bg: "rgba(78,189,245,0.1)", titleColor: DARK, descColor: "var(--ld-semantic-color-text-subtlest, #74767c)", tagColor: "cyan" },
    atom: { bg: "#ffffff", titleColor: DARK, descColor: "var(--ld-semantic-color-text-subtlest, #74767c)", tagColor: "gray" },
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
              <Tag color={t.tagColor} size="small" UNSAFE_className="self-start">
                {level.badge}
              </Tag>
              <code className="text-[13px] font-bold" style={{ color: t.titleColor }}>
                {level.title}
              </code>
              <Body as="p" size="small" UNSAFE_style={{ color: t.descColor, fontSize: "12px" }}>
                {level.description}
              </Body>
              <div className="flex flex-wrap gap-1.5">
                {level.examples.map((ex) => (
                  <Tag key={ex} color={t.tagColor} variant="tertiary" size="small">
                    <code className="font-semibold">{ex}</code>
                  </Tag>
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
  const STATUS_TAG: Record<string, React.ComponentProps<typeof Tag>["color"]> = {
    Published: "brand",
    "In review": "warning",
    "In build": "cyan",
    Queued: "gray",
  };
  return (
    <div className="rounded-[10px] overflow-hidden" style={{ border: `1px solid ${SEPARATOR}` }}>
      <div className="px-5 py-3" style={{ background: DARK }}>
        <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: "#ffffff" }}>
          Subsystem Planning Base &middot; Build Tracker
        </Body>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.name}
          className="flex items-center justify-between px-5 py-3"
          style={{ background: i % 2 === 0 ? "#ffffff" : "var(--ld-semantic-color-fill-subtle, #f8f8f8)", borderTop: `1px solid ${SEPARATOR}` }}
        >
          <code className="text-[12px] font-semibold" style={{ color: DARK }}>
            {row.name}
          </code>
          <Tag color={STATUS_TAG[row.status]} size="small">
            {row.status}
          </Tag>
        </div>
      ))}
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

type TeamPerson = { name: string; title: string; avatar: string };

function ChartSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Heading as="h3" size="small" weight="default" UNSAFE_style={{ color: DARK }}>
        {children}
      </Heading>
      <div style={{ width: "32px", height: "4px", borderRadius: "2px", background: SPARK }} />
    </div>
  );
}

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: ACCENT, fontSize: "13px" }}>
      {children}
    </Body>
  );
}

function TeamPersonRow({ name, title, avatar }: TeamPerson) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={avatar}
        alt=""
        className="rounded-full object-cover shrink-0"
        style={{ width: "40px", height: "40px" }}
      />
      <div>
        <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: DARK, fontSize: "13px" }}>
          {name}
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_style={{ fontSize: "12px" }}>
          {title}
        </Body>
      </div>
    </div>
  );
}

function TeamInformedRow({ initials, team, role }: { initials: string; team: string; role: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="rounded-full flex items-center justify-center shrink-0 font-bold"
        style={{
          width: "40px",
          height: "40px",
          background: "var(--ld-semantic-color-fill-accent-pink-subtle, #fce9f5)",
          color: "var(--ld-semantic-color-text-accent-pink-bold, #8c1e64)",
          fontSize: "11px",
        }}
      >
        {initials}
      </div>
      <div>
        <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: DARK, fontSize: "13px" }}>
          {team}
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_style={{ fontSize: "12px" }}>
          {role}
        </Body>
      </div>
    </div>
  );
}

/** Live team-structure chart: key stakeholders (decision makers, collaborators, informed) plus design partners grouped by product area, rendered as real markup with real avatars instead of a flattened screenshot. */
export function TeamStructureChart({
  title,
  caption,
  decisionMakers,
  collaborators,
  informed,
  designPartnerColumns,
}: {
  title?: string;
  caption?: string;
  decisionMakers: TeamPerson[];
  collaborators: TeamPerson[];
  informed: { initials: string; team: string; role: string }[];
  designPartnerColumns: { team: string; people: TeamPerson[] }[][];
}) {
  return (
    <div className="flex flex-col gap-6">
      {(title || caption) && (
        <div className="flex flex-col gap-1.5">
          {title && (
            <Heading as="h3" size="medium" weight="default" UNSAFE_style={{ color: DARK }}>
              {title}
            </Heading>
          )}
          {caption && (
            <Body as="p" size="small" color="subtlest">
              {caption}
            </Body>
          )}
        </div>
      )}
      <div className="rounded-[10px] p-6 sm:p-8" style={{ border: `1px solid ${SEPARATOR}`, background: "#ffffff" }}>
        <ChartSectionLabel>Key Stakeholders</ChartSectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6 mt-6">
          <div className="flex flex-col gap-4">
            <ColumnLabel>Decision Makers</ColumnLabel>
            {decisionMakers.map((p) => (
              <TeamPersonRow key={p.name} {...p} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <ColumnLabel>Collaborators</ColumnLabel>
            {collaborators.map((p) => (
              <TeamPersonRow key={p.name} {...p} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <ColumnLabel>Informed</ColumnLabel>
            {informed.map((g) => (
              <TeamInformedRow key={g.team} {...g} />
            ))}
          </div>
        </div>

        <div className="my-8" style={{ borderTop: `1px solid ${SEPARATOR}` }} />

        <ChartSectionLabel>Design Partners</ChartSectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 mt-6">
          {designPartnerColumns.map((column, i) => (
            <div key={i} className="flex flex-col gap-6">
              {column.map((group) => (
                <div key={group.team} className="flex flex-col gap-4">
                  <ColumnLabel>{group.team}</ColumnLabel>
                  {group.people.map((p) => (
                    <TeamPersonRow key={p.name} {...p} />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
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
