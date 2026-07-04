import * as React from 'react';
import { Icon, SpotIcon, type SpotIconColor } from '@/app/components';
import { BulletList } from '@/app/components/BulletList';
import { CaseStudyHero } from '@/app/components/CaseStudyHero';
import { CaseStudyMeta } from '@/app/components/CaseStudyMeta';
import { ComparisonSlider } from '@/app/components/ComparisonSlider';
import { SectionHeading } from '@/app/components/SectionHeading';
import { ValuePropCard, ValuePropGrid } from '@/app/components/ValuePropCard';
import { DocsCard, DocsGrid, ExampleSection, PageWrapper } from './shared';

const HERO_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="600" viewBox="0 0 1440 600">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E8EDF5"/>
          <stop offset="100%" stop-color="#B8C4D4"/>
        </linearGradient>
      </defs>
      <rect width="1440" height="600" fill="url(#g)"/>
    </svg>`,
  );

function makeComparisonImage(label: string, fill: string) {
  return (
    'data:image/svg+xml,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1180" height="1200" viewBox="0 0 1180 1200">
        <rect width="1180" height="1200" fill="${fill}"/>
        <text x="590" y="600" text-anchor="middle" font-family="Inter, sans-serif" font-size="48" fill="#ffffff">${label}</text>
      </svg>`,
    )
  );
}

const META_ITEMS = [
  { label: 'Role', value: 'Lead Product Designer' },
  { label: 'Team', value: 'Design, engineering, and brand partners' },
  { label: 'Scope', value: 'Three product lines, two regions' },
  { label: 'Focus', value: 'Shared patterns, tokens, and documentation' },
];

const GOALS: Array<{ icon: string; color: SpotIconColor; description: string }> = [
  {
    icon: 'Grid',
    color: 'green',
    description: 'Establish a shared visual language that scales across web and mobile surfaces.',
  },
  {
    icon: 'Gear',
    color: 'orange',
    description: 'Reduce design-to-dev handoff time with documented, coded components.',
  },
  {
    icon: 'Map',
    color: 'teal',
    description: 'Give teams a migration path without blocking feature work.',
  },
];

function GoalSpotIcon({ icon, color }: { icon: string; color: SpotIconColor }) {
  return (
    <SpotIcon color={color} size="medium" shape="square">
      <Icon name={icon} decorative />
    </SpotIcon>
  );
}

export default function CaseStudyComponentsPage() {
  return (
    <PageWrapper
      title="Case Study Components"
      category="Patterns"
      description="Reusable building blocks for portfolio case studies: hero, metadata, section headings, bullet lists, value props, and before/after comparison sliders."
    >
      <ExampleSection title="CaseStudyHero" description="Full-width hero with parallax image and fluid display title.">
        <DocsCard>
          <CaseStudyHero
            image={HERO_IMAGE}
            title="Northstar Financial"
            titleColor="var(--ld-semantic-color-text, #1A2332)"
            className="!h-[220px] sm:!h-[280px] md:!h-[340px] rounded-lg overflow-hidden"
          />
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="CaseStudyMeta" description="Role, team, scope, and focus metadata in a two-column layout.">
        <DocsCard>
          <CaseStudyMeta items={META_ITEMS} />
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="SectionHeading" description="Horizontal and vertical layouts with optional numbered badges.">
        <DocsGrid>
          <DocsCard title="Vertical with description">
            <SectionHeading
              layout="vertical"
              title="Problem Space"
              description="Teams had grown quickly, each shipping with its own UI conventions."
            />
          </DocsCard>
          <DocsCard title="Horizontal with badge">
            <SectionHeading badge="1.0" badgeColor="yellow" title="Approach" />
          </DocsCard>
          <DocsCard title="Nested item">
            <SectionHeading
              layout="vertical"
              badge="A"
              badgeColor="green"
              titleSize="md"
              title="Foundations"
              description="Color, type, spacing, and iconography needed a single source of truth."
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="BulletList" description="Numbered bullet points with optional accent color override.">
        <DocsGrid>
          <DocsCard title="Default">
            <BulletList
              items={[
                { text: 'Inventory existing patterns across three product areas.' },
                { text: 'Align with engineering on token architecture and component APIs.' },
                { text: 'Define a phased rollout plan with squad champions.' },
              ]}
            />
          </DocsCard>
          <DocsCard title="Custom accent">
            <BulletList
              accentColor="#207442"
              items={[
                { text: 'Audit component usage in production surfaces.' },
                { text: 'Prioritize high-traffic flows for first migration.' },
              ]}
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="ValuePropGrid" description="Icon + description cards for goals and outcomes sections.">
        <DocsCard>
          <ValuePropGrid>
            {GOALS.map((goal) => (
              <ValuePropCard
                key={goal.icon}
                icon={<GoalSpotIcon icon={goal.icon} color={goal.color} />}
                description={goal.description}
              />
            ))}
          </ValuePropGrid>
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="ComparisonSlider"
        description="Draggable before/after comparison with synced scroll for tall screenshots."
      >
        <DocsCard>
          <ComparisonSlider
            leftImage={makeComparisonImage('Proposed', '#207442')}
            rightImage={makeComparisonImage('Current', '#74767C')}
            height={360}
            contentHeight={720}
            maxWidth={720}
            labels={{ left: 'Proposed', right: 'Current' }}
          />
        </DocsCard>
      </ExampleSection>
    </PageWrapper>
  );
}
