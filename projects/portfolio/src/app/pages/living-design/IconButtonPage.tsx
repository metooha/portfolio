import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {
  ChevronUpIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
  XIcon,
} from '@/living-design/components/Icons/Icons';
import {
  IconButton,
  type IconButtonColor,
  type IconButtonSize,
  type IconButtonVariant,
} from '@/living-design/components/IconButton/IconButton';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const ICON_BUTTON_VARIANTS: Array<{variant: IconButtonVariant; label: string; description: string}> = [
  {variant: 'round', label: 'Round', description: 'Use for compact toolbars, dismiss actions, and repeated icon-only actions.'},
  {variant: 'full', label: 'Full', description: 'Use when the button needs a squared container that aligns with other controls.'},
];

const ICON_BUTTON_SIZES: Array<{size: IconButtonSize; label: string; description: string}> = [
  {size: 'xsmall', label: 'XSmall', description: 'Use only in very dense controls where the hit area remains appropriate in context.'},
  {size: 'small', label: 'Small', description: 'The default size for most toolbar, card, and row actions.'},
  {size: 'medium', label: 'Medium', description: 'Use when an action needs more presence beside medium-sized content.'},
  {size: 'large', label: 'Large', description: 'Use sparingly for high-emphasis standalone actions.'},
];

const ICON_BUTTON_COLORS: Array<{color: IconButtonColor; label: string; description: string}> = [
  {color: 'default', label: 'Default', description: 'Use on light surfaces and standard content backgrounds.'},
  {color: 'white', label: 'White', description: 'Use only on brand bold fill surfaces where white foreground color is needed.'},
  {color: 'primary', label: 'Primary', description: 'Solid brand fill for the highest-emphasis icon action.'},
  {color: 'secondary', label: 'Secondary', description: 'Outlined treatment for a medium-emphasis icon action.'},
  {color: 'tertiary', label: 'Tertiary', description: 'Borderless fill for a low-emphasis icon action.'},
];

const ICON_BUTTON_EMPHASIS: IconButtonColor[] = ['primary', 'secondary', 'tertiary'];

function IconPreviewSurface({children, dark = false}: {children: React.ReactNode; dark?: boolean}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 88,
        padding: 16,
        borderRadius: 8,
        background: dark
          ? 'var(--ld-semantic-color-fill-brand-bold, #001e60)'
          : 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
      }}
    >
      {children}
    </div>
  );
}

export default function IconButtonPage() {
  const [selectedVariant, setSelectedVariant] = React.useState<IconButtonVariant>('round');
  const [selectedSize, setSelectedSize] = React.useState<IconButtonSize>('small');
  const [selectedColor, setSelectedColor] = React.useState<IconButtonColor>('default');
  const [disabled, setDisabled] = React.useState(false);

  return (
    <PageWrapper
      title="Icon Button"
      category="Core Components"
      description="Icon-only buttons for compact actions, with round and full variants for toolbars, cards, dense rows, and dark surfaces."
    >
      <ExampleSection
        title="Component Configuration"
        description="Use the controls to preview variant, size, color, and disabled state."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Variant</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>Choose the button container shape.</Body>
              </div>
              <ButtonGroup aria-label="Icon button variant">
                {ICON_BUTTON_VARIANTS.map((item) => (
                  <Button
                    key={item.variant}
                    size="small"
                    variant={selectedVariant === item.variant ? 'primary' : 'secondary'}
                    aria-pressed={selectedVariant === item.variant}
                    onClick={() => setSelectedVariant(item.variant)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
                <ButtonGroup aria-label="Icon button size">
                  {ICON_BUTTON_SIZES.map((item) => (
                    <Button
                      key={item.size}
                      size="small"
                      variant={selectedSize === item.size ? 'primary' : 'secondary'}
                      aria-pressed={selectedSize === item.size}
                      onClick={() => setSelectedSize(item.size)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Color</Body>
                <ButtonGroup aria-label="Icon button color">
                  {ICON_BUTTON_COLORS.map((item) => (
                    <Button
                      key={item.color}
                      size="small"
                      variant={selectedColor === item.color ? 'primary' : 'secondary'}
                      aria-pressed={selectedColor === item.color}
                      onClick={() => setSelectedColor(item.color)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>

              <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="The accessible label must describe the hidden action.">
              <IconPreviewSurface dark={selectedColor === 'white'}>
                <IconButton
                  a11yLabel="Open search"
                  color={selectedColor}
                  disabled={disabled}
                  size={selectedSize}
                  variant={selectedVariant}
                >
                  <SearchIcon />
                </IconButton>
              </IconPreviewSurface>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Variants" description="Round wraps in a circle; full uses a squared container.">
        <DocsGrid>
          {ICON_BUTTON_VARIANTS.map((item) => (
            <DocsCard key={item.variant} title={item.label} description={item.description}>
              <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center'}}>
                <IconButton a11yLabel="Search" variant={item.variant}><SearchIcon /></IconButton>
                <IconButton a11yLabel="Add" variant={item.variant}><PlusIcon /></IconButton>
                <IconButton a11yLabel="Favorite" variant={item.variant}><StarIcon /></IconButton>
                <IconButton a11yLabel="Close" variant={item.variant}><XIcon /></IconButton>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Sizes" description="Match size to density and tap target needs.">
        <DocsGrid minColumnWidth={200}>
          {ICON_BUTTON_SIZES.map((item) => (
            <DocsCard key={item.size} title={item.label} description={item.description}>
              <IconButton a11yLabel={`${item.label} star`} size={item.size}><StarIcon /></IconButton>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Emphasis" description="Primary, secondary, and tertiary mirror the Button emphasis levels. Tertiary is borderless.">
        <DocsGrid>
          {ICON_BUTTON_COLORS.filter((item) => ICON_BUTTON_EMPHASIS.includes(item.color)).map((item) => (
            <DocsCard key={item.color} title={item.label} description={item.description}>
              <IconPreviewSurface>
                <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center'}}>
                  <IconButton a11yLabel={`${item.label} search`} color={item.color}><SearchIcon /></IconButton>
                  <IconButton a11yLabel={`${item.label} add`} color={item.color} variant="full"><PlusIcon /></IconButton>
                  <IconButton a11yLabel={`${item.label} close, disabled`} color={item.color} disabled><XIcon /></IconButton>
                </div>
              </IconPreviewSurface>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Colors" description="Use white only on brand-bold dark surfaces.">
        <DocsGrid>
          <DocsCard title="Default" description="Standard light-surface treatment.">
            <IconPreviewSurface>
              <IconButton a11yLabel="Settings"><ChevronUpIcon /></IconButton>
            </IconPreviewSurface>
          </DocsCard>
          <DocsCard title="White" description="High-contrast treatment on dark brand surfaces.">
            <IconPreviewSurface dark>
              <IconButton a11yLabel="Settings" color="white"><ChevronUpIcon /></IconButton>
            </IconPreviewSurface>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Always provide a specific a11yLabel for icon buttons. Use round for repeated toolbar actions, full when the button must align with other squared controls, and white color only on brand-bold dark surfaces where contrast requires it."
        defaultValue="variant='round', size='small', color='default'"
      />
    </PageWrapper>
  );
}
