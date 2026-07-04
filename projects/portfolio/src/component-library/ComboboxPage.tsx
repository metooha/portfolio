import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {FluentCombobox, type ComboboxOption} from '@/app/components/Combobox/Combobox';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const OPTIONS: ComboboxOption[] = [
  {value: 'ca', text: 'California'},
  {value: 'tx', text: 'Texas'},
  {value: 'ny', text: 'New York'},
  {value: 'fl', text: 'Florida'},
  {value: 'wa', text: 'Washington'},
  {value: 'il', text: 'Illinois', disabled: true},
];

export default function ComboboxPage() {
  const [value, setValue] = React.useState('');

  return (
    <PageWrapper
      title="Combobox"
      category="Core Components"
      description="An autocomplete input that filters a list of options as the user types, combining free text entry with a selectable listbox."
    >
      <ExampleSection title="Default" description="Type to filter, then pick an option. Selection is controlled via value / onChange.">
        <div style={{maxWidth: 320}}>
          <FluentCombobox
            label="State"
            placeholder="Search states..."
            options={OPTIONS}
            value={value}
            onChange={setValue}
          />
          <Body as="p" size="small" color="subtle" style={{margin: '12px 0 0'}}>
            Current value: <code>{value || '—'}</code>
          </Body>
        </div>
      </ExampleSection>

      <ExampleSection title="Disabled">
        <div style={{maxWidth: 320}}>
          <FluentCombobox label="State" placeholder="Search states..." options={OPTIONS} disabled />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Reach for a Combobox when a Select has too many options to scan comfortably and free-text filtering helps. Provide a clear label (or a11yLabelledBy), keep option text concise, and disable options that exist but aren't currently selectable rather than hiding them."
        defaultValue="options={[]}  disabled={false}"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            Exactly one of <code>label</code> or <code>a11yLabelledBy</code> is required so the combobox always has an accessible name.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
