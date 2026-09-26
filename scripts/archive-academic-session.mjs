// Before archival, apply docs/academic-record-quality.md to the private input; schema validation does not assess educational value.
// Connected-tutor archival tool. Input files must remain OUTSIDE the public repository.
// Usage: FIREBASE_AUTH_MODULE=/absolute/path/firebase-tools/lib/auth.js node scripts/archive-academic-session.mjs /private/path/session.json [--write]
// Input: array of journal entries following src/journal-data.js; use transcriptParts for long verbatim text.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import {validateEntry} from '../src/journal-data.js';
const input=process.argv[2];if(!input)throw Error('Provide a private JSON file of academic journal entries.');
const root=fs.realpathSync(new URL('..',import.meta.url));const file=fs.realpathSync(input);
if(file===root||file.startsWith(root+path.sep))throw Error('Private session input must be outside the public repository.');
const raw=JSON.parse(fs.readFileSync(file,'utf8'));if(!Array.isArray(raw)||!raw.length||raw.length>150)throw Error('Expected 1–150 entries.');
const rows=raw.map(validateEntry);const batch=createHash('sha256').update(JSON.stringify(rows)).digest('hex');
if(!process.argv.includes('--write')){console.log(`Validated ${rows.length} academic entries. No upload; use --write after checking scope and privacy.`);process.exit(0);}
if(!process.env.FIREBASE_AUTH_MODULE)throw Error('Set FIREBASE_AUTH_MODULE to the installed official Firebase CLI auth module.');
const auth=createRequire(import.meta.url)(process.env.FIREBASE_AUTH_MODULE),account=auth.getGlobalDefaultAccount();if(!account)throw Error('Sign in to the authorised Firebase CLI first.');
const token=await auth.getAccessToken(account.tokens.refresh_token,['https://www.googleapis.com/auth/cloud-platform']);
const base='https://firestore.googleapis.com/v1/projects/librauni/databases/(default)/documents';
async function request(url,options={}){const r=await fetch(url,{...options,headers:{Authorization:`Bearer ${token.access_token}`,'Content-Type':'application/json'}});if(!r.ok)throw Error(`Firebase request failed (${r.status}); no credentials or private content printed.`);return r.json();}
const result=await request(base+':runQuery',{method:'POST',body:JSON.stringify({structuredQuery:{from:[{collectionId:'profile',allDescendants:true}]}})});
const profiles=result.filter(x=>x.document);if(profiles.length!==1)throw Error('Expected one private learner profile; resolve recipient explicitly before archiving.');
const parent=profiles[0].document.name.split('/profile/')[0];if(!/\/users\/[^/]+$/.test(parent))throw Error('Unexpected learner path.');
const writes=[];
for(let i=0;i<rows.length;i++){
 const name=`${parent}/journal/tutor-${batch}-${i}`;const existing=await fetch('https://firestore.googleapis.com/v1/'+name,{headers:{Authorization:`Bearer ${token.access_token}`}});
 if(existing.ok){const d=await existing.json();for(const [k,v]of Object.entries(rows[i]))if((d.fields[k]?.stringValue??Number(d.fields[k]?.integerValue))!==v)throw Error('Existing archive conflicts; do not overwrite.');continue;}
 if(existing.status!==404)throw Error('Could not check existing archive.');
 const fields=Object.fromEntries(Object.entries(rows[i]).map(([k,v])=>[k,typeof v==='number'?{integerValue:String(v)}:{stringValue:v}]));
 writes.push({update:{name,fields},currentDocument:{exists:false},updateTransforms:[{fieldPath:'recordedAt',setToServerValue:'REQUEST_TIME'}]});
}
if(writes.length)await request(base+':commit',{method:'POST',body:JSON.stringify({writes})});
console.log(`Archived ${rows.length} academic entries; existing identical entries were preserved. Batch ${batch}.`);
