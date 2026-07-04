import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button';
import {Checkbox} from '@/app/components/Checkbox';
import {Body} from '@/app/components/Text/Text';
import {IntelligentInsight} from '@/app/components/patterns/IntelligentInsight';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const CARD_FRAME: React.CSSProperties = {maxWidth: 420};

const FULL_ATTRIBUTES = [
  {icon: 'target' as const, label: <><strong>116h</strong> total work across all goals</>},
  {icon: 'associate' as const, label: <><strong>112h</strong> associate labor available</>},
  {icon: 'calendar' as const, label: <>Tonight, after <strong>9pm</strong></>},
  {icon: 'clock' as const, label: <><strong>4h</strong> estimated planning time</>},
];

export default function IntelligentInsightPage() {
  const [layout, setLayout] = React.useState<'compact' | 'expanded'>('expanded');
  const [showDescription, setShowDescription] = React.useState(true);
  const [showAttributes, setShowAttributes] = React.useState(true);
  const [showButton, setShowButton] = React.useState(true);

  const expanded = layout === 'expanded';

  return (
    <PageWrapper
      title="Intelligent Insight"
      category="Subsystem Components"
      description="AI-branded insight cards for short Sidekick recommendations, planning prompts, and compact decision support surfaces."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview compact and expanded insight layouts with optional supporting detail and action affordance."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Layout</Body>
                <ButtonGroup aria-label="Insight layout">
                  <Button size="small" variant={layout === 'compact' ? 'primary' : 'secondary'} onClick={() => setLayout('compact')}>Compact</Button>
                  <Button size="small" variant={layout === 'expanded' ? 'primary' : 'secondary'} onClick={() => setLayout('expanded')}>Expanded</Button>
                </ButtonGroup>
              </div>
              <Checkbox label="Show description" checked={showDescription} disabled={!expanded} onChange={(event) => setShowDescription(event.target.checked)} />
              <Checkbox label="Show attributes" checked={showAttributes} disabled={!expanded} onChange={(event) => setShowAttributes(event.target.checked)} />
              <Checkbox label="Show action button" checked={showButton} onChange={(event) => setShowButton(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description={expanded ? 'Expanded recommendation card with planning context.' : 'Compact single-line insight treatment.'}>
              <div style={CARD_FRAME}>
                <IntelligentInsight
                  label={expanded ? 'Recommendation' : "You're trending 12% above target this week."}
                  title={expanded ? "Generate tonight's plan" : undefined}
                  description={expanded && showDescription ? "Sidekick will help you plan stocking work and adjust for your store's needs." : undefined}
                  attributes={expanded && showAttributes ? FULL_ATTRIBUTES : undefined}
                  showButton={showButton}
                  buttonLabel={expanded ? "Plan your team's shift" : 'View details'}
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Insight Patterns" description="Use card-contained examples to compare density and action treatment. Anchors keep widths consistent with the source component.">
        <DocsGrid>
          <DocsCard title="Expanded planning prompt" description="Use when the insight needs a title, body copy, attributes, and a primary action.">
            <div style={CARD_FRAME}>
              <IntelligentInsight
                label="Recommendation"
                title="Generate tonight's plan"
                description="Sidekick will help you plan stocking work and adjust for your store's unique needs."
                attributes={FULL_ATTRIBUTES}
                showButton
                buttonLabel="Plan your team's shift"
              />
            </div>
          </DocsCard>
          <DocsCard title="Compact insight" description="Use inside list rows or dashboard panels where the surrounding UI owns the main action.">
            <div style={CARD_FRAME}>
              <IntelligentInsight label="Fresh freight is 18 minutes ahead of the planned unload window." />
            </div>
          </DocsCard>
          <DocsCard title="Compact with action" description="Use a small secondary action when the insight should open supporting detail.">
            <div style={CARD_FRAME}>
              <IntelligentInsight label="Bakery coverage drops below plan after 4pm." showButton buttonLabel="View details" />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Intelligent Insight when Sidekick offers one focused observation or recommendation. Keep the label short, reserve attributes for measurable planning context, and use one action button that directly follows the insight."
        defaultValue="showButton=false, attributes limited to 4 rows"
      />
    </PageWrapper>
  );
}