import * as React from 'react';
import {Body} from '@/living-design/components/Text/Text';
import {TimerView} from '@/living-design/components/TimerView/TimerView';
import {QueueCard} from '@/living-design/patterns/QueueCard/QueueCard';
import {QueueBanner} from '@/living-design/patterns/QueueBanner/QueueBanner';
import {QueueLanding} from '@/living-design/patterns/QueueLanding/QueueLanding';
import {PRODUCT_IMAGES} from '@/living-design/common/productImages';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

/* ── Demo data ─────────────────────────────────────────────── */

const DEMO_PRODUCT = {
  image: PRODUCT_IMAGES.tablet,
  description: 'Product description text name that wraps',
  price: '$499.90',
  originalPrice: '$600.00',
};

const LANDING_PRODUCT = {
  image: PRODUCT_IMAGES.headphones,
  description: 'Item description that can wrap to multiple lines',
  price: '$499.99',
  originalPrice: '$600.00',
};

/** Minutes from now → Date */
function fromNow(minutes: number) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

/* ── Helpers ───────────────────────────────────────────────── */

function DemoCard({label, dark, children}: {label: string; dark?: boolean; children: React.ReactNode}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '24px',
      background: dark ? '#002E99' : '#F7F8FA',
      borderRadius: '8px',
      border: '1px solid #E6E6E8',
    }}>
      <Body
        as="span"
        size="small"
        weight="alt"
        UNSAFE_style={{
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: dark ? 'var(--ld-semantic-color-text-inverse, #fff)' : 'var(--ld-semantic-color-text-subtle, #515357)',
        }}
      >
        {label}
      </Body>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {children}
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default function QueuePatternsPage() {
  // Stable end-times computed once on mount
  const endTimes = React.useMemo(() => ({
    waiting: fromNow(57),
    warning: fromNow(8),
    expiring: fromNow(1),
    landing: fromNow(59),
  }), []);

  return (
    <PageWrapper
      title="Queue"
      category="WCP Patterns"
      description="Queue components for managing reservation flows, waiting rooms, and checkout countdowns. Includes Timer View, Queue Card, Queue Banner, and Queue Landing."
    >
      {/* ── Timer View ───────────────────────────────────────── */}
      <ExampleSection
        title="Timer View"
        description="Urgency-colored timer pill displaying countdown time. Three variants based on urgency level: waiting (blue), warning (yellow), and expiring (red). Variant auto-resolves from remaining time."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          <DemoCard label="Waiting (Blue)">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <TimerView endTime={endTimes.waiting} />
              <Body as="span" size="small" color="subtle">estimated wait</Body>
            </div>
          </DemoCard>
          <DemoCard label="Warning (Yellow)">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <TimerView endTime={endTimes.warning} />
              <Body as="span" size="small" color="subtle">left to buy</Body>
            </div>
          </DemoCard>
          <DemoCard label="Expiring (Red)">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <TimerView endTime={endTimes.expiring} />
              <Body as="span" size="small" color="subtle">left to buy</Body>
            </div>
          </DemoCard>
        </div>
      </ExampleSection>

      {/* ── Queue Card ───────────────────────────────────────── */}
      <ExampleSection
        title="Queue Card"
        description="Compact product card with timer pill, product thumbnail, description, and pricing. Used inside queue landing pages and modals."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          <DemoCard label="Line Joined (Waiting)">
            <QueueCard
              image={DEMO_PRODUCT.image}
              description={DEMO_PRODUCT.description}
              price={DEMO_PRODUCT.price}
              originalPrice={DEMO_PRODUCT.originalPrice}
              endTime={endTimes.waiting}
            />
          </DemoCard>
          <DemoCard label="Warning">
            <QueueCard
              image={DEMO_PRODUCT.image}
              description={DEMO_PRODUCT.description}
              price={DEMO_PRODUCT.price}
              originalPrice={DEMO_PRODUCT.originalPrice}
              endTime={endTimes.warning}
            />
          </DemoCard>
          <DemoCard label="Expiring">
            <QueueCard
              image={DEMO_PRODUCT.image}
              description={DEMO_PRODUCT.description}
              price={DEMO_PRODUCT.price}
              originalPrice={DEMO_PRODUCT.originalPrice}
              endTime={endTimes.expiring}
            />
          </DemoCard>
        </div>
      </ExampleSection>

      {/* ── Queue Banner ─────────────────────────────────────── */}
      <ExampleSection
        title="Queue Banner"
        description="Sticky banner shown during queue flows. Supports four variants: lineJoined (with snackbar), warning, checkout, and error."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <DemoCard label="Line Joined">
            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #E6E6E8' }}>
              <QueueBanner
                variant="lineJoined"
                endTime={endTimes.landing}
                message="reservation text"
                snackbarText="Declarative title or body"
                productImage={DEMO_PRODUCT.image}
                onView={() => {}}
                onLeave={() => {}}
                onAction={() => {}}
              />
            </div>
          </DemoCard>
          <DemoCard label="Warning">
            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #E6E6E8' }}>
              <QueueBanner
                variant="warning"
                endTime={endTimes.warning}
                message="reservation text"
                snackbarText="Declarative title or body"
                productImage={DEMO_PRODUCT.image}
                onView={() => {}}
                onLeave={() => {}}
                onAction={() => {}}
              />
            </div>
          </DemoCard>
          <DemoCard label="Checkout">
            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #E6E6E8' }}>
              <QueueBanner
                variant="checkout"
                endTime={endTimes.expiring}
                message="queue messaging"
                onClose={() => {}}
              />
            </div>
          </DemoCard>
          <DemoCard label="Error">
            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #E6E6E8' }}>
              <QueueBanner
                variant="error"
                message="Hang on, we're getting you in line. Please don't refresh or leave the line."
              />
            </div>
          </DemoCard>
        </div>
      </ExampleSection>

      {/* ── Queue Landing ────────────────────────────────────── */}
      <ExampleSection
        title="Queue Landing"
        description="Full-page queue waiting room content. Authenticated variant shows hourglass illustration with estimated wait timer. Unauthenticated variant shows sign-in CTA with product card."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          <DemoCard label="Authenticated" dark>
            <div style={{ maxWidth: '468px' }}>
              <QueueLanding
                variant="authenticated"
                product={LANDING_PRODUCT}
                endTime={endTimes.landing}
              />
            </div>
          </DemoCard>
          <DemoCard label="Unauthenticated" dark>
            <div style={{ maxWidth: '468px' }}>
              <QueueLanding
                variant="unauthenticated"
                product={LANDING_PRODUCT}
                onSignIn={() => {}}
              />
            </div>
          </DemoCard>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Queue patterns for reservation and waiting-room flows where timing is critical. Keep countdowns live, pair warnings with clear recovery actions, and do not ask users to refresh or leave the queue once a reservation is active."
        defaultValue="timer urgency resolves from remaining time"
      />
    </PageWrapper>
  );
}
