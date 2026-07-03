import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {Body} from '@/living-design/components/Text/Text';
import {
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  SearchIcon,
  StarIcon,
} from '@/living-design/components/Icons/Icons';
import {FloatingButton, type FloatingButtonSize} from '@/living-design/components/FloatingButton/FloatingButton';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SIZES: Array<{label: string; value: FloatingButtonSize}> = [
  {label: 'XSmall', value: 'xsmall'},
  {label: 'Small', value: 'small'},
  {label: 'Medium', value: 'medium'},
  {label: 'Large', value: 'large'},
];

const ICONS = {
  previous: <ChevronLeftIcon size="medium" />,
  next: <ChevronRightIcon size="medium" />,
  search: <SearchIcon size="medium" />,
  favorite: <StarIcon size="medium" />,
};

type FloatingIcon = keyof typeof ICONS;

export default function FloatingButtonPage() {
  const [size, setSize] = React.useState<FloatingButtonSize>('medium');
  const [icon, setIcon] = React.useState<FloatingIcon>('next');
  const [disabled, setDisabled] = React.useState(false);

  return (
    <PageWrapper
      title="Floating Button"
      category="WCP Components"
      description="Icon-only circular action buttons used for floating controls such as carousel navigation, scroll affordances, search, and close actions."
    >
      <ExampleSection
        title="Component Configuration"
        description="Change the icon-only button size, icon, and disabled state."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Size</Body>
                <ButtonGroup aria-label="Floating button size">
                  {SIZES.map((item) => (
                    <Button
                      key={item.value}
                      size="small"
                      variant={size === item.value ? 'primary' : 'secondary'}
                      onClick={() => setSize(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>

              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Icon</Body>
                <ButtonGroup aria-label="Floating button icon">
                  {(Object.keys(ICONS) as FloatingIcon[]).map((item) => (
                    <Button
                      key={item}
                      size="small"
                      variant={icon === item ? 'primary' : 'secondary'}
                      onClick={() => setIcon(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>

              <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="The accessible label must describe the hidden action.">
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120}}>
                <FloatingButton size={size} disabled={disabled} aria-label={icon}>
                  {ICONS[icon]}
                </FloatingButton>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Sizes" description="Match size to density and available touch target space.">
        <DocsGrid minColumnWidth={180}>
          {SIZES.map((item) => (
            <DocsCard key={item.value} title={item.label}>
              <FloatingButton size={item.value} aria-label="Next">
                <ChevronRightIcon size={item.value === 'large' ? 'large' : 'small'} />
              </FloatingButton>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Common placements" description="Floating buttons need stable positioning around the content they control.">
        <DocsGrid minColumnWidth={360}>
          <DocsCard title="Carousel controls" description="Position previous and next buttons symmetrically over the content area.">
            <div style={{position: 'relative', minHeight: 180, borderRadius: 8, background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)', display: 'grid', placeItems: 'center'}}>
              <Body as="span" size="small" color="subtle">Carousel content</Body>
              <div style={{position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)'}}>
                <FloatingButton size="medium" aria-label="Previous slide"><ChevronLeftIcon size="medium" /></FloatingButton>
              </div>
              <div style={{position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)'}}>
                <FloatingButton size="medium" aria-label="Next slide"><ChevronRightIcon size="medium" /></FloatingButton>
              </div>
            </div>
          </DocsCard>
          <DocsCard title="Utility actions" description="Use familiar icons for compact, repeated tools.">
            <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center'}}>
              <FloatingButton size="medium" aria-label="Scroll up"><ArrowUpIcon size="medium" /></FloatingButton>
              <FloatingButton size="medium" aria-label="Search"><SearchIcon size="medium" /></FloatingButton>
              <FloatingButton size="medium" aria-label="Close"><CloseIcon size="medium" /></FloatingButton>
              <FloatingButton size="medium" aria-label="Favorite"><StarIcon size="medium" /></FloatingButton>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Always provide a specific aria-label, keep floating buttons visually close to the controlled region, and avoid using them for text-heavy or ambiguous actions."
        defaultValue="size='medium'"
      />
    </PageWrapper>
  );
}
