import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset paths so the build works from any folder
  base: './',
  // Listen on the local network too, so the dev server can be opened from a phone
  server: { host: true },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        project: resolve(import.meta.dirname, 'project.html'),
        yaplog: resolve(import.meta.dirname, 'yaplog.html'),
      },
    },
  },
});
