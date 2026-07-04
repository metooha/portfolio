import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button';
import {Checkbox} from '@/app/components/Checkbox';
import {Body} from '@/app/components/Text/Text';
import {RatingDisplay, type RatingDisplayColor, type RatingDisplaySize} from '@/app/components/RatingDisplay/RatingDisplay';
import {RatingStars} from '@/app/components/RatingStars/RatingStars';

import {
  ComponentConfigurationCard,
  DocsCard,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const RATING_LABELS: Record<number, string> = {
  0: 'Unrated',
  1: 'Very poor',
  2: 'Poor',
  3: 'Fair',
  4: 'Good',
  5: 'Excellent',
};

export default function RatingDisplayPage() {
  const [value, setValue] = React.useState(4);
  const [size, setSize] = React.useState<RatingDisplaySize>('small');
  const [color, setColor] = React.useState<RatingDisplayColor>('default');
  const [showCount, setShowCount] = React.useState(true);
  const [showText, setShowText] = React.useState(true);
  const [interactiveValue, setInteractiveValue] = React.useState(4);

  return (
    <PageWrapper
      title="Rating Display"
      category="Subsystem Components"
      description="Read-only and interactive rating patterns for product summaries, reviews, and compact commerce surfaces."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview rating value, size, inverse color, and supporting count or text content."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Value</Body>
                <ButtonGroup>
                  {[0, 1, 2, 3, 4, 5].map((item) => (
                    <Button key={item} size="small" variant={value === item ? 'primary' : 'secondary'} onClick={() => setValue(item)}>
                      {item}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Size</Body>
                <ButtonGroup>
                  <Button size="small" variant={size === 'small' ? 'primary' : 'secondary'} onClick={() => setSize('small')}>Small</Button>
                  <Button size="small" variant={size === 'medium' ? 'primary' : 'secondary'} onClick={() => setSize('medium')}>Medium</Button>
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Color</Body>
                <ButtonGroup>
                  <Button size="small" variant={color === 'default' ? 'primary' : 'secondary'} onClick={() => setColor('default')}>Default</Button>
                  <Button size="small" variant={color === 'inverse' ? 'primary' : 'secondary'} onClick={() => setColor('inverse')}>Inverse</Button>
                </ButtonGroup>
              </div>
              <Checkbox label="Show count" checked={showCount} onChange={(event) => setShowCount(event.target.checked)} />
              <Checkbox label="Show text" checked={showText} onChange={(event) => setShowText(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description={`Selected value: ${value} - ${RATING_LABELS[value]}`}>
              <div style={{padding: color === 'inverse' ? 16 : 0, borderRadius: 8, background: color === 'inverse' ? 'var(--ld-semantic-color-fill-inverse)' : undefined}}>
                <RatingDisplay
                  value={value}
                  size={size}
                  color={color}
                  count={showCount ? '(1.5k)' : undefined}
                  linkText={showCount ? 'Reviews' : undefined}
                  text={showText ? 'Text string' : undefined}
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Display Variants" description="Use Rating Display when stars are read-only and paired with supporting metadata.">
        {/* Force all variant cards onto a single row regardless of count. Each
            child gets an equal track via `1fr`; `minmax(0, 1fr)` lets cells
            shrink below their content's intrinsic width so wide labels like
            "(1.5k) Link | Text string" never expand the row past the
            container. */}
        <div
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: 'minmax(0, 1fr)',
            gap: 24,
            alignItems: 'stretch',
          }}
        >
          <DocsCard title="Small default">
            <RatingDisplay value={4} size="small" count="(1.5k)" linkText="Reviews" text="Text string" />
          </DocsCard>
          <DocsCard title="Medium default">
            <RatingDisplay value={4} size="medium" count="(1.5k)" linkText="Reviews" text="Text string" />
          </DocsCard>
          <DocsCard title="Inverse" description="Use inverse only on dark surfaces.">
            <div style={{padding: 16, borderRadius: 8, background: 'var(--ld-semantic-color-fill-inverse)'}}>
              <RatingDisplay value={2} color="inverse" count="(1.5k)" linkText="Reviews" text="Text string" />
            </div>
          </DocsCard>
        </div>
      </ExampleSection>

      <ExampleSection title="Interactive Rating" description="RatingStars handles user selection, renders the value label below the stars, and can clear by selecting the same star again.">
        <DocsCard title="Rating input" description={`Selected: ${interactiveValue} - ${RATING_LABELS[interactiveValue]}`}>
          <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center'}}>
            <RatingStars value={interactiveValue} onChange={setInteractiveValue} size="medium" />
            <Button variant="secondary" size="small" onClick={() => setInteractiveValue(0)}>Reset</Button>
          </div>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use Rating Display for summary metadata and RatingStars for user input. Keep the aria-label meaningful for read-only displays, and use inverse only when the surrounding surface is dark."
        defaultValue="value=0, size='small', color='default'"
      />
    </PageWrapper>
  );
}