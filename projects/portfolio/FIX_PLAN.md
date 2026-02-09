# Plan to Fix Portfolio Project Errors

## Problem
The app fails to build/run because **Vite cannot resolve `figma:asset/...` imports**. The code was generated for a Figma/Make environment that uses a custom `figma:asset/<hash>.png` protocol. Vite does not understand this protocol, so every such import fails with "Failed to resolve import".

## Root cause
- **Import statements** in many files use `import x from "figma:asset/<hash>.png"`.
- **String references** in `portfolio-data.ts` use `image: "figma:asset/<hash>.png"`.
- The actual PNG files **already exist** in `src/assets/` with the same filenames (e.g. `840e6895ac600c62a54c6dbd6cbb35a7f6faa2e0.png`). We only need to map the protocol to that path.

## Fix strategy

### Step 1: Add a Vite plugin to resolve `figma:asset/` (fixes all imports)
- Add a custom plugin in `vite.config.ts` that:
  - In **resolveId**: when the requested id is `figma:asset/<hash>.png`, resolve it to the absolute path of `src/assets/<hash>.png`.
- This fixes **all** import-based `figma:asset` usages across the codebase in one place (no mass find/replace in source files).
- **Optional**: If an asset file is missing, resolve to a placeholder or the same path and let the app show a broken image only for that asset (or add a fallback in the plugin).

### Step 2: Fix `portfolio-data.ts` (runtime string URLs)
- The `hobbies` array uses `image: "figma:asset/..."` as strings. These are not imports, so the plugin does not change them.
- **Option A**: Replace each string with an **import** at the top and use the imported URL in the object (e.g. `import img1 from '@/assets/10d0cda....png'; ... image: img1`). For any asset that does not exist (e.g. `45ef906eb23a4c2a2f3b0e23ddfad19e1c93a4de.png`), use an existing asset as fallback.
- **Option B**: Add a dev server middleware that serves `src/assets` at `/assets/`, and replace strings with `/assets/<hash>.png`. Then in production you’d need to copy assets to `public` or use the same URL scheme. Option A is simpler and works for both dev and prod.

**Chosen:** Option A — use imports in `portfolio-data.ts` and a fallback for the one missing asset.

### Step 3: Handle missing assets
- **Missing assets identified:**  
  - `45ef906eb23a4c2a2f3b0e23ddfad19e1c93a4de.png` (hobbies "Countries Visited")  
  - `c22af8bfcb65f93d01f2862c0d18f313ac7bc96a.png` (case-study-2 hover image)
- **Action:**  
  - In the Vite plugin, if the resolved path does not exist, resolve to a known existing asset (e.g. a generic placeholder) so the build does not fail.  
  - In `portfolio-data.ts`, use an existing hobby image for "Countries Visited".  
  - In `case-study-2.tsx`, the import will go through the plugin; use a fallback image in the plugin when the file is missing (e.g. another existing asset path).

## Steps to implement

1. **Create the Vite plugin** (in `vite.config.ts` or a small `vite-plugin-figma-assets.ts`):
   - `resolveId(id, importer)`: if `id.startsWith('figma:asset/')`, extract the filename and return `path.resolve(__dirname, 'src/assets', filename)`. If that path does not exist, return path to a fallback asset so the build succeeds.
2. **Register the plugin** in `vite.config.ts` before the React plugin (so it runs first).
3. **Update `portfolio-data.ts`**: Add imports for the 4 hobby images that use `figma:asset/`. Use an existing asset for the missing `45ef...` (e.g. reuse another hobby image).
4. **Handle missing asset in case-study-2**: In the plugin, when the requested figma asset file is missing, resolve to an existing placeholder image so `case-study-2` does not break.
5. **Verify**: Run `npm run dev` and confirm the app loads without import errors. Click through pages that use figma assets (home, about, contact, case studies) to confirm images load.

## Files to change
- `projects/portfolio/vite.config.ts` — add plugin.
- `projects/portfolio/src/data/portfolio-data.ts` — replace 4 `figma:asset` strings with imported URLs and use fallback for the missing one.

## Summary
| Item | Action |
|------|--------|
| All `figma:asset/...` **imports** in .tsx/.ts | Resolved by new Vite plugin → `src/assets/<hash>.png` |
| `portfolio-data.ts` **strings** | Replace with imports + fallback for missing asset |
| Missing asset files | Plugin returns fallback path; data uses existing image for 45ef... |

After these steps, the project should build and run without "Failed to resolve import" errors.
