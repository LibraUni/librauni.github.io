import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        license: fileURLToPath(new URL('./license/index.html', import.meta.url)),
        programme: fileURLToPath(new URL('./programme/index.html', import.meta.url)),
      },
    },
  },
});
