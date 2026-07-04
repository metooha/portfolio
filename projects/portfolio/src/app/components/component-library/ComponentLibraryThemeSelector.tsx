import { Select } from "@/app/components/Select";
import { Body, Heading } from "@/app/components";
import {
  THEME_OPTIONS,
  type ComponentLibraryThemeName,
} from "./componentLibraryThemeOptions";

interface ComponentLibraryThemeSelectorProps {
  selectedTheme: ComponentLibraryThemeName;
  onThemeChange: (theme: ComponentLibraryThemeName) => void;
}

export function ComponentLibraryThemeSelector({
  selectedTheme,
  onThemeChange,
}: ComponentLibraryThemeSelectorProps) {
  const activeTheme =
    THEME_OPTIONS.find((theme) => theme.name === selectedTheme) ??
    THEME_OPTIONS[0];

  return (
    <section
      aria-labelledby="component-library-theme-label"
      className="flex flex-col gap-4 rounded-[24px] border border-[color:var(--ld-semantic-color-border,#dedede)] bg-[color:var(--ld-semantic-color-background,#fff)] p-5 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <Heading as="h2" size="small" id="component-library-theme-label">
          Theme
        </Heading>
        <Body as="p" color="subtle">
          {activeTheme.description}
        </Body>
      </div>

      <div className="flex w-full max-w-md flex-col gap-2">
        <label
          htmlFor="component-library-theme-select"
          className="text-sm font-semibold text-[color:var(--ld-semantic-color-text,#2e2f32)]"
        >
          Current theme
        </label>
        <Select
          id="component-library-theme-select"
          label="Current theme"
          value={selectedTheme}
          onChange={(event) =>
            onThemeChange(event.target.value as ComponentLibraryThemeName)
          }
        >
          {THEME_OPTIONS.map((theme) => (
            <option key={theme.name} value={theme.name}>
              {theme.label}
            </option>
          ))}
        </Select>
      </div>
    </section>
  );
}
