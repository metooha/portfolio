import * as React from 'react';
import {Icon} from '@/app/components';

export function ThemeEditorCategoryNav<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
}: {
  items: { value: T; label: string; icon: string }[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="theme-editor-category-nav">
      {items.map((item) => {
        const isCurrent = value === item.value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isCurrent}
            aria-label={item.label}
            onClick={() => onChange(item.value)}
            className={`theme-editor-category-nav__item${isCurrent ? ' theme-editor-category-nav__item--current' : ''}`}
          >
            <Icon name={item.icon} size="small" decorative />
            {isCurrent && <span>{item.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
