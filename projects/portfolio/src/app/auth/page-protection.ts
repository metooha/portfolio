import { getAllCaseStudies, getCaseStudyAccessPassword } from "@/app/data/case-studies-config";
import { otherWork } from "@/app/data/portfolio-data";
import { navigationSections, navigationTopItems } from "@/component-library/navigation";

const PAGE_PASSWORDS_KEY = "portfolio-page-passwords";
const UNLOCKED_PAGES_KEY = "portfolio-unlocked-pages";

export type SitePage = {
  path: string;
  name: string;
  group: "main" | "case-study" | "other-work";
};

export type ComponentLibraryPage = {
  id: string;
  name: string;
  section: string;
  href: string;
};

const MAIN_PAGES: SitePage[] = [
  { path: "/", name: "Home", group: "main" },
  { path: "/about", name: "About", group: "main" },
  { path: "/work", name: "Other Work", group: "main" },
  { path: "/contact", name: "Contact", group: "main" },
];

function readPasswords(): Record<string, string> {
  try {
    const raw = localStorage.getItem(PAGE_PASSWORDS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function writePasswords(passwords: Record<string, string>) {
  localStorage.setItem(PAGE_PASSWORDS_KEY, JSON.stringify(passwords));
}

function readUnlockedPages(): string[] {
  try {
    const raw = sessionStorage.getItem(UNLOCKED_PAGES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUnlockedPages(paths: string[]) {
  sessionStorage.setItem(UNLOCKED_PAGES_KEY, JSON.stringify(paths));
}

export function getSitePages(): SitePage[] {
  const caseStudyPages: SitePage[] = getAllCaseStudies().map((study) => ({
    path: study.path,
    name: study.title,
    group: "case-study" as const,
  }));

  const otherWorkPages: SitePage[] = otherWork.map((work) => ({
    path: `/other-work/${work.id}`,
    name: work.title,
    group: "other-work" as const,
  }));

  return [...MAIN_PAGES, ...caseStudyPages, ...otherWorkPages];
}

export function getComponentLibraryPages(): ComponentLibraryPage[] {
  const topPages = navigationTopItems.map((item) => ({
    id: item.id,
    name: item.name,
    section: "",
    href: `/component-library#${item.id}`,
  }));

  const sectionPages = navigationSections.flatMap((section) =>
    section.items.map((item) => ({
      id: item.id,
      name: item.name,
      section: section.title,
      href: `/component-library#${item.id}`,
    })),
  );

  return [...topPages, ...sectionPages];
}

export function getPagePassword(path: string): string | null {
  const passwords = readPasswords();
  if (path in passwords) {
    const stored = passwords[path];
    return stored?.trim() ? stored : null;
  }

  return getCaseStudyAccessPassword(path);
}

export function isPageProtected(path: string): boolean {
  return getPagePassword(path) !== null;
}

export function setPagePassword(path: string, password: string | null) {
  const passwords = readPasswords();
  const trimmed = password?.trim() ?? "";

  if (trimmed) {
    passwords[path] = trimmed;
  } else {
    delete passwords[path];
  }

  writePasswords(passwords);

  if (!trimmed) {
    const unlocked = readUnlockedPages().filter((entry) => entry !== path);
    writeUnlockedPages(unlocked);
  }
}

export function isPageUnlocked(path: string): boolean {
  return readUnlockedPages().includes(path);
}

export function unlockPage(path: string, password: string): boolean {
  const expected = getPagePassword(path);
  if (!expected || password !== expected) {
    return false;
  }

  const unlocked = readUnlockedPages();
  if (!unlocked.includes(path)) {
    writeUnlockedPages([...unlocked, path]);
  }

  return true;
}

export function getAllPageProtectionStatus(): Record<string, boolean> {
  const pages = getSitePages();
  const status: Record<string, boolean> = {};

  for (const page of pages) {
    status[page.path] = isPageProtected(page.path);
  }

  return status;
}
