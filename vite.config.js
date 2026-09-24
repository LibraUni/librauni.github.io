import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        license: fileURLToPath(new URL('./license/index.html', import.meta.url)),
        programme: fileURLToPath(new URL('./programme/index.html', import.meta.url)),
        a101: fileURLToPath(new URL('./programme/stage-1/lu-a101/index.html', import.meta.url)),
        m100: fileURLToPath(new URL('./programme/bridge/lu-m100/index.html', import.meta.url)),
        m102: fileURLToPath(new URL('./programme/stage-1/lu-m102/index.html', import.meta.url)),
        p101: fileURLToPath(new URL('./programme/stage-1/lu-p101/index.html', import.meta.url)),
        m101: fileURLToPath(new URL('./programme/stage-1/lu-m101/index.html', import.meta.url)),
        coverage: fileURLToPath(new URL('./programme/coverage/index.html', import.meta.url)),
      },
    },
  },
});
