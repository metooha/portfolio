import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const assetsDir = path.resolve(__dirname, 'src/app/assets')
const fallbackAsset = path.resolve(
  assetsDir,
  'pages/case-study/wm-rebrand/design.png',
)

function figmaAssetPlugin() {
  return {
    name: 'vite-plugin-figma-asset',
    enforce: 'pre' as const,
    resolveId(id: string) {
      if (!id.startsWith('figma:asset/')) return null
      const filename = id.slice('figma:asset/'.length)
      let resolved = path.resolve(assetsDir, filename)
      if (fs.existsSync(resolved)) return resolved
      // Optional @2x: if requesting xxx@2x.png and it's missing, fall back to xxx.png
      if (filename.endsWith('@2x.png')) {
        const baseFilename = filename.replace('@2x.png', '.png')
        resolved = path.resolve(assetsDir, baseFilename)
        if (fs.existsSync(resolved)) return resolved
      }
      return fallbackAsset
    },
  }
}

// GitHub Pages: serve the SPA for all routes (copy index.html → 404.html)
function copyIndexTo404Plugin() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist')
      const indexPath = path.join(outDir, 'index.html')
      const notFoundPath = path.join(outDir, '404.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath)
      }
    },
  }
}

export default defineConfig(({ command, mode }) => ({
  plugins: [
    figmaAssetPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    copyIndexTo404Plugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    hmr: true,
    open: true,
  },
  preview: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
  },
  // GitHub Pages needs /portfolio/; local dev and preview should run at localhost root.
  base: command === 'build' && mode === 'production' ? '/portfolio/' : '/',
}))
