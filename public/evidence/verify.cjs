// MIT licence. Standalone verifier: depends on EAS and ethers, not LibraUni services.
const fs=require('node:fs');
const {unzipSync,strFromU8,strToU8}=require('fflate');
const {PrivateData}=require('@ethereum-attestation-service/eas-sdk');
const {JsonRpcProvider,Contract,Interface,sha256,verifyMessage}=require('ethers');
(async()=>{
 const raw=fs.readFileSync(process.argv[2]);if(raw.length>250000000)throw Error('Package too large');
 let archive=null,p;
 if(process.argv[2].toLowerCase().endsWith('.zip')){let total=0;archive=unzipSync(raw,{filter:f=>{total+=f.originalSize;if(total>250000000||f.name.startsWith('/')||f.name.split('/').includes('..')||f.name.includes('\\'))throw Error('Unsafe archive');return true;}});if(!archive['proof.json'])throw Error('Missing proof.json');p=JSON.parse(strFromU8(archive['proof.json']));}else p=JSON.parse(raw);
 if(!['librauni-evidence-v1','librauni-student-records-v2'].includes(p.format)||p.kind!=='disclosure'||!p.proof?.leaves?.length||Buffer.byteLength(JSON.stringify(p))>8000000)throw Error('Wrong or oversized proof format');
 if(!PrivateData.verifyMultiProof(p.root,p.proof))throw Error('Merkle proof does not match');
 const values=p.proof.leaves.map(v=>JSON.parse(v.value));
 if(p.format==='librauni-evidence-v1'){
  const manifests=p.proof.leaves.filter(v=>v.name==='manifest');if(manifests.length!==1||JSON.parse(manifests[0].value).format!==p.format)throw Error('Missing manifest');
  const files=p.proof.leaves.filter(v=>v.name.startsWith('file:')).map(v=>JSON.parse(v.value));if(files.length!==p.files.length)throw Error('Attachment count mismatch');
  files.forEach((r,i)=>{const f=p.files[i],b=Buffer.from(f.base64,'base64');if(r.name!==f.name||r.size!==b.length||r.sha256!==sha256(b))throw Error('Attachment mismatch');});
 }else {
  const safe=s=>String(s).normalize('NFKC').replace(/[^a-zA-Z0-9._-]/g,'_').replace(/^\.+/,'_').slice(0,100)||'item';
  const itemPath=v=>`${v.category}/${safe(v.module)}/${sha256(strToU8(v.recordId)).slice(2,18)}/${v.kind==='file'?v.id+'-'+safe(v.name):safe(v.field)+'-'+sha256(strToU8(v.field)).slice(2,10)+'.txt'}`;
  const provided=archive?[]:process.argv.slice(3).map(f=>fs.readFileSync(f));
  for(const v of values){
   if(v.kind==='file'){const bytes=archive?archive[itemPath(v)]:provided.find(b=>b.length===v.size&&sha256(b)===v.sha256);if(!bytes||bytes.length!==v.size||sha256(bytes)!==v.sha256)throw Error('Missing or altered original: '+v.name);}
   else if(v.kind==='field'){const text=`${v.module} · ${v.recordId}\n${v.field}\n\n${typeof v.value==='string'?v.value:JSON.stringify(v.value,null,2)}\n`;if(archive&&(!archive[itemPath(v)]||strFromU8(archive[itemPath(v)])!==text))throw Error('Readable field mismatch: '+v.field);}
   else if(v.kind!=='context')throw Error('Unknown record type');
  }
 }
 console.log('Selected records and files match the cryptographic commitment.');
 if(!p.anchor){console.log('No blockchain anchor supplied. No independent date verified.');return;}
 const a=p.anchor,addr='0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587';
 if(a.chainId!==1||a.contract?.toLowerCase()!==addr.toLowerCase())throw Error('Wrong anchor network or contract');
 const msg=`LibraUni personal evidence\nFormat: ${a.link.format||'librauni-evidence-v1'}\nRoot: ${p.root}\nWallet: ${a.link.address.toLowerCase()}\nChain: Ethereum mainnet (1)\nThis signature links wallet control to this record. It is not an assessment or accredited credential.`;
 if(verifyMessage(msg,a.link.signature).toLowerCase()!==a.link.address.toLowerCase())throw Error('Wrong wallet signature');
 const provider=new JsonRpcProvider(process.env.ETHEREUM_RPC||'https://ethereum-rpc.publicnode.com');
 if((await provider.getNetwork()).chainId!==1n)throw Error('Not Ethereum mainnet');
 const abi=['function timestamp(bytes32 data) returns (uint64)','function getTimestamp(bytes32 data) view returns (uint64)'];
 const [tx,receipt,finalized]=await Promise.all([provider.getTransaction(a.transactionHash),provider.getTransactionReceipt(a.transactionHash),provider.getBlock('finalized')]);
 if(!tx||!receipt||receipt.status!==1||tx.to?.toLowerCase()!==addr.toLowerCase()||tx.data.toLowerCase()!==new Interface(abi).encodeFunctionData('timestamp',[p.root]).toLowerCase()||tx.value!==0n||tx.from.toLowerCase()!==a.link.address.toLowerCase())throw Error('Transaction does not commit this root from the linked wallet');
 const block=await provider.getBlock(receipt.blockNumber);if(!block||block.hash!==receipt.blockHash)throw Error('Non-canonical transaction');
 const stamp=await new Contract(addr,abi,provider).getTimestamp(p.root);if(stamp===0n)throw Error('No EAS timestamp');
 if(!finalized||receipt.blockNumber>finalized.number)throw Error('Included but not finalized yet; retry later');
 console.log('Finalized Ethereum commitment:',new Date(block.timestamp*1000).toISOString(),'wallet',tx.from);
 console.log('This verifies integrity, timestamp and wallet control—not academic correctness, real-world identity, accreditation or completeness of undisclosed history.');
})().catch(e=>{console.error('Verification not completed:',e.message);process.exitCode=1;});
