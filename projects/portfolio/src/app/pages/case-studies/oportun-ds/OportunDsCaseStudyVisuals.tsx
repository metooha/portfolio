import React, { useEffect, useState } from "react";
import { AspectRatio } from "@/app/components/AspectRatio/AspectRatio";
import { CaseStudyMeta, type MetaItem } from "@/app/components/CaseStudyMeta";
import { PageTitleText } from "@/app/components/CaseStudyText/CaseStudyText";
import { Body, Heading } from "@/app/components/Text/Text";
import { FrameCycle as EdsFrameCycle, ImageFull as EdsImageFull } from "@/app/components/CaseStudyPrimitives";
import {
  imgChallengeFrame1,
  imgChallengeFrame2,
  imgChallengeFrame3,
  imgIllustrationColorUsage2x,
  imgSnackbarComponent,
  imgTransferMoneyPrototypePoster,
} from "@/app/assets/pages/case-study/oportun-ds/assets";

export function OportunDsOverview({
  logo,
  client,
  category,
  title,
  description,
  metaItems,
}: {
  logo: React.ReactNode;
  client: string;
  category: string;
  title: string;
  description: string;
  metaItems: MetaItem[];
}) {
  return (
    <div
      className="flex flex-col w-full"
      style={{ gap: "var(--ld-semantic-spacing-400, 2rem)" }}
    >
      <div
        className="flex items-start"
        style={{ gap: "var(--ld-semantic-spacing-150, 0.75rem)" }}
      >
        <div
          className="overflow-clip relative shrink-0 size-12"
          style={{ borderRadius: "var(--ld-primitive-scale-border-radius-200, 1rem)" }}
        >
          {logo}
        </div>
        <div className="flex flex-col items-start">
          <Heading as="p" size="medium" weight="default">
            {client}
          </Heading>
          <Body as="p" size="medium" color="subtle">
            {category}
          </Body>
        </div>
      </div>

      <PageTitleText as="p" UNSAFE_className="w-full max-w-[1300px]">
        {title}
      </PageTitleText>

      <Body as="p" size="large" UNSAFE_className="max-w-[1300px] w-full">
        {description}
      </Body>

      <CaseStudyMeta items={metaItems} />
    </div>
  );
}

const CHALLENGE_ACCENT = {
  mission: "#1d83ff",
  considerations: "#e85d04",
  goals: "#00c859",
} as const;

const THINGS_TO_CONSIDER = [
  "Existing Design System was minimal and under utilized",
  "Needed to build a system while designing simultaneously",
  "Quick iterations can lead to adoption issues",
  "No time to stress test components",
  "Design & Engineering needed to minimize design and technical debt",
] as const;

const OUR_GOALS = [
  {
    label: "Efficiency",
    body: "Increase UI designs quality & speed",
  },
  {
    label: "Alignment",
    body: "A way to codify and store decisions to reduce decision fatigue as well as create a common language",
  },
  {
    label: "Cohesion",
    body: "Deliver a cohesive end-user experience across all products",
  },
] as const;

function OportunChallengeCard({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[10px] overflow-hidden"
      style={{
        background: "var(--ld-semantic-color-fill, #ffffff)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="h-[3px] w-full" style={{ background: accent }} />
      <div className="flex flex-col gap-3 px-6 py-5">
        <Heading
          as="h3"
          size="small"
          weight="alt"
          UNSAFE_className="m-0"
          UNSAFE_style={{ color: accent, fontSize: "clamp(18px, 2vw, 22px)" }}
        >
          {title}
        </Heading>
        {children}
      </div>
    </div>
  );
}

export function OportunIllustrationColorUsageFigure() {
  return (
    <EdsImageFull
      src={imgIllustrationColorUsage2x}
      alt="Oportun illustration style guide covering background elements, character apparel, skin and hair tones, object hierarchy, and shadow usage"
      className="w-full"
      rounded={false}
      clipEdges={false}
    />
  );
}

export function OportunDsChallengeCards() {
  return (
    <div className="flex flex-col gap-4">
      <OportunChallengeCard title="The Mission" accent={CHALLENGE_ACCENT.mission}>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.65]">
          We need to rebrand our existing design system, rebuild the designs for the Unified app, create
          comprehensive style and usage guidelines, and develop interactions at the component level.
        </Body>
      </OportunChallengeCard>

      <OportunChallengeCard title="Things to consider" accent={CHALLENGE_ACCENT.considerations}>
        <ul className="m-0 p-0 list-none flex flex-col gap-2">
          {THINGS_TO_CONSIDER.map((item) => (
            <li key={item}>
              <Body as="span" size="small" color="subtlest" UNSAFE_className="leading-[1.65]">
                {item}
              </Body>
            </li>
          ))}
        </ul>
      </OportunChallengeCard>

      <OportunChallengeCard title="Our Goals" accent={CHALLENGE_ACCENT.goals}>
        <ul className="m-0 p-0 list-none flex flex-col gap-3">
          {OUR_GOALS.map((goal) => (
            <li key={goal.label}>
              <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.65]">
                <strong style={{ color: "var(--ld-semantic-color-text, #2e2f32)" }}>{goal.label}:</strong>{" "}
                {goal.body}
              </Body>
            </li>
          ))}
        </ul>
      </OportunChallengeCard>
    </div>
  );
}

const COMPONENT_DOC_PAGES = [
  {
    icon: null,
    title: "Overview",
    body: "Before you navigate though this file, here's a quick TL;DR of what you'll find and how you should navigate though the pages.",
  },
  {
    icon: "🗒️",
    title: "Guidelines",
    body: "On this page, you'll find information regarding component characteristics, including usage guidelines, best practices, and specifications. Here, you can expand your knowledge on how these components are created and gain a thorough understanding of how and when to implement them.",
  },
  {
    icon: "🚩",
    title: "References | Best Practices | Compilations",
    body: "This page is dedicated to referencing the components used in products, providing comprehensive guides on the appropriate utilization of these components to achieve cohesive design outputs.",
  },
  {
    icon: "👷",
    title: "Handoff & Theming",
    body: "This page contains information on component properties and is primarily focused on facilitating the transfer of designs to engineers. It also serves as a resource for designers to learn about customizing and interacting with the components. Additionally, theming options are available to adjust certain attributes of the components, such as color, size, stroke weight, surface options, and more, which may be linked to specific tokens.",
  },
  {
    icon: "💼",
    title: "Inventory | Use Cases | Requests",
    body: "This page provides examples of current usage and their corresponding rules. Additionally, you can use this page to branch off and request new components or suggest enhancements to existing components that you have built and would like to contribute to this file.",
  },
  {
    icon: "📚",
    title: "Coda Assets",
    body: "This page is dedicated to Coda doc assets, and not something designers need to review or look at. It will be repeated information.",
  },
  {
    icon: "🔒",
    title: "Component",
    body: "All of our current components live on this page. They are organized by sorting categorizes by file → page → artboard.",
  },
  {
    icon: "➡️📌",
    title: "Ver 1",
    body: "These pages are older versions of icons or depreciated assets that are no longer in use. They will not be accessible within the design system. If you happen to see any files using these icons, please update them to use the current version.",
  },
] as const;

function ComponentDocPageRow({
  icon,
  title,
  body,
}: {
  icon: string | null;
  title: string;
  body: string;
}) {
  return (
    <div
      className="flex flex-col gap-2 py-6 first:pt-0 last:pb-0 border-b last:border-b-0"
      style={{ borderColor: "var(--ld-semantic-color-separator, #e3e4e5)" }}
    >
      <div className="flex items-start gap-2">
        {icon ? (
          <span className="shrink-0 text-[18px] leading-none pt-0.5" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <Body as="p" size="small" weight="alt" UNSAFE_className="m-0 leading-snug">
          {title}
        </Body>
      </div>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.65]">
        {body}
      </Body>
    </div>
  );
}

export function OportunDsComponentLifeCycleVisual() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-start">
      <figure className="m-0 w-full flex justify-center lg:justify-start">
        <img
          src={imgSnackbarComponent}
          alt="Low balance protection mobile screen with snackbar notification showing activation confirmation and undo action"
          className="block w-full max-w-[320px] h-auto"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="flex flex-col">
        {COMPONENT_DOC_PAGES.map((page) => (
          <ComponentDocPageRow key={page.title} {...page} />
        ))}
      </div>
    </div>
  );
}

const TRANSFER_MONEY_PROTOTYPE_URL =
  "https://www.figma.com/proto/ne0HusyVVKR4Rhp7HiEmsZ/Amy-Portfolio?node-id=3742-54338&t=ADhd6ig9viFB9zv6-0&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=3742%3A21678&show-proto-sidebar=1&page-id=3742%3A7086&hide-ui=1"
const TRANSFER_MONEY_PROTOTYPE_EMBED =
  "https://embed.figma.com/proto/ne0HusyVVKR4Rhp7HiEmsZ/Amy-Portfolio?node-id=3742-54338&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=3742%3A21678&page-id=3742%3A7086&show-proto-sidebar=1&hide-ui=1&embed-host=share";

const LOAN_CALCULATOR_PROTOTYPE_URL =
  "https://www.figma.com/proto/ne0HusyVVKR4Rhp7HiEmsZ/Amy-Portfolio?node-id=3742-24814&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=3742%3A21678&page-id=3742%3A7086&show-proto-sidebar=1&hide-ui=1";

const LOAN_CALCULATOR_PROTOTYPE_EMBED =
  "https://embed.figma.com/proto/ne0HusyVVKR4Rhp7HiEmsZ/Amy-Portfolio?node-id=3742-24814&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=3742%3A21678&page-id=3742%3A7086&show-proto-sidebar=1&hide-ui=1&embed-host=share";

function OportunDsFigmaPrototype({
  embedUrl,
  prototypeUrl,
  title,
  posterSrc,
  posterAlt,
  ratio = 800 / 450,
  className = "",
}: {
  embedUrl: string;
  prototypeUrl: string;
  title: string;
  posterSrc?: string;
  posterAlt?: string;
  ratio?: number;
  className?: string;
}) {
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    setIsInteractive(true);
  }, []);

  return (
    <figure className={`m-0 w-full max-w-full shrink-0 flex flex-col gap-4 ${className}`}>
      <div
        className="relative w-full max-w-full overflow-hidden rounded-xl"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.1)",
          background: "var(--ld-semantic-color-fill-subtle, #f0f1f2)",
        }}
      >
        <AspectRatio ratio={ratio}>
          {isInteractive ? (
            <iframe
              src={embedUrl}
              title={title}
              width="800"
              height="450"
              style={{
                width: "100%",
                height: "100%",
                border: 0,
                display: "block",
              }}
              allowFullScreen
            />
          ) : posterSrc ? (
            <img
              src={posterSrc}
              alt={posterAlt ?? title}
              className="block h-full w-full object-cover object-top"
            />
          ) : (
            <div className="h-full w-full" aria-hidden="true" />
          )}
        </AspectRatio>

        {isInteractive ? (
          <a
            href={prototypeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 rounded-full px-4 py-2 no-underline shadow-sm"
            style={{
              background: "var(--ld-semantic-color-fill, #ffffff)",
              border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
            }}
          >
            <Body as="span" size="small" weight="alt">
              Open in Figma
            </Body>
          </a>
        ) : null}
      </div>
      <figcaption className="flex flex-col items-end gap-1 text-right">
        <a
          href={prototypeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline hover:underline"
        >
          <Body as="span" size="small" color="brand">
            Open prototype in Figma
          </Body>
        </a>
      </figcaption>
    </figure>
  );
}

export function OportunDsTransferMoneyPrototype() {
  return (
    <OportunDsFigmaPrototype
      embedUrl={TRANSFER_MONEY_PROTOTYPE_EMBED}
      prototypeUrl={TRANSFER_MONEY_PROTOTYPE_URL}
      title="Oportun Transfer Money mobile app prototype"
      posterSrc={imgTransferMoneyPrototypePoster}
      posterAlt="Oportun marketing page with mobile transfer money prototype preview"
    />
  );
}

export function OportunDsLoanCalculatorPrototype() {
  return (
    <OportunDsFigmaPrototype
      embedUrl={LOAN_CALCULATOR_PROTOTYPE_EMBED}
      prototypeUrl={LOAN_CALCULATOR_PROTOTYPE_URL}
      title="Oportun loan calculator prototype"
      ratio={1046 / 685}
      className="w-full"
    />
  );
}

export function OportunDsChallengeVisual() {
  return (
    <EdsFrameCycle
      alt="Oportun and Digit brand unification cycling through unified dashboard, how-it-works, and savings home screens"
      frames={[
        {
          src: imgChallengeFrame1,
          alt: "Digit and Oportun logos flanking the unified app dashboard",
        },
        {
          src: imgChallengeFrame2,
          alt: "How Oportun works screen with Digit and Oportun brand marks",
        },
        {
          src: imgChallengeFrame3,
          alt: "Oportun savings home screen with goals and feature cards",
        },
      ]}
      background="#ffffff"
      frameClassName="aspect-[4/5] sm:aspect-[5/6]"
      imageClassName="h-full w-full object-contain"
      intervalMs={3000}
    />
  );
}

