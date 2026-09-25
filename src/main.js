import {initializeApp} from 'firebase/app';
import {getAuth, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, doc, getDocFromServer, getDocsFromServer, collection, runTransaction, serverTimestamp} from 'firebase/firestore';
import {firebaseConfig} from './firebase-config.js';
import {lessons} from './catalog.js';
import {summariseProgress, validateNote} from './progress.js';
const app = initializeApp(firebaseConfig), auth = getAuth(app), db = getFirestore(app);
const $ = id => document.getElementById(id);
let owner = null, revision = 0, savedText = '', busy = false, timer, conflict = false, generation = 0;
const ownerGithubId = '332598033';
const draftKey = uid => `librauni:note:${uid}`;
function status(text, state='pending') { $('save-status').textContent=text; $('save-status').dataset.state=state; }
function notice(text='') { $('notice').textContent=text; $('notice').hidden=!text; }
function download(name, data, type='application/json') {
  const url=URL.createObjectURL(new Blob([data],{type})); const a=document.createElement('a'); a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function stash() {
  if(!owner)return;
  try{localStorage.setItem(draftKey(owner.uid),JSON.stringify({text:$('note').value,baseRevision:revision}));}
  catch {notice('This browser cannot keep a local draft. Stay on this page until your note is saved online, or download it.');}
}
function pending(){return owner && $('note').value!==savedText;}
async function save(){
  clearTimeout(timer);
  if(!owner || busy || conflict || !pending())return;
  const uid=owner.uid, session=generation, text=validateNote($('note').value), base=revision;
  stash();
  if(!navigator.onLine){status('Offline · draft on this device');$('retry').hidden=false;return;}
  busy=true;status('Saving…');$('retry').hidden=true;
  try{
    const ref=doc(db,'users',uid,'notes','main');
    await runTransaction(db,async tx=>{
      const old=await tx.get(ref), actual=old.exists()?old.data().revision:0;
      if(actual!==base)throw new Error('NOTE_CONFLICT');
      const data={text,revision:base+1,updatedAt:serverTimestamp()};
      tx.set(ref,data);
      tx.set(doc(db,'users',uid,'noteHistory',String(base+1)),data);
    });
    if(session!==generation)return;
    revision=base+1;savedText=text;
    if($('note').value===text){try{localStorage.removeItem(draftKey(uid));}catch{} status('Saved online · '+new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}),'saved');}
    else{stash();timer=setTimeout(save,400);}
  }catch(e){
    if(session!==generation)return;
    if(e.message==='NOTE_CONFLICT'){
      conflict=true;notice('A newer version was saved on another page or device. Your draft is still here. Download it before loading the saved version, then combine your changes.');$('use-saved').hidden=false;status('Changes need review','error');
    }else{status('Not saved online · retry needed','error');$('retry').hidden=false;notice('Your note could not be saved online. Keep this page open or download a copy, then retry.');}
  }finally{busy=false;}
}
async function loadNote(){
  if(!owner)return;
  const uid=owner.uid, session=generation;
  $('note').disabled=true;status('Opening your notebook…');
  try{
    const result=await getDocFromServer(doc(db,'users',uid,'notes','main'));
    if(session!==generation)return;
    revision=result.exists()?result.data().revision:0;savedText=result.exists()?result.data().text:'';
    let draft=null;try{draft=JSON.parse(localStorage.getItem(draftKey(uid))||'null');}catch{}
    if(draft?.text===savedText){try{localStorage.removeItem(draftKey(uid));}catch{}draft=null;}
    $('note').value=draft?.text??savedText; conflict=!!draft && draft.baseRevision!==revision;
    $('note').disabled=false;$('note').placeholder='What would you like to understand better?';$('draft-download').disabled=false;
    $('character-count').textContent=`${$('note').value.length.toLocaleString()} / 20,000`;
    if(conflict){notice('Your local draft differs from a newer online version. Download your draft before loading the saved version.');$('use-saved').hidden=false;status('Changes need review','error');}
    else if(draft){status('Recovering your draft…');await save();}
    else status(result.exists()?'Saved online':'Ready · your next note will save automatically','saved');
  }catch{if(session!==generation)return;status('Cannot open notebook','error');notice('Connect to the internet and retry. Your online records have not been changed.');$('retry').hidden=false;}
}
$('auth-button').addEventListener('click',async()=>{
  notice();
  try{
    if(auth.currentUser){if(pending()||busy){notice('Please wait for your note to save, or download it before signing out.');return;}await signOut(auth);}
    else { $('account-message').textContent='Complete sign-in in the GitHub window.'; await signInWithPopup(auth,new GithubAuthProvider()); }
  }catch(e){
    const messages={'auth/popup-closed-by-user':'Sign-in was cancelled. You can try again.','auth/popup-blocked':'Your browser blocked the sign-in window. Allow popups for LibraUni, then try again.','auth/unauthorized-domain':'This website address needs to be authorised for sign-in.','auth/operation-not-allowed':'GitHub sign-in needs to be enabled in the project settings.','auth/invalid-credential':'The GitHub connection could not be verified. Its configuration needs checking.'};
    notice((messages[e.code]||'Sign-in could not finish. Please share the error code with your tutor.')+' ('+(e.code||'unknown-error')+')');
    $('account-message').textContent='Not signed in';
  }
});
onAuthStateChanged(auth, async user=>{
  generation++;clearTimeout(timer);owner=null;conflict=false;revision=0;savedText='';
  $('note').value='';$('note').disabled=true;$('export').disabled=true;$('draft-download').disabled=true;$('retry').hidden=true;$('use-saved').hidden=true;
  $('auth-button').textContent=user?'Sign out':'Sign in with GitHub';
  if(!user){$('account-message').textContent='Sign in to open your private workspace.';status('Not signed in');return;}
  if(!user.providerData.some(p=>p.providerId==='github.com'&&p.uid===ownerGithubId)){
    $('account-message').textContent='This account does not have access to this private workspace.';status('Access restricted','error');return;
  }
  owner=user;const session=generation;$('account-message').textContent='Signed in · your workspace is private.';$('export').disabled=false;
  await loadNote();
  if(session!==generation)return;
  try{
    const [p,a]=await Promise.all([getDocsFromServer(collection(db,'users',user.uid,'progress')),getDocsFromServer(collection(db,'users',user.uid,'assessments'))]);
    if(session!==generation)return;
    const s=summariseProgress(lessons,p.docs.map(d=>({id:d.id,...d.data()})),a.docs.map(d=>d.data()));
    if(s.total){$('completed').textContent=`${s.completed} / ${s.total}`;$('mastered').textContent=`${s.mastered} / ${s.total}`;}
  }catch{notice('Your progress summary is unavailable. This does not change your saved records.');}
});
$('note').addEventListener('input',()=>{ $('character-count').textContent=`${$('note').value.length.toLocaleString()} / 20,000`;stash();status(conflict?'Changes need review':'Draft · waiting to save',conflict?'error':'pending');clearTimeout(timer);timer=setTimeout(save,900);});
$('retry').addEventListener('click',()=>{notice();if($('note').disabled)loadNote();else save();});
$('use-saved').addEventListener('click',async()=>{if(!owner)return;if(!confirm('Replace the draft on this page with the online version? Download your draft first if you want to keep it.'))return;localStorage.removeItem(draftKey(owner.uid));conflict=false;$('use-saved').hidden=true;notice();await loadNote();});
$('draft-download').addEventListener('click',()=>download('librauni-note.txt',$('note').value,'text/plain'));
$('export').addEventListener('click',async()=>{
  if(!owner)return;const user=owner;const session=generation;$('export').disabled=true;
  try{
    const out={schemaVersion:1,exportedAt:new Date().toISOString(),uid:user.uid,collections:{}};
    for(const name of ['notes','noteHistory','progress','attempts','assessments','bookmarks','planner','plannerHistory','profile','profileHistory','journal']){
      const q=await getDocsFromServer(collection(db,'users',user.uid,name));out.collections[name]=q.docs.map(d=>({id:d.id,data:d.data()}));
    }
    if(session!==generation)return;
    download('librauni-records-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(out,null,2));
    if(pending())notice('The export contains online records. Download this note separately to keep your unsaved draft too.');
  }catch{notice('The export could not finish. Your saved records are unchanged. Please try again online.');}
  finally{if(session===generation)$('export').disabled=false;}
});
window.addEventListener('online',()=>{if(owner){notice();if($('note').disabled)loadNote();else save();}});
window.addEventListener('offline',()=>{if(pending())status('Offline · draft on this device');});
window.addEventListener('beforeunload',e=>{if(pending()||busy){stash();e.preventDefault();e.returnValue='';}});
fetch('/backup-health.json',{cache:'no-store'}).then(r=>r.ok?r.json():null).then(data=>{
  if(data?.configured)$('backup-status').textContent='Daily backups configured. Open the private backup folder to check the last successful snapshot.';
}).catch(()=>{});
