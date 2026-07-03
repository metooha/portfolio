import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {
  ButtonToggle,
  type ButtonToggleChevron,
  type ButtonToggleShape,
  type ButtonToggleSize,
} from '../components/ButtonToggle/ButtonToggle';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {
  SelectDropdown,
  SelectDropdownTrigger,
  SelectDropdownContent,
  SelectDropdownSwitchItem,
  SelectDropdownCheckmarkItem,
  SelectDropdownSeparator,
  SelectDropdownSectionTitle,
} from '../components/SelectDropdown/SelectDropdown';
import {StarIcon} from '../components/Icons/Icons';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const TOGGLE_SHAPES: Array<{
  shape: ButtonToggleShape;
  label: string;
  description: string;
}> = [
  {
    shape: 'pill',
    label: 'Pill',
    description: 'Fully rounded corners. The default silhouette.',
  },
  {
    shape: 'square',
    label: 'Square',
    description: '4px rounded corners for a more compact, boxy look.',
  },
];

const TOGGLE_CHEVRONS: Array<{
  chevron: ButtonToggleChevron;
  label: string;
  description: string;
}> = [
  {
    chevron: 'updown',
    label: 'Up / Down',
    description:
      'Disclosure chevron — points down when closed and up when open (sets aria-expanded).',
  },
  {
    chevron: 'next',
    label: 'Next',
    description:
      'Fixed page-next chevron pointing right, signaling forward navigation.',
  },
];

const FILTER_OPTIONS = ['Price', 'Brand', 'Rating', 'In stock'];

const MODELS = ['opus-4.6', 'opus-4.5', 'sonnet-4.6', 'haiku-4.5'] as const;
const MODEL_LABELS: Record<(typeof MODELS)[number], string> = {
  'opus-4.6': 'Opus 4.6',
  'opus-4.5': 'Opus 4.5',
  'sonnet-4.6': 'Sonnet 4.6',
  'haiku-4.5': 'Haiku 4.5',
};

// Maps the four dropdown corners to the Select Dropdown content's side + align.
type MenuCorner = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
const MENU_CORNERS: Array<{
  value: MenuCorner;
  label: string;
  side: 'top' | 'bottom';
  align: 'start' | 'end';
}> = [
  {value: 'bottom-left', label: 'Bottom left', side: 'bottom', align: 'start'},
  {value: 'bottom-right', label: 'Bottom right', side: 'bottom', align: 'end'},
  {value: 'top-left', label: 'Top left', side: 'top', align: 'start'},
  {value: 'top-right', label: 'Top right', side: 'top', align: 'end'},
];

const TOGGLE_SIZES: Array<{
  size: ButtonToggleSize;
  label: string;
  description: string;
}> = [
  {size: 'small', label: 'Small', description: 'Body Small text (14px), 32px tall.'},
  {size: 'medium', label: 'Medium', description: 'Body Medium text (16px), 40px tall.'},
  {size: 'large', label: 'Large', description: 'Body Large text (18px), 48px tall.'},
];

export default function ButtonTogglePage() {
  const [shape, setShape] = React.useState<ButtonToggleShape>('pill');
  const [chevron, setChevron] = React.useState<ButtonToggleChevron>('updown');
  const [size, setSize] = React.useState<ButtonToggleSize>('small');
  const [noFill, setNoFill] = React.useState(false);
  const [showCount, setShowCount] = React.useState(false);
  const [showLeading, setShowLeading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  // "Dynamic count" example: the count reflects how many menu options are
  // selected, exactly how a real filter toggle + dropdown would be wired.
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const toggleFilter = (option: string) =>
    setSelectedFilters((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );

  // "Toggle button + dropdown" example: the toggle opens a Select Dropdown that
  // mixes switch rows (modes) with a single-select checkmark list (model).
  const [modesOpen, setModesOpen] = React.useState(false);
  const [thinking, setThinking] = React.useState(true);
  const [longContext, setLongContext] = React.useState(true);
  const [model, setModel] = React.useState('opus-4.6');
  const modeCount = [thinking, longContext].filter(Boolean).length;
  const [menuCorner, setMenuCorner] = React.useState<MenuCorner>('bottom-left');
  const corner = MENU_CORNERS.find((c) => c.value === menuCorner) ?? MENU_CORNERS[0];

  const selectedSize =
    TOGGLE_SIZES.find((item) => item.size === size) ?? TOGGLE_SIZES[0];
  const selectedShape =
    TOGGLE_SHAPES.find((item) => item.shape === shape) ?? TOGGLE_SHAPES[0];

  return (
    <PageWrapper
      title="Button Toggle"
      category="Core Components"
      description="A button that reveals or expands related content. The trailing chevron communicates state: with chevron='updown' (default) it points down when closed and up when isOpen, acting as a disclosure; with chevron='next' it shows a fixed page-next chevron for forward navigation. Use shape to switch between a rounded pill and a square silhouette, and noFill to drop the default fill and border."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview the toggle shape, fill, chevron, size, leading icon, and disabled state. Click the preview to flip its open state."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>
                  Shape
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  {selectedShape.description}
                </Body>
                <ButtonGroup aria-label="Button Toggle shape">
                  {TOGGLE_SHAPES.map((item) => (
                    <Button
                      key={item.shape}
                      size="small"
                      variant={shape === item.shape ? 'primary' : 'secondary'}
                      aria-pressed={shape === item.shape}
                      onClick={() => setShape(item.shape)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>
                  Chevron
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  {TOGGLE_CHEVRONS.find((item) => item.chevron === chevron)?.description}
                </Body>
                <ButtonGroup aria-label="Button Toggle chevron">
                  {TOGGLE_CHEVRONS.map((item) => (
                    <Button
                      key={item.chevron}
                      size="small"
                      variant={chevron === item.chevron ? 'primary' : 'secondary'}
                      aria-pressed={chevron === item.chevron}
                      onClick={() => setChevron(item.chevron)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>
                  Size
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  {selectedSize.description}
                </Body>
                <ButtonGroup aria-label="Button Toggle size">
                  {TOGGLE_SIZES.map((item) => (
                    <Button
                      key={item.size}
                      size="small"
                      variant={size === item.size ? 'primary' : 'secondary'}
                      aria-pressed={size === item.size}
                      onClick={() => setSize(item.size)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <Checkbox
                label="No fill on default"
                checked={noFill}
                onChange={(event) => setNoFill(event.target.checked)}
              />
              <Checkbox
                label="Show count (+2)"
                checked={showCount}
                onChange={(event) => setShowCount(event.target.checked)}
              />
              <Checkbox
                label="Show leading icon"
                checked={showLeading}
                onChange={(event) => setShowLeading(event.target.checked)}
              />
              <Checkbox
                label="Disabled"
                checked={disabled}
                onChange={(event) => setDisabled(event.target.checked)}
              />
            </>
          }
          preview={
            <DocsCard
              title={`${selectedShape.label} ${noFill ? 'no-fill' : 'filled'}`}
              description={selectedSize.description}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <ButtonToggle
                  shape={shape}
                  chevron={chevron}
                  size={size}
                  noFill={noFill}
                  count={showCount ? 2 : undefined}
                  disabled={disabled}
                  isOpen={isOpen}
                  leading={showLeading ? <StarIcon decorative /> : undefined}
                  onClick={() => setIsOpen((open) => !open)}
                >
                  Button label
                </ButtonToggle>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Shapes"
        description="Pill (fully rounded) is the default; square uses 4px corners for a more compact look."
      >
        <DocsGrid>
          {TOGGLE_SHAPES.map((item) => (
            <DocsCard key={item.shape} title={item.label} description={item.description}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <ButtonToggle shape={item.shape}>Closed</ButtonToggle>
                <ButtonToggle shape={item.shape} isOpen>
                  Open
                </ButtonToggle>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Fill"
        description="By default the toggle has a fill and border. Set noFill so it reads as transparent until hovered or focused — useful in dense toolbars and on tinted surfaces."
      >
        <DocsGrid>
          <DocsCard title="Default" description="White fill with a subtle border.">
            <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
              <ButtonToggle>Closed</ButtonToggle>
              <ButtonToggle isOpen>Open</ButtonToggle>
            </div>
          </DocsCard>
          <DocsCard title="No fill" description="Transparent default; fill appears on hover/focus/press.">
            <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
              <ButtonToggle noFill>Closed</ButtonToggle>
              <ButtonToggle noFill isOpen>
                Open
              </ButtonToggle>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Chevron"
        description="The trailing chevron tells the user what the button does: up/down for a disclosure that expands in place, next for forward navigation. The square + no-fill + next combination is the ghost toggle."
      >
        <DocsGrid>
          <DocsCard title="Up / Down (closed)" description="Disclosure, collapsed.">
            <ButtonToggle>Button label</ButtonToggle>
          </DocsCard>
          <DocsCard title="Up / Down (open)" description="Disclosure, expanded.">
            <ButtonToggle isOpen>Button label</ButtonToggle>
          </DocsCard>
          <DocsCard title="Ghost (next)" description="No fill, square, page-next chevron.">
            <ButtonToggle noFill shape="square" chevron="next">
              Button label
            </ButtonToggle>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Three sizes that each change both the text style and height: 32px (small), 40px (medium), and 48px (large)."
      >
        <DocsGrid>
          {TOGGLE_SIZES.map((item) => (
            <DocsCard key={item.size} title={item.label} description={item.description}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <ButtonToggle size={item.size} count={2}>
                  Button label
                </ButtonToggle>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="States"
        description="Toggles respond to hover, focus, and pressed input, and support a disabled state."
      >
        <DocsGrid>
          <DocsCard title="Enabled" description="Default interactive state.">
            <ButtonToggle>Enabled</ButtonToggle>
          </DocsCard>
          <DocsCard title="With leading icon" description="Pair with a leading icon to aid recognition.">
            <ButtonToggle leading={<StarIcon decorative />}>Favorites</ButtonToggle>
          </DocsCard>
          <DocsCard title="Disabled" description="Non-interactive; signals the toggle cannot be used.">
            <ButtonToggle disabled>Disabled</ButtonToggle>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Dynamic count"
        description="count is driven by your own state — typically the number of options selected in the paired menu or select dropdown. Pass count={selected.length}; it shows +N while there are selections and hides at 0. Select options below to see it update."
      >
        <DocsCard
          title="Filter toggle"
          description="The toggle opens a menu; its count tracks the live selection."
        >
          <div style={{display: 'inline-block', position: 'relative'}}>
            <ButtonToggle
              isOpen={filterOpen}
              count={selectedFilters.length}
              leading={<StarIcon decorative />}
              onClick={() => setFilterOpen((open) => !open)}
            >
              Filters
            </ButtonToggle>
            {filterOpen && (
              <div
                role="menu"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  zIndex: 1,
                  display: 'grid',
                  gap: 8,
                  minWidth: 180,
                  padding: 12,
                  background: 'var(--ld-semantic-color-surface-default, #ffffff)',
                  border: '1px solid var(--ld-semantic-color-border-subtle, #e3e4e5)',
                  borderRadius: 'var(--ld-semantic-border-radius-medium, 0.25rem)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                }}
              >
                {FILTER_OPTIONS.map((option) => (
                  <Checkbox
                    key={option}
                    label={option}
                    checked={selectedFilters.includes(option)}
                    onChange={() => toggleFilter(option)}
                  />
                ))}
              </div>
            )}
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="Toggle button + dropdown"
        description="Pair a Button Toggle trigger with a Select Dropdown whose rows mix item types — switch rows for modes and a single-select checkmark list for one canonical choice. The toggle's +N count tracks the modes that are on, and its chevron reflects the open state."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>Opens from</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Which corner the dropdown opens relative to the toggle.
                </Body>
              </div>
              <ButtonGroup aria-label="Dropdown corner">
                {MENU_CORNERS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={menuCorner === item.value ? 'primary' : 'secondary'}
                    aria-pressed={menuCorner === item.value}
                    onClick={() => setMenuCorner(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard
              title="Model picker"
              description={`Opens ${corner.label.toLowerCase()}. Modes on: ${modeCount}; model: ${MODEL_LABELS[model as (typeof MODELS)[number]]}.`}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: corner.side === 'top' ? 'flex-end' : 'flex-start',
                  justifyContent: corner.align === 'end' ? 'flex-end' : 'flex-start',
                  minHeight: 320,
                  padding: 16,
                  borderRadius: 8,
                  background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
                }}
              >
                <SelectDropdown open={modesOpen} onOpenChange={setModesOpen}>
                  <SelectDropdownTrigger asChild>
                    <ButtonToggle isOpen={modesOpen} count={modeCount} leading={<StarIcon decorative />}>
                      Model
                    </ButtonToggle>
                  </SelectDropdownTrigger>
                  <SelectDropdownContent side={corner.side} align={corner.align}>
                    <SelectDropdownSwitchItem checked={thinking} onCheckedChange={setThinking}>
                      Thinking
                    </SelectDropdownSwitchItem>
                    <SelectDropdownSwitchItem checked={longContext} onCheckedChange={setLongContext}>
                      1M context
                    </SelectDropdownSwitchItem>
                    <SelectDropdownSeparator />
                    <SelectDropdownSectionTitle>Model</SelectDropdownSectionTitle>
                    {MODELS.map((value) => (
                      <SelectDropdownCheckmarkItem
                        key={value}
                        checked={model === value}
                        onSelect={() => setModel(value)}
                        closeOnSelect={false}
                      >
                        {MODEL_LABELS[value]}
                      </SelectDropdownCheckmarkItem>
                    ))}
                  </SelectDropdownContent>
                </SelectDropdown>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <GuidelinesSection
        description="Use Button Toggle for a control that expands or reveals related content in place — keep chevron='updown' so the chevron and aria-expanded communicate the open/closed state, and drive isOpen from your own state. Use chevron='next' (often with noFill + shape='square', the ghost toggle) when the button navigates forward instead of expanding. Choose shape and noFill to match the surrounding surface: pill with a fill for standalone controls, square and/or no-fill for dense toolbars and tinted backgrounds. Keep the label concise and pair a leading icon with text rather than relying on the icon alone."
        defaultValue="shape='pill', chevron='updown', size='small', noFill=false, isOpen=false"
      />
    </PageWrapper>
  );
}
