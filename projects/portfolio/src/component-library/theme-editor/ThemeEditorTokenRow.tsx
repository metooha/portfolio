import * as React from 'react';
import {Body, Caption, Icon, IconButton, Tag} from '@/app/components';
import {TOKEN_PICKER_WIDTH, TOKEN_ROW_RESET_SIZE} from './constants';

export function ThemeEditorTokenRowActions({
  picker,
  isOverridden,
  onReset,
  resetLabel,
}: {
  picker: React.ReactNode;
  isOverridden: boolean;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div
      className="theme-editor-row__actions"
      style={{
        width: `calc(${TOKEN_PICKER_WIDTH} + 6px + ${TOKEN_ROW_RESET_SIZE})`,
      }}
    >
      {picker}
      <IconButton
        a11yLabel={resetLabel}
        size="xsmall"
        color="default"
        title={resetLabel}
        disabled={!isOverridden}
        onClick={onReset}
      >
        <Icon name="Refresh" decorative />
      </IconButton>
    </div>
  );
}

export type ThemeEditorTokenRowProps = {
  label: string;
  tokenSlug?: string;
  description?: string;
  components?: string[];
  picker: React.ReactNode;
  isOverridden: boolean;
  onReset: () => void;
  resetLabel: string;
  showDivider?: boolean;
  layout?: 'compact' | 'stacked';
};

export function ThemeEditorTokenRow({
  label,
  tokenSlug,
  description,
  components,
  picker,
  isOverridden,
  onReset,
  resetLabel,
  showDivider,
  layout = 'compact',
}: ThemeEditorTokenRowProps) {
  const rowClass = [
    'theme-editor-row',
    layout === 'stacked' ? 'theme-editor-row--stacked' : '',
    showDivider ? 'theme-editor-row--divider' : '',
  ].filter(Boolean).join(' ');

  const labelBlock = (
    <div className="theme-editor-row__main">
      <Body as="div" size="small" weight="alt">{label}</Body>
      {tokenSlug && (
        <Caption as="div" color="subtlest" isMonospace className="theme-editor-row__token-slug">
          {tokenSlug}
        </Caption>
      )}
    </div>
  );

  const actions = (
    <ThemeEditorTokenRowActions
      picker={picker}
      isOverridden={isOverridden}
      onReset={onReset}
      resetLabel={resetLabel}
    />
  );

  if (layout === 'stacked') {
    return (
      <div className={rowClass}>
        <div className="theme-editor-row__header">
          {labelBlock}
          {actions}
        </div>
        {description && (
          <Caption as="p" color="subtle" style={{ margin: 0, lineHeight: 1.5 }}>
            {description}
          </Caption>
        )}
        {components && components.length > 0 && (
          <div className="theme-editor-row__tags">
            {components.map((component) => (
              <Tag
                key={component}
                size="small"
                variant="tertiary"
                color="gray"
              >
                {component}
              </Tag>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={rowClass}>
      {labelBlock}
      {actions}
    </div>
  );
}
