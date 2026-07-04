import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {Flag, FLAG_VARIANTS, type FlagVariant} from '@/app/components/Flag/Flag';
import {Body, Caption} from '@/app/components/Text/Text';
import {HourglassIcon, ShieldCheckIcon} from '@/app/components/common/icons';
import {
  CheckCircleIcon2,
  CheckIcon,
  DollarIcon,
  FlashIcon,
  GiftIcon,
  LockIcon,
  StarIcon,
  TagIcon,
  UsersFillIcon,
} from '@/app/components/Icons/Icons';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const VARIANT_ICONS: Record<FlagVariant, React.ReactNode> = {
  'holiday-restricted': <LockIcon />,
  'brand-subtle': <StarIcon />,
  scarcity: <HourglassIcon />,
  'savings-bold': <DollarIcon />,
  'savings-subtle': <TagIcon />,
  'confidence-subtle': <ShieldCheckIcon />,
  'confidence-bold': <ShieldCheckIcon />,
  'confidence-alt': <CheckIcon />,
  confidence: <CheckCircleIcon2 />,
  'holiday-member': <GiftIcon />,
  social: <UsersFillIcon />,
  urgent: <FlashIcon />,
};

const FEATURED_VARIANTS: FlagVariant[] = [
  'brand-subtle',
  'savings-bold',
  'confidence',
  'social',
  'urgent',
];

export default function FlagPage() {
  const [variant, setVariant] = React.useState<FlagVariant>('brand-subtle');
  const [showLeading, setShowLeading] = React.useState(true);
  const [showTrailing, setShowTrailing] = React.useState(false);
  const active = FLAG_VARIANTS.find((item) => item.variant === variant) ?? FLAG_VARIANTS[0];

  return (
    <PageWrapper
      title="Flag"
      category="WCP Components"
      description="Promotional and status badges for product, offer, social-proof, scarcity, and confidence messaging."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview a flag variant with optional leading and trailing icon slots."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Variant</Body>
                <ButtonGroup aria-label="Flag variant">
                  {FEATURED_VARIANTS.map((item) => (
                    <Button
                      key={item}
                      size="small"
                      variant={variant === item ? 'primary' : 'secondary'}
                      onClick={() => setVariant(item)}
                    >
                      {FLAG_VARIANTS.find((flag) => flag.variant === item)?.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <Checkbox label="Show leading icon" checked={showLeading} onChange={(event) => setShowLeading(event.target.checked)} />
              <Checkbox label="Show trailing icon" checked={showTrailing} onChange={(event) => setShowTrailing(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description={active.description}>
              <Flag
                variant={variant}
                label={active.label}
                leadingIcon={showLeading ? VARIANT_ICONS[variant] : undefined}
                trailingIcon={showTrailing ? VARIANT_ICONS[variant] : undefined}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="All variants" description="Every variant maps to a specific promotional or status intent.">
        <DocsGrid minColumnWidth={220}>
          {FLAG_VARIANTS.map(({variant: itemVariant, label, description}) => (
            <DocsCard key={itemVariant} title={label} description={description}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8}}>
                <Flag variant={itemVariant} label={label} leadingIcon={VARIANT_ICONS[itemVariant]} />
                <Caption as="span" color="subtle" style={{fontFamily: 'monospace'}}>{itemVariant}</Caption>
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="In context" description="Flags should sit close to the product or message they qualify.">
        <DocsCard>
          <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center'}}>
            <Flag variant="savings-bold" label="Rollback" leadingIcon={VARIANT_ICONS['savings-bold']} />
            <Flag variant="confidence" label="Best seller" leadingIcon={VARIANT_ICONS.confidence} />
            <Flag variant="social" label="100+ bought today" leadingIcon={VARIANT_ICONS.social} />
            <Flag variant="urgent" label="Limited time" leadingIcon={VARIANT_ICONS.urgent} />
          </div>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use the variant that matches the message intent, keep labels short, and avoid stacking several flags unless each one adds distinct decision-making value."
        defaultValue="variant='brand-subtle', label='Flag name'"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            The <code>label</code> prop renders as visible text and is the primary accessible name for the flag. Icons passed to <code>leadingIcon</code> or <code>trailingIcon</code> are decorative when a label is present — mark them with <code>aria-hidden="true"</code> so screen readers do not announce them twice. If you ever use a flag without a label (icon-only), supply an <code>aria-label</code> on the icon or the flag itself to describe its meaning.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
