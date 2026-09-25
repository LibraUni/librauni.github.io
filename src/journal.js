import {auth,onAuthStateChanged,signIn,logOut,isOwner} from './planner-store.js';
import {loadRecords,appendEntries} from './journal-store.js';
import {categories,validateEntry,transcriptParts,timeline,filterEntries,readableJournal} from './journal-data.js';
import './profile.css';
import './journal.css';
const $=id=>document.getElementById(id);
let user=null,records={},entries=[],loaded=false,busy=false,generation=0,shown=50,pending=null,importPending=null;
const fields=['title','body','area','evidence','next','source','time','corrects','category'];
const draftKey=uid=>'librauni:academic-journal:'+uid;
function message(s=''){$('journal-error').textContent=s;$('journal-error').hidden=!s;}
function status(s){$('journal-status').textContent=s;}
function download(name,body,type='application/json'){const url=URL.createObjectURL(new Blob([body],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function draft(){return Object.fromEntries(fields.map(f=>[f,$('entry-'+f).value]));}
function stash(){if(!user)return;try{localStorage.setItem(draftKey(user.uid),JSON.stringify({fields:draft(),pending}));}catch{message('Draft storage unavailable. Download your draft before leaving.');}}
function dirty(){return !!($('entry-title').value||$('entry-body').value||$('entry-evidence').value||$('entry-next').value);}
function controls(){for(const id of ['refresh','export-readable','export-all','import-transcript'])$(id).disabled=busy||!loaded;$('entry-fields').disabled=busy||!user;}
function selected(){return filterEntries(entries,{category:$('filter-category').value,from:$('filter-from').value,to:$('filter-to').value,search:$('filter-search').value});}
function render(){
 let rows;try{rows=selected();}catch(e){message(e.message);return;}
 $('journal-count').textContent=`${rows.length} matching academic entries · ${entries.length} total. Downloads include every match, not only the visible entries.`;
 $('journal-list').replaceChildren();
 for(const row of rows.slice(0,shown)){
 const d=document.createElement('details'),s=document.createElement('summary');s.textContent=`${row.occurredAt||row.recordedAt||'Time unknown'} · ${row.category} · ${row.title}`;d.append(s);
 for(const [label,text] of [['Reference',row.id],['Recorded online',row.recordedAt||'Unknown'],['Event time',row.occurredAt||'Not supplied'],['Area',row.area],['Reported source',row.source],['Corrects',row.corrects],['Record',row.body],['Evidence',row.evidence],['Next steps',row.nextSteps]])if(text){const h=document.createElement('strong'),p=document.createElement('p');h.textContent=label;p.textContent=text;d.append(h,p);}
 $('journal-list').append(d);
 }$('show-more').hidden=rows.length<=shown;
}
async function refresh(){if(!user||busy)return;const uid=user.uid,g=generation;busy=true;controls();status('Loading private academic records…');try{const next=await loadRecords(uid);if(g!==generation)return;records=next;entries=timeline(records);loaded=true;render();status('Loaded from online records · '+new Date().toLocaleTimeString());}catch{if(g===generation){message('Could not refresh online records. Previously loaded entries remain downloadable; they may not include later saves.');status(loaded?'Showing previously loaded records':'Records unavailable · reconnect and retry');}}finally{busy=false;controls();$('refresh').disabled=!user;}}
for(const id of ['filter-category','entry-category']){if(id==='filter-category')$(id).add(new Option('All academic categories',''));for(const c of categories)$(id).add(new Option(c,c));}
$('entry-category').value='reflection';
$('journal-auth').onclick=async()=>{try{if(auth.currentUser){if(busy||dirty()||importPending){message('Save or download your draft and finish pending imports before signing out.');return;}await logOut();}else await signIn();}catch(e){message('Sign-in could not finish: '+(e.code||e.message));}};
onAuthStateChanged(auth,u=>{generation++;user=isOwner(u)?u:null;loaded=false;records={};entries=[];pending=null;importPending=null;$('journal-list').replaceChildren();$('journal-count').textContent='';$('entry-form').reset();$('transcript-file').value='';$('journal-private').hidden=!user;$('journal-auth').textContent=u?'Sign out':'Sign in with GitHub';message();controls();if(!user){status(u?'This account cannot access this private journal.':'Sign in to open your private journal.');return;}
 try{const saved=JSON.parse(localStorage.getItem(draftKey(user.uid))||'null');if(saved){$('manual-addition').open=true;for(const f of fields)if(typeof saved.fields?.[f]==='string')$('entry-'+f).value=saved.fields[f];pending=saved.pending;}}catch{message('The saved draft could not be restored.');}refresh();});
for(const f of fields)$('entry-'+f).addEventListener('input',()=>{pending=null;stash();});
$('entry-form').onsubmit=async e=>{e.preventDefault();if(!user||busy)return;const uid=user.uid,g=generation;try{const v=draft();const row=validateEntry({schemaVersion:1,category:v.category,title:v.title,body:v.body,area:v.area,evidence:v.evidence,nextSteps:v.next,source:v.source,occurredAt:v.time?new Date(v.time).toISOString():'',corrects:v.corrects});pending=pending||{id:crypto.randomUUID(),row};stash();busy=true;controls();status('Saving academic entry…');await appendEntries(uid,[pending.row],pending.id);if(g!==generation)return;pending=null;message();localStorage.removeItem(draftKey(uid));$('entry-form').reset();status('Saved online');}catch(e){if(g===generation){message('Not confirmed saved. Your draft is retained; retry safely. '+e.message);status('Save needs attention');}}finally{busy=false;controls();}if(g===generation)await refresh();};
$('download-draft').onclick=()=>download('librauni-academic-draft.txt',Object.entries(draft()).map(([k,v])=>k+': '+v).join('\n\n'),'text/plain;charset=utf-8');
$('refresh').onclick=refresh;
for(const id of ['filter-category','filter-from','filter-to','filter-search'])$(id).addEventListener('input',()=>{shown=50;render();});
$('show-more').onclick=()=>{shown+=50;render();};
function exporting(mode){if(!loaded)return;try{const rows=mode==='all'?entries:selected();download('librauni-academic-'+mode+'-'+new Date().toISOString().slice(0,10)+'.txt',readableJournal(rows),'text/plain;charset=utf-8');}catch(e){message(e.message);}}
$('export-readable').onclick=()=>exporting('selected');$('export-all').onclick=()=>exporting('all');
$('transcript-file').onchange=()=>{importPending=null;};
$('import-transcript').onclick=async()=>{if(!user||busy)return;const uid=user.uid,g=generation;busy=true;controls();try{if(!importPending){const file=$('transcript-file').files[0];if(!file||file.size>8000000)throw Error('Choose a UTF-8 text transcript up to 8 MB (2 million characters).');const text=new TextDecoder('utf-8',{fatal:true}).decode(await file.arrayBuffer());importPending={id:crypto.randomUUID(),rows:transcriptParts(text,{title:$('transcript-title').value,occurredAt:$('transcript-time').value?new Date($('transcript-time').value).toISOString():'',source:'Imported academic tutorial'})};}status('Archiving complete academic transcript…');await appendEntries(uid,importPending.rows,importPending.id);if(g!==generation)return;importPending=null;message();$('transcript-file').value='';status('Tutorial archived online');}catch(e){if(g===generation)message('Import not confirmed. Keep the original file and retry; the same pending import will not duplicate entries. '+e.message);}finally{busy=false;controls();}if(g===generation)await refresh();};
window.addEventListener('beforeunload',e=>{if(dirty()||busy||importPending){stash();e.preventDefault();e.returnValue='';}});
