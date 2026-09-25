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
