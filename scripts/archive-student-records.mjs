// Tutor-managed archival. Never place the input manifest or originals in public Git.
// FIREBASE_AUTH_MODULE=... node scripts/archive-student-records.mjs /private/manifest.json [--write]
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import {canonical} from '../src/evidence-data.js';
import {recordCategories} from '../src/student-records.js';
const input=process.argv[2];if(!input)throw Error('Provide a private archival manifest.');
const publicRoot=fs.realpathSync(new URL('..',import.meta.url));
function privatePath(p){const real=fs.realpathSync(p);if(real===publicRoot||real.startsWith(publicRoot+path.sep))throw Error('Private inputs must be outside the public repository.');return real;}
const manifestPath=privatePath(input),manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
if(!Array.isArray(manifest.files)||!Array.isArray(manifest.records))throw Error('Expected files and records arrays.');
const hash=b=>createHash('sha256').update(b).digest('hex'),assets=[],refs=new Map();
for(const f of manifest.files){
 if(!recordCategories.includes(f.category)||typeof f.module!=='string'||typeof f.activity!=='string'||!f.ref||refs.has(f.ref))throw Error('Invalid file classification or duplicate reference.');
 const file=privatePath(path.resolve(path.dirname(manifestPath),f.path));
 if(!/\.(pdf|ipynb|py|txt|md|csv|json|png|jpe?g|webp|svg|fits|fit|fts|zip|xlsx|docx)$/i.test(file))throw Error('Unsupported academic file type; review before expanding the allowed types.');
 const size=fs.statSync(file).size;if(size>150000000)throw Error('Original exceeds 150 MB; split the academic deliverable explicitly before archival.');
 const bytes=fs.readFileSync(file),metadata={category:f.category,module:f.module,activity:f.activity,name:path.basename(file),size,sha256:'0x'+hash(bytes),parts:Math.max(1,Math.ceil(size/150000)),source:f.source||'Tutor-archived original',occurredAt:f.occurredAt||''};
 const id=hash(canonical(metadata));assets.push({id,metadata,bytes});refs.set(f.ref,id);
}
const records=manifest.records.map(r=>{
 if(!recordCategories.includes(r.category)||typeof r.module!=='string'||!r.fields||Array.isArray(r.fields))throw Error('Invalid academic register record.');
 const record={category:r.category,module:r.module,fields:{...r.fields}};
 if(r.fileRefs)record.fields.fileIds=r.fileRefs.map(ref=>{if(!refs.has(ref))throw Error('Unknown file reference.');return refs.get(ref);});
 const payload=canonical(record);if(Buffer.byteLength(payload)>500000)throw Error('Register record too large.');return {id:hash(payload),payload};
});
if(!process.argv.includes('--write')){console.log(`Validated ${assets.length} originals and ${records.length} academic records. No upload.`);process.exit(0);}
if(!process.env.FIREBASE_AUTH_MODULE)throw Error('Set FIREBASE_AUTH_MODULE to the official Firebase CLI auth module.');
const auth=createRequire(import.meta.url)(process.env.FIREBASE_AUTH_MODULE),account=auth.getGlobalDefaultAccount();if(!account)throw Error('Authorised Firebase CLI login required.');
const token=await auth.getAccessToken(account.tokens.refresh_token,['https://www.googleapis.com/auth/cloud-platform']);
const base='https://firestore.googleapis.com/v1/projects/librauni/databases/(default)/documents';
async function request(url,options={}){const r=await fetch(url,{...options,headers:{Authorization:`Bearer ${token.access_token}`,'Content-Type':'application/json'}});if(r.status===404&&(!options.method||options.method==='GET'))return null;if(!r.ok)throw Error(`Firebase archival request failed (${r.status}); no private data printed.`);return r.json();}
const result=await request(base+':runQuery',{method:'POST',body:JSON.stringify({structuredQuery:{from:[{collectionId:'profile',allDescendants:true}]}})});
const profiles=result.filter(x=>x.document);if(profiles.length!==1)throw Error('Expected exactly one learner profile; resolve recipient explicitly.');
const parent=profiles[0].document.name.split('/profile/')[0];if(!/\/users\/[^/]+$/.test(parent))throw Error('Unexpected learner path.');
const encode=v=>typeof v==='number'?{integerValue:String(v)}:{stringValue:v};
async function immutable(name,data,timestamp=false){
 const fields=Object.fromEntries(Object.entries(data).map(([k,v])=>[k,encode(v)]));const old=await request('https://firestore.googleapis.com/v1/'+name);
 if(old){for(const [k,v]of Object.entries(fields))if(canonical(old.fields[k])!==canonical(v))throw Error('Existing archived record differs. Preserve it and append a correction.');return;}
 await request(base+':commit',{method:'POST',body:JSON.stringify({writes:[{update:{name,fields},currentDocument:{exists:false},...(timestamp?{updateTransforms:[{fieldPath:'recordedAt',setToServerValue:'REQUEST_TIME'}]}:{})}]})});
}
for(const a of assets){
 const name=parent+'/academicFiles/'+a.id;
 for(let i=0;i<a.metadata.parts;i++)await immutable(name+'/parts/'+i,{base64:a.bytes.subarray(i*150000,(i+1)*150000).toString('base64')});
 // Verify restored bytes before publishing the catalogue entry: incomplete uploads stay invisible.
 const chunks=[];for(let i=0;i<a.metadata.parts;i++){const d=await request('https://firestore.googleapis.com/v1/'+name+'/parts/'+i);if(!d)throw Error('Missing archived part.');chunks.push(Buffer.from(d.fields.base64.stringValue,'base64'));}
 const restored=Buffer.concat(chunks);if(restored.length!==a.metadata.size||'0x'+hash(restored)!==a.metadata.sha256)throw Error('Original restore verification failed.');
 await immutable(name,a.metadata,true);
}
for(const r of records)await immutable(parent+'/academicRecords/'+r.id,{payload:r.payload},true);
// Read back every published record, not merely the acknowledgement.
for(const r of records){const d=await request('https://firestore.googleapis.com/v1/'+parent+'/academicRecords/'+r.id);if(d?.fields.payload.stringValue!==r.payload)throw Error('Register restore failed.');}
console.log(`Archived and restored ${assets.length} originals and ${records.length} register records. Identical existing records preserved.`);
