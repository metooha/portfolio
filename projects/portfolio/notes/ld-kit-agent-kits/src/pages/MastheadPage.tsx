import * as React from 'react';

import {Masthead} from '../components/Masthead/Masthead';
import {Avatar} from '../components/Avatar/Avatar';
import {Body} from '../components/Text/Text';
import {SegmentedControl} from '../components/SegmentedControl/SegmentedControl';
import {Switch} from '../components/Switch/Switch';
import {LanguageSelector} from '../components/LanguageSelector/LanguageSelector';
import {
  DocsCard,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
  docsCardStyle,
} from './shared';

type LeftIdentity = 'name' | 'logo' | 'avatar';

const LEFT_IDENTITY_ITEMS = [
  {value: 'name', label: 'App name'},
  {value: 'logo', label: 'Logo'},
  {value: 'avatar', label: 'Avatar'},
] as const;

const stackStyle: React.CSSProperties = {
  display: 'grid',
  gap: 24,
};

const previewFrameStyle: React.CSSProperties = {
  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  borderRadius: 8,
  background: 'var(--ld-semantic-color-surface, #ffffff)',
  width: '100%',
  minWidth: 0,
};

const controlRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  rowGap: 12,
  flexWrap: 'wrap',
};

export default function MastheadPage() {
  const [showNotif, setShowNotif] = React.useState(true);
  const [notifDot, setNotifDot] = React.useState(true);
  const [showHelp, setShowHelp] = React.useState(true);
  const [showAccount, setShowAccount] = React.useState(false);
  const [showAccountAvatar, setShowAccountAvatar] = React.useState(true);
  const [showLanguage, setShowLanguage] = React.useState(true);
  const [showCenterSlot, setShowCenterSlot] = React.useState(false);
  const [leftIdentity, setLeftIdentity] = React.useState<LeftIdentity>('name');
  const [lang, setLang] = React.useState('en');

  const leftIdentityNodes: Record<LeftIdentity, {appName?: string; appLogo?: React.ReactNode}> = {
    name: {appName: 'Walmart Living Design'},
    logo: {
      appName: 'Walmart Living Design',
      appLogo: (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--ld-semantic-color-text-brand, #0053e2)',
            fontWeight: 700,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: 'var(--ld-semantic-color-fill-brand, #0053e2)',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            L
          </span>
          Living Design
        </span>
      ),
    },
    avatar: {
      appLogo: (
        <span style={{display: 'inline-flex', alignItems: 'center', gap: 10}}>
          <Avatar name="Living Design" size="small" a11yLabel="Living Design workspace" />
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--ld-semantic-color-text-brand, #0053e2)',
            }}
          >
            Living Design
          </span>
        </span>
      ),
    },
  };
  const leftIdentityProps = leftIdentityNodes[leftIdentity];

  const accountAvatar = showAccountAvatar ? (
    <button
      type="button"
      aria-label="Account"
      onClick={() => undefined}
      style={{
        border: 'none',
        background: 'transparent',
        padding: 0,
        cursor: 'pointer',
        borderRadius: '50%',
      }}
    >
      <Avatar name="Jane Doe" size="small" a11yLabel="Jane Doe" />
    </button>
  ) : null;

  return (
    <PageWrapper
      title="Masthead"
      category="Core Components"
      description="Top-of-app header bar. Renders an app name or logo on the left and an optional set of icon buttons on the right, with content slots for custom workspace switchers, language pickers, or other chrome."
    >
      <ExampleSection
        title="Component Configuration"
        description="Toggle the built-in actions and slots to see how the Masthead composes."
      >
        <div style={stackStyle}>
          <div style={{...docsCardStyle, gap: 16, padding: 20, overflow: 'visible'}}>
            <div style={controlRowStyle}>
              <Switch
                isOn={showNotif}
                onClick={() => setShowNotif((v) => !v)}
                label="Notification button"
                size="small"
              />
              <Switch
                isOn={notifDot}
                onClick={() => setNotifDot((v) => !v)}
                label="Notification dot"
                size="small"
                disabled={!showNotif}
              />
              <Switch
                isOn={showHelp}
                onClick={() => setShowHelp((v) => !v)}
                label="Help button"
                size="small"
              />
              <Switch
                isOn={showAccount}
                onClick={() => {
                  setShowAccount((v) => !v);
                  if (!showAccount) setShowAccountAvatar(false);
                }}
                label="Account icon"
                size="small"
              />
              <Switch
                isOn={showAccountAvatar}
                onClick={() => {
                  setShowAccountAvatar((v) => !v);
                  if (!showAccountAvatar) setShowAccount(false);
                }}
                label="Account avatar"
                size="small"
              />
              <Switch
                isOn={showLanguage}
                onClick={() => setShowLanguage((v) => !v)}
                label="Language selector"
                size="small"
              />
              <Switch
                isOn={showCenterSlot}
                onClick={() => setShowCenterSlot((v) => !v)}
                label="Workspace switcher"
                size="small"
              />
            </div>
            <div style={{...controlRowStyle, gap: 12}}>
              <Body as="span" size="small" color="subtle" id="left-identity-label">
                Left identity:
              </Body>
              <SegmentedControl
                aria-label="Left identity"
                items={[...LEFT_IDENTITY_ITEMS]}
                value={leftIdentity}
                onChange={(value) => setLeftIdentity(value as LeftIdentity)}
              />
            </div>
          </div>
          <DocsCard title="Live Masthead" description="Renders inside this card; in production the bar sits flush at the top of the viewport.">
            <div style={previewFrameStyle}>
              <Masthead
                {...leftIdentityProps}
                centerSlot={
                  showCenterSlot ? (
                    <Body as="span" size="small" color="subtle">Dashboard · Production</Body>
                  ) : undefined
                }
                rightSlot={
                  <>
                    {showLanguage ? (
                      <LanguageSelector value={lang} onChange={setLang} />
                    ) : null}
                    {accountAvatar}
                  </>
                }
                onNotificationClick={showNotif ? () => undefined : undefined}
                notificationDot={notifDot}
                onHelpClick={showHelp ? () => undefined : undefined}
                onAccountClick={showAccount ? () => undefined : undefined}
              />
            </div>
          </DocsCard>
        </div>
      </ExampleSection>

      <ExampleSection title="Variants" description="Common shapes the Masthead takes in different apps.">
        <div style={stackStyle}>
          <DocsCard title="App name only" description="Minimal — no actions, no slots.">
            <div style={previewFrameStyle}>
              <Masthead appName="My App" />
            </div>
          </DocsCard>

          <DocsCard title="With all built-in actions" description="Notification (with dot), help, and account buttons.">
            <div style={previewFrameStyle}>
              <Masthead
                appName="Living Design"
                onNotificationClick={() => undefined}
                notificationDot
                onHelpClick={() => undefined}
                onAccountClick={() => undefined}
              />
            </div>
          </DocsCard>

          <DocsCard title="With centerSlot" description="Workspace label or breadcrumb in the middle.">
            <div style={previewFrameStyle}>
              <Masthead
                appName="Living Design"
                centerSlot={<Body as="span" size="small" color="subtle">Dashboard · Production</Body>}
                onAccountClick={() => undefined}
              />
            </div>
          </DocsCard>

          <DocsCard title="With rightSlot" description="Drop a LanguageSelector or other custom controls before the action icons.">
            <div style={previewFrameStyle}>
              <Masthead
                appName="Living Design"
                rightSlot={<LanguageSelector />}
                onNotificationClick={() => undefined}
                onAccountClick={() => undefined}
              />
            </div>
          </DocsCard>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Masthead as the persistent top bar across an app. Keep the left side for identity (logo, app name, app switcher) and the right side for global affordances (notifications, help, account). Use centerSlot sparingly — only when a workspace, environment, or breadcrumb truly belongs at app-shell scope. Built-in action buttons render only when their click handler prop is supplied, so omit handlers you don't need rather than passing no-ops."
        defaultValue='<Masthead appName="..." />'
      />
    </PageWrapper>
  );
}
