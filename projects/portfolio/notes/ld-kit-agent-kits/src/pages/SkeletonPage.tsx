import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {Skeleton, SkeletonText, type SkeletonVariant} from '../components/Skeleton/Skeleton';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const VARIANTS: Array<{value: SkeletonVariant; label: string; description: string}> = [
  {value: 'rectangle', label: 'Rectangle', description: 'Use for images, banners, and dense content blocks.'},
  {value: 'rounded', label: 'Rounded', description: 'Use for text blocks, cards, and pill-shaped controls.'},
];

export default function SkeletonPage() {
  const [variant, setVariant] = React.useState<SkeletonVariant>('rounded');
  const [showText, setShowText] = React.useState(true);
  const [showImage, setShowImage] = React.useState(true);

  return (
    <PageWrapper
      title="Skeleton"
      category="Core Components"
      description="Loading placeholder animations for content that is still being fetched."
    >
      <ExampleSection
        title="Component Configuration"
        description="Mix Skeleton shapes with SkeletonText to draft realistic loading states."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Variant</Body>
              </div>
              <ButtonGroup aria-label="Skeleton variant">
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
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Show image block" checked={showImage} onChange={(event) => setShowImage(event.target.checked)} />
                <Checkbox label="Show text lines" checked={showText} onChange={(event) => setShowText(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title="Preview" description="Skeleton elements should mirror the final layout's rhythm.">
              <div role="img" aria-label="Loading, please wait" style={{display: 'grid', gap: 12}}>
                {showImage ? <Skeleton variant={variant} height="120px" width="100%" /> : null}
                {showText ? (
                  <>
                    <Skeleton variant="rounded" height={12} width="60%" />
                    <Skeleton variant="rounded" height={12} width="100%" />
                    <Skeleton variant="rounded" height={12} width="80%" />
                  </>
                ) : null}
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Variants" description="Each variant matches a different rounding system used elsewhere in the kit.">
        <DocsGrid>
          {VARIANTS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <div role="img" aria-label="Loading, please wait" style={{display: 'grid', gap: 12}}>
                <Skeleton variant={item.value} height="80px" width="100%" />
                <Skeleton variant={item.value} height="24px" width="60%" />
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Layouts" description="Compose Skeleton + SkeletonText to draft realistic loading shells.">
        <DocsGrid>
          <DocsCard title="Product card" description="Mirror an image-led card layout while data loads.">
            <div role="img" aria-label="Loading, please wait" style={{display: 'grid', gap: 12, maxWidth: 240}}>
              <Skeleton variant="rounded" height="160px" width="100%" />
              <Skeleton variant="rounded" height={12} width="80%" />
              <Skeleton variant="rounded" height={12} width="40%" />
            </div>
          </DocsCard>
          <DocsCard title="List row" description="Mirror an avatar + multi-line row.">
            <div role="img" aria-label="Loading, please wait" style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
              <Skeleton variant="rounded" height="40px" width="40px" />
              <div style={{flex: 1, display: 'grid', gap: 8}}>
                <Skeleton variant="rounded" height={12} width="60%" />
                <Skeleton variant="rounded" height={12} width="100%" />
                <Skeleton variant="rounded" height={12} width="80%" />
              </div>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Magic Skeleton"
        description="Use isMagic on Skeleton and SkeletonText when the placeholder represents AI-generated or agent-driven content. The shimmer gradient signals to users that something intelligent is loading."
      >
        <DocsGrid>
          <DocsCard title="Magic shape" description="Single Skeleton with isMagic shimmer animation.">
            <div role="img" aria-label="Loading, please wait" style={{display: 'grid', gap: 12}}>
              <Skeleton isMagic height="80px" width="100%" />
              <Skeleton isMagic height="80px" width="100%" variant="rounded" />
            </div>
          </DocsCard>
          <DocsCard title="Magic text" description="SkeletonText with isMagic applies staggered shimmer across lines.">
            <SkeletonText isMagic lines={3} />
          </DocsCard>
          <DocsCard title="Magic product card" description="Full card layout using isMagic for an AI-loading state.">
            <div role="img" aria-label="Loading, please wait" style={{display: 'grid', gap: 12, maxWidth: 240}}>
              <Skeleton isMagic variant="rounded" height="160px" width="100%" />
              <SkeletonText isMagic lines={2} />
            </div>
          </DocsCard>
          <DocsCard title="Magic list row" description="Avatar + text row with isMagic shimmer.">
            <div role="img" aria-label="Loading, please wait" style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
              <Skeleton isMagic variant="rounded" height="40px" width="40px" />
              <div style={{flex: 1}}>
                <SkeletonText isMagic lines={3} />
              </div>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Skeleton when the final layout's footprint is known so the page does not reflow once data arrives. Match shape, rough size, and spacing of the real content. Avoid skeletons for spinners or instantaneous loads — use Spinner or no indicator instead."
        defaultValue="variant='rounded'"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            Wrap each group of Skeleton elements in a container with <code>role="img"</code> and <code>aria-label="Content is loading here, please wait"</code>. This presents the entire loading placeholder as a single labelled image to assistive technology, preventing screen readers from announcing each individual skeleton shape.
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: '8px 0 0', lineHeight: '1.5'}}>
            <strong>High contrast mode:</strong> Skeleton uses CSS custom properties tied to the design token system. In Windows High Contrast Mode (Forced Colors), the shimmer gradient is suppressed and the skeleton shapes are rendered using system colors, maintaining sufficient contrast against the page background. No additional implementation is required — the component passes color contrast requirements in high contrast mode out of the box.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
