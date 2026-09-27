import {auth,db,onAuthStateChanged,isOwner,logOut} from './planner-store.js';
import {doc,onSnapshot} from 'firebase/firestore';
import {readProfile,clearLegacyProfileDrafts} from './profile-data.js';

try{clearLegacyProfileDrafts(localStorage);}catch{}
const actions=document.querySelector('.header-actions');
if(actions){
 const link=document.createElement('a');
 link.className='header-profile';
 link.href='/profile/';
 link.hidden=true;
 const existingAuth=actions.querySelector('#auth-button, #profile-auth, #journal-auth, #evidence-auth');
 const authButton=existingAuth||document.createElement('button');
 if(!existingAuth){
  authButton.type='button';
  authButton.textContent='Sign out';
  authButton.addEventListener('click',()=>logOut().catch(()=>alert('Could not sign out. Please try again.')));
 }
 const account=document.createElement('span');
 account.className='header-account';
 account.append(link,authButton);
 actions.append(account);
 const theme=actions.querySelector('#theme-toggle');
 if(theme)actions.append(theme);
 const showPhoto=location.pathname==='/'||location.pathname==='/index.html';
 function paintProfile(profile){
  const name=profile?.name?.trim()||'';
  link.replaceChildren();
  if(showPhoto&&profile?.photo){
   const portrait=document.createElement('img');
   portrait.className='header-portrait';portrait.src=profile.photo;
   portrait.alt='';portrait.width=36;portrait.height=36;
   link.append(portrait);
  }
  const label=document.createElement('span');label.textContent=name||'My profile';link.append(label);
  link.setAttribute('aria-label',name?name+' · My profile':'My profile');
 }
 let unsubscribe;
 onAuthStateChanged(auth,user=>{
  unsubscribe?.();unsubscribe=null;
  link.hidden=!user;
  paintProfile(null);
  authButton.hidden=!user&&!existingAuth;
  authButton.classList.toggle('header-signout',!!user);
  if(!user||!isOwner(user))return;
  unsubscribe=onSnapshot(doc(db,'users',user.uid,'profile','main'),snapshot=>{
   if(auth.currentUser?.uid!==user.uid)return;
   try{
    const profile=snapshot.exists()?readProfile(snapshot.data().data??JSON.parse(snapshot.data().payload)):null;
    paintProfile(profile);
   }catch{paintProfile(null);}
  },()=>{ /* Keep the profile link usable when the private name is unavailable. */ });
 });
}
