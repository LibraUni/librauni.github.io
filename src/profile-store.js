import {doc,getDocFromServer,runTransaction,serverTimestamp} from 'firebase/firestore';
import {db} from './planner-store.js';
import {emptyProfile,validateProfile,readProfile} from './profile-data.js';
export async function loadProfile(uid,connection=db){
 const d=await getDocFromServer(doc(connection,'users',uid,'profile','main'));
 return d.exists()?{revision:d.data().revision,data:readProfile(d.data().data??JSON.parse(d.data().payload))}:{revision:0,data:emptyProfile()};
}
export async function saveProfile(uid,data,revision,connection=db){
 validateProfile(data);const ref=doc(connection,'users',uid,'profile','main');
 await runTransaction(connection,async tx=>{
  const old=await tx.get(ref);if((old.exists()?old.data().revision:0)!==revision)throw Error('PROFILE_CONFLICT');
  tx.set(ref,{data,revision:revision+1,updatedAt:serverTimestamp()});
 });
 return revision+1;
}
