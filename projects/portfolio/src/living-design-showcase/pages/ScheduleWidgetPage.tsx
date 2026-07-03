import * as React from 'react';

import {ScheduleWidget, type Shift} from '@/living-design/patterns/ScheduleWidget';

import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const SHIFTS: Shift[] = [
  {
    id: 'today',
    dateLabel: 'Today, Mar 4',
    role: 'Food & Consumables TL',
    lunchTime: '12:00pm – 12:30pm',
    store: 'Store #972',
    showReportAbsence: true,
  },
  {
    id: 'wed',
    dateLabel: 'Wed, Mar 5',
    role: 'Food & Consumables TL',
    lunchTime: '12:00pm – 12:30pm',
    store: 'Store #972',
  },
  {
    id: 'thu',
    dateLabel: 'Thu, Mar 6',
    role: 'Food & Consumables TL',
    lunchTime: '11:30am – 12:00pm',
    store: 'Store #972',
    isOffsite: true,
  },
];

export default function ScheduleWidgetPage() {
  return (
    <PageWrapper
      title="Schedule Widget"
      category="AX Patterns"
      description="Compact list of upcoming associate shifts. Today's shift gets a `Report an absence` CTA; off-site shifts get an Offsite tag."
    >
      <ExampleSection
        title="Component Configuration"
        description="Three upcoming shifts + a footer promo card."
      >
        <div style={{maxWidth: 480, border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', borderRadius: 8, overflow: 'hidden'}}>
          <ScheduleWidget shifts={SHIFTS} />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Schedule Widget for compact upcoming-shift summaries. Highlight today's absence action only when available, preserve offsite tags, and keep footer promo content secondary to shift information."
        defaultValue="shifts=[]"
      />
    </PageWrapper>
  );
}
