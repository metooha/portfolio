# Figma export script

## Replace Sprint 1-2 Items image with export from Figma

The MaskGroup on the case study page uses `src/assets/sprint-1-2-items.png`. To use the exact frame from Figma (node 3256:33068):

### Option 1: Export via script (requires Figma access token)

1. Create a [Figma personal access token](https://www.figma.com/developers/api#access-tokens).
2. Run from the `projects/portfolio` directory:
   ```bash
   FIGMA_ACCESS_TOKEN=your_token node scripts/export-figma-node.mjs
   ```
3. The script downloads the PNG and saves it as `src/assets/sprint-1-2-items.png`, replacing the placeholder.

### Option 2: Export manually from Figma

1. Open: [Figma – Amy Portfolio, node 3256:33068](https://www.figma.com/design/ne0HusyVVKR4Rhp7HiEmsZ/Amy-Portfolio?node-id=3256-33068).
2. Right-click the frame (Sprint 1-2 Items) → **Export** → **PNG** → Export.
3. Save the file as **`sprint-1-2-items.png`** in **`projects/portfolio/src/assets/`**, overwriting the existing file.

After either option, the case study page will show the Figma-exported image.
