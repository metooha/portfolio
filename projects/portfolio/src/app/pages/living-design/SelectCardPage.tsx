import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {SelectCard} from '@/living-design/components/SelectCard/SelectCard';
import {Divider} from '@/living-design/components/Divider/Divider';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  PageWrapper,
} from './shared';

type SelectCardMode = 'single' | 'multi';

export default function SelectCardPage() {
  const [mode, setMode] = React.useState<SelectCardMode>('multi');
  const [size, setSize] = React.useState<'small' | 'medium'>('medium');
  const [disabled, setDisabled] = React.useState(false);

  // Multi-select state
  const [selectedMulti, setSelectedMulti] = React.useState<Set<string>>(
    new Set(['option1'])
  );

  // Single-select state
  const [selectedSingle, setSelectedSingle] = React.useState<string>('planA');

  const handleMultiChange = (value: string, checked: boolean) => {
    setSelectedMulti((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(value);
      } else {
        next.delete(value);
      }
      return next;
    });
  };

  const handleSingleChange = (value: string) => {
    setSelectedSingle(value);
  };

  return (
    <PageWrapper
      title="SelectCard"
      category="Core Components"
      description="Card-based selection control combining cards with Checkbox (multi-select) or Radio (single-select) controls."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview single-select, multi-select, disabled, and size variations."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Mode
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose between single-select (Radio) or multi-select (Checkbox).
                </Body>
              </div>
              <ButtonGroup aria-label="SelectCard mode">
                <Button
                  size="small"
                  variant={mode === 'multi' ? 'primary' : 'secondary'}
                  aria-pressed={mode === 'multi'}
                  onClick={() => setMode('multi')}
                >
                  Multi-Select
                </Button>
                <Button
                  size="small"
                  variant={mode === 'single' ? 'primary' : 'secondary'}
                  aria-pressed={mode === 'single'}
                  onClick={() => setMode('single')}
                >
                  Single-Select
                </Button>
              </ButtonGroup>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Size
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose small (20×20) or medium (24×24).
                </Body>
              </div>
              <ButtonGroup aria-label="SelectCard size">
                <Button
                  size="small"
                  variant={size === 'medium' ? 'primary' : 'secondary'}
                  aria-pressed={size === 'medium'}
                  onClick={() => setSize('medium')}
                >
                  Medium
                </Button>
                <Button
                  size="small"
                  variant={size === 'small' ? 'primary' : 'secondary'}
                  aria-pressed={size === 'small'}
                  onClick={() => setSize('small')}
                >
                  Small
                </Button>
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <SelectCard
                  label="Disabled"
                  checked={disabled}
                  onChange={(event) => setDisabled(event.target.checked)}
                >
                  <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                    Toggle disabled state
                  </Body>
                </SelectCard>
              </div>
            </>
          }
          preview={
            <DocsCard
              title={mode === 'single' ? 'Single-Select Card' : 'Multi-Select Card'}
              description={
                mode === 'single'
                  ? 'Only one card can be selected at a time'
                  : 'Multiple cards can be selected independently'
              }
            >
              <div style={{display: 'grid', gap: 12}}>
                {mode === 'single' ? (
                  <>
                    <SelectCard
                      singleSelect={true}
                      name="demo"
                      label="Option A"
                      value="optA"
                      checked={selectedSingle === 'optA'}
                      onChange={(e) => handleSingleChange(e.target.value as string)}
                      disabled={disabled}
                      size={size}
                    >
                      <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                        Select only one option
                      </Body>
                    </SelectCard>
                    <SelectCard
                      singleSelect={true}
                      name="demo"
                      label="Option B"
                      value="optB"
                      checked={selectedSingle === 'optB'}
                      onChange={(e) => handleSingleChange(e.target.value as string)}
                      disabled={disabled}
                      size={size}
                    >
                      <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                        This option also available
                      </Body>
                    </SelectCard>
                  </>
                ) : (
                  <>
                    <SelectCard
                      label="Option 1"
                      value="opt1"
                      checked={selectedMulti.has('opt1')}
                      onChange={(e) => handleMultiChange('opt1', e.target.checked)}
                      disabled={disabled}
                      size={size}
                    >
                      <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                        Choose multiple options
                      </Body>
                    </SelectCard>
                    <SelectCard
                      label="Option 2"
                      value="opt2"
                      checked={selectedMulti.has('opt2')}
                      onChange={(e) => handleMultiChange('opt2', e.target.checked)}
                      disabled={disabled}
                      size={size}
                    >
                      <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                        This option also available
                      </Body>
                    </SelectCard>
                  </>
                )}
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Single-Select (Radio) Mode"
        description="Use when only one card from a group can be selected. SelectCard renders a Radio control."
      >
        <DocsGrid>
          <DocsCard
            title="Basic usage"
            description="Group related options with a shared name attribute."
          >
            <div style={{display: 'grid', gap: 12}}>
              <SelectCard
                singleSelect={true}
                name="subscription"
                label="Basic Plan"
                value="basic"
                checked={selectedSingle === 'basic'}
                onChange={(e) => handleSingleChange(e.target.value as string)}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  $9.99/month
                </Body>
              </SelectCard>
              <SelectCard
                singleSelect={true}
                name="subscription"
                label="Pro Plan"
                value="pro"
                checked={selectedSingle === 'pro'}
                onChange={(e) => handleSingleChange(e.target.value as string)}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  $19.99/month
                </Body>
              </SelectCard>
            </div>
          </DocsCard>
          <DocsCard
            title="Disabled state"
            description="Disabled cards cannot be selected."
          >
            <div style={{display: 'grid', gap: 12}}>
              <SelectCard
                singleSelect={true}
                name="demo2"
                label="Available"
                value="val1"
                checked={true}
                onChange={() => {}}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Can be selected
                </Body>
              </SelectCard>
              <SelectCard
                singleSelect={true}
                name="demo2"
                label="Unavailable"
                value="val2"
                checked={false}
                disabled
                onChange={() => {}}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Cannot be selected
                </Body>
              </SelectCard>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Multi-Select (Checkbox) Mode"
        description="Use when multiple cards can be selected independently. SelectCard renders a Checkbox control."
      >
        <DocsGrid>
          <DocsCard
            title="Basic usage"
            description="Each card can be selected or deselected independently."
          >
            <div style={{display: 'grid', gap: 12}}>
              <SelectCard
                label="Feature A"
                value="featureA"
                checked={selectedMulti.has('featureA')}
                onChange={(e) => handleMultiChange('featureA', e.target.checked)}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Available for selection
                </Body>
              </SelectCard>
              <SelectCard
                label="Feature B"
                value="featureB"
                checked={selectedMulti.has('featureB')}
                onChange={(e) => handleMultiChange('featureB', e.target.checked)}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Available for selection
                </Body>
              </SelectCard>
              <SelectCard
                label="Feature C"
                value="featureC"
                checked={selectedMulti.has('featureC')}
                onChange={(e) => handleMultiChange('featureC', e.target.checked)}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Available for selection
                </Body>
              </SelectCard>
            </div>
          </DocsCard>
          <DocsCard
            title="With disabled state"
            description="Mix available and disabled cards in the same group."
          >
            <div style={{display: 'grid', gap: 12}}>
              <SelectCard
                label="Option 1 (Selected)"
                value="opt1"
                checked={true}
                onChange={() => {}}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Currently selected
                </Body>
              </SelectCard>
              <SelectCard
                label="Option 2"
                value="opt2"
                checked={false}
                onChange={() => {}}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Available for selection
                </Body>
              </SelectCard>
              <SelectCard
                label="Option 3 (Disabled)"
                value="opt3"
                checked={false}
                disabled
                onChange={() => {}}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Not available
                </Body>
              </SelectCard>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Two control sizes available: medium (24×24, default) for most use cases, and small (20×20) for compact layouts."
      >
        <DocsGrid>
          <DocsCard
            title="Medium · 24×24"
            description="Default size for forms, dialogs, and most surfaces."
          >
            <div style={{display: 'grid', gap: 12}}>
              <SelectCard
                label="Unchecked"
                size="medium"
                checked={false}
                onChange={() => {}}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Medium control size
                </Body>
              </SelectCard>
              <SelectCard
                label="Checked"
                size="medium"
                checked={true}
                onChange={() => {}}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Medium control size
                </Body>
              </SelectCard>
            </div>
          </DocsCard>
          <DocsCard
            title="Small · 20×20"
            description="Reserved for dense surfaces and compact card lists."
          >
            <div style={{display: 'grid', gap: 12}}>
              <SelectCard
                label="Unchecked"
                size="small"
                checked={false}
                onChange={() => {}}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Small control size
                </Body>
              </SelectCard>
              <SelectCard
                label="Checked"
                size="small"
                checked={true}
                onChange={() => {}}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Small control size
                </Body>
              </SelectCard>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <Divider />

      <ExampleSection
        title="Common Patterns"
        description="Real-world usage examples for SelectCard."
      >
        <DocsGrid>
          <DocsCard
            title="Plan Selection"
            description="Use single-select for choosing a subscription or pricing tier."
          >
            <div style={{display: 'grid', gap: 12}}>
              <SelectCard
                singleSelect={true}
                name="plans"
                label="Starter"
                value="starter"
                checked={selectedSingle === 'starter'}
                onChange={(e) => handleSingleChange(e.target.value as string)}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Perfect for getting started
                </Body>
              </SelectCard>
              <SelectCard
                singleSelect={true}
                name="plans"
                label="Professional"
                value="professional"
                checked={selectedSingle === 'professional'}
                onChange={(e) => handleSingleChange(e.target.value as string)}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  For growing teams
                </Body>
              </SelectCard>
              <SelectCard
                singleSelect={true}
                name="plans"
                label="Enterprise"
                value="enterprise"
                checked={selectedSingle === 'enterprise'}
                onChange={(e) => handleSingleChange(e.target.value as string)}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Custom solutions
                </Body>
              </SelectCard>
            </div>
          </DocsCard>
          <DocsCard
            title="Feature Selection"
            description="Use multi-select for choosing optional features or add-ons."
          >
            <div style={{display: 'grid', gap: 12}}>
              <SelectCard
                label="Analytics Dashboard"
                value="analytics"
                checked={selectedMulti.has('analytics')}
                onChange={(e) => handleMultiChange('analytics', e.target.checked)}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Advanced insights and reporting
                </Body>
              </SelectCard>
              <SelectCard
                label="Priority Support"
                value="support"
                checked={selectedMulti.has('support')}
                onChange={(e) => handleMultiChange('support', e.target.checked)}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  24/7 dedicated support
                </Body>
              </SelectCard>
              <SelectCard
                label="API Access"
                value="api"
                checked={selectedMulti.has('api')}
                onChange={(e) => handleMultiChange('api', e.target.checked)}
              >
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Full API integration
                </Body>
              </SelectCard>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>
    </PageWrapper>
  );
}
