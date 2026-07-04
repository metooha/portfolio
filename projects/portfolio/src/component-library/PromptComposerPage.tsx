import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Icon} from '@/app/components/Icons/Icons';
import {PromptComposer} from '@/app/components/PromptComposer/PromptComposer';
import {AttachmentTile} from '@/app/components/AttachmentTile/AttachmentTile';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function PromptComposerPage() {
  const [last, setLast] = React.useState('');

  return (
    <PageWrapper
      title="Prompt Composer"
      category="AI & Agents"
      description="The message input for a conversational agent: an auto-growing field with attachments, a mic, a character counter, and a send button that becomes a Stop control while the agent is busy."
    >
      <ExampleSection title="Default" description="Type and send. Enter submits; Shift+Enter inserts a newline.">
        <div style={{maxWidth: 640}}>
          <PromptComposer placeholder="Ask anything" onSend={(v) => setLast(v)} />
          <Body as="p" size="small" color="subtle" style={{margin: '12px 0 0'}}>
            Last sent: <code>{last || '—'}</code>
          </Body>
        </div>
      </ExampleSection>

      <ExampleSection title="With attachments and counter" description="Render Attachment Tiles in the attachments row and set maxLength to show a counter.">
        <div style={{maxWidth: 640}}>
          <PromptComposer
            placeholder="Add a message"
            defaultValue="Summarize this report"
            maxLength={500}
            showCount
            attachments={
              <AttachmentTile
                variant="icon"
                leading={<Icon name="Image" decorative />}
                title="report.pdf"
                description="2.4 MB"
                onRemove={() => {}}
              />
            }
            onSend={(v) => setLast(v)}
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Busy" description="While the agent generates, the send button becomes a Stop button.">
        <div style={{maxWidth: 640}}>
          <PromptComposer placeholder="Ask anything" busy onStop={() => {}} />
        </div>
      </ExampleSection>

      <ExampleSection title="Inline variant" description="A compact layout for embedding the composer in a denser surface.">
        <div style={{maxWidth: 640}}>
          <PromptComposer variant="inline" size="small" placeholder="Reply…" onSend={(v) => setLast(v)} />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Prompt Composer as the single entry point for agent conversations. Keep the placeholder action-oriented, enable the character counter when there's a real limit, and always reflect generation state with busy so users can stop a long response. Show attached files as Attachment Tiles above the field."
        defaultValue="variant='default'  size='large'  submitOn='enter'"
      />
    </PageWrapper>
  );
}
