import {auth,isOwner,onAuthStateChanged,signIn,loadPlanner} from './planner-store.js';
import {loadAcademicCatalogue} from './academic-store.js';
import {submitAssessment} from './assessment-store.js';
import {markIcma} from '../curriculum/m100-block1-tasks.js';
const assessment=document.querySelector('[data-assessment]').dataset.assessment,form=document.getElementById('assessment-form'),button=document.getElementById('assessment-submit'),status=document.getElementById('submission-status'),history=document.getElementById('submission-history');
let user=null,enrolled=false,busy=false,attempt=null,generation=0;
const key=()=>`librauni-submission-${user.uid}-${assessment}`;
function controls(){button.disabled=busy||!user||!enrolled;for(const field of form.elements)if(field!==button)field.disabled=busy;}
async function refresh(){const uid=user.uid,g= generation;const [planner,catalogue]=await Promise.all([loadPlanner(uid),loadAcademicCatalogue(uid)]);if(g!==generation)return;enrolled=planner.data.plans['LU-M100']?.status==='enrolled';history.replaceChildren();for(const r of catalogue.register.filter(r=>r.category==='submissions'&&r.fields.assessment===assessment)){const p=document.createElement('p');p.textContent=`${r.fields.archiveRecordedAt} · Receipt ${r.id} · ${r.fields.status}`;history.append(p);}if(!history.children.length)history.textContent='No submitted attempts.';status.textContent=enrolled?'Ready to submit. Your files are saved only when you press Submit.':'Enrol in M100 through the module planner before submitting.';controls();}
onAuthStateChanged(auth,u=>{generation++;user=isOwner(u)?u:null;enrolled=false;attempt=null;history.replaceChildren();document.getElementById('assessment-feedback').replaceChildren();status.textContent=user?'Checking enrolment…':'Sign in with your LibraUni account to submit.';controls();if(user)refresh().catch(e=>{status.textContent=e.message;});});
document.getElementById('assessment-auth').onclick=()=>signIn().catch(e=>{status.textContent=e.message;});
form.onsubmit=async event=>{event.preventDefault();if(busy||!user||!enrolled)return;const uid=user.uid,g=generation,k=key();const data=new FormData(form);busy=true;controls();try{
let files,marks;
 if(assessment.startsWith('icma')){const answers=Array.from({length:10},(_,i)=>String(data.get('q'+i)||''));marks=markIcma(answers,assessment);files=[new File([JSON.stringify({assessment:assessment.toUpperCase(),version:1,answers},null,2)],'M100-'+assessment+'-responses.json',{type:'application/json'})];}
 else files=[...document.getElementById('submission-files').files];
 attempt=attempt||localStorage.getItem(k)||crypto.randomUUID();localStorage.setItem(k,attempt);status.textContent='Saving originals and verifying your private receipt…';
 const receipt=await submitAssessment(uid,attempt,assessment,files,String(data.get('assistance')||''));if(g!==generation)return;localStorage.removeItem(k);attempt=null;
 await refresh();status.textContent=`Submitted and verified · ${receipt.submittedAt} · Receipt ${receipt.id}. Your originals are included in full student-record proofs.`;
 if(marks){const box=document.getElementById('assessment-feedback');box.replaceChildren();const h=document.createElement('h2');h.textContent=`Computer feedback: ${marks.reduce((n,r)=>n+r.marks,0)}/100`;box.append(h);for(const row of marks){const p=document.createElement('p');p.textContent=`Q${row.question}: ${row.marks}/10. ${row.feedback}`;box.append(p);}const p=document.createElement('p');p.textContent='Your submitted responses are retained. Tutor review and any linked assessed result will be added to your academic record separately.';box.append(p);}
 }catch(e){status.textContent='Not confirmed: '+e.message+' Keep the same files and retry; earlier attempts are never overwritten.';}finally{busy=false;controls();}};
