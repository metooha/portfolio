import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {CountryCodePhoneInput} from '@/app/components/CountryCodePhoneInput/CountryCodePhoneInput';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function CountryCodePhoneInputPage() {
  const [value, setValue] = React.useState('');
  const [invalid, setInvalid] = React.useState('123');

  return (
    <PageWrapper
      title="Country Code Phone Input"
      category="Core Components"
      description="A phone number field with an inline country selector. Tapping the flag opens a country bottom sheet; the dialing code updates automatically."
    >
      <ExampleSection title="Default" description="Pick a country and enter a number. Defaults to the US dialing code.">
        <div style={{maxWidth: 380}}>
          <CountryCodePhoneInput
            label="Phone number"
            value={value}
            onChange={setValue}
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Error" description="Surface a validation error with the error and errorText props.">
        <div style={{maxWidth: 380}}>
          <CountryCodePhoneInput
            label="Phone number"
            value={invalid}
            onChange={setInvalid}
            error
            errorText="Please enter a valid number"
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Disabled">
        <div style={{maxWidth: 380}}>
          <CountryCodePhoneInput label="Phone number" value="(555) 010-1234" onChange={() => {}} disabled />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Country Code Phone Input whenever a phone number must be interpreted alongside its country — checkout, account, and contact forms. Keep the default country sensible for the user's locale, show helper text explaining why you need the number, and reserve the error state for validation feedback on blur or submit."
        defaultValue="label='Phone number*'  error={false}"
      />
    </PageWrapper>
  );
}
