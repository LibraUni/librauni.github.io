import test from 'node:test';
import assert from 'node:assert/strict';
import {openingSections} from '../curriculum/m100-opening-sections.js';
import {block1Lessons} from '../curriculum/m100-block1-lessons.js';
test('opening sections preserve the parent lesson budget and taught-first sequence',()=>{
 const parent=block1Lessons.lessons.find(l=>l.id===openingSections.lesson);
 assert.ok(parent);
 const seen=new Set();
 for(const s of openingSections.sections){
  assert.ok(s.id.startsWith(parent.id+'-'));
  assert.ok(!seen.has(s.id));
  for(const prior of s.requires)assert.ok(seen.has(prior));
  seen.add(s.id);
  assert.equal(s.allocationMinutes.length,5);
  assert.ok(s.allocationMinutes.every(n=>Number.isFinite(n)&&n>=0));
  assert.equal(s.minutes,s.allocationMinutes.reduce((a,b)=>a+b,0));
  for(const key of ['purpose','scope','practice','feedback','visuals','handover'])assert.ok(s[key]);
 }
 for(let i=0;i<5;i++)assert.equal(openingSections.sections.reduce((n,s)=>n+s.allocationMinutes[i],0),parent.allocation[i]*60);
 assert.equal(openingSections.sections.reduce((n,s)=>n+s.minutes,0),parent.hours*60);
 assert.equal(openingSections.minutes,parent.hours*60);
});
