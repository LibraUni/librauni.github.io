import {doc,collection,query,orderBy,documentId,limit,startAfter,getDocsFromServer,getDocFromServer,runTransaction,serverTimestamp} from 'firebase/firestore';
import {db} from './planner-store.js';
import {validateSnapshot,splitSnapshot,canonical,digest,hex32} from './evidence-data.js';
export async function listSnapshots(uid,connection=db){const rows=[];let last;do{const page=await getDocsFromServer(query(collection(connection,'users',uid,'evidence'),orderBy(documentId()),...(last?[startAfter(last)]:[]),limit(100)));rows.push(...page.docs.map(d=>({id:d.id,...d.data()})));last=page.size===100?page.docs.at(-1):null;}while(last);return rows.sort((a,b)=>a.sequence-b.sequence);}
export async function saveSnapshot(uid,p,connection=db){
 const m=validateSnapshot(p),parts=splitSnapshot(p),root=p.tree.root,id=root.slice(2),head=doc(connection,'users',uid,'evidenceState','main'),ref=doc(connection,'users',uid,'evidence',id);
 await runTransaction(connection,async tx=>{
 const [old,h]=await Promise.all([tx.get(ref),tx.get(head)]);
 if(old.exists()){if(old.data().payloadHash!==digest(JSON.stringify(p)))throw Error('Snapshot ID conflict.');return;}
 if((h.exists()?h.data().root:null)!==m.previousRoot)throw Error('A newer snapshot exists. Refresh and prepare again.');
 const sequence=(h.exists()?h.data().sequence:0)+1;
 tx.set(ref,{root,previousRoot:m.previousRoot||'',sequence,parts:parts.length,payloadHash:digest(JSON.stringify(p)),createdAt:m.createdAt,recordedAt:serverTimestamp()});
 parts.forEach((payload,i)=>tx.set(doc(connection,'users',uid,'evidence',id,'parts',String(i)),{payload}));
 tx.set(head,{root,sequence,updatedAt:serverTimestamp()});
 });
 // An acknowledged transaction is followed by a full restore/integrity check.
 return loadSnapshot(uid,id,connection);
}
export async function loadSnapshot(uid,id,connection=db){
 if(!/^[a-f0-9]{64}$/i.test(id))throw Error('Invalid snapshot identifier.');
 const m=await getDocFromServer(doc(connection,'users',uid,'evidence',id));if(!m.exists())throw Error('Snapshot missing.');
 const meta=m.data();if(!Number.isInteger(meta.parts)||meta.parts<1||meta.parts>80)throw Error('Invalid part count.');
 const parts=await Promise.all(Array.from({length:meta.parts},(_,i)=>getDocFromServer(doc(connection,'users',uid,'evidence',id,'parts',String(i)))));
 if(parts.some(p=>!p.exists()))throw Error('Snapshot incomplete.');const text=parts.map(p=>p.data().payload).join('');
 if(digest(text)!==meta.payloadHash)throw Error('Snapshot checksum failed.');
 const p=JSON.parse(text);validateSnapshot(p);if(p.tree.root!==meta.root||p.tree.root.slice(2)!==id)throw Error('Snapshot root mismatch.');return p;
}
export async function saveAnchor(uid,root,anchor,connection=db){
 if(!hex32(root)||!hex32(anchor.transactionHash))throw Error('Invalid anchor receipt.');
 const payload=canonical(anchor);if(payload.length>10000)throw Error('Oversized receipt.');
 const ref=doc(connection,'users',uid,'evidence',root.slice(2),'anchors',anchor.transactionHash.slice(2));
 await runTransaction(connection,async tx=>{const old=await tx.get(ref);if(old.exists()){if(old.data().payload!==payload)throw Error('Receipt conflict.');return;}tx.set(ref,{payload,recordedAt:serverTimestamp()});});
}
export async function loadAnchors(uid,root,connection=db){const q=await getDocsFromServer(collection(connection,'users',uid,'evidence',root.slice(2),'anchors'));return q.docs.map(d=>JSON.parse(d.data().payload));}
