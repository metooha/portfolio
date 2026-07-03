import * as React from 'react';

import {Body} from '@/living-design/components/Text/Text';
import {TimerView, type TimerViewSize, type TimerViewVariant} from '@/living-design/components/TimerView/TimerView';
import {
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const VARIANTS: Array<{variant: TimerViewVariant; label: string; description: string; display: string}> = [
  {variant: 'waiting', label: 'Waiting (Blue)', description: 'Use for estimated queue waits and long-running countdowns.', display: '57mins'},
  {variant: 'warning', label: 'Warning (Yellow)', description: 'Use when the countdown is getting close to expiry.', display: '10:23'},
  {variant: 'expiring', label: 'Expiring (Red)', description: 'Use for the final countdown before the action expires.', display: '01:03'},
];

const SIZES: Array<{size: TimerViewSize; label: string}> = [
  {size: 'medium', label: 'Medium (default)'},
  {size: 'small', label: 'Small'},
];

export default function TimerViewPage() {
  return (
    <PageWrapper
      title="Timer View"
      category="WCP Patterns"
      description="Urgency-colored countdown timer pill used across queue flows, banners, and product cards. Displays time remaining with color-coded urgency states."
    >
      <ExampleSection
        title="Component Configuration"
        description="Three variants based on urgency level — variant auto-resolves from remaining time."
      >
        <DocsGrid>
          {VARIANTS.map((item) => (
            <DocsCard key={item.variant} title={item.label} description={item.description}>
              <div style={{display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'}}>
                <TimerView timeDisplay={item.display} variant={item.variant} size="medium" />
                <Body as="span" size="small" color="subtle">
                  {item.variant === 'waiting' ? 'estimated wait' : 'left to buy'}
                </Body>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Sizes" description="Medium for banners and cards, small for compact inline usage.">
        <DocsGrid>
          {SIZES.map((item) => (
            <DocsCard key={item.size} title={item.label}>
              <div style={{display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'}}>
                <TimerView timeDisplay="59mins" variant="waiting" size={item.size} />
                <TimerView timeDisplay="10:23" variant="warning" size={item.size} />
                <TimerView timeDisplay="01:03" variant="expiring" size={item.size} />
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Timer View to surface time-sensitive context — queue waits, reservation expiries, deal countdowns. Choose the variant that matches the remaining urgency (or let the higher-level Queue patterns pick it). Pair the timer with a short label so the user understands what the countdown applies to."
        defaultValue="variant='waiting', size='medium'"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility — live announcements</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            <strong>Do not put <code>aria-live</code> on <code>TimerView</code> itself.</strong> The display updates every second — announcing on every tick would overwhelm screen reader users with a continuous stream of numbers.
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: '8px 0 0', lineHeight: '1.5'}}>
            Instead, maintain a separate visually-hidden <code>role="status"</code> element and update it only when <strong>all of the following are true</strong>:
          </Body>
          <ul style={{margin: '8px 0 0', paddingLeft: 20, display: 'grid', gap: 4}}>
            <li><Body as="p" size="medium" color="subtle" style={{lineHeight: '1.5', margin: 0}}>There is <strong>exactly one</strong> active countdown timer visible on the page. If multiple timers are shown simultaneously (e.g. a list of auction items), omit announcements entirely — AT users can navigate to a specific timer to read its value.</Body></li>
            <li><Body as="p" size="medium" color="subtle" style={{lineHeight: '1.5', margin: 0}}><strong>Under 1 hour remains</strong> (<code>totalSeconds {'<='} 3600</code>). Announcements before the final hour add noise with no urgency benefit.</Body></li>
            <li><Body as="p" size="medium" color="subtle" style={{lineHeight: '1.5', margin: 0}}><strong>A 6-minute boundary is crossed</strong> (<code>totalSeconds % 360 === 0</code>). This yields 10 evenly-spaced announcements across the final hour: at 60:00, 54:00, 48:00 … 6:00.</Body></li>
          </ul>
          <Body as="p" size="medium" color="subtle" style={{margin: '8px 0 0', lineHeight: '1.5'}}>
            Use <code>aria-live="polite"</code> with <code>aria-atomic="true"</code> so the full time string is read without interrupting the user. Add a separate <code>aria-live="assertive"</code> announcement at expiry (e.g. <em>"Your reservation has expired"</em>). The live region element must always be present in the DOM — regions injected at announcement time are ignored by most screen readers.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
