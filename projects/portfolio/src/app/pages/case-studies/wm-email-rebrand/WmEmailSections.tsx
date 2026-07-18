import { Body, Heading } from "@/app/components/Text/Text";
import {
  Eyebrow,
  ImageCarousel,
  ImageFrame,
  ImageFull,
  Lead,
  NextGrid,
  Section,
  SectionTitle,
  StatCards,
} from "@/app/components/CaseStudyPrimitives";
import {
  WmEmailAuditGrid,
  WmEmailBlockCategoryGrid,
  WmEmailContentCompare,
  WmEmailMockupCarousel,
  WmEmailOldGreenContent,
  WmEmailPsychCards,
  WmEmailQuestionList,
  WmEmailReflectionGrid,
} from "./WmEmailBlocks";
import { WM_EMAIL_BLOCKS_CAROUSEL, WM_EMAIL_BRAND_GUIDELINES_CAROUSEL, WM_EMAIL_EXAMPLES_CAROUSEL } from "./WmEmailCarouselAssets";
import imgOldEmailsComparison from "@/app/assets/pages/case-study/wm-email-rebrand/old emails comparrison-min.png";
import imgColorTheory from "@/app/assets/pages/case-study/wm-email-rebrand/color theory.png";
import imgOldEmailActivatePhoto from "@/app/assets/pages/case-study/wm-email-rebrand/old-email-activate-photo.jpg";
import imgPersonalization from "@/app/assets/pages/case-study/wm-email-rebrand/personalization.png";
import imgSocialProofing from "@/app/assets/pages/case-study/wm-email-rebrand/social proofing.png";
import imgLayoutVisual from "@/app/assets/pages/case-study/wm-email-rebrand/layout-visual.png";
import imgMockup from "@/app/assets/pages/case-study/wm-email-rebrand/mockup-min.png";
import imgWireframes from "@/app/assets/pages/case-study/wm-email-rebrand/wireframes-min.png";

const BRAND = "var(--ld-semantic-color-text-brand, #006937)";
const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";

export function WmEmailContextSection() {
  return (
    <Section id="context">
      <Eyebrow>Context</Eyebrow>
      <SectionTitle>A new brand with an inbox that hadn&rsquo;t caught up</SectionTitle>
      <Lead>
        The Email Marketing team led the initial rebranding efforts in collaboration with the Digital Studio and
        the Brand Team. The goal was to consolidate the email process by defining purpose, audience, and strategy
        to increase engagement and traffic to wm.com.
      </Lead>
    </Section>
  );
}

const APPROACH_STEPS = [
  {
    title: "Heuristic Analysis",
    body: "Audit the existing email inventory to map fragmentation, inconsistent patterns, and missed opportunities. Establish what's working and what's not.",
  },
  {
    title: "Competitive Research",
    body: "Study competitor email strategies for psychology patterns, layout principles, and visual hierarchy tactics that drive engagement.",
  },
  {
    title: "Define the Problem",
    body: "Synthesize audit and competitive findings into a clear design brief. Name the core constraints and what success looks like.",
  },
  {
    title: "Wireframe",
    body: "Map user flows and content hierarchy before visual design. Structure the scan path and CTA placement so layout decisions are settled first.",
  },
  {
    title: "UX Designs",
    body: "Build wireframe templates for each email type. Validate structure, hierarchy, and interaction patterns with product and engineering.",
  },
  {
    title: "Visual Branding",
    body: "Apply the new brand identity. Lock in color, typography, and imagery rules so they scale across the toolkit.",
  },
  {
    title: "UI Designs",
    body: "Build high-fidelity components and templates in Figma. Document variants, states, and token usage for engineering handoff.",
  },
  {
    title: "Docs + Testing",
    body: "Write design guidelines, engineering specs, and accessibility annotations. Test across email clients and devices.",
  },
];

export function WmEmailApproachSection() {
  return (
    <Section id="approach" variant="mid">
      <Eyebrow>The Approach</Eyebrow>
      <SectionTitle>A research-led process from audit to toolkit</SectionTitle>

      <div className="flex flex-col">
        {APPROACH_STEPS.map((step, i) => (
          <div
            key={step.title}
            className="grid grid-cols-[44px_1fr] gap-x-5 px-6 py-6"
            style={{ borderBottom: i < APPROACH_STEPS.length - 1 ? `1px solid ${SEPARATOR}` : undefined }}
          >
            <div className="font-black leading-none" style={{ fontSize: "28px", color: BRAND }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <Heading as="h3" size="small" weight="default" UNSAFE_className="mb-2">
                {step.title}
              </Heading>
              <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.7]">
                {step.body}
              </Body>
            </div>
          </div>
        ))}
      </div>
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
            body: "Email is a competitive space. WM sends needed to earn the open, then earn the scroll.",
          },
          {
            icon: "CheckCircle",
            lead: "How do we instill trust?",
            body: "Customers receive service-critical communications. Every decision had to reinforce reliability and clarity.",
          },
          {
            icon: "Eye",
            lead: "How do we keep users engaged the moment they open?",
            body: "Research showed customers scan, not read. Visual hierarchy had to do the heavy lifting.",
          },
          {
            icon: "Flag",
            lead: "How do we guide users to action and build a stronger partnership?",
            body: "Clear, singular CTAs tied to business objectives, not friction-multiplying button clusters.",
          },
        ]}
      />
      <figure className="m-0 flex flex-col gap-6">
        <Body as="p" size="small" weight="alt" color="subtlest" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "11px" }}>
          What the audit revealed
        </Body>
        <WmEmailAuditGrid
          before={{
            label: "Problems found",
            items: [
              "Text was overutilized, with dense body copy and no visual breathing room",
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
              "Psychological strategies, including social proof, personalization, and localization, integrated by design",
            ],
          }}
        />
        <Body
          as="p"
          size="small"
          weight="alt"
          color="brand"
          UNSAFE_className="uppercase tracking-[0.1em]"
          UNSAFE_style={{ fontSize: "10px" }}
        >
          Email content
        </Body>
        <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
          We concluded that copy writing should be concise, getting straight to the point while maintaining a friendly voice.
        </Body>
        <ImageFrame src={imgOldEmailsComparison} alt="Old email comparison" />
        <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
          Dense paragraphs became short benefit lines, and competing links collapsed into one primary CTA. Word
          count dropped over 60%, and the next action was unmistakable.
        </Body>
        <WmEmailContentCompare />
      </figure>
    </Section>
  );
}

export function WmEmailCompetitiveSection() {
  return (
    <Section id="competitive">
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
            description: "26% more likely to be opened. WM emails translated into 3 languages by native speakers, not translation services.",
          },
        ]}
      />
      <figure className="m-0 flex flex-col gap-6">
        <Body
          as="p"
          size="small"
          weight="alt"
          color="brand"
          UNSAFE_className="uppercase tracking-[0.1em]"
          UNSAFE_style={{ fontSize: "10px" }}
        >
          Personalization
        </Body>
        <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
          Personalized greetings and localized content compared to the prior approach.
        </Body>
        <ImageFrame src={imgPersonalization} alt="Personalization example" />
      </figure>
      <figure className="m-0 flex flex-col gap-6">
        <Body
          as="p"
          size="small"
          weight="alt"
          color="brand"
          UNSAFE_className="uppercase tracking-[0.1em]"
          UNSAFE_style={{ fontSize: "10px" }}
        >
          Social proof
        </Body>
        <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
          By providing clear values and benefits, we can help customers feel confident in their decisions.
        </Body>
        <ImageFrame src={imgSocialProofing} alt="Social proof block examples" />
      </figure>
      <figure className="m-0 flex flex-col gap-6">
        <Body
          as="p"
          size="small"
          weight="alt"
          color="brand"
          UNSAFE_className="uppercase tracking-[0.1em]"
          UNSAFE_style={{ fontSize: "10px" }}
        >
          Layout &amp; Visual Design
        </Body>
        <Body as="p" size="medium" color="subtlest" UNSAFE_className="max-w-[660px] leading-[1.7]">
          Layouts shouldn't overwhelm and help keep the user engaged to the material, guiding them to scroll all the
          way through.
        </Body>
        <ImageFrame src={imgLayoutVisual} alt="Layout and visual design examples from competitive email research" />
        <Body
          as="p"
          size="small"
          weight="alt"
          color="brand"
          UNSAFE_className="uppercase tracking-[0.1em]"
          UNSAFE_style={{ fontSize: "10px" }}
        >
          Color research
        </Body>
        <Body
          as="p"
          size="medium"
          color="subtlest"
          UNSAFE_className="max-w-[660px] leading-[1.7]"
          UNSAFE_style={{ color: "rgba(153, 153, 153, 1)" }}
        >
          Color theory research grounding the case for intentional CTA color. Using color should be intentional. The
          example on the left uses the primary color too much and makes it lose its value.
        </Body>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <WmEmailOldGreenContent photoSrc={imgOldEmailActivatePhoto} />
          <ImageFrame
            src={imgColorTheory}
            alt="Color theory research charts"
            className="h-full"
            fit="contain"
          />
        </div>
      </figure>
    </Section>
  );
}

export function WmEmailDesignSystemSection() {
  return (
    <Section id="design-system">
      <Eyebrow>The Design Approach</Eyebrow>
      <SectionTitle>The Email Tool Kit: a modular system for every send</SectionTitle>
      <Lead>
        The email library was built on color styles, type styles, and layer styles. These foundational tokens were
        used to assemble atomic components and, from those, the full block system.
      </Lead>
      <ImageFull
        src={imgMockup}
        alt="Waste Management order confirmation email mockup displayed on a laptop in Gmail"
      />
      <WmEmailBlockCategoryGrid
        items={[
          { tag: "Basic Blocks", tagColor: "var(--ld-semantic-color-fill-brand, #006937)", title: "Standard to email templates", description: "Styling existing Salesforce Marketing Cloud blocks with WM brand colors, typography, and elements. The consistent baseline for every email." },
          { tag: "Custom Blocks", tagColor: "var(--ld-semantic-color-fill-accent-cyan, #009bd9)", title: "Special need or function", description: "Designed specifically for WM use cases: service change summaries, recycling guides, account dashboards." },
          { tag: "Framework Blocks", tagColor: "var(--ld-semantic-color-fill-accent-orange, #fc934d)", title: "Branded shells", description: "Headers, social toolbars, footers, and standard disclaimers. Present in every email and always on-brand." },
          { tag: "Ad Hoc Blocks", tagColor: "var(--ld-semantic-color-fill-accent-purple, #63327e)", title: "Campaign-specific", description: "Included in builds specific to one or a few emails. Built when needed for a particular campaign." },
          { tag: "Combo Blocks", tagColor: "var(--ld-semantic-color-fill-accent-teal, #00809e)", title: "Regularly used patterns", description: "Pre-assembled combinations, like hero sections, that speed up production for common layouts." },
          { tag: "Atomic Components", tagColor: "var(--ld-semantic-color-fill-negative, #ea1100)", title: "Foundation of everything", description: "Buttons, icons, text patterns, images. Atomic design means consistent, predictable output at every level." },
        ]}
      />
      <Body
        as="p"
        size="small"
        weight="alt"
        color="brand"
        UNSAFE_className="uppercase tracking-[0.1em]"
        UNSAFE_style={{ fontSize: "10px" }}
      >
        Blocks
      </Body>
      <ImageCarousel
        images={WM_EMAIL_BLOCKS_CAROUSEL}
        ariaLabel="WM email modular blocks"
        itemHeight={560}
        fit="contain"
      />
    </Section>
  );
}

export function WmEmailFinalDesignsSection() {
  return (
    <Section id="final-designs" variant="mid">
      <Eyebrow>From Wireframes to Final Design</Eyebrow>
      <SectionTitle>Research translated directly into structure</SectionTitle>
      <Lead>
        Wireframes incorporated every research insight before visual design began, resolving layout and
        hierarchy decisions so the high-fidelity phase focused on brand expression, not structural debates.
      </Lead>
      <ImageFull
        src={imgWireframes}
        alt="Six wireframe templates: Welcome, Service Change, Activate Account, Sign Up, Order Confirmation, Heads Up"
        label="Wireframes"
        caption="Six wireframe templates: Welcome/Onboarding, Service Change, Activate Account, Sign Up, Order Confirmation, Heads Up."
      />

      <Body
        as="p"
        size="small"
        weight="alt"
        color="brand"
        UNSAFE_className="uppercase tracking-[0.1em]"
        UNSAFE_style={{ fontSize: "10px" }}
      >
        Brand guidelines
      </Body>
      <ImageCarousel
        images={WM_EMAIL_BRAND_GUIDELINES_CAROUSEL}
        ariaLabel="WM email brand guidelines"
        itemHeight={560}
        fit="contain"
      />
    </Section>
  );
}

export function WmEmailResultsSection() {
  return (
    <Section id="results" variant="dark">
      <Eyebrow onDark>Results & Impact</Eyebrow>
      <SectionTitle onDark>Scaling email across the organization</SectionTitle>
      <Lead onDark>
        Standardized templates, components, and event triggers reduced costs for email creation and management.
        Performance improvements were measured across every self-service objective the project was built to
        address.
      </Lead>
      <StatCards
        stats={[
          { value: "+20%", label: "Primary audience engagement increase" },
          { value: "+37%", label: "Support resource traffic increase" },
          { value: "+60%", label: "Self-service tool adoption increase" },
        ]}
      />

    </Section>
  );
}

export function WmEmailNextStepsSection() {
  return (
    <Section id="next-steps">
      <Eyebrow>Next Steps</Eyebrow>
      <SectionTitle>A foundation built to scale</SectionTitle>
      <Lead>
        The rebrand made emails modular and consistent using the Salesforce Marketing Cloud platform. The toolkit continues to evolve
        as new business needs emerge, enabling personalized communication at scale across all lines of business.
      </Lead>
      <NextGrid
        items={[
          { when: "Completed", title: "Personalized messaging at scale", description: "Implemented personalized messaging for all lines of business through Salesforce Marketing Cloud dynamic content, enabling targeted communication at volume." },
          { when: "Completed", title: "Toolkit expansion", description: "Continuously adding new modules and blocks as campaign types and business needs evolve. The modular system grows with organizational demand." },
          { when: "Completed", title: "Event trigger optimization", description: "Optimized event triggers to surface the right template at the right lifecycle moment, improving delivery efficiency and customer experience." },
          { when: "In Progress", title: "Partner self-service", description: "Extended toolkit access to Salesforce partners, expanding self-service capability across the full WM ecosystem and enabling external teams to maintain brand consistency.", future: true },
        ]}
      />
    </Section>
  );
}

export function WmEmailExamplesSection() {
  return (
    <Section id="examples">
      <Eyebrow>Email Examples</Eyebrow>
      <SectionTitle>Templates in motion</SectionTitle>
      <Lead>
        Here are real examples of the redesigned emails in production. Each template maintains the consistent
        structure, visual hierarchy, and brand identity while adapting to different email types and business needs.
      </Lead>
      <WmEmailMockupCarousel emails={WM_EMAIL_EXAMPLES_CAROUSEL} />
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
          { icon: "Box", title: "Modularity is a strategic decision", description: "Defining five distinct block categories wasn't a technical detail. It was the architectural choice that made the entire system scalable." },
          { icon: "Magic", title: "Psychology belongs in the design brief", description: "Grounding visual decisions in behavioral research, 50ms attention windows, and scan patterns turned design choices into defensible strategy." },
          { icon: "Notebook", title: "Documentation is part of the design", description: "The Email Digital Toolkit was a resource for external partners too. A system no one can use is just a pretty library." },
          { icon: "Globe", title: "Localization is a design constraint", description: "Supporting 3 languages required layouts that didn't assume English text length. Flexible containers made personalization possible at scale." },
        ]}
      />
    </Section>
  );
}
