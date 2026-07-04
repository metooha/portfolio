import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from '@/app/components/Collapsible/Collapsible';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const triggerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '12px 16px',
  background: 'var(--ld-semantic-color-surface, #fff)',
  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  borderRadius: 8,
  font: 'inherit',
  fontWeight: 600,
  cursor: 'pointer',
};

const FAQS = [
  {q: 'How do I track my order?', a: 'Open Account → Orders and select the order to see live tracking.'},
  {q: 'What is the return window?', a: 'Most items can be returned within 90 days with a receipt.'},
];

export default function CollapsiblePage() {
  return (
    <PageWrapper
      title="Collapsible"
      category="Core Components"
      description="A headless expand/collapse primitive. Collapsible manages open state and exposes it via data-state; you supply the trigger and content markup."
    >
      <ExampleSection title="FAQ list" description="Compose Collapsible with CollapsibleTrigger and CollapsibleContent. Each item manages its own state.">
        <div style={{display: 'grid', gap: 12, maxWidth: 560}}>
          {FAQS.map((item) => (
            <Collapsible key={item.q} defaultOpen={false}>
              <CollapsibleTrigger style={triggerStyle}>
                <span>{item.q}</span>
                <span aria-hidden style={{color: 'var(--ld-semantic-color-text-subtle, #74767c)'}}>▾</span>
              </CollapsibleTrigger>
              <CollapsibleContent style={{padding: '12px 16px'}}>
                <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>{item.a}</Body>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Collapsible when you need full control over the trigger and content markup — FAQs, filter groups, and disclosure rows. It ships no visual styling; style the trigger and content yourself and hook into the data-state attribute for open/closed theming. For a fully styled, single-open-at-a-time group, use Accordion."
        defaultValue="defaultOpen={false}  disabled={false}"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            CollapsibleTrigger renders a button with <code>aria-expanded</code> reflecting the open state. Content unmounts when closed.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
