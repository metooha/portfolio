import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button';
import {Checkbox} from '@/living-design/components/Checkbox';
import {Body} from '@/living-design/components/Text/Text';
import {
  HeaderWidget,
  type HeaderWidgetNavigation,
  type HeaderWidgetType,
} from '@/living-design/components/HeaderWidget';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const FRAME: React.CSSProperties = {
  borderRadius: 8,
  background: 'var(--ld-semantic-color-surface, #ffffff)',
  padding: 16,
  maxWidth: 520,
};

const NAVIGATION: Array<{label: string; value: HeaderWidgetNavigation}> = [
  {label: 'None', value: 'None'},
  {label: 'Chevron', value: 'Chevron'},
  {label: 'LinkButton', value: 'LinkButton'},
];

export default function HeaderWidgetPage() {
  const [navigation, setNavigation] = React.useState<HeaderWidgetNavigation>('None');
  const [type, setType] = React.useState<HeaderWidgetType>('Default');
  const [showDivider, setShowDivider] = React.useState(false);
  const [showDescription, setShowDescription] = React.useState(true);

  return (
    <PageWrapper
      title="Header Widget"
      category="Subsystem Components"
      description="A compact title area for a self-contained widget, with optional count, description, trailing action, divider, and warning alert state."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview widget actions, divider, description, and error treatment."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Trailing action</Body>
                <ButtonGroup>
                  {NAVIGATION.map((item) => (
                    <Button key={item.value} size="small" variant={navigation === item.value ? 'primary' : 'secondary'} onClick={() => setNavigation(item.value)}>
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Type</Body>
                <ButtonGroup>
                  <Button size="small" variant={type === 'Default' ? 'primary' : 'secondary'} onClick={() => setType('Default')}>Default</Button>
                  <Button size="small" variant={type === 'Error' ? 'primary' : 'secondary'} onClick={() => setType('Error')}>Error</Button>
                </ButtonGroup>
              </div>
              <Checkbox label="Show description" checked={showDescription} onChange={(event) => setShowDescription(event.target.checked)} />
              <Checkbox label="Show divider" checked={showDivider} onChange={(event) => setShowDivider(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="Widget headers sit inside framed widget surfaces.">
              <div style={FRAME}>
                <HeaderWidget
                  title="Recommendations"
                  count={5}
                  description={showDescription ? 'Based on your recent activity.' : null}
                  navigation={navigation}
                  trailingLabel="See all"
                  showDivider={showDivider}
                  type={type}
                  alertMessage="Could not refresh recommendations."
                  alertActionLabel="Try again"
                  onTrailingAction={() => {}}
                  onAlertAction={() => {}}
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Widget Patterns" description="Pick the widget header shape that matches the surrounding content. ">
        <DocsGrid>
          <DocsCard title="Default" description="A concise title for a simple widget.">
            <div style={FRAME}><HeaderWidget title="Widget title" /></div>
          </DocsCard>
          <DocsCard title="Count and action" description="Use when the widget summarizes a collection.">
            <div style={FRAME}><HeaderWidget title="Active orders" count={3} navigation="Chevron" /></div>
          </DocsCard>
          <DocsCard title="Error state" description="Use the Error type when widget content fails to load.">
            <div style={FRAME}><HeaderWidget title="Recent orders" type="Error" alertMessage="Could not load recent orders." alertActionLabel="Try again" /></div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use one Header Widget per widget surface. Keep descriptions compact, reserve the Error type for recoverable loading failures, and choose LinkButton when the action text needs to be visible."
        defaultValue="navigation='None', type='Default', showDivider=false"
      />
    </PageWrapper>
  );
}