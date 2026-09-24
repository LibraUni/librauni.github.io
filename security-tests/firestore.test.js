import {readFileSync} from 'node:fs';
import {after,before,test} from 'node:test';
import {initializeTestEnvironment,assertSucceeds,assertFails} from '@firebase/rules-unit-testing';
import {doc,setDoc,getDoc,deleteDoc,serverTimestamp,runTransaction,collection,getDocs} from 'firebase/firestore';
let env;
const claims={firebase:{sign_in_provider:'github.com',identities:{'github.com':['332598033']}}};
before(async()=>{env=await initializeTestEnvironment({projectId:'demo-librauni',firestore:{rules:readFileSync('firestore.rules','utf8'),host:'127.0.0.1',port:8080}});await env.clearFirestore();});
after(async()=>{await env?.cleanup();});
test('realistic note transaction writes immutable history and rejects stale revisions',async()=>{
 const db=env.authenticatedContext('owner',claims).firestore(), ref=doc(db,'users/owner/notes/main');
 await assertSucceeds(runTransaction(db,async tx=>{
  await tx.get(ref);const data={text:'First observation',revision:1,updatedAt:serverTimestamp()};tx.set(ref,data);tx.set(doc(db,'users/owner/noteHistory/1'),data);
 }));
 await assertSucceeds(getDoc(doc(db,'users/owner/noteHistory/1')));
 await assertFails(setDoc(ref,{text:'Stale overwrite',revision:1,updatedAt:serverTimestamp()}));
 await assertFails(setDoc(doc(db,'users/owner/noteHistory/1'),{text:'Rewrite history',revision:1,updatedAt:serverTimestamp()}));
 await assertFails(deleteDoc(ref));
});
test('anonymous, unrelated GitHub identities and spoofed UIDs cannot read private records',async()=>{
 for(const db of [env.unauthenticatedContext().firestore(),env.authenticatedContext('owner',{firebase:{sign_in_provider:'github.com',identities:{'github.com':['other']}}}).firestore(),env.authenticatedContext('other',claims).firestore()]){
  await assertFails(getDoc(doc(db,'users/owner/notes/main')));
 }
});
test('completion is writable but assessed mastery is not; unknown fields are rejected',async()=>{
 const db=env.authenticatedContext('owner',claims).firestore();
 await assertSucceeds(setDoc(doc(db,'users/owner/progress/lesson-1'),{completed:true,updatedAt:serverTimestamp()}));
 await assertSucceeds(getDocs(collection(db,'users/owner/progress')));
 await assertFails(setDoc(doc(db,'users/owner/progress/lesson-1'),{completed:true,mastered:true,updatedAt:serverTimestamp()}));
 await assertFails(setDoc(doc(db,'users/owner/assessments/lesson-1'),{mastered:true}));
});
test('exercise attempts are append-only and notes have bounded size',async()=>{
 const db=env.authenticatedContext('owner',claims).firestore(),ref=doc(db,'users/owner/attempts/a');
 await assertSucceeds(setDoc(ref,{lessonId:'lesson-1',exerciseId:'exercise-1',answer:'42',createdAt:serverTimestamp()}));
 await assertFails(setDoc(ref,{lessonId:'lesson-1',exerciseId:'exercise-1',answer:'43',createdAt:serverTimestamp()}));
 await assertFails(setDoc(doc(db,'users/owner/notes/main'),{text:'x'.repeat(20001),revision:2,updatedAt:serverTimestamp()}));
});

test('private planner requires bounded versioned writes with immutable history',async()=>{
 const db=env.authenticatedContext('planner-owner',claims).firestore(),ref=doc(db,'users/planner-owner/planner/main');
 const first={payload:JSON.stringify({schemaVersion:2,plans:{},retiredPlans:[]}),revision:1,updatedAt:serverTimestamp()};
 await assertFails(setDoc(ref,first));
 await assertSucceeds(runTransaction(db,async tx=>{await tx.get(ref);tx.set(ref,first);tx.set(doc(db,'users/planner-owner/plannerHistory/1'),first);}));
 await assertFails(setDoc(ref,first));
 await assertSucceeds(runTransaction(db,async tx=>{await tx.get(ref);const next={...first,revision:2};tx.set(ref,next);tx.set(doc(db,'users/planner-owner/plannerHistory/2'),next);}));
 await assertFails(setDoc(doc(db,'users/planner-owner/plannerHistory/1'),first));
 await assertFails(deleteDoc(ref));
 await assertFails(setDoc(ref,{...first,revision:3,payload:'x'.repeat(100001)}));
 for(const other of [env.unauthenticatedContext().firestore(),env.authenticatedContext('someone-else',claims).firestore(),env.authenticatedContext('planner-owner',{firebase:{sign_in_provider:'github.com',identities:{'github.com':['other']}}}).firestore()]){
  await assertFails(getDoc(doc(other,'users/planner-owner/planner/main')));
  await assertFails(setDoc(doc(other,'users/planner-owner/planner/main'),first));
  await assertFails(getDoc(doc(other,'users/planner-owner/plannerHistory/1')));
 }
});

test('planner adapter round-trips dates and refuses a second-device stale overwrite',async()=>{
 const {loadPlanner,savePlanner}=await import('../src/planner-store.js');
 const {newPlan,shiftRemaining,combined}=await import('../src/schedule.js');
 const {modules}=await import('../curriculum/schedules.js');
 const assert=(await import('node:assert/strict')).default;
 const uid='planner-roundtrip',db=env.authenticatedContext(uid,claims).firestore();
 const empty=await loadPlanner(uid,db);assert.equal(empty.revision,0);
 const data={schemaVersion:2,plans:{'LU-M100':newPlan(modules[0],'2026-10-03')},retiredPlans:[{module:'LU-A101',reason:'Withdrawn timetable',plan:{start:'2026-10-03',scheduleVersion:1,status:'planned',overrides:{},completed:[]}}]};
 await savePlanner(uid,data,0,db);
 const deviceA=await loadPlanner(uid,db),deviceB=await loadPlanner(uid,db);
 assert.deepEqual(deviceA.data,data);
 deviceA.data.plans['LU-M100']=shiftRemaining(modules[0],data.plans['LU-M100'],'2026-12-01',7);
 await savePlanner(uid,deviceA.data,deviceA.revision,db);
 await assert.rejects(savePlanner(uid,deviceB.data,deviceB.revision,db),/PLANNER_CONFLICT/);
 const reloaded=await loadPlanner(uid,db);assert.deepEqual(reloaded.data,deviceA.data);
 assert.equal(combined(modules,reloaded.data.plans,true).find(r=>r.id==='TMA01').end,'2026-12-11');
 const history=await getDoc(doc(db,'users',uid,'plannerHistory','1'));assert.deepEqual(JSON.parse(history.data().payload),data);
});
