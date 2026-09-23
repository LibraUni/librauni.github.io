import {readFileSync} from 'node:fs';
import {after,before,test} from 'node:test';
import {initializeTestEnvironment,assertSucceeds,assertFails} from '@firebase/rules-unit-testing';
import {doc,setDoc,getDoc,deleteDoc,serverTimestamp,runTransaction,collection,getDocs} from 'firebase/firestore';
let env;
const claims={firebase:{sign_in_provider:'github.com',identities:{'github.com':['332598033']}}};
before(async()=>{env=await initializeTestEnvironment({projectId:'demo-librauni',firestore:{rules:readFileSync('firestore.rules','utf8'),host:'127.0.0.1',port:8080}});});
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
