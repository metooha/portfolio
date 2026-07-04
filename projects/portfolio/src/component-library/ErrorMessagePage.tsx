import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Button} from '@/app/components/Button/Button';
import {ErrorMessage} from '@/app/components/ErrorMessage/ErrorMessage';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function ErrorMessagePage() {
  return (
    <PageWrapper
      title="Error Message"
      category="Feedback"
      description="A full-surface layout for empty and error states — optional media, a title, descriptive copy, and suggested actions to help the user recover."
    >
      <ExampleSection title="With actions" description="Give the user a clear next step whenever an error is recoverable.">
        <ErrorMessage
          title="Something went wrong"
          actions={
            <>
              <Button variant="primary">Try again</Button>
              <Button variant="secondary">Go back</Button>
            </>
          }
        >
          We couldn't load your orders. Check your connection and try again.
        </ErrorMessage>
      </ExampleSection>

      <ExampleSection title="Empty state" description="Use the same layout to explain when there's simply nothing to show yet.">
        <ErrorMessage
          title="No results found"
          actions={<Button variant="secondary">Clear filters</Button>}
        >
          Try adjusting your search or removing some filters.
        </ErrorMessage>
      </ExampleSection>

      <GuidelinesSection
        description="Use Error Message for page- or section-level empty and error states — not for inline field validation (use the field's error prop for that). Keep the title short and human, explain what happened in one or two sentences, and always offer a way forward. Note: this component is deprecated in the upstream kit; prefer composing Text and Button for new work."
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Deprecation</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            <code>ErrorMessage</code> is marked <code>@deprecated</code> and may be removed in a future major version. It is documented here for parity with existing usage.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
