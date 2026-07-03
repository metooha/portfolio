import * as React from 'react';

import {Alert, type AlertVariant} from '@/living-design/components/Alert/Alert';
import {Button, ButtonGroup} from '@/living-design/components/Button';
import {Checkbox} from '@/living-design/components/Checkbox';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const ALERT_VARIANTS: Array<{
  variant: AlertVariant;
  label: string;
  description: string;
  shortMessage: string;
  longMessage: string;
  actionLabel: string;
}> = [
  {
    variant: 'info',
    label: 'Info',
    description: 'Use for neutral context, reminders, or supporting status information.',
    shortMessage: 'Delivery preferences were updated for this order.',
    longMessage:
      'Delivery preferences were updated for this order. Review the summary before the cutoff time if you need to make another change.',
    actionLabel: 'Review',
  },
  {
    variant: 'success',
    label: 'Success',
    description: 'Use after a user action completes successfully.',
    shortMessage: 'Your changes have been saved successfully.',
    longMessage:
      'Your changes have been saved successfully. You can continue working or review the updated record before leaving this page.',
    actionLabel: 'View record',
  },
  {
    variant: 'warning',
    label: 'Warning',
    description: 'Use for recoverable risks or decisions that need attention.',
    shortMessage: 'Please review your settings before continuing.',
    longMessage:
      'Please review your settings before continuing. Some options may affect billing, pickup timing, or delivery availability.',
    actionLabel: 'Check settings',
  },
  {
    variant: 'error',
    label: 'Error',
    description: 'Use for failed or blocking states that require a user response.',
    shortMessage: 'Something went wrong. Please try again.',
    longMessage:
      'Something went wrong while processing your request. Please try again or contact support if the issue persists.',
    actionLabel: 'Try again',
  },
];

function getVariantConfig(variant: AlertVariant) {
  return ALERT_VARIANTS.find((item) => item.variant === variant) ?? ALERT_VARIANTS[0];
}

function AlertExample({
  variant,
  longMessage = false,
  showAction = false,
}: {
  variant: AlertVariant;
  longMessage?: boolean;
  showAction?: boolean;
}) {
  const config = getVariantConfig(variant);

  return (
    <Alert
      variant={variant}
      a11yIconLabel={config.label}
      actionButtonProps={
        showAction
          ? {
              children: config.actionLabel,
              onClick: () => {},
            }
          : undefined
      }
    >
      {longMessage ? config.longMessage : config.shortMessage}
    </Alert>
  );
}

function AlertPreviewFrame({
  children,
  isConstrained = false,
}: {
  children: React.ReactNode;
  isConstrained?: boolean;
}) {
  return (
    <div
      style={{
        width: isConstrained ? '100%' : 'fit-content',
        maxWidth: isConstrained ? 280 : '100%',
      }}
    >
      {children}
    </div>
  );
}

export default function AlertPage() {
  const [selectedVariant, setSelectedVariant] = React.useState<AlertVariant>('info');
  const [showAction, setShowAction] = React.useState(true);
  const [longMessage, setLongMessage] = React.useState(false);
  const [constrainWidth, setConstrainWidth] = React.useState(false);
  const selectedConfig = getVariantConfig(selectedVariant);

  return (
    <PageWrapper
      title="Alert"
      category="Core Components"
      description="Banner messages for info, success, warning, and error states with optional contextual actions."
    >
      <ExampleSection
        title="Component Configuration"
        description="Use the controls to preview how variant, content length, action links, and width affect the Alert layout."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Variant
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the message type to update the live preview.
                </Body>
              </div>

              <ButtonGroup aria-label="Alert variant">
                {ALERT_VARIANTS.map((item) => (
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

              <div style={{display: 'grid', gap: 16}}>
                <Checkbox
                  label="Show action"
                  checked={showAction}
                  onChange={(event) => setShowAction(event.target.checked)}
                />
                <Checkbox
                  label="Use long message"
                  checked={longMessage}
                  onChange={(event) => setLongMessage(event.target.checked)}
                />
                <Checkbox
                  label="Constrain preview width"
                  checked={constrainWidth}
                  onChange={(event) => setConstrainWidth(event.target.checked)}
                />
              </div>
            </>
          }
          preview={
            <DocsCard
              title={`${selectedConfig.label} preview`}
              description={selectedConfig.description}
            >
              <AlertPreviewFrame isConstrained={constrainWidth}>
                <AlertExample
                  variant={selectedVariant}
                  longMessage={longMessage}
                  showAction={showAction}
                />
              </AlertPreviewFrame>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Variants"
        description="Each Alert variant is shown in a consistent card container so color, icon, and content behavior can be compared quickly."
      >
        <DocsGrid>
          {ALERT_VARIANTS.map((item) => (
            <DocsCard key={item.variant} title={item.label} description={item.description}>
              <AlertPreviewFrame>
                <AlertExample variant={item.variant} />
              </AlertPreviewFrame>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Actions and wrapping"
        description="Alerts can include one concise contextual action. Long messages should wrap cleanly while keeping the icon top-aligned."
      >
        <DocsGrid>
          <DocsCard
            title="With action"
            description="Use an action when the user can resolve or inspect the alert from this context."
          >
            <AlertPreviewFrame>
              <AlertExample variant="warning" showAction />
            </AlertPreviewFrame>
          </DocsCard>

          <DocsCard
            title="Narrow layout"
            description="Constrained containers demonstrate wrapping behavior for mobile or dense layouts."
          >
            <AlertPreviewFrame isConstrained>
              <AlertExample variant="error" longMessage showAction />
            </AlertPreviewFrame>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Alerts near the content or action they relate to. Use info for neutral context, success for completed actions, warning for recoverable risk, and error for blocking or failed states. Keep copy concise, make action text specific, and provide a clear a11yIconLabel when the default variant label is not descriptive enough."
        defaultValue="variant='success'"
      />
    </PageWrapper>
  );
}
