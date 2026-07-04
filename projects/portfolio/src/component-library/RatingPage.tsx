import * as React from 'react';

import {Button} from '@/app/components/Button/Button';
import {Rating} from '@/app/components/Rating/Rating';
import {RatingDisplay} from '@/app/components/RatingDisplay/RatingDisplay';
import {Body} from '@/app/components/Text/Text';
import {
  DocsCard,
  DocsGrid,
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

const inverseSurfaceStyle: React.CSSProperties = {
  background: 'var(--ld-semantic-color-fill-brand-bold, #001e60)',
  borderRadius: 8,
  padding: 20,
};

export default function RatingPage() {
  const [rating, setRating] = React.useState(0);

  return (
    <PageWrapper
      title="Rating"
      category="WCP Components"
      description="Interactive star rating for reviews and read-only rating display for product summaries."
    >
      <ExampleSection
        title="Interactive demo"
        description="Click a star to select a rating. Click the same star again to clear it back to 'Unrated'. Hover over stars to preview the label."
      >
        <DocsCard>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start'}}>
            <Rating value={rating} onChange={setRating} size="medium" />
            <Body as="p" size="small" color="subtle" style={{margin: 0}}>
              Selected: {rating} — {RATING_LABELS[rating]}
            </Body>
            <Button variant="secondary" size="small" onClick={() => setRating(0)}>
              Reset
            </Button>
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Two size variants — small and medium — adapt at the 900px breakpoint."
      >
        <DocsGrid>
          <DocsCard title="Small">
            <div style={{display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center'}}>
              {[0, 1, 2, 3, 4, 5].map((v) => (
                <Rating key={v} defaultValue={v} size="small" />
              ))}
            </div>
          </DocsCard>
          <DocsCard title="Medium">
            <div style={{display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center'}}>
              {[0, 1, 2, 3, 4, 5].map((v) => (
                <Rating key={v} defaultValue={v} size="medium" />
              ))}
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="States"
        description="Default, selected, and disabled states. Disabled prevents interaction and reduces opacity."
      >
        <DocsGrid minColumnWidth={200}>
          <DocsCard title="Default (Unrated)">
            <Rating defaultValue={0} />
          </DocsCard>
          <DocsCard title="With selection (4 stars)">
            <Rating defaultValue={4} />
          </DocsCard>
          <DocsCard title="Disabled (Unrated)">
            <Rating defaultValue={0} disabled />
          </DocsCard>
          <DocsCard title="Disabled (3 stars)">
            <Rating defaultValue={3} disabled />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Rating Display variants"
        description="Two sizes (small and medium) and two color schemes (default for light surfaces, inverse for dark backgrounds)."
      >
        <DocsGrid>
          <DocsCard title="Small — 0 stars">
            <RatingDisplay value={0} size="small" count="(1.5)" linkText="Link" text="Text string" />
          </DocsCard>
          <DocsCard title="Small — 2 stars">
            <RatingDisplay value={2} size="small" count="(1.5)" linkText="Link" text="Text string" />
          </DocsCard>
          <DocsCard title="Medium — 0 stars">
            <RatingDisplay value={0} size="medium" count="(1.5)" linkText="Link" text="Text string" />
          </DocsCard>
          <DocsCard title="Medium — 2 stars">
            <RatingDisplay value={2} size="medium" count="(1.5)" linkText="Link" text="Text string" />
          </DocsCard>
          <DocsCard title="Inverse — 0 stars">
            <div style={inverseSurfaceStyle}>
              <RatingDisplay value={0} size="small" color="inverse" count="(1.5)" linkText="Link" text="Text string" />
            </div>
          </DocsCard>
          <DocsCard title="Inverse — 2 stars">
            <div style={inverseSurfaceStyle}>
              <RatingDisplay value={2} size="small" color="inverse" count="(1.5)" linkText="Link" text="Text string" />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Rating for interactive review submissions and RatingDisplay for read-only product summaries. Choose the inverse color only when the display sits on a brand-bold or otherwise dark surface where the default star palette would not contrast."
        defaultValue="size='medium', value=0"
      />
    </PageWrapper>
  );
}
