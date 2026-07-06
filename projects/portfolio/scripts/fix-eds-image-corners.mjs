/**
 * Removes baked-in black corner pixels from Everyday Sans case study screenshots.
 * Reads *.jpg, writes *.png with fringe pixels replaced by detected page background.
 */
import { createRequire } from "node:module";
import { readdirSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, "../src/app/assets/pages/case-study/everyday-sans");

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    const { execSync } = await import("node:child_process");
    execSync("npm install sharp --no-save", {
      cwd: join(__dirname, ".."),
      stdio: "inherit",
    });
    return (await import("sharp")).default;
  }
}

function detectBg(data, width, height, channels) {
  const samples = [];
  const pick = (x, y) => {
    const i = (y * width + x) * channels;
    samples.push([data[i], data[i + 1], data[i + 2]]);
  };

  for (const x of [Math.floor(width / 4), Math.floor(width / 2), Math.floor((3 * width) / 4)]) {
    for (let y = 0; y < Math.min(5, height); y++) pick(x, y);
  }
  for (const y of [Math.floor(height / 4), Math.floor(height / 2), Math.floor((3 * height) / 4)]) {
    for (const x of [0, 1, 2, 3, 4, width - 5, width - 4, width - 3, width - 2, width - 1]) {
      if (x >= 0 && x < width) pick(x, y);
    }
  }

  const light = samples.filter((s) => s[0] + s[1] + s[2] > 500);
  const pool = light.length ? light : samples;
  return pool
    .reduce((acc, s) => [acc[0] + s[0], acc[1] + s[1], acc[2] + s[2]], [0, 0, 0])
    .map((v) => Math.round(v / pool.length));
}

function isFringe(r, g, b, bg) {
  if (r < 35 && g < 35 && b < 35) return true;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max < 90 && max - min < 20) {
    const [br, bb, bn] = bg;
    if (br > 100 || bb > 100 || bn > 100) return true;
  }
  return false;
}

async function fixImage(sharp, inputPath, forceBg) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const bg = forceBg ?? detectBg(data, width, height, channels);
  let changed = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (isFringe(r, g, b, bg)) {
        data[i] = bg[0];
        data[i + 1] = bg[1];
        data[i + 2] = bg[2];
        if (channels === 4) data[i + 3] = 255;
        changed++;
      }
    }
  }

  const outPath = inputPath.replace(/\.jpe?g$/i, ".png");
  await sharp(data, { raw: { width, height, channels } }).png({ compressionLevel: 9 }).toFile(outPath);
  if (inputPath !== outPath) unlinkSync(inputPath);
  return { outPath, changed, bg, width, height };
}

const sharp = await loadSharp();
const files = readdirSync(assetsDir).filter((f) => /\.jpe?g$/i.test(f));

for (const file of files) {
  const inputPath = join(assetsDir, file);
  const forceBg = file === "weights.jpg" ? [248, 248, 248] : undefined;
  try {
    const { outPath, changed, bg, width, height } = await fixImage(sharp, inputPath, forceBg);
    console.log(`${file} -> ${outPath.split("/").pop()} (${width}x${height}, ${changed}px fixed, bg=${bg})`);
  } catch (err) {
    console.error(`FAIL ${file}:`, err.message);
  }
}
