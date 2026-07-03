#!/usr/bin/env tsx
/**
 * Diagnostic: logs into Builder using the saved profile, waits for the ALL FILES
 * tree, then dumps every element's tag, attributes, computed text and ZWNJ info
 * so we can figure out exactly what markRowByLabel should look for.
 *
 * Usage:
 *   npx tsx sync/builder/src/inspect-tree.ts
 */
import { loadConfig } from "./config.js";
import { clickCodeTab, launchBrowser, navigateToBuilder } from "./browser.js";

const config = loadConfig();
console.log(`URL: ${config.url}`);

const session = await launchBrowser(config);
await navigateToBuilder(session.page, config);

console.log("Clicking Code tab...");
await clickCodeTab(session.page);

// Phase 1: wait for the ALL FILES panel to appear (textContent approach, no skeleton guard).
console.log("\nWaiting for ALL FILES panel...");
await session.page.waitForFunction(() => {
  return Array.from(document.querySelectorAll("div")).some((el) => {
    const t = (el.textContent ?? "").replace(/\s+/g, " ").trim();
    const r = el.getBoundingClientRect();
    return t.includes("ALL FILES") && r.width > 160 && r.height > 180;
  });
}, { timeout: 90000 });
console.log("Panel found.");

// Phase 2: wait for skeletons to clear.
console.log("Waiting for skeleton loaders to clear...");
const skeletonClearStart = Date.now();
while (Date.now() - skeletonClearStart < 30000) {
  const hasSkeleton = await session.page.evaluate(() =>
    document.querySelector(".react-loading-skeleton") !== null
  );
  if (!hasSkeleton) break;
  console.log("  (skeleton still present, waiting 500ms...)");
  await session.page.waitForTimeout(500);
}
console.log("Skeletons cleared (or timed out).");

// Phase 3: dump the tree DOM.
console.log("\n=== ALL FILES tree DOM dump ===\n");

const dump = await session.page.evaluate(() => {
  const divs = Array.from(document.querySelectorAll("div"));
  const tree = divs
    .filter((el) => {
      const t = (el.textContent ?? "").replace(/\s+/g, " ").trim();
      const r = el.getBoundingClientRect();
      return t.includes("ALL FILES") && r.width > 100 && r.height > 100;
    })
    .sort((a, b) => {
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      return ra.width * ra.height - rb.width * rb.height;
    })[0];

  if (!tree) return ["TREE NOT FOUND"];

  const lines: string[] = [];

  // Also show innerText of tree for comparison
  lines.push(`=== tree.innerText (first 300 chars) ===`);
  lines.push((tree as HTMLElement).innerText?.slice(0, 300) ?? "(no innerText)");
  lines.push(`=== tree.textContent (first 300 chars) ===`);
  lines.push((tree.textContent ?? "").slice(0, 300));
  lines.push(`=== child elements ===`);

  for (const el of Array.from(tree.querySelectorAll("*")).slice(0, 300)) {
    const r = el.getBoundingClientRect();
    if (r.height < 8 || r.height > 50 || r.width < 10) continue;

    const rawText = el.textContent ?? "";
    const innerT = (el as HTMLElement).innerText ?? "";
    const zwnjCount = (rawText.match(/\u200C/g) ?? []).length;

    const attrs: string[] = [];
    for (const a of el.attributes) {
      attrs.push(`${a.name}="${a.value.slice(0, 100)}"`);
    }

    lines.push(
      `<${el.tagName} h=${Math.round(r.height)} w=${Math.round(r.width)} top=${Math.round(r.top)}` +
        ` zwnj=${zwnjCount} innerText="${innerT.replace(/\s+/g, " ").trim().slice(0, 50)}"` +
        ` textContent="${rawText.replace(/\s+/g, " ").trim().slice(0, 50)}"` +
        (attrs.length ? ` [${attrs.join(" ")}]` : "") +
        `>`
    );
  }
  return lines;
});

for (const line of dump) console.log(line);

// Phase 4: right-click "ld" and dump all visible text to see the context menu.
import { waitForAllFilesTree, clickRowByLabel, rightClickRowByLabel } from "./tree.js";

console.log("\n=== Marking tree with waitForAllFilesTree ===");
await waitForAllFilesTree(session.page);
console.log("Tree marked.");

console.log("\n=== Clicking 'client' to expand ===");
const clientClicked = await clickRowByLabel(session.page, "client");
console.log("client clicked:", clientClicked);
await session.page.waitForTimeout(600);

console.log("\n=== Right-clicking 'ld' ===");
const ldClicked = await rightClickRowByLabel(session.page, "ld");
console.log("ld right-clicked:", ldClicked);
await session.page.waitForTimeout(800);

const menuItems = await session.page.evaluate(() => {
  return Array.from(document.querySelectorAll("*"))
    .filter((el) => {
      const r = (el as HTMLElement).getBoundingClientRect();
      return r.width > 0 && r.height > 0 && r.height < 50;
    })
    .map((el) => {
      const it = (el as HTMLElement).innerText?.replace(/\s+/g, " ").trim();
      const role = el.getAttribute("role") ?? "";
      return it ? `[role=${role}] "${it}"` : null;
    })
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i) // dedupe
    .slice(0, 40);
});
console.log("\n=== Visible elements after right-click ===");
for (const item of menuItems) console.log(" ", item);

console.log("\n\nKeeping browser open for manual inspection. Press Ctrl+C to exit.");
await new Promise(() => {});
