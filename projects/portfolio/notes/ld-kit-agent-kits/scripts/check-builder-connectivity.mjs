#!/usr/bin/env node
/**
 * Builder connectivity preflight.
 *
 * Checks DNS + HTTPS reachability for Builder endpoints and prints
 * actionable hints when failures are due to DNS or TLS trust.
 *
 * Usage:
 *   node scripts/check-builder-connectivity.mjs
 *
 * Optional env:
 *   BUILDER_URL=https://builder.io/app/projects/...
 */

import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { lookup } from "dns/promises";
import { request } from "https";

const REPO_ROOT = resolve(process.cwd());
const ENV_FILE = resolve(REPO_ROOT, ".env");

function loadDotEnv() {
  if (!existsSync(ENV_FILE)) return;

  const lines = readFileSync(ENV_FILE, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx < 0) continue;

    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1).trim();

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

function extractHost(urlValue) {
  if (!urlValue || !urlValue.trim()) return null;
  try {
    return new URL(urlValue.trim()).hostname;
  } catch {
    return null;
  }
}

async function checkDns(host) {
  try {
    const res = await lookup(host);
    return { ok: true, address: res.address, family: res.family };
  } catch (error) {
    const code = error && typeof error === "object" ? error.code : "UNKNOWN";
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, code, message };
  }
}

async function checkHttps(host) {
  return new Promise((resolveResult) => {
    const req = request(
      {
        protocol: "https:",
        host,
        method: "HEAD",
        path: "/",
        timeout: 12000,
        rejectUnauthorized: true,
      },
      (res) => {
        res.resume();
        resolveResult({
          ok: true,
          statusCode: res.statusCode ?? 0,
        });
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error("Request timed out"));
    });

    req.on("error", (error) => {
      const code = error && typeof error === "object" ? error.code : "UNKNOWN";
      const message = error instanceof Error ? error.message : String(error);
      resolveResult({ ok: false, code, message });
    });

    req.end();
  });
}

function printDivider() {
  console.log("------------------------------------------------------------");
}

function formatResult(ok) {
  return ok ? "OK" : "FAIL";
}

function printHints(failures) {
  const hasDnsFailure = failures.some(
    (f) => f.type === "dns" && ["ENOTFOUND", "EAI_AGAIN", "NXDOMAIN"].includes(String(f.code))
  );
  const hasTlsFailure = failures.some((f) =>
    f.type === "https" &&
    ["SELF_SIGNED_CERT_IN_CHAIN", "UNABLE_TO_VERIFY_LEAF_SIGNATURE", "CERT_HAS_EXPIRED"].includes(String(f.code))
  );

  if (!hasDnsFailure && !hasTlsFailure && failures.length === 0) {
    console.log("\nConnectivity preflight passed.");
    return;
  }

  console.log("\nSuggested remediation:");

  if (hasDnsFailure) {
    console.log("1. Ask your network/DNS team to allow and resolve:");
    console.log("   - builder.io");
    console.log("   - api.builder.io");
    console.log("   - cdn.builder.io");
    console.log("   - *.builder.io");
  }

  if (hasTlsFailure) {
    console.log("2. Configure trusted corporate CA for Node/npm (secure fix):");
    console.log("   - npm config set strict-ssl true");
    console.log("   - npm config set cafile \"/absolute/path/to/corp-root-ca.pem\"");
    console.log("   - export NODE_EXTRA_CA_CERTS=\"/absolute/path/to/corp-root-ca.pem\"");
  }

  console.log("3. Avoid disabling SSL except short-lived local debugging.");
}

async function main() {
  loadDotEnv();

  const builderHost = extractHost(process.env.BUILDER_URL || "");
  const targets = Array.from(
    new Set([
      "builder.io",
      "api.builder.io",
      "cdn.builder.io",
      ...(builderHost ? [builderHost] : []),
    ])
  );

  console.log("Builder connectivity preflight\n");
  console.log(`Node: ${process.version}`);
  console.log(`strict-ssl (npm): unknown at runtime (check via 'npm config get strict-ssl')`);
  printDivider();

  const failures = [];

  for (const host of targets) {
    console.log(`Host: ${host}`);

    const dns = await checkDns(host);
    console.log(
      `  DNS   : ${formatResult(dns.ok)}${dns.ok ? ` (${dns.address}, IPv${dns.family})` : ` (${dns.code}: ${dns.message})`}`
    );

    if (!dns.ok) {
      failures.push({ host, type: "dns", code: dns.code, message: dns.message });
      console.log("  HTTPS : SKIP (DNS failed)");
      printDivider();
      continue;
    }

    const https = await checkHttps(host);
    console.log(
      `  HTTPS : ${formatResult(https.ok)}${https.ok ? ` (status ${https.statusCode})` : ` (${https.code}: ${https.message})`}`
    );

    if (!https.ok) {
      failures.push({ host, type: "https", code: https.code, message: https.message });
    }

    printDivider();
  }

  printHints(failures);

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Unexpected preflight error: ${message}`);
  process.exitCode = 1;
});
