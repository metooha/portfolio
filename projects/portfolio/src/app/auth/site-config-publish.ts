import { getCustomThemes } from "@/app/components/utils/customThemes";
import { getPageThemeAssignments } from "@/app/components/utils/themeManager";
import { getPagePassword, getSitePages } from "@/app/auth/page-protection";
import {
  downloadJsonFile,
  SITE_CONFIG_VERSION,
  type SiteConfig,
} from "@/app/auth/site-config";

export function collectPublishedSiteConfig(): SiteConfig {
  const pagePasswords: Record<string, string> = {};
  for (const page of getSitePages()) {
    const password = getPagePassword(page.path);
    if (password) {
      pagePasswords[page.path] = password;
    }
  }

  return {
    version: SITE_CONFIG_VERSION,
    pagePasswords,
    pageThemes: getPageThemeAssignments(),
    customThemes: getCustomThemes(),
  };
}

export function downloadPublishedSiteConfig() {
  downloadJsonFile("site-config.json", collectPublishedSiteConfig());
}
