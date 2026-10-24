import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {answerKey,markIcma02} from '../src/p101-icma02.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('P101 Unit7 release is complete and later content stays unreleased',()=>{
 for(let n=1;n<=5;n++){
  assert.match(read(`learn/physics/stage-1/p101/b02/u07/l0${n}/index.html`),/data-search-status="available"/);
  assert.doesNotMatch(read(`content/p101/unit7-lesson${n}.html`),/<details[^>]*\bopen\b/);
 }
 const closing=read('content/p101/unit7-lesson5.html');
 assert.equal((closing.match(/id="p101-u07-exercise-/g)||[]).length,14);
 assert.equal((closing.match(/class="icma-question"/g)||[]).length,10);
 assert.doesNotMatch(read('learn/physics/stage-1/p101/b03/u10/index.html'),/data-search-status="available"/);
 assert.match(closing,/questions and marking criteria are now available/);
 for(const f of ['Reference.pdf','Thermal.ipynb','Motion.ipynb','Comparison.ipynb','Comparison.zip','Offline.zip'])assert.ok(fs.statSync(new URL('../public/teaching/p101/u07/P101-Unit-7-'+f,import.meta.url)).size>100);
});
test('iCMA02 distinguishes correct, wrong, missing and invalid selections',()=>{
 assert.deepEqual(markIcma02(answerKey),Array(10).fill(true));
 assert.deepEqual(markIcma02(answerKey.map(n=>(n+1)%3)),Array(10).fill(false));
 assert.deepEqual(markIcma02([]),Array(10).fill(null));
 assert.deepEqual(markIcma02([null,undefined,-1,3,1.1,NaN,'0',Infinity]),Array(10).fill(null));
});
test('historical comparison retains all observations including repeated speeds',()=>{
 const rows=read('public/teaching/p101/u07/p101-u07-stopping.csv').trim().split('\n').slice(1).map(r=>r.split(',').map(Number));
 assert.equal(rows.length,50);assert.equal(rows.filter(r=>r[1]===20).length,5);
 const mar=tau=>rows.reduce((s,[,mph,ft])=>{const v=mph*.44704;return s+Math.abs(ft*.3048-v*v/6-tau*v)},0)/50;
 assert.ok(Math.abs(mar(0)-4.613327997269334)<1e-12);assert.ok(Math.abs(mar(.5)-3.335786297002666)<1e-12);
});
