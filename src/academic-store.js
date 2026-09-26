import {collection,query,orderBy,documentId,limit,startAfter,getDocsFromServer,getDocFromServer,doc} from 'firebase/firestore';
import {db} from './planner-store.js';
import {bytesOf} from './evidence-data.js';
import {sha256} from 'ethers';
import {iso} from './journal-data.js';
export async function readAll(uid,name,connection=db){const rows=[];let last;do{const p=await getDocsFromServer(query(collection(connection,'users',uid,name),orderBy(documentId()),...(last?[startAfter(last)]:[]),limit(200)));rows.push(...p.docs.map(d=>({id:d.id,...d.data()})));last=p.size===200?p.docs.at(-1):null;}while(last);return rows;}
export async function loadAcademicCatalogue(uid,connection=db){
 const [assetRows,raw]=await Promise.all([readAll(uid,'academicFiles',connection),readAll(uid,'academicRecords',connection)]);
 const assets=assetRows.map(a=>({...a,recordedAt:iso(a.recordedAt)}));
 const register=raw.map(r=>{const p=JSON.parse(r.payload);return {id:r.id,...p,fields:{...p.fields,archiveRecordedAt:iso(r.recordedAt)}};});
 // A missing referenced file must stop full-proof generation, never silently omit evidence.
 const available=new Set(assets.map(a=>a.id));for(const r of register)for(const id of r.fields.fileIds||[])if(!available.has(id))throw Error('An academic record references a missing archived file. Ask your tutor to repair the archive.');
 return {assets,register};
}
export async function loadOriginal(uid,a,connection=db){
 if(!/^[a-f0-9]{64}$/.test(a.id)||!Number.isInteger(a.parts)||a.parts<1||a.parts>1000||a.size>150_000_000)throw Error('Invalid archived original.');
 const chunks=[];for(let i=0;i<a.parts;i++){const d=await getDocFromServer(doc(connection,'users',uid,'academicFiles',a.id,'parts',String(i)));if(!d.exists())throw Error('Original file is incomplete: '+a.name);chunks.push(bytesOf(d.data().base64));}
 const bytes=new Uint8Array(chunks.reduce((n,c)=>n+c.length,0));let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length;}
 if(bytes.length!==a.size||sha256(bytes)!==a.sha256)throw Error('Original file checksum failed: '+a.name);return bytes;
}
