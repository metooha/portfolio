import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Label} from '@/app/components/Label/Label';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid, DocsCard} from './shared';

const inputStyle: React.CSSProperties = {
  height: 40,
  padding: '0 12px',
  borderRadius: 8,
  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  font: 'inherit',
  width: '100%',
  boxSizing: 'border-box',
};

export default function LabelPage() {
  return (
    <PageWrapper
      title="Label"
      category="Core Components"
      description="An accessible caption for a form control. Associate a Label with its input using htmlFor so screen readers announce the field name."
    >
      <ExampleSection
        title="Default"
        description="Pair every input with a Label wired through matching htmlFor / id values."
      >
        <div style={{display: 'grid', gap: 6, maxWidth: 360}}>
          <Label htmlFor="label-demo-email">Email address</Label>
          <input id="label-demo-email" type="email" placeholder="you@example.com" style={inputStyle} />
        </div>
      </ExampleSection>

      <ExampleSection title="States" description="Labels expose a disabled look via the disabled prop (also forwarded as data-disabled).">
        <DocsGrid minColumnWidth={220}>
          <DocsCard title="Enabled">
            <div style={{display: 'grid', gap: 6}}>
              <Label htmlFor="label-demo-name">Full name</Label>
              <input id="label-demo-name" type="text" placeholder="Jane Doe" style={inputStyle} />
            </div>
          </DocsCard>
          <DocsCard title="Disabled">
            <div style={{display: 'grid', gap: 6}}>
              <Label htmlFor="label-demo-code" disabled>Access code</Label>
              <input id="label-demo-code" type="text" placeholder="Unavailable" disabled style={{...inputStyle, background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)'}} />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Label for the visible name of a single form control. Keep it short and descriptive, and always connect it to its control with htmlFor so the whole label is a click target. When a field is optional or has help text, place that supporting copy near the label — not inside it."
        defaultValue="disabled={false}"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            A programmatic association (matching <code>htmlFor</code> and <code>id</code>) is required. Do not rely on placeholder text as a substitute for a Label — placeholders disappear on input and are not reliably announced.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
