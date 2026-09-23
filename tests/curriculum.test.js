import test from 'node:test';
import assert from 'node:assert/strict';
import { m101 } from '../curriculum/m101.js';
import { coverage, gaps, sources } from '../curriculum/coverage.js';

test('module workload includes all units and non-unit work within its credit allocation',()=>{
  for(const row of [...m101.units,...m101.additionalWork]) assert.ok(Number.isFinite(row.hours)&&row.hours>0);
  assert.equal(m101.units.reduce((n,u)=>n+u.hours,0)+m101.additionalWork.reduce((n,w)=>n+w.hours,0),m101.credits*10);
});
test('unit prerequisites are valid and acyclic in the proposed study order',()=>{
  const seen=new Set();
  for(const u of m101.units){assert.ok(!seen.has(u.id));for(const id of u.requires)assert.ok(seen.has(id),`${u.id} requires unavailable ${id}`);seen.add(u.id);}
});
test('every declared outcome has both a unit home and an independent assessment home',()=>{
  const outcomes=new Set(m101.outcomes.map(([id])=>id));
  const units=new Set(m101.units.map(u=>u.id));
  for(const item of [...m101.units,...m101.assessment])for(const id of item.outcomes)assert.ok(outcomes.has(id),`Unknown outcome ${id}`);
  for(const a of m101.assessment)for(const id of a.units)assert.ok(units.has(id));
  for(const id of outcomes){assert.ok(m101.units.some(u=>u.outcomes.includes(id)));assert.ok(m101.assessment.some(a=>a.outcomes.includes(id)));}
});
test('coverage decisions and reference anchors cannot become orphaned',()=>{
  const ids=new Set(coverage.map(row=>row[0]));assert.equal(ids.size,coverage.length);
  for(const gap of gaps)for(const id of gap.rows)assert.ok(ids.has(id));
  const refs=new Set(sources.map(s=>s.id));
  for(const row of coverage)for(const id of row[2].match(/MIT-C1|MIT-C2|MIT-D|MIT-S|IC-D|IC-P|OU-F/g)||[])assert.ok(refs.has(id));
});
