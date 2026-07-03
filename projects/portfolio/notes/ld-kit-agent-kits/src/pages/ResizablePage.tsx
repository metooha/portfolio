import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button';
import {Checkbox} from '../components/Checkbox';
import {Body} from '../components/Text/Text';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../components/Resizable';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const paneStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  padding: 24,
  background: 'var(--ld-semantic-color-fill-subtle)',
  fontWeight: 600,
  boxSizing: 'border-box',
};

const frameStyle: React.CSSProperties = {
  height: 240,
  border: '1px solid var(--ld-semantic-color-separator)',
  borderRadius: 8,
  overflow: 'hidden',
};

function ResizableDemo({direction, withHandle}: {direction: 'horizontal' | 'vertical'; withHandle?: boolean}) {
  const isHorizontal = direction === 'horizontal';
  return (
    <div style={frameStyle}>
      <ResizablePanelGroup direction={direction}>
        <ResizablePanel defaultSize={isHorizontal ? 40 : 50} minSize={20}>
          <div style={paneStyle}>{isHorizontal ? 'Left' : 'Top'}</div>
        </ResizablePanel>
        <ResizableHandle withHandle={withHandle} />
        <ResizablePanel defaultSize={isHorizontal ? 60 : 50} minSize={20}>
          <div style={paneStyle}>{isHorizontal ? 'Right' : 'Bottom'}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default function ResizablePage() {
  const [direction, setDirection] = React.useState<'horizontal' | 'vertical'>('horizontal');
  const [withHandle, setWithHandle] = React.useState(true);

  return (
    <PageWrapper
      title="Resizable"
      category="Shared Components"
      description="Resizable panel groups for split panes, inspector layouts, and adjustable work surfaces."
    >
      <ExampleSection title="Component Configuration" description="Preview horizontal and vertical panel groups with optional visible grip handles.">
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Direction</Body>
                <ButtonGroup aria-label="Resizable direction">
                  <Button size="small" variant={direction === 'horizontal' ? 'primary' : 'secondary'} onClick={() => setDirection('horizontal')}>Horizontal</Button>
                  <Button size="small" variant={direction === 'vertical' ? 'primary' : 'secondary'} onClick={() => setDirection('vertical')}>Vertical</Button>
                </ButtonGroup>
              </div>
              <Checkbox label="Show grip handle" checked={withHandle} onChange={(event) => setWithHandle(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="Drag the separator to resize panels within the fixed frame.">
              <ResizableDemo key={`${direction}-${withHandle}`} direction={direction} withHandle={withHandle} />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Panel Patterns" description="Use a visible grip when discoverability matters; use a plain separator when the surrounding layout already implies resizing.">
        <DocsGrid>
          <DocsCard title="Horizontal split" description="Side-by-side panes for navigation and detail views.">
            <ResizableDemo direction="horizontal" withHandle />
          </DocsCard>
          <DocsCard title="Vertical split" description="Stacked panes for preview and properties layouts.">
            <ResizableDemo direction="vertical" withHandle />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Resizable when users need persistent control over workspace proportions. Set minimum panel sizes, keep labels and empty states responsive, and include a visible handle when resize affordance may be hard to discover."
        defaultValue="orientation='horizontal', withHandle=false"
      />
    </PageWrapper>
  );
}