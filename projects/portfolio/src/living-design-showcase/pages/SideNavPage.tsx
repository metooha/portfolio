import * as React from 'react';

import {AccountSideNav} from '@/living-design/patterns/AccountSideNav/AccountSideNav';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function SideNavPage() {
  return (
    <PageWrapper
      title="Account Side Nav"
      category="WCP Patterns"
      description="Account navigation sidebar with collapsible sections, user profile header, and Walmart+ membership display."
    >
      <ExampleSection title="Account Navigation">
        <div
          style={{
            maxWidth: 320,
            border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <AccountSideNav />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Account Side Nav as the persistent navigation rail for account, profile, and settings sections. Keep section labels stable and tie each item to a routable destination. Reserve the Walmart+ slot for membership state — do not overload it with marketing copy."
        defaultValue="default account navigation tree"
      />
    </PageWrapper>
  );
}
