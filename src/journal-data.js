export const categories=['knowledge','skills','difficulties','feedback','assessment','milestone','reflection','conversation','activity'];
export const collections=['journal','progress','attempts','assessments','plannerHistory'];
export function iso(value){if(value?.toDate)return value.toDate().toISOString();if(value?.seconds!=null)return new Date(value.seconds*1000+(value.nanoseconds||0)/1e6).toISOString();if(typeof value==='string'&&Number.isFinite(Date.parse(value)))return new Date(value).toISOString();return null;}
export function validateEntry(v){
 if(!v||v.schemaVersion!==1||!categories.includes(v.category))throw Error('Choose a valid category.');
 for(const [key,max] of Object.entries({title:200,body:20000,area:300,evidence:2000,nextSteps:2000,source:200,occurredAt:30,corrects:200}))if(typeof v[key]!=='string'||v[key].length>max)throw Error(`Invalid ${key} or text too long.`);
 if(!v.title.trim()||!v.body.trim())throw Error('A title and entry text are required.');
 if(v.occurredAt&&!iso(v.occurredAt))throw Error('Invalid event time.');
 return Object.fromEntries(['schemaVersion','category','title','body','area','evidence','nextSteps','source','occurredAt','corrects'].map(k=>[k,v[k]]));
}
export function transcriptParts(text,meta){
 if(typeof text!=='string'||!text.trim()||text.length>2000000)throw Error('Use a non-empty UTF-8 transcript of at most 2 million characters.');
 const parts=[];for(let i=0;i<text.length;i+=16000)parts.push(text.slice(i,i+16000));
 return parts.map((body,i)=>validateEntry({schemaVersion:1,category:'conversation',title:`${meta.title||'Conversation'} · part ${i+1}/${parts.length}`,body,area:meta.area||'',evidence:'Imported verbatim text; original turn timestamps, if supplied, remain in the text.',nextSteps:'',source:meta.source||'Imported transcript',occurredAt:meta.occurredAt||'',corrects:''}));
}
export function timeline(records){
 const out=[];
 const history=[...(records.plannerHistory||[])].sort((a,b)=>(a.data.revision||0)-(b.data.revision||0));
 let previous={};
 for(const {id,data:d} of history){let plans;try{plans=JSON.parse(d.payload).plans||{};}catch{continue;}
 for(const code of new Set([...Object.keys(previous),...Object.keys(plans)])){
 const before=new Set(previous[code]?.completed||[]),after=new Set(plans[code]?.completed||[]);
 for(const event of new Set([...before,...after]))if(before.has(event)!==after.has(event))out.push({id:`plannerHistory/${id}/${code}/${event}`,category:'activity',title:`${code} · ${event} · ${after.has(event)?'marked complete':'completion mark removed'}`,body:'Learner-reported study activity; this does not establish assessed mastery.',area:code+' · '+event,evidence:'Planner revision '+id,nextSteps:'',source:'Website planner activity',recordedAt:iso(d.updatedAt),occurredAt:null,corrects:''});
 }previous=plans;
 }

 for(const [name,rows] of Object.entries(records))for(const {id,data:d} of rows){
  if(name==='journal'){out.push({...d,id:`journal/${id}`,recordedAt:iso(d.recordedAt),occurredAt:iso(d.occurredAt),raw:d});continue;}
  // Academic journal excludes administrative history and general private notes.
  if(!['progress','attempts','assessments'].includes(name))continue;
  const category=name.startsWith('note')?'notebook':name.startsWith('planner')?'planning':name.startsWith('profile')?'profile':name==='assessments'||name==='attempts'?'assessment':'activity';
  let body=d.text??d.answer??d.payload??readableFields(d);
  if(name.startsWith('profile')){try{const p=JSON.parse(body);if(p.photo)p.photo='[Photo omitted from readable journal; retained in full records JSON]';body=JSON.stringify(p,null,2);}catch{}}
  out.push({id:`${name}/${id}`,category,title:`${name} · ${id}`,body,area:d.lessonId||'',evidence:'Saved website record; activity and edits do not establish mastery.',nextSteps:'',source:'Website record',recordedAt:iso(d.updatedAt||d.createdAt),occurredAt:null,corrects:'',raw:d});
 }
 return out.sort((a,b)=>(b.occurredAt||b.recordedAt||'').localeCompare(a.occurredAt||a.recordedAt||'')||a.id.localeCompare(b.id,undefined,{numeric:true}));
}
export function filterEntries(entries,{category='',from='',to='',search=''}={}){
 if(from&&to&&from>to)throw Error('The start date must not be after the end date.');
 return entries.filter(e=>{const day=(e.occurredAt||e.recordedAt||'').slice(0,10);return (!category||e.category===category)&&(!from||(day&&day>=from))&&(!to||(day&&day<=to))&&(!search||[e.title,e.body,e.area,e.evidence,e.nextSteps].join(' ').toLowerCase().includes(search.toLowerCase()));});
}
export function markdown(entries){return '# LibraUni private learning journal\n\nExported '+new Date().toISOString()+'\n\n'+entries.map(e=>`## ${e.title}\n\nCategory: ${e.category}\nArea: ${e.area||'Unspecified'}\nSource: ${e.source}\nEvent time: ${e.occurredAt||'Not supplied'}\nRecorded: ${e.recordedAt||'Unknown in original record'}\nReference: ${e.id}\nCorrects: ${e.corrects||'None'}\n\n${e.body}\n\nEvidence: ${e.evidence||'Not supplied'}\n\nNext steps: ${e.nextSteps||'None recorded'}\n`).join('\n---\n\n');}

function readableFields(data){return Object.entries(data).filter(([k])=>!['updatedAt','createdAt'].includes(k)).map(([k,v])=>`${k.replace(/([a-z])([A-Z])/g,'$1 $2')}: ${v===true?'Yes':v===false?'No':v==null?'Not recorded':typeof v==='object'?Array.isArray(v)?v.map(x=>typeof x==='object'?readableFields(x):String(x)).join('; '):readableFields(v):String(v)}`).join('\n');}
export function readableJournal(entries){
 const date=value=>value?new Date(value).toLocaleString('en-GB',{timeZone:'UTC',dateStyle:'long',timeStyle:'short'})+' UTC':'Not recorded';
 return 'LIBRAUNI — PRIVATE ACADEMIC JOURNAL\nExported: '+date(new Date().toISOString())+'\nEntries: '+entries.length+'\n\n'+(entries.length?entries.map(e=>[
 e.title,date(e.occurredAt||e.recordedAt),`Category: ${e.category}`,e.area&&`Area: ${e.area}`,e.source&&`Source: ${e.source}`,e.occurredAt&&e.recordedAt&&`Saved: ${date(e.recordedAt)}`,e.corrects&&`Correction to: ${e.corrects}`,'',e.body,e.evidence&&'\nEvidence / changes observed\n'+e.evidence,e.nextSteps&&'\nNext steps\n'+e.nextSteps
 ].filter(x=>x!==false&&x!==null&&x!==undefined).join('\n')).join('\n\n'+'—'.repeat(48)+'\n\n'):'No academic entries match this selection.\n');
}
