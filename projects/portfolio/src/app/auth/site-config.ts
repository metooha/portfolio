import type { CustomTheme } from "@/app/components/utils/customThemes";

export const SITE_CONFIG_VERSION = 1 as const;
export const SITE_CONFIG_URL = `${import.meta.env.BASE_URL}site-config.json`;
const LEGACY_PASSWORDS_URL = `${import.meta.env.BASE_URL}page-passwords.json`;

export type SiteConfig = {
  version: typeof SITE_CONFIG_VERSION;
  pagePasswords: Record<string, string>;
  pageThemes: Record<string, string>;
  customThemes: CustomTheme[];
};

const EMPTY_CONFIG: SiteConfig = {
  version: SITE_CONFIG_VERSION,
  pagePasswords: {},
  pageThemes: {},
  customThemes: [],
};

let deployedConfig: SiteConfig = { ...EMPTY_CONFIG, pagePasswords: {}, pageThemes: {}, customThemes: [] };
let siteConfigLoaded = false;
let siteConfigPromise: Promise<void> | null = null;

function normalizePasswordRecord(value: unknown): Record<string, string> {
  if (typeof value !== "object" || value === null) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] =>
        typeof entry[0] === "string" && typeof entry[1] === "string" && entry[1].trim().length > 0,
    ),
  );
}

function normalizeThemeRecord(value: unknown): Record<string, string> {
  if (typeof value !== "object" || value === null) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] =>
        typeof entry[0] === "string" && typeof entry[1] === "string" && entry[1].trim().length > 0,
    ),
  );
}

function normalizeCustomThemes(value: unknown): CustomTheme[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is CustomTheme => {
    if (typeof entry !== "object" || entry === null) return false;
    const theme = entry as Partial<CustomTheme>;
    return (
      typeof theme.id === "string" &&
      typeof theme.name === "string" &&
      typeof theme.baseTheme === "string" &&
      typeof theme.seeds === "object" &&
      theme.seeds !== null
    );
  });
}

function normalizeSiteConfig(value: unknown): SiteConfig {
  if (typeof value !== "object" || value === null) {
    return { ...EMPTY_CONFIG };
  }

  const raw = value as Partial<SiteConfig>;
  return {
    version: SITE_CONFIG_VERSION,
    pagePasswords: normalizePasswordRecord(raw.pagePasswords),
    pageThemes: normalizeThemeRecord(raw.pageThemes),
    customThemes: normalizeCustomThemes(raw.customThemes),
  };
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url);
  if (!response.ok) return null;
  return response.json();
}

export function isSiteConfigLoaded(): boolean {
  return siteConfigLoaded;
}

export function getDeployedSiteConfig(): SiteConfig {
  return deployedConfig;
}

export function getDeployedPagePassword(path: string): string | null {
  const password = deployedConfig.pagePasswords[path];
  return password?.trim() ? password : null;
}

export function getDeployedPageThemes(): Record<string, string> {
  return deployedConfig.pageThemes;
}

export function getDeployedCustomThemes(): CustomTheme[] {
  return deployedConfig.customThemes;
}

export function setDeployedPagePassword(path: string, password: string) {
  deployedConfig = {
    ...deployedConfig,
    pagePasswords: {
      ...deployedConfig.pagePasswords,
      [path]: password,
    },
  };
}

export async function prepareSiteConfig(): Promise<void> {
  if (siteConfigPromise) {
    return siteConfigPromise;
  }

  siteConfigPromise = (async () => {
    const siteConfig = normalizeSiteConfig(await fetchJson(SITE_CONFIG_URL));
    let pagePasswords = siteConfig.pagePasswords;

    if (Object.keys(pagePasswords).length === 0) {
      pagePasswords = normalizePasswordRecord(await fetchJson(LEGACY_PASSWORDS_URL));
    }

    deployedConfig = {
      ...siteConfig,
      pagePasswords,
    };
    siteConfigLoaded = true;
  })().catch(() => {
    deployedConfig = { ...EMPTY_CONFIG };
    siteConfigLoaded = true;
  });

  return siteConfigPromise;
}

export function downloadJsonFile(filename: string, data: unknown) {
  const payload = JSON.stringify(data, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
