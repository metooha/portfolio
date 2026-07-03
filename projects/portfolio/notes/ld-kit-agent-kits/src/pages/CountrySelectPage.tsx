import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button';
import {Checkbox} from '../components/Checkbox';
import {Body} from '../components/Text/Text';
import {CountryCodePhoneInput, type Country} from '../components/CountryCodePhoneInput/CountryCodePhoneInput';
import {CountrySelectBottomSheet} from '../components/CountrySelectBottomSheet/CountrySelectBottomSheet';
import {CountrySelectDropdown} from '../components/CountrySelectDropdown/CountrySelectDropdown';
import {CountrySelectGroup} from '../components/CountrySelectGroup/CountrySelectGroup';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type SelectMode = 'single' | 'multi';
type SheetVariant = 'flat' | 'slot';

export default function CountrySelectPage() {
  const [mode, setMode] = React.useState<SelectMode>('single');
  const [showDialCode, setShowDialCode] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [dropdownValue, setDropdownValue] = React.useState<string | string[]>('US');
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [sheetVariant, setSheetVariant] = React.useState<SheetVariant>('flat');
  const [sheetCountry, setSheetCountry] = React.useState('US');
  const [phoneValue, setPhoneValue] = React.useState('(555) 123-4567');
  const [groupValue, setGroupValue] = React.useState('US');

  const updateMode = (nextMode: SelectMode) => {
    setMode(nextMode);
    setDropdownValue(nextMode === 'single' ? 'US' : ['US', 'MX']);
  };

  return (
    <PageWrapper
      title="Country Select"
      category="WCP Components"
      description="A set of country selection patterns for dropdowns, bottom sheets, radio-list groups, and phone inputs with country dialing context."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview dropdown selection mode, dial code visibility, and disabled behavior."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Selection mode</Body>
                <ButtonGroup aria-label="Country select mode">
                  <Button size="small" variant={mode === 'single' ? 'primary' : 'secondary'} onClick={() => updateMode('single')}>Single</Button>
                  <Button size="small" variant={mode === 'multi' ? 'primary' : 'secondary'} onClick={() => updateMode('multi')}>Multi</Button>
                </ButtonGroup>
              </div>
              <Checkbox label="Show dial codes" checked={showDialCode} onChange={(event) => setShowDialCode(event.target.checked)} />
              <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Dropdown preview" description="The dropdown supports searchable country lists, radio-style single select, and confirmed multi-select.">
              <CountrySelectDropdown
                label={mode === 'single' ? 'Country' : 'Countries'}
                mode={mode}
                value={dropdownValue}
                onChange={(value) => setDropdownValue(value)}
                placeholder="Select country"
                showDialCode={showDialCode}
                confirmLabel="Apply"
                disabled={disabled}
                triggerWidth="100%"
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Dropdown Patterns" description="Use dropdowns for desktop-first forms and compact account or checkout flows.">
        <DocsGrid>
          <DocsCard title="Single select" description="Country name only, with a single selected value.">
            <CountrySelectDropdown label="Country" mode="single" value="US" onChange={() => {}} triggerWidth="100%" />
          </DocsCard>
          <DocsCard title="Multi select" description="Multi-select stores pending selections until Apply is pressed.">
            <CountrySelectDropdown label="Countries" mode="multi" value={['US', 'MX']} onChange={() => {}} showDialCode confirmLabel="Apply" triggerWidth="100%" />
          </DocsCard>
          <DocsCard title="Disabled" description="Disable when country selection is locked by account, order, or locale rules.">
            <CountrySelectDropdown label="Country" value="US" onChange={() => {}} disabled triggerWidth="100%" />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Bottom Sheet" description="Use bottom sheets for mobile country selection and confirmation. Open each preview to compare row treatments.">
        <DocsGrid>
          <DocsCard title="Sheet preview" description={`Variant: ${sheetVariant}; selected: ${sheetCountry}`}>
            <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
              <ButtonGroup aria-label="Sheet variant">
                <Button size="small" variant={sheetVariant === 'flat' ? 'primary' : 'secondary'} onClick={() => setSheetVariant('flat')}>Flat</Button>
                <Button size="small" variant={sheetVariant === 'slot' ? 'primary' : 'secondary'} onClick={() => setSheetVariant('slot')}>Slot</Button>
              </ButtonGroup>
              <Button variant="secondary" size="small" onClick={() => setSheetOpen(true)}>Open sheet</Button>
            </div>
            <CountrySelectBottomSheet
              open={sheetOpen}
              variant={sheetVariant}
              showDialCode={showDialCode}
              onClose={() => setSheetOpen(false)}
            />
          </DocsCard>
          <DocsCard title="Inline group" description="CountrySelectGroup keeps the same radio-list decision on the page.">
            <CountrySelectGroup
              value={groupValue}
              onChange={(country: Country) => setGroupValue(country.code)}
              description="Select the country you want to ship to."
              footerText="Can't find your country? Check international shipping."
              showDialCode={showDialCode}
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Phone Input" description="CountryCodePhoneInput pairs dialing context with phone-entry states.">
        <DocsGrid>
          <DocsCard title="Enabled" description="Includes helper text and opens the country picker from the trigger.">
            <CountryCodePhoneInput
              label="Phone number*"
              value={phoneValue}
              onChange={setPhoneValue}
              helperText="We'll contact you in case anything comes up with your order."
            />
          </DocsCard>
          <DocsCard title="Error" description="Use validation text near the field, not in the surrounding page copy.">
            <CountryCodePhoneInput label="Phone number*" value="555" onChange={() => {}} error errorText="Please enter a valid number" />
          </DocsCard>
          <DocsCard title="Disabled" description="Disable when the value is locked by another system.">
            <CountryCodePhoneInput label="Phone number*" value="(555) 123-4567" onChange={() => {}} disabled />
          </DocsCard>
          <DocsCard title="Read only" description="Use read-only for confirmed account values that should not be edited here.">
            <CountryCodePhoneInput label="Phone number*" value="(555) 123-4567" onChange={() => {}} readOnly />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use the smallest country selector that fits the task: dropdowns for compact desktop forms, bottom sheets for mobile confirmation, groups for destination choice, and phone input when dialing context is required. Keep labels explicit and preserve selected country state across open and close interactions."
        defaultValue="mode='single', showDialCode=false, variant='flat'"
      />
    </PageWrapper>
  );
}
