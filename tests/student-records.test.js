import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sha256,Wallet} from 'ethers';
import {zipSync,strToU8,strFromU8} from 'fflate';
import {buildStudentSnapshot,validateStudentSnapshot,studentDisclosure,verifyStudentProof,archiveEntries,makeArchive,unpackArchive,itemPath,verifyOriginals,inventorySignature} from '../src/student-records.js';
import {validateSnapshot,verifyDisclosure,walletMessage,verifyLink} from '../src/evidence-data.js';
import {PrivateData} from '../src/eas-private.js';
const bytes=strToU8('Synthetic original\n'),id='a'.repeat(64);
const assets=[{id,category:'submissions',module:'LU-M100',activity:'synthetic-task',name:'answer..txt',parts:1,size:bytes.length,sha256:sha256(bytes)}];
const register=[{id:'synthetic-assessment',category:'assessments',module:'LU-M100',fields:{grade:72,feedback:'Unshared private feedback',title:'Synthetic TMA'}}];
const entries=[{id:'journal/synthetic',category:'conversation',title:'Synthetic tutorial',body:'Private tutorial words',recordedAt:'2026-09-26T00:00:00.000Z'}];
const files=new Map([[id,bytes]]),build=()=>buildStudentSnapshot(entries,register,assets);
test('field-level proof shares one grade without feedback, journal, context counts or other salts',()=>{
 const p=build(),index=p.tree.values.findIndex(v=>JSON.parse(v.value).field==='grade'),proof=studentDisclosure(p,[index]);
 assert.equal(PrivateData.verifyMultiProof(p.tree.root,proof.proof),true);assert.equal(verifyDisclosure(proof)[0].value,72);
 for(const hidden of ['Unshared private feedback','Private tutorial words','previousRoot','createdAt',p.tree.values[0].salt])assert.ok(!JSON.stringify(proof).includes(hidden));
 assert.equal(verifyStudentProof(proof).length,1);assert.equal(validateSnapshot(p).fileCount,1);
});
test('full ZIP restores all originals and readable fields; category and single file independently verify',()=>{
 const p=build(),indexes=p.tree.values.map((_,i)=>i),archive=archiveEntries(p,files,indexes,null,{full:true});
 const zip=makeArchive(p,files,indexes,null,{full:true});assert.equal(unpackArchive(zip).files.get(id).toString(),bytes.toString());
 assert.ok(archive['private-recovery.json']);assert.ok(strFromU8(archive['READABLE-RECORDS.txt']).includes('Synthetic TMA'));assert.ok(strFromU8(archive['READABLE-RECORDS.txt']).includes('grade: 72'));const category=JSON.parse(strFromU8(archive['assessments/CATEGORY-PROOF.json']));assert.equal(verifyStudentProof(category).length,3);
 const item=JSON.parse(p.tree.values.at(-1).value),proof=JSON.parse(strFromU8(archive[itemPath(item)+'.proof.json']));assert.equal(verifyOriginals(verifyStudentProof(proof),files),1);
 const restored=JSON.parse(strFromU8(archive['private-recovery.json'])).snapshot;assert.equal(validateStudentSnapshot(restored).files,1);
 const selected=archiveEntries(restored,files,[p.tree.values.length-1]);assert.ok(!selected['private-recovery.json']);assert.ok(!Object.keys(selected).some(k=>k.startsWith('assessments/')));
});
test('missing or altered originals, altered readable text and altered proof all fail',()=>{
 const p=build(),all=p.tree.values.map((_,i)=>i);
 assert.throws(()=>makeArchive(p,new Map(),all),/Missing/);
 const a=archiveEntries(p,files,all),v=JSON.parse(p.tree.values.at(-1).value);a[itemPath(v)]=strToU8('tampered');assert.throws(()=>unpackArchive(zipSync(a)),/altered/);
 const b=archiveEntries(p,files,all),field=JSON.parse(p.tree.values[1].value);b[itemPath(field)]=strToU8('forged');assert.throws(()=>unpackArchive(zipSync(b)),/Readable/);
 const proof=studentDisclosure(p,[1]);proof.proof.leaves[0].value='{}';assert.throws(()=>verifyStudentProof(proof));
 const report=archiveEntries(p,files,all);report['READABLE-RECORDS.txt']=strToU8('forged overview');assert.throws(()=>unpackArchive(zipSync(report)),/overview/);
 const unsafe={...archiveEntries(p,files,all),'../escape':bytes};assert.throws(()=>unpackArchive(zipSync(unsafe)),/Unsafe/);
});
test('original bytes are external to immutable index, removing the previous 3 MB snapshot attachment limit',()=>{
 const large=new Uint8Array(3100000).fill(7),a={...assets[0],size:large.length,parts:21,sha256:sha256(large)};
 const p=buildStudentSnapshot([],[],[a]);assert.ok(JSON.stringify(p).length<10000);assert.equal(unpackArchive(makeArchive(p,new Map([[id,large]]),[0,1])).files.get(id).length,large.length);
});
test('v2 wallet signature binds format and root; successor keeps previous commitment',async()=>{
 const p=build(),w=Wallet.createRandom(),link={address:w.address,format:p.format,signature:await w.signMessage(walletMessage(p.tree.root,w.address,p.format))};assert.ok(verifyLink(p.tree.root,link));assert.equal(verifyLink(p.tree.root,{...link,format:'librauni-evidence-v1'}),false);
 assert.equal(validateStudentSnapshot(buildStudentSnapshot([],[],[],p.tree.root)).previousRoot,p.tree.root);
});
test('saved structured assessment fields remain separately shareable instead of only an opaque journal summary',()=>{
 const p=buildStudentSnapshot([{id:'assessments/test',category:'assessment',area:'LU-M100',raw:{grade:72,rubric:{reasoning:8}}}],[],[]);
 assert.ok(p.tree.values.some(v=>JSON.parse(v.value).field==='saved.grade'));assert.ok(p.tree.values.some(v=>JSON.parse(v.value).field==='saved.rubric.reasoning'));
});

test('inventory comparison accepts Firestore timestamps and detects newly saved data',async()=>{
 const {Timestamp}=await import('firebase/firestore');const records={journal:[{id:'a',data:{recordedAt:Timestamp.fromMillis(1000),body:'one'}}]},catalogue={assets:[],register:[]};
 const same={journal:[{id:'a',data:{recordedAt:Timestamp.fromMillis(1000),body:'one'}}]};assert.equal(inventorySignature(records,catalogue),inventorySignature(same,catalogue));same.journal[0].data.body='two';assert.notEqual(inventorySignature(records,catalogue),inventorySignature(same,catalogue));
});
