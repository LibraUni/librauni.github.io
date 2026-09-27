import {auth,db,onAuthStateChanged,isOwner,logOut} from './planner-store.js';
import {doc,onSnapshot} from 'firebase/firestore';
import {readProfile} from './profile-data.js';

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
 let unsubscribe;
 onAuthStateChanged(auth,user=>{
  unsubscribe?.();unsubscribe=null;
  link.hidden=!user;
  link.textContent='My profile';
  link.setAttribute('aria-label','My profile');
  authButton.hidden=!user&&!existingAuth;
  authButton.classList.toggle('header-signout',!!user);
  if(!user||!isOwner(user))return;
  unsubscribe=onSnapshot(doc(db,'users',user.uid,'profile','main'),snapshot=>{
   if(auth.currentUser?.uid!==user.uid)return;
   try{
    const name=snapshot.exists()?readProfile(JSON.parse(snapshot.data().payload)).name.trim():'';
    link.textContent=name||'My profile';
    link.setAttribute('aria-label',name?name+' · My profile':'My profile');
   }catch{
    link.textContent='My profile';
    link.setAttribute('aria-label','My profile');
   }
  },()=>{ /* Keep the profile link usable when the private name is unavailable. */ });
 });
}
