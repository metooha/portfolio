import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {SearchIcon} from '@/living-design/components/Icons/Icons';
import {Select, type SelectSize} from '@/living-design/components/Select/Select';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SIZE_OPTIONS: Array<{size: SelectSize; label: string}> = [
  {size: 'large', label: 'Large'},
  {size: 'small', label: 'Small'},
];

const FULFILLMENT_OPTIONS = [
  {value: '', label: 'Choose a method'},
  {value: 'pickup', label: 'Pickup'},
  {value: 'delivery', label: 'Delivery'},
  {value: 'shipping', label: 'Shipping'},
];

const DEPARTMENT_OPTIONS = [
  {value: 'grocery', label: 'Grocery'},
  {value: 'home', label: 'Home & garden'},
  {value: 'electronics', label: 'Electronics'},
  {value: 'pharmacy', label: 'Pharmacy'},
];

export default function SelectPage() {
  const [size, setSize] = React.useState<SelectSize>('large');
  const [value, setValue] = React.useState('pickup');
  const [disabled, setDisabled] = React.useState(false);
  const [showHelper, setShowHelper] = React.useState(true);
  const [showError, setShowError] = React.useState(false);
  const [isMagic, setIsMagic] = React.useState(false);
  const [withIcon, setWithIcon] = React.useState(false);
  const [department, setDepartment] = React.useState('grocery');

  const helperText = showHelper ? 'Choose one option from the available fulfillment methods.' : undefined;
  const error = showError ? 'Select a fulfillment method before continuing.' : undefined;

  return (
    <PageWrapper
      title="Select"
      category="Core Components"
      description="Dropdown selection control for choosing one value from a predefined list."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview size, helper, error, disabled, icon, and AI-assisted visual states."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the density used in the preview.
                </Body>
              </div>
              <ButtonGroup aria-label="Select size">
                {SIZE_OPTIONS.map((item) => (
                  <Button
                    key={item.size}
                    size="small"
                    variant={size === item.size ? 'primary' : 'secondary'}
                    aria-pressed={size === item.size}
                    onClick={() => setSize(item.size)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Show helper text" checked={showHelper} onChange={(event) => setShowHelper(event.target.checked)} />
                <Checkbox label="Show error" checked={showError} onChange={(event) => setShowError(event.target.checked)} />
                <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
                <Checkbox label="Magic styling" checked={isMagic} onChange={(event) => setIsMagic(event.target.checked)} />
                <Checkbox label="Leading icon" checked={withIcon} onChange={(event) => setWithIcon(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${size === 'large' ? 'Large' : 'Small'} select`} description="The preview uses controlled value and onChange props.">
              <Select
                label="Fulfillment method"
                size={size}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                helperText={helperText}
                error={error}
                disabled={disabled}
                isMagic={isMagic}
                leadingIcon={withIcon ? <SearchIcon /> : undefined}
              >
                {FULFILLMENT_OPTIONS.map((option) => (
                  <option key={option.value || 'placeholder'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Common states" description="Each card demoes one slice of the Select API.">
        <DocsGrid>
          <DocsCard title="Helper text" description="Use helper text for context that always applies.">
            <Select
              label="Department"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              helperText="Pick the department you shop most often."
            >
              {DEPARTMENT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
          </DocsCard>
          <DocsCard title="Error" description="Use error text when validation fails for the field.">
            <Select label="Fulfillment" value="" onChange={() => {}} error="Select a fulfillment method.">
              {FULFILLMENT_OPTIONS.map((option) => (
                <option key={option.value || 'placeholder'} value={option.value}>{option.label}</option>
              ))}
            </Select>
          </DocsCard>
          <DocsCard title="Disabled" description="Disable when the field is locked by another decision.">
            <Select label="Fulfillment" value="pickup" onChange={() => {}} disabled>
              {FULFILLMENT_OPTIONS.map((option) => (
                <option key={option.value || 'placeholder'} value={option.value}>{option.label}</option>
              ))}
            </Select>
          </DocsCard>
          <DocsCard title="Leading icon" description="Pair Select with a leading icon for filter-style menus.">
            <Select label="Search by" value="pickup" onChange={() => {}} leadingIcon={<SearchIcon />}>
              {FULFILLMENT_OPTIONS.map((option) => (
                <option key={option.value || 'placeholder'} value={option.value}>{option.label}</option>
              ))}
            </Select>
          </DocsCard>
          <DocsCard title="Magic" description="Use isMagic to indicate AI-assisted defaults or suggestions.">
            <Select label="AI-suggested option" value="pickup" onChange={() => {}} isMagic>
              {FULFILLMENT_OPTIONS.map((option) => (
                <option key={option.value || 'placeholder'} value={option.value}>{option.label}</option>
              ))}
            </Select>
          </DocsCard>
          <DocsCard title="Small" description="Use small Select in dense forms and inline filters.">
            <Select label="Filter" value="pickup" onChange={() => {}} size="small">
              {FULFILLMENT_OPTIONS.map((option) => (
                <option key={option.value || 'placeholder'} value={option.value}>{option.label}</option>
              ))}
            </Select>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Select when a single value comes from a known, manageable list (under ~20 options). Provide a label, surface validation via the error prop, and use helper text for context that applies regardless of value. For longer or searchable lists, switch to Country Select or a typeahead pattern."
        defaultValue="size='large', value=''"
      />
    </PageWrapper>
  );
}
