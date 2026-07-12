import React from "react";
import { Body } from "@/app/components/Text/Text";
import { ValuePropCard, ValuePropGrid } from "@/app/components/ValuePropCard";
import {
  Eyebrow,
  ImageFull,
  ImageGrid2,
  Lead,
  Section,
  SectionTitle,
} from "@/app/components/CaseStudyPrimitives";
import {
  CardFlipGrid,
  ComponentAnatomySpec,
  PageTemplateGrid,
  RecyclingMockup,
  SideBySideCompare,
  SyncedCompareSlider,
  TagTaxonomyGrid,
} from "./WmRebrandBlocks";
import { DesignSystemsOverviewDiagram, SitemapWm } from "./WmRebrandOriginalDiagrams";

import imgConfluenceSprint from "@/app/assets/pages/case-study/wm-rebrand/confluence-sprint-2-items.png";
import imgDesignToolKit from "@/app/assets/pages/case-study/wm-rebrand/design-tool-kit.png";
import imgAuditAnnotated from "@/app/assets/pages/case-study/wm-rebrand/redesigned-pages.png";
import imgVisualGrid from "@/app/assets/pages/case-study/wm-rebrand/visual-grid.png";
import imgTokens from "@/app/assets/pages/case-study/wm-rebrand/tokens.png";
import imgStyleGuide from "@/app/assets/pages/case-study/wm-rebrand/design-system-style-guide.png";
import imgNamingTable from "@/app/assets/pages/case-study/wm-rebrand/naming-table.png";
import imgRecyclingTruck from "@/app/assets/pages/case-study/wm-rebrand/recycling-truck.png";
import imgJimFish from "@/app/assets/pages/case-study/wm-rebrand/jim-fish.png";
import imgRollOffDumpster from "@/app/assets/pages/case-study/wm-rebrand/roll-off-dumpster.png";
import imgSolutionCardBg from "@/app/assets/pages/case-study/wm-rebrand/solution-card-bg.png";
import imgJimFishCircle from "@/app/assets/pages/case-study/wm-rebrand/img190616-bh-wm-slt02-backdrop-james-fisher36081.png";
import imgTrashIcon from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-80347242.png";

import imgFunctionOverForm from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-c8b74e9d.png";
import imgPhotographyInconsistent from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-6d8490c5.png";

import imgDsf1Landing2 from "@/app/assets/pages/case-study/wm-rebrand/dsf1-landing2.png";
import imgWireframe1 from "@/app/assets/pages/case-study/wm-rebrand/wireframe1.png";

import imgInteractiveExample from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-c7c28a59.png";
import imgDRecycling1011 from "@/app/assets/pages/case-study/wm-rebrand/drecycling1011.png";
import imgBgImage from "@/app/assets/pages/case-study/wm-rebrand/bg-image.png";
import imgGoldenRule1 from "@/app/assets/pages/case-study/wm-rebrand/image1-x2.png";
import imgGoldenRule2 from "@/app/assets/pages/case-study/wm-rebrand/image1-x3.png";
import imgGoldenRule3 from "@/app/assets/pages/case-study/wm-rebrand/image1-x1.png";

import imgSurface1 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-ff1d90c4.png";
import imgSurface2 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-5edaa9e9.png";
import imgSurface3 from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-2d9e1526.png";

const ACCENT = "#207442";

function GoalNumber({ n }: { n: number }) {
  return (
    <div
      className="size-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
      style={{ background: ACCENT }}
    >
      {n}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Problem Space + Our Goals                                                  */
/* -------------------------------------------------------------------------- */

export function WmProblemSpaceSection() {
  return (
    <Section id="problem-space">
      <Eyebrow color={ACCENT}>Problem Space</Eyebrow>
      <SectionTitle>Fragmented patterns, inconsistent experiences</SectionTitle>
      <Lead>
        Waste Management&rsquo;s digital products had grown through rapid, project-based development, resulting in
        fragmented UI patterns, inconsistent information architecture, and limited reuse across teams. As
        self-service experiences expanded, these inconsistencies created friction for users and increased
        maintenance costs for the organization.
      </Lead>
      <DesignSystemsOverviewDiagram />
    </Section>
  );
}

export function WmGoalsSection() {
  return (
    <Section id="our-goals" background="var(--ld-semantic-color-fill-brand-subtle, #eef6ef)">
      <Eyebrow color={ACCENT}>Our Goals</Eyebrow>
      <SectionTitle>Aligning the team behind one system</SectionTitle>
      <ValuePropGrid>
        <ValuePropCard
          icon={<GoalNumber n={1} />}
          description="Align on brand principles, UX pattern strategy, and IA to guide the system architecture."
        />
        <ValuePropCard
          icon={<GoalNumber n={2} />}
          description="Establish a guiding framework and scalable system that accelerates our market entry."
        />
        <ValuePropCard
          icon={<GoalNumber n={3} />}
          description="Collaborate and execute with our product, brand, design, and engineering teams."
        />
      </ValuePropGrid>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Approach                                                                    */
/* -------------------------------------------------------------------------- */

export function WmApproachSection() {
  return (
    <Section id="approach">
      <Eyebrow color={ACCENT}>Approach</Eyebrow>
      <SectionTitle>Audit, align, and build alongside a branding partner</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-4">
          <Body as="p" size="medium" weight="alt">
            Internal Audit &amp; Alignment
          </Body>
          <ul className="flex flex-col gap-4">
            {[
              "Ranked, story pointed, and aligned on level of effort for each component. Created a cataloging system to enable us to scale to new components.",
              "Defined requirements and technical constraints and how our design system integrates with the AEM platform with eng team.",
              "Organized sprint planning and outlined the design and development tasks. Collaborated with the business, prioritized scope, and migration roadmap.",
            ].map((item, index) => (
              <li key={item} className="flex gap-4 items-start">
                <span
                  className="size-6 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-semibold"
                  style={{ background: ACCENT }}
                >
                  {index + 1}
                </span>
                <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
                  {item}
                </Body>
              </li>
            ))}
          </ul>
        </div>
        <ImageFull
          src={imgConfluenceSprint}
          alt="Sprint 1-2 Items - WM.com Atlassian tracker view showing AEM components timeline"
          surface="subtle"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-4">
          <Body as="p" size="medium" weight="alt">
            3rd Party Engagement
          </Body>
          <Lead>
            Collaborating with an external branding agency proved to be a significant hurdle. We had to
            thoroughly educate the team on our product&rsquo;s unique requirements and intricacies to ensure they
            could produce effective assets and deliverables.
          </Lead>
          <ul className="flex flex-col gap-4">
            {[
              "Created a site map to align on where brand could provide those moments of joy.",
              "Focused on form and function, but there were times where we had compromised on brand experience.",
              "Our Digital Tool Kit was a partnership to ensure that we scaled and aligned with our product design principles.",
            ].map((item, index) => (
              <li key={item} className="flex gap-4 items-start">
                <span
                  className="size-6 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-semibold"
                  style={{ background: ACCENT }}
                >
                  {index + 1}
                </span>
                <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
                  {item}
                </Body>
              </li>
            ))}
          </ul>
        </div>
        <ImageFull src={imgDesignToolKit} alt="The shared digital tool kit deliverable, built with the branding agency" />
      </div>
    </Section>
  );
}

export function WmAuditSection() {
  return (
    <Section id="system-audit" background="var(--ld-semantic-color-fill-subtle, #f8f8f8)">
      <Eyebrow color={ACCENT}>System Discovery &amp; Audit</Eyebrow>
      <SectionTitle>Auditing the existing system before building the new one</SectionTitle>
      <Lead>
        I conducted a system-level audit of existing pages, components, and patterns to identify redundancy,
        inconsistencies, and opportunities for consolidation. This work established a shared design vocabulary and
        informed which elements should become foundational system components.
      </Lead>
      <ImageFull
        src={imgAuditAnnotated}
        alt="Three real WM.com pages annotated with pink highlight boxes marking inconsistent CTAs and UI patterns under audit"
        label="Audit findings"
        labelColor={ACCENT}
        caption="Inconsistent CTA styling and page patterns found across Business Waste & Recycling, the Sustainability Forum, and the homepage."
      />
      <ImageFull
        src={imgVisualGrid}
        alt="Button component with Primary Green and Primary Yellow paths to page templates: Business Waste & Recycling, Sustainability Forum, Modern Landfills"
        caption="Mapping how the primary button component's two brand colors should route to different page templates."
      />

      <div className="pt-4 flex flex-col gap-4">
        <Body as="p" size="medium" weight="alt">
          Tokens &amp; Foundations
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6] max-w-[660px]">
          Our branding foundations and hierarchy are built on a mix of primitive and semantic tokens. We have
          established a token taxonomy based on their semantic usage, which we continuously refine to broaden
          their applications, especially when dealing with other surfaces.
        </Body>
      </div>
      <ImageGrid2
        items={[
          { src: imgTokens, alt: "A card component annotated with its text, surface, and background tokens" },
          { src: imgStyleGuide, alt: "Design system style guide screens: layer styles, typography, colors, form fields, and buttons" },
        ]}
      />
      <ImageFull
        src={imgNamingTable}
        alt="Naming taxonomy table mapping element type, taxonomy pattern, and token examples"
        label="Naming conventions"
        labelColor={ACCENT}
      />
    </Section>
  );
}

export function WmComponentsSection() {
  return (
    <Section id="component-library">
      <Eyebrow color={ACCENT}>Component Groups</Eyebrow>
      <SectionTitle>Organized for reuse, not customization</SectionTitle>
      <Lead>
        Created with reuse in mind rather than customization, our components are organized to assist content
        designers. This structure helps users easily understand calls to action and how to interact with the
        pages.
      </Lead>
      <TagTaxonomyGrid
        columns={[
          { label: "Action & Conversion", tags: ["Global & Navigation", "Heroes & Headers", "Story Telling", "Informational", "Grids & Pathing"] },
          { label: "Brand & Story Telling", tags: ["Library of Cards", "Action & Conversion", "Forms", "Support", "Integrations"] },
        ]}
      />

      <div className="pt-4 flex flex-col gap-2">
        <Body as="p" size="medium" weight="alt">
          Redesigning the Card component
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6] max-w-[660px]">
          We recognized that cards are essential, but there was a lack of consistent rules or patterns across
          various designs. We aimed to collaborate with the agency to clarify how cards should be used for the
          different paths a customer might take.
        </Body>
      </div>

      <div className="flex flex-col gap-4">
        <Body as="p" size="small" weight="alt" color="subtlest" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "10px" }}>
          Reskin existing card types
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6] max-w-[660px]">
          Most of our existing cards served a few basic purposes: information about services and products,
          downloadable information, and general information.
        </Body>
        <CardFlipGrid
          cards={[
            {
              label: "Basic Info",
              back: {
                eyebrow: "Recycling",
                title: "The Dangers of “Wishcycling”",
                description: "By Susan Robinson, Director of Public Affairs for Waste Management",
                image: imgRecyclingTruck,
                imageAlt: "Recycling truck",
                cta: "Keep Reading",
              },
            },
            {
              label: "Profile",
              back: {
                eyebrow: "President & CEO",
                title: "James C. Fish Jr.",
                description:
                  "Talent comes to Waste Management from all areas and walks of life. It isn't too often, however, that one of our great employees gets traded to us from the world of Major League Baseball.",
                image: imgJimFish,
                imageAlt: "James C. Fish Jr.",
                cta: "Read Now",
              },
            },
            {
              label: "Product",
              back: {
                eyebrow: "Service",
                title: "Home Waste & Recycling",
                description: "Get free account setup and container delivery to help you manage your residential waste and recycling.",
                image: imgRollOffDumpster,
                imageAlt: "Roll-off dumpster",
                cta: "Learn More",
              },
            },
            {
              label: "Download",
              back: {
                eyebrow: "PDF",
                title: "Our Position on Plastic",
                description: "A downloadable position paper on plastic waste and recycling policy.",
                cta: "Download",
              },
            },
          ]}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Body as="p" size="small" weight="alt" color="subtlest" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "10px" }}>
          New card types
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6] max-w-[660px]">
          These cards are reusable, configurable components designed for consistency, scalability, and continuous
          optimization based on user needs and performance.
        </Body>
        <CardFlipGrid
          cards={[
            {
              label: "Solution",
              back: {
                eyebrow: "Recycling",
                title: "The Dangers of “Wishcycling”",
                description: "By Susan Robinson, Director of Public Affairs for Waste Management",
                image: imgSolutionCardBg,
                imageAlt: "Recycling article",
                cta: "Keep Reading",
              },
            },
            {
              label: "Service",
              back: {
                eyebrow: "President & CEO",
                title: "James C. Fish Jr.",
                description:
                  "Talent comes to Waste Management from all areas and walks of life. It isn't too often, however, that one of our great employees gets traded to us from the world of Major League Baseball.",
                image: imgJimFishCircle,
                imageAlt: "James C. Fish Jr.",
                imageRound: true,
                cta: "Read Now",
              },
            },
            {
              label: "FAQ",
              back: {
                eyebrow: "Service",
                title: "Home Waste & Recycling",
                description: "Get free account setup and container delivery to help you manage your residential waste and recycling.",
                image: imgTrashIcon,
                imageAlt: "",
                imageRound: true,
                cta: "Learn More",
              },
            },
            {
              label: "Content Card",
              back: {
                eyebrow: "PDF",
                title: "Our Position on Plastic",
                description: "A downloadable position paper on plastic waste and recycling policy.",
                cta: "Download",
              },
            },
          ]}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Body as="p" size="small" weight="alt" color="subtlest" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "10px" }}>
          Created for easy reuse and personalized customization
        </Body>
        <ComponentAnatomySpec
          componentName="[SP1] 03 – Product Card"
          description="Card component used in carousels or high-value placement for products."
          fields={[
            { name: "Eyebrow", note: "Optional" },
            { name: "Title", note: "Required" },
            { name: "Body / Description", note: "Optional" },
            { name: "Tags", note: "Select from preferred list of patterns" },
            { name: "Link", note: "Required for A11y" },
            { name: "Tag Patterns (nested instance)", note: "Nested instance" },
          ]}
        />
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Information Architecture                                                   */
/* -------------------------------------------------------------------------- */

export function WmInformationArchitectureSection() {
  return (
    <Section id="information-architecture" background="var(--ld-semantic-color-fill-subtle, #f8f8f8)">
      <Eyebrow color={ACCENT}>Information Architecture</Eyebrow>
      <SectionTitle>A flexible structure that scales without redesigning</SectionTitle>
      <Lead>
        Rather than designing pages individually, I defined a flexible information architecture that supported
        multiple content types and use cases. This abstraction allowed the system to scale without redesigning
        layouts for each new scenario.
      </Lead>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-4">
          <Body as="p" size="medium" weight="alt">
            Function over form
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
            The site itself is simple with basic information, but hard to navigate to information like recycling
            and self-service needs. Its more branded pages live externally, on a different website.
          </Body>
          <ul className="list-disc pl-5 flex flex-col gap-1.5">
            {[
              "Colors were muted and dull",
              "Angular designs made the site feel dated",
              "Typography made headlines feel cramped and difficult to read",
              "Text color was very light, causing accessibility concerns",
            ].map((item) => (
              <li key={item}>
                <Body as="span" size="small" color="subtlest">
                  {item}
                </Body>
              </li>
            ))}
          </ul>
        </div>
        <ImageFull
          src={imgFunctionOverForm}
          alt="Screenshot of the previous site's dense, hard-to-navigate layout"
          surface="subtle"
          fit="cover"
          frameClassName="aspect-[4/5]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-4">
          <Body as="p" size="medium" weight="alt">
            Photography felt lacking and inconsistent
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
            The current website&rsquo;s imagery, drawn from various photography campaigns, creates a disjointed and
            inconsistent experience for users navigating the top landing pages. A cohesive photography strategy
            could transform this into a powerful storytelling tool, enhancing the overall impact and consistency
            of our visual narrative.
          </Body>
        </div>
        <ImageFull
          src={imgPhotographyInconsistent}
          alt="Screenshot showing inconsistent photography styles across landing pages"
          surface="subtle"
          fit="cover"
          frameClassName="aspect-[4/5]"
        />
      </div>

      <div className="flex flex-col gap-4">
        <Body as="p" size="medium" weight="alt">
          Site Map
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6] max-w-[660px]">
          We kick off our rebranding journey by analyzing our page templates&rsquo; hierarchy to create a strategic
          site map that identifies key areas for impactful branded pages and outlines the necessary components to
          improve each template.
        </Body>
        <SitemapWm />
        <Body as="p" size="small" color="subtlest" UNSAFE_className="text-xs">
          Solid outline: current-scope page. Dashed outline: secondary or exploratory page. Stacked cards: multiple
          pages of that type.
        </Body>
      </div>

      <div className="flex flex-col gap-4">
        <Body as="p" size="medium" weight="alt">
          Page Templates
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6] max-w-[660px]">
          Page templates were created as composition frameworks rather than fixed layouts, enabling teams to
          assemble consistent experiences quickly while maintaining flexibility for different product needs.
        </Body>
        <PageTemplateGrid
          leftLabel="Action & Conversion"
          rightLabel="Brand & Story Telling"
          columns={[
            { groups: [["Logged in Pages"], ["Support Landing", "Support Detail"]] },
            { groups: [["Service & Solutions Landing", "Solution Detail", "Service Detail"]] },
            { groups: [["Locator Landing", "Location Detail"]] },
            { groups: [["Homepage", "Blank Template"]] },
            { groups: [["Immersive Story Telling Landing", "Educational Landing", "General Detail Page"]] },
          ]}
        />
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Design walkthrough — annotated wireframe vs. design comparison             */
/* -------------------------------------------------------------------------- */

export function WmDesignWalkthroughSection() {
  return (
    <Section id="design-walkthrough" background="var(--ld-semantic-color-fill-subtle, #f8f8f8)">
      <Eyebrow color={ACCENT}>Design in context</Eyebrow>
      <SectionTitle>Walking through the redesign</SectionTitle>
      <Lead>Drag the handle to compare the wireframe against the finished design, annotated with the reasoning behind key decisions.</Lead>
      <SyncedCompareSlider
        leftLabel="Design"
        rightLabel="Wireframe"
        left={<img src={imgDsf1Landing2} alt="The finished landing page design" className="w-full h-auto" />}
        right={<img src={imgWireframe1} alt="The landing page wireframe" className="w-full h-auto" />}
        contentWidth={1180}
        frameHeight={1750}
        annotations={[
          {
            title: "Clear Sub-navigation",
            text: "It's possible that a story will take more than one page. The subnav is meant to sit beneath the hero and stay on scroll, as a link to a different page rather than an anchor link.",
            top: "12.6%",
            left: "26%",
          },
          {
            title: "Primary CTA",
            text: "When these tales contain an action that you want users to do, make it easy for them to identify and understand the action.",
            top: "24.2%",
            left: "40%",
          },
          {
            title: "The Main Story",
            text: "There's lots of room to build the story you want to tell by combining current and new components.",
            top: "36.8%",
            left: "6%",
          },
          {
            title: "Pathing",
            text: "We can assure that there are no dead ends by using the Grids and Pathing components, so a user always has something new to investigate.",
            top: "56.5%",
            right: "4%",
          },
        ]}
      />
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Compromises                                                                 */
/* -------------------------------------------------------------------------- */

export function WmCompromisesSection() {
  return (
    <Section id="compromises">
      <Eyebrow color={ACCENT}>Compromises along the way</Eyebrow>
      <SectionTitle>Not every idea survives time and dev constraints</SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-4">
          <Body as="p" size="medium" weight="alt">
            Interactive experiences
          </Body>
          <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6]">
            We design interactive brand experiences, but due to time and scope constraints, we had to compromise
            with a mix of old and new assets. For example, illustrations and infographics were not in the roadmap
            or scope.
          </Body>
        </div>
        <ImageFull src={imgInteractiveExample} alt="Example of the mixed old-and-new interactive assets shipped" surface="subtle" />
      </div>

      <div className="flex flex-col gap-4">
        <Body as="p" size="medium" weight="alt">
          Informational pages
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.6] max-w-[660px]">
          Our recycling pages are highly branded and meant to be engaging and interactive, but due to time and dev
          constraints, we were left with a mix of old and new components and designs.
        </Body>
        <SideBySideCompare
          leftLabel="Live site"
          rightLabel="Proposed"
          left={<img src={imgDRecycling1011} alt="The live Recycling 101 page" className="block w-full h-auto" />}
          right={
            <RecyclingMockup
              heroImage={imgBgImage}
              goldenRules={[
                { image: imgGoldenRule1, imageAlt: "Clean bottles, cans, paper, and cardboard", text: "Clean bottles, cans, paper, and cardboard are good to go!" },
                { image: imgGoldenRule2, imageAlt: "Food or liquid waste, not accepted", text: "No food or liquid waste. This contaminates the other recyclables.", negative: true },
                { image: imgGoldenRule3, imageAlt: "Loose plastic bags, not accepted", text: "No loose plastic bags or bagged recyclables", negative: true },
              ]}
              accepted={["Plastic Bottles & Containers", "Food & Beverage Cans", "Paper", "Flattened Cardboard & Paperboard", "Food & Beverage Containers", "Glass Bottles & Containers"]}
              notAccepted={["Bagged Recyclables", "Plastic Bags", "Plastic Wrap & Film", "Flexible Packaging", "Cups with Wax or Plastic Coatings", "Polystyrene Foam and Plastic"]}
            />
          }
          height={640}
        />
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Reflection / closing                                                       */
/* -------------------------------------------------------------------------- */

export function WmReflectionSection() {
  return (
    <Section id="reflection" background="var(--ld-semantic-color-fill-subtle, #f8f8f8)">
      <Eyebrow color={ACCENT}>Designing for different surfaces</Eyebrow>
      <Lead>
        Although brand expression has shifted to focus on photography, the system rules remain unchanged to ensure
        that scaling does not affect performance.
      </Lead>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
        <ImageFull src={imgSurface1} alt="The system applied to a mobile surface" />
        <ImageFull src={imgSurface2} alt="The system applied to a tablet surface" />
        <ImageFull src={imgSurface3} alt="The system applied to a native app surface" />
      </div>

      <Body as="p" size="medium" UNSAFE_className="leading-[1.7]">
        <span className="font-bold">Reflections &amp; Takeaways: </span>
        Tight deadlines made the system strategy more important, not less. The strongest work came from defining
        reusable patterns, making tradeoffs explicit, and giving teams a structure they could keep extending after
        launch.
      </Body>
    </Section>
  );
}
