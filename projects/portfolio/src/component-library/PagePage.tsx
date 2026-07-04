import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

// NOTE: The real <Page> component renders the document's single <main> and
// <h1> and asserts (in dev) that exactly one of each exists on the page. That
// makes it impossible to embed live inside this docs shell, which already owns
// a <main> and <h1>. We show its structure statically instead.

const frame: React.CSSProperties = {
  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  borderRadius: 8,
  overflow: 'hidden',
};

const region: React.CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px dashed var(--ld-semantic-color-separator, #e3e4e5)',
};

export default function PagePage() {
  return (
    <PageWrapper
      title="Page"
      category="Layout"
      description="The top-level page shell. Page renders the skip link, the single <main> landmark, and the single <h1>, and verifies exactly one of each at runtime."
    >
      <ExampleSection title="Structure" description="A representation of the markup Page produces. Never hand-write <main>, <h1>, or a skip link — Page owns them.">
        <div style={frame}>
          <div style={{...region, background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)'}}>
            <Body as="span" size="small" weight="alt">a.ld-page-skipLink → “Skip to main content”</Body>
          </div>
          <div style={region}>
            <Body as="span" size="small" color="subtle">{'<main id="ld-main">'}</Body>
            <div style={{marginTop: 8}}>
              <Body as="span" size="large" weight="alt">h1.ld-page-title → “Order history”</Body>
            </div>
          </div>
          <div style={{padding: '12px 16px'}}>
            <Body as="p" size="medium" color="subtle" style={{margin: 0}}>{'{children} — your page content renders here, below the h1.'}</Body>
          </div>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Wrap every route in exactly one Page. Pass the visible page name as title; Page renders it as the sole h1 and exposes the main landmark plus a skip link for keyboard users. Use titleVisuallyHidden when a hero elsewhere already shows the visible title. Because Page enforces a single main/h1, never nest one Page inside another."
        defaultValue="titleVisuallyHidden={false}  skipLinkLabel='Skip to main content'"
      />
    </PageWrapper>
  );
}
