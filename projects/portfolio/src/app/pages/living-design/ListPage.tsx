import * as React from 'react';

import {Avatar, AvatarFallback} from '@/living-design/components/Avatar/Avatar';
import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {Chip} from '@/living-design/components/Chip/Chip';
import {IconButton} from '@/living-design/components/IconButton/IconButton';
import {
  CalendarIcon,
  ChevronRightIcon,
  EditIcon,
  LockIcon,
  MoreVerticalIcon,
  SettingsIcon,
  StarIcon,
  TrashIcon,
} from '@/living-design/components/Icons/Icons';
import {List, ListItem} from '@/living-design/components/List/List';
import {Spinner} from '@/living-design/components/Spinner/Spinner';
import {Switch} from '@/living-design/components/Switch/Switch';
import {Body} from '@/living-design/components/Text/Text';
import {Illustration} from '@/living-design/utils/Illustration';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type ListPattern =
  | 'basic'
  | 'profile'
  | 'navigation'
  | 'controls'
  | 'status'
  | 'illustrations'
  | 'multi-action';

type MultiActionLeading = 'icon' | 'checkbox' | 'spinner';
type MultiActionCount = 1 | 2 | 3;

const LIST_PATTERNS: Array<{
  pattern: ListPattern;
  label: string;
  description: string;
}> = [
  {
    pattern: 'basic',
    label: 'Basic',
    description: 'Single-label rows for short indexes.',
  },
  {
    pattern: 'profile',
    label: 'Profile',
    description: 'Avatars in the leading slot identify the row object.',
  },
  {
    pattern: 'navigation',
    label: 'Navigation',
    description: 'Trailing chevrons signal each row opens a deeper destination.',
  },
  {
    pattern: 'controls',
    label: 'Controls',
    description: 'Trailing switches and checkboxes configure independent preferences.',
  },
  {
    pattern: 'status',
    label: 'Status',
    description: 'Leading icons + trailing chips compress scannable state.',
  },
  {
    pattern: 'illustrations',
    label: 'Illustrations',
    description: 'Mono illustrations as leading content for category, service, or feature lists.',
  },
  {
    pattern: 'multi-action',
    label: 'Multi-action',
    description: 'Leading icon, checkbox, or spinner with 1–3 trailing action buttons.',
  },
];

function ListPreviewFrame({children}: {children: React.ReactNode}) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 8,
        background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
      }}
    >
      {children}
    </div>
  );
}

function BasicListExample({showHidden = false}: {showHidden?: boolean}) {
  return (
    <List>
      <ListItem>First item in the list</ListItem>
      <ListItem hidden={!showHidden}>Hidden item when configured off</ListItem>
      <ListItem>Second item in the list</ListItem>
      <ListItem>Third item in the list</ListItem>
    </List>
  );
}

function ProfileListExample({
  showLeading = true,
  showTrailing = false,
}: {
  showLeading?: boolean;
  showTrailing?: boolean;
}) {
  return (
    <List>
      <ListItem
        leading={
          showLeading ? (
            <Avatar a11yLabel="Jamie Doe" color="brand" size="medium">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ) : undefined
        }
        title="Jamie Doe"
        trailing={showTrailing ? <ChevronRightIcon /> : undefined}
        onClick={showTrailing ? () => {} : undefined}
      >
        Store associate, Electronics
      </ListItem>
      <ListItem
        leading={
          showLeading ? (
            <Avatar a11yLabel="Alex Rivera" color="brand-subtle" size="medium">
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          ) : undefined
        }
        title="Alex Rivera"
        trailing={showTrailing ? <ChevronRightIcon /> : undefined}
        onClick={showTrailing ? () => {} : undefined}
      >
        Store manager, Apparel
      </ListItem>
      <ListItem
        leading={
          showLeading ? (
            <Avatar a11yLabel="Sam Kim" color="neutral" size="medium">
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
          ) : undefined
        }
        title="Sam Kim"
        trailing={showTrailing ? <ChevronRightIcon /> : undefined}
        onClick={showTrailing ? () => {} : undefined}
      >
        Pharmacy technician
      </ListItem>
    </List>
  );
}

function NavigationListExample() {
  return (
    <List>
      <ListItem title="Profile" trailing={<ChevronRightIcon />} onClick={() => {}}>
        Update your name, photo, and contact info
      </ListItem>
      <ListItem title="Notifications" trailing={<ChevronRightIcon />} onClick={() => {}}>
        Email, SMS, and push preferences
      </ListItem>
      <ListItem title="Security" trailing={<ChevronRightIcon />} onClick={() => {}}>
        Password, two-factor authentication, sessions
      </ListItem>
    </List>
  );
}

function ControlListExample({
  checked,
  idPrefix = 'list-row',
  setChecked,
  setToggle,
  toggle,
}: {
  checked: boolean;
  idPrefix?: string;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
}) {
  const emailId = `${idPrefix}-email`;
  const emailDescId = `${idPrefix}-email-desc`;
  const marketingId = `${idPrefix}-marketing`;
  const marketingDescId = `${idPrefix}-marketing-desc`;

  return (
    <List>
      <ListItem
        title={<span id={emailId}>Email notifications</span>}
        descriptionId={emailDescId}
        trailing={
          <Switch
            a11yLabelledBy={emailId}
            aria-describedby={emailDescId}
            isOn={toggle}
            onClick={() => setToggle((value) => !value)}
          />
        }
      >
        Get a digest of orders, promotions, and account updates
      </ListItem>
      <ListItem
        title={<span id={marketingId}>Marketing emails</span>}
        descriptionId={marketingDescId}
        trailing={
          <Checkbox
            a11yLabelledBy={marketingId}
            checkboxProps={{'aria-describedby': marketingDescId}}
            checked={checked}
            onChange={() => setChecked((value) => !value)}
          />
        }
      >
        Occasional product updates and seasonal offers
      </ListItem>
    </List>
  );
}

function StatusLeadingIcon({children}: {children: React.ReactNode}) {
  return (
    <span style={{display: 'inline-flex', alignItems: 'center', height: '1.5rem'}}>
      {children}
    </span>
  );
}

function StatusListExample({showLeading = true}: {showLeading?: boolean}) {
  return (
    <List>
      <ListItem
        leading={showLeading ? <StatusLeadingIcon><SettingsIcon /></StatusLeadingIcon> : undefined}
        title="Project Phoenix"
        trailing={<Chip>Active</Chip>}
      >
        Last updated 3 hours ago
      </ListItem>
      <ListItem
        leading={showLeading ? <StatusLeadingIcon><StarIcon /></StatusLeadingIcon> : undefined}
        title="Project Atlas"
        trailing={<Chip>Draft</Chip>}
      >
        Last updated yesterday
      </ListItem>
      <ListItem title="Project Comet" trailing={<Chip>Archived</Chip>}>
        Last updated 2 weeks ago
      </ListItem>
    </List>
  );
}

function IllustrationListExample({showTrailing = true}: {showTrailing?: boolean}) {
  const trailing = showTrailing ? <ChevronRightIcon /> : undefined;
  const onClick = showTrailing ? () => {} : undefined;
  return (
    <List>
      <ListItem
        leading={<Illustration type="mono-small" name="Delivery" width={40} height={40} title="" />}
        title="Delivery"
        trailing={trailing}
        onClick={onClick}
      >
        Track in-flight orders and delivery windows
      </ListItem>
      <ListItem
        leading={<Illustration type="mono-small" name="Pharmacy" width={40} height={40} title="" />}
        title="Pharmacy"
        trailing={trailing}
        onClick={onClick}
      >
        Refills, transfers, and immunization scheduling
      </ListItem>
      <ListItem
        leading={<Illustration type="mono-small" name="Coupons" width={40} height={40} title="" />}
        title="Coupons"
        trailing={trailing}
        onClick={onClick}
      >
        Clip offers and stack with weekly rollbacks
      </ListItem>
      <ListItem
        leading={<Illustration type="mono-small" name="CashBack" width={40} height={40} title="" />}
        title="Walmart Cash"
        trailing={trailing}
        onClick={onClick}
      >
        Balance, recent earnings, and ways to redeem
      </ListItem>
    </List>
  );
}

const MULTI_ACTION_ROWS: Array<{id: string; title: string; body: string; icon: React.ReactNode}> = [
  {id: 'ma-settings', title: 'Account settings', body: 'Update name, email, and password', icon: <SettingsIcon />},
  {id: 'ma-privacy', title: 'Privacy', body: 'Location, data sharing, and permissions', icon: <LockIcon />},
  {id: 'ma-schedule', title: 'Schedule', body: 'Pickup windows and delivery slots', icon: <CalendarIcon />},
];

const MULTI_ACTION_BUTTONS: Array<{label: (title: string) => string; icon: React.ReactNode}> = [
  {label: (t) => `Edit ${t}`, icon: <EditIcon />},
  {label: (t) => `Delete ${t}`, icon: <TrashIcon />},
  {label: (t) => `More options for ${t}`, icon: <MoreVerticalIcon />},
];

function MultiActionListExample({
  leading = 'icon',
  actionCount = 2,
}: {
  leading?: MultiActionLeading;
  actionCount?: MultiActionCount;
}) {
  const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>({});
  const toggleItem = (id: string) => setCheckedItems((prev) => ({...prev, [id]: !prev[id]}));

  return (
    <List>
      {MULTI_ACTION_ROWS.map((row) => {
        let leadingNode: React.ReactNode;
        if (leading === 'icon') {
          leadingNode = <StatusLeadingIcon>{row.icon}</StatusLeadingIcon>;
        } else if (leading === 'checkbox') {
          leadingNode = (
            <Checkbox
              a11yLabelledBy={row.id}
              checked={!!checkedItems[row.id]}
              onChange={() => toggleItem(row.id)}
            />
          );
        } else {
          leadingNode = (
            <StatusLeadingIcon>
              <Spinner variant="generic" color="brand" size="small" />
            </StatusLeadingIcon>
          );
        }

        return (
          <ListItem
            key={row.id}
            leading={leadingNode}
            title={leading === 'checkbox' ? <span id={row.id}>{row.title}</span> : row.title}
            trailing={
              <span style={{display: 'inline-flex', gap: 8, alignItems: 'center'}}>
                {MULTI_ACTION_BUTTONS.slice(0, actionCount).map((btn) => (
                  <IconButton
                    key={btn.label(row.title)}
                    a11yLabel={btn.label(row.title)}
                    size="small"
                    color="tertiary"
                  >
                    {btn.icon}
                  </IconButton>
                ))}
              </span>
            }
          >
            {row.body}
          </ListItem>
        );
      })}
    </List>
  );
}

function ConfiguredListPreview({
  checked,
  multiActionCount,
  multiActionLeading,
  pattern,
  setChecked,
  setToggle,
  showHidden,
  showLeading,
  showTrailing,
  toggle,
}: {
  checked: boolean;
  multiActionCount: MultiActionCount;
  multiActionLeading: MultiActionLeading;
  pattern: ListPattern;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  showHidden: boolean;
  showLeading: boolean;
  showTrailing: boolean;
  toggle: boolean;
}) {
  if (pattern === 'profile') {
    return <ProfileListExample showLeading={showLeading} showTrailing={showTrailing} />;
  }
  if (pattern === 'navigation') {
    return <NavigationListExample />;
  }
  if (pattern === 'controls') {
    return (
      <ControlListExample
        checked={checked}
        idPrefix="list-config-row"
        setChecked={setChecked}
        setToggle={setToggle}
        toggle={toggle}
      />
    );
  }
  if (pattern === 'status') {
    return <StatusListExample showLeading={showLeading} />;
  }
  if (pattern === 'illustrations') {
    return <IllustrationListExample showTrailing={showTrailing} />;
  }
  if (pattern === 'multi-action') {
    return <MultiActionListExample leading={multiActionLeading} actionCount={multiActionCount} />;
  }
  return <BasicListExample showHidden={showHidden} />;
}

export default function ListPage() {
  const [toggle, setToggle] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [selectedPattern, setSelectedPattern] = React.useState<ListPattern>('illustrations');
  const [showLeading, setShowLeading] = React.useState(true);
  const [showTrailing, setShowTrailing] = React.useState(true);
  const [showHidden, setShowHidden] = React.useState(false);
  const [multiActionLeading, setMultiActionLeading] = React.useState<MultiActionLeading>('icon');
  const [multiActionCount, setMultiActionCount] = React.useState<MultiActionCount>(2);
  const selectedPatternConfig =
    LIST_PATTERNS.find((item) => item.pattern === selectedPattern) ?? LIST_PATTERNS[0];

  return (
    <PageWrapper
      title="List"
      category="Core Components"
      description="Lists are continuous, vertical indexes of related information. Each ListItem supports leading content (avatars, icons, illustrations), a primary label with optional title, and trailing content (chevrons, switches, chips)."
    >
      <ExampleSection
        title="Component Configuration"
        description="Pick a pattern to preview leading content, trailing content, and conditional rows."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Pattern
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose a common list composition to update the live preview.
                </Body>
              </div>

              <ButtonGroup aria-label="List pattern">
                {LIST_PATTERNS.map((item) => (
                  <Button
                    key={item.pattern}
                    size="small"
                    variant={selectedPattern === item.pattern ? 'primary' : 'secondary'}
                    aria-pressed={selectedPattern === item.pattern}
                    onClick={() => setSelectedPattern(item.pattern)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 16}}>
                <Checkbox
                  label="Show leading content"
                  checked={showLeading}
                  disabled={
                    selectedPattern === 'basic' ||
                    selectedPattern === 'navigation' ||
                    selectedPattern === 'controls' ||
                    selectedPattern === 'illustrations' ||
                    selectedPattern === 'multi-action'
                  }
                  onChange={(event) => setShowLeading(event.target.checked)}
                />
                <Checkbox
                  label="Show trailing chevron"
                  checked={showTrailing}
                  disabled={selectedPattern !== 'profile' && selectedPattern !== 'illustrations'}
                  onChange={(event) => setShowTrailing(event.target.checked)}
                />
                <Checkbox
                  label="Show hidden row"
                  checked={showHidden}
                  disabled={selectedPattern !== 'basic'}
                  onChange={(event) => setShowHidden(event.target.checked)}
                />
                {selectedPattern === 'multi-action' && (
                  <>
                    <div style={{display: 'grid', gap: 8}}>
                      <Body as="p" size="small" weight="alt" style={{margin: 0}}>Leading</Body>
                      <ButtonGroup aria-label="Multi-action leading variant">
                        {(['icon', 'checkbox', 'spinner'] as const).map((v) => (
                          <Button
                            key={v}
                            size="small"
                            variant={multiActionLeading === v ? 'primary' : 'secondary'}
                            aria-pressed={multiActionLeading === v}
                            onClick={() => setMultiActionLeading(v)}
                          >
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </div>
                    <div style={{display: 'grid', gap: 8}}>
                      <Body as="p" size="small" weight="alt" style={{margin: 0}}>Actions</Body>
                      <ButtonGroup aria-label="Trailing action count">
                        {([1, 2, 3] as const).map((n) => (
                          <Button
                            key={n}
                            size="small"
                            variant={multiActionCount === n ? 'primary' : 'secondary'}
                            aria-pressed={multiActionCount === n}
                            onClick={() => setMultiActionCount(n)}
                          >
                            {n}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </div>
                  </>
                )}
              </div>
            </>
          }
          preview={
            <DocsCard title={`${selectedPatternConfig.label} preview`} description={selectedPatternConfig.description}>
              <ListPreviewFrame>
                <ConfiguredListPreview
                  checked={checked}
                  multiActionCount={multiActionCount}
                  multiActionLeading={multiActionLeading}
                  pattern={selectedPattern}
                  setChecked={setChecked}
                  setToggle={setToggle}
                  showHidden={showHidden}
                  showLeading={showLeading}
                  showTrailing={showTrailing}
                  toggle={toggle}
                />
              </ListPreviewFrame>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Structure"
        description="Start with a simple list, then add titles when rows need a primary label and supporting text."
      >
        <DocsGrid>
          <DocsCard title="Basic list" description="Single-line rows when each item can be understood from the label alone.">
            <ListPreviewFrame>
              <BasicListExample />
            </ListPreviewFrame>
          </DocsCard>

          <DocsCard title="With titles" description="Use a title for the primary label and body text for supporting status or details.">
            <ListPreviewFrame>
              <List>
                <ListItem title="Order #2024-1029">Delivered Tuesday, March 12</ListItem>
                <ListItem title="Order #2024-0989">Out for delivery today</ListItem>
                <ListItem title="Order #2024-0884">Cancelled by customer</ListItem>
              </List>
            </ListPreviewFrame>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Leading slot — icons, avatars, and illustrations"
        description="Leading content identifies the row object. Pick the visual that matches the row's level of recognition."
      >
        <DocsGrid>
          <DocsCard title="Avatars" description="Best for people, teams, or accounts.">
            <ListPreviewFrame>
              <ProfileListExample />
            </ListPreviewFrame>
          </DocsCard>

          <DocsCard title="Icons" description="Best when rows are settings, status, or known actions.">
            <ListPreviewFrame>
              <StatusListExample />
            </ListPreviewFrame>
          </DocsCard>

          <DocsCard title="Illustrations" description="Best for marketing, services, or feature hubs where category recognition matters.">
            <ListPreviewFrame>
              <IllustrationListExample />
            </ListPreviewFrame>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Trailing slot — destinations, controls, and status"
        description="Trailing content sets the row's primary interaction model — navigate, configure, or report state."
      >
        <DocsGrid>
          <DocsCard title="Trailing chevrons" description="Every row navigates to a deeper page.">
            <ListPreviewFrame>
              <NavigationListExample />
            </ListPreviewFrame>
          </DocsCard>

          <DocsCard title="Trailing controls" description="Independent settings — switches and checkboxes labelled from the row title.">
            <ListPreviewFrame>
              <ControlListExample
                checked={checked}
                idPrefix="list-section-row"
                setChecked={setChecked}
                setToggle={setToggle}
                toggle={toggle}
              />
            </ListPreviewFrame>
          </DocsCard>

          <DocsCard title="Trailing chips" description="Compact status, counts, or tags for fast scanning.">
            <ListPreviewFrame>
              <StatusListExample />
            </ListPreviewFrame>
          </DocsCard>

          <DocsCard title="Trailing multi-action" description="Two icon buttons when both actions are equally frequent. Keep actions distinct and label each for assistive technology.">
            <ListPreviewFrame>
              <MultiActionListExample leading="icon" actionCount={2} />
            </ListPreviewFrame>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Hidden items"
        description="Items can be conditionally hidden with the hidden prop. Hidden rows are not displayed, and their dividers are hidden with them."
      >
        <DocsCard
          title="Conditional rows"
          description="Use hidden for conditional rendering when a row should disappear with its divider."
        >
          <ListPreviewFrame>
            <List>
              <ListItem>Visible item</ListItem>
              <ListItem hidden>Hidden item</ListItem>
              <ListItem>Another visible item</ListItem>
            </List>
          </ListPreviewFrame>
          <Body as="p" size="small" color="subtle" style={{margin: '12px 0 0', lineHeight: '1.5'}}>
            The list above renders two visible rows while the hidden row is omitted from the layout.
          </Body>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Keep each ListItem focused on one object, destination, setting, or status. Use the leading slot to identify the row — avatars for people, icons for settings or actions, illustrations for marketing or category hubs. Use trailing chevrons for navigable rows, trailing controls for independent settings, trailing chips for status or counts, and paired icon buttons when two actions are equally frequent on a row. When using multi-action trailing buttons, give each button a distinct aria-label so assistive technology announces them clearly — do not rely solely on the icon. Do not mix navigation and form controls in the same row unless the relationship is explicit. Keep row content concise enough to scan, and use hidden only when the entire row and divider should be removed from view."
        defaultValue="leading, title, trailing are optional"
      />
    </PageWrapper>
  );
}
