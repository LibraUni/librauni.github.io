import {auth,onAuthStateChanged,signIn,logOut,isOwner} from './planner-store.js';
import {loadRecords} from './journal-store.js';
import {timeline,readableJournal} from './journal-data.js';
import {buildSnapshot,validateSnapshot,disclosure,verifyDisclosure,walletMessage,verifyLink,MAX_BYTES,bytesOf} from './evidence-data.js';
import {listSnapshots,saveSnapshot,loadSnapshot,saveAnchor,loadAnchors} from './evidence-store.js';
import {BrowserProvider,JsonRpcProvider,Contract,sha256,formatEther} from 'ethers';
import {EAS_ADDRESS,ABI,mainnet,checkAnchor} from './evidence-chain.js';
import './profile.css';
import './journal.css';
import './evidence.css';
const $=id=>document.getElementById(id);
let user=null,busy=false,generation=0,rows=[],snapshot=null,saved=false,anchor=null,ready=null;
function message(s){$('evidence-status').textContent=s;}
function download(name,text,type='application/json'){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([text],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function controls(){
 for(const e of document.querySelectorAll('#evidence-private button,#evidence-private input,#evidence-private select'))e.disabled=busy;
 $('save-snapshot').disabled=busy||!snapshot||saved;
 for(const id of ['download-snapshot','download-reading','export-proof'])$(id).disabled=busy||!snapshot;
 $('check-wallet').disabled=busy||!saved;
 $('anchor-now').disabled=busy||!ready||!saved;
 $('recheck-anchor').disabled=busy||!anchor;
 $('open-snapshot').disabled=busy||!rows.length;
}
async function act(fn){if(busy)return;busy=true;controls();const g=generation;try{await fn(()=>{if(g!==generation)throw Error('Account changed. Reload private records.');});}catch(e){message(e.shortMessage||e.message||'The operation could not finish.');}finally{busy=false;controls();}}
function showSnapshot(){
 ready=null;$('wallet-result').textContent='';$('evidence-selection').replaceChildren();
 if(!snapshot){$('snapshot-summary').textContent='No snapshot selected.';controls();return;}
 const m=validateSnapshot(snapshot);$('snapshot-summary').textContent=`${saved?'Saved privately':'Prepared; not yet saved'} · ${m.recordCount} academic entries · ${m.fileCount} attached files · prepared ${m.createdAt}. ${anchor?'An Ethereum transaction reference is saved; use Check confirmation to verify its current state.':'No Ethereum anchor recorded for this snapshot.'}`;
 snapshot.tree.values.forEach((v,i)=>{if(!i)return;const r=JSON.parse(v.value),label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.value=String(i);label.append(input,document.createTextNode(r.kind==='file'?` File: ${r.name}`:` ${r.occurredAt||r.recordedAt||'Time unknown'} · ${r.title}`));$('evidence-selection').append(label);if(r.kind==='file'){const f=snapshot.files[Number(v.name.slice(5))],b=document.createElement('button');b.textContent='Download original file';b.onclick=()=>download(f.name.replace(/[\/\\\x00-\x1f]/g,'_'),bytesOf(f.base64),'application/octet-stream');$('evidence-selection').append(b);}});controls();
}
async function refreshList(check){const list=await listSnapshots(user.uid);check();rows=list;$('snapshot-list').replaceChildren(...rows.slice().reverse().map(r=>new Option(`#${r.sequence} · ${r.createdAt}`,r.id)));}
$('evidence-auth').onclick=()=>act(async()=>{if(auth.currentUser)await logOut();else {await signIn();if(user)await refreshList(()=>{});}});
onAuthStateChanged(auth,u=>{generation++;user=isOwner(u)?u:null;rows=[];snapshot=null;saved=false;anchor=null;ready=null;$('evidence-private').hidden=!user;$('evidence-auth').textContent=u?'Sign out':'Sign in with GitHub';$('attachment-files').value='';$('snapshot-list').replaceChildren();showSnapshot();message(user?'Your evidence is private. Prepare a snapshot or open a saved one.':'Sign in to manage your own evidence. Verification below does not require an account.');if(user)act(refreshList);});
$('prepare-snapshot').onclick=()=>act(async check=>{
 await refreshList(check);const records=await loadRecords(user.uid);check();const files=[];
 const selected=Array.from($('attachment-files').files);if(selected.reduce((n,f)=>n+f.size,0)>3_000_000)throw Error('Attach at most 3 MB per snapshot. Keep larger originals in the private study repository for now.');
 for(const f of selected){const bytes=new Uint8Array(await f.arrayBuffer());check();let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));files.push({name:f.name,size:bytes.length,sha256:sha256(bytes),base64:btoa(binary)});}
 const next=buildSnapshot(timeline(records),files,rows.at(-1)?.root||null);check();snapshot=next;saved=false;anchor=null;showSnapshot();message('Prepared locally. Review the list, then Save private snapshot. Nothing has been published or sent to a wallet.');
});
$('save-snapshot').onclick=()=>act(async check=>{const p=await saveSnapshot(user.uid,snapshot);check();snapshot=p;saved=true;await refreshList(check);showSnapshot();message('Saved online and restored successfully for verification. Included in private database backups; no blockchain transaction has been sent.');});
$('open-snapshot').onclick=()=>act(async check=>{const p=await loadSnapshot(user.uid,$('snapshot-list').value);check();const anchors=await loadAnchors(user.uid,p.tree.root);check();snapshot=p;saved=true;anchor=anchors.at(-1)||null;showSnapshot();message('Saved snapshot restored and its files and cryptographic root verified.');});
$('download-snapshot').onclick=()=>download('librauni-private-evidence-'+snapshot.tree.root.slice(2,12)+'.json',JSON.stringify({snapshot,anchor},null,2));
$('download-reading').onclick=()=>{const entries=snapshot.tree.values.filter(v=>v.name.startsWith('record:')).map(v=>JSON.parse(v.value));download('librauni-academic-evidence.txt',readableJournal(entries)+'\n\nAttached files\n'+snapshot.files.map(f=>f.name+' · '+f.size+' bytes').join('\n')+'\n\nOriginal file bytes and cryptographic proofs are in the separate private snapshot download.','text/plain;charset=utf-8');};
$('export-proof').onclick=()=>act(async()=>{const indexes=Array.from(document.querySelectorAll('#evidence-selection input:checked'),e=>Number(e.value));const p=disclosure(snapshot,indexes,anchor);download('librauni-selected-proof.json',JSON.stringify(p,null,2));message('Downloaded selected evidence and its standard EAS multiproof. The manifest discloses snapshot time, counts and previous root; unselected academic text and file bytes are excluded.');});
$('select-all-evidence').onclick=()=>{for(const c of document.querySelectorAll('#evidence-selection input'))c.checked=true;};
$('select-none-evidence').onclick=()=>{for(const c of document.querySelectorAll('#evidence-selection input'))c.checked=false;};
$('check-wallet').onclick=()=>act(async check=>{
 ready=null;if(!window.ethereum)throw Error('Open this page in a browser with an Ethereum wallet extension. No wallet or payment is needed to save private evidence.');
 const provider=new BrowserProvider(window.ethereum);await provider.send('eth_requestAccounts',[]);await mainnet(provider);check();
 const signer=await provider.getSigner(),address=await signer.getAddress(),root=snapshot.tree.root;
 const signature=await signer.signMessage(walletMessage(root,address));check();const link={address,signature};if(!verifyLink(root,link))throw Error('Wallet signature check failed.');
 const contract=new Contract(EAS_ADDRESS,ABI,signer),gas=await contract.timestamp.estimateGas(root),fees=await provider.getFeeData();check();
 if(!fees.maxFeePerGas)throw Error('A fee estimate is unavailable. Retry later.');
 const gasLimit=gas*120n/100n;ready={provider,signer,link,root,gasLimit};
 $('wallet-result').textContent=`Wallet ${address}. Estimated upper network fee with a 20% gas-limit margin: ${formatEther(gasLimit*fees.maxFeePerGas)} ETH at current fees. The wallet will show the final fee. Public data: this wallet, a randomised evidence root and transaction timing. Academic text, file bytes and your profile remain private. This is a personal timestamp, not a tutor-issued qualification.`;
 message('Wallet control checked. No paid transaction has been sent. Anchor on Ethereum opens a separate wallet approval.');
});
$('anchor-now').onclick=()=>act(async check=>{
 const r=ready;ready=null;await mainnet(r.provider);check();
 if(snapshot.tree.root!==r.root||!saved||(await r.signer.getAddress()).toLowerCase()!==r.link.address.toLowerCase())throw Error('Snapshot or wallet changed; check the wallet again.');
 let tx;try{tx=await new Contract(EAS_ADDRESS,ABI,r.signer).timestamp(r.root,{gasLimit:r.gasLimit,value:0n});}catch(e){throw Error('Wallet transaction not confirmed by this page. Check your wallet activity before retrying to avoid a duplicate charge. '+(e.shortMessage||e.message));}
 // Preserve the broadcast reference immediately, before waiting for a receipt.
 const pending={chainId:1,contract:EAS_ADDRESS,transactionHash:tx.hash,link:r.link};
 download('librauni-ethereum-receipt.json',JSON.stringify({root:r.root,anchor:pending},null,2));
 check();anchor=pending;
 try{await saveAnchor(user.uid,r.root,pending);check();}catch{message('Transaction broadcast. Its receipt was downloaded, but online receipt saving failed. Keep that file and use Recover receipt below; do not resend the transaction.');return;}
 showSnapshot();message('Transaction broadcast and reference saved. Use Check confirmation after it is included. Finality may take several minutes; no second transaction is needed.');
});
$('recheck-anchor').onclick=()=>act(async check=>{const result=await checkAnchor(new JsonRpcProvider('https://ethereum-rpc.publicnode.com'),snapshot.tree.root,anchor);check();message(result.finalized?`Confirmed in finalized Ethereum block ${result.block}, ${result.blockTime}. The evidence matches this timestamp commitment; academic correctness is not certified.`:`Included in block ${result.block}; awaiting Ethereum finality. Check again later.`);});
$('recover-receipt').onclick=()=>act(async check=>{const f=$('receipt-file').files[0];if(!f||f.size>20000)throw Error('Choose the downloaded transaction receipt.');const p=JSON.parse(await f.text());check();if(!saved||p.root!==snapshot.tree.root||!verifyLink(p.root,p.anchor?.link))throw Error('Receipt belongs to a different snapshot or its signature is invalid.');await checkAnchor(new JsonRpcProvider('https://ethereum-rpc.publicnode.com'),p.root,p.anchor);check();await saveAnchor(user.uid,p.root,p.anchor);check();anchor=p.anchor;showSnapshot();message('Matching Ethereum receipt recovered and saved privately.');});
// Public verification: input is processed locally. Only transaction/root queries go to the RPC.
$('verify-proof').onclick=async()=>{const output=$('verification-result');$('verified-content').replaceChildren();try{const f=$('proof-file').files[0];if(!f||f.size>MAX_BYTES)throw Error('Choose a selected-proof JSON file up to 8 MB.');const p=JSON.parse(await f.text()),values=verifyDisclosure(p);output.textContent='Cryptographic proof and included files match. '+(p.anchor?'Checking Ethereum…':'No Ethereum anchor supplied. This proves internal consistency only, not an independently established date.');
 for(const v of values){const d=document.createElement('details'),s=document.createElement('summary'),pre=document.createElement('pre');s.textContent=v.title||v.name||'Snapshot context';pre.textContent=JSON.stringify(v,null,2);d.append(s,pre);$('verified-content').append(d);}
 if(p.anchor){try{const r=await checkAnchor(new JsonRpcProvider('https://ethereum-rpc.publicnode.com'),p.root,p.anchor);output.textContent=r.finalized?`Records match a finalized Ethereum commitment from ${r.blockTime}. Wallet: ${r.wallet}. This verifies integrity and timestamp, not the truth of academic claims, identity beyond wallet control, or accreditation.`:`Records match a transaction in block ${r.block}; Ethereum finality is still pending.`;}catch(e){output.textContent='Local proof matches, but Ethereum verification is not confirmed: '+e.message;}}
 }catch(e){output.textContent='Not verified: '+e.message;}};
window.addEventListener('beforeunload',e=>{if(busy||(snapshot&&!saved)){e.preventDefault();e.returnValue='';}});
