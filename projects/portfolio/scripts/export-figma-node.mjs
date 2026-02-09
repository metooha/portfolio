#!/usr/bin/env node
/**
 * Export a Figma node as PNG and save to src/assets.
 * Usage: FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-node.mjs
 *
 * Or export manually from Figma:
 * 1. Open https://www.figma.com/design/ne0HusyVVKR4Rhp7HiEmsZ/Amy-Portfolio?node-id=3256-33068
 * 2. Right-click the frame → Export → PNG → Export 3256:33068
 * 3. Save as: src/assets/sprint-1-2-items.png
 */

const FIGMA_FILE_KEY = 'ne0HusyVVKR4Rhp7HiEmsZ';
const NODE_ID = '3256:33068';
const OUTPUT_PATH = 'src/assets/sprint-1-2-items.png';
const SCALE = 2; // 2x for retina

const token = process.env.FIGMA_ACCESS_TOKEN;
if (!token) {
  console.error('Set FIGMA_ACCESS_TOKEN and run again, e.g.:');
  console.error('  FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-node.mjs');
  console.error('\nOr export manually: open the Figma link, right-click the frame → Export → PNG, save as', OUTPUT_PATH);
  process.exit(1);
}

const url = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${encodeURIComponent(NODE_ID)}&format=png&scale=${SCALE}`;

try {
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API ${res.status}: ${text}`);
  }
  const data = await res.json();
  const imageUrl = data?.images?.[NODE_ID];
  if (!imageUrl) {
    throw new Error('No image URL in response: ' + JSON.stringify(data));
  }
  const imageRes = await fetch(imageUrl);
  if (!imageRes.ok) throw new Error(`Image fetch ${imageRes.status}`);
  const buffer = Buffer.from(await imageRes.arrayBuffer());
  const fs = await import('fs');
  const path = await import('path');
  const outDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, buffer);
  console.log('Exported to', OUTPUT_PATH);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
