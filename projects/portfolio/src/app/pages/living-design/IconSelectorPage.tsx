import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {Icon} from '@/living-design/components/Icons/Icons';
import {
  IconSelector,
  type IconSelectorColor,
  type IconSelectorSize,
  type IconSelectorVariant,
} from '@/living-design/components/IconSelector/IconSelector';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const ICON_SELECTOR_VARIANTS: Array<{variant: IconSelectorVariant; label: string; description: string}> = [
  {variant: 'round', label: 'Round', description: 'Fully rounded — use for the standard binary toggle treatment.'},
  {variant: 'full', label: 'Full', description: 'Squared 4px corner — use when the selector must align with other squared controls.'},
];

const ICON_SELECTOR_SIZES: Array<{size: IconSelectorSize; label: string; description: string}> = [
  {size: 'xsmall', label: 'XSmall', description: '24×24 target. Reserve for very dense controls.'},
  {size: 'small', label: 'Small', description: '32×32 target. The default for toolbar and card actions.'},
  {size: 'medium', label: 'Medium', description: '40×40 target. Use beside medium-sized content.'},
  {size: 'large', label: 'Large', description: '48×48 target. Reserve for high-emphasis standalone toggles.'},
];

const ICON_SELECTOR_COLORS: Array<{color: IconSelectorColor; label: string; description: string}> = [
  {color: 'default', label: 'Default', description: 'Light surfaces. The icon swap (outline → filled) carries selected state.'},
  {color: 'white', label: 'White', description: 'Brand-bold dark surfaces. Icon swap carries selected state.'},
  {color: 'primary', label: 'Primary', description: 'Light surfaces with a high-emphasis blue activation ring on selected.'},
];

function PreviewSurface({children, dark = false}: {children: React.ReactNode; dark?: boolean}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        flexWrap: 'wrap',
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

export default function IconSelectorPage() {
  const [selectedVariant, setSelectedVariant] = React.useState<IconSelectorVariant>('round');
  const [selectedSize, setSelectedSize] = React.useState<IconSelectorSize>('small');
  const [selectedColor, setSelectedColor] = React.useState<IconSelectorColor>('default');
  const [disabled, setDisabled] = React.useState(false);
  const [controlledSelected, setControlledSelected] = React.useState(false);

  return (
    <PageWrapper
      title="Icon Selector"
      category="Core Components"
      description="Binary on/off icon controls represented by a paired set of icons (outline/filled or default/slash). Behave like a checkbox; render as an accessible switch."
    >
      <ExampleSection
        title="Component Configuration"
        description="Use the controls to preview variant, size, color, and disabled state. Click the preview to toggle the selected state."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Variant</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>Choose the selector container shape.</Body>
              </div>
              <ButtonGroup aria-label="Icon selector variant">
                {ICON_SELECTOR_VARIANTS.map((item) => (
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
                <ButtonGroup aria-label="Icon selector size">
                  {ICON_SELECTOR_SIZES.map((item) => (
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
                <ButtonGroup aria-label="Icon selector color">
                  {ICON_SELECTOR_COLORS.map((item) => (
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
            <DocsCard title="Preview" description="Click the selector to toggle its selected state. The a11yLabel describes the action, not the current state.">
              <PreviewSurface dark={selectedColor === 'white'}>
                <IconSelector
                  a11yLabel="Save to favorites"
                  color={selectedColor}
                  disabled={disabled}
                  iconSelected={<Icon name="HeartFill" />}
                  iconUnselected={<Icon name="Heart" />}
                  selected={controlledSelected}
                  size={selectedSize}
                  variant={selectedVariant}
                  onSelectedChange={setControlledSelected}
                />
              </PreviewSurface>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Variants" description="Round wraps in a circle; full uses a squared container. Both shapes are valid at every size.">
        <DocsGrid>
          {ICON_SELECTOR_VARIANTS.map((item) => (
            <DocsCard key={item.variant} title={item.label} description={item.description}>
              <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center'}}>
                <IconSelector
                  a11yLabel="Save to favorites"
                  variant={item.variant}
                  iconSelected={<Icon name="HeartFill" />}
                  iconUnselected={<Icon name="Heart" />}
                />
                <IconSelector
                  a11yLabel="Save to favorites, selected"
                  variant={item.variant}
                  defaultSelected
                  iconSelected={<Icon name="HeartFill" />}
                  iconUnselected={<Icon name="Heart" />}
                />
                <IconSelector
                  a11yLabel="Bookmark"
                  variant={item.variant}
                  iconSelected={<Icon name="BookmarkFill" />}
                  iconUnselected={<Icon name="Bookmark" />}
                />
                <IconSelector
                  a11yLabel="Bookmark, selected"
                  variant={item.variant}
                  defaultSelected
                  iconSelected={<Icon name="BookmarkFill" />}
                  iconUnselected={<Icon name="Bookmark" />}
                />
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Sizes" description="Match size to density and tap-target needs. Sizes mirror the IconButton scale.">
        <DocsGrid minColumnWidth={200}>
          {ICON_SELECTOR_SIZES.map((item) => (
            <DocsCard key={item.size} title={item.label} description={item.description}>
              <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                <IconSelector
                  a11yLabel={`${item.label} favorite`}
                  size={item.size}
                  iconSelected={<Icon name="HeartFill" />}
                  iconUnselected={<Icon name="Heart" />}
                />
                <IconSelector
                  a11yLabel={`${item.label} favorite, selected`}
                  size={item.size}
                  defaultSelected
                  iconSelected={<Icon name="HeartFill" />}
                  iconUnselected={<Icon name="Heart" />}
                />
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Colors" description="Default and white rely on the icon swap to communicate state. Primary adds a blue activation ring when selected.">
        <DocsGrid>
          <DocsCard title="Default" description="Standard light-surface treatment. State communicated by the outline → filled swap.">
            <PreviewSurface>
              <IconSelector
                a11yLabel="Save"
                iconSelected={<Icon name="HeartFill" />}
                iconUnselected={<Icon name="Heart" />}
              />
              <IconSelector
                a11yLabel="Save, selected"
                defaultSelected
                iconSelected={<Icon name="HeartFill" />}
                iconUnselected={<Icon name="Heart" />}
              />
              <IconSelector
                a11yLabel="Save, disabled"
                disabled
                iconSelected={<Icon name="HeartFill" />}
                iconUnselected={<Icon name="Heart" />}
              />
            </PreviewSurface>
          </DocsCard>

          <DocsCard title="White" description="High-contrast treatment for brand-bold dark surfaces.">
            <PreviewSurface dark>
              <IconSelector
                a11yLabel="Save"
                color="white"
                iconSelected={<Icon name="HeartFill" />}
                iconUnselected={<Icon name="Heart" />}
              />
              <IconSelector
                a11yLabel="Save, selected"
                color="white"
                defaultSelected
                iconSelected={<Icon name="HeartFill" />}
                iconUnselected={<Icon name="Heart" />}
              />
              <IconSelector
                a11yLabel="Save, disabled"
                color="white"
                disabled
                iconSelected={<Icon name="HeartFill" />}
                iconUnselected={<Icon name="Heart" />}
              />
            </PreviewSurface>
          </DocsCard>

          <DocsCard title="Primary" description="Adds an activated blue ring on selected for the highest-emphasis treatment.">
            <PreviewSurface>
              <IconSelector
                a11yLabel="Save"
                color="primary"
                iconSelected={<Icon name="HeartFill" />}
                iconUnselected={<Icon name="Heart" />}
              />
              <IconSelector
                a11yLabel="Save, selected"
                color="primary"
                defaultSelected
                iconSelected={<Icon name="HeartFill" />}
                iconUnselected={<Icon name="Heart" />}
              />
              <IconSelector
                a11yLabel="Save, disabled"
                color="primary"
                disabled
                defaultSelected
                iconSelected={<Icon name="HeartFill" />}
                iconUnselected={<Icon name="Heart" />}
              />
            </PreviewSurface>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Icon pairings" description="Use established pairings only: outline/filled or default/slash (on/off). Do not pair arbitrary icons.">
        <DocsGrid>
          <DocsCard title="Outline / Filled" description="Heart, Bookmark, Star — the most common pairing.">
            <PreviewSurface>
              <IconSelector
                a11yLabel="Favorite"
                iconSelected={<Icon name="HeartFill" />}
                iconUnselected={<Icon name="Heart" />}
              />
              <IconSelector
                a11yLabel="Bookmark"
                iconSelected={<Icon name="BookmarkFill" />}
                iconUnselected={<Icon name="Bookmark" />}
              />
              <IconSelector
                a11yLabel="Star"
                iconSelected={<Icon name="StarFill" />}
                iconUnselected={<Icon name="Star" />}
              />
            </PreviewSurface>
          </DocsCard>

          <DocsCard title="Default / Slash" description="Microphone, Eye, Flash — communicates an explicit on/off action.">
            <PreviewSurface>
              <IconSelector
                a11yLabel="Mute microphone"
                iconSelected={<Icon name="MicrophoneSlash" />}
                iconUnselected={<Icon name="Microphone" />}
              />
              <IconSelector
                a11yLabel="Hide content"
                iconSelected={<Icon name="EyeSlash" />}
                iconUnselected={<Icon name="Eye" />}
              />
              <IconSelector
                a11yLabel="Disable flash"
                iconSelected={<Icon name="FlashSlash" />}
                iconUnselected={<Icon name="Flash" />}
              />
            </PreviewSurface>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Controlled vs uncontrolled" description="Pass `selected` + `onSelectedChange` to let a parent own the state. Pass `defaultSelected` to let the component manage its own state.">
        <DocsGrid>
          <DocsCard title="Uncontrolled" description="Component manages its own state. Use defaultSelected for the initial value.">
            <PreviewSurface>
              <IconSelector
                a11yLabel="Favorite (uncontrolled)"
                color="primary"
                iconSelected={<Icon name="HeartFill" />}
                iconUnselected={<Icon name="Heart" />}
              />
              <IconSelector
                a11yLabel="Bookmark (uncontrolled, starts selected)"
                color="primary"
                defaultSelected
                iconSelected={<Icon name="BookmarkFill" />}
                iconUnselected={<Icon name="Bookmark" />}
              />
            </PreviewSurface>
          </DocsCard>

          <DocsCard title="Controlled" description={`Parent owns the state via useState. Currently: ${controlledSelected ? 'selected' : 'not selected'}.`}>
            <PreviewSurface>
              <IconSelector
                a11yLabel="Favorite (controlled)"
                color="primary"
                iconSelected={<Icon name="HeartFill" />}
                iconUnselected={<Icon name="Heart" />}
                selected={controlledSelected}
                onSelectedChange={setControlledSelected}
              />
              <Button size="small" variant="secondary" onClick={() => setControlledSelected((prev) => !prev)}>
                Toggle from outside
              </Button>
            </PreviewSurface>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Always provide a specific a11yLabel for the action the selector performs. Pair only established icon sets (outline/filled or default/slash) — never mix arbitrary glyphs. Use white only on brand-bold dark surfaces; use primary when the toggle is high-emphasis enough to warrant an activation ring."
        defaultValue="variant='round', size='small', color='default'"
      />
    </PageWrapper>
  );
}
