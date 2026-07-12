import * as React from 'react';
import {
  BeforeAfter,
  Eyebrow,
  ImageFull,
  Lead,
  NextGrid,
  QuoteBlock,
  SectionTitle,
  StatCards,
  StatsRow,
  TestimonialShowcase,
} from '@/app/components/CaseStudyPrimitives';
import { DocsCard, DocsGrid, ExampleSection, PageWrapper } from './shared';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <rect width="800" height="500" fill="#e9f1fe"/>
      <text x="400" y="260" text-anchor="middle" font-family="Inter, sans-serif" font-size="28" fill="#0053e2">Image</text>
    </svg>`,
  );

export default function CaseStudyPrimitivesPage() {
  return (
    <PageWrapper
      title="Case Study Primitives"
      category="Case Study Patterns"
      description="Shared building blocks for case study narrative sections: eyebrow + section title + lead copy, pull quotes, stat rows, and before/after comparisons. Used across the Everyday Sans, Airtable, Oportun, and Carbon Auto-Orientation case studies."
    >
      <ExampleSection title="Eyebrow + SectionTitle + Lead" description="The standard section-opening typography stack.">
        <DocsCard>
          <div className="flex flex-col gap-3 max-w-[660px]">
            <Eyebrow>Problem space</Eyebrow>
            <SectionTitle>The compromise we stopped making</SectionTitle>
            <Lead>
              Every new font weight came with a performance cost, so brand held back — visual hierarchy never
              reached its potential.
            </Lead>
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="QuoteBlock" description="Full-bleed brand pull-quote for testimonials or key takeaways.">
        <DocsCard>
          <QuoteBlock
            quote="The variable font ended that trade-off — permanently."
            attribution="Principal Designer, Living Design"
          />
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="TestimonialShowcase" description="A statement panel plus testimonial cards for adoption, pilot feedback, and customer quotes.">
        <DocsCard>
          <TestimonialShowcase
            statement={
              <>
                Innovative builders using AI tools collaboratively to create prototypes.
              </>
            }
            testimonials={[
              {
                role: 'Engineering Manager',
                team: 'Internal dev tools',
                initials: 'EM',
                quote: (
                  <>
                    Builder.io has significantly enhanced our team&apos;s productivity. <strong>Convert Figma designs into code</strong>, enabling us to accelerate our workflows.
                  </>
                ),
              },
              {
                role: 'Sr. Designer',
                team: 'Customer Product',
                initials: 'SD',
                quote: (
                  <>
                    It enables us to quickly create high-quality, data-driven prototypes that <strong>effectively showcase our commitment to customers.</strong>
                  </>
                ),
              },
              {
                role: 'Sr. Designer',
                team: 'B2B Product',
                initials: 'SD',
                quote: (
                  <>
                    Builder.io has been a game changer for our team... <strong>creates prototypes that closely mirror our Figma designs.</strong>
                  </>
                ),
              },
              {
                role: 'Sr. Designer',
                team: 'B2B Product',
                initials: 'SD',
                quote: (
                  <>
                    Builder.io has <strong>sped up Connect&apos;s prototyping process</strong> without starting from scratch.
                  </>
                ),
              },
            ]}
          />
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="StatsRow + StatCards" description="Two ways to surface headline metrics.">
        <DocsGrid>
          <DocsCard title="StatsRow (dark)" onDark style={{ background: '#0a0a0a' }}>
            <StatsRow
              stats={[
                { value: '38%', label: 'Faster page load' },
                { value: '4.6', label: 'Avg. user rating' },
                { value: '12', label: 'Weights unified' },
                { value: '0', label: 'Regressions shipped' },
              ]}
            />
          </DocsCard>
          <DocsCard title="StatCards">
            <StatCards
              stats={[
                { value: '3x', label: 'Faster handoff' },
                { value: '92%', label: 'Adoption after 6 months' },
                { value: '6', label: 'Teams onboarded' },
              ]}
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="BeforeAfter" description="Two-column comparison for design or process changes.">
        <DocsCard>
          <BeforeAfter
            before={[{ who: 'Design', title: 'Manual weight selection', description: 'Every screen re-litigated which static weight to ship.' }]}
            after={[{ who: 'Design', title: 'Variable font axis', description: 'One file, any weight, resolved at build time.' }]}
          />
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="NextGrid" description="What's-next roadmap cards with a when/status badge.">
        <DocsCard>
          <NextGrid
            items={[
              { when: 'Now', title: 'Roll out to mobile', description: 'Extend the variable font to iOS and Android.' },
              { when: 'Next', title: 'Italic axis', description: 'Explore an italic variant for editorial surfaces.', future: true },
            ]}
          />
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="ImageFull" description="Labeled, captioned image frame used throughout case study bodies.">
        <DocsCard>
          <ImageFull
            src={PLACEHOLDER_IMAGE}
            alt="Placeholder"
            label="Before / After"
            caption="Figure — replace with a real case study screenshot."
          />
        </DocsCard>
      </ExampleSection>
    </PageWrapper>
  );
}
