import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {p101Block4Lessons} from '../curriculum/p101-block4-lessons.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('P101 Block4 blueprint preserves approved unit budgets and future availability',()=>{
 const ls=p101Block4Lessons.lessons;
 for(const [unit,py] of [['U11',3],['U12',4],['U13',3]]){
  assert.equal(ls.filter(l=>l.unit===unit).reduce((n,l)=>n+l.hours,0),18);
  assert.equal(ls.filter(l=>l.unit===unit).reduce((n,l)=>n+l.pythonHours,0),py);
 }
 for(const u of ['u12','u13'])assert.doesNotMatch(read(`learn/physics/stage-1/p101/b04/${u}/index.html`),/data-search-status="available"/);
});
test('P101 Unit11 resources and closed feedback are available',()=>{
 const home=read('learn/physics/stage-1/p101/b04/u11/index.html');
 for(let i=1;i<=5;i++){
  assert.match(home,new RegExp('u11/l0'+i+'/'));
  const s=read(`content/p101/unit11-lesson${i}.html`);assert.doesNotMatch(s,/<details\s+open|\[\[/);
  assert.match(s,/<math/);
 }
 const last=read('content/p101/unit11-lesson5.html');
 assert.equal((last.match(/class="exercise"/g)||[]).length,16);
 assert.equal((last.match(/Worked solution to Exercise/g)||[]).length,16);
 assert.match(home,/P101-Unit-11-Reference.pdf/);assert.match(home,/P101-Unit-11-Offline.zip/);
});
test('P101 Unit11 source domain and distinct media licences are explicit',()=>{
 assert.match(read('content/p101/unit11-lesson2.html'),/source with radius/);
 assert.match(read('content/p101/unit11-lesson4.html'),/positive exterior radii/);
 assert.match(read('content/p101/unit11-lesson4.html'),/CC BY-SA 4.0/);
 assert.match(read('content/p101/unit11.html'),/CC BY-NC-SA 4.0/);
});
