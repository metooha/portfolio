import * as React from 'react';

import {ListAssociateItem, ListAssociateList} from '@/app/components/patterns/ListAssociate';
import type {AlertVariant} from '@/app/components/Alert/Alert';
import type {ProgressIndicatorVariant} from '@/app/components/ProgressIndicator/ProgressIndicator';
import type {ListAssociateTagPreset} from '@/app/components/patterns/ListAssociate/ListAssociate';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {Body} from '@/app/components/Text/Text';
import {
  DocsCard,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

// ---------------------------------------------------------------------------
// Interactive configuration demo
// ---------------------------------------------------------------------------

interface Config {
  eyebrow: string;
  tag: 'none' | ListAssociateTagPreset;
  attributeCount: 0 | 1 | 2 | 3;
  attributeLabels: [string, string, string];
  attributeAdditional: [boolean, boolean, boolean];
  attributeLabel2s: [string, string, string];
  insight: boolean;
  insightLabel: string;
  alert: boolean;
  alertVariant: AlertVariant;
  alertText: string;
  button: boolean;
  buttonLabel: string;
  content: boolean;
  contentProgressVariant: ProgressIndicatorVariant;
  contentProgressValue: number;
  divider: boolean;
  trailing: 'icon' | 'link' | 'select' | undefined;
}

const DEFAULT_CONFIG: Config = {
  eyebrow: 'Front End',
  tag: 'meal',
  attributeCount: 2,
  attributeLabels: ['Register 4', 'On meal', 'Aisle 4'],
  attributeAdditional: [false, false, false],
  attributeLabel2s: ['', '', ''],
  insight: false,
  insightLabel: 'Data-based intelligence to support action.',
  alert: false,
  alertVariant: 'info',
  alertText: 'Two associates flagged the 4pm window.',
  button: false,
  buttonLabel: 'Resolve conflict',
  content: false,
  contentProgressVariant: 'success',
  contentProgressValue: 100,
  divider: false,
  trailing: 'icon',
};

// ---------------------------------------------------------------------------
// Control panel options
// ---------------------------------------------------------------------------

const TRAILING_OPTIONS: Array<{value: 'none' | 'icon' | 'link' | 'select'; label: string}> = [
  {value: 'none', label: 'None'},
  {value: 'icon', label: 'Icon'},
  {value: 'link', label: 'Link'},
  {value: 'select', label: 'Select'},
];

const TAG_OPTIONS: Array<{value: Config['tag']; label: string}> = [
  {value: 'none', label: 'None'},
  {value: 'absent', label: 'Absent'},
  {value: 'tardy', label: 'Tardy'},
  {value: 'unavailable', label: 'Unavailable'},
  {value: 'removed', label: 'Removed'},
  {value: 'do-not-disturb', label: 'DND'},
  {value: 'meal', label: 'Meal'},
  {value: 'ppto', label: 'PPTO'},
  {value: 'not-scheduled', label: 'Not scheduled'},
];

const ATTR_COUNT_OPTIONS: Array<{value: 0 | 1 | 2 | 3; label: string}> = [
  {value: 0, label: '0'},
  {value: 1, label: '1'},
  {value: 2, label: '2'},
  {value: 3, label: '3'},
];

const ALERT_VARIANT_OPTIONS: Array<{value: AlertVariant; label: string}> = [
  {value: 'info', label: 'Info'},
  {value: 'success', label: 'Success'},
  {value: 'warning', label: 'Warning'},
  {value: 'error', label: 'Error'},
];

const PROGRESS_VARIANT_OPTIONS: Array<{value: ProgressIndicatorVariant; label: string}> = [
  {value: 'info', label: 'Info'},
  {value: 'success', label: 'Success'},
  {value: 'warning', label: 'Warning'},
  {value: 'error', label: 'Error'},
];

function InteractiveDemo() {
  const [cfg, setCfg] = React.useState<Config>(DEFAULT_CONFIG);
  const [checked, setChecked] = React.useState(false);

  const set = <K extends keyof Config>(key: K, value: Config[K]) =>
    setCfg((prev) => ({...prev, [key]: value}));

  const trailingValue = cfg.trailing ?? 'none';

  const controls = (
    <>
      <Body as="h2" size="large" weight="alt" style={{margin: '0 0 16px'}}>Control panel</Body>

      <Body as="h3" size="small" weight="alt" style={{margin: '0 0 8px'}}>Trailing</Body>
      <ButtonGroup aria-label="Trailing type">
        {TRAILING_OPTIONS.map((item) => (
          <Button
            key={item.value}
            size="small"
            variant={trailingValue === item.value ? 'primary' : 'secondary'}
            aria-pressed={trailingValue === item.value}
            onClick={() => set('trailing', item.value === 'none' ? undefined : item.value)}
          >
            {item.label}
          </Button>
        ))}
      </ButtonGroup>

      <Body as="h3" size="small" weight="alt" style={{margin: '16px 0 8px'}}>Tag</Body>
      <ButtonGroup aria-label="Tag">
        {TAG_OPTIONS.map((item) => (
          <Button
            key={String(item.value)}
            size="small"
            variant={cfg.tag === item.value ? 'primary' : 'secondary'}
            aria-pressed={cfg.tag === item.value}
            onClick={() => set('tag', item.value)}
          >
            {item.label}
          </Button>
        ))}
      </ButtonGroup>

      <Body as="h3" size="small" weight="alt" style={{margin: '16px 0 8px'}}>Attributes</Body>
      <ButtonGroup aria-label="Attribute count">
        {ATTR_COUNT_OPTIONS.map((item) => (
          <Button
            key={item.value}
            size="small"
            variant={cfg.attributeCount === item.value ? 'primary' : 'secondary'}
            aria-pressed={cfg.attributeCount === item.value}
            onClick={() => set('attributeCount', item.value)}
          >
            {item.label}
          </Button>
        ))}
      </ButtonGroup>

      {cfg.attributeCount > 0 && (
        <div style={{display: 'grid', gap: 16, marginTop: 12}}>
          {([0, 1, 2] as const).filter((i) => i < cfg.attributeCount).map((i) => (
            <Checkbox
              key={i}
              label={`Attr ${i + 1} secondary label`}
              checked={cfg.attributeAdditional[i]}
              onChange={(e) => {
                const next = [...cfg.attributeAdditional] as [boolean, boolean, boolean];
                next[i] = e.target.checked;
                set('attributeAdditional', next);
              }}
            />
          ))}
        </div>
      )}

      <div style={{display: 'grid', gap: 16, marginTop: 16}}>
        <Checkbox label="Insight" checked={cfg.insight} onChange={(e) => set('insight', e.target.checked)} />
        <div>
          <Checkbox label="Alert" checked={cfg.alert} onChange={(e) => set('alert', e.target.checked)} />
          {cfg.alert && (
            <div style={{marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8}}>
              <Body as="h3" size="small" weight="alt" style={{margin: 0}}>Alert Variant</Body>
              <ButtonGroup aria-label="Alert variant">
                {ALERT_VARIANT_OPTIONS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={cfg.alertVariant === item.value ? 'primary' : 'secondary'}
                    aria-pressed={cfg.alertVariant === item.value}
                    onClick={() => set('alertVariant', item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          )}
        </div>
        <Checkbox label="Button" checked={cfg.button} onChange={(e) => set('button', e.target.checked)} />
        <div>
          <Checkbox label="Content" checked={cfg.content} onChange={(e) => set('content', e.target.checked)} />
          {cfg.content && (
            <div style={{marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8}}>
              <Body as="h3" size="small" weight="alt" style={{margin: 0}}>Progress Variant</Body>
              <ButtonGroup aria-label="Progress variant">
                {PROGRESS_VARIANT_OPTIONS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={cfg.contentProgressVariant === item.value ? 'primary' : 'secondary'}
                    aria-pressed={cfg.contentProgressVariant === item.value}
                    onClick={() => set('contentProgressVariant', item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          )}
        </div>
        <Checkbox label="Divider" checked={cfg.divider} onChange={(e) => set('divider', e.target.checked)} />
      </div>
    </>
  );

  const preview = (
    <div>
      <ListAssociateList>
        <ListAssociateItem
          eyebrow={cfg.eyebrow}
          avatarName="Jordan Smith"
          title="Jordan Smith"
          text="9:00am – 5:00pm"
          tag={cfg.tag === 'none' ? undefined : cfg.tag}
          attributes={
            cfg.attributeCount > 0
              ? cfg.attributeLabels.slice(0, cfg.attributeCount).map((label, i) => ({
                  label,
                  additionalLabel: cfg.attributeAdditional[i],
                  label2: cfg.attributeLabel2s[i] || undefined,
                }))
              : undefined
          }
          insight={cfg.insight}
          insightLabel={cfg.insightLabel}
          alert={cfg.alert}
          alertVariant={cfg.alertVariant}
          alertText={cfg.alertText}
          button={cfg.button}
          buttonLabel={cfg.buttonLabel}
          content={cfg.content}
          contentLabel="All work complete!"
          contentProgressVariant={cfg.contentProgressVariant}
          contentProgressValue={cfg.contentProgressValue}
          contentProgressLabel="On pace"
          contentProgressValueLabel={`${cfg.contentProgressValue}% of shift`}
          contentGoals={[
            {title: 'Replenish dairy', actions: ['pick', 'transfer', 'stock']},
            {title: 'Top-stock checkouts', actions: ['audit', 'label']},
          ]}
          divider={cfg.divider}
          trailing={cfg.trailing}
          trailingLink={{text: 'Reassign', onClick: () => {}}}
          trailingChecked={checked}
          onTrailingCheckedChange={setChecked}
        />
      </ListAssociateList>
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

export default function ListAssociatePage() {
  return (
    <PageWrapper
      title="List Associate"
      category="Subsystem Components"
      description="List + ListItem for associate and scheduling queues. Each item supports eyebrow / title / text, status tag presets, trailing icon / link / select-checkbox, up to 3 Attribute rows, IntelligentInsight, Alert messaging, footer button, and optional bottom divider."
    >
      <ExampleSection
        title="Component Configuration"
        description="Toggle props in the control panel to preview variations."
      >
        <InteractiveDemo />
      </ExampleSection>

      <GuidelinesSection
        description="Use List Associate for scheduling and workforce queues where each row represents an associate's status. Use tag presets for attendance states, insight for data-backed intelligence chips, alert for contextual messages, and button for high-priority in-line actions. Keep attributes short enough to scan and limit to 3 per row."
        defaultValue="trailing='icon', divider=false, tag=undefined"
      />
    </PageWrapper>
  );
}
