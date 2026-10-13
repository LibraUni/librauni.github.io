import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {markIcma01} from '../src/m101-icma01.js';
test('M101 iCMA distinguishes omitted answers from wrong choices',()=>{
 assert.deepEqual(markIcma01([]),Array(10).fill(null));
 assert.deepEqual(markIcma01([null,undefined,'1',-1,3,NaN]),Array(10).fill(null));
 const answers=[1,2,0,1,2,0,1,2,0,1];
 assert.deepEqual(markIcma01(answers),Array(10).fill(true));
 for(let i=0;i<10;i++){
  for(let choice=0;choice<3;choice++){
   const a=Array(10).fill(null);a[i]=choice;const result=markIcma01(a);
   assert.equal(result[i],choice===answers[i]);assert.equal(result.filter(x=>x!==null).length,1);
  }
 }
});
test('M101 closing release has cumulative feedback, complete downloads and honest forward boundary',()=>{
 const page=fs.readFileSync(new URL('../content/m101/unit3-lesson6.html',import.meta.url),'utf8');
 assert.equal((page.match(/class="exercise"/g)||[]).length,10);
 assert.equal((page.match(/class="icma-question"/g)||[]).length,10);
 assert.equal((page.match(/<details>/g)||[]).length,24);
 assert.doesNotMatch(page,/<details open|data-study-id/);
 assert.match(page,/TMA 01 has a separate six-hour allocation/);
 assert.match(page,/TMA 01 questions and marking criteria are available/);
 for(const path of ['public/teaching/m101/M101-Unit-3-Reference.pdf','public/notebooks/m101-u03-l06.ipynb','public/notebooks/m101-u03-l06.py'])assert.ok(fs.statSync(new URL('../'+path,import.meta.url)).size>100);
 const future=fs.readFileSync(new URL('../learn/physics/stage-1/m101/b02/u04/index.html',import.meta.url),'utf8');assert.match(future,/data-search-status="available"/);assert.match(future,/All four lessons, the unit exercises, the Python investigation and the reference resources are available/);
});
