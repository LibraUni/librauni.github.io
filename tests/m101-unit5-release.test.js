import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {m101Unit5Lessons} from '../curriculum/m101-released.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('M101 Unit5 releases a complete sequence while later teaching remains gated',()=>{
 assert.equal(m101Unit5Lessons.length,6);
 assert.equal(m101Unit5Lessons.reduce((s,l)=>s+l.hours,0),24);
 for(let n=1;n<=6;n++){
  const s=read(`content/m101/unit5-lesson${n}.html`);
  assert.doesNotMatch(s,/<details open|data-study-id|\[\[FIG|<mi>&<\/mi>/);
  const ids=[...s.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
  assert.match(read(`learn/physics/stage-1/m101/b02/u05/l0${n}/index.html`),/data-search-status="available"/);
 }
 const last=read('content/m101/unit5-lesson6.html');
 assert.equal((last.match(/id="m101-u05-exercise-\d+"/g)||[]).length,18);
 assert.equal((last.match(/Worked solution to Exercise 5\./g)||[]).length,18);
 assert.match(read('learn/physics/stage-1/m101/b03/u11/index.html'),/data-search-status="outline"/);
});
test('M101 Unit5 starter notebook and printable reference are usable release assets',()=>{
 const nb=JSON.parse(read('public/teaching/m101/M101-Unit-5-Investigation.ipynb'));
 const script=read('public/teaching/m101/M101-Unit-5-Investigation.py');
 for(const c of nb.cells.filter(c=>c.cell_type==='code')){assert.equal(c.execution_count,null);assert.deepEqual(c.outputs,[]);}
 assert.ok(script.includes(nb.cells[1].source.join('')));
 assert.ok(read('public/teaching/m101/M101-Unit-5-Reference.pdf').startsWith('%PDF-'));
 const ref=JSON.parse(read('content/m101/unit5-reference.json'));assert.equal(ref.version,'1.0');assert.ok(ref.python.includes('x + h == x'));
});
