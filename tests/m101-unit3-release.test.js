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
 for(let i=3;i<=6;i++)assert.match(read(base+'l0'+i+'/index.html'),/data-search-status="outline"/);
 const ids=[...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const [,id] of page.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id),id);
 assert.match(read(base+'index.html'),/Lessons 3–6 remain in preparation/);
 for(const f of ['u03-cayley.jpg','u03-manhattan.jpg'])assert.ok(fs.existsSync(new URL('../public/teaching/m101/'+f,import.meta.url)));
});

test('Unit 3 Lesson 2 exposes its reviewed practice and notebook without changing later status',()=>{
 const page=read(base+'l02/index.html');
 assert.match(page,/data-search-status="available"/);
 assert.doesNotMatch(page,/Local review|href="M101-Unit-3|data-study-id/);
 assert.equal((page.match(/<math /g)||[]).length,260);
 assert.equal((page.match(/class="activity"/g)||[]).length,6);
 assert.equal((page.match(/<details><summary>/g)||[]).length,8);
 assert.equal((page.match(/class="language-python"/g)||[]).length,2);
 const ids=[...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const [,id] of page.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id),id);
 for(const ext of ['ipynb','py']){assert.match(page,new RegExp('/notebooks/m101-u03-l02.'+ext));assert.ok(fs.existsSync(new URL('../public/notebooks/m101-u03-l02.'+ext,import.meta.url)));}
 assert.match(read(base+'l01/index.html'),/Next: Composing transformations in order/);
});
