/**
 * Parse a raw cookie string (from `document.cookie` in the browser console)
 * into Playwright-compatible cookie objects scoped to the Builder host.
 *
 * The cookie string format is the same as HTTP Cookie headers:
 *   name1=value1; name2=value2; ...
 *
 * Usage:
 *   1. Open Builder in your browser, sign in normally.
 *   2. Open DevTools → Console.
 *   3. Run:  copy(document.cookie)
 *   4. Paste the result into sync/builder/cookies.txt
 */

export interface BuilderCookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  secure: boolean;
  sameSite: "Lax";
}

/**
 * Parse a semicolon-separated cookie string into Playwright cookie objects.
 * `host` is the domain to scope cookies to (e.g. "builder.io").
 */
export function parseCookies(cookieString: string, host: string): BuilderCookie[] {
  // Normalise — sometimes the value is a JSON string or URL-encoded.
  const raw = cookieString.trim().replace(/^["']|["']$/g, "");
  return raw
    .split(";")
    .map((part) => {
      const trimmed = part.trim();
      if (!trimmed) return null;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx < 0) return null;
      const name = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1);
      if (!name) return null;
      return {
        name,
        value,
        domain: host.startsWith(".") ? host : `.${host}`,
        path: "/",
        secure: true,
        sameSite: "Lax" as const,
      };
    })
    .filter((c): c is BuilderCookie => c !== null);
}
