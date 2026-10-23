import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {load} from 'cheerio';import {m101Unit8Lessons} from '../curriculum/m101-released.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Unit8 preserves its budget and releases five complete lessons with hidden feedback',()=>{
 assert.equal(m101Unit8Lessons.length,5);assert.equal(m101Unit8Lessons.reduce((s,l)=>s+l.hours,0),20);
 const all=[];
 for(let n=1;n<=5;n++){
  const s=read(`content/m101/unit8-lesson${n}.html`),$=load(s);
  assert.equal($('section.chapter').length,4);assert.equal($('details[open]').length,0);
  assert.ok($('math').length>20);assert.doesNotMatch(s,/<!--(?:FIG|CODE|EXERCISES|REFERENCE)|\\\(|\\\)|&amp;lt;/);
  const ids=$('[id]').map((i,e)=>$(e).attr('id')).get();assert.equal(new Set(ids).size,ids.length);all.push(...ids.filter(x=>x!=='references'));
  assert.match(read(`learn/physics/stage-1/m101/b03/u08/l0${n}/index.html`),/data-search-status="available"/);
 }
 assert.equal(new Set(all).size,all.length);
 const $=load(read('content/m101/unit8-lesson5.html'));assert.equal($('.exercise').length,16);assert.equal($('.exercise details').length,32);
 assert.match(read('learn/physics/stage-1/m101/b03/u11/index.html'),/data-search-status="outline"/);
});
test('Unit8 reference and notebook are present, coherent and free of execution state',()=>{
 const ref=JSON.parse(read('content/m101/unit8-reference.json'));assert.equal(ref.rows.length,12);
 const nb=JSON.parse(read('public/teaching/m101/M101-Unit-8-Rectangles.ipynb'));for(const c of nb.cells.filter(c=>c.cell_type==='code')){assert.equal(c.execution_count,null);assert.deepEqual(c.outputs,[]);}
 assert.ok(read('public/teaching/m101/M101-Unit-8-Reference.pdf').startsWith('%PDF-'));
 assert.ok(read('content/m101/unit8-lesson5.html').includes(ref.code.replaceAll('<','&lt;').replaceAll('>','&gt;')));
});
