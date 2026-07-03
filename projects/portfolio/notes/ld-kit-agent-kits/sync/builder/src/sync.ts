#!/usr/bin/env tsx
import { basename, dirname, relative, resolve } from "path";
import { existsSync, readdirSync, readFileSync } from "fs";
import type { Page, WebSocket as PlaywrightWebSocket } from "playwright";
import { loadConfig } from "./config.js";
import { BrowserSession, clickCodeTab, closeBrowser, launchBrowser, navigateToBuilder } from "./browser.js";
import { BuilderSyncOptions } from "./types.js";
import {
  clickRowByLabel,
  clickRowByTitle,
  ensureFolderPath,
  expandRowByTitle,
  rowExistsInFolder,
  rowExistsByTitle,
  waitForAllFilesTree,
} from "./tree.js";
import { uploadFileByDrop, uploadFilesByDrop, uploadFolderByDrop } from "./upload.js";
import type { FolderFileEntry } from "./upload.js";

function step(label: string) {
  console.log(`\n▸ ${label}`);
}

function detail(msg: string) {
  console.log(`  ${msg}`);
}

type WsCounters = {
  opened: number;
  closed: number;
  sent: number;
  received: number;
  lastActivityAt: number;
};

type WaitForWsSettleResult = {
  settled: boolean;
  sawActivity: boolean;
  elapsedMs: number;
  deltaSent: number;
  deltaReceived: number;
};

type TimingTraceHandle = {
  stop: () => Promise<void>;
};

const BUILDER_PROJECTS_ROOT = resolve(process.cwd(), "sync/builder/projects");
const DEFAULT_SMOKE_PROCESS = "smoke";

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isTruthyFlag(value: string | undefined): boolean {
  if (!value) return false;
  return /^(1|true|yes|on)$/i.test(value.trim());
}

function createWebSocketTracker(page: Page, urlFilter: RegExp) {
  const counters: WsCounters = {
    opened: 0,
    closed: 0,
    sent: 0,
    received: 0,
    lastActivityAt: Date.now(),
  };

  const trackedSockets = new WeakSet<PlaywrightWebSocket>();

  const onWebSocket = (ws: PlaywrightWebSocket) => {
    const wsUrl = ws.url();
    if (!urlFilter.test(wsUrl)) return;
    if (trackedSockets.has(ws)) return;
    trackedSockets.add(ws);

    counters.opened++;
    counters.lastActivityAt = Date.now();

    ws.on("framesent", () => {
      counters.sent++;
      counters.lastActivityAt = Date.now();
    });
    ws.on("framereceived", () => {
      counters.received++;
      counters.lastActivityAt = Date.now();
    });
    ws.on("close", () => {
      counters.closed++;
      counters.lastActivityAt = Date.now();
    });
  };

  page.on("websocket", onWebSocket);

  return {
    snapshot(): WsCounters {
      return { ...counters };
    },
    async waitForSettleSince(
      baseline: WsCounters,
      opts?: { timeoutMs?: number; quietMs?: number; probeMs?: number }
    ): Promise<WaitForWsSettleResult> {
      const timeoutMs = opts?.timeoutMs ?? 25000;
      const quietMs = opts?.quietMs ?? 1500;
      const probeMs = opts?.probeMs ?? 2500;
      const startedAt = Date.now();

      let sawActivity = false;
      while (Date.now() - startedAt < timeoutMs) {
        const now = Date.now();
        const current = { ...counters };
        const deltaSent = current.sent - baseline.sent;
        const deltaReceived = current.received - baseline.received;
        const deltaOpened = current.opened - baseline.opened;
        const deltaClosed = current.closed - baseline.closed;
        if (deltaSent > 0 || deltaReceived > 0 || deltaOpened > 0 || deltaClosed > 0) {
          sawActivity = true;
        }

        const idleForMs = now - current.lastActivityAt;
        const elapsedMs = now - startedAt;

        if (sawActivity && idleForMs >= quietMs) {
          return { settled: true, sawActivity, elapsedMs, deltaSent, deltaReceived };
        }

        if (!sawActivity && elapsedMs >= probeMs) {
          return { settled: true, sawActivity, elapsedMs, deltaSent, deltaReceived };
        }

        await page.waitForTimeout(200);
      }

      const current = { ...counters };
      return {
        settled: false,
        sawActivity,
        elapsedMs: Date.now() - startedAt,
        deltaSent: current.sent - baseline.sent,
        deltaReceived: current.received - baseline.received,
      };
    },
    dispose() {
      page.off("websocket", onWebSocket);
    },
  };
}

function startUploadTimingTrace(
  page: Page,
  wsTracker: { snapshot: () => WsCounters },
  targetFolderLabel: string,
  fileName: string
): TimingTraceHandle {
  let stopped = false;
  const startedAt = Date.now();

  const loop = (async () => {
    while (!stopped) {
      const elapsedMs = Date.now() - startedAt;
      try {
        // page.evaluate(string) returns Promise<unknown>; assert the shape
        // produced by the inline IIFE below so TS narrows treeState.* below.
        const treeState = (await page.evaluate(
          `(function({ targetLabel, name }) {
            var rows = Array.from(document.querySelectorAll("[title]"));
            var countVisibleRowsByTitle = function(title) {
              return rows.filter(function(el) {
                if (el.getAttribute("title") !== title) return false;
                var rect = el.getBoundingClientRect();
                return rect.width > 4 && rect.height > 4;
              }).length;
            };

            var codeButton = Array.from(document.querySelectorAll("button")).find(function(btn) {
              var text = (btn.innerText || "").replace(/\\s+/g, " ").trim();
              return text === "Code";
            });

            return {
              skeleton: Boolean(document.querySelector(".react-loading-skeleton")),
              targetRows: countVisibleRowsByTitle(targetLabel),
              fileRows: countVisibleRowsByTitle(name),
              codeState:
                (codeButton && (codeButton.getAttribute("aria-pressed") || codeButton.getAttribute("aria-selected"))) ||
                "unknown",
            };
          })(${JSON.stringify({ targetLabel: targetFolderLabel, name: fileName })})`
        )) as {
          skeleton: boolean;
          targetRows: number;
          fileRows: number;
          codeState: string;
        };

        const ws = wsTracker.snapshot();
        const wsIdleMs = Date.now() - ws.lastActivityAt;
        console.log(
          `  [trace +${elapsedMs}ms] ` +
            `tree(skeleton=${treeState.skeleton}, targetRows=${treeState.targetRows}, fileRows=${treeState.fileRows}, code=${treeState.codeState}) ` +
            `ws(open=${ws.opened}, sent=${ws.sent}, recv=${ws.received}, idle=${wsIdleMs}ms)`
        );
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.log(`  [trace +${elapsedMs}ms] probe-error: ${msg}`);
      }

      await page.waitForTimeout(1000);
    }
  })();

  return {
    async stop() {
      stopped = true;
      await loop;
    },
  };
}

async function waitForFileAppearance(
  session: BrowserSession,
  targetFolderPath: string,
  fileName: string,
  timeoutMs = 12000
): Promise<boolean> {
  const normalizedFolderPath = normalizeTargetFolderPath(targetFolderPath);
  const targetFilePath = formatTargetFilePath(normalizedFolderPath, fileName);
  const isRootTarget = normalizedFolderPath.length === 0;
  const start = Date.now();

  // Quick check first — file may already be visible.
  if (isRootTarget) {
    if (await rowExistsByTitle(session.page, fileName)) return true;
    if (await rowExistsByTitle(session.page, `/${fileName}`)) return true;
  } else {
    if (await rowExistsByTitle(session.page, targetFilePath)) return true;
    if (await rowExistsInFolder(session.page, normalizedFolderPath, fileName)) return true;
  }

  // Expand once (folder should already be open but just in case).
  if (!isRootTarget) {
    await expandRowByTitle(session.page, normalizedFolderPath);
  }

  while (Date.now() - start < timeoutMs) {
    if (isRootTarget) {
      if (await rowExistsByTitle(session.page, fileName)) return true;
      if (await rowExistsByTitle(session.page, `/${fileName}`)) return true;
    } else {
      if (await rowExistsByTitle(session.page, targetFilePath)) return true;
      if (await rowExistsInFolder(session.page, normalizedFolderPath, fileName)) return true;
    }
    await session.page.waitForTimeout(400);
  }
  return false;
}

type WaitForFilesAppearanceResult = {
  verified: string[];
  missing: string[];
};

async function waitForFilesAppearance(
  session: BrowserSession,
  targetFolderPath: string,
  fileNames: string[],
  timeoutMs = 12000
): Promise<WaitForFilesAppearanceResult> {
  const normalizedFolderPath = normalizeTargetFolderPath(targetFolderPath);
  const isRootTarget = normalizedFolderPath.length === 0;
  const uniqueFileNames = Array.from(new Set(fileNames.map((name) => name.trim()).filter(Boolean)));
  if (uniqueFileNames.length === 0) {
    return { verified: [], missing: [] };
  }

  const pending = new Set(uniqueFileNames);
  const startedAt = Date.now();
  if (!isRootTarget) {
    await expandRowByTitle(session.page, normalizedFolderPath);
  }

  while (Date.now() - startedAt < timeoutMs && pending.size > 0) {
    const visibleNames = await session.page.evaluate(
      ({ folderPath, expectedNames, rootTarget }) => {
        const expected = new Set(expectedNames);
        const seen: string[] = [];
        const rows = Array.from(document.querySelectorAll("[title]"));

        for (const row of rows) {
          const rawTitle = row.getAttribute("title");
          if (!rawTitle) continue;

          const title = rawTitle.replace(/^\/+|\/+$/g, "");
          let fileName = "";
          if (rootTarget) {
            if (title.includes("/")) continue;
            fileName = title;
          } else {
            const prefix = `${folderPath}/`;
            if (!title.startsWith(prefix)) continue;
            const parts = title.split("/");
            fileName = parts[parts.length - 1] ?? "";
          }
          if (!expected.has(fileName)) continue;

          const rect = (row as HTMLElement).getBoundingClientRect();
          if (rect.width <= 4 || rect.height <= 4) continue;
          seen.push(fileName);
        }

        return Array.from(new Set(seen));
      },
      {
        folderPath: normalizedFolderPath,
        expectedNames: Array.from(pending),
        rootTarget: isRootTarget,
      }
    );

    for (const fileName of visibleNames) {
      pending.delete(fileName);
    }

    if (pending.size > 0) {
      await session.page.waitForTimeout(350);
    }
  }

  const missing = uniqueFileNames.filter((name) => pending.has(name));
  const verified = uniqueFileNames.filter((name) => !pending.has(name));
  return { verified, missing };
}

function normalizePathForBuilder(pathValue: string): string {
  return pathValue.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
}

function normalizeTargetFolderPath(pathValue: string): string {
  const normalized = normalizePathForBuilder(pathValue);
  return normalized === "." ? "" : normalized;
}

function formatTargetFolderPath(pathValue: string): string {
  const normalized = normalizeTargetFolderPath(pathValue);
  return normalized || "<root>";
}

function formatTargetFilePath(folderPath: string, fileName: string): string {
  const normalizedFolder = normalizeTargetFolderPath(folderPath);
  return normalizedFolder ? `${normalizedFolder}/${fileName}` : fileName;
}

function collectAllFiles(rootDir: string): string[] {
  const out: string[] = [];
  const stack: string[] = [rootDir];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;

    const entries = readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = resolve(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (entry.isFile() && !entry.name.startsWith(".")) {
        out.push(fullPath);
      }
    }
  }

  out.sort((a, b) => a.localeCompare(b));
  return out;
}

type ResolvedFile = {
  localFilePath: string;
  targetFolderPath: string;
};

type FolderUploadBatch = {
  targetFolderPath: string;
  localFilePaths: string[];
};

function groupFilesByTargetFolder(
  files: ResolvedFile[],
  targetFolderOverride?: string
): FolderUploadBatch[] {
  const grouped = new Map<string, string[]>();

  for (const file of files) {
    const resolvedTargetFolderPath = normalizeTargetFolderPath(
      targetFolderOverride ?? file.targetFolderPath
    );

    const current = grouped.get(resolvedTargetFolderPath);
    if (current) {
      current.push(file.localFilePath);
      continue;
    }
    grouped.set(resolvedTargetFolderPath, [file.localFilePath]);
  }

  return Array.from(grouped.entries()).map(([targetFolderPath, localFilePaths]) => ({
    targetFolderPath,
    localFilePaths,
  }));
}

type FolderDrop = {
  parentPath: string;
  folderName: string;
  localFiles: { localFilePath: string; relativePath: string }[];
};

/**
 * Identify folders that have >= `threshold` direct child folders containing
 * files.  These are candidates for whole-folder drag-and-drop rather than
 * creating each sub-folder individually.
 */
function identifyDropFolders(folderPaths: string[], threshold = 3): Set<string> {
  const directChildFolders = new Map<string, Set<string>>();

  for (const path of folderPaths) {
    const segments = path.split("/");
    for (let i = 1; i < segments.length; i++) {
      const ancestor = segments.slice(0, i).join("/");
      const child = segments.slice(0, i + 1).join("/");
      const existing = directChildFolders.get(ancestor) ?? new Set();
      existing.add(child);
      directChildFolders.set(ancestor, existing);
    }
  }

  const dropFolders = new Set<string>();
  directChildFolders.forEach((children, folder) => {
    // Only qualify folders with enough children that are at least 2 levels
    // deep (e.g. "client/components/ld", "client/fonts").  Top-level
    // folders like "client" already exist in Builder and should be
    // navigated to, not re-dropped at root.
    if (children.size >= threshold && folder.includes("/")) {
      dropFolders.add(folder);
    }
  });

  return dropFolders;
}

/**
 * Split resolved files into whole-folder drops and remaining individual
 * uploads.  Folders with many sub-folders (the "ld" pattern) are dropped as
 * a single unit onto their parent, avoiding dozens of right-click → New Folder
 * interactions.
 */
function planFolderDrops(resolvedFiles: ResolvedFile[]): {
  folderDrops: FolderDrop[];
  remainingFiles: ResolvedFile[];
} {
  const nonRootFiles = resolvedFiles.filter(
    (f) => normalizeTargetFolderPath(f.targetFolderPath).length > 0
  );
  const rootFiles = resolvedFiles.filter(
    (f) => normalizeTargetFolderPath(f.targetFolderPath).length === 0
  );

  const allFolderPaths = Array.from(
    new Set(nonRootFiles.map((f) => normalizeTargetFolderPath(f.targetFolderPath)))
  );

  const dropFolderPaths = identifyDropFolders(allFolderPaths);
  console.log(`  Drop-eligible folders: ${Array.from(dropFolderPaths).join(", ") || "(none)"}`);
  const folderDropMap = new Map<string, FolderDrop>();
  const remainingFiles: ResolvedFile[] = [...rootFiles];

  for (const file of nonRootFiles) {
    const targetPath = normalizeTargetFolderPath(file.targetFolderPath);
    const segments = targetPath.split("/");
    let matched = false;

    for (let i = segments.length; i >= 1; i--) {
      const prefix = segments.slice(0, i).join("/");
      if (dropFolderPaths.has(prefix)) {
        const dropParent = i >= 2 ? segments.slice(0, i - 1).join("/") : "";
        const dropFolderName = segments[i - 1];
        const relPath = segments.slice(i).join("/");
        const fileName = basename(file.localFilePath);
        const fullRelPath = relPath ? `${relPath}/${fileName}` : fileName;

        const dropKey = dropParent ? `${dropParent}/${dropFolderName}` : dropFolderName;
        if (!folderDropMap.has(dropKey)) {
          folderDropMap.set(dropKey, {
            parentPath: dropParent,
            folderName: dropFolderName,
            localFiles: [],
          });
        }
        folderDropMap.get(dropKey)!.localFiles.push({
          localFilePath: file.localFilePath,
          relativePath: fullRelPath,
        });
        matched = true;
        break;
      }
    }

    if (!matched) {
      remainingFiles.push(file);
    }
  }

  return {
    folderDrops: Array.from(folderDropMap.values()),
    remainingFiles,
  };
}

function resolveProcessFiles(processNameRaw: string): ResolvedFile[] {
  const processName = processNameRaw.trim();
  if (!processName) {
    throw new Error('Process name is empty. Pass --process (for example: "living-design").');
  }

  const processDir = resolve(BUILDER_PROJECTS_ROOT, processName);
  if (!existsSync(processDir)) {
    throw new Error(`Process folder does not exist: ${processDir}`);
  }

  const allFiles = collectAllFiles(processDir);
  if (allFiles.length === 0) {
    throw new Error(
      `No files found under process "${processName}".\n` +
      `Expected location: sync/builder/projects/${processName}/`
    );
  }

  const resolved: ResolvedFile[] = [];
  for (const localFilePath of allFiles) {
    const relativePath = normalizePathForBuilder(relative(processDir, localFilePath));
    const folderPath = normalizeTargetFolderPath(dirname(relativePath));
    resolved.push({ localFilePath, targetFolderPath: folderPath });
  }

  return resolved;
}

type UploadSessionContext = {
  session: BrowserSession;
  wsTracker: ReturnType<typeof createWebSocketTracker>;
  traceEnabled: boolean;
};

async function selectAndMarkFolder(
  page: Page,
  normalizedPath: string,
  label: string
): Promise<boolean> {
  return (
    (await clickRowByTitle(page, normalizedPath)) ||
    (await clickRowByLabel(page, label))
  );
}

async function uploadSingleFile(
  ctx: UploadSessionContext,
  filePath: string,
  targetFolderPath: string,
  opts: { folderReady?: boolean }
): Promise<void> {
  const { session, wsTracker, traceEnabled } = ctx;
  const { folderReady } = opts;
  const fileName = basename(filePath);
  const normalizedTargetFolderPath = normalizeTargetFolderPath(targetFolderPath);
  const isRootTarget = normalizedTargetFolderPath.length === 0;
  const targetFolderLabel = isRootTarget
    ? "ALL FILES"
    : normalizedTargetFolderPath.split("/").filter(Boolean).slice(-1)[0];
  const targetFolderDisplay = formatTargetFolderPath(normalizedTargetFolderPath);
  const targetFilePath = formatTargetFilePath(normalizedTargetFolderPath, fileName);

  let timingTrace: TimingTraceHandle | null = null;

  try {
    if (traceEnabled) {
      timingTrace = startUploadTimingTrace(session.page, wsTracker, targetFolderLabel, fileName);
    }

    if (!folderReady && !isRootTarget) {
      step(`Ensuring folder path "${targetFolderDisplay}"`);
      await ensureFolderPath(session.page, normalizedTargetFolderPath);
      detail("Folder path ready");
    }

    if (!isRootTarget) {
      // Select the target folder and mark it as the drop target.
      const selected = await selectAndMarkFolder(
        session.page, normalizedTargetFolderPath, targetFolderLabel
      );
      if (!selected) {
        throw new Error(`Could not select target folder "${targetFolderDisplay}"`);
      }
    }

    step(`Uploading "${fileName}" -> "${targetFolderDisplay}"`);
    const wsBeforeDrop = wsTracker.snapshot();
    await uploadFileByDrop(session.page, filePath, normalizedTargetFolderPath, !isRootTarget);
    detail("Drop dispatched");

    const wsSettled = await wsTracker.waitForSettleSince(wsBeforeDrop, {
      timeoutMs: 15000,
      quietMs: 1200,
      probeMs: 2000,
    });
    if (!wsSettled.settled) {
      detail(
        `WARNING: WS did not settle (${wsSettled.elapsedMs}ms, ` +
          `sent=${wsSettled.deltaSent}, recv=${wsSettled.deltaReceived})`
      );
    } else if (wsSettled.sawActivity) {
      detail(
        `WS settled ${wsSettled.elapsedMs}ms ` +
          `(sent=${wsSettled.deltaSent}, recv=${wsSettled.deltaReceived})`
      );
    }

    const visible = await waitForFileAppearance(session, normalizedTargetFolderPath, fileName);
    if (!visible) {
      detail(`WARNING: "${targetFilePath}" not confirmed in tree (may still have succeeded)`);
    } else {
      detail(`✓ "${fileName}" verified`);
    }
  } finally {
    if (timingTrace) {
      await timingTrace.stop().catch(() => undefined);
    }
  }
}

async function uploadFolderBatch(
  ctx: UploadSessionContext,
  filePaths: string[],
  targetFolderPath: string,
  opts: { folderReady?: boolean }
): Promise<void> {
  if (filePaths.length === 0) return;

  const { session, wsTracker } = ctx;
  const { folderReady } = opts;
  const normalizedTargetFolderPath = normalizeTargetFolderPath(targetFolderPath);
  const isRootTarget = normalizedTargetFolderPath.length === 0;
  const targetFolderDisplay = formatTargetFolderPath(normalizedTargetFolderPath);
  const targetFolderLabel = isRootTarget
    ? "ALL FILES"
    : normalizedTargetFolderPath.split("/").filter(Boolean).slice(-1)[0];
  const fileNames = filePaths.map((path) => basename(path));

  if (!folderReady && !isRootTarget) {
    step(`Ensuring folder path "${targetFolderDisplay}"`);
    await ensureFolderPath(session.page, normalizedTargetFolderPath);
    detail("Folder path ready");
  }

  if (!isRootTarget) {
    const selected = await selectAndMarkFolder(
      session.page, normalizedTargetFolderPath, targetFolderLabel
    );
    if (!selected) {
      throw new Error(`Could not select target folder "${targetFolderDisplay}"`);
    }
  }

  step(`Uploading ${filePaths.length} file(s) -> "${targetFolderDisplay}"`);
  const wsBeforeDrop = wsTracker.snapshot();
  await uploadFilesByDrop(session.page, filePaths, normalizedTargetFolderPath, !isRootTarget);
  detail(`Drop dispatched (${filePaths.length} file(s))`);

  const wsSettled = await wsTracker.waitForSettleSince(wsBeforeDrop, {
    timeoutMs: Math.min(45000, 15000 + filePaths.length * 500),
    quietMs: 1200,
    probeMs: 2000,
  });
  if (!wsSettled.settled) {
    detail(
      `WARNING: WS did not settle (${wsSettled.elapsedMs}ms, ` +
        `sent=${wsSettled.deltaSent}, recv=${wsSettled.deltaReceived})`
    );
  } else if (wsSettled.sawActivity) {
    detail(
      `WS settled ${wsSettled.elapsedMs}ms ` +
        `(sent=${wsSettled.deltaSent}, recv=${wsSettled.deltaReceived})`
    );
  }

  const visibility = await waitForFilesAppearance(
    session,
    normalizedTargetFolderPath,
    fileNames,
    Math.min(45000, 12000 + filePaths.length * 250)
  );
  if (visibility.missing.length > 0) {
    detail(
      `WARNING: ${visibility.missing.length}/${fileNames.length} file(s) not confirmed in tree ` +
        "(may still have succeeded)"
    );
    for (const missingName of visibility.missing.slice(0, 6)) {
      detail(`missing: ${formatTargetFilePath(normalizedTargetFolderPath, missingName)}`);
    }
  } else {
    detail(`✓ ${visibility.verified.length} file(s) verified`);
  }
}

export async function runBuilderUpload(opts: BuilderSyncOptions): Promise<void> {
  const filePath = resolve(opts.localFilePath);
  if (!existsSync(filePath)) {
    throw new Error(`Local file does not exist: ${filePath}`);
  }

  step("Loading config");
  const config = loadConfig(opts.url);
  detail(`URL: ${config.url}`);
  const appHost = new URL(config.url).host;
  const wsUrlFilter = new RegExp(`^wss?://${escapeRegex(appHost)}/`);

  step("Launching browser");
  const session = await launchBrowser(config);
  const wsTracker = createWebSocketTracker(session.page, wsUrlFilter);
  const traceEnabled = isTruthyFlag(process.env.BUILDER_SYNC_TRACE);

  try {
    step("Logging in & opening Builder app");
    await navigateToBuilder(session.page, config);

    step("Opening Code tab");
    await clickCodeTab(session.page);

    step("Waiting for ALL FILES tree");
    await waitForAllFilesTree(session.page);
    detail("Tree detected");

    await uploadSingleFile(
      { session, wsTracker, traceEnabled },
      filePath,
      opts.targetFolderPath,
      {}
    );

    if (opts.noInspect) {
      step("Closing browser");
      wsTracker.dispose();
      await closeBrowser(session.context);
      detail("Done");
    } else {
      wsTracker.dispose();
      console.log("\nBrowser stays open for inspection. Press Ctrl+C to exit.");
      console.log("(Use --no-inspect to close automatically)");
      await new Promise(() => {});
    }
  } finally {
    wsTracker.dispose();
  }
}

export interface BuilderSmokeOptions {
  url?: string;
  process?: string;
  targetFolderPath?: string;
  noInspect: boolean;
}

export async function runBuilderSmokeUpload(opts: BuilderSmokeOptions): Promise<void> {
  const processName = opts.process ?? process.env.BUILDER_SMOKE_PROCESS ?? DEFAULT_SMOKE_PROCESS;
  const resolvedFiles = resolveProcessFiles(processName);
  const targetFolderOverride =
    opts.targetFolderPath ??
    process.env.BUILDER_SMOKE_TARGET_FOLDER_PATH;

  // When a target folder override is set all files go to the same folder —
  // folder-drop optimisation doesn't apply.
  const { folderDrops, remainingFiles } = targetFolderOverride
    ? { folderDrops: [] as FolderDrop[], remainingFiles: resolvedFiles }
    : planFolderDrops(resolvedFiles);

  const folderBatches = groupFilesByTargetFolder(
    remainingFiles.filter((f) => normalizeTargetFolderPath(f.targetFolderPath).length > 0),
    targetFolderOverride
  );

  step(`Discovered ${resolvedFiles.length} file(s) to sync for process "${processName}"`);
  detail(`  ${folderDrops.reduce((n, d) => n + d.localFiles.length, 0)} in folder drops, ${remainingFiles.length} remaining`);
  for (const file of resolvedFiles.slice(0, 10)) {
    detail(`  ${basename(file.localFilePath)} -> ${formatTargetFolderPath(file.targetFolderPath)}`);
  }
  if (resolvedFiles.length > 10) {
    detail(`  ... and ${resolvedFiles.length - 10} more`);
  }
  if (folderDrops.length > 0) {
    step(`Planned ${folderDrops.length} folder drop(s)`);
    for (const drop of folderDrops) {
      detail(
        `Drop "${drop.folderName}" (${drop.localFiles.length} file(s)) -> ` +
          `"${formatTargetFolderPath(drop.parentPath)}"`
      );
    }
  }
  if (folderBatches.length > 0) {
    step(`${folderBatches.length} direct folder batch(es)`);
    for (const batch of folderBatches) {
      detail(`${formatTargetFolderPath(batch.targetFolderPath)} <- ${batch.localFilePaths.length} file(s)`);
    }
  }

  for (const file of resolvedFiles) {
    if (!existsSync(file.localFilePath)) {
      throw new Error(`Local file does not exist: ${file.localFilePath}`);
    }
  }

  step("Loading config");
  const config = loadConfig(opts.url);
  detail(`URL: ${config.url}`);
  const appHost = new URL(config.url).host;
  const wsUrlFilter = new RegExp(`^wss?://${escapeRegex(appHost)}/`);

  step("Launching browser");
  const session = await launchBrowser(config);
  const wsTracker = createWebSocketTracker(session.page, wsUrlFilter);
  const traceEnabled = isTruthyFlag(process.env.BUILDER_SYNC_TRACE);

  try {
    step("Logging in & opening Builder app");
    await navigateToBuilder(session.page, config);

    step("Opening Code tab");
    await clickCodeTab(session.page);

    step("Waiting for ALL FILES tree");
    await waitForAllFilesTree(session.page);
    detail("Tree detected");

    const ensuredFolders = new Set<string>();
    // Track folder trees that were already dropped — any batch targeting
    // a path inside a dropped tree is skipped to prevent duplicates.
    const droppedTrees = new Set<string>();
    const ctx: UploadSessionContext = { session, wsTracker, traceEnabled };

    // Separate root-level remaining files (for paste) from folder batches.
    const rootBatchFiles = remainingFiles
      .filter((f) => normalizeTargetFolderPath(f.targetFolderPath).length === 0)
      .map((f) => f.localFilePath);
    const nonRootBatches = folderBatches.filter(
      (b) => normalizeTargetFolderPath(b.targetFolderPath).length > 0
    );

    const totalSteps =
      folderDrops.length + nonRootBatches.length + rootBatchFiles.length;
    let stepIndex = 0;

    // ── Folder drops ────────────────────────────────────────────────────
    // Drop entire sub-folder trees onto their parent — no need to create
    // each nested folder individually.
    for (const drop of folderDrops) {
      const parentDisplay = formatTargetFolderPath(drop.parentPath);

      // Ensure the parent path exists (e.g. "client/components").
      if (drop.parentPath && !ensuredFolders.has(drop.parentPath)) {
        step(`Ensuring parent folder "${parentDisplay}"`);
        await ensureFolderPath(session.page, drop.parentPath);
        ensuredFolders.add(drop.parentPath);
        detail("Parent folder ready");
      }

      stepIndex++;
      step(
        `[${stepIndex}/${totalSteps}] Dropping folder "${drop.folderName}" ` +
          `(${drop.localFiles.length} file(s)) -> "${parentDisplay}"`
      );

      // Read file contents and base64-encode for the browser.
      const entries: FolderFileEntry[] = drop.localFiles.map((f) => ({
        relativePath: f.relativePath,
        contentBase64: readFileSync(f.localFilePath).toString("base64"),
      }));

      // Re-verify the tree is stable and re-select/mark the parent
      // immediately before dispatching the drop.  Previous drops can
      // cause Builder to re-render the tree, clearing any earlier marks.
      await waitForAllFilesTree(session.page);

      if (drop.parentPath) {
        const parentLabel = drop.parentPath.split("/").filter(Boolean).slice(-1)[0];
        const selected = await selectAndMarkFolder(
          session.page,
          drop.parentPath,
          parentLabel
        );
        if (!selected) {
          throw new Error(`Could not select parent folder "${parentDisplay}"`);
        }
        detail(`Parent "${parentDisplay}" selected and marked`);
      }

      const wsBeforeDrop = wsTracker.snapshot();
      await uploadFolderByDrop(
        session.page,
        drop.folderName,
        entries,
        drop.parentPath,
        Boolean(drop.parentPath) // row already marked by selectAndMarkFolder
      );
      detail("Folder drop dispatched");

      const wsSettled = await wsTracker.waitForSettleSince(wsBeforeDrop, {
        timeoutMs: Math.min(60000, 15000 + drop.localFiles.length * 300),
        quietMs: 2000,
        probeMs: 3000,
      });
      if (!wsSettled.settled) {
        detail(
          `WARNING: WS did not settle (${wsSettled.elapsedMs}ms, ` +
            `sent=${wsSettled.deltaSent}, recv=${wsSettled.deltaReceived})`
        );
      } else if (wsSettled.sawActivity) {
        detail(
          `WS settled ${wsSettled.elapsedMs}ms ` +
            `(sent=${wsSettled.deltaSent}, recv=${wsSettled.deltaReceived})`
        );
      }

      // Mark this tree as dropped so batch uploads skip overlapping paths.
      const dropFolderTitle = drop.parentPath
        ? `${drop.parentPath}/${drop.folderName}`
        : drop.folderName;
      droppedTrees.add(dropFolderTitle);

      // Wait for the tree to fully stabilize before the next drop.
      await session.page.waitForTimeout(3000);

      const folderVisible = await rowExistsByTitle(session.page, dropFolderTitle);
      if (folderVisible) {
        detail(`✓ Folder "${drop.folderName}" verified in tree`);
      } else {
        detail(
          `WARNING: "${dropFolderTitle}" not confirmed in tree (may still have succeeded)`
        );
      }
    }

    // ── Direct folder batches ───────────────────────────────────────────
    for (const batch of nonRootBatches) {
      const targetFolder = normalizeTargetFolderPath(batch.targetFolderPath);
      const targetFolderDisplay = formatTargetFolderPath(targetFolder);

      // Skip if this folder (or any ancestor) was already covered by a
      // folder drop — uploading again would duplicate files.
      const alreadyDropped = Array.from(droppedTrees).some(
        (tree) => targetFolder === tree || targetFolder.startsWith(tree + "/")
      );
      if (alreadyDropped) {
        detail(`Skipping "${targetFolderDisplay}" — already covered by folder drop`);
        continue;
      }

      const folderReady = ensuredFolders.has(targetFolder);
      if (!folderReady) {
        step(`Ensuring folder path "${targetFolderDisplay}"`);
        try {
          await ensureFolderPath(session.page, targetFolder);
        } catch (error) {
          if (targetFolder === ".builder" || targetFolder.startsWith(".builder/")) {
            const message = error instanceof Error ? error.message : String(error);
            detail(`WARNING: Skipping "${targetFolderDisplay}" due to Builder tree limitation (${message})`);
            continue;
          }
          throw error;
        }
        ensuredFolders.add(targetFolder);
        detail("Folder path ready");
      }

      stepIndex++;
      step(
        `[${stepIndex}/${totalSteps}] Syncing ${batch.localFilePaths.length} file(s) -> ${targetFolderDisplay}`
      );
      await uploadFolderBatch(ctx, batch.localFilePaths, targetFolder, {
        folderReady: true,
      });
    }

    // ── Root-level files (paste) ────────────────────────────────────────
    // Root files can't be dropped — Builder has no folder target for the
    // root.  Select the existing file in the tree and paste content via the
    // Monaco editor.
    if (rootBatchFiles.length > 0) {
      for (const filePath of rootBatchFiles) {
        const fileName = basename(filePath);
        stepIndex++;
        step(`[${stepIndex}/${totalSteps}] Syncing "${fileName}" -> <root> (paste)`);

        const selected =
          (await clickRowByTitle(session.page, fileName)) ||
          (await clickRowByTitle(session.page, `/${fileName}`)) ||
          (await clickRowByLabel(session.page, fileName));

        if (!selected) {
          detail(`WARNING: Could not select "${fileName}" in tree — skipping (file must already exist in Builder)`);
          continue;
        }
        detail(`Selected "${fileName}" in tree`);

        await session.page.waitForTimeout(500);

        const content = readFileSync(filePath, "utf-8");
        await session.context.grantPermissions(["clipboard-read", "clipboard-write"]);

        await session.page.mouse.click(900, 400);
        await session.page.waitForTimeout(120);
        await session.page.keyboard.press("Meta+a");
        await session.page.waitForTimeout(80);
        await session.page.evaluate(
          `navigator.clipboard.writeText(${JSON.stringify(content)})`
        );
        await session.page.keyboard.press("Meta+v");
        await session.page.waitForTimeout(250);

        detail(`✓ "${fileName}" content pasted`);
      }
    }

    // ── Verify .ts files via Builder terminal ──────────────────────────
    // Builder maps .ts to video/mp2t and may store content as base64.
    // After all uploads are done, open the terminal and check if any
    // .ts files ended up as base64.
    const tsFileCount = resolvedFiles.filter((f) => {
      const name = basename(f.localFilePath);
      return /\.ts$/i.test(name) && !/\.d\.ts$/i.test(name);
    }).length;

    if (tsFileCount > 0) {
      step(`Verifying ${tsFileCount} .ts file(s) via Builder terminal`);

      // Wait for Builder to finish processing all uploads.
      await session.page.waitForTimeout(3000);

      const newTermBtn = session.page
        .locator('button[aria-label="New Terminal"], button[title="New Terminal"]')
        .first();

      if ((await newTermBtn.count()) > 0) {
        await newTermBtn.click();
        await session.page.waitForTimeout(2000);
        detail("Terminal opened");

        const termInput = session.page.locator(".xterm-helper-textarea").last();
        await session.context.grantPermissions(["clipboard-read", "clipboard-write"]);

        // Run a single command that finds all .ts files with base64 content.
        const verifyCmd =
          `find ~/app/code/client -name '*.ts' ! -name '*.d.ts' ` +
          `-exec sh -c 'head -1 "$1" | grep -qE "^[A-Za-z0-9+/=]{20,}$" && echo "BASE64: $1"' _ {} \\;`;

        await termInput.focus();
        await session.page.waitForTimeout(100);
        await session.page.evaluate(
          `navigator.clipboard.writeText(${JSON.stringify(verifyCmd)})`
        );
        await session.page.keyboard.press("Meta+v");
        await session.page.waitForTimeout(100);
        await session.page.keyboard.press("Enter");
        await session.page.waitForTimeout(3000);

        detail("Verification command sent — check terminal output for BASE64: lines");
      } else {
        detail("WARNING: Could not find New Terminal button — skipping verification");
      }
    }

    if (opts.noInspect) {
      step("Closing browser");
      wsTracker.dispose();
      await closeBrowser(session.context);
      detail("Done");
    } else {
      wsTracker.dispose();
      console.log("\nBrowser stays open for inspection. Press Ctrl+C to exit.");
      console.log("(Use --no-inspect to close automatically)");
      await new Promise(() => {});
    }
  } finally {
    wsTracker.dispose();
  }
}
