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

test('profile adapter preserves text and photo, requires history and prevents stale overwrites or foreign access',async()=>{
 const {loadProfile,saveProfile}=await import('../src/profile-store.js');
 const {emptyProfile}=await import('../src/profile-data.js');
 const assert=(await import('node:assert/strict')).default;
 const uid='profile-test',db=env.authenticatedContext(uid,claims).firestore();
 const p={...emptyProfile(),name:'Test learner',academic:'Test qualification',work:'Test work',photo:'data:image/jpeg;base64,YWJj'};
 const ref=doc(db,'users',uid,'profile','main');
 await assertFails(setDoc(ref,{payload:JSON.stringify(p),revision:1,updatedAt:serverTimestamp()}));
 assert.equal((await loadProfile(uid,db)).revision,0);
 await saveProfile(uid,p,0,db);assert.deepEqual((await loadProfile(uid,db)).data,p);
 await saveProfile(uid,{...p,photo:'',name:'Updated'},1,db);
 await assert.rejects(saveProfile(uid,p,1,db),/PROFILE_CONFLICT/);
 const latest=await loadProfile(uid,db);assert.equal(latest.data.photo,'');assert.equal(latest.data.name,'Updated');
 const history=doc(db,'users',uid,'profileHistory','1');assert.deepEqual(JSON.parse((await getDoc(history)).data().payload),p);
 await assertFails(setDoc(history,{payload:'{}',revision:1,updatedAt:serverTimestamp()}));
 await assertFails(deleteDoc(ref));
 await assertFails(runTransaction(db,async tx=>{await tx.get(ref);const oversized={payload:'x'.repeat(250001),revision:3,updatedAt:serverTimestamp()};tx.set(ref,oversized);tx.set(doc(db,'users',uid,'profileHistory','3'),oversized);}));
 for(const other of [env.unauthenticatedContext().firestore(),env.authenticatedContext('not-owner',claims).firestore(),env.authenticatedContext(uid,{firebase:{sign_in_provider:'github.com',identities:{'github.com':['other']}}}).firestore()]){
  await assertFails(getDoc(doc(other,'users',uid,'profile','main')));await assertFails(getDoc(doc(other,'users',uid,'profileHistory','1')));
  await assertFails(setDoc(doc(other,'users',uid,'profile','main'),{payload:'{}',revision:3,updatedAt:serverTimestamp()}));
 }
});

test('academic journal saves append-only entries, retries idempotently and denies foreign access',async()=>{
 const {appendEntries,loadRecords}=await import('../src/journal-store.js');
 const assert=(await import('node:assert/strict')).default;
 const uid='journal-test',db=env.authenticatedContext(uid,claims).firestore();
 const entry={schemaVersion:1,category:'skills',title:'Practice',body:'Test evidence',area:'E1',evidence:'Test task',nextSteps:'Practice',source:'Learner',occurredAt:'',corrects:''};
 await appendEntries(uid,[entry],'test-batch',db);await appendEntries(uid,[entry],'test-batch',db);
 const records=await loadRecords(uid,db);assert.equal(records.journal.length,1);assert.ok(records.journal[0].data.recordedAt.toDate());
 await assert.rejects(appendEntries(uid,[{...entry,body:'Overwrite'}],'test-batch',db));
 const ref=doc(db,'users',uid,'journal','test-batch-0');await assertFails(deleteDoc(ref));await assertFails(setDoc(ref,{...entry,recordedAt:serverTimestamp()}));
 await appendEntries(uid,[{...entry,corrects:'journal/test-batch-0',body:'Correction'}],'correction',db);
 await assertFails(setDoc(doc(db,'users',uid,'journal','bad'),{...entry,category:'profile',recordedAt:serverTimestamp()}));
 await assertFails(setDoc(doc(db,'users',uid,'journal','forged-time'),{...entry,recordedAt:new Date(0)}));
 await assertFails(setDoc(doc(db,'users',uid,'journal','oversize'),{...entry,body:'x'.repeat(20001),recordedAt:serverTimestamp()}));
 for(const other of [env.unauthenticatedContext().firestore(),env.authenticatedContext('other',claims).firestore(),env.authenticatedContext(uid,{firebase:{sign_in_provider:'github.com',identities:{'github.com':['other']}}}).firestore()]){
 await assertFails(getDocs(collection(other,'users',uid,'journal')));await assertFails(setDoc(doc(other,'users',uid,'journal','foreign'),{...entry,recordedAt:serverTimestamp()}));
 }
});


test('journal pagination returns more than one page without dropping entries',async()=>{
 const {appendEntries,loadRecords}=await import('../src/journal-store.js');
 const assert=(await import('node:assert/strict')).default;
 const uid='journal-pagination',db=env.authenticatedContext(uid,claims).firestore();
 const entry={schemaVersion:1,category:'reflection',title:'Test record',body:'Synthetic pagination fixture',area:'',evidence:'',nextSteps:'',source:'Test',occurredAt:'',corrects:''};
 await appendEntries(uid,Array.from({length:110},()=>entry),'page-a',db);
 await appendEntries(uid,Array.from({length:95},()=>entry),'page-b',db);
 const rows=(await loadRecords(uid,db)).journal;assert.equal(rows.length,205);assert.equal(new Set(rows.map(r=>r.id)).size,205);
});

test('evidence snapshots restore exactly, reject stale chains and remain owner-only and append-only',async()=>{
 const assert=(await import('node:assert/strict')).default;
 const {buildSnapshot}=await import('../src/evidence-data.js');
 const {saveSnapshot,loadSnapshot,listSnapshots,saveAnchor}=await import('../src/evidence-store.js');
 const uid='evidence-owner',db=env.authenticatedContext(uid,claims).firestore();
 const p=buildSnapshot([{id:'test',title:'Synthetic',body:'x'.repeat(140000)}]);
 assert.deepEqual(await saveSnapshot(uid,p,db),p);assert.deepEqual(await saveSnapshot(uid,p,db),p);
 assert.deepEqual(await loadSnapshot(uid,p.tree.root.slice(2),db),p);assert.equal((await listSnapshots(uid,db)).length,1);
 await assert.rejects(saveSnapshot(uid,buildSnapshot([]),db),/newer snapshot/);
 const next=buildSnapshot([],[],p.tree.root);await saveSnapshot(uid,next,db);
 const ref=doc(db,'users',uid,'evidence',p.tree.root.slice(2));await assertFails(deleteDoc(ref));await assertFails(setDoc(ref,{root:p.tree.root}));
 const part=doc(db,'users',uid,'evidence',p.tree.root.slice(2),'parts','0');await assertFails(setDoc(part,{payload:'rewrite'}));
 for(const other of [env.unauthenticatedContext().firestore(),env.authenticatedContext('intruder').firestore()]){await assertFails(getDoc(doc(other,'users',uid,'evidence',p.tree.root.slice(2))));await assertFails(getDoc(doc(other,'users',uid,'evidence',p.tree.root.slice(2),'parts','0')));}
 await assertFails(setDoc(doc(db,'users',uid,'evidenceState','main'),{root:p.tree.root,sequence:3,updatedAt:serverTimestamp()}));
});
