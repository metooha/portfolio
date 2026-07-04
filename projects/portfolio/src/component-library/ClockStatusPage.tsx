import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {ClockStatus} from '@/app/components/ClockStatus/ClockStatus';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid, DocsCard} from './shared';

const ROW: React.CSSProperties = {display: 'flex', alignItems: 'center', gap: 10};

export default function ClockStatusPage() {
  return (
    <PageWrapper
      title="Clock Status"
      category="Associate Experience"
      description="A small indicator dot that shows whether an associate is clocked in or out. Sourced from the AX component library."
    >
      <ExampleSection title="States" description="A filled green dot signals clocked in; a muted dot signals clocked out.">
        <DocsGrid minColumnWidth={200}>
          <DocsCard title="Clocked in">
            <div style={ROW}>
              <ClockStatus active />
              <Body as="span" size="medium">On the clock</Body>
            </div>
          </DocsCard>
          <DocsCard title="Clocked out">
            <div style={ROW}>
              <ClockStatus active={false} />
              <Body as="span" size="medium" color="subtle">Off the clock</Body>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Clock Status as a compact, at-a-glance indicator of shift state next to an associate's name or in a scheduling widget. Because the dot is decorative, always pair it with a visible text label so the status is conveyed by more than color alone."
        defaultValue="active={false}"
      />
    </PageWrapper>
  );
}
