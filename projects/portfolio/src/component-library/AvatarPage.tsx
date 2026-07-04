import * as React from 'react';

import {
  Avatar,
  AvatarButton,
  AvatarFallback,
  type AvatarColor,
} from '@/app/components/Avatar/Avatar';
import {Button, ButtonGroup} from '@/app/components/Button';
import {Callout, CalloutLink} from '@/app/components/Callout';
import {Checkbox} from '@/app/components/Checkbox';
import {Icon} from '@/app/components/Icons';
import {LinkButton} from '@/app/components/LinkButton';
import {Body, Heading} from '@/app/components/Text/Text';
import { PRODUCT_IMAGES } from '@/app/components/common/productImages';

const avatarPlaceholder = PRODUCT_IMAGES.headphones;
import {
  ComponentConfigurationCard,
  DocsCard,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const ROW: React.CSSProperties = {
  display: 'flex',
  gap: 24,
  alignItems: 'center',
  flexWrap: 'wrap',
};

const SIZE_ITEMS = [
  {label: 'XSmall - 24px', size: 'xs' as const, initials: 'XS'},
  {label: 'Small - 32px', size: 'small' as const, initials: 'SM'},
  {label: 'Medium - 40px', size: 'medium' as const, initials: 'MD'},
  {label: 'Large - 48px', size: 'large' as const, initials: 'LG'},
  {label: 'XLarge - 64px', size: 'xl' as const, initials: 'XL'},
];

const MENU_ITEMS = [
  {label: 'XSmall - 24px', size: 'xs' as const, initials: 'XS'},
  {label: 'Small - 32px', size: 'small' as const, initials: 'SM'},
  {label: 'Medium - 40px', size: 'medium' as const, initials: 'MD'},
];

function Cell({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
      {children}
      <Body as="span" size="small" color="subtle">
        {label}
      </Body>
    </div>
  );
}

function ExampleTitle({children}: {children: React.ReactNode}) {
  return (
    <Heading as="h3" size="small" style={{margin: '0 0 16px'}}>
      {children}
    </Heading>
  );
}

function SubtleAvatar({
  label,
  initials,
  indicator = 'none',
  clockState,
}: {
  label: string;
  initials: string;
  indicator?: 'badge' | 'clock' | 'none';
  clockState?: 'active' | 'subtle';
}) {
  return (
    <Cell label={label}>
      <AvatarButton
        size="medium"
        color="brand-subtle"
        indicator={indicator}
        clockState={clockState}
        aria-label={label}
        onClick={() => {}}
      >
        <AvatarFallback>{initials}</AvatarFallback>
      </AvatarButton>
    </Cell>
  );
}

function AccountMenuCard() {
  return (
    <div
      style={{
        width: 290,
        border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        borderRadius: 4,
        background: 'var(--ld-semantic-color-surface, #ffffff)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.16)',
        overflow: 'hidden',
      }}
    >
      <div style={{display: 'grid', justifyItems: 'center', gap: 8, padding: '22px 24px 18px'}}>
        <Avatar a11yLabel="Account menu avatar" color="brand-subtle" size="large">
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Body as="p" size="small" style={{margin: 0}}>Firstname Lastname</Body>
        <LinkButton color="default" size="small" onClick={() => {}}>
          Sign out
        </LinkButton>
      </div>

      <MenuRow
        iconName="Facility"
        label={
          <>
            <span>Club #0001</span>
            <span>Member Services</span>
          </>
        }
        action="Change"
      />
      <MenuRow iconName="Note" label="Report issues or leave feedback" />
      <MenuRow iconName="Wrench" label="See what's new" action="v 3.5.1" />
      <MenuRow iconName="Magic" label="Supervisor sign in" />
    </div>
  );
}

function MenuRow({
  iconName,
  label,
  action,
}: {
  iconName: string;
  label: React.ReactNode;
  action?: string;
}) {
  return (
    <button
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        width: '100%',
        minHeight: 56,
        padding: '12px 18px',
        border: 0,
        borderTop: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        background: 'transparent',
        cursor: 'pointer',
        color: 'var(--ld-semantic-color-text, #2e2f32)',
        textAlign: 'left',
      }}
    >
      <Icon
        name={iconName}
        decorative
        style={{
          fontSize: 16,
          color: 'var(--ld-semantic-color-text-subtle, #74767c)',
          flexShrink: 0,
        }}
      />
      <Body as="span" size="small" style={{display: 'grid', gap: 2, flex: 1}}>
        {label}
      </Body>
      {action ? (
        <Body
          as="span"
          size="small"
          style={{textDecoration: action === 'Change' ? 'underline' : undefined, textUnderlineOffset: 2}}
        >
          {action}
        </Body>
      ) : null}
    </button>
  );
}

function AvatarMenuExample({item}: {item: typeof MENU_ITEMS[number]}) {
  return (
    <div style={{display: 'grid', justifyItems: 'center', gap: 12}}>
      <Body as="span" size="small" weight="alt" color="subtle">
        {item.label}
      </Body>
      <div style={{display: 'grid', justifyItems: 'center', gap: 'var(--ld-primitive-scale-space-100, 8px)'}}>
        <AvatarButton
          size={item.size}
          color="brand-subtle"
          aria-label="Account menu"
          aria-haspopup="menu"
          aria-expanded="true"
          onClick={() => {}}
        >
          <AvatarFallback>{item.initials}</AvatarFallback>
        </AvatarButton>
        <AccountMenuCard />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Avatar group pattern
// ---------------------------------------------------------------------------

type GroupMember = {
  name: string;
  initials: string;
  role?: string;
  org?: string;
  email?: string;
  color?: AvatarColor;
};

// Stacked groups vary the fallback color so adjacent avatars stay legible.
const GROUP_COLOR_CYCLE: AvatarColor[] = ['brand-subtle', 'neutral', 'brand'];

const GROUP_MEMBERS: GroupMember[] = [
  {name: 'Duo Xu', initials: 'DX', role: 'Product designer', org: 'Walmart', email: 'duo.xu@walmart.com'},
  {name: 'Lian Zhang', initials: 'LW', role: 'Category manager', org: 'Johnson&Johnson', email: 'lian.zhang@jnj.com'},
  {name: 'Sean Carter', initials: 'SH', role: 'Account lead', org: 'Walmart', email: 'sean.carter@walmart.com'},
  {name: 'Sophie Lee', initials: 'JJ', role: 'Buyer', org: 'Walmart', email: 'sophie.lee@walmart.com'},
  {name: 'Lisa Wu', initials: 'LW', role: 'Category manager', org: 'Johnson&Johnson', email: 'lisa.wu@jnj.com'},
  {name: 'James Park', initials: 'JP', role: 'Merchant', org: 'Walmart', email: 'james.park@walmart.com'},
  {name: 'Nina Ortiz', initials: 'NO', role: 'Supplier lead', org: 'Walmart', email: 'nina.ortiz@walmart.com'},
  {name: 'Owen Reed', initials: 'OR', role: 'Analyst', org: 'Walmart', email: 'owen.reed@walmart.com'},
];

const RING = '0 0 0 0.125rem #ffffff';
const FOCUS_RING =
  '0 0 0 0.125rem #ffffff, 0 0 0 0.25rem var(--ld-semantic-color-action-focus-outline, #0053e2)';

const popoverShellStyle: React.CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 20,
};

const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
};

function ProfileCard({member, descriptionId}: {member: GroupMember; descriptionId: string}) {
  const description = [member.name, member.role, member.org, member.email]
    .filter(Boolean)
    .join(', ');

  return (
    <div
      role="dialog"
      aria-label={`${member.name} profile`}
      style={{
        ...popoverShellStyle,
        width: 248,
        display: 'grid',
        gap: 12,
        padding: 16,
        borderRadius: 8,
        background: '#ffffff',
        border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.16)',
        boxSizing: 'border-box',
      }}
    >
      {/* Visually hidden description — read by screen readers via aria-describedby on the trigger button */}
      <span id={descriptionId} style={srOnly}>
        {description}
      </span>
      <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
        <Avatar a11yLabel={`Photo of ${member.name}`} color={member.color} size="medium">
          <AvatarFallback>{member.initials}</AvatarFallback>
        </Avatar>
        <div style={{display: 'grid', gap: 2, minWidth: 0, textAlign: 'left'}}>
          <Body as="span" size="small" weight="alt" style={{margin: 0}}>
            {member.name}
          </Body>
          {member.role ? (
            <Body as="span" size="small" color="subtle" style={{margin: 0}}>
              {member.role}
            </Body>
          ) : null}
          {member.org ? (
            <Body as="span" size="small" color="subtle" style={{margin: 0}}>
              {member.org}
            </Body>
          ) : null}
        </div>
      </div>
      {member.email ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            paddingTop: 10,
            borderTop: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
          }}
        >
          <Icon name="Email" decorative style={{fontSize: 16, color: 'var(--ld-semantic-color-text-subtle, #74767c)'}} />
          <Body as="span" size="small" color="subtle" style={{margin: 0, overflowWrap: 'anywhere'}}>
            {member.email}
          </Body>
        </div>
      ) : null}
    </div>
  );
}

function AvatarGroup({
  members,
  max = 5,
  totalCount,
  onMoreClick,
}: {
  members: GroupMember[];
  /** Maximum avatars rendered before collapsing into the More indicator. */
  max?: number;
  /** Override the real population size to simulate large counts (caps at +99). */
  totalCount?: number;
  onMoreClick?: () => void;
}) {
  // Tracks which slot's popover/tooltip is open: an avatar index, 'more', or null.
  const [active, setActive] = React.useState<number | 'more' | null>(null);
  const [focused, setFocused] = React.useState<number | 'more' | null>(null);
  const moreRef = React.useRef<HTMLButtonElement>(null);
  // Shared close timer — lets the mouse travel the 8px gap between button and popup
  // without collapsing the card. Cancelled on any mouseenter within the group slot.
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  // Tracks whether the Callout (+N) was opened by mouse hover vs keyboard/click.
  // The Callout component always calls triggerRef.current?.focus() on close (to
  // return focus after keyboard dismissal). When opened by mouse we must immediately
  // blur the trigger after that focus-return fires, otherwise a keyboard focus ring
  // appears and keyboard focus is silently stolen from wherever the user was.
  const moreOpenedByMouseRef = React.useRef(false);
  // The element that had focus before a mouse-hover opened the Callout.
  // Restored after the Callout's focus-return fires on close so focus never
  // jumps to an unexpected place (trigger button or body).
  const focusBeforeHoverRef = React.useRef<HTMLElement | null>(null);

  const scheduleClose = (slot: number | 'more') => {
    closeTimer.current = setTimeout(() => {
      setActive((prev) => (prev === slot ? null : prev));
      // After the Callout's close animation (~200ms) it calls triggerRef.focus().
      // If the slot was mouse-opened, restore the previously focused element so
      // neither the trigger ring appears nor focus resets to body.
      if (slot === 'more' && moreOpenedByMouseRef.current) {
        setTimeout(() => {
          if (document.activeElement === moreRef.current) {
            const prev = focusBeforeHoverRef.current;
            if (prev && prev !== moreRef.current && prev !== document.body) {
              prev.focus();
            } else {
              moreRef.current?.blur();
            }
          }
          // Reset the flag so a subsequent keyboard Tab to this button
          // correctly shows the focus ring.
          moreOpenedByMouseRef.current = false;
        }, 250);
      }
    }, 120);
  };

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Escape key collapses any open popup
  React.useEffect(() => {
    if (active === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [active]);

  const visible = members.slice(0, max);
  const total = totalCount ?? members.length;
  const remaining = Math.max(total - visible.length, 0);
  const moreLabel = remaining > 99 ? '+99' : `+${remaining}`;
  const includes = members
    .slice(visible.length, visible.length + 4)
    .map((m) => m.name)
    .join(', ');

  return (
    <div
      role="group"
      aria-label={`${total} collaborators`}
      style={{display: 'inline-flex', alignItems: 'center'}}
    >
      {visible.map((member, index) => {
        const open = active === index;
        const descId = `avatar-group-desc-${member.name.replace(/\s+/g, '-').toLowerCase()}-${index}`;
        return (
          <span
            key={`${member.initials}-${index}`}
            style={{position: 'relative', marginLeft: index === 0 ? 0 : -10, zIndex: open ? 10 : undefined}}
            onMouseEnter={() => { cancelClose(); setActive(index); }}
            onMouseLeave={() => scheduleClose(index)}
          >
            <button
              type="button"
              aria-label={`Photo of ${member.name}`}
              aria-describedby={open ? descId : undefined}
              onClick={() => {}}
              onFocus={() => {
                setActive(index);
                setFocused(index);
              }}
              onBlur={() => {
                setActive((prev) => (prev === index ? null : prev));
                setFocused((prev) => (prev === index ? null : prev));
              }}
              style={{
                all: 'unset',
                boxSizing: 'border-box',
                cursor: 'pointer',
                display: 'inline-flex',
                borderRadius: '50%',
                boxShadow: focused === index ? FOCUS_RING : RING,
              }}
            >
              <Avatar
                a11yLabel={`Photo of ${member.name}`}
                color={member.color ?? GROUP_COLOR_CYCLE[index % GROUP_COLOR_CYCLE.length]}
                size="medium"
              >
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
            </button>
            {open ? <ProfileCard member={member} descriptionId={descId} /> : null}
          </span>
        );
      })}

      {remaining > 0 ? (
        <span
          style={{position: 'relative', marginLeft: -10, zIndex: active === 'more' ? 10 : undefined}}
          onMouseEnter={() => { cancelClose(); moreOpenedByMouseRef.current = true; focusBeforeHoverRef.current = document.activeElement as HTMLElement | null; setActive('more'); }}
          onMouseLeave={() => scheduleClose('more')}
          // Close only when focus leaves the entire callout widget (trigger + content).
          // relatedTarget is null when focus moves to body (e.g. Escape or click outside).
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setActive((prev) => (prev === 'more' ? null : prev));
              setFocused((prev) => (prev === 'more' ? null : prev));
            }
          }}
        >
          <Callout
            // Callout renders a VisuallyHidden span with this text (the
            // "All 8 collaborators" hidden label). When open, aria-labelledby
            // on the trigger references both the trigger element and this label
            // so SR announces: "[button name] All N collaborators".
            a11yContentLabel={`All ${total} collaborators`}
            isOpen={active === 'more'}
            position="bottomCenter"
            triggerRef={moreRef}
            onClose={() => setActive(null)}
            actions={
              <CalloutLink
                onClick={() => {
                  setActive(null);
                  onMoreClick?.();
                }}
              >
                View all collaborators
              </CalloutLink>
            }
            trigger={
              <button
                ref={moreRef}
                type="button"
                // "Learn more about +3" pattern — matches the Callout reference
                // where the trigger has a concise label and the a11yContentLabel
                // appends context via aria-labelledby when expanded.
                aria-label={`Learn more about ${moreLabel}`}
                aria-expanded={active === 'more'}
                aria-haspopup="dialog"
                // Focus ring only — no auto-open on focus. The Callout's own
                // useEffect returns focus here on close; if we auto-opened on
                // focus that would create an infinite reopen trap.
                // Skip the focus ring when focus was returned programmatically
                // after a mouse-hover close (same effect as :focus-visible).
                onFocus={() => { if (!moreOpenedByMouseRef.current) setFocused('more'); }}
                onBlur={() => setFocused((prev) => (prev === 'more' ? null : prev))}
                // Open on explicit activation (click / Enter / Space).
                // Use current `active` value (closure) to avoid re-opening when
                // the Callout's wrapped onClick fires alongside onClose.
                onClick={() => { if (active !== 'more') { moreOpenedByMouseRef.current = false; setActive('more'); } }}
                style={{
                  all: 'unset',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                  borderRadius: '50%',
                  fontSize: 14,
                  fontWeight: 600,
                  background: 'var(--ld-semantic-color-field-fill-secondary, #e3e4e5)',
                  color: 'var(--ld-semantic-color-text, #2e2f32)',
                  boxShadow: focused === 'more' ? FOCUS_RING : RING,
                }}
              >
                {moreLabel}
              </button>
            }
          >
            {includes ? `Includes ${includes}.` : `${total} collaborators total.`}
          </Callout>
        </span>
      ) : null}
    </div>
  );
}

export default function AvatarPage() {
  const [size, setSize] = React.useState<typeof SIZE_ITEMS[number]['size']>('medium');
  const [shape, setShape] = React.useState<'circular' | 'square'>('circular');
  const [indicator, setIndicator] = React.useState<'none' | 'badge' | 'clock'>('none');
  const [asButton, setAsButton] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <PageWrapper
      title="Avatar"
      category="Subsystem Components"
      description="User identity display with image, initials, or icon fallback. Supports subtle blue AX surfaces, multiple sizes, shapes, indicator overlays, disabled state, and an interactive AvatarButton variant."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview avatar size, shape, indicator, disabled state, and static versus button behavior."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Size</Body>
                <ButtonGroup aria-label="Avatar size">
                  {SIZE_ITEMS.map((item) => (
                    <Button
                      key={item.size}
                      size="small"
                      variant={size === item.size ? 'primary' : 'secondary'}
                      onClick={() => setSize(item.size)}
                    >
                      {item.initials}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Shape</Body>
                <ButtonGroup aria-label="Avatar shape">
                  <Button
                    size="small"
                    variant={shape === 'circular' ? 'primary' : 'secondary'}
                    onClick={() => setShape('circular')}
                  >
                    Circular
                  </Button>
                  <Button
                    size="small"
                    variant={shape === 'square' ? 'primary' : 'secondary'}
                    onClick={() => setShape('square')}
                  >
                    Square
                  </Button>
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Indicator</Body>
                <ButtonGroup aria-label="Avatar indicator">
                  {(['none', 'badge', 'clock'] as const).map((item) => (
                    <Button
                      key={item}
                      size="small"
                      variant={indicator === item ? 'primary' : 'secondary'}
                      onClick={() => setIndicator(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <Checkbox
                label="AvatarButton"
                checked={asButton}
                onChange={(event) => setAsButton(event.target.checked)}
              />
              <Checkbox
                label="Disabled"
                checked={disabled}
                onChange={(event) => setDisabled(event.target.checked)}
              />
            </>
          }
          preview={
            <DocsCard title="Preview" description="AvatarButton keeps a larger hit target for smaller avatar sizes.">
              {asButton ? (
                <AvatarButton
                  size={size}
                  shape={shape}
                  color="brand-subtle"
                  indicator={indicator}
                  disabled={disabled}
                  aria-label="Sarah Carter"
                >
                  <AvatarFallback>SC</AvatarFallback>
                </AvatarButton>
              ) : (
                <Avatar
                  a11yLabel="Sarah Carter"
                  size={size}
                  shape={shape}
                  color="brand-subtle"
                  indicator={indicator}
                  disabled={disabled}
                >
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              )}
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Avatar group"
        description="Stacks a collection of avatars. Shows up to 5, collapses the rest into a More indicator (capped at +99), reveals a profile popover on hover/focus, and opens the full list on click."
      >
        <div style={{display: 'grid', gap: 40}}>
          <div style={{display: 'grid', gap: 14}}>
            <Body as="p" size="small" color="subtle" style={{margin: 0}}>
              Stacked group — hover or focus an avatar for the profile popover
            </Body>
            <AvatarGroup members={GROUP_MEMBERS} />
          </div>

          <div
            style={{
              display: 'grid',
              gap: 14,
              paddingTop: 24,
              borderTop: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            }}
          >
            <Body as="p" size="small" color="subtle" style={{margin: 0}}>
              More indicator — hover/focus shows guidance; click opens the full list
            </Body>
            <AvatarGroup
              members={GROUP_MEMBERS}
              onMoreClick={() => window.alert('Open the full collaborator list (e.g. sharing modal).')}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gap: 14,
              paddingTop: 24,
              borderTop: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            }}
          >
            <Body as="p" size="small" color="subtle" style={{margin: 0}}>
              Overflow — large populations cap the counter at +99
            </Body>
            <AvatarGroup members={GROUP_MEMBERS} totalCount={142} />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title="Badge and clock variants">
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48}}>
          <section>
            <ExampleTitle>Badge types</ExampleTitle>
            <div style={ROW}>
              <SubtleAvatar label="None" initials="AL" />
              <SubtleAvatar label="Badge" initials="JD" indicator="badge" />
              <SubtleAvatar label="Clock indicator" initials="MK" indicator="clock" clockState="active" />
            </div>
          </section>

          <section>
            <ExampleTitle>Clock indicator status</ExampleTitle>
            <div style={ROW}>
              <SubtleAvatar label="Clocked in" initials="MK" indicator="clock" clockState="active" />
              <SubtleAvatar label="Clocked out" initials="EM" indicator="clock" clockState="subtle" />
            </div>
          </section>
        </div>
      </ExampleSection>

      <ExampleSection title="Image type">
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))', gap: 0}}>
          <div style={{paddingRight: 32}}>
            <Body as="p" size="small" color="subtle" style={{margin: '0 0 12px'}}>
              With image
            </Body>
            <div style={ROW}>
              <Avatar a11yLabel="User image" image={{src: avatarPlaceholder, alt: 'User'}} size="medium" />
              <Avatar a11yLabel="User image" image={{src: avatarPlaceholder, alt: 'User'}} size="medium" />
            </div>
          </div>

          <div style={{padding: '0 32px', borderLeft: '1px solid var(--ld-semantic-color-separator, #e3e4e5)'}}>
            <Body as="p" size="small" color="subtle" style={{margin: '0 0 12px'}}>
              With live text initials
            </Body>
            <div style={ROW}>
              {['AB', 'CD', 'EF'].map((initials) => (
                <Avatar key={initials} a11yLabel={`Avatar ${initials}`} color="brand-subtle" size="medium">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>

          <div style={{paddingLeft: 32, borderLeft: '1px solid var(--ld-semantic-color-separator, #e3e4e5)'}}>
            <Body as="p" size="small" color="subtle" style={{margin: '0 0 12px'}}>
              With icon
            </Body>
            <div style={ROW}>
              {['first', 'second', 'third'].map((key) => (
                <Avatar key={key} a11yLabel={`${key} icon avatar`} color="brand-subtle" size="medium">
                  <AvatarFallback>
                    <Icon name="User" decorative style={{fontSize: 24}} />
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title="Sizes">
        <div style={{display: 'grid', gap: 24}}>
          {[
            {label: 'No badge', indicator: 'none' as const},
            {label: 'Badge', indicator: 'badge' as const},
            {label: 'Clock indicator', indicator: 'clock' as const},
          ].map((group, index) => (
            <div
              key={group.label}
              style={{
                borderTop: index === 0 ? undefined : '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
                paddingTop: index === 0 ? 0 : 24,
              }}
            >
              <Body as="p" size="small" color="subtle" style={{margin: '0 0 14px'}}>
                {group.label}
              </Body>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, minmax(86px, 1fr))', gap: 20, alignItems: 'end'}}>
                {SIZE_ITEMS.map((item) => (
                  <div key={item.size} style={{display: 'grid', justifyItems: 'center', gap: 12}}>
                    <Body as="span" size="small" color="subtle" style={{textAlign: 'center'}}>
                      {item.label}
                    </Body>
                    <AvatarButton
                      size={item.size}
                      color="brand-subtle"
                      indicator={group.indicator}
                      clockState="active"
                      aria-label={`${group.label} ${item.label}`}
                      onClick={() => {}}
                    >
                      <AvatarFallback>{item.initials}</AvatarFallback>
                    </AvatarButton>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="Colors"
        description="Brand, subtle brand, and neutral backgrounds for the initial / icon fallback."
      >
        <div style={ROW}>
          <Cell label="brand">
            <Avatar a11yLabel="Brand color" name="John Doe" color="brand" size="large" />
          </Cell>
          <Cell label="brand-subtle">
            <Avatar a11yLabel="Subtle blue color" name="Jane Doe" color="brand-subtle" size="large" />
          </Cell>
          <Cell label="neutral">
            <Avatar a11yLabel="Neutral color" name="Jane Smith" color="neutral" size="large" />
          </Cell>
        </div>
      </ExampleSection>

      <ExampleSection title="Shapes" description="Circular (default) and square.">
        <div style={ROW}>
          <Cell label="circular">
            <Avatar a11yLabel="Circular" name="Sam Wilson" color="brand-subtle" shape="circular" size="large" />
          </Cell>
          <Cell label="square">
            <Avatar a11yLabel="Square" name="Sam Wilson" color="brand-subtle" shape="square" size="large" />
          </Cell>
        </div>
      </ExampleSection>

      <ExampleSection
        title="AvatarButton - interactive"
        description="Wraps Avatar in a button with click handling, focus ring, and a 48px hit slot for sizes below 3rem."
      >
        <div style={ROW}>
          {SIZE_ITEMS.map((item) => (
            <Cell key={item.size} label={item.label}>
              <AvatarButton
                size={item.size}
                color="brand-subtle"
                aria-label={`Profile ${item.label}`}
                onClick={() => {}}
              >
                <AvatarFallback>{item.initials}</AvatarFallback>
              </AvatarButton>
            </Cell>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title="AvatarButton - states"
        description="Default, hover, keyboard focus, and disabled states. Sizes below 48px keep the expanded transparent hit slot."
      >
        <div style={ROW}>
          <Cell label="Default">
            <AvatarButton size="medium" color="brand-subtle" aria-label="Default profile" onClick={() => {}}>
              <AvatarFallback>DF</AvatarFallback>
            </AvatarButton>
          </Cell>
          <Cell label="Hover">
            <AvatarButton size="medium" color="brand-subtle" aria-label="Hover profile" className="ld-avatar-button--state-hover" onClick={() => {}}>
              <AvatarFallback>HV</AvatarFallback>
            </AvatarButton>
          </Cell>
          <Cell label="Focus">
            <AvatarButton size="medium" color="brand-subtle" aria-label="Focused profile" className="ld-avatar-button--state-focus" onClick={() => {}}>
              <AvatarFallback>FC</AvatarFallback>
            </AvatarButton>
          </Cell>
          <Cell label="Disabled">
            <AvatarButton size="medium" color="brand-subtle" disabled aria-label="Disabled profile">
              <AvatarFallback>DS</AvatarFallback>
            </AvatarButton>
          </Cell>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Menu"
        description="Activating the AX Avatar Button opens an account menu. The menu is offset var(--ld-primitive-scale-space-100, 8px) below the button."
      >
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 40, alignItems: 'start'}}>
          {MENU_ITEMS.map((item) => (
            <AvatarMenuExample key={item.size} item={item} />
          ))}
        </div>
      </ExampleSection>

      <ExampleSection title="AvatarButton - disabled" description="Suppresses hover/focus affordances and applies disabled tokens.">
        <div style={ROW}>
          {SIZE_ITEMS.map((item) => (
            <Cell key={item.size} label={item.label}>
              <AvatarButton
                size={item.size}
                color="brand-subtle"
                disabled
                aria-label={`Disabled ${item.label}`}
              >
                <AvatarFallback>{item.initials}</AvatarFallback>
              </AvatarButton>
            </Cell>
          ))}
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Avatar to identify people, teams, or accounts. Provide an accessible label, prefer initials when photos are unavailable, and use AvatarButton only when activating the avatar opens account or profile actions."
        defaultValue="size='medium', shape='circular', color='brand'"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility — popups and tooltips</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            When an avatar triggers a popup, choose the pattern based on whether the popup contains interactive elements:
          </Body>
          <ul style={{margin: '8px 0 0', paddingLeft: 20, display: 'grid', gap: 6}}>
            <li>
              <Body as="span" size="medium" color="subtle">
                <strong>Non-interactive popup</strong> (name, role, org — read-only): use <code>aria-describedby</code> pointing to a visually hidden string inside the popup. The trigger button stays focused; screen readers announce the description automatically. Do not give the popup card a tab stop.
              </Body>
            </li>
            <li>
              <Body as="span" size="medium" color="subtle">
                <strong>Interactive popup</strong> (links, buttons): the interactive element must be next in DOM order after the trigger so Tab moves into it naturally. Never close the popup on the trigger's <code>onBlur</code> — instead, detect when focus leaves the entire widget using <code>relatedTarget</code> on the wrapper's <code>onBlur</code>.
              </Body>
            </li>
          </ul>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
