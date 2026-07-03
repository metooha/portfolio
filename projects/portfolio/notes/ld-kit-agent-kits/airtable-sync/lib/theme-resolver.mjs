/**
 * Theme Resolver
 * Builds theme hierarchy, resolves token inheritance, and diffs against base.
 */

import { FIELD_NAMES, ALLOWED_STATUSES, THEME_FILE_MAP } from '../config.mjs';

const F_THEME = FIELD_NAMES.themes;
const F_PRIM = FIELD_NAMES.primitives;
const F_SEM = FIELD_NAMES.semantics;

/**
 * Build a Map<recordId, string> from data dictionary records.
 * Used to resolve linked record IDs for Data Type, Mode, Token Type.
 */
export function buildDataDictionary(ddRecords) {
  const dict = new Map();
  for (const rec of ddRecords) {
    const term = rec.fields.Term || rec.fields.Name || rec.fields.Value || '';
    if (term) dict.set(rec.id, term);
  }
  return dict;
}

/**
 * Build theme hierarchy from theme records.
 * Returns Map<themeName, { id, parent, children, path, depth, record }>
 */
export function buildHierarchy(themes) {
  const byName = new Map();
  const byId = new Map();

  for (const rec of themes) {
    const name = rec.fields[F_THEME.name];
    if (!name) continue;
    const status = rec.fields[F_THEME.status];
    if (!ALLOWED_STATUSES.includes(status)) continue;

    const parentNames = rec.fields[F_THEME.inheritedName]; // lookup array
    const parent = Array.isArray(parentNames) ? parentNames[0] : parentNames || null;

    const entry = { id: rec.id, name, parent, children: [], path: [], depth: 0, record: rec };
    byName.set(name, entry);
    byId.set(rec.id, entry);
  }

  // Build paths and depths
  for (const [, entry] of byName) {
    const path = [];
    let current = entry;
    const visited = new Set();
    while (current) {
      if (visited.has(current.name)) break; // circular ref guard
      visited.add(current.name);
      path.unshift(current.name);
      current = current.parent ? byName.get(current.parent) : null;
    }
    entry.path = path;
    entry.depth = path.length - 1;
  }

  // Build children arrays
  for (const [, entry] of byName) {
    if (entry.parent && byName.has(entry.parent)) {
      byName.get(entry.parent).children.push(entry.name);
    }
  }

  return { byName, byId };
}

/**
 * Convert a token name to a CSS custom property name.
 * e.g. "ld-primitive-color-blue-60" → "--ld-primitive-color-blue-60"
 * e.g. "wcp-semantic-color-action-fill" → "--wcp-semantic-color-action-fill"
 */
function tokenNameToCssVar(name) {
  if (!name) return null;
  // Already has -- prefix
  if (name.startsWith('--')) return name;
  return `--${name}`;
}

/**
 * Normalize a hex color value.
 */
function normalizeHex(value) {
  if (!value || typeof value !== 'string') return value;
  let v = value.trim();
  // Add # if missing
  if (/^[0-9a-fA-F]{3,8}$/.test(v)) v = '#' + v;
  // Lowercase
  if (v.startsWith('#')) v = v.toLowerCase();
  return v;
}

/**
 * Check if a data type string indicates a color token.
 */
function isColorType(dataTypeStr) {
  if (!dataTypeStr) return false;
  return /color|colour/i.test(dataTypeStr);
}

/**
 * Check if a primitive looks like a breakpoint token. Airtable stores them as
 * Data Type = FLOAT with a name like `ld-primitive-scale-breakpoint-medium`.
 * This is the canonical breakpoint set — anything matching this pattern is
 * surfaced into base.css; any other FLOAT primitives are still ignored.
 */
function isBreakpointPrimitive(name, dataTypeStr) {
  if (!name) return false;
  if (!/^float$/i.test(dataTypeStr || '')) return false;
  return /-scale-breakpoint-/i.test(name);
}

function getBreakpointValue(fields) {
  const raw = fields[F_PRIM.resolved] ?? fields[F_PRIM.value];
  const num = Array.isArray(raw) ? raw[0] : raw;
  if (num === null || num === undefined) return null;
  const n = typeof num === 'number' ? num : Number(String(num).trim());
  if (!Number.isFinite(n)) return null;
  // Emit with explicit px unit so the variable is usable wherever a length is
  // expected (e.g. `min-width: var(--ld-primitive-scale-breakpoint-medium)`
  // in a JS-driven matchMedia, or as a numeric reference for layout math).
  return `${n}px`;
}

/**
 * Resolve the data type for a record using linked record IDs and the data dictionary.
 */
function resolveDataType(record, fieldName, dataDictionary) {
  const linked = record.fields[fieldName];
  if (!linked) return null;
  const ids = Array.isArray(linked) ? linked : [linked];
  for (const id of ids) {
    const term = dataDictionary.get(id);
    if (term) return term;
  }
  return null;
}

/**
 * Check if a string looks like a color value (hex, rgb, hsl, named).
 */
function looksLikeColor(val) {
  if (!val || typeof val !== 'string') return false;
  const v = val.trim();
  return /^#[0-9a-fA-F]{3,8}$/.test(v) ||
    /^[0-9a-fA-F]{3,8}$/.test(v) ||
    /^rgba?\(/i.test(v) ||
    /^hsla?\(/i.test(v) ||
    /^(transparent|currentcolor)$/i.test(v);
}

/**
 * Get the best available color value from a record.
 * For primitives: Resolved → Value → RGB Values (Resolved is hex)
 * For semantics: Value → RGB Values (Resolved is a token name, not hex)
 */
function getColorValue(fields, isSemanticRecord = false) {
  const valueField = isSemanticRecord ? F_SEM.value : F_PRIM.value;
  const resolvedField = isSemanticRecord ? F_SEM.resolved : F_PRIM.resolved;
  const rgbField = isSemanticRecord ? F_SEM.rgbValues : F_PRIM.rgbValues;

  if (!isSemanticRecord) {
    // Primitives: Resolved is a hex value, prefer it
    let val = fields[resolvedField] || fields[valueField];
    if (Array.isArray(val)) val = val[0];
    if (val && typeof val === 'string' && looksLikeColor(val)) return normalizeHex(val.trim());
  }

  // Semantics (or fallback): Value field is the hex
  let val = fields[valueField];
  if (Array.isArray(val)) val = val[0];
  if (val && typeof val === 'string' && looksLikeColor(val)) return normalizeHex(val.trim());

  // RGB Values as last resort
  val = fields[rgbField];
  if (Array.isArray(val)) val = val[0];
  if (val && typeof val === 'string') return normalizeHex(val.trim());

  return null;
}

/**
 * Build a lookup of primitive records by ID for resolving semantic aliases.
 */
function buildPrimitiveLookup(primitives) {
  const lookup = new Map();
  for (const rec of primitives) {
    lookup.set(rec.id, rec);
  }
  return lookup;
}

/**
 * Resolve all color tokens for a specific theme.
 * Returns Map<cssVarName, { value, reference?, isWcp }>
 */
export function resolveThemeTokens(themeName, hierarchy, allPrimitives, allSemantics, dataDictionary, primitiveLookup) {
  const themeEntry = hierarchy.byName.get(themeName);
  if (!themeEntry) return new Map();

  const themeId = themeEntry.id;
  const tokens = new Map();

  // Find primitives linked to this theme via Index field
  for (const rec of allPrimitives) {
    const status = rec.fields[F_PRIM.status];
    if (!ALLOWED_STATUSES.includes(status)) continue;

    // Check if this primitive belongs to this theme via Index
    const index = rec.fields[F_PRIM.index];
    if (!index || !Array.isArray(index) || !index.includes(themeId)) continue;

    const dataType = resolveDataType(rec, F_PRIM.dataType, dataDictionary);
    const name = rec.fields[F_PRIM.name];
    const cssVar = tokenNameToCssVar(name);
    if (!cssVar) continue;

    if (isColorType(dataType)) {
      const value = getColorValue(rec.fields, false);
      if (!value) continue;
      const isWcp = cssVar.startsWith('--wcp-');
      tokens.set(cssVar, { value, type: 'primitive', isWcp });
      continue;
    }

    if (isBreakpointPrimitive(name, dataType)) {
      const value = getBreakpointValue(rec.fields);
      if (!value) continue;
      const isWcp = cssVar.startsWith('--wcp-');
      tokens.set(cssVar, { value, type: 'primitive', isWcp, isBreakpoint: true });
      continue;
    }

    // Anything else (other FLOAT scales, etc.) is intentionally ignored —
    // breakpoints are the only non-color primitive this pipeline emits.
  }

  // Find semantics linked to this theme via Index field
  for (const rec of allSemantics) {
    const status = rec.fields[F_SEM.status];
    if (!ALLOWED_STATUSES.includes(status)) continue;

    const index = rec.fields[F_SEM.index];
    if (!index || !Array.isArray(index) || !index.includes(themeId)) continue;

    // Check if it's a color or media token
    const dataType = resolveDataType(rec, F_SEM.dataType, dataDictionary);
    const isColor = isColorType(dataType);
    const isMedia = dataType && /media/i.test(dataType);
    if (!isColor && !isMedia) continue;

    const name = rec.fields[F_SEM.name];
    const cssVar = tokenNameToCssVar(name);
    if (!cssVar) continue;

    let value = null;
    if (isColor) {
      value = getColorValue(rec.fields, true);
      if (!value) continue;
    }

    // Resolve alias reference to primitive
    let reference = null;
    const aliasIds = rec.fields[F_SEM.tokenAliasRef];
    if (aliasIds && Array.isArray(aliasIds) && aliasIds.length > 0) {
      const primRec = primitiveLookup.get(aliasIds[0]);
      if (primRec) {
        const primName = primRec.fields[F_PRIM.name];
        if (primName) reference = tokenNameToCssVar(primName);
      }
    } else if (isMedia && rec.fields['Token Alias']) {
      // Fallback to text string if linked record is missing but alias string is there
      reference = tokenNameToCssVar(rec.fields['Token Alias']);
    }

    if (isMedia) {
      if (!reference) continue;
      // Media semantics just map to their primitive reference
      value = `var(${reference})`;
      // Unset reference so formatBaseVar doesn't double-wrap it in var()
      reference = null;
    }

    const isWcp = cssVar.startsWith('--wcp-');
    tokens.set(cssVar, { value, reference, type: 'semantic', isWcp });
  }

  return tokens;
}

/**
 * Diff theme tokens against base tokens.
 * Returns only tokens that differ from base (for override files).
 */
export function diffAgainstBase(themeTokens, baseTokens) {
  const overrides = new Map();
  for (const [cssVar, token] of themeTokens) {
    const baseToken = baseTokens.get(cssVar);
    // Explicitly include all media semantics as overrides even if they match base
    // so they are guaranteed to render in the CSS for all defined modes
    if (!baseToken || baseToken.value !== token.value || cssVar.includes('-media-')) {
      overrides.set(cssVar, token);
    }
  }
  return overrides;
}

/**
 * Resolve all themes that have CSS file mappings.
 * Returns { base: Map, themes: Map<themeName, { overrides, config }> }
 */
export function resolveAllThemes(data, { verbose = false } = {}) {
  const { themes, primitives, semantics, dataDictionary: ddRecords } = data;

  const dataDictionary = buildDataDictionary(ddRecords);
  const hierarchy = buildHierarchy(themes);
  const primitiveLookup = buildPrimitiveLookup(primitives);

  if (verbose) {
    console.log(`Hierarchy: ${hierarchy.byName.size} themes`);
    for (const [name, entry] of hierarchy.byName) {
      if (entry.depth === 0) console.log(`  Root: ${name}`);
    }
  }

  // Resolve LD Base first
  const baseTokens = resolveThemeTokens('LD Base', hierarchy, primitives, semantics, dataDictionary, primitiveLookup);
  if (verbose) console.log(`LD Base: ${baseTokens.size} color tokens`);

  // Also resolve WCP theme and merge its tokens into base (WCP tokens live in base.css)
  const wcpTokens = resolveThemeTokens('WCP', hierarchy, primitives, semantics, dataDictionary, primitiveLookup);
  let wcpMerged = 0;
  for (const [cssVar, token] of wcpTokens) {
    if (token.isWcp && !baseTokens.has(cssVar)) {
      baseTokens.set(cssVar, token);
      wcpMerged++;
    }
  }
  if (verbose) console.log(`WCP: ${wcpMerged} tokens merged into base`);

  // Resolve each mapped theme
  const themeResults = new Map();
  for (const [themeName, config] of Object.entries(THEME_FILE_MAP)) {
    if (!config.file) continue; // skip themes without CSS files
    if (themeName === 'LD Base') continue;

    const themeTokens = resolveThemeTokens(themeName, hierarchy, primitives, semantics, dataDictionary, primitiveLookup);

    // Also gather tokens from ancestor themes in the inheritance chain
    const themeEntry = hierarchy.byName.get(themeName);
    if (themeEntry) {
      // Walk up the inheritance chain, collecting tokens from ancestors (excluding LD Base)
      for (const ancestorName of themeEntry.path.slice(1, -1)) { // skip LD Base (index 0) and self (last)
        const ancestorTokens = resolveThemeTokens(ancestorName, hierarchy, primitives, semantics, dataDictionary, primitiveLookup);
        // Ancestor tokens are inherited but can be overridden by child
        for (const [cssVar, token] of ancestorTokens) {
          if (!themeTokens.has(cssVar)) {
            themeTokens.set(cssVar, token);
          }
        }
      }
    }

    const overrides = diffAgainstBase(themeTokens, baseTokens);
    if (verbose) console.log(`${themeName}: ${themeTokens.size} total, ${overrides.size} overrides`);

    themeResults.set(themeName, { overrides, config, allTokens: themeTokens });
  }

  return { base: { tokens: baseTokens }, themes: themeResults, hierarchy };
}
