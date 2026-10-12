import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {p101Block2Lessons} from '../curriculum/p101-block2-lessons.js';
import {p101Units} from '../curriculum/p101-units.js';
test('P101 Block 2 lesson budgets preserve approved unit and Python allocations',()=>{
 for(const u of p101Units.units.filter(u=>u.block==='B02')){
  const ls=p101Block2Lessons.lessons.filter(l=>l.unit===u.id);
  assert.equal(ls.reduce((s,l)=>s+l.hours,0),u.hours,u.id);
  assert.equal(ls.reduce((s,l)=>s+l.pythonHours,0),u.pythonHours,u.id);
  for(const l of ls){assert.equal(Object.values(l.allocationMinutes).reduce((a,b)=>a+b,0),60*l.hours,l.id);assert.equal(l.allocationMinutes.python,60*l.pythonHours,l.id);}
 }
 assert.ok(p101Block2Lessons.lessons.find(l=>l.id==='U07-L03').requires.includes('M101-U05'));
});
test('P101 Unit 4 opens only Lesson 1; future lessons remain unavailable to teaching search',()=>{
 const base=new URL('../learn/physics/stage-1/p101/b02/u04/',import.meta.url);
 const first=fs.readFileSync(new URL('l01/index.html',base),'utf8');
 assert.match(first,/data-search-status="available"/);
 for(let n=1;n<=6;n++)assert.ok(first.includes(`id="P101-U04-L01-S0${n}"`));
 for(let n=2;n<=5;n++){const h=fs.readFileSync(new URL(`l0${n}/index.html`,base),'utf8');assert.doesNotMatch(h,/data-search-status="available"/);assert.match(h,/Teaching is in preparation/);}
});
