import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {FormGroup} from '@/app/components/FormGroup/FormGroup';
import {Radio} from '@/app/components/Radio/Radio';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type GroupControlType = 'checkbox' | 'radio';

const CONTROL_TYPES: Array<{type: GroupControlType; label: string; description: string}> = [
  {type: 'checkbox', label: 'Checkboxes', description: 'Use when users can choose any number of related options.'},
  {type: 'radio', label: 'Radios', description: 'Use when users must choose exactly one option from a related set.'},
];

export default function FormGroupPage() {
  const [controlType, setControlType] = React.useState<GroupControlType>('checkbox');
  const [showHelper, setShowHelper] = React.useState(true);
  const [showError, setShowError] = React.useState(false);
  const [interests, setInterests] = React.useState<Record<string, boolean>>({
    grocery: true,
    home: false,
    pharmacy: false,
  });
  const [contact, setContact] = React.useState('email');
  const [plan, setPlan] = React.useState('pickup');
  const [errorOptions, setErrorOptions] = React.useState<Record<string, boolean>>({
    receipt: false,
    savings: false,
    delivery: false,
  });

  const selectedType = CONTROL_TYPES.find((item) => item.type === controlType) ?? CONTROL_TYPES[0];
  const hasErrorSelection = Object.values(errorOptions).some(Boolean);
  const effectiveError = showError ? 'Choose at least one option to continue.' : undefined;
  const toggleInterest = (key: string) => setInterests((current) => ({...current, [key]: !current[key]}));
  const toggleErrorOption = (key: string) => setErrorOptions((current) => ({...current, [key]: !current[key]}));

  return (
    <PageWrapper
      title="Form Group"
      category="Core Components"
      description="Semantic fieldset and legend wrapper for grouping related form controls with shared label, helper text, and error messaging."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview checkbox or radio groups with helper and error messaging."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Control type</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the grouped control pattern.
                </Body>
              </div>
              <ButtonGroup aria-label="Form group control type">
                {CONTROL_TYPES.map((item) => (
                  <Button
                    key={item.type}
                    size="small"
                    variant={controlType === item.type ? 'primary' : 'secondary'}
                    aria-pressed={controlType === item.type}
                    onClick={() => setControlType(item.type)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Show helper text" checked={showHelper} onChange={(event) => setShowHelper(event.target.checked)} />
                <Checkbox label="Show error state" checked={showError} onChange={(event) => setShowError(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={selectedType.label} description={selectedType.description}>
              {controlType === 'checkbox' ? (
                <FormGroup
                  label="Departments"
                  helperText={showHelper && !effectiveError ? 'Choose all departments you shop most often.' : undefined}
                  error={effectiveError}
                >
                  <Checkbox label="Grocery" checked={interests.grocery} onChange={() => toggleInterest('grocery')} />
                  <Checkbox label="Home" checked={interests.home} onChange={() => toggleInterest('home')} />
                  <Checkbox label="Pharmacy" checked={interests.pharmacy} onChange={() => toggleInterest('pharmacy')} />
                </FormGroup>
              ) : (
                <FormGroup
                  label="Preferred contact method"
                  helperText={showHelper && !effectiveError ? 'Select one way for us to contact you.' : undefined}
                  error={effectiveError}
                >
                  <Radio name="contact-preview" value="email" label="Email" checked={contact === 'email'} onChange={() => setContact('email')} />
                  <Radio name="contact-preview" value="phone" label="Phone" checked={contact === 'phone'} onChange={() => setContact('phone')} />
                  <Radio name="contact-preview" value="text" label="Text message" checked={contact === 'text'} onChange={() => setContact('text')} />
                </FormGroup>
              )}
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Group types" description="Use FormGroup to connect one label and helper or error text to related controls.">
        <DocsGrid>
          <DocsCard title="Checkbox group" description="Use for multi-select decisions with one shared prompt.">
            <FormGroup label="Select your interests" helperText="Choose all that apply.">
              <Checkbox label="Technology" checked={interests.grocery} onChange={() => toggleInterest('grocery')} />
              <Checkbox label="Sports" checked={interests.home} onChange={() => toggleInterest('home')} />
              <Checkbox label="Music" checked={interests.pharmacy} onChange={() => toggleInterest('pharmacy')} />
            </FormGroup>
          </DocsCard>
          <DocsCard title="Radio group" description="Use for mutually exclusive options that answer one question.">
            <FormGroup label="Fulfillment preference" helperText="Select one default option.">
              <Radio name="fulfillment" value="pickup" label="Pickup" checked={plan === 'pickup'} onChange={() => setPlan('pickup')} />
              <Radio name="fulfillment" value="delivery" label="Delivery" checked={plan === 'delivery'} onChange={() => setPlan('delivery')} />
              <Radio name="fulfillment" value="shipping" label="Shipping" checked={plan === 'shipping'} onChange={() => setPlan('shipping')} />
            </FormGroup>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Validation states" description="Error messages should describe the group-level problem and how to recover.">
        <DocsGrid>
          <DocsCard title="Helper text" description="Use helper text for context that applies to the whole group.">
            <FormGroup label="Delivery updates" helperText="Choose the notifications you want for this order.">
              <Checkbox label="Receipt emails" checked={errorOptions.receipt} onChange={() => toggleErrorOption('receipt')} />
              <Checkbox label="Savings alerts" checked={errorOptions.savings} onChange={() => toggleErrorOption('savings')} />
              <Checkbox label="Delivery changes" checked={errorOptions.delivery} onChange={() => toggleErrorOption('delivery')} />
            </FormGroup>
          </DocsCard>
          <DocsCard title="Error text" description="Use error text when a required group has not met validation requirements.">
            <FormGroup
              label="Required notifications"
              error={hasErrorSelection ? undefined : 'Choose at least one notification.'}
            >
              <Checkbox label="Receipt emails" checked={errorOptions.receipt} onChange={() => toggleErrorOption('receipt')} />
              <Checkbox label="Savings alerts" checked={errorOptions.savings} onChange={() => toggleErrorOption('savings')} />
              <Checkbox label="Delivery changes" checked={errorOptions.delivery} onChange={() => toggleErrorOption('delivery')} />
            </FormGroup>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use FormGroup when a set of controls shares one question, helper text, or validation message. Keep the label phrased as the group prompt, use helper text only for context that applies to every option, and put validation errors on the group when the user must satisfy a group-level requirement. Avoid grouping unrelated controls just to create visual spacing."
        defaultValue="label=undefined, helperText=undefined, error=undefined"
      />
    </PageWrapper>
  );
}
