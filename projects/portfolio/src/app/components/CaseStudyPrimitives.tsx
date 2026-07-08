import React, { useEffect, useState } from "react";
import { Body, Heading } from "@/app/components/Text/Text";

/** Matches CaseStudyTemplate overview shell (max-w-7xl + inner content width). */
const CONTAINER_OUTER = "w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px]";
const CONTAINER_INNER = "w-full max-w-4xl lg:max-w-[1046px] flex flex-col gap-6";

export function Section({
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

export function Eyebrow({
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

export function SectionTitle({
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
      UNSAFE_className="leading-[1.15] whitespace-pre-line"
      UNSAFE_style={{
        color: onDark ? "var(--ld-primitive-color-white, #ffffff)" : undefined,
        fontSize: "clamp(24px, 3vw, 38px)",
      }}
    >
      {children}
    </Heading>
  );
}

export function Lead({
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

export function ProblemGrid({
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

export type ImageSurface = "white" | "subtle";

const IMAGE_SURFACE: Record<ImageSurface, string> = {
  white: "var(--ld-semantic-color-fill, #ffffff)",
  subtle: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)",
};

export function ImageFrame({
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
  surface?: ImageSurface;
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

export function FrameCycle({
  frames,
  intervalMs = 2800,
  alt,
  className = "",
  frameClassName = "",
  imageClassName = "",
  surface = "subtle",
  background,
}: {
  frames: { src: string; alt?: string }[];
  intervalMs?: number;
  alt: string;
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
  surface?: ImageSurface;
  background?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % frames.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [frames.length, intervalMs]);

  return (
    <figure className={`m-0 relative w-full ${className}`} aria-label={alt}>
      <div
        className={`relative w-full overflow-hidden rounded-xl ${frameClassName}`}
        style={{ background: background ?? IMAGE_SURFACE[surface] }}
      >
        {frames.map((frame, index) => (
          <img
            key={frame.src}
            src={frame.src}
            alt={frame.alt ?? alt}
            className={`absolute inset-0 block h-full w-full transition-opacity duration-700 ease-in-out ${imageClassName} ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>
      {frames.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden="true">
          {frames.map((frame, index) => (
            <span
              key={frame.src}
              className="size-2 rounded-full transition-colors duration-300"
              style={{
                background:
                  index === activeIndex
                    ? "var(--ld-semantic-color-fill-brand, #6cdb8c)"
                    : "var(--ld-semantic-color-separator, #e3e4e5)",
              }}
            />
          ))}
        </div>
      )}
    </figure>
  );
}

export function ImageFull({
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
  rounded = true,
}: {
  src: string;
  alt: string;
  caption?: string;
  label?: string;
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
  fit?: "natural" | "cover" | "contain";
  surface?: ImageSurface;
  clipEdges?: boolean;
  rounded?: boolean;
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
      <ImageFrame
        src={src}
        alt={alt}
        className={frameClassName}
        imageClassName={imageClassName}
        fit={fit}
        surface={surface}
        clipEdges={clipEdges}
        rounded={rounded}
      />
      {caption && (
        <Body as="figcaption" size="small" color="subtlest" UNSAFE_className="leading-snug">
          {caption}
        </Body>
      )}
    </figure>
  );
}

export function EmbedFrame({
  src,
  title,
  className = "",
  iframeClassName = "",
  aspectRatio = "16 / 10",
  bordered = false,
  rounded = true,
  surface = "white",
}: {
  src: string;
  title: string;
  className?: string;
  iframeClassName?: string;
  aspectRatio?: string;
  bordered?: boolean;
  rounded?: boolean;
  surface?: ImageSurface;
}) {
  return (
    <div
      className={`w-full ${rounded ? "overflow-hidden rounded-xl" : "overflow-hidden"} ${className}`}
      style={{
        background: IMAGE_SURFACE[surface],
        border: bordered ? "1px solid var(--ld-semantic-color-separator, #e3e4e5)" : undefined,
      }}
    >
      <div className="relative w-full" style={{ aspectRatio }}>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className={`absolute inset-0 block size-full border-0 ${iframeClassName}`}
        />
      </div>
    </div>
  );
}

export function EmbedFull({
  src,
  title,
  caption,
  label,
  className = "",
  frameClassName = "",
  iframeClassName = "",
  aspectRatio = "16 / 10",
  surface = "white",
  rounded = true,
}: {
  src: string;
  title: string;
  caption?: string;
  label?: string;
  className?: string;
  frameClassName?: string;
  iframeClassName?: string;
  aspectRatio?: string;
  surface?: ImageSurface;
  rounded?: boolean;
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
      <EmbedFrame
        src={src}
        title={title}
        className={frameClassName}
        iframeClassName={iframeClassName}
        aspectRatio={aspectRatio}
        surface={surface}
        rounded={rounded}
      />
      {caption && (
        <Body as="figcaption" size="small" color="subtlest" UNSAFE_className="leading-snug">
          {caption}
        </Body>
      )}
    </figure>
  );
}

export function VideoFrame({
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
  surface?: ImageSurface;
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

export function VideoFull({
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
  surface?: ImageSurface;
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
      <VideoFrame
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

export function ImageGrid2({
  items,
  className = "",
  stacked = false,
}: {
  items: { src: string; alt: string; caption?: string; label?: string; frameClassName?: string; imageClassName?: string; fit?: "natural" | "cover" | "contain"; surface?: ImageSurface }[];
  className?: string;
  stacked?: boolean;
}) {
  return (
    <div className={`grid gap-6 ${stacked ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} ${className}`}>
      {items.map((item) => (
        <ImageFull key={item.alt} {...item} />
      ))}
    </div>
  );
}

export function QuoteBlock({
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
        <div className="text-[72px] font-bold leading-[0.8]" style={{ color: "var(--ld-primitive-color-spark-100, #ffc220)", marginBottom: "-16px" }}>
          &ldquo;
        </div>
        <Body
          as="p"
          size="large"
          color="inverse"
          UNSAFE_className="max-w-[800px] leading-none font-light"
          UNSAFE_style={{ fontSize: "clamp(20px, 2.8vw, 32px)", lineHeight: 1 }}
        >
          {quote}
        </Body>
        <div className="max-w-[800px] flex justify-end mb-5">
          <div
            className="text-[72px] font-bold leading-[0.8]"
            style={{
              color: "var(--ld-primitive-color-spark-100, #ffc220)",
              marginTop: "-16px",
              transform: "rotate(180deg)",
            }}
          >
            &ldquo;
          </div>
        </div>
        <Body as="p" size="small" UNSAFE_style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>
          {attribution}
        </Body>
        </div>
      </div>
    </div>
  );
}

export function NextGrid({
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

export function StatCards({
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

export function StatsRow({
  stats,
  variant = "dark",
  cellBackground: cellBackgroundOverride,
  borderColor,
}: {
  stats: { value: string; label: string; valueColor?: string }[];
  variant?: "dark" | "light" | "brand";
  cellBackground?: string;
  borderColor?: string;
}) {
  const isLight = variant === "light";
  const isBrand = variant === "brand";

  const cellBackground =
    cellBackgroundOverride ??
    (isBrand
      ? "var(--ld-semantic-color-fill-brand, #6cdb8c)"
      : isLight
        ? "#e7f1fc"
        : "rgba(255,255,255,0.04)");

  const defaultValueColor = isBrand
    ? "#000000"
    : isLight
      ? "#0053e2"
      : "var(--ld-primitive-color-spark-100, #ffc220)";

  const labelColor = isBrand ? "#000000" : isLight ? "#001e60" : "rgba(255,255,255,0.55)";

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-[24px] overflow-hidden"
      style={{
        background: borderColor ?? (isLight || isBrand ? "var(--ld-semantic-color-separator, #e3e4e5)" : "rgba(255,255,255,0.1)"),
        border: `1px solid ${borderColor ?? (isLight || isBrand ? "var(--ld-semantic-color-separator, #e3e4e5)" : "rgba(255,255,255,0.1)")}`,
      }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center px-5 py-8"
          style={{ background: cellBackground }}
        >
          <div
            className="text-[44px] font-bold leading-none mb-2"
            style={{
              color: stat.valueColor ?? defaultValueColor,
            }}
          >
            {stat.value}
          </div>
          <Body
            as="p"
            size="small"
            UNSAFE_className="leading-snug"
            UNSAFE_style={{
              color: labelColor,
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

export function BeforeAfter({
  before,
  after,
}: {
  before: { who: string; title: string; description: string }[];
  after: { who: string; title: string; description: string }[];
}) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-[24px] overflow-hidden"
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
