import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {TextFieldSplit} from '@/app/components/TextFieldSplit/TextFieldSplit';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function TextFieldSplitPage() {
  const [code, setCode] = React.useState('+1');
  const [phone, setPhone] = React.useState('');

  return (
    <PageWrapper
      title="Text Field Split"
      category="Core Components"
      description="A Text Field with a leading Select, for inputs whose meaning depends on a unit or prefix — country code + phone number, currency + amount, protocol + URL."
    >
      <ExampleSection title="Country code + phone" description="The leading select carries its own accessible label since the visible label describes the input.">
        <div style={{maxWidth: 360}}>
          <TextFieldSplit
            label="Phone number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            selectA11yLabel="Country calling code"
            selectValue={code}
            selectOnChange={(e) => setCode(e.target.value)}
            selectChildren={
              <>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+52">+52</option>
                <option value="+91">+91</option>
              </>
            }
            helperText="Include area code"
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Disabled">
        <div style={{maxWidth: 360}}>
          <TextFieldSplit
            label="Amount"
            value=""
            onChange={() => {}}
            disabled
            selectA11yLabel="Currency"
            selectValue="USD"
            selectOnChange={() => {}}
            selectChildren={<option value="USD">USD</option>}
          />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Text Field Split when a value is only meaningful alongside a category — a currency, unit, country code, or protocol. Keep the select's option set short; if it grows large, consider a Combobox instead. Always provide selectA11yLabel so the leading control is named independently of the field label."
        defaultValue="type='text'  size='large'"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            The visible <code>label</code> names the text input; <code>selectA11yLabel</code> gives the leading select its own visually hidden name so both controls are individually announced.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
