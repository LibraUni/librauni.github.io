import {auth,db,isOwner,onAuthStateChanged,signIn,savePlanner} from './planner-store.js';
import {doc,onSnapshot} from 'firebase/firestore';
import {modules} from '../curriculum/schedules.js';
import {validateStore,today} from './schedule.js';
import {studyNodes,leaves,ready,studied,setStudied} from './study-tree.js';
import {studyOverview} from './study-dashboard.js';
import './study.css';
import {moduleLabel} from './module-label.js';
const dashboard=document.getElementById('study-overview');
const controls=[...document.querySelectorAll('[data-study-id]')];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const format=s=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(s+'T00:00:00Z'));
let user=null,data=null,revision=0,unsubscribe,epoch=0,busy=false,message='Sign in to see your private study progress.';
function render(){
 const plan=data?.plans['LU-M100'];
 for(const el of controls){
  const id=el.dataset.studyId,node=studyNodes.find(n=>n.id===id);if(!node)continue;
  const available=ready(id),done=studied(id,plan),count=leaves(id).filter(n=>(plan?.studied||[]).includes(n.id)).length;
  el.checked=done;el.indeterminate=!done&&count>0;
  el.disabled=!user||!data||busy||!available||plan?.status!=='enrolled';
  el.setAttribute('aria-label',`${node.title}: completed`);
  el.title=!available?'Further material forthcoming':!user?'Sign in at your Study desk':!data?message:plan?.status!=='enrolled'?'Enrol to save progress':busy?'Saving…':done?'Completed — untick to undo':'Mark completed';
  el.onclick=event=>event.stopPropagation();
  el.onchange=async()=>{
   if(!user||!data||busy){render();return;}
   const token=epoch,next=structuredClone(data);next.plans['LU-M100']=setStudied(plan,id,!done);validateStore(next,modules);
   busy=true;message='Saving privately…';render();
   try{const saved=await savePlanner(user.uid,next,revision);if(token!==epoch)return;if(revision<=saved){data=next;revision=saved;}message='Saved online · self-reported study, not assessed mastery.';}
   catch(err){if(token!==epoch)return;message=err.message==='PLANNER_CONFLICT'?'The timetable changed in another tab. Review the refreshed progress, then try again.':'Not saved. Your completion mark was not confirmed; reconnect and try again.';alert(message);}
   finally{if(token===epoch){busy=false;render();}}
  };
 }
 if(!dashboard)return;
 if(!data){dashboard.innerHTML=`<p>${esc(message)}</p>${!user?'<button id="study-sign-in">Sign in with GitHub</button>':''}<p><a href="/learn/">Browse learning materials</a></p>`;dashboard.querySelector('button')?.addEventListener('click',()=>signIn().catch(()=>{message='Sign-in could not finish. Try the sign-in button at the top of this page.';render();}));return;}
 const view=studyOverview(modules,data.plans,today());
 const labels={'behind':'Behind schedule','ahead':'Ahead of schedule','on-track':'On schedule','upcoming':'Upcoming','complete':'All units marked studied'};
 dashboard.innerHTML=`${view.next.length?view.next.map(({module:m,row,state})=>`<article class="study-next"><h2>${esc(moduleLabel(m.code)+' · '+m.title)}</h2>${row?`<p class="study-state ${state}" title="${labels[state]}" aria-label="${esc(labels[state]+': '+row.id+' · '+row.title+', '+format(row.start)+' – '+format(row.end))}"><strong>Next unfinished unit: ${esc(row.id+' · '+row.title)}</strong><br>${format(row.start)} – ${format(row.end)}</p><p><a href="${esc(m.path)}#plan-${esc(row.id)}">Open unit in planner</a>${(row.resources||[]).filter(r=>r.available).map(r=>` · <a href="${esc(r.href)}">${esc(r.title)}</a>`).join('')}</p>`:'<p>All units completed.</p>'}</article>`).join(''):'<p>No enrolled modules yet. <a href="/programme/bridge/lu-m100/#study-planner">Plan your start and enrol in M100</a>.</p>'}<h3>Assessments due in the next 30 days</h3>${view.assessments.length?`<ul>${view.assessments.map(r=>`<li><a href="${esc(r.path)}#plan-${esc(r.id)}">${esc(moduleLabel(r.module)+' · '+r.title)}</a> · ${format(r.end)}${!r.available?' · materials forthcoming':''}</li>`).join('')}</ul>`:'<p>No scheduled assessment deadlines in this window.</p>'}<p><a href="/programme/#degree-calendar">Degree calendar</a> · <a href="/learn/">Teaching materials</a></p>`;
 const count=document.getElementById('completed');if(count)count.textContent=studyNodes.filter(n=>n.kind==='lesson'&&studied(n.id,plan)).length+' / '+studyNodes.filter(n=>n.kind==='lesson'&&ready(n.id)).length+' available';
}
onAuthStateChanged(auth,u=>{
 epoch++;unsubscribe?.();data=null;busy=false;user=isOwner(u)?u:null;message=user?'Loading your private timetable…':u?'This workspace is private to its owner.':'Sign in to see your private study progress.';render();
 if(!user)return;const token=epoch;
 unsubscribe=onSnapshot(doc(db,'users',user.uid,'planner','main'),{includeMetadataChanges:true},snap=>{
  if(token!==epoch)return;
  if(snap.metadata.fromCache){data=null;message='Connecting to your saved timetable…';render();return;}
  try{data=snap.exists()?validateStore(JSON.parse(snap.data().payload),modules):{schemaVersion:2,plans:{},retiredPlans:[]};revision=snap.exists()?snap.data().revision:0;message='Saved online · private timetable and study progress.';render();}
  catch{data=null;message='Your timetable needs review. Open the module planner before changing progress.';render();}
 },()=>{data=null;message='Cannot load your private timetable. Reconnect and refresh; saved records are unchanged.';render();});
});
window.addEventListener('focus',render);
