import * as React from 'react';
import {useState} from 'react';
import {FilterChip} from '@/app/components/FilterChip';
import './SearchFilterBar.css';

interface SearchFilterBarProps {
  chips: readonly string[];
}

export function SearchFilterBar({ chips }: SearchFilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOpen, setSortOpen] = useState(false);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="ld-wcp-search-filter-bar-root">
      {/* All Filters — uses the LD "Sliders" glyph internally */}
      <FilterChip isAllFilters showCount count={activeFilters.length}>
        All Filters
      </FilterChip>

      {/* Sort — multi-select variant renders the LD chevron glyph */}
      <FilterChip
        isMultiSelect
        isOpen={sortOpen}
        selected={sortOpen}
        onSelectedChange={setSortOpen}
      >
        Sort
      </FilterChip>

      {/* Dynamic filter chips */}
      {chips.map((chip) => (
        <FilterChip
          key={chip}
          selected={activeFilters.includes(chip)}
          onSelectedChange={() => toggleFilter(chip)}
        >
          {chip}
        </FilterChip>
      ))}
    </div>
  );
}
SearchFilterBar.displayName = 'SearchFilterBar';
