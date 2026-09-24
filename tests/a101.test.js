import test from 'node:test';
import assert from 'node:assert/strict';
import {a101} from '../curriculum/a101.js';
import {modules} from '../curriculum/schedules.js';
import {newPlan,previewScheduleUpdate,validateStore,combined} from '../src/schedule.js';
test('A101 retains subject evidence but no obsolete first-module timetable or bridge gates',()=>{
 assert.equal(a101.units.reduce((s,u)=>s+u.hours,0),240);
 assert.equal(a101.weeks,undefined);assert.ok(!modules.some(m=>m.code==='LU-A101'));
 const seen=new Set();for(const u of a101.units){for(const id of u.requires)assert.ok(seen.has(id));seen.add(u.id);assert.equal(u.startWeek,undefined);assert.equal(u.external,undefined);}
 for(const a of a101.assessments){assert.equal(a.week,undefined);for(const id of a.requires)assert.ok(seen.has(id));}
 for(const [id] of a101.outcomes){assert.ok(a101.units.some(u=>u.outcomes.includes(id)));assert.ok(a101.assessments.some(a=>a.type==='TMA'&&a.outcomes.includes(id)));assert.ok(a101.assessments.some(a=>a.type==='EMA'&&a.outcomes.includes(id)));}
});
test('legacy bridge dates are renamed, never inherited by the new M101',()=>{
 const old={schemaVersion:1,plans:{'LU-M101':newPlan(modules[0],'2026-10-03')}};
 old.plans['LU-M101'].overrides.TMA01={start:'2026-12-01',end:'2026-12-05'};
 const before=structuredClone(old),next=previewScheduleUpdate(old,modules);
 assert.deepEqual(old,before);assert.deepEqual(next.plans['LU-M100'],old.plans['LU-M101']);
 assert.equal(next.plans['LU-M101'],undefined);assert.equal(next.schemaVersion,2);
 assert.equal(previewScheduleUpdate(next,modules),null);
 assert.throws(()=>validateStore({schemaVersion:2,plans:{'LU-M101':old.plans['LU-M101']},retiredPlans:[]},modules));
});
test('withdrawn A101 dates are preserved exactly as history, excluded from active calendars',()=>{
 const plan={start:'2026-10-03',status:'planned',scheduleVersion:1,overrides:{TMA01:{start:'2026-10-26',end:'2026-11-02'}},completed:[]};
 const old={schemaVersion:1,plans:{'LU-A101':plan}},next=previewScheduleUpdate(old,modules);
 assert.deepEqual(next.retiredPlans[0].plan,plan);assert.deepEqual(old.plans['LU-A101'],plan);
 assert.deepEqual(next.plans,{});assert.deepEqual(combined(modules,next.plans,true),[]);
 assert.equal(previewScheduleUpdate(next,modules),null);
 assert.throws(()=>previewScheduleUpdate({schemaVersion:1,plans:{'LU-A101':{...plan,scheduleVersion:99}}},modules));
});
