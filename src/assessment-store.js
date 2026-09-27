import {doc,runTransaction,serverTimestamp,getDocFromServer} from 'firebase/firestore';
import {sha256} from 'ethers';
import {db} from './planner-store.js';
import {loadOriginal} from './academic-store.js';
const CHUNK=240000;
export function validateSubmissionFiles(files,assessment){
 if(!files.length||files.length>6||files.reduce((n,f)=>n+f.size,0)>6000000)throw Error('Choose up to six files totalling no more than 6 MB.');
 if(assessment==='tma01'&&(!files.some(f=>f.name.toLowerCase().endsWith('.pdf'))||!files.some(f=>f.name.toLowerCase().endsWith('.ipynb'))||files.some(f=>!(/\.(pdf|ipynb)$/i.test(f.name)))))throw Error('Choose a mathematics PDF and an .ipynb notebook.');
}
export async function submitAssessment(uid,id,assessment,files,assistance,connection=db,releaseLoader=()=>fetch('/evidence/teaching-release.json')){
 validateSubmissionFiles(files,assessment);
 const releaseResponse=await releaseLoader();if(!releaseResponse.ok)throw Error('Teaching version unavailable.');const release=await releaseResponse.json();if(!/^[a-f0-9]{40}$/.test(release.commit))throw Error('Invalid teaching version.');
 const assets=[];
 for(const f of files){const bytes=new Uint8Array(await f.arrayBuffer()),hash=sha256(bytes),chunks=[];for(let i=0;i<bytes.length;i+=CHUNK){let text='';for(const b of bytes.slice(i,i+CHUNK))text+=String.fromCharCode(b);chunks.push(btoa(text));}if(!chunks.length)chunks.push('');assets.push({bytes,chunks,meta:{id:hash.slice(2),name:f.name,size:bytes.length,sha256:hash,parts:chunks.length,category:'submissions',module:'M100',activity:assessment,source:'Formal Submit · '+assessment+' v1'}});}
 const ref=doc(connection,'users',uid,'academicRecords',id);
 await runTransaction(connection,async tx=>{
  const old=await tx.get(ref);if(old.exists())return; // idempotent retry of the same attempt
  const existing=await Promise.all(assets.map(a=>tx.get(doc(connection,'users',uid,'academicFiles',a.meta.id))));
  assets.forEach((a,i)=>{if(existing[i].exists())return;const {id:fileId,...meta}=a.meta;tx.set(doc(connection,'users',uid,'academicFiles',fileId),{...meta,recordedAt:serverTimestamp()});a.chunks.forEach((base64,j)=>tx.set(doc(connection,'users',uid,'academicFiles',fileId,'parts',String(j)),{base64}));});
  tx.set(ref,{submission:true,payload:JSON.stringify({category:'submissions',module:'M100',fields:{title:'M100 · '+assessment.toUpperCase()+' · submitted attempt',assessment,version:1,teachingCommit:release.commit,attemptId:id,status:'submitted',assistance:assistance||'None disclosed',declaration:'Learner declared own work',fileIds:assets.map(a=>a.meta.id),inventory:assets.map(a=>({id:a.meta.id,name:a.meta.name,sha256:a.meta.sha256,size:a.meta.size})),marking:'Awaiting tutor review; iCMA feedback is shown separately as a computer check.'}}),recordedAt:serverTimestamp()});
 });
 const saved=await getDocFromServer(ref);if(!saved.exists())throw Error('Receipt could not be confirmed. Retry with the same files.');
 const payload=JSON.parse(saved.data().payload);if(JSON.stringify(payload.fields.inventory)!==JSON.stringify(assets.map(a=>({id:a.meta.id,name:a.meta.name,sha256:a.meta.sha256,size:a.meta.size}))))throw Error('This attempt already contains different files. Reload before making a new attempt.');
 for(const a of assets)await loadOriginal(uid,a.meta,connection);
 return {id,...payload,submittedAt:saved.data().recordedAt.toDate().toISOString()};
}
