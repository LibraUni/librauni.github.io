import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {load} from 'cheerio';import {m101Unit11Lessons} from '../curriculum/m101-released.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Unit11 preserves budget, required practice and correct availability',()=>{
 assert.equal(m101Unit11Lessons.length,4);assert.equal(m101Unit11Lessons.reduce((s,l)=>s+l.hours,0),16);assert.equal(m101Unit11Lessons.reduce((s,l)=>s+l.pythonHours,0),5);
 const all=[];
 for(let n=1;n<=4;n++){
  const s=read('content/m101/unit11-lesson'+n+'.html'),$=load(s);
  assert.equal($('section.chapter').length,n===4?5:4);assert.equal($('details[open]').length,0);
  assert.ok($('math').length>20);assert.doesNotMatch(s,/<!--(?:FIG|CODE|EXERCISES|REFERENCE)|\\\(|\\\)|&amp;lt;/);
  const ids=$('[id]').map((i,e)=>$(e).attr('id')).get();assert.equal(new Set(ids).size,ids.length);all.push(...ids.filter(x=>x!=='references'));
  assert.match(read('learn/physics/stage-1/m101/b03/u11/l0'+n+'/index.html'),/data-search-status="available"/);
 }
 assert.equal(new Set(all).size,all.length);
 const $=load(read('content/m101/unit11-lesson4.html'));assert.equal($('.exercise').length,14);assert.equal($('.exercise details').length,28);assert.equal($('[id^="m101-u11-icma03-"]').length,8);
 assert.match(read('learn/physics/stage-1/m101/b04/u12/index.html'),/data-search-status="outline"/);
});
test('Unit11 reference and learner notebook remain coherent',()=>{
 const ref=JSON.parse(read('content/m101/unit11-reference.json'));assert.equal(ref.rows.length,12);
 const nb=JSON.parse(read('public/teaching/m101/M101-Unit-11-Quadrature.ipynb'));for(const c of nb.cells.filter(c=>c.cell_type==='code')){assert.equal(c.execution_count,null);assert.deepEqual(c.outputs,[]);}
 assert.equal(nb.cells.filter(c=>c.cell_type==='code').map(c=>c.source.join('')).join('\n\n'),read('public/teaching/m101/M101-Unit-11-Quadrature.py'));
 assert.ok(read('public/teaching/m101/M101-Unit-11-Reference.pdf').startsWith('%PDF-'));
 assert.equal(load(read('content/m101/unit11-lesson4.html'))('code.language-python').last().text(),ref.code);
});
