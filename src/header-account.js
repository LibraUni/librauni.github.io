import {guestWelcomeTarget} from './guest-welcome.js';
import {auth,db,onAuthStateChanged,isOwner,logOut,signIn} from './planner-store.js';
import {doc,onSnapshot} from 'firebase/firestore';
import {readProfile,clearLegacyProfileDrafts} from './profile-data.js';

try{clearLegacyProfileDrafts(localStorage);}catch{}
const actions=document.querySelector('.header-actions');
if(actions){
 // A header destination should not link back to the page already open.
 const currentPath=location.pathname.replace(/index\.html$/,'').replace(/\/$/,'')||'/';
 for(const destination of actions.querySelectorAll('a[href]')){
  const url=new URL(destination.href,location.href);
  if(url.origin===location.origin&&(url.pathname.replace(/index\.html$/,'').replace(/\/$/,'')||'/')===currentPath&&!url.hash)destination.remove();
 }
 const link=document.createElement('a');
 link.className='header-profile';
 link.href='/profile/';
 link.hidden=true;
 const existingAuth=actions.querySelector('#auth-button, #profile-auth, #journal-auth, #evidence-auth');
 const authButton=existingAuth||document.createElement('button');
 if(!existingAuth){
  authButton.type='button';
  authButton.textContent='Checking sign-in…';
  authButton.disabled=true;
  authButton.addEventListener('click',async()=>{
   authButton.disabled=true;
   try{await (auth.currentUser?logOut():signIn());}
   catch{alert(auth.currentUser?'Could not sign out. Please try again.':'Could not sign in. Please allow the sign-in window and try again.');}
   finally{authButton.disabled=false;}
  });
 }
 const account=document.createElement('span');
 account.className='header-account';
 const menu=document.createElement('details');
 menu.className='header-account-menu';
 const summary=document.createElement('summary');
 summary.className='header-profile';
 summary.setAttribute('aria-label','Account menu');
 const options=document.createElement('div');
 options.className='header-account-options';
 link.textContent='My profile';
 options.append(link);
 menu.append(summary,options);
 menu.hidden=true;
 account.append(menu,authButton);
 document.addEventListener('click',event=>{if(!menu.contains(event.target))menu.open=false;});
 menu.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.open=false;summary.focus();}});
 actions.append(account);
 const theme=actions.querySelector('#theme-toggle, #theme');
 if(theme)actions.append(theme);
 function paintProfile(profile){
  const name=profile?.name?.trim()||auth.currentUser?.displayName?.trim()||'My profile';
  const greeting=document.getElementById('home-greeting');
  if(greeting){
   const owner=isOwner(auth.currentUser);
   greeting.textContent=owner?(name==='My profile'?'Welcome back.':`Welcome back, ${name}.`):'Your daily cup of science.';
   document.getElementById('home-introduction').textContent=owner?'A little time, a good question. Choose your next lesson and pick up your learning.':'Explore physics, follow a question, and build your understanding at your own pace. The learning materials are open to everyone.';
   const secondary=document.getElementById('home-secondary');
   secondary.href=owner?'/journal/':'/enjoy/';
   secondary.textContent=owner?'Open Academic Journal':'Discover the full experience';
  }
  summary.replaceChildren();
  if(profile?.photo){
   const portrait=document.createElement('img');
   portrait.className='header-portrait';portrait.src=profile.photo;
   portrait.alt='';portrait.width=36;portrait.height=36;
   summary.append(portrait);
  }
  const label=document.createElement('span');label.textContent=name||'My profile';summary.append(label);
  summary.setAttribute('aria-label',name+' · Account menu');
 }
 let unsubscribe;
 onAuthStateChanged(auth,user=>{
  unsubscribe?.();unsubscribe=null;
  const owner=isOwner(user);
  let session;
  try{session=sessionStorage;}catch{}
  const target=guestWelcomeTarget(user,owner,location.pathname,session);
  if(target){location.replace(target);return;}
  const guestNotice=document.getElementById('guest-welcome');
  if(guestNotice)guestNotice.hidden=!user||owner;
  link.hidden=!user;
  link.href=owner?'/profile/':'/enjoy/';
  link.textContent=owner?'My profile':'Enjoy the full experience';
  paintProfile(null);
  menu.hidden=!user;
  menu.open=false;
  if(user)options.append(authButton);else account.append(authButton);
  authButton.hidden=false;
  authButton.disabled=false;
  authButton.textContent=user?'Sign out':'Sign in with GitHub';
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
