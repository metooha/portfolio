import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button';
import {Body} from '@/app/components/Text/Text';
import {
  RichMediaSheet,
  RichMediaSheetHeaderVariant,
  RichMediaSheetSurfaceVariant,
} from '@/app/components/RichMediaSheet/RichMediaSheet';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const HEADER_VARIANTS: RichMediaSheetHeaderVariant[] = ['title', 'title-subtitle', 'logo-left', 'logo-center', 'inverse', 'none'];
const SURFACE_VARIANTS: RichMediaSheetSurfaceVariant[] = ['default', 'brand', 'brand-bold', 'media'];

function ImagePlaceholder({height = 160, label = 'Image'}: {height?: number; label?: string}) {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height,
        background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
      }}
    >
      <Body as="span" size="small" color="subtle">{label}</Body>
    </div>
  );
}

function PlaceholderLogo() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        width: 88,
        height: 28,
        borderRadius: 4,
        background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
      }}
    >
      <Body as="span" size="small" color="subtle">Logo</Body>
    </div>
  );
}

function ContentSlot() {
  return (
    <div style={{padding: 24}}>
      <div
        style={{
          display: 'grid',
          gap: 12,
          placeItems: 'center',
          minHeight: 180,
          border: '2px dashed #f5a0b0',
          borderRadius: 8,
          background: '#fff8f9',
        }}
      >
        <Body as="span" size="small" weight="alt" style={{color: '#c0435e'}}>Content slot</Body>
      </div>
    </div>
  );
}

function DeliveryContent() {
  return (
    <div style={{display: 'grid', gap: 20, padding: '0 24px 24px'}}>
      <ImagePlaceholder height={180} label="Delivery illustration" />
      <Body
        as="h3"
        size="large"
        weight="alt"
        style={{margin: 0, textAlign: 'center', color: 'var(--ld-semantic-color-fill-brand-bold, #001e60)'}}
      >
        Great news! We expanded delivery to your area.
      </Body>
      <div
        style={{
          display: 'grid',
          gap: 4,
          padding: 16,
          borderRadius: 8,
          background: 'var(--ld-semantic-color-fill-accent-yellow-subtle, #fff8dc)',
        }}
      >
        <Body as="p" size="small" weight="alt" style={{margin: 0}}>You can get free delivery with Walmart+</Body>
        <Body as="p" size="small" style={{margin: 0}}>Start your 30-day free trial</Body>
      </div>
    </div>
  );
}

export default function RichMediaSheetPage() {
  const [openDemo, setOpenDemo] = React.useState<string | null>(null);
  const [headerVariant, setHeaderVariant] = React.useState<RichMediaSheetHeaderVariant>('title');
  const [surfaceVariant, setSurfaceVariant] = React.useState<RichMediaSheetSurfaceVariant>('default');
  const [adjustHeight, setAdjustHeight] = React.useState<'content' | 'fixed'>('content');

  const logoSlot =
    headerVariant === 'logo-left' || headerVariant === 'logo-center' ? <PlaceholderLogo /> : undefined;

  return (
    <PageWrapper
      title="Rich Media Sheet"
      category="WCP Components"
      description="Slot-driven bottom sheets for media-rich moments with configurable headers, branded surfaces, and footer actions."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview header chrome, surface color, content height, and footer actions in a live sheet."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Header</Body>
                <ButtonGroup aria-label="Rich media sheet header">
                  {HEADER_VARIANTS.map((item) => (
                    <Button key={item} size="small" variant={headerVariant === item ? 'primary' : 'secondary'} onClick={() => setHeaderVariant(item)}>{item}</Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Surface</Body>
                <ButtonGroup aria-label="Rich media sheet surface">
                  {SURFACE_VARIANTS.map((item) => (
                    <Button key={item} size="small" variant={surfaceVariant === item ? 'primary' : 'secondary'} onClick={() => setSurfaceVariant(item)}>{item}</Button>
                  ))}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Height</Body>
                <ButtonGroup aria-label="Rich media sheet height">
                  <Button size="small" variant={adjustHeight === 'content' ? 'primary' : 'secondary'} onClick={() => setAdjustHeight('content')}>Content</Button>
                  <Button size="small" variant={adjustHeight === 'fixed' ? 'primary' : 'secondary'} onClick={() => setAdjustHeight('fixed')}>Fixed</Button>
                </ButtonGroup>
              </div>
              <Button variant="primary" onClick={() => setOpenDemo('config')}>Open configured sheet</Button>
            </>
          }
          preview={
            <DocsCard title="Preview" description="Open the sheet to inspect the selected chrome and surface treatment.">
              <ContentSlot />
            </DocsCard>
          }
        />
      </ExampleSection>

      <RichMediaSheet
        isOpen={openDemo === 'config'}
        onClose={() => setOpenDemo(null)}
        headerVariant={headerVariant}
        title="Rich Media Sheet title"
        subtitle="Supporting subtitle text."
        logoSlot={logoSlot}
        surfaceVariant={headerVariant === 'inverse' ? 'default' : surfaceVariant}
        adjustHeight={adjustHeight}
        actions={<Button variant={surfaceVariant === 'brand-bold' ? 'secondary' : 'primary'} size="medium" isFullWidth>Button label</Button>}
      >
        <ContentSlot />
      </RichMediaSheet>

      <ExampleSection title="Sheet Patterns" description="Use header and surface variants to match the surrounding brand moment and content density.">
        <DocsGrid>
          <DocsCard title="Logo header" description="Use logo headers when partner or product branding is the primary identifier.">
            <Button variant="secondary" size="small" onClick={() => setOpenDemo('logo')}>Open logo sheet</Button>
          </DocsCard>
          <DocsCard title="Delivery expansion" description="Use no-title chrome when the content itself owns the headline and hero media.">
            <Button variant="secondary" size="small" onClick={() => setOpenDemo('delivery')}>Open delivery sheet</Button>
          </DocsCard>
          <DocsCard title="Brand surface" description="Use brand surfaces for light promotional or task-focused moments.">
            <Button variant="secondary" size="small" onClick={() => setOpenDemo('brand')}>Open brand sheet</Button>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <RichMediaSheet
        isOpen={openDemo === 'logo'}
        onClose={() => setOpenDemo(null)}
        headerVariant="logo-left"
        logoSlot={<PlaceholderLogo />}
        actions={<Button variant="primary" isFullWidth>Continue</Button>}
      >
        <ImagePlaceholder height={220} label="One Pay hero" />
        <div style={{display: 'grid', gap: 12, padding: 24}}>
          <Body as="h3" size="large" weight="alt" style={{margin: 0}}>One Pay is the best way to shop at Walmart</Body>
          <Body as="p" size="small" style={{margin: 0}}>Load cards, check out online or in store, and earn cash back deals.</Body>
        </div>
      </RichMediaSheet>

      <RichMediaSheet
        isOpen={openDemo === 'delivery'}
        onClose={() => setOpenDemo(null)}
        headerVariant="none"
        actions={<Button variant="primary" isFullWidth>Start free trial</Button>}
      >
        <DeliveryContent />
      </RichMediaSheet>

      <RichMediaSheet
        isOpen={openDemo === 'brand'}
        onClose={() => setOpenDemo(null)}
        headerVariant="title-subtitle"
        title="Up next"
        subtitle="Stock grocery"
        surfaceVariant="brand"
      >
        <div style={{display: 'grid', gap: 12, padding: '16px 24px 24px'}}>
          <Body as="h3" size="large" weight="alt" style={{margin: 0}}>Stock aisle A5</Body>
          <Body as="p" size="small" style={{margin: 0}}>3h 44m estimated work across 313 cases.</Body>
          <Button variant="primary" isFullWidth>View details</Button>
        </div>
      </RichMediaSheet>

      <GuidelinesSection
        description="Use Rich Media Sheet for temporary, media-led tasks that should not navigate away from the current page. Keep header variants intentional, include a close control, and reserve fixed height for content that needs internal scrolling."
        defaultValue="headerVariant='title', surfaceVariant='default', adjustHeight='content'"
      />
    </PageWrapper>
  );
}
