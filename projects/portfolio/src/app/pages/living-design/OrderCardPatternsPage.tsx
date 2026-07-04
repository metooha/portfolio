import { useState } from 'react';
import {OrderCard} from '@/living-design/patterns/OrderCard/OrderCard';
import {ActiveCurbsideCard} from '@/living-design/patterns/ActiveCurbsideCard/ActiveCurbsideCard';
import {CombinedOrderCard} from '@/living-design/patterns/CombinedOrderCard/CombinedOrderCard';
import {ServicesCard, type ServiceEntry} from '@/living-design/patterns/ServicesCard/ServicesCard';
import {GetItNowModal} from '@/living-design/patterns/GetItNowModal/GetItNowModal';
import {AutoCareModals, type AutoCareModalType} from '@/living-design/patterns/AutoCareModals/AutoCareModals';
import {DelayedDeliveryModals, type DelayedModalType} from '@/living-design/patterns/DelayedDeliveryModals/DelayedDeliveryModals';
import {CheckInModal} from '@/living-design/patterns/CheckInModal/CheckInModal';
import {DemoModal} from '@/living-design/patterns/DemoModal/DemoModal';
import {Alert} from '@/living-design/components/Alert/Alert';
import {Button} from '@/living-design/components/Button/Button';
import {Icon} from '@/living-design/components/Icons/Icons';
import {PRODUCT_IMAGES} from '@/living-design/common/productImages';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const P = {
  milk:          { src: PRODUCT_IMAGES.milk, alt: 'Great Value Whole Milk' },
  eggs:          { src: PRODUCT_IMAGES.eggs, alt: 'Great Value Cage Free Eggs' },
  bananas:       { src: PRODUCT_IMAGES.bananas, alt: 'Organic Bananas' },
  avocado:       { src: PRODUCT_IMAGES.avocado, alt: 'Avocado' },
  headphones:    { src: PRODUCT_IMAGES.headphones, alt: 'Headphones' },
  airFryer:      { src: PRODUCT_IMAGES.airFryer, alt: 'Air Fryer' },
  tablet:        { src: PRODUCT_IMAGES.tablet, alt: 'Tablet' },
  vacuum:        { src: PRODUCT_IMAGES.cordlessVacuum, alt: 'Cordless Vacuum' },
  comforter:     { src: PRODUCT_IMAGES.comforterSet, alt: 'Comforter Set' },
};

// ── Interactive wrapper: Curbside Ready with Check In ──

function InteractiveCurbsideReady() {
  const [showCheckIn, setShowCheckIn] = useState(false);

  return (
    <>
      <OrderCard
        orderType="curbside"
        location="San Jose Neighborhood Market"
        statusHeading="Ready for pickup"
        timelineStep="on-the-way"
        timelineVariant="pickup"
        products={[P.milk, P.eggs]}
        actions={[
          { label: 'Check in', variant: 'primary', onClick: () => setShowCheckIn(true) },
          { label: 'View details', variant: 'secondary' },
        ]}
        orderTotal="$24.56"
      />
      <CheckInModal
        open={showCheckIn}
        onClose={() => setShowCheckIn(false)}
        storeName="San Jose Neighborhood Market"
      />
    </>
  );
}

// ── Interactive wrapper: Auto Care with Modals ──

const AUTO_SERVICE_DETAILS = {
  vehicle: '2019 Toyota Camry',
  services: ['Conventional Oil & Filter Change', 'Tire Rotation'],
  appointmentContact: 'Marcus Johnson',
  storePhone: '(972) 466-2228',
  storeHours: '7am to 7pm',
  serviceInstructions: 'Please check the cabin air filter as well.',
  appointmentStep: 0,
};

function InteractiveAutoCareCard() {
  const [openModal, setOpenModal] = useState<AutoCareModalType>(null);

  return (
    <>
      <OrderCard
        orderType="auto"
        location="Carrollton Supercenter at 1213 Trinity Mills Rd"
        statusHeading="Sat, Mar 7, 10:00am–11:00am"
        products={[]}
        serviceDetails={AUTO_SERVICE_DETAILS}
        actions={[
          { label: 'Check in', variant: 'primary', onClick: () => setOpenModal('checkIn') },
          { label: 'Reschedule', variant: 'secondary', onClick: () => setOpenModal('reschedule') },
          { label: 'View details', variant: 'secondary', onClick: () => setOpenModal('viewDetails') },
        ]}
        orderTotal="$44.76"
      />
      <AutoCareModals
        openModal={openModal}
        onClose={() => setOpenModal(null)}
        onSwitchToCheckIn={() => setOpenModal('checkIn')}
        onSwitchToReschedule={() => setOpenModal('reschedule')}
        serviceDetails={AUTO_SERVICE_DETAILS}
        location="Carrollton Supercenter at 1213 Trinity Mills Rd"
        statusHeading="Sat, Mar 7, 10:00am–11:00am"
        orderTotal="$44.76"
      />
    </>
  );
}

// ── Interactive wrapper: Active Curbside ──

function InteractiveActiveCurbside() {
  const [showCheckIn, setShowCheckIn] = useState(false);

  return (
    <>
      <ActiveCurbsideCard
        storeName="Sunnyvale Supercenter"
        status="Ready for pickup"
        products={[
          { src: PRODUCT_IMAGES.starbucksDoubleshot, alt: 'Coffee' },
          { src: PRODUCT_IMAGES.eggs6Count, alt: 'Eggs' },
          { src: PRODUCT_IMAGES.oatlyOatMilk, alt: 'Oat Milk' },
        ]}
        onCheckIn={() => setShowCheckIn(true)}
      />
      <CheckInModal
        open={showCheckIn}
        onClose={() => setShowCheckIn(false)}
        storeName="Sunnyvale Supercenter"
      />
    </>
  );
}

// ── Interactive wrapper: Combined Auto + Curbside ──

function InteractiveCombinedCard() {
  const [autoModal, setAutoModal] = useState<AutoCareModalType>(null);
  const [showGetItNow, setShowGetItNow] = useState(false);

  return (
    <>
      <CombinedOrderCard
        autoCare={{
          orderType: 'auto',
          location: 'Carrollton Supercenter at 1213 Trinity Mills Rd',
          statusHeading: 'Sat, Mar 7, 10:00am–11:00am',
          products: [],
          serviceDetails: {
            vehicle: '2019 Toyota Camry',
            services: ['Conventional Oil & Filter Change', 'Tire Rotation'],
            appointmentStep: 0,
          },
          actions: [
            { label: 'Check in', variant: 'primary', onClick: () => setAutoModal('checkIn') },
            { label: 'Reschedule', variant: 'secondary', onClick: () => setAutoModal('reschedule') },
            { label: 'View details', variant: 'secondary', onClick: () => setAutoModal('viewDetails') },
          ],
          orderTotal: '$89.88',
        }}
        delivery={{
          orderType: 'curbside',
          location: 'Carrollton Supercenter at 1213 Trinity Mills Rd',
          statusHeading: 'Sat, Mar 7, 12:00pm–1:00pm',
          timelineStep: 'placed',
          timelineVariant: 'pickup',
          products: [P.milk, P.eggs, P.bananas, P.avocado],
          actions: [
            { label: 'Get it now', variant: 'primary', onClick: () => setShowGetItNow(true) },
            { label: 'Edit items', variant: 'secondary' },
            { label: 'View details', variant: 'secondary' },
          ],
          orderTotal: '$85.00',
        }}
      />
      <AutoCareModals
        openModal={autoModal}
        onClose={() => setAutoModal(null)}
        onSwitchToCheckIn={() => setAutoModal('checkIn')}
        onSwitchToReschedule={() => setAutoModal('reschedule')}
        serviceDetails={{
          vehicle: '2019 Toyota Camry',
          services: ['Conventional Oil & Filter Change', 'Tire Rotation'],
          appointmentStep: 0,
        }}
        location="Carrollton Supercenter at 1213 Trinity Mills Rd"
        statusHeading="Sat, Mar 7, 10:00am–11:00am"
        orderTotal="$89.88"
      />
      <GetItNowModal
        open={showGetItNow}
        onClose={() => setShowGetItNow(false)}
        location="Carrollton Supercenter at 1213 Trinity Mills Rd"
        orderTotal="$85.00"
      />
    </>
  );
}

// ── Interactive wrapper: Delivery — Delayed with Warning ──

function InteractiveDelayedDelivery() {
  const [openModal, setOpenModal] = useState<DelayedModalType>(null);

  return (
    <>
      <OrderCard
        orderType="delivery"
        location="Sunnyvale Supercenter"
        statusHeading="Running late"
        timelineStep="preparing"
        isDelayed
        products={[P.vacuum, P.comforter]}
        actions={[
          { label: 'Reschedule', variant: 'primary', onClick: () => setOpenModal('reschedule') },
          { label: 'View details', variant: 'secondary', onClick: () => setOpenModal('viewDetails') },
        ]}
        orderTotal="$189.94"
      />
      <DelayedDeliveryModals
        openModal={openModal}
        onClose={() => setOpenModal(null)}
        orderTotal="$189.94"
      />
    </>
  );
}

// ── Interactive wrapper: Delivery — Track Order ──

function InteractiveTrackOrder() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <OrderCard
        orderType="delivery"
        location="Sunnyvale Supercenter"
        statusHeading="On the way"
        timelineStep="on-the-way"
        products={[P.headphones, P.airFryer, P.tablet]}
        actions={[
          { label: 'Track order', variant: 'primary', onClick: () => setShowDetails(true) },
          { label: 'View details', variant: 'secondary', onClick: () => setShowDetails(true) },
        ]}
        orderTotal="$347.97"
      />
      <DemoModal open={showDetails} onClose={() => setShowDetails(false)} title="Track Your Order" width={440}>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: 16, borderRadius: 8, background: 'var(--ld-semantic-color-background-subtle)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <DRow label="Order #" value="WM-20260307-8834" />
            <DRow label="Status" value="On the way" />
            <DRow label="Driver" value="Michael R." />
            <DRow label="ETA" value="Today, 3:45pm – 4:15pm" />
            <DRow label="Items" value="3 items" />
            <DRow label="Total" value="$347.97" />
          </div>
          <div style={{ position: 'relative', height: 180, borderRadius: 8, overflow: 'hidden', background: 'var(--ld-semantic-color-fill-accent-blue-subtle)' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
              <Icon name="Location" decorative style={{fontSize: 32, color: 'var(--ld-semantic-color-text-brand)'}} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ld-semantic-color-text-brand)' }}>Live tracking map</span>
              <span style={{ fontSize: 11, color: 'var(--ld-semantic-color-text-subtle)' }}>Driver is 2.4 miles away</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '16px 20px', borderTop: '1px solid var(--ld-semantic-color-separator)', justifyContent: 'flex-end' }}>
          <Button variant="secondary" size="small" onClick={() => setShowDetails(false)}>Close</Button>
          <Button variant="primary" size="small" onClick={() => setShowDetails(false)}>Contact driver</Button>
        </div>
      </DemoModal>
    </>
  );
}

function DRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
      <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{label}</span>
      <span style={{ fontWeight: 600, color: 'var(--ld-semantic-color-text)' }}>{value}</span>
    </div>
  );
}

// ── Services data sets ──

const SERVICES_URGENCY: ServiceEntry[] = [
  {
    id: 'rx-ready',
    serviceType: 'PHARMACY',
    serviceLabel: 'Prescription',
    status: 'READY_FOR_PICKUP',
    microcopy: 'Amoxicillin 500mg \u00b7 ready since 9:15am',
    pickupLocation: 'Oak Lawn Supercenter',
    pickupDate: '2026-03-05',
    activeStep: 2,
    detail: {
      pickupWindow: 'Today until 9:00pm',
      referenceId: 'Rx #4428710',
      provider: 'Dr. Sarah Chen',
      plan: 'Walmart Health Insurance',
    },
  },
  {
    id: 'auto-in-progress',
    serviceType: 'AUTO',
    serviceLabel: 'Auto Care',
    status: 'IN_PROGRESS',
    microcopy: 'Oil change in progress',
    pickupLocation: 'Oak Lawn Supercenter',
    activeStep: 2,
    detail: {
      scheduledTime: 'Sat, Mar 7, 10:00am\u201311:00am',
      vehicle: '2019 Toyota Camry',
      note: 'Est. 45 min remaining',
    },
  },
  {
    id: 'optical-scheduled',
    serviceType: 'OPTICAL',
    serviceLabel: 'Optical',
    status: 'SCHEDULED',
    microcopy: 'Pickup: Mon, Mar 10',
    pickupLocation: 'Oak Lawn Supercenter',
    pickupDate: '2026-03-10',
    activeStep: 0,
    detail: {
      referenceId: 'Order #OPT-88214',
      provider: 'Dr. James Park',
      pickupWindow: 'Mon, Mar 10, 9:00am\u20138:00pm',
      note: 'Progressive lenses \u2014 7\u201310 business days',
    },
  },
];

const SERVICES_ALL_EXPANDED: ServiceEntry[] = [
  {
    id: 'rx-ready-2',
    serviceType: 'PHARMACY',
    serviceLabel: 'Prescription',
    status: 'READY_FOR_PICKUP',
    microcopy: 'Lisinopril 10mg \u00b7 ready since 8:30am',
    pickupLocation: 'Carrollton Supercenter',
    pickupDate: '2026-03-05',
    activeStep: 2,
    detail: {
      pickupWindow: 'Today until 9:00pm',
      referenceId: 'Rx #3317204',
      provider: 'Dr. Maria Lopez',
    },
  },
  {
    id: 'auto-in-progress-2',
    serviceType: 'AUTO',
    serviceLabel: 'Auto Care',
    status: 'IN_PROGRESS',
    microcopy: 'Tire rotation \u2014 est. 45 min remaining',
    pickupLocation: 'Carrollton Supercenter',
    activeStep: 2,
    detail: {
      scheduledTime: 'Sat, Mar 7, 2:00pm\u20133:00pm',
      vehicle: '2021 Honda CR-V',
    },
  },
  {
    id: 'optical-scheduled-2',
    serviceType: 'OPTICAL',
    serviceLabel: 'Optical',
    status: 'SCHEDULED',
    microcopy: 'Contact lens pickup: Mon, Mar 10',
    pickupLocation: 'Carrollton Supercenter',
    pickupDate: '2026-03-10',
    activeStep: 0,
    detail: {
      referenceId: 'Order #OPT-55102',
      pickupWindow: 'Mon, Mar 10, 9:00am\u20138:00pm',
      provider: 'Dr. James Park',
    },
  },
  {
    id: 'cake-cancelled',
    serviceType: 'BAKERY',
    serviceLabel: 'Custom Cake',
    status: 'CANCELLED',
    microcopy: 'Order cancelled on Mar 3',
    activeStep: 0,
    detail: {
      referenceId: 'Order #BK-40091',
      note: 'Refund of $34.99 issued to Visa ending 4821',
    },
  },
];

const SERVICES_SINGLE_RX: ServiceEntry[] = [
  {
    id: 'rx-single',
    serviceType: 'PHARMACY',
    serviceLabel: 'Prescription',
    status: 'READY_FOR_PICKUP',
    microcopy: 'Metformin 1000mg \u00b7 ready since 10:00am',
    pickupLocation: 'Irving Supercenter',
    pickupDate: '2026-03-05',
    activeStep: 2,
    detail: {
      pickupWindow: 'Today until 9:00pm',
      referenceId: 'Rx #5590123',
      provider: 'Dr. Angela Reeves',
      plan: 'Walmart Health+',
    },
  },
];

const SERVICES_MULTI_STORE: ServiceEntry[] = [
  {
    id: 'rx-store1',
    serviceType: 'PHARMACY',
    serviceLabel: 'Prescription',
    status: 'READY_FOR_PICKUP',
    microcopy: 'Oak Lawn Supercenter \u00b7 ready since 9:00am',
    pickupLocation: 'Oak Lawn Supercenter',
    pickupDate: '2026-03-05',
    activeStep: 2,
    detail: {
      pickupWindow: 'Today until 9:00pm',
      referenceId: 'Rx #7712045',
      provider: 'Dr. David Kim',
    },
  },
  {
    id: 'optical-store2',
    serviceType: 'OPTICAL',
    serviceLabel: 'Optical',
    status: 'SCHEDULED',
    microcopy: 'Carrollton Supercenter \u00b7 pickup Mar 10',
    pickupLocation: 'Carrollton Supercenter',
    pickupDate: '2026-03-10',
    activeStep: 0,
    detail: {
      referenceId: 'Order #OPT-33187',
      pickupWindow: 'Mon, Mar 10, 9:00am\u20138:00pm',
      provider: 'Dr. Lisa Tran',
      note: 'Anti-reflective coating \u2014 allow 7\u201310 days',
    },
  },
  {
    id: 'auto-store1',
    serviceType: 'AUTO',
    serviceLabel: 'Auto Care',
    status: 'PROCESSING',
    microcopy: 'Oak Lawn Supercenter \u00b7 submitted today',
    pickupLocation: 'Oak Lawn Supercenter',
    activeStep: 1,
    detail: {
      scheduledTime: 'Today, 3:30pm\u20134:30pm',
      vehicle: '2020 Ford F-150',
      note: 'Checked in \u2014 waiting for bay',
    },
  },
];

// ── Page ──

export default function OrderCardPatternsPage() {
  return (
    <PageWrapper title="Order Card Patterns" category="WCP Patterns" description="Purchase history order cards with progress tracking, action buttons, and variant-specific layouts for delivery, curbside, auto care, combined orders, and services. All buttons are interactive — click them to see modal flows.">

      {/* ── Delivery: On the way ── */}
      <ExampleSection title="Delivery — On the Way" description="Active delivery order with progress tracking at step 2. Click 'Track order' to see the tracking modal with driver info and live map placeholder.">
        <InteractiveTrackOrder />
      </ExampleSection>

      {/* ── Delivery: Delivered with rating ── */}
      <ExampleSection title="Delivery — Delivered with Rating" description="Completed delivery order showing the interactive rating widget. Click the stars to submit feedback.">
        <OrderCard
          orderType="delivery"
          location="Sunnyvale Supercenter"
          statusHeading="Delivered"
          timelineStep="delivered"
          products={[P.headphones, P.airFryer]}
          actions={[
            { label: 'Buy again', variant: 'primary' },
            { label: 'View details', variant: 'secondary' },
          ]}
          showStartReturn
          orderTotal="$247.98"
        />
      </ExampleSection>

      {/* ── Shipping with seller ── */}
      <ExampleSection title="Shipping — Third-Party Seller" description="Shipped order with seller attribution and fulfillment information.">
        <OrderCard
          orderType="shipping"
          statusHeading="Preparing"
          timelineStep="preparing"
          seller="TechDirect"
          fulfilledBy="Walmart"
          products={[P.tablet]}
          actions={[
            { label: 'Track order', variant: 'primary' },
            { label: 'View details', variant: 'secondary' },
          ]}
          orderTotal="$299.99"
        />
      </ExampleSection>

      {/* ── Deprecated: Curbside — With Get It Now Express Upgrade ── */}
      <ExampleSection
        title="Curbside — With Get It Now Express Upgrade (deprecated)"
        description="This standalone example was removed to deduplicate the Get It Now flow. The express-delivery upgrade is now demoed on the Curbside side of the Combined card below."
      >
        <Alert
          variant="info"
          actionButtonProps={{
            href: '#canonical-get-it-now',
            children: 'Jump to Combined — Auto Care + Curbside Bundle',
          }}
        >
          <strong>Deprecated.</strong> The Get It Now modal is now exercised inside <em>Combined — Auto Care + Curbside Bundle</em>, where the curbside half still wires the &lsquo;Get it now&rsquo; primary action through <code>GetItNowModal</code>. Use that section for the canonical example.
        </Alert>
      </ExampleSection>

      {/* ── Curbside: Ready for pickup ── */}
      <ExampleSection title="Curbside — Ready for Pickup" description="Curbside order ready for customer check-in. Click 'Check in' to see the check-in confirmation with bay assignment.">
        <InteractiveCurbsideReady />
      </ExampleSection>

      {/* ── Store Purchase with Return Notice ── */}
      <ExampleSection title="Store Purchase — With Return Notice" description="In-store purchase showing return window info alerts and a 'Start a return' footer link.">
        <OrderCard
          orderType="store"
          location="Mountain View Supercenter"
          statusHeading="Purchased Mar 1"
          products={[P.airFryer, P.vacuum]}
          returnNotice="Most items can be returned within 90 days"
          returnDeadline="May 30, 2026"
          showStartReturn
          actions={[
            { label: 'Buy again', variant: 'primary' },
            { label: 'View receipt', variant: 'secondary' },
          ]}
          orderTotal="$167.94"
        />
      </ExampleSection>

      {/* ── Auto Care Appointment (canonical Auto Care example) ── */}
      <div id="canonical-auto-care">
        <ExampleSection title="Auto Care — Scheduled Appointment" description="Upcoming auto care appointment. Click 'Check in' for the check-in flow, 'Reschedule' for the calendar picker, or 'View details' for appointment info.">
          <InteractiveAutoCareCard />
        </ExampleSection>
      </div>

      {/* ── Active Curbside Card ── */}
      <ExampleSection title="Active Curbside Card" description="Homepage-style compact card for curbside pickup. Click 'Check in' to see the check-in flow with bay assignment.">
        <InteractiveActiveCurbside />
      </ExampleSection>

      {/* ── Combined: Auto Care + Curbside (canonical Get It Now example) ── */}
      <div id="canonical-get-it-now">
        <ExampleSection title="Combined — Auto Care + Curbside Bundle" description="Two-column layout pairing auto care + curbside. Both sides have interactive buttons — 'Check in' and 'Reschedule' on the left, 'Get it now' on the right.">
          <InteractiveCombinedCard />
        </ExampleSection>
      </div>

      {/* ── Deprecated: Delayed Delivery Warning ── */}
      <ExampleSection
        title="Delayed Delivery Warning (deprecated)"
        description="The standalone DelayedDeliveryCard example was removed. Recovery actions are now demoed on the standard OrderCard with the isDelayed flag, which keeps progress tracking visible alongside the warning."
      >
        <Alert
          variant="info"
          actionButtonProps={{
            href: '#canonical-delayed-delivery',
            children: 'Jump to Delivery — Delayed with Warning Tracker',
          }}
        >
          <strong>Deprecated.</strong> Use the OrderCard&rsquo;s <code>isDelayed</code> prop wired to <code>DelayedDeliveryModals</code> for reschedule, pickup-instead, and cancel flows. The dedicated <code>DelayedDeliveryCard</code> pattern is no longer the recommended entry point.
        </Alert>
      </ExampleSection>

      {/* ── Delivery with Delay Flag (canonical delayed delivery example) ── */}
      <div id="canonical-delayed-delivery">
        <ExampleSection title="Delivery — Delayed with Warning Tracker" description="Standard delivery card with isDelayed flag. Click 'Reschedule' to see the delivery reschedule modal.">
          <InteractiveDelayedDelivery />
        </ExampleSection>
      </div>

      {/* ── Deprecated: Auto Care — Vehicle Health + Upsell ── */}
      <ExampleSection
        title="Auto Care — Vehicle Health + Upsell (deprecated)"
        description="MaintenanceHealthCard and AutoCareUpsellOfferCard were removed from this page. They were marketing/engagement cards that live outside the order-card pattern set. Use the Auto Care scheduled-appointment example for the standard Auto Care OrderCard treatment."
      >
        <Alert
          variant="info"
          actionButtonProps={{
            href: '#canonical-auto-care',
            children: 'Jump to Auto Care — Scheduled Appointment',
          }}
        >
          <strong>Deprecated.</strong> For status, check-in, and reschedule flows on an auto-care appointment, use the canonical Auto Care OrderCard example. Vehicle-health and upsell engagement cards are tracked as separate marketing patterns and will move to their own page when documented.
        </Alert>
      </ExampleSection>

      {/* ── Services: Urgency Focus ── */}
      <ExampleSection title="Services — Prescription Ready + Auto Care In Progress" description="Urgency focus: an urgent prescription ready for pickup (with Alert banner) and Auto Care in progress. Click any row to expand its details and action buttons.">
        <ServicesCard
          defaultExpandedRowId="rx-ready"
          services={SERVICES_URGENCY}
        />
      </ExampleSection>

      {/* ── Services: All Expanded ── */}
      <ExampleSection title="Services — All Statuses Expanded" description="Expanded view with all 4 service types showing every status variant — Ready (green), In Progress (blue), Scheduled (gray), and Canceled (red).">
        <ServicesCard
          defaultExpanded
          defaultExpandedRowId="auto-in-progress-2"
          services={SERVICES_ALL_EXPANDED}
        />
      </ExampleSection>

      {/* ── Services: Single Rx ── */}
      <ExampleSection title="Services — Single Rx Ready" description="Minimal state with a single prescription ready for pickup and an urgency Alert banner.">
        <ServicesCard
          defaultExpandedRowId="rx-single"
          services={SERVICES_SINGLE_RX}
        />
      </ExampleSection>

      {/* ── Services: Multi-Store ── */}
      <ExampleSection title="Services — Multi-Store" description="Services across 2 different stores, demonstrating store context in each row microcopy.">
        <ServicesCard
          defaultExpanded
          defaultExpandedRowId="rx-store1"
          services={SERVICES_MULTI_STORE}
        />
      </ExampleSection>

      <GuidelinesSection
        description="Pick the order card variant that matches the fulfillment state: OrderCard for standard deliveries, ActiveCurbsideCard while the user is on the way, CombinedOrderCard when multiple sub-orders ship together, and ServicesCard for prescription / auto-care surfaces. Hook the card actions to real modals so the user can complete the next step without leaving the order context."
        defaultValue="OrderCard"
      />
    </PageWrapper>
  );
}
