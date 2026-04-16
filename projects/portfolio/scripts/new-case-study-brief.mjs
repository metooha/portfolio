#!/usr/bin/env node
/**
 * Copies templates/case-study-brief/_template → briefs/<slug>/ and substitutes placeholders.
 * Usage: node scripts/new-case-study-brief.mjs <kebab-slug> [caseStudyId]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const portfolioRoot = path.resolve(__dirname, "..");
const templateDir = path.join(portfolioRoot, "templates/case-study-brief/_template");

const slug = process.argv[2]?.trim();
const caseStudyIdArg = (process.argv[3] ?? "").trim();

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error(
    "Usage: npm run new-case-study-brief -- <kebab-slug> [caseStudyId]\n" +
      "Example: npm run new-case-study-brief -- acme-platform 5"
  );
  process.exit(1);
}

function toTitleCaseFromSlug(s) {
  return s
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function toPascalCaseFromSlug(s) {
  return s
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

const title = toTitleCaseFromSlug(slug);
const componentName = `${toPascalCaseFromSlug(slug)}CaseStudy`;
const cardTitle = title;

const destDir = path.join(portfolioRoot, "briefs", slug);

if (fs.existsSync(destDir)) {
  console.error(`Destination already exists: ${destDir}`);
  process.exit(1);
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursive(templateDir, destDir);

const replacements = new Map([
  ["__BRIEF_SLUG__", slug],
  ["__COMPONENT_NAME__", componentName],
  ["__CASE_STUDY_TITLE__", title],
  ["__CASE_STUDY_CARD_TITLE__", cardTitle],
]);
if (caseStudyIdArg) {
  replacements.set("__CASE_STUDY_ID__", caseStudyIdArg);
}

function replaceInFile(filePath) {
  const ext = path.extname(filePath);
  if (![".md", ".yaml", ".yml", ".txt"].includes(ext)) return;
  let text = fs.readFileSync(filePath, "utf8");
  for (const [from, to] of replacements) {
    text = text.split(from).join(to);
  }
  fs.writeFileSync(filePath, text, "utf8");
}

function walkReplace(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) walkReplace(p);
    else replaceInFile(p);
  }
}

walkReplace(destDir);

console.log(`Created brief pack at:\n  ${destDir}\n`);
console.log(`Component name: ${componentName}`);
console.log(
  `Case study id: ${caseStudyIdArg || "(set __CASE_STUDY_ID__ in manifest.yaml — re-run with a second arg to substitute)"}`
);
console.log(`\nNext: edit manifest.yaml and content/*.md, add assets, then zip or hand off to Cursor.`);
