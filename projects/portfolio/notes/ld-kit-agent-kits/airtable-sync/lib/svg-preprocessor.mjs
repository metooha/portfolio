/**
 * SVG Preprocessor for Icon Font Generation
 *
 * 1. Removes sub-paths whose bounding box is entirely outside the SVG
 *    viewBox / width×height.  Design-tool exports often contain stray
 *    path segments at negative coordinates that are clipped in SVG but
 *    break font-glyph bounding boxes in fantasticon.
 *
 * 2. Converts SVGs with fill-rule="evenodd" to nonzero winding by
 *    reversing inner sub-paths using svg-path-commander.
 *
 * Icon fonts use nonzero fill rule. SVGs from design tools often use
 * evenodd which creates holes via overlapping paths regardless of direction.
 * Without conversion, these icons render as solid filled shapes in fonts.
 */

import SVGPathCommander from 'svg-path-commander';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

const PATH_ELEMENT_RE = /<path\b([^>]*?)\bd="([^"]*)"([^>]*?)(\/>|>\s*<\/path>)/gi;

function rebuildPathElement(pre, d, post, closing) {
  const attrs = `${pre}d="${d}"${post}`.trim();
  return `<path ${attrs}${closing}`;
}

function bboxContains(outer, inner, epsilon = 0.01) {
  return (
    inner.x1 >= outer.x1 - epsilon &&
    inner.y1 >= outer.y1 - epsilon &&
    inner.x2 <= outer.x2 + epsilon &&
    inner.y2 <= outer.y2 + epsilon
  );
}

// ─── Out-of-bounds sub-path removal ───────────────────────────

/**
 * Parse SVG viewBox or width/height into {x, y, w, h}.
 */
function parseSvgBounds(svgContent) {
  const vbMatch = svgContent.match(/viewBox="([^"]*)"/);
  if (vbMatch) {
    const [x, y, w, h] = vbMatch[1].trim().split(/[\s,]+/).map(Number);
    if ([x, y, w, h].every(n => Number.isFinite(n))) return { x, y, w: x + w, h: y + h };
  }
  const wMatch = svgContent.match(/\bwidth="(\d+(?:\.\d+)?)"/);
  const hMatch = svgContent.match(/\bheight="(\d+(?:\.\d+)?)"/);
  if (wMatch && hMatch) {
    return { x: 0, y: 0, w: Number(wMatch[1]), h: Number(hMatch[1]) };
  }
  return null;
}

/**
 * Compute the bounding box of a sub-path using SVGPathCommander.
 * Returns {x1, y1, x2, y2} or null on failure.
 */
function subPathBBox(subPathD) {
  try {
    const cmd = new SVGPathCommander(subPathD);
    const bbox = cmd.getBBox();
    return { x1: bbox.x, y1: bbox.y, x2: bbox.x + bbox.width, y2: bbox.y + bbox.height };
  } catch {
    return null;
  }
}

/**
 * Remove sub-paths whose bounding box goes outside the SVG bounds by more than a tiny margin.
 * Operates on ALL <path> elements.
 * A small margin is used to allow for anti-aliasing or optical alignment,
 * but anything significantly outside (like a misplaced shadow) is stripped,
 * because it would ruin fantasticon's glyph bounding box normalization.
 */
export function removeOutOfBoundsSubPaths(svgContent) {
  const bounds = parseSvgBounds(svgContent);
  if (!bounds) return svgContent;

  return svgContent.replace(
    PATH_ELEMENT_RE,
    (fullMatch, pre, d, post, closing) => {
      try {
        const subs = splitSubPaths(d);
        if (subs.length <= 1) return fullMatch; // single sub-path — keep as-is

        const kept = subs.filter(sp => {
          const bb = subPathBBox(sp);
          if (!bb) return true; // can't parse — keep to be safe
          
          // Drop if ANY part of the subpath goes outside bounds + margin
          const margin = 1.0;
          if (bb.x1 < bounds.x - margin || bb.x2 > bounds.w + margin || 
              bb.y1 < bounds.y - margin || bb.y2 > bounds.h + margin) {
            return false;
          }
          return true;
        });

        if (kept.length === subs.length) return fullMatch; // nothing removed
        if (kept.length === 0) return fullMatch; // don't remove everything

        const newD = kept.join('');
        return rebuildPathElement(pre, newD, post, closing);
      } catch {
        return fullMatch;
      }
    },
  );
}

// ─── TrueType Winding Normalization ─────────────────────────────

/**
 * Process an SVG string: normalize path windings for TrueType fonts.
 * TrueType requires outer paths to be clockwise (CW) and inner paths (holes)
 * to be counter-clockwise (CCW).
 */
export function normalizeWindings(svgContent) {
  return svgContent.replace(
    PATH_ELEMENT_RE,
    (fullMatch, pre, d, post, closing) => {
      try {
        const subPaths = splitSubPaths(d);
        if (subPaths.length === 0) return fullMatch;

        const analyzed = subPaths.map((sp, index) => ({
          index,
          path: sp,
          area: signedArea(sp),
          bbox: subPathBBox(sp),
          parent: null,
        }));

        const bboxArea = (b) => (b.x2 - b.x1) * (b.y2 - b.y1);

        for (const sp of analyzed) {
          const spArea = sp.bbox ? bboxArea(sp.bbox) : 0;
          const containers = analyzed
            .filter(candidate =>
              candidate.index !== sp.index &&
              candidate.bbox &&
              sp.bbox &&
              bboxContains(candidate.bbox, sp.bbox, 2.0) && // Generous epsilon to handle bezier slop
              bboxArea(candidate.bbox) > spArea, // Strictly larger — prevents mutual-containment cycles when two subpaths have near-equal bboxes (e.g. concentric circles)
            )
            .sort((a, b) => bboxArea(a.bbox) - bboxArea(b.bbox));
          sp.parent = containers[0]?.index ?? null;
        }

        const desiredCW = new Map();
        const resolveDesiredCW = (index) => {
          if (desiredCW.has(index)) return desiredCW.get(index);
          const sp = analyzed[index];
          if (sp.parent == null) {
            // Root paths MUST be clockwise (area < 0 in our signedArea)
            desiredCW.set(index, true);
            return true;
          }
          const target = !resolveDesiredCW(sp.parent);
          desiredCW.set(index, target);
          return target;
        };

        const newSubPaths = analyzed.map(sp => {
          const currentCW = sp.area < 0;
          const targetCW = resolveDesiredCW(sp.index);
          if (currentCW === targetCW) return sp.path;
          try {
            return new SVGPathCommander(sp.path).reverse().toString();
          } catch {
            return sp.path;
          }
        });

        const newD = newSubPaths.join('');
        if (newD.includes('NaN') || newD.includes('undefined')) return fullMatch;

        const newAttrs = `${pre}d="${newD}"${post}`
          .replace(/fill-rule="evenodd"\s*/g, '')
          .replace(/clip-rule="evenodd"\s*/g, '');

        return `<path ${newAttrs.trim()}${closing}`;
      } catch (err) {
        console.warn(`    [preprocess] normalizeWindings failed for a path: ${err.message}`);
        return fullMatch;
      }
    },
  );
}
function splitSubPaths(d) {
  try {
    const absolute = new SVGPathCommander(d).toAbsolute().toString();
    const parts = absolute.match(/M[^M]*/g);
    return parts ? parts.map(p => p.trim()) : [absolute];
  } catch {
    return [d];
  }
}

/**
 * Calculate signed area of a sub-path (shoelace formula on sampled points).
 * Positive = CCW, Negative = CW.
 */
function signedArea(subPathD) {
  try {
    const cmd = new SVGPathCommander(subPathD);
    const len = cmd.getTotalLength();
    if (len === 0) return 0;

    const points = [];
    const steps = Math.max(20, Math.min(100, Math.floor(len / 2)));
    for (let i = 0; i < steps; i++) {
      const pt = cmd.getPointAtLength((i / steps) * len);
      points.push([pt.x, pt.y]);
    }

    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i][0] * points[j][1] - points[j][0] * points[i][1];
    }
    return area / 2;
  } catch {
    return 0;
  }
}

/**
 * Process an SVG string: convert fill-rule="evenodd" paths to nonzero winding.
 * TrueType requires outer paths and inner paths (holes) to alternate windings.
 */
export function convertEvenOddToNonZero(svgContent) {
  return svgContent.replace(
    PATH_ELEMENT_RE,
    (fullMatch, pre, d, post, closing) => {
      try {
        const subPaths = splitSubPaths(d);

        if (subPaths.length === 0) return fullMatch;

        const analyzed = subPaths.map((sp, index) => ({
          index,
          path: sp,
          area: signedArea(sp),
          bbox: subPathBBox(sp),
          parent: null,
        }));

        const bboxArea = (b) => (b.x2 - b.x1) * (b.y2 - b.y1);

        for (const sp of analyzed) {
          const spArea = sp.bbox ? bboxArea(sp.bbox) : 0;
          const containers = analyzed
            .filter(candidate =>
              candidate.index !== sp.index &&
              candidate.bbox &&
              sp.bbox &&
              bboxContains(candidate.bbox, sp.bbox) &&
              bboxArea(candidate.bbox) > spArea, // Prevents mutual-containment cycles
            )
            .sort((a, b) => bboxArea(a.bbox) - bboxArea(b.bbox));
          sp.parent = containers[0]?.index ?? null;
        }

        const desiredCW = new Map();
        const resolveDesiredCW = (index) => {
          if (desiredCW.has(index)) return desiredCW.get(index);
          const sp = analyzed[index];
          if (sp.parent == null) {
            // Keep original direction for root paths
            const currentCW = sp.area < 0;
            desiredCW.set(index, currentCW);
            return currentCW;
          }
          const target = !resolveDesiredCW(sp.parent);
          desiredCW.set(index, target);
          return target;
        };

        const newSubPaths = analyzed.map(sp => {
          const currentCW = sp.area < 0;
          const targetCW = resolveDesiredCW(sp.index);
          if (currentCW === targetCW) return sp.path;
          try {
            return new SVGPathCommander(sp.path).reverse().toString();
          } catch {
            return sp.path;
          }
        });

        const newD = newSubPaths.join('');

        // Validate output
        if (newD.includes('NaN') || newD.includes('undefined')) {
          return fullMatch;
        }

        const newAttrs = `${pre}d="${newD}"${post}`
          .replace(/fill-rule="evenodd"\s*/g, '')
          .replace(/clip-rule="evenodd"\s*/g, '');

        return `<path ${newAttrs.trim()}${closing}`;
      } catch (err) {
        console.warn(`    [preprocess] convertEvenOddToNonZero failed for a path: ${err.message}`);
        return fullMatch;
      }
    },
  );
}

/**
 * Parse a fill color string into an [r, g, b] triple (each 0-255), or
 * null if the value isn't a parseable opaque color.
 */
function parseFillColor(str) {
  if (!str) return null;
  const v = str.trim().toLowerCase();
  if (v === 'none' || v === 'currentcolor' || v === 'inherit' || v === 'transparent') return null;
  const named = { black: [0, 0, 0], white: [255, 255, 255], gray: [128, 128, 128], grey: [128, 128, 128] };
  if (named[v]) return named[v];
  const m = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (!m) return null;
  const hex = m[1].length === 3 ? m[1].split('').map(c => c + c).join('') : m[1];
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
}

/**
 * Whether a fill color is too light to survive monochrome glyph rendering.
 * Icon fonts collapse every drawn shape into a single color, so a light-gray
 * "tint" fill (e.g. #BABBBE behind a glasses-frame outline) ends up filling
 * the entire shape solid in the glyph. Strip those paths so only the
 * foreground (dark) elements contribute to the glyph.
 */
function isLightFill(fillStr) {
  const rgb = parseFillColor(fillStr);
  if (!rgb) return false;
  return (rgb[0] + rgb[1] + rgb[2]) / 3 > 128;
}

/**
 * Strip shape elements whose fill is a light tint. Skipped if it would
 * leave the SVG with no drawable shapes (in case some icon is intentionally
 * authored entirely in a light color).
 */
export function removeLightFillPaths(svgContent) {
  const SHAPE_RE = /<(path|rect|circle|polygon|polyline|ellipse)\b[^>]*?\bfill="([^"]+)"[^>]*?(?:\/>|>\s*<\/\1>)/gi;
  const allShapes = [...svgContent.matchAll(SHAPE_RE)];
  if (allShapes.length === 0) return svgContent;
  const lightCount = allShapes.filter(m => isLightFill(m[2])).length;
  if (lightCount === 0 || lightCount === allShapes.length) return svgContent;
  return svgContent.replace(SHAPE_RE, (match, _tag, fill) => (isLightFill(fill) ? '' : match));
}

/**
 * Remove elements that are invisible (fill="none") that would otherwise
 * be rendered as solid blocks by fantasticon. Also strips <defs> blocks
 * and orphaned clip-path / mask / filter references — fantasticon doesn't
 * honor the url(#...) references, but the shapes inside <defs> (typically
 * a viewBox-sized rect inside <clipPath>) get drawn as regular geometry
 * and cover the glyph as a solid square.
 */
export function removeInvisibleElements(svgContent) {
  let content = svgContent;

  // Remove <defs>...</defs> blocks. Contents are only meaningful via
  // url(#id) references (clipPath, mask, filter, use) which the font
  // generator ignores, so the defs are dead weight at best and a solid
  // overlay at worst.
  content = content.replace(/<defs\b[\s\S]*?<\/defs>/gi, '');

  // Drop now-orphaned references that pointed into <defs>.
  content = content.replace(/\s+(?:clip-path|mask|filter)="[^"]*"/gi, '');

  // Remove <rect ... fill="none" ... />
  content = content.replace(/<rect\b[^>]*?\bfill="none"[^>]*?(?:\/>|><\/rect>)/gi, '');

  // Remove <path ... fill="none" ... />
  content = content.replace(/<path\b[^>]*?\bfill="none"[^>]*?(?:\/>|><\/path>)/gi, '');

  // Remove <circle ... fill="none" ... />
  content = content.replace(/<circle\b[^>]*?\bfill="none"[^>]*?(?:\/>|><\/circle>)/gi, '');

  // Remove <polygon ... fill="none" ... />
  content = content.replace(/<polygon\b[^>]*?\bfill="none"[^>]*?(?:\/>|><\/polygon>)/gi, '');

  // Remove <polyline ... fill="none" ... />
  content = content.replace(/<polyline\b[^>]*?\bfill="none"[^>]*?(?:\/>|><\/polyline>)/gi, '');

  return content;
}

/**
 * Preprocess all SVGs in a directory:
 *  1. Remove sub-paths outside the SVG viewBox/dimensions
 *  2. Convert evenodd fill-rule to nonzero winding
 *  3. Remove invisible elements with fill="none"
 * Modifies files in-place.
 */
export function preprocessSvgDir(svgDir, { verbose = false } = {}) {
  const files = readdirSync(svgDir).filter(f => f.endsWith('.svg'));
  let clipped = 0;
  let converted = 0;
  let invisiblesRemoved = 0;
  let lightFillsRemoved = 0;

  for (const file of files) {
    const filePath = resolve(svgDir, file);
    let content = readFileSync(filePath, 'utf-8');
    let changed = false;

    // Step 1: remove invisible elements
    const withoutInvisibles = removeInvisibleElements(content);
    if (withoutInvisibles !== content) {
      content = withoutInvisibles;
      changed = true;
      invisiblesRemoved++;
    }

    // Step 1b: strip light-tint fill paths that won't survive monochrome
    const withoutLight = removeLightFillPaths(content);
    if (withoutLight !== content) {
      content = withoutLight;
      changed = true;
      lightFillsRemoved++;
    }

    // Step 2: remove out-of-bounds sub-paths
    const cleaned = removeOutOfBoundsSubPaths(content);
    if (cleaned !== content) {
      content = cleaned;
      changed = true;
      clipped++;
    }

    // Step 3: normalize windings if evenodd OR if we clipped paths
    if (content.includes('evenodd') || changed) {
      const processed = normalizeWindings(content);
      if (processed !== content) {
        content = processed;
        changed = true;
        converted++;
      }
    }

    if (changed) {
      writeFileSync(filePath, content);
    }
  }

  if (verbose && (clipped > 0 || converted > 0 || invisiblesRemoved > 0 || lightFillsRemoved > 0)) {
    if (invisiblesRemoved > 0) console.log(`    Removed invisible elements (fill="none") in ${invisiblesRemoved}/${files.length} SVGs`);
    if (lightFillsRemoved > 0) console.log(`    Removed light-tint fill paths in ${lightFillsRemoved}/${files.length} SVGs`);
    if (clipped > 0) console.log(`    Clipped out-of-bounds paths in ${clipped}/${files.length} SVGs`);
    if (converted > 0) console.log(`    Converted ${converted}/${files.length} SVGs from evenodd to nonzero`);
  }
  return converted + clipped + invisiblesRemoved + lightFillsRemoved;
}
