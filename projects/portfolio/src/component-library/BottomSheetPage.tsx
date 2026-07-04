import * as React from 'react';

import {BottomSheet} from '@/app/components/BottomSheet/BottomSheet';
import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type BottomSheetScenario = 'basic' | 'actions' | 'longContent';

const SCENARIOS: Array<{
  value: BottomSheetScenario;
  label: string;
  title: string;
  description: string;
}> = [
  {
    value: 'basic',
    label: 'Basic',
    title: 'Delivery details',
    description: 'Use for a short supplemental task or explanation.',
  },
  {
    value: 'actions',
    label: 'Actions',
    title: 'Confirm removal',
    description: 'Use sticky footer actions when the sheet needs an explicit decision.',
  },
  {
    value: 'longContent',
    label: 'Scrollable',
    title: 'Terms and conditions',
    description: 'Use when the body can scroll while the header and footer remain stable.',
  },
];

const TERMS = [
  'Review pickup instructions before the cutoff time.',
  'Confirm substitutions if the original item is unavailable.',
  'Keep contact information current so associates can reach you.',
  'Order changes may affect fulfillment timing and item availability.',
  'Some services require a valid payment method before checkout.',
  'You can return to this flow later if you close the sheet.',
];

function ScenarioContent({scenario, longContent}: {scenario: BottomSheetScenario; longContent?: boolean}) {
  if (scenario === 'longContent' || longContent) {
    return (
      <div style={{display: 'grid', gap: 16}}>
        {TERMS.map((item, index) => (
          <div key={item} style={{display: 'grid', gap: 4}}>
            <Body as="p" size="medium" weight="alt" style={{margin: 0}}>
              {index + 1}. Detail
            </Body>
            <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
              {item}
            </Body>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
      Bottom sheets slide up from the bottom of the viewport and keep the user in
      the current flow while showing focused supporting content.
    </Body>
  );
}

function BottomSheetTrigger({
  scenario,
  label,
  showActions = false,
  longContent = false,
}: {
  scenario: BottomSheetScenario;
  label: string;
  showActions?: boolean;
  longContent?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const config = SCENARIOS.find((item) => item.value === scenario) ?? SCENARIOS[0];
  const hasActions = showActions || scenario === 'actions' || scenario === 'longContent';

  return (
    <>
      <Button variant="primary" size="medium" onClick={() => setIsOpen(true)}>
        {label}
      </Button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={config.title}
        actions={
          hasActions ? (
            <ButtonGroup>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Apply
              </Button>
            </ButtonGroup>
          ) : undefined
        }
      >
        <ScenarioContent scenario={scenario} longContent={longContent} />
      </BottomSheet>
    </>
  );
}

export default function BottomSheetPage() {
  const [scenario, setScenario] = React.useState<BottomSheetScenario>('basic');
  const [showActions, setShowActions] = React.useState(true);
  const [longContent, setLongContent] = React.useState(false);
  const activeScenario = SCENARIOS.find((item) => item.value === scenario) ?? SCENARIOS[0];

  return (
    <PageWrapper
      title="Bottom Sheet"
      category="Core Components"
      description="Bottom-anchored dialog surfaces for supplemental content, short tasks, and mobile-first decisions."
    >
      <ExampleSection
        title="Component Configuration"
        description="Use the controls to preview common sheet content, footer actions, and scroll behavior."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Scenario
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose a sheet pattern, then open the live overlay.
                </Body>
              </div>
              <ButtonGroup aria-label="Bottom sheet scenario">
                {SCENARIOS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={scenario === item.value ? 'primary' : 'secondary'}
                    aria-pressed={scenario === item.value}
                    onClick={() => setScenario(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox
                  label="Show footer actions"
                  checked={showActions}
                  onChange={(event) => setShowActions(event.target.checked)}
                />
                <Checkbox
                  label="Use long content"
                  checked={longContent}
                  onChange={(event) => setLongContent(event.target.checked)}
                />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${activeScenario.label} sheet`} description={activeScenario.description}>
              <div style={{display: 'grid', gap: 16, justifyItems: 'start'}}>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  The sheet opens above the documentation page so close, scrim, and Escape behavior can be tested directly.
                </Body>
                <BottomSheetTrigger
                  scenario={scenario}
                  label="Open bottom sheet"
                  showActions={showActions}
                  longContent={longContent}
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Common patterns"
        description="Use cards to compare the bottom sheet behaviors most teams need during implementation."
      >
        <DocsGrid>
          {SCENARIOS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <BottomSheetTrigger scenario={item.value} label={`Open ${item.label.toLowerCase()}`} />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Bottom Sheet for temporary supporting content, especially on narrow screens. Keep titles short, keep the body focused on one decision or task, and include footer actions only when the user must confirm or cancel. Do not use bottom sheets for broad navigation or long multi-step workflows that deserve a full page."
        defaultValue="isOpen={false}"
      />
    </PageWrapper>
  );
}
