import {collection,query,orderBy,documentId,limit,startAfter,getDocsFromServer,doc,runTransaction,serverTimestamp} from 'firebase/firestore';
import {db} from './planner-store.js';
import {collections,validateEntry} from './journal-data.js';
export async function loadRecords(uid,connection=db){
 const out={};for(const name of collections){out[name]=[];let last;
 do{const q=query(collection(connection,'users',uid,name),orderBy(documentId()),...(last?[startAfter(last)]:[]),limit(200));const page=await getDocsFromServer(q);out[name].push(...page.docs.map(d=>({id:d.id,data:d.data()})));last=page.size===200?page.docs.at(-1):null;}while(last);
 }return out;
}
export async function appendEntries(uid,items,batchId,connection=db){
 if(!/^[a-zA-Z0-9-]{1,100}$/.test(batchId)||!items.length||items.length>150)throw Error('Invalid journal batch.');
 const rows=items.map(validateEntry);
 // Stable IDs make retries idempotent; transactions never overwrite an existing entry.
 await runTransaction(connection,async tx=>{
 const refs=rows.map((_,i)=>doc(connection,'users',uid,'journal',`${batchId}-${i}`));
 const old=await Promise.all(refs.map(r=>tx.get(r)));
 for(let i=0;i<rows.length;i++){if(old[i].exists()){const previous=old[i].data();if(JSON.stringify(validateEntry(previous))!==JSON.stringify(rows[i]))throw Error('Journal ID already contains different evidence.');}else tx.set(refs[i],{...rows[i],recordedAt:serverTimestamp()});}
 });
}
