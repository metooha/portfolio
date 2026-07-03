import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {ProgressTracker, ProgressTrackerItem, type ProgressTrackerVariant} from '../components/ProgressTracker/ProgressTracker';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const VARIANTS: Array<{value: ProgressTrackerVariant; label: string; description: string}> = [
  {value: 'info', label: 'Info', description: 'Default tracker for neutral flow progress.'},
  {value: 'success', label: 'Success', description: 'Use when the flow has completed successfully.'},
  {value: 'warning', label: 'Warning', description: 'Use when the current step needs attention.'},
  {value: 'error', label: 'Error', description: 'Use when the flow is blocked or failed.'},
];

const STEPS = ['Setup', 'Details', 'Review', 'Launch'];

function TrackerExample({activeIndex, variant}: {activeIndex: number; variant: ProgressTrackerVariant}) {
  return (
    <ProgressTracker activeIndex={activeIndex} variant={variant}>
      {STEPS.map((step) => (
        <ProgressTrackerItem key={step}>{step}</ProgressTrackerItem>
      ))}
    </ProgressTracker>
  );
}

export default function ProgressTrackerPage() {
  const [activeIndex, setActiveIndex] = React.useState(1);
  const [variant, setVariant] = React.useState<ProgressTrackerVariant>('info');
  const activeVariant = VARIANTS.find((item) => item.value === variant) ?? VARIANTS[0];

  return (
    <PageWrapper
      title="Progress Tracker"
      category="Core Components"
      description="Step-by-step progress visualization for multi-step processes and workflows."
    >
      <ExampleSection
        title="Component Configuration"
        description="Adjust the current step and semantic state for a multi-step workflow."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Current step</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  activeIndex is zero-based and clamps to the available steps.
                </Body>
              </div>
              <ButtonGroup aria-label="Progress tracker active step">
                {STEPS.map((step, index) => (
                  <Button
                    key={step}
                    size="small"
                    variant={activeIndex === index ? 'primary' : 'secondary'}
                    aria-pressed={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                  >
                    {step}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Variant</Body>
              </div>
              <ButtonGroup aria-label="Progress tracker variant">
                {VARIANTS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={variant === item.value ? 'primary' : 'secondary'}
                    aria-pressed={variant === item.value}
                    onClick={() => setVariant(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard title={`${activeVariant.label} tracker`} description={activeVariant.description}>
              <TrackerExample activeIndex={activeIndex} variant={variant} />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Variants" description="Each variant communicates a different flow state.">
        <DocsGrid>
          {VARIANTS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <TrackerExample activeIndex={1} variant={item.value} />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Progress Tracker for multi-step workflows where users benefit from seeing the entire path. Keep step labels short and verb-led when possible. Use success when the flow has completed end-to-end, warning when the current step needs user attention, and error when the flow is blocked."
        defaultValue="activeIndex=0, variant='info'"
      />
    </PageWrapper>
  );
}
