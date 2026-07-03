import { Browser, BrowserContext, Page, chromium } from "playwright";
import { BuilderConfig } from "./config.js";
import { existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const MODULE_DIR = fileURLToPath(new URL(".", import.meta.url));
const BUILDER_ROOT = resolve(MODULE_DIR, "..");
const DEFAULT_PROFILE_DIR = resolve(BUILDER_ROOT, ".browser-profile");

export interface BrowserSession {
  browser: Browser | null;
  context: BrowserContext;
  page: Page;
}

type BrowserChannel = "msedge" | "chrome" | undefined;

const CHANNEL_PATHS: { channel: BrowserChannel; paths: string[] }[] = [
  {
    channel: "msedge",
    paths: [
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    ],
  },
  {
    channel: "chrome",
    paths: [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    ],
  },
];

function detectChannel(): BrowserChannel {
  for (const { channel, paths } of CHANNEL_PATHS) {
    if (paths.some((p) => existsSync(p))) return channel;
  }
  return undefined;
}

export async function launchBrowser(config: BuilderConfig): Promise<BrowserSession> {
  const profileDir = config.profileDir ?? DEFAULT_PROFILE_DIR;
  const channel = detectChannel();

  const context = await chromium.launchPersistentContext(profileDir, {
    channel,
    headless: false,
    args: ["--disable-blink-features=AutomationControlled"],
    viewport: { width: 1600, height: 1000 },
  });

  const label = channel ?? "bundled-chromium";
  console.log(`  Using browser: ${label}`);
  console.log(`  Using browser profile: ${profileDir}`);

  const page = context.pages()[0] ?? (await context.newPage());
  return { browser: null, context, page };
}

/**
 * Ensure the user is logged in via SSO, then navigate to the project URL.
 *
 * Flow:
 *   1. Navigate to the SSO login URL first.
 *   2. If the SSO session is still valid, Builder auto-redirects to /app/.
 *   3. If not, the user completes SSO in the browser; we wait for the
 *      redirect to /app/.
 *   4. Once logged in, navigate to the actual project URL.
 */
export async function navigateToBuilder(
  page: Page,
  config: BuilderConfig
): Promise<void> {
  console.log(`  Navigating to SSO login: ${config.loginUrl}`);
  await page.goto(config.loginUrl, {
    waitUntil: "domcontentloaded",
    timeout: 90000,
  });

  const afterSso = page.url();
  const isLoggedIn =
    afterSso.includes("/app/") &&
    !afterSso.includes("/login") &&
    !afterSso.includes("/signup");

  if (!isLoggedIn) {
    console.log(
      "\n  ┌───────────────────────────────────────────────────────────┐"
    );
    console.log(
      "  │  Complete SSO login in the browser window.                │"
    );
    console.log(
      "  │  The script will continue automatically once logged in.   │"
    );
    console.log(
      "  └───────────────────────────────────────────────────────────┘\n"
    );

    await page.waitForURL(
      (u) =>
        u.pathname.startsWith("/app/") && !u.pathname.includes("/login"),
      { timeout: 300_000 }
    );
  }

  console.log("  Logged in — navigating to project.");
  await page.goto(config.url, {
    waitUntil: "domcontentloaded",
    timeout: 90000,
  });
}

/**
 * Click the "Code" tab in the Builder editor to reveal the ALL FILES tree.
 * The tree panel is hidden by default; the Code tab must be active for it
 * to render. Tries the button by its visible text label.
 */
export async function clickCodeTab(page: Page): Promise<void> {
  // Wait for the tab bar to appear (the button with text "Code").
  const codeTab = page.locator('button', { hasText: /^Code$/ }).first();
  await codeTab.waitFor({ state: "visible", timeout: 30000 });

  // Builder occasionally shows overlays/toasts that intercept pointer events.
  // Retry with a normal click first, then force-click after dismissing overlays.
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await codeTab.click({ timeout: 5000 });
      // Give React a moment to mount the file tree panel.
      await page.waitForTimeout(600);
      return;
    } catch (error) {
      lastError = error;
      await page.keyboard.press("Escape").catch(() => undefined);
      await page.waitForTimeout(250);
    }
  }

  try {
    await codeTab.click({ force: true, timeout: 5000 });
    await page.waitForTimeout(600);
    return;
  } catch (error) {
    lastError = error;
  }

  throw lastError instanceof Error ? lastError : new Error("Failed to activate Code tab");
}

export async function closeBrowser(
  browserOrContext: Browser | BrowserContext | null
): Promise<void> {
  if (browserOrContext) await browserOrContext.close();
}
