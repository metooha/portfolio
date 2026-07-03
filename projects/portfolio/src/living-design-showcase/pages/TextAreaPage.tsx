import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {TextArea, type TextAreaSize} from '@/living-design/components/TextArea/TextArea';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SIZES: Array<{value: TextAreaSize; label: string}> = [
  {value: 'large', label: 'Large'},
  {value: 'small', label: 'Small'},
];

export default function TextAreaPage() {
  const [size, setSize] = React.useState<TextAreaSize>('large');
  const [value, setValue] = React.useState('');
  const [showHelper, setShowHelper] = React.useState(true);
  const [showError, setShowError] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [showCount, setShowCount] = React.useState(false);

  return (
    <PageWrapper
      title="Text Area"
      category="Core Components"
      description="Multi-line text input with character counting, helper text, and error states."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview size, helper, error, disabled, and character count behavior."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
              </div>
              <ButtonGroup aria-label="Text area size">
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
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Helper text" checked={showHelper} onChange={(event) => setShowHelper(event.target.checked)} />
                <Checkbox label="Error" checked={showError} onChange={(event) => setShowError(event.target.checked)} />
                <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
                <Checkbox label="Show character count" checked={showCount} onChange={(event) => setShowCount(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${size === 'large' ? 'Large' : 'Small'} text area`}>
              <TextArea
                label="Comments"
                size={size}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                helperText={showHelper && !showError ? 'Add any extra notes.' : undefined}
                error={showError ? 'Comments are required before submitting.' : undefined}
                disabled={disabled}
                maxLength={showCount ? 200 : undefined}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Common patterns" description="Pair Text Area with helper or error text to set expectations.">
        <DocsGrid>
          <DocsCard title="Helper text" description="Use helper text for guidance that always applies.">
            <TextArea label="Notes" onChange={() => {}} helperText="Maximum 500 characters." />
          </DocsCard>
          <DocsCard title="Error" description="Use error text for invalid or required input.">
            <TextArea label="Comments" onChange={() => {}} error="Comments are required before submitting." />
          </DocsCard>
          <DocsCard title="Character count" description="Use maxLength to surface a live character counter.">
            <TextArea label="Bio" onChange={() => {}} maxLength={200} helperText="Maximum 200 characters." />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Text Area for freeform, multi-line input — notes, comments, bios, descriptions. Provide a label and skip placeholder text. Use helper text for ongoing context (character limits, format), and error text for validation failures. For single-line input, use TextField."
        defaultValue="size='large', maxLength=undefined"
      />
    </PageWrapper>
  );
}
