import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {ScrimOverlay} from '@/living-design/components/ScrimOverlay/ScrimOverlay';
import {Spinner} from '@/living-design/components/Spinner/Spinner';
import {Body, Heading} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type ScrimScenario = 'bare' | 'loading' | 'customSurface';

const SCENARIOS: Array<{value: ScrimScenario; label: string; description: string}> = [
  {value: 'bare', label: 'Bare', description: 'Use as the dimming primitive behind a custom overlay.'},
  {value: 'loading', label: 'Loading', description: 'Block interaction while an operation is in progress.'},
  {value: 'customSurface', label: 'Surface', description: 'Compose a small custom dialog above the scrim.'},
];

const CUSTOM_SURFACE_HEADING_ID = 'scrim-custom-surface-heading';

function ScrimContent({scenario, onClose}: {scenario: ScrimScenario; onClose: () => void}) {
  const dialogRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // The Overlay portal container is appended to <body> in a sibling useEffect,
    // so the element isn't in the document yet on the first render pass.
    // Deferring with rAF ensures focus runs after the portal is attached.
    const raf = requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  if (scenario === 'loading') {
    return (
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Content is loading here, please wait"
        tabIndex={-1}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '16px 24px',
          borderRadius: 8,
          background: 'var(--ld-semantic-color-surface, #ffffff)',
          boxShadow: '0 5px 10px 3px rgba(0,0,0,0.15), 0 -1px 4px 0 rgba(0,0,0,0.1)',
          outline: 'none',
        }}
      >
        <Spinner size="small" a11yLabel="Loading, please wait..." />
        <Body as="span" size="medium" weight="alt">
          Working...
        </Body>
      </div>
    );
  }

  if (scenario === 'customSurface') {
    return (
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={CUSTOM_SURFACE_HEADING_ID}
        tabIndex={-1}
        style={{
          width: 'min(420px, 90vw)',
          padding: 24,
          borderRadius: 8,
          background: 'var(--ld-semantic-color-surface, #ffffff)',
          boxShadow: '0 5px 10px 3px rgba(0,0,0,0.15), 0 -1px 4px 0 rgba(0,0,0,0.1)',
          outline: 'none',
        }}
      >
        <Heading as="h3" id={CUSTOM_SURFACE_HEADING_ID} size="small" style={{margin: 0}}>
          Custom surface
        </Heading>
        <Body as="p" size="medium" color="subtle" style={{margin: '8px 0 16px', lineHeight: '1.5'}}>
          This surface is composed above ScrimOverlay. Press the button, click the scrim, or use Escape to close when dismissal is enabled.
        </Body>
        <div style={{marginTop: 24}}>
          <Button variant="primary" size="medium" onClick={onClose}>
            Close surface
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

function ScrimTrigger({
  scenario,
  dismissOnClick = true,
  dismissOnEscape = true,
  label,
}: {
  scenario: ScrimScenario;
  dismissOnClick?: boolean;
  dismissOnEscape?: boolean;
  label: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const returnFocusRef = React.useRef<Element | null>(null);

  const handleOpen = () => {
    returnFocusRef.current = document.activeElement;
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    (returnFocusRef.current as HTMLElement | null)?.focus();
  };

  return (
    <>
      <Button variant="primary" size="medium" onClick={handleOpen}>
        {label}
      </Button>
      <ScrimOverlay
        isOpen={isOpen}
        onClose={handleClose}
        dismissOnClick={dismissOnClick}
        dismissOnEscape={dismissOnEscape}
      >
        <ScrimContent scenario={scenario} onClose={handleClose} />
      </ScrimOverlay>
    </>
  );
}

export default function ScrimOverlayPage() {
  const [scenario, setScenario] = React.useState<ScrimScenario>('customSurface');
  const [dismissOnClick, setDismissOnClick] = React.useState(true);
  const [dismissOnEscape, setDismissOnEscape] = React.useState(true);
  const selectedScenario = SCENARIOS.find((item) => item.value === scenario) ?? SCENARIOS[2];

  return (
    <PageWrapper
      title="Scrim Overlay"
      category="Core Components"
      description="The dimming primitive behind custom overlay surfaces, loading blockers, and dialog-like compositions."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview dismissal rules and optional content rendered above the scrim."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Scenario
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the type of content rendered above the scrim.
                </Body>
              </div>
              <ButtonGroup aria-label="Scrim overlay scenario">
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
                <Checkbox
                  label="Dismiss on scrim click"
                  checked={dismissOnClick}
                  onChange={(event) => setDismissOnClick(event.target.checked)}
                />
                <Checkbox
                  label="Dismiss on Escape"
                  checked={dismissOnEscape}
                  onChange={(event) => setDismissOnEscape(event.target.checked)}
                />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${selectedScenario.label} scrim`} description={selectedScenario.description}>
              <ScrimTrigger
                scenario={scenario}
                dismissOnClick={dismissOnClick}
                dismissOnEscape={dismissOnEscape}
                label="Show scrim"
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Composition Patterns"
        description="Scrim Overlay is usually used indirectly by Modal, Panel, and Bottom Sheet. Use these cards only for custom overlay composition."
      >
        <DocsGrid>
          {SCENARIOS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <ScrimTrigger scenario={item.value} label={`Show ${item.label.toLowerCase()}`} />
            </DocsCard>
          ))}
          <DocsCard title="Persistent" description="Disable both auto-dismiss paths when the user must pick an explicit action.">
            <ScrimTrigger
              scenario="customSurface"
              dismissOnClick={false}
              dismissOnEscape={false}
              label="Show persistent"
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Prefer Modal, Panel, or Bottom Sheet for standard product overlays because they include structure, focus behavior, and a scrim. Use Scrim Overlay directly only when composing a custom surface or temporary blocker. Provide a clear escape path unless the task truly requires a persistent state, and avoid leaving the page dimmed without visible feedback."
        defaultValue="dismissOnClick={true} dismissOnEscape={true}"
      />
    </PageWrapper>
  );
}