import * as React from 'react';
import {
  A11yDevAssertions,
  A11yDevAssertionsPreview,
} from '../components/A11yDevAssertions/A11yDevAssertions';
import {Button} from '../components/Button/Button';
import {Body, Caption, Heading} from '../components/Text/Text';
import {PageWrapper} from './shared';

const DEV_ASSERTIONS_EXAMPLE = `function App() {
  return (
    <>
      <A11yDevAssertions />
      <Page />
    </>
  );
}`;

function CodeBlock({children}: {children: string}) {
  return (
    <pre
      tabIndex={0}
      style={{
        margin: 0,
        padding: '14px 16px',
        overflowX: 'auto',
        borderRadius: '8px',
        background: '#1F2937',
        color: '#F9FAFB',
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Courier New', monospace",
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

function StatusCard({title, value}: {title: string; value: string}) {
  return (
    <div
      style={{
        border: '1px solid #E6E6E8',
        borderRadius: '8px',
        padding: '12px',
        background: '#FFFFFF',
      }}
    >
      <Caption as="p" color="subtle" style={{margin: '0 0 4px'}}>
        {title}
      </Caption>
      <Body as="p" size="small" weight="alt" style={{margin: 0}}>
        {value}
      </Body>
    </div>
  );
}

function DevAssertionPreviewTrigger() {
  const [showPreview, setShowPreview] = React.useState(false);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center'}}>
        <Button variant="primary" size="small" onClick={() => setShowPreview(true)}>
          Show alert example
        </Button>
      </div>

      <div style={{border: '1px solid #E6E6E8', borderRadius: '8px', padding: '12px'}}>
        <Caption as="p" color="subtle" style={{margin: '0 0 4px'}}>
          Alert preview
        </Caption>
        <Body as="p" size="small" color="subtle" style={{margin: 0}}>
          Opens the same alertdialog card rendered by A11yDevAssertions, using sample violations and no thrown runtime error.
        </Body>
      </div>
      <A11yDevAssertionsPreview open={showPreview} onClose={() => setShowPreview(false)} />
    </div>
  );
}

export default function A11ySystemPage() {
  const scannerStatus = import.meta.env.MODE === 'production'
    ? 'No-op in production builds'
    : 'Mounted on this page in development';

  return (
    <PageWrapper
      title="Accessibility Checks"
      category="SYSTEM"
      description="Development-time accessibility checks that surface DOM issues with console, terminal, Vite overlay, and in-page alert signals."
    >
      <A11yDevAssertions />

      <section style={{display: 'grid', gap: '16px'}}>
        <div>
          <Heading as="h2" size="medium" style={{margin: '0 0 8px'}}>
            Dev Assertions
          </Heading>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, maxWidth: '720px'}}>
            Mount the scanner once while developing. It watches the DOM and reports missing landmarks, broken heading order, unlabeled controls, duplicate IDs, and invalid interactive patterns.
          </Body>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px'}}>
          <StatusCard title="Runtime" value={scannerStatus} />
          <StatusCard title="Signal" value="Console, Vite overlay, terminal report, and in-page alert card" />
          <StatusCard title="Production" value="Tree-shaken no-op" />
        </div>

        <div
          style={{
            border: '1px solid #E6E6E8',
            borderRadius: '8px',
            padding: '20px',
            display: 'grid',
            gap: '16px',
          }}
        >
          <DevAssertionPreviewTrigger />
          <CodeBlock>{DEV_ASSERTIONS_EXAMPLE}</CodeBlock>
        </div>
      </section>
    </PageWrapper>
  );
}
