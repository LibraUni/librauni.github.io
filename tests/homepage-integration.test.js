import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {load} from 'cheerio';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('public entry retains the shared header and routes study actions to the preserved desk',()=>{
 const $=load(read('index.html'));
 assert.equal($('body>header #theme-toggle').length,1);
 assert.equal($('body>header .header-actions a[href="/study/"]').length,1);
 assert.equal($('script[src="/src/theme.js"]').length,1);
 assert.equal($('script[src="/src/main.js"],script[src="/src/study-ui.js"]').length,0);
 assert.equal($('aside,#home-greeting,#study-overview').length,0);
 assert.equal($('h1').length,1);
 assert.equal($('.landing-content #journey,.landing-content #playground,.landing-content #approach').length,3);
 const ids=$('[id]').map((_,el)=>$(el).attr('id')).get();assert.equal(new Set(ids).size,ids.length);
 $('a[href^="#"]').each((_,el)=>{const hash=$(el).attr('href').slice(1);if(hash)assert.ok(ids.includes(hash));});
});
test('desk preserves existing study bindings and sidebar without homepage scripts',()=>{
 const $=load(read('study/index.html'));
 for(const id of ['auth-button','theme-toggle','home-greeting','home-introduction','home-continue','home-secondary','study-overview','notice'])assert.equal($('#'+id).length,1,id);
 assert.equal($('aside nav').length,1);
 for(const path of ['/src/main.js','/src/study-ui.js','/src/theme.js'])assert.equal($(`script[src="${path}"]`).length,1);
 assert.equal($('script[src="/src/homepage.js"]').length,0);
 assert.ok(read('vite.config.js').includes("new URL('./study/index.html'"));
});
test('homepage and desk entries exist and public links stay inside the local site',()=>{
 for(const page of ['index.html','study/index.html'])assert.ok(existsSync(new URL('../'+page,import.meta.url)));
 const $=load(read('index.html'));
 $('a[href^="/"]').each((_,el)=>{const href=$(el).attr('href');assert.ok(existsSync(new URL('..'+href+'index.html',import.meta.url)),href);});
 assert.equal($('a[href^="https://librauni.github.io"]').length,0);
 assert.equal($('script[type="module"]').length>0,true);
 assert.ok(read('src/theme.js').includes("import './search.js'"));
});
