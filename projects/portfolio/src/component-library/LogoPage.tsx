import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Logo} from '@/app/components/Logo/Logo';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid, DocsCard} from './shared';

const SIZES = [24, 36, 48, 64];

export default function LogoPage() {
  return (
    <PageWrapper
      title="Logo"
      category="Brand"
      description="Renders the active theme's brand mark from the media library. The glyph follows the selected theme, so switching themes updates the logo automatically."
    >
      <ExampleSection title="Sizes" description="Set height in pixels; width follows the mark's intrinsic aspect ratio.">
        <DocsGrid minColumnWidth={160}>
          {SIZES.map((size) => (
            <DocsCard key={size} title={`${size}px`}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80}}>
                <Logo size={size} />
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Logo for the brand mark in headers, mastheads, and footers. It resolves the glyph from the active theme, so avoid hard-coding a specific tenant unless you intentionally need to show another brand. Provide an a11yLabel when the logo acts as a link (for example, 'Walmart Homepage')."
        defaultValue="name='Logo'  size={36}"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Note</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            If the current theme has no matching glyph, Logo renders nothing. Switch themes from the sidebar to preview different brand marks.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
