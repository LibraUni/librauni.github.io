import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {p101Block3Lessons} from '../curriculum/p101-block3-lessons.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Unit9 release provides complete teaching, closed feedback and matching resources',()=>{
 const all=[];for(let n=1;n<=5;n++){
  assert.match(read(`learn/physics/stage-1/p101/b03/u09/l0${n}/index.html`),/data-search-status="available"/);
  const s=read(`content/p101/unit9-lesson${n}.html`);assert.doesNotMatch(s,/<details[^>]*\bopen\b/);assert.doesNotMatch(s,/\{\{|<!--(?:REFERENCE|EXERCISES)-->/);all.push(s);
 }
 const closing=all.at(-1);assert.equal((closing.match(/Worked solution to Exercise/g)||[]).length,16);
 assert.equal((closing.match(/Hint for Exercise/g)||[]).length,16);
 const ids=[...all.join('').matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]).filter(id=>id!=='references');assert.equal(ids.length,new Set(ids).size);
 for(const f of ['Reference.pdf','Waves.ipynb','Waves.py','Offline.zip'])assert.ok(fs.statSync(new URL('../public/teaching/p101/u09/P101-Unit-9-'+f,import.meta.url)).size>100);
 const rows=JSON.parse(read('content/p101/unit9-reference.json')).rows;assert.equal(rows.length,12);
 const nb=JSON.parse(read('public/teaching/p101/u09/P101-Unit-9-Waves.ipynb'));for(const c of nb.cells.filter(c=>c.cell_type==='code'))assert.equal(c.outputs.length,0);
 assert.doesNotMatch(read('learn/physics/stage-1/p101/b04/u12/index.html'),/data-search-status="available"/);
});
test('Unit9 budget covers Python and unit practice without expansion',()=>{
 const ls=p101Block3Lessons.lessons.filter(l=>l.unit==='U09');assert.equal(ls.length,5);assert.equal(ls.reduce((s,l)=>s+l.hours,0),18);assert.equal(ls.reduce((s,l)=>s+l.pythonHours,0),3);
 for(const l of ls)assert.equal(Object.values(l.allocation).reduce((a,b)=>a+b,0),l.hours*60);
 const questions=JSON.parse(read('docs/p101-u09-practice-coverage.json'));assert.equal(questions.length,16);assert.equal(questions.reduce((s,q)=>s+q.minutes,0),100);
});
