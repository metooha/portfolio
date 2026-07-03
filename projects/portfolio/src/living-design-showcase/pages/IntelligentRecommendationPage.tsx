import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button';
import {Checkbox} from '@/living-design/components/Checkbox';
import {Icon} from '@/living-design/components/Icons';
import {Body} from '@/living-design/components/Text/Text';
import {
  IntelligentRecommendation,
  type IntelligentRecommendationButtonType,
} from '@/living-design/patterns/IntelligentRecommendation';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const CARD_FRAME: React.CSSProperties = {maxWidth: 420};
const BUTTON_TYPES: IntelligentRecommendationButtonType[] = ['none', 'single', 'dual', 'triple'];

const ATTRIBUTES = [
  {icon: <Icon name="Clock" size="small" />, label: '4 hours estimated work'},
  {icon: <Icon name="Calendar" size="small" />, label: 'Tonight, after 9pm'},
];

const SOURCE_LINKS = [
  {label: "Today's traffic forecast", href: '#traffic'},
  {label: 'Labor schedule', href: '#labor'},
];

export default function IntelligentRecommendationPage() {
  const [buttonType, setButtonType] = React.useState<IntelligentRecommendationButtonType>('dual');
  const [showDescription, setShowDescription] = React.useState(true);
  const [showAttributes, setShowAttributes] = React.useState(true);
  const [showAlert, setShowAlert] = React.useState(false);
  const [showSources, setShowSources] = React.useState(true);
  const [showContent, setShowContent] = React.useState(false);

  return (
    <PageWrapper
      title="Intelligent Recommendation"
      category="Subsystem Components"
      description="Flexible AI recommendation cards with eyebrow, title, optional attributes, content, alerts, actions, and explainability sources."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview action density, support content, alerts, and source disclosure for Sidekick recommendation cards."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Buttons</Body>
                <ButtonGroup aria-label="Recommendation button type">
                  {BUTTON_TYPES.map((item) => (
                    <Button key={item} size="small" variant={buttonType === item ? 'primary' : 'secondary'} onClick={() => setButtonType(item)}>
                      {item}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <Checkbox label="Show description" checked={showDescription} onChange={(event) => setShowDescription(event.target.checked)} />
              <Checkbox label="Show attributes" checked={showAttributes} onChange={(event) => setShowAttributes(event.target.checked)} />
              <Checkbox label="Show content slot" checked={showContent} onChange={(event) => setShowContent(event.target.checked)} />
              <Checkbox label="Show alert" checked={showAlert} onChange={(event) => setShowAlert(event.target.checked)} />
              <Checkbox label="Show sources" checked={showSources} onChange={(event) => setShowSources(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="Toggle source disclosure in the card to reveal the explanation content.">
              <div style={CARD_FRAME}>
                <IntelligentRecommendation
                  eyebrow="Recommendation"
                  showLightEyebrow
                  lightEyebrowText="updated 2m ago"
                  title="Reroute the 4pm pallet drop"
                  showDescription={showDescription}
                  description="The current plan creates a 30-minute lane conflict with curbside."
                  attributes={showAttributes ? ATTRIBUTES : undefined}
                  buttonType={buttonType}
                  primaryLabel="Apply"
                  secondaryLabel="Dismiss"
                  tertiaryLabel="Open in scheduler"
                  showAlert={showAlert}
                  alertMessage="Couldn't load full schedule context."
                  alertActionLabel="Retry"
                  showSources={showSources}
                  sourceDescription="Based on store traffic data and tonight's labor schedule."
                  sourceLinks={SOURCE_LINKS}
                >
                  {showContent ? (
                    <Body as="p" size="small" style={{margin: 0}}>
                      Move receiving work to aisle 14 before the 4pm drop begins.
                    </Body>
                  ) : null}
                </IntelligentRecommendation>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Recommendation Patterns" description="Choose button and source patterns based on how much confidence and action context the recommendation needs.">
        <DocsGrid>
          <DocsCard title="Title only" description="Use for low-density surfaces where surrounding content supplies context.">
            <div style={CARD_FRAME}>
              <IntelligentRecommendation title="Generate tonight's plan" />
            </div>
          </DocsCard>
          <DocsCard title="Dual action" description="Pair a primary choice with a dismiss or alternate action.">
            <div style={CARD_FRAME}>
              <IntelligentRecommendation
                title="Generate tonight's plan"
                showDescription
                description="Sidekick will help you plan stocking work for your team."
                attributes={ATTRIBUTES}
                buttonType="dual"
                primaryLabel="Plan your shift"
                secondaryLabel="Dismiss"
              />
            </div>
          </DocsCard>
          <DocsCard title="Sources and alert" description="Use sources for explainability and alerts when supporting data is incomplete.">
            <div style={CARD_FRAME}>
              <IntelligentRecommendation
                eyebrow="Recommendation"
                showLightEyebrow
                lightEyebrowText="updated 2m ago"
                title="Reroute the 4pm pallet drop"
                showDescription
                description="The current plan creates a 30-minute lane conflict with curbside."
                buttonType="triple"
                primaryLabel="Apply"
                secondaryLabel="Dismiss"
                tertiaryLabel="Open in scheduler"
                showAlert
                alertMessage="Couldn't load full schedule context."
                alertActionLabel="Retry"
                showSources
                sourceDescription="Based on store traffic data and tonight's labor schedule."
                sourceLinks={SOURCE_LINKS}
              />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Intelligent Recommendation for AI actions that need a clear title, optional reasoning, and one primary next step. Keep attributes factual, sources concise, and avoid stacking more actions than the workflow can support."
        defaultValue="buttonType='none', showDescription=false, showSources=false"
      />
    </PageWrapper>
  );
}