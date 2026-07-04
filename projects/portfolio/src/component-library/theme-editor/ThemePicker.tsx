import * as React from 'react';
import {
  Icon,
  IconButton,
  SelectDropdownCheckmarkItem,
  SelectDropdownField,
  SelectDropdownSectionTitle,
  SelectDropdownSeparator,
} from '@/app/components';
import {
  CUSTOM_THEMES_EVENT,
  getCustomThemes,
  type CustomTheme,
} from '@/app/components/utils/customThemes';
import { THEME_PRESETS } from '@/app/components/utils/themeManager';
import {
  findSavedTheme,
  getThemePickerValue,
  themeOptionValue,
} from './themePickerUtils';

function ThemePickerCustomThemeRow({
  theme,
  checked,
  onSelect,
  onDelete,
}: {
  theme: CustomTheme;
  checked: boolean;
  onSelect: () => void;
  onDelete: (theme: CustomTheme) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', paddingRight: '4px' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <SelectDropdownCheckmarkItem checked={checked} onSelect={onSelect}>
          {theme.name}
        </SelectDropdownCheckmarkItem>
      </div>
      <IconButton
        a11yLabel={`Delete ${theme.name}`}
        size="xsmall"
        color="default"
        title={`Delete ${theme.name}`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onDelete(theme);
        }}
      >
        <Icon name="Trash" decorative size="small" />
      </IconButton>
    </div>
  );
}

export function ExistingThemePicker({
  draft,
  sourceKind,
  builtInNames,
  onSelect,
  onDeleteTheme,
}: {
  draft: CustomTheme;
  sourceKind: 'built-in' | 'custom' | 'new';
  builtInNames: string[];
  onSelect: (value: string) => void;
  onDeleteTheme: (theme: CustomTheme) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [customThemes, setCustomThemes] = React.useState<CustomTheme[]>(() => getCustomThemes());

  React.useEffect(() => {
    const syncThemes = () => setCustomThemes(getCustomThemes());
    syncThemes();
    window.addEventListener(CUSTOM_THEMES_EVENT, syncThemes);
    return () => window.removeEventListener(CUSTOM_THEMES_EVENT, syncThemes);
  }, []);

  const customThemeIds = customThemes.map((theme) => theme.id).join('|');

  React.useEffect(() => {
    setOpen(false);
  }, [customThemeIds]);

  const selectedValue = getThemePickerValue(draft, sourceKind, customThemes);
  const userCustomThemes = customThemes.filter((theme) => !theme.builtInPreset);
  const showDraftOption = !findSavedTheme(draft, sourceKind)
    && !(sourceKind === 'built-in' && THEME_PRESETS[draft.name])
    && !draft.builtInPreset;

  return (
    <SelectDropdownField
      label="Existing theme"
      hideLabel
      size="small"
      triggerValue={draft.name}
      open={open}
      onOpenChange={setOpen}
      style={{ width: '100%' }}
      contentProps={{ align: 'start', UNSAFE_style: { width: '320px', maxWidth: 'calc(100vw - 32px)' } }}
    >
      {showDraftOption && (
        <>
          <SelectDropdownCheckmarkItem
            checked={selectedValue === themeOptionValue('draft', draft.id)}
            onSelect={() => onSelect(themeOptionValue('draft', draft.id))}
          >
            {draft.name}
          </SelectDropdownCheckmarkItem>
          <SelectDropdownSeparator />
        </>
      )}
      <SelectDropdownSectionTitle variant="bold">Built-in themes</SelectDropdownSectionTitle>
      {builtInNames.map((name) => {
        const value = themeOptionValue('builtin', name);
        return (
          <SelectDropdownCheckmarkItem
            key={value}
            checked={selectedValue === value}
            onSelect={() => onSelect(value)}
          >
            {name}
          </SelectDropdownCheckmarkItem>
        );
      })}
      {userCustomThemes.length > 0 && (
        <>
          <SelectDropdownSeparator />
          <SelectDropdownSectionTitle variant="bold">My themes</SelectDropdownSectionTitle>
          {userCustomThemes.map((theme) => {
            const value = themeOptionValue('custom', theme.id);
            return (
              <ThemePickerCustomThemeRow
                key={value}
                theme={theme}
                checked={selectedValue === value}
                onSelect={() => onSelect(value)}
                onDelete={(themeToDelete) => {
                  setOpen(false);
                  onDeleteTheme(themeToDelete);
                }}
              />
            );
          })}
        </>
      )}
    </SelectDropdownField>
  );
}
