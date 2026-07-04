import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {
  Menu,
  MenuItem,
  MenuSectionTitle,
  MenuDescriptionItem,
  MenuInfoItem,
  MenuNote,
  MenuSubMenu,
  MenuSectionTitleAccordion,
  MenuEditItem,
  type MenuPosition,
} from '@/app/components/Menu/Menu';
import {IconButton, type IconButtonSize} from '@/app/components/IconButton/IconButton';
import {
  CartIcon,
  EditIcon,
  GiftIcon,
  MoreIcon,
  SaveIcon,
  SettingsIcon,
  TagIcon,
  TrashIcon,
  UsersFillIcon,
} from '@/app/components/Icons/Icons';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

/**
 * A Menu hangs a list of navigation/command items off a button trigger. It is
 * built on the standalone `Menu` primitive (a controlled trigger + content
 * pair), so each example owns its `isOpen` state and a `triggerRef`.
 *
 * Menu items take you somewhere or run a command. To let a user *pick a value*
 * (checkmark, radio, description, inline edit) reach for Select Dropdown
 * instead; for app-style "view" toggles use Menubar.
 */
function NavMenu({
  label,
  position = 'bottomLeft',
  children,
}: {
  label: string;
  position?: MenuPosition;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Menu
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      position={position}
      triggerRef={triggerRef}
      trigger={
        <Button ref={triggerRef} variant="secondary" size="small">
          {label}
        </Button>
      }
    >
      {children}
    </Menu>
  );
}

/**
 * An overflow menu: an Icon Button (⋯) trigger that opens a Menu of actions.
 * The classic "more actions" pattern for toolbars, list rows, and cards.
 */
function OverflowMenu({
  size = 'medium',
  position = 'bottomRight',
  children,
}: {
  size?: IconButtonSize;
  position?: MenuPosition;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Menu
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      position={position}
      triggerRef={triggerRef}
      trigger={
        <IconButton ref={triggerRef} a11yLabel="More actions" variant="full" size={size}>
          <MoreIcon />
        </IconButton>
      }
    >
      {children}
    </Menu>
  );
}

const POSITIONS: Array<{value: MenuPosition; label: string}> = [
  {value: 'bottomLeft', label: 'Bottom left'},
  {value: 'bottomRight', label: 'Bottom right'},
  {value: 'topLeft', label: 'Top left'},
  {value: 'topRight', label: 'Top right'},
];

const TRIGGER_SIZES: Array<{value: IconButtonSize; label: string}> = [
  {value: 'xsmall', label: 'XSmall'},
  {value: 'small', label: 'Small'},
  {value: 'medium', label: 'Medium'},
  {value: 'large', label: 'Large'},
];

export default function MenuPage() {
  const [position, setPosition] = React.useState<MenuPosition>('bottomLeft');
  const [includeDisabled, setIncludeDisabled] = React.useState(false);
  const [lastAction, setLastAction] = React.useState<string | null>(null);
  const [boardName, setBoardName] = React.useState('Q3 Roadmap');
  const [triggerSize, setTriggerSize] = React.useState<IconButtonSize>('medium');
  const [overflowPos, setOverflowPos] = React.useState<MenuPosition>('bottomRight');

  return (
    <PageWrapper
      title="Menu"
      category="Shared Components"
      description="A click-triggered list of navigation and command items hung from a button. Menu items take the user to a different experience or run an action. Rows can carry leading icons, descriptions, submenu flyouts, an inline edit field, or an info button that expands a detail panel. To let a user choose a value, use Select Dropdown; for app-style view toggles, use Menubar."
    >
      <ExampleSection
        title="Component Configuration"
        description="Position the menu relative to its trigger and preview keyboard-navigable action items."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>Position</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Which corner the menu opens from relative to the trigger.
                </Body>
              </div>
              <ButtonGroup aria-label="Menu position">
                {POSITIONS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={position === item.value ? 'primary' : 'secondary'}
                    aria-pressed={position === item.value}
                    onClick={() => setPosition(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <Checkbox
                label="Include disabled item"
                checked={includeDisabled}
                onChange={(event) => setIncludeDisabled(event.target.checked)}
              />
            </>
          }
          preview={
            <DocsCard title="Account menu" description={`Opens ${position}. Items navigate or run a command, then close.`}>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', minHeight: 180}}>
                <NavMenu label="Account" position={position}>
                  <MenuItem leadingIcon={<UsersFillIcon />} onClick={() => setLastAction('Profile')}>Profile</MenuItem>
                  <MenuItem leadingIcon={<CartIcon />} onClick={() => setLastAction('Orders')}>Orders</MenuItem>
                  <MenuItem leadingIcon={<GiftIcon />} onClick={() => setLastAction('Rewards')}>Rewards</MenuItem>
                  <MenuItem leadingIcon={<SettingsIcon />} onClick={() => setLastAction('Settings')}>Settings</MenuItem>
                  {includeDisabled ? (
                    <MenuItem leadingIcon={<TagIcon />} disabled>Promotions (unavailable)</MenuItem>
                  ) : (
                    <MenuItem leadingIcon={<TagIcon />} onClick={() => setLastAction('Promotions')}>Promotions</MenuItem>
                  )}
                </NavMenu>
                {lastAction ? (
                  <Body as="p" size="small" color="subtle" style={{margin: 0}}>Last action: {lastAction}</Body>
                ) : null}
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Icon button trigger"
        description="Pair an Icon Button with a 'more' icon as an overflow menu. Adjust the trigger size and which corner the menu opens from."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>Trigger size</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Sizes the Icon Button that opens the menu.
                </Body>
              </div>
              <ButtonGroup aria-label="Trigger size">
                {TRIGGER_SIZES.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={triggerSize === item.value ? 'primary' : 'secondary'}
                    aria-pressed={triggerSize === item.value}
                    onClick={() => setTriggerSize(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>Position</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Which corner the menu opens from relative to the trigger.
                </Body>
              </div>
              <ButtonGroup aria-label="Overflow menu position">
                {POSITIONS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={overflowPos === item.value ? 'primary' : 'secondary'}
                    aria-pressed={overflowPos === item.value}
                    onClick={() => setOverflowPos(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard title="Overflow menu" description={`Opens ${overflowPos} from a ${triggerSize} icon button.`}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 220,
                  padding: 16,
                  borderRadius: 8,
                  background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
                }}
              >
                <OverflowMenu size={triggerSize} position={overflowPos}>
                  <MenuItem leadingIcon={<EditIcon />} onClick={() => setLastAction('Edit')}>Edit</MenuItem>
                  <MenuItem leadingIcon={<SaveIcon />} onClick={() => setLastAction('Save')}>Save</MenuItem>
                  <MenuItem leadingIcon={<TagIcon />} onClick={() => setLastAction('Rename')}>Rename</MenuItem>
                  <MenuItem destructive leadingIcon={<TrashIcon />} onClick={() => setLastAction('Delete')}>Delete</MenuItem>
                </OverflowMenu>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Patterns" description="Menu items navigate to a destination or fire a command.">
        <DocsGrid>
          <DocsCard title="Navigation" description="Each item routes the user to a different experience.">
            <NavMenu label="Go to">
              <MenuItem leadingIcon={<UsersFillIcon />}>Dashboard</MenuItem>
              <MenuItem leadingIcon={<CartIcon />}>Orders</MenuItem>
              <MenuItem leadingIcon={<GiftIcon />}>Rewards</MenuItem>
              <MenuItem leadingIcon={<SettingsIcon />}>Settings</MenuItem>
            </NavMenu>
          </DocsCard>

          <DocsCard title="Commands" description="Each item runs an action on the current object.">
            <NavMenu label="Actions">
              <MenuItem leadingIcon={<EditIcon />}>Edit</MenuItem>
              <MenuItem leadingIcon={<TagIcon />}>Rename</MenuItem>
              <MenuItem leadingIcon={<UsersFillIcon />}>Share</MenuItem>
              <MenuItem leadingIcon={<TrashIcon />}>Delete</MenuItem>
            </NavMenu>
          </DocsCard>

          <DocsCard title="Text only" description="Leading icons are optional — keep labels short and scannable.">
            <NavMenu label="More">
              <MenuItem>View details</MenuItem>
              <MenuItem>Move to…</MenuItem>
              <MenuItem>Archive</MenuItem>
              <MenuItem disabled>Restore (unavailable)</MenuItem>
            </NavMenu>
          </DocsCard>

          <DocsCard title="Opens upward" description="Use a top position when the trigger sits low in the viewport.">
            <div style={{display: 'flex', alignItems: 'flex-end', minHeight: 160}}>
              <NavMenu label="Account" position="topLeft">
                <MenuItem leadingIcon={<UsersFillIcon />}>Profile</MenuItem>
                <MenuItem leadingIcon={<SettingsIcon />}>Settings</MenuItem>
                <MenuItem leadingIcon={<TrashIcon />}>Sign out</MenuItem>
              </NavMenu>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Toolbar layout" description="Use sibling menus when commands belong to peer groups (File / Edit / Help). For a persistent app menu bar, use Menubar.">
        <DocsCard>
          <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', minHeight: 200}}>
            <NavMenu label="File">
              <MenuItem>New</MenuItem>
              <MenuItem>Open</MenuItem>
              <MenuItem>Save</MenuItem>
            </NavMenu>
            <NavMenu label="Edit">
              <MenuItem>Undo</MenuItem>
              <MenuItem>Redo</MenuItem>
              <MenuItem>Cut</MenuItem>
              <MenuItem>Copy</MenuItem>
              <MenuItem>Paste</MenuItem>
            </NavMenu>
            <NavMenu label="Help">
              <MenuItem>Documentation</MenuItem>
              <MenuItem>About</MenuItem>
            </NavMenu>
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="Menu item types"
        description="Beyond the standard item, a menu can group, describe, branch, and edit. Open each trigger to explore."
      >
        <DocsGrid>
          <DocsCard title="Section titles" description="Group items under a regular or bold heading. Headings are skipped by keyboard navigation.">
            <NavMenu label="Workspace">
              <MenuSectionTitle variant="bold">Recent</MenuSectionTitle>
              <MenuItem>Q3 Roadmap</MenuItem>
              <MenuItem>Launch plan</MenuItem>
              <MenuSectionTitle>Shared with me</MenuSectionTitle>
              <MenuItem>Design system</MenuItem>
              <MenuItem>Brand kit</MenuItem>
            </NavMenu>
          </DocsCard>

          <DocsCard title="Description" description="A leading avatar with a bold title and a supporting description line.">
            <NavMenu label="Switch workspace">
              <MenuDescriptionItem title="Personal" description="3 projects" />
              <MenuDescriptionItem title="Acme Inc." description="12 projects" />
              <MenuDescriptionItem title="Side projects" description="5 projects" />
            </NavMenu>
          </DocsCard>

          <DocsCard title="Info & destructive" description="An info row carries a trailing indicator; destructive commands read in the critical color.">
            <NavMenu label="Manage">
              <MenuItem leadingIcon={<EditIcon />}>Edit</MenuItem>
              <MenuInfoItem leadingIcon={<TagIcon />}>Plan &amp; billing</MenuInfoItem>
              <MenuItem destructive leadingIcon={<TrashIcon />}>Delete project</MenuItem>
            </NavMenu>
          </DocsCard>

          <DocsCard title="Submenu (flyout)" description="Hover or activate a submenu row to open its items in a cascading panel beside the trigger; → opens it, ← closes.">
            <NavMenu label="Share">
              <MenuItem leadingIcon={<UsersFillIcon />}>Invite people</MenuItem>
              <MenuSubMenu label="Copy link" leadingIcon={<TagIcon />}>
                <MenuItem>Anyone with the link</MenuItem>
                <MenuItem>People in workspace</MenuItem>
                <MenuItem>Only invited people</MenuItem>
              </MenuSubMenu>
              <MenuSubMenu label="Export as">
                <MenuItem>PDF</MenuItem>
                <MenuItem>CSV</MenuItem>
                <MenuItem>PNG</MenuItem>
              </MenuSubMenu>
            </NavMenu>
          </DocsCard>

          <DocsCard title="Accordion" description="Collapse a group of items behind an expandable header. The header is bold while open.">
            <NavMenu label="Insert">
              <MenuSectionTitleAccordion title="Blocks" defaultOpen>
                <MenuItem>Heading</MenuItem>
                <MenuItem>Text</MenuItem>
                <MenuItem>Divider</MenuItem>
              </MenuSectionTitleAccordion>
              <MenuSectionTitleAccordion title="Embeds">
                <MenuItem>Image</MenuItem>
                <MenuItem>Video</MenuItem>
                <MenuItem>Table</MenuItem>
              </MenuSectionTitleAccordion>
            </NavMenu>
          </DocsCard>

          <DocsCard title="Inline edit" description="Rename in place. Double-click the field to edit; click away or press Enter to save, Escape to cancel.">
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center'}}>
              <NavMenu label="Board options">
                <MenuEditItem
                  value={boardName}
                  onValueChange={setBoardName}
                  editOnDoubleClick
                  placeholder="Board name"
                />
                <MenuItem>Duplicate</MenuItem>
                <MenuItem destructive>Delete board</MenuItem>
              </NavMenu>
              <Body as="p" size="small" color="subtle" style={{margin: 0}}>Name: {boardName}</Body>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Expandable details (Menu + Info)"
        description="Give an info item a `details` prop and its ⓘ becomes a toggle: activating it docks a detail panel beside the menu and flips the row to bold with a ‹ chevron. Use a footer note for caveats that apply to the whole group."
      >
        <DocsCard title="Identifier options" description="Click any row to reveal more about that identifier; click again (or ←) to collapse.">
          <NavMenu label="Choose identifier">
            <MenuInfoItem details="Your CBB ID is assigned automatically and groups a customer's known profiles into a single canonical record. It's the broadest match available and is safe to share across segments. Because it spans every channel a customer has touched — web, app, in-store, and call center — it gives the most complete view, but it can also fold in profiles that were merged in error. When that happens, contact data governance to split the record before you rely on it for targeting. CBB IDs are stable over time and never reused, so historical segments stay valid even after a customer's contact details change.">
              Customer IDs (CBB ID)
            </MenuInfoItem>
            <MenuInfoItem details="The email hash is a one-way, privacy-preserving fingerprint of the customer's email. Use it when you can't store raw email addresses.">
              Email Hash
            </MenuInfoItem>
            <MenuInfoItem details="Your phone number serves as your unique identifier because it links directly to your account. Once set, it can't be changed. To use a different number, you'll need to create a new segment.">
              Phone number
            </MenuInfoItem>
            <MenuNote>
              Once a draft is generated, the identifier cannot be changed. To use a different one, create a new segment.
            </MenuNote>
          </NavMenu>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use Menu for click-triggered navigation and commands hung from a button — each item takes the user somewhere or runs an action, then the menu closes. Reach for the richer rows when they help: descriptions for context, a submenu flyout for grouped choices, an info button (with `details`) to expand an explanatory panel beside the menu, and a footer note for caveats that apply to the whole group. To let a user pick a value (single choice, multi-select, or rich options) use Select Dropdown. For a persistent application menu bar with view toggles and submenus, use Menubar. For right-click contextual actions, use Context Menu."
        defaultValue="Menu with a trigger button, triggerRef, and MenuItem children"
      />
    </PageWrapper>
  );
}
