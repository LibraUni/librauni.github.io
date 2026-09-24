import {test} from 'node:test';
import assert from 'node:assert/strict';
import {modules} from '../curriculum/schedules.js';
import {addDays,dateValue,newPlan,schedule,validatePlan,shiftRemaining,warnings,combined,eventState,validateStore} from '../src/schedule.js';
const m=modules[0];
test('every registered timetable covers its full credit budget with stable IDs and valid references',()=>{
 for(const mod of modules){
 assert.equal(new Set(mod.events.map(e=>e.id)).size,mod.events.length);
 assert.equal(mod.events.filter(e=>!e.includedInUnitHours).reduce((s,e)=>s+e.hours,0),mod.credits*10);
 for(const e of mod.events){assert.ok(e.startWeek>=1&&e.endWeek>=e.startWeek&&e.endWeek<=mod.weeks);for(const id of e.requires)assert.ok(mod.events.some(x=>x.id===id));}
 assert.equal(warnings(mod,newPlan(mod,'2026-10-03')).length,0);
 assert.equal(Math.max(...mod.events.map(e=>e.endWeek)),mod.weeks);
 }
});
test('date arithmetic is exact across leap days, year boundaries and daylight saving',()=>{
 assert.equal(addDays('2028-02-28',1),'2028-02-29');assert.equal(addDays('2026-12-31',1),'2027-01-01');assert.equal(addDays('2026-03-28',2),'2026-03-30');
 assert.throws(()=>dateValue('2026-02-30'));assert.throws(()=>dateValue('2026-2-01'));
 const rows=schedule(m,newPlan(m,'2026-10-03'));assert.equal(rows.find(r=>r.id==='TMA01').end,'2026-12-04');
});
test('personal adjustments preserve baselines and warn about missing preparation',()=>{
 const p=newPlan(m,'2026-10-03');p.overrides.TMA01={start:'2026-10-03',end:'2026-10-04'};
 const row=schedule(m,p).find(r=>r.id==='TMA01');assert.equal(row.baselineEnd,'2026-12-04');assert.equal(row.end,'2026-10-04');assert.ok(warnings(m,p).length>0);
 const moved=shiftRemaining(m,newPlan(m,'2026-10-03'),'2026-10-03',7);assert.equal(schedule(m,moved).find(r=>r.id==='TMA01').end,'2026-12-11');
 assert.equal(schedule(m,shiftRemaining(m,moved,'2026-10-03',-7)).find(r=>r.id==='TMA01').end,'2026-12-04');
});
test('future shift handles a crossing unit, leaves earlier work untouched and does not mutate input',()=>{
 const p=newPlan(m,'2026-10-03'),q=shiftRemaining(m,p,'2026-10-10',7);
 assert.deepEqual(p.overrides,{});assert.equal(q.overrides.U01.start,'2026-10-03');assert.equal(q.overrides.U01.end,'2026-10-23');assert.equal(q.overrides.orientation,undefined);
 assert.throws(()=>shiftRemaining(m,p,'2026-10-03',-7));
});
test('degree calendar merges two modules with independent dates and excludes drafts by default',()=>{
 const a={...m,enrollable:true},b={...a,code:'TEST-M202',path:'/test/'};
 const pa={...newPlan(a,'2026-10-03'),status:'enrolled'},pb=newPlan(b,'2027-01-02');
 assert.equal(combined([a,b],{[a.code]:pa,[b.code]:pb}).length,a.events.length);
 const all=combined([a,b],{[a.code]:pa,[b.code]:pb},true);assert.equal(all.length,a.events.length*2);assert.ok(all.some(r=>r.module==='TEST-M202'&&r.path==='/test/'));assert.ok(all.every((r,i)=>!i||all[i-1].end<=r.end));
});
test('completion, publication and enrolment remain separate from dates and mastery',()=>{
 const p=newPlan(m,'2026-10-03');assert.throws(()=>validatePlan(m,{...p,status:'enrolled'}));assert.throws(()=>validatePlan(m,{...p,completed:['U01']}));
 assert.equal(eventState({start:'2026-01-01',end:'2026-01-10',type:'unit'},'2026-02-01'),'Study window passed');
 assert.equal(eventState({completed:true}),'Studied · self-reported');
 const published={...m,enrollable:true,events:m.events.map(r=>({...r,available:true}))};const complete={...p,status:'enrolled',completed:['U01']};validatePlan(published,complete);
 assert.equal(shiftRemaining(published,complete,'2026-10-03',7).overrides.U01,undefined);
});
test('invalid or changed private records fail safely instead of being overwritten',()=>{
 assert.throws(()=>validateStore({schemaVersion:3,plans:{}},modules));assert.throws(()=>validateStore({schemaVersion:2,plans:{unknown:newPlan(m,'2026-10-03')},retiredPlans:[]},modules));
 assert.throws(()=>validatePlan(m,{...newPlan(m,'2026-10-03'),scheduleVersion:0}));
 const p=newPlan(m,'2026-10-03');p.overrides.U01={start:'2026-11-01',end:'2026-10-03'};assert.throws(()=>validatePlan(m,p));
});

test('M100 has one EMA, no separate exam, and retains the original final weekly budgets',()=>{
 assert.equal(m.events.filter(e=>e.type==='EMA').length,1);
 assert.equal(m.events.filter(e=>e.type==='exam').length,0);
 const ema=m.events.find(e=>e.type==='EMA');assert.equal(ema.hours,18);assert.deepEqual(ema.weeklyHours,{29:10,30:8});
 for(const [week,total] of [[29,14],[30,8]]){
 assert.equal(m.events.filter(e=>e.startWeek<=week&&e.endWeek>=week&&!e.includedInUnitHours).reduce((sum,e)=>sum+(e.weeklyHours?.[week]??e.hours/(e.endWeek-e.startWeek+1)),0),total);
 }
});
test('EMA migration is a non-mutating preview preserving personal dates and unrelated overrides',async()=>{
 const {previewScheduleUpdate}=await import('../src/schedule.js');
 const p={...newPlan(m,'2026-10-03'),scheduleVersion:1};
 p.overrides={TMA01:{start:'2026-11-28',end:'2026-12-05'},EMA01:{start:'2027-04-20',end:'2027-04-28'},EXAM:{start:'2027-05-02',end:'2027-05-08'}};
 const old={schemaVersion:1,plans:{'LU-M101':p}},next=previewScheduleUpdate(old,modules);
 assert.equal(p.scheduleVersion,1);assert.ok(p.overrides.EXAM);
 assert.deepEqual(next.plans['LU-M100'].overrides['EMA-FINAL'],{start:'2027-04-20',end:'2027-05-08'});
 assert.deepEqual(next.plans['LU-M100'].overrides.TMA01,p.overrides.TMA01);
 assert.equal(previewScheduleUpdate(next,modules),null);
});
