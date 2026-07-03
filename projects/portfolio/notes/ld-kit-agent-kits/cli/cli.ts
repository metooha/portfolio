#!/usr/bin/env node
/**
 * ld-kit CLI — top-level Commander entry point.
 *
 * Usage:
 *   ld-kit init <project-name> [dest]    Scaffold a Living Design project
 *   ld-kit init my-app                    Create ./my-app
 *   ld-kit init my-app /tmp               Create /tmp/my-app
 *   ld-kit init my-app --no-install       Skip npm install post-copy
 */
import { createRequire } from "node:module";
import { Command } from "commander";
import { init } from "./init.js";
import { list, show } from "./components.js";

const require = createRequire(import.meta.url);
// Resolves to <package-root>/package.json — cli.js sits at <package-root>/dist/cli.js,
// so "../package.json" walks up one level (dist → package root).
const pkg = require("../package.json") as { version: string };

process.on("SIGINT", () => process.exit(0));

const program = new Command();

program
  .name("ld-kit")
  .description("Living Design kit — scaffold and sync utilities")
  .version(pkg.version);

program
  .command("init <project-name> [dest]")
  .description("Scaffold a new Living Design project from the bundled starter template")
  .option("--no-install", "Skip running npm install / npm ci after copying the template")
  .action(
    (
      projectName: string,
      destDir: string | undefined,
      opts: { install: boolean }
    ) => {
      init(projectName, destDir ?? ".", { install: opts.install });
    }
  );

program
  .command("list")
  .description("List every Living Design component with category, import path, and intent")
  .option("--category <category>", "Filter by category: components | patterns")
  .option("--grep <pattern>", "Filter by case-insensitive substring on name or intent")
  .action((opts: { category?: string; grep?: string }) => {
    list({ category: opts.category, grep: opts.grep });
  });

program
  .command("show <name>")
  .description("Print prop API and usage notes for a single component")
  .action((name: string) => {
    show(name);
  });

program.parse();
