import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {Body} from '../components/Text/Text';
import {
  SnackbarProvider,
  useSnackbar,
} from '../components/Snackbar/Snackbar';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type SnackbarMessageType = 'basic' | 'success' | 'warning' | 'long';

const MESSAGE_OPTIONS: Array<{
  type: SnackbarMessageType;
  label: string;
  message: string;
  actionLabel: string;
  description: string;
}> = [
  {
    type: 'basic',
    label: 'Basic',
    message: 'Campaign saved as draft.',
    actionLabel: 'View',
    description: 'Use for brief confirmation or process feedback.',
  },
  {
    type: 'success',
    label: 'Success',
    message: 'Item moved to cart.',
    actionLabel: 'Open cart',
    description: 'Use after a lightweight action completes successfully.',
  },
  {
    type: 'warning',
    label: 'Undo',
    message: 'Item moved to trash.',
    actionLabel: 'Undo',
    description: 'Use when a short-lived action can be reversed.',
  },
  {
    type: 'long',
    label: 'Long',
    message:
      'Sync completed for 47 of 50 records. Three records failed validation and were skipped. Review them on the Errors tab to retry.',
    actionLabel: 'Review',
    description: 'Use only when extra context is necessary for the process result.',
  },
];

function getMessageOption(type: SnackbarMessageType) {
  return MESSAGE_OPTIONS.find((item) => item.type === type) ?? MESSAGE_OPTIONS[0];
}

export default function SnackbarPage() {
  return (
    <PageWrapper
      title="Snackbar"
      category="Core Components"
      description="Brief bottom-of-screen messages that confirm app processes and may include one contextual action."
    >
      <SnackbarProvider>
        <SnackbarContent />
      </SnackbarProvider>
    </PageWrapper>
  );
}

function SnackbarContent() {
  const {addSnack} = useSnackbar();
  const [messageType, setMessageType] = React.useState<SnackbarMessageType>('basic');
  const [showAction, setShowAction] = React.useState(true);
  const [lastAction, setLastAction] = React.useState<string | null>(null);
  const [count, setCount] = React.useState(0);
  const selectedOption = getMessageOption(messageType);

  const showSnackbar = React.useCallback(
    (option = selectedOption, includeAction = showAction) => {
      addSnack({
        message: option.message,
        actionButtonProps: includeAction
          ? {
              children: option.actionLabel,
              onClick: () => setLastAction(`${option.actionLabel} clicked`),
            }
          : undefined,
      });
    },
    [addSnack, selectedOption, showAction]
  );

  return (
    <>
      <ExampleSection
        title="Component Configuration"
        description="Choose a message type and trigger a live snackbar from the current configuration."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Message type
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Snackbars should stay short and directly tied to the process that just happened.
                </Body>
              </div>

              <ButtonGroup aria-label="Snackbar message type">
                {MESSAGE_OPTIONS.map((option) => (
                  <Button
                    key={option.type}
                    size="small"
                    variant={messageType === option.type ? 'primary' : 'secondary'}
                    aria-pressed={messageType === option.type}
                    onClick={() => setMessageType(option.type)}
                  >
                    {option.label}
                  </Button>
                ))}
              </ButtonGroup>

              <Checkbox
                label="Include action"
                checked={showAction}
                onChange={(event) => setShowAction(event.target.checked)}
              />
            </>
          }
          preview={
            <DocsCard title={`${selectedOption.label} snackbar`} description={selectedOption.description}>
              <div style={{display: 'grid', gap: 12, justifyItems: 'start'}}>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  {selectedOption.message}
                </Body>
                <Button variant="primary" size="medium" onClick={() => showSnackbar()}>
                  Show snackbar
                </Button>
                {lastAction && (
                  <Body as="span" size="small" color="subtle">
                    {lastAction}
                  </Body>
                )}
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Trigger patterns"
        description="Use cards to compare common snackbar behaviors without stacking multiple live snackbars at once."
      >
        <DocsGrid>
          {MESSAGE_OPTIONS.slice(0, 3).map((option) => (
            <DocsCard key={option.type} title={option.label} description={option.description}>
              <Button variant="primary" size="medium" onClick={() => showSnackbar(option, option.type !== 'basic')}>
                {option.type === 'warning' ? 'Move to trash' : 'Show snackbar'}
              </Button>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Message length and replacement"
        description="Longer messages stay visible longer, and a new snackbar replaces the previous one."
      >
        <DocsGrid>
          <DocsCard title="Long message" description="Use longer copy sparingly and only when the process result needs context.">
            <Button variant="primary" size="medium" onClick={() => showSnackbar(getMessageOption('long'), true)}>
              Show long snackbar
            </Button>
          </DocsCard>

          <DocsCard title="Replacement" description="Only one snackbar is shown at a time; each new trigger replaces the prior message.">
            <Button
              variant="secondary"
              size="medium"
              onClick={() => {
                const nextCount = count + 1;
                setCount(nextCount);
                addSnack({
                  message: `Snackbar #${nextCount} fired.`,
                  actionButtonProps: {
                    children: 'OK',
                    onClick: () => {},
                  },
                });
              }}
            >
              Fire another ({count})
            </Button>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use snackbars for brief process feedback after an action completes. Keep messages short, avoid icons, and include no more than one action. Use specific action text such as Undo or Review. Do not use snackbars for blocking errors, persistent page status, or information the user must read before continuing."
        defaultValue="duration scales with message length"
      />
    </>
  );
}