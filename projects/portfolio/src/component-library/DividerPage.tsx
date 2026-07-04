import * as React from 'react';
import {Body, Heading} from '@/app/components/Text/Text';
import {Button} from '@/app/components/Button/Button';
import {Divider} from '@/app/components/Divider/Divider';
import {ExampleSection, GuidelinesSection, PageWrapper, UseCaseSection} from './shared';

const LIST_FRAME: React.CSSProperties = {
  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  borderRadius: '8px',
  padding: '16px',
};

export default function DividerPage() {
  return (
    <PageWrapper
      title="Divider"
      category="Core Components"
      description="Visual separators using the LD 3.5 separator token."
    >
      <ExampleSection title="Horizontal Divider">
        <div>
          <Body as="p" size="medium" color="subtle">Content above the divider</Body>
          <Divider />
          <Body as="p" size="medium" color="subtle">Content below the divider</Body>
        </div>
      </ExampleSection>

      <ExampleSection title="Vertical Divider">
        <div style={{display: 'grid', gap: '24px'}}>
          <div style={{display: 'flex', alignItems: 'stretch', gap: '24px', minHeight: '96px'}}>
            <div style={{flex: 1}}>
              <Heading as="h3" size="small" style={{margin: '0 0 8px'}}>Delivery</Heading>
              <Body as="p" size="medium" color="subtle" style={{margin: 0}}>Arrives tomorrow with no minimum order.</Body>
            </div>
            <Divider orientation="vertical" />
            <div style={{flex: 1}}>
              <Heading as="h3" size="small" style={{margin: '0 0 8px'}}>Pickup</Heading>
              <Body as="p" size="medium" color="subtle" style={{margin: 0}}>Ready in store today after 2:00 PM.</Body>
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'stretch', gap: '12px'}}>
            <Button size="small" variant="secondary">Sort</Button>
            <Divider orientation="vertical" />
            <Button size="small" variant="secondary">Filter</Button>
            <Button size="small" variant="secondary">View</Button>
          </div>
        </div>
      </ExampleSection>

      <UseCaseSection
        title="Use Cases"
        description="Common scenarios for using Dividers in your application"
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <div>
            <Heading as="h3" size="small" style={{marginBottom: '16px'}}>
              List Item Separator
            </Heading>
            <div style={LIST_FRAME}>
              <div style={{padding: '12px 0'}}>
                <Body as="p" size="medium" style={{margin: 0}}>Item 1</Body>
              </div>
              <Divider />
              <div style={{padding: '12px 0'}}>
                <Body as="p" size="medium" style={{margin: 0}}>Item 2</Body>
              </div>
              <Divider />
              <div style={{padding: '12px 0'}}>
                <Body as="p" size="medium" style={{margin: 0}}>Item 3</Body>
              </div>
            </div>
          </div>

          <div>
            <Heading as="h3" size="small" style={{marginBottom: '16px'}}>
              Section Separator
            </Heading>
            <div>
              <Heading as="h3" size="small" style={{marginBottom: '16px'}}>Account Information</Heading>
              <Body as="p" size="medium" color="subtle">Manage your account settings and preferences.</Body>
              <div style={{margin: '16px 0'}}>
                <Divider />
              </div>
              <Heading as="h3" size="small" style={{marginBottom: '16px'}}>Privacy Settings</Heading>
              <Body as="p" size="medium" color="subtle">Control your privacy and data sharing options.</Body>
            </div>
          </div>

          <div>
            <Heading as="h3" size="small" style={{marginBottom: '16px'}}>
              Inline Group Separator
            </Heading>
            <div style={{display: 'flex', alignItems: 'stretch', gap: '16px', minHeight: '72px'}}>
              <div>
                <Body as="p" size="medium" style={{margin: 0}}>Store pickup</Body>
                <Body as="p" size="small" color="subtle" style={{margin: '4px 0 0'}}>Available today</Body>
              </div>
              <Divider orientation="vertical" />
              <div>
                <Body as="p" size="medium" style={{margin: 0}}>Delivery</Body>
                <Body as="p" size="small" color="subtle" style={{margin: '4px 0 0'}}>Free tomorrow</Body>
              </div>
              <Divider orientation="vertical" />
              <div>
                <Body as="p" size="medium" style={{margin: 0}}>Shipping</Body>
                <Body as="p" size="small" color="subtle" style={{margin: '4px 0 0'}}>Arrives Friday</Body>
              </div>
            </div>
          </div>
        </div>
      </UseCaseSection>

      <GuidelinesSection
        description="Use a title when the divider labels a meaningful section. Omit the title when the divider is decorative so assistive technology does not announce unnecessary content."
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            The Divider is decorative by default (<code>aria-hidden="true"</code>), so it is invisible to assistive technology and has no color contrast requirements under WCAG 2.1. If you opt out of the default by setting <code>aria-hidden="false"</code>, you must provide either a <code>title</code> or <code>aria-label</code> so screen readers can announce its purpose.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
