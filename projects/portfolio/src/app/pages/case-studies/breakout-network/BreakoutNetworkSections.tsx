import React from "react";
import { Body } from "@/app/components/Text/Text";
import {
  Eyebrow,
  ImageCarousel,
  ImageFull,
  ImageGrid2,
  Lead,
  Section,
  SectionTitle,
} from "@/app/components/CaseStudyPrimitives";
import {
  BreakoutApproachDiagram,
  BreakoutAppCompare,
  BreakoutLogoCompare,
  BreakoutStatement,
  BreakoutStrategySteps,
} from "./BreakoutNetworkBlocks";

// Root assets
import imgLogoOld from "@/app/assets/pages/case-study/breakout-network/BNW-Logo-old.png";
import imgLogoNew from "@/app/assets/pages/case-study/breakout-network/BNW-logo-new.png";
import imgLogoMin from "@/app/assets/pages/case-study/breakout-network/BNW-logo-min.jpg";
import imgLogoVariations from "@/app/assets/pages/case-study/breakout-network/BNW-logo-variations.jpg";
import imgMarkLight from "@/app/assets/pages/case-study/breakout-network/new-mark-light.png";
import imgOldMockup from "@/app/assets/pages/case-study/breakout-network/old-mockup.png";
import imgNewMockDark from "@/app/assets/pages/case-study/breakout-network/new-mock-dark.png";
import imgSitePage from "@/app/assets/pages/case-study/breakout-network/site-page.png";

// brand-carousel/
import imgBrand3 from "@/app/assets/pages/case-study/breakout-network/brand-carousel/Breakout Athletic Network Brand Guidelines-3.jpg";
import imgBrand4 from "@/app/assets/pages/case-study/breakout-network/brand-carousel/Breakout Athletic Network Brand Guidelines-4.jpg";
import imgBrand5 from "@/app/assets/pages/case-study/breakout-network/brand-carousel/Breakout Athletic Network Brand Guidelines-5.jpg";
import imgBrand6 from "@/app/assets/pages/case-study/breakout-network/brand-carousel/Breakout Athletic Network Brand Guidelines-6.jpg";
import imgBrand7 from "@/app/assets/pages/case-study/breakout-network/brand-carousel/Breakout Athletic Network Brand Guidelines-7.jpg";
import imgBrand8 from "@/app/assets/pages/case-study/breakout-network/brand-carousel/Breakout Athletic Network Brand Guidelines-8.jpg";
import imgBrand9 from "@/app/assets/pages/case-study/breakout-network/brand-carousel/Breakout Athletic Network Brand Guidelines-9.jpg";
import imgBrand47 from "@/app/assets/pages/case-study/breakout-network/brand-carousel/Breakout Athletic Network Brand Guidelines-47.jpg";

// brand guidelines/
import imgGuide26 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-26.jpg";
import imgGuide27 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-27.jpg";
import imgGuide32 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-32.jpg";
import imgGuide34 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-34.jpg";
import imgGuide35 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-35.jpg";
import imgGuide37 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-37.jpg";
import imgGuide38 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-38.jpg";
import imgGuide39 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-39.jpg";
import imgGuide40 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-40.jpg";
import imgGuide41 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-41.jpg";
import imgGuide42 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-42.jpg";
import imgGuide43 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-43.jpg";
import imgGuide44 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-44.jpg";
import imgGuide45 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-45.jpg";
import imgGuide48 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-48.jpg";
import imgGuide49 from "@/app/assets/pages/case-study/breakout-network/brand guidelines/Breakout Athletic Network Brand Guidelines-49.jpg";

// marketing-examples/
import imgMkt57 from "@/app/assets/pages/case-study/breakout-network/marketing-examples/Breakout Athletic Network Brand Guidelines-57.jpg";
import imgMkt58 from "@/app/assets/pages/case-study/breakout-network/marketing-examples/Breakout Athletic Network Brand Guidelines-58.jpg";
import imgMkt59 from "@/app/assets/pages/case-study/breakout-network/marketing-examples/Breakout Athletic Network Brand Guidelines-59.jpg";
import imgMkt60 from "@/app/assets/pages/case-study/breakout-network/marketing-examples/Breakout Athletic Network Brand Guidelines-60.jpg";
import imgMkt62 from "@/app/assets/pages/case-study/breakout-network/marketing-examples/Breakout Athletic Network Brand Guidelines-62.jpg";
import imgMkt63 from "@/app/assets/pages/case-study/breakout-network/marketing-examples/Breakout Athletic Network Brand Guidelines-63.jpg";
import imgMktEnvelope from "@/app/assets/pages/case-study/breakout-network/marketing-examples/envelope.jpg";

const ACCENT = "#D0201C";

const BRAND_CAROUSEL_IMAGES = [
  { src: imgBrand3, alt: "Breakout Athletic Network brand photography" },
  { src: imgBrand4, alt: "Breakout Athletic Network brand photography" },
  { src: imgBrand5, alt: "Breakout Athletic Network brand photography" },
  { src: imgBrand6, alt: "Breakout Athletic Network brand photography" },
  { src: imgBrand7, alt: "Breakout Athletic Network brand photography" },
  { src: imgBrand8, alt: "Breakout Athletic Network brand photography" },
  { src: imgBrand9, alt: "Breakout Athletic Network brand photography" },
  { src: imgBrand47, alt: "Breakout Athletic Network brand photography" },
];

const GUIDELINES_CAROUSEL_IMAGES = [
  { src: imgGuide26, alt: "Brand guidelines page" },
  { src: imgGuide27, alt: "Brand guidelines page" },
  { src: imgGuide32, alt: "Brand guidelines page" },
  { src: imgGuide34, alt: "Brand guidelines page" },
  { src: imgGuide35, alt: "Brand guidelines page" },
  { src: imgGuide37, alt: "Brand guidelines page" },
  { src: imgGuide38, alt: "Brand guidelines page" },
  { src: imgGuide39, alt: "Brand guidelines page" },
  { src: imgGuide40, alt: "Brand guidelines page" },
  { src: imgGuide41, alt: "Brand guidelines page" },
  { src: imgGuide42, alt: "Brand guidelines page" },
  { src: imgGuide43, alt: "Brand guidelines page" },
  { src: imgGuide44, alt: "Brand guidelines page" },
  { src: imgGuide45, alt: "Brand guidelines page" },
  { src: imgGuide48, alt: "Brand guidelines page" },
  { src: imgGuide49, alt: "Brand guidelines page" },
];

const MARKETING_CAROUSEL_IMAGES = [
  { src: imgMkt57, alt: "Breakout Athletic Network marketing example" },
  { src: imgMkt58, alt: "Breakout Athletic Network marketing example" },
  { src: imgMkt59, alt: "Breakout Athletic Network marketing example" },
  { src: imgMkt60, alt: "Breakout Athletic Network marketing example" },
  { src: imgMkt62, alt: "Breakout Athletic Network marketing example" },
  { src: imgMkt63, alt: "Breakout Athletic Network marketing example" },
  { src: imgMktEnvelope, alt: "Breakout Athletic Network branded envelope" },
];

export function BreakoutChallengeSection() {
  return (
    <Section id="challenge">
      <Eyebrow color={ACCENT}>The Challenge</Eyebrow>
      <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[720px] leading-[1.7]">
        The Breakout Network mobile application lacked a cohesive brand identity, making it difficult for
        product designers to build with confidence. Seeking a clear &ldquo;North Star,&rdquo; the company had
        struggled to find a marketing agency that understood its startup culture and lifestyle branding.
      </Body>
      <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[720px] leading-[1.7]">
        The opportunity grew out of prior experience in athletic branding — a natural fit for translating brand
        strategy into a system product teams could use directly.
      </Body>
      <BreakoutStatement
        parts={[
          { text: "Breakout Athletic Network " },
          { text: "simplifies", highlight: true },
          { text: " the sports digital world for " },
          { text: "athletes", highlight: true },
          { text: ", " },
          { text: "coaches", highlight: true },
          { text: ", and " },
          { text: "supporters", highlight: true },
          { text: "." },
        ]}
      />
    </Section>
  );
}

export function BreakoutApproachSection() {
  return (
    <Section id="approach" background="#000000">
      <Eyebrow onDark color={ACCENT}>The Approach</Eyebrow>
      <SectionTitle onDark>From brand strategy to product-ready guidelines</SectionTitle>
      <BreakoutApproachDiagram
        primaryRow={["Understand the Problem", "Audit Existing Product Designs", "Asset Designs", "UI Designs", "Documentation"]}
        secondaryRow={["Determine the Pitfalls", "Ensure Brand Flexibility", "Write Content"]}
      />
    </Section>
  );
}

export function BreakoutStrategySection() {
  return (
    <Section id="strategy">
      <Eyebrow color={ACCENT}>Defining the strategy</Eyebrow>
      <BreakoutStrategySteps
        steps={[
          { title: "Initial Assessment", description: "Audit product designs for gaps. Gather info from stakeholders, engineers, and designers." },
          { title: "Platform: Voice and Tone", description: "To grasp and embody the brand's presence, define its purpose, attributes, voice, and messaging." },
          { title: "Visual Identity", description: "Visual identity starts with logo and wordmark, complemented by styling and imagery usage." },
          { title: "The brand in Use", description: "When the visual identity is defined, it's implemented and observed in tangible product assets." },
          { title: "Brand Guidelines", description: "Comprehensive brand guidelines balance flexibility with clear guidance." },
          { title: "Leverage Templates", description: "Templated files and consistent guideline alignment keep production streamlined and the brand cohesive." },
        ]}
      />
    </Section>
  );
}

export function BreakoutBrandSection() {
  return (
    <Section id="brand" background="#000000">
      <Eyebrow onDark color={ACCENT}>Brand</Eyebrow>
      <ImageCarousel images={BRAND_CAROUSEL_IMAGES} ariaLabel="Brand guideline pages, section 1: Brand" fit="contain" />
    </Section>
  );
}

export function BreakoutVisualIdentitySection() {
  return (
    <Section id="visual-identity">
      <Eyebrow color={ACCENT}>Visual Identity</Eyebrow>
      <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[720px] leading-[1.7]">
        The foundation of the brand lies in its logo. The previous logo&rsquo;s color scheme and typography read
        as overly feminine, lacking impact and failing to convey athleticism. The redesign leaned into powerful,
        solid color — red, evoking ambition and determination — and a thick, boxy font inspired by baseball
        typography, adding a sporty edge to the brand.
      </Body>
      <BreakoutLogoCompare
        before={{ src: imgLogoOld, alt: "Previous ARMR Sports Networking logo" }}
        after={{ src: imgLogoNew, alt: "New Breakout Athletic Network logo" }}
      />
      <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "11px" }}>
        The Characteristics
      </Body>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
          The geometric crown design gives Breakout Athletic Network a strong visual impression of &ldquo;kings&rdquo;
          or leaders.
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
          The red represents heat, which is the driving force behind hope.
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
          The Forza typeface&rsquo;s concise geometries create an expressive type family that exudes passion,
          discipline, sharpness, and command.
        </Body>
      </div>
      <ImageFull
        src={imgLogoVariations}
        alt="Logo lockup variations across light and dark backgrounds"
        caption="Logo lockup variations across light and dark backgrounds."
      />
      <ImageGrid2
        items={[
          { src: imgLogoMin, alt: "The new Breakout Athletic Network mark, detail view", caption: "The mark, up close." },
          { src: imgMarkLight, alt: "The new mark on a light background", caption: "The mark on a light background." },
        ]}
      />
    </Section>
  );
}

export function BreakoutGuidelinesSection() {
  return (
    <Section id="guidelines" background="#f0f0f0">
      <Eyebrow color={ACCENT}>Brand Guidelines</Eyebrow>
      <Lead>Below are some examples of pages within the brand guidelines.</Lead>
      <ImageCarousel images={GUIDELINES_CAROUSEL_IMAGES} ariaLabel="Brand guideline pages, section 2: Visual Identity" fit="contain" />
    </Section>
  );
}

export function BreakoutInUseSection() {
  return (
    <Section id="in-use">
      <Eyebrow color={ACCENT}>The Brand in Use</Eyebrow>
      <BreakoutAppCompare
        before={{
          src: imgOldMockup,
          alt: "The existing mobile app before the rebrand",
          heading: "With the existing mobile app",
          items: [
            "The imagery did not resonate with young athletes, the primary target audience of the app.",
            "There was excessive use of colors without clear value or usage rules, and the gradients felt outdated.",
            "The typography was challenging to read due to insufficient contrast.",
          ],
        }}
        after={{
          src: imgNewMockDark,
          alt: "The redesigned mobile app after the rebrand",
          heading: "With the redesigned mobile app",
          items: [
            "Color usage is strategic, effectively guiding users to take action.",
            "Increased text-background contrast reduces cognitive load and enhances information scanning.",
            "The typographical hierarchy is well-structured, with proper tagging of headings like h1 and others.",
          ],
        }}
      />
      <ImageFull
        src={imgSitePage}
        alt="A supporting web page built alongside the brand guidelines"
        caption="A supporting web page built alongside the guidelines."
      />
    </Section>
  );
}

export function BreakoutMarketingSection() {
  return (
    <Section id="marketing" background="#000000">
      <Eyebrow onDark color={ACCENT}>In Use</Eyebrow>
      <ImageCarousel images={MARKETING_CAROUSEL_IMAGES} ariaLabel="Brand guideline pages, section 3: In Use, Marketing" fit="contain" />
    </Section>
  );
}
