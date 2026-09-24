// Pure date and schedule logic. Dates are civil dates, never elapsed local-time days.
export const DAY=86400000;
export function dateValue(s){
 if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))throw Error('Choose a valid date.');
 const n=Date.parse(s+'T00:00:00Z');
 if(!Number.isFinite(n)||new Date(n).toISOString().slice(0,10)!==s||s<'2000-01-01'||s>'2199-12-31')throw Error('Choose a date between 2000 and 2199.');
 return n;
}
export function addDays(s,n){return new Date(dateValue(s)+n*DAY).toISOString().slice(0,10);}
export function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function newPlan(module,start){dateValue(start);return {start,status:'planned',scheduleVersion:module.scheduleVersion,overrides:{},completed:[]};}
export function schedule(module,plan){
 return module.events.map(e=>{
 const baselineStart=plan?.start?addDays(plan.start,(e.startWeek-1)*7):null;
 const baselineEnd=plan?.start?addDays(plan.start,e.endWeek*7-1):null;
 return {...e,module:module.code,path:module.path,baselineStart,baselineEnd,start:plan?.overrides?.[e.id]?.start||baselineStart,end:plan?.overrides?.[e.id]?.end||baselineEnd,completed:plan?.completed?.includes(e.id)||false};
 }).sort((a,b)=>(a.end&&b.end?a.end.localeCompare(b.end):a.endWeek-b.endWeek)||(a.type==='unit'?-1:b.type==='unit'?1:0)||a.id.localeCompare(b.id));
}
export function validatePlan(module,p){
 dateValue(p.start);dateValue(addDays(p.start,module.weeks*7-1));
 if(!['planned','enrolled'].includes(p.status)||p.status==='enrolled'&&!module.enrollable)throw Error('This module is not open for enrolment yet.');
 if(p.scheduleVersion!==module.scheduleVersion)throw Error('The module timetable has changed. Review the new timetable with your tutor before saving.');
 if(!p.overrides||Array.isArray(p.overrides)||typeof p.overrides!=='object'||!Array.isArray(p.completed))throw Error('Invalid planner record.');
 const ids=new Set(module.events.map(e=>e.id));
 for(const [id,o] of Object.entries(p.overrides)){
 if(!ids.has(id)||!o||Object.keys(o).some(k=>!['start','end'].includes(k)))throw Error('Unknown timetable item.');
 dateValue(o.start);dateValue(o.end);if(o.end<o.start||o.start<p.start)throw Error('An item must finish after it starts, within the module presentation.');
 }
 for(const id of p.completed)if(!module.events.some(e=>e.id===id&&e.available&&e.type==='unit'))throw Error('Only available units can be marked studied.');
 return p;
}
export function warnings(module,plan){
 const rows=schedule(module,plan),byId=new Map(rows.map(r=>[r.id,r]));
 return rows.flatMap(r=>(r.requires||[]).filter(id=>byId.get(id)?.end> (r.type==='unit'?r.start:r.end)).map(id=>`${r.title}: ${id} is scheduled to finish after ${r.type==='unit'?'this unit starts':'this assessment is due'}.`));
}
export function shiftRemaining(module,plan,from,days){
 dateValue(from);if(!Number.isInteger(days)||Math.abs(days)>365)throw Error('Move by a whole number of days, from −365 to 365.');
 const copy=structuredClone(plan);
 for(const r of schedule(module,plan))if(r.end>=from&&!r.completed){
 copy.overrides[r.id]={start:r.start>=from?addDays(r.start,days):r.start,end:addDays(r.end,days)};
 }
 return validatePlan(module,copy);
}
export function combined(modules,plans,includePlanned=false){return modules.flatMap(m=>plans[m.code]&&(includePlanned||plans[m.code].status==='enrolled')?schedule(m,plans[m.code]):[]).sort((a,b)=>a.end.localeCompare(b.end)||a.module.localeCompare(b.module)||a.id.localeCompare(b.id));}
export function eventState(e,now=today()){
 if(e.completed)return 'Studied · self-reported';
 if(!e.start)return 'Undated preview';
 if(e.end<now)return e.type==='unit'?'Study window passed':'Date passed';
 if(e.start<=now)return e.type==='unit'?'Study this week':'In progress / due soon';
 return 'Upcoming';
}
export function validateStore(data,modules){
 if(!data||data.schemaVersion!==1||!data.plans||Array.isArray(data.plans)||typeof data.plans!=='object')throw Error('Unrecognised planner format.');
 for(const [code,p] of Object.entries(data.plans)){const m=modules.find(m=>m.code===code);if(!m)throw Error('Unknown module in saved planner.');validatePlan(m,p);}
 if(JSON.stringify(data).length>100000)throw Error('Planner exceeds the supported size.');
 return data;
}

// Explicitly reviewed update only. Never write migrated records automatically.
export function previewScheduleUpdate(data,modules){
 const next=structuredClone(data);let changed=false;
 for(const [code,p] of Object.entries(next.plans||{})){
  const module=modules.find(m=>m.code===code);
  if(code==='LU-M101'&&p.scheduleVersion===1&&module?.scheduleVersion===2){
   if(p.overrides.EMA01||p.overrides.EXAM){
    const notebook=p.overrides.EMA01||{start:addDays(p.start,28*7),end:addDays(p.start,29*7-1)};
    const written=p.overrides.EXAM||{start:addDays(p.start,29*7),end:addDays(p.start,30*7-1)};
    p.overrides['EMA-FINAL']={start:[notebook.start,written.start].sort()[0],end:[notebook.end,written.end].sort().at(-1)};
   }
   delete p.overrides.EMA01;delete p.overrides.EXAM;p.scheduleVersion=2;changed=true;
  }
 }
 if(!changed)return null;
 validateStore(next,modules);return next;
}
