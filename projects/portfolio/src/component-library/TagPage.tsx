import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {StarIcon} from '@/app/components/Icons/Icons';
import {Tag, type TagColor, type TagSize, type TagVariant} from '@/app/components/Tag/Tag';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const TAG_VARIANTS: Array<{variant: TagVariant; label: string; description: string}> = [
  {variant: 'primary', label: 'Primary', description: 'Use for the strongest non-interactive label emphasis.'},
  {variant: 'secondary', label: 'Secondary', description: 'Use for most item attributes and status labels.'},
  {variant: 'tertiary', label: 'Tertiary', description: 'Use for the lightest emphasis in dense layouts.'},
];

const TAG_COLORS: Array<{color: TagColor; label: string}> = [
  {color: 'brand', label: 'Brand'},
  {color: 'info', label: 'Info'},
  {color: 'positive', label: 'Positive'},
  {color: 'warning', label: 'Warning'},
  {color: 'negative', label: 'Negative'},
  {color: 'gray', label: 'Gray'},
];

const TAG_SIZES: Array<{size: TagSize; label: string}> = [
  {size: 'medium', label: 'Medium'},
  {size: 'small', label: 'Small'},
];

const EXTENDED_COLORS: TagColor[] = [
  'blue',
  'brandBold',
  'cyan',
  'edited',
  'green',
  'neutral',
  'orange',
  'pink',
  'purple',
  'red',
  'spark',
  'teal',
  'yellow',
];

function TagPreview({
  variant,
  color,
  size,
  showLeading,
  children,
}: {
  variant: TagVariant;
  color: TagColor;
  size?: TagSize;
  showLeading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Tag
      variant={variant}
      color={color}
      size={size}
      leading={showLeading ? <StarIcon decorative /> : undefined}
    >
      {children}
    </Tag>
  );
}

export default function TagPage() {
  const [variant, setVariant] = React.useState<TagVariant>('secondary');
  const [color, setColor] = React.useState<TagColor>('brand');
  const [size, setSize] = React.useState<TagSize>('medium');
  const [showLeading, setShowLeading] = React.useState(false);
  const selectedVariant = TAG_VARIANTS.find((item) => item.variant === variant) ?? TAG_VARIANTS[1];
  const selectedColor = TAG_COLORS.find((item) => item.color === color)?.label ?? color;

  return (
    <PageWrapper
      title="Tag"
      category="Core Components"
      description="Non-interactive labels that highlight item attributes, fulfillment status, or short metadata."
    >
      <ExampleSection title="Component Configuration" description="Preview tag variant, color, and optional leading icon.">
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Variant
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the emphasis level for a non-interactive label.
                </Body>
              </div>
              <ButtonGroup aria-label="Tag variant">
                {TAG_VARIANTS.map((item) => (
                  <Button
                    key={item.variant}
                    size="small"
                    variant={variant === item.variant ? 'primary' : 'secondary'}
                    aria-pressed={variant === item.variant}
                    onClick={() => setVariant(item.variant)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Color
                </Body>
                <ButtonGroup aria-label="Tag color">
                  {TAG_COLORS.map((item) => (
                    <Button
                      key={item.color}
                      size="small"
                      variant={color === item.color ? 'primary' : 'secondary'}
                      aria-pressed={color === item.color}
                      onClick={() => setColor(item.color)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Size
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Use small for dense layouts; medium is the default.
                </Body>
                <ButtonGroup aria-label="Tag size">
                  {TAG_SIZES.map((item) => (
                    <Button
                      key={item.size}
                      size="small"
                      variant={size === item.size ? 'primary' : 'secondary'}
                      aria-pressed={size === item.size}
                      onClick={() => setSize(item.size)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <Checkbox
                label="Show leading icon"
                checked={showLeading}
                onChange={(event) => setShowLeading(event.target.checked)}
              />
            </>
          }
          preview={
            <DocsCard title={`${selectedColor} ${selectedVariant.label.toLowerCase()}`} description={selectedVariant.description}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <TagPreview variant={variant} color={color} size={size} showLeading={showLeading}>
                  New arrival
                </TagPreview>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Sizes" description="Two sizes. Medium is the default; small uses 2px vertical / 4px horizontal padding for dense rows.">
        <DocsGrid>
          <DocsCard title="Medium" description="Default size for product tiles, cards, and most layouts.">
            <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
              <Tag size="medium" color="brand">Brand</Tag>
              <Tag size="medium" color="info">Info</Tag>
              <Tag size="medium" color="positive">Positive</Tag>
            </div>
          </DocsCard>
          <DocsCard title="Small" description="Use in dense lists, table rows, or compact metadata strips.">
            <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
              <Tag size="small" color="brand">Brand</Tag>
              <Tag size="small" color="info">Info</Tag>
              <Tag size="small" color="positive">Positive</Tag>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Variants" description="Use variant to tune emphasis while keeping tags non-interactive.">
        <DocsGrid>
          {TAG_VARIANTS.map((item) => (
            <DocsCard key={item.variant} title={item.label} description={item.description}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <Tag variant={item.variant} color="brand">Brand</Tag>
                <Tag variant={item.variant} color="info">Info</Tag>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Semantic colors" description="Use color to reinforce meaning, not as decoration alone.">
        <DocsGrid>
          {TAG_COLORS.map((item) => (
            <DocsCard key={item.color} title={item.label} description={`${item.label} tag color.`}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <Tag color={item.color}>{item.label}</Tag>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Extended palette"
        description="Use extended colors only when a product-specific status system needs more distinctions."
      >
        <DocsGrid minColumnWidth={180} gap={16}>
          {EXTENDED_COLORS.map((item) => (
            <DocsCard key={item} title={item}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Tag color={item}>{item}</Tag>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Tag vs. Badge: use Tag for short, non-interactive textual labels that scan as prose (New, Ready, Beta, Out of stock). Use Badge for counts and presence dots. They are not interchangeable — a numeric pill like '12' belongs on Badge, even if the original code reached for Tag. Keep tag text concise, avoid tags as buttons or filters, pair color with meaningful copy, and use leading icons only when they improve recognition. See BADGE_TO_TAG_MIGRATION.md for the full decision table."
        defaultValue="variant='secondary', color='brand', size='medium'"
      />
    </PageWrapper>
  );
}
