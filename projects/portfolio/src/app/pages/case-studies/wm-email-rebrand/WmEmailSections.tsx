import React from "react";
import { Body } from "@/app/components/Text/Text";
import {
  Callout,
  Eyebrow,
  ImageFull,
  ImageGrid2,
  Lead,
  NextGrid,
  QuoteBlock,
  Section,
  SectionTitle,
  StatsRow,
} from "@/app/components/CaseStudyPrimitives";
import {
  WmEmailApproachSteps,
  WmEmailAuditGrid,
  WmEmailBlockCategoryGrid,
  WmEmailPsychCards,
  WmEmailQuestionList,
  WmEmailReflectionGrid,
  WmEmailTeamRow,
  WmEmailToolChips,
} from "./WmEmailBlocks";
import imgEmailContent from "@/app/assets/pages/case-study/wm-email-rebrand/Email content-min.jpg";
import imgApproach from "@/app/assets/pages/case-study/wm-email-rebrand/email approach.png";
import imgOldEmails2 from "@/app/assets/pages/case-study/wm-email-rebrand/old emails2-min.png";
import imgOldEmailsComparison from "@/app/assets/pages/case-study/wm-email-rebrand/old emails comparrison-min.png";
import imgOldEmailsCompetitive from "@/app/assets/pages/case-study/wm-email-rebrand/old emails competitve-min.png";
import imgColorTheory from "@/app/assets/pages/case-study/wm-email-rebrand/color theory.png";
import imgPersonalization from "@/app/assets/pages/case-study/wm-email-rebrand/personalization.png";
import imgSocialProofing from "@/app/assets/pages/case-study/wm-email-rebrand/social proofing.png";
import imgInfographics from "@/app/assets/pages/case-study/wm-email-rebrand/infographics.png";
import imgWireframes from "@/app/assets/pages/case-study/wm-email-rebrand/wireframes-min.png";

export function WmEmailContextSection() {
  return (
    <Section id="context">
      <Eyebrow>Context</Eyebrow>
      <SectionTitle>A new brand with an inbox that hadn&rsquo;t caught up</SectionTitle>
      <Lead>
        The Email Marketing team led the initial rebranding efforts in collaboration with the Digital Studio and
        the Brand Team. The goal: consolidate the email process by defining purpose, audience, and strategy
        &mdash; to increase engagement and traffic to wm.com.
      </Lead>
      <WmEmailTeamRow
        members={[
          { label: "1 Designer (Lead)", color: "#006937" },
          { label: "1 UX Researcher", color: "#3D35D8" },
          { label: "1 Content Writer", color: "#fa6400" },
          { label: "2 External Salesforce Devs", color: "#0053e2" },
        ]}
      />
      <WmEmailToolChips tools={["Sketch", "Salesforce CRM", "Invision DSM", "Invision Prototyping", "SFMC"]} />
      <ImageFull
        src={imgEmailContent}
        alt="Existing WM email content before the rebrand"
        label="Email content"
        caption="Existing email content and structure ahead of the rebrand."
      />
    </Section>
  );
}

export function WmEmailApproachSection() {
  return (
    <Section id="approach" variant="mid">
      <Eyebrow>The Approach</Eyebrow>
      <SectionTitle>A research-led process from audit to toolkit</SectionTitle>
      <Lead>
        The work followed a structured process &mdash; from heuristic analysis and competitive research through UX
        and UI design, ending with a documented Email Tool Kit ready for production teams.
      </Lead>
      <WmEmailApproachSteps
        steps={[
          "Heuristic Analysis",
          "Competitive Research",
          "Define the Problem",
          "Wireframe",
          "UX Designs",
          "Visual Branding",
          "UI Designs",
          "Docs + Testing",
        ]}
      />
      <ImageFull
        src={imgApproach}
        alt="8-step approach flow diagram"
        label="Process"
        caption="The 8-step approach, from heuristic analysis through documentation and testing."
      />
    </Section>
  );
}

export function WmEmailResearchSection() {
  return (
    <Section id="research">
      <Eyebrow>Research & Audit</Eyebrow>
      <SectionTitle>Starting with the right questions</SectionTitle>
      <Lead>
        During heuristic analysis, the team began with four core questions that shaped every design decision that
        followed.
      </Lead>
      <WmEmailQuestionList
        items={[
          {
            icon: "Flash",
            lead: "How do we capture attention in an inbox full of emails?",
            body: "Email is a competitive space — WM sends needed to earn the open, then earn the scroll.",
          },
          {
            icon: "CheckCircle",
            lead: "How do we instill trust?",
            body: "WM customers receive service-critical communications. Every decision had to reinforce reliability and clarity.",
          },
          {
            icon: "Eye",
            lead: "How do we keep users engaged the moment they open?",
            body: "Research showed customers scan, not read — visual hierarchy had to do the heavy lifting.",
          },
          {
            icon: "Flag",
            lead: "How do we guide users to action and build a stronger partnership?",
            body: "Clear, singular CTAs tied to business objectives — not friction-multiplying button clusters.",
          },
        ]}
      />
      <ImageFull
        src={imgOldEmails2}
        alt="Inventory of existing WM emails, showing inconsistent templates"
        label="Email audit"
        caption="The existing email inventory, showing inconsistent templates across the board."
      />
      <Body as="p" size="small" weight="alt" color="subtlest" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "11px" }}>
        What the audit revealed
      </Body>
      <WmEmailAuditGrid
        before={{
          label: "Problems found",
          items: [
            "Text was overutilized — dense body copy with no visual breathing room",
            "Too many CTAs or false interactable affordances diluting the intent of the email",
            "Visual hierarchy difficult to scan for email viewers",
            "No psychological design strategies applied to improve positive emotional response",
          ],
        }}
        after={{
          label: "Design principles formed",
          items: [
            "One primary CTA per email, clearly differentiated from secondary actions",
            "Z-pattern and single-column layouts to guide the eye naturally downward",
            "Scannable hierarchy: headline → image → body → CTA",
            "Psychological strategies — social proof, personalization, localization — integrated by design",
          ],
        }}
      />
      <ImageGrid2
        items={[
          { src: imgOldEmailsComparison, alt: "Old email comparison", caption: "Comparing existing sends against the new design principles." },
          { src: imgOldEmailsCompetitive, alt: "Competitive email examples", caption: "Competitive examples used to benchmark the audit." },
        ]}
      />
    </Section>
  );
}

export function WmEmailCompetitiveSection() {
  return (
    <Section id="competitive" variant="mid">
      <Eyebrow>Competitive Analysis & Psychology</Eyebrow>
      <SectionTitle>Designing for how people actually read email</SectionTitle>
      <Lead>
        By following perceptual UX strategies, the team aimed to minimize cognitive load and increase positive
        emotional responses. Research grounded every visual decision.
      </Lead>
      <WmEmailPsychCards
        cards={[
          {
            stat: "50ms",
            title: "To grab attention",
            description: "Customers decide in 50 milliseconds whether to keep reading. The hero block has one job: earn the next 3 seconds.",
          },
          {
            stat: "Scan",
            title: "Customers scan, not read",
            description: "Hierarchy, imagery, and bold CTAs carry the message before a word is read consciously.",
          },
          {
            stat: "Stress",
            title: "Email feels stressful",
            description: "Reducing friction, cognitive load, and visual noise was a primary design mandate throughout.",
          },
          {
            stat: "+26%",
            title: "Personalized subject lines",
            description: "26% more likely to be opened. WM emails translated into 3 languages by native speakers — not translation services.",
          },
        ]}
      />
      <ImageGrid2
        items={[
          { src: imgColorTheory, alt: "Color theory research charts", label: "Color research", caption: "Color theory research grounding the case for intentional CTA color." },
          { src: imgPersonalization, alt: "Personalization example", label: "Personalization", caption: "Personalized greetings and localized content compared to the prior approach." },
        ]}
      />
      <ImageFull
        src={imgSocialProofing}
        alt="Social proof block examples"
        label="Social proof"
        caption="Social proof and value-prop blocks used across competitor examples."
      />
      <Callout tone="brand">
        <span className="font-bold">Competitive insight: </span>
        Optimizing content strategy, layout, and visual design with UX principles minimizes cognitive load and
        increases positive emotional responses. Copywriting should be concise and get to the point while
        maintaining a friendly voice &mdash; minimal copy, minimal CTAs, maximum clarity.
      </Callout>
    </Section>
  );
}

export function WmEmailDesignSystemSection() {
  return (
    <Section id="design-system">
      <Eyebrow>The Design Approach</Eyebrow>
      <SectionTitle>The Email Tool Kit: a modular system for every send</SectionTitle>
      <Lead>
        The email library was built on color styles, type styles, and layer styles &mdash; foundational tokens
        used to assemble atomic components and, from those, the full block system.
      </Lead>
      <ImageFull
        src={imgInfographics}
        alt="Modular email block system overview"
        label="System overview"
        caption="The modular block system, from atomic components up to full email layouts."
      />
      <WmEmailBlockCategoryGrid
        items={[
          { tag: "Basic Blocks", tagColor: "#006937", title: "Standard to email templates", description: "Styling existing SFMC blocks with WM brand colors, typography, and elements — the consistent baseline for every email." },
          { tag: "Custom Blocks", tagColor: "#2B6CB0", title: "Special need or function", description: "Designed specifically for WM use cases: service change summaries, recycling guides, account dashboards." },
          { tag: "Framework Blocks", tagColor: "#7B341E", title: "Branded shells", description: "Headers, social toolbars, footers, and standard disclaimers. Present in every email — always on-brand." },
          { tag: "Ad Hoc Blocks", tagColor: "#3D35D8", title: "Campaign-specific", description: "Included in builds specific to one or a few emails. Built when needed for a particular campaign." },
          { tag: "Combo Blocks", tagColor: "#0053e2", title: "Regularly used patterns", description: "Pre-assembled combinations — like hero sections — that speed up production for common layouts." },
          { tag: "Atomic Components", tagColor: "#C53030", title: "Foundation of everything", description: "Buttons, icons, text patterns, images. Atomic design means consistent, predictable output at every level." },
        ]}
      />
      <QuoteBlock quote="A modular system allows for effective consistency in all our emails." attribution="WM Email Redesign · Design System Principle" />
    </Section>
  );
}

export function WmEmailFinalDesignsSection() {
  return (
    <Section id="final-designs" variant="mid">
      <Eyebrow>From Wireframes to Final Design</Eyebrow>
      <SectionTitle>Research translated directly into structure</SectionTitle>
      <Lead>
        Wireframes incorporated every research insight before visual design began &mdash; resolving layout and
        hierarchy decisions so the high-fidelity phase focused on brand expression, not structural debates.
      </Lead>
      <ImageFull
        src={imgWireframes}
        alt="Six wireframe templates: Welcome, Service Change, Activate Account, Sign Up, Order Confirmation, Heads Up"
        label="Wireframes"
        caption="Six wireframe templates: Welcome/Onboarding, Service Change, Activate Account, Sign Up, Order Confirmation, Heads Up."
      />
      <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
        The final designs carried that structure straight through &mdash; a single primary CTA, a clear scan
        path, and a footer of self-service tools repeated across every template (shown at the top of this page).
      </Body>
    </Section>
  );
}

export function WmEmailResultsSection() {
  return (
    <Section id="results" variant="dark">
      <Eyebrow onDark>Results & Impact</Eyebrow>
      <SectionTitle onDark>Email insights for 2021</SectionTitle>
      <Lead onDark>
        Standardized templates, components, and event triggers reduced costs for email creation and management.
        Performance improvements were measured across every self-service objective the project was built to
        address.
      </Lead>
      <StatsRow
        stats={[
          { value: "18.5M", label: "Emails sent under the new system in 2021" },
          { value: "70", label: "New email templates designed and deployed" },
          { value: "50+", label: "Modular blocks in the Email Digital Toolkit" },
          { value: "↑", label: "Increased open rates across all email sends" },
        ]}
      />
      <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>
        Adoption of self-service tools via email
      </Body>
      <StatsRow
        variant="light"
        stats={[
          { value: "+20%", label: "MyWM Portal traffic up" },
          { value: "+37%", label: "Support page traffic up" },
          { value: "+60%", label: "Communication preferences page traffic up" },
          { value: "+12–14%", label: "1.8M AutoPay & paperless billing signups" },
        ]}
      />
      <Callout tone="positive">
        <span className="font-bold">Additional impact: </span>
        Increased customers opting in for text notifications &mdash; a key business objective from the start of
        the project. The modular system enabled personalized messaging for all lines of business at scale.
      </Callout>
    </Section>
  );
}

export function WmEmailNextStepsSection() {
  return (
    <Section id="next-steps">
      <Eyebrow>Next Steps</Eyebrow>
      <SectionTitle>A foundation built to grow</SectionTitle>
      <Lead>
        The rebrand made emails modular and consistent using the SFMC platform. The team continued adding ad-hoc
        modules to the toolkit and working with business units to curate new templates &mdash; personalized
        messaging as the next horizon.
      </Lead>
      <NextGrid
        items={[
          { when: "In Progress", title: "Personalized messaging at scale", description: "More effective and efficient email creation with personalized messaging for all lines of business through SFMC dynamic content." },
          { when: "Ongoing", title: "Toolkit expansion", description: "Continue adding ad-hoc modules as new campaign types and business needs emerge — the block system grows with the business." },
          { when: "Horizon", title: "Event trigger optimization", description: "Standardized event triggers already reduced costs — next phase optimizes trigger logic to surface the right template at the right lifecycle moment.", future: true },
          { when: "Scale", title: "Partner self-service", description: "The toolkit was designed for both internal teams and external Salesforce partners — expanding self-service capability across the full WM ecosystem.", future: true },
        ]}
      />
    </Section>
  );
}

export function WmEmailReflectionSection() {
  return (
    <Section id="reflection" variant="mid">
      <Eyebrow>Reflections</Eyebrow>
      <SectionTitle>What this work taught me about systems-scale design</SectionTitle>
      <WmEmailReflectionGrid
        items={[
          { icon: "Box", title: "Modularity is a strategic decision", description: "Defining five distinct block categories wasn't a technical detail — it was the architectural choice that made the entire system scalable." },
          { icon: "Magic", title: "Psychology belongs in the design brief", description: "Grounding visual decisions in behavioral research — 50ms attention windows, scan patterns — turned design choices into defensible strategy." },
          { icon: "Notebook", title: "Documentation is part of the design", description: "The Email Digital Toolkit was a resource for external partners too. A system no one can use is just a pretty library." },
          { icon: "Globe", title: "Localization is a design constraint", description: "Supporting 3 languages required layouts that didn't assume English text length. Flexible containers made personalization possible at scale." },
        ]}
      />
    </Section>
  );
}
