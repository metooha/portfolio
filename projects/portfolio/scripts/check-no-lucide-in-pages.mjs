#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const portfolioRoot = path.resolve(__dirname, "..");

const TARGET_DIRS = [
  "src/app/pages",
  "src/app/auth",
].map((dir) => path.join(portfolioRoot, dir));

const TARGET_FILES = [
  path.join(portfolioRoot, "src/app/components/header.tsx"),
  path.join(portfolioRoot, "src/app/components/footer.tsx"),
];

const LUCIDE_PATTERN = /from\s+['"]lucide-react['"]/;

function collectFiles(dir) {
  const entries = readdirSync(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...collectFiles(fullPath));
      continue;
    }
    if (entry.endsWith(".tsx") || entry.endsWith(".ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

const filesToCheck = [
  ...TARGET_DIRS.flatMap((dir) => collectFiles(dir)),
  ...TARGET_FILES,
];

const violations = [];

for (const file of filesToCheck) {
  const contents = readFileSync(file, "utf8");
  if (LUCIDE_PATTERN.test(contents)) {
    violations.push(path.relative(portfolioRoot, file));
  }
}

if (violations.length > 0) {
  console.error("lucide-react imports are not allowed in portfolio pages/auth/header/footer:");
  for (const file of violations) {
    console.error(`  - ${file}`);
  }
  process.exit(1);
}

console.log("No lucide-react imports found in guarded portfolio UI files.");
