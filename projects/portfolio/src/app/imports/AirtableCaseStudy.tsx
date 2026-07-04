import React from "react";
import { CaseStudyHero } from "@/app/components/CaseStudyHero";
import { CaseStudyTemplate } from "@/app/components/CaseStudyTemplate";
import { SectionHeading } from "@/app/components/SectionHeading";
import { ValuePropCard, ValuePropGrid } from "@/app/components/ValuePropCard";
import { BulletList } from "@/app/components/BulletList";
import { getAdjacentCaseStudies } from "@/data/case-studies-config";
import imgHero from "@/assets/everyday-sans/Visual Tweaking.png";

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "Situation", href: "#situation" },
  { label: "Human cost", href: "#human-cost" },
  { label: "The work", href: "#the-work" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Theme hierarchy", href: "#theme-hierarchy" },
  { label: "Results", href: "#results" },
];

const SECTION = "content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full";

function BadgeIcon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px] overflow-clip rounded-full bg-[#e9f722] text-center p-[12px]">
      <span className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-black">{label}</span>
    </div>
  );
}

function AirtableHero() {
  return (
    <CaseStudyHero
      image={imgHero}
      title="Airtable as Source of Truth"
      subtitle="How a shared token infrastructure cut deployment from 3 days to 10 minutes."
      titleColor="#143526"
    />
  );
}

function AirtableOverviewLogo() {
  return (
    <div className="relative rounded-[16px] shrink-0 size-[48px] overflow-hidden">
      <img alt="" className="absolute inset-0 size-full object-cover" src={imgHero} />
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

export default function AirtableCaseStudy() {
  const { prev: prevProject, next: nextProject } = getAdjacentCaseStudies("6");

  return (
    <CaseStudyTemplate
      hero={<AirtableHero />}
      overviewLogo={<AirtableOverviewLogo />}
      overviewClient="Walmart Commerce Platform"
      overviewCategory="Living Design, Design Tokens"
      overviewTitle="Airtable as Source of Truth"
      overviewDescription="We went from 17+ teams maintaining their own copies of design tokens — manually, inconsistently, and constantly out of sync — to a single automated pipeline where a designer updates a value in Airtable and it's live in production in 10 minutes. Zero manual steps. Zero coordination. Zero errors."
      metaItems={[
        { label: "Role", value: "Lead Designer, Living Design" },
        { label: "Timeline", value: "Aug 2024 – Nov 2025" },
        { label: "Scope", value: "17 brand themes · iOS · Android · Web" },
        { label: "Focus", value: "Token infrastructure, automation, theme hierarchy" },
      ]}
      navSections={NAV}
      navAccentColor="#207442"
      prevProject={prevProject}
      nextProject={nextProject}
    >
      <CaseStudyBody>
        <div className={SECTION}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full min-w-0">
            {[
              { value: "95%", label: "Faster deployment", sub: "2–3 days → 10 minutes" },
              { value: "0%", label: "Error rate", sub: "347 automated tests" },
              { value: "17", label: "Brand themes", sub: "All self-service" },
              { value: "650+", label: "Tokens managed", sub: "Single source" },
            ].map((s) => (
              <div key={s.label} className="min-w-0">
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[32px] md:text-[40px] text-black mb-1">{s.value}</p>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-black mb-1">{s.label}</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#4e4f4e]">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="situation" className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="1"
            badgeColor="yellow"
            title="No shared source of truth. Everyone was working alone."
          />
          <ValuePropGrid>
            <ValuePropCard
              icon={<BadgeIcon label="D" />}
              title="Figma was restricted"
              description="The core team locked down their files — no direct access, no token contributions, no syncing. Figma couldn't be a source of truth."
            />
            <ValuePropCard
              icon={<BadgeIcon label="E" />}
              title="GitHub was fragmented"
              description="iOS, Android, and Web each maintained their own token repos with no shared inheritance model. Each platform was an island."
            />
            <ValuePropCard
              icon={<BadgeIcon label="C" />}
              title="Commerce needs were unmet"
              description="Commerce teams needed branding tokens, extended components, and multi-org support — none of which the core system was scoped to provide."
            />
          </ValuePropGrid>
        </div>

        <div id="human-cost" className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="2"
            badgeColor="yellow"
            title="The cost wasn't just inefficiency. It was eroded trust."
          />
          <BulletList
            items={[
              { text: "Teams were doing the same work twice — every team kept their own copy of the same tokens." },
              { text: "Designers and engineers couldn't trust they were looking at the same thing. Decisions made in design were constantly re-litigated during implementation." },
              { text: "Commerce teams had no clear place to go for answers, so they built in isolation — creating more inconsistency and more overhead with every release." },
              { text: "Manual exports took 2–3 days per update with a ~15% error rate, and rollbacks were painful for everyone involved." },
            ]}
          />
          <blockquote className="border-l-4 border-[#207442] pl-6 py-2 w-full min-w-0">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[20px] md:text-[24px] text-black leading-snug">
              The cost wasn't just inefficiency. It was eroded trust between teams.
            </p>
          </blockquote>
        </div>

        <div id="the-work" className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="3"
            badgeColor="yellow"
            title="Three phases. Eighteen months. One source everyone could trust."
          />
          <div className="flex flex-col gap-8 w-full min-w-0">
            {[
              {
                label: "1",
                title: "Phase 1 — Q3–Q4 2024 · Foundation",
                body: "The first challenge was getting people to agree before anything was built. I mapped the full stakeholder landscape and ran structured working sessions. Partnered with Shawn (WCP engineering lead) on a proof of concept that demonstrated tokens could be pulled from Airtable via API.\n\nKey outcomes: Airtable established as SoT, token taxonomy and IA defined across all platforms, RACI model locked in.",
              },
              {
                label: "2",
                title: "Phase 2 — Q1–Q2 2025 · Automate",
                body: "Restructured the Airtable IA to remove legacy bloat and standardize naming conventions. Designed user flows for designer-friendly tenant onboarding. Worked with Zach to define an intermediate JSON representation.\n\nDefined the theme inheritance model: each tenant contains only overrides, with a hierarchy file providing inheritance rules (Sam's Club ← WCP ← LD Base).",
              },
              {
                label: "3",
                title: "Phase 3 — Q3–Q4 2025 · Ship",
                body: "Implemented a fully automated CI/CD pipeline: Airtable → Style Dictionary → GitHub Actions → Artifactory/npm. 347 automated tests run on every sync.\n\nAsset tokens (icons, SVGs, logos) were also brought into the pipeline. If a token breaks, the pipeline stops and designers get a Slack alert within 5 minutes.",
              },
            ].map((phase) => (
              <div key={phase.label} className="flex flex-col md:flex-row gap-4 md:gap-6 min-w-0">
                <div className="flex flex-col items-center justify-center min-h-[32px] min-w-[32px] overflow-clip p-[6px] relative rounded-full shrink-0 bg-[#207442]">
                  <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] text-white">{phase.label}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] text-black mb-2">{phase.title}</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[#4e4f4e] leading-relaxed whitespace-pre-wrap">{phase.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="pipeline" className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="4"
            badgeColor="yellow"
            title="Airtable → Style Dictionary → GitHub Actions → Artifactory"
          />
          <ValuePropGrid>
            <ValuePropCard icon={<BadgeIcon label="1" />} title="Airtable — Source of Truth" description="Designers update tokens. Human-readable. Relational. API-accessible. No engineering skills required." />
            <ValuePropCard icon={<BadgeIcon label="2" />} title="Style Dictionary — Transform" description="Converts tokens to platform-specific formats for iOS, Android, and Web. One source, three outputs." />
            <ValuePropCard icon={<BadgeIcon label="3" />} title="GitHub Actions — CI / Validate" description="347 automated tests run on every sync. Fail loud, fail fast. Broken tokens never reach production." />
            <ValuePropCard icon={<BadgeIcon label="4" />} title="Artifactory — Deploy" description="Versioned packages distributed. Teams pull on their own schedule — fully self-service, zero coordination." />
          </ValuePropGrid>
        </div>

        <div id="theme-hierarchy" className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="5"
            badgeColor="yellow"
            title="17 brands. One base. Each layer only defines its overrides."
          />
          <BulletList
            items={[
              { label: "01", text: "LD Base — Primitives: 650+ tokens. Raw values — hex colors, px scale, font sizes. Shared by every brand that inherits from Living Design. (100% shared)" },
              { label: "02", text: "Semantic Layer: Alias tokens that map intent to primitives — e.g. colorTextDefault → gray-900. Shared across all brands. (~90% inherited)" },
              { label: "03", text: "WCP Theme: Commerce-specific overrides only. Sam's Club, Walmart+, and Bodega all branch from this layer. (~20% override)" },
              { label: "04", text: "Tenant Overrides: Brand-specific. Cashi, Walmart Business, international markets. Each tenant contains only its unique overrides. (~10% override)" },
            ]}
          />
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[#4e4f4e] italic leading-relaxed">
            When LD Base updates, all 17 downstream tenants receive the change automatically on the next sync — no manual propagation required.
          </p>
        </div>

        <div id="results" className={SECTION}>
          <SectionHeading
            layout="vertical"
            badge="6"
            badgeColor="yellow"
            title="Design changes now reach production in 10 minutes. Zero coordination. Zero errors."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full min-w-0">
            <div className="min-w-0">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] text-black mb-4">Before</p>
              <BulletList
                accentColor="#4e4f4e"
                items={[
                  { text: "2–3 days per token update, manual coordination required" },
                  { text: "~15% error rate on manual exports, frequent rollbacks" },
                  { text: "17+ separate copies of tokens across teams" },
                  { text: "Dark mode broken for 1+ year due to fragmented process" },
                  { text: "4 hours to onboard a new tenant" },
                  { text: "Constant coordination between design and engineering" },
                ]}
              />
            </div>
            <div className="min-w-0">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] text-black mb-4">After</p>
              <BulletList
                items={[
                  { text: "10 minutes from edit to production, fully automated" },
                  { text: "0% error rate with 347 automated tests on every sync" },
                  { text: "Single source of truth for all platforms and brands" },
                  { text: "Full dark mode support restored across all 17 platforms" },
                  { text: "Automated onboarding flow for new tenants" },
                  { text: "Zero coordination required — teams pull on their own schedule" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className={SECTION}>
          <SectionHeading
            layout="vertical"
            title="Designers work in Airtable. Engineers consume versioned tokens. No coordination needed."
            titleSize="lg"
          />
        </div>
      </CaseStudyBody>
    </CaseStudyTemplate>
  );
}
