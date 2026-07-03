import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { SectionHeading } from "@/app/components/SectionHeading";
import { ValuePropCard, ValuePropGrid } from "@/app/components/ValuePropCard";
import { BulletList } from "@/app/components/BulletList";
import { CaseStudyJourneyTimeline } from "@/app/components/CaseStudyJourneyTimeline";
import { getAdjacentCaseStudies } from "@/data/case-studies-config";
import imgTypography from "@/assets/everyday-sans/Typography Adjustment examples.png";
import imgFontAudit1 from "@/assets/everyday-sans/Font Audit 1.jpg";
import imgFontAudit13 from "@/assets/everyday-sans/Font Audit 13.jpg";
import imgFontAudit27 from "@/assets/everyday-sans/Font Audit 27.jpg";
import imgVisualTweaking from "@/assets/everyday-sans/Visual Tweaking.png";
import imgSpanish from "@/assets/everyday-sans/Spanish.png";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "The compromise", href: "#tension" },
  { label: "Weight scale", href: "#weight-scale" },
  { label: "Before & after", href: "#before-after" },
  { label: "The journey", href: "#journey" },
  { label: "User testing", href: "#user-testing" },
  { label: "What's next", href: "#whats-next" },
];

const SECTION = "content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full";

function BadgeIcon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px] overflow-clip rounded-full bg-[#e9f722] text-center p-[12px]">
      <span className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-black">{label}</span>
    </div>
  );
}

function EverydaySansHero() {
  return (
    <CaseStudyHero
      image={imgTypography}
      title="Everyday Sans UI"
      subtitle="Brand. Performance. Pick one — or used to."
      titleColor="#143526"
    />
  );
}

function EverydaySansOverviewLogo() {
  return (
    <div className="relative rounded-[16px] shrink-0 size-[48px] overflow-hidden">
      <img alt="" className="absolute inset-0 size-full object-cover" src={imgTypography} />
    </div>
  );
}

function CaseStudyBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative shrink-0 w-full overflow-x-hidden">
      <div className="flex flex-row items-stretch justify-center w-full">
        <div className="content-stretch flex flex-col items-stretch w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px] relative">
          <div className="content-stretch flex flex-1 flex-col gap-12 md:gap-16 lg:gap-[80px] items-stretch min-h-px w-full max-w-full min-w-0 relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EverydaySansCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("5");

  return (
    <CaseStudyTemplate
      hero={<EverydaySansHero />}
      overviewLogo={<EverydaySansOverviewLogo />}
      overviewClient="Walmart Commerce Platform"
      overviewCategory="Living Design, Typography"
      overviewTitle="Everyday Sans UI — Brand and performance, without compromise"
      overviewDescription="Every new font weight came with a performance cost. So Brand held back. The result was visual hierarchy that never reached its potential, and a design system that had to make peace with compromise. The variable font ended that trade-off — permanently."
      metaItems={[
        { label: "Role", value: "Lead Designer, Living Design" },
        { label: "Timeline", value: "Jun 2024 – Dec 2025" },
        { label: "Scope", value: "Web, iOS, Android, Email" },
        { label: "Focus", value: "Variable font adoption, design tokens, accessibility" },
      ]}
      navSections={NAV}
      navAccentColor="#207442"
      prevProject={prevProject}
      nextProject={nextProject}
    >
      <CaseStudyBody>
        <div id="tension" className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="1"
            badgeColor="yellow"
            title="The compromise we stopped making"
            description="Our font system was built on static files — one file per weight. Brand couldn't introduce Medium, Semibold, or Black without Engineering absorbing the performance cost of each one. The result: years of visual hierarchy limited to two weights."
          />
          <ValuePropGrid>
            <ValuePropCard
              icon={<BadgeIcon label="B" />}
              title="Brand — Needed weight variety"
              description="Price callouts, headings, body copy, and display text all need different weights to create clear hierarchy. With only Regular and Bold, every surface looked visually flat."
            />
            <ValuePropCard
              icon={<BadgeIcon label="E" />}
              title="Engineering — Couldn't absorb the cost"
              description="Adding the Medium weight file alone was blocked — it pushed page load times past the web vitals threshold. Each new file meant another HTTP request on every page load."
            />
          </ValuePropGrid>
          <div className="rounded-[16px] border border-[#207442]/30 bg-[#dae4e1]/50 p-6 w-full min-w-0">
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[#4e4f4e] leading-relaxed">
              <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-black">How it was resolved: </span>
              The variable font makes weight a continuous axis — not a collection of files. Engineering pays the performance cost once (one file, one request). Brand gets the full weight scale. The constraint that blocked both teams no longer exists.
            </p>
          </div>
        </div>

        <div id="weight-scale" className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="2"
            badgeColor="yellow"
            title="The full weight scale, finally available"
            description="Before, choosing a new weight was also choosing a performance hit. Now it's just a design decision."
          />
          <div className="flex flex-col gap-2 w-full min-w-0">
            {[
              { weight: "400", name: "Regular", use: "Captions, helper text", isNew: false, fontWeight: 400 },
              { weight: "500", name: "Medium", use: "Body copy, UI labels", isNew: true, fontWeight: 500 },
              { weight: "600", name: "Semibold", use: "Prices, subheadings", isNew: true, fontWeight: 600 },
              { weight: "700", name: "Bold", use: "Headings, CTAs", isNew: false, fontWeight: 700 },
              { weight: "800", name: "Black", use: "Display, hero text", isNew: true, fontWeight: 900 },
            ].map((row) => (
              <div
                key={row.weight}
                className={`flex flex-wrap items-center gap-3 md:gap-4 rounded-[16px] px-4 py-3 min-w-0 ${
                  row.isNew ? "bg-[#dae4e1]/60 border border-[#207442]/20" : "bg-[#f8f8f8]"
                }`}
              >
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-[#4e4f4e] w-10">
                  {row.weight}
                </span>
                <span className="font-['Inter:Regular',sans-serif] text-[16px] flex-1 min-w-0" style={{ fontWeight: row.fontWeight }}>
                  {row.name}
                </span>
                <span className="font-['Inter:Regular',sans-serif] text-[16px] text-[#4e4f4e]">{row.use}</span>
                {row.isNew && (
                  <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] uppercase tracking-wider text-[#207442]">
                    New
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[#4e4f4e] leading-relaxed">
            In the old system, Medium, Semibold, and Black were unavailable. Adding any one of them would have required a new font file and triggered a performance review.
          </p>
        </div>

        <div id="before-after" className={SECTION}>
          <SectionHeading layout="vertical" badge="3" badgeColor="yellow" title="What changed for both teams" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full min-w-0">
            <div className="min-w-0">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] text-black mb-4">Before</p>
              <BulletList
                accentColor="#4e4f4e"
                items={[
                  { text: "Brand held back. Regular and Bold only — not because the designs didn't need more, but because every new weight carried a performance cost." },
                  { text: "The compromise was real. Medium weight was attempted, hit web vitals thresholds, and had to be pulled." },
                  { text: "Platforms patched it differently. iOS, Android, and Web each had manual spacing overrides because the font defaults didn't match." },
                  { text: "Accessibility standards failed. Tight tracking and imposter letters made the font harder to read — especially at small sizes." },
                ]}
              />
            </div>
            <div className="min-w-0">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] text-black mb-4">After</p>
              <BulletList
                items={[
                  { text: "No more choosing. The full weight scale — Regular to Black — is available without a single additional HTTP request." },
                  { text: "Weight is a design decision now. Not a performance decision. Brand and Engineering are no longer trading against each other." },
                  { text: "Consistent defaults everywhere. Size, spacing, and line-height are baked into the font — no per-platform patches needed." },
                  { text: "Accessibility standards met. Better tracking, clearer letterforms, and corrected baselines — validated by users with accessibility needs." },
                ]}
              />
            </div>
          </div>
        </div>

        <div className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="4"
            badgeColor="yellow"
            title="Performance and flexibility, together"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full min-w-0 pt-4">
            {[
              { value: "5→1", label: "Static weight files replaced by one variable font" },
              { value: "57%", label: "Smaller file (70kb draft → 28kb final)" },
              { value: "3", label: "New weights unlocked: Medium, Semibold, Black" },
              { value: "4", label: "Platforms aligned on the same file and defaults" },
            ].map((s) => (
              <div key={s.label} className="min-w-0">
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[32px] md:text-[40px] text-black mb-1">{s.value}</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[#4e4f4e] leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="5"
            badgeColor="yellow"
            title="Four things this makes possible"
            description="Each of these was a compromise we were making — not because we wanted to, but because the architecture forced it."
          />
          <ValuePropGrid>
            <ValuePropCard icon={<BadgeIcon label="01" />} title="Visual hierarchy at scale" description="Price callouts, product names, body descriptions, and navigation labels can now each sit at the right visual weight — across walmart.com, the app, and email." />
            <ValuePropCard icon={<BadgeIcon label="02" />} title="Brand without the tax" description="Before this, every weight choice was also an infrastructure decision. Now it's just a design decision." />
            <ValuePropCard icon={<BadgeIcon label="03" />} title="Site performance" description="One file request replaces five or more. Pages that use multiple font weights — nearly every page on walmart.com — now load faster." />
            <ValuePropCard icon={<BadgeIcon label="04" />} title="Accessibility" description="Weight, spacing, and letterform clarity are now all correct by default — meeting accessibility standards our font previously failed." />
          </ValuePropGrid>
        </div>

        <div id="journey" className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="6"
            badgeColor="yellow"
            title="It wasn't a straight line."
            description="Getting to a system where Brand doesn't have to compromise performance took 18 months, six versions, and three organizations learning to want the same thing."
          />
          <CaseStudyJourneyTimeline
            items={[
              { date: "Jun 2024", phase: "High hopes. Early friction.", who: ["Brand", "Foundry", "A11y"], mood: "friction", story: "The foundry delivered a first Bold draft. The team's reaction was blunt: too heavy, too tight, and letters that looked too similar to each other. The A11y team flagged failures immediately.", tension: "Foundry vs. A11y on what \"readable\" actually means — at every weight and every size." },
              { date: "Late 2024", phase: "Engineering hits a wall.", who: ["Engineering", "iOS", "Android"], mood: "blocker", story: "When Engineering tried to add the Medium weight mid-cycle, it broke the release — too heavy for web vitals. iOS doesn't support variable fonts. The file came in at 70kb — more than twice the 30kb limit.", tension: "The file that was supposed to replace everything couldn't run on half our devices." },
              { date: "Jan 2025", phase: "First real alignment.", who: ["Brand", "Engineering", "Foundry"], mood: "progress", story: "The team landed on a shared character set — reducing from 541 glyphs to 179. Brand gave up some special characters. Engineering got a leaner file.", win: "Brand, Engineering, and Foundry aligned on a shared glyph set for the first time." },
              { date: "Jul 2025", phase: "The great scale debate.", who: ["Brand", "Engineering", "Foundry"], mood: "friction", story: "The foundry presented two paths: scale all text up ~8.5%, or scale down ~8%. Two weeks of back-and-forth before the team chose to scale up.", tension: "Brand wanted visual parity with Bogle. Engineering didn't want to absorb layout rework.", win: "Aligned on scaling up — short-term rework accepted for long-term font system consistency." },
              { date: "Sep–Oct 2025", phase: "Two steps forward, one step back.", who: ["Engineering", "A11y", "Design"], mood: "friction", story: "Testing on real Walmart product pages kept surfacing new problems: strikethrough on the number 4, text off-center in buttons. Each fix revealed another edge case.", tension: "Teams debated whether to keep iterating or ship and fix post-launch." },
              { date: "Dec 2025", phase: "All parties sign off.", who: ["Brand", "Engineering", "A11y", "Foundry"], mood: "win", story: "Final file delivered. Variable font plus five static weights, every platform confirmed. After 18 months and six versions, four organizations agreed on the same file.", win: "Brand, Engineering, A11y, and Commercial Type all signed off on the same final file." },
            ]}
          />
        </div>

        <div className={SECTION}>
          <SectionHeading layout="vertical" badge="7" badgeColor="yellow" title="Font audit and typography adjustments" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0 w-full">
            {[
              { src: imgFontAudit1, alt: "Font audit comparison 1" },
              { src: imgFontAudit13, alt: "Font audit comparison 2" },
              { src: imgFontAudit27, alt: "Font audit comparison 3" },
              { src: imgTypography, alt: "Typography adjustment examples" },
              { src: imgVisualTweaking, alt: "Visual tweaking examples" },
              { src: imgSpanish, alt: "Spanish language support" },
            ].map((img) => (
              <div key={img.alt} className="rounded-[16px] overflow-hidden border border-[#dae4e1] bg-white min-w-0">
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div id="user-testing" className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="8"
            badgeColor="yellow"
            title="Customers prefer it"
            description="We tested both fonts with real users — including people with accessibility needs — to confirm the switch was a genuine improvement."
          />
          <blockquote className="border-l-4 border-[#207442] pl-6 py-2 w-full min-w-0">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[20px] md:text-[24px] text-black leading-snug">
              &ldquo;Feels like a font for reading a book. Easier to read, nicer on the eyes. The numbers stand out and don't blend with the text.&rdquo;
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[#4e4f4e] mt-4 leading-relaxed">
              Research participant — quadriplegic user, on-screen keyboard and mouth stick · Rated Everyday Sans 5/5 vs. Bogle 4.5/5
            </p>
          </blockquote>
        </div>

        <div id="whats-next" className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="9"
            badgeColor="yellow"
            title="The rollout plan"
            description="The compromise is gone. Now the design system needs to catch up — new tokens and text styles so teams can actually reach the full weight scale."
          />
          <BulletList
            items={[
              { label: "Q1", text: "FY27 Q1 — Web goes live. Pronto files to WCP Core. Fast rollout — file size is within target, so no extended performance testing needed." },
              { label: "Q2", text: "FY27 Q2 — New weights in the design system. Medium and Semibold added to design tokens — the weight scale is only useful if designers can actually reach it." },
              { label: "Q2", text: "FY27 Q2 — Dynamic text on mobile. App text scales correctly when customers increase their system font size — a key accessibility requirement." },
              { label: "→", text: "Future — More languages. English, Spanish, and French are built in. Simplified Chinese support being explored with Source Han Sans as the companion." },
            ]}
          />
        </div>
      </CaseStudyBody>
    </CaseStudyTemplate>
  );
}
