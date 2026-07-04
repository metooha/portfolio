import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {
  RichTextEditor,
  type RichTextEditorSize,
} from '@/app/components/RichTextEditor/RichTextEditor';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SIZES: Array<{value: RichTextEditorSize; label: string}> = [
  {value: 'large', label: 'Large'},
  {value: 'small', label: 'Small'},
];

type Validation = 'none' | 'error' | 'warning';

const VALIDATIONS: Array<{value: Validation; label: string}> = [
  {value: 'none', label: 'None'},
  {value: 'error', label: 'Error'},
  {value: 'warning', label: 'Warning'},
];

const SAMPLE_VALUE =
  '<p>Add a <strong>summary</strong> of the update, then format it with the toolbar above.</p>';

export default function RichTextEditorPage() {
  const [size, setSize] = React.useState<RichTextEditorSize>('large');
  const [validation, setValidation] = React.useState<Validation>('none');
  const [showHelper, setShowHelper] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  const [isMagic, setIsMagic] = React.useState(false);
  const [showCount, setShowCount] = React.useState(false);

  return (
    <PageWrapper
      title="Rich Text Editor"
      category="Core Components"
      description="Multi-line input with a formatting toolbar for block styles, lists, and inline emphasis, plus helper text, validation, and character counting."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview size, validation, helper text, disabled, read only, AI, and character count behavior."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
              </div>
              <ButtonGroup aria-label="Rich text editor size">
                {SIZES.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={size === item.value ? 'primary' : 'secondary'}
                    aria-pressed={size === item.value}
                    onClick={() => setSize(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Validation</Body>
              </div>
              <ButtonGroup aria-label="Validation state">
                {VALIDATIONS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={validation === item.value ? 'primary' : 'secondary'}
                    aria-pressed={validation === item.value}
                    onClick={() => setValidation(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Helper text" checked={showHelper} onChange={(event) => setShowHelper(event.target.checked)} />
                <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
                <Checkbox label="Read only" checked={readOnly} onChange={(event) => setReadOnly(event.target.checked)} />
                <Checkbox label="AI generated (isMagic)" checked={isMagic} onChange={(event) => setIsMagic(event.target.checked)} />
                <Checkbox label="Show character count" checked={showCount} onChange={(event) => setShowCount(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${size === 'large' ? 'Large' : 'Small'} rich text editor`}>
              <RichTextEditor
                label="Description"
                size={size}
                value={SAMPLE_VALUE}
                placeholder="Start typing…"
                disabled={disabled}
                readOnly={readOnly}
                isMagic={isMagic}
                helperText={showHelper && validation === 'none' ? 'Use the toolbar to format your text.' : undefined}
                error={validation === 'error' ? 'A description is required before submitting.' : undefined}
                warning={validation === 'warning' ? 'This description is unusually short.' : undefined}
                maxLength={showCount ? 800 : undefined}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="States" description="Rich Text Editor supports the same field states as other inputs, plus a warning validation.">
        <DocsGrid>
          <DocsCard title="Helper text" description="Use helper text for guidance that always applies.">
            <RichTextEditor label="Notes" placeholder="Start typing…" helperText="Use the toolbar to format your text." />
          </DocsCard>
          <DocsCard title="Error" description="Use error text for invalid or required input.">
            <RichTextEditor label="Description" error="A description is required before submitting." />
          </DocsCard>
          <DocsCard title="Warning" description="Use warning text for input that is valid but worth a second look.">
            <RichTextEditor label="Description" warning="This description is unusually short." />
          </DocsCard>
          <DocsCard title="Read only" description="Read only preserves content while preventing edits.">
            <RichTextEditor label="Description" readOnly value={SAMPLE_VALUE} />
          </DocsCard>
          <DocsCard title="Disabled" description="Disabled removes the field from the tab order.">
            <RichTextEditor label="Description" disabled value={SAMPLE_VALUE} />
          </DocsCard>
          <DocsCard title="Character count" description="Set maxLength to surface a live counter.">
            <RichTextEditor label="Bio" maxLength={800} helperText="Maximum 800 characters." />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Toolbar" description="Trim the toolbar to the controls a field needs.">
        <DocsGrid>
          <DocsCard title="Inline emphasis only" description="Limit formatting to bold and italic.">
            <RichTextEditor label="Comment" toolbar={['bold', 'italic']} placeholder="Start typing…" />
          </DocsCard>
          <DocsCard title="Lists" description="Offer bulleted and numbered lists for structured notes.">
            <RichTextEditor label="Steps" toolbar={['bulletList', 'numberList']} placeholder="Start typing…" />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Rich Text Editor for formatted, multi-line input — descriptions, notes, and announcements that benefit from headings, lists, and emphasis. Always provide a label and skip placeholder-as-label. Trim the toolbar to the formatting a task actually needs. Use helper text for ongoing guidance, error text for validation failures, and warning text for valid-but-questionable input. For plain multi-line text, use Text Area; for single-line input, use Text Field."
        defaultValue="size='large', toolbar=['blockStyle', 'bulletList', 'numberList', 'bold', 'italic', 'code']"
      />
    </PageWrapper>
  );
}
