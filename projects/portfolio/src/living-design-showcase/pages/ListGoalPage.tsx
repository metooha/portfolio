import * as React from 'react';

import {ListGoal} from '@/living-design/patterns/ListGoal';
import type {TagColor} from '@/living-design/components/Tag/Tag';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {Switch} from '@/living-design/components/Switch/Switch';
import {Body} from '@/living-design/components/Text/Text';
import {DocsCard, ExampleSection, GuidelinesSection, PageWrapper} from './shared';

// ---------------------------------------------------------------------------
// Interactive configuration demo
// ---------------------------------------------------------------------------

interface Config {
  goalName: string;
  sidekick: boolean;
  statusTag: boolean;
  tagVariant: 'primary' | 'secondary' | 'tertiary';
  tagColor: TagColor;
  tagLabel: string;
  navigation: boolean;
  progressBar: boolean;
  progressTitle: string;
  progressValue: number;
  progressLabel: string;
  progressValueLabel: string;
  content: boolean;
  insight: boolean;
  insightLabel: string;
  alert: boolean;
  alertMessage: string;
  alertAction: string;
  divider: boolean;
}

const DEFAULT_CONFIG: Config = {
  goalName: 'Reduce pallet drop conflicts',
  sidekick: false,
  statusTag: true,
  tagVariant: 'tertiary',
  tagColor: 'warning',
  tagLabel: 'In progress',
  navigation: true,
  progressBar: true,
  progressTitle: '62% complete',
  progressValue: 62,
  progressLabel: 'On pace',
  progressValueLabel: '62% of plan',
  content: false,
  insight: true,
  insightLabel: "Tonight's stocking plan reduces curbside conflict by 18%.",
  alert: false,
  alertMessage: 'Two associates flagged the 4pm window.',
  alertAction: 'Review',
  divider: true,
};

// ---------------------------------------------------------------------------
// Control panel
// ---------------------------------------------------------------------------

const TAG_VARIANT_OPTIONS: Array<{value: 'primary' | 'secondary' | 'tertiary'; label: string}> = [
  {value: 'primary', label: 'Primary'},
  {value: 'secondary', label: 'Secondary'},
  {value: 'tertiary', label: 'Tertiary'},
];

const TAG_COLOR_OPTIONS: Array<{value: TagColor; label: string}> = [
  {value: 'blue', label: 'Blue'},
  {value: 'green', label: 'Green'},
  {value: 'red', label: 'Red'},
  {value: 'yellow', label: 'Yellow'},
  {value: 'orange', label: 'Orange'},
  {value: 'gray', label: 'Gray'},
];

function InteractiveDemo() {
  const [cfg, setCfg] = React.useState<Config>(DEFAULT_CONFIG);

  const set = <K extends keyof Config>(key: K, value: Config[K]) =>
    setCfg((prev) => ({...prev, [key]: value}));

  const controls = (
    <>
      <Body as="h2" size="large" weight="alt" style={{margin: '0 0 16px'}}>Control panel</Body>

      <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16}}>
        <Body as="span" id="status-tag-label" size="small" weight="alt">Status Tag</Body>
        <Switch a11yLabelledBy="status-tag-label" isOn={cfg.statusTag} onClick={() => set('statusTag', !cfg.statusTag)} />
      </div>

      {cfg.statusTag && (
        <>
          <Body as="h3" size="small" weight="alt" style={{margin: '0 0 8px'}}>Tag Variant</Body>
          <ButtonGroup aria-label="Tag variant">
            {TAG_VARIANT_OPTIONS.map((item) => (
              <Button
                key={item.value}
                size="small"
                variant={cfg.tagVariant === item.value ? 'primary' : 'secondary'}
                aria-pressed={cfg.tagVariant === item.value}
                onClick={() => set('tagVariant', item.value)}
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>

          <Body as="h3" size="small" weight="alt" style={{margin: '16px 0 8px'}}>Tag Color</Body>
          <ButtonGroup aria-label="Tag color">
            {TAG_COLOR_OPTIONS.map((item) => (
              <Button
                key={item.value}
                size="small"
                variant={cfg.tagColor === item.value ? 'primary' : 'secondary'}
                aria-pressed={cfg.tagColor === item.value}
                onClick={() => set('tagColor', item.value)}
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
        </>
      )}

      <div style={{display: 'grid', gap: 16, marginTop: cfg.statusTag ? 16 : 0}}>
        <Checkbox label="Sidekick" checked={cfg.sidekick} onChange={(e) => set('sidekick', e.target.checked)} />
        <Checkbox label="Navigation" checked={cfg.navigation} onChange={(e) => set('navigation', e.target.checked)} />
        <Checkbox label="Progress Bar" checked={cfg.progressBar} onChange={(e) => set('progressBar', e.target.checked)} />
        <Checkbox label="Content" checked={cfg.content} onChange={(e) => set('content', e.target.checked)} />
        <Checkbox label="Insight" checked={cfg.insight} onChange={(e) => set('insight', e.target.checked)} />
        <Checkbox label="Alert" checked={cfg.alert} onChange={(e) => set('alert', e.target.checked)} />
        <Checkbox label="Divider" checked={cfg.divider} onChange={(e) => set('divider', e.target.checked)} />
      </div>
    </>
  );

  const preview = (
    <div>
      <ListGoal
        goalName={cfg.goalName}
        sidekick={cfg.sidekick}
        statusTag={cfg.statusTag}
        tagVariant={cfg.tagVariant}
        tagColor={cfg.tagColor}
        tagLabel={cfg.tagLabel}
        navigation={cfg.navigation}
        onNavigate={() => {}}
        progressBar={cfg.progressBar}
        progressTitle={cfg.progressTitle}
        progressValue={cfg.progressValue}
        progressLabel={cfg.progressLabel}
        progressValueLabel={cfg.progressValueLabel}
        content={cfg.content}
        insight={cfg.insight}
        insightLabel={cfg.insightLabel}
        alert={cfg.alert}
        alertMessage={cfg.alertMessage}
        alertAction={cfg.alertAction}
        onAlertAction={() => {}}
        divider={cfg.divider}
      />
    </div>
  );

  return (
    <div style={{display: 'flex', gap: 24, alignItems: 'flex-start'}}>
      <div style={{flex: 1, minWidth: 0}}>
        <DocsCard>{controls}</DocsCard>
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        {preview}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ListGoalPage() {
  return (
    <PageWrapper
      title="List Goal"
      category="Subsystem Components"
      description="List item representing a goal with optional progress indicator, content slot, AI insight, and alert. Toggle the sidekick boolean to enable AI-generated goal styling."
    >
      <ExampleSection
        title="Component Configuration"
        description="Toggle props in the control panel to preview variations."
      >
        <InteractiveDemo />
      </ExampleSection>

      <GuidelinesSection
        description="Use List Goal for goal rows that need progress, insight, and optional alert context. Enable sidekick to brand AI-generated recommendations, keep the goal name concise, and avoid stacking multiple alert messages in one row."
        defaultValue="sidekick=false, statusTag=true, progressBar=true, navigation=true, divider=true"
      />
    </PageWrapper>
  );
}
