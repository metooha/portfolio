import * as React from 'react';
import {Body, Caption, Display, Heading} from '@/app/components/Text/Text';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsCard, DocsGrid} from './shared';

const ROW: React.CSSProperties = {display: 'grid', gap: 4, paddingBottom: 16, borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)'};

export default function TextPage() {
  return (
    <PageWrapper
      title="Typography"
      category="Foundations"
      description="The Text primitives — Display, Heading, Body, and Caption — render themed type with consistent size, weight, and color tokens."
    >
      <ExampleSection title="Display" description="The largest type. Reserve for hero moments and marketing surfaces.">
        <div style={{display: 'grid', gap: 16}}>
          <Display as="p" size="large" style={{margin: 0}}>Display large</Display>
          <Display as="p" size="small" style={{margin: 0}}>Display small</Display>
        </div>
      </ExampleSection>

      <ExampleSection title="Heading" description="Section and subsection titles. Choose the size for hierarchy and the element (h1–h6) for document structure.">
        <div style={{display: 'grid', gap: 16}}>
          <Heading as="h2" size="large" style={{margin: 0}}>Heading large</Heading>
          <Heading as="h3" size="medium" style={{margin: 0}}>Heading medium</Heading>
          <Heading as="h4" size="small" style={{margin: 0}}>Heading small</Heading>
        </div>
      </ExampleSection>

      <ExampleSection title="Body" description="Default running text. Available in three sizes and two weights.">
        <div style={{display: 'grid', gap: 16}}>
          <div style={ROW}>
            <Caption as="span" color="subtle">large</Caption>
            <Body as="p" size="large" style={{margin: 0}}>The quick brown fox jumps over the lazy dog.</Body>
          </div>
          <div style={ROW}>
            <Caption as="span" color="subtle">medium</Caption>
            <Body as="p" size="medium" style={{margin: 0}}>The quick brown fox jumps over the lazy dog.</Body>
          </div>
          <div style={{...ROW, borderBottom: 'none', paddingBottom: 0}}>
            <Caption as="span" color="subtle">medium · alt weight</Caption>
            <Body as="p" size="medium" weight="alt" style={{margin: 0}}>The quick brown fox jumps over the lazy dog.</Body>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title="Caption" description="Small supporting text for metadata, timestamps, and helper copy.">
        <Caption as="p" style={{margin: 0}}>Updated 2 minutes ago · Caption text</Caption>
      </ExampleSection>

      <ExampleSection title="Color" description="Semantic color tokens communicate meaning consistently across themes.">
        <DocsGrid minColumnWidth={180}>
          {(['brand', 'subtle', 'positive', 'warning', 'negative', 'info'] as const).map((c) => (
            <DocsCard key={c} title={c}>
              <Body as="p" size="medium" color={c} style={{margin: 0}}>Sample text</Body>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Pick the component by role: Display for hero type, Heading for titles, Body for prose, and Caption for supporting metadata. Keep one h1 per view and step heading levels sequentially. Use color tokens (positive, warning, negative) for meaning — never color alone to convey information."
        defaultValue="size='medium'  weight='default'"
      />
    </PageWrapper>
  );
}
