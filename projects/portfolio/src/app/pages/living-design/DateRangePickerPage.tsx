import * as React from 'react';

import {Checkbox} from '@/living-design/components/Checkbox';
import {Body} from '@/living-design/components/Text/Text';
import {DateRangePicker, type DateRange} from '@/living-design/components/DateRangePicker';

import {
  ComponentConfigurationCard,
  DocsCard,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const TODAY = new Date();
const DEFAULT_START = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 3);
const DEFAULT_END = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 8);

function formatDate(date?: Date) {
  return date ? date.toLocaleDateString() : '(none)';
}

function formatRange(range?: DateRange) {
  if (!range) return '(none)';
  return `${formatDate(range.from)} to ${formatDate(range.to)}`;
}

export default function DateRangePickerPage() {
  const [range, setRange] = React.useState<DateRange | undefined>({from: DEFAULT_START, to: DEFAULT_END});
  const [lastApplied, setLastApplied] = React.useState<DateRange | undefined>({from: DEFAULT_START, to: DEFAULT_END});
  const [showWeekNumbers, setShowWeekNumbers] = React.useState(false);
  const [limitToFuture, setLimitToFuture] = React.useState(false);
  const [cancelCount, setCancelCount] = React.useState(0);

  return (
    <PageWrapper
      title="Date Range Picker"
      category="Core Components"
      description="A paired-calendar picker with Cancel and Apply actions for selecting and committing a date range."
    >
      <ExampleSection
        title="Component Configuration"
        description="Adjust constraints and week-number display, then apply or cancel the working range."
      >
        <ComponentConfigurationCard
          stack
          controls={
            <>
              <Checkbox label="Show week numbers" checked={showWeekNumbers} onChange={(event) => setShowWeekNumbers(event.target.checked)} />
              <Checkbox label="Limit to today and later" checked={limitToFuture} onChange={(event) => setLimitToFuture(event.target.checked)} />
              <div style={{display: 'grid', gap: 6}}>
                <Body as="span" size="small" weight="alt">Committed range</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>{formatRange(lastApplied)}</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>Cancels: {cancelCount}</Body>
              </div>
            </>
          }
          preview={
            <DocsCard title="Preview" description="Apply commits the temporary range; Cancel restores the previous value." style={{overflow: 'visible'}}>
              <DateRangePicker
                value={range}
                showWeekNumbers={showWeekNumbers}
                fromDate={limitToFuture ? TODAY : undefined}
                onApply={(nextRange) => {
                  setRange(nextRange);
                  setLastApplied(nextRange);
                }}
                onCancel={() => setCancelCount((value) => value + 1)}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Range Workflow" description="Use a separate Apply action when date selections should not update filters immediately.">
        <DocsCard title="Apply and cancel" description={`Last applied: ${formatRange(lastApplied)}`}>
          <DateRangePicker
            value={range}
            onApply={(nextRange) => {
              setRange(nextRange);
              setLastApplied(nextRange);
            }}
            onCancel={() => setCancelCount((value) => value + 1)}
          />
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use Date Range Picker when users need to review both months before committing. Keep Cancel and Apply labels clear, and constrain unavailable dates instead of allowing invalid ranges."
        defaultValue="labels={cancel: 'Cancel', apply: 'Apply'}"
      />
    </PageWrapper>
  );
}