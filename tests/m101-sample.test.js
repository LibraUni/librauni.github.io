import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const home='learn/physics/stage-1/m101/';
test('M101 production introductions and complete lesson replace the temporary sample',()=>{
 const lesson=read(home+'b01/u01/l01/index.html');
 assert.doesNotMatch(lesson,/Test lesson · temporary sample|noindex|sample-reading|data-study-id|src="\/src\/study-ui.js"/);
 for(let i=1;i<=7;i++)assert.ok(lesson.includes(`id="M101-U01-L01-S0${i}"`));
 assert.equal((lesson.match(/class="activity"/g)||[]).length,7);
 assert.equal((lesson.match(/class="example"/g)||[]).length,6);
 assert.doesNotMatch(lesson,/class="exercise"/);
 assert.match(read(home+'index.html'),/id="module-introduction"/);
 assert.match(read(home+'b01/u01/index.html'),/id="unit-introduction"/);
 assert.doesNotMatch(lesson,/id="module-introduction"|id="unit-introduction"/);
 for(const path of [home,home+'b01/u01/',home+'b01/u01/l01/']){
  const html=read(path+'index.html');assert.match(html,/class="licence-link"/);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,path);
  for(const [,hash] of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(hash),path+hash);
  for(const [,asset] of html.matchAll(/src="(\/teaching-samples\/[^\"]+)"/g))assert.ok(fs.existsSync(new URL('../public'+asset,import.meta.url)),asset);
 }
 for(const id of ['coordinates','m101-u01-s01','m101-u01-s01-01','m101-u01-s01-02','opening-conclusion','lesson-exercises'])assert.ok(lesson.includes(`id="${id}"`));
 for(let i=4;i<=5;i++)assert.match(read(home+`b01/u01/l0${i}/index.html`),/Teaching materials forthcoming/);
});
