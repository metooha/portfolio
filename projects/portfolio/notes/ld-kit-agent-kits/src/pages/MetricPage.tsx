import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {Metric, type MetricVariant} from '../components/Metric/Metric';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const METRIC_VARIANTS: Array<{
  variant: MetricVariant;
  label: string;
  description: string;
  title: string;
  value: string;
  unit?: string;
  timescope: string;
  textLabel: string;
}> = [
  {
    variant: 'neutral',
    label: 'Neutral',
    description: 'Use when the value is informational and does not imply good or bad movement.',
    title: 'Inventory availability',
    value: '94',
    unit: '%',
    timescope: 'Today',
    textLabel: 'Goal: 90%',
  },
  {
    variant: 'positiveUp',
    label: 'Positive up',
    description: 'Use when an increase is a good outcome, such as revenue or conversion lift.',
    title: 'Revenue',
    value: '$24.8K',
    timescope: 'vs. last week',
    textLabel: '+12.4% from $22.1K',
  },
  {
    variant: 'positiveDown',
    label: 'Positive down',
    description: 'Use when a decrease is a good outcome, such as lower costs or fewer errors.',
    title: 'Cost per order',
    value: '$4.20',
    timescope: 'vs. last month',
    textLabel: '-15% from $4.95',
  },
  {
    variant: 'negativeUp',
    label: 'Negative up',
    description: 'Use when an increase is a bad outcome, such as churn or response time rising.',
    title: 'Response time',
    value: '842',
    unit: 'ms',
    timescope: 'Last hour',
    textLabel: '+18% from 712ms',
  },
  {
    variant: 'negativeDown',
    label: 'Negative down',
    description: 'Use when a decrease is a bad outcome, such as traffic or margin falling.',
    title: 'Daily active users',
    value: '48.3K',
    timescope: 'vs. yesterday',
    textLabel: '-4.7% from 50.7K',
  },
];

const BUSINESS_METRICS = [
  {title: 'Total impressions', value: '1.2M'},
  {title: 'Click-through rate', value: '3.4', unit: '%'},
  {title: 'Conversions', value: '842'},
  {title: 'Revenue', value: '$12,450'},
];

export default function MetricPage() {
  const [variant, setVariant] = React.useState<MetricVariant>('neutral');
  const [showUnit, setShowUnit] = React.useState(true);
  const [showLabel, setShowLabel] = React.useState(true);
  const active = METRIC_VARIANTS.find((item) => item.variant === variant) ?? METRIC_VARIANTS[0];

  return (
    <PageWrapper
      title="Metric"
      category="Core Components"
      description="Display critical data points with trend indicators, units, and contextual labels."
    >
      <ExampleSection
        title="Component Configuration"
        description="Switch variants and toggle the unit / context label to preview Metric layouts."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Variant</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Pick the variant that matches the desired direction of change.
                </Body>
              </div>
              <ButtonGroup aria-label="Metric variant">
                {METRIC_VARIANTS.map((item) => (
                  <Button
                    key={item.variant}
                    size="small"
                    variant={variant === item.variant ? 'primary' : 'secondary'}
                    aria-pressed={variant === item.variant}
                    onClick={() => setVariant(item.variant)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Show unit" checked={showUnit} onChange={(event) => setShowUnit(event.target.checked)} />
                <Checkbox label="Show context label" checked={showLabel} onChange={(event) => setShowLabel(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={active.label} description={active.description}>
              <Metric
                title={active.title}
                value={active.value}
                unit={showUnit ? active.unit : undefined}
                timescope={active.timescope}
                textLabel={showLabel ? active.textLabel : undefined}
                variant={active.variant}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Variants" description="Each variant communicates a different direction-of-change sentiment.">
        <DocsGrid>
          {METRIC_VARIANTS.map((item) => (
            <DocsCard key={item.variant} title={item.label} description={item.description}>
              <Metric
                title={item.title}
                value={item.value}
                unit={item.unit}
                timescope={item.timescope}
                textLabel={item.textLabel}
                variant={item.variant}
              />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Dashboard layout"
        description="Use a consistent grid when metrics represent peer business KPIs."
      >
        <DocsGrid minColumnWidth={200}>
          {BUSINESS_METRICS.map((item) => (
            <DocsCard key={item.title}>
              <Metric title={item.title} value={item.value} unit={item.unit} />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Pick the variant that matches the sentiment of the change — not just the math. A drop in cost is positive, a drop in active users is negative. Use a short timescope and a specific text label so the metric tells a story at a glance. Keep peer metrics in a consistent grid so users can compare values quickly."
        defaultValue="variant='neutral'"
      />
    </PageWrapper>
  );
}
