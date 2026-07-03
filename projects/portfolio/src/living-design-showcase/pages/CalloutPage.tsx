import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {Callout, CalloutLink, type CalloutPosition} from '@/living-design/components/Callout/Callout';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const POSITION_OPTIONS: Array<{position: CalloutPosition; label: string}> = [
  {position: 'bottomCenter', label: 'Bottom'},
  {position: 'topCenter', label: 'Top'},
  {position: 'right', label: 'Right'},
  {position: 'left', label: 'Left'},
];

function CalloutDemo({
  position,
  isOpen,
  onOpenChange,
  label = 'Get started',
  children,
}: {
  position: CalloutPosition;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  label?: string;
  children: React.ReactNode;
}) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div style={{display: 'flex', justifyContent: 'center', padding: 56}}>
      <Callout
        a11yContentLabel={`${label} guidance`}
        isOpen={isOpen}
        onClose={() => onOpenChange(false)}
        position={position}
        trigger={
          <Button ref={triggerRef} variant="primary" onClick={() => onOpenChange(!isOpen)}>
            {label}
          </Button>
        }
        triggerRef={triggerRef}
      >
        {children}
      </Callout>
    </div>
  );
}

const TOUR_STEPS = [
  {
    label: 'Build your audience',
    message: 'Pick the qualified completes and target audience for this survey.',
  },
  {
    label: 'Slice with enrichments',
    message: 'Layer enrichment data to segment results without extra setup.',
  },
  {
    label: 'Review and submit',
    message: 'Preview projected cost and submit when everything looks right.',
  },
];

function TourCalloutDemo() {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = React.useState(true);
  const [step, setStep] = React.useState(0);

  const isLastStep = step === TOUR_STEPS.length - 1;
  const current = TOUR_STEPS[step];

  function restart() {
    setStep(0);
    setIsOpen(true);
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', padding: 56}}>
      <Callout
        a11yContentLabel={`${current.label} — tour step ${step + 1} of ${TOUR_STEPS.length}`}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="bottomCenter"
        stepIndicator={`${step + 1}/${TOUR_STEPS.length}`}
        UNSAFE_style={{minWidth: 328}}
        trigger={
          <Button ref={triggerRef} variant="primary" onClick={isOpen ? restart : () => setIsOpen(true)}>
            {isOpen ? 'Restart tour' : 'Start tour'}
          </Button>
        }
        triggerRef={triggerRef}
        actions={
          <>
            <CalloutLink onClick={() => setIsOpen(false)}>Skip</CalloutLink>
            <Button
              size="small"
              variant="secondary"
              onClick={() => {
                if (isLastStep) {
                  setIsOpen(false);
                } else {
                  setStep((value) => value + 1);
                }
              }}
            >
              {isLastStep ? 'Done' : 'Next'}
            </Button>
          </>
        }
      >
        <span style={{display: 'block', fontWeight: 700}}>{current.label}</span>
        <span style={{display: 'block', fontWeight: 400, marginTop: 4}}>
          {current.message}
        </span>
      </Callout>
    </div>
  );
}

export default function CalloutPage() {
  const [position, setPosition] = React.useState<CalloutPosition>('bottomCenter');
  const [isOpen, setIsOpen] = React.useState(true);
  const [longMessage, setLongMessage] = React.useState(false);
  const [bottomOpen, setBottomOpen] = React.useState(true);
  const [rightOpen, setRightOpen] = React.useState(true);
  const message = longMessage
    ? 'Use this tip to explain one useful next step without covering the task the user is trying to complete.'
    : 'Use this tip to explain the next step.';

  return (
    <PageWrapper
      title="Callout"
      category="Core Components"
      description="Contextual overlays for onboarding, coaching, and short tips anchored to a trigger element."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview callout placement, open state, and content length from one anchored trigger."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Position
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose a placement that keeps the tip close to its trigger.
                </Body>
              </div>
              <ButtonGroup aria-label="Callout position">
                {POSITION_OPTIONS.map((item) => (
                  <Button
                    key={item.position}
                    size="small"
                    variant={position === item.position ? 'primary' : 'secondary'}
                    aria-pressed={position === item.position}
                    onClick={() => {
                      setPosition(item.position);
                      setIsOpen(true);
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Open callout" checked={isOpen} onChange={(event) => setIsOpen(event.target.checked)} />
                <Checkbox label="Use longer content" checked={longMessage} onChange={(event) => setLongMessage(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title="Anchored preview" description="The callout opens from the trigger and returns focus when it closes.">
              <CalloutDemo position={position} isOpen={isOpen} onOpenChange={setIsOpen}>
                {message}
              </CalloutDemo>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Placement examples"
        description="Use cards to compare common placements without crowding the same trigger."
      >
        <DocsGrid>
          <DocsCard title="Bottom placement" description="Use below-trigger callouts when there is room beneath the target.">
            <CalloutDemo position="bottomCenter" isOpen={bottomOpen} onOpenChange={setBottomOpen} label="Bottom tip">
              Explain why this action matters.
            </CalloutDemo>
          </DocsCard>
          <DocsCard title="Side placement" description="Use side callouts when the trigger sits in a vertical flow or toolbar.">
            <CalloutDemo position="right" isOpen={rightOpen} onOpenChange={setRightOpen} label="Side tip">
              Point out a helpful shortcut.
            </CalloutDemo>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Touring experience"
        description="Slot custom actions into the footer — a step indicator, a skip link, and a primary button — to guide users through a multi-step tour."
      >
        <DocsCard
          title="Multi-step tour"
          description="Pass a stepIndicator and an actions slot to advance through coaching steps from one anchored callout."
        >
          <TourCalloutDemo />
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="Usage patterns"
        description="Callouts should teach or coach one focused action at a time."
      >
        <DocsGrid>
          <DocsCard title="Onboarding" description="Introduce an important control the first time users encounter it.">
            <Button variant="primary">Start setup</Button>
          </DocsCard>
          <DocsCard title="Contextual help" description="Explain why a nearby option matters without sending the user away.">
            <Button variant="secondary">View settings</Button>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use callouts sparingly for onboarding, feature discovery, contextual help, and short tips. Keep the message focused on one trigger and one next step. Provide a clear dismiss path, avoid covering key content, keep the trigger keyboard accessible, and set a descriptive a11yContentLabel for assistive technology."
        defaultValue="position='bottomCenter', isOpen=false"
      />
    </PageWrapper>
  );
}
