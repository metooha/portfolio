import * as React from 'react';

import {Body} from '@/app/components/Text/Text';
import {Toggle} from '@/app/components/Toggle/Toggle';
import {
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

export default function TogglePage() {
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);

  return (
    <PageWrapper
      title="Toggle"
      category="Shared Components"
      description="A two-state button that can be toggled on or off. Mirrors LD Icon Button tokens for consistent styling across pressed and unpressed states."
    >
      <ExampleSection title="Component Configuration" description="A standalone toggle button with controlled pressed state.">
        <DocsCard title="Single Toggle">
          <Toggle pressed={isBold} onPressedChange={setIsBold} aria-label="Toggle bold">
            <strong>B</strong>
          </Toggle>
          <Body as="p" size="small" color="subtle" style={{margin: '12px 0 0'}}>
            Bold: {isBold ? 'On' : 'Off'}
          </Body>
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="Patterns" description="Group toggles for related independent options, or use a single toggle for a binary action.">
        <DocsGrid>
          <DocsCard title="Text formatting toggles" description="A group of toggles for bold, italic, and underline.">
            <div style={{display: 'flex', gap: 8}}>
              <Toggle pressed={isBold} onPressedChange={setIsBold} aria-label="Toggle bold">
                <strong>B</strong>
              </Toggle>
              <Toggle pressed={isItalic} onPressedChange={setIsItalic} aria-label="Toggle italic">
                <em>I</em>
              </Toggle>
              <Toggle pressed={isUnderline} onPressedChange={setIsUnderline} aria-label="Toggle underline">
                <u>U</u>
              </Toggle>
            </div>
            <Body as="p" size="small" color="subtle" style={{margin: '16px 0 0'}}>
              Active: {[isBold && 'Bold', isItalic && 'Italic', isUnderline && 'Underline'].filter(Boolean).join(', ') || 'None'}
            </Body>
          </DocsCard>
          <DocsCard title="Disabled" description="A toggle in the disabled state.">
            <Toggle disabled aria-label="Disabled toggle">
              <strong>B</strong>
            </Toggle>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Toggle for binary on/off button-style controls — text formatting, view filters, layer visibility. Provide an aria-label that names the toggled state. For continuous setting changes (notifications, dark mode), use Switch instead so the affordance is consistent across the kit."
        defaultValue="pressed=false"
      />
    </PageWrapper>
  );
}
