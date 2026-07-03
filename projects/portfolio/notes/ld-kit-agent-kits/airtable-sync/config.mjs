/**
 * Airtable Sync Configuration
 * Source of truth: Airtable base appYyNWTLAzg3x1t3
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const AIRTABLE_BASE_ID = 'appYyNWTLAzg3x1t3';

export const TABLES = {
  themes: 'tblDwvwEvOFaDL7jr',
  primitives: 'tblguTSbeNLB4eTto',
  semantics: 'tblS9MOzERfdLZsrZ',
  dataDictionary: 'tbllnrODTnS3RnWTp',
  illustrations: 'tbl2xASmvXw6MC3M9',
};

// "All Media" is a view of the primitives table, not a separate table.
// URL: airtable.com/{baseId}/{tableId}/{viewId}
//   tblguTSbeNLB4eTto = TABLES.primitives (the table we already fetch)
//   viwCqCL7hA4QKuWO1 = the view that filters to media rows
// The sync fetches the full primitives table and filters client-side by
// `Data Type` (same pattern as icons). The view ID is kept here so curators
// can jump to the filtered view in Airtable.
export const AIRTABLE_VIEWS = {
  allMedia: 'viwCqCL7hA4QKuWO1',
};

export const FIELD_NAMES = {
  themes: {
    name: 'Name',
    status: 'Status',
    inherits: 'Inherits',
    inheritedName: 'Name (from Inherits)',
    primitiveTokens: '🪙 Primitive',
    semanticTokens: '🪙 Semantic',
  },
  primitives: {
    name: 'Name',
    status: 'Status',
    value: 'Value',
    resolved: 'Resolved',
    webSyntax: 'Web Syntax',
    rgbValues: 'RGB Values',
    dataType: 'Data Type',
    modeIdRef: '🔗 modeId',
    tokenTypeRef: '🔗 Token Type',
    index: 'Index',
    lastUpdated: 'Last Updated',
    dateCreated: 'Date Created',
    description: 'Description',
    svg: 'SVG',
  },
  semantics: {
    name: 'Name',
    status: 'Status',
    value: 'Value',
    resolved: 'Resolved',
    webSyntax: 'Web Syntax',
    tokenAliasRef: '🔗 Token Alias',
    modeIdRef: '🔗 modeId',
    modeName: 'modeName',
    tokenReference: 'Token Reference',
    dataType: 'type',
    tokenTypeRef: '🔗 Token Type',
    index: 'Index',
    rgbValues: 'RGB values',
    lastUpdated: 'Last Modified',
    description: 'Description',
  },
  dataDictionary: {
    term: 'Term',
    type: 'Type',
    status: 'Status',
  },
  // The Illustrations table has no Status column. The pipeline filters on
  // attachment mime type (SVG only) instead — see illustration-pipeline.mjs.
  illustrations: {
    name: 'Name',
    image: 'Image',
    svgSource: 'SVG Source',
    type: 'Illustration Type',
    notes: 'Notes',
  },
};

// Only records with this status are pulled from Airtable into ld-kit.
// Curators must flip a row to "✅ Published" (primitives/semantics) or
// "Live" (themes — that table uses a different status vocabulary) for it
// to ship.
export const ALLOWED_STATUSES = ['✅ Published', 'Live'];

export const THEME_FILE_MAP = {
  'LD Base': { file: 'base.css', selector: ':root' },
  'Walmart US': { file: 'walmart.css', selector: '[data-ld-theme="Walmart"]', displayName: 'Walmart' },
  "Sam's Club Maverick": { file: 'sams-club.css', selector: '[data-ld-theme="Sam\'s Club Maverick"]', displayName: "Sam's Club Maverick" },
  "Sam's Club": { file: 'sams-club.css', selector: '[data-ld-theme="Sam\'s Club"]', displayName: "Sam's Club" },
  "Sam's Club US": { file: 'sams-club.css', selector: '[data-ld-theme="Sam\'s Club"]', displayName: "Sam's Club" },
  'Walmart B2B': { file: 'walmart-b2b.css', selector: '[data-ld-theme="Walmart B2B"]', displayName: 'Walmart B2B' },
  'Bodega': { file: 'bodega.css', selector: '[data-ld-theme="Bodega"]', displayName: 'Bodega' },
  'Cashi MX': { file: 'cashi-mx.css', selector: '[data-ld-theme="Cashi MX"]', displayName: 'Cashi MX' },
  'Data Ventures': { file: 'data-ventures.css', selector: '[data-ld-theme="Data Ventures"]', displayName: 'Data Ventures' },
  'Sparky': { file: 'sparky.css', selector: '[data-ld-theme="Sparky"]', displayName: 'Sparky' },
  'Walmart Legacy': { file: 'walmart-legacy.css', selector: '[data-ld-theme="Walmart Legacy"]', displayName: 'Walmart Legacy' },
  'Walmart W+': { file: 'walmart-plus.css', selector: '[data-ld-theme="Walmart+"]', displayName: 'Walmart+' },
  "Member's Mark": { file: 'members-mark.css', selector: '[data-ld-theme="Member\'s Mark"]', displayName: "Member's Mark" },
  'WCP': { file: null, selector: null }, // Parent theme, no CSS file
};

// Maps Airtable theme names (linked via the Index field on media primitives) to
// a tenant-media bucket. One entry per theme the pipeline should pull media
// for — including regional sub-themes (Walmart MX/CA) that don't have their
// own runtime theme but whose media should land in the parent tenant's bucket.
// Keep the value set aligned with THEME_FONT_CONFIG.primaryIconFont in
// src/utils/Theming.tsx so runtime tenant resolution finds its media bucket.
export const MEDIA_THEME_ROUTING = {
  'Walmart US': 'wcp',
  'Walmart MX': 'wcp',
  'Walmart CA': 'wcp',
  'WCP': 'wcp',
  'Walmart B2B': 'wcp',
  'Walmart B2B+': 'wcp',
  'Walmart Brazil': 'wcp',
  'Walmart Chile': 'wcp',
  'Walmart Connect': 'wcp',
  'Walmart ZA': 'wcp',
  'Cashi MX': 'wcp',
  'Data Ventures': 'wcp',
  'Sparky': 'wcp',
  'Walmart Legacy': 'wcp',
  'Walmart W+': 'wcp',
  "Sam's Club": 'sams-club',
  "Sam's Club US": 'sams-club',
  // Airtable carries both apostrophe placements ("Sam's" and "Sams'"); the
  // latter is a known typo in the themes table but we route it so a curator
  // typo doesn't drop a tenant's media on the floor.
  "Sams' Club US": 'sams-club',
  "Sam's Club MX": 'sams-club',
  "Sam's Club Maverick": 'sams-club',
  "Member's Mark": 'sams-club',
  'Bodega': 'bodega',
};

// Stable display-name + TS identifier per tenant-media bucket. Used by the
// per-theme CSS-injection pass to figure out which runtime themes share a
// "fallback set" of media (Cashi MX, Data Ventures, Sparky all show the
// Walmart media because they routed to the `wcp` tenant). Kept narrow on
// purpose — the consumer-facing TS module shape is now driven by
// MEDIA_THEMES (below), so this map is no longer the source of truth for
// emission.
export const MEDIA_TENANTS = {
  'wcp':       { label: 'WCP',        primaryTheme: 'WCP' },
  'sams-club': { label: "Sam's Club", primaryTheme: "Sam's Club" },
  'bodega':    { label: 'Bodega',     primaryTheme: 'Bodega' },
};

// Inheritance tree for the consumer-facing media surface — analogous to
// ICON_THEMES. Each entry describes one media theme:
//   • `theme`        — Airtable Index value rows are tagged with.
//   • `label`        — display label for the gallery tab.
//   • `constPrefix`  — UPPER_SNAKE prefix for the emitted TS consts
//                      (e.g. WALMART_BUSINESS_MEDIA_SVGS).
//   • `inherits`     — base media-theme keys, oldest ancestor first. Merging
//                      walks this list and applies own overrides last, so a
//                      Walmart Business row replaces the WCP default for the
//                      same token name.
// The pipeline emits one TS module per key and one manifest entry per key,
// each containing the fully merged asset set. Add a new key here when
// curators stand up a new Index value with media rows.
export const MEDIA_THEMES = {
  'wcp':                { theme: 'WCP',                 label: 'WCP',                 constPrefix: 'WCP',                inherits: [] },
  'walmart-business':   { theme: 'Walmart B2B',         label: 'Walmart Business',    constPrefix: 'WALMART_BUSINESS',   inherits: ['wcp'] },
  'walmart-legacy':     { theme: 'Walmart Legacy',      label: 'Walmart Legacy',      constPrefix: 'WALMART_LEGACY',     inherits: ['wcp'] },
  'walmart-mx':         { theme: 'Walmart MX',          label: 'Walmart MX',          constPrefix: 'WALMART_MX',         inherits: ['wcp'] },
  'walmart-ca':         { theme: 'Walmart CA',          label: 'Walmart CA',          constPrefix: 'WALMART_CA',         inherits: ['wcp'] },
  'walmart-plus':       { theme: 'Walmart W+',          label: 'Walmart+',            constPrefix: 'WALMART_PLUS',       inherits: ['wcp'] },
  'sams-club':          { theme: "Sam's Club",          label: "Sam's Club",          constPrefix: 'SAMS_CLUB',          inherits: ['wcp'] },
  'sams-club-maverick': { theme: "Sam's Club Maverick", label: "Sam's Club Maverick", constPrefix: 'SAMS_CLUB_MAVERICK', inherits: ['sams-club'] },
  'members-mark':       { theme: "Member's Mark",       label: "Member's Mark",       constPrefix: 'MEMBERS_MARK',       inherits: ['sams-club'] },
  'bodega':             { theme: 'Bodega',              label: 'Bodega',              constPrefix: 'BODEGA',             inherits: ['wcp'] },
};

/**
 * Per-theme font-family overrides for --ld-primitive-font-family-sans.
 * Keyed by output CSS file so one entry covers every Airtable theme name
 * that writes to that file. Themes omitted here inherit the base Everyday Sans.
 * Keep in sync with THEME_FONT_CONFIG in src/utils/Theming.tsx.
 */
export const THEME_FONT_OVERRIDES = {
  'sams-club.css':      "'Gibson', -apple-system, Roboto, sans-serif",
  'members-mark.css':   "'Gibson', -apple-system, Roboto, sans-serif",
  'bodega.css':         "'Bogle', -apple-system, Roboto, sans-serif",
  'walmart-legacy.css': "'Bogle', -apple-system, Roboto, sans-serif",
};

export const PATHS = {
  cacheDir: resolve(__dirname, 'cache'),
  snapshotFile: resolve(__dirname, 'cache/snapshot.json'),
  iconsCache: resolve(__dirname, 'cache/icons'),
  mediaCache: resolve(__dirname, 'cache/media'),
  illustrationsCache: resolve(__dirname, 'cache/illustrations'),
  themesDir: resolve(__dirname, '../src/themes'),
  fontsDir: resolve(__dirname, '../src/fonts'),
  mediaDir: resolve(__dirname, '../src/media'),
  illustrationsDir: resolve(__dirname, '../src/illustrations'),
  // iconComponentPath removed — LivingDesignIconsFont was deleted
  iconManifestPath: resolve(__dirname, '../src/fonts/icon-manifest.json'),
  mediaManifestPath: resolve(__dirname, '../src/media/manifest.json'),
  illustrationsManifestPath: resolve(__dirname, '../src/illustrations/manifest.json'),
  lottieDir: resolve(__dirname, '../src/lottie'),
  lottieCache: resolve(__dirname, 'cache/lottie'),
  lottieManifestPath: resolve(__dirname, '../src/lottie/manifest.json'),
  baseCss: resolve(__dirname, '../src/themes/base.css'),
};

// Illustration types we sync. Keys are the tab identifiers used in the React
// router (e.g. `illustrations-mono-small`). The Airtable `Illustration Type`
// singleSelect has a fourth value, "Hero", which is omitted because those rows
// are PNG-only and out of scope for the inline-SVG pipeline.
export const ILLUSTRATION_TYPES = {
  'mono-small': { airtableType: 'Mono Small', label: 'Mono Small', constPrefix: 'MONO_SMALL' },
  'mono-large': { airtableType: 'Mono Large', label: 'Mono Large', constPrefix: 'MONO_LARGE' },
  'spot':       { airtableType: 'Spot',       label: 'Spot',       constPrefix: 'SPOT' },
};

export const ICON_THEMES = {
  'ld':             { theme: 'LD Base',        fontName: 'LD',          dir: 'ld',            cssClass: 'ld',   label: 'Living Design', inherits: [] },
  'wcp':            { theme: 'WCP',            fontName: 'WCP',         dir: 'wcp',           cssClass: 'wcp',  label: 'WCP',           inherits: ['ld'] },
  'sams-club':      { theme: "Sam's Club",     fontName: 'SamsClub',    dir: 'sams-club',     cssClass: 'sc',   label: "Sam's Club",    inherits: ['ld', 'wcp'] },
  'ax':             { theme: 'AX',             fontName: 'AX',          dir: 'ax',            cssClass: 'ax',   label: 'AX',            inherits: ['ld'] },
  'ax-sams-club':   { theme: "AX Sam's Club",  fontName: 'AXSamsClub',  dir: 'ax-sams-club',  cssClass: 'axsc', label: "AX Sam's Club", inherits: ['ld', 'ax'] },
  'px':             { theme: 'PX',             fontName: 'PX',          dir: 'px',            cssClass: 'px',   label: 'PX',            inherits: ['ld'] },
  'px-sams-club':   { theme: "PX Sam's Club",  fontName: 'PXSamsClub',  dir: 'px-sams-club',  cssClass: 'pxsc', label: "PX Sam's Club", inherits: ['ld', 'px'] },
  'bodega':         { theme: 'Bodega',         fontName: 'Bodega',      dir: 'bodega',        cssClass: 'bdg',  label: 'Bodega',        inherits: ['ld', 'wcp'] },
};

// Each marker pair wraps an auto-generated region of a CSS file. Keys map to
// human labels; Start/End variants are derived so we don't repeat the template
// string for every region. Add a new region by adding one line here.
const MARKER_LABELS = {
  color: 'COLOR TOKENS',
  wcp: 'WCP TOKENS',
  iconFont: 'ICON FONT',
  iconGlyphs: 'ICON GLYPHS',
  breakpoint: 'BREAKPOINTS',
};

const marker = (label, kind) => `/* === AUTO-GENERATED: ${label} ${kind} === */`;

export const CSS_MARKERS = Object.fromEntries(
  Object.entries(MARKER_LABELS).flatMap(([key, label]) => [
    [`${key}Start`, marker(label, 'START')],
    [`${key}End`, marker(label, 'END')],
  ]),
);
