import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {DatePicker, type DatePickerDateFieldSize} from '../components/DatePicker/DatePicker';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SIZE_OPTIONS: Array<{size: DatePickerDateFieldSize; label: string}> = [
  {size: 'large', label: 'Large'},
  {size: 'small', label: 'Small'},
];

const INITIAL_DATE = new Date(2026, 4, 18);
const MIN_DATE = new Date(2026, 4, 1);
const MAX_DATE = new Date(2026, 4, 31);
const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

export default function DatePickerPage() {
  const [value, setValue] = React.useState<Date | undefined>(INITIAL_DATE);
  const [isOpen, setIsOpen] = React.useState(false);
  const [size, setSize] = React.useState<DatePickerDateFieldSize>('large');
  const [showHelper, setShowHelper] = React.useState(true);
  const [showError, setShowError] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  const [disableWeekends, setDisableWeekends] = React.useState(true);
  const [limitRange, setLimitRange] = React.useState(false);
  const [deliveryDate, setDeliveryDate] = React.useState<Date | undefined>(new Date(2026, 4, 20));
  const [deliveryOpen, setDeliveryOpen] = React.useState(false);
  const [pickupDate, setPickupDate] = React.useState<Date | undefined>();
  const [pickupOpen, setPickupOpen] = React.useState(false);
  const [compactDate, setCompactDate] = React.useState<Date | undefined>(new Date(2026, 4, 12));
  const [compactOpen, setCompactOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [minMaxDate, setMinMaxDate] = React.useState<Date | undefined>(new Date(2026, 4, 18));
  const [minMaxOpen, setMinMaxOpen] = React.useState(false);

  const helperText = showHelper ? 'Use MM/dd/yyyy or choose a date from the calendar.' : undefined;
  const error = showError ? 'Choose an available weekday in May.' : undefined;

  const handleSelect = (date?: Date) => {
    setValue(date);
    setIsOpen(false);
  };

  return (
    <PageWrapper
      title="Date Picker"
      category="Core Components"
      description="Calendar-assisted date field for choosing one valid date with typed input or a popover calendar."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview size, open state, helper, error, disabled, read-only, weekend, and range constraints."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Size
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the date field density used in the preview.
                </Body>
              </div>
              <ButtonGroup aria-label="Date picker size">
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
                <Checkbox label="Calendar open" checked={isOpen} onChange={(event) => setIsOpen(event.target.checked)} />
                <Checkbox label="Show helper text" checked={showHelper} onChange={(event) => setShowHelper(event.target.checked)} />
                <Checkbox label="Show error" checked={showError} onChange={(event) => setShowError(event.target.checked)} />
                <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
                <Checkbox label="Read only" checked={readOnly} onChange={(event) => setReadOnly(event.target.checked)} />
                <Checkbox label="Disable weekends" checked={disableWeekends} onChange={(event) => setDisableWeekends(event.target.checked)} />
                <Checkbox label="Limit to May 2026" checked={limitRange} onChange={(event) => setLimitRange(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${size === 'large' ? 'Large' : 'Small'} date picker`} description="The preview is controlled with value, isOpen, onOpen, onClose, and onSelect.">
              <div style={{maxWidth: 'min(360px, 100%)'}}>
                <DatePicker
                  disabled={disabled}
                  disabledDateFilter={disableWeekends ? isWeekend : undefined}
                  error={error}
                  helperText={!error ? helperText : undefined}
                  isOpen={isOpen}
                  label="Delivery date (MM/dd/yyyy)"
                  locale="en-US"
                  maxDate={limitRange ? MAX_DATE : undefined}
                  minDate={limitRange ? MIN_DATE : undefined}
                  onClose={() => setIsOpen(false)}
                  onOpen={() => setIsOpen(true)}
                  onSelect={handleSelect}
                  readOnly={readOnly}
                  size={size}
                  value={value}
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Common states" description="Use Date Picker when calendar context helps users choose a valid date.">
        <DocsGrid>
          <DocsCard title="Default" description="Use a label that includes the expected typed format.">
            <DatePicker
              isOpen={deliveryOpen}
              label="Delivery date (MM/dd/yyyy)"
              locale="en-US"
              onClose={() => setDeliveryOpen(false)}
              onOpen={() => setDeliveryOpen(true)}
              onSelect={(date) => {
                setDeliveryDate(date);
                setDeliveryOpen(false);
              }}
              value={deliveryDate}
            />
          </DocsCard>
          <DocsCard title="Helper text" description="Use helper text for availability rules and date constraints.">
            <DatePicker
              disabledDateFilter={isWeekend}
              helperText="Weekends are unavailable for pickup."
              isOpen={pickupOpen}
              label="Pickup date (MM/dd/yyyy)"
              locale="en-US"
              onClose={() => setPickupOpen(false)}
              onOpen={() => setPickupOpen(true)}
              onSelect={(date) => {
                setPickupDate(date);
                setPickupOpen(false);
              }}
              value={pickupDate}
            />
          </DocsCard>
          <DocsCard title="Error" description="Use error text for invalid, unavailable, or missing required dates.">
            <DatePicker
              error="Choose an available delivery date."
              isOpen={errorOpen}
              label="Delivery date (MM/dd/yyyy)"
              locale="en-US"
              onClose={() => setErrorOpen(false)}
              onOpen={() => setErrorOpen(true)}
              onSelect={() => setErrorOpen(false)}
              value={undefined}
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Constraints and density" description="Apply date constraints in the picker instead of relying on validation after selection.">
        <DocsGrid>
          <DocsCard title="Minimum and maximum" description="Limit selection to a known availability window.">
            <DatePicker
              helperText="Only May 2026 dates are available."
              isOpen={minMaxOpen}
              label="Availability date (MM/dd/yyyy)"
              locale="en-US"
              maxDate={MAX_DATE}
              minDate={MIN_DATE}
              onClose={() => setMinMaxOpen(false)}
              onOpen={() => setMinMaxOpen(true)}
              onSelect={(date) => {
                setMinMaxDate(date);
                setMinMaxOpen(false);
              }}
              value={minMaxDate}
            />
          </DocsCard>
          <DocsCard title="Small" description="Use small in compact forms where the surrounding controls use the same density.">
            <DatePicker
              isOpen={compactOpen}
              label="Compact date"
              locale="en-US"
              onClose={() => setCompactOpen(false)}
              onOpen={() => setCompactOpen(true)}
              onSelect={(date) => {
                setCompactDate(date);
                setCompactOpen(false);
              }}
              size="small"
              value={compactDate}
            />
          </DocsCard>
          <DocsCard title="Disabled and read-only" description="Use disabled for unavailable input and read-only for locked values that remain readable.">
            <div style={{display: 'grid', gap: 16}}>
              <DatePicker
                disabled
                isOpen={false}
                label="Disabled date"
                locale="en-US"
                onClose={() => {}}
                onOpen={() => {}}
                onSelect={() => {}}
                value={new Date(2026, 4, 10)}
              />
              <DatePicker
                isOpen={false}
                label="Read-only date"
                locale="en-US"
                onClose={() => {}}
                onOpen={() => {}}
                onSelect={() => {}}
                readOnly
                value={new Date(2026, 4, 11)}
              />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Date Picker when users benefit from calendar context or date availability rules. Include the expected typed format in the label, close the calendar after selection, and use disabledDateFilter, minDate, or maxDate to prevent invalid choices before submission. Use helper text for availability context and error text for recovery when a typed value cannot be parsed or is outside the allowed range."
        defaultValue="locale='en-US', format='MM/dd/yyyy', size='large'"
      />
    </PageWrapper>
  );
}
