import {doc,getDocFromServer,runTransaction,serverTimestamp} from 'firebase/firestore';
import {db} from './planner-store.js';
import {emptyProfile,validateProfile} from './profile-data.js';
export async function loadProfile(uid,connection=db){const d=await getDocFromServer(doc(connection,'users',uid,'profile','main'));return d.exists()?{revision:d.data().revision,data:validateProfile(JSON.parse(d.data().payload))}:{revision:0,data:emptyProfile()};}
export async function saveProfile(uid,data,revision,connection=db){
 validateProfile(data);const ref=doc(connection,'users',uid,'profile','main');
 await runTransaction(connection,async tx=>{const old=await tx.get(ref);if((old.exists()?old.data().revision:0)!==revision)throw Error('PROFILE_CONFLICT');
 const next={payload:JSON.stringify(data),revision:revision+1,updatedAt:serverTimestamp()};tx.set(ref,next);tx.set(doc(connection,'users',uid,'profileHistory',String(revision+1)),next);});return revision+1;
}
