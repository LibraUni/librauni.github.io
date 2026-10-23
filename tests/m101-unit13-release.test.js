import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {load} from 'cheerio';import {m101Unit13Lessons} from '../curriculum/m101-released.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Unit13 budgets, sequential structure, closure and future boundary',()=>{
 assert.equal(m101Unit13Lessons.length,4);assert.equal(m101Unit13Lessons.reduce((s,l)=>s+l.hours,0),18);assert.equal(m101Unit13Lessons.reduce((s,l)=>s+l.pythonHours,0),4);
 const ids=[];
 for(let n=1;n<=4;n++){
  const s=read('content/m101/unit13-lesson'+n+'.html'),$=load(s);
  assert.equal($('section.chapter').length,4);assert.equal($('details[open]').length,0);assert.ok($('math').length>10);
  assert.ok(!s.includes('<!--FIG')&&!s.includes('<!--EXERCISES')&&!s.includes('<!--REFERENCE'));
  ids.push(...$('[id]').map((i,e)=>$(e).attr('id')).get().filter(x=>x!=='references'));
  assert.match(read('learn/physics/stage-1/m101/b04/u13/l0'+n+'/index.html'),/data-search-status="available"/);
 }
 assert.equal(new Set(ids).size,ids.length);
 const $=load(read('content/m101/unit13-lesson4.html'));assert.equal($('[id^="m101-u13-exercise-"]').length,14);assert.equal($('[id^="m101-u13-exercise-"] details').length,28);
 assert.match(read('learn/physics/stage-1/m101/b04/u13/index.html'),/data-search-status="available"/);
 assert.equal(load(read('content/m101/unit13-lesson4.html'))('code.language-python').last().text(),JSON.parse(read('content/m101/unit13-reference.json')).code);
 const nb=JSON.parse(read('public/notebooks/M101-Unit-13-Synthesis.ipynb'));for(const c of nb.cells.filter(c=>c.cell_type==='code')){assert.equal(c.execution_count,null);assert.deepEqual(c.outputs,[]);}
 assert.ok(read('public/teaching/m101/M101-Unit-13-Reference.pdf').startsWith('%PDF-'));
});
