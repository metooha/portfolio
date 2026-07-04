import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Feedback} from '@/app/components/Feedback/Feedback';
import {AgentResponse} from '@/app/components/AgentResponse/AgentResponse';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function AgentResponsePage() {
  return (
    <PageWrapper
      title="Agent Response"
      category="AI & Agents"
      description="An assistant chat turn: an avatar, the agent name and meta, the reply body (or a streaming placeholder), and optional content, timestamp, and feedback slots."
    >
      <ExampleSection title="Default" description="A reply with a name, timestamp, and a feedback toolbar.">
        <div style={{maxWidth: 560}}>
          <AgentResponse
            name="Polaris"
            timestamp="Just now"
            feedback={<Feedback onChange={() => {}} />}
          >
            Based on your recent orders, the Philips 4000 Series is a great match — it fits your budget and has strong reviews for battery life.
          </AgentResponse>
        </div>
      </ExampleSection>

      <ExampleSection title="Thinking" description="Set thinking to show the streaming placeholder while a response generates.">
        <div style={{maxWidth: 560}}>
          <AgentResponse name="Polaris" thinking />
        </div>
      </ExampleSection>

      <ExampleSection title="With source attribution" description="Use statusColor and meta to attribute a response to a specific source instead of the default avatar.">
        <div style={{maxWidth: 560}}>
          <AgentResponse
            hideAvatar
            statusColor="#2a8703"
            name="Store 1234"
            meta="generated this response"
            timestamp="2:14 PM"
          >
            Your pickup order is ready. Head to the pickup area and check in from the app when you arrive.
          </AgentResponse>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Agent Response for assistant turns in a conversational UI. Show the thinking placeholder while streaming, attach a Feedback toolbar so users can rate quality, and use the content slot for rich results (an item tile, a chart). Pair with User Response for the human side of the conversation."
        defaultValue="name='Polaris'  thinking={false}"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            The avatar carries an accessible label, and the optional info affordance is labelled via <code>infoLabel</code>.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
