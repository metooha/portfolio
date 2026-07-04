import * as React from 'react';

import {AspectRatio} from '@/app/components/AspectRatio/AspectRatio';
import {Body} from '@/app/components/Text/Text';
import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const RATIO_OPTIONS: Array<{value: number; label: string; description: string}> = [
  {value: 1, label: '1 : 1', description: 'Square — avatars, tiles, app icons.'},
  {value: 4 / 3, label: '4 : 3', description: 'Classic photo / print.'},
  {value: 16 / 9, label: '16 : 9', description: 'Widescreen video and hero media.'},
  {value: 21 / 9, label: '21 : 9', description: 'Ultrawide cinematic frames.'},
  {value: 3 / 4, label: '3 : 4', description: 'Portrait photo / product card.'},
];

const PLACEHOLDER_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: 8,
  background: 'var(--ld-semantic-color-fill-brand-subtle, #ebf0ff)',
  display: 'grid',
  placeItems: 'center',
  color: 'var(--ld-semantic-color-text-subtle, #74767c)',
  fontSize: 13,
};

export default function AspectRatioPage() {
  const [ratio, setRatio] = React.useState<number>(16 / 9);
  const active = RATIO_OPTIONS.find((item) => item.value === ratio) ?? RATIO_OPTIONS[0];

  return (
    <PageWrapper
      title="Aspect Ratio"
      category="Core Components"
      description="Wrapper that locks a child to a fixed width-to-height ratio, regardless of how wide the parent gets."
    >
      <ExampleSection
        title="Component Configuration"
        description="Pick a ratio. The child stretches to fill the wrapper while keeping the same proportion."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Ratio</Body>
              </div>
              <ButtonGroup aria-label="Aspect ratio">
                {RATIO_OPTIONS.map((option) => (
                  <Button
                    key={option.label}
                    size="small"
                    variant={ratio === option.value ? 'primary' : 'secondary'}
                    aria-pressed={ratio === option.value}
                    onClick={() => setRatio(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard title={active.label} description={active.description}>
              <div style={{maxWidth: 'min(480px, 100%)'}}>
                <AspectRatio ratio={ratio}>
                  <div style={PLACEHOLDER_STYLE}>
                    <span>
                      {active.label} ({ratio.toFixed(3)})
                    </span>
                  </div>
                </AspectRatio>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Common ratios" description="Pick the ratio that matches the media or content footprint.">
        <DocsGrid>
          {RATIO_OPTIONS.map((option) => (
            <DocsCard key={option.label} title={option.label} description={option.description}>
              <AspectRatio ratio={option.value}>
                <div style={PLACEHOLDER_STYLE}>{option.label}</div>
              </AspectRatio>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use AspectRatio when a media slot, illustration, or placeholder must stay proportional as the surrounding column resizes. Pass the ratio as width / height (e.g., 16/9 for video, 1 for square). For fixed-size icons or avatars, use the component's own size prop instead — AspectRatio is for fluid containers."
        defaultValue="ratio={1}"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility guidelines</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            AspectRatio is a layout utility — accessibility responsibility lies with the consumer based on content type:
          </Body>
          <ul style={{margin: '8px 0 0', paddingLeft: 20, display: 'grid', gap: 6}}>
            <li><Body as="span" size="medium" color="subtle"><strong>{'<img>'}</strong> — always provide <code>alt</code>. Use a descriptive string for meaningful images; use <code>alt=""</code> (empty, not omitted) for decorative images.</Body></li>
            <li><Body as="span" size="medium" color="subtle"><strong>{'<video>'}</strong> — provide captions and/or a transcript.</Body></li>
            <li><Body as="span" size="medium" color="subtle"><strong>{'<iframe>'}</strong> — provide a descriptive <code>title</code> attribute.</Body></li>
            <li>
              <Body as="span" size="medium" color="subtle">
                <strong>CSS background images</strong> — if the image conveys meaning, add a visually hidden text node inside the container (<code>{'<span className="sr-only">'}</code>). If it is purely decorative, no additional markup is needed — adding empty or redundant text creates noise for screen reader users.
              </Body>
            </li>
          </ul>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
