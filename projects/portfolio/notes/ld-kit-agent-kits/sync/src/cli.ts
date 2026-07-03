#!/usr/bin/env tsx
/**
 * GenLD Sync CLI — unified entry point for all sync targets.
 *
 * Usage:
 *   npx tsx sync/src/cli.ts                  # interactive menu
 *   npx tsx sync/src/cli.ts builder sync     # direct Builder sync
 */
import prompts from "prompts";
import { Command } from "commander";
import {
  registerCommands as registerBuilderCommands,
  runBuilderMenu,
} from "../builder/src/cli.js";

process.on("SIGINT", () => process.exit(0));

// ---------------------------------------------------------------------------
// Interactive menu
// ---------------------------------------------------------------------------

async function runInteractive() {
  console.log("\n=== GenLD Sync CLI ===\n");

  while (true) {
    const { target } = await prompts({
      type: "select",
      name: "target",
      message: "Select a sync target:",
      choices: [
        { title: "Builder", value: "builder" },
        { title: "Exit", value: "exit" },
      ],
    });

    if (!target || target === "exit") {
      console.log("Goodbye!");
      break;
    }

    if (target === "builder") {
      await runBuilderMenu();
    }
  }
}

// ---------------------------------------------------------------------------
// CLI program
// ---------------------------------------------------------------------------

const program = new Command();

program
  .name("ld-sync")
  .description("LD Sync CLI — sync files to various targets")
  .version("0.1.0");

program
  .command("interactive", { isDefault: true })
  .description("Launch interactive menu")
  .action(runInteractive);

registerBuilderCommands(program);

program.parse();
