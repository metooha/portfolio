import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Link, type LinkColor} from '../components/Link/Link';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const BRAND_BOLD_BG = 'var(--ld-semantic-color-fill-brand-bold, #001e60)';
const SUBTLE_BG = 'var(--ld-semantic-color-fill-subtle, #f5f5f6)';

const LINK_COLORS: Array<{color: LinkColor; label: string; description: string}> = [
  {color: 'default', label: 'Default', description: 'Use for standard navigation links in body text and content areas.'},
  {color: 'subtle', label: 'Subtle', description: 'Use for supporting links that should be available without drawing focus.'},
  {color: 'white', label: 'White', description: 'Use only on dark brand-bold surfaces where white foreground is required.'},
];

const LINK_STATES: Array<{label: string; className: string; description: string}> = [
  {label: 'Enabled', className: '', description: 'Resting state — underline indicates navigability.'},
  {label: 'Hovered', className: 'hover', description: 'Underline removed on cursor hover.'},
  {label: 'Focused', className: 'focus', description: 'Keyboard focus — underline removed, browser focus ring applies.'},
  {label: 'Pressed', className: 'active', description: 'Darker text token while the link is being activated.'},
];

function BrandBoldSurface({children}: {children: React.ReactNode}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 72,
        padding: 16,
        borderRadius: 8,
        background: BRAND_BOLD_BG,
      }}
    >
      {children}
    </div>
  );
}

function SubtleSurface({children}: {children: React.ReactNode}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 72,
        padding: 16,
        borderRadius: 8,
        background: SUBTLE_BG,
      }}
    >
      {children}
    </div>
  );
}

export default function LinkPage() {
  const [color, setColor] = React.useState<LinkColor>('default');

  const selectedColorMeta = LINK_COLORS.find((item) => item.color === color) ?? LINK_COLORS[0];

  return (
    <PageWrapper
      title="Link"
      category="Core Components"
      description="Navigational text elements with underline styling, color variants for light and dark surfaces, and full interactive state support."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview color variants. White requires a brand-bold surface."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Color
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the emphasis that fits the surrounding surface.
                </Body>
              </div>
              <ButtonGroup aria-label="Link color">
                {LINK_COLORS.map((item) => (
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
            </>
          }
          preview={
            <DocsCard
              title={selectedColorMeta.label}
              description={selectedColorMeta.description}
              onDark={color === 'white'}
              style={color === 'white' ? {background: BRAND_BOLD_BG} : undefined}
            >
              <Link href="#" color={color}>
                View order details
              </Link>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Colors"
        description="Each color variant is designed for a specific surface type and level of emphasis."
      >
        <DocsGrid>
          <DocsCard title="Default" description="Use for standard navigation links in body text and content areas.">
            <SubtleSurface>
              <Link href="#">View order details</Link>
            </SubtleSurface>
          </DocsCard>

          <DocsCard title="Subtle" description="Use for supporting links that should be available without drawing focus.">
            <SubtleSurface>
              <Link href="#" color="subtle">View order details</Link>
            </SubtleSurface>
          </DocsCard>

          <DocsCard
            title="White"
            description="Use only on dark brand-bold surfaces where white foreground is required."
            onDark
            style={{background: BRAND_BOLD_BG}}
          >
            <BrandBoldSurface>
              <Link href="#" color="white">View order details</Link>
            </BrandBoldSurface>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Interactive states"
        description="All four states are supported across every color variant. Underline is removed on interaction; the pressed state uses a darker text token."
      >
        <DocsGrid>
          {LINK_STATES.map((state) => (
            <DocsCard key={state.label} title={state.label} description={state.description}>
              <div style={{display: 'grid', gap: 12}}>
                {LINK_COLORS.map((colorItem) => (
                  <div
                    key={colorItem.color}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 40,
                      padding: '8px 12px',
                      borderRadius: 6,
                      background: colorItem.color === 'white'
                        ? BRAND_BOLD_BG
                        : SUBTLE_BG,
                    }}
                  >
                    <Link
                      href="#"
                      color={colorItem.color}
                      UNSAFE_className={state.className || undefined}
                    >
                      {colorItem.label}
                    </Link>
                  </div>
                ))}
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Usage patterns"
        description="Links appear inline in body text, as standalone navigation items, and in external contexts that open in a new tab."
      >
        <DocsGrid>
          <DocsCard
            title="Inline in body text"
            description="Place a link inside a sentence to navigate to related content without breaking the reading flow."
          >
            <Body as="p" size="medium" style={{margin: 0, lineHeight: '1.6'}}>
              Your order has shipped. <Link href="#">Track your package</Link> to see the
              latest delivery estimate.
            </Body>
          </DocsCard>

          <DocsCard
            title="Standalone list"
            description="Use a vertical list of links for quick-access navigation menus or related resource sections."
          >
            <div style={{display: 'grid', gap: 12}}>
              <Link href="#">Account settings</Link>
              <Link href="#">Order history</Link>
              <Link href="#">Payment methods</Link>
              <Link href="#">Saved addresses</Link>
            </div>
          </DocsCard>

          <DocsCard
            title="External link"
            description="Pass target='_blank' to open external destinations in a new tab. The component handles rel attributes automatically."
          >
            <Body as="p" size="medium" style={{margin: 0, lineHeight: '1.6'}}>
              Read the full{' '}
              <Link href="https://www.walmart.com" target="_blank">
                Walmart Privacy Policy
              </Link>{' '}
              for details on how your data is used.
            </Body>
          </DocsCard>

          <DocsCard
            title="Subtle on dense surfaces"
            description="Use the subtle color variant when a link appears alongside other content and must not compete for visual focus."
          >
            <div
              style={{
                display: 'grid',
                gap: 8,
                padding: 12,
                borderRadius: 6,
                background: SUBTLE_BG,
              }}
            >
              <Body as="span" size="small" color="subtle" style={{lineHeight: '1.4'}}>
                Last updated June 24, 2026
              </Body>
              <Body as="p" size="medium" style={{margin: 0, lineHeight: '1.6'}}>
                Delivery windows may change.{' '}
                <Link href="#" color="subtle">View updated schedule</Link>
              </Body>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Link for navigation — not for triggering actions. Reserve Button or LinkButton for interactive actions that don't navigate. Default color works on any white or light surface; subtle reduces visual weight for secondary links; white is exclusively for dark brand-bold surfaces. Link text should describe the destination: prefer 'View order details' over 'click here'. For external destinations, use target='_blank' — rel attributes are applied automatically."
        defaultValue="color='default'"
      />
    </PageWrapper>
  );
}
