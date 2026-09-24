import {auth,onAuthStateChanged,signIn,logOut,isOwner} from './planner-store.js';
import {loadProfile,saveProfile} from './profile-store.js';
import {fields,emptyProfile,validateProfile,tutorBrief} from './profile-data.js';
import './profile.css';
const $=id=>document.getElementById(id);
let user=null,data=emptyProfile(),revision=0,loaded=false,dirty=false,busy=false,blocked=false,generation=0,timer;
const key=uid=>'librauni:profile:'+uid;
const status=s=>{$('profile-status').textContent=s;$('profile-save-status').textContent=s;};
function message(s=''){$('profile-message').textContent=s;$('profile-message').hidden=!s;}
function download(text,name,type){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function stash(){if(user&&loaded&&dirty)try{localStorage.setItem(key(user.uid),JSON.stringify({revision,data}));}catch{message('Your browser could not retain a draft. Download your profile or keep this page open until saved online.');}}
function paint(){for(const k of Object.keys(fields))$(k).value=data[k];$('personalisation').checked=data.personalisation;photo();}
function photo(){$('portrait').hidden=!data.photo;$('portrait-placeholder').hidden=!!data.photo;if(data.photo)$('portrait').src=data.photo;else $('portrait').removeAttribute('src');$('photo-remove').disabled=!data.photo;}
function changed(){try{validateProfile(data);}catch(e){message(e.message);return;}dirty=true;stash();status(blocked?'Changes need review':'Unsaved changes · saving shortly…');clearTimeout(timer);if(!blocked)timer=setTimeout(save,1100);}
async function save(){
 clearTimeout(timer);if(!user||!loaded||!dirty||busy||blocked)return;
 const uid=user.uid,s=generation,body=structuredClone(data),base=revision;busy=true;status('Saving profile…');
 try{const next=await saveProfile(uid,body,base);if(s!==generation)return;revision=next;dirty=JSON.stringify(body)!==JSON.stringify(data);
 if(dirty){stash();timer=setTimeout(save,400);}else{try{localStorage.removeItem(key(uid));}catch{}status('Saved online · private profile');message();}}
 catch(e){if(s!==generation)return;if(e.message==='PROFILE_CONFLICT'){blocked=true;message('A newer profile was saved elsewhere. Download this draft before loading the saved profile and combining your changes.');}else message('Could not save online. Your draft remains here; download a copy or retry when connected.');status('Not saved online');}
 finally{busy=false;}
}
async function load(){
 if(!user)return;const s=generation,uid=user.uid;$('profile-fields').disabled=true;loaded=false;status('Opening your private profile…');
 try{const result=await loadProfile(uid);if(s!==generation)return;data=result.data;revision=result.revision;blocked=false;dirty=false;
 let draft;try{draft=JSON.parse(localStorage.getItem(key(uid))||'null');}catch{}
 if(draft&&JSON.stringify(draft.data)!==JSON.stringify(data)){validateProfile(draft.data);data=draft.data;dirty=true;blocked=draft.revision!==revision;}
 loaded=true;$('profile-fields').disabled=false;paint();status(blocked?'Changes need review':dirty?'Recovered an unsaved draft':revision?'Saved profile loaded':'Ready · all fields are optional');
 if(blocked)message('Your local draft differs from a newer online profile. Download it before loading the saved version.');else if(dirty)timer=setTimeout(save,1100);
 }catch(e){if(s!==generation)return;status('Could not open profile');message('Your online profile is unchanged. Reconnect and use “Load saved profile” to retry. '+e.message);}
}
$('profile-auth').addEventListener('click',async()=>{try{if(auth.currentUser){if(dirty||busy){message('Save or download your changes before signing out.');return;}await logOut();}else await signIn();}catch(e){message('Sign-in could not finish. Allow the GitHub popup and try again. '+(e.code||''));}});
onAuthStateChanged(auth,async u=>{generation++;clearTimeout(timer);user=null;loaded=false;dirty=false;blocked=false;data=emptyProfile();paint();message();$('profile-auth').textContent=u?'Sign out':'Sign in with GitHub';$('private-profile').hidden=true;$('profile-fields').disabled=true;
 if(!u){status('Sign in to view and edit your private profile.');return;}if(!isOwner(u)){status('This account cannot access this private profile.');return;}
 user=u;$('private-profile').hidden=false;await load();});
for(const k of Object.keys(fields))$(k).addEventListener('input',()=>{if(!loaded)return;data[k]=$(k).value;changed();});
$('personalisation').addEventListener('change',()=>{data.personalisation=$('personalisation').checked;changed();});
$('profile-save').addEventListener('click',save);
$('profile-reload').addEventListener('click',async()=>{if(busy){message('Wait for the current save to finish.');return;}if(dirty&&!confirm('Replace this unsaved draft with the saved profile? Download the draft first if you want to keep it.'))return;if(user){localStorage.removeItem(key(user.uid));message();await load();}});
$('profile-export').addEventListener('click',()=>download(JSON.stringify(data,null,2),'librauni-profile.json','application/json'));
$('profile-brief').addEventListener('click',()=>download(tutorBrief(data),'librauni-tutor-profile.txt','text/plain'));
$('photo-remove').addEventListener('click',()=>{data.photo='';photo();changed();});
$('photo-file').addEventListener('change',async ev=>{
 const file=ev.target.files[0];if(!file)return;const s=generation;
 try{if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10000000)throw Error('Choose a JPEG, PNG or WebP photo under 10 MB.');
 const bitmap=await createImageBitmap(file);if(s!==generation){bitmap.close();return;}
 const canvas=document.createElement('canvas'),scale=Math.min(1,320/Math.max(bitmap.width,bitmap.height));canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));const ctx=canvas.getContext('2d');ctx.fillStyle='#f7f4ed';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
 const result=canvas.toDataURL('image/jpeg',.8);validateProfile({...data,photo:result});data.photo=result;photo();changed();
 }catch(e){message(e.message||'This photo could not be opened. Try a JPEG, PNG or WebP file.');}finally{ev.target.value='';}
});
window.addEventListener('online',()=>{if(user){if(!loaded)load();else save();}});
window.addEventListener('beforeunload',e=>{if(dirty||busy){stash();e.preventDefault();e.returnValue='';}});
