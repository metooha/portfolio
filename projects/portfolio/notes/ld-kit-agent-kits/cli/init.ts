/**
 * `ld-kit init` implementation.
 *
 * Copies the bundled Living Design starter template from
 * <package-root>/living-design/ into <destDir>/<projectName>,
 * then runs `npm ci` (if the template ships a lockfile) or `npm install`.
 *
 * Mirrors the UX of ai-registry-marketplace/design/living-design/scripts/scaffold.sh:
 *   - directory-exists guard with red error
 *   - npm ci / npm install selection
 *   - identical "Next steps" output
 *
 * TEMPLATE_DIR is resolved from import.meta.url so it works from any install
 * location once the package is published.
 */
import { cpSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve, relative, isAbsolute, join, sep } from "node:path";
import { fileURLToPath } from "node:url";

const RED = "\x1b[31m";
const RESET = "\x1b[0m";

// From <package-root>/dist/init.js (which import.meta.url points to once compiled),
// walk one level up to <package-root>, then into the bundled template tree.
const TEMPLATE_DIR = fileURLToPath(
  new URL("../living-design", import.meta.url)
);

// Fail fast with a clear, actionable message if the bundled template is
// missing. This only fires if the package tarball was assembled without
// the template (prepack regression, package.json:files misconfig, or a
// corrupted node_modules install) — i.e. the package itself is broken.
// Without this guard, users hit a raw `cpSync` ENOENT stack trace from
// inside `init()` instead of a hint about reinstalling. Checked at module
// load so any subcommand of `ld-kit` surfaces the same diagnostic.
if (!existsSync(TEMPLATE_DIR)) {
  process.stderr.write(
    `${RED}Error: Living Design starter template not found at ${TEMPLATE_DIR}.\nThis @walmart/ld-kit installation appears to be corrupted — try reinstalling the package.${RESET}\n`
  );
  process.exit(1);
}

export interface InitOptions {
  install?: boolean;
}

/**
 * Validate that `projectName` is a single safe path segment.
 * Rejects empty/whitespace-only names, absolute paths, parent-traversal,
 * any path separator, and ASCII control / Windows-reserved characters.
 * On invalid input, prints a red error to stderr and exits non-zero.
 */
function validateProjectName(projectName: string): void {
  if (!projectName || projectName.trim() === "") {
    process.stderr.write(`${RED}Error: project name is required${RESET}\n`);
    process.exit(1);
  }
  if (
    isAbsolute(projectName) ||
    projectName.includes("..") ||
    projectName.includes("/") ||
    projectName.includes(sep) ||
    /[\x00-\x1f<>:"|?*]/.test(projectName)
  ) {
    process.stderr.write(
      `${RED}Error: project name must be a single path segment without "..", separators, or control chars${RESET}\n`
    );
    process.exit(1);
  }
}

export function init(
  projectName: string,
  destDir: string = ".",
  opts: InitOptions = {}
): void {
  validateProjectName(projectName);

  const install = opts.install !== false; // default = install
  const projectPath = resolve(destDir, projectName);

  // Defense-in-depth: assert the resolved path is contained inside destDir.
  // Belt-and-suspenders against any future regression in validateProjectName.
  const resolvedDest = resolve(destDir);
  if (
    projectPath !== resolvedDest &&
    !projectPath.startsWith(resolvedDest + sep)
  ) {
    process.stderr.write(
      `${RED}Error: resolved project path escapes destination directory${RESET}\n`
    );
    process.exit(1);
  }

  // Directory-exists guard — mirrors scaffold.sh:23-26.
  if (existsSync(projectPath)) {
    process.stderr.write(
      `${RED}Error: Directory already exists: ${projectPath}${RESET}\n`
    );
    process.exit(1);
  }

  console.log(`Scaffolding Living Design project: ${projectName}`);
  console.log(`Location: ${projectPath}`);
  console.log("");

  // Copy template.
  // Explicit symlink policy: dereference symlinks to real files at copy time so
  // the user's project never inherits a link pointing back into node_modules or
  // the package author's $HOME. errorOnExist + force:false means we never
  // overwrite anything (the directory-exists guard above handles the top-level
  // collision; this protects nested edge cases).
  console.log("Copying Living Design starter template...");
  cpSync(TEMPLATE_DIR, projectPath, {
    recursive: true,
    dereference: true,
    errorOnExist: true,
    force: false,
    verbatimSymlinks: false,
  });

  if (install) {
    console.log("");
    console.log("Installing dependencies...");
    const hasLockfile = existsSync(join(projectPath, "package-lock.json"));
    const hasPackageJson = existsSync(join(projectPath, "package.json"));

    if (hasLockfile) {
      const result = spawnSync("npm", ["ci"], {
        cwd: projectPath,
        stdio: "inherit",
      });
      if (result.status !== 0) {
        process.stderr.write(
          `${RED}Error: npm ci failed (exit ${result.status})${RESET}\n`
        );
        process.exit(result.status ?? 1);
      }
    } else if (hasPackageJson) {
      const result = spawnSync("npm", ["install"], {
        cwd: projectPath,
        stdio: "inherit",
      });
      if (result.status !== 0) {
        process.stderr.write(
          `${RED}Error: npm install failed (exit ${result.status})${RESET}\n`
        );
        process.exit(result.status ?? 1);
      }
    } else {
      console.log("Warning: No package.json found — skipping install");
    }
  }

  // "Next steps" — identical text to scaffold.sh:55-59.
  // Print the relative form (matches scaffold.sh's `cd <projectName>` UX) when
  // possible, falling back to the absolute path if a relative form would be
  // empty or escape upward (rare with validated projectName).
  const rel = relative(process.cwd(), projectPath);
  const cdTarget = rel && !rel.startsWith("..") ? rel : projectPath;
  console.log("");
  console.log(`Ready! Project created at: ${projectPath}`);
  console.log("");
  console.log("Next steps:");
  console.log(`  cd ${cdTarget}`);
  console.log("  npm run dev");

  // Agent-directed routing block. Tools (Claude Code, wibey, code puppy,
  // VS Code/Copilot) opened at the PARENT directory never auto-load the
  // kit's AGENTS.md/rules from this subdirectory — this stdout lands in the
  // agent's context regardless of cwd, so it is the one reliable channel.
  // Keep it last so it is the final thing in the agent's context.
  console.log("");
  console.log("================================================================");
  console.log("AI AGENT — REQUIRED BEFORE WRITING ANY CODE IN THIS PROJECT:");
  console.log(`  1. Read ${join(projectPath, "AGENTS.md")}`);
  console.log('  2. Complete its "Required Reading" list (rule files for your tool)');
  console.log("Your working directory may be the PARENT of this project.");
  console.log(`Use the absolute path above, or cd into ${projectPath} first.`);
  console.log("================================================================");
}
