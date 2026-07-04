import * as React from 'react';
import {MaintenanceHealthCard} from '@/app/components/patterns/MaintenanceHealthCard';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function MaintenanceHealthCardPage() {
  return (
    <PageWrapper
      title="Maintenance Health Card"
      category="Patterns"
      description="An Auto Care Center summary card: a vehicle header with a health-score ring, an optional value statement, a status grid of maintenance items with due/overdue/good badges, an optional bundle-savings callout, and report / schedule actions."
    >
      <ExampleSection title="Default" description="A vehicle with mixed maintenance statuses and a bundle-savings offer.">
        <div style={{maxWidth: 560}}>
          <MaintenanceHealthCard
            vehicle="2019 Honda Civic"
            location="Auto Care Center · Store 1234"
            mileage="62,400 miles"
            healthScore={68}
            valueStatement="Staying on top of these keeps your warranty valid and avoids costly repairs."
            items={[
              {name: 'Oil change', status: 'overdue', detail: '1,200 mi over', price: '$39'},
              {name: 'Tire rotation', status: 'due', detail: 'Due this month', price: '$25'},
              {name: 'Air filter', status: 'good', detail: 'Next at 75k mi'},
            ]}
            bundleSavings="Bundle oil change + tire rotation"
            bundleSavingsAmount="$15"
          />
        </div>
      </ExampleSection>

      <ExampleSection title="All on track" description="A high health score with no items needing action.">
        <div style={{maxWidth: 560}}>
          <MaintenanceHealthCard
            vehicle="2022 Toyota RAV4"
            mileage="18,900 miles"
            healthScore={92}
            items={[
              {name: 'Oil change', status: 'good', detail: 'Next at 25k mi'},
              {name: 'Brakes', status: 'good', detail: 'Healthy'},
              {name: 'Battery', status: 'good', detail: 'Healthy'},
            ]}
          />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Maintenance Health Card to summarize a vehicle's service status and drive scheduling in the Auto Care experience. Keep the item grid to three columns for readability, set each item's status honestly (it colors the badge and the footer summary), and only show bundleSavings when a real discount applies. The health score should reflect the worst-status items."
        defaultValue="healthScore: 0–100  status: overdue | due | good"
      />
    </PageWrapper>
  );
}
