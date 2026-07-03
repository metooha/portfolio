import * as React from 'react';

import {ClockingWidget} from '@/living-design/patterns/ClockingWidget';

import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function ClockingWidgetPage() {
  return (
    <PageWrapper
      title="Clocking Widget"
      category="AX Patterns"
      description="Top-of-app summary card showing the associate's clock state, role, shift, lunch, store, and primary clock-in / view-timecard actions. Layout is driven by container queries — attributes stack on narrow containers (< 600px) and flow on a single line at the LD `medium` breakpoint and above."
    >
      <ExampleSection
        title="Component Configuration"
        description="Default state — primary CTA reads `Clock in`. Renders at the host page width, so on a desktop viewport the attributes flow inline."
      >
        <ClockingWidget />
      </ExampleSection>

      <ExampleSection
        title="Clocked in"
        description="Clocked in state with green status indicator."
      >
        <ClockingWidget clockState="clocked-in" />
      </ExampleSection>

      <ExampleSection
        title="Responsive layout"
        description="Side-by-side preview of the container-query breakpoint. The mobile shell (375px) keeps attributes stacked; the desktop shell (≥ 600px) lays them out on a single line."
      >
        <div
          style={{
            display: 'flex',
            gap: 24,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          <div style={{flex: '0 0 375px', maxWidth: 375}}>
            <p
              style={{
                margin: '0 0 8px',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                color: '#74767c',
              }}
            >
              Mobile · 375px (stacked)
            </p>
            <ClockingWidget clockState="clocked-in" />
          </div>
          <div style={{flex: '1 1 720px', minWidth: 600}}>
            <p
              style={{
                margin: '0 0 8px',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                color: '#74767c',
              }}
            >
              Desktop · ≥ 600px (single line)
            </p>
            <ClockingWidget clockState="clocked-in" />
          </div>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Clocking Widget at the top of associate home experiences where clock state and shift context need to be visible together. Keep the primary action tied to the current clock state and verify container-query behavior in narrow host surfaces."
        defaultValue="clockState='clocked-out'"
      />
    </PageWrapper>
  );
}
