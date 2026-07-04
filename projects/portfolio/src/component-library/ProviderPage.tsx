import * as React from 'react';

import {Body, Caption, Heading} from '@/app/components/Text/Text';
import {Button} from '@/app/components/Button/Button';
import {
  DefaultBreakpointProvider,
  useDefaultBreakpoint,
} from '@/app/components/DefaultBreakpoint/DefaultBreakpoint';
import {ComponentProvider} from '@/app/components';
import {useSnackbar} from '@/app/components/Snackbar/Snackbar';
import {useAnnounce} from '@/app/components/A11yAnnouncement/A11yAnnouncement';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const SETUP_CODE = `import {ComponentProvider} from '@walmart/livingdesign-react';

export default function App() {
  return (
    <ComponentProvider defaultBreakpoint="medium">
      <Routes />
    </ComponentProvider>
  );
}`;

const codeBlockStyle: React.CSSProperties = {
  padding: 16,
  borderRadius: 8,
  background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
  border: '1px solid var(--ld-semantic-color-separator, #e6e6e8)',
  fontFamily: 'monospace',
  fontSize: 13,
  lineHeight: 1.6,
  margin: 0,
  whiteSpace: 'pre-wrap',
  overflowX: 'auto',
};

const inlineCodeStyle: React.CSSProperties = {
  padding: '4px 8px',
  borderRadius: 4,
  background: 'var(--ld-semantic-color-surface, #ffffff)',
  border: '1px solid var(--ld-semantic-color-separator, #e6e6e8)',
  fontFamily: 'monospace',
  fontSize: 13,
};

function BreakpointPreview() {
  const breakpoint = useDefaultBreakpoint();
  return (
    <div
      style={{
        padding: 16,
        background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
        border: '1px solid var(--ld-semantic-color-separator, #e6e6e8)',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <Body as="span" size="small" color="subtle">defaultBreakpoint:</Body>
      <code style={inlineCodeStyle}>{breakpoint}</code>
    </div>
  );
}

function SnackbarTrigger() {
  const {addSnack} = useSnackbar();
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
      <Button
        variant="primary"
        size="medium"
        onClick={() => addSnack({message: 'Saved successfully.'})}
      >
        Show simple snack
      </Button>
      <Button
        variant="secondary"
        size="medium"
        onClick={() =>
          addSnack({
            message: 'Item moved to trash.',
            actionButtonProps: {children: 'Undo', onClick: () => {}},
          })
        }
      >
        Show snack with action
      </Button>
    </div>
  );
}

function AnnounceTrigger() {
  const announce = useAnnounce();
  const [lastMessage, setLastMessage] = React.useState<string | null>(null);

  const triggerPolite = () => {
    const msg = 'Filter applied. Showing 12 results.';
    announce.polite(msg);
    setLastMessage(`polite: ${msg}`);
  };

  const triggerAssertive = () => {
    const msg = 'Session expires in 1 minute. Save your work.';
    announce.assertive(msg);
    setLastMessage(`assertive: ${msg}`);
  };

  return (
    <div style={{display: 'grid', gap: 12}}>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
        <Button variant="primary" size="medium" onClick={triggerPolite}>Polite announce</Button>
        <Button variant="secondary" size="medium" onClick={triggerAssertive}>Assertive announce</Button>
      </div>
      {lastMessage ? (
        <Body as="p" size="small" color="subtle" style={{margin: 0}}>Last fired: {lastMessage}</Body>
      ) : null}
    </div>
  );
}

const HOOKS = [
  {
    name: 'useDefaultBreakpoint',
    purpose: 'Returns the SSR-safe breakpoint value set on the provider.',
  },
  {
    name: 'useSnackbar',
    purpose: 'Returns { addSnack } for pushing snackbar messages.',
  },
  {
    name: 'useAnnounce',
    purpose: 'Returns { polite, assertive } for screen-reader-only announcements.',
  },
  {
    name: 'useComponentContext',
    purpose: 'Returns the active component context value; rarely needed directly.',
  },
];

function HooksReference() {
  return (
    <div style={{display: 'grid', gap: 12}}>
      {HOOKS.map((hook) => (
        <div
          key={hook.name}
          style={{
            display: 'grid',
            gap: 4,
            padding: 12,
            borderRadius: 8,
            border: '1px solid var(--ld-semantic-color-separator, #e6e6e8)',
            background: 'var(--ld-semantic-color-surface, #ffffff)',
          }}
        >
          <code style={inlineCodeStyle}>{hook.name}()</code>
          <Body as="p" size="small" color="subtle" style={{margin: 0}}>{hook.purpose}</Body>
        </div>
      ))}
    </div>
  );
}

function ProviderStackDiagram() {
  const layers = [
    'LivingDesignSSRProvider',
    'A11yAnnouncementProvider',
    'DefaultBreakpointProvider',
    'SnackbarProvider',
  ];
  return (
    <div style={{display: 'grid', gap: 8}}>
      {layers.map((layer, index) => (
        <div
          key={layer}
          style={{
            padding: '10px 14px',
            marginLeft: index * 16,
            borderRadius: 8,
            border: '1px solid var(--ld-semantic-color-separator, #e6e6e8)',
            background: 'var(--ld-semantic-color-surface, #ffffff)',
          }}
        >
          <code style={inlineCodeStyle}>{layer}</code>
        </div>
      ))}
      <Caption as="p" color="subtle" style={{marginTop: 8}}>
        ComponentProvider wraps these four nested providers. You only render this one.
      </Caption>
    </div>
  );
}

export default function ProviderPage() {
  return (
    <PageWrapper
      title="Component Provider"
      category="System"
      description="Component Provider is the single utility component that wires up every cross-cutting React context the kit needs at the root of your app — SSR, accessibility live announcements, default responsive breakpoint, and snackbar. Mount it once at the top of your tree and consume the contexts via hooks below."
    >
      <ExampleSection
        title="What it composes"
        description="ComponentProvider wraps four nested providers. You only need to render this one — the rest are wired up internally."
      >
        <ProviderStackDiagram />
      </ExampleSection>

      <ExampleSection
        title="Setup"
        description="Wrap your app once at the root. Pass defaultBreakpoint to set the SSR breakpoint when the viewport isn't yet known."
      >
        <pre style={codeBlockStyle}>{SETUP_CODE}</pre>
        <Caption as="p" color="subtle" style={{marginTop: 12}}>
          Only render <code style={inlineCodeStyle}>ComponentProvider</code> once. Mounting two triggers an invariant warning to prevent context conflicts.
        </Caption>
      </ExampleSection>

      <ExampleSection
        title="Default breakpoint context"
        description="useDefaultBreakpoint returns the SSR-safe breakpoint set on the provider. Each block below mounts its own DefaultBreakpointProvider so you can see the context in isolation."
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          {(['small', 'medium', 'large', 'xlarge', 'xxlarge'] as const).map((bp) => (
            <DefaultBreakpointProvider key={bp} defaultBreakpoint={bp}>
              <BreakpointPreview />
            </DefaultBreakpointProvider>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Snackbar context"
        description="Once ComponentProvider is mounted, any descendant can call useSnackbar().addSnack() — no extra wiring needed."
      >
        <ComponentProvider defaultBreakpoint="large">
          <SnackbarTrigger />
        </ComponentProvider>
      </ExampleSection>

      <ExampleSection
        title="Accessibility announcements"
        description="useAnnounce() returns polite() and assertive() methods that push messages into hidden live regions mounted by the A11yAnnouncementProvider. Toggle a screen reader to hear the announcements below."
      >
        <ComponentProvider defaultBreakpoint="large">
          <AnnounceTrigger />
        </ComponentProvider>
      </ExampleSection>

      <ExampleSection
        title="Hooks reference"
        description="The hooks that ComponentProvider's nested providers expose."
      >
        <HooksReference />
      </ExampleSection>

      <GuidelinesSection
        description="Mount ComponentProvider once at the root of your app. Pass a defaultBreakpoint for SSR-safe rendering before the real viewport is measured. Consume context via the hooks; do not mount any nested provider manually unless you have a specific isolation need (this page mounts inner scopes only to demo each hook independently)."
        defaultValue="defaultBreakpoint='medium'"
      />
    </PageWrapper>
  );
}
