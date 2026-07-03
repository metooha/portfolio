import { readdir } from "fs/promises";
import { statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import prompts from "prompts";
import type { Command } from "commander";
import { runBuilderSmokeUpload } from "./sync.js";

const PROJECTS_DIR = "projects";

// Resolve projects/ relative to this file's location (sync/builder/src/ -> sync/builder/)
const BUILDER_DIR = dirname(fileURLToPath(import.meta.url));
const BUILDER_ROOT = resolve(BUILDER_DIR, "..");
const DEFAULT_PROCESS = process.env.BUILDER_SMOKE_PROCESS?.trim() || "living-design";
const DEFAULT_PROCESS_PATH = `${PROJECTS_DIR}/${DEFAULT_PROCESS}`;

// Exit cleanly on Ctrl+C during prompts
process.on("SIGINT", () => process.exit(0));

async function listSelectableProcesses(): Promise<string[]> {
  const projectsDir = resolve(BUILDER_ROOT, PROJECTS_DIR);
  let entries;
  try {
    entries = await readdir(projectsDir, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => `${PROJECTS_DIR}/${entry.name}`)
    .sort((a, b) => a.localeCompare(b));
}

function normalizeProcessSelection(selection: string): string {
  const normalized = selection
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\.\/+/, "")
    .replace(/\/+$/, "");
  if (normalized.length === 0) return DEFAULT_PROCESS;

  const candidate = normalized.startsWith(`${PROJECTS_DIR}/`)
    ? normalized
    : `${PROJECTS_DIR}/${normalized}`;

  try {
    if (statSync(resolve(BUILDER_ROOT, candidate)).isDirectory()) {
      return candidate.slice(`${PROJECTS_DIR}/`.length);
    }
  } catch {
    /* fallback */
  }

  return normalized.startsWith(`${PROJECTS_DIR}/`)
    ? normalized.slice(`${PROJECTS_DIR}/`.length)
    : normalized;
}

function aborted(res: Record<string, unknown>) {
  return Object.values(res).some((v) => v === undefined);
}

async function promptSelectProcess(): Promise<string> {
  const folders = await listSelectableProcesses();

  if (folders.length === 0) {
    const res = await prompts({
      type: "text",
      name: "process",
      message: "Process folder to use:",
      initial: DEFAULT_PROCESS_PATH,
    });
    return res.process ?? DEFAULT_PROCESS_PATH;
  }

  const choices = [
    ...folders.map((folder) => ({ title: folder, value: folder })),
    { title: "Custom path...", value: "__custom__" },
  ];

  const defaultIndex = folders.includes(DEFAULT_PROCESS_PATH)
    ? folders.indexOf(DEFAULT_PROCESS_PATH)
    : 0;

  const res = await prompts({
    type: "select",
    name: "process",
    message: "Select a process:",
    choices,
    initial: defaultIndex,
  });

  if (res.process === "__custom__") {
    const custom = await prompts({
      type: "text",
      name: "process",
      message: "Enter custom process path:",
      initial: DEFAULT_PROCESS_PATH,
    });
    return custom.process ?? DEFAULT_PROCESS_PATH;
  }

  return res.process ?? folders[0];
}

export async function runBuilderMenu() {
  const selectedProcess = await promptSelectProcess();
  const processName = normalizeProcessSelection(selectedProcess);

  const opts = await prompts([
    {
      type: "text",
      name: "url",
      message: "Builder URL (leave blank to use BUILDER_URL from .env):",
      initial: process.env.BUILDER_URL ?? "",
    },
    {
      type: "confirm",
      name: "noInspect",
      message: "Close browser automatically after upload?",
      initial: false,
    },
  ]);
  if (aborted(opts)) return;

  await runBuilderSmokeUpload({
    url: opts.url || undefined,
    process: processName,
    noInspect: Boolean(opts.noInspect),
  });
}

export function registerCommands(parent: Command) {
  const builder = parent.command("builder").description("Builder app sync helpers");

  builder
    .command("interactive", { isDefault: true })
    .description("Interactive Builder menu")
    .action(runBuilderMenu);

  builder
    .command("sync")
    .description('Sync all files from a process folder to Builder (example: --process living-design)')
    .option("-u, --url <url>", "Builder URL (fallback: BUILDER_URL env)")
    .option("-p, --process <name>", "process folder to sync (under sync/builder/projects/)")
    .option("--no-inspect", "close browser automatically after upload")
    .action(async (opts: { url?: string; process?: string; inspect: boolean }) => {
      const selectedProcess = opts.process ?? (await promptSelectProcess());
      const processName = normalizeProcessSelection(selectedProcess);

      await runBuilderSmokeUpload({
        url: opts.url,
        process: processName,
        noInspect: !opts.inspect,
      });
    });
}
