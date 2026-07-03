import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  base: './',
  plugins: [
    react({
      // Exclude generated LD components from Fast Refresh — they are read-only
      exclude: /src\/components\/core\/.*/,
    }),
  ],
  resolve: {
    alias: {
      '@livingdesign/react': path.resolve(
        __dirname,
        'src/components/core/index.ts'
      ),
    },
  },
  server: {
    port: 3099,
    open: true,
  },
});
