import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button';
import {Checkbox} from '../components/Checkbox';
import {Body} from '../components/Text/Text';
import {HeaderSection, type HeaderSectionSize} from '../components/HeaderSection';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const FRAME: React.CSSProperties = {
  borderRadius: 8,
  background: 'var(--ld-semantic-color-surface, #ffffff)',
  maxWidth: 560,
  overflow: 'hidden',
};

export default function HeaderSectionPage() {
  const [size, setSize] = React.useState<HeaderSectionSize>('medium');
  const [expanded, setExpanded] = React.useState(true);
  const [showDivider, setShowDivider] = React.useState(true);
  const [contentInset, setContentInset] = React.useState(false);

  return (
    <PageWrapper
      title="Header Section"
      category="Subsystem Components"
      description="A section-level header that creates hierarchy inside a screen with medium action headers or small expandable section headers."
    >
      <ExampleSection
        title="Component Configuration"
        description="Switch between medium and small section header behavior."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Size</Body>
                <ButtonGroup>
                  <Button size="small" variant={size === 'medium' ? 'primary' : 'secondary'} onClick={() => setSize('medium')}>Medium</Button>
                  <Button size="small" variant={size === 'small' ? 'primary' : 'secondary'} onClick={() => setSize('small')}>Small</Button>
                </ButtonGroup>
              </div>
              <Checkbox label="Expanded" checked={expanded} disabled={size !== 'small'} onChange={(event) => setExpanded(event.target.checked)} />
              <Checkbox label="Show divider" checked={showDivider} onChange={(event) => setShowDivider(event.target.checked)} />
              <Checkbox label="Content inset" checked={contentInset} onChange={(event) => setContentInset(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="Small headers expose an expand/collapse affordance.">
              <div style={FRAME}>
                <HeaderSection
                  size={size}
                  title={size === 'medium' ? "Today's Plan" : 'Filters'}
                  count={size === 'medium' ? 5 : 3}
                  description={size === 'medium' ? 'Review and start a personalized action.' : 'Currently applied filters.'}
                  trailingLabel="See all"
                  expanded={size === 'small' ? expanded : undefined}
                  showDivider={showDivider}
                  contentInset={contentInset}
                  onTrailingAction={size === 'small' ? () => setExpanded((value) => !value) : undefined}
                />
                {size === 'small' && expanded ? (
                  <div style={{padding: 16, background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)'}}>
                    <Body as="p" size="small" style={{margin: 0}}>Category: Electronics</Body>
                  </div>
                ) : null}
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Section Patterns" description="Use medium for section-level actions and small for collapsible subsections.">
        <DocsGrid>
          <DocsCard title="Medium" description="Heading-medium title with a right-aligned LinkButton.">
            <div style={FRAME}><HeaderSection size="medium" title="Recommended for you" count={8} trailingLabel="See all" description="Curated picks based on recent activity." /></div>
          </DocsCard>
          <DocsCard title="Small controlled" description="Use controlled expanded state when the page owns the hidden content.">
            <div style={FRAME}>
              <HeaderSection size="small" title="Product details" count={2} expanded={expanded} onTrailingAction={() => setExpanded((value) => !value)} />
              {expanded ? <div style={{padding: 16}}><Body as="p" size="small" style={{margin: 0}}>Warranty and shipping details.</Body></div> : null}
            </div>
          </DocsCard>
          <DocsCard title="Inset content" description="Inset padding affects header content while the divider remains full width.">
            <div style={FRAME}><HeaderSection title="Recent activity" trailingLabel="View all" contentInset /></div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use medium headers for major page sections and small headers for expandable groups. Keep trailing labels short and keep controlled expanded state in sync with the content beneath the header."
        defaultValue="size='medium', showDivider=true, contentInset=false"
      />
    </PageWrapper>
  );
}