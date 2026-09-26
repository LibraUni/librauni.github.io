import {PrivateData} from './eas-private.js';
import {sha256,verifyMessage} from 'ethers';
export const FORMAT='librauni-evidence-v1';
export const MAX_BYTES=8_000_000;
export const hex32=v=>typeof v==='string'&&/^0x[0-9a-f]{64}$/i.test(v);
export function canonical(v){
 if(v===null||typeof v==='boolean'||typeof v==='string')return JSON.stringify(v);
 if(typeof v==='number'&&Number.isFinite(v))return JSON.stringify(v);
 if(Array.isArray(v))return '['+v.map(canonical).join(',')+']';
 if(v&&Object.getPrototypeOf(v)===Object.prototype)return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';
 throw Error('Unsupported evidence value.');
}
export const digest=text=>sha256(new TextEncoder().encode(text));
export const walletMessage=(root,address)=>`LibraUni personal evidence\nFormat: ${FORMAT}\nRoot: ${root}\nWallet: ${address.toLowerCase()}\nChain: Ethereum mainnet (1)\nThis signature links wallet control to this record. It is not an assessment or accredited credential.`;
export function verifyLink(root,link){return !!link&&verifyMessage(walletMessage(root,link.address),link.signature).toLowerCase()===link.address.toLowerCase();}
export function buildSnapshot(entries,files=[],previousRoot=null,createdAt=new Date().toISOString()){
 if(previousRoot!==null&&!hex32(previousRoot))throw Error('Invalid predecessor.');
 const records=entries.map(e=>Object.fromEntries(['id','category','title','body','area','evidence','nextSteps','source','occurredAt','recordedAt','corrects'].map(k=>[k,e[k]??null]))).sort((a,b)=>a.id.localeCompare(b.id));
 if(new Set(records.map(r=>r.id)).size!==records.length)throw Error('Duplicate academic record IDs.');
 const manifest={format:FORMAT,kind:'manifest',createdAt,previousRoot,scope:'All academic entries returned by the journal at snapshot time, plus the explicitly attached files. Earlier attachments remain in earlier snapshots. No claim of complete external-chat capture.',recordCount:records.length,fileCount:files.length};
 const values=[{type:'string',name:'manifest',value:canonical(manifest)},...records.map(r=>({type:'string',name:'record:'+r.id,value:canonical({kind:'academic',...r})})),...files.map((f,i)=>({type:'string',name:'file:'+i,value:canonical({kind:'file',name:f.name,size:f.size,sha256:f.sha256})}))];
 const tree=new PrivateData(values).getFullTree();
 const result={format:FORMAT,kind:'snapshot',tree,files};
 validateSnapshot(result);
 return result;
}
export function bytesOf(base64){if(typeof base64!=='string'||!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(base64))throw Error('Invalid attachment encoding.');return Uint8Array.from(atob(base64),c=>c.charCodeAt(0));}
function checkFiles(values,files){
 const targets=values.filter(v=>v.name.startsWith('file:')).map(v=>JSON.parse(v.value));
 if(files.length!==targets.length)throw Error('Missing or extra attachment.');
 for(let i=0;i<targets.length;i++){
 const f=files[i],r=targets[i],b=bytesOf(f.base64);
 if(f.name!==r.name||f.size!==r.size||b.length!==r.size||sha256(b)!==r.sha256||f.sha256!==r.sha256)throw Error('Attachment differs from committed evidence.');
 }
}
export function validateSnapshot(p){
 if(new TextEncoder().encode(JSON.stringify(p)).length>MAX_BYTES||p?.format!==FORMAT||p.kind!=='snapshot'||!hex32(p.tree?.root)||!Array.isArray(p.tree.values)||!p.tree.values.length||!Array.isArray(p.files))throw Error('Invalid or oversized snapshot.');
 if(p.tree.values.some(v=>v.type!=='string'||!hex32(v.salt))||new Set(p.tree.values.map(v=>v.name)).size!==p.tree.values.length)throw Error('Invalid tree leaves.');
 if(PrivateData.verifyFullTree(p.tree)!==p.tree.root)throw Error('Evidence root does not match.');
 const m=JSON.parse(p.tree.values[0].value);
 if(p.tree.values[0].name!=='manifest'||m.format!==FORMAT||m.kind!=='manifest'||(m.previousRoot!==null&&!hex32(m.previousRoot))||m.recordCount!==p.tree.values.filter(v=>v.name.startsWith('record:')).length||m.fileCount!==p.files.length)throw Error('Invalid snapshot manifest.');
 checkFiles(p.tree.values,p.files);return m;
}
export function disclosure(p,indexes,anchor=null){
 validateSnapshot(p);
 const selected=[...new Set([0,...indexes])].sort((a,b)=>a-b);
 if(selected.length<2||selected.some(i=>!Number.isInteger(i)||i<0||i>=p.tree.values.length))throw Error('Select at least one academic record or file.');
 const proof=new PrivateData(p.tree.values).generateMultiProof(selected);
 // Multiproof leaves have library-defined ordering: attach files in that same order.
 const files=proof.leaves.filter(v=>v.name.startsWith('file:')).map(v=>p.files[Number(v.name.slice(5))]);
 const out={format:FORMAT,kind:'disclosure',root:p.tree.root,proof,files,anchor};verifyDisclosure(out);return out;
}
export function verifyDisclosure(p){
 if(new TextEncoder().encode(JSON.stringify(p)).length>MAX_BYTES||p?.format!==FORMAT||p.kind!=='disclosure'||!hex32(p.root)||!p.proof?.leaves?.length||!Array.isArray(p.files))throw Error('Invalid proof package.');
 if(p.proof.leaves.some(v=>v.type!=='string'||!hex32(v.salt))||!PrivateData.verifyMultiProof(p.root,p.proof))throw Error('Evidence does not match its cryptographic proof.');
 const manifests=p.proof.leaves.filter(v=>v.name==='manifest');
 if(manifests.length!==1||JSON.parse(manifests[0].value).format!==FORMAT)throw Error('Missing snapshot context.');
 checkFiles(p.proof.leaves,p.files);
 if(p.anchor&&!verifyLink(p.root,p.anchor.link))throw Error('Wallet signature does not match the evidence.');
 return p.proof.leaves.map(v=>JSON.parse(v.value));
}
export function splitSnapshot(p){validateSnapshot(p);const text=JSON.stringify(p);return Array.from({length:Math.ceil(text.length/100000)},(_,i)=>text.slice(i*100000,(i+1)*100000));}
