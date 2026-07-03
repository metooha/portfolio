import * as React from 'react';

import {A11yAnnouncementProvider} from '@/living-design/components/A11yAnnouncement';
import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {CartIcon, GiftIcon} from '@/living-design/components/Icons/Icons';
import {
  RichSnackbar,
  RichSnackbarContainer,
  type RichSnackbarColor,
  type RichSnackbarContentVariant,
  useWCPRichSnackbar,
} from '@/living-design/components/RichSnackbar/RichSnackbar';
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

const COLORS: RichSnackbarColor[] = ['primary', 'secondary', 'inverse', 'brand'];
const CONTENT_VARIANTS: RichSnackbarContentVariant[] = ['left-regular', 'left-bold', 'center-regular', 'center-bold'];

function IconLeading({color}: {color: RichSnackbarColor}) {
  const isDark = color === 'inverse' || color === 'brand';
  const iconColor = isDark
    ? 'var(--ld-semantic-color-text-inverse, #ffffff)'
    : color === 'primary'
      ? 'var(--ld-semantic-color-text-accent-blue-bold, #002e99)'
      : 'var(--ld-semantic-color-text, #2e2f32)';
  return <CartIcon size="medium" style={{color: iconColor}} />;
}

function SpotLeading() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 999,
        background: 'var(--ld-semantic-color-fill-brand-subtle, #ebf0ff)',
        flexShrink: 0,
      }}
    >
      <GiftIcon size="medium" style={{color: 'var(--ld-semantic-color-action-fill-primary, #0071dc)'}} />
    </div>
  );
}

function AvatarLeading() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 999,
        background: 'var(--ld-semantic-color-fill-accent-gray, #74767c)',
        color: 'var(--ld-semantic-color-text-inverse, #ffffff)',
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      AB
    </div>
  );
}

function MediaLeading() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--ld-semantic-color-fill-brand-subtle, #ebf0ff)',
        flexShrink: 0,
      }}
    >
      <Illustration type="mono-large" name="PetsDogs" size={32} title="" />
    </div>
  );
}

function RichSnackbarPageInner() {
  const {show, dismiss} = useWCPRichSnackbar();
  const [color, setColor] = React.useState<RichSnackbarColor>('primary');
  const [contentVariant, setContentVariant] = React.useState<RichSnackbarContentVariant>('left-regular');
  const [leading, setLeading] = React.useState<'icon' | 'spot' | 'avatar' | 'media' | 'none'>('icon');
  const [showAction, setShowAction] = React.useState(true);
  const [showClose, setShowClose] = React.useState(true);

  const leadingSlot =
    leading === 'icon' ? <IconLeading color={color} /> :
    leading === 'spot' ? <SpotLeading /> :
    leading === 'avatar' ? <AvatarLeading /> :
    leading === 'media' ? <MediaLeading /> : undefined;

  return (
    <PageWrapper
      title="Rich Snackbar"
      category="WCP Components"
      description="Transient feedback messages with optional media, color variants, alignment, action links, and close affordances."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview inline rich snackbar color, copy alignment, media slot, and trailing actions."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Color</Body>
                <ButtonGroup aria-label="Rich snackbar color">
                  {COLORS.map((item) => (
                    <Button key={item} size="small" variant={color === item ? 'primary' : 'secondary'} onClick={() => setColor(item)}>{item}</Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Content</Body>
                <ButtonGroup aria-label="Rich snackbar content variant">
                  {CONTENT_VARIANTS.map((item) => (
                    <Button key={item} size="small" variant={contentVariant === item ? 'primary' : 'secondary'} onClick={() => setContentVariant(item)}>{item}</Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Leading</Body>
                <ButtonGroup aria-label="Rich snackbar leading slot">
                  {(['icon', 'spot', 'avatar', 'media', 'none'] as const).map((item) => (
                    <Button key={item} size="small" variant={leading === item ? 'primary' : 'secondary'} onClick={() => setLeading(item)}>{item}</Button>
                  ))}
                </ButtonGroup>
              </div>
              <ButtonGroup aria-label="Rich snackbar trailing">
                <Button size="small" variant={showAction ? 'primary' : 'secondary'} onClick={() => setShowAction((value) => !value)}>Action</Button>
                <Button size="small" variant={showClose ? 'primary' : 'secondary'} onClick={() => setShowClose((value) => !value)}>Close</Button>
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard title="Preview" description="Inline mode keeps the snackbar visible for documentation comparison.">
              <RichSnackbar
                inline
                color={color}
                contentVariant={contentVariant}
                leadingSlot={leadingSlot}
                message="Nice find! You're saving $30 for your pup's first birthday."
                actionLabel={showAction ? 'View cart' : undefined}
                onClose={showClose ? () => {} : undefined}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Snackbar Patterns"
        description="Use variants to match the message surface and the amount of visual context needed."
      >
        <DocsGrid>
          {COLORS.map((item) => (
            <DocsCard
              key={item}
              title={item}
              description={item === 'inverse' || item === 'brand' ? 'Shown on a dark preview surface.' : undefined}
              onDark={item === 'inverse' || item === 'brand'}
              style={
                item === 'inverse' || item === 'brand'
                  ? {background: 'var(--ld-semantic-color-fill-brand-bold, #001e60)'}
                  : undefined
              }
            >
              <RichSnackbar
                inline
                color={item}
                leadingSlot={<IconLeading color={item} />}
                message="Declarative title or body"
                actionLabel="Action"
                onClose={() => {}}
              />
            </DocsCard>
          ))}
          <DocsCard title="Live container" description="Trigger the positioned snackbar container and dismiss it manually.">
            <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
              <Button
                variant="primary"
                onClick={() => show({color, contentVariant, leadingSlot, message: "Nice find! You're saving $30.", actionLabel: 'View cart', duration: 4000})}
              >
                Show snackbar
              </Button>
              <Button variant="secondary" onClick={dismiss}>Dismiss</Button>
            </div>
            <RichSnackbarContainer />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Leading Media"
        description="The leading slot accepts an icon, a spot icon, an avatar, or richer media such as an illustration."
      >
        <DocsGrid>
          <DocsCard title="Icon" description="A single decorative icon.">
            <RichSnackbar
              inline
              color="primary"
              leadingSlot={<IconLeading color="primary" />}
              message="Nice find! You're saving $30 for your pup's first birthday."
              actionLabel="View cart"
              onClose={() => {}}
            />
          </DocsCard>
          <DocsCard title="Spot" description="An icon on a circular tinted surface.">
            <RichSnackbar
              inline
              color="primary"
              leadingSlot={<SpotLeading />}
              message="Nice find! You're saving $30 for your pup's first birthday."
              actionLabel="View cart"
              onClose={() => {}}
            />
          </DocsCard>
          <DocsCard title="Avatar" description="A person or entity initials avatar.">
            <RichSnackbar
              inline
              color="primary"
              leadingSlot={<AvatarLeading />}
              message="Nice find! You're saving $30 for your pup's first birthday."
              actionLabel="View cart"
              onClose={() => {}}
            />
          </DocsCard>
          <DocsCard title="Media" description="A Living Design illustration as richer visual context.">
            <RichSnackbar
              inline
              color="primary"
              leadingSlot={<MediaLeading />}
              message="Nice find! You're saving $30 for your pup's first birthday."
              actionLabel="View cart"
              onClose={() => {}}
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Rich Snackbar for non-critical feedback that benefits from a visual cue. Keep messages short, make leading media decorative, and include a close button when the message can obscure important controls."
        defaultValue="color='primary', contentVariant='left-regular', duration=4000"
      />
    </PageWrapper>
  );
}

export default function RichSnackbarPage() {
  return (
    <A11yAnnouncementProvider>
      <RichSnackbarPageInner />
    </A11yAnnouncementProvider>
  );
}
