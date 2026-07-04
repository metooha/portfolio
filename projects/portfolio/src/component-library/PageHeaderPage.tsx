import * as React from 'react';
import {PageHeader} from '@/app/components/PageHeader/PageHeader';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const CLIP: React.CSSProperties = {position: 'relative', overflow: 'hidden', borderRadius: 8};

export default function PageHeaderPage() {
  return (
    <PageWrapper
      title="Page Header"
      category="Layout"
      description="The top-of-route header block: a small section eyebrow, an h1 title, and an optional supporting description that sits beside the title on wide screens."
    >
      <ExampleSection title="Default" description="Eyebrow, title, and description. Renders as a full-bleed surface at the top of a page.">
        <div style={CLIP}>
          <PageHeader
            section="Account"
            title="Order history"
            description="Review past orders, track shipments, and start a return."
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Title only" description="Omit the description for compact, utilitarian pages.">
        <div style={CLIP}>
          <PageHeader section="Settings" title="Notifications" />
        </div>
      </ExampleSection>

      <ExampleSection title="Nested heading level" description="Drop the heading level to 2+ when the page already has an h1 so the outline stays single-h1.">
        <div style={CLIP}>
          <PageHeader section="Reports" title="Weekly summary" headingLevel={2} description="A nested section header within a larger page." />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Page Header once at the top of a route to establish context. Keep the eyebrow to a short category, the title to a concise noun phrase, and the description to a single supporting sentence. Set headingLevel to 2+ only when the header is nested under an existing h1."
        defaultValue="headingLevel={1}"
      />
    </PageWrapper>
  );
}
