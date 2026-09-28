import './study-reset.js';
import {initializeApp} from 'firebase/app';
import {getAuth, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, getDocsFromServer, collection} from 'firebase/firestore';
import {firebaseConfig} from './firebase-config.js';
const app = initializeApp(firebaseConfig), auth = getAuth(app), db = getFirestore(app);
const $ = id => document.getElementById(id);
let owner = null, generation = 0;
const ownerGithubId = '332598033';
function notice(text='') { $('notice').textContent=text; $('notice').hidden=!text; }
function download(name, data, type='application/json') {
  const url=URL.createObjectURL(new Blob([data],{type})); const a=document.createElement('a'); a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
$('auth-button').addEventListener('click',async()=>{
  notice();
  try{
    if(auth.currentUser){await signOut(auth);}
    else { await signInWithPopup(auth,new GithubAuthProvider()); }
  }catch(e){
    const messages={'auth/popup-closed-by-user':'Sign-in was cancelled. You can try again.','auth/popup-blocked':'Your browser blocked the sign-in window. Allow popups for LibraUni, then try again.','auth/unauthorized-domain':'This website address needs to be authorised for sign-in.','auth/operation-not-allowed':'GitHub sign-in needs to be enabled in the project settings.','auth/invalid-credential':'The GitHub connection could not be verified. Its configuration needs checking.'};
    notice((messages[e.code]||'Sign-in could not finish. Please share the error code with your tutor.')+' ('+(e.code||'unknown-error')+')');
  }
});
onAuthStateChanged(auth, async user=>{
  generation++;owner=null;$('export').disabled=true;
  $('auth-button').textContent=user?'Sign out':'Sign in with GitHub';
  if(!user)return;
  if(!user.providerData.some(p=>p.providerId==='github.com'&&p.uid===ownerGithubId)){
    notice('This account does not have access to this private workspace.');return;
  }
  owner=user;$('export').disabled=false;
});
$('export').addEventListener('click',async()=>{
  if(!owner)return;const user=owner;const session=generation;$('export').disabled=true;
  try{
    const out={schemaVersion:1,exportedAt:new Date().toISOString(),uid:user.uid,collections:{}};
    for(const name of ['notes','noteHistory','progress','attempts','assessments','bookmarks','planner','plannerHistory','profile','profileHistory','journal']){
      const q=await getDocsFromServer(collection(db,'users',user.uid,name));out.collections[name]=q.docs.map(d=>({id:d.id,data:d.data()}));
    }
    if(session!==generation)return;
    download('librauni-records-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(out,null,2));
  }catch{notice('The export could not finish. Your saved records are unchanged. Please try again online.');}
  finally{if(session===generation)$('export').disabled=false;}
});
fetch('/backup-health.json',{cache:'no-store'}).then(r=>r.ok?r.json():null).then(data=>{
  if(data?.configured)$('backup-status').textContent='Daily backups configured. Open the private backup folder to check the last successful snapshot.';
}).catch(()=>{});
