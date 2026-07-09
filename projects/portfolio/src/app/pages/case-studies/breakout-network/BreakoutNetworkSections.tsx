import React from "react";
import { Body } from "@/app/components/Text/Text";
import {
  Eyebrow,
  ImageCarousel,
  Lead,
  Section,
  SectionTitle,
} from "@/app/components/CaseStudyPrimitives";
import {
  BreakoutApproachDiagram,
  BreakoutAppCompare,
  BreakoutLaptopMockup,
  BreakoutLogoCompare,
  BreakoutStrategySteps,
} from "./BreakoutNetworkBlocks";

// Root assets
import imgLogoOld from "@/app/assets/pages/case-study/breakout-network/BNW-Logo-old.png";
import imgLogoNew from "@/app/assets/pages/case-study/breakout-network/BNW-logo-new.png";
import imgOldMockup from "@/app/assets/pages/case-study/breakout-network/old-mockup.png";
import imgNewMockDark from "@/app/assets/pages/case-study/breakout-network/new-mock-dark.png";
import imgSitePage from "@/app/assets/pages/case-study/breakout-network/site-page.png";

// guidelines/ — Brand section
import imgGCover from "@/app/assets/pages/case-study/breakout-network/guidelines/cover.jpg";
import imgGToc from "@/app/assets/pages/case-study/breakout-network/guidelines/table-of-contents.jpg";
import imgGPlatformTitle from "@/app/assets/pages/case-study/breakout-network/guidelines/platform-title.jpg";
import imgGPlatformIntro from "@/app/assets/pages/case-study/breakout-network/guidelines/platform-intro-purpose.jpg";
import imgGExtPurposeBreakout from "@/app/assets/pages/case-study/breakout-network/guidelines/external-purpose-breakout.jpg";
import imgGExtPurposeNetwork from "@/app/assets/pages/case-study/breakout-network/guidelines/external-purpose-network.jpg";
import imgGCompanyDescription from "@/app/assets/pages/case-study/breakout-network/guidelines/company-description.jpg";
import imgGWhoWeAre from "@/app/assets/pages/case-study/breakout-network/guidelines/who-we-are.jpg";
import imgGMessagingTitle from "@/app/assets/pages/case-study/breakout-network/guidelines/messaging-title.jpg";
import imgGBrandVoice from "@/app/assets/pages/case-study/breakout-network/guidelines/brand-voice.jpg";
import imgGBrandTone from "@/app/assets/pages/case-study/breakout-network/guidelines/brand-tone.jpg";
import imgGCharacterTraits from "@/app/assets/pages/case-study/breakout-network/guidelines/character-traits.jpg";
import imgGAttributes1 from "@/app/assets/pages/case-study/breakout-network/guidelines/brand-attributes-part-1.jpg";
import imgGAttributes2 from "@/app/assets/pages/case-study/breakout-network/guidelines/brand-attributes-part-2.jpg";
import imgGBrandDivider from "@/app/assets/pages/case-study/breakout-network/guidelines/brand-section-divider.jpg";

// guidelines/ — Visual identity guidelines section (logo, color, typography, photography)
import imgGLogoTitle from "@/app/assets/pages/case-study/breakout-network/guidelines/logo-title.jpg";
import imgGLogoOverview from "@/app/assets/pages/case-study/breakout-network/guidelines/logo-overview.jpg";
import imgGLogoAnatomy from "@/app/assets/pages/case-study/breakout-network/guidelines/logo-primary-anatomy.jpg";
import imgGLogoHorizontal from "@/app/assets/pages/case-study/breakout-network/guidelines/logo-horizontal-layout.jpg";
import imgGLogoDark from "@/app/assets/pages/case-study/breakout-network/guidelines/logo-dark-background-1.jpg";
import imgGLogoDonts from "@/app/assets/pages/case-study/breakout-network/guidelines/logo-donts.jpg";
import imgGColorTitle from "@/app/assets/pages/case-study/breakout-network/guidelines/color-title.jpg";
import imgGColorPrimary from "@/app/assets/pages/case-study/breakout-network/guidelines/color-primary-palette.jpg";
import imgGColorPrimaryRed from "@/app/assets/pages/case-study/breakout-network/guidelines/color-primary-red.jpg";
import imgGColorSecondaryBlue from "@/app/assets/pages/case-study/breakout-network/guidelines/color-secondary-blue.jpg";
import imgGColorTertiary from "@/app/assets/pages/case-study/breakout-network/guidelines/color-tertiary-semantic.jpg";
import imgGColorGrayscale from "@/app/assets/pages/case-study/breakout-network/guidelines/color-grayscale-palette.jpg";
import imgGColorSemanticUsage from "@/app/assets/pages/case-study/breakout-network/guidelines/color-semantic-usage.jpg";
import imgGColorTextGrayscale from "@/app/assets/pages/case-study/breakout-network/guidelines/color-text-grayscale.jpg";
import imgGColorTextRedBlue from "@/app/assets/pages/case-study/breakout-network/guidelines/color-text-red-blue.jpg";
import imgGColorTextTertiary from "@/app/assets/pages/case-study/breakout-network/guidelines/color-text-tertiary-semantic.jpg";
import imgGColorUsage from "@/app/assets/pages/case-study/breakout-network/guidelines/color-usage.jpg";
import imgGColorDonts from "@/app/assets/pages/case-study/breakout-network/guidelines/color-donts.jpg";
import imgGTypeTitle from "@/app/assets/pages/case-study/breakout-network/guidelines/typography-title.jpg";
import imgGTypePrimary from "@/app/assets/pages/case-study/breakout-network/guidelines/typography-primary-typeface.jpg";
import imgGTypeSecondary from "@/app/assets/pages/case-study/breakout-network/guidelines/typography-secondary-typeface.jpg";
import imgGTypeHeadlineScale from "@/app/assets/pages/case-study/breakout-network/guidelines/typography-headline-typescale.jpg";
import imgGTypeBodyScale from "@/app/assets/pages/case-study/breakout-network/guidelines/typography-body-typescale.jpg";
import imgGTypeSecondaryScale from "@/app/assets/pages/case-study/breakout-network/guidelines/typography-secondary-typescale.jpg";
import imgGTypeUsage from "@/app/assets/pages/case-study/breakout-network/guidelines/typography-usage.jpg";
import imgGTypeDonts from "@/app/assets/pages/case-study/breakout-network/guidelines/typography-donts.jpg";
import imgGPhotoTitle from "@/app/assets/pages/case-study/breakout-network/guidelines/photography-title.jpg";
import imgGPhotoStock from "@/app/assets/pages/case-study/breakout-network/guidelines/photography-stock-imagery.jpg";
import imgGPhotoDonts from "@/app/assets/pages/case-study/breakout-network/guidelines/photography-donts.jpg";
import imgGVisualDivider from "@/app/assets/pages/case-study/breakout-network/guidelines/visual-identity-divider.jpg";
import imgGVisualStatement from "@/app/assets/pages/case-study/breakout-network/guidelines/visual-identity-statement.jpg";

// guidelines/ — Marketing & brand-in-use collateral
import imgGMarketingTitle from "@/app/assets/pages/case-study/breakout-network/guidelines/marketing-title.jpg";
import imgGStationery from "@/app/assets/pages/case-study/breakout-network/guidelines/stationery-envelopes.jpg";
import imgGBusinessCards from "@/app/assets/pages/case-study/breakout-network/guidelines/business-cards.jpg";
import imgGTshirts from "@/app/assets/pages/case-study/breakout-network/guidelines/marketing-hardgoods-t-shirts.jpg";
import imgGPolos from "@/app/assets/pages/case-study/breakout-network/guidelines/marketing-hardgoods-polo-shirts.jpg";
import imgGBags from "@/app/assets/pages/case-study/breakout-network/guidelines/marketing-hardgoods-bags.jpg";
import imgGDuffle from "@/app/assets/pages/case-study/breakout-network/guidelines/marketing-hardgoods-duffle-bags.jpg";
import imgGAccessories from "@/app/assets/pages/case-study/breakout-network/guidelines/marketing-hardgoods-accessories.jpg";
import imgGPoster from "@/app/assets/pages/case-study/breakout-network/guidelines/marketing-poster-mockup.jpg";

const ACCENT = "#D0201C";

const BRAND_CAROUSEL_IMAGES = [
  { src: imgGCover, alt: "Brand guidelines cover" },
  { src: imgGToc, alt: "Table of contents" },
  { src: imgGPlatformTitle, alt: "Platform section title page" },
  { src: imgGPlatformIntro, alt: "Platform introduction and purpose" },
  { src: imgGExtPurposeBreakout, alt: "Breakout's external purpose statement" },
  { src: imgGExtPurposeNetwork, alt: "Network's external purpose statement" },
  { src: imgGCompanyDescription, alt: "Company description" },
  { src: imgGWhoWeAre, alt: "Who we are statement" },
  { src: imgGMessagingTitle, alt: "Messaging section title page" },
  { src: imgGBrandVoice, alt: "Brand voice guidelines" },
  { src: imgGBrandTone, alt: "Brand tone guidelines" },
  { src: imgGCharacterTraits, alt: "Brand character traits" },
  { src: imgGAttributes1, alt: "Brand attributes, part 1" },
  { src: imgGAttributes2, alt: "Brand attributes, part 2" },
  { src: imgGBrandDivider, alt: "Brand section divider" },
];

const GUIDELINES_CAROUSEL_IMAGES = [
  { src: imgGLogoTitle, alt: "Logo section title page" },
  { src: imgGLogoOverview, alt: "Logo overview" },
  { src: imgGLogoAnatomy, alt: "Primary logo anatomy" },
  { src: imgGLogoHorizontal, alt: "Logo horizontal lockup" },
  { src: imgGLogoDark, alt: "Logo on a dark background" },
  { src: imgGLogoDonts, alt: "Logo don'ts" },
  { src: imgGColorTitle, alt: "Color section title page" },
  { src: imgGColorPrimary, alt: "Primary color palette" },
  { src: imgGColorPrimaryRed, alt: "Primary red color usage" },
  { src: imgGColorSecondaryBlue, alt: "Secondary blue color usage" },
  { src: imgGColorTertiary, alt: "Tertiary and semantic colors" },
  { src: imgGColorGrayscale, alt: "Grayscale color palette" },
  { src: imgGColorSemanticUsage, alt: "Semantic color usage" },
  { src: imgGColorTextGrayscale, alt: "Text color usage, grayscale" },
  { src: imgGColorTextRedBlue, alt: "Text color usage, red and blue" },
  { src: imgGColorTextTertiary, alt: "Text color usage, tertiary and semantic" },
  { src: imgGColorUsage, alt: "Color usage guidelines" },
  { src: imgGColorDonts, alt: "Color don'ts" },
  { src: imgGTypeTitle, alt: "Typography section title page" },
  { src: imgGTypePrimary, alt: "Primary typeface" },
  { src: imgGTypeSecondary, alt: "Secondary typeface" },
  { src: imgGTypeHeadlineScale, alt: "Headline type scale" },
  { src: imgGTypeBodyScale, alt: "Body type scale" },
  { src: imgGTypeSecondaryScale, alt: "Secondary type scale" },
  { src: imgGTypeUsage, alt: "Typography usage guidelines" },
  { src: imgGTypeDonts, alt: "Typography don'ts" },
  { src: imgGPhotoTitle, alt: "Photography section title page" },
  { src: imgGPhotoStock, alt: "Photography and stock imagery guidelines" },
  { src: imgGPhotoDonts, alt: "Photography don'ts" },
  { src: imgGVisualDivider, alt: "Visual identity section divider" },
  { src: imgGVisualStatement, alt: "Visual identity statement" },
];

const MARKETING_CAROUSEL_IMAGES = [
  { src: imgGMarketingTitle, alt: "Marketing section title page" },
  { src: imgGStationery, alt: "Branded stationery and envelopes" },
  { src: imgGBusinessCards, alt: "Branded business cards" },
  { src: imgGTshirts, alt: "Branded t-shirts" },
  { src: imgGPolos, alt: "Branded polo shirts" },
  { src: imgGBags, alt: "Branded bags" },
  { src: imgGDuffle, alt: "Branded duffle bags" },
  { src: imgGAccessories, alt: "Branded accessories" },
  { src: imgGPoster, alt: "Marketing poster mockup" },
];

export function BreakoutChallengeSection() {
  return (
    <Section id="challenge">
      <Eyebrow color={ACCENT}>The Challenge</Eyebrow>
      <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[720px] leading-[1.7]">
        The mobile app lacked a cohesive brand identity, making it difficult for
        product designers to build with confidence. Seeking a clear &ldquo;North Star,&rdquo; the company had
        struggled to find a marketing agency that understood its startup culture and lifestyle branding.
      </Body>
      <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[720px] leading-[1.7]">
        The opportunity grew out of prior experience in athletic branding, a natural fit for translating brand
        strategy into a system product teams could use directly.
      </Body>
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
        as overly feminine, lacking impact and failing to convey athleticism. The redesign leaned into a powerful,
        solid red, evoking ambition and determination, and a thick, boxy font inspired by baseball
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
          The geometric crown design gives the brand a strong visual impression of &ldquo;kings&rdquo;
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
      <div className="flex flex-col gap-4">
        <BreakoutLaptopMockup
          src={imgSitePage}
          alt="A supporting web page built alongside the brand guidelines"
        />
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-snug text-center">
          A supporting web page built alongside the guidelines.
        </Body>
      </div>
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
