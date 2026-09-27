import {block1Sections} from '../curriculum/m100-block1-sections.js';
import {m100} from '../curriculum/m100.js';
import {block1Lessons} from '../curriculum/m100-block1-lessons.js';
import {openingSections} from '../curriculum/m100-opening-sections.js';
// All required peers are represented, including unpublished material. Never infer
// whole-unit completion from just the currently published lesson.
export const studyNodes=[];
for(const b of m100.blocks){
 studyNodes.push({id:b.id,kind:'block',title:b.title,parent:null,available:b.id==='B01'});
 for(const uid of b.units){
  const u=m100.units.find(u=>u.id===uid);
  studyNodes.push({id:uid,kind:'unit',title:u.title,parent:b.id,available:b.id==='B01'});
  for(const l of block1Lessons.lessons.filter(l=>l.unit===uid)){
   studyNodes.push({id:l.id,kind:'lesson',title:l.title,parent:uid,available:true});
   for(const s of (l.id==='U01-L01'?openingSections.sections:block1Sections.lessons.find(p=>p.id===l.id).sections))studyNodes.push({id:s.id,kind:'section',title:s.title,parent:l.id,available:true});
  }
 }
}
export function children(id,nodes=studyNodes){return nodes.filter(n=>n.parent===id);}
export function leaves(id,nodes=studyNodes){const c=children(id,nodes);return c.length?c.flatMap(n=>leaves(n.id,nodes)):[nodes.find(n=>n.id===id)].filter(Boolean);}
export function ready(id,nodes=studyNodes){const n=nodes.find(n=>n.id===id);return !!n&&n.available&&children(id,nodes).every(c=>ready(c.id,nodes));}
export function studied(id,plan,nodes=studyNodes){if(plan?.completed?.includes(id))return true;return ready(id,nodes)&&leaves(id,nodes).every(n=>(plan?.studied||[]).includes(n.id));}
export function setStudied(plan,id,value,nodes=studyNodes){
 if(plan.status!=='enrolled')throw Error('Enrol in this module before saving study completion.');
 if(!ready(id,nodes))throw Error('This item is not fully published yet.');
 const next=structuredClone(plan),ids=leaves(id,nodes).map(n=>n.id),marks=new Set(next.studied||[]);
 for(const key of ids)value?marks.add(key):marks.delete(key);
 next.studied=[...marks].sort();
 for(const u of nodes.filter(n=>n.kind==='unit'&&leaves(n.id,nodes).some(leaf=>ids.includes(leaf.id)))){
  next.completed=next.completed.filter(id=>id!==u.id);
  if(studied(u.id,next,nodes))next.completed.push(u.id);
 }
 return next;
}
