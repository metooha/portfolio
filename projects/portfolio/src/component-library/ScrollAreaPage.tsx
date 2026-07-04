import * as React from 'react';

import {ScrollArea} from '@/app/components/ScrollArea/ScrollArea';
import {Body} from '@/app/components/Text/Text';
import {
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const tags = Array.from({length: 50}).map((_, i) => `Tag ${i + 1}`);

const itemStyle: React.CSSProperties = {
  padding: 8,
  border: '1px solid var(--ld-semantic-color-border-moderate, #babbbe)',
  borderRadius: 4,
  fontSize: 14,
  color: 'var(--ld-semantic-color-text, #2e2f32)',
};

const horizontalItemStyle: React.CSSProperties = {
  ...itemStyle,
  padding: '12px 24px',
  whiteSpace: 'nowrap',
};

export default function ScrollAreaPage() {
  return (
    <PageWrapper
      title="Scroll Area"
      category="Shared Components"
      description="A container with custom-styled scrollbars for vertical and horizontal overflow content. Uses native scrollbar styling with thin scrollbar appearance."
    >
      <ExampleSection title="Scroll directions" description="Compare vertical and horizontal overflow containers side by side.">
        <DocsGrid minColumnWidth={280}>
          <DocsCard title="Vertical scroll" description="A scrollable container with vertical overflow and thin scrollbar styling.">
            <ScrollArea
              UNSAFE_style={{
                height: 288,
                width: 192,
                borderRadius: 6,
                border: '1px solid var(--ld-semantic-color-border-moderate, #babbbe)',
                padding: 16,
              }}
            >
              <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                {tags.map((tag) => (
                  <div key={tag} style={itemStyle}>
                    {tag}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DocsCard>

          <DocsCard title="Horizontal scroll" description="A scrollable container with horizontal overflow content.">
            <ScrollArea
              UNSAFE_style={{
                width: '100%',
                maxWidth: 400,
                borderRadius: 6,
                border: '1px solid var(--ld-semantic-color-border-moderate, #babbbe)',
                padding: 16,
              }}
            >
              <div style={{display: 'flex', gap: 12, width: 'max-content'}}>
                {Array.from({length: 20}).map((_, index) => (
                  <div key={index} style={horizontalItemStyle}>
                    Item {index + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Notes" description="ScrollArea wraps native scrollbars with thin styling — no JavaScript thumb tracking.">
        <DocsCard>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            Set a constrained <code>height</code> or <code>maxWidth</code> on the ScrollArea root via{' '}
            <code>UNSAFE_style</code> so the overflow has somewhere to scroll to. Without explicit bounds the area
            grows with its content and never scrolls.
          </Body>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use Scroll Area when a constrained region must reveal overflow without rearranging the surrounding layout. Prefer native page scrolling for primary content — Scroll Area is for secondary, contained surfaces (filter lists, tag clouds, horizontal chip rows, dense menus). Always provide an explicit height or width so the scrollbar has a defined track."
        defaultValue="UNSAFE_style={{height, width}}"
      />
    </PageWrapper>
  );
}
