import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button';
import {Checkbox} from '../components/Checkbox';
import {Icon} from '../components/Icons';
import {Body} from '../components/Text/Text';
import {
  Attribute,
  type AttributeColor,
  type AttributeSize,
} from '../components/Attribute';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SIZES: Array<{label: string; value: AttributeSize}> = [
  {label: 'Small', value: 'small'},
  {label: 'Large', value: 'large'},
];

const COLORS: Array<{label: string; value: AttributeColor}> = [
  {label: 'Default', value: 'default'},
  {label: 'Brand', value: 'brand'},
  {label: 'Negative', value: 'negative'},
  {label: 'Highlight', value: 'highlight'},
  {label: 'Inverse', value: 'inverse'},
];

type PreferredIconUseCase = {
  useCase: string;
  label: string;
  icon: string;
  size: AttributeSize;
};

const PREFERRED_ICON_USE_CASES: {
  large: PreferredIconUseCase[];
  small: PreferredIconUseCase[];
} = {
  large: [
    {
      useCase: 'Associate labor hours available',
      label: '113h associate labor available tonight',
      icon: 'User',
      size: 'large',
    },
    {useCase: 'Associate name', label: 'Alex Carter', icon: 'User', size: 'large'},
    {
      useCase: 'Associate preferences location',
      label: '1 locations group set',
      icon: 'Location',
      size: 'large',
    },
    {
      useCase: 'Associate preferences status',
      label: '0 of 27 stocking overnight associates set',
      icon: 'User',
      size: 'large',
    },
    {
      useCase: 'Associate preferences time',
      label: 'Associate preferences (~15 mins)',
      icon: 'User',
      size: 'large',
    },
    {
      useCase: 'Time & case count',
      label: '31h (981 cases)',
      icon: 'Clock',
      size: 'large',
    },
    {
      useCase: 'Truck arrival',
      label: '2 of 2 trucks arrived',
      icon: 'Truck',
      size: 'large',
    },
    {
      useCase: 'Total work hours',
      label: '116h total work for all goals',
      icon: 'History',
      size: 'large',
    },
    {
      useCase: 'Loading',
      label: 'Loading…',
      icon: 'History',
      size: 'large',
    },
  ],
  small: [
    {
      useCase: 'Action completed time',
      label: 'Completed at 11:23am',
      icon: 'Calendar',
      size: 'small',
    },
    {useCase: 'Action count', label: '4 actions', icon: 'Box', size: 'small'},
    {
      useCase: 'Action history',
      label: 'Worked area 6 times',
      icon: 'History',
      size: 'small',
    },
    {
      useCase: 'Action location',
      label: 'Start in Aisle B1',
      icon: 'Location',
      size: 'small',
    },
    {
      useCase: 'Action worked count',
      label: 'Worked 0 times',
      icon: 'Barcode',
      size: 'small',
    },
    {
      useCase: 'Associate badges',
      label: 'Stocking TA Level 3 badge, +2 more',
      icon: 'Star',
      size: 'small',
    },
    {
      useCase: 'Associate history',
      label: 'Associate since May 20, 2019',
      icon: 'User',
      size: 'small',
    },
    {useCase: 'Associate name', label: 'Alex Carter', icon: 'User', size: 'small'},
    {
      useCase: 'Associate preferences',
      label: 'D8 Pets preference',
      icon: 'Sliders',
      size: 'small',
    },
    {
      useCase: 'Associate preferences complete',
      label: '27 of 27 stocking overnight associates set',
      icon: 'Check',
      size: 'small',
    },
    {
      useCase: 'Associate preferences incomplete',
      label: '14 of 27 stocking overnight associates set',
      icon: 'Sliders',
      size: 'small',
    },
    {
      useCase: 'Time & cases count',
      label: '25h (1,190 cases)',
      icon: 'Clock',
      size: 'small',
    },
    {
      useCase: 'Reassign associate',
      label: 'Reassign to Alex Carter',
      icon: 'User',
      size: 'small',
    },
    {useCase: 'Loading', label: 'Loading…', icon: 'Clock', size: 'small'},
  ],
};

function AttributePreview({
  size,
  color,
  additionalLabel,
}: {
  size: AttributeSize;
  color: AttributeColor;
  additionalLabel: boolean;
}) {
  const iconSize = size === 'large' ? 20 : 16;
  const content = (
    <Attribute
      size={size}
      color={color}
      label="31h available"
      additionalLabel={additionalLabel}
      label2="42h needed"
      icon={<Icon name="Clock" decorative style={{fontSize: iconSize}} />}
    />
  );

  if (color === 'inverse') {
    return (
      <div
        style={{
          display: 'inline-flex',
          padding: 12,
          borderRadius: 8,
          background: 'var(--ld-semantic-color-fill-inverse, #2e2f32)',
        }}
      >
        {content}
      </div>
    );
  }

  return content;
}

export default function AttributePage() {
  const [size, setSize] = React.useState<AttributeSize>('small');
  const [color, setColor] = React.useState<AttributeColor>('default');
  const [additionalLabel, setAdditionalLabel] = React.useState(false);

  return (
    <PageWrapper
      title="Attribute"
      category="Subsystem Components"
      description="Leading-icon metadata used to summarize a status, person, location, time, or operational detail in a compact row."
    >
      <ExampleSection
        title="Component Configuration"
        description="Adjust the size, color, and secondary-label pattern used by the attribute."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">
                  Size
                </Body>
                <ButtonGroup>
                  {SIZES.map((item) => (
                    <Button
                      key={item.value}
                      size="small"
                      variant={size === item.value ? 'primary' : 'secondary'}
                      onClick={() => setSize(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>

              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">
                  Color
                </Body>
                <ButtonGroup>
                  {COLORS.map((item) => (
                    <Button
                      key={item.value}
                      size="small"
                      variant={color === item.value ? 'primary' : 'secondary'}
                      onClick={() => setColor(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>

              <Checkbox
                label="Show secondary label"
                checked={additionalLabel}
                onChange={(event) => setAdditionalLabel(event.target.checked)}
              />
            </>
          }
          preview={
            <DocsCard title="Preview" description="Attribute tokens respond to size and semantic color.">
              <div style={{display: 'flex', alignItems: 'center', minHeight: 96}}>
                <AttributePreview
                  size={size}
                  color={color}
                  additionalLabel={additionalLabel}
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Sizes" description="Use small attributes for inline metadata and large attributes for summary surfaces.">
        <DocsGrid>
          <DocsCard title="Small" description="Fits dense rows, cards, list items, and supporting text.">
            <Attribute label="Aisle B12" icon={<Icon name="Location" decorative style={{fontSize: 16}} />} />
          </DocsCard>
          <DocsCard title="Large" description="Works for dashboard summaries and prominent status rows.">
            <Attribute size="large" label="113h labor available" icon={<Icon name="User" decorative style={{fontSize: 20}} />} />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Color Intent" description="Reserve color for semantic meaning, not decoration.">
        <DocsGrid minColumnWidth={220}>
          {COLORS.map((item) => (
            <DocsCard key={item.value} title={item.label}>
              <AttributePreview size="small" color={item.value} additionalLabel={false} />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Operational Examples" description="Attributes should read as short facts that can be scanned quickly.">
        <DocsGrid>
          <DocsCard title="Schedule">
            <Attribute label="Completed at 11:23am" icon={<Icon name="Calendar" decorative style={{fontSize: 16}} />} />
          </DocsCard>
          <DocsCard title="Workload">
            <Attribute label="14 actions" icon={<Icon name="Box" decorative style={{fontSize: 16}} />} />
          </DocsCard>
          <DocsCard title="Comparison" description="iconLabel=&quot;Scheduled time&quot; lets screen readers announce the icon meaning.">
            <Attribute label="2 hours" additionalLabel label2="3 hours" color="brand" icon={<Icon name="Clock" decorative style={{fontSize: 16}} />} iconLabel="Scheduled time" />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Preferred Icons by Use Case"
        description="Mapped from the Figma operational reference for Attribute (Large + Small)."
      >
        <DocsGrid minColumnWidth={360}>
          <DocsCard title="Large" style={{alignContent: 'start'}}>
            <div style={{display: 'grid', gap: 12}}>
              {PREFERRED_ICON_USE_CASES.large.map((item) => (
                <div key={item.useCase} style={{display: 'grid', gap: 6}}>
                  <Body as="span" size="small" color="subtle">
                    {item.useCase}
                  </Body>
                  <Attribute
                    size={item.size}
                    label={item.label}
                    icon={<Icon name={item.icon} decorative style={{fontSize: 20}} />}
                  />
                </div>
              ))}
            </div>
          </DocsCard>

          <DocsCard title="Small" style={{alignContent: 'start'}}>
            <div style={{display: 'grid', gap: 12}}>
              {PREFERRED_ICON_USE_CASES.small.map((item) => (
                <div key={item.useCase} style={{display: 'grid', gap: 6}}>
                  <Body as="span" size="small" color="subtle">
                    {item.useCase}
                  </Body>
                  <Attribute
                    size={item.size}
                    label={item.label}
                    icon={<Icon name={item.icon} decorative style={{fontSize: 16}} />}
                  />
                </div>
              ))}
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Keep attribute labels brief and factual. Pair them with an icon only when the icon reinforces the value, and use inverse only on dark surfaces."
        defaultValue="size='small', color='default', icon=Tag"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility — iconLabel</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            By default the leading icon is decorative and hidden from assistive technology — the <code>label</code> text carries all the meaning. When the icon conveys additional context the label alone does not express, pass <code>iconLabel</code>:
          </Body>
          <ul style={{margin: '8px 0 0', paddingLeft: 20, display: 'grid', gap: 4}}>
            <li><Body as="span" size="medium" color="subtle"><code>{'iconLabel="Coupon"'}</code> + <code>label="Limit 2"</code> → SR reads <em>"Coupon, Limit 2"</em></Body></li>
            <li><Body as="span" size="medium" color="subtle"><code>{'iconLabel="Scheduled time"'}</code> + <code>label="2 hours"</code> <code>label2="3 hours"</code> → SR reads <em>"Scheduled time, 2 hours → 3 hours"</em></Body></li>
          </ul>
          <Body as="p" size="medium" color="subtle" style={{margin: '4px 0 0', lineHeight: '1.5'}}>
            Omit <code>iconLabel</code> when the label is fully self-explanatory (e.g. "Aisle B12" with a location pin).
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}