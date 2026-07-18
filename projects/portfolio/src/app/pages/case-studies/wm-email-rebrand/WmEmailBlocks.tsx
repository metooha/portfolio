import React from "react";
import { Button } from "@/app/components/Button/Button";
import { Body } from "@/app/components/Text/Text";
import { CheckIcon, CloseIcon, Icon } from "@/app/components/Icons/Icons";

const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";
const BRAND = "var(--ld-semantic-color-text-brand, #006937)";
const BRAND_FILL = "var(--ld-semantic-color-fill-brand, #006937)";
const FILL = "var(--ld-semantic-color-fill, #ffffff)";
const INVERSE = "var(--ld-semantic-color-text-inverse, #ffffff)";

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
          style={{
            background: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)",
            color: "var(--ld-semantic-color-text-subtle, #515357)",
          }}
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
        <div key={step} className="text-center px-3 py-6" style={{ background: FILL }}>
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
          <span className="shrink-0 mt-0.5" style={{ color: BRAND }}>
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
          style={{
            background: FILL,
            border: `1px solid ${SEPARATOR}`,
            borderTopWidth: "3px",
            borderTopColor: BRAND_FILL,
          }}
        >
          <div className="font-bold leading-none mb-2" style={{ fontSize: "28px", color: BRAND }}>
            {card.stat}
          </div>
          <Body as="p" size="medium" weight="alt" UNSAFE_className="mb-1">
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
        <div key={item.title} className="rounded-[10px] p-5" style={{ background: FILL, border: `1px solid ${SEPARATOR}` }}>
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-3"
            style={{ background: item.tagColor, color: INVERSE }}
          >
            {item.tag}
          </span>
          <Body as="p" size="medium" weight="alt" UNSAFE_className="mb-1">
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
        {
          ...before,
          IconComp: CloseIcon,
          color: "var(--ld-semantic-color-text-negative, #ea1100)",
          bg: "var(--ld-semantic-color-fill-negative-subtle, #fde9e8)",
          border: "var(--ld-primitive-color-red-20, #fbd0cc)",
        },
        {
          ...after,
          IconComp: CheckIcon,
          color: "var(--ld-semantic-color-text-positive, #2a8703)",
          bg: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)",
          border: SEPARATOR,
        },
      ].map((col) => (
        <div key={col.label} className="rounded-[10px] p-6" style={{ background: col.bg, border: `1px solid ${col.border}` }}>
          <Body
            as="p"
            size="small"
            weight="alt"
            UNSAFE_className="uppercase tracking-[0.1em] mb-4 pb-2"
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

const WM_GREEN = "#004733";
const WM_CTA = "#238C00";
const WM_HIGHLIGHT = "#3D9B35";
const WM_BODY = "#4A4A4A";
const WM_SURFACE = "#F4F4F1";
const OLD_EMAIL_GREEN = "#006400";
const OLD_EMAIL_LIME = "#9ABA39";

function ContentStatsBadge({ words, links }: { words: number; links: number }) {
  return (
    <div
      className="absolute top-4 right-4 rounded-md px-3 py-2 text-right text-white leading-tight z-10"
      style={{ background: WM_GREEN, fontSize: "12px" }}
      aria-hidden="true"
    >
      <div className="font-bold">{words} Words</div>
      <div className="font-semibold opacity-90">{links} Links</div>
    </div>
  );
}

function MockJoinUs({ variant }: { variant: "outline" | "solid" }) {
  const isSolid = variant === "solid";
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center px-8 py-2.5 text-[13px] font-semibold tracking-wide"
      style={
        isSolid
          ? { background: WM_CTA, color: "#ffffff", borderRadius: "999px" }
          : {
              background: "#ffffff",
              color: WM_CTA,
              borderWidth: "1.5px",
              borderStyle: "solid",
              borderColor: "#238C00",
              borderRadius: "4px",
            }
      }
    >
      Join Us
    </span>
  );
}

const OLD_EMAIL_BENEFITS = [
  "Manage WM services online",
  "View pickup and holiday schedules",
  "Set notifications and service alerts",
  "Enroll in AutoPay and Paperless Billing",
] as const;

/** Pre-rebrand green email block — coded to show primary color overuse. */
export function WmEmailOldGreenContent({ photoSrc }: { photoSrc: string }) {
  return (
    <div
      className="w-full h-full overflow-hidden rounded-xl"
      style={{ background: OLD_EMAIL_GREEN }}
      role="img"
      aria-label="Old email content: Activate your online WM account, with a white Activate Your Account button on a full green background"
    >
      <div className="flex h-full flex-col gap-4 rounded-none p-5 sm:gap-5 sm:p-6">
        <p
          className="m-0 font-bold leading-[1.2]"
          style={{ fontSize: "clamp(18px, 2.2vw, 24px)", color: "#ffffff" }}
        >
          Activate your{" "}
          <span style={{ color: OLD_EMAIL_LIME }}>online WM account</span> to enjoy these benefits:
        </p>
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] sm:items-stretch sm:gap-4">
          <img
            src={photoSrc}
            alt=""
            className="block h-full max-h-[220px] w-full object-cover sm:max-h-none"
            loading="lazy"
            decoding="async"
          />
          <div className="flex flex-col gap-4">
            <ul className="m-0 flex flex-col gap-2 p-0 list-none">
              {OLD_EMAIL_BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-white">
                  <span
                    className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-white"
                    aria-hidden="true"
                  />
                  <span className="text-[13px] leading-[1.4] sm:text-[14px]">{item}</span>
                </li>
              ))}
            </ul>
            <span
              aria-hidden="true"
              className="mt-auto inline-flex w-full items-center justify-center px-4 py-3 text-[13px] font-bold sm:text-[14px]"
              style={{ background: "#ffffff", color: OLD_EMAIL_GREEN }}
            >
              Activate Your Account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Old vs. new email content comparison — coded markup instead of the static screenshot. */
export function WmEmailContentCompare() {
  return (
    <div
      className="w-full overflow-hidden rounded-xl"
      style={{ background: WM_SURFACE, border: `1px solid ${SEPARATOR}` }}
      role="img"
      aria-label="Old email content with 199 words and 5 links versus new email content with 72 words and 2 links"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Old */}
        <div
          className="relative flex flex-col gap-3 p-6 md:p-8 md:pr-10 md:border-r"
          style={{ borderColor: SEPARATOR }}
        >
          <Body
            as="p"
            size="small"
            weight="alt"
            UNSAFE_className="uppercase tracking-[0.12em] mb-1"
            UNSAFE_style={{ fontSize: "11px", color: WM_GREEN }}
          >
            Old email content
          </Body>
          <ContentStatsBadge words={199} links={5} />
          <p className="font-bold leading-[1.2] pr-20" style={{ fontSize: "22px", color: WM_GREEN }}>
            Want to do more for tomorrow, %Name%?
          </p>
          <p className="text-[13px] leading-[1.55]" style={{ color: WM_BODY }}>
            Using WM today is a solid start. Doing what&rsquo;s right for our planet is vital work best tackled
            together, so let&rsquo;s start rowing (or, in this case, throwing) in the right direction.
          </p>
          <div>
            <MockJoinUs variant="outline" />
          </div>
          <p className="font-bold text-[14px] leading-[1.35] mt-1" style={{ color: WM_GREEN }}>
            Those captivating green trucks? They&rsquo;re driving toward a better tomorrow.
          </p>
          <p className="text-[13px] leading-[1.5]" style={{ color: WM_BODY }}>
            Here&rsquo;s what&rsquo;s in store when you join us.
          </p>
          <div className="flex flex-col gap-3">
            {(
              [
                ["Unwavering reliability", "We take care of your waste like clockwork so you can focus on what matters."],
                ["Service your way", "Online tools and a mobile app put account control in your hands."],
                [
                  "Tomorrow that matters",
                  <>
                    A community making{" "}
                    <span style={{ color: WM_HIGHLIGHT, fontWeight: 600 }}>significant investments</span> in technology
                    and <span style={{ color: WM_HIGHLIGHT, fontWeight: 600 }}>zerowaste events</span>.
                  </>,
                ],
              ] as const
            ).map(([title, body]) => (
              <div key={title}>
                <p className="font-bold text-[13px] leading-[1.4]" style={{ color: "#2D2D2D" }}>
                  {title}
                </p>
                <p className="text-[12px] leading-[1.5]" style={{ color: WM_BODY }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
          <div>
            <MockJoinUs variant="outline" />
          </div>
          <p className="font-bold text-[14px] leading-[1.35]" style={{ color: WM_GREEN }}>
            Start working toward a sustainable future today.
          </p>
          <p className="font-bold text-[13px]" style={{ color: "#2D2D2D" }}>
            Follow these tips to Recycle Right.
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-[12px] leading-[1.5]" style={{ color: WM_BODY }}>
              <span className="font-bold" style={{ color: "#2D2D2D" }}>
                Keep it G-Rated.{" "}
              </span>
              Rinse containers before they go in the bin.
            </p>
            <p className="text-[12px] leading-[1.5]" style={{ color: WM_BODY }}>
              <span className="font-bold" style={{ color: "#2D2D2D" }}>
                Keep your recyclables loose.{" "}
              </span>
              Don&rsquo;t bag items that belong in the cart.
            </p>
          </div>
        </div>

        {/* New */}
        <div className="relative flex flex-col gap-3 p-6 md:p-8 md:pl-10">
          <Body
            as="p"
            size="small"
            weight="alt"
            UNSAFE_className="uppercase tracking-[0.12em] mb-1"
            UNSAFE_style={{ fontSize: "11px", color: WM_GREEN }}
          >
            New email content
          </Body>
          <ContentStatsBadge words={72} links={2} />
          <p className="font-bold leading-[1.15] pr-20" style={{ fontSize: "28px", color: WM_GREEN }}>
            Tackling Together
          </p>
          <p className="text-[13px] leading-[1.55]" style={{ color: WM_BODY }}>
            Hey John, wherever the project, whatever the need – choosing WM can have a lasting impact, even if the job
            is only temporary.
          </p>
          <div>
            <MockJoinUs variant="solid" />
          </div>
          <p className="font-bold text-[15px] leading-[1.3] mt-2" style={{ color: WM_GREEN }}>
            What&rsquo;s in Store
          </p>
          <div className="flex flex-col gap-3.5">
            {(
              [
                ["24/7 Online Access", "Compare sizes, types and prices of containers from anywhere, anytime"],
                ["More Power to You", "Manage services, notifications and billing effortlessly from any device"],
                [
                  "Solving Waste Together",
                  <>
                    Join a community that&rsquo;s making{" "}
                    <span style={{ color: WM_HIGHLIGHT, fontWeight: 600 }}>big investments</span> in new technology and
                    initiatives
                  </>,
                ],
              ] as const
            ).map(([title, body]) => (
              <div key={title}>
                <p className="font-bold text-[13px] leading-[1.35]" style={{ color: WM_GREEN }}>
                  {title}
                </p>
                <p className="text-[12px] leading-[1.5]" style={{ color: WM_BODY }}>
                  {body}
                </p>
              </div>
            ))}
            <div>
              <p className="font-bold text-[13px] leading-[1.35]" style={{ color: WM_GREEN }}>
                Do More With Your Debris
              </p>
              <p className="text-[12px] leading-[1.5] mb-1.5" style={{ color: WM_BODY }}>
                Some materials may be more valuable than you think
              </p>
              <ul className="text-[12px] leading-[1.6] pl-4 list-disc" style={{ color: WM_BODY }}>
                {["Concrete", "Metals", "Wood", "Rocks"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
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
          style={{
            background: FILL,
            border: `1px solid ${SEPARATOR}`,
            borderLeftWidth: "4px",
            borderLeftColor: BRAND_FILL,
          }}
        >
          <div className="mb-2" style={{ color: BRAND }}>
            <Icon name={item.icon} size="large" decorative />
          </div>
          <Body as="p" size="medium" weight="alt" UNSAFE_className="mb-1">
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

  const DEVICE_CHROME = "var(--ld-primitive-color-gray-180, #1a1a1a)";
  const DEVICE_SCREEN = "var(--ld-primitive-color-black, #000000)";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-3 items-center">
        <Body as="p" size="small" weight="alt" color="brand" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "10px" }}>
          View
        </Body>
        <div className="flex gap-2 rounded-lg p-1" style={{ background: FILL, border: `1px solid ${SEPARATOR}` }}>
          <Button
            variant={isTablet ? "primary" : "tertiary"}
            size="small"
            onClick={() => setDeviceType("tablet")}
          >
            Tablet
          </Button>
          <Button
            variant={!isTablet ? "primary" : "tertiary"}
            size="small"
            onClick={() => setDeviceType("mobile")}
          >
            Mobile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 lg:gap-8 items-start">
        <div className="flex justify-center">
          <div className="relative w-full" style={{ maxWidth: deviceWidth }}>
            <div className="rounded-[32px] p-3 shadow-lg" style={{ background: DEVICE_CHROME }}>
              <div className="rounded-[24px] overflow-hidden flex flex-col" style={{ aspectRatio, background: DEVICE_SCREEN }}>
                <div
                  className="h-6 flex items-center px-4 flex-shrink-0"
                  style={{ fontSize: "11px", background: FILL, color: "var(--ld-semantic-color-text, #2e2f32)" }}
                >
                  <div className="flex-1">9:41</div>
                  <div className="flex gap-1">●●●</div>
                </div>
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto w-full">
                  <img
                    src={activeImage}
                    alt={activeEmail.label}
                    className="w-full h-auto block"
                    style={{ display: "block", maxWidth: "100%" }}
                  />
                </div>
              </div>
              <div className="h-2 flex justify-center mt-2" style={{ background: DEVICE_CHROME }}>
                <div className="w-32 h-1 rounded-full" style={{ background: DEVICE_SCREEN }} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Body as="p" size="small" weight="alt" color="brand" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "10px" }}>
            Email examples
          </Body>
          <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
            {emails.map((email, index) => {
              const isActive = index === activeIndex;
              return (
                <Button
                  key={email.id}
                  type="button"
                  variant={isActive ? "primary" : "secondary"}
                  size="small"
                  shape="square"
                  isFullWidth
                  onClick={() => setActiveIndex(index)}
                  UNSAFE_style={{
                    height: "fit-content",
                    marginTop: "8px",
                    marginBottom: "8px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    whiteSpace: "normal",
                  }}
                >
                  <span className="flex flex-col items-start gap-1 w-full text-left">
                    <Body
                      as="span"
                      size="small"
                      weight="alt"
                      color={isActive ? "inverse" : undefined}
                      UNSAFE_className="w-full"
                    >
                      {email.label}
                    </Body>
                    <Body
                      as="span"
                      size="small"
                      color={isActive ? "inverse" : "subtlest"}
                      UNSAFE_className="w-full leading-[1.5] text-[12px] font-normal"
                    >
                      {email.description}
                    </Body>
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
