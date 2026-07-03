import * as React from 'react';

import {Slot} from '../components/Slot/Slot';
import {Body} from '../components/Text/Text';
import {Button} from '../components/Button/Button';
import {
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

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

const ASCHILD_EXAMPLE = `// Without asChild — wrapper renders its own element
<Trigger>Click me</Trigger>
// → <button>Click me</button>

// With asChild — wrapper merges its behavior onto the child
<Trigger asChild>
  <a href="/help">Click me</a>
</Trigger>
// → <a href="/help" (...wrapper props)>Click me</a>`;

const IMPLEMENTATION_EXAMPLE = `import {Slot} from '../components/Slot';

interface TriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

function Trigger({asChild, children, ...rest}: TriggerProps) {
  const Component = asChild ? Slot : 'button';
  return <Component {...rest}>{children}</Component>;
}`;

export default function SlotPage() {
  return (
    <PageWrapper
      title="Slot"
      category="Core Components"
      description="Lightweight asChild helper. Renders its single child element with all Slot props merged onto that child instead of wrapping it in another element."
    >
      <ExampleSection
        title="What it does"
        description="Slot is the building block behind the asChild pattern used by Trigger components, Form labels, and anywhere we want a wrapper to render as a different element."
      >
        <DocsGrid>
          <DocsCard title="The pattern">
            <pre style={codeBlockStyle}>{ASCHILD_EXAMPLE}</pre>
          </DocsCard>
          <DocsCard title="Sample wrapper implementation">
            <pre style={codeBlockStyle}>{IMPLEMENTATION_EXAMPLE}</pre>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Live demo"
        description="Slot merges its onClick onto the child <button>. Clicking either button triggers the same handler."
      >
        <DocsCard>
          <SlotDemo />
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use Slot inside wrapper components that need to pass behavior (event handlers, ARIA attributes, refs) onto a single child without adding an extra DOM element. Slot expects exactly one React element as its child. For multiple children, use a regular wrapper element."
        defaultValue="<Slot {...props}>{singleChild}</Slot>"
      />
    </PageWrapper>
  );
}

function SlotDemo() {
  const [count, setCount] = React.useState(0);
  const handler = () => setCount((value) => value + 1);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start'}}>
      <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
        <Slot onClick={handler}>
          <Button variant="primary">Triggered via Slot</Button>
        </Slot>
        <Button variant="secondary" onClick={handler}>Triggered directly</Button>
      </div>
      <Body as="p" size="small" color="subtle" style={{margin: 0}}>
        Clicked {count} time{count === 1 ? '' : 's'}.
      </Body>
    </div>
  );
}
