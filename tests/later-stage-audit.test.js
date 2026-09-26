import test from 'node:test';
import assert from 'node:assert/strict';
import {laterAudit} from '../curriculum/later-stage-audit.js';
test('later-stage capacity includes assessment and preserves each route at 360 credits',()=>{
 const modules=laterAudit.modules;
 assert.equal(new Set(modules.map(m=>m.code)).size,modules.length);
 for(const m of modules){
  assert.equal([...m.study,...m.other].reduce((s,x)=>s+x.hours,0),m.credits*10,m.code);
  assert.ok([...m.study,...m.other].every(x=>Number.isFinite(x.hours)&&x.hours>0));
  assert.ok(m.entry&&m.handover&&m.evidence);
 }
 assert.equal(modules.filter(m=>m.stage===2).reduce((s,m)=>s+m.credits,0),120);
 for(const option of laterAudit.options){
  assert.ok(option[1]&&option[2]);
  assert.equal(120+120+modules.filter(m=>m.stage===3).reduce((s,m)=>s+m.credits,0)+30,360);
 }
 assert.equal(new Set(laterAudit.options.map(o=>o[0])).size,6);
});
