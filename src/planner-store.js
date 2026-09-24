import {initializeApp,getApps} from 'firebase/app';
import {getAuth,GithubAuthProvider,signInWithPopup,onAuthStateChanged,signOut} from 'firebase/auth';
import {getFirestore,doc,getDocFromServer,runTransaction,serverTimestamp} from 'firebase/firestore';
import {firebaseConfig} from './firebase-config.js';
const app=getApps().find(app=>app.name==='[DEFAULT]')||initializeApp(firebaseConfig);
export const auth=getAuth(app),db=getFirestore(app);
export {onAuthStateChanged};
export const signIn=()=>signInWithPopup(auth,new GithubAuthProvider());
export const logOut=()=>signOut(auth);
export const isOwner=user=>user?.providerData.some(p=>p.providerId==='github.com'&&p.uid==='332598033');
export async function loadPlanner(uid,connection=db){const d=await getDocFromServer(doc(connection,'users',uid,'planner','main'));return d.exists()?{revision:d.data().revision,data:JSON.parse(d.data().payload)}:{revision:0,data:{schemaVersion:1,plans:{}}};}
export async function savePlanner(uid,data,revision,connection=db){
 const ref=doc(connection,'users',uid,'planner','main');
 await runTransaction(connection,async tx=>{
 const old=await tx.get(ref);
 if((old.exists()?old.data().revision:0)!==revision)throw Error('PLANNER_CONFLICT');
 const next={payload:JSON.stringify(data),revision:revision+1,updatedAt:serverTimestamp()};
 tx.set(ref,next);tx.set(doc(connection,'users',uid,'plannerHistory',String(revision+1)),next);
 });return revision+1;
}
