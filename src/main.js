import './study-reset.js';
import {auth,onAuthStateChanged,signIn,logOut,isOwner} from './planner-store.js';
const $ = id => document.getElementById(id);
function notice(text='') { $('notice').textContent=text; $('notice').hidden=!text; }
$('auth-button').addEventListener('click',async()=>{
  notice();
  try{
    if(auth.currentUser){await logOut();}
    else { await signIn(); }
  }catch(e){
    const messages={'auth/popup-closed-by-user':'Sign-in was cancelled. You can try again.','auth/popup-blocked':'Your browser blocked the sign-in window. Allow popups for LibraUni, then try again.','auth/unauthorized-domain':'This website address needs to be authorised for sign-in.','auth/operation-not-allowed':'GitHub sign-in needs to be enabled in the project settings.','auth/invalid-credential':'The GitHub connection could not be verified. Its configuration needs checking.'};
    notice((messages[e.code]||'Sign-in could not finish. Please share the error code with your tutor.')+' ('+(e.code||'unknown-error')+')');
  }
});
onAuthStateChanged(auth,user=>{
  $('auth-button').textContent=user?'Sign out':'Sign in with GitHub';
  notice(user&&!isOwner(user)?'This account does not have access to this private workspace.':'');
});
