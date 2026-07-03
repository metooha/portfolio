import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button';
import {Checkbox} from '@/living-design/components/Checkbox';
import {Body} from '@/living-design/components/Text/Text';
import {
  DatePickerCalendar,
  type DatePickerCalendarMode,
  type DatePickerCalendarVariant,
  type DateRange,
} from '@/living-design/components/DatePickerCalendar';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const TODAY = new Date();
const RANGE_START = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 2);
const RANGE_END = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 6);

function formatDate(date?: Date) {
  return date ? date.toLocaleDateString() : '(none)';
}

function formatRange(range?: DateRange) {
  if (!range) return '(none)';
  return `${formatDate(range.from)} to ${formatDate(range.to)}`;
}

export default function DatePickerCalendarPage() {
  const [mode, setMode] = React.useState<DatePickerCalendarMode>('single');
  const [variant, setVariant] = React.useState<DatePickerCalendarVariant>('standalone');
  const [showWeekNumbers, setShowWeekNumbers] = React.useState(false);
  const [single, setSingle] = React.useState<Date | undefined>(TODAY);
  const [range, setRange] = React.useState<DateRange | undefined>({from: RANGE_START, to: RANGE_END});

  const onRangeSelect = React.useCallback((date: Date | undefined) => {
    if (!date) {
      setRange(undefined);
      return;
    }
    setRange((previous) => {
      if (!previous || (previous.from && previous.to)) return {from: date, to: undefined};
      if (previous.from && !previous.to) {
        if (date < previous.from) return {from: date, to: previous.from};
        return {from: previous.from, to: date};
      }
      return {from: date, to: undefined};
    });
  }, []);

  return (
    <PageWrapper
      title="Date Picker Calendar"
      category="Core Components"
      description="An inline calendar grid for selecting single dates or ranges with month navigation, optional week numbers, and standalone or embedded presentation."
    >
      <ExampleSection
        title="Component Configuration"
        description="Switch between single and range selection, shell treatment, and week-number display."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Mode</Body>
                <ButtonGroup>
                  <Button size="small" variant={mode === 'single' ? 'primary' : 'secondary'} onClick={() => setMode('single')}>Single</Button>
                  <Button size="small" variant={mode === 'range' ? 'primary' : 'secondary'} onClick={() => setMode('range')}>Range</Button>
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Variant</Body>
                <ButtonGroup>
                  <Button size="small" variant={variant === 'standalone' ? 'primary' : 'secondary'} onClick={() => setVariant('standalone')}>Standalone</Button>
                  <Button size="small" variant={variant === 'embedded' ? 'primary' : 'secondary'} onClick={() => setVariant('embedded')}>Embedded</Button>
                </ButtonGroup>
              </div>
              <Checkbox label="Show week numbers" checked={showWeekNumbers} onChange={(event) => setShowWeekNumbers(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description={mode === 'single' ? `Selected: ${formatDate(single)}` : `Range: ${formatRange(range)}`}>
              {mode === 'single' ? (
                <DatePickerCalendar mode="single" value={single} onSelect={setSingle} variant={variant} showWeekNumbers={showWeekNumbers} />
              ) : (
                <DatePickerCalendar mode="range" selected={range} onSelect={onRangeSelect} variant={variant} showWeekNumbers={showWeekNumbers} />
              )}
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Selection Patterns" description="Use single-date selection for one value and range selection when start and end dates are paired.">
        <DocsGrid minColumnWidth={360}>
          <DocsCard title="Single date" description={`Selected: ${formatDate(single)}`}>
            <DatePickerCalendar mode="single" value={single} onSelect={setSingle} />
          </DocsCard>
          <DocsCard title="Range" description={`Range: ${formatRange(range)}`}>
            <DatePickerCalendar mode="range" selected={range} onSelect={onRangeSelect} />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use standalone calendars when the calendar is the main surface and embedded calendars inside popovers, sheets, or paired range pickers. Preserve date constraints in disabled, fromDate, and toDate props."
        defaultValue="mode='single', variant='standalone', weekStartsOn=0"
      />
    </PageWrapper>
  );
}