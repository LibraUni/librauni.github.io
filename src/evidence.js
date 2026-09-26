import {auth,onAuthStateChanged,signIn,logOut,isOwner} from './planner-store.js';
import {loadRecords} from './journal-store.js';
import {timeline,readableJournal} from './journal-data.js';
import {validateSnapshot,disclosure,verifyDisclosure,walletMessage,verifyLink,MAX_BYTES,bytesOf} from './evidence-data.js';
import {listSnapshots,saveSnapshot,loadSnapshot,saveAnchor,loadAnchors} from './evidence-store.js';
import {BrowserProvider,JsonRpcProvider,Contract,sha256,formatEther} from 'ethers';
import {EAS_ADDRESS,ABI,mainnet,checkAnchor} from './evidence-chain.js';
import {STUDENT_FORMAT,ARCHIVE_LIMIT,inventorySignature,recordCategories,buildStudentSnapshot,makeArchive,unpackArchive,verifyOriginals} from './student-records.js';
import {loadAcademicCatalogue,loadOriginal} from './academic-store.js';
import './profile.css';
import './journal.css';
import './evidence.css';
const $=id=>document.getElementById(id);
let user=null,busy=false,generation=0,rows=[],snapshot=null,saved=false,anchor=null,ready=null,originals=new Map();
function message(s){$('evidence-status').textContent=s;}
function download(name,text,type='application/json'){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([text],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function controls(){
 for(const e of document.querySelectorAll('#evidence-private button,#evidence-private input,#evidence-private select'))e.disabled=busy;

 for(const id of ['download-snapshot','download-reading','export-proof'])$(id).disabled=busy||!snapshot;
 $('check-wallet').disabled=busy||!saved;
 $('anchor-now').disabled=busy||!ready||!saved;
 $('recheck-anchor').disabled=busy||!anchor;
 $('open-snapshot').disabled=busy||!rows.length;
}
async function act(fn){if(busy)return;busy=true;controls();const g=generation;try{await fn(()=>{if(g!==generation)throw Error('Account changed. Reload private records.');});}catch(e){message(e.shortMessage||e.message||'The operation could not finish.');}finally{busy=false;controls();}}
function fieldLabel(r){return r.kind==='file'?r.name:r.kind==='field'?`${r.field}: ${typeof r.value==='string'?r.value:JSON.stringify(r.value)}`:r.title||'Record';}
function showSnapshot(){
 ready=null;$('wallet-result').textContent='';$('evidence-selection').replaceChildren();
 if(!snapshot){$('snapshot-summary').textContent='No snapshot selected.';controls();return;}
 const m=validateSnapshot(snapshot);$('snapshot-summary').textContent=`${saved?'Saved privately':'Prepared; not yet saved'} · ${m.recordCount} ${snapshot.format===STUDENT_FORMAT?'record fields':'academic entries'} · ${m.fileCount} original files · prepared ${m.createdAt}. ${anchor?'An Ethereum reference is saved; check confirmation before sharing.':'No Ethereum anchor recorded for this snapshot.'}`;
 const groups=new Map();
 snapshot.tree.values.forEach((v,i)=>{if(!i)return;const r=JSON.parse(v.value),category=r.category||'journal';
  if(!groups.has(category)){const d=document.createElement('details'),s=document.createElement('summary');s.textContent=category[0].toUpperCase()+category.slice(1);d.append(s);$('evidence-selection').append(d);groups.set(category,d);}
  const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.value=String(i);input.dataset.category=category;
  const text=fieldLabel(r);label.append(input,document.createTextNode(` ${r.module||r.area||''} · ${text.length>180?text.slice(0,180)+'…':text}`));groups.get(category).append(label);
  if(text.length>180){const details=document.createElement('details'),summary=document.createElement('summary'),body=document.createElement('p');summary.textContent='Read full field';body.textContent=text;details.append(summary,body);groups.get(category).append(details);}
 });controls();
}
async function restoreOriginals(p,check){
 const files=new Map();
 if(p.format===STUDENT_FORMAT){const assets=p.tree.values.map(v=>JSON.parse(v.value)).filter(v=>v.kind==='file');for(let i=0;i<assets.length;i++){message(`Restoring and checking original ${i+1} of ${assets.length}…`);files.set(assets[i].id,await loadOriginal(user.uid,assets[i]));check();}}
 return files;
}
function fullDownload(){if(snapshot.format===STUDENT_FORMAT)download('librauni-full-student-records-'+snapshot.tree.root.slice(2,12)+'.zip',makeArchive(snapshot,originals,snapshot.tree.values.map((_,i)=>i),anchor,{full:true}),'application/zip');else download('librauni-private-evidence.json',JSON.stringify({snapshot,anchor},null,2));}
async function refreshList(check){const list=await listSnapshots(user.uid);check();rows=list;$('snapshot-list').replaceChildren(...rows.slice().reverse().map(r=>new Option(`#${r.sequence} · ${r.createdAt}`,r.id)));}
$('evidence-auth').onclick=()=>act(async()=>{if(auth.currentUser)await logOut();else {await signIn();if(user)await refreshList(()=>{});}});
onAuthStateChanged(auth,u=>{generation++;user=isOwner(u)?u:null;rows=[];snapshot=null;saved=false;anchor=null;ready=null;$('evidence-private').hidden=!user;$('evidence-auth').textContent=u?'Sign out':'Sign in with GitHub';originals=new Map();$('snapshot-list').replaceChildren();showSnapshot();message(user?'Your evidence is private. Generate your full records or open an earlier snapshot.':'Sign in to manage your own evidence. Verification below does not require an account.');if(user)act(refreshList);});
$('generate-full').onclick=()=>act(async check=>{
 message('Collecting all saved academic records and the tutor-managed file catalogue…');
 await refreshList(check);const records=await loadRecords(user.uid),catalogue=await loadAcademicCatalogue(user.uid);check();
 const response=await fetch('/evidence/teaching-release.json',{cache:'no-store'});if(!response.ok)throw Error('Teaching release reference unavailable. Retry after publication finishes.');const release=await response.json();check();if(release.format!=='librauni-teaching-release-v1'||!/^([a-f0-9]{40})$/.test(release.commit))throw Error('Invalid teaching release reference.');
 const next=buildStudentSnapshot(timeline(records),catalogue.register,catalogue.assets,rows.at(-1)?.root||null,release);
 const files=await restoreOriginals(next,check);
 // Detect concurrent tutoring/saves: never describe a mixed inventory as a complete capture.
 const recordsAgain=await loadRecords(user.uid),catalogueAgain=await loadAcademicCatalogue(user.uid);check();
 if(inventorySignature(records,catalogue)!==inventorySignature(recordsAgain,catalogueAgain))throw Error('Academic records changed during collection. Please generate again to capture the updated inventory.');
 message('Checking the complete download and saving its private commitment…');
 const archive=makeArchive(next,files,next.tree.values.map((_,i)=>i),null,{full:true});
 const restored=await saveSnapshot(user.uid,next);check();snapshot=restored;originals=files;saved=true;anchor=null;await refreshList(check);showSnapshot();
 download('librauni-full-student-records-'+snapshot.tree.root.slice(2,12)+'.zip',archive,'application/zip');
 message('Full saved academic records generated, restored for verification and saved online. Your organised ZIP includes every archived original, readable record fields and individual/category proofs. No Ethereum transaction was sent.');
});
$('open-snapshot').onclick=()=>act(async check=>{const p=await loadSnapshot(user.uid,$('snapshot-list').value);check();const anchors=await loadAnchors(user.uid,p.tree.root),files=await restoreOriginals(p,check);check();snapshot=p;originals=files;saved=true;anchor=anchors.at(-1)||null;showSnapshot();message('Saved snapshot and all referenced original bytes restored and verified.');});
$('download-snapshot').onclick=()=>act(async()=>fullDownload());
$('download-reading').onclick=()=>{if(snapshot.format===STUDENT_FORMAT){const text=snapshot.tree.values.slice(1).map(v=>JSON.parse(v.value)).map(r=>`${r.category} · ${r.module} · ${r.recordId}\n${fieldLabel(r)}`).join('\n\n');download('librauni-academic-records.txt','LIBRAUNI — PRIVATE ACADEMIC RECORDS\n\n'+text,'text/plain;charset=utf-8');}else {const entries=snapshot.tree.values.filter(v=>v.name.startsWith('record:')).map(v=>JSON.parse(v.value));download('librauni-academic-evidence.txt',readableJournal(entries),'text/plain;charset=utf-8');}};
$('export-proof').onclick=()=>act(async()=>{const indexes=Array.from(document.querySelectorAll('#evidence-selection input:checked'),e=>Number(e.value));if(snapshot.format===STUDENT_FORMAT){download('librauni-selected-records.zip',makeArchive(snapshot,originals,indexes,anchor),'application/zip');message('Selected fields and original files downloaded with their proofs. Unselected records, snapshot counts and predecessor context are excluded.');}else {download('librauni-selected-proof.json',JSON.stringify(disclosure(snapshot,indexes,anchor),null,2));message('Legacy selected proof downloaded. Its manifest also discloses snapshot counts and the previous root.');}});
$('select-all-evidence').onclick=()=>{for(const c of document.querySelectorAll('#evidence-selection input'))c.checked=true;};
$('select-none-evidence').onclick=()=>{for(const c of document.querySelectorAll('#evidence-selection input'))c.checked=false;};
$('select-category').onclick=()=>{for(const c of document.querySelectorAll('#evidence-selection input'))c.checked=c.dataset.category===$('evidence-category').value;};
$('evidence-category').replaceChildren(...recordCategories.map(c=>new Option(c[0].toUpperCase()+c.slice(1),c)));
$('check-wallet').onclick=()=>act(async check=>{
 ready=null;if(!window.ethereum)throw Error('Open this page in a browser with an Ethereum wallet extension. No wallet or payment is needed to save private evidence.');
 const provider=new BrowserProvider(window.ethereum);await provider.send('eth_requestAccounts',[]);await mainnet(provider);check();
 const signer=await provider.getSigner(),address=await signer.getAddress(),root=snapshot.tree.root;
 const signature=await signer.signMessage(walletMessage(root,address,snapshot.format));check();const link={address,signature,format:snapshot.format};if(!verifyLink(root,link))throw Error('Wallet signature check failed.');
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
$('verify-proof').onclick=async()=>{const output=$('verification-result');$('verified-content').replaceChildren();$('verify-proof').disabled=true;try{
 const f=$('proof-file').files[0];if(!f||f.size>ARCHIVE_LIMIT)throw Error('Choose a generated ZIP or proof JSON within the 250 MB limit.');let p,values;
 if(f.name.toLowerCase().endsWith('.zip')){const r=unpackArchive(new Uint8Array(await f.arrayBuffer()));p=r.proof;values=r.values;}
 else {if(f.size>MAX_BYTES)throw Error('Proof index exceeds 8 MB.');p=JSON.parse(await f.text());values=verifyDisclosure(p);if(p.format===STUDENT_FORMAT){const originals=new Map(),wanted=values.filter(v=>v.kind==='file');for(const file of $('original-files').files){if(file.size>150000000)throw Error('Original exceeds the supported file size.');const bytes=new Uint8Array(await file.arrayBuffer()),hash=sha256(bytes);for(const v of wanted)if(v.size===bytes.length&&v.sha256===hash)originals.set(v.id,bytes);}verifyOriginals(values,originals);}}
 output.textContent='Cryptographic proof and all required original files match. '+(p.anchor?'Checking Ethereum…':'No Ethereum anchor supplied. This verifies internal consistency, not an independently established date.');
 for(const v of values){const d=document.createElement('details'),s=document.createElement('summary'),pre=document.createElement('pre');s.textContent=v.kind==='field'?`${v.module} · ${v.field}`:v.title||v.name||'Snapshot context';pre.textContent=v.kind==='field'?(typeof v.value==='string'?v.value:JSON.stringify(v.value,null,2)):JSON.stringify(v,null,2);d.append(s,pre);$('verified-content').append(d);}
 if(p.anchor){try{const r=await checkAnchor(new JsonRpcProvider('https://ethereum-rpc.publicnode.com'),p.root,p.anchor);output.textContent=r.finalized?`Records match a finalized Ethereum commitment from ${r.blockTime}. Wallet: ${r.wallet}. This verifies integrity and timestamp, not academic correctness, real-world identity or accreditation.`:`Records match a transaction in block ${r.block}; Ethereum finality is still pending.`;}catch(e){output.textContent='Local proof matches, but Ethereum verification is not confirmed: '+e.message;}}
 }catch(e){output.textContent='Not verified: '+e.message;}finally{$('verify-proof').disabled=false;}};
window.addEventListener('beforeunload',e=>{if(busy||(snapshot&&!saved)){e.preventDefault();e.returnValue='';}});
