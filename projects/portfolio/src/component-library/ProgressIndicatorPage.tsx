import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {ProgressIndicator, type ProgressIndicatorVariant} from '@/app/components/ProgressIndicator/ProgressIndicator';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const VARIANTS: Array<{value: ProgressIndicatorVariant; label: string; description: string}> = [
  {value: 'info', label: 'Info', description: 'Default progress for neutral work.'},
  {value: 'success', label: 'Success', description: 'Completed or healthy progress.'},
  {value: 'warning', label: 'Warning', description: 'Progress that needs attention.'},
  {value: 'error', label: 'Error', description: 'Blocked or failed progress.'},
];

const VALUES = [0, 25, 60, 90, 100];

const CATEGORY_ROWS = [
  {label: 'Category', valueText: '$100,000 GMV', valueLabel: '100%', value: 100},
  {label: 'Category', valueText: '$100,000 GMV', valueLabel: '75%', value: 75},
  {label: 'Category', valueText: '$100,000 GMV', valueLabel: '50%', value: 50},
  {label: 'Category', valueText: '$100,000 GMV', valueLabel: '25%', value: 25},
  {label: 'Category', valueText: '$100,000 GMV', valueLabel: '--%', value: 8},
];

export default function ProgressIndicatorPage() {
  const [value, setValue] = React.useState(60);
  const [variant, setVariant] = React.useState<ProgressIndicatorVariant>('info');
  const activeVariant = VARIANTS.find((item) => item.value === variant) ?? VARIANTS[0];

  return (
    <PageWrapper
      title="Progress Indicator"
      category="Core Components"
      description="Linear progress indicators for loading states and determinate operations."
    >
      <ExampleSection
        title="Component Configuration"
        description="Adjust completion and semantic variant for a determinate loading state."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Value</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Progress uses min 0, max 100, and an explicit value label.
                </Body>
              </div>
              <ButtonGroup aria-label="Progress value">
                {VALUES.map((item) => (
                  <Button
                    key={item}
                    size="small"
                    variant={value === item ? 'primary' : 'secondary'}
                    aria-pressed={value === item}
                    onClick={() => setValue(item)}
                  >
                    {item}%
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Variant</Body>
              </div>
              <ButtonGroup aria-label="Progress variant">
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
            <DocsCard title={`${activeVariant.label} preview`} description={activeVariant.description}>
              <ProgressIndicator
                label={`${activeVariant.label} progress`}
                value={value}
                valueLabel={`${value}%`}
                variant={variant}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Variants" description="Each variant communicates a different progress state.">
        <DocsGrid>
          {VARIANTS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <ProgressIndicator label={item.label} value={60} valueLabel="60%" variant={item.value} />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Category layout"
        description="The category layout adds a leading accent dot, an inline label, a secondary value, and an emphasized value label above the track."
      >
        <DocsCard title="Linear progress — horizontal" description="Category breakdown with GMV and completion percentage.">
          <div style={{display: 'grid', gap: 16}}>
            {CATEGORY_ROWS.map((row, index) => (
              <ProgressIndicator
                key={index}
                layout="category"
                label={row.label}
                value={row.value}
                valueLabel={row.valueLabel}
                valueText={row.valueText}
              />
            ))}
          </div>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use Progress Indicator for determinate operations where the value is known. Provide a meaningful label and an explicit valueLabel for screen reader users. Pick the variant that matches the underlying state — success for completion, warning for slowdown, error for failure — instead of always defaulting to info."
        defaultValue="value=0, variant='info'"
      />
    </PageWrapper>
  );
}
