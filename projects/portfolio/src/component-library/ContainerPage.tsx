import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Container} from '@/app/components/Container/Container';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const band: React.CSSProperties = {
  background: 'var(--ld-semantic-color-fill-brand-subtle, #ebf0ff)',
  padding: '24px 16px',
};

const inner: React.CSSProperties = {
  background: 'var(--ld-semantic-color-surface, #ffffff)',
  border: '1px dashed var(--ld-semantic-color-separator, #e3e4e5)',
  borderRadius: 8,
  padding: 16,
  textAlign: 'center',
};

export default function ContainerPage() {
  return (
    <PageWrapper
      title="Container"
      category="Layout"
      description="A layout utility that caps content to a maximum width and centers it, keeping line lengths and layouts comfortable on wide screens."
    >
      <ExampleSection
        title="Centered max-width"
        description="The full-bleed band spans the card; the Container keeps its content constrained and centered."
      >
        <div style={band}>
          <Container>
            <div style={inner}>
              <Body as="p" size="medium" style={{margin: 0}}>Constrained, centered content</Body>
            </div>
          </Container>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Wrap page-level content in a Container so it never stretches uncomfortably wide on large displays. Use it for the primary content column; let backgrounds, banners, and dividers run full-bleed outside the Container when a section should span the viewport."
      />
    </PageWrapper>
  );
}
