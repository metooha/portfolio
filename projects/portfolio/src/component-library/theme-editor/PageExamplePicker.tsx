import * as React from 'react';
import {
  SelectDropdownCheckmarkItem,
  SelectDropdownField,
} from '@/app/components';
import type { PreviewPageExample } from './types';

const PREVIEW_PAGE_EXAMPLE_OPTIONS: { value: PreviewPageExample; label: string }[] = [
  { value: 'campaign', label: 'Campaign dashboard' },
  { value: 'agentCanvas', label: 'Agent canvas' },
  { value: 'caseStudy', label: 'Case study template' },
];

export function PageExamplePicker({
  value,
  onChange,
}: {
  value: PreviewPageExample;
  onChange: (value: PreviewPageExample) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const selectedLabel =
    PREVIEW_PAGE_EXAMPLE_OPTIONS.find((option) => option.value === value)?.label ?? value;

  return (
    <SelectDropdownField
      label="Page example"
      hideLabel
      size="xsmall"
      triggerValue={selectedLabel}
      open={open}
      onOpenChange={setOpen}
      style={{ width: '180px', minWidth: '140px' }}
      contentProps={{ align: 'end', UNSAFE_style: { width: '220px' } }}
    >
      {PREVIEW_PAGE_EXAMPLE_OPTIONS.map((option) => (
        <SelectDropdownCheckmarkItem
          key={option.value}
          checked={value === option.value}
          onSelect={() => onChange(option.value)}
        >
          {option.label}
        </SelectDropdownCheckmarkItem>
      ))}
    </SelectDropdownField>
  );
}
