import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {LinkButton, type LinkButtonColor, type LinkButtonSize} from '@/app/components/LinkButton/LinkButton';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const LINK_BUTTON_COLORS: Array<{color: LinkButtonColor; label: string; description: string}> = [
  {color: 'default', label: 'Default', description: 'Use for link-styled actions that need standard visual emphasis.'},
  {color: 'subtle', label: 'Subtle', description: 'Use for supporting actions that should be available without drawing focus.'},
  {color: 'white', label: 'White', description: 'Use only on LD brand bold fill surfaces where white foreground color is needed.'},
];

const LINK_BUTTON_SIZES: Array<{size: LinkButtonSize; label: string; description: string}> = [
  {size: 'small', label: 'Small', description: 'Use in dense rows, cards, and supporting action groups.'},
  {size: 'medium', label: 'Medium', description: 'Use as the default size in forms and content sections.'},
  {size: 'large', label: 'Large', description: 'Use when the link button needs more tap area or prominence.'},
];

function PreviewSurface({children, brandBold = false}: {children: React.ReactNode; brandBold?: boolean}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 88,
        padding: 16,
        borderRadius: 8,
        background: brandBold
          ? 'var(--ld-semantic-color-fill-brand-bold, #001e60)'
          : 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
      }}
    >
      {children}
    </div>
  );
}

export default function LinkButtonPage() {
  const [color, setColor] = React.useState<LinkButtonColor>('default');
  const [size, setSize] = React.useState<LinkButtonSize>('medium');
  const [disabled, setDisabled] = React.useState(false);

  return (
    <PageWrapper
      title="Link Button"
      category="Core Components"
      description="Link-styled interactive elements with multiple sizes and color variants for in-line actions inside text, cards, and toolbars."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview color, size, and disabled state. White color requires a brand-bold surface."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Color</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the emphasis that matches the surrounding context.
                </Body>
              </div>
              <ButtonGroup aria-label="Link button color">
                {LINK_BUTTON_COLORS.map((item) => (
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

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
                <ButtonGroup aria-label="Link button size">
                  {LINK_BUTTON_SIZES.map((item) => (
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

              <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="Use disabled only when the action will be available later.">
              <PreviewSurface brandBold={color === 'white'}>
                <LinkButton color={color} size={size} disabled={disabled}>
                  Manage notifications
                </LinkButton>
              </PreviewSurface>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Colors" description="Each color matches a specific surface and emphasis.">
        <DocsGrid>
          {LINK_BUTTON_COLORS.map((item) => (
            <DocsCard key={item.color} title={item.label} description={item.description}>
              <PreviewSurface brandBold={item.color === 'white'}>
                <LinkButton color={item.color}>Manage notifications</LinkButton>
              </PreviewSurface>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Sizes" description="Use size to match the surrounding content density.">
        <DocsGrid>
          {LINK_BUTTON_SIZES.map((item) => (
            <DocsCard key={item.size} title={item.label} description={item.description}>
              <LinkButton size={item.size}>View details</LinkButton>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Link Button for low-emphasis, in-context actions inside text, cards, or toolbars. Choose default for standard emphasis, subtle for supporting actions, and white only on dark brand surfaces. Avoid using Link Button as a primary page action; reach for Button instead."
        defaultValue="color='default', size='medium'"
      />
    </PageWrapper>
  );
}
