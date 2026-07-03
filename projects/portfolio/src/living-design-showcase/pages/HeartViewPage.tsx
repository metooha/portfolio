import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {HeartView} from '@/living-design/components/HeartView/HeartView';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type HeartSize = 'responsive' | 'small' | 'medium';
type CalloutPosition = 'left' | 'right' | 'bottom' | 'top';

function ProductTile({
  name,
  price,
  activated,
  onChange,
}: {
  name: string;
  price: string;
  activated: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: 180,
        border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: 156,
          background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Body as="span" size="small" color="subtle">Product image</Body>
      </div>
      <div style={{position: 'absolute', top: 8, right: 8}}>
        <HeartView size="small" activated={activated} onChange={onChange} listName="Weekly list" />
      </div>
      <div style={{padding: 12}}>
        <Body as="p" size="small" weight="alt" style={{margin: 0}}>{name}</Body>
        <Body as="p" size="small" color="subtle" style={{margin: '2px 0 0'}}>{price}</Body>
      </div>
    </div>
  );
}

export default function HeartViewPage() {
  const [size, setSize] = React.useState<HeartSize>('responsive');
  const [activated, setActivated] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [calloutPosition, setCalloutPosition] = React.useState<CalloutPosition>('left');
  const [tile1, setTile1] = React.useState(false);
  const [tile2, setTile2] = React.useState(true);
  const [tile3, setTile3] = React.useState(false);

  return (
    <PageWrapper
      title="Heart View"
      category="WCP Components"
      description="A favorites toggle button with responsive sizing, pressed state, and an optional hover callout for product wishlists."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview controlled activation, size, disabled state, and callout placement."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Size</Body>
                <ButtonGroup aria-label="Heart view size">
                  {(['responsive', 'small', 'medium'] as HeartSize[]).map((item) => (
                    <Button key={item} size="small" variant={size === item ? 'primary' : 'secondary'} onClick={() => setSize(item)}>
                      {item}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Callout position</Body>
                <ButtonGroup aria-label="Callout position">
                  {(['left', 'right', 'bottom', 'top'] as CalloutPosition[]).map((item) => (
                    <Button key={item} size="small" variant={calloutPosition === item ? 'primary' : 'secondary'} onClick={() => setCalloutPosition(item)}>
                      {item}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <Checkbox label="Activated" checked={activated} onChange={(event) => setActivated(event.target.checked)} />
              <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="Hover on desktop to see the callout placement.">
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120}}>
                <HeartView
                  size={size === 'responsive' ? undefined : size}
                  activated={activated}
                  onChange={setActivated}
                  disabled={disabled}
                  calloutPosition={calloutPosition}
                  listName="Weekly list"
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="States" description="Two size variants and four interaction states for each size.">
        <DocsGrid>
          <DocsCard title="Medium (desktop)" description="Used at 900px+ widths.">
            <div style={{display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap'}}>
              <div style={{textAlign: 'center'}}>
                <HeartView size="medium" activated={false} onChange={() => {}} />
                <Body as="p" size="small" color="subtle" style={{margin: '6px 0 0'}}>Enabled</Body>
              </div>
              <div style={{textAlign: 'center'}}>
                <HeartView size="medium" activated onChange={() => {}} />
                <Body as="p" size="small" color="subtle" style={{margin: '6px 0 0'}}>Activated</Body>
              </div>
              <div style={{textAlign: 'center'}}>
                <HeartView size="medium" disabled />
                <Body as="p" size="small" color="subtle" style={{margin: '6px 0 0'}}>Disabled</Body>
              </div>
              <div style={{textAlign: 'center'}}>
                <HeartView size="medium" disabled defaultActivated />
                <Body as="p" size="small" color="subtle" style={{margin: '6px 0 0'}}>Disabled + active</Body>
              </div>
            </div>
          </DocsCard>
          <DocsCard title="Small (mobile)" description="Used below 900px viewports.">
            <div style={{display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap'}}>
              <div style={{textAlign: 'center'}}>
                <HeartView size="small" activated={false} onChange={() => {}} />
                <Body as="p" size="small" color="subtle" style={{margin: '6px 0 0'}}>Enabled</Body>
              </div>
              <div style={{textAlign: 'center'}}>
                <HeartView size="small" activated onChange={() => {}} />
                <Body as="p" size="small" color="subtle" style={{margin: '6px 0 0'}}>Activated</Body>
              </div>
              <div style={{textAlign: 'center'}}>
                <HeartView size="small" disabled />
                <Body as="p" size="small" color="subtle" style={{margin: '6px 0 0'}}>Disabled</Body>
              </div>
              <div style={{textAlign: 'center'}}>
                <HeartView size="small" disabled defaultActivated />
                <Body as="p" size="small" color="subtle" style={{margin: '6px 0 0'}}>Disabled + active</Body>
              </div>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Responsive default" description="When no size prop is set, the button uses small below 900px and medium at 900px and above.">
        <DocsCard>
          <div style={{display: 'flex', gap: 32, alignItems: 'center'}}>
            <div style={{textAlign: 'center'}}>
              <HeartView defaultActivated={false} />
              <Body as="p" size="small" color="subtle" style={{margin: '6px 0 0'}}>Inactive</Body>
            </div>
            <div style={{textAlign: 'center'}}>
              <HeartView defaultActivated />
              <Body as="p" size="small" color="subtle" style={{margin: '6px 0 0'}}>Activated</Body>
            </div>
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="In context — product tile" description="Heart View is usually anchored to the top-right of product imagery.">
        <DocsCard>
          <div style={{display: 'flex', gap: 20, flexWrap: 'wrap'}}>
            <ProductTile name="Ceramic Vase" price="$24.99" activated={tile1} onChange={setTile1} />
            <ProductTile name="Linen Throw" price="$39.00" activated={tile2} onChange={setTile2} />
            <ProductTile name="Scented Candle" price="$18.50" activated={tile3} onChange={setTile3} />
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="Callout positions" description="Hover over each heart to see the callout direction.">
        <DocsGrid minColumnWidth={180}>
          {(['left', 'right', 'bottom'] as const).map((pos) => (
            <DocsCard key={pos} title={pos.charAt(0).toUpperCase() + pos.slice(1)}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16}}>
                <HeartView calloutPosition={pos} defaultActivated={false} />
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Heart View for favorites and saved-list actions only. Provide a specific aria-label when the default add/remove wording is not enough, and position callouts so they do not cover nearby product actions."
        defaultValue="size=responsive, calloutPosition='left'"
      />
    </PageWrapper>
  );
}
