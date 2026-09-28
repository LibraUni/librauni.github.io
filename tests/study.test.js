import {test} from 'node:test';
import assert from 'node:assert/strict';
import {modules} from '../curriculum/schedules.js';
import {newPlan,validatePlan} from '../src/schedule.js';
import {studied,setStudied,ready} from '../src/study-tree.js';
import {studyOverview} from '../src/study-dashboard.js';
import {timeline} from '../src/journal-data.js';
const m={...modules[0],enrollable:true,archived:false},plan=()=>({...newPlan(m,'2026-10-01'),status:'enrolled'});
test('all sections complete a lesson; unmarked peers prevent unit/block completion; clearing reverses rollup',()=>{
 let p=setStudied(plan(),'U01-L01',true);assert.equal(p.studied.length,6);assert.ok(studied('U01-L01',p));assert.equal(studied('U01',p),false);assert.equal(ready('B01'),true);assert.equal(ready('B02'),true);assert.deepEqual(p.completed,[]);validatePlan(m,p);
 p=setStudied(p,'U01-L01-S03',false);assert.equal(studied('U01-L01',p),false);assert.equal(p.studied.length,5);
 assert.ok(studied('U01',setStudied(p,'U01',true)));assert.throws(()=>setStudied(p,'unknown',true));assert.throws(()=>setStudied(newPlan(m,'2026-10-01'),'U01-L01',true));assert.throws(()=>validatePlan(m,{...p,studied:['made-up']}));
});
test('overview uses enrolled modules and personal dates with accurate ahead/late boundaries',()=>{
 const p=plan();assert.equal(studyOverview([m],{[m.code]:p},'2026-09-30').next[0].state,'upcoming');assert.equal(studyOverview([m],{[m.code]:p},'2026-10-14').next[0].state,'on-track');assert.equal(studyOverview([m],{[m.code]:p},'2026-10-15').next[0].state,'behind');
 p.completed=['U01'];assert.equal(studyOverview([m],{[m.code]:p},'2026-10-10').next[0].state,'ahead');p.overrides.U02={start:'2026-10-05',end:'2026-10-08'};assert.equal(studyOverview([m],{[m.code]:p},'2026-10-10').next[0].state,'behind');
 assert.equal(studyOverview([m],{[m.code]:{...p,status:'planned'}},'2026-10-10').next.length,0);
});
test('assessment window includes today and day30, excludes past/day31 and merges modules',()=>{
 const a={...m,events:[0,30,31,-1].map((n,i)=>({id:'x'+i,title:'TMA',type:'TMA',startWeek:1,endWeek:1,available:false}))};const p=plan();p.overrides=Object.fromEntries([0,30,31,-1].map((n,i)=>['x'+i,{start:'2026-10-01',end:['2026-10-01','2026-10-31','2026-11-01','2026-09-30'][i]}]));
 assert.deepEqual(studyOverview([a],{[a.code]:p},'2026-10-01').assessments.map(r=>r.id),['x0','x1']);
});
test('completion history groups an explicit action with titles and captures reversal, not enrolment admin',()=>{
 const p=plan(),q=setStudied(p,'U01-L01',true),r=setStudied(q,'U01-L01-S01',false);
 const entries=timeline({plannerHistory:[p,q,r].map((p,i)=>({id:String(i+1),data:{revision:i+1,payload:JSON.stringify({plans:{[m.code]:p}}),updatedAt:'2026-10-01T10:00:00Z'}}))});
 assert.equal(entries.length,2);assert.ok(entries.some(e=>e.body.includes('Before we begin')));assert.ok(entries.some(e=>e.body.includes('Completion marks removed')));
});

test('fully published hierarchy rolls up to units and block, and undo keeps an unrelated unit intact',()=>{
 const nodes=[{id:'B',kind:'block',available:true,parent:null},...['U1','U2'].flatMap(id=>[{id,kind:'unit',available:true,parent:'B'},{id:id+'L',kind:'lesson',available:true,parent:id},{id:id+'S',kind:'section',available:true,parent:id+'L'}])];
 let p=setStudied(plan(),'B',true,nodes);assert.ok(studied('B',p,nodes));assert.deepEqual(p.completed,['U1','U2']);
 p=setStudied(p,'U1S',false,nodes);assert.equal(studied('B',p,nodes),false);assert.equal(studied('U1',p,nodes),false);assert.ok(studied('U2',p,nodes));assert.deepEqual(p.completed,['U2']);
});
