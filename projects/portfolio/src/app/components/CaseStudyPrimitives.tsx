import React, { useEffect, useState } from "react";
import { Body, Heading } from "@/app/components/Text/Text";
import { fluidSize } from "@/app/components/common/fluidSize";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
} from "@/app/components/Carousel/Carousel";

/** Matches CaseStudyTemplate overview shell (max-w-[1660px] + inner content width). */
const CONTAINER_OUTER = "w-full max-w-[1660px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px]";
const CONTAINER_INNER = "w-full max-w-[1300px] mx-auto flex flex-col gap-6";

export function Section({
  id,
  variant = "default",
  background,
  children,
  className = "",
}: {
  id?: string;
  variant?: "default" | "mid" | "dark";
  /** Overrides the variant-computed background — use for a case study whose brand palette shouldn't inherit the site theme's brand hue. */
  background?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const bg =
    background ??
    (variant === "mid"
      ? "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)"
      : variant === "dark"
        ? "var(--ld-semantic-color-fill-brand, #0053e2)"
        : "var(--ld-semantic-color-fill, #ffffff)");

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
  color,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  /** Overrides the onDark-computed color — use for a case study whose brand palette shouldn't inherit the site theme's brand hue. */
  color?: string;
}) {
  return (
    <Body
      as="p"
      size="small"
      weight="alt"
      UNSAFE_className="uppercase tracking-[0.12em]"
      UNSAFE_style={{
        color:
          color ??
          (onDark
            ? "var(--ld-primitive-color-spark-100, #ffc220)"
            : "var(--ld-semantic-color-text-brand, #0053e2)"),
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
        fontSize: fluidSize(24, 38, 3),
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

export interface TestimonialItem {
  name?: string;
  role: string;
  team?: string;
  quote: React.ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  initials?: string;
}

export function TestimonialShowcase({
  statement,
  testimonials,
  ariaLabel = "Testimonials",
}: {
  statement: React.ReactNode;
  testimonials: TestimonialItem[];
  ariaLabel?: string;
}) {
  return (
    <section
      aria-label={ariaLabel}
      className="grid gap-5 rounded-[24px] p-4 md:grid-cols-3 md:p-6"
      style={{
        background: "var(--ld-semantic-color-fill-brand-subtle, #edf3ff)",
      }}
    >
      <div
        className="flex min-h-[230px] items-start rounded-[16px] p-7 md:row-span-2"
        style={{
          background: "var(--ld-semantic-color-fill-brand, #0053e2)",
          boxShadow: "var(--ld-semantic-elevation-100, 0 1px 2px rgba(0,0,0,0.08))",
        }}
      >
        <Heading
          as="h3"
          size="medium"
          weight="default"
          UNSAFE_className="leading-[1.12]"
          UNSAFE_style={{
            color: "var(--ld-semantic-color-text-inverse, #ffffff)",
            fontSize: fluidSize(26, 38, 2.2),
          }}
        >
          {statement}
        </Heading>
      </div>

      {testimonials.map((testimonial, index) => {
        const fallbackInitials =
          testimonial.initials ??
          testimonial.role
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0]?.toUpperCase())
            .join("");

        return (
          <article
            key={`${testimonial.role}-${testimonial.team ?? "testimonial"}-${index}`}
            className="flex flex-col rounded-[16px] p-6"
            style={{
              background: "var(--ld-semantic-color-surface, #ffffff)",
              border: "1px solid var(--ld-semantic-color-separator, #d8dadd)",
              boxShadow: "var(--ld-semantic-elevation-100, 0 1px 2px rgba(0,0,0,0.08))",
            }}
          >
            <div className="flex items-start gap-4">
              {testimonial.avatarSrc ? (
                <img
                  src={testimonial.avatarSrc}
                  alt={testimonial.avatarAlt ?? ""}
                  className="h-16 w-16 shrink-0 rounded-[10px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[10px] text-lg font-bold"
                  style={{
                    background: "var(--ld-primitive-color-blue-10, #e6f1fc)",
                    color: "var(--ld-semantic-color-text-brand, #0053e2)",
                  }}
                >
                  {fallbackInitials}
                </div>
              )}
              <div className="min-w-0 pt-2">
                {testimonial.name ? (
                  <Body as="p" size="small" weight="alt" UNSAFE_className="mb-0.5">
                    {testimonial.name}
                  </Body>
                ) : null}
                <Body as="p" size="small" weight="alt" UNSAFE_className="mb-1 leading-tight">
                  {testimonial.role}
                </Body>
                {testimonial.team ? (
                  <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-tight">
                    {testimonial.team}
                  </Body>
                ) : null}
              </div>
            </div>
            <blockquote className="m-0 mt-6">
              <Body
                as="p"
                size="small"
                UNSAFE_className="m-0 leading-[1.55]"
                UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)" }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </Body>
            </blockquote>
          </article>
        );
      })}
    </section>
  );
}

export function ProblemGrid({
  cards,
  columns = 2,
}: {
  cards: { who: string; whoColor: string; title: string; description: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div className={`grid grid-cols-1 ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-4`}>
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
          <Body as="p" size="small" color="subtlest" UNSAFE_className="pt-4 leading-[1.65]">
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
      <div className={clipEdges ? "overflow-hidden -m-[3px] p-[3px] h-full" : "h-full"}>
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
  labelColor,
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
  /** Overrides the label's default brand color — use for a case study whose palette shouldn't inherit the site theme's brand hue. */
  labelColor?: string;
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
          color={labelColor ? undefined : "brand"}
          UNSAFE_className="uppercase tracking-[0.1em]"
          UNSAFE_style={{ fontSize: "10px", color: labelColor }}
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
  playback = "loop",
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
  /** "loop" autoplays muted on repeat (ambient clips); "controls" is a standard player for longer, narrated videos. */
  playback?: "loop" | "controls";
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
      <div className={clipEdges ? "overflow-hidden -m-[3px] p-[3px] h-full" : "h-full"}>
        {playback === "controls" ? (
          <video
            src={src}
            aria-label={alt}
            className={`block w-full ${videoSize} ${videoFit} ${videoClassName}`.trim()}
            controls
            playsInline
          />
        ) : (
          <video
            src={src}
            aria-label={alt}
            className={`block w-full ${videoSize} ${videoFit} ${videoClassName}`.trim()}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </div>
    </div>
  );
}

export function VideoFull({
  src,
  alt,
  caption,
  label,
  labelColor,
  className = "",
  frameClassName = "",
  videoClassName = "",
  fit = "natural",
  surface = "white",
  bordered = false,
  playback = "loop",
}: {
  src: string;
  alt: string;
  caption?: string;
  label?: string;
  /** Overrides the label's default brand color — use for a case study whose palette shouldn't inherit the site theme's brand hue. */
  labelColor?: string;
  className?: string;
  frameClassName?: string;
  videoClassName?: string;
  fit?: "natural" | "cover" | "contain";
  surface?: ImageSurface;
  bordered?: boolean;
  playback?: "loop" | "controls";
}) {
  return (
    <figure className={`m-0 flex flex-col gap-6 ${className}`}>
      {label && (
        <Body
          as="p"
          size="small"
          weight="alt"
          color={labelColor ? undefined : "brand"}
          UNSAFE_className="uppercase tracking-[0.1em]"
          UNSAFE_style={{ fontSize: "10px", color: labelColor }}
        >
          {label}
        </Body>
      )}
      <VideoFrame
        src={src}
        alt={alt}
        className={frameClassName}
        bordered={bordered}
        videoClassName={videoClassName}
        fit={fit}
        playback={playback}
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
  items: { src: string; alt: string; caption?: string; label?: string; labelColor?: string; frameClassName?: string; imageClassName?: string; fit?: "natural" | "cover" | "contain"; surface?: ImageSurface }[];
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

/**
 * A carousel of same-size images — use for a folder of grouped, uniformly
 * sized assets (a slide deck export, a photo set) instead of stacking them
 * all as a static grid.
 */
export function ImageCarousel({
  images,
  ariaLabel,
  fit = "natural",
  surface = "white",
  itemHeight,
}: {
  images: { src: string; alt: string; caption?: string }[];
  ariaLabel: string;
  fit?: "natural" | "cover" | "contain";
  surface?: ImageSurface;
  /** When set, each slide renders in a fixed-height frame with internal vertical scroll — use for tall, full-page screenshots so every slide compares at the same visual size. */
  itemHeight?: number;
}) {
  return (
    <Carousel aria-label={ariaLabel}>
      <CarouselContent>
        {images.map((image) =>
          itemHeight ? (
            <CarouselItem key={image.src} cols={1}>
              <figure className="m-0 flex flex-col gap-3">
                <div
                  className="w-full overflow-y-auto rounded-xl"
                  style={{ height: itemHeight, background: IMAGE_SURFACE[surface], border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)" }}
                >
                  <img src={image.src} alt={image.alt} className="block w-full h-auto" loading="lazy" decoding="async" />
                </div>
                {image.caption && (
                  <Body as="figcaption" size="small" color="subtlest" UNSAFE_className="leading-snug">
                    {image.caption}
                  </Body>
                )}
              </figure>
            </CarouselItem>
          ) : (
            <CarouselItem key={image.src} cols={1}>
              <ImageFull src={image.src} alt={image.alt} caption={image.caption} fit={fit} surface={surface} />
            </CarouselItem>
          ),
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselPagination />
    </Carousel>
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
        <div className="font-bold leading-[0.8]" style={{ fontSize: fluidSize(40, 72), color: "var(--ld-primitive-color-spark-100, #ffc220)", marginBottom: "-16px" }}>
          &ldquo;
        </div>
        <Body
          as="p"
          size="large"
          color="inverse"
          UNSAFE_className="max-w-[800px] leading-none font-light"
          UNSAFE_style={{ fontSize: fluidSize(20, 32, 2.8), lineHeight: 1 }}
        >
          {quote}
        </Body>
        <div className="max-w-[800px] flex justify-end mb-5">
          <div
            className="font-bold leading-[0.8]"
            style={{
              fontSize: fluidSize(40, 72),
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
          <div className="font-bold leading-none mb-2" style={{ fontSize: fluidSize(22, 32), color: "var(--ld-semantic-color-text-brand, #0053e2)" }}>
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
            className="font-bold leading-none mb-2"
            style={{
              fontSize: fluidSize(28, 44),
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

export type JourneyMood = "friction" | "blocker" | "progress" | "win" | "neutral";

export interface JourneyItem {
  date: string;
  phase: string;
  who?: { label: string; variant?: string }[];
  story: string;
  tension?: string;
  win?: string;
  mood: JourneyMood;
}

const JOURNEY_MOOD_COLOR: Record<JourneyMood, string> = {
  friction: "var(--ld-semantic-color-text-negative, #ea1100)",
  blocker: "var(--ld-primitive-color-orange-100, #fa6400)",
  progress: "var(--ld-semantic-color-text-brand, #0053e2)",
  win: "var(--ld-semantic-color-text-positive, #2a8703)",
  neutral: "var(--ld-semantic-color-text, #2e2f32)",
};

const JOURNEY_CHIP_PALETTE = [
  { bg: "#e8f2ff", color: "#1a4f8a", border: "#bed8f5" },
  { bg: "#e6fff7", color: "#1a5c3a", border: "#9fdccc" },
  { bg: "#f3eeff", color: "#553c9a", border: "#d9c9f5" },
  { bg: "#fff3e6", color: "#7b3a00", border: "#f5d9b5" },
];

function journeyChipStyle(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return JOURNEY_CHIP_PALETTE[hash % JOURNEY_CHIP_PALETTE.length];
}

/** Vertical timeline for a project's chronological story, used across multiple case studies. */
export function JourneyTimeline({
  items,
  phaseColor,
  lineColor,
}: {
  items: JourneyItem[];
  /** Overrides the phase title's default brand color — use for a case study whose palette shouldn't inherit the site theme's brand hue. */
  phaseColor?: string;
  /** Overrides the connecting line's default separator color — use on a colored/subtle section background where the default is too low-contrast. */
  lineColor?: string;
}) {
  const resolvedLineColor = lineColor ?? "var(--ld-semantic-color-separator, #e3e4e5)";
  return (
    <div>
      {items.map((item) => (
        <div
          key={`${item.date}-${item.phase}`}
          className="relative grid grid-cols-1 pl-5 md:grid-cols-[180px_1fr] md:pl-0"
        >
          {/* Mobile-only connecting line + dot — the desktop version (right border + dot on the date column) doesn't exist in the single-column mobile layout, so this replaces it. */}
          <div
            className="md:hidden absolute left-0 top-0 bottom-0 w-px"
            style={{ background: resolvedLineColor }}
          />
          <div
            className="md:hidden absolute left-0 top-8 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white"
            style={{ background: JOURNEY_MOOD_COLOR[item.mood], boxShadow: `0 0 0 2px ${JOURNEY_MOOD_COLOR[item.mood]}` }}
          />
          <div
            className="relative py-7 pr-5 md:border-r-2"
            style={{ borderColor: resolvedLineColor }}
          >
            <div
              className="hidden md:block absolute -right-[7px] top-8 w-3 h-3 rounded-full border-2 border-white"
              style={{ background: JOURNEY_MOOD_COLOR[item.mood], boxShadow: `0 0 0 2px ${JOURNEY_MOOD_COLOR[item.mood]}` }}
            />
            {item.date ? (
              <Body as="p" size="small" weight="alt" color="subtlest" UNSAFE_className="tracking-wide mb-1" UNSAFE_style={{ fontSize: "11px" }}>
                {item.date}
              </Body>
            ) : null}
            <Body
              as="p"
              size="small"
              weight="alt"
              UNSAFE_className="italic leading-snug mb-2"
              UNSAFE_style={{ color: phaseColor ?? "var(--ld-semantic-color-fill-brand-bold, #001e60)" }}
            >
              {item.phase}
            </Body>
            {item.who && item.who.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.who.map((w) => {
                  const style = journeyChipStyle(w.variant ?? w.label);
                  return (
                    <span
                      key={w.label}
                      className="text-[9px] font-bold uppercase tracking-wide px-[7px] py-0.5 rounded-full border"
                      style={style}
                    >
                      {w.label}
                    </span>
                  );
                })}
              </div>
            )}
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

const CALLOUT_TONE: Record<"brand" | "positive" | "warning" | "neutral", { bg: string; border: string }> = {
  brand: { bg: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)", border: "var(--ld-semantic-color-text-brand, #0053e2)" },
  positive: { bg: "var(--ld-primitive-color-green-10, #eaf3e6)", border: "var(--ld-semantic-color-text-positive, #2a8703)" },
  warning: { bg: "#fff3e6", border: "var(--ld-primitive-color-orange-100, #fa6400)" },
  neutral: { bg: "var(--ld-semantic-color-fill-subtle, #f8f8f8)", border: "var(--ld-semantic-color-fill-inverse, #2e2f32)" },
};

/** Colored callout box for a single highlighted takeaway within a section. */
export function Callout({
  children,
  tone = "brand",
}: {
  children: React.ReactNode;
  tone?: "brand" | "positive" | "warning" | "neutral";
}) {
  const style = CALLOUT_TONE[tone];
  return (
    <div className="rounded-r-[8px] py-4 pl-5 pr-5 border-l-4" style={{ background: style.bg, borderColor: style.border }}>
      <Body as="div" size="small" UNSAFE_className="leading-[1.6]">
        {children}
      </Body>
    </div>
  );
}

/** Dashed placeholder for a screenshot, photo, or other asset that hasn't been captured yet. */
export function CapturePlaceholder({
  badge,
  title,
  description,
  size = "default",
  className = "",
}: {
  badge: string;
  title: string;
  description: string;
  size?: "default" | "small";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-lg border border-dashed ${size === "small" ? "p-4" : "p-6"} ${className}`}
      style={{
        borderColor: "var(--ld-semantic-color-separator-bold, #b8c7e0)",
        background: "var(--ld-semantic-color-fill-subtle, #f7f9fc)",
      }}
    >
      <Body
        as="span"
        size="small"
        weight="alt"
        color="brand"
        UNSAFE_className="self-start rounded px-2 py-0.5 uppercase tracking-[0.1em]"
        UNSAFE_style={{
          fontSize: "10px",
          background: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)",
        }}
      >
        {badge}
      </Body>
      <Body
        as="p"
        size="small"
        weight="alt"
        UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)" }}
      >
        {title}
      </Body>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.55]">
        {description}
      </Body>
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
