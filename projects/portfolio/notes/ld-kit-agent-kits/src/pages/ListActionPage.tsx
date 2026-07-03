import * as React from 'react';

import {ListActionItem, ListActionList} from '../patterns/ListAction';
import type {AlertVariant} from '../components/Alert/Alert';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {Body} from '../components/Text/Text';
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
  eyebrow: boolean;
  eyebrowLabel: string;
  sidekickAssigned: boolean;
  attributeCount: 0 | 1 | 2 | 3;
  attributeLabels: [string, string, string];
  attributeAdditional: [boolean, boolean, boolean];
  attributeLabel2s: [string, string, string];
  insight: boolean;
  insightLabel: string;
  messaging: boolean;
  messagingVariant: AlertVariant;
  messagingText: string;
  button: boolean;
  buttonLabel: string;
  divider: boolean;
  trailing: 'icon' | 'link' | 'select' | undefined;
  tag: 'none' | 'unassigned' | 'assigned' | 'complete';
}

const DEFAULT_CONFIG: Config = {
  eyebrow: true,
  eyebrowLabel: 'Goal name',
  sidekickAssigned: false,
  attributeCount: 2,
  attributeLabels: ['12 items', 'Due in 30m', 'Aisle 4'],
  attributeAdditional: [false, false, false],
  attributeLabel2s: ['', '', ''],
  insight: false,
  insightLabel: 'Data-based intelligence to support action.',
  messaging: false,
  messagingVariant: 'info',
  messagingText: 'Two associates flagged the 4pm window.',
  button: false,
  buttonLabel: 'Resolve conflict',
  divider: false,
  trailing: 'icon',
  tag: 'assigned',
};

// ---------------------------------------------------------------------------
// Control panel
// ---------------------------------------------------------------------------

const TRAILING_OPTIONS: Array<{value: 'none' | 'icon' | 'link' | 'select'; label: string}> = [
  {value: 'none', label: 'None'},
  {value: 'icon', label: 'Icon'},
  {value: 'link', label: 'Link'},
  {value: 'select', label: 'Select'},
];

const TAG_OPTIONS: Array<{value: Config['tag']; label: string}> = [
  {value: 'none', label: 'None'},
  {value: 'unassigned', label: 'Unassigned'},
  {value: 'assigned', label: 'Assigned'},
  {value: 'complete', label: 'Complete'},
];

const ATTR_COUNT_OPTIONS: Array<{value: 0 | 1 | 2 | 3; label: string}> = [
  {value: 0, label: '0'},
  {value: 1, label: '1'},
  {value: 2, label: '2'},
  {value: 3, label: '3'},
];

const MESSAGING_VARIANT_OPTIONS: Array<{value: AlertVariant; label: string}> = [
  {value: 'info', label: 'Info'},
  {value: 'success', label: 'Success'},
  {value: 'warning', label: 'Warning'},
  {value: 'error', label: 'Error'},
];

function InteractiveDemoV2() {
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
        <Checkbox label="Eyebrow" checked={cfg.eyebrow} onChange={(e) => set('eyebrow', e.target.checked)} />
        <Checkbox label="Sidekick Assigned" checked={cfg.sidekickAssigned} onChange={(e) => set('sidekickAssigned', e.target.checked)} />
        <Checkbox label="Insight" checked={cfg.insight} onChange={(e) => set('insight', e.target.checked)} />
        <div>
          <Checkbox label="Messaging" checked={cfg.messaging} onChange={(e) => set('messaging', e.target.checked)} />
          {cfg.messaging && (
            <div style={{marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8}}>
              <Body as="h3" size="small" weight="alt" style={{margin: 0}}>Messaging Variant</Body>
              <ButtonGroup aria-label="Messaging variant">
                {MESSAGING_VARIANT_OPTIONS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={cfg.messagingVariant === item.value ? 'primary' : 'secondary'}
                    aria-pressed={cfg.messagingVariant === item.value}
                    onClick={() => set('messagingVariant', item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          )}
        </div>
        <Checkbox label="Button" checked={cfg.button} onChange={(e) => set('button', e.target.checked)} />
        <Checkbox label="Divider" checked={cfg.divider} onChange={(e) => set('divider', e.target.checked)} />
      </div>
    </>
  );

  const preview = (
    <div>
      <ListActionList>
        <ListActionItem
          eyebrow={cfg.eyebrow}
          eyebrowLabel={cfg.eyebrowLabel}
          title="Stock the freezer aisle"
          text="Bin 4A, frozen entrees"
          sidekickAssigned={cfg.sidekickAssigned}
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
          messaging={cfg.messaging}
          messagingVariant={cfg.messagingVariant}
          messagingText={cfg.messagingText}
          button={cfg.button}
          buttonLabel={cfg.buttonLabel}
          divider={cfg.divider}
          trailing={cfg.trailing}
          trailingLink={{text: 'Reassign', onClick: () => {}}}
          trailingChecked={checked}
          onTrailingCheckedChange={setChecked}
          tag={cfg.tag === 'none' ? undefined : cfg.tag}
        />
      </ListActionList>
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

export default function ListActionPage() {
  return (
    <PageWrapper
      title="List Action"
      category="Subsystem Components"
      description="List + ListItem for action queues. Each item supports eyebrow / title / text, leading custom slot, trailing icon / link / select-checkbox, up to 3 Attribute rows, tag, Sidekick branding, IntelligentInsight, Alert messaging, footer button, and optional bottom divider."
    >
      <ExampleSection
        title="Component Configuration"
        description="Same controls styled to match the Button/Checkbox pattern used across other component pages."
      >
        <InteractiveDemoV2 />
      </ExampleSection>

      <GuidelinesSection
        description="Use List Action for operational queues where each row needs a clear task and next action. Enable sidekickAssigned to brand AI-generated items, insight for data-backed intelligence chips, messaging for contextual alerts, and button for high-priority in-line actions. Keep attributes short enough to scan and limit to 3 per row."
        defaultValue="trailing='icon', divider=false, sidekickAssigned=false"
      />
    </PageWrapper>
  );
}
