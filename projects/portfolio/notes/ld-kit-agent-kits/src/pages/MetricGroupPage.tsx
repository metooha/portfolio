import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button';
import {Body} from '../components/Text/Text';
import {MetricGroup} from '../components/MetricGroup';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const TWO_METRICS = [
  {title: 'Total Sales', value: '$24,500', unit: 'USD'},
  {title: 'Orders', value: '1,340', variant: 'positiveUp' as const, textLabel: '+12% vs last week'},
];

const THREE_METRICS = [
  {title: 'Sessions', value: '8.4K', variant: 'positiveUp' as const, textLabel: '+4%'},
  {title: 'Conversions', value: '932', variant: 'neutral' as const},
  {title: 'Bounce', value: '23%', variant: 'negativeUp' as const, textLabel: '+2%'},
];

type MetricCount = 2 | 3;

export default function MetricGroupPage() {
  const [count, setCount] = React.useState<MetricCount>(2);

  return (
    <PageWrapper
      title="Metric Group"
      category="Subsystem Components"
      description="A compact group of two or three Metric components separated by vertical dividers for dashboard and summary surfaces."
    >
      <ExampleSection
        title="Component Configuration"
        description="Switch between the supported two-metric and three-metric layouts."
      >
        <ComponentConfigurationCard
          controls={
            <div style={{display: 'grid', gap: 8}}>
              <Body as="span" size="small" weight="alt">Metric count</Body>
              <ButtonGroup>
                <Button size="small" variant={count === 2 ? 'primary' : 'secondary'} onClick={() => setCount(2)}>Two</Button>
                <Button size="small" variant={count === 3 ? 'primary' : 'secondary'} onClick={() => setCount(3)}>Three</Button>
              </ButtonGroup>
            </div>
          }
          preview={
            <DocsCard title="Preview" description="MetricGroup trims to a maximum of three metrics.">
              <MetricGroup metrics={count === 2 ? TWO_METRICS : THREE_METRICS} />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Layouts" description="Use exactly two or three metrics so the comparison stays legible.">
        <DocsGrid>
          <DocsCard title="Two metrics" description="Best for paired KPIs on a focused card.">
            <MetricGroup metrics={TWO_METRICS} />
          </DocsCard>
          <DocsCard title="Three metrics" description="Maximum density for compact dashboards.">
            <MetricGroup metrics={THREE_METRICS} />
          </DocsCard>
          <DocsCard title="Narrow width" description="Verify that labels remain scannable in constrained spaces.">
            <div style={{maxWidth: 360}}>
              <MetricGroup metrics={TWO_METRICS} />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Metric Group when the metrics are peers. Do not mix unrelated KPIs, avoid more than three values, and keep supporting labels concise enough to scan in dense layouts."
        defaultValue="metrics.slice(0, 3)"
      />
    </PageWrapper>
  );
}