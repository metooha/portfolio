/**
 * Load Builder sync config.
 *
 * URL resolution priority:
 *   1. --url CLI flag
 *   2. BUILDER_URL env var / .env file
 *   3. sync/builder/url.txt
 *
 * Authentication is handled by a persistent browser profile — no cookies
 * or cURL capture required.  On first run the browser opens and you log in
 * manually; subsequent runs reuse the saved session.
 */

import { existsSync, readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const MODULE_DIR = dirname(fileURLToPath(import.meta.url));
/** sync/builder/ */
const BUILDER_ROOT = resolve(MODULE_DIR, "..");
/** Repo root — where .env lives */
const REPO_ROOT = resolve(BUILDER_ROOT, "../..");

const DEFAULT_LOGIN_URL = "https://builder.io/login/saml/walmartsso";

export interface BuilderConfig {
  url: string;
  /** SAML / SSO login URL — navigated to automatically when session is expired. */
  loginUrl: string;
  /** Optional override for the persistent browser profile directory. */
  profileDir?: string;
}

// ---------------------------------------------------------------------------
// .env loader (no dotenv dependency needed)
// ---------------------------------------------------------------------------

function loadDotEnv(): void {
  const envFile = resolve(REPO_ROOT, ".env");
  if (!existsSync(envFile)) return;
  const lines = readFileSync(envFile, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx < 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (key && !(key in process.env)) {
      process.env[key] = val;
    }
  }
}

loadDotEnv();

// ---------------------------------------------------------------------------
// URL loader
// ---------------------------------------------------------------------------

function loadUrl(cliUrl?: string): string {
  if (cliUrl?.trim()) return cliUrl.trim();
  if (process.env.BUILDER_URL?.trim()) return process.env.BUILDER_URL.trim();

  const urlFile = resolve(BUILDER_ROOT, "url.txt");
  if (existsSync(urlFile)) {
    const saved = readFileSync(urlFile, "utf8")
      .split("\n")
      .filter((line) => !line.trim().startsWith("#") && line.trim().length > 0)
      .join("")
      .trim();
    if (saved) return saved;
  }

  throw new Error(
    [
      `No Builder URL found.`,
      ``,
      `To fix this, choose one of:`,
      `  1. Pass --url "https://…" on the command line, or`,
      `  2. Set BUILDER_URL="https://…" in your .env file, or`,
      `  3. Create sync/builder/url.txt and paste your Builder project URL there.`,
    ].join("\n")
  );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function loadConfig(cliUrl?: string): BuilderConfig {
  const url = loadUrl(cliUrl);
  const loginUrl = process.env.BUILDER_LOGIN_URL?.trim() || DEFAULT_LOGIN_URL;
  return { url, loginUrl };
}
