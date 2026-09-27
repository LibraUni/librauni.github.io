import test from 'node:test';
import assert from 'node:assert/strict';
import {block1Lessons} from '../curriculum/m100-block1-lessons.js';
import {block1Sections} from '../curriculum/m100-block1-sections.js';
import {openingSections} from '../curriculum/m100-opening-sections.js';
import {block1Assessments} from '../curriculum/m100-block1-assessments.js';
test('all Block 1 sections reconcile every approved lesson and category budget',()=>{
 const plans=[{id:'U01-L01',sections:openingSections.sections},...block1Sections.lessons];
 assert.equal(plans.length,19);const ids=new Set();let total=0;
 for(const l of block1Lessons.lessons){const p=plans.find(p=>p.id===l.id);assert.ok(p,l.id);const sum=[0,0,0,0,0];
  for(const s of p.sections){assert.ok(!ids.has(s.id));ids.add(s.id);assert.ok(s.minutes>0);assert.equal(s.minutes,s.allocationMinutes.reduce((a,b)=>a+b,0));s.allocationMinutes.forEach((n,i)=>sum[i]+=n);total+=s.minutes;}
  assert.deepEqual(sum,l.allocation.map(h=>h*60),l.id);
 }
 assert.equal(total,80*60);
});
test('assessment specifications preserve existing hours and coverage',()=>{
 const [icma,tma]=block1Assessments;
 assert.equal(icma.minutes,60);assert.equal(tma.minutes,360);
 assert.deepEqual(icma.requires,['U01','U02']);assert.deepEqual(tma.requires,['U01','U02','U03','U04']);
 for(const a of block1Assessments)assert.equal(a.parts.reduce((n,p)=>n+p[1],0),100);
 const p=block1Sections.lessons.find(l=>l.id==='U02-L04');assert.equal(p.sections.at(-1).minutes,90);
});
