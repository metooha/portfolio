import React from "react";
import { Body, Heading } from "@/app/components/Text/Text";
import { Icon } from "@/app/components/Icons/Icons";

const ACCENT = "#D0201C";
const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";

/** Large statement with select words highlighted in the brand accent color. */
export function BreakoutStatement({
  parts,
}: {
  parts: { text: string; highlight?: boolean }[];
}) {
  return (
    <Heading
      as="h3"
      size="large"
      weight="default"
      UNSAFE_className="leading-[1.2]"
      UNSAFE_style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
    >
      {parts.map((part, index) => (
        <span key={index} style={{ color: part.highlight ? ACCENT : undefined }}>
          {part.text}
        </span>
      ))}
    </Heading>
  );
}

/** Simplified process flow: two rows of steps connected by directional arrows. */
export function BreakoutApproachDiagram({
  primaryRow,
  secondaryRow,
}: {
  primaryRow: string[];
  secondaryRow: string[];
}) {
  const step = (label: string) => (
    <div
      key={label}
      className="rounded-lg px-4 py-3 text-center"
      style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.16)" }}
    >
      <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: "#ffffff" }}>
        {label}
      </Body>
    </div>
  );

  const row = (labels: string[]) => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {labels.map((label, index) => (
        <React.Fragment key={label}>
          {step(label)}
          {index < labels.length - 1 && (
            <span style={{ color: ACCENT }} className="shrink-0">
              <Icon name="ArrowRight" size="small" decorative />
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {row(primaryRow)}
      <span style={{ color: ACCENT }}>
        <Icon name="ArrowDown" size="small" decorative />
      </span>
      {row(secondaryRow)}
    </div>
  );
}

/** Numbered 6-card grid for the strategy steps. */
export function BreakoutStrategySteps({
  steps,
}: {
  steps: { title: string; description: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <div key={step.title}>
          <Body as="p" size="small" weight="alt" UNSAFE_className="mb-1.5" UNSAFE_style={{ color: ACCENT }}>
            {index + 1}. {step.title}
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
            {step.description}
          </Body>
        </div>
      ))}
    </div>
  );
}

/** Side-by-side old vs. new logo comparison. */
export function BreakoutLogoCompare({
  before,
  after,
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[
        { ...before, label: "Before" },
        { ...after, label: "After" },
      ].map((logo) => (
        <div
          key={logo.label}
          className="rounded-xl overflow-hidden"
          style={{ border: `1px solid ${SEPARATOR}` }}
        >
          <div className="px-4 py-2" style={{ background: "#000000" }}>
            <Body
              as="p"
              size="small"
              weight="alt"
              UNSAFE_className="uppercase tracking-[0.1em]"
              UNSAFE_style={{ fontSize: "10px", color: "#ffffff" }}
            >
              {logo.label}
            </Body>
          </div>
          <div className="flex items-center justify-center p-10 bg-white">
            <img src={logo.src} alt={logo.alt} className="max-h-[140px] w-auto object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Frames a full-page screenshot inside a fixed 16:10 laptop-screen viewport. The screenshot scrolls inside the screen, like a real page would. */
export function BreakoutLaptopMockup({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div
        className="relative w-full rounded-t-2xl"
        style={{
          background: "#1c1c1e",
          padding: "16px 16px 20px",
          boxShadow: "0 20px 40px -20px rgba(0,0,0,0.35)",
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{ top: 6, width: 6, height: 6, background: "#3a3a3c" }}
          aria-hidden="true"
        />
        <div
          className="relative w-full overflow-y-auto overscroll-contain rounded-sm bg-white"
          style={{ aspectRatio: "16 / 10" }}
        >
          <img src={src} alt={alt} className="block w-full h-auto" />
        </div>
      </div>
      <div
        className="relative mx-auto"
        style={{
          height: 14,
          width: "104%",
          marginLeft: "-2%",
          background: "linear-gradient(180deg, #d4d4d6, #b8b8ba)",
          borderRadius: "0 0 10px 10px",
        }}
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0"
          style={{ width: 120, height: 8, background: "#a8a8aa", borderRadius: "0 0 8px 8px" }}
        />
      </div>
    </div>
  );
}

/** Existing vs. redesigned mobile app comparison: image + heading + bullet list per side. */
export function BreakoutAppCompare({
  before,
  after,
}: {
  before: { src: string; alt: string; heading: string; items: string[] };
  after: { src: string; alt: string; heading: string; items: string[] };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        { ...before, isAfter: false },
        { ...after, isAfter: true },
      ].map((col) => (
        <div key={col.heading} className="flex flex-col gap-4">
          <img src={col.src} alt={col.alt} className="w-full max-w-[280px] rounded-lg mx-auto" />
          <Body
            as="p"
            size="medium"
            weight="alt"
            UNSAFE_style={{ color: col.isAfter ? ACCENT : undefined }}
          >
            {col.heading}
          </Body>
          <ul className="flex flex-col gap-2">
            {col.items.map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <span className="shrink-0 mt-0.5" style={{ color: col.isAfter ? ACCENT : "var(--ld-semantic-color-text-subtlest, #74767c)" }}>
                  <Icon name="Check" size="small" decorative />
                </span>
                <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
                  {item}
                </Body>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
