import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Wallet,sha256} from 'ethers';
import {PrivateData} from '../src/eas-private.js';
import {buildSnapshot,validateSnapshot,disclosure,verifyDisclosure,walletMessage,verifyLink} from '../src/evidence-data.js';
import {checkAnchor,iface,EAS_ADDRESS} from '../src/evidence-chain.js';
const entries=[{id:'journal/a',title:'Synthetic exercise',body:'Answer 42',category:'assessment'},{id:'journal/b',title:'Hidden synthetic note',body:'This must not be disclosed',category:'feedback'}];
const bytes=new TextEncoder().encode('print(42)\n');const file={name:'synthetic.py',size:bytes.length,sha256:sha256(bytes),base64:btoa('print(42)\n')};
test('snapshot salts differ; standard EAS independently verifies exported selection and excludes hidden data',()=>{
 const p=buildSnapshot(entries,[file]);const other=buildSnapshot(entries,[file]);assert.notEqual(p.tree.root,other.tree.root);assert.equal(validateSnapshot(p).recordCount,2);
 const d=disclosure(p,[1,3]);assert.equal(PrivateData.verifyMultiProof(p.tree.root,d.proof),true);assert.equal(verifyDisclosure(d).length,3);assert.ok(!JSON.stringify(d).includes('This must not be disclosed'));assert.ok(!JSON.stringify(d).includes(p.tree.values[2].salt));
 d.proof.leaves.find(v=>v.name==='record:journal/a').value='{}';assert.throws(()=>verifyDisclosure(d));
});
test('tampering with originals, root, salt, predecessor or missing file fails; zero selection fails',()=>{
 const p=buildSnapshot(entries,[file]);for(const change of [q=>q.files[0].base64=btoa('tampered'),q=>q.tree.root='0x'+'a'.repeat(64),q=>q.tree.values[0].salt='0x'+'b'.repeat(64),q=>q.tree.values[0].value=q.tree.values[0].value.replace('null','"fake"'),q=>q.files.pop()]){const q=structuredClone(p);change(q);assert.throws(()=>validateSnapshot(q));}
 assert.throws(()=>disclosure(p,[]));assert.throws(()=>buildSnapshot([...entries,entries[0]]));
});
test('saved salts survive JSON round-trip and bind the previous snapshot; alternate selection order works',()=>{
 const p=buildSnapshot(entries,[file]);const restored=JSON.parse(JSON.stringify(p));assert.deepEqual(disclosure(p,[3,1]),disclosure(restored,[1,3]));
 const next=buildSnapshot(entries,[],p.tree.root);assert.equal(validateSnapshot(next).previousRoot,p.tree.root);
});
test('wallet signature binds the exact root; chain checker rejects wrong chain, reverted, altered and unrelated transactions',async()=>{
 const wallet=Wallet.createRandom(),p=buildSnapshot(entries);const address=wallet.address,signature=await wallet.signMessage(walletMessage(p.tree.root,address));const link={address,signature};assert.ok(verifyLink(p.tree.root,link));assert.equal(verifyLink('0x'+'0'.repeat(64),link),false);
 const a={chainId:1,contract:EAS_ADDRESS,transactionHash:'0x'+'1'.repeat(64),link};const tx={to:EAS_ADDRESS,from:address,value:0n,data:iface.encodeFunctionData('timestamp',[p.tree.root])};
 const provider={getNetwork:async()=>({chainId:1n}),getTransaction:async()=>tx,getTransactionReceipt:async()=>({status:1,blockNumber:10,blockHash:'same'}),getBlock:async n=>({number:n==='finalized'?11:10,hash:'same',timestamp:1000}),call:async()=>iface.encodeFunctionResult('getTimestamp',[1000n])};
 assert.equal((await checkAnchor(provider,p.tree.root,a)).finalized,true);
 assert.equal((await checkAnchor({...provider,getBlock:async n=>({number:n==='finalized'?9:10,hash:'same',timestamp:1000})},p.tree.root,a)).finalized,false);
 await assert.rejects(checkAnchor({...provider,getNetwork:async()=>({chainId:11155111n})},p.tree.root,a));
 for(const changed of [{...tx,value:1n},{...tx,from:Wallet.createRandom().address},{...tx,data:'0x'},{...tx,to:Wallet.createRandom().address}])await assert.rejects(checkAnchor({...provider,getTransaction:async()=>changed},p.tree.root,a));
 await assert.rejects(checkAnchor({...provider,getTransactionReceipt:async()=>({status:0})},p.tree.root,a));
});
