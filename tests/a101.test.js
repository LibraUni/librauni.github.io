import test from 'node:test';
import assert from 'node:assert/strict';
import {a101} from '../curriculum/a101.js';
import {modules} from '../curriculum/schedules.js';
import {newPlan,crossModuleWarnings,referenceWeeklyHours,combined,shiftRemaining} from '../src/schedule.js';
const maths=modules.find(m=>m.code==='LU-M101'),astro=modules.find(m=>m.code==='LU-A101');
const plans=()=>Object.fromEntries([maths,astro].map(m=>[m.code,newPlan(m,'2026-10-03')]));
test('A101 has a complete 240-hour unit map with independent evidence for each outcome',()=>{
 assert.equal(a101.units.reduce((s,u)=>s+u.hours,0),240);
 const seen=new Set(),outcomes=new Set(a101.outcomes.map(([id])=>id));
 for(const u of a101.units){for(const dep of u.requires)assert.ok(seen.has(dep));seen.add(u.id);for(const dep of u.external)assert.ok(maths.events.some(e=>e.id===dep&&e.endWeek<u.startWeek));for(const id of u.outcomes)assert.ok(outcomes.has(id));}
 for(const a of a101.assessments){for(const id of a.requires)assert.ok(seen.has(id));for(const id of a.outcomes)assert.ok(outcomes.has(id));}
 for(const id of outcomes){assert.ok(a101.units.some(u=>u.outcomes.includes(id)));assert.ok(a101.assessments.some(a=>a.type==='TMA'&&a.outcomes.includes(id)));assert.ok(a101.assessments.some(a=>a.type==='EMA'&&a.outcomes.includes(id)));}
});
test('same-start pairing is ordered, changes warn without altering private plans',()=>{
 const p=plans(),snapshot=structuredClone(p);assert.deepEqual(crossModuleWarnings(modules,p),[]);assert.deepEqual(p,snapshot);
 p['LU-M101']=shiftRemaining(maths,p['LU-M101'],'2026-10-03',14);
 assert.ok(crossModuleWarnings(modules,p,'LU-A101').some(s=>s.includes('U02')));
 assert.deepEqual(p['LU-A101'],snapshot['LU-A101']);
 assert.ok(crossModuleWarnings(modules,{'LU-A101':snapshot['LU-A101']}).some(s=>s.includes('no LU-M101')));
 assert.deepEqual(crossModuleWarnings(modules,{'LU-M101':snapshot['LU-M101']}),[]);
});
test('pairing shows all 600 hours, separate EMA deadlines and both real modules',()=>{
 const p=plans();assert.equal(combined(modules,p).length,0);
 const rows=combined(modules,p,true);assert.equal(rows.length,maths.events.length+astro.events.length);
 assert.equal(rows.filter(r=>!r.includedInUnitHours).reduce((s,r)=>s+r.hours,0),600);
 const total=Array.from({length:31},(_,i)=>referenceWeeklyHours(maths,i+1)+referenceWeeklyHours(astro,i+1)).reduce((s,h)=>s+h,0);
 assert.ok(Math.abs(total-600)<1e-8);
 assert.equal(maths.events.find(e=>e.type==='EMA').endWeek,30);assert.equal(astro.events.find(e=>e.type==='EMA').endWeek,31);
 assert.equal(astro.events.filter(e=>e.type==='TMA').length,3);assert.equal(astro.events.filter(e=>e.type==='iCMA').length,3);
 assert.equal(astro.enrollable,false);
});
