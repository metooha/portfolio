import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const assetsDir = path.resolve(__dirname, 'src/assets')
const fallbackAsset = path.resolve(assetsDir, '840e6895ac600c62a54c6dbd6cbb35a7f6faa2e0.png')

function figmaAssetPlugin() {
  return {
    name: 'vite-plugin-figma-asset',
    enforce: 'pre' as const,
    resolveId(id: string) {
      if (!id.startsWith('figma:asset/')) return null
      const filename = id.slice('figma:asset/'.length)
      const resolved = path.resolve(assetsDir, filename)
      if (fs.existsSync(resolved)) return resolved
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

export default defineConfig(({ command }) => ({
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
    host: true,
    port: 5173,
    hmr: true,
    open: true,
  },
  preview: {
    host: true,
    port: 5173,
  },
  // Use root base in dev so Cursor browser can open http://localhost:5173
  base: command === 'build' ? '/portfolio/' : '/',
}))
