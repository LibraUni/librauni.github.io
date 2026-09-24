import test from 'node:test';
import assert from 'node:assert/strict';
import { m100 } from '../curriculum/m100.js';
import { coverage, gaps, sources } from '../curriculum/coverage.js';

test('module workload includes all units and non-unit work within its credit allocation',()=>{
  for(const row of [...m100.units,...m100.additionalWork]) assert.ok(Number.isFinite(row.hours)&&row.hours>0);
  assert.equal(m100.units.reduce((n,u)=>n+u.hours,0)+m100.additionalWork.reduce((n,w)=>n+w.hours,0),m100.credits*10);
});
test('unit prerequisites are valid and acyclic in the proposed study order',()=>{
  const seen=new Set();
  for(const u of m100.units){assert.ok(!seen.has(u.id));for(const id of u.requires)assert.ok(seen.has(id),`${u.id} requires unavailable ${id}`);seen.add(u.id);}
});
test('every declared outcome has both a unit home and an independent assessment home',()=>{
  const outcomes=new Set(m100.outcomes.map(([id])=>id));
  const units=new Set(m100.units.map(u=>u.id));
  for(const item of [...m100.units,...m100.assessment])for(const id of item.outcomes)assert.ok(outcomes.has(id),`Unknown outcome ${id}`);
  for(const a of m100.assessment)for(const id of a.units)assert.ok(units.has(id));
  for(const id of outcomes){assert.ok(m100.units.some(u=>u.outcomes.includes(id)));assert.ok(m100.assessment.some(a=>a.outcomes.includes(id)));}
});
test('coverage decisions and reference anchors cannot become orphaned',()=>{
  const ids=new Set(coverage.map(row=>row[0]));assert.equal(ids.size,coverage.length);
  for(const gap of gaps)for(const id of gap.rows)assert.ok(ids.has(id));
  const refs=new Set(sources.map(s=>s.id));
  for(const row of coverage)for(const id of row[2].match(/MIT-C1|MIT-C2|MIT-D|MIT-S|IC-D|IC-P|OU-F/g)||[])assert.ok(refs.has(id));
});

import {stage1Modules, semesters, bridge} from '../curriculum/stage1.js';
import {computing} from '../curriculum/m100-computing.js';
test('Stage 1 is exactly two 60-credit semesters with no bridge credit',()=>{
 assert.deepEqual(semesters.map(s=>s.codes),[['LU-M101','LU-P101'],['LU-M102','LU-A101']]);
 const ids=semesters.flatMap(s=>s.codes);assert.equal(new Set(ids).size,4);
 assert.equal(stage1Modules.reduce((s,m)=>s+m.credits,0),120);
 for(const semester of semesters)assert.equal(semester.codes.reduce((sum,id)=>sum+stage1Modules.find(m=>m.code===id).credits,0),60);
 assert.ok(bridge.outsideDegree);assert.equal(bridge.code,'LU-M100');assert.ok(!ids.includes(bridge.code));
});
test('integrated computing fits within every unit without adding to credit workload',()=>{
 const units=new Map(m100.units.map(u=>[u.id,u]));
 assert.equal(new Set(computing.map(row=>row[0])).size,m100.units.length);
 for(const [id,hours] of computing){assert.ok(units.has(id));assert.ok(hours>0&&hours<units.get(id).hours);}
 assert.equal(computing.reduce((sum,row)=>sum+row[1],0),48);
 assert.ok(m100.assessment.find(a=>a.name==='TMA 02').outcomes.includes('O6'));
});

test('blocks partition units in teaching order without duplicate workload or orphaned outcomes',()=>{
 assert.deepEqual(m100.blocks.flatMap(b=>b.units),m100.units.map(u=>u.id));
 assert.equal(new Set(m100.blocks.map(b=>b.id)).size,m100.blocks.length);
 const outcomes=new Set(m100.outcomes.map(o=>o[0]));
 for(const [, , ids] of m100.exitStandard)for(const id of ids)assert.ok(outcomes.has(id));
 for(const id of outcomes)assert.ok(m100.exitStandard.some(row=>row[2].includes(id)));
});

import {block1} from '../curriculum/m100-block1.js';
test('Block 1 review budgets reconcile with unit and computing allocations without changing credits',()=>{
 assert.deepEqual(block1.units.map(u=>u.id),m100.blocks[0].units);
 for(const u of block1.units){assert.equal(u.hours.length,block1.workloadLabels.length);assert.equal(u.hours.reduce((a,b)=>a+b,0),m100.units.find(x=>x.id===u.id).hours);assert.equal(u.hours[2],computing.find(x=>x[0]===u.id)[1]);}
 assert.equal(block1.units.reduce((sum,u)=>sum+u.hours.reduce((a,b)=>a+b,0),0),80);
 assert.ok(m100.assessment.find(a=>a.name==='TMA 01').outcomes.includes('O6'));
});
