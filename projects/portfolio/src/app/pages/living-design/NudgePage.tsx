import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {InfoCircleIcon, CheckCircleIcon, WarningIcon, GiftIcon} from '@/living-design/components/Icons/Icons';
import {LinkButton} from '@/living-design/components/LinkButton/LinkButton';
import {Nudge} from '@/living-design/components/Nudge/Nudge';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type NudgeScenario = 'guidance' | 'success' | 'warning' | 'promotion';

const SCENARIOS: Array<{
  value: NudgeScenario;
  label: string;
  description: string;
  title: string;
  body: string;
  actionLabel: string;
  icon: React.ReactNode;
}> = [
  {
    value: 'guidance',
    label: 'Guidance',
    description: 'Non-blocking tips that point users toward a useful next step.',
    title: 'Complete your profile',
    body: 'Add a business address so teammates can find the right store and fulfillment options.',
    actionLabel: 'Add address',
    icon: <InfoCircleIcon size="medium" />,
  },
  {
    value: 'success',
    label: 'Success',
    description: 'Reinforce completed setup or an optional follow-up after success.',
    title: 'Profile complete',
    body: 'Your profile is set up and ready for order and inventory updates.',
    actionLabel: 'View profile',
    icon: <CheckCircleIcon size="medium" />,
  },
  {
    value: 'warning',
    label: 'Warning',
    description: 'Light-risk reminders that are useful but do not block the workflow.',
    title: 'Verify your email',
    body: 'Some account features are limited until you confirm your email address.',
    actionLabel: 'Resend email',
    icon: <WarningIcon size="medium" />,
  },
  {
    value: 'promotion',
    label: 'Promotion',
    description: 'Soft promotional nudges that highlight an opt-in opportunity.',
    title: 'Walmart+ members save more',
    body: 'Get free delivery, member prices, and exclusive perks. Try it free for 30 days.',
    actionLabel: 'Start free trial',
    icon: <GiftIcon size="medium" />,
  },
];

function NudgeDemo({
  scenario,
  showAction = true,
  showSecondaryAction = false,
  dismissible = true,
}: {
  scenario: NudgeScenario;
  showAction?: boolean;
  showSecondaryAction?: boolean;
  dismissible?: boolean;
}) {
  const [open, setOpen] = React.useState(true);
  const config = SCENARIOS.find((item) => item.value === scenario) ?? SCENARIOS[0];

  if (!open) {
    return (
      <Body as="p" size="small" color="subtle" style={{margin: 0}}>
        Nudge dismissed. <Button variant="tertiary" size="small" onClick={() => setOpen(true)}>Restore</Button>
      </Body>
    );
  }

  return (
    <Nudge
      title={config.title}
      leading={config.icon}
      onClose={dismissible ? () => setOpen(false) : undefined}
      actions={
        showAction ? (
          <div style={{display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap'}}>
            <Button variant="primary" size="small">{config.actionLabel}</Button>
            {showSecondaryAction ? <LinkButton size="small">Maybe later</LinkButton> : null}
          </div>
        ) : undefined
      }
    >
      <Body as="p" size="medium" style={{margin: 0}}>{config.body}</Body>
    </Nudge>
  );
}

export default function NudgePage() {
  const [scenario, setScenario] = React.useState<NudgeScenario>('guidance');
  const [showAction, setShowAction] = React.useState(true);
  const [showSecondaryAction, setShowSecondaryAction] = React.useState(true);
  const [dismissible, setDismissible] = React.useState(true);
  const active = SCENARIOS.find((item) => item.value === scenario) ?? SCENARIOS[0];

  return (
    <PageWrapper
      title="Nudge"
      category="Core Components"
      description="Non-critical supportive messages with optional leading icon, actions, and dismiss button."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview the nudge scenario, action visibility, and dismissibility."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Scenario</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the message purpose before configuring actions.
                </Body>
              </div>
              <ButtonGroup aria-label="Nudge scenario">
                {SCENARIOS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={scenario === item.value ? 'primary' : 'secondary'}
                    aria-pressed={scenario === item.value}
                    onClick={() => setScenario(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Show primary action" checked={showAction} onChange={(event) => setShowAction(event.target.checked)} />
                <Checkbox label="Show secondary action" checked={showSecondaryAction} onChange={(event) => setShowSecondaryAction(event.target.checked)} />
                <Checkbox label="Dismissible" checked={dismissible} onChange={(event) => setDismissible(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={active.label} description={active.description}>
              <NudgeDemo
                scenario={scenario}
                showAction={showAction}
                showSecondaryAction={showSecondaryAction}
                dismissible={dismissible}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Scenarios" description="Use the leading icon and copy that match the message purpose.">
        <DocsGrid>
          {SCENARIOS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <NudgeDemo scenario={item.value} />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Nudge for non-critical guidance, success follow-ups, light-risk reminders, and promotional opt-ins. Provide a leading icon that matches the message tone, keep copy short, and include a dismiss button when the nudge is optional. Avoid using Nudge for blocking errors — use Alert or Modal instead."
        defaultValue="title required, leading and actions optional"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            <strong>Heading level.</strong> The Nudge title renders as a styled <code>&lt;span&gt;</code> by default — no heading semantics. When a Nudge is the primary heading of a section or card, pass <code>titleAs="h2"</code> (or the appropriate level) so it participates in the page's document outline and assistive technology users can navigate directly to it.
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            <strong>Leading icon.</strong> Icons in the leading slot are decorative by default. If the icon conveys meaning not expressed in the title or body copy (e.g. a warning icon that signals urgency), pass <code>leadingIconLabel</code> with a short description so screen readers announce it.
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            <strong>Dismiss button.</strong> When <code>onClose</code> is provided, the close button's accessible label defaults to <code>"Close [title]"</code> (e.g. <code>"Close Complete your profile"</code>). Override it via <code>closeButtonProps.a11yLabel</code> when a more specific label is needed. On dismiss, focus moves to a temporary announcement node placed in the same DOM position as the removed Nudge, so keyboard and screen reader users are not stranded.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
