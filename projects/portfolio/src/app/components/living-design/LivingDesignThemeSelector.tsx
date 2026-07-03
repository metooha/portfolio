import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Body, Heading } from "@/living-design";
import {
  THEME_OPTIONS,
  type LivingDesignThemeName,
} from "./livingDesignThemeOptions";

interface LivingDesignThemeSelectorProps {
  selectedTheme: LivingDesignThemeName;
  onThemeChange: (theme: LivingDesignThemeName) => void;
}

export function LivingDesignThemeSelector({
  selectedTheme,
  onThemeChange,
}: LivingDesignThemeSelectorProps) {
  const activeTheme =
    THEME_OPTIONS.find((theme) => theme.name === selectedTheme) ??
    THEME_OPTIONS[0];

  return (
    <section
      aria-labelledby="living-design-theme-label"
      className="flex flex-col gap-4 rounded-[24px] border border-[color:var(--ld-semantic-color-border,#dedede)] bg-[color:var(--ld-semantic-color-background,#fff)] p-5 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <Heading as="h2" size="small" id="living-design-theme-label">
          Theme
        </Heading>
        <Body as="p" color="subtle">
          {activeTheme.description}
        </Body>
      </div>

      <div className="flex w-full max-w-md flex-col gap-2">
        <label
          htmlFor="living-design-theme-select"
          className="text-sm font-semibold text-[color:var(--ld-semantic-color-text,#2e2f32)]"
        >
          Current theme
        </label>
        <Select
          value={selectedTheme}
          onValueChange={(value) => onThemeChange(value as LivingDesignThemeName)}
        >
          <SelectTrigger
            id="living-design-theme-select"
            className="h-11 w-full rounded-full border-[color:var(--ld-semantic-color-border,#dedede)] bg-white"
          >
            <SelectValue placeholder="Select a theme">
              <span className="flex items-center gap-2">
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: activeTheme.swatch }}
                  aria-hidden
                />
                {activeTheme.label}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {THEME_OPTIONS.map((theme) => (
              <SelectItem key={theme.name} value={theme.name}>
                <span className="flex items-center gap-2">
                  <span
                    className="size-3 shrink-0 rounded-full"
                    style={{ backgroundColor: theme.swatch }}
                    aria-hidden
                  />
                  {theme.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
