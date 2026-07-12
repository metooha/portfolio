import React from "react";
import { Body, Heading } from "@/app/components/Text/Text";
import {
  imgCheckoutBasketBodega,
  imgCheckoutBasketConnect,
  imgCheckoutBasketWalmart,
  imgIconAirtable,
  imgIconAndroid,
  imgIconCircleArrowDown,
  imgIconCircleCheck,
  imgIconClock,
  imgIconCode,
  imgIconCodeBranch,
  imgIconCodePipeline,
  imgIconComments,
  imgIconDesktop,
  imgIconFile,
  imgIconFrictionFlash,
  imgIconGithub,
  imgIconHexagonExclamation,
  imgIconIos,
  imgIconLightbulb,
  imgIconMobile,
  imgIconOctagonExclamation,
  imgIconPaintbrush,
  imgIconQuestionCircle,
  imgIconReact,
  imgIconSplit,
  imgInheritanceBenefit,
  imgInheritanceBrand,
  imgInheritanceLdBase,
  imgInheritanceWcp,
} from "@/app/assets/pages/case-study/airtable-sot/assets";

const SURFACE = "#e7f1fc";
const NAVY = "#001e60";
const CARD_BLUE = "#a9ddf7";
/** Case study surfaces: 16px chips/cards, 24px panels. */
const RADIUS_SM = "rounded-[16px]";
const RADIUS_LG = "rounded-[24px]";
const HUMAN_COST_STAT_SIZE = "clamp(40px, 8vw, 60px)";
const HUMAN_COST_CIRCLE_SIZE = 153;
const HUMAN_COST_DIAGRAM_MIN_HEIGHT = 347;

function HumanCostStatDisplay({
  children,
  bordered = true,
}: {
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: HUMAN_COST_CIRCLE_SIZE,
        height: HUMAN_COST_CIRCLE_SIZE,
        border: bordered ? `2px dashed ${NAVY}` : `2px solid transparent`,
        color: NAVY,
      }}
    >
      <Heading
        as="span"
        size="small"
        weight="alt"
        UNSAFE_className="h-fit leading-none text-center"
        UNSAFE_style={{ fontSize: HUMAN_COST_STAT_SIZE, color: "inherit", lineHeight: 1 }}
      >
        {children}
      </Heading>
    </div>
  );
}

function VisualFrame({
  children,
  className = "",
  surface = "subtle",
}: {
  children: React.ReactNode;
  className?: string;
  surface?: "white" | "subtle" | "none";
}) {
  return (
    <div
      className={`w-full overflow-hidden ${RADIUS_LG} ${className}`}
      style={
        surface === "none"
          ? undefined
          : {
              background:
                surface === "subtle"
                  ? "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)"
                  : "var(--ld-semantic-color-fill, #ffffff)",
            }
      }
    >
      {children}
    </div>
  );
}

function FigmaIcon({ src, alt, size = 32 }: { src: string; alt: string; size?: number }) {
  return <img src={src} alt={alt} width={size} height={size} className="shrink-0 object-contain" decoding="async" />;
}

function AccentTopCard({
  accent,
  eyebrow,
  title,
  description,
}: {
  accent: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className={`flex-1 min-w-0 ${RADIUS_SM} overflow-hidden`}
      style={{
        background: "var(--ld-semantic-color-fill, #ffffff)",
        border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
      }}
    >
      <div className="h-[3px]" style={{ background: accent }} />
      <div className="px-6 py-6">
        <Body
          as="p"
          size="small"
          weight="alt"
          UNSAFE_className="uppercase tracking-[0.1em] mb-2"
          UNSAFE_style={{ fontSize: "10px", color: accent }}
        >
          {eyebrow}
        </Body>
        <Body as="p" size="medium" weight="alt" UNSAFE_className="mb-2" UNSAFE_style={{ color: NAVY }}>
          {title}
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.65]">
          {description}
        </Body>
      </div>
    </div>
  );
}

const BRAND_THEMES: { label: string; bg: string; color?: string }[] = [
  { label: "Retail brand", bg: "#0053e2" },
  { label: "Membership club", bg: "#0062ad" },
  { label: "Legacy brand", bg: "#0071dc" },
  { label: "Regional market", bg: "#2a8703" },
  { label: "Subscription brand", bg: "#ffc220", color: "#2e2f32" },
  { label: "Business brand", bg: "#001e60" },
  { label: "Private-label brand", bg: "#ffa030", color: "#001e60" },
  { label: "Data product", bg: "#6245b7" },
  { label: "Payments brand", bg: "#6212b2" },
  { label: "+7 more", bg: "#4dbdf5", color: "#2e2f32" },
];

const PLATFORMS = [
  { label: "iOS Native", icons: [imgIconIos] },
  { label: "Android Native", icons: [imgIconAndroid] },
  { label: "React", icons: [imgIconReact, imgIconDesktop, imgIconMobile] },
  { label: "React Native", icons: [imgIconReact] },
] as const;

export function AirtableSituationVisual() {
  return (
    <VisualFrame surface="none">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:w-[372px] shrink-0">
          {PLATFORMS.map((platform) => (
            <div
              key={platform.label}
              className={`${RADIUS_LG} p-6 shadow-sm`}
              style={{
                background: SURFACE,
                boxShadow: "0 5px 10px 3px rgba(0,0,0,0.08), 0 -1px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div className="flex items-center gap-2">
                {platform.icons.map((icon) => (
                  <FigmaIcon key={icon} src={icon} alt="" size={32} />
                ))}
                <Body as="span" size="small" weight="alt" UNSAFE_style={{ color: NAVY }}>
                  {platform.label}
                </Body>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`flex-1 min-w-0 ${RADIUS_LG} p-6 sm:p-8 flex flex-col items-center gap-5 shadow-sm`}
          style={{
            background: SURFACE,
            boxShadow: "0 5px 10px 3px rgba(0,0,0,0.08), 0 -1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Body as="p" size="small" color="subtlest" UNSAFE_className="text-center">
            17 Brand Themes
          </Body>
          <div className="w-full grid grid-cols-2 gap-2">
            {BRAND_THEMES.map((brand) => (
              <div
                key={brand.label}
                className={`${RADIUS_SM} px-3 py-2.5 flex items-center justify-center text-center min-h-[41px]`}
                style={{ background: brand.bg, color: brand.color ?? SURFACE }}
              >
                <Body as="span" size="small" weight="alt" UNSAFE_style={{ color: "inherit", fontSize: "14px" }}>
                  {brand.label}
                </Body>
              </div>
            ))}
          </div>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="text-center text-[12px]">
            Each brand required its own token set across all 4 platforms
          </Body>
        </div>
      </div>
    </VisualFrame>
  );
}

const WORKFLOW_STEPS = [
  {
    step: "1",
    title: "Designer edits token in Figma",
    body: "Updates variables → generates specs → Slack ping",
  },
  {
    step: "1",
    title: "Designer creates a mode for each theme",
    body: "Updates variables → validates with teams → Generates token sheets",
  },
  {
    step: "2",
    title: "Engineer manually verifies & commits",
    body: "2-3 days of back-and-forth coordination",
  },
  {
    step: "3",
    title: "Error discovered in production",
    body: "Rollback required → cycle restarts",
  },
] as const;

const HIDDEN_COSTS = [
  { text: "3 days per update cycle", icon: imgIconClock },
  { text: "Dark mode broken for 1+ year", icon: imgIconHexagonExclamation },
  { text: "No single owner of the process", icon: imgIconQuestionCircle },
] as const;

function WorkflowStepBadge({ step }: { step: string }) {
  return (
    <div
      className="shrink-0 size-10 rounded-full border-2 flex items-center justify-center"
      style={{ borderColor: SURFACE, color: SURFACE }}
    >
      <Body as="span" UNSAFE_style={{ color: "inherit", fontSize: "24px", lineHeight: 1 }}>
        {step}
      </Body>
    </div>
  );
}

function CycleNode({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <FigmaIcon src={icon} alt="" size={56} />
      <Body as="span" size="small" UNSAFE_className="text-[14px] text-[#2e2f32]">
        {label}
      </Body>
    </div>
  );
}

function HumanCostCard({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-1 min-w-0 flex-col gap-4 ${RADIUS_LG} p-6 xl:min-h-[540px]`}
      style={{ background: CARD_BLUE }}
    >
      <Body as="p" size="medium" UNSAFE_style={{ color: NAVY, fontSize: "18px" }}>
        {title}
      </Body>
      <div
        className="flex min-h-[240px] flex-1 flex-col items-center justify-center xl:min-h-0"
        style={{ minHeight: HUMAN_COST_DIAGRAM_MIN_HEIGHT }}
      >
        {children}
      </div>
      <div className="flex flex-col gap-2">{footer}</div>
    </div>
  );
}

function HiddenCostFooter({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Body as="p" size="medium" UNSAFE_style={{ color: NAVY, fontSize: "18px" }}>
        THE HIDDEN COST
      </Body>
      {children}
    </>
  );
}

export function AirtableHumanCostVisual() {
  return (
    <VisualFrame surface="none">
      <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
        <div className="flex flex-col gap-4 xl:w-[378px] shrink-0">
          {WORKFLOW_STEPS.map((item) => (
            <div
              key={item.title}
              className={`${RADIUS_LG} flex gap-6 items-center px-8 py-8`}
              style={{ background: NAVY, color: SURFACE }}
            >
              <WorkflowStepBadge step={item.step} />
              <div className="min-w-0 flex flex-col gap-1">
                <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: "inherit", fontSize: "16px" }}>
                  {item.title}
                </Body>
                <Body as="p" size="small" UNSAFE_style={{ color: "inherit", fontSize: "16px", lineHeight: 1.25 }}>
                  {item.body}
                </Body>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 flex-1 min-w-0">
          <HumanCostCard
            title="Manual cycle time"
            footer={
              <HiddenCostFooter>
                <Body as="p" size="small" UNSAFE_className="leading-normal" UNSAFE_style={{ color: NAVY, fontSize: "16px" }}>
                  Syncing tokens took 72 hours
                  <br />
                  (3 days). Every release was a gamble due to manual fixes and missed updates.
                </Body>
              </HiddenCostFooter>
            }
          >
            <div
              className="flex w-full max-w-[342px] flex-col items-center justify-center gap-[17px]"
              style={{ minHeight: HUMAN_COST_DIAGRAM_MIN_HEIGHT }}
            >
              <CycleNode label="SPEC" icon={imgIconFile} />
              <div className="flex w-full items-center justify-center gap-[14px]">
                <CycleNode label="Design" icon={imgIconPaintbrush} />
                <HumanCostStatDisplay>72h</HumanCostStatDisplay>
                <CycleNode label="EXPORT" icon={imgIconCircleArrowDown} />
              </div>
              <CycleNode label="SYNC" icon={imgIconCode} />
            </div>
          </HumanCostCard>

          <HumanCostCard
            title="Error rate on manual exports"
            footer={
              <HiddenCostFooter>
                <ul className="list-none m-0 p-0 flex flex-col gap-2">
                  {HIDDEN_COSTS.map((item) => (
                    <li key={item.text} className="flex items-center gap-3">
                      <FigmaIcon src={item.icon} alt="" size={24} />
                      <Body as="span" size="small" UNSAFE_style={{ color: NAVY, fontSize: "16px" }}>
                        {item.text}
                      </Body>
                    </li>
                  ))}
                </ul>
              </HiddenCostFooter>
            }
          >
            <div
              className="relative flex w-full items-center justify-center"
              style={{ minHeight: HUMAN_COST_DIAGRAM_MIN_HEIGHT }}
            >
              <div className="relative flex flex-col items-center">
                <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2">
                  <FigmaIcon src={imgIconOctagonExclamation} alt="" size={56} />
                </div>
                <HumanCostStatDisplay bordered={false}>~15 %</HumanCostStatDisplay>
              </div>
            </div>
          </HumanCostCard>
        </div>
      </div>
    </VisualFrame>
  );
}

export function AirtableBridgeVisual() {
  return (
    <VisualFrame surface="none">
      <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6 w-full">
        <AccentTopCard
          accent="#7b4f00"
          eyebrow="Design / Core"
          title="Airtable"
          description="Collaborative, flexible, accessible. The logic of the system lives here, but it's isolated."
        />
        <div className="flex md:flex-col items-center justify-center gap-2 md:px-2 shrink-0 py-2">
          <FigmaIcon src={imgIconFrictionFlash} alt="Friction" size={32} />
          <Body as="span" size="small" weight="alt" UNSAFE_className="uppercase tracking-wide text-center" UNSAFE_style={{ color: "#fa6400" }}>
            Friction
          </Body>
        </div>
        <AccentTopCard
          accent="#1a4f8a"
          eyebrow="The Reality"
          title="Github"
          description="Versioned, strict, and performant. This is what the user actually sees, but designers can't touch it."
        />
      </div>
    </VisualFrame>
  );
}

const PIVOT_ROWS = [
  {
    icon: imgIconPaintbrush,
    title: "Design owned the data",
    body: "Information architecture, token taxonomy, governance model",
  },
  {
    icon: imgIconCode,
    title: "Engineering owned the pipeline",
    body: "CI/CD, Style Dictionary transforms, Artifactory delivery",
  },
  {
    icon: imgIconComments,
    title: "The shared contract: JSON schema",
    body: "Agreed before building, eliminating integration friction entirely",
  },
] as const;

export function AirtablePivotVisual() {
  return (
    <VisualFrame surface="none">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          {PIVOT_ROWS.map((row) => (
            <div
              key={row.title}
              className={`${RADIUS_LG} p-6 sm:p-8 flex gap-6 items-center`}
              style={{ background: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)" }}
            >
              <div
                className="shrink-0 size-14 rounded-full flex items-center justify-center"
                style={{ background: NAVY }}
              >
                <FigmaIcon src={row.icon} alt="" size={24} />
              </div>
              <div className="min-w-0">
                <Body as="p" size="medium" weight="alt" UNSAFE_className="mb-1" UNSAFE_style={{ color: NAVY }}>
                  {row.title}
                </Body>
                <Body as="p" size="small" color="subtlest">
                  {row.body}
                </Body>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`lg:w-[484px] shrink-0 ${RADIUS_LG} p-6 sm:p-10 flex flex-col gap-6`}
          style={{ background: "#0053e2", color: "#ffffff" }}
        >
          <div>
            <Heading as="h3" size="small" weight="alt" UNSAFE_className="mb-2 italic" UNSAFE_style={{ color: "inherit", fontSize: "clamp(22px, 3vw, 32px)" }}>
              &ldquo;A shared Language&rdquo;
            </Heading>
            <Body as="p" size="small" UNSAFE_className="leading-[1.65]" UNSAFE_style={{ color: "rgba(255,255,255,0.85)" }}>
              Neither side had to abandon their native tooling. The pipeline was the translator.
            </Body>
          </div>
          <div className={`${RADIUS_SM} overflow-hidden`} style={{ background: "#1e1e1e" }}>
            <div className="flex gap-2 px-4 pt-4">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <pre
              className="m-0 p-4 text-[13px] leading-relaxed overflow-x-auto"
              style={{ color: "#9cdcfe", fontFamily: "ui-monospace, monospace" }}
            >
              {`{
  "color": {
    "brand": {
      "walmart-blue": {
        "value": "#0053E2",
        "type": "color"
      }
    }
  }
}`}
            </pre>
            <Body
              as="p"
              size="small"
              UNSAFE_className="px-4 pb-4 text-[12px]"
              UNSAFE_style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Generated via Airtable Automation · v3.5.0
            </Body>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

const PIPELINE_STEPS = [
  {
    title: "Airtable",
    body: "Designer-owned SoT · Relational alias chain · No code required",
    arrow: "API pull →",
    layer: "Design layer",
    layerStyle: "design" as const,
    icon: imgIconAirtable,
    variant: "light" as const,
  },
  {
    title: "Style Dictionary",
    body: "Transforms tokens · Generates platform JSON · Validates aliases",
    arrow: "push →",
    layer: "Transform layer",
    layerStyle: "transform" as const,
    icon: imgIconCodePipeline,
    variant: "light" as const,
  },
  {
    title: "GitHub Actions CI",
    body: "347 tests · Semver tagging · PR for review · Slack alerts",
    arrow: "publish →",
    layer: "CI layer",
    layerStyle: "ci" as const,
    icon: imgIconCodeBranch,
    variant: "navy" as const,
  },
] as const;

const DELIVERY_TARGETS = [
  { title: "Artifactory", body: "Production · npm", icon: imgIconSplit, iconSize: 20 },
  { title: "GitHub", body: "Dev · CocoaPods", icon: imgIconGithub, iconSize: 24 },
] as const;

const LAYER_BADGE_STYLES = {
  design: { background: SURFACE, color: "#000000", border: "transparent" },
  transform: { background: "#fef9c3", color: "#92400e", border: "#f59e0b" },
  ci: { background: SURFACE, color: "#374151", border: "#d1d5db" },
  delivery: { background: SURFACE, color: "#000000", border: "transparent" },
} as const;

function PipelineArrow({ children }: { children: React.ReactNode }) {
  return (
    <Body as="span" size="small" UNSAFE_className="shrink-0 whitespace-nowrap self-center" UNSAFE_style={{ color: NAVY, fontSize: "14px" }}>
      {children}
    </Body>
  );
}

function PipelineStepCard({
  title,
  body,
  icon,
  variant,
}: {
  title: string;
  body: string;
  icon: string;
  variant: "light" | "navy";
}) {
  const isNavy = variant === "navy";

  return (
    <div
      className={`h-full w-full ${RADIUS_LG} flex flex-col items-center justify-center gap-4 p-6 sm:p-8 text-center min-h-[215px]`}
      style={{
        background: isNavy ? NAVY : SURFACE,
        color: isNavy ? SURFACE : "#2e2f32",
      }}
    >
      <FigmaIcon src={icon} alt="" size={24} />
      <Body as="p" size="medium" UNSAFE_style={{ color: "inherit", fontSize: "18px" }}>
        {title}
      </Body>
      <Body as="p" size="small" UNSAFE_className="leading-normal max-w-[128px]" UNSAFE_style={{ color: "inherit", fontSize: "14px" }}>
        {body}
      </Body>
    </div>
  );
}

function PipelineDeliveryCard({
  title,
  body,
  icon,
  iconSize,
}: {
  title: string;
  body: string;
  icon: string;
  iconSize: number;
}) {
  return (
    <div
      className={`w-full ${RADIUS_LG} flex flex-col items-center justify-center gap-2 p-5 text-center`}
      style={{ background: "#0053e2", color: SURFACE }}
    >
      <div className="flex items-center gap-2">
        <FigmaIcon src={icon} alt="" size={iconSize} />
        <Body as="p" size="medium" UNSAFE_style={{ color: "inherit", fontSize: "18px" }}>
          {title}
        </Body>
      </div>
      <Body as="p" size="small" UNSAFE_style={{ color: "inherit", fontSize: "14px" }}>
        {body}
      </Body>
    </div>
  );
}

function PipelineLayerBadge({ label, styleKey }: { label: string; styleKey: keyof typeof LAYER_BADGE_STYLES }) {
  const badge = LAYER_BADGE_STYLES[styleKey];

  return (
    <span
      className={`inline-flex items-center ${RADIUS_SM} px-4 py-1.5 whitespace-nowrap`}
      style={{
        background: badge.background,
        color: badge.color,
        border: `1px solid ${badge.border}`,
        fontSize: "12px",
      }}
    >
      {label}
    </span>
  );
}

export function AirtablePipelineVisual() {
  return (
    <VisualFrame surface="none">
      {/* Mobile: each stage stacks top to bottom, arrow rotated to point down. */}
      <div className="flex flex-col items-stretch gap-3 lg:hidden">
        {PIPELINE_STEPS.map((step) => (
          <div key={step.title} className="flex flex-col items-stretch gap-3">
            <PipelineStepCard title={step.title} body={step.body} icon={step.icon} variant={step.variant} />
            <div className="flex justify-center">
              <PipelineLayerBadge label={step.layer} styleKey={step.layerStyle} />
            </div>
            <div className="flex justify-center" aria-hidden="true">
              <PipelineArrow>↓</PipelineArrow>
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-3">
          {DELIVERY_TARGETS.map((target) => (
            <PipelineDeliveryCard key={target.title} {...target} />
          ))}
        </div>
        <div className="flex justify-center">
          <PipelineLayerBadge label="Delivery layer" styleKey="delivery" />
        </div>
      </div>

      {/* Desktop: full pipeline in one row, layer badges aligned under each stage. */}
      <div
        className="hidden w-full items-stretch gap-x-2 gap-y-3 lg:grid"
        style={{
          gridTemplateColumns:
            "minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,0.8fr)",
        }}
      >
        <PipelineStepCard
          title={PIPELINE_STEPS[0].title}
          body={PIPELINE_STEPS[0].body}
          icon={PIPELINE_STEPS[0].icon}
          variant={PIPELINE_STEPS[0].variant}
        />
        <div className="flex items-center self-center">
          <PipelineArrow>{PIPELINE_STEPS[0].arrow}</PipelineArrow>
        </div>

        <PipelineStepCard
          title={PIPELINE_STEPS[1].title}
          body={PIPELINE_STEPS[1].body}
          icon={PIPELINE_STEPS[1].icon}
          variant={PIPELINE_STEPS[1].variant}
        />
        <div className="flex items-center self-center">
          <PipelineArrow>{PIPELINE_STEPS[1].arrow}</PipelineArrow>
        </div>

        <PipelineStepCard
          title={PIPELINE_STEPS[2].title}
          body={PIPELINE_STEPS[2].body}
          icon={PIPELINE_STEPS[2].icon}
          variant={PIPELINE_STEPS[2].variant}
        />
        <div className="flex items-center self-center">
          <PipelineArrow>{PIPELINE_STEPS[2].arrow}</PipelineArrow>
        </div>

        <div className="flex min-h-[215px] flex-col justify-center gap-[14px]">
          {DELIVERY_TARGETS.map((target) => (
            <PipelineDeliveryCard key={target.title} {...target} />
          ))}
        </div>

        <div className="flex justify-center self-end">
          <PipelineLayerBadge label={PIPELINE_STEPS[0].layer} styleKey={PIPELINE_STEPS[0].layerStyle} />
        </div>
        <div aria-hidden="true" />
        <div className="flex justify-center self-end">
          <PipelineLayerBadge label={PIPELINE_STEPS[1].layer} styleKey={PIPELINE_STEPS[1].layerStyle} />
        </div>
        <div aria-hidden="true" />
        <div className="flex justify-center self-end">
          <PipelineLayerBadge label={PIPELINE_STEPS[2].layer} styleKey={PIPELINE_STEPS[2].layerStyle} />
        </div>
        <div aria-hidden="true" />
        <div className="flex justify-center self-end">
          <PipelineLayerBadge label="Delivery layer" styleKey="delivery" />
        </div>
      </div>
    </VisualFrame>
  );
}

const INHERITANCE_LAYERS = [
  {
    layer: "Layer 1",
    title: "Core Base: 650+ Tokens",
    body: "Primitive + semantic tokens. Update once and all 17 brands receive the change automatically.",
    image: imgInheritanceLdBase,
  },
  {
    layer: "Layer 2",
    title: "Platform Theme: Overrides",
    body: "Platform-specific overrides only. Inherits everything from Core Base automatically.",
    image: imgInheritanceWcp,
  },
  {
    layer: "Layer 3",
    title: "Brand Themes: ~10% Overrides",
    body: "Membership club, subscription brand, and regional market themes each define ~10% of tokens. 90% inherits automatically. Zero drift.",
    image: imgInheritanceBrand,
  },
  {
    layer: "Key Benefit",
    title: "Adding a Brand = 10% of the Work",
    body: "Not 100%. No duplication means no drift. The inheritance model scales to any number of brands.",
    image: imgInheritanceBenefit,
  },
] as const;

function InheritanceCard({ card }: { card: (typeof INHERITANCE_LAYERS)[number] }) {
  return (
    <div
      className={`min-w-0 ${RADIUS_SM} overflow-hidden flex flex-col h-full`}
      style={{
        background: "var(--ld-semantic-color-fill, #ffffff)",
        border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
      }}
    >
      <div className="h-36 flex items-center justify-center p-2 shrink-0">
        <img src={card.image} alt="" className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <Body as="p" size="small" weight="alt" color="brand" UNSAFE_className="uppercase tracking-wide mb-1 text-[11px]">
          {card.layer}
        </Body>
        <Body as="p" size="small" weight="alt" UNSAFE_className="mb-2 leading-snug" UNSAFE_style={{ color: NAVY }}>
          {card.title}
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6] text-[13px] flex-1">
          {card.body}
        </Body>
      </div>
    </div>
  );
}

export function AirtableInheritanceVisual() {
  return (
    <VisualFrame surface="none">
      {/* Mobile: cards stack top to bottom, "inherits" arrow rotated to point down. */}
      <div className="flex flex-col gap-2 lg:hidden">
        {INHERITANCE_LAYERS.map((card, index) => (
          <React.Fragment key={card.title}>
            <InheritanceCard card={card} />
            {index < INHERITANCE_LAYERS.length - 1 && (
              <Body as="span" size="small" color="subtlest" UNSAFE_className="self-center text-[12px] whitespace-nowrap px-1">
                inherits ↓
              </Body>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Desktop: full row, horizontal scroll only kicks in below the row's natural width. */}
      <div className="hidden overflow-x-auto lg:block">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-2 min-w-[880px]">
          {INHERITANCE_LAYERS.map((card, index) => (
            <React.Fragment key={card.title}>
              <InheritanceCard card={card} />
              {index < INHERITANCE_LAYERS.length - 1 && (
                <Body as="span" size="small" color="subtlest" UNSAFE_className="shrink-0 self-center text-[12px] whitespace-nowrap px-1">
                  inherits →
                </Body>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}

const SCALE_BRANDS = [
  ["Retail brand", "Membership club", "Subscription brand", "Payments brand"],
  ["International", "Regional market", "Data product", "+14 brands"],
] as const;

export function AirtableScaleVisual() {
  return (
    <VisualFrame surface="none">
      <div>
        <div
          className={`${RADIUS_LG} p-6 sm:p-8 text-center relative`}
          style={{ background: NAVY, color: SURFACE }}
        >
          <Heading as="p" size="small" weight="alt" UNSAFE_style={{ color: "inherit", fontSize: "clamp(20px, 2.5vw, 28px)" }}>
            Core Base (650+)
          </Heading>
          <Body as="p" size="small" UNSAFE_className="mt-1" UNSAFE_style={{ color: "inherit", opacity: 0.85 }}>
            Foundation tokens
          </Body>
          <div
            className={`hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 items-start gap-3 max-w-[280px] text-left ${RADIUS_SM} p-3`}
            style={{ background: "#ffc220", color: NAVY }}
          >
            <FigmaIcon src={imgIconLightbulb} alt="" size={16} />
            <Body as="p" size="small" UNSAFE_className="leading-snug text-[13px]" UNSAFE_style={{ color: "inherit" }}>
              When Core Base updates, all 17 downstream tenants receive the change automatically
            </Body>
          </div>
        </div>

        <Body as="p" size="small" color="subtlest" UNSAFE_className="text-center py-3">
          ↓ inherits
        </Body>

        <div className="flex flex-col gap-3">
          {SCALE_BRANDS.map((row) => (
            <div key={row.join("-")} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {row.map((brand) => (
                <div
                  key={brand}
                  className={`${RADIUS_SM} px-4 py-6 flex items-center justify-center text-center min-h-[71px]`}
                  style={{
                    background: "var(--ld-semantic-color-fill, #ffffff)",
                    border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
                  }}
                >
                  <Body as="span" size="small" weight="alt" UNSAFE_style={{ color: NAVY }}>
                    {brand}
                  </Body>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}

const VALIDATION_ITEMS = [
  "iOS Theme Validated",
  "Android XML Generated",
  "Web SCSS Variables",
  "Icon Contrast Check",
  "Accessibility AA Pass",
  "Version Bump (Patch)",
] as const;

export function AirtableValidationVisual() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {VALIDATION_ITEMS.map((item) => (
        <div
          key={item}
          className={`${RADIUS_SM} px-3 py-4 flex items-start gap-2 min-h-[72px]`}
          style={{ background: NAVY }}
        >
          <FigmaIcon src={imgIconCircleCheck} alt="" size={24} />
          <Body as="span" size="small" UNSAFE_className="leading-snug text-[13px]" UNSAFE_style={{ color: SURFACE }}>
            {item}
          </Body>
        </div>
      ))}
    </div>
  );
}

const THEMED_BASKETS = [
  { label: "Walmart", image: imgCheckoutBasketWalmart },
  { label: "Retail media", image: imgCheckoutBasketConnect },
  { label: "Regional market", image: imgCheckoutBasketBodega },
] as const;

export function AirtableDynamicSvgsVisual() {
  return (
    <VisualFrame surface="white">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-end p-6 sm:p-10">
        {THEMED_BASKETS.map((theme) => (
          <div key={theme.label} className="flex flex-col items-center flex-1 min-w-0 max-w-[200px]">
            <img
              src={theme.image}
              alt={`${theme.label} checkout basket illustration`}
              className="w-full h-auto max-w-[200px] object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}
