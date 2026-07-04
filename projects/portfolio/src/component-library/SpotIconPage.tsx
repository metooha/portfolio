import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {
  CheckIcon,
  GiftIcon,
  InfoCircleIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
  WarningIcon,
} from '@/app/components/Icons/Icons';
import {
  SpotIcon,
  type SpotIconColor,
  type SpotIconShape,
  type SpotIconSize,
} from '@/app/components/SpotIcon/SpotIcon';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SHAPES: Array<{value: SpotIconShape; label: string; description: string}> = [
  {value: 'circle', label: 'Circle', description: 'The default rounded container for brand and neutral accents.'},
  {value: 'square', label: 'Square', description: 'A rounded-square container with the expanded accent color palette.'},
];

const CIRCLE_COLORS: Array<{value: SpotIconColor; label: string; description: string}> = [
  {value: 'brand', label: 'Brand', description: 'Use for primary brand moments, highlights, and onboarding accents.'},
  {value: 'neutral', label: 'Neutral', description: 'Use for low-emphasis decorative icons inside lists or settings.'},
];

const SQUARE_COLORS: Array<{value: SpotIconColor; label: string; description: string}> = [
  {value: 'blue', label: 'Blue', description: 'Informational accents and links.'},
  {value: 'green', label: 'Green', description: 'Success, confirmation, and positive states.'},
  {value: 'orange', label: 'Orange', description: 'Warnings and attention-drawing moments.'},
  {value: 'pink', label: 'Pink', description: 'Promotional and playful highlights.'},
  {value: 'purple', label: 'Purple', description: 'Premium and feature-discovery accents.'},
  {value: 'teal', label: 'Teal', description: 'Calm, helpful, informational markers.'},
];

const CIRCLE_SIZES: Array<{value: SpotIconSize; label: string}> = [
  {value: 'small', label: 'Small'},
  {value: 'large', label: 'Large'},
];

const SQUARE_SIZES: Array<{value: SpotIconSize; label: string}> = [
  {value: 'small', label: 'Small'},
  {value: 'medium', label: 'Medium'},
  {value: 'large', label: 'Large'},
];

const ICON_OPTIONS = {
  star: <StarIcon />,
  gift: <GiftIcon />,
  check: <CheckIcon />,
  info: <InfoCircleIcon />,
  warning: <WarningIcon />,
  search: <SearchIcon />,
  settings: <SettingsIcon />,
} as const;

type IconKey = keyof typeof ICON_OPTIONS;

export default function SpotIconPage() {
  const [shape, setShape] = React.useState<SpotIconShape>('circle');
  const [color, setColor] = React.useState<SpotIconColor>('brand');
  const [size, setSize] = React.useState<SpotIconSize>('large');
  const [icon, setIcon] = React.useState<IconKey>('star');

  const colors = shape === 'square' ? SQUARE_COLORS : CIRCLE_COLORS;
  const sizes = shape === 'square' ? SQUARE_SIZES : CIRCLE_SIZES;

  const handleShape = (next: SpotIconShape) => {
    setShape(next);
    // Reset color/size to a valid value for the selected shape.
    setColor(next === 'square' ? 'blue' : 'brand');
    if (next === 'circle' && size === 'medium') {
      setSize('large');
    }
  };

  const activeColor = colors.find((item) => item.value === color) ?? colors[0];

  return (
    <PageWrapper
      title="Spot Icon"
      category="Core Components"
      description="Decorative icon containers with circle and square shapes across brand, neutral, and accent color variants."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview shape, color, size, and icon to pair Spot Icon with the surrounding content."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>Shape</Body>
              </div>
              <ButtonGroup aria-label="Spot icon shape">
                {SHAPES.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={shape === item.value ? 'primary' : 'secondary'}
                    aria-pressed={shape === item.value}
                    onClick={() => handleShape(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>Color</Body>
              </div>
              <ButtonGroup aria-label="Spot icon color">
                {colors.map((item) => (
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
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
              </div>
              <ButtonGroup aria-label="Spot icon size">
                {sizes.map((item) => (
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
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Icon</Body>
              </div>
              <ButtonGroup aria-label="Spot icon glyph">
                {(Object.keys(ICON_OPTIONS) as IconKey[]).map((item) => (
                  <Button
                    key={item}
                    size="small"
                    variant={icon === item ? 'primary' : 'secondary'}
                    aria-pressed={icon === item}
                    onClick={() => setIcon(item)}
                  >
                    {item}
                  </Button>
                ))}
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard title={`${activeColor?.label} preview`} description={activeColor?.description}>
              <div style={{display: 'grid', placeItems: 'center', padding: 24}}>
                <SpotIcon color={color} shape={shape} size={size}>{ICON_OPTIONS[icon]}</SpotIcon>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Colors" description="Each color matches a different emphasis level.">
        <DocsGrid>
          {CIRCLE_COLORS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
                <SpotIcon color={item.value}><StarIcon /></SpotIcon>
                <SpotIcon color={item.value}><CheckIcon /></SpotIcon>
                <SpotIcon color={item.value}><GiftIcon /></SpotIcon>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Sizes" description="Use small in dense rows; use large for hero moments.">
        <DocsGrid>
          {CIRCLE_SIZES.map((item) => (
            <DocsCard key={item.value} title={item.label}>
              <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
                <SpotIcon size={item.value}><StarIcon /></SpotIcon>
                <SpotIcon size={item.value} color="neutral"><SettingsIcon /></SpotIcon>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Square"
        description="The square variant uses a rounded-square container with an expanded accent color palette. Pair it with the matching color to signal tone — green for success, orange for warnings, blue or teal for information."
      >
        <DocsGrid>
          {SQUARE_COLORS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
                <SpotIcon shape="square" color={item.value} size="small"><StarIcon /></SpotIcon>
                <SpotIcon shape="square" color={item.value} size="medium"><GiftIcon /></SpotIcon>
                <SpotIcon shape="square" color={item.value} size="large"><InfoCircleIcon /></SpotIcon>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Square sizes" description="Square supports small, medium, and large containers for dense rows up to hero moments.">
        <DocsGrid>
          {SQUARE_SIZES.map((item) => (
            <DocsCard key={item.value} title={item.label}>
              <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
                <SpotIcon shape="square" size={item.value} color="blue"><StarIcon /></SpotIcon>
                <SpotIcon shape="square" size={item.value} color="purple"><SettingsIcon /></SpotIcon>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Spot Icon as a decorative companion to text — onboarding highlights, list-row accents, settings markers. Choose the circle shape for brand and neutral moments, and the square shape when you need the expanded accent palette to signal tone. Spot Icon is non-interactive; wrap it in Button or IconButton when an action is required."
        defaultValue="shape='circle', color='brand', size='large'"
      />
    </PageWrapper>
  );
}
