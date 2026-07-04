import * as React from 'react';
import {Footer} from '@/app/components/patterns/Footer/Footer';
import {DesktopFooter} from '@/app/components/patterns/DesktopFooter/DesktopFooter';
import {MwebFooter} from '@/app/components/patterns/MwebFooter/MwebFooter';
import {PageWrapper, ExampleSection} from './shared';

export default function FooterPatternsPage() {
  return (
    <PageWrapper title="Footer" category="PATTERNS" description="The Footer pattern picks the right layout for the viewport — desktop link grid on dark blue at large+ breakpoints, single-column stack on mobile web. Drop it at the bottom of any page and forget about which variant to use.">
      <ExampleSection title="Footer (auto)" description="The default — picks the desktop or mobile variant based on the current viewport. This is what you use in production.">
        <div style={{ border: '1px solid #E6E6E8', borderRadius: '8px', overflow: 'hidden' }}>
          <Footer />
        </div>
      </ExampleSection>

      <ExampleSection title="Desktop variant" description="Forced desktop layout. Standard footer with feedback section, dark-blue link grid, and copyright.">
        <div style={{ border: '1px solid #E6E6E8', borderRadius: '8px', overflow: 'hidden' }}>
          <DesktopFooter navigationLabel="Desktop footer navigation" />
        </div>
      </ExampleSection>

      <ExampleSection title="Mobile web variant" description="Forced mweb layout. Single-column stack with the same content collapsed for narrow viewports.">
        <div style={{ maxWidth: '430px', border: '1px solid #E6E6E8', borderRadius: '8px', overflow: 'hidden' }}>
          <MwebFooter contained navigationLabel="Mobile footer navigation" />
        </div>
      </ExampleSection>
    </PageWrapper>
  );
}
