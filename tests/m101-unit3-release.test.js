import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const base='learn/physics/stage-1/m101/b01/u03/';
test('Unit 3 release exposes only reviewed teaching and preserves hidden feedback',()=>{
 const page=read(base+'l01/index.html');
 assert.match(page,/data-search-status="available"/);
 assert.doesNotMatch(page,/Local review|href="M101-Unit-3|data-study-id/);
 assert.equal((page.match(/<math /g)||[]).length,328);
 assert.equal((page.match(/class="activity"/g)||[]).length,8);
 assert.equal((page.match(/<details><summary>/g)||[]).length,10);
 for(let i=2;i<=6;i++)assert.match(read(base+'l0'+i+'/index.html'),/data-search-status="outline"/);
 const ids=[...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const [,id] of page.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id),id);
 assert.match(read(base+'index.html'),/Lessons 2–6 remain in preparation/);
 for(const f of ['u03-cayley.jpg','u03-manhattan.jpg'])assert.ok(fs.existsSync(new URL('../public/teaching/m101/'+f,import.meta.url)));
});
