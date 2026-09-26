import {Contract,Interface,verifyMessage} from 'ethers';
import {hex32,verifyLink} from './evidence-data.js';
// Official EAS Ethereum deployment, v0.26. Only timestamp(bytes32) is writable here.
export const EAS_ADDRESS='0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587';
export const ABI=['function timestamp(bytes32 data) returns (uint64)','function getTimestamp(bytes32 data) view returns (uint64)'];
export const iface=new Interface(ABI);
export async function mainnet(provider){if((await provider.getNetwork()).chainId!==1n)throw Error('Select Ethereum mainnet in your wallet. No transaction was sent.');}
export async function checkAnchor(provider,root,anchor){
 if(!hex32(root)||!hex32(anchor?.transactionHash)||anchor.chainId!==1||anchor.contract?.toLowerCase()!==EAS_ADDRESS.toLowerCase()||!verifyLink(root,anchor.link))throw Error('Invalid anchor or wallet signature.');
 await mainnet(provider);
 const [tx,receipt,finalized]=await Promise.all([provider.getTransaction(anchor.transactionHash),provider.getTransactionReceipt(anchor.transactionHash),provider.getBlock('finalized')]);
 if(!receipt||!tx)throw Error('Transaction not found or still pending.');
 if(receipt.status!==1||tx.to?.toLowerCase()!==EAS_ADDRESS.toLowerCase()||tx.data.toLowerCase()!==iface.encodeFunctionData('timestamp',[root]).toLowerCase()||tx.value!==0n||tx.from.toLowerCase()!==anchor.link.address.toLowerCase())throw Error('Transaction does not anchor this record from its linked wallet.');
 const block=await provider.getBlock(receipt.blockNumber);
 if(!block||block.hash!==receipt.blockHash)throw Error('Transaction is not in the current canonical chain.');
 const timestamp=await new Contract(EAS_ADDRESS,ABI,provider).getTimestamp(root);
 if(timestamp===0n)throw Error('EAS has no timestamp for this root.');
 return {finalized:!!finalized&&receipt.blockNumber<=finalized.number,block:receipt.blockNumber,blockTime:new Date(block.timestamp*1000).toISOString(),firstTimestamp:new Date(Number(timestamp)*1000).toISOString(),wallet:tx.from};
}
