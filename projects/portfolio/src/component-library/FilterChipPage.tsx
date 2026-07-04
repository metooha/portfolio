import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {FilterChip} from '@/app/components/FilterChip/FilterChip';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const FILTERS = ['In stock', 'Rollback', 'Free shipping', 'Pickup today'];

export default function FilterChipPage() {
  const [selected, setSelected] = React.useState<Record<string, boolean>>({'In stock': true});
  const [multiOpen, setMultiOpen] = React.useState(false);
  const activeCount = Object.values(selected).filter(Boolean).length;

  return (
    <PageWrapper
      title="Filter Chip"
      category="Core Components"
      description="Selectable pill toggles for filtering a result set. Comes in toggle, multi-select, and 'All Filters' variants, with selection exposed via aria-pressed."
    >
      <ExampleSection title="Toggle" description="Tap to include or exclude a facet. Selection is a controlled boolean.">
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>
          {FILTERS.map((label) => (
            <FilterChip
              key={label}
              selected={!!selected[label]}
              onSelectedChange={(next) => setSelected((prev) => ({...prev, [label]: next}))}
            >
              {label}
            </FilterChip>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection title="Multi-select" description="Opens a menu of choices; a chevron reflects the open state.">
        <FilterChip
          isMultiSelect
          isOpen={multiOpen}
          selected={multiOpen}
          onSelectedChange={() => setMultiOpen((v) => !v)}
        >
          Brand
        </FilterChip>
      </ExampleSection>

      <ExampleSection title="All filters" description="A dedicated entry point to the full filter panel, optionally showing an active count.">
        <FilterChip isAllFilters showCount count={activeCount} selected={activeCount > 0} />
      </ExampleSection>

      <ExampleSection title="Disabled">
        <FilterChip disabled>Unavailable</FilterChip>
      </ExampleSection>

      <GuidelinesSection
        description="Use Filter Chips for quick, reversible filtering directly above or beside a result set. Keep labels short and results updating live as chips toggle. Use the multi-select variant when a facet has many values, and the All Filters variant to reveal the complete filter set."
        defaultValue="selected={false}"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            Each chip is a button that reports selection through <code>aria-pressed</code>. The multi-select variant adds <code>aria-expanded</code> to announce whether its menu is open.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
