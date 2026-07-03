import * as React from 'react';

import {Banner, type BannerSize, type BannerVariant} from '../components/Banner/Banner';
import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const BANNER_VARIANTS: Array<{
  variant: BannerVariant;
  label: string;
  description: string;
  message: string;
}> = [
  {
    variant: 'info',
    label: 'Info',
    description: 'Use for neutral page-wide announcements and operational context.',
    message: 'Pickup substitutions are available for review until 2:00 PM.',
  },
  {
    variant: 'success',
    label: 'Success',
    description: 'Use for broad confirmations that affect the current page or workflow.',
    message: 'All scheduled updates were published successfully.',
  },
  {
    variant: 'warning',
    label: 'Warning',
    description: 'Use for page-level risks that are recoverable or need attention.',
    message: 'Review delivery settings before continuing. Some options may affect timing.',
  },
  {
    variant: 'error',
    label: 'Error',
    description: 'Use for blocking or failed page-level states that need immediate action.',
    message: 'We could not load the latest order details. Try refreshing the page.',
  },
];

const BANNER_SIZES: Array<{size: BannerSize; label: string}> = [
  {size: 'default', label: 'Default'},
  {size: 'small', label: 'Small'},
];

function getBannerVariant(variant: BannerVariant) {
  return BANNER_VARIANTS.find((item) => item.variant === variant) ?? BANNER_VARIANTS[0];
}

function BannerExample({
  variant,
  message,
  size,
}: {
  variant: BannerVariant;
  message?: string;
  size?: BannerSize;
}) {
  const config = getBannerVariant(variant);
  return (
    <Banner variant={variant} size={size} onClose={() => {}}>
      {message ?? config.message}
    </Banner>
  );
}

export default function BannerPage() {
  const [selectedVariant, setSelectedVariant] = React.useState<BannerVariant>('info');
  const [selectedSize, setSelectedSize] = React.useState<BannerSize>('default');
  const [longMessage, setLongMessage] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(false);
  const selectedConfig = getBannerVariant(selectedVariant);
  const previewMessage = longMessage
    ? `${selectedConfig.message} This message includes additional context so teams can see how longer announcements wrap within the page container.`
    : selectedConfig.message;

  React.useEffect(() => {
    setIsDismissed(false);
  }, [selectedVariant, selectedSize, longMessage]);

  return (
    <PageWrapper
      title="Banner"
      category="Core Components"
      description="Page-wide messages for significant information, confirmations, warnings, and errors that affect many users or a full workflow."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview banner variant, dismissal, and content length in a page-width container."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Variant
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the status that matches the page-wide message.
                </Body>
              </div>
              <ButtonGroup aria-label="Banner variant">
                {BANNER_VARIANTS.map((item) => (
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
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>
                  Size
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Small banners have rounded corners and a leading status icon for inline use.
                </Body>
              </div>
              <ButtonGroup aria-label="Banner size">
                {BANNER_SIZES.map((item) => (
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
              <Checkbox
                label="Use long message"
                checked={longMessage}
                onChange={(event) => setLongMessage(event.target.checked)}
              />
            </>
          }
          preview={
            <DocsCard title={`${selectedConfig.label} banner`} description={selectedConfig.description}>
              {isDismissed ? (
                <div style={{display: 'grid', gap: 12, justifyItems: 'start'}}>
                  <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                    Banner dismissed.
                  </Body>
                  <Button variant="secondary" size="small" onClick={() => setIsDismissed(false)}>
                    Restore banner
                  </Button>
                </div>
              ) : (
                <Banner
                  variant={selectedVariant}
                  size={selectedSize}
                  onClose={() => setIsDismissed(true)}
                >
                  {previewMessage}
                </Banner>
              )}
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Variants"
        description="Each banner variant communicates a different page-level status."
      >
        <DocsGrid>
          {BANNER_VARIANTS.map((item) => (
            <DocsCard key={item.variant} title={item.label} description={item.description}>
              <BannerExample variant={item.variant} />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Size"
        description="Default banners span the page for site-wide messages. Small banners use rounded corners and a leading status icon for compact, inline placements."
      >
        <DocsGrid>
          <DocsCard
            title="Default"
            description="Full-width, centered content for page-wide announcements."
          >
            <BannerExample variant="info" message="Pickup substitutions are available for review until 2:00 PM." />
          </DocsCard>
          <DocsCard
            title="Small"
            description="Rounded corners and a leading status icon for inline messages."
          >
            <BannerExample
              variant="info"
              size="small"
              message="Pickup substitutions are available for review until 2:00 PM."
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Small variants"
        description="The small size pairs each variant with its semantic status icon, inheriting the on-fill text color."
      >
        <DocsGrid>
          {BANNER_VARIANTS.map((item) => (
            <DocsCard key={item.variant} title={item.label} description={item.description}>
              <BannerExample variant={item.variant} size="small" />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Dismissal behavior"
        description="Dismissible banners should return only when the status changes or a user starts a new relevant workflow."
      >
        <DocsGrid>
          <DocsCard title="Page announcement" description="Use banners when the message affects the whole page, not one field or component.">
            <BannerExample variant="info" message="Scheduled maintenance begins at 11:00 PM. Some tools may be unavailable." />
          </DocsCard>
          <DocsCard title="Blocking state" description="Use error banners for page-level problems that prevent normal progress.">
            <BannerExample variant="error" message="Inventory updates failed. Refresh the page before making more changes." />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use banners for page-wide or site-wide messages that need immediate visibility. Use info for neutral announcements, success for completed page-level work, warning for recoverable risk, and error for blocking failures. Keep copy concise, include a close button when dismissal is allowed, and avoid using banners for field-level validation or short process feedback."
        defaultValue="variant='info'"
      />
    </PageWrapper>
  );
}
