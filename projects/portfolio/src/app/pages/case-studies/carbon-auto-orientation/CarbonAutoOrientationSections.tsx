import React from "react";
import { Body, Heading } from "@/app/components/Text/Text";
import { Link } from "@/app/components/Link";
import {
  BeforeAfter as EdsBeforeAfter,
  Eyebrow as EdsEyebrow,
  Lead as EdsLead,
  Section as EdsSection,
  SectionTitle as EdsSectionTitle,
} from "@/app/components/CaseStudyPrimitives";
import {
  EdsJourneyTimeline,
  type EdsJourneyItem,
} from "../everyday-sans/EdsCaseStudyPrimitives";
import {
  CarbonCompetitorGrid,
  CarbonEyebrowOnDark,
  CarbonMetricsTable,
  CarbonNote,
  CarbonOptionList,
  CarbonStatsRow,
  CarbonTensionSplit,
  CarbonTradeoffGrid,
} from "./CarbonAutoOrientationBlocks";
import videoAutoOrientation from "@/app/assets/pages/case-study/carbon/Auto-Orientation.mp4";
import imgMagics1 from "@/app/assets/pages/case-study/carbon/magics 2.png";
import imgMagics2 from "@/app/assets/pages/case-study/carbon/magics 1.png";
import imgPreform1 from "@/app/assets/pages/case-study/carbon/preform 2.png";
import imgPreform2 from "@/app/assets/pages/case-study/carbon/preform 1.png";
import imgNetfabb1 from "@/app/assets/pages/case-study/carbon/netfab 2.png";
import imgNetfabb2 from "@/app/assets/pages/case-study/carbon/netfab 1.png";

const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";
const BRAND = "var(--ld-semantic-color-text-brand, #2a0eff)";

// ── 1 · Problem statement ─────────────────────────────────────────

const PROBLEM_FACTS = [
  "Orientation decides whether a print succeeds. It drives supports, surface quality, print time, and warping.",
  "The Advanced Options panel exposed all of that complexity and expected users to resolve it themselves.",
  "That worked for a handful of experts, but it silently failed dental labs and low-volume production teams, the segments Carbon was growing into.",
];

export function CarbonProblemStatementSection() {
  return (
    <EdsSection id="problem">
      <EdsEyebrow>Problem statement</EdsEyebrow>
      <EdsSectionTitle>{"The brief asked for speed.\nThe real problem was expertise."}</EdsSectionTitle>
      <EdsLead>
        Auto-orientation was framed as a performance fix. The actual failure point was different: success
        depended on expertise most users didn&rsquo;t have.
      </EdsLead>
      <ul className="m-0 p-0 list-none flex flex-col w-full max-w-[660px]">
        {PROBLEM_FACTS.map((fact) => (
          <li key={fact} className="flex gap-3 py-3 border-b items-start" style={{ borderColor: SEPARATOR }}>
            <span
              className="shrink-0 rounded-full mt-2"
              style={{ width: "5px", height: "5px", background: BRAND }}
              aria-hidden="true"
            />
            <Body as="p" size="small" color="subtlest" UNSAFE_className="m-0 leading-[1.6]">
              {fact}
            </Body>
          </li>
        ))}
      </ul>
      <Heading
        as="p"
        size="small"
        weight="alt"
        UNSAFE_className="max-w-[700px] leading-[1.5] m-0"
        UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #07022e)", fontSize: "clamp(18px, 2vw, 22px)" }}
      >
        The goal shifted: from <i>configure the machine correctly</i> to{" "}
        <i>choose between good outcomes</i>, without taking control away from experts.
      </Heading>
    </EdsSection>
  );
}

// ── 2 · Tension ───────────────────────────────────────────────────

export function CarbonTensionSection() {
  return (
    <EdsSection id="tension" variant="dark">
      <CarbonEyebrowOnDark>Tension</CarbonEyebrowOnDark>
      <EdsSectionTitle onDark>Two audiences, opposite needs</EdsSectionTitle>
      <EdsLead onDark>
        One tool had to serve people at opposite ends of the same task, and the existing panel underserved
        both.
      </EdsLead>
      <CarbonTensionSplit
        left={{
          who: "New users",
          title: "Lacked knowledge or time",
          body: "Wanted a good part without learning orientation theory, and the panel never told them what “good” even looked like.",
        }}
        right={{
          who: "Expert users",
          title: "Wanted speed, not surrender",
          body: "Happy to let automation start the job, but would abandon any tool that took the wheel and hid the trade-offs.",
        }}
      />
    </EdsSection>
  );
}

// ── 3 · Approach: competitive analysis ───────────────────────────

export function CarbonApproachSection() {
  return (
    <EdsSection id="approach" variant="mid">
      <EdsEyebrow>The approach</EdsEyebrow>
      <EdsSectionTitle>Three tools already solve part of this.</EdsSectionTitle>
      <EdsLead>Three existing tools were evaluated for patterns worth reusing and gaps worth closing.</EdsLead>
      <CarbonCompetitorGrid
        cards={[
          {
            name: "Magics",
            maker: "Materialise",
            images: [
              { src: imgMagics1, alt: "Magics: selecting an orientation name, then running Compare to analyze it" },
              { src: imgMagics2, alt: "Magics: comparison modal showing weighted metrics per orientation, color-coded" },
            ],
            took: "The color-coded comparison table as a trust device, and letting users remove weights that don't concern them.",
            cut: "Up-front weight tuning before you see any result. It demands expertise before you see anything.",
          },
          {
            name: "PreForm",
            maker: "Formlabs",
            images: [
              { src: imgPreform1, alt: "PreForm: Auto-Orient All, then the software auto-orients the parts" },
              { src: imgPreform2, alt: "PreForm: print details panel flagging unsupported minima and cup detection" },
            ],
            took: "The low-friction, one-action entry point.",
            cut: "Binary color/icon feedback with no explanation of the trade-off, and supports are still entirely manual.",
          },
          {
            name: "Netfabb",
            maker: "Autodesk",
            images: [
              { src: imgNetfabb1, alt: "Netfabb: opening ranking settings and editing the criteria weights" },
              { src: imgNetfabb2, alt: "Netfabb: ranked orientation table sorted by best output" },
            ],
            took: "Ranking against real fabrication criteria, not abstractions: the same criteria adapted into the final ranking weights.",
            cut: "Settings depth: it's an engineering tool, not a decision aid.",
          },
        ]}
      />
      <Heading
        as="p"
        size="small"
        weight="alt"
        UNSAFE_className="max-w-[720px] leading-[1.5] m-0"
        UNSAFE_style={{
          color: "var(--ld-semantic-color-fill-brand-bold, #07022e)",
          fontSize: "clamp(18px, 2vw, 22px)",
        }}
      >
        The gap across all three: they either hide the trade-offs or bury them under expert controls.{" "}
        <i>None made the trade-off itself the interface</i>, and that gap became the design.
      </Heading>
    </EdsSection>
  );
}

// ── 3.5a · The process ────────────────────────────────────────────

const JOURNEY_ITEMS: EdsJourneyItem[] = [
  {
    date: "Step 01",
    phase: "Brief & requirements",
    who: [{ label: "Product", variant: "brand" }],
    mood: "progress",
    story:
      "The ask arrived as “faster, more automated.” Stated constraints: consolidate Advanced Options, sub-10s runtime, smoother API calls.",
  },
  {
    date: "Step 02",
    phase: "Define the problem",
    who: [{ label: "Design", variant: "brand" }],
    mood: "friction",
    story:
      "The framing didn't hold up. The real failure wasn't speed. It was that success depended on expertise most users didn't have.",
    tension: "Goal reframed from “configure correctly” to “choose between good outcomes.”",
  },
  {
    date: "Step 03",
    phase: "Define success metrics",
    who: [{ label: "Product", variant: "brand" }],
    mood: "progress",
    story:
      "Run in parallel with reframing the problem: the numbers the design would be held to, including run time, support-request volume, and adoption, each with a baseline, a beta checkpoint, and a full-release bar.",
  },
  {
    date: "Step 04",
    phase: "Competitive research",
    who: [{ label: "Design", variant: "brand" }],
    mood: "progress",
    story: "Magics, PreForm, and Netfabb studied for trust devices worth keeping and expert gates worth dropping.",
  },
  {
    date: "Step 05",
    phase: "Userflows",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
    ],
    mood: "progress",
    story:
      "A single entry branching into up to five ranked options, each expandable to its metrics, with a manual-adjust path preserved throughout.",
  },
  {
    date: "Step 06",
    phase: "UX & UI design",
    who: [{ label: "Design", variant: "brand" }],
    mood: "progress",
    story:
      "Comparison and preview designed against existing Storybook components, extended where the decision UI needed new patterns.",
  },
  {
    date: "Step 07",
    phase: "Documentation",
    who: [
      { label: "Design", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
    ],
    mood: "progress",
    story:
      "Spec written alongside the UI, including edge cases like what happens to the ranked list after a manual re-orientation.",
  },
  {
    date: "Step 08",
    phase: "Testing",
    who: [{ label: "Research", variant: "a11y" }],
    mood: "win",
    story: "Prototype tested with a small group of users, read back against the reframed goal.",
    win: "The clearest signal wasn't speed. It was confidence in their own choice.",
  },
];

export function CarbonProcessSection() {
  return (
    <EdsSection id="process">
      <EdsEyebrow>The process</EdsEyebrow>
      <EdsSectionTitle>From brief to tested feature</EdsSectionTitle>
      <EdsLead>
        The design system already carried the interface layer, so the work centered on the decision
        path, not the screens. Wireframing was unnecessary; framing and validation were where the time
        went.
      </EdsLead>
      <EdsJourneyTimeline items={JOURNEY_ITEMS} />
    </EdsSection>
  );
}

// ── 3.5b · Goals & targets ────────────────────────────────────────

export function CarbonTargetsSection() {
  return (
    <EdsSection id="targets" variant="dark">
      <CarbonEyebrowOnDark>Goals & targets</CarbonEyebrowOnDark>
      <EdsSectionTitle onDark>What &ldquo;good&rdquo; had to mean</EdsSectionTitle>
      <EdsLead onDark>
        The reframe only mattered if it was measurable. These were the goals the design was held against:
        the bar the feature had to clear, not a victory lap.
      </EdsLead>
      <CarbonStatsRow
        stats={[
          { value: "≤10s", label: "runtime, held as a UX constraint" },
          { value: "80%", label: "“good” orientation, automatically" },
          { value: "90%", label: "adoption among users without a preferred orientation" },
          { value: "≤5", label: "ranked options per part" },
        ]}
      />
      <Body
        as="p"
        size="small"
        UNSAFE_className="text-center w-full"
        UNSAFE_style={{ color: "rgba(255,255,255,0.45)" }}
      >
        Targets set with product and engineering, spanning dentures, splints, and connectors.
      </Body>
    </EdsSection>
  );
}

// ── 3.5c · How we'll know it worked ──────────────────────────────

export function CarbonSuccessMetricsSection() {
  return (
    <EdsSection id="success-metrics">
      <EdsEyebrow>How we&rsquo;ll know it worked</EdsEyebrow>
      <EdsSectionTitle>Baseline, beta, full release</EdsSectionTitle>
      <EdsLead>
        Each target carried a baseline, a beta checkpoint, and a full-release bar: a way to tell mid-flight
        whether the design was actually working.
      </EdsLead>
      <CarbonMetricsTable
        rows={[
          { metric: "Run time", baseline: "Uninstrumented pre-launch", beta: "p90 < 30 sec", full: "p90 < 10 sec" },
          {
            metric: "Support-request volume",
            baseline: "4 / mo. for production projects",
            beta: "N/A",
            full: "1 / mo.",
          },
          {
            metric: "Usage",
            baseline: "% of printed parts selecting the recommendation",
            beta: "N/A",
            full: "80% usage, no adjustment to output orientation",
          },
        ]}
      />
    </EdsSection>
  );
}

// ── 4 · Product decisions & trade-offs ───────────────────────────

export function CarbonDecisionsSection() {
  return (
    <EdsSection id="decisions" variant="mid">
      <EdsEyebrow>Product decisions & trade-offs</EdsEyebrow>
      <EdsSectionTitle>The interesting part wasn&rsquo;t the automation.</EdsSectionTitle>
      <EdsLead>
        It was deciding how much to automate, and what to give up each time. Four decisions shaped the
        whole design.
      </EdsLead>
      <CarbonNote lead="The resolve:">
        The configuration panel was replaced with a guided choice: a few strong orientations surfaced,
        each showing <i>why</i> it wins on the terms print work is actually measured in, with the final
        call left to the user. Fast enough for a novice. Transparent enough for an expert. Editable for
        both.
      </CarbonNote>
      <div className="flex flex-col gap-4">
        <Heading
          as="h3"
          size="small"
          weight="alt"
          UNSAFE_className="uppercase tracking-[0.1em] m-0"
          UNSAFE_style={{
            fontSize: "11px",
            color: "var(--ld-semantic-color-text-brand, #2a0eff)",
          }}
        >
          What each of the five ranked slots actually optimizes for
        </Heading>
        <CarbonOptionList
          items={[
            {
              number: "1",
              title: "Recommended",
              optimizesFor: "The overall-best orientation across every criterion tracked.",
            },
            {
              number: "2",
              title: "Reduced support",
              optimizesFor: "Fewer islands, supports, and overhangs, for less post-processing.",
            },
            {
              number: "3",
              title: "Reduced print time",
              optimizesFor: "Lower z-height, faster print.",
            },
            {
              number: "4",
              title: "Minimize footprint",
              optimizesFor:
                "Smaller build-plate footprint, held back pending more input before implementation.",
              future: true,
            },
          ]}
        />
      </div>
      <CarbonTradeoffGrid
        cards={[
          {
            number: "01",
            title: "Show several options, not one “best.”",
            tension:
              "Automation looks best when it just does it, but orientation is multi-objective, and a single answer hides that judgment.",
            choice:
              "Surface up to five ranked orientations, including Recommended, Reduced Support, Reduced Print Time, and a queued Minimize Footprint slot, rather than one verdict.",
            tradeoff:
              "Slightly more to reason about, but each option states its trade-off in part success, print time, resin usage, and labor, so the reasoning stays visible.",
          },
          {
            number: "02",
            title: "Rank on outcomes, not the solver's score.",
            tension:
              "The easiest ranking is the algorithm's internal confidence, a number that means nothing to a dental lab.",
            choice:
              "Rank on print time, resin usage, support/labor, and a color-coded quality signal.",
            tradeoff:
              "More work mapping raw output to human terms; the payoff is a comparison people can act on.",
          },
          {
            number: "03",
            title: "Keep manual control after auto-orienting.",
            tension:
              "A clean automated flow is tempting to lock down, but experts abandon any tool that takes the wheel. And once someone starts adjusting by hand, the ranked options can't just vanish.",
            choice:
              "Auto-orient treated as a fully editable starting point: manual re-orientation and moving the part keep the ranked list viewable throughout.",
            tradeoff:
              "A more complex end-state to design: changing the on/above-platform setting means backing out via the back button first, not dragging in place. That's the reason power users stayed inside the feature instead of leaving for a manual workflow.",
          },
          {
            number: "04",
            title: "Treat sub-10s runtime as a UX requirement.",
            tension: "Speed usually gets filed as an engineering metric and negotiated away.",
            choice:
              "Held as an interaction constraint: past ~10s, a choice starts to feel like a job kicked off rather than an answer given.",
            tradeoff:
              "Drove the “smoother API calls” scope, and cost some option depth to protect the feel.",
          },
        ]}
      />
    </EdsSection>
  );
}

// ── 5 · Video walkthrough ────────────────────────────────────────

const FIGMA_PROTOTYPE_SRC =
  "https://embed.figma.com/proto/QbfIIGwxMW3Gk3V4aw9Jys/Print-Prep-2.0?type=design&node-id=4418-97546&viewport=313%2C-2754%2C0.25&scaling=contain&starting-point-node-id=4418%3A97546&page-id=2%3A2&embed-host=share&hide-ui=1";

export function CarbonVideoWalkthroughSection() {
  return (
    <EdsSection id="video">
      <EdsEyebrow>See it in action</EdsEyebrow>
      <EdsSectionTitle>Auto-orientation, in motion</EdsSectionTitle>
      <EdsLead>
        A single part going in, five ranked orientations coming out, each with its trade-offs visible
        before a choice gets made.
      </EdsLead>
      <div className="w-full overflow-hidden rounded-xl" style={{ border: `1px solid ${SEPARATOR}` }}>
        <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
          <iframe
            src={FIGMA_PROTOTYPE_SRC}
            title="Carbon Auto-Orientation: interactive prototype"
            loading="lazy"
            allow="fullscreen"
            allowFullScreen
            className="absolute inset-0 block size-full border-0"
          />
        </div>
      </div>
      <Link href={videoAutoOrientation} target="_blank" UNSAFE_className="text-[14px]">
        Watch a recording of the interactions ↗
      </Link>
    </EdsSection>
  );
}

// ── 6 · User testing ──────────────────────────────────────────────

const FINDINGS = [
  "The comparison table helped users understand the top three options.",
  "The per-option position preview was a valuable aid for judging fit.",
  "Most tellingly, the options validated users’ own decisions about how to arrange their parts.",
];

export function CarbonUserTestingSection() {
  return (
    <EdsSection id="user-testing" variant="mid">
      <EdsEyebrow>User testing</EdsEyebrow>
      <EdsSectionTitle>What testing told us</EdsSectionTitle>
      <EdsLead>
        Prototype testing with a small pool of users, including low-volume production users, confirmed
        the switch was a real improvement, not just a faster one.
      </EdsLead>
      <ul className="m-0 p-0 list-none flex flex-col w-full">
        {FINDINGS.map((finding) => (
          <li
            key={finding}
            className="flex gap-3 py-3 border-b items-start"
            style={{ borderColor: SEPARATOR }}
          >
            <span
              className="shrink-0 font-bold text-[13px] pt-0.5"
              style={{ color: "var(--ld-semantic-color-text-positive, #2a8703)" }}
              aria-hidden="true"
            >
              &#10003;
            </span>
            <Body as="p" size="small" UNSAFE_className="m-0 leading-[1.6]">
              {finding}
            </Body>
          </li>
        ))}
      </ul>
      <Body as="p" size="small" color="subtlest" UNSAFE_className="italic max-w-[660px] m-0">
        Prototype content shown to participants was representative dummy data and contained no
        intellectual property.
      </Body>
    </EdsSection>
  );
}

// ── 7 · Before & after ────────────────────────────────────────────

export function CarbonBeforeAfterSection() {
  return (
    <EdsSection id="before-after">
      <EdsEyebrow>Before &amp; after</EdsEyebrow>
      <EdsSectionTitle>What changed for each kind of user</EdsSectionTitle>
      <EdsLead>
        The redesign didn&rsquo;t solve one group&rsquo;s problem. It resolved a constraint both audiences
        had been working around.
      </EdsLead>
      <EdsBeforeAfter
        before={[
          {
            who: "New users",
            title: "No feedback on quality",
            description:
              "Faced a panel of controls with no feedback on quality, and no sense of what a good orientation even looked like.",
          },
          {
            who: "Expert users",
            title: "Every choice manual",
            description: "Had power, but every choice was manual. Speed came only from repetition and memory.",
          },
          {
            who: "Product & performance",
            title: "Fragmented, stalled adoption",
            description:
              "Fragmented across dentures, splints, and connectors; adoption stalled in the growth segments.",
          },
        ]}
        after={[
          {
            who: "New users",
            title: "Choose with confidence",
            description:
              "Up to five strong orientations, each explained in outcomes they understand, for a choice made with confidence.",
          },
          {
            who: "Expert users",
            title: "Fast start, full control",
            description:
              "A fast automated result to start from, still adjustable by hand, with visibility into how each choice ranks.",
          },
          {
            who: "Product & performance",
            title: "One consolidated tool",
            description:
              "One consolidated tool with a sub-10s target and smoother API calls across part types.",
          },
        ]}
      />
    </EdsSection>
  );
}

// ── 8 · Reflection (incl. what's next) ───────────────────────────

export function CarbonReflectionSection() {
  return (
    <EdsSection id="reflection" variant="dark">
      <CarbonEyebrowOnDark>Reflection</CarbonEyebrowOnDark>
      <EdsSectionTitle onDark>What the results point to</EdsSectionTitle>
      <CarbonNote lead="The clearest win wasn't speed. It was confidence:" onDark>
        users trusted their own choice more once the tool showed the trade-offs. That points to three
        next steps: tracking how often printed parts actually use the recommended orientation in
        production, confirming the automation reduces real effort, not just perceived effort, in live
        workflows, and instrumenting the manual-adjust-after-auto-orient path more closely, since that
        path is the clearest signal of whether the automation earned trust, and the one a small test pool
        couldn&rsquo;t fully answer yet.
      </CarbonNote>
    </EdsSection>
  );
}
