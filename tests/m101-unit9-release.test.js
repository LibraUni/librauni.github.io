import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {load} from 'cheerio';import {m101Unit9Lessons} from '../curriculum/m101-released.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Unit9 preserves its budget and releases six complete lessons with hidden feedback',()=>{
 assert.equal(m101Unit9Lessons.length,6);assert.equal(m101Unit9Lessons.reduce((s,l)=>s+l.hours,0),24);
 const all=[];
 for(let n=1;n<=6;n++){
  const s=read(`content/m101/unit9-lesson${n}.html`),$=load(s);
  assert.equal($('section.chapter').length,4);assert.equal($('details[open]').length,0);
  assert.ok($('math').length>20);assert.doesNotMatch(s,/<!--(?:FIG|CODE|EXERCISES|REFERENCE)|\\\(|\\\)|&amp;lt;/);
  const ids=$('[id]').map((i,e)=>$(e).attr('id')).get();assert.equal(new Set(ids).size,ids.length);all.push(...ids.filter(x=>x!=='references'));
  assert.match(read(`learn/physics/stage-1/m101/b03/u09/l0${n}/index.html`),/data-search-status="available"/);
 }
 assert.equal(new Set(all).size,all.length);
 const $=load(read('content/m101/unit9-lesson6.html'));assert.equal($('.exercise').length,16);assert.equal($('.exercise details').length,32);
 assert.match(read('learn/physics/stage-1/m101/b04/u12/index.html'),/data-search-status="outline"/);
});
test('Unit9 reference and notebook are present, coherent and free of execution state',()=>{
 const ref=JSON.parse(read('content/m101/unit9-reference.json'));assert.equal(ref.rows.length,10);
 const nb=JSON.parse(read('public/teaching/m101/M101-Unit-9-Checks.ipynb'));for(const c of nb.cells.filter(c=>c.cell_type==='code')){assert.equal(c.execution_count,null);assert.deepEqual(c.outputs,[]);}
 assert.ok(read('public/teaching/m101/M101-Unit-9-Reference.pdf').startsWith('%PDF-'));
 assert.ok(read('content/m101/unit9-lesson6.html').includes(ref.code.replaceAll('<','&lt;').replaceAll('>','&gt;')));
});
