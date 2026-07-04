import * as React from 'react';

import {Body} from '@/app/components/Text/Text';
import {TextField} from '@/app/components/TextField';
import {HighlightText} from '@/app/components/HighlightText';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SUGGESTIONS = [
  'Fresh whole milk',
  'Organic 2% milk',
  'Almond milk',
  'Coconut milk creamer',
];

function SuggestionList({query}: {query: string}) {
  return (
    <div style={{display: 'grid', gap: 10}}>
      {SUGGESTIONS.map((text) => (
        <Body key={text} as="span" size="medium">
          <HighlightText text={text} query={query} />
        </Body>
      ))}
    </div>
  );
}

export default function HighlightTextPage() {
  const [query, setQuery] = React.useState('milk');

  return (
    <PageWrapper
      title="Highlight Text"
      category="Subsystem Components"
      description="A typeahead text utility that emphasizes suggestion completions while leaving the matched query segment normal weight."
    >
      <ExampleSection
        title="Component Configuration"
        description="Type a query to preview how matching text is rendered inside suggestions."
      >
        <ComponentConfigurationCard
          controls={
            <TextField
              label="Query"
              size="small"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              helperText="Try milk, fresh, or coconut."
            />
          }
          preview={
            <DocsCard title="Preview" description="The typed query stays regular; surrounding completion text becomes bold.">
              <SuggestionList query={query} />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Search States" description="Highlight Text handles matches, empty queries, and no-match strings. ">
        <DocsGrid>
          <DocsCard title="Typeahead match" description="Use for autocomplete suggestion rows.">
            <SuggestionList query="milk" />
          </DocsCard>
          <DocsCard title="Empty query" description="The full string renders in the bold completion style.">
            <Body as="span" size="medium"><HighlightText text="No query supplied" query="" /></Body>
          </DocsCard>
          <DocsCard title="No match" description="No-match text also renders as the completion string.">
            <Body as="span" size="medium"><HighlightText text="No match for the search term" query="banana" /></Body>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Highlight Text only where users are comparing typed input to suggested completions. Keep matching case-insensitive and avoid using it as a general text emphasis component."
        defaultValue="boldClassName='ax-highlight-text__bold', matchClassName='ax-highlight-text__match'"
      />
    </PageWrapper>
  );
}