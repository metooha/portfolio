import {useHeaderCartBindings} from '@/living-design/utils/Store';
import {Header} from '@/living-design/patterns/Header/Header';
import {PageWrapper, ExampleSection} from './shared';

export default function HeaderPage() {
  const {cartCount, cartPrice} = useHeaderCartBindings();

  return (
    <PageWrapper title="Header" category="WCP PATTERNS" description="Responsive desktop and mobile header variants with search, cart, and account integration.">
      <ExampleSection title="Desktop Header (Full Width)">
        <div style={{ border: '1px solid #E6E6E8', borderRadius: '0', overflow: 'visible' }}>
          <Header cartCount={cartCount} cartPrice={cartPrice} mobileVariant="classic" a11yNavLabel="Desktop header account and cart" a11yMobileSearchLabel="Desktop example search" />
        </div>
      </ExampleSection>

      <ExampleSection title="Mobile Header - Classic (Constrained Width)">
        <div style={{ maxWidth: '400px', border: '1px solid #E6E6E8', borderRadius: '0', overflow: 'visible' }}>
          <Header cartCount={cartCount} cartPrice={cartPrice} mobileVariant="classic" a11yNavLabel="Classic mobile header account and cart" a11yMobileSearchLabel="Classic mobile search" />
        </div>
      </ExampleSection>

      <ExampleSection title="Mobile Header - Top Nav Blue (Constrained Width)">
        <div style={{ maxWidth: '400px', border: '1px solid #E6E6E8', borderRadius: '0', overflow: 'visible' }}>
          <Header cartCount={cartCount} cartPrice={cartPrice} mobileVariant="topnav-blue" a11yNavLabel="Top nav blue header account and cart" a11yMobileSearchLabel="Top nav blue search" a11yCategoryNavLabel="Top nav blue category navigation" />
        </div>
      </ExampleSection>

      <ExampleSection title="Mobile Header - Top Nav White (Constrained Width)">
        <div style={{ maxWidth: '400px', border: '1px solid #E6E6E8', borderRadius: '0', overflow: 'visible' }}>
          <Header cartCount={cartCount} cartPrice={cartPrice} mobileVariant="topnav-white" a11yNavLabel="Top nav white header account and cart" a11yMobileSearchLabel="Top nav white search" a11yCategoryNavLabel="Top nav white category navigation" />
        </div>
      </ExampleSection>

      <ExampleSection title="Mobile Header - Top Nav Blue with Delivery Banner (Constrained Width)">
        <div style={{ maxWidth: '400px', border: '1px solid #E6E6E8', borderRadius: '0', overflow: 'visible' }}>
          <Header cartCount={cartCount} cartPrice={cartPrice} mobileVariant="topnav-blue" showMobileDeliveryBanner a11yNavLabel="Top nav blue with banner header account and cart" a11yMobileSearchLabel="Top nav blue with banner search" a11yCategoryNavLabel="Top nav blue with banner category navigation" />
        </div>
      </ExampleSection>
    </PageWrapper>
  );
}
