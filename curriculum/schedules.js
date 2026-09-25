import {m100} from './m100.js';
// Stable IDs are private-record keys. Never reuse an ID for different work.
const ranges=[[1,2],[3,4],[5,6],[7,9],[10,11],[12,14],[15,16],[18,20],[21,22],[23,24],[25,26],[27,28]];
const assessment=(id,title,type,startWeek,endWeek,hours,requires,description)=>({id,title,type,startWeek,endWeek,hours,requires,description,available:false});
export const modules=[{
 code:m100.code,title:m100.title,path:'/programme/bridge/lu-m100/',credits:30,
 scheduleVersion:2,weeks:30,enrollable:false,outsideDegree:true,
 durationSource:'https://www.open.ac.uk/library/digital-archive/module/xcri:MU123/',
 durationNote:'30 study weeks, using the documented MU123 pattern as the foundation-module reference. OU lengths vary by presentation; this is an original LibraUni timetable, not a copy of an OU calendar. No holiday dates are assumed: add breaks by moving remaining work. Block 2 workload estimates updated 25 September 2026: U06 22h, U07 20h, U08 28h; event IDs and all date windows are unchanged.',
 events:[
  {id:'orientation',type:'support',title:'Orientation & computing setup',startWeek:1,endWeek:1,hours:6,requires:[],description:'Guided VS Code/Python/Jupyter setup (3h), first notebook and save/reopen/clean rerun/backup practice (1h), study navigation and files (1h), non-graded readiness (1h). Only very basic Python familiarity is assumed.',available:false},
  ...m100.units.map((u,i)=>({...u,block:m100.blocks.find(b=>b.units.includes(u.id)),type:'unit',startWeek:ranges[i][0],endWeek:ranges[i][1],description:u.scope,available:false,outline:'#'+u.id})),
  assessment('TMA01','TMA 01 · Numbers and algebra','TMA',9,9,6,['U01','U02','U03','U04'],'Tutor-marked assignment. Explain calculations, algebra and checks; handwritten work may be scanned to PDF.'),
  assessment('TMA02','TMA 02 · Functions and graphs','TMA',17,17,6,['U05','U06','U07'],'Tutor-marked assignment assessing reasoning and mathematical communication.'),
  assessment('TMA03','TMA 03 · Geometry, functions and vectors','TMA',25,25,6,['U08','U09','U10'],'Tutor-marked assignment with explained methods and conclusions.'),
  {...assessment('EMA-FINAL','EMA · Written mathematics, notebook and explanation','EMA',29,30,18,m100.units.map(u=>u.id),'One end-of-module assessment with a single deadline at the end of week 30. A: independent Python modelling notebook (10 hours). B: handwritten mathematics (4 hours) plus scanning/checking the PDF (1 hour). C: interpretation and independent critique of a supplied AI/code change (2 hours) and tutor discussion (1 hour). The 18 hours are work budgets, not a separate timed examination. Documentation and taught library references are allowed for A; generated solutions and agent-written implementation are not. C uses supplied code, with no live AI service required. Submission arrangements remain to be specified before release.'),weeklyHours:{29:10,30:8}},
  ...[['ICMA41','iCMA 41',4,['U01','U02']],['ICMA42','iCMA 42',16,['U05','U06','U07']],['ICMA43','iCMA 43',26,['U09','U10','U11']]].map(([id,title,week,requires])=>({...assessment(id,title,'iCMA',week,week,1,requires,'Interactive computer-marked assignment. Questions, feedback and grading policy will be prepared before release.'),includedInUnitHours:true})),
  ...[[17,2],[25,2],[28,4],[29,4]].map(([w,h],i)=>({id:'revision'+i,title:'Cumulative revision',type:'revision',startWeek:w,endWeek:w,hours:h,requires:[],description:'Mixed practice and preparation based on earlier feedback.',available:false})),
  ...[10,18,26].map((w,i)=>({id:'feedback'+i,title:'TMA feedback & corrections',type:'support',startWeek:w,endWeek:w,hours:2,requires:[],description:'Read tutor feedback, explain corrections and revisit difficulties.',available:false})),
 ]
}];
