import { Page } from "playwright";
import { markRowByLabel, markRowByTitle } from "./tree.js";

const ROW_ATTR = "data-sync-builder-row";
const TREE_ATTR = "data-sync-builder-tree";

/**
 * Upload local file(s) into a folder in the Builder ALL FILES tree using
 * drag-drop simulation.
 *
 * When `rowAlreadyMarked` is true the caller guarantees that the correct
 * folder row already carries the `data-sync-builder-row="1"` attribute
 * (e.g. because it was just clicked via `clickRowByTitle`). This avoids a
 * re-mark that can target the wrong element when the DOM `title` doesn't
 * match the full accumulated path.
 */
export async function uploadFilesByDrop(
  page: Page,
  localFilePaths: string[],
  targetFolderPath: string,
  rowAlreadyMarked = false
): Promise<void> {
  if (localFilePaths.length === 0) {
    throw new Error("No local files provided for drop upload");
  }

  const INPUT_ID = "__sync_builder_upload_input";
  const normalizedFolderPath = targetFolderPath.replace(/^\/+|\/+$/g, "").replace(/^\.$/, "");
  const uploadToRoot = normalizedFolderPath.length === 0;
  const targetFolderLabel = normalizedFolderPath.split("/").filter(Boolean).slice(-1)[0] ?? normalizedFolderPath;

  // Inject a hidden file input.
  await page.evaluate(`(function({ id }) {
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement("input");
      el.id = id; el.type = "file"; el.multiple = true;
      el.style.cssText = "position:fixed;opacity:0;pointer-events:none;top:-9999px";
      document.body.appendChild(el);
    }
  })({ id: ${JSON.stringify(INPUT_ID)} })`);

  await page.locator(`#${INPUT_ID}`).setInputFiles(localFilePaths);

  if (!rowAlreadyMarked) {
    if (uploadToRoot) {
      const hasTree = await page.evaluate(
        ({ treeAttr }) => Boolean(document.querySelector(`[${treeAttr}="1"]`)),
        { treeAttr: TREE_ATTR }
      );
      if (!hasTree) {
        throw new Error("Could not find ALL FILES tree drop target");
      }
    } else {
      const hasRow =
        (normalizedFolderPath ? await markRowByTitle(page, normalizedFolderPath) : false) ||
        (targetFolderLabel ? await markRowByLabel(page, targetFolderLabel) : false);
      if (!hasRow) {
        throw new Error(
          `Could not find drop target folder row "${normalizedFolderPath || targetFolderLabel}"`
        );
      }
    }
  } else {
    if (uploadToRoot) {
      const hasTree = await page.evaluate(
        ({ treeAttr }) => Boolean(document.querySelector(`[${treeAttr}="1"]`)),
        { treeAttr: TREE_ATTR }
      );
      if (!hasTree) {
        throw new Error("Tree was expected to be marked for root upload but was not found");
      }
    } else {
      // Verify the pre-marked row still exists in the DOM.
      const markedExists = await page.evaluate(
        ({ rowAttr }) => Boolean(document.querySelector(`[${rowAttr}="1"]`)),
        { rowAttr: ROW_ATTR }
      );
      if (!markedExists) {
        throw new Error(
          `Row was expected to be pre-marked for "${normalizedFolderPath}" but no marked row found`
        );
      }
    }
  }

  const result: { ok: boolean; reason?: string; files?: number } = await page.evaluate(
    ({ inputId, rowAttr, treeAttr, toRoot }) => {
      const input = document.getElementById(inputId) as HTMLInputElement | null;
      if (!input || !input.files || !input.files.length) return { ok: false, reason: "no-files" };

      const dropTarget = toRoot
        ? document.querySelector(`[${treeAttr}="1"]`)
        : document.querySelector(`[${rowAttr}="1"]`);
      if (!dropTarget) {
        return { ok: false, reason: toRoot ? "no-tree" : "no-row" };
      }

      const dt = new DataTransfer();
      for (let i = 0; i < input.files.length; i++) {
        const original = input.files[i];
        const fileName = original.name || "";
        const extension = fileName.includes(".")
          ? fileName.split(".").pop()?.toLowerCase() ?? ""
          : "";

        // Builder can treat unknown extensions like .mdc as binary unless MIME is text.
        const fileForDrop =
          extension === "mdc"
            ? new File([original], original.name, {
                type: "text/markdown",
                lastModified: original.lastModified,
              })
            : original;

        dt.items.add(fileForDrop);
      }
      const opts = { bubbles: true, cancelable: true, dataTransfer: dt };
      dropTarget.dispatchEvent(new DragEvent("dragenter", opts));
      dropTarget.dispatchEvent(new DragEvent("dragover", opts));
      dropTarget.dispatchEvent(new DragEvent("drop", opts));
      input.remove();
      return { ok: true, files: dt.files.length };
    },
    { inputId: INPUT_ID, rowAttr: ROW_ATTR, treeAttr: TREE_ATTR, toRoot: uploadToRoot }
  );

  if (!result.ok) {
    throw new Error(`Drop dispatch failed: ${result.reason ?? "unknown"}`);
  }
}

export async function uploadFileByDrop(
  page: Page,
  localFilePath: string,
  targetFolderPath: string,
  rowAlreadyMarked = false
): Promise<void> {
  await uploadFilesByDrop(page, [localFilePath], targetFolderPath, rowAlreadyMarked);
}

export type FolderFileEntry = {
  /** Relative path from the folder root, e.g., "WCPButton/WCPButton.tsx" */
  relativePath: string;
  /** Base64-encoded file content */
  contentBase64: string;
};

/**
 * Upload an entire folder into Builder using drag-drop simulation with mock
 * FileSystemEntry objects.  Builder traverses the dropped directory via
 * `webkitGetAsEntry()` and creates all sub-folders automatically — no need
 * to pre-create each one individually.
 */
export async function uploadFolderByDrop(
  page: Page,
  folderName: string,
  entries: FolderFileEntry[],
  targetFolderPath: string,
  rowAlreadyMarked = false
): Promise<void> {
  if (entries.length === 0) {
    throw new Error("No entries provided for folder drop upload");
  }

  const normalizedFolderPath = targetFolderPath.replace(/^\/+|\/+$/g, "").replace(/^\.$/, "");
  const uploadToRoot = normalizedFolderPath.length === 0;
  const targetFolderLabel = normalizedFolderPath.split("/").filter(Boolean).slice(-1)[0] ?? normalizedFolderPath;

  if (!rowAlreadyMarked) {
    if (uploadToRoot) {
      const hasTree = await page.evaluate(
        ({ treeAttr }) => Boolean(document.querySelector(`[${treeAttr}="1"]`)),
        { treeAttr: TREE_ATTR }
      );
      if (!hasTree) throw new Error("Could not find ALL FILES tree drop target");
    } else {
      const hasRow =
        (normalizedFolderPath ? await markRowByTitle(page, normalizedFolderPath) : false) ||
        (targetFolderLabel ? await markRowByLabel(page, targetFolderLabel) : false);
      if (!hasRow) {
        throw new Error(
          `Could not find drop target folder row "${normalizedFolderPath || targetFolderLabel}"`
        );
      }
    }
  }

  // The evaluate body MUST be a string — tsx (esbuild with keepNames) wraps
  // every function expression with __name() which doesn't exist in the
  // browser page context.  Arguments are embedded via JSON.stringify so they
  // are available inside the IIFE.
  const evalArgs = JSON.stringify({
    folderName,
    entries,
    rowAttr: ROW_ATTR,
    treeAttr: TREE_ATTR,
    toRoot: uploadToRoot,
  });

  const result: { ok: boolean; reason?: string; fileCount?: number } = await page.evaluate(
    `(function(args) {
      var folderName = args.folderName;
      var entries = args.entries;
      var rowAttr = args.rowAttr;
      var treeAttr = args.treeAttr;
      var toRoot = args.toRoot;

      var b64ToArrayBuffer = function(b64) {
        var bin = atob(b64);
        var buf = new ArrayBuffer(bin.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < bin.length; i++) view[i] = bin.charCodeAt(i);
        return buf;
      };

      var mimeFromName = function(name) {
        var ext = name.indexOf(".") !== -1 ? name.split(".").pop().toLowerCase() : "";
        if (ext === "ts" || ext === "tsx" || ext === "js" || ext === "jsx" || ext === "mjs") return "text/javascript";
        if (ext === "css") return "text/css";
        if (ext === "html") return "text/html";
        if (ext === "json") return "application/json";
        if (ext === "md" || ext === "mdc") return "text/markdown";
        if (ext === "svg") return "image/svg+xml";
        return "application/octet-stream";
      };

      var getOrCreateDir = function(node, pathParts) {
        var current = node;
        for (var p = 0; p < pathParts.length; p++) {
          var seg = pathParts[p];
          var child = current.children.get(seg);
          if (!child) {
            child = { name: seg, children: new Map(), files: [] };
            current.children.set(seg, child);
          }
          current = child;
        }
        return current;
      };

      var root = { name: folderName, children: new Map(), files: [] };

      for (var e = 0; e < entries.length; e++) {
        var entry = entries[e];
        var parts = entry.relativePath.split("/").filter(Boolean);
        var fileName = parts.pop();
        var dir = parts.length > 0 ? getOrCreateDir(root, parts) : root;
        dir.files.push({ name: fileName, data: b64ToArrayBuffer(entry.contentBase64) });
      }

      var createMockFileEntry = function(name, fullPath, data) {
        return {
          isFile: true,
          isDirectory: false,
          name: name,
          fullPath: fullPath,
          file: function(successCb) {
            successCb(new File([data], name, { type: mimeFromName(name) }));
          }
        };
      };

      var createMockDirEntry = function(node, parentPath) {
        var fullPath = parentPath + "/" + node.name;
        var childEntries = [];

        node.children.forEach(function(child) {
          childEntries.push(createMockDirEntry(child, fullPath));
        });

        for (var f = 0; f < node.files.length; f++) {
          var file = node.files[f];
          childEntries.push(createMockFileEntry(file.name, fullPath + "/" + file.name, file.data));
        }

        return {
          isFile: false,
          isDirectory: true,
          name: node.name,
          fullPath: fullPath,
          createReader: function() {
            var hasRead = false;
            return {
              readEntries: function(cb) {
                if (!hasRead) {
                  hasRead = true;
                  cb(childEntries);
                } else {
                  cb([]);
                }
              }
            };
          }
        };
      };

      var rootEntry = createMockDirEntry(root, "");

      var dt = new DataTransfer();
      var dummyFile = new File([""], folderName);
      dt.items.add(dummyFile);

      var origMethod = DataTransferItem.prototype.webkitGetAsEntry;
      DataTransferItem.prototype.webkitGetAsEntry = function() {
        return rootEntry;
      };

      var dropTarget = toRoot
        ? document.querySelector("[" + treeAttr + '="1"]')
        : document.querySelector("[" + rowAttr + '="1"]');

      if (!dropTarget) {
        DataTransferItem.prototype.webkitGetAsEntry = origMethod;
        return { ok: false, reason: toRoot ? "no-tree" : "no-row" };
      }

      var evtOpts = { bubbles: true, cancelable: true, dataTransfer: dt };
      dropTarget.dispatchEvent(new DragEvent("dragenter", evtOpts));
      dropTarget.dispatchEvent(new DragEvent("dragover", evtOpts));
      dropTarget.dispatchEvent(new DragEvent("drop", evtOpts));

      DataTransferItem.prototype.webkitGetAsEntry = origMethod;

      return { ok: true, fileCount: entries.length };
    })(${evalArgs})`
  );

  if (!result.ok) {
    throw new Error(`Folder drop dispatch failed: ${result.reason ?? "unknown"}`);
  }
}
