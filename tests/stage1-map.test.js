import test from 'node:test';
import assert from 'node:assert/strict';
import {stage1Map} from '../curriculum/stage1-map.js';
import {stage1Modules,semesters} from '../curriculum/stage1.js';

test('Stage 1 peer map preserves all modules and reconciles its proposed budgets',()=>{
 assert.deepEqual(stage1Map.modules.map(m=>m.code),stage1Modules.map(m=>m.code));
 const hours=stage1Map.workload.reduce((n,[,h])=>n+h,0);
 const outcomes=new Set();
 for(const m of stage1Map.modules){
  assert.equal(hours,stage1Modules.find(x=>x.code===m.code).credits*10);
  for(const [id,description] of m.outcomes){assert.ok(!outcomes.has(id));outcomes.add(id);assert.ok(description.length);}
 }
 for(const pair of semesters)assert.equal(pair.codes.reduce((n,code)=>n+stage1Modules.find(m=>m.code===code).credits*10,0),600);
 assert.equal(hours*stage1Map.modules.length,1200);
});

import {m101Blocks} from '../curriculum/m101-blocks.js';
test('M101 proposed blocks fit the approved study budget and outcome/prerequisite boundaries',()=>{
 const known=new Set(stage1Map.modules.find(m=>m.code==='LU-M101').outcomes.map(([id])=>id));
 const seen=new Set(),covered=new Set();
 for(const b of m101Blocks.blocks){
  assert.ok(!seen.has(b.id));
  for(const prior of b.requires)assert.ok(seen.has(prior));
  seen.add(b.id);
  assert.ok(b.pythonHours>=0 && b.pythonHours<=b.hours);
  for(const id of b.outcomes){assert.ok(known.has(id));covered.add(id);}
 }
 assert.equal(m101Blocks.blocks.reduce((n,b)=>n+b.hours,0),stage1Map.workload[0][1]);
 assert.equal(m101Blocks.blocks.reduce((n,b)=>n+b.pythonHours,0),30);
 assert.deepEqual([...covered].sort(),[...known].sort());
});

import {m101Units} from '../curriculum/m101-units.js';
test('M101 complete unit proposal reconciles each parent budget and has ordered prerequisites and evidence',()=>{
 const seen=new Set();
 for(const u of m101Units.units){
  assert.ok(!seen.has(u.id));
  for(const prior of u.requires)assert.ok(seen.has(prior),`${u.id} requires missing/later ${prior}`);
  seen.add(u.id);
  const parent=m101Blocks.blocks.find(b=>b.id===u.block);
  assert.ok(parent);
  for(const id of u.outcomes)assert.ok(parent.outcomes.includes(id));
  assert.ok(u.pythonHours>=0 && u.pythonHours<=u.hours);
  for(const key of ['purpose','scope','boundary','python','evidence','handover'])assert.ok(u[key]?.length,`${u.id} missing ${key}`);
 }
 for(const b of m101Blocks.blocks){
  const children=m101Units.units.filter(u=>u.block===b.id);
  assert.ok(children.length);
  assert.equal(children.reduce((n,u)=>n+u.hours,0),b.hours);
  assert.equal(children.reduce((n,u)=>n+u.pythonHours,0),b.pythonHours);
  assert.deepEqual([...new Set(children.flatMap(u=>u.outcomes))].sort(),[...b.outcomes].sort());
 }
 const assessed=new Set(m101Units.units.filter(u=>['B01','B02','B03'].includes(u.block)).flatMap(u=>u.outcomes));
 assert.deepEqual([...assessed].sort(),stage1Map.modules.find(m=>m.code==='LU-M101').outcomes.map(([id])=>id).sort());
});

import {p101Blocks} from '../curriculum/p101-blocks.js';
test('P101 block proposal preserves workload, ordered prerequisites and all approved outcomes',()=>{
 const expected=stage1Map.modules.find(m=>m.code==='LU-P101').outcomes.map(([id])=>id);
 const seen=new Set(),covered=new Set();
 for(const b of p101Blocks.blocks){
  assert.ok(!seen.has(b.id));
  for(const id of b.requires)assert.ok(seen.has(id));
  seen.add(b.id);
  assert.ok(b.pythonHours>=0 && b.pythonHours<=b.hours);
  for(const id of b.outcomes){assert.ok(expected.includes(id));covered.add(id);}
  for(const k of ['purpose','scope','boundary','python','practical','evidence','handover'])assert.ok(b[k]?.length);
 }
 assert.equal(p101Blocks.blocks.reduce((n,b)=>n+b.hours,0),240);
 assert.equal(p101Blocks.blocks.reduce((n,b)=>n+b.pythonHours,0),48);
 assert.deepEqual([...covered].sort(),expected.sort());
});

import {p101Units} from '../curriculum/p101-units.js';
test('P101 units reconcile blocks, outcomes and assessment envelopes',()=>{
 const seen=new Set(),knownMath=new Set(m101Units.units.map(u=>u.id));
 for(const u of p101Units.units){
  assert.ok(!seen.has(u.id));
  for(const id of u.requires)assert.ok(seen.has(id));
  for(const id of u.mathRequires)assert.ok(knownMath.has(id));
  seen.add(u.id);
  const parent=p101Blocks.blocks.find(b=>b.id===u.block);assert.ok(parent);
  for(const id of u.outcomes)assert.ok(parent.outcomes.includes(id));
  assert.ok(u.pythonHours>=0 && u.pythonHours<=u.hours);
  for(const key of ['scope','python','practical','evidence','boundary','handover'])assert.ok(u[key]?.length);
 }
 for(const b of p101Blocks.blocks){
  const us=p101Units.units.filter(u=>u.block===b.id);
  assert.equal(us.reduce((n,u)=>n+u.hours,0),b.hours);
  assert.equal(us.reduce((n,u)=>n+u.pythonHours,0),b.pythonHours);
  assert.deepEqual([...new Set(us.flatMap(u=>u.outcomes))].sort(),[...b.outcomes].sort());
 }
 const outcomes=stage1Map.modules.find(m=>m.code==='LU-P101').outcomes.map(([id])=>id);
 for(const a of p101Units.assessments){
  assert.ok(seen.has(a.after));for(const id of a.units)assert.ok(seen.has(id));
  for(const id of a.outcomes)assert.ok(outcomes.includes(id));
 }
 assert.equal(p101Units.assessments.filter(a=>a.id.startsWith('TMA')).reduce((n,a)=>n+a.hours,0),18);
 assert.equal(p101Units.ema.reduce((n,[,h])=>n+h,0),p101Units.assessments.find(a=>a.id==='EMA').hours);
 assert.deepEqual([...p101Units.assessments.find(a=>a.id==='EMA').outcomes].sort(),outcomes.sort());
});
test('M101/P101 prerequisite graph has no circular teaching dependency',()=>{
 const graph=new Map();
 for(const [prefix,us] of [['M',m101Units.units],['P',p101Units.units]])for(const u of us){
  graph.set(prefix+u.id,[...u.requires.map(id=>prefix+id),...(u.mathRequires||[]).map(id=>'M'+id)]);
 }
 for(const id of ['U02','U03','U04'])graph.get('M'+id).push('PU01');
 for(const id of ['U05','U06','U11'])graph.get('M'+id).push('PU03');
 const visiting=new Set(),done=new Set();
 function visit(id){assert.ok(graph.has(id));assert.ok(!visiting.has(id),`Dependency cycle at ${id}`);if(done.has(id))return;visiting.add(id);graph.get(id).forEach(visit);visiting.delete(id);done.add(id);}
 for(const id of graph.keys())visit(id);
 const start=(us,id)=>us.slice(0,us.findIndex(u=>u.id===id)).reduce((n,u)=>n+u.hours,0);
 for(const [source,sid,target,tid] of [[p101Units.units,'U01',m101Units.units,'U02'],[p101Units.units,'U03',m101Units.units,'U05'],[m101Units.units,'U02',p101Units.units,'U04'],[m101Units.units,'U05',p101Units.units,'U07'],[m101Units.units,'U09',p101Units.units,'U11']]){
  assert.ok(start(source,sid)+source.find(u=>u.id===sid).hours<=start(target,tid));
 }
});

import {m102Blocks} from '../curriculum/m102-blocks.js';
test('M102 blocks reserve full probability coverage within the unchanged budget',()=>{
 const expected=stage1Map.modules.find(m=>m.code==='LU-M102').outcomes.map(([id])=>id);
 const seen=new Set(),covered=new Set();
 for(const b of m102Blocks.blocks){
  assert.ok(!seen.has(b.id));for(const id of b.requires)assert.ok(seen.has(id));seen.add(b.id);
  assert.ok(b.pythonHours>=0 && b.pythonHours<=b.hours);
  for(const id of b.outcomes){assert.ok(expected.includes(id));covered.add(id);}
  for(const key of ['purpose','scope','boundary','python','evidence','handover'])assert.ok(b[key]?.length);
 }
 assert.equal(m102Blocks.blocks.reduce((n,b)=>n+b.hours,0),240);
 assert.equal(m102Blocks.blocks.reduce((n,b)=>n+b.pythonHours,0),34);
 assert.deepEqual([...covered].sort(),expected.sort());
 assert.equal(m102Blocks.blocks.find(b=>b.outcomes.includes('M102-O6')).hours,42);
 assert.ok(m102Blocks.assessments.find(row=>row[0]==='Final written examination')[2].includes('O6 explicitly required'));
});

import {m102Units} from '../curriculum/m102-units.js';
test('M102 complete units preserve parent budgets, prerequisites and assessed probability',()=>{
 const seen=new Set();
 for(const u of m102Units.units){
  assert.ok(!seen.has(u.id));for(const id of u.requires)assert.ok(seen.has(id));seen.add(u.id);
  const b=m102Blocks.blocks.find(b=>b.id===u.block);assert.ok(b);
  for(const id of u.outcomes)assert.ok(b.outcomes.includes(id));
  assert.ok(u.pythonHours>=0 && u.pythonHours<=u.hours);
  for(const k of ['scope','boundary','python','evidence','handover'])assert.ok(u[k]?.length);
 }
 for(const b of m102Blocks.blocks){
  const us=m102Units.units.filter(u=>u.block===b.id);
  assert.equal(us.reduce((n,u)=>n+u.hours,0),b.hours);
  assert.equal(us.reduce((n,u)=>n+u.pythonHours,0),b.pythonHours);
  assert.deepEqual([...new Set(us.flatMap(u=>u.outcomes))].sort(),[...b.outcomes].sort());
 }
 for(const a of m102Units.assessments)assert.ok(seen.has(a.after));
 assert.equal(m102Units.assessments.filter(a=>a.id.startsWith('TMA')).reduce((n,a)=>n+a.hours,0),18);
 assert.deepEqual([...m102Units.assessments.at(-1).outcomes].sort(),stage1Map.modules.find(m=>m.code==='LU-M102').outcomes.map(([id])=>id).sort());
});

import {a101Blocks} from '../curriculum/a101-blocks.js';
import {a101} from '../curriculum/a101.js';
test('A101 revised blocks preserve unit identities and total budget without treating inherited hours as revised',()=>{
 const seen=new Set(),ids=[],outcomes=new Set(),known=new Set(a101.outcomes.map(([id])=>id));
 for(const b of a101Blocks.blocks){
  assert.ok(!seen.has(b.id));for(const id of b.requires)assert.ok(seen.has(id));seen.add(b.id);
  ids.push(...b.units);assert.ok(b.pythonHours>=0 && b.pythonHours<=b.hours);
  for(const id of b.outcomes){assert.ok(known.has(id));outcomes.add(id);}
  for(const k of ['purpose','scope','boundary','python','practical','evidence','handover'])assert.ok(b[k]?.length);
 }
 assert.deepEqual(ids,a101.units.map(u=>u.id));
 assert.equal(a101Blocks.blocks.reduce((n,b)=>n+b.hours,0),240);
 assert.equal(a101Blocks.blocks.reduce((n,b)=>n+b.pythonHours,0),78);
 assert.deepEqual([...outcomes].sort(),[...known].sort());
});
