import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {m101Unit6Lessons} from '../curriculum/m101-released.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('M101 Unit6 complete teaching, hidden feedback and stable sequences',()=>{
 assert.equal(m101Unit6Lessons.length,5);
 assert.equal(m101Unit6Lessons.reduce((sum,l)=>sum+l.hours,0),18);
 const fragments=[read('content/m101/unit6.html')];
 for(let n=1;n<=5;n++){
  const s=read(`content/m101/unit6-lesson${n}.html`);fragments.push(s);
  assert.doesNotMatch(s,/<details open|data-study-id|\[\[FIG|<mi>&<\/mi>/);
  const ids=[...s.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
  assert.match(read(`learn/physics/stage-1/m101/b02/u06/l0${n}/index.html`),/data-search-status="available"/);
 }
 const all=fragments.join('\n');
 for(const [type,count] of [['fig',17],['example',19],['activity',22],['exercise',15],['key',10]]){
  assert.deepEqual([...all.matchAll(new RegExp(`id="m101-u06-${type}-(\\d+)"`,'g'))].map(m=>+m[1]),Array.from({length:count},(_,i)=>i+1));
 }
 assert.equal((all.match(/Worked solution to Exercise 6\./g)||[]).length,15);
 assert.match(read('learn/physics/stage-1/m101/b02/u07/index.html'),/data-search-status="outline"/);
 assert.match(read('learn/physics/stage-1/m101/b02/u06/index.html'),/M101-Unit-6-Reference.pdf/);
});
test('M101 Unit6 notebook and synchronised reference ship as usable assets',()=>{
 const nb=JSON.parse(read('public/teaching/m101/M101-Unit-6-Investigation.ipynb'));
 const script=read('public/teaching/m101/M101-Unit-6-Investigation.py');
 const cells=nb.cells.filter(c=>c.cell_type==='code');assert.equal(cells.length,3);
 for(const c of cells){assert.equal(c.execution_count,null);assert.deepEqual(c.outputs,[]);assert.ok(script.includes(c.source.join('')));}
 assert.ok(read('public/teaching/m101/M101-Unit-6-Reference.pdf').startsWith('%PDF-'));
 const ref=JSON.parse(read('content/m101/unit6-reference.json'));assert.equal(ref.version,'1.0');assert.equal(ref.rows.length,11);
 for(const [,topic] of ref.rows)assert.ok(read('content/m101/unit6-lesson5.html').includes(topic));
});
