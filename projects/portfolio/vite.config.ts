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

export default defineConfig({
  plugins: [
    figmaAssetPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    hmr: true,
  },
  preview: {
    host: true,
  },
  base: '/portfolio/',   // same as your repo name
  // ... rest of config
})
})
