import {auth,db,onAuthStateChanged,isOwner} from './planner-store.js';
import {doc,onSnapshot} from 'firebase/firestore';
import {readProfile} from './profile-data.js';

const actions=document.querySelector('.header-actions');
if(actions){
 const link=document.createElement('a');
 link.className='header-profile';
 link.href='/profile/';
 link.hidden=true;
 actions.append(link);
 const authButton=actions.querySelector('#auth-button, #profile-auth, #journal-auth, #evidence-auth');
 const originalPosition=authButton?document.createComment('Account control'):null;
 if(authButton)authButton.before(originalPosition);
 const accountActions=document.createElement('div');
 accountActions.className='account-actions';
 accountActions.hidden=true;
 const main=document.querySelector('main');
 if(authButton)main.insertBefore(accountActions,main.querySelector('footer'));
 let unsubscribe;
 onAuthStateChanged(auth,user=>{
  unsubscribe?.();unsubscribe=null;
  link.hidden=!user;
  link.textContent='My profile';
  link.setAttribute('aria-label','My profile');
  if(authButton){
   accountActions.hidden=!user;
   if(user)accountActions.append(authButton);
   else originalPosition.after(authButton);
  }
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
