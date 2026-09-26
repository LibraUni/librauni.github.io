import {PrivateData} from './eas-private.js';
import {sha256} from 'ethers';
import {canonical,hex32,MAX_BYTES,verifyLink} from './evidence-data.js';
import {zipSync,unzipSync,strToU8,strFromU8} from 'fflate';
export const STUDENT_FORMAT='librauni-student-records-v2';
export const ARCHIVE_LIMIT=250_000_000;
export function inventorySignature(records,catalogue){return canonical(JSON.parse(JSON.stringify({records,catalogue})));}
export const recordCategories=['submissions','assessments','feedback','skills','milestones','certificates','activities','journal','tutorials'];
export function safeName(s){return String(s).normalize('NFKC').replace(/[^a-zA-Z0-9._-]/g,'_').replace(/^\.+/,'_').slice(0,100)||'item';}
export function recordCategory(c){return ({conversation:'tutorials',assessment:'assessments',feedback:'feedback',skills:'skills',milestone:'milestones',activity:'activities'})[c]||'journal';}
export function academicFields(entries,register){
 const items=[];
 for(const e of entries){
  for(const key of ['category','title','body','area','evidence','nextSteps','source','occurredAt','recordedAt','corrects'])if(e[key]!==null&&e[key]!==undefined&&e[key]!=='')items.push({kind:'field',category:recordCategory(e.category),module:(e.area||'').match(/LU-[A-Z]\d{3}/)?.[0]||'general',recordId:e.id,field:key,value:e[key]});
 }
 for(const e of entries)if(e.raw&&!e.id.startsWith('journal/')){
  const walk=(v,key)=>{if(v&&typeof v==='object'&&!Array.isArray(v)){for(const [k,x]of Object.entries(v))walk(x,key?key+'.'+k:k);}else if(v!==undefined)items.push({kind:'field',category:recordCategory(e.category),module:(e.area||'').match(/LU-[A-Z]\d{3}/)?.[0]||'general',recordId:e.id,field:'saved.'+key,value:v});};
  walk(e.raw,'');
 }
 for(const r of register){
  if(!recordCategories.includes(r.category)||typeof r.id!=='string'||!r.fields||typeof r.fields!=='object')throw Error('Invalid academic register entry.');
  for(const [key,value]of Object.entries(r.fields))items.push({kind:'field',category:r.category,module:r.module||'general',recordId:'register/'+r.id,field:key,value});
 }
 return items;
}
export function buildStudentSnapshot(entries,register,assets,previousRoot=null,teachingRelease=null,createdAt=new Date().toISOString()){
 const fields=academicFields(entries,register);
 const context={kind:'context',format:STUDENT_FORMAT,createdAt,previousRoot,teachingRelease,scope:'All saved academic journal entries, all published tutor register records (including superseded history), and all published archived originals at generation time. Website administration and unsaved/unavailable external conversations are excluded.',fields:fields.length,files:assets.length};
 const values=[{type:'string',name:'context',value:canonical(context)},...fields.map(f=>({type:'string',name:'field:'+f.recordId+':'+f.field,value:canonical(f)})),...assets.map(a=>({type:'string',name:'file:'+a.id,value:canonical({kind:'file',id:a.id,category:a.category,module:a.module||'general',recordId:a.activity||a.id,name:a.name,size:a.size,sha256:a.sha256,parts:a.parts,source:a.source||'Tutor-archived original',occurredAt:a.occurredAt||null,recordedAt:a.recordedAt||null})}))];
 const p={format:STUDENT_FORMAT,kind:'snapshot',tree:new PrivateData(values).getFullTree(),files:[]};validateStudentSnapshot(p);return p;
}
export function validateStudentSnapshot(p){
 if(p?.format!==STUDENT_FORMAT||p.kind!=='snapshot'||!hex32(p.tree?.root)||!Array.isArray(p.tree.values)||!p.tree.values.length||new TextEncoder().encode(JSON.stringify(p)).length>MAX_BYTES)throw Error('Invalid or oversized student record index.');
 const values=p.tree.values;if(values.some(v=>v.type!=='string'||!hex32(v.salt))||new Set(values.map(v=>v.name)).size!==values.length||PrivateData.verifyFullTree(p.tree)!==p.tree.root)throw Error('Student record commitment mismatch.');
 const m=JSON.parse(values[0].value);if(values[0].name!=='context'||m.format!==STUDENT_FORMAT||m.kind!=='context'||(m.previousRoot!==null&&!hex32(m.previousRoot))||m.fields!==values.filter(v=>v.name.startsWith('field:')).length||m.files!==values.filter(v=>v.name.startsWith('file:')).length)throw Error('Student record inventory mismatch.');
 values.slice(1).forEach(v=>validateLeaf(JSON.parse(v.value)));
 return {...m,recordCount:m.fields,fileCount:m.files};
}
function validateLeaf(v){
 if(!recordCategories.includes(v.category)||typeof v.module!=='string'||typeof v.recordId!=='string')throw Error('Invalid record category or context.');
 if(v.kind==='file'){if(!/^[a-f0-9]{64}$/.test(v.id)||!hex32(v.sha256)||typeof v.name!=='string'||!Number.isSafeInteger(v.size)||v.size<0||!Number.isInteger(v.parts)||v.parts<1)throw Error('Invalid original file record.');}
 else if(v.kind!=='field'||typeof v.field!=='string'||v.value===undefined)throw Error('Invalid record field.');
}
export function studentDisclosure(p,indexes,anchor=null,tree=null){
 if(!tree)validateStudentSnapshot(p);
 const selected=[...new Set(indexes)].sort((a,b)=>a-b);if(!selected.length||selected.some(i=>!Number.isInteger(i)||i<0||i>=p.tree.values.length))throw Error('Select records or files to share.');
 return {format:STUDENT_FORMAT,kind:'disclosure',root:p.tree.root,proof:(tree||new PrivateData(p.tree.values)).generateMultiProof(selected),anchor};
}
export function verifyStudentProof(p){
 if(p?.format!==STUDENT_FORMAT||p.kind!=='disclosure'||!hex32(p.root)||!p.proof?.leaves?.length||new TextEncoder().encode(JSON.stringify(p)).length>MAX_BYTES)throw Error('Invalid student proof.');
 if(p.proof.leaves.some(v=>v.type!=='string'||!hex32(v.salt))||!PrivateData.verifyMultiProof(p.root,p.proof))throw Error('Student records do not match the proof.');
 const values=p.proof.leaves.map(v=>JSON.parse(v.value));values.forEach(v=>{if(v.kind!=='context')validateLeaf(v);else if(v.format!==STUDENT_FORMAT)throw Error('Invalid context');});
 if(p.anchor&&!verifyLink(p.root,p.anchor.link))throw Error('Wallet signature mismatch.');return values;
}
export function itemPath(v){
 const id=sha256(strToU8(v.recordId)).slice(2,18);
 return `${v.category}/${safeName(v.module)}/${id}/${v.kind==='file'?v.id+'-'+safeName(v.name):safeName(v.field)+'-'+sha256(strToU8(v.field)).slice(2,10)+'.txt'}`;
}
export function fieldText(v){return `${v.module} · ${v.recordId}\n${v.field}\n\n${typeof v.value==='string'?v.value:JSON.stringify(v.value,null,2)}\n`;}
export function verifyOriginals(values,files){
 const originals=values.filter(v=>v.kind==='file');
 for(const v of originals){const bytes=files.get(v.id);if(!bytes||bytes.length!==v.size||sha256(bytes)!==v.sha256)throw Error('Missing or altered original: '+v.name);}
 return originals.length;
}
export function archiveEntries(p,files,indexes,anchor=null,{full=false}={}){
 validateStudentSnapshot(p);const tree=new PrivateData(p.tree.values),selected=[...new Set(indexes)],proof=studentDisclosure(p,selected,anchor,tree),values=verifyStudentProof(proof);verifyOriginals(values,files);
 const out=Object.create(null),categories=new Map();
 out['proof.json']=strToU8(JSON.stringify(proof));
 out['README.txt']=strToU8('LIBRAUNI — '+(full?'FULL SAVED ACADEMIC RECORDS':'SELECTED ACADEMIC RECORDS')+'\n\nThe full archive and private-recovery.json contain private records and proof salts. Share only the intended subset.\n\nOriginal files and readable fields are organised by category, module and record. Each item has a .proof.json companion; each category has CATEGORY-PROOF.json. To share, use the website to download any selected subset as one ZIP, or send a category folder/item with its proof. A verifier can select the ZIP or the proof JSON plus original file(s). A file without its companion proof is not independently anchored evidence.\n\nUpload verification: https://librauni.github.io/evidence/\nIndependent verifier: https://librauni.github.io/evidence/verify.cjs\nIntegrity and blockchain timing are distinct from academic correctness and accreditation.\n');
 if(full)out['private-recovery.json']=strToU8(JSON.stringify({snapshot:p,anchor}));
 selected.forEach(i=>{const v=JSON.parse(p.tree.values[i].value);if(v.kind==='context'){out['snapshot-context.json']=strToU8(JSON.stringify(v,null,2));return;}
  const path=itemPath(v);if(out[path])throw Error('Archive path collision.');out[path]=v.kind==='file'?files.get(v.id):strToU8(fieldText(v));
  out[path+'.proof.json']=strToU8(JSON.stringify(studentDisclosure(p,[i],anchor,tree)));
  if(!categories.has(v.category))categories.set(v.category,[]);categories.get(v.category).push(i);
 });
 for(const [c,ids]of categories)out[c+'/CATEGORY-PROOF.json']=strToU8(JSON.stringify(studentDisclosure(p,ids,anchor,tree)));
 const total=Object.values(out).reduce((n,b)=>n+b.length,0);if(total>ARCHIVE_LIMIT)throw Error('The full download exceeds the current 250 MB browser limit. No partial archive was labelled complete; contact your tutor for a split archive.');
 return out;
}
export function makeArchive(...args){return zipSync(archiveEntries(...args),{level:0});}
export function unpackArchive(bytes){
 if(bytes.length>ARCHIVE_LIMIT)throw Error('Archive too large.');let total=0;
 const data=unzipSync(bytes,{filter:f=>{total+=f.originalSize;if(total>ARCHIVE_LIMIT||f.name.startsWith('/')||f.name.split('/').includes('..')||f.name.includes('\\'))throw Error('Unsafe or oversized archive.');return true;}});
 const root=data['proof.json'];if(!root)throw Error('Choose a generated ZIP containing proof.json, or select a category/item proof JSON with its original files.');
 const p=JSON.parse(strFromU8(root)),values=verifyStudentProof(p),files=new Map();
 for(const v of values.filter(v=>v.kind==='file'))files.set(v.id,data[itemPath(v)]);
 verifyOriginals(values,files);for(const v of values.filter(v=>v.kind==='field'))if(!data[itemPath(v)]||strFromU8(data[itemPath(v)])!==fieldText(v))throw Error('Readable field differs from its proof: '+v.field);return {proof:p,values,files};
}
