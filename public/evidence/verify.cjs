// MIT licence. Standalone verifier: depends on EAS and ethers, not LibraUni services.
const fs=require('node:fs');
const {PrivateData}=require('@ethereum-attestation-service/eas-sdk');
const {JsonRpcProvider,Contract,Interface,sha256,verifyMessage}=require('ethers');
(async()=>{
 const raw=fs.readFileSync(process.argv[2]);if(raw.length>8000000)throw Error('Package too large');
 const p=JSON.parse(raw);if(p.format!=='librauni-evidence-v1'||p.kind!=='disclosure'||!p.proof.leaves.length)throw Error('Wrong format');
 if(!PrivateData.verifyMultiProof(p.root,p.proof))throw Error('Merkle proof does not match');
 const manifests=p.proof.leaves.filter(v=>v.name==='manifest');if(manifests.length!==1||JSON.parse(manifests[0].value).format!==p.format)throw Error('Missing manifest');
 const files=p.proof.leaves.filter(v=>v.name.startsWith('file:')).map(v=>JSON.parse(v.value));
 if(files.length!==p.files.length)throw Error('Attachment count mismatch');
 files.forEach((r,i)=>{const f=p.files[i],b=Buffer.from(f.base64,'base64');if(r.name!==f.name||r.size!==b.length||r.sha256!==sha256(b))throw Error('Attachment mismatch');});
 console.log('Selected records and files match the cryptographic commitment.');
 if(!p.anchor){console.log('No blockchain anchor supplied. No independent date verified.');return;}
 const a=p.anchor,addr='0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587';
 if(a.chainId!==1||a.contract?.toLowerCase()!==addr.toLowerCase())throw Error('Wrong anchor network or contract');
 const msg=`LibraUni personal evidence\nFormat: librauni-evidence-v1\nRoot: ${p.root}\nWallet: ${a.link.address.toLowerCase()}\nChain: Ethereum mainnet (1)\nThis signature links wallet control to this record. It is not an assessment or accredited credential.`;
 if(verifyMessage(msg,a.link.signature).toLowerCase()!==a.link.address.toLowerCase())throw Error('Wrong wallet signature');
 const provider=new JsonRpcProvider(process.argv[3]||'https://ethereum-rpc.publicnode.com');
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
