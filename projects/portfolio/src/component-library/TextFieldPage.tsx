import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {SearchIcon} from '@/app/components/Icons/Icons';
import {TextField, type TextFieldSize} from '@/app/components/TextField/TextField';
import {TextFieldSplit} from '@/app/components/TextFieldSplit/TextFieldSplit';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SIZES: Array<{value: TextFieldSize; label: string}> = [
  {value: 'large', label: 'Large'},
  {value: 'small', label: 'Small'},
];

export default function TextFieldPage() {
  const [size, setSize] = React.useState<TextFieldSize>('large');
  const [value, setValue] = React.useState('');
  const [showHelper, setShowHelper] = React.useState(true);
  const [showError, setShowError] = React.useState(false);
  const [withIcon, setWithIcon] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  const [isMagic, setIsMagic] = React.useState(false);
  const [phoneCountry, setPhoneCountry] = React.useState('+1');
  const [phoneNumber, setPhoneNumber] = React.useState('555-0142');
  const [currency, setCurrency] = React.useState('USD');
  const [amount, setAmount] = React.useState('1250.00');

  return (
    <PageWrapper
      title="Text Field"
      category="Core Components"
      description="Single-line text input with labels, helper text, error states, leading icons, and AI-assisted styling."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview size, helper, error, leading icon, disabled, read-only, and magic states."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
              </div>
              <ButtonGroup aria-label="Text field size">
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
                <Checkbox label="Leading icon" checked={withIcon} onChange={(event) => setWithIcon(event.target.checked)} />
                <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
                <Checkbox label="Read only" checked={readOnly} onChange={(event) => setReadOnly(event.target.checked)} />
                <Checkbox label="Magic styling" checked={isMagic} onChange={(event) => setIsMagic(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${size === 'large' ? 'Large' : 'Small'} text field`}>
              <TextField
                label="Email"
                size={size}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                helperText={showHelper && !showError ? 'We will use this for receipts and order updates.' : undefined}
                error={showError ? 'Enter a valid email address.' : undefined}
                leadingIcon={withIcon ? <SearchIcon /> : undefined}
                disabled={disabled}
                readOnly={readOnly}
                isMagic={isMagic}
                textFieldProps={{placeholder: 'name@example.com'}}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Common states" description="Each card demoes one slice of the Text Field API.">
        <DocsGrid>
          <DocsCard title="Helper text" description="Use helper text for context that always applies.">
            <TextField label="Username" onChange={() => {}} helperText="Must be at least 3 characters." />
          </DocsCard>
          <DocsCard title="Error" description="Use error text for invalid or required input.">
            <TextField label="Email" onChange={() => {}} error="Enter a valid email address." />
          </DocsCard>
          <DocsCard title="Leading icon" description="Pair Text Field with a search or status icon.">
            <TextField label="Search" onChange={() => {}} leadingIcon={<SearchIcon />} />
          </DocsCard>
          <DocsCard title="Disabled" description="Disable when the value is locked by another decision.">
            <TextField label="Account ID" value="A-12345" onChange={() => {}} disabled />
          </DocsCard>
          <DocsCard title="Read only" description="Read-only keeps the value readable but uneditable.">
            <TextField label="Confirmed email" value="amy@example.com" onChange={() => {}} readOnly />
          </DocsCard>
          <DocsCard title="Magic" description="Use isMagic for AI-suggested values.">
            <TextField label="AI suggestion" value="amy@example.com" onChange={() => {}} isMagic />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Variant: TextFieldSplit"
        description="TextFieldSplit pairs a leading Select with a Text Field — for inputs whose meaning depends on a unit, prefix, or category."
      >
        <DocsGrid>
          <DocsCard title="Phone number" description="Country code Select + phone input.">
            <TextFieldSplit
              label="Phone number"
              selectA11yLabel="Country code"
              selectValue={phoneCountry}
              selectOnChange={(event) => setPhoneCountry(event.target.value)}
              selectChildren={
                <>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+52">+52</option>
                  <option value="+91">+91</option>
                </>
              }
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              type="tel"
              helperText="We'll text a verification code."
              textFieldProps={{placeholder: '555-0123'}}
            />
          </DocsCard>
          <DocsCard title="Currency amount" description="Currency Select + amount input, small size.">
            <TextFieldSplit
              label="Budget"
              size="small"
              selectA11yLabel="Currency"
              selectValue={currency}
              selectOnChange={(event) => setCurrency(event.target.value)}
              selectChildren={
                <>
                  <option value="USD">USD</option>
                  <option value="CAD">CAD</option>
                  <option value="MXN">MXN</option>
                  <option value="EUR">EUR</option>
                </>
              }
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              type="number"
              helperText="Estimated monthly spend."
            />
          </DocsCard>
          <DocsCard title="Error" description="Validation styling mirrors Text Field's error state.">
            <TextFieldSplit
              label="Phone number"
              selectA11yLabel="Country code"
              selectValue={phoneCountry}
              selectOnChange={(event) => setPhoneCountry(event.target.value)}
              selectChildren={
                <>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </>
              }
              value=""
              onChange={() => {}}
              error="Enter a valid phone number."
              textFieldProps={{placeholder: '555-0123'}}
            />
          </DocsCard>
          <DocsCard title="Disabled" description="Both segments lock together when disabled.">
            <TextFieldSplit
              label="Phone number"
              disabled
              selectA11yLabel="Country code"
              selectValue="+1"
              selectOnChange={() => {}}
              selectChildren={<option value="+1">+1</option>}
              value="555-0142"
              onChange={() => {}}
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Text Field for single-line input — names, emails, search terms, account numbers. Provide a label and skip placeholder text. Reach for helper text for context that always applies and error text for validation. Use TextArea instead when the input is multi-line, and Select for known-set choices."
        defaultValue="size='large'"
      />
    </PageWrapper>
  );
}
