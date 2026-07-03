import { Page } from "playwright";

const TREE_ATTR = "data-sync-builder-tree";
const ROW_ATTR = "data-sync-builder-row";

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export async function waitForAllFilesTree(page: Page, timeoutMs = 90000): Promise<void> {
  const deadline = Date.now() + timeoutMs;

  // Poll from Node rather than using waitForFunction — this lets us check the
  // skeleton condition reliably with separate evaluate calls, avoiding the
  // page-context serialisation issues that caused waitForFunction to time out.
  while (true) {
    if (Date.now() > deadline) {
      throw new Error(`waitForAllFilesTree: timed out after ${timeoutMs}ms`);
    }

    const ready = await page.evaluate(({ treeAttr }) => {
      const divs = Array.from(document.querySelectorAll("div"));
      const candidates = divs.filter((el) => {
        const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
        if (!text.includes("ALL FILES")) return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 160 && rect.height > 180;
      });
      if (candidates.length === 0) return false;

      const best = candidates.sort((a, b) => {
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return ra.width * ra.height - rb.width * rb.height;
      })[0];

      // Skeletons still present → not ready yet.
      if (best.querySelector(".react-loading-skeleton")) return false;

      // Mark the tree panel for subsequent row queries.
      for (const el of divs) el.removeAttribute(treeAttr);
      best.setAttribute(treeAttr, "1");
      return true;
    }, { treeAttr: TREE_ATTR });

    if (ready) return;
    await page.waitForTimeout(400);
  }
}

export async function markRowByLabel(page: Page, label: string): Promise<boolean> {
  return page.evaluate(
    ({ treeAttr, rowAttr, labelText }) => {
      const tree = document.querySelector(`[${treeAttr}="1"]`);
      if (!tree) return false;

      // Builder sets a `title` attribute on each row element equal to the exact
      // file/folder name — this is the most reliable selector, unaffected by
      // ZWNJ characters or CSS-rendered text.
      const byTitle = Array.from(tree.querySelectorAll(`[title="${labelText}"]`)).filter((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        return rect.width > 4 && rect.height > 4;
      });

      // Fall back to innerText matching if no title match found.
      const candidates = byTitle.length > 0
        ? byTitle
        : Array.from(tree.querySelectorAll("span,div")).filter((el) => {
            const it = (el as HTMLElement).innerText ?? "";
            const text = it.trim()
              ? it.replace(/\s+/g, " ").trim()
              : (el.textContent ?? "").replace(/\u200C/g, "").replace(/\s+/g, " ").trim();
            if (text !== labelText) return false;
            const rect = (el as HTMLElement).getBoundingClientRect();
            return rect.width > 4 && rect.height > 4;
          });
      if (candidates.length === 0) return false;

      const allMarked = tree.querySelectorAll(`[${rowAttr}]`);
      for (const marked of allMarked) marked.removeAttribute(rowAttr);

      const best = candidates.sort((a, b) => {
        const rectA = (a as HTMLElement).getBoundingClientRect();
        const rectB = (b as HTMLElement).getBoundingClientRect();
        // Prefer rows in left tree lane rather than content/editor panes.
        return rectA.left - rectB.left;
      })[0] as HTMLElement;

      best.setAttribute(rowAttr, "1");
      return true;
    },
    { treeAttr: TREE_ATTR, rowAttr: ROW_ATTR, labelText: normalizeText(label) }
  );
}

export async function markRowByTitle(page: Page, title: string): Promise<boolean> {
  return page.evaluate(
    ({ treeAttr, rowAttr, titleText }) => {
      const tree = document.querySelector(`[${treeAttr}="1"]`);
      if (!tree) return false;

      const candidates = Array.from(tree.querySelectorAll("[title]")).filter((el) => {
        if (el.getAttribute("title") !== titleText) return false;
        const rect = (el as HTMLElement).getBoundingClientRect();
        return rect.width > 4 && rect.height > 4;
      });
      if (candidates.length === 0) return false;

      const allMarked = tree.querySelectorAll(`[${rowAttr}]`);
      for (const marked of allMarked) marked.removeAttribute(rowAttr);

      const best = candidates.sort((a, b) => {
        const rectA = (a as HTMLElement).getBoundingClientRect();
        const rectB = (b as HTMLElement).getBoundingClientRect();
        return rectA.left - rectB.left;
      })[0] as HTMLElement;

      best.setAttribute(rowAttr, "1");
      return true;
    },
    { treeAttr: TREE_ATTR, rowAttr: ROW_ATTR, titleText: title }
  );
}

export async function clickRowByLabel(page: Page, label: string): Promise<boolean> {
  const marked = await markRowByLabel(page, label);
  if (!marked) return false;
  const locator = page.locator(`[${ROW_ATTR}="1"]`).first();
  await locator.scrollIntoViewIfNeeded();
  await locator.click({ force: true });
  await page.waitForTimeout(250);
  return true;
}

export async function clickRowByTitle(page: Page, title: string): Promise<boolean> {
  const marked = await markRowByTitle(page, title);
  if (!marked) return false;
  const locator = page.locator(`[${ROW_ATTR}="1"]`).first();
  try {
    // Scroll the element into view within its own scrollable container,
    // then click.  The tree panel has its own scroll area that
    // scrollIntoViewIfNeeded may not handle correctly.
    await locator.evaluate((el) => el.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(150);
    await locator.click({ force: true });
  } catch {
    // Retry with dispatchEvent if direct click fails (viewport issues).
    await locator.evaluate((el) => el.dispatchEvent(new MouseEvent("click", { bubbles: true })));
  }
  await page.waitForTimeout(250);
  return true;
}

export async function rightClickRowByLabel(page: Page, label: string): Promise<boolean> {
  const marked = await markRowByLabel(page, label);
  if (!marked) return false;
  const locator = page.locator(`[${ROW_ATTR}="1"]`).first();
  await locator.scrollIntoViewIfNeeded();
  await locator.click({ button: "right", force: true });
  await page.waitForTimeout(250);
  return true;
}

export async function rightClickRowByTitle(page: Page, title: string): Promise<boolean> {
  const marked = await markRowByTitle(page, title);
  if (!marked) return false;
  const locator = page.locator(`[${ROW_ATTR}="1"]`).first();
  await locator.scrollIntoViewIfNeeded();
  await locator.click({ button: "right", force: true });
  await page.waitForTimeout(250);
  return true;
}

export async function rowExists(page: Page, label: string): Promise<boolean> {
  return markRowByLabel(page, label);
}

export async function rowExistsByTitle(page: Page, title: string): Promise<boolean> {
  return markRowByTitle(page, title);
}

export async function rowExistsInFolder(page: Page, folderPath: string, fileName: string): Promise<boolean> {
  return page.evaluate(
    ({ treeAttr, folder, name }) => {
      const tree = document.querySelector(`[${treeAttr}="1"]`);
      if (!tree) return false;

      const normalizedFolder = folder.replace(/^\/+|\/+$/g, "");
      const normalizedName = name.trim();
      if (!normalizedFolder || !normalizedName) return false;

      const expectedTitle = `${normalizedFolder}/${normalizedName}`;
      const candidates = Array.from(tree.querySelectorAll("[title]")).filter((el) => {
        const raw = el.getAttribute("title");
        if (!raw) return false;
        const title = raw.replace(/^\/+|\/+$/g, "");
        if (title === expectedTitle) return true;
        return title.startsWith(`${normalizedFolder}/`) && title.endsWith(`/${normalizedName}`);
      });

      return candidates.some((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        return rect.width > 4 && rect.height > 4;
      });
    },
    { treeAttr: TREE_ATTR, folder: folderPath, name: fileName }
  );
}

export async function expandRowByTitle(page: Page, title: string): Promise<boolean> {
  const clicked = await clickRowByTitle(page, title);
  if (!clicked) return false;

  // Tree folders generally expand on ArrowRight when focused.
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(220);
  return true;
}

async function waitForRowByTitle(
  page: Page,
  title: string,
  timeoutMs = 1800
): Promise<boolean> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (await rowExistsByTitle(page, title)) return true;
    await page.waitForTimeout(180);
  }
  return false;
}

async function waitForRowByLabel(
  page: Page,
  label: string,
  timeoutMs = 1800
): Promise<boolean> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (await rowExists(page, label)) return true;
    await page.waitForTimeout(180);
  }
  return false;
}

async function revealChildUnderParent(
  page: Page,
  parentTitle: string,
  childTitle: string
): Promise<boolean> {
  const parentSelected = await clickRowByTitle(page, parentTitle);
  if (!parentSelected) return false;

  if (await waitForRowByTitle(page, childTitle, 900)) return true;

  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(220);

  return waitForRowByTitle(page, childTitle, 1600);
}

async function clickCreateFolderMenuItem(page: Page): Promise<boolean> {
  const locators = [
    page.locator("text=/^New Folder\\.{0,3}$/i").first(),
    page.locator("text=/^Create folder\\.{0,3}$/i").first(),
    page.locator("text=/^Add folder\\.{0,3}$/i").first(),
    page.locator("text=/^New directory\\.{0,3}$/i").first(),
  ];

  for (const locator of locators) {
    if ((await locator.count()) === 0) continue;
    try {
      await locator.waitFor({ state: "visible", timeout: 1200 });
      await locator.click({ force: true });
      await page.waitForTimeout(200);
      return true;
    } catch {
      // Try the next candidate text.
    }
  }

  // Last resort: match any menuitem whose text contains "folder" (case-insensitive).
  const fallback = page.locator('li[role="menuitem"]').filter({ hasText: /folder/i }).first();
  if ((await fallback.count()) > 0) {
    try {
      await fallback.waitFor({ state: "visible", timeout: 1200 });
      await fallback.click({ force: true });
      await page.waitForTimeout(200);
      return true;
    } catch {
      // Fall through.
    }
  }

  return false;
}

async function rightClickTreePanel(page: Page): Promise<boolean> {
  const tree = page.locator(`[${TREE_ATTR}="1"]`).first();
  if ((await tree.count()) === 0) return false;

  try {
    await tree.scrollIntoViewIfNeeded();
    const box = await tree.boundingBox();
    if (!box) return false;

    const x = box.x + Math.min(24, Math.max(8, box.width - 8));
    const y = box.y + Math.min(24, Math.max(8, box.height - 8));
    await page.mouse.click(x, y, { button: "right" });
    await page.waitForTimeout(200);
    return true;
  } catch {
    return false;
  }
}

async function debugTreeSnapshot(page: Page): Promise<string> {
  try {
    return await page.evaluate(({ treeAttr }) => {
      const tree = document.querySelector(`[${treeAttr}="1"]`) as HTMLElement | null;
      if (!tree) return "no-marked-tree";

      const titleSamples = Array.from(tree.querySelectorAll("[title]"))
        .map((el) => (el.getAttribute("title") || "").trim())
        .filter(Boolean)
        .slice(0, 20);

      const textSamples = Array.from(tree.querySelectorAll("span,div,button"))
        .map((el) => ((el as HTMLElement).innerText || el.textContent || "").replace(/\s+/g, " ").trim())
        .filter((t) => t.length > 0 && t.length < 120)
        .slice(0, 20);

      return `titles=${JSON.stringify(titleSamples)} texts=${JSON.stringify(textSamples)}`;
    }, { treeAttr: TREE_ATTR });
  } catch (error) {
    return `snapshot-error:${error instanceof Error ? error.message : String(error)}`;
  }
}

export async function ensureFolderPath(page: Page, folderPath: string): Promise<void> {
  const segments = folderPath
    .split("/")
    .map((part) => normalizeText(part))
    .filter(Boolean);

  if (segments.length === 0) {
    throw new Error("Folder path is empty");
  }

  // Build accumulated paths: ["client", "client/components", "client/components/ld"]
  const accumulatedPaths: string[] = [];
  for (let i = 0; i < segments.length; i++) {
    accumulatedPaths.push(segments.slice(0, i + 1).join("/"));
  }

  const clickByTitleVariants = async (title: string): Promise<boolean> => {
    return (await clickRowByTitle(page, title)) || (await clickRowByTitle(page, `/${title}`));
  };

  const waitForTitleVariants = async (title: string, timeoutMs = 1800): Promise<boolean> => {
    return (await waitForRowByTitle(page, title, timeoutMs)) || (await waitForRowByTitle(page, `/${title}`, timeoutMs));
  };

  // First segment: try title-based lookup first, then fall back to label.
  const rootTitle = accumulatedPaths[0];
  let rootOk = await clickByTitleVariants(rootTitle);
  if (!rootOk) {
    rootOk = await clickRowByLabel(page, segments[0]);
  }
  if (!rootOk) {
    const rootContextOpened = await rightClickTreePanel(page);
    if (!rootContextOpened) {
      const snapshot = await debugTreeSnapshot(page);
      throw new Error(`Could not find root folder "${segments[0]}" in ALL FILES tree (${snapshot})`);
    }

    const created = await clickCreateFolderMenuItem(page);
    if (!created) {
      await page.keyboard.press("Escape");
      throw new Error(`Could not find a "Create folder" menu item for root folder "${segments[0]}"`);
    }

    await page.keyboard.press("Meta+a");
    await page.waitForTimeout(80);
    await page.keyboard.type(segments[0]);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(800);

    rootOk = (await clickByTitleVariants(rootTitle)) || (await clickRowByLabel(page, segments[0]));
    if (!rootOk) {
      const snapshot = await debugTreeSnapshot(page);
      throw new Error(`Could not create root folder "${segments[0]}" in ALL FILES tree (${snapshot})`);
    }
  }

  for (let i = 1; i < segments.length; i++) {
    const currentTitle = accumulatedPaths[i];
    const parentTitle = accumulatedPaths[i - 1];
    const segmentName = segments[i];

    // Check if the folder already exists by its full accumulated path.
    const exists = await waitForTitleVariants(currentTitle, 1200);
    if (exists) {
      await clickByTitleVariants(currentTitle);
      continue;
    }

    // Try expanding the parent to reveal the child.
    const revealed = await revealChildUnderParent(page, parentTitle, currentTitle);
    if (revealed) {
      await clickByTitleVariants(currentTitle);
      continue;
    }

    // Folder doesn't exist — right-click the parent (by full path) to create it.
    let parentReady =
      (await rightClickRowByTitle(page, parentTitle)) ||
      (await rightClickRowByTitle(page, `/${parentTitle}`));
    if (!parentReady) {
      parentReady = await rightClickRowByLabel(page, segments[i - 1]);
    }
    if (!parentReady) {
      throw new Error(`Could not right-click parent folder "${parentTitle}"`);
    }

    const created = await clickCreateFolderMenuItem(page);
    if (!created) {
      await page.keyboard.press("Escape");
      throw new Error(`Could not find a "Create folder" menu item under "${parentTitle}"`);
    }

    // Tree UIs typically focus an inline rename input after "create folder".
    await page.keyboard.press("Meta+a");
    await page.waitForTimeout(80);
    await page.keyboard.type(segmentName);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(800);

    // Verify the newly created folder appeared — try title first, then label.
    let nowExists = await waitForTitleVariants(currentTitle, 2500);
    if (!nowExists) {
      nowExists = await waitForRowByLabel(page, segmentName, 2500);
    }
    if (!nowExists) {
      throw new Error(`Folder "${segmentName}" (${currentTitle}) did not appear after creation attempt`);
    }
    // Select it — prefer title to avoid ambiguity.
    const clicked = (await clickByTitleVariants(currentTitle)) || (await clickRowByLabel(page, segmentName));
    if (!clicked) {
      throw new Error(`Could not select newly created folder "${currentTitle}"`);
    }
  }
}

