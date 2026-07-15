import React from "react";
import { Body } from "@/app/components/Text/Text";
import { CheckIcon, CloseIcon, Icon } from "@/app/components/Icons/Icons";

const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";

export function WmEmailTeamRow({ members }: { members: { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {members.map((m) => (
        <div key={m.label} className="flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ borderColor: SEPARATOR }}>
          <span className="size-2 rounded-full shrink-0" style={{ background: m.color }} />
          <Body as="span" size="small" weight="alt">
            {m.label}
          </Body>
        </div>
      ))}
    </div>
  );
}

export function WmEmailToolChips({ tools }: { tools: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tools.map((tool) => (
        <span
          key={tool}
          className="rounded px-2.5 py-1 text-[12px] font-semibold"
          style={{ background: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)", color: "var(--ld-semantic-color-text-subtle, #515357)" }}
        >
          {tool}
        </span>
      ))}
    </div>
  );
}

export function WmEmailApproachSteps({ steps }: { steps: string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-[18px] overflow-hidden" style={{ background: SEPARATOR, border: `1px solid ${SEPARATOR}` }}>
      {steps.map((step, index) => (
        <div key={step} className="bg-white text-center px-3 py-6">
          <div className="font-bold leading-none mb-2" style={{ fontSize: "28px", color: SEPARATOR }}>
            {String(index + 1).padStart(2, "0")}
          </div>
          <Body as="p" size="small" weight="alt" UNSAFE_className="leading-[1.3]">
            {step}
          </Body>
        </div>
      ))}
    </div>
  );
}

export function WmEmailQuestionList({ items }: { items: { icon: string; lead: string; body: string }[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <div
          key={item.lead}
          className="flex gap-3 py-3.5"
          style={index < items.length - 1 ? { borderBottom: `1px solid ${SEPARATOR}` } : undefined}
        >
          <span className="shrink-0 mt-0.5" style={{ color: "var(--ld-semantic-color-text-brand, #0053e2)" }}>
            <Icon name={item.icon} size="medium" decorative />
          </span>
          <Body as="p" size="medium" UNSAFE_className="leading-[1.6]">
            <Body as="span" size="medium" weight="alt">
              {item.lead}
            </Body>{" "}
            <Body as="span" size="medium" color="subtlest">
              {item.body}
            </Body>
          </Body>
        </div>
      ))}
    </div>
  );
}

export function WmEmailPsychCards({ cards }: { cards: { stat: string; title: string; description: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-[10px] p-5"
          style={{ background: "var(--ld-semantic-color-fill, #ffffff)", border: `1px solid ${SEPARATOR}`, borderTopWidth: "3px", borderTopColor: "var(--wm-color-primary, #006B38)" }}
        >
          <div className="font-bold leading-none mb-2" style={{ fontSize: "28px", color: "var(--wm-color-primary, #006B38)" }}>
            {card.stat}
          </div>
          <Body as="p" size="small" weight="alt" UNSAFE_className="mb-1">
            {card.title}
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
            {card.description}
          </Body>
        </div>
      ))}
    </div>
  );
}

export function WmEmailBlockCategoryGrid({
  items,
}: {
  items: { tag: string; tagColor: string; title: string; description: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.title} className="rounded-[10px] p-5" style={{ background: "var(--ld-semantic-color-fill, #ffffff)", border: `1px solid ${SEPARATOR}` }}>
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-3"
            style={{ background: item.tagColor, color: "#ffffff" }}
          >
            {item.tag}
          </span>
          <Body as="p" size="small" weight="alt" UNSAFE_className="mb-1">
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

export function WmEmailAuditGrid({
  before,
  after,
}: {
  before: { label: string; items: string[] };
  after: { label: string; items: string[] };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { ...before, IconComp: CloseIcon, color: "#C53030", bg: "#FFF5F5", border: "#FED7D7" },
        { ...after, IconComp: CheckIcon, color: "#006937", bg: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)", border: SEPARATOR },
      ].map((col) => (
        <div key={col.label} className="rounded-[10px] p-6" style={{ background: col.bg, border: `1px solid ${col.border}` }}>
          <Body
            as="p"
            size="small"
            weight="alt"
            UNSAFE_className="uppercase tracking-[0.1em] mb-4"
            UNSAFE_style={{ fontSize: "10px", color: col.color }}
          >
            {col.label}
          </Body>
          <ul className="flex flex-col gap-2.5">
            {col.items.map((item) => (
              <li key={item} className="flex gap-2.5 items-start">
                <span className="shrink-0" style={{ color: col.color }}>
                  <col.IconComp size="small" decorative />
                </span>
                <Body as="p" size="small" UNSAFE_className="leading-[1.55]">
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

export function WmEmailReflectionGrid({ items }: { items: { icon: string; title: string; description: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-[10px] p-5"
          style={{ background: "var(--ld-semantic-color-fill, #ffffff)", border: `1px solid ${SEPARATOR}`, borderLeftWidth: "4px", borderLeftColor: "#006937" }}
        >
          <div className="mb-2" style={{ color: "#006937" }}>
            <Icon name={item.icon} size="large" decorative />
          </div>
          <Body as="p" size="small" weight="alt" UNSAFE_className="mb-1">
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

export function WmEmailMockupCarousel({
  emails,
}: {
  emails: { id: string; label: string; tablet: string; mobile: string; description: string }[];
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [deviceType, setDeviceType] = React.useState<"tablet" | "mobile">("tablet");
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const activeEmail = emails[activeIndex];
  const activeImage = deviceType === "tablet" ? activeEmail.tablet : activeEmail.mobile;

  const isTablet = deviceType === "tablet";
  const deviceWidth = isTablet ? "480px" : "320px";
  const aspectRatio = isTablet ? "4/5" : "9/16";

  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeIndex]);

  return (
    <div className="flex flex-col gap-8">
      {/* Device Type Toggle */}
      <div className="flex gap-3 items-center">
        <Body as="p" size="small" weight="alt" color="brand" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "10px" }}>
          View
        </Body>
        <div className="flex gap-2 bg-white rounded-lg p-1" style={{ border: `1px solid ${SEPARATOR}` }}>
          <button
            onClick={() => setDeviceType("tablet")}
            className="px-3 py-1.5 rounded text-[13px] font-semibold transition-all"
            style={{
              background: isTablet ? "var(--wm-color-primary, #006B38)" : "transparent",
              color: isTablet ? "#ffffff" : "var(--ld-semantic-color-text, #000000)",
            }}
          >
            Tablet
          </button>
          <button
            onClick={() => setDeviceType("mobile")}
            className="px-3 py-1.5 rounded text-[13px] font-semibold transition-all"
            style={{
              background: !isTablet ? "var(--wm-color-primary, #006B38)" : "transparent",
              color: !isTablet ? "#ffffff" : "var(--ld-semantic-color-text, #000000)",
            }}
          >
            Mobile
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 lg:gap-8 items-start">
        {/* Device Mockup */}
        <div className="flex justify-center">
          <div className="relative w-full" style={{ maxWidth: deviceWidth }}>
            {/* Device bezel */}
            <div className="bg-[#1a1a1a] rounded-[32px] p-3 shadow-lg">
              <div className="bg-black rounded-[24px] overflow-hidden flex flex-col" style={{ aspectRatio }}>
                {/* Status bar */}
                <div className="bg-white h-6 flex items-center px-4 flex-shrink-0" style={{ fontSize: "11px" }}>
                  <div className="flex-1">9:41</div>
                  <div className="flex gap-1">●●●</div>
                </div>
                {/* Email content - scrollable */}
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto w-full">
                  <img
                    src={activeImage}
                    alt={activeEmail.label}
                    className="w-full h-auto block"
                    style={{ display: "block", maxWidth: "100%" }}
                  />
                </div>
              </div>
              {/* Home indicator */}
              <div className="h-2 bg-[#1a1a1a] flex justify-center mt-2">
                <div className="w-32 h-1 bg-black rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex flex-col gap-3">
          <Body as="p" size="small" weight="alt" color="brand" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "10px" }}>
            Email examples
          </Body>
          <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
            {emails.map((email, index) => (
              <button
                key={email.id}
                onClick={() => setActiveIndex(index)}
                className="text-left rounded-lg px-3 py-3 transition-all border flex-shrink-0"
                style={{
                  background: index === activeIndex
                    ? "var(--wm-color-primary, #006B38)"
                    : "var(--ld-semantic-color-fill, #ffffff)",
                  borderColor: index === activeIndex
                    ? "var(--wm-color-primary, #006B38)"
                    : SEPARATOR,
                  color: index === activeIndex ? "#ffffff" : "inherit",
                }}
              >
                <Body
                  as="p"
                  size="small"
                  weight="alt"
                  UNSAFE_style={{
                    color: index === activeIndex ? "#ffffff" : "var(--ld-semantic-color-text, #000000)",
                  }}
                >
                  {email.label}
                </Body>
                <Body
                  as="p"
                  size="small"
                  color={index === activeIndex ? "inverse" : "subtlest"}
                  UNSAFE_className="leading-[1.5] text-[12px] mt-1"
                >
                  {email.description}
                </Body>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
