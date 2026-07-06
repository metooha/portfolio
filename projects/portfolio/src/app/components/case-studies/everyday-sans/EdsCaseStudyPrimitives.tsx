import React from "react";
import { Body, Heading } from "@/app/components/Text/Text";

/** Matches CaseStudyTemplate overview shell (max-w-7xl + inner content width). */
const CONTAINER_OUTER = "w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px]";
const CONTAINER_INNER = "w-full max-w-4xl lg:max-w-[1046px] flex flex-col gap-6";

export function EdsSection({
  id,
  variant = "default",
  children,
  className = "",
}: {
  id?: string;
  variant?: "default" | "mid" | "dark";
  children: React.ReactNode;
  className?: string;
}) {
  const bg =
    variant === "mid"
      ? "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)"
      : variant === "dark"
        ? "var(--ld-semantic-color-fill-brand, #0053e2)"
        : "var(--ld-semantic-color-fill, #ffffff)";

  return (
    <section
      id={id}
      className={`w-full shrink-0 border-b ${className}`}
      style={{
        background: bg,
        borderColor: "var(--ld-semantic-color-separator, #e3e4e5)",
        paddingTop: "var(--ld-semantic-spacing-1000, 5rem)",
        paddingBottom: "var(--ld-semantic-spacing-1000, 5rem)",
      }}
    >
      <div className={CONTAINER_OUTER}>
        <div className={CONTAINER_INNER}>{children}</div>
      </div>
    </section>
  );
}

export function EdsEyebrow({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <Body
      as="p"
      size="small"
      weight="alt"
      UNSAFE_className="uppercase tracking-[0.12em]"
      UNSAFE_style={{
        color: onDark
          ? "var(--ld-primitive-color-spark-100, #ffc220)"
          : "var(--ld-semantic-color-text-brand, #0053e2)",
        fontSize: "11px",
      }}
    >
      {children}
    </Body>
  );
}

export function EdsSectionTitle({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <Heading
      as="h2"
      size="medium"
      weight="default"
      UNSAFE_className="leading-[1.15]"
      UNSAFE_style={{
        color: onDark ? "var(--ld-primitive-color-white, #ffffff)" : undefined,
        fontSize: "clamp(24px, 3vw, 38px)",
      }}
    >
      {children}
    </Heading>
  );
}

export function EdsLead({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <Body
      as="p"
      size="medium"
      color={onDark ? undefined : "subtlest"}
      UNSAFE_className="max-w-[660px] leading-[1.7]"
      UNSAFE_style={{
        fontSize: "17px",
        color: onDark ? "rgba(255,255,255,0.6)" : undefined,
      }}
    >
      {children}
    </Body>
  );
}

export function EdsProblemGrid({
  cards,
}: {
  cards: { who: string; whoColor: string; title: string; description: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card) => (
        <div
          key={card.who}
          className="rounded-[10px] p-6"
          style={{
            background: "var(--ld-primitive-color-blue-5, #f0f5ff)",
            border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
          }}
        >
          <Body
            as="p"
            size="small"
            weight="alt"
            UNSAFE_className="uppercase tracking-[0.1em] mb-2"
            UNSAFE_style={{ fontSize: "10px", color: card.whoColor }}
          >
            {card.who}
          </Body>
          <Body as="p" size="medium" weight="alt" UNSAFE_className="mb-2" UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)" }}>
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

export type EdsImageSurface = "white" | "subtle";

const IMAGE_SURFACE: Record<EdsImageSurface, string> = {
  white: "var(--ld-semantic-color-fill, #ffffff)",
  subtle: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)",
};

export function EdsImageFrame({
  src,
  alt,
  className = "",
  imageClassName = "",
  fit = "natural",
  bordered = false,
  rounded = true,
  surface = "white",
  clipEdges = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fit?: "natural" | "cover" | "contain";
  bordered?: boolean;
  rounded?: boolean;
  surface?: EdsImageSurface;
  clipEdges?: boolean;
}) {
  const imgSize = fit === "natural" ? "h-auto" : "h-full";
  const imgFit =
    fit === "cover" ? "object-cover" : fit === "contain" ? "object-contain" : "";

  return (
    <div
      className={`w-full ${rounded ? "overflow-hidden rounded-xl" : "overflow-hidden"} ${className}`}
      style={{
        background: IMAGE_SURFACE[surface],
        border: bordered ? "1px solid var(--ld-semantic-color-separator, #e3e4e5)" : undefined,
      }}
    >
      <div className={clipEdges ? "overflow-hidden -m-[3px] p-[3px]" : undefined}>
        <img
          src={src}
          alt={alt}
          className={`block w-full ${imgSize} ${imgFit} ${imageClassName}`.trim()}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

export function EdsImageFull({
  src,
  alt,
  caption,
  label,
  className = "",
  frameClassName = "",
  imageClassName = "",
  fit = "natural",
  surface = "white",
  clipEdges = true,
}: {
  src: string;
  alt: string;
  caption?: string;
  label?: string;
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
  fit?: "natural" | "cover" | "contain";
  surface?: EdsImageSurface;
  clipEdges?: boolean;
}) {
  return (
    <figure className={`m-0 flex flex-col gap-6 ${className}`}>
      {label && (
        <Body
          as="p"
          size="small"
          weight="alt"
          color="brand"
          UNSAFE_className="uppercase tracking-[0.1em]"
          UNSAFE_style={{ fontSize: "10px" }}
        >
          {label}
        </Body>
      )}
      <EdsImageFrame
        src={src}
        alt={alt}
        className={frameClassName}
        imageClassName={imageClassName}
        fit={fit}
        surface={surface}
        clipEdges={clipEdges}
      />
      {caption && (
        <Body as="figcaption" size="small" color="subtlest" UNSAFE_className="leading-snug">
          {caption}
        </Body>
      )}
    </figure>
  );
}

export function EdsVideoFrame({
  src,
  alt,
  className = "",
  videoClassName = "",
  fit = "natural",
  bordered = false,
  rounded = true,
  surface = "white",
  clipEdges = true,
}: {
  src: string;
  alt: string;
  className?: string;
  videoClassName?: string;
  fit?: "natural" | "cover" | "contain";
  bordered?: boolean;
  rounded?: boolean;
  surface?: EdsImageSurface;
  clipEdges?: boolean;
}) {
  const videoSize = fit === "natural" ? "h-auto" : "h-full";
  const videoFit =
    fit === "cover" ? "object-cover" : fit === "contain" ? "object-contain" : "";

  return (
    <div
      className={`w-full ${rounded ? "overflow-hidden rounded-xl" : "overflow-hidden"} ${className}`}
      style={{
        background: IMAGE_SURFACE[surface],
        border: bordered ? "1px solid var(--ld-semantic-color-separator, #e3e4e5)" : undefined,
      }}
    >
      <div className={clipEdges ? "overflow-hidden -m-[3px] p-[3px]" : undefined}>
        <video
          src={src}
          aria-label={alt}
          className={`block w-full ${videoSize} ${videoFit} ${videoClassName}`.trim()}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  );
}

export function EdsVideoFull({
  src,
  alt,
  caption,
  label,
  className = "",
  frameClassName = "",
  videoClassName = "",
  fit = "natural",
  surface = "white",
}: {
  src: string;
  alt: string;
  caption?: string;
  label?: string;
  className?: string;
  frameClassName?: string;
  videoClassName?: string;
  fit?: "natural" | "cover" | "contain";
  surface?: EdsImageSurface;
}) {
  return (
    <figure className={`m-0 flex flex-col gap-6 ${className}`}>
      {label && (
        <Body
          as="p"
          size="small"
          weight="alt"
          color="brand"
          UNSAFE_className="uppercase tracking-[0.1em]"
          UNSAFE_style={{ fontSize: "10px" }}
        >
          {label}
        </Body>
      )}
      <EdsVideoFrame
        src={src}
        alt={alt}
        className={frameClassName}
        videoClassName={videoClassName}
        fit={fit}
        surface={surface}
      />
      {caption && (
        <Body as="figcaption" size="small" color="subtlest" UNSAFE_className="leading-snug">
          {caption}
        </Body>
      )}
    </figure>
  );
}

export function EdsImageGrid2({
  items,
  className = "",
  stacked = false,
}: {
  items: { src: string; alt: string; caption?: string; label?: string; frameClassName?: string; imageClassName?: string; fit?: "natural" | "cover" | "contain"; surface?: EdsImageSurface }[];
  className?: string;
  stacked?: boolean;
}) {
  return (
    <div className={`grid gap-6 ${stacked ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} ${className}`}>
      {items.map((item) => (
        <EdsImageFull key={item.alt} {...item} />
      ))}
    </div>
  );
}

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

export type EdsJourneyMood = "friction" | "blocker" | "progress" | "win";

export interface EdsJourneyItem {
  date: string;
  phase: string;
  who: { label: string; variant: "brand" | "engineering" | "a11y" | "foundry" }[];
  story: string;
  tension?: string;
  win?: string;
  mood: EdsJourneyMood;
}

const MOOD_COLOR: Record<EdsJourneyMood, string> = {
  friction: "var(--ld-semantic-color-text-negative, #ea1100)",
  blocker: "var(--ld-primitive-color-orange-100, #fa6400)",
  progress: "var(--ld-semantic-color-text-brand, #0053e2)",
  win: "var(--ld-semantic-color-text-positive, #2a8703)",
};

const CHIP_STYLE: Record<EdsJourneyItem["who"][number]["variant"], { bg: string; color: string; border: string }> = {
  brand: { bg: "#e8f2ff", color: "#1a4f8a", border: "#bed8f5" },
  engineering: { bg: "#e6fff7", color: "#1a5c3a", border: "#9fdccc" },
  a11y: { bg: "#f3eeff", color: "#553c9a", border: "#d9c9f5" },
  foundry: { bg: "#fff3e6", color: "#7b3a00", border: "#f5d9b5" },
};

export function EdsJourneyTimeline({ items }: { items: EdsJourneyItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <div key={`${item.date}-${item.phase}`} className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
          <div
            className="relative py-7 pr-5 md:border-r-2"
            style={{ borderColor: "var(--ld-semantic-color-separator, #e3e4e5)" }}
          >
            <div
              className="hidden md:block absolute -right-[7px] top-8 w-3 h-3 rounded-full border-2 border-white"
              style={{ background: MOOD_COLOR[item.mood], boxShadow: `0 0 0 2px ${MOOD_COLOR[item.mood]}` }}
            />
            <Body as="p" size="small" weight="alt" color="subtlest" UNSAFE_className="tracking-wide mb-1" UNSAFE_style={{ fontSize: "11px" }}>
              {item.date}
            </Body>
            <Body as="p" size="small" weight="alt" UNSAFE_className="italic leading-snug mb-2" UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)" }}>
              {item.phase}
            </Body>
            <div className="flex flex-wrap gap-1">
              {item.who.map((w) => (
                <span
                  key={w.label}
                  className="text-[9px] font-bold uppercase tracking-wide px-[7px] py-0.5 rounded-full border"
                  style={CHIP_STYLE[w.variant]}
                >
                  {w.label}
                </span>
              ))}
            </div>
          </div>
          <div className="py-7 md:pl-9">
            <Body as="p" size="small" UNSAFE_className="leading-[1.7] mb-2.5">
              {item.story}
            </Body>
            {item.tension && (
              <div
                className="text-[13px] leading-snug my-2 pl-3 border-l-[3px] rounded-r-[5px] py-2 pr-3"
                style={{ background: "#fff3e6", borderColor: "var(--ld-primitive-color-orange-100, #fa6400)", color: "#7b3200" }}
              >
                <span className="font-bold">Tension: </span>
                {item.tension}
              </div>
            )}
            {item.win && (
              <div
                className="text-[13px] leading-snug my-2 pl-3 border-l-[3px] rounded-r-[5px] py-2 pr-3"
                style={{ background: "var(--ld-primitive-color-green-10, #eaf3e6)", borderColor: "var(--ld-semantic-color-text-positive, #2a8703)", color: "var(--ld-semantic-color-text-positive-bold, #1d5f02)" }}
              >
                <span className="font-bold">Aligned: </span>
                {item.win}
              </div>
            )}
          </div>
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
            className="text-[38px] font-bold leading-none"
            style={{ color: variant === "pre" ? "var(--ld-semantic-color-text-brand, #0053e2)" : "var(--ld-semantic-color-text-positive, #2a8703)" }}
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

export function EdsStatsRow({
  stats,
  variant = "dark",
}: {
  stats: { value: string; label: string; valueColor?: string }[];
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden"
      style={{
        background: isLight ? "var(--ld-semantic-color-separator, #e3e4e5)" : "rgba(255,255,255,0.1)",
        border: isLight ? "1px solid var(--ld-semantic-color-separator, #e3e4e5)" : "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center px-5 py-8"
          style={{ background: isLight ? "#e7f1fc" : "rgba(255,255,255,0.04)" }}
        >
          <div
            className="text-[44px] font-bold leading-none mb-2"
            style={{
              color: stat.valueColor ?? (isLight ? "#0053e2" : "var(--ld-primitive-color-spark-100, #ffc220)"),
            }}
          >
            {stat.value}
          </div>
          <Body
            as="p"
            size="small"
            UNSAFE_className="leading-snug"
            UNSAFE_style={{
              color: isLight ? "#001e60" : "rgba(255,255,255,0.55)",
              fontSize: "13px",
              opacity: isLight ? 0.75 : 1,
            }}
          >
            {stat.label}
          </Body>
        </div>
      ))}
    </div>
  );
}

export function EdsBeforeAfter({
  before,
  after,
}: {
  before: { who: string; title: string; description: string }[];
  after: { who: string; title: string; description: string }[];
}) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-xl overflow-hidden"
      style={{ background: "var(--ld-semantic-color-separator, #e3e4e5)", border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)" }}
    >
      {[
        { header: "Before", headerColor: "var(--ld-semantic-color-text-negative, #ea1100)", rows: before },
        { header: "After", headerColor: "var(--ld-semantic-color-text-positive, #2a8703)", rows: after },
      ].map((col) => (
        <div key={col.header} className="p-7 bg-white">
          <Body
            as="p"
            size="small"
            weight="alt"
            UNSAFE_className="uppercase tracking-[0.1em] mb-5 border-b-2"
            UNSAFE_style={{ fontSize: "10px", color: col.headerColor, borderColor: col.headerColor }}
          >
            {col.header}
          </Body>
          {col.rows.map((row) => (
            <div key={row.who} className="mb-4 pb-4 border-b last:mb-0 last:pb-0 last:border-b-0" style={{ borderColor: "var(--ld-semantic-color-separator, #e3e4e5)" }}>
              <Body as="p" size="small" weight="alt" color="subtlest" UNSAFE_className="uppercase tracking-wide mb-1 pt-3" UNSAFE_style={{ fontSize: "10px" }}>
                {row.who}
              </Body>
              <Body as="p" size="small" weight="alt" UNSAFE_className="mb-1">
                {row.title}
              </Body>
              <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
                {row.description}
              </Body>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function EdsQuoteBlock({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <div
      className="w-full shrink-0"
      style={{
        background: "var(--ld-semantic-color-fill-brand, #0053e2)",
        paddingTop: "var(--ld-semantic-spacing-1000, 5rem)",
        paddingBottom: "var(--ld-semantic-spacing-1000, 5rem)",
      }}
    >
      <div className={CONTAINER_OUTER}>
        <div className={CONTAINER_INNER}>
        <div className="text-[72px] font-bold leading-[0.8] mb-3" style={{ color: "var(--ld-primitive-color-spark-100, #ffc220)" }}>
          &ldquo;
        </div>
        <Body
          as="p"
          size="large"
          color="inverse"
          UNSAFE_className="max-w-[800px] mb-5 leading-none font-light"
          UNSAFE_style={{ fontSize: "clamp(20px, 2.8vw, 32px)", lineHeight: 1 }}
        >
          {quote}&rdquo;
        </Body>
        <Body as="p" size="small" UNSAFE_style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>
          {attribution}
        </Body>
        </div>
      </div>
    </div>
  );
}

export function EdsNextGrid({
  items,
}: {
  items: { when: string; title: string; description: string; future?: boolean }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-[10px] p-6"
          style={{
            background: "var(--ld-semantic-color-fill, #ffffff)",
            border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
          }}
        >
          <span
            className="inline-block text-[10px] font-bold text-white px-2.5 py-0.5 rounded mb-3 tracking-wide"
            style={{
              background: item.future
                ? "var(--ld-semantic-color-text-subtlest, #74767c)"
                : "var(--ld-semantic-color-text-brand, #0053e2)",
            }}
          >
            {item.when}
          </span>
          <Body as="h4" size="small" weight="alt" UNSAFE_className="mb-1.5" UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)" }}>
            {item.title}
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
            {item.description}
          </Body>
        </div>
      ))}
    </div>
  );
}

export function EdsStatCards({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[10px] p-6"
          style={{
            background: "var(--ld-primitive-color-blue-5, #f0f5ff)",
            border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
          }}
        >
          <div className="text-[32px] font-bold leading-none mb-2" style={{ color: "var(--ld-semantic-color-text-brand, #0053e2)" }}>
            {stat.value}
          </div>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
            {stat.label}
          </Body>
        </div>
      ))}
    </div>
  );
}
