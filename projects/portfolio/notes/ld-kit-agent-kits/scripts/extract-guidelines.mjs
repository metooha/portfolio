#!/usr/bin/env node
/**
 * Generate the Living Design component discovery surface from source.
 *
 * Reads every component in `src/components/` and `src/patterns/`, extracts its
 * `Props` interface with the TypeScript compiler API, and emits three
 * artefacts to each sync target:
 *
 *   1. `components.json` — machine-readable manifest (one entry per component:
 *      name, category, importPath, intent, props, optional narrative doc path).
 *   2. Per-component `<Name>.md` co-located with `<Name>.tsx` inside the
 *      synced `src/<category>/<dir>/` directory. Contains prop
 *      API + import + hand-authored usage notes (lifted from
 *      `libs/react/src/<dir>/<Name>.md` when present).
 *   3. `components-index.{mdc,md,instructions.md}` — small always-on rule file
 *      that lists every component with category + import + intent one-liner.
 *
 * Sync targets:
 *   - Skill (Cursor, Claude, Copilot)  →  living-design/
 *   - Builder                          →  sync/builder/projects/living-design/
 *   - Local test instance (when active) → .sandbox/e2e/parent/demo-app/ (see scripts/sandbox-instance.mjs)
 *
 * Usage:
 *   node scripts/extract-guidelines.mjs                  # write to all sync targets
 *   node scripts/extract-guidelines.mjs --scratch <dir>  # write to one scratch dir
 *                                                         # (skips sync target fan-out)
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import {SANDBOX_INSTANCE_REL} from './sandbox-instance.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const SRC_DIR = path.resolve(projectRoot, 'src');
// extract-guidelines walks two source trees and uses SRC_DIR as the base for
// relative paths so categories surface in the path (e.g. 'components/Button',
// 'patterns/Header').
const COMPONENT_DIR = SRC_DIR;
const COMPONENT_SOURCES = [
  path.resolve(SRC_DIR, 'components'),
  path.resolve(SRC_DIR, 'patterns'),
];
const LIBS_SRC = path.resolve(projectRoot, 'libs/react/src');
const SANDBOX_ROOT = path.resolve(projectRoot, SANDBOX_INSTANCE_REL);
const SANDBOX_ACTIVE = fs.existsSync(SANDBOX_ROOT);

const SKIP_DIRS = new Set(['common', 'hooks']);
const SKIP_PROPS = new Set(['className', 'style', 'UNSAFE_className', 'UNSAFE_style']);

const THEMES_BASE_CSS = path.resolve(SRC_DIR, 'themes/base.css');

// Roles agents writing page code actually pick from. Internal-state roles
// (action/field/filter/input/switch/chart/progress) belong to component
// implementations and are intentionally omitted — agents that need them can
// grep base.css.
const TOKEN_ROLE_ORDER = [
  'surface',
  'fill',
  'border',
  'text',
  'link',
  'separator',
  'scrim',
  'notice',
  'rating',
  'loading',
  'page',
  'background',
];

// State-suffixed variants exist for component interaction handling. Agents
// writing pages should reach for the base token; component CSS already wires
// the state variants internally.
const TOKEN_STATE_SUFFIXES = ['hovered', 'focused', 'pressed', 'disabled', 'activated'];

const args = process.argv.slice(2);
const scratchIdx = args.indexOf('--scratch');
const SCRATCH_DIR = scratchIdx >= 0 ? path.resolve(args[scratchIdx + 1]) : null;

// ── intent map ─────────────────────────────────────────────────────────────
// Curated one-liners lifted from the Intent Router in
// `src/context/living-design-guidelines.mdc`. Components not listed here fall
// back to the first non-empty line of their `<Name>.md` (where present).

const COMPONENT_INTENT = {
  Alert: 'Status message (success/info/warning/error)',
  Banner: 'High-impact global announcement; required close',
  Badge: 'Status/label pill — accepts text or count (ReactNode children). Use Badge for any pill with text content; use Tag for integer-only counts.',
  BottomSheet: 'Modal anchored to the bottom of the viewport',
  Breadcrumb: 'Hierarchical path navigation',
  BreadcrumbItem: 'Single breadcrumb entry',
  Button: 'Primary/secondary/tertiary/destructive action',
  ButtonGroup: 'Related action row (children must be Button elements). For structured primary/secondary action pairs with prescribed variants, see ActionGroup.',
  ActionGroup: 'Structured primary/secondary (and optional tertiary) action pair with prescribed Button variants and a fixed layout pattern. For generic button rows, use ButtonGroup instead.',
  Callout: 'Anchored onboarding / coach-mark overlay',
  Card: 'Structured card surface (header / body / footer)',
  CardHeader: 'Card title and leading content',
  CardContent: 'Card body slot',
  CardFooter: 'Card actions slot',
  Carousel: 'Horizontal scrolling content row',
  Checkbox: 'Multi-select choice (group with FormGroup)',
  Chip: 'Interactive filter chip (multi-select; toggles independently)',
  ChipGroup: 'Container for filter-style multi-select chips',
  Collapse: 'Expand / collapse inline content',
  Container: 'Max-width responsive content wrapper',
  ContentMessage: 'Empty / no-results state',
  DataTable: 'Tabular data with sortable columns',
  DateField: 'Date input',
  DatePicker: 'Calendar-style date selector',
  Divider: 'Section separator (needs surrounding margin)',
  ErrorMessage: 'Block-level error state',
  Form: 'Form wrapper',
  FormGroup: 'Group related form controls under a shared label',
  Grid: 'Responsive 12-column layout (always pass hasGutter)',
  GridColumn: 'Grid column (always set sm/md/lg breakpoints)',
  Heading: 'Section heading (use as=h2..h6; never skip levels)',
  Icon: 'Themed font icon (use name + a11yLabel or decorative)',
  IconButton: 'Icon-only interactive button (requires a11yLabel)',
  Image: 'LD-wrapped img with mandatory alt or unsafeDecorative',
  Link: 'Inline text link',
  LinkButton: 'Link styled as a button',
  List: 'Vertical list of items',
  ListItem: 'Single list entry',
  Menu: 'Triggered action menu',
  MenuItem: 'Menu entry',
  Metric: 'KPI / trend display',
  Modal: 'Centered overlay dialog (controlled isOpen)',
  Nudge: 'Coaching hint / reminder',
  Page: 'Page shell (renders main landmark + single h1 + skip link). Exactly ONE Page per app — do not nest a Page inside another Page.',
  Panel: 'Side-drawer overlay (controlled isOpen)',
  Popover: 'Anchored contextual overlay',
  ProgressIndicator: 'Determinate progress bar',
  ProgressTracker: 'Multi-step progress',
  Radio: 'Single-select choice (share name; group via FormGroup)',
  Rating: 'Star rating display',
  Select: 'Option-selection dropdown',
  SegmentedControl: 'One-of-many pill toggle (radiogroup semantics)',
  Skeleton: 'Block loading placeholder',
  SkeletonText: 'Text-line loading placeholder',
  Snackbar: 'Temporary toast-style notification',
  SpotIcon: 'Decorative circular icon treatment',
  Spinner: 'Indeterminate loading indicator',
  Switch: 'Boolean toggle',
  TabNavigation: 'Top-level section tabs',
  TabNavigationItem: 'Tab entry',
  Tag: 'Integer count chip — children MUST be a number (TS-enforced). For text labels, use Badge.',
  TextArea: 'Multi-line text input',
  TextField: 'Single-line text input',
  Tooltip: 'Hover/focus contextual help',
  VisuallyHidden: 'Screen-reader-only text',
  // Shared compositions (now flat under components/)
  Accordion: 'Stacked expandable sections',
  AlertDialog: 'Confirmation dialog (destructive flows)',
  Avatar: 'User / entity portrait',
  CategoryNav: 'Category browse navigation',
  Combobox: 'Searchable single-select input',
  Command: 'Cmd-K command palette',
  ContentCard: 'Editorial / promotional card',
  Dropdown: 'Generic dropdown surface',
  Pagination: 'Page navigation control',
  QuantityStepper: 'Increment/decrement stepper (onChange = absolute count)',
  // Patterns + components formerly prefixed WCP
  Header: 'Full responsive site header (search / cart / account)',
  DesktopFooter: 'Desktop footer',
  MwebFooter: 'Mobile-web footer',
  BottomNav: 'Mobile-web bottom navigation bar',
  SearchBar: 'Site-wide search bar',
  SearchFilterBar: 'Search results filter bar',
  SkylineBanner: 'Promotional skyline banner',
  BasicBanner: 'Generic promotional banner',
  OrderStatusBanner: 'Order-status banner',
  FlashDealsCarousel: 'Built-in flash-deals product row (writes to Store)',
  ItemTile: 'Product tile for carousels (~200px max width)',
  ProductCardGrid: 'Product card sized for responsive grid columns',
  ProductCardList: 'Product card sized for list layouts',
  CarouselProductCard: 'Product card sized for carousel rows',
  HeartView: 'Favorite toggle indicator',
  Flag: 'Inline label / flag pill',
  QueueCard: 'Pickup-queue order card',
  RichSnackbar: 'Rich-content snackbar variant',
  RichMediaSheet: 'Rich media bottom sheet',
  UploadImage: 'Image upload tile',
  TimerView: 'Countdown timer view',
  AccountSideNav: 'Account-section side navigation',
  ActiveCurbsideCard: 'Active curbside order card',
  AutoCareUpsellOfferCard: 'AutoCare upsell offer card',
  ContinueShopping: 'Continue-shopping carousel section',
};

// ── helpers ────────────────────────────────────────────────────────────────

function getComponentFiles() {
  const results = [];
  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, {withFileTypes: true});
    for (const e of entries) {
      if (!e.isDirectory() || SKIP_DIRS.has(e.name)) continue;
      const full = path.join(dir, e.name);
      const children = fs.readdirSync(full);
      const tsxFiles = children.filter(
        (f) =>
          f.endsWith('.tsx') &&
          !f.endsWith('.test.tsx') &&
          !f.endsWith('.stories.tsx'),
      );
      if (tsxFiles.length > 0) {
        results.push(...tsxFiles.map((f) => path.join(full, f)));
      } else {
        walkDir(full);
      }
    }
  }
  for (const source of COMPONENT_SOURCES) walkDir(source);
  results.sort((a, b) => a.localeCompare(b));
  return results;
}

function getCommonFiles() {
  const commonDir = path.resolve(SRC_DIR, 'common');
  try {
    return fs
      .readdirSync(commonDir)
      .filter((f) => f.endsWith('.ts') || f.endsWith('.tsx'))
      .map((f) => path.join(commonDir, f));
  } catch {
    return [];
  }
}

function categoryFromPath(filePath) {
  const rel = path.relative(COMPONENT_DIR, filePath);
  const top = rel.split(path.sep)[0];
  if (top === 'patterns') return 'patterns';
  return 'components';
}

// Relative path from src/ to the directory holding the .tsx, using forward
// slashes. e.g. "components/Button", "patterns/Header".
function relDirFromPath(filePath) {
  return path
    .relative(COMPONENT_DIR, path.dirname(filePath))
    .split(path.sep)
    .join('/');
}

function loadNarrativeDoc(filePath, displayName) {
  // Two narrative locations, in priority order:
  //   1. `libs/react/src/<dir>/<Name>.md` — the vendored Living Design lib.
  //      Authoritative for components originally from `@livingdesign/react`.
  //   2. Co-located with the .tsx in the kit (e.g. `src/components/Page/Page.md`).
  //      Used for kit-local components that aren't in the upstream lib
  //      (`Page`, `RatingDisplay`, anything authored here). `libs/` is
  //      gitignored and re-cloned by `setup-libs.mjs`, so kit-only narratives
  //      MUST live next to the .tsx — not in `libs/`.
  const containingDir = path.basename(path.dirname(filePath));
  const candidates = [
    path.resolve(LIBS_SRC, containingDir, `${displayName}.md`),
    path.resolve(path.dirname(filePath), `${displayName}.md`),
  ];
  for (const candidate of candidates) {
    try {
      return fs.readFileSync(candidate, 'utf-8');
    } catch {
      // try next
    }
  }
  return null;
}

function intentFor(displayName, narrative) {
  if (COMPONENT_INTENT[displayName]) return COMPONENT_INTENT[displayName];
  if (!narrative) return '';
  for (const line of narrative.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('```')) continue;
    return trimmed.length > 100 ? trimmed.slice(0, 97) + '...' : trimmed;
  }
  return '';
}

// ── TS type extraction (unchanged from previous revision) ──────────────────

function resolveTypeText(node, sourceFile, checker) {
  if (!node) return 'unknown';
  if (ts.isLiteralTypeNode(node)) {
    if (node.literal.kind === ts.SyntaxKind.StringLiteral) return `"${node.literal.text}"`;
    if (node.literal.kind === ts.SyntaxKind.TrueKeyword) return 'true';
    if (node.literal.kind === ts.SyntaxKind.FalseKeyword) return 'false';
    if (ts.isNumericLiteral(node.literal)) return node.literal.text;
    return node.literal.getText(sourceFile);
  }
  if (ts.isUnionTypeNode(node)) {
    return node.types.map((t) => resolveTypeText(t, sourceFile, checker)).join(' | ');
  }
  if (ts.isIntersectionTypeNode(node)) {
    return node.types.map((t) => resolveTypeText(t, sourceFile, checker)).join(' & ');
  }
  if (ts.isArrayTypeNode(node)) {
    return `${resolveTypeText(node.elementType, sourceFile, checker)}[]`;
  }
  if (ts.isParenthesizedTypeNode(node)) {
    return `(${resolveTypeText(node.type, sourceFile, checker)})`;
  }
  if (ts.isTypeReferenceNode(node)) {
    const name = node.typeName.getText(sourceFile);
    const resolved = tryResolveLocalAlias(name, sourceFile);
    if (resolved) return resolved;
    const displayName = name.startsWith('React.') ? name.replace('React.', '') : name;
    if (node.typeArguments && node.typeArguments.length > 0) {
      const typeArgs = node.typeArguments
        .map((ta) => resolveTypeText(ta, sourceFile, checker))
        .join(', ');
      return `${displayName}<${typeArgs}>`;
    }
    return displayName;
  }
  if (ts.isFunctionTypeNode(node)) {
    const params = node.parameters
      .map((p) => {
        const pName = p.name.getText(sourceFile);
        const pType = p.type ? resolveTypeText(p.type, sourceFile, checker) : 'any';
        return `${pName}: ${pType}`;
      })
      .join(', ');
    const ret = resolveTypeText(node.type, sourceFile, checker);
    return `(${params}) => ${ret}`;
  }
  if (ts.isToken(node)) {
    switch (node.kind) {
      case ts.SyntaxKind.StringKeyword: return 'string';
      case ts.SyntaxKind.NumberKeyword: return 'number';
      case ts.SyntaxKind.BooleanKeyword: return 'boolean';
      case ts.SyntaxKind.VoidKeyword: return 'void';
      case ts.SyntaxKind.AnyKeyword: return 'any';
      case ts.SyntaxKind.NeverKeyword: return 'never';
      case ts.SyntaxKind.UndefinedKeyword: return 'undefined';
      case ts.SyntaxKind.NullKeyword: return 'null';
    }
  }
  if (ts.isTypeLiteralNode(node)) {
    if (node.members.length === 0) return '{}';
    const memberTexts = node.members.map((m) => {
      if (ts.isPropertySignature(m)) {
        const mName = m.name.getText(sourceFile);
        const opt = m.questionToken ? '?' : '';
        const mType = m.type ? resolveTypeText(m.type, sourceFile, checker) : 'unknown';
        return `${mName}${opt}: ${mType}`;
      }
      return m.getText(sourceFile);
    });
    if (memberTexts.join('; ').length > 80) {
      return `{ ${memberTexts.slice(0, 3).join('; ')}; ... }`;
    }
    return `{ ${memberTexts.join('; ')} }`;
  }
  if (ts.isTupleTypeNode(node)) {
    return `[${node.elements.map((e) => resolveTypeText(e, sourceFile, checker)).join(', ')}]`;
  }
  if (ts.isIndexedAccessTypeNode(node)) {
    return `${resolveTypeText(node.objectType, sourceFile, checker)}[${resolveTypeText(node.indexType, sourceFile, checker)}]`;
  }
  return node.getText(sourceFile);
}

function tryResolveLocalAlias(name, sourceFile) {
  let result = null;
  ts.forEachChild(sourceFile, (node) => {
    if (result) return;
    if (
      ts.isTypeAliasDeclaration(node) &&
      node.name.text === name &&
      ts.isUnionTypeNode(node.type) &&
      node.type.types.every((t) => ts.isLiteralTypeNode(t))
    ) {
      result = node.type.types
        .map((t) => resolveTypeText(t, sourceFile, null))
        .join(' | ');
    }
  });
  return result;
}

function extractInterfaceMembers(node, sourceFile, checker) {
  const members = [];
  for (const m of node.members) {
    if (!ts.isPropertySignature(m)) continue;
    const prop = parseMember(m, sourceFile, checker);
    if (prop) members.push(prop);
  }
  if (node.heritageClauses) {
    for (const clause of node.heritageClauses) {
      for (const expr of clause.types) {
        const exprName = expr.expression.getText(sourceFile);
        if (exprName.startsWith('React.') || exprName === 'Omit') continue;
        const refNode = findTypeNode(exprName, sourceFile);
        if (refNode) {
          members.push(...extractPropsMembers(refNode, sourceFile, checker));
        }
      }
    }
  }
  return members;
}

function extractPropsMembers(node, sourceFile, checker) {
  const members = [];
  if (!node) return members;
  if (ts.isInterfaceDeclaration(node)) {
    return extractInterfaceMembers(node, sourceFile, checker);
  }
  if (ts.isTypeLiteralNode(node)) {
    for (const m of node.members) {
      if (!ts.isPropertySignature(m)) continue;
      const prop = parseMember(m, sourceFile, checker);
      if (prop) members.push(prop);
    }
    return members;
  }
  if (ts.isTypeAliasDeclaration(node)) {
    if (ts.isUnionTypeNode(node.type)) {
      const allMembers = new Map();
      for (const branch of node.type.types) {
        if (ts.isTypeReferenceNode(branch)) {
          const refName = branch.typeName.getText(sourceFile);
          const refNode = findTypeNode(refName, sourceFile);
          if (refNode) {
            const refMembers = extractPropsMembers(refNode, sourceFile, checker);
            for (const rm of refMembers) {
              if (!allMembers.has(rm.name)) {
                allMembers.set(rm.name, rm);
              } else {
                const existing = allMembers.get(rm.name);
                if (existing.type === 'never' && rm.type !== 'never') {
                  existing.type = rm.type;
                }
                existing.required = false;
              }
            }
          }
        }
      }
      return Array.from(allMembers.values());
    }
    if (ts.isIntersectionTypeNode(node.type)) {
      for (const part of node.type.types) {
        if (ts.isTypeLiteralNode(part)) {
          for (const m of part.members) {
            if (!ts.isPropertySignature(m)) continue;
            const prop = parseMember(m, sourceFile, checker);
            if (prop) members.push(prop);
          }
        } else if (ts.isTypeReferenceNode(part)) {
          const refName = part.typeName.getText(sourceFile);
          const refNode = findTypeNode(refName, sourceFile);
          if (refNode) {
            members.push(...extractPropsMembers(refNode, sourceFile, checker));
          }
        }
      }
      return members;
    }
    if (ts.isTypeReferenceNode(node.type)) {
      const refName = node.type.typeName.getText(sourceFile);
      const refNode = findTypeNode(refName, sourceFile);
      if (refNode) return extractPropsMembers(refNode, sourceFile, checker);
    }
    if (ts.isTypeLiteralNode(node.type)) {
      for (const m of node.type.members) {
        if (!ts.isPropertySignature(m)) continue;
        const prop = parseMember(m, sourceFile, checker);
        if (prop) members.push(prop);
      }
    }
  }
  return members;
}

function parseMember(m, sourceFile, checker) {
  const name = m.name.getText(sourceFile);
  const required = !m.questionToken;
  const type = m.type ? resolveTypeText(m.type, sourceFile, checker) : 'unknown';
  const jsdocComments = ts.getJSDocCommentsAndTags(m);
  let description = '';
  for (const c of jsdocComments) {
    if (ts.isJSDoc(c) && c.comment) {
      description = typeof c.comment === 'string'
        ? c.comment
        : c.comment.map((p) => p.text || '').join('');
      break;
    }
  }
  return {name, type, required, description};
}

function findTypeNode(name, sourceFile) {
  let result = null;
  ts.forEachChild(sourceFile, (node) => {
    if (result) return;
    if (
      (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
      node.name.text === name
    ) {
      result = node;
    }
  });
  return result;
}

function findComponents(sourceFile) {
  const components = [];
  const displayNames = new Set();
  ts.forEachChild(sourceFile, (node) => {
    if (
      ts.isExpressionStatement(node) &&
      ts.isBinaryExpression(node.expression) &&
      ts.isPropertyAccessExpression(node.expression.left) &&
      node.expression.left.name.text === 'displayName' &&
      ts.isStringLiteral(node.expression.right)
    ) {
      displayNames.add(node.expression.right.text);
    }
  });
  for (const name of displayNames) {
    // Prefer the conventional `${Name}Props` interface; fall back to walking the
    // component's function signature for components whose props type uses a
    // non-matching name (e.g. `interface BottomNavProps` on `WCPBottomNav`).
    const propsName = `${name}Props`;
    let propsNode = findTypeNode(propsName, sourceFile);
    if (!propsNode) {
      propsNode = findPropsNodeFromSignature(name, sourceFile);
    }
    components.push({
      displayName: name,
      propsTypeName: propsNode ? (propsNode.name?.text ?? propsName) : propsName,
      propsNode,
      pos: propsNode ? propsNode.pos : 0,
    });
  }
  components.sort((a, b) => a.pos - b.pos);
  return components;
}

// Walk the source for an export named `componentName` and return the type node
// that describes its props (an InterfaceDeclaration, TypeAliasDeclaration, or
// inline TypeLiteralNode). Handles function declarations, arrow-function
// constants, and the common `forwardRef<T, P>` / `memo<P>` / `React.FC<P>`
// generic-typed declarations.
function findPropsNodeFromSignature(componentName, sourceFile) {
  let found = null;

  const resolveFromTypeNode = (typeNode) => {
    if (!typeNode) return null;
    if (ts.isTypeReferenceNode(typeNode)) {
      const refName = typeNode.typeName.getText(sourceFile);
      return findTypeNode(refName, sourceFile);
    }
    if (ts.isTypeLiteralNode(typeNode)) {
      return typeNode;
    }
    return null;
  };

  const fromFunctionParams = (params) => {
    if (!params || params.length === 0) return null;
    const param = params[0];
    return resolveFromTypeNode(param.type);
  };

  const visitInitializer = (init) => {
    if (!init) return null;

    if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) {
      return fromFunctionParams(init.parameters);
    }

    if (ts.isCallExpression(init)) {
      const callee = init.expression.getText(sourceFile);
      const typeArgs = init.typeArguments;
      // forwardRef<RefType, PropsType>(...) → PropsType is second
      // memo<PropsType>(...)              → PropsType is first
      if (typeArgs && typeArgs.length > 0) {
        const idx = /forwardRef/.test(callee) && typeArgs.length > 1 ? 1 : 0;
        const resolved = resolveFromTypeNode(typeArgs[idx]);
        if (resolved) return resolved;
      }
      // Otherwise walk into the inner function passed as the first arg.
      if (init.arguments.length > 0) {
        const inner = init.arguments[0];
        if (ts.isArrowFunction(inner) || ts.isFunctionExpression(inner)) {
          return fromFunctionParams(inner.parameters);
        }
      }
    }
    return null;
  };

  ts.forEachChild(sourceFile, (node) => {
    if (found) return;

    if (ts.isFunctionDeclaration(node) && node.name?.text === componentName) {
      found = fromFunctionParams(node.parameters);
      return;
    }

    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name) || decl.name.text !== componentName) continue;

        // const Name: React.FC<P> = ...
        if (
          decl.type &&
          ts.isTypeReferenceNode(decl.type) &&
          decl.type.typeArguments &&
          decl.type.typeArguments.length > 0
        ) {
          const fromAnnotation = resolveFromTypeNode(decl.type.typeArguments[0]);
          if (fromAnnotation) {
            found = fromAnnotation;
            return;
          }
        }

        const fromInit = visitInitializer(decl.initializer);
        if (fromInit) {
          found = fromInit;
          return;
        }
      }
    }
  });

  return found;
}

function isPrivateComponent(name, sourceFile) {
  let result = false;
  ts.forEachChild(sourceFile, (node) => {
    if (result) return;
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && decl.name.text === name) {
          const tags = ts.getJSDocTags(node);
          if (tags.some((t) => t.tagName.text === 'private')) {
            result = true;
          }
        }
      }
    }
  });
  return result;
}

// ── extraction ─────────────────────────────────────────────────────────────

function extractAll() {
  const componentFiles = getComponentFiles();
  const commonFiles = getCommonFiles();
  const allFiles = [...componentFiles, ...commonFiles];
  console.log(`Found ${componentFiles.length} component files in ${COMPONENT_DIR}\n`);

  const program = ts.createProgram(allFiles, {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    noEmit: true,
    skipLibCheck: true,
    types: [],
  });
  const checker = program.getTypeChecker();

  const components = [];

  for (const filePath of componentFiles) {
    const sourceFile = program.getSourceFile(filePath);
    if (!sourceFile) continue;
    const componentsInFile = findComponents(sourceFile);
    if (componentsInFile.length === 0) continue;

    // Compound components (e.g. Carousel + CarouselContent + CarouselItem)
    // export multiple public component symbols from a single .tsx. Without a
    // cross-link, a downstream agent reading Carousel.md sees two props and no
    // hint that the sub-pieces exist. Compute the public-sibling roster once
    // per file and stamp it onto each component object below.
    const publicNames = componentsInFile
      .filter((c) => !isPrivateComponent(c.displayName, sourceFile))
      .map((c) => c.displayName);

    // Components that pipe their props through `applyCommonProps` accept the
    // shared escape-hatch surface (className/style + UNSAFE_className/style),
    // but those keys are intentionally pruned from the per-prop list via
    // SKIP_PROPS to keep prop tables noise-free. Detect usage from the source
    // text so renderComponentMd can call it out in a single sentence instead.
    const sourceText = sourceFile.getFullText();
    const hasCommonProps = /\bapplyCommonProps\s*\(/.test(sourceText);

    for (const comp of componentsInFile) {
      if (isPrivateComponent(comp.displayName, sourceFile)) continue;

      // Extract props if we found a node; otherwise emit the component with an
      // empty props list so it still gets a discovery .md.
      const members = extractPropsMembers(comp.propsNode, sourceFile, checker);

      const seen = new Set();
      const uniqueMembers = [];
      for (const m of members) {
        if (seen.has(m.name)) continue;
        seen.add(m.name);
        uniqueMembers.push(m);
      }
      const filteredMembers = uniqueMembers.filter(
        (m) => !SKIP_PROPS.has(m.name) && m.type !== 'never',
      );

      // Many LD components pipe their props through `applyCommonProps` at
      // runtime but `Omit<…, 'className' | 'style'>` those keys at the type
      // level. The runtime aliases (`UNSAFE_className` / `UNSAFE_style`) are
      // the only TS-safe escape hatches in that case. Detect it per-component
      // so the rendered .md tells the agent up front, instead of advising
      // "Prefer className/style" and forcing the agent to discover the omit
      // via a TS error.
      const memberNames = new Set(
        uniqueMembers.filter((m) => m.type !== 'never').map((m) => m.name),
      );
      const tsAcceptsClassName = memberNames.has('className');
      const tsAcceptsStyle = memberNames.has('style');

      const containingDir = path.basename(path.dirname(filePath));
      const relDir = relDirFromPath(filePath);
      const narrative = loadNarrativeDoc(filePath, comp.displayName);
      const siblings = publicNames.filter((n) => n !== comp.displayName);

      components.push({
        name: comp.displayName,
        category: categoryFromPath(filePath),
        importPath: `./${relDir}`,
        containingDir,
        relDir,
        intent: intentFor(comp.displayName, narrative),
        props: filteredMembers,
        narrative,
        hasNarrativeDoc: Boolean(narrative),
        siblings,
        hasCommonProps,
        tsAcceptsClassName,
        tsAcceptsStyle,
      });
      console.log(`  ✓ ${comp.displayName} (${filteredMembers.length} props)`);
    }
  }

  components.sort((a, b) => {
    const catOrder = {components: 0, patterns: 1, other: 2};
    const ca = catOrder[a.category] ?? 9;
    const cb = catOrder[b.category] ?? 9;
    if (ca !== cb) return ca - cb;
    return a.name.localeCompare(b.name);
  });

  return components;
}

// ── rendering ──────────────────────────────────────────────────────────────

function renderPropList(props) {
  return props
    .map((p) => {
      const req = p.required ? ' (required)' : '';
      const desc = p.description ? ` — ${p.description.split('\n')[0].trim()}` : '';
      return `- \`${p.name}\`: ${p.type}${req}${desc}`;
    })
    .join('\n');
}

function renderComponentMd(c) {
  const lines = [
    `# ${c.name}`,
    '',
    `**Import:** \`import { ${c.name} } from "${c.importPath}"\``,
    `**Category:** ${c.category}`,
  ];
  if (c.intent) {
    lines.push(`**Intent:** ${c.intent}`);
  }
  lines.push('');

  if (c.siblings && c.siblings.length > 0) {
    lines.push('## Composition');
    lines.push('');
    lines.push(
      `\`${c.name}\` is part of a compound component. Use together with: ` +
        c.siblings.map((n) => `\`${n}\``).join(', ') +
        '.',
    );
    lines.push('');
    lines.push(
      `All pieces import from the same path (\`${c.importPath}\`). See each sibling's \`.md\` for its API.`,
    );
    lines.push('');
  }

  lines.push('## Props');
  lines.push('');
  if (c.props.length === 0) {
    lines.push('_(no public props)_');
  } else {
    lines.push(renderPropList(c.props));
  }

  if (c.hasCommonProps) {
    lines.push('');
    lines.push('## Common props');
    lines.push('');
    lines.push(
      'This component pipes props through `applyCommonProps`, so it also accepts:',
    );
    lines.push('');

    const bothBlocked = !c.tsAcceptsClassName && !c.tsAcceptsStyle;
    const partialBlocked =
      !bothBlocked && (!c.tsAcceptsClassName || !c.tsAcceptsStyle);

    if (bothBlocked) {
      // The component's TS prop union explicitly omits BOTH `className` and
      // `style`. The runtime still applies them, but TypeScript-strict
      // consumers must use the UNSAFE_* aliases — there is no other way.
      lines.push(
        `- ⚠️ \`className\` and \`style\` are **omitted from this component's TS prop union** (e.g. \`Omit<…, 'className' | 'style'>\`). Use \`UNSAFE_className\` and \`UNSAFE_style\` — they pass through at runtime and are the only TS-safe options for this component.`,
      );
      lines.push(
        '- `UNSAFE_className` / `UNSAFE_style` — runtime aliases (the only TS-safe styling hooks here).',
      );
    } else if (partialBlocked) {
      // One but not the other. Tell the agent exactly which to use.
      if (c.tsAcceptsClassName) {
        lines.push(
          '- `className` — the canonical hook for adding a CSS class. **Prefer this.**',
        );
      } else {
        lines.push(
          '- ⚠️ `className` is **omitted from this component\'s TS prop union**. Use `UNSAFE_className` — it passes through at runtime and is the only TS-safe option for adding a CSS class.',
        );
      }
      if (c.tsAcceptsStyle) {
        lines.push('- `style` — inline styles.');
      } else {
        lines.push(
          '- ⚠️ `style` is **omitted from this component\'s TS prop union**. Use `UNSAFE_style` — it passes through at runtime and is the only TS-safe option for inline styles.',
        );
      }
      lines.push(
        '- `UNSAFE_className` / `UNSAFE_style` — runtime aliases. Use whichever the TS types block (see above); the unblocked one is preferred.',
      );
    } else {
      lines.push(
        '- `className` — the canonical hook for adding a CSS class. **Prefer this.**',
      );
      lines.push('- `style` — inline styles.');
      lines.push(
        '- `UNSAFE_className` / `UNSAFE_style` — runtime aliases. Use them only as a last resort (e.g. inside a wrapper that re-omits `className`).',
      );
    }
    lines.push(
      '- Standard DOM attributes that match the underlying element (`id`, `data-*`, `aria-*`, event handlers, etc.).',
    );
    lines.push('');
  }

  if (c.narrative) {
    lines.push('## Usage notes');
    lines.push('');
    lines.push(c.narrative.trim());
    lines.push('');
  }

  return lines.join('\n');
}

// ── token reference ────────────────────────────────────────────────────────
// Parses src/themes/base.css and emits a discoverable cheat sheet of semantic
// color tokens. Without this file, downstream agents grep a 1700-line base.css
// or invent token names that don't exist (we've seen `--ld-semantic-color-
// background-primary` / `background-warning-subtle` invented in PR review —
// neither exists; the real names are `surface-subtle` and `fill-warning-subtle`).

function parseSemanticColorTokens(cssText) {
  const tokens = [];
  const lineRe = /^\s*(--ld-semantic-color-[a-z0-9-]+)\s*:\s*([^;]+);/gm;
  let match;
  while ((match = lineRe.exec(cssText)) !== null) {
    const [, name, rawValue] = match;
    const value = rawValue.trim();
    // var(--ld-primitive-color-blue-100, #0053e2) → grab the hex fallback so
    // the doc shows the resolved color a reader can eyeball.
    const hexMatch = value.match(/#[0-9a-fA-F]{3,8}\b/);
    const hex = hexMatch ? hexMatch[0] : null;
    tokens.push({name, value, hex});
  }
  return tokens;
}

function groupTokensByRole(tokens) {
  const groups = new Map();
  for (const t of tokens) {
    const trimmed = t.name.replace(/^--ld-semantic-color-/, '');
    const role = trimmed.split('-')[0];
    if (!groups.has(role)) groups.set(role, []);
    groups.get(role).push(t);
  }
  return groups;
}

function isStateVariant(tokenName) {
  return TOKEN_STATE_SUFFIXES.some((suffix) => tokenName.endsWith(`-${suffix}`));
}

function renderTokenLine(t) {
  const hex = t.hex ? ` — \`${t.hex}\`` : '';
  return `- \`var(${t.name})\`${hex}`;
}

function renderTokensReference(tokens) {
  const grouped = groupTokensByRole(tokens);

  const lines = [
    '# Living Design Semantic Color Tokens',
    '',
    'Reference for `--ld-semantic-color-*` tokens, sourced from `src/themes/base.css`. Apply tokens with `var(--ld-semantic-color-…)` in CSS files OR inline styles (`style={{ background: \'var(--ld-semantic-color-surface-subtle)\' }}`). **Never hardcode hex colors.**',
    '',
    '## Naming convention',
    '',
    '`--ld-semantic-color-<role>-<tone>[-<state>]`',
    '',
    '- `<role>` — where it applies: `surface`, `fill`, `border`, `text`, `link`, `separator`, …',
    '- `<tone>` — meaning: `brand`, `info`, `warning`, `negative`, `positive`, `subtle`, `subtlest`, …',
    '- `<state>` (component-internal) — `hovered`, `focused`, `pressed`, `disabled`, `activated`. Use base tokens in page code; component CSS handles its own states.',
    '',
    '## Common picks (use these first)',
    '',
    'For most page UI:',
    '',
    '| Need | Token |',
    '|---|---|',
    '| Card / image-frame background | `--ld-semantic-color-surface-subtle` |',
    '| Generic 1px border | `--ld-semantic-color-border-subtle` |',
    '| Faint divider line | `--ld-semantic-color-border-subtlest` |',
    '| Brand-color accent border (e.g. selected tab) | `--ld-semantic-color-border-brand` |',
    '| Inline link text | `--ld-semantic-color-link-text` |',
    '| Brand-color text | `--ld-semantic-color-text-brand` |',
    '| Subtle informational fill (blue tint) | `--ld-semantic-color-fill-info-subtle` |',
    '| Subtle warning fill (yellow tint) | `--ld-semantic-color-fill-warning-subtle` |',
    '| Subtle negative fill (red tint) | `--ld-semantic-color-fill-negative-subtle` |',
    '| Subtle positive fill (green tint) | `--ld-semantic-color-fill-positive-subtle` |',
    '| Neutral skeleton / progress track | `--ld-semantic-color-fill-subtle` |',
    '| Star rating fill | `--ld-semantic-color-rating-fill` |',
    '| Body text | `--ld-semantic-color-text` |',
    '| Muted secondary text | `--ld-semantic-color-text-subtle` |',
    '',
    'These names are **real and validated**. Token names like `--ld-semantic-color-background-primary`, `--ld-semantic-color-border-primary`, or `--ld-semantic-color-background-warning-subtle` do **not** exist — those are common hallucinations. When in doubt, search this doc.',
    '',
    '## Full reference (by role)',
    '',
    'Each section lists base tokens only. State variants (`*-hovered`, `*-focused`, `*-pressed`, `*-disabled`, `*-activated`) are omitted from this view — they exist for component implementations. Run `grep -E "--ld-semantic-color-<role>" living-design.css` for the full set.',
    '',
  ];

  const ordered = [
    ...TOKEN_ROLE_ORDER.filter((r) => grouped.has(r)),
    ...[...grouped.keys()].filter((r) => !TOKEN_ROLE_ORDER.includes(r)).sort(),
  ];

  for (const role of ordered) {
    const baseTokens = grouped.get(role).filter((t) => !isStateVariant(t.name));
    if (baseTokens.length === 0) continue;
    lines.push(`### ${role}`);
    lines.push('');
    for (const t of baseTokens.sort((a, b) => a.name.localeCompare(b.name))) {
      lines.push(renderTokenLine(t));
    }
    lines.push('');
  }

  return lines.join('\n');
}

function buildTokensReference() {
  let cssText;
  try {
    cssText = fs.readFileSync(THEMES_BASE_CSS, 'utf-8');
  } catch (err) {
    console.warn(`  ⚠ tokens-reference: could not read ${THEMES_BASE_CSS}: ${err.message}`);
    return null;
  }
  const tokens = parseSemanticColorTokens(cssText);
  if (tokens.length === 0) {
    console.warn('  ⚠ tokens-reference: no semantic color tokens parsed from base.css');
    return null;
  }
  return {body: renderTokensReference(tokens), count: tokens.length};
}

function renderManifest(components) {
  return JSON.stringify(
    {
      version: 1,
      generated: new Date().toISOString(),
      counts: {
        total: components.length,
        components: components.filter((c) => c.category === 'components').length,
        patterns: components.filter((c) => c.category === 'patterns').length,
      },
      components: components.map((c) => ({
        name: c.name,
        category: c.category,
        importPath: c.importPath,
        intent: c.intent || undefined,
        hasNarrativeDoc: c.hasNarrativeDoc,
        docPath: `src/${c.relDir}/${c.name}.md`,
        props: c.props,
      })),
    },
    null,
    2,
  ) + '\n';
}

function renderIndex(components) {
  const groups = {components: [], patterns: [], other: []};
  for (const c of components) groups[c.category].push(c);

  const lines = [
    '# Living Design Component Index',
    '',
    'Use this index to discover the components in this kit. **Before using any component**, either:',
    '',
    '- **Read** the markdown next to the component source — `src/<category>/<dir>/<Name>.md` (Skill) or `client/<category>/<dir>/<Name>.md` (Builder). `<category>` is either `components` (atoms and molecules) or `patterns` (composed recipes). e.g. `Button.md` lives under `src/components/Button/`; `Header.md` lives under `src/patterns/Header/`.',
    '- **Run** `npx ld-kit show <Name>` from a project root with `@walmart/ld-kit` installed.',
    '',
    'The component `.tsx` sits in the same directory; its JSDoc is also authoritative.',
    '',
  ];
  const headings = {
    components: `## Components (${groups.components.length})`,
    patterns: `## Patterns (${groups.patterns.length})`,
    other: `## Other (${groups.other.length})`,
  };
  for (const cat of ['components', 'patterns', 'other']) {
    if (groups[cat].length === 0) continue;
    lines.push(headings[cat]);
    lines.push('');
    for (const c of groups[cat]) {
      const intent = c.intent ? ` — ${c.intent}` : '';
      lines.push(`- **${c.name}** — \`${c.importPath}\`${intent}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

// ── output targets ─────────────────────────────────────────────────────────

const SKILL_ROOT = path.resolve(projectRoot, 'living-design');
const BUILDER_ROOT = path.resolve(projectRoot, 'sync/builder/projects/living-design');

const INDEX_TARGETS = [
  // Skill — per-tool hidden dirs + the visible tool-agnostic rules/ copy.
  {file: path.resolve(SKILL_ROOT, '.cursor/rules/components-index.mdc'), format: 'mdc'},
  {file: path.resolve(SKILL_ROOT, '.claude/rules/components-index.md'), format: 'md'},
  {file: path.resolve(SKILL_ROOT, '.github/instructions/components-index.instructions.md'), format: 'copilot'},
  {file: path.resolve(SKILL_ROOT, 'rules/components-index.md'), format: 'md'},
  // Builder
  {file: path.resolve(BUILDER_ROOT, '.builder/rules/components-index.mdc'), format: 'mdc'},
  // Sandbox
  ...(SANDBOX_ACTIVE
    ? [
        {file: path.resolve(SANDBOX_ROOT, '.cursor/rules/components-index.mdc'), format: 'mdc'},
        {file: path.resolve(SANDBOX_ROOT, '.claude/rules/components-index.md'), format: 'md'},
        {file: path.resolve(SANDBOX_ROOT, '.github/instructions/components-index.instructions.md'), format: 'copilot'},
        {file: path.resolve(SANDBOX_ROOT, 'rules/components-index.md'), format: 'md'},
      ]
    : []),
];

const TOKENS_TARGETS = [
  // Skill — per-tool hidden dirs + the visible tool-agnostic rules/ copy.
  {file: path.resolve(SKILL_ROOT, '.cursor/rules/tokens-reference.mdc'), format: 'mdcTokens'},
  {file: path.resolve(SKILL_ROOT, '.claude/rules/tokens-reference.md'), format: 'md'},
  {file: path.resolve(SKILL_ROOT, '.github/instructions/tokens-reference.instructions.md'), format: 'copilotTokens'},
  {file: path.resolve(SKILL_ROOT, 'rules/tokens-reference.md'), format: 'md'},
  // Builder
  {file: path.resolve(BUILDER_ROOT, '.builder/rules/tokens-reference.mdc'), format: 'mdcTokens'},
  // Sandbox
  ...(SANDBOX_ACTIVE
    ? [
        {file: path.resolve(SANDBOX_ROOT, '.cursor/rules/tokens-reference.mdc'), format: 'mdcTokens'},
        {file: path.resolve(SANDBOX_ROOT, '.claude/rules/tokens-reference.md'), format: 'md'},
        {file: path.resolve(SANDBOX_ROOT, '.github/instructions/tokens-reference.instructions.md'), format: 'copilotTokens'},
        {file: path.resolve(SANDBOX_ROOT, 'rules/tokens-reference.md'), format: 'md'},
      ]
    : []),
];

// Per-component .md files are co-located with their .tsx inside the synced
// `src/<category>/<dir>/` directory. components.json is a top-level
// manifest. `componentsDir` is the root we resolve `relDir` against (the
// generated tree root, sibling to App.tsx).
const LD_TARGETS = [
  {
    componentsDir: path.resolve(SKILL_ROOT, 'src'),
    jsonPath: path.resolve(SKILL_ROOT, 'components.json'),
  },
  {
    componentsDir: path.resolve(BUILDER_ROOT, 'client'),
    jsonPath: path.resolve(BUILDER_ROOT, 'client/components.json'),
  },
  ...(SANDBOX_ACTIVE
    ? [{
        componentsDir: path.resolve(SANDBOX_ROOT, 'src'),
        jsonPath: path.resolve(SANDBOX_ROOT, 'components.json'),
      }]
    : []),
];

const FRONTMATTER = {
  mdc: [
    '---',
    'description: Living Design component inventory — name, category, import path, one-line intent',
    'globs:',
    'alwaysApply: true',
    '---',
    '',
  ].join('\n'),
  copilot: [
    '---',
    "description: 'Living Design component inventory — name, category, import path, one-line intent'",
    "applyTo: '**'",
    '---',
    '',
  ].join('\n'),
  mdcTokens: [
    '---',
    'description: Living Design semantic color tokens — canonical names + common picks, replaces hardcoded hex',
    'globs:',
    'alwaysApply: true',
    '---',
    '',
  ].join('\n'),
  copilotTokens: [
    '---',
    "description: 'Living Design semantic color tokens — canonical names + common picks, replaces hardcoded hex'",
    "applyTo: '**'",
    '---',
    '',
  ].join('\n'),
  md: '',
};

function writeIfChanged(filePath, content) {
  try {
    if (fs.readFileSync(filePath, 'utf-8') === content) return false;
  } catch {
    // file does not exist — proceed
  }
  fs.mkdirSync(path.dirname(filePath), {recursive: true});
  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

function writeToScratch(components) {
  // Scratch layout mirrors a Skill sync target so it's easy to eyeball.
  const componentsDir = path.join(SCRATCH_DIR, 'src');
  fs.mkdirSync(SCRATCH_DIR, {recursive: true});
  fs.mkdirSync(componentsDir, {recursive: true});
  fs.writeFileSync(path.join(SCRATCH_DIR, 'components.json'), renderManifest(components));
  fs.writeFileSync(path.join(SCRATCH_DIR, 'components-index.md'), renderIndex(components));
  for (const c of components) {
    const dir = path.join(componentsDir, c.relDir);
    fs.mkdirSync(dir, {recursive: true});
    fs.writeFileSync(path.join(dir, `${c.name}.md`), renderComponentMd(c));
  }
  const indexSize = fs.statSync(path.join(SCRATCH_DIR, 'components-index.md')).size;
  console.log(`\n✓ Scratch output in ${SCRATCH_DIR}`);
  console.log(`  components.json:                ${components.length} entries`);
  console.log(`  src/components/<cat>/<dir>/:    ${components.length} .md files`);
  console.log(`  components-index:               ${indexSize} bytes`);
}

function writeToSyncTargets(components) {
  const indexBody = renderIndex(components);
  const manifest = renderManifest(components);
  const tokens = buildTokensReference();

  let indexWrites = 0;
  for (const target of INDEX_TARGETS) {
    const content = FRONTMATTER[target.format] + indexBody;
    if (writeIfChanged(target.file, content)) indexWrites += 1;
  }

  let tokensWrites = 0;
  if (tokens) {
    for (const target of TOKENS_TARGETS) {
      const content = FRONTMATTER[target.format] + tokens.body;
      if (writeIfChanged(target.file, content)) tokensWrites += 1;
    }
  }

  let docsWrites = 0;
  let jsonWrites = 0;
  for (const target of LD_TARGETS) {
    if (writeIfChanged(target.jsonPath, manifest)) jsonWrites += 1;
    for (const c of components) {
      const docPath = path.join(target.componentsDir, c.relDir, `${c.name}.md`);
      if (writeIfChanged(docPath, renderComponentMd(c))) {
        docsWrites += 1;
      }
    }
  }

  console.log(`\n✓ Wrote ${components.length} component docs`);
  console.log(`  index files updated:        ${indexWrites}/${INDEX_TARGETS.length}`);
  console.log(`  per-component .md updated:  ${docsWrites}`);
  console.log(`  components.json updated:    ${jsonWrites}/${LD_TARGETS.length}`);
  if (tokens) {
    console.log(`  tokens-reference updated:   ${tokensWrites}/${TOKENS_TARGETS.length} (${tokens.count} tokens parsed)`);
  }
}

function pruneStaleArtifacts() {
  // Remove the old monolithic overview-components.* from every target it was
  // ever written to.
  const staleFiles = [
    path.resolve(BUILDER_ROOT, '.builder/rules/overview-components.mdc'),
    path.resolve(SKILL_ROOT, '.cursor/rules/overview-components.mdc'),
    path.resolve(SKILL_ROOT, '.claude/rules/overview-components.md'),
    path.resolve(SKILL_ROOT, '.github/instructions/overview-components.instructions.md'),
    ...(SANDBOX_ACTIVE
      ? [
          path.resolve(SANDBOX_ROOT, '.cursor/rules/overview-components.mdc'),
          path.resolve(SANDBOX_ROOT, '.claude/rules/overview-components.md'),
          path.resolve(SANDBOX_ROOT, '.github/instructions/overview-components.instructions.md'),
        ]
      : []),
  ];
  let removedFiles = 0;
  for (const p of staleFiles) {
    try {
      fs.unlinkSync(p);
      removedFiles += 1;
    } catch {
      // already gone — fine
    }
  }
  if (removedFiles > 0) {
    console.log(`  Pruned ${removedFiles} stale overview-components file(s).`);
  }

  // Remove the parallel docs dirs from the previous (short-lived) layout where
  // per-component .md sat under living-design/components/ instead of co-located
  // with the .tsx in src/components/ld/<dir>/.
  const staleDocsDirs = [
    path.resolve(SKILL_ROOT, 'components'),
    path.resolve(BUILDER_ROOT, 'client/components-docs'),
    ...(SANDBOX_ACTIVE ? [path.resolve(SANDBOX_ROOT, 'components')] : []),
  ];
  let removedDirs = 0;
  for (const dir of staleDocsDirs) {
    try {
      fs.rmSync(dir, {recursive: true, force: true});
      if (!fs.existsSync(dir)) removedDirs += 1;
    } catch {
      // already gone — fine
    }
  }
  if (removedDirs > 0) {
    console.log(`  Pruned ${removedDirs} stale parallel docs dir(s).`);
  }
}

// ── main ───────────────────────────────────────────────────────────────────

function main() {
  const components = extractAll();
  if (SCRATCH_DIR) {
    writeToScratch(components);
    return;
  }
  writeToSyncTargets(components);
  pruneStaleArtifacts();
}

main();
