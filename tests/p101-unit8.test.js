import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {p101Block3Lessons} from '../curriculum/p101-block3-lessons.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('P101 Unit8 release preserved with Unit10 still planned',()=>{
 for(let n=1;n<=5;n++){
  assert.match(read(`learn/physics/stage-1/p101/b03/u08/l0${n}/index.html`),/data-search-status="available"/);
  assert.doesNotMatch(read(`content/p101/unit8-lesson${n}.html`),/<details[^>]*\bopen\b/);
 }
 const closing=read('content/p101/unit8-lesson5.html');
 assert.equal((closing.match(/id="p101-u08-exercise-/g)||[]).length,16);
 assert.equal((closing.match(/Worked solution to Exercise/g)||[]).length,16);
 for(const u of ['u11'])assert.doesNotMatch(read(`learn/physics/stage-1/p101/b04/${u}/index.html`),/data-search-status="available"/);
 for(const f of ['Reference.pdf','Sampling.ipynb','Sampling.py','Offline.zip'])assert.ok(fs.statSync(new URL('../public/teaching/p101/u08/P101-Unit-8-'+f,import.meta.url)).size>100);
 const all=Array.from({length:5},(_,i)=>read(`content/p101/unit8-lesson${i+1}.html`)).join('');
 for(let i=1;i<=15;i++)assert.equal(all.split(`id="p101-u08-activity-${String(i).padStart(2,'0')}"`).length-1,1);
});
test('Block3 blueprint preserves approved hours and unit8 closing resources',()=>{
 const lessons=p101Block3Lessons.lessons;
 assert.equal(lessons.length,15);assert.equal(lessons.reduce((s,l)=>s+l.hours,0),54);assert.equal(lessons.reduce((s,l)=>s+l.pythonHours,0),8);
 const u8=lessons.filter(l=>l.unit==='U08');assert.equal(u8.reduce((s,l)=>s+l.hours,0),18);assert.equal(u8.reduce((s,l)=>s+l.pythonHours,0),3);
 for(const l of u8)assert.equal(Object.values(l.allocation).reduce((s,n)=>s+n,0),60*l.hours);
 const ref=JSON.parse(read('content/p101/unit8-reference.json'));assert.equal(ref.rows.length,12);
 assert.match(read('content/p101/unit8-lesson5.html'),/What the unit has connected/);
 assert.match(read('content/p101/unit8-lesson4.html'),/id="p101-u08-sampler"/);
});
