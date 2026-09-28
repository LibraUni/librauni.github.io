import {schedule,addDays} from './schedule.js';
export function studyOverview(modules,plans,now){
 const enrolled=modules.filter(m=>!m.archived&&plans[m.code]?.status==='enrolled');
 const next=enrolled.map(m=>{
  const rows=schedule(m,plans[m.code]),units=rows.filter(r=>r.type==='unit').sort((a,b)=>a.start.localeCompare(b.start)||a.id.localeCompare(b.id));
  const pending=units.filter(r=>!r.completed),late=pending.find(r=>r.end<now),row=late||pending[0];
  const state=late?'behind':!row?'complete':row.start>now?(units.some(r=>r.completed)?'ahead':'upcoming'):'on-track';
  return {module:m,row,state};
 });
 const assessments=enrolled.flatMap(m=>schedule(m,plans[m.code]).filter(r=>['TMA','iCMA','EMA','exam'].includes(r.type)&&r.end>=now&&r.end<=addDays(now,30))).sort((a,b)=>a.end.localeCompare(b.end)||a.module.localeCompare(b.module));
 return {next,assessments};
}
