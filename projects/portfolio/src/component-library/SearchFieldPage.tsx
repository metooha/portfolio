import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {SearchField, type SearchFieldSize} from '@/app/components/SearchField/SearchField';
import {ComponentConfigurationCard, DocsCard, ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const SIZES: SearchFieldSize[] = ['xsmall', 'small', 'medium', 'large'];

export default function SearchFieldPage() {
  const [value, setValue] = React.useState('');
  const [size, setSize] = React.useState<SearchFieldSize>('large');
  const [rounded, setRounded] = React.useState(false);

  return (
    <PageWrapper
      title="Search Field"
      category="Core Components"
      description="A pill-shaped search input with a leading magnifier, optional voice and barcode actions, and a slide-in Cancel affordance when active."
    >
      <ExampleSection title="Component Configuration" description="Adjust the size and corner style.">
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
                <ButtonGroup aria-label="Search field size">
                  {SIZES.map((s) => (
                    <Button key={s} size="small" variant={size === s ? 'primary' : 'secondary'} aria-pressed={size === s} onClick={() => setSize(s)}>{s}</Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Corner style</Body>
                <ButtonGroup aria-label="Corner style">
                  <Button size="small" variant={!rounded ? 'primary' : 'secondary'} aria-pressed={!rounded} onClick={() => setRounded(false)}>Default</Button>
                  <Button size="small" variant={rounded ? 'primary' : 'secondary'} aria-pressed={rounded} onClick={() => setRounded(true)}>Rounded</Button>
                </ButtonGroup>
              </div>
            </>
          }
          preview={
            <DocsCard title="Search">
              <SearchField
                value={value}
                onChange={setValue}
                size={size}
                cornerStyle={rounded ? 'rounded' : 'default'}
                placeholder="Search products"
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Without voice / barcode" description="Hide the trailing actions when they don't apply.">
        <SearchField value="" onChange={() => {}} showMic={false} showBarcode={false} placeholder="Search" />
      </ExampleSection>

      <ExampleSection title="Disabled">
        <SearchField value="" onChange={() => {}} disabled placeholder="Search unavailable" />
      </ExampleSection>

      <GuidelinesSection
        description="Use Search Field for product or content search, typically anchored in a header or at the top of a results view. Keep the placeholder action-oriented ('Search products'). Only show the mic and barcode actions on surfaces that actually support them."
        defaultValue="size='large'  cornerStyle='default'"
      />
    </PageWrapper>
  );
}
