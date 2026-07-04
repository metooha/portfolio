import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Feedback} from '@/app/components/Feedback/Feedback';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid, DocsCard} from './shared';

export default function FeedbackPage() {
  return (
    <PageWrapper
      title="Feedback"
      category="AI & Agents"
      description="A compact thumbs up / down control for rating an agent response. Selecting a rating swaps the controls for a confirmation, with an optional 'Share more' path after a negative rating."
    >
      <ExampleSection title="Default" description="Uncontrolled — read the result from onChange. Rate it to see the confirmation state.">
        <Feedback onChange={() => {}} />
      </ExampleSection>

      <ExampleSection title="Confirmation states" description="The component seeds from defaultValue; here both outcomes are shown.">
        <DocsGrid minColumnWidth={260}>
          <DocsCard title="After positive">
            <Feedback defaultValue="positive" />
          </DocsCard>
          <DocsCard title="After negative">
            <Feedback defaultValue="negative" onShareMore={() => {}} />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Place Feedback beneath an AI or agent response so users can quickly signal quality. Keep the prompt short and offer a 'Share more' affordance after negative ratings to collect richer detail. Control it with value + onChange when you need to persist the rating, or leave it uncontrolled for fire-and-forget capture."
        defaultValue="label='Was this helpful?'"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            The control is a polite live region, so the confirmation is announced, and focus moves to the confirmation's actionable element after rating.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
