import {modules} from '../curriculum/schedules.js';
import {schedule,newPlan,validatePlan,validateStore,previewScheduleUpdate,warnings,shiftRemaining,combined,today,addDays,dateValue,eventState,DAY} from './schedule.js';
import {auth,onAuthStateChanged,signIn,logOut,isOwner,loadPlanner,savePlanner} from './planner-store.js';
import './planner.css';
const root=document.querySelector('[data-planner]');
const module=modules.find(m=>m.code===root.dataset.planner);
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=s=>s?new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(dateValue(s))):'';
let data={schemaVersion:1,plans:{}},revision=0,user=null,loaded=false,authReady=false,dirty=false,saving=false,blocked=false,session=0,timer,month='',showPlanned=false,expanded=new Set();
const draftKey=uid=>'librauni:planner:'+uid;
root.innerHTML=`<div class="planner-heading"><div><p class="eyebrow">YOUR STUDY TIMETABLE</p><h2>${module?'Module planner':'Degree calendar'}</h2></div><button id="planner-auth">Sign in with GitHub</button></div><p id="planner-status" role="status">Sign in to save your personal timetable privately.</p><p id="planner-message" role="alert" hidden></p><div class="planner-tools"><button id="planner-migrate" hidden>Accept combined EMA timetable</button><button id="planner-retry" hidden>Retry saving</button><button id="planner-load" hidden>Load saved timetable</button><button id="planner-download">Download timetable data</button></div><div id="planner-content"></div>`;
const $=id=>document.getElementById(id);
function message(s=''){ $('planner-message').textContent=s;$('planner-message').hidden=!s; }
function status(s){$('planner-status').textContent=s;}
function stash(){if(user&&loaded&&dirty)try{localStorage.setItem(draftKey(user.uid),JSON.stringify({revision,data}));}catch{message('This browser cannot retain a draft. Download your timetable or keep the page open until saved online.');}}
function mark(){dirty=true;stash();status(user?'Changes pending · saving privately…':'Preview only · sign in before creating a saved plan.');render();clearTimeout(timer);if(user&&loaded&&!blocked)timer=setTimeout(save,600);}
async function save(){
 if(!user||!loaded||!dirty||saving||blocked)return;
 const uid=user.uid,s=session,body=structuredClone(data),base=revision;saving=true;
 $('planner-retry').hidden=true;status('Saving timetable…');
 try{validateStore(body,modules);const next=await savePlanner(uid,body,base);if(s!==session)return;revision=next;
 dirty=JSON.stringify(body)!==JSON.stringify(data);
 if(!dirty){try{localStorage.removeItem(draftKey(uid));}catch{}status('Saved online · private timetable');}else{stash();timer=setTimeout(save,200);}
 }catch(err){if(s!==session)return;
 if(err.message==='PLANNER_CONFLICT'){blocked=true;message('A newer timetable was saved elsewhere. Download this draft before loading the saved version and reconciling your changes.');$('planner-load').hidden=false;}
 else{message('Could not save online. Your draft is retained on this device if browser storage is available. Retry or download it.');$('planner-retry').hidden=false;}
 status('Not saved online');
 }finally{saving=false;}
}
async function load(){
 if(!user)return;const s=session;loaded=false;render();status('Loading private timetable…');
 try{const result=await loadPlanner(user.uid);if(s!==session)return;const updated=previewScheduleUpdate(result.data,modules);
 if(updated){
  let draft=null;try{draft=JSON.parse(localStorage.getItem(draftKey(user.uid))||'null');}catch{}
  data=draft?previewScheduleUpdate(draft.data,modules)||validateStore(draft.data,modules):updated;
  revision=result.revision;dirty=!!draft;blocked=true;loaded=true;
  if(draft&&draft.revision!==revision){message('A local draft and the online timetable differ. Download this draft before loading the saved timetable for review.');status('Changes need review');$('planner-load').hidden=false;render();return;}
  message('Timetable update preview: the notebook EMA and separate examination become one 18-hour EMA. Other dates and weekly hours stay unchanged. If you adjusted either old item, the new EMA spans both adjusted windows and uses the later deadline. Your saved timetable is unchanged until you accept.');
  status('Review timetable update · not saved');$('planner-migrate').hidden=false;render();openHash();return;
 }
 validateStore(result.data,modules);data=result.data;revision=result.revision;dirty=false;blocked=false;
 let draft;try{draft=JSON.parse(localStorage.getItem(draftKey(user.uid))||'null');}catch{}
 if(draft&&JSON.stringify(draft.data)!==JSON.stringify(data)){validateStore(draft.data,modules);data=draft.data;dirty=true;blocked=draft.revision!==revision;}
 loaded=true;status(dirty?'Recovered a local draft':'Saved timetable loaded · private');
 if(blocked){message('Your draft and the online timetable differ. Download the draft before loading the saved version.');$('planner-load').hidden=false;}
 else if(dirty)timer=setTimeout(save,400);
 month='';render();openHash();
 }catch(err){if(s!==session)return;blocked=true;message('Cannot load the saved timetable: '+err.message+' Your online records have not been changed.');status('Timetable unavailable');$('planner-load').hidden=false;}
}
function contentLinks(r){return `${r.outline?`<a href="${e(r.path+r.outline)}">Unit outline</a> · `:''}${r.available&&r.href?`<a href="${e(r.href)}">Open ${r.type==='unit'?'study materials':'assessment'}</a>`:'<span>Materials not yet published</span>'}${(r.resources||[]).filter(x=>x.available).map(x=>` · <a href="${e(x.href)}">${e(x.title)}</a>`).join('')}`;}
function range(r){return r.start?`${fmt(r.start)} – ${fmt(r.end)}`:`Week ${r.startWeek}${r.endWeek!==r.startWeek?'–'+r.endWeek:''}`;}
function download(){const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='librauni-timetable.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function calendar(rows){
 const dated=rows.filter(r=>r.start);
 if(!dated.length)return '<p>Select a start date to see calendar dates. The undated study sequence remains below.</p>';
 if(!month){const now=today();month=(dated.some(r=>r.start<=now&&r.end>=now)?now:dated.reduce((s,r)=>r.start<s?r.start:s,dated[0].start)).slice(0,7);}
 const first=month+'-01',d=new Date(dateValue(first)),last=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).toISOString().slice(0,10),offset=(d.getUTCDay()+6)%7;
 const shown=dated.filter(r=>r.start<=last&&r.end>=first);
 const cells=Array.from({length:offset},()=>'<div class="calendar-empty" aria-hidden="true"></div>');
 for(let n=1;n<=Number(last.slice(-2));n++){
 const day=month+'-'+String(n).padStart(2,'0');
 const items=shown.filter(r=>r.type==='unit'?r.start===day||r.end===day:r.end===day);
 cells.push(`<div class="calendar-day${day===today()?' is-today':''}"><time datetime="${day}">${n}</time>${items.map(r=>`<a class="calendar-event ${r.type==='unit'?'':'assessment-event'}" href="${e(module?'#plan-'+r.id:r.path+'#plan-'+r.id)}">${e(!module?r.module+' · ':'')}${e(r.type==='unit'?r.id+(r.start===day?' starts':' ends'):r.title)}</a>`).join('')}</div>`);
 }
 return `<div class="calendar-head"><button data-month="-1" aria-label="Previous month">←</button><h3>${e(new Intl.DateTimeFormat('en-GB',{month:'long',year:'numeric',timeZone:'UTC'}).format(d))}</h3><button data-month="1" aria-label="Next month">→</button><button data-current>Today</button></div><p class="small">Unit starts and finishes, assessment due dates and study milestones. Dates are all-day targets in your local calendar. The agenda below includes work spanning this month.</p><div class="calendar-grid">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(s=>`<div class="calendar-weekday">${s}</div>`).join('')}${cells.join('')}</div><ul class="calendar-agenda">${shown.map(r=>`<li><a href="${e(module?'#plan-'+r.id:r.path+'#plan-'+r.id)}">${e(!module?r.module+' · ':'')}${e(r.title)}</a><span>${e(range(r))}</span></li>`).join('')||'<li>No scheduled work this month.</li>'}</ul>`;
}
function render(){
 const edit=authReady&&((!auth.currentUser)||(!!user&&loaded&&!blocked));
 const plan=module?data.plans[module.code]:null;
 const rows=module?schedule(module,plan):combined(modules,data.plans,showPlanned);
 $('planner-content').innerHTML=module?`
 <p>${e(module.durationNote)} <a href="${e(module.durationSource)}">OU reference</a>.</p>
 <p><a href="/programme/#degree-calendar">Degree calendar →</a></p><p><strong>${module.weeks} study weeks · ${module.credits*10} hours · ${module.credits*10/module.weeks} hours/week on average.</strong> Workload varies by week. Your original timetable remains visible after personal changes.</p>
 <form id="plan-start" class="planner-form"><label>Module start date<input name="start" type="date" ${!edit?'disabled':''} required min="2000-01-01" max="2199-01-01" value="${e(plan?.start||'')}"></label><button ${!edit?'disabled':''}>${plan?'Update start date':user?'Save planned start':'Preview dates'}</button></form>
 <p class="small">${plan?`${plan.status==='enrolled'?'Enrolled':'Planning only · not enrolled'}. Target finish: ${fmt(rows.reduce((a,r)=>r.end>a?r.end:a,plan.start))}.`:'No start date or enrolment has been set.'} ${module.enrollable?'':'This module is still under review; enrolment is not open.'}</p>
 ${plan&&module.enrollable&&plan.status==='planned'?`<button id="plan-enrol" ${!edit||!user?'disabled':''}>Enrol in this module</button>`:''}
 ${plan?`<details><summary>Adjust your timetable</summary><p>Change one item in the study list, or move all unfinished work from a date. Negative days bring it forward. A shift crossing a unit extends or shortens its study window; completed units stay unchanged.</p><form id="plan-shift" class="planner-form"><label>From date<input name="from" type="date" value="${today()}" required></label><label>Move by days<input name="days" type="number" min="-365" max="365" value="7" required></label><button ${!edit?'disabled':''}>Move remaining work</button></form><button id="plan-reset" ${!edit?'disabled':''}>Restore original dates</button></details>`:''}
 ${plan&&warnings(module,plan).length?`<div class="planner-warning"><strong>Check preparation order</strong><ul>${warnings(module,plan).map(w=>`<li>${e(w)}</li>`).join('')}</ul><p>The requested dates remain in the plan; check the save status above. These warnings remain until the study order is reconciled.</p></div>`:''}
 <p>${plan?(today()<plan.start?'Starts '+fmt(plan.start)+' · ':today()>addDays(plan.start,module.weeks*7-1)?'Original presentation ended · ':`Reference week ${Math.floor((dateValue(today())-dateValue(plan.start))/DAY/7)+1} of ${module.weeks} · `):''}${rows.filter(r=>r.type==='unit'&&r.completed).length} / ${module.events.filter(r=>r.type==='unit').length} units marked studied. This is self-reported activity, not assessed mastery.</p>
 ${calendar(rows)}
 <h3>Study sequence & assessment deadlines</h3><div class="planner-tools"><button data-expand="yes">Expand all</button><button data-expand="no">Hide all</button></div>
 <div class="study-sequence">${rows.map(r=>`<details class="study-item ${r.type==='unit'?'':'assessment-item'}" id="plan-${e(r.id)}" ${expanded.has(r.id)?'open':''}><summary><span class="eyebrow">${e(r.type==='unit'?r.id:r.type)} · reference week ${r.startWeek}${r.endWeek!==r.startWeek?'–'+r.endWeek:''}</span><strong>${e(r.title)}</strong><span>${e(range(r))} · ${r.hours} h${r.includedInUnitHours?' (already in unit budget)':''}</span><span class="small">${e(eventState(r))}${r.start&&!r.available?' · materials pending':''}</span></summary><div class="study-item-body"><p>${e(r.description)}</p><p><strong>Prepare first:</strong> ${(r.requires||[]).map(id=>`<a href="#plan-${e(id)}">${e(id)}</a>`).join(', ')||'No earlier units required.'}</p><p>${contentLinks(r)}</p>${plan?`<p class="small">Original dates: ${fmt(r.baselineStart)} – ${fmt(r.baselineEnd)}${r.start!==r.baselineStart||r.end!==r.baselineEnd?' · personally adjusted':''}</p><form class="planner-form event-dates" data-event="${e(r.id)}"><label>${r.type==='unit'?'Study from':'Work from'}<input type="date" name="start" value="${r.start}" required></label><label>${r.type==='unit'?'Finish by':'Due by'}<input type="date" name="end" value="${r.end}" required></label><button ${!edit?'disabled':''}>Save dates</button></form>`:''}${r.type==='unit'?`<label><input type="checkbox" data-complete="${e(r.id)}" ${r.completed?'checked':''} ${!edit||!r.available||plan?.status!=='enrolled'?'disabled':''}> Mark unit studied</label>`:''}</div></details>`).join('')}</div>
 <details><summary>Weekly workload · original timetable</summary><ul>${Array.from({length:module.weeks},(_,i)=>{const w=i+1,h=module.events.filter(r=>r.startWeek<=w&&r.endWeek>=w&&!r.includedInUnitHours).reduce((s,r)=>s+(r.weeklyHours?.[w]??r.hours/(r.endWeek-r.startWeek+1)),0);return `<li>Week ${w}: approximately ${h.toFixed(1)} hours</li>`;}).join('')}</ul><p>Uses explicit weekly allocations where specified, otherwise an even distribution within each work window for planning. These are LibraUni estimates, not verified OU week-by-week hours; assessment peaks are retained and not reduced to fit personal availability. Personal changes may concentrate work; the total stays ${module.credits*10} hours.</p></details>
 `:`<p>All enrolled modules share this calendar. Unit study windows and assessment dates link back to the module planner.</p><label><input id="show-planned" type="checkbox" ${showPlanned?'checked':''}> Include planned modules (not yet enrolled)</label><p>${modules.filter(m=>data.plans[m.code]?.status==='enrolled').length} enrolled modules. ${modules.filter(m=>data.plans[m.code]?.status==='planned').length} saved plans.</p>${rows.length?calendar(rows):'<p>No enrolled module dates to show yet. A saved draft plan appears when you select “Include planned modules”.</p>'}<ul>${modules.map(m=>`<li><a href="${m.path}#study-planner">${e(m.code+' · '+m.title)}</a>${data.plans[m.code]?` · ${e(data.plans[m.code].status)} · ${fmt(data.plans[m.code].start)}`:' · no personal dates yet'}</li>`).join('')}</ul><p class="small">The calendar reads the same private dates as each module. Refresh this page to load changes saved in another tab.</p>`;
 bind(edit);
}
function change(action){const previous=structuredClone(data);try{if(action()===false)return;validateStore(data,modules);message();mark();}catch(err){data=previous;message(err.message);}}
function bind(edit){
 $('plan-start')?.addEventListener('submit',ev=>{ev.preventDefault();const start=new FormData(ev.target).get('start');change(()=>{const old=data.plans[module.code];if(old&&Object.keys(old.overrides).length&&!confirm('Changing the start date rebuilds the timetable and removes your date overrides. Continue?'))return false;const next=newPlan(module,start);if(old){next.status=old.status;next.completed=old.completed;}data.plans[module.code]=next;month='';});});
 $('plan-shift')?.addEventListener('submit',ev=>{ev.preventDefault();if(!edit)return;const f=new FormData(ev.target);change(()=>{data.plans[module.code]=shiftRemaining(module,data.plans[module.code],f.get('from'),Number(f.get('days')));});});
 $('plan-reset')?.addEventListener('click',()=>{if(edit&&confirm('Restore the original timetable dates? Your study completion stays unchanged.'))change(()=>{data.plans[module.code].overrides={};});});
 $('plan-enrol')?.addEventListener('click',()=>{if(edit&&user&&confirm('Enrol with this start date and assessment timetable?'))change(()=>{data.plans[module.code].status='enrolled';});});
 root.querySelectorAll('.event-dates').forEach(form=>form.addEventListener('submit',ev=>{ev.preventDefault();if(!edit)return;const f=new FormData(form);change(()=>{const next=structuredClone(data.plans[module.code]);next.overrides[form.dataset.event]={start:f.get('start'),end:f.get('end')};validatePlan(module,next);data.plans[module.code]=next;});}));
 root.querySelectorAll('[data-complete]').forEach(input=>input.addEventListener('change',()=>{if(!edit)return;change(()=>{const p=data.plans[module.code];p.completed=p.completed.filter(x=>x!==input.dataset.complete);if(input.checked)p.completed.push(input.dataset.complete);});}));
 root.querySelectorAll('.study-item').forEach(d=>d.addEventListener('toggle',()=>{const id=d.id.slice(5);if(d.open)expanded.add(id);else expanded.delete(id);}));
 root.querySelectorAll('[data-expand]').forEach(b=>b.addEventListener('click',()=>{root.querySelectorAll('.study-item').forEach(d=>{d.open=b.dataset.expand==='yes';});}));
 root.querySelectorAll('[data-month]').forEach(b=>b.addEventListener('click',()=>{const d=new Date(dateValue(month+'-01'));d.setUTCMonth(d.getUTCMonth()+Number(b.dataset.month));month=d.toISOString().slice(0,7);render();}));
 root.querySelector('[data-current]')?.addEventListener('click',()=>{month=today().slice(0,7);render();});
 $('show-planned')?.addEventListener('change',ev=>{showPlanned=ev.target.checked;month='';render();});
}
$('planner-auth').addEventListener('click',async()=>{try{if(auth.currentUser){if(dirty||saving){message('Save or download your timetable changes before signing out.');return;}await logOut();}else await signIn();}catch(err){message('Sign-in could not finish. '+(err.code||err.message));}});
$('planner-retry').addEventListener('click',save);
$('planner-migrate').addEventListener('click',()=>{if(user&&loaded&&blocked){blocked=false;$('planner-migrate').hidden=true;message();mark();}});
$('planner-load').addEventListener('click',()=>{if(!dirty||confirm('Replace this draft with the online timetable? Download this draft first to keep it.')){try{localStorage.removeItem(draftKey(user.uid));}catch{}message();$('planner-load').hidden=true;load();}});
$('planner-download').addEventListener('click',download);
onAuthStateChanged(auth,async u=>{authReady=true;session++;clearTimeout(timer);user=null;loaded=false;blocked=false;dirty=false;data={schemaVersion:1,plans:{}};expanded.clear();$('planner-auth').textContent=u?'Sign out':'Sign in with GitHub';message();$('planner-load').hidden=true;$('planner-retry').hidden=true;$('planner-migrate').hidden=true;render();if(!u){status('Sign in to save your personal timetable privately. Dates entered while signed out are a temporary preview and reset on sign-in or reload.');return;}if(!isOwner(u)){status('This account does not have access to the private planner.');return;}user=u;await load();});
window.addEventListener('beforeunload',ev=>{if(user&&(dirty||saving)){stash();ev.preventDefault();ev.returnValue='';}});
window.addEventListener('online',()=>{if(user&&loaded&&!blocked)save();});
function openHash(){const id=location.hash.slice(1);if(id.startsWith('plan-')){const el=document.getElementById(id);if(el){el.open=true;el.scrollIntoView({block:'start'});}}}
window.addEventListener('hashchange',openHash);
render();openHash();
