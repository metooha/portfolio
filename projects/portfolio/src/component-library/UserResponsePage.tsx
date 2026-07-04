import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {UserResponse} from '@/app/components/UserResponse/UserResponse';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function UserResponsePage() {
  return (
    <PageWrapper
      title="User Response"
      category="AI & Agents"
      description="A right-aligned chat bubble for the human side of a conversation. The default pairs a brand-bold fill with on-fill text; the fill and text color can be tuned."
    >
      <ExampleSection title="Default" description="A standard outgoing message bubble.">
        <div style={{maxWidth: 560}}>
          <UserResponse>Which cordless vacuum works best for pet hair?</UserResponse>
        </div>
      </ExampleSection>

      <ExampleSection title="With delivery caption" description="Use caption for a right-aligned status below the bubble — e.g. a failed send.">
        <div style={{maxWidth: 560}}>
          <UserResponse caption="Not delivered · Try again">
            Can you resend the order summary?
          </UserResponse>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use User Response for messages the person sends, right-aligned opposite Agent Response. Keep the default fill for the primary voice; only change fill and textColor for special cases (quoted content, system messages) and always keep enough contrast between the two. Use caption for delivery status rather than inline text."
        defaultValue="fill='brand-bold'  textColor='onfill-brand'"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Pairing</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            Alternate User Response (right) with Agent Response (left) to build a readable conversation thread.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
