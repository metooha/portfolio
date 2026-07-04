import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {DateField} from '@/app/components/DateField/DateField';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function DateFieldPage() {
  const [value, setValue] = React.useState('');
  const [dob, setDob] = React.useState('');

  return (
    <PageWrapper
      title="Date Field"
      category="Core Components"
      description="A single-date text input with format-aware validation. It builds on Text Field, adding an inline error when the entered value doesn't match the expected format."
    >
      <ExampleSection title="Default" description="Enter a date in MM/dd/yyyy. Validation runs on blur.">
        <div style={{maxWidth: 320}}>
          <DateField
            label="Delivery date"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            helperText="Format: MM/dd/yyyy"
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Custom format" description="Pass format to change both the expected pattern and the validation message.">
        <div style={{maxWidth: 320}}>
          <DateField
            label="Date of birth"
            format="yyyy-MM-dd"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            helperText="Format: yyyy-MM-dd"
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Disabled">
        <div style={{maxWidth: 320}}>
          <DateField label="Locked date" value="12/25/2025" onChange={() => {}} disabled />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use a Date Field for a single, typeable date where a full calendar picker would be overkill. Always show the expected format in helper text, and pair it with a Date Picker when browsing or relative selection matters. Keep the format consistent across a form."
        defaultValue="format='MM/dd/yyyy'"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            The <code>label</code> is required and is associated with the input. Validation errors are surfaced through the underlying Text Field's error region.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
