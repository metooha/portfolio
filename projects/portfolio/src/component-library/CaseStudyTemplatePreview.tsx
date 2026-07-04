import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  GridColumn,
  Icon,
  MetricGroup,
  SpotIcon,
  type SpotIconColor,
} from '@/app/components';
import { CaseStudyTemplate } from '@/app/components/CaseStudyTemplate';
import { CaseStudyHero } from '@/app/components/CaseStudyHero';
import { SectionHeading } from '@/app/components/SectionHeading';
import { ValuePropCard, ValuePropGrid } from '@/app/components/ValuePropCard';
import { BulletList } from '@/app/components/BulletList';
import type { NavSection } from '@/app/components/CaseStudyPageNav';

const PREVIEW_HERO_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="870" viewBox="0 0 1440 870">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E8EDF5"/>
          <stop offset="45%" stop-color="#D4DCE8"/>
          <stop offset="100%" stop-color="#B8C4D4"/>
        </linearGradient>
      </defs>
      <rect width="1440" height="870" fill="url(#g)"/>
      <circle cx="1120" cy="180" r="120" fill="#C5D0E0" opacity="0.6"/>
      <circle cx="280" cy="620" r="180" fill="#AEBACA" opacity="0.35"/>
    </svg>`,
  );

const NAV_SECTIONS: NavSection[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Problem Space', href: '#problem-space' },
  { label: 'Goals', href: '#goals' },
  { label: 'Approach', href: '#approach' },
  { label: 'Outcomes', href: '#outcomes' },
];

const META_ITEMS = [
  { label: 'Role', value: 'Lead Product Designer' },
  { label: 'Team', value: 'Design, engineering, and brand partners' },
  { label: 'Scope', value: 'Three product lines, two regions' },
  { label: 'Focus', value: 'Shared patterns, tokens, and documentation' },
];

const PROBLEM_ITEMS = [
  {
    badge: 'A',
    title: 'Foundations',
    description: 'Color, type, spacing, and iconography needed a single source of truth.',
  },
  {
    badge: 'B',
    title: 'Components',
    description: 'Buttons, forms, and navigation varied by squad with no shared catalog.',
  },
  {
    badge: 'C',
    title: 'Documentation',
    description: 'Designers and engineers lacked clear guidance on when to reuse vs. extend.',
  },
] as const;

const GOALS = [
  {
    icon: 'Grid',
    color: 'green' as SpotIconColor,
    description: 'Establish a shared visual language that scales across web and mobile surfaces.',
  },
  {
    icon: 'Gear',
    color: 'orange' as SpotIconColor,
    description: 'Reduce design-to-dev handoff time with documented, coded components.',
  },
  {
    icon: 'Map',
    color: 'teal' as SpotIconColor,
    description: 'Give teams a migration path without blocking feature work.',
  },
];

const OUTCOME_METRICS = [
  { title: 'Components shipped', value: '48' },
  { title: 'Squads onboarded', value: '6' },
  { title: 'Pattern reuse', value: '70', unit: '%' },
];

const sectionStackStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ld-primitive-scale-space-300, 32px)',
  width: '100%',
};

const subtleSurfaceStyle: React.CSSProperties = {
  background: 'var(--ld-semantic-color-surface-subtle, #f7f8f8)',
  borderRadius: 'var(--ld-primitive-scale-border-radius-200, 16px)',
  width: '100%',
};

function OverviewLogo() {
  return (
    <div
      aria-hidden
      className="size-full"
      style={{
        background: 'var(--ld-semantic-color-border, #dedede)',
        borderRadius: '8px',
      }}
    />
  );
}

function MediaPlaceholder() {
  return (
    <div
      aria-hidden
      className="w-full"
      style={{
        aspectRatio: '4 / 3',
        minHeight: 280,
        background: 'var(--ld-semantic-color-border, #dedede)',
        borderRadius: 'var(--ld-primitive-scale-border-radius-200, 16px)',
      }}
    />
  );
}

function GoalSpotIcon({ icon, color }: { icon: string; color: SpotIconColor }) {
  return (
    <SpotIcon color={color} size="medium" shape="square">
      <Icon name={icon} decorative />
    </SpotIcon>
  );
}

function CaseStudyTemplateContent() {
  return (
    <div className="relative shrink-0 w-full overflow-x-hidden">
      <div className="flex flex-row items-stretch justify-center w-full">
        <div className="flex flex-col items-stretch w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[68px] relative">
          <div
            className="flex flex-1 flex-col items-stretch min-h-px w-full max-w-full min-w-0 relative"
            style={{ gap: 'var(--ld-primitive-scale-space-500, 80px)' }}
          >
            <section id="problem-space" style={sectionStackStyle}>
              <SectionHeading
                layout="vertical"
                title="Problem Space"
                description="Northstar's product teams had grown quickly, each shipping with its own UI conventions. Patterns diverged across dashboards, onboarding, and settings—slowing delivery and making the experience feel fragmented for customers moving between products."
              />
              <Card size="small" UNSAFE_style={subtleSurfaceStyle}>
                <CardContent
                  UNSAFE_style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--ld-primitive-scale-space-300, 24px)',
                    padding: 'var(--ld-primitive-scale-space-300, 32px)',
                  }}
                >
                  {PROBLEM_ITEMS.map((item) => (
                    <SectionHeading
                      key={item.badge}
                      layout="vertical"
                      badge={item.badge}
                      badgeColor="green"
                      title={item.title}
                      titleSize="md"
                      description={item.description}
                    />
                  ))}
                </CardContent>
              </Card>
            </section>

            <section id="goals" style={sectionStackStyle}>
              <SectionHeading layout="horizontal" titleSize="lg" title="Goals" />
              <ValuePropGrid>
                {GOALS.map((goal) => (
                  <ValuePropCard
                    key={goal.icon}
                    icon={<GoalSpotIcon icon={goal.icon} color={goal.color} />}
                    description={goal.description}
                  />
                ))}
              </ValuePropGrid>
            </section>

            <section id="approach" style={sectionStackStyle}>
              <SectionHeading badge="1.0" badgeColor="yellow" title="Approach" />
              <Grid hasGutter>
                <GridColumn sm={12} lg={6}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--ld-primitive-scale-space-300, 32px)',
                      paddingBlock: 'var(--ld-primitive-scale-space-200, 24px)',
                    }}
                  >
                    <SectionHeading
                      layout="vertical"
                      titleSize="md"
                      title="Audit &amp; alignment"
                    />
                    <BulletList
                      items={[
                        { text: 'Inventory existing patterns across three product areas and rank by reuse potential.' },
                        { text: 'Align with engineering on token architecture and component API constraints.' },
                        { text: 'Define a phased rollout plan with squad champions in each product line.' },
                      ]}
                    />
                  </div>
                </GridColumn>
                <GridColumn sm={12} lg={6}>
                  <MediaPlaceholder />
                </GridColumn>
              </Grid>
            </section>

            <section id="outcomes" style={sectionStackStyle}>
              <SectionHeading
                layout="vertical"
                title="Outcomes"
                description="Within two release cycles, teams adopted the core token set and a starter component library. New feature work reused shared patterns 70% of the time, and onboarding time for designers joining the program dropped significantly."
              />
              <MetricGroup
                metrics={OUTCOME_METRICS.map((metric) => ({
                  title: metric.title,
                  value: metric.value,
                  unit: metric.unit,
                  variant: 'neutral' as const,
                }))}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CaseStudyTemplatePreview() {
  return (
    <div
      className="case-study-template-preview"
      style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}
    >
      <CaseStudyTemplate
        hero={(
          <CaseStudyHero
            image={PREVIEW_HERO_IMAGE}
            title="Northstar Financial"
            titleColor="var(--ld-semantic-color-text, #1A2332)"
            className="!h-[220px] sm:!h-[280px] md:!h-[340px] lg:!h-[380px] xl:!h-[420px]"
          />
        )}
        overviewLogo={<OverviewLogo />}
        overviewClient="Northstar Financial"
        overviewCategory="Design Systems, Product Design"
        overviewTitle="Building a cohesive design system for multi-product rollout"
        overviewDescription="Northstar needed a unified experience across banking, investing, and insurance products. I led the systems work—defining tokens, component standards, and a documentation model teams could adopt without pausing roadmap delivery."
        metaItems={META_ITEMS}
        navSections={NAV_SECTIONS}
        navAccentColor="var(--ld-semantic-color-text-positive, #207442)"
      >
        <CaseStudyTemplateContent />
      </CaseStudyTemplate>
    </div>
  );
}
