import * as React from 'react';
import {
  Caption,
  SearchField,
  SelectDropdownField,
  SelectDropdownItem,
  SelectDropdownLabel,
  SelectDropdownSeparator,
} from '@/app/components';
import type { SelectSize } from '@/app/components/Select/Select';
import { TOKEN_PICKER_WIDTH } from './constants';
import { SCALE_FAMILIES, type PrimitiveColorOption } from './colorTokens';

export function PrimitiveTokenPicker({
  label,
  options,
  selectedOption,
  onChange,
  placeholder = 'Pick color',
  displayText,
  size = 'xsmall',
  maxWidth = '160px',
}: {
  label: string;
  options: PrimitiveColorOption[];
  selectedOption: PrimitiveColorOption;
  onChange: (option: PrimitiveColorOption) => void;
  placeholder?: string;
  displayText?: string;
  size?: SelectSize;
  maxWidth?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const visibleOptions = normalizedQuery
    ? options.filter((option) => option.label.toLowerCase().includes(normalizedQuery))
    : options;
  const groupedOptions = [
    ...(options.some((option) => option.family === 'Current') ? ['Current'] : []),
    ...SCALE_FAMILIES,
  ].map((family) => ({
    family,
    options: visibleOptions.filter((option) => option.family === family),
  })).filter((group) => group.options.length > 0);
  const triggerText = displayText ?? selectedOption.label ?? placeholder;
  const pickerWidth = maxWidth ?? TOKEN_PICKER_WIDTH;

  return (
    <SelectDropdownField
      label={label}
      hideLabel
      size={size}
      triggerValue={triggerText}
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setQuery('');
      }}
      leadingIcon={(
        <span
          aria-hidden="true"
          className="ld-select-swatch"
          style={{ background: selectedOption.hex }}
        />
      )}
      style={{ width: pickerWidth, maxWidth: pickerWidth, minWidth: pickerWidth, flexShrink: 0 }}
      contentProps={{
        align: 'start',
        UNSAFE_style: {
          width: '320px',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: '420px',
          overflow: 'hidden',
          padding: '8px',
        },
      }}
    >
      <div style={{ padding: '4px 4px 8px' }}>
        <SearchField
          value={query}
          onChange={setQuery}
          onClear={() => setQuery('')}
          placeholder="Search colors..."
          size="small"
          showMic={false}
          showBarcode={false}
        />
      </div>
      <div className="theme-editor-scroll-viewport" style={{ maxHeight: '340px' }} role="listbox" aria-label={label}>
        {groupedOptions.length > 0 ? (
          groupedOptions.map((group, groupIndex) => (
            <React.Fragment key={group.family}>
              {groupIndex > 0 && <SelectDropdownSeparator />}
              <SelectDropdownLabel>{group.family.toUpperCase()}</SelectDropdownLabel>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: '4px',
                  padding: '0 4px 6px',
                }}
              >
                {group.options.map((option) => (
                  <SelectDropdownItem
                    key={option.id}
                    onSelect={() => onChange(option)}
                    UNSAFE_style={{
                      borderRadius: '6px',
                      padding: '6px',
                      gap: '6px',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="ld-select-swatch"
                      style={{ background: option.hex }}
                    />
                    <span style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>{option.label}</span>
                  </SelectDropdownItem>
                ))}
              </div>
            </React.Fragment>
          ))
        ) : (
          <Caption as="p" color="subtlest" style={{ margin: '8px 12px 12px' }}>
            No primitive tokens match "{query}".
          </Caption>
        )}
      </div>
    </SelectDropdownField>
  );
}
