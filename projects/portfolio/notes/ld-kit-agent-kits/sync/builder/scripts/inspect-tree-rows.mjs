#!/usr/bin/env node
/**
 * Diagnostic: open Builder, wait for the ALL FILES tree, then dump
 * the tree's outerHTML so we can understand the actual DOM structure.
 *
 * Uses a TEMP COPY of the saved browser profile so it doesn't conflict
 * with an already-running Edge session on the same profile.
 */
import { chromium } from "playwright";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync, mkdtempSync } from "fs";
import { execSync } from "child_process";
import { tmpdir } from "os";

// Manually parse .env (no dotenv dependency)
try {
  const envPath = resolve(dirname(fileURLToPath(import.meta.url)), "../../../.env");
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] ??= m[2].trim().replace(/^["']|["']$/g, "");
  }
} catch {}

const ORIG_PROFILE = resolve(dirname(fileURLToPath(import.meta.url)), "../.browser-profile");
const TEMP_PROFILE = mkdtempSync(tmpdir() + "/builder-inspect-");
execSync(`rsync -a --exclude SingletonLock --exclude "*.log" ${ORIG_PROFILE}/ ${TEMP_PROFILE}/`);
console.log(`Temp profile: ${TEMP_PROFILE}`);

const URL = process.env.BUILDER_URL ?? "https://builder.io/app";

const ctx = await chromium.launchPersistentContext(TEMP_PROFILE, {
  channel: "msedge",
  headless: false,
  args: ["--disable-blink-features=AutomationControlled"],
  viewport: { width: 1600, height: 1000 },
});

const page = ctx.pages()[0] ?? await ctx.newPage();

console.log(`Navigating to ${URL} ...`);
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });

// Wait for ALL FILES panel
console.log("Waiting for ALL FILES tree panel...");
// Use polling instead of waitForFunction to avoid serialization issues with Node 18
const deadline = Date.now() + 60000;
while (true) {
  const found = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("div")).some(el => {
      const t = (el.textContent ?? "").replace(/\s+/g, " ").trim();
      const r = el.getBoundingClientRect();
      return t.includes("ALL FILES") && r.width > 100 && r.height > 100;
    });
  });
  if (found) break;
  if (Date.now() > deadline) throw new Error("Timed out waiting for ALL FILES tree");
  await page.waitForTimeout(1000);
}

console.log("Tree found. Dumping row elements...\n");

const result = await page.evaluate(() => {
  // Find ALL elements that have non-empty visible text but only ZWNJs in textContent
  // These are likely the virtual tree rows.
  const allEls = Array.from(document.querySelectorAll("*"));
  const interesting = [];

  for (const el of allEls) {
    const rect = el.getBoundingClientRect();
    if (rect.height < 8 || rect.height > 40) continue;
    if (rect.width < 30) continue;

    const attrs = {};
    for (const a of el.attributes) attrs[a.name] = a.value.slice(0, 120);

    // Get computed style for content pseudo-element
    const style = window.getComputedStyle(el);
    const beforeContent = window.getComputedStyle(el, "::before").content;
    const afterContent = window.getComputedStyle(el, "::after").content;

    const rawText = el.textContent ?? "";
    const hasOnlyZwnj = rawText.length > 0 && /^[\u200C\s]*$/.test(rawText);
    const hasNormalText = /[a-zA-Z0-9._-]/.test(rawText);

    if (hasOnlyZwnj || (hasNormalText && rawText.replace(/\s+/g, " ").trim().length < 50)) {
      interesting.push({
        tag: el.tagName,
        class: el.className?.slice(0, 60) ?? "",
        textContent: rawText.slice(0, 30),
        attrs,
        h: Math.round(rect.height),
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        beforeContent: beforeContent?.slice(0, 60),
        afterContent: afterContent?.slice(0, 60),
        display: style.display,
      });
    }
    if (interesting.length > 150) break;
  }

  return interesting;
});

console.log(`Found ${result.length} interesting elements:\n`);
for (const r of result) {
  const zwnjHex = [...(r.textContent ?? "")].map(c => "U+" + c.charCodeAt(0).toString(16).toUpperCase()).join(" ");
  console.log(`<${r.tag} h=${r.h} top=${r.top} left=${r.left} display=${r.display}>`);
  console.log(`  class: ${r.class}`);
  console.log(`  textContent: "${r.textContent}" [${zwnjHex}]`);
  console.log(`  ::before content: ${r.beforeContent}`);
  console.log(`  ::after content: ${r.afterContent}`);
  if (Object.keys(r.attrs).length) {
    for (const [k, v] of Object.entries(r.attrs)) console.log(`  @${k}="${v}"`);
  }
  console.log();
}

await ctx.close();
import { rmSync } from "fs";
rmSync(TEMP_PROFILE, { recursive: true, force: true });
console.log("Done.");
