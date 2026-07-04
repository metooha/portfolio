import * as React from 'react';

import {BasicBanner, type BasicBannerVariant} from '@/living-design/components/BasicBanner/BasicBanner';
import {Button, ButtonGroup} from '@/living-design/components/Button';
import {Checkbox} from '@/living-design/components/Checkbox';
import {Icon} from '@/living-design/components/Icons';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const VARIANTS: Array<{label: string; value: BasicBannerVariant; text: string}> = [
  {label: 'Default', value: 'default', text: 'Free delivery on orders $35+'},
  {label: 'Brand', value: 'brand', text: 'Walmart+ members save more every day'},
  {label: 'Inverse', value: 'inverse', text: 'Same-day pickup available at your store'},
];

export default function BasicBannerPage() {
  const [variant, setVariant] = React.useState<BasicBannerVariant>('default');
  const [showIcon, setShowIcon] = React.useState(true);
  const [isClickable, setIsClickable] = React.useState(false);
  const [clicks, setClicks] = React.useState(0);

  return (
    <PageWrapper
      title="Basic Banner"
      category="WCP Components"
      description="A compact banner for value propositions, branded messages, and contextual callouts across retail surfaces."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview visual treatment, optional icon, and button behavior."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">
                  Variant
                </Body>
                <ButtonGroup aria-label="Basic banner variant">
                  {VARIANTS.map((item) => (
                    <Button
                      key={item.value}
                      size="small"
                      variant={variant === item.value ? 'primary' : 'secondary'}
                      onClick={() => setVariant(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>

              <Checkbox
                label="Show leading icon"
                checked={showIcon}
                onChange={(event) => setShowIcon(event.target.checked)}
              />
              <Checkbox
                label="Make banner clickable"
                checked={isClickable}
                onChange={(event) => setIsClickable(event.target.checked)}
              />
            </>
          }
          preview={
            <DocsCard
              title="Preview"
              description={isClickable ? `Clicked ${clicks} time${clicks === 1 ? '' : 's'}.` : 'Static banners announce non-interactive messages.'}
            >
              <BasicBanner
                variant={variant}
                text={VARIANTS.find((item) => item.value === variant)?.text}
                icon={showIcon ? <Icon name="Star" decorative size="medium" /> : undefined}
                onClick={isClickable ? () => setClicks((value) => value + 1) : undefined}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Variants" description="Choose the variant by message priority and surface contrast.">
        <DocsGrid>
          {VARIANTS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.text}>
              <BasicBanner variant={item.value} text="Declarative title or body" />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Leading icon" description="Pair the banner with a small icon to reinforce the message theme.">
        <DocsGrid>
          {VARIANTS.map((item) => (
            <DocsCard key={item.value} title={item.label}>
              <BasicBanner
                variant={item.value}
                text={item.text}
                icon={<Icon name="Star" decorative size="medium" />}
              />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Interaction" description="Use click behavior only when the entire banner is a single clear action.">
        <DocsGrid>
          <DocsCard title="Static" description="Use for informational value statements.">
            <BasicBanner variant="default" text="Pickup available in as soon as one hour" />
          </DocsCard>
          <DocsCard title="Clickable" description="The root becomes a button when onClick is provided.">
            <BasicBanner
              variant="brand"
              text="Join Walmart+ and start a free trial"
              onClick={() => setClicks((value) => value + 1)}
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use short, self-contained copy. Pick brand for branded benefit statements, default for contextual information, and inverse when the banner needs high contrast inside a darker composition."
        defaultValue="variant='default', text='Declarative title or body'"
      >
        <div style={{display: 'grid', gap: 8}}>
          <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Accessibility — icon labelling</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.6'}}>
            Use <code>iconLabel</code> to describe the icon to screen readers. The icon slot is always <code>aria-hidden</code>; the label is injected as visually hidden text and contributes to the button's computed accessible name alongside <code>text</code> — e.g. <em>"Walmart+ membership Join Walmart+ and start a free trial"</em>.
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.6'}}>
            <strong>Do not combine <code>iconLabel</code> with <code>aria-label</code></strong> on the button. <code>aria-label</code> replaces the entire computed name, silencing <code>iconLabel</code>. If you must use <code>aria-label</code>, include the icon description in the string yourself.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
