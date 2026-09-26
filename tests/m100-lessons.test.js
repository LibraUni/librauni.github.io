import test from 'node:test';
import assert from 'node:assert/strict';
import {block1Lessons} from '../curriculum/m100-block1-lessons.js';
import {block1} from '../curriculum/m100-block1.js';
import {m100} from '../curriculum/m100.js';
import {rubric} from '../curriculum/m100-rubric.js';
test('Block 1 lessons preserve all five approved workload categories and taught-first dependencies',()=>{
 const seen=new Set();
 const outcomes=new Set(m100.outcomes.map(o=>o[0]));
 const criteria=new Set(rubric.capabilities.flatMap(c=>c.criteria.map(x=>x[0])));
 for(const l of block1Lessons.lessons){
  assert.ok(!seen.has(l.id));
  for(const p of l.requires)assert.ok(seen.has(p),`${l.id}: missing earlier prerequisite ${p}`);
  seen.add(l.id);
  assert.ok(block1.units.some(u=>u.id===l.unit));
  assert.equal(l.allocation.length,5);
  assert.ok(l.allocation.every(h=>Number.isFinite(h)&&h>=0));
  assert.equal(l.hours,l.allocation.reduce((s,h)=>s+h,0));
  for(const o of l.outcomes)assert.ok(outcomes.has(o));
  for(const c of l.criteria)assert.ok(criteria.has(c));
  for(const key of ['purpose','python','practice','visuals','handover'])assert.ok(l[key]);
 }
 for(const u of block1.units){
  const lessons=block1Lessons.lessons.filter(l=>l.unit===u.id);
  assert.ok(lessons.length);
  for(let i=0;i<5;i++)assert.equal(lessons.reduce((s,l)=>s+l.allocation[i],0),u.hours[i],`${u.id} category ${i}`);
  assert.equal(lessons.reduce((s,l)=>s+l.hours,0),m100.units.find(x=>x.id===u.id).hours);
 }
 assert.equal(block1Lessons.lessons.reduce((s,l)=>s+l.hours,0),80);
 assert.equal(block1Lessons.lessons.reduce((s,l)=>s+l.allocation[2],0),14);
});
