import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        ...Object.fromEntries(['','preparation/','preparation/m100/','preparation/m100/b01/','preparation/m100/b01/u01/','preparation/m100/b01/u02/','preparation/m100/b01/u03/','preparation/m100/b01/u04/','preparation/m100/b01/u01/l01/','physics/','physics/stage-1/','physics/stage-2/','physics/stage-3/'].map((p,i)=>['learning'+i,fileURLToPath(new URL('./learn/'+p+'index.html',import.meta.url))])),
        stage1Map: fileURLToPath(new URL('./programme/stage-1/map/index.html', import.meta.url)),
        constructionPolicy: fileURLToPath(new URL('./programme/construction-policy/index.html', import.meta.url)),
        journal: fileURLToPath(new URL('./journal/index.html', import.meta.url)),
        profile: fileURLToPath(new URL('./profile/index.html', import.meta.url)),
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
