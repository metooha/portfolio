import React from "react";
import { Body } from "@/app/components/Text/Text";
import {
  Callout,
  Eyebrow,
  ImageCarousel,
  ImageFull,
  JourneyTimeline,
  Lead,
  Section,
  SectionTitle,
  VideoFull,
  type JourneyItem,
} from "@/app/components/CaseStudyPrimitives";
import { NiniCardGrid, NiniTensionSplit, NiniWebsiteCompare } from "./NiniJewelsBlocks";
import imgBranding from "@/app/assets/pages/case-study/nini-jewels/nini_branding.png";
import imgCustomIllustrations from "@/app/assets/pages/case-study/nini-jewels/custom-illustrations.jpg";
import imgOldWebsite from "@/app/assets/pages/case-study/nini-jewels/nini-old-website.jpg";
import imgNewWebsite from "@/app/assets/pages/case-study/nini-jewels/nini-new-website.jpg";
import imgDeliverables from "@/app/assets/pages/case-study/nini-jewels/deliverables.png";
import videoInterview from "@/app/assets/pages/case-study/nini-jewels/optimized/nini-final-interview.mp4";
import imgPageHome from "@/app/assets/pages/case-study/nini-jewels/nini-website-pages/1-home-2.png";
import imgPageAbout1 from "@/app/assets/pages/case-study/nini-jewels/nini-website-pages/2-about-1.png";
import imgPageAbout2 from "@/app/assets/pages/case-study/nini-jewels/nini-website-pages/3-about-2.jpg";
import imgPageCollections from "@/app/assets/pages/case-study/nini-jewels/nini-website-pages/4-collections.png";
import imgPageTypeCollection from "@/app/assets/pages/case-study/nini-jewels/nini-website-pages/5-type-collection.png";
import imgPageCollectionDetail1 from "@/app/assets/pages/case-study/nini-jewels/nini-website-pages/6-collection-detail-1.png";
import imgPageCollectionDetail2 from "@/app/assets/pages/case-study/nini-jewels/nini-website-pages/7-collection-detail-2.jpg";
import imgPageBlog from "@/app/assets/pages/case-study/nini-jewels/nini-website-pages/8-blog.png";
import imgPageContact from "@/app/assets/pages/case-study/nini-jewels/nini-website-pages/9-contact.png";

const ACCENT = "#27A6A0";

const WEBSITE_PAGE_IMAGES = [
  { src: imgPageHome, alt: "Homepage", caption: "Homepage" },
  { src: imgPageAbout1, alt: "About page", caption: "About" },
  { src: imgPageAbout2, alt: "About page, continued", caption: "About, continued" },
  { src: imgPageCollections, alt: "Collections page", caption: "Collections" },
  { src: imgPageTypeCollection, alt: "Collection type page", caption: "Collection type" },
  { src: imgPageCollectionDetail1, alt: "Birdcage collection detail page", caption: "Collection detail: Birdcage" },
  { src: imgPageCollectionDetail2, alt: "Collection detail page, alternate view", caption: "Collection detail, continued" },
  { src: imgPageBlog, alt: "Blog page", caption: "Blog" },
  { src: imgPageContact, alt: "Contact page", caption: "Contact" },
];

const JOURNEY_ITEMS: JourneyItem[] = [
  {
    date: "Move 01",
    phase: "Redefine the brand",
    story: "Simple guidelines for color, type, and content, for one unified look.",
    mood: "neutral",
  },
  {
    date: "Move 02",
    phase: "Reduce the color",
    story: "A black-and-white stage that makes the jewelry stand out and read as luxury.",
    mood: "neutral",
  },
  {
    date: "Move 03",
    phase: "Retell the story",
    story: "Rewrote each page, cut a Thai interview into a video intro, and illustrated every collection.",
    mood: "neutral",
  },
  {
    date: "Move 04",
    phase: "Refine the imagery",
    story: "Cleaned and color-corrected the product photos for a seamless, consistent shopping experience.",
    mood: "neutral",
  },
  {
    date: "Move 05",
    phase: "Rebuild the UX",
    story: "A real site map, buttons that look like buttons, categorized collections, and a blog + social hub.",
    mood: "neutral",
  },
];

export function NiniProblemSection() {
  return (
    <Section id="problem">
      <Eyebrow color={ACCENT}>The problem</Eyebrow>
      <SectionTitle>A site that undersold the work</SectionTitle>
      <Lead>
        Each piece was one of a kind, cut from rare, striking stones. The site around them was busy, off-brand,
        and hard to read.
      </Lead>
      <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
        It also didn&rsquo;t tell Nini&rsquo;s story, and her team couldn&rsquo;t update it without a developer,
        so it rarely changed.
      </Body>
    </Section>
  );
}

export function NiniTensionSection() {
  return (
    <Section id="tension" background="#000000">
      <Eyebrow onDark color={ACCENT}>The Challenge</Eyebrow>
      <SectionTitle onDark>The jewelry vs. the website</SectionTitle>
      <Lead onDark>Everything on the page was competing with the thing people came to see.</Lead>
      <NiniTensionSplit
        accentColor={ACCENT}
        left={{
          who: "The old site",
          title: "Loud and off-brand",
          items: [
            "Busy stock backgrounds",
            "White text on color, unreadable on mobile",
            "Inconsistent color and type",
            "One long page, no room to scale",
          ],
        }}
        right={{
          who: "Luxury needs",
          title: "Quiet and consistent",
          items: [
            "Let the jewelry breathe",
            "High, readable contrast",
            "One brand system",
            "Structure that can grow",
          ],
        }}
      />
      <Callout tone="neutral">
        <span className="font-bold">How it resolved: </span>
        strip it back to a black-and-white stage, commit to one brand system, and rebuild the structure so the team
        can grow it themselves.
      </Callout>
    </Section>
  );
}

export function NiniApproachSection() {
  return (
    <Section id="approach">
      <Eyebrow color={ACCENT}>The approach</Eyebrow>
      <SectionTitle>Five moves, brand to build</SectionTitle>
      <Lead>The scope ran end to end, from brand strategy straight through to the live site.</Lead>
      <JourneyTimeline items={JOURNEY_ITEMS} phaseColor={ACCENT} />
      <VideoFull
        src={videoInterview}
        alt="Video introduction cut from a Thai interview with Nini Hale"
        label="Video intro"
        labelColor={ACCENT}
        caption="The video intro, cut from a Thai-language interview with Nini Hale."
        playback="controls"
        bordered
      />
    </Section>
  );
}

export function NiniBrandSystemSection() {
  return (
    <Section id="brand-system" background="#f2f2f2">
      <Eyebrow color={ACCENT}>Brand guidelines</Eyebrow>
      <SectionTitle>One system, quietly luxurious</SectionTitle>
      <Lead>Restraint was the whole idea: fewer choices on the page, so nothing competes with the work.</Lead>
      <NiniCardGrid
        accentColor={ACCENT}
        columns={3}
        cards={[
          { who: "TYPE", title: "Karla", description: "One typeface on a clear, structured scale." },
          { who: "COLOR", title: "Restrained", description: "Teal, black, grey, and white: restraint over noise." },
          { who: "CONTENT", title: "Story-led", description: "Guidelines and rewritten copy that tell Nini's story." },
        ]}
      />
      <ImageFull
        src={imgBranding}
        alt="Brand guideline sheet showing the Karla typescale, logo lockups, and the teal, black, gray, and white color palette"
        label="Style guide"
        labelColor={ACCENT}
        caption="The brand guidelines: typescale, logo lockups, and the four-color palette."
      />
    </Section>
  );
}

export function NiniCollectionsSection() {
  return (
    <Section id="collections">
      <Eyebrow color={ACCENT}>Illustrated collections</Eyebrow>
      <SectionTitle>A story for every collection</SectionTitle>
      <Lead>A custom illustration for each collection explains what makes it distinctly Nini&rsquo;s.</Lead>
      <NiniCardGrid
        accentColor={ACCENT}
        cards={[
          {
            who: "ONE OF A KIND",
            title: "High style, extraordinary craft",
            description: "High style and craftsmanship, for women who appreciate the extraordinary.",
          },
          {
            who: "BIRDCAGE",
            title: "A great-grandmother's birdcages",
            description: "Named for the ornate birdcages Nini's great-grandmother loved in the early 1900s.",
          },
          {
            who: "THE ROYALE",
            title: "The King's crown jewels",
            description: "Inspired by the King's crown jewels: elaborate gold and bold colored stones.",
          },
          {
            who: "AYA",
            title: "Whimsical, for a granddaughter",
            description: "Named for Nini's granddaughter: whimsical stars, butterflies, and flowers.",
          },
        ]}
      />
      <ImageFull
        src={imgCustomIllustrations}
        alt="A custom illustrated dragon ring alongside a hand-drawn Thai temple sketch"
        label="Custom illustration"
        labelColor={ACCENT}
        caption="One of the custom illustrations, paired with a hand-drawn sketch of a Thai temple. The same illustration style carries across every collection."
      />
    </Section>
  );
}

export function NiniHomepageSection() {
  return (
    <Section id="homepage" background="#f2f2f2">
      <Eyebrow color={ACCENT}>The homepage</Eyebrow>
      <SectionTitle>The same homepage, restrained</SectionTitle>
      <Lead>The redesign didn&rsquo;t add more. It cleared the stage so the jewelry could lead.</Lead>
      <NiniWebsiteCompare
        before={{ src: imgOldWebsite, alt: "The old Nini Jewels homepage, busy stock backgrounds and low contrast" }}
        after={{ src: imgNewWebsite, alt: "The redesigned Nini Jewels homepage, a black-and-white stage" }}
      />
    </Section>
  );
}

export function NiniPagesSection() {
  return (
    <Section id="pages">
      <Eyebrow color={ACCENT}>More pages</Eyebrow>
      <SectionTitle>A closer look at the shipped site</SectionTitle>
      <Lead>From homepage to checkout-adjacent detail, every page carries the same restrained system.</Lead>
      <ImageFull
        src={imgDeliverables}
        alt="Four pages of the redesigned Nini Jewels site shown side by side"
        caption="The site, at a glance."
      />
      <ImageCarousel images={WEBSITE_PAGE_IMAGES} ariaLabel="Nini Jewels website pages" itemHeight={560} />
    </Section>
  );
}

export function NiniReflectionSection() {
  return (
    <Section id="reflection">
      <Eyebrow color={ACCENT}>Reflection</Eyebrow>
      <SectionTitle>What made it luxurious</SectionTitle>
      <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
        The hardest part of a luxury redesign is restraint: every added color competes with the jewelry.
        The real win wasn&rsquo;t what went onto the page; it was what came off.
      </Body>
      <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
        Handing Nini&rsquo;s team a system they can maintain on their own is what makes it last.
      </Body>
    </Section>
  );
}
