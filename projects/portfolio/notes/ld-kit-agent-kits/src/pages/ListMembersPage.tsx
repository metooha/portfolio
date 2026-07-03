import * as React from 'react';

import {
  ListMembersItem,
  ListMembersList,
} from '../patterns/ListMembers';
import {ProgressIndicator} from '../components/ProgressIndicator/ProgressIndicator';

import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function ListMembersPage() {
  return (
    <PageWrapper
      title="List Members"
      category="Subsystem Components"
      description="List + ListItem for team-member / scheduling lists used in Associate Experiences. Same skeleton as ListAction with an extra Monitoring section (label + ProgressIndicator + assigned-goal rows) and shift-specific tag presets."
    >
      <ExampleSection
        title="Component Configuration"
        description="Common tag presets cover the bulk of scheduling states."
      >
        <div style={{maxWidth: 640, padding: 16, border: '1px solid #ececec', borderRadius: 8}}>
          <ListMembersList>
            <ListMembersItem tag="absent" title="Jordan S." text="Front-end 9-5" divider />
            <ListMembersItem tag="tardy" title="Marcus T." text="Bakery 7-3" divider />
            <ListMembersItem tag="meal" title="Priya R." text="Grocery 11-7" divider />
            <ListMembersItem tag="ppto" title="Cole H." text="Pharmacy 6-2" />
          </ListMembersList>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Monitoring + assigned goals"
        description="The monitoring section pairs a ProgressIndicator with assigned-goal rows."
      >
        <div style={{maxWidth: 640, padding: 16, border: '1px solid #ececec', borderRadius: 8}}>
          <ListMembersList>
            <ListMembersItem
              title="Sam L."
              text="Stocking 8-4"
              monitoring={
                <ProgressIndicator
                  variant="info"
                  value={62}
                  label="On pace"
                  valueLabel="62% of shift"
                />
              }
              monitoringGoals={[
                {title: 'Replenish dairy', actions: 'pick, transfer, stock'},
                {title: 'Top-stock checkouts', actions: 'audit, label'},
              ]}
            />
          </ListMembersList>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use List Members for associate scheduling and monitoring lists. Prefer preset status tags, keep monitoring progress tied to a specific shift goal, and show assigned goals only when they help the manager act."
        defaultValue="tag undefined, divider=false"
      />
    </PageWrapper>
  );
}
