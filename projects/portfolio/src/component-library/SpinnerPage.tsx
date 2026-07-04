import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Spinner, type SpinnerColor, type SpinnerSize} from '@/app/components/Spinner/Spinner';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SIZES: Array<{value: SpinnerSize; label: string}> = [
  {value: 'small', label: 'Small'},
  {value: 'large', label: 'Large'},
];

const COLORS: Array<{value: SpinnerColor; label: string; description: string}> = [
  {value: 'neutral', label: 'Neutral', description: 'Use on light surfaces where the spinner sits next to standard text.'},
  {value: 'white', label: 'White', description: 'Use on brand-bold or dark surfaces where neutral would disappear.'},
];

const GENERIC_COLORS: Array<{value: SpinnerColor; label: string; description: string}> = [
  {value: 'brand', label: 'Brand', description: 'Brand-blue gradient for light surfaces.'},
  {value: 'white', label: 'White', description: 'White gradient for brand-bold or dark surfaces.'},
  {value: 'dark', label: 'Dark', description: 'Neutral gradient using the loading token.'},
];

export default function SpinnerPage() {
  const [size, setSize] = React.useState<SpinnerSize>('large');
  const [color, setColor] = React.useState<SpinnerColor>('neutral');
  const isDarkPreview = color === 'white';

  return (
    <PageWrapper
      title="Spinner"
      category="Core Components"
      description="Loading indicators for indeterminate processes. Available in two colors and two sizes."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview spinner size and color on light or brand-bold surfaces."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
              </div>
              <ButtonGroup aria-label="Spinner size">
                {SIZES.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={size === item.value ? 'primary' : 'secondary'}
                    aria-pressed={size === item.value}
                    onClick={() => setSize(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Color</Body>
              </div>
              <ButtonGroup aria-label="Spinner color">
                {COLORS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={color === item.value ? 'primary' : 'secondary'}
                    aria-pressed={color === item.value}
                    onClick={() => setColor(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard title="Preview" description={COLORS.find((item) => item.value === color)?.description}>
              <div
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  minHeight: 120,
                  padding: 16,
                  borderRadius: 8,
                  background: isDarkPreview
                    ? 'var(--ld-semantic-color-fill-brand-bold, #001e60)'
                    : 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
                }}
              >
                <Spinner size={size} color={color} a11yLabel={`${size} ${color} spinner`} />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Sizes" description="Use small in dense rows; use large for blocking page or modal loads.">
        <DocsGrid>
          {SIZES.map((item) => (
            <DocsCard key={item.value} title={item.label}>
              <div style={{display: 'grid', placeItems: 'center', padding: 16}}>
                <Spinner size={item.value} a11yLabel={`${item.label} spinner`} />
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Colors" description="Match the spinner color to the surrounding surface contrast.">
        <DocsGrid>
          {COLORS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <div
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  padding: 24,
                  borderRadius: 8,
                  background:
                    item.value === 'white'
                      ? 'var(--ld-semantic-color-fill-brand-bold, #001e60)'
                      : 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
                }}
              >
                <Spinner size="large" color={item.value} a11yLabel={`${item.label} spinner`} />
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Generic variant"
        description="A gradient ring with a rounded leading cap. Use brand on light surfaces, white on dark surfaces, and dark for a neutral treatment."
      >
        <DocsGrid>
          {GENERIC_COLORS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <div
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  padding: 24,
                  borderRadius: 8,
                  background:
                    item.value === 'white'
                      ? 'var(--ld-semantic-color-fill-brand-bold, #001e60)'
                      : 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
                }}
              >
                <Spinner
                  variant="generic"
                  size="large"
                  color={item.value}
                  a11yLabel={`${item.label} generic spinner`}
                />
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Spinner for indeterminate loads where the duration is unknown. Always provide an a11yLabel so screen reader users know something is in progress. Pick color by surface contrast — neutral on light, white on brand-bold and other dark backgrounds. For determinate progress, switch to Progress Indicator."
        defaultValue="size='large', color='neutral'"
      />
    </PageWrapper>
  );
}
