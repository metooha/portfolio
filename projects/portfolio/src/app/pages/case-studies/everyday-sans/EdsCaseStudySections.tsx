import videoWeightScale from "@/app/assets/pages/case-study/everyday-sans/weight-scale.mp4";
import imgTypeRamp from "@/app/assets/pages/case-study/everyday-sans/type-ramp-mapping.jpg";
import imgTrackingFixes from "@/app/assets/pages/case-study/everyday-sans/tracking-fixes.jpg";
import imgSuperscript from "@/app/assets/pages/case-study/everyday-sans/superscript-subscript-fixes.jpg";
import imgBaseline from "@/app/assets/pages/case-study/everyday-sans/baseline-alignment.jpg";
import imgUiTheming from "@/app/assets/pages/case-study/everyday-sans/ui-theming-comparison.jpg";
import imgAccessibilityAudit from "@/app/assets/pages/case-study/everyday-sans/accessibility-audit.jpg";
import imgEdsUiVersions from "@/app/assets/pages/case-study/everyday-sans/eds-ui-versions.jpg";
import imgEdsMono from "@/app/assets/pages/case-study/everyday-sans/eds-mono-comparison.jpg";
import imgThemingComparison from "@/app/assets/pages/case-study/everyday-sans/theming-comparison.jpg";
import imgEyeStrain from "@/app/assets/pages/case-study/everyday-sans/accessibility-eye-strain.jpg";
import imgCharacterMisreads from "@/app/assets/pages/case-study/everyday-sans/accessibility-character-misreads.jpg";
import imgLanguageCoverage from "@/app/assets/pages/case-study/everyday-sans/language-coverage.jpg";
import imgLanguageFrench from "@/app/assets/pages/case-study/everyday-sans/language-french.jpg";
import imgLanguageSpanish from "@/app/assets/pages/case-study/everyday-sans/language-spanish.jpg";
import { Link } from "@/app/components/Link";
import {
  EdsBeforeAfter,
  EdsEmbedFull,
  EdsEyebrow,
  EdsImageFull,
  EdsVideoFull,
  EdsImageGrid2,
  EdsJourneyTimeline,
  EdsLead,
  EdsNextGrid,
  EdsProblemGrid,
  EdsQuoteBlock,
  EdsResearchCard,
  EdsSection,
  EdsSectionTitle,
  EdsStatCards,
  EdsStatsRow,
  EdsWeightScale,
  type EdsJourneyItem,
} from "./EdsCaseStudyPrimitives";
import { Body, Heading } from "@/app/components/Text/Text";

const JOURNEY_ITEMS: EdsJourneyItem[] = [
  {
    date: "Jun 2024",
    phase: "High hopes. Early friction.",
    who: [
      { label: "Brand", variant: "brand" },
      { label: "Foundry", variant: "foundry" },
      { label: "A11y", variant: "a11y" },
    ],
    mood: "friction",
    story: "First Bold draft: too heavy, too tight, letters too similar. A11y flagged failures immediately.",
    tension: "Foundry and A11y disagreed on what \"readable\" means at every weight and size.",
  },
  {
    date: "Late 2024",
    phase: "Engineering hits a wall.",
    who: [
      { label: "Engineering", variant: "engineering" },
      { label: "iOS", variant: "engineering" },
      { label: "Android", variant: "engineering" },
    ],
    mood: "blocker",
    story: "Adding Medium broke the release — too heavy for web vitals. iOS doesn't support variable fonts. Draft at 70kb — 2× the limit.",
    tension: "Three platforms, three blockers. The file meant to remove the trade-off couldn't run on half our devices.",
  },
  {
    date: "Late 2024",
    phase: "Platform audits surface blockers.",
    who: [
      { label: "Android", variant: "engineering" },
      { label: "iOS", variant: "engineering" },
      { label: "Web", variant: "engineering" },
    ],
    mood: "blocker",
    story: "Three audits, three failure modes. Android line-heights wrong. iOS font defaults diverged from LD specs. Web had five inconsistent file variants. Baseline off everywhere.",
    tension: "A fix for Android could break iOS — all three needed a coordinated spec.",
  },
  {
    date: "Nov 2024",
    phase: "Pre-launch research.",
    who: [
      { label: "Research", variant: "a11y" },
      { label: "A11y", variant: "a11y" },
    ],
    mood: "friction",
    story: "8 users with disabilities tested the prototype. O/0 and I/l misread, dollar sign confused with \"S\". Rated 3.25/5. Findings sent to foundry as prioritized change list.",
    tension: "\"I can't tell the difference... Zeros or O's?\" — James",
  },
  {
    date: "Jan 2025",
    phase: "Post-launch validation.",
    who: [
      { label: "Research", variant: "a11y" },
      { label: "Engineering", variant: "engineering" },
    ],
    mood: "progress",
    story: "8 users on live walmart.com. No tasks blocked. AUS scores ~70. Rating improved to 3.3/5.",
    win: "\"I like how the price is bold.\" — Sheetal, Magnification User",
  },
  {
    date: "Jan 2025",
    phase: "First real alignment.",
    who: [
      { label: "Brand", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
      { label: "Foundry", variant: "foundry" },
    ],
    mood: "progress",
    story: "Shared character set agreed: 541 glyphs reduced to 179. First time all three sides agreed on the same thing.",
    win: "Brand, Engineering, and Foundry aligned on a shared glyph set for the first time.",
  },
  {
    date: "Jul 2025",
    phase: "The great scale debate.",
    who: [
      { label: "Brand", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
      { label: "Foundry", variant: "foundry" },
    ],
    mood: "friction",
    story: "Scale up ~8.5% or down ~8%? Two weeks of back-and-forth before the team chose to scale up.",
    tension: "Brand needed Bogle parity. Engineering didn't want layout rework.",
    win: "Scaling up — short-term rework for long-term consistency.",
  },
  {
    date: "Sep–Oct 2025",
    phase: "Two steps forward, one step back.",
    who: [
      { label: "Engineering", variant: "engineering" },
      { label: "A11y", variant: "a11y" },
      { label: "Design", variant: "brand" },
    ],
    mood: "friction",
    story: "Real-page testing kept surfacing issues: number 4 crossbar, off-center button text, Mono inconsistency. Each fix revealed another edge case.",
    tension: "Keep iterating or ship and fix post-launch?",
  },
  {
    date: "Dec 2025",
    phase: "All parties sign off.",
    who: [
      { label: "Brand", variant: "brand" },
      { label: "Engineering", variant: "engineering" },
      { label: "A11y", variant: "a11y" },
      { label: "Foundry", variant: "foundry" },
    ],
    mood: "win",
    story: "Final file delivered. Variable font plus five static weights. Every platform confirmed. 18 months. Six versions. Done.",
    win: "Brand, Engineering, A11y, and Commercial Type all signed off on the same final file.",
  },
];

export function EdsProblemSpaceSection() {
  return (
    <EdsSection id="tension">
      <EdsEyebrow>Problem Space</EdsEyebrow>
      <EdsSectionTitle>The compromise we stopped making</EdsSectionTitle>
      <EdsLead>
        One file per weight. Every new weight cost a performance hit. Brand and Engineering were locked in a trade-off that blocked both sides.
      </EdsLead>
      <EdsProblemGrid
        cards={[
          {
            who: "Brand",
            whoColor: "#7b4f00",
            title: "Needed weight variety",
            description:
              "Regular and Bold only. Every new weight had a performance cost — Medium, Semibold, Black all held back.",
          },
          {
            who: "Engineering",
            whoColor: "#1d5f02",
            title: "Couldn't absorb the cost",
            description:
              "Adding Medium hit the web vitals threshold and was pulled mid-release. Each font file meant another HTTP request on every page load.",
          },
        ]}
      />
    </EdsSection>
  );
}

export function EdsWeightScaleSection() {
  return (
    <EdsSection id="weight-scale" variant="mid">
      <EdsEyebrow>The Font</EdsEyebrow>
      <EdsSectionTitle>Everyday Sans — weight scale</EdsSectionTitle>
      <EdsLead>Three new weights unlocked at zero additional performance cost.</EdsLead>
      <EdsVideoFull src={videoWeightScale} alt="Everyday Sans weight scale — Light to Black" surface="subtle" />
      <EdsWeightScale />
    </EdsSection>
  );
}

export function EdsTypeRampSection() {
  return (
    <EdsSection id="type-ramp">
      <EdsEyebrow>Type System</EdsEyebrow>
      <EdsSectionTitle>Mapping EDS to the LD type ramp</EdsSectionTitle>
      <EdsLead>
        The font needed to match Bogle&apos;s visual size and line height at every scale to avoid layout reflow on swap.
      </EdsLead>
      <EdsImageFull
        src={imgTypeRamp}
        alt="Type ramp mapping"
        caption="Every size mapped to match Bogle defaults — size, line height, and tracking aligned so teams could swap fonts without adjusting layouts."
      />
    </EdsSection>
  );
}

export function EdsTechnicalFixesSection() {
  return (
    <EdsSection id="technical-fixes" variant="mid">
      <EdsEyebrow>Technical Fixes</EdsEyebrow>
      <EdsSectionTitle>What the audit uncovered</EdsSectionTitle>
      <EdsLead>
        Platform audits across Android, iOS, and Web surfaced specific engineering blockers. Each required a fix in the font file itself.
      </EdsLead>
      <div className="flex flex-col gap-6">
        <EdsImageFull
          src={imgTrackingFixes}
          alt="Tracking fixes"
          caption="Tracking & word spacing — updated to match Bogle, preventing words from bleeding into each other."
          surface="subtle"
        />
        <EdsImageFull
          src={imgSuperscript}
          alt="Superscript fixes"
          caption="Superscript / subscript — position aligned to Bogle for correct rendering in price and specification contexts."
          surface="subtle"
        />
        <EdsImageFull
          src={imgBaseline}
          alt="Baseline fix"
          caption="Baseline alignment — text was sitting too high in icon/label components. Corrected across all platforms."
          surface="subtle"
        />
        <EdsImageFull
          src={imgUiTheming}
          alt="UI theming comparison"
          caption="Theming comparison — Everyday Sans UI vs Bogle and Gibson across Walmart and Sam's Club surfaces."
          surface="subtle"
        />
        <EdsImageFull
          src={imgAccessibilityAudit}
          alt="Accessibility issues"
          caption="Accessibility audit: I, l, 1, 0, and O confusion in Mono — specific letterform changes requested."
          surface="subtle"
        />
      </div>
    </EdsSection>
  );
}

export function EdsRealPageTestingSection() {
  return (
    <EdsSection id="real-page-testing">
      <EdsEyebrow>Real-Page Testing</EdsEyebrow>
      <EdsSectionTitle>Tested on live Walmart surfaces</EdsSectionTitle>
      <EdsLead>Each version tested against real pages across multiple product categories before sign-off.</EdsLead>
      <EdsImageFull
        src={imgEdsUiVersions}
        alt="EDS UI versions"
        label="Everyday Sans UI — Version comparison"
        caption="5 versions across Grocery, Fashion, and other categories — tracking visual consistency at every stage."
        surface="subtle"
      />
      <EdsImageGrid2
        stacked
        items={[
          {
            src: imgEdsMono,
            alt: "EDS Mono comparison",
            label: "EDS Mono — Current vs Updated",
            caption: "Mono tested on consumables — spacing and character clarity validated.",
            surface: "subtle",
          },
          {
            src: imgThemingComparison,
            alt: "Theming comparison",
            label: "Theming comparison",
            caption: "New EDS UI vs legacy Bodega and Sam's Club Gibson — line height and visual weight aligned.",
            surface: "subtle",
          },
        ]}
      />
    </EdsSection>
  );
}

export function EdsAccessibilityResearchSection() {
  return (
    <EdsSection id="user-testing" variant="mid">
      <EdsEyebrow>Accessibility Research</EdsEyebrow>
      <EdsSectionTitle>Tested with people who depend on it</EdsSectionTitle>
      <EdsLead>Two studies with 8 users each — one pre-launch, one on live walmart.com.</EdsLead>
      <EdsImageGrid2
        stacked
        items={[
          {
            src: imgEyeStrain,
            alt: "Eye strain takeaway",
            surface: "subtle",
          },
          {
            src: imgCharacterMisreads,
            alt: "Character misreads takeaway",
            surface: "subtle",
          },
        ]}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <EdsResearchCard
          variant="pre"
          eyebrow="Study 1 · Pre-launch · November 2024"
          title="Prototype Review"
          subtitle="8 users · Bogle vs. Everyday Sans vs. SF Pro Display"
          rating="3.25"
          ratingNote="Readability rating"
          findings={[
            { type: "negative", text: "Tight spacing caused stacking for magnification users" },
            { type: "negative", text: "O/0 and I/l consistently misread" },
            { type: "negative", text: "Dollar sign strikethrough too short" },
            { type: "positive", text: "Line spacing helped scan long-form text" },
            { type: "positive", text: "Lowercase \"L\" serif clearly distinguished from \"I\"" },
            { type: "positive", text: "Bold/regular contrast stronger than Bogle" },
          ]}
        />
        <EdsResearchCard
          variant="post"
          eyebrow="Study 2 · Post-launch · January 2025"
          title="Live Site Study"
          subtitle="8 users · Live walmart.com · Mobile & desktop"
          rating="3.3"
          ratingNote="Up from 3.25 · AUS ~70 · No blockers"
          findings={[
            { type: "positive", text: "No tasks blocked on any device" },
            { type: "positive", text: "Bold text and headings easy to read" },
            { type: "positive", text: "Lowercase \"L\" flourish noticed and appreciated" },
            { type: "negative", text: "S/5 and t/f confusion persisted in real UI" },
            { type: "negative", text: "Dollar and cent symbols still too thin" },
            { type: "negative", text: "Superscript disrupted line height in 3rd-party content" },
          ]}
        />
      </div>
    </EdsSection>
  );
}

export function EdsLanguageSection() {
  return (
    <EdsSection id="language">
      <EdsEyebrow>Language Considerations</EdsEyebrow>
      <EdsSectionTitle>English, Spanish, French — and beyond</EdsSectionTitle>
      <EdsLead>
        The variable font ships with full coverage for three languages. French had 8 missing glyphs identified in the audit — addressed in the final deliverable.
      </EdsLead>
      <EdsImageFull
        src={imgLanguageCoverage}
        alt="Language coverage"
        caption="English and Spanish complete. French had 8 missing characters including guillemets, AE and OE ligatures — all added to the final spec."
        surface="subtle"
      />
      <EdsImageGrid2
        stacked
        items={[
          {
            src: imgLanguageFrench,
            alt: "French Canadian screens",
            caption: "French Canadian — validated across add to cart, product detail, and checkout.",
            surface: "subtle",
          },
          {
            src: imgLanguageSpanish,
            alt: "Spanish screens",
            surface: "subtle",
          },
        ]}
      />
    </EdsSection>
  );
}

export function EdsJourneySection() {
  return (
    <EdsSection id="journey" variant="mid">
      <EdsEyebrow>The Journey</EdsEyebrow>
      <EdsSectionTitle>It wasn&apos;t a straight line.</EdsSectionTitle>
      <EdsLead>18 months. Six versions. Three organizations learning to want the same thing.</EdsLead>
      <EdsJourneyTimeline items={JOURNEY_ITEMS} />
    </EdsSection>
  );
}

export function EdsOutcomeSection() {
  return (
    <EdsSection id="outcome" variant="dark">
      <EdsEyebrow onDark>The Outcome</EdsEyebrow>
      <EdsSectionTitle onDark>The trade-off, removed.</EdsSectionTitle>
      <EdsStatsRow
        stats={[
          { value: "5→1", label: "Static files replaced by one variable font" },
          { value: "57%", label: "Smaller file size (70kb → 28kb)" },
          { value: "3", label: "New weights unlocked at zero performance cost" },
          { value: "0", label: "Trade-offs between brand and performance remaining", valueColor: "#68d391" },
        ]}
      />
      <EdsBeforeAfter
        before={[
          { who: "Design", title: "Regular and Bold only.", description: "Every new weight carried a performance cost." },
          { who: "Engineering", title: "Each weight cost a file and a request.", description: "All three platforms needed manual spacing overrides." },
          { who: "Accessibility", title: "Multiple active failures.", description: "Characters stacked, letterforms confused magnification users. Rated 3.25/5." },
        ]}
        after={[
          { who: "Design", title: "Full weight scale available.", description: "Medium, Semibold, and Black are design decisions now." },
          { who: "Engineering", title: "One file. No manual overrides.", description: "Size, spacing, and line-height baked in — consistent across all platforms." },
          { who: "Accessibility", title: "Validated improvements.", description: "Spacing, O/zero, baseline, symbols all corrected. Rating improved to 3.3/5." },
        ]}
      />
    </EdsSection>
  );
}

export function EdsQuoteSection() {
  return (
    <EdsQuoteBlock
      quote="Feels like a font for reading a book. Easier to read, nicer on the eyes. The numbers stand out and don't blend with the text."
      attribution="Participant — quadriplegic user, on-screen keyboard · Everyday Sans 5/5 · Bogle 4.5/5"
    />
  );
}

export function EdsWhatsNextSection() {
  return (
    <EdsSection id="whats-next">
      <EdsEyebrow>What&apos;s Next</EdsEyebrow>
      <EdsSectionTitle>The font is ready. The design system needs to catch up.</EdsSectionTitle>
      <EdsNextGrid
        items={[
          { when: "FY27 Q3", title: "Web platforms", description: "Variable font implementation on Web platforms — file size within target, fast rollout." },
          { when: "FY27 Q2", title: "New weights in tokens", description: "Medium and Semibold added to design tokens." },
          { when: "FY27 Q2", title: "Dynamic text on mobile", description: "App text scales with system font size preferences." },
          { when: "Future", title: "More languages", description: "English, Spanish, French built in. Simplified Chinese being explored.", future: true },
        ]}
      />
    </EdsSection>
  );
}

export function EdsSamsSansSection() {
  return (
    <EdsSection id="sams-sans" variant="mid">
      <EdsEyebrow>Extended Impact</EdsEyebrow>
      <EdsSectionTitle>Sam&apos;s Sans — the same method, a new brand</EdsSectionTitle>
      <EdsLead>
        The variable font approach didn&apos;t stay at Walmart. In 2026, Sam&apos;s Club used the same infrastructure to ship Sam&apos;s Sans as a variable font as part of their full rebrand — proving the process was repeatable.
      </EdsLead>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="rounded-[10px] p-7"
          style={{
            background: "var(--ld-semantic-color-fill, #ffffff)",
            border: "1px solid var(--ld-semantic-color-separator, #e3e4e5)",
          }}
        >
          <Body as="p" size="small" weight="alt" color="brand" UNSAFE_className="uppercase tracking-[0.1em] mb-3" UNSAFE_style={{ fontSize: "10px" }}>
            Walmart · FY25–26
          </Body>
          <Body as="p" size="medium" weight="alt" UNSAFE_className="mb-2" UNSAFE_style={{ color: "var(--ld-semantic-color-fill-brand-bold, #001e60)" }}>
            Everyday Sans UI
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.65] mb-4 pb-4">
            18 months. First-ever variable font implementation for the Walmart platform. Established the process, the audit framework, and the cross-platform spec.
          </Body>
          <div className="flex flex-wrap gap-3">
            {["Web", "iOS", "Android", "React Native"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                style={{
                  background: "var(--ld-primitive-color-blue-5, #f0f5ff)",
                  color: "var(--ld-semantic-color-text-brand, #0053e2)",
                  borderColor: "var(--ld-semantic-color-separator, #e3e4e5)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div
          className="rounded-[10px] p-7"
          style={{
            background: "var(--ld-semantic-color-fill-brand-bold, #001e60)",
            border: "1px solid var(--ld-semantic-color-fill-brand-bold, #001e60)",
          }}
        >
          <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em] mb-3" UNSAFE_style={{ fontSize: "10px", color: "var(--ld-primitive-color-spark-100, #ffc220)" }}>
            Sam&apos;s Club · 2026 Rebrand
          </Body>
          <Body as="p" size="medium" weight="alt" color="inverse" UNSAFE_className="mb-2">
            Sam&apos;s Sans
          </Body>
          <Body as="p" size="small" UNSAFE_className="leading-[1.65] mb-4 pb-4" UNSAFE_style={{ color: "rgba(255,255,255,0.65)" }}>
            The same variable font infrastructure, applied to an entirely new brand system. Same audit process, same cross-platform spec, same approach — shipping as part of a full rebrand in a fraction of the time.
          </Body>
          <div className="flex flex-wrap gap-3">
            {["Variable Font", "Full Rebrand", "2026"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                  borderColor: "rgba(255,255,255,0.2)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </EdsSection>
  );
}

export function EdsFontCompareSection() {
  return (
    <EdsSection id="font-compare">
      <EdsEyebrow>Process Innovation</EdsEyebrow>
      <EdsSectionTitle>The Font Compare Tool — under 2 months instead of a year</EdsSectionTitle>
      <EdsLead>
        The Walmart variable font took 18 months. For Sam&apos;s Sans, I built an internal Font Compare Tool that let teams evaluate fonts side by side — glyphs, paragraphs, real UI mocks, and metadata — in one place. It compressed the decision-making process from a year to under two months.
      </EdsLead>
      <EdsEmbedFull
        src="https://metooha.github.io/font-compare/"
        title="Font Compare Tool — side-by-side font evaluation"
        caption="The Font Compare Tool: up to 5 fonts compared simultaneously across paragraphs, glyphs, PDP mocks, and full metadata including glyph coverage, CSS @font-face, and design tokens. Built to make the process repeatable without the year-long back-and-forth."
        surface="subtle"
        aspectRatio="4 / 3"
      />
      <Link
        href="https://metooha.github.io/font-compare/"
        target="_blank"
        UNSAFE_style={{
          color: "var(--ld-semantic-color-text-brand, #0053e2)",
          fontSize: "var(--ld-semantic-font-body-large-size, 1.125rem)",
          fontWeight: 700,
        }}
        UNSAFE_className="no-underline hover:underline"
      >
        Open the Font Compare Tool in a new tab →
      </Link>
      <EdsStatCards
        stats={[
          { value: "< 2mo", label: "Sam's Sans evaluation and sign-off vs. 18 months for Walmart" },
          { value: "5", label: "Fonts compared simultaneously across glyphs, paragraphs, UI mocks, and metadata" },
          { value: "46", label: "Font variants available in the tool, with glyph coverage, CSS, and design token output" },
        ]}
      />
    </EdsSection>
  );
}

export function EdsClosingSection() {
  return (
    <div
      className="relative w-full shrink-0 text-center overflow-hidden py-[160px] px-6 md:px-12"
      style={{ background: "var(--ld-semantic-color-fill-brand, #0053e2)" }}
    >
      <Heading
        as="h2"
        size="large"
        weight="alt"
        color="inverse"
        UNSAFE_className="font-light w-fit mx-auto flex flex-col items-center gap-[16px]"
        UNSAFE_style={{ fontSize: "clamp(26px, 4vw, 52px)", lineHeight: 1 }}
      >
        <span className="whitespace-nowrap">Brand quality and site performance</span>
        <span className="whitespace-nowrap">
          are no longer{" "}
          <span style={{ fontWeight: 700, color: "var(--ld-primitive-color-spark-100, #ffc220)" }}>
            a trade-off.
          </span>
        </span>
      </Heading>
    </div>
  );
}
