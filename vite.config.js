import {readdirSync} from 'node:fs';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        ...Object.fromEntries(readdirSync(new URL('./learn/',import.meta.url),{recursive:true}).filter(p=>p.endsWith('index.html')).map((p,i)=>['learning'+i,fileURLToPath(new URL('./learn/'+p,import.meta.url))])),
        ...Object.fromEntries(readdirSync(new URL('./programme/archive/',import.meta.url),{recursive:true}).filter(p=>p.endsWith('index.html')).map((p,i)=>['archive'+i,fileURLToPath(new URL('./programme/archive/'+p,import.meta.url))])),
        stage1Map: fileURLToPath(new URL('./programme/stage-1/map/index.html', import.meta.url)),
        constructionPolicy: fileURLToPath(new URL('./programme/construction-policy/index.html', import.meta.url)),
        enjoy: fileURLToPath(new URL('./enjoy/index.html', import.meta.url)),
        evidence: fileURLToPath(new URL('./evidence/index.html', import.meta.url)),
        journal: fileURLToPath(new URL('./journal/index.html', import.meta.url)),
        profile: fileURLToPath(new URL('./profile/index.html', import.meta.url)),
        identity: fileURLToPath(new URL('./identity/index.html', import.meta.url)),
        study: fileURLToPath(new URL('./study/index.html', import.meta.url)),
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
