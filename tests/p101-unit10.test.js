import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {p101Block3Lessons} from '../curriculum/p101-block3-lessons.js';
import {answerKey,markIcma03} from '../src/p101-icma03.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Unit10 release includes all lessons, private-by-default feedback and closing resources',()=>{
 const all=[];for(let n=1;n<=5;n++){
  assert.match(read(`learn/physics/stage-1/p101/b03/u10/l0${n}/index.html`),/data-search-status="available"/);
  const s=read(`content/p101/unit10-lesson${n}.html`);assert.doesNotMatch(s,/<details[^>]*\bopen\b/);assert.doesNotMatch(s,/<!--(?:REALFIG|VIRTUALFIG|SPREADFIG|SIGNALFIG)-->/);all.push(s);
 }
 const closing=all.at(-1);assert.equal((closing.match(/Worked solution to Exercise/g)||[]).length,14);assert.equal((closing.match(/Hint for Exercise/g)||[]).length,14);
 const ids=[...all.join('').matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]).filter(id=>id!=='references');assert.equal(ids.length,new Set(ids).size);
 for(const f of ['Reference.pdf','Light.ipynb','Light.py','Offline.zip'])assert.ok(fs.statSync(new URL('../public/teaching/p101/u10/P101-Unit-10-'+f,import.meta.url)).size>100);
 const nb=JSON.parse(read('public/teaching/p101/u10/P101-Unit-10-Light.ipynb'));for(const c of nb.cells.filter(c=>c.cell_type==='code'))assert.equal(c.outputs.length,0);
 assert.doesNotMatch(read('learn/physics/stage-1/p101/b04/u11/index.html'),/data-search-status="available"/);
});
test('Unit10 retains approved workload with included closing practice',()=>{
 const ls=p101Block3Lessons.lessons.filter(l=>l.unit==='U10');assert.equal(ls.reduce((s,l)=>s+l.hours,0),18);assert.equal(ls.reduce((s,l)=>s+l.pythonHours,0),2);
 const p=JSON.parse(read('docs/p101-u10-plan.json'));assert.equal(p.minutes.reduce((s,l)=>s+Object.values(l).reduce((a,b)=>a+b,0),0),1080);
 const q=JSON.parse(read('docs/p101-u10-practice-coverage.json'));assert.equal(q.length,14);assert.equal(q.reduce((s,q)=>s+q.minutes,0),75);
});
test('Formative iCMA03 handles unanswered, invalid, correct and incorrect choices',()=>{
 assert.deepEqual(markIcma03([]),Array(8).fill(null));assert.deepEqual(markIcma03(answerKey),Array(8).fill(true));
 assert.deepEqual(markIcma03(answerKey.map(n=>(n+1)%3)),Array(8).fill(false));
 assert.deepEqual(markIcma03([NaN,-1,3,0.5,null,undefined,'1',Infinity]),Array(8).fill(null));
});
