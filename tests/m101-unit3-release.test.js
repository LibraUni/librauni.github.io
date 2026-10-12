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
 assert.match(read(base+'l06/index.html'),/data-search-status="available"/);
 const ids=[...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const [,id] of page.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id),id);
 assert.match(read(base+'index.html'),/All six lessons are available/);
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

test('Unit 3 Lesson 3 preserves staged practice and correct release boundaries',()=>{
 const page=read(base+'l03/index.html');
 assert.match(page,/data-search-status="available"/);
 assert.doesNotMatch(page,/Local review|href="M101-Unit-3|data-study-id/);
 assert.equal((page.match(/<math /g)||[]).length,299);
 assert.equal((page.match(/class="activity"/g)||[]).length,8);
 assert.equal((page.match(/<details><summary>/g)||[]).length,11);
 assert.equal((page.match(/<section class="chapter"/g)||[]).length,7);
 const ids=[...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const [,id] of page.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id),id);
 assert.match(page,/No programming is required/);
 assert.match(page,/NIST reuse terms/);
 assert.match(read(base+'l02/index.html'),/Next: Solving simultaneous equations by elimination/);
});

test('Unit 3 Lesson 4 preserves families, hidden feedback and unit-end reservation',()=>{
 const page=read(base+'l04/index.html');
 assert.match(page,/data-search-status="available"/);
 assert.doesNotMatch(page,/Local review|href="M101-Unit-3|data-study-id|<details open/);
 assert.equal((page.match(/class="activity"/g)||[]).length,7);
 assert.equal((page.match(/<details><summary>/g)||[]).length,9);
 assert.equal((page.match(/<section class="chapter"/g)||[]).length,6);
 assert.match(page,/remaining 15 minutes for the cumulative unit-exercise solutions/);
 assert.match(page,/data-param-controls hidden/);
 assert.match(page,/m101-family.js/);
 assert.match(page,/u03-railway.jpg/);
 assert.doesNotMatch(page,/<mi>&amp;<\/mi>|<mi>\\begin/);
 const ids=[...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const [,id] of page.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id),id);
 assert.match(read(base+'l03/index.html'),/Next: When solutions fail or are not unique/);
});

test('Unit 3 Lesson 5 keeps candidate checks distinct from uniqueness and supplies runnable preparation',()=>{
 const page=read(base+'l05/index.html');
 assert.match(page,/data-search-status="available"/);
 assert.equal((page.match(/class="activity"/g)||[]).length,6);
 assert.equal((page.match(/<details><summary>/g)||[]).length,8);
 assert.doesNotMatch(page,/<details open|Local review|href="M101-Unit-3|data-study-id/);
 assert.match(page,/P101 Unit 1, Lesson 4/);
 assert.ok(page.includes('/p101/b01/u01/l05/'));
 assert.match(page,/m101-u03-l05.ipynb/);
 assert.match(page,/zero residual cannot prove uniqueness/);
 assert.match(page,/language-python/);
 const ids=[...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const [,id] of page.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id),id);
 const nb=JSON.parse(read('public/notebooks/m101-u03-l05.ipynb'));
 assert.ok(nb.cells.filter(c=>c.cell_type==='code').every(c=>c.execution_count===null&&c.outputs.length===0));
 assert.match(read(base+'l04/index.html'),/Next: Determinants, invertibility and computational checks/);
});
