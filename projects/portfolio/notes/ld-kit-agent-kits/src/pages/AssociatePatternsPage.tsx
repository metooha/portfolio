import * as React from 'react';

import {ListActionItem, ListActionList} from '../patterns/ListAction';
import {ListAssociateItem, ListAssociateList} from '../patterns/ListAssociate';
import {ListGoal} from '../patterns/ListGoal';
import {ListMembersItem, ListMembersList} from '../patterns/ListMembers';
import {Button} from '../components/Button/Button';
import {Icon} from '../components/Icons';
import {ExampleSection, PageWrapper} from './shared';

const frameStyle: React.CSSProperties = {
  maxWidth: 720,
  padding: 16,
  border: '1px solid #ececec',
  borderRadius: 8,
  background: '#fff',
};

export default function AssociatePatternsPage() {
  const [selectedAction, setSelectedAction] = React.useState(false);
  const [selectedAssociate, setSelectedAssociate] = React.useState(false);

  return (
    <PageWrapper
      title="Associate Lists"
      category="Associate Patterns"
      description="Associate list patterns for action queues, goals, associates, members, and team navigation."
    >
      <ExampleSection
        title="List Action"
        description="Action queue rows with tags, attributes, trailing affordances, and optional footer actions."
      >
        <div style={frameStyle}>
          <ListActionList>
            <ListActionItem
              tag="unassigned"
              title="Stock the freezer aisle"
              text="Bin 4A, frozen entrees"
              attributes={[{label: '12 items'}, {label: 'Due in 30m'}]}
              trailing="icon"
              divider
            />
            <ListActionItem
              tag="assigned"
              title="Pallet drop conflict"
              text="The 4pm pallet drop overlaps with curbside pickup."
              trailing="select"
              trailingChecked={selectedAction}
              onTrailingCheckedChange={setSelectedAction}
              footerAction={
                <Button variant="primary" size="small" isFullWidth>
                  Resolve conflict
                </Button>
              }
            />
          </ListActionList>
        </div>
      </ExampleSection>

      <ExampleSection
        title="List Goal"
        description="Goal rows with progress, AI insight, alert messaging, and optional Sidekick treatment."
      >
        <div style={frameStyle}>
          <ListGoal
            goalName="Reduce pallet drop conflicts"
            tagLabel="In progress"
            tagColor="warning"
            progressTitle="62% complete"
            progressValue={62}
            progressLabel="On pace"
            progressValueLabel="62% of plan"
            insightLabel="Tonight's stocking plan reduces curbside conflict by 18%."
            alertMessage="Two associates flagged the 4pm window."
            alertAction="Review"
            onAlertAction={() => {}}
          />
          <ListGoal
            sidekick
            goalName="Sidekick recommendation: rebalance stocking shifts"
            statusTag={false}
            progressTitle="Estimated impact"
            progressBar={false}
            insightLabel="Reassigning 2 stockers to grocery saves about 45 minutes."
            alert={false}
            divider={false}
          />
        </div>
      </ExampleSection>

      <ExampleSection
        title="List Associate"
        description="Associate rows from the starter ListAssociate pattern, implemented here through the local associate-list API."
      >
        <div style={frameStyle}>
          <ListAssociateList>
            <ListAssociateItem
              eyebrow="Front End"
              title="Jordan Smith"
              text="9:00am - 5:00pm"
              tag="meal"
              attributes={[
                {label: 'Register 4', icon: <Icon name="Clock" decorative style={{fontSize: 16}} />},
                {label: 'On meal'},
              ]}
              trailing="select"
              trailingChecked={selectedAssociate}
              onTrailingCheckedChange={setSelectedAssociate}
              divider
            />
            <ListAssociateItem
              eyebrow="Stocking"
              title="Sam Lee"
              text="8:00am - 4:00pm"
              tag="tardy"
              content
              contentProgressVariant="info"
              contentProgressValue={62}
              contentProgressLabel="On pace"
              contentProgressValueLabel="62% of shift"
              contentGoals={[
                {title: 'Replenish dairy', actions: ['pick', 'transfer', 'stock']},
                {title: 'Top-stock checkouts', actions: ['audit', 'label']},
              ]}
            />
          </ListAssociateList>
        </div>
      </ExampleSection>

      <ExampleSection
        title="List Members"
        description="Team-member scheduling states with attendance and availability tags."
      >
        <div style={frameStyle}>
          <ListMembersList>
            <ListMembersItem tag="absent" title="Jordan S." text="Front-end 9-5" divider />
            <ListMembersItem tag="tardy" title="Marcus T." text="Bakery 7-3" divider />
            <ListMembersItem tag="ppto" title="Cole H." text="Pharmacy 6-2" />
          </ListMembersList>
        </div>
      </ExampleSection>

    </PageWrapper>
  );
}
