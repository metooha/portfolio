import * as React from 'react';
import {Sources, type SourceCitation} from '@/app/components/Sources/Sources';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const SOURCES: SourceCitation[] = [
  {
    title: 'Philips.co.uk',
    description: 'Series 4000 cordless vacuum — specifications and battery life.',
    href: 'https://www.philips.co.uk',
  },
  {
    title: 'Which.co.uk',
    description: 'Best cordless vacuums for pet hair, tested and rated.',
    href: 'https://www.which.co.uk',
  },
  {
    title: 'Walmart.com',
    description: 'Customer reviews and current pricing.',
    href: 'https://www.walmart.com',
  },
];

export default function SourcesPage() {
  return (
    <PageWrapper
      title="Sources"
      category="AI & Agents"
      description="The list of cited references behind an agent response — each a favicon, a bold domain title, and a one-line snippet. Rows with a URL open in a new tab."
    >
      <ExampleSection title="Default" description="A citation list. It's the expandable payload behind a response's 'Sources' toggle.">
        <div style={{maxWidth: 560}}>
          <Sources sources={SOURCES} />
        </div>
      </ExampleSection>

      <ExampleSection title="Without links" description="Static rows (no href) are non-interactive — use for offline or internal references.">
        <div style={{maxWidth: 560}}>
          <Sources sources={[
            {title: 'Order history', description: 'Your past purchases informed this suggestion.'},
            {title: 'Saved preferences', description: 'Budget and brand filters from your profile.'},
          ]} />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Sources to make an agent response verifiable — show where the information came from. Keep titles to the domain and snippets to a single line. Pair it with a ButtonToggle 'Sources' pill beneath an Agent Response so users can reveal citations on demand rather than always showing the full list."
        defaultValue="sources={[]}"
      />
    </PageWrapper>
  );
}
