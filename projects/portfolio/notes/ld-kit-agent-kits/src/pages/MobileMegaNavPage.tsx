import * as React from 'react';

import {MegaNavActionButton} from '../patterns/MegaNavActionButton';
import {MobileMenuPanel} from '../patterns/MobileMenuPanel';
import {Button} from '../components/Button';
import {Icon} from '../components/Icons';
import {SidekickLogoIcon} from '../common/icons';

import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const MenuIcon = ({name}: {name: string}) => (
  <Icon name={name} decorative size="medium" />
);


const actionTiles = [
  {id: 'sidekick', label: 'Sidekick', icon: <SidekickLogoIcon size={24} />},
  {id: 'scan', label: 'Scan item', icon: <MenuIcon name="Barcode" />},
  {id: 'notes', label: 'Notes', icon: <MenuIcon name="Note" />},
];

const sections = [
  {
    id: 'me',
    label: 'Me',
    icon: <MenuIcon name="User" />,
    title: 'Me',
    links: [
      {label: 'For you'},
      {label: 'Calls'},
      {label: 'Full schedule'},
      {label: 'Inbox'},
      {label: 'Your team'},
      {label: 'Time off requests'},
      {label: 'Translator', external: true},
      {label: 'My performance tracker'},
    ],
  },
  {
    id: 'inv',
    label: 'Inventory',
    icon: <MenuIcon name="Box" />,
    title: 'Availability',
    links: [
      {label: 'Aisle locations'},
      {label: 'Features'},
      {label: 'Item information'},
      {label: 'Manager approvals'},
      {label: 'Modulars'},
      {label: 'Pinpoint'},
      {label: 'Price changes'},
      {label: 'Receiving'},
      {label: 'RFID scanning'},
      {label: 'Shelf availability'},
      {label: 'Topstock'},
      {label: 'VizPick'},
    ],
  },
  {
    id: 'checkout',
    label: 'Checkout\n& returns',
    icon: <MenuIcon name="Receipt" />,
    title: 'Checkouts & returns',
    links: [
      {label: 'Checkout'},
      {label: 'Receipt check'},
      {label: 'Returns'},
    ],
  },
  {
    id: 'facility',
    label: 'Facility\nmanagement',
    icon: <MenuIcon name="Facility" />,
    title: 'Facility management',
    links: [
      {label: 'Overview'},
      {label: 'Report an issue'},
      {label: 'Needs attention'},
      {label: 'Refrigeration alarms'},
      {label: 'Issues'},
      {label: 'Global issues'},
      {label: 'Schedule services'},
      {label: 'Shop GNRF', external: true},
      {label: 'Digital key'},
    ],
  },
];

const footerLinks = [
  {label: 'Give app feedback'},
  {label: 'Share an idea or concern', external: true},
  {label: 'Settings'},
  {label: "What's new"},
];

export default function MobileMegaNavPage() {
  const [open, setOpen] = React.useState(false);
  return (
    <PageWrapper
      title="Mobile Mega Nav"
      category="AX Patterns"
      description="Full-height left-anchored mobile drawer with a dark action header, left-side section selector, and scrollable right-side link list."
    >
      <ExampleSection
        title="Component Configuration"
        description="Vertical icon-over-label action tile used by the mobile menu panel action header."
      >
        <div
          style={{
            display: 'flex',
            background: 'var(--ld-semantic-color-topnav-fill, #0a1f5c)',
            padding: 12,
            borderRadius: 8,
            gap: 12,
            maxWidth: 320,
          }}
        >
          <MegaNavActionButton icon={<SidekickLogoIcon size={24} />} label="Sidekick" />
          <MegaNavActionButton icon={<MenuIcon name="Barcode" />} label="Scan item" />
          <MegaNavActionButton icon={<MenuIcon name="Note" />} label="Notes" />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Mega Nav"
        description="Open-state preview of the full mobile mega-nav pattern. Section tabs remain interactive."
      >
        <MobileMenuPanel
          isOpen
          isInlinePreview
          onClose={() => {}}
          clockLabel="Time clock"
          actionTiles={actionTiles}
          sections={sections}
          footerLinks={footerLinks}
        />
      </ExampleSection>

      <ExampleSection
        title="Interactive overlay"
        description="Click `Open menu` to slide the panel in. Pass sections, action tiles, and footer links via props."
      >
        <Button onClick={() => setOpen(true)}>Open menu</Button>
        <MobileMenuPanel
          isOpen={open}
          onClose={() => setOpen(false)}
          clockLabel="Time clock"
          actionTiles={actionTiles}
          sections={sections}
          footerLinks={footerLinks}
        />
      </ExampleSection>

      <GuidelinesSection
        description="Use Mobile Mega Nav for dense associate app navigation on mobile. Keep action tiles limited to the highest-frequency tasks, preserve the left section selector, and keep footer links secondary to work navigation."
        defaultValue="isOpen=false, isInlinePreview=false"
      />
    </PageWrapper>
  );
}
