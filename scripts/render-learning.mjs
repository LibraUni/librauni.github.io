import {renderAssessments} from './render-block1-assessments.mjs';
import {teaching} from './render-block1-teaching.mjs';
import {block1Sections} from '../curriculum/m100-block1-sections.js';
import {block1Assessments} from '../curriculum/m100-block1-assessments.js';
import {a101 as a101Units} from '../curriculum/a101.js';
import {p101Units} from '../curriculum/p101-units.js';
import {m102Units} from '../curriculum/m102-units.js';
import {m101Units} from '../curriculum/m101-units.js';
import {a101Blocks} from '../curriculum/a101-blocks.js';
import {m102Blocks} from '../curriculum/m102-blocks.js';
import {p101Blocks} from '../curriculum/p101-blocks.js';
import {m101Blocks} from '../curriculum/m101-blocks.js';
import fs from 'node:fs';
import {m100} from '../curriculum/m100.js';
import {block1Lessons} from '../curriculum/m100-block1-lessons.js';
import {openingSections} from '../curriculum/m100-opening-sections.js';
import {stage1Modules} from '../curriculum/stage1.js';
export function renderLearning({root,shell,link,e}) {
 renderAssessments({root,shell,link,e});
 const base='/learn/preparation/m100/';
 const stageBlocks={ 'LU-M101':m101Blocks.blocks,'LU-P101':p101Blocks.blocks,'LU-M102':m102Blocks.blocks,'LU-A101':a101Blocks.blocks };

 const blockPath=id=>base+id.toLowerCase()+'/';
 const unitPath=id=>blockPath(m100.blocks.find(b=>b.units.includes(id)).id)+id.toLowerCase()+'/';
 const lessonUrl=l=>unitPath(l.unit)+l.id.split('-').at(-1).toLowerCase()+'/';
 const extraRails=new Map();
 const lessonPath=unitPath('U01')+'l01/';
 const check=id=>`<input type="checkbox" class="study-check" data-study-id="${e(id)}" aria-label="Mark ${e(id)} completed" disabled>`;
 const titled=(id,title)=>{
  const lesson=block1Lessons.lessons.find(l=>l.id===id);
  const href=m100.blocks.some(b=>b.id===id)?blockPath(id):lesson?lessonUrl(lesson):m100.units.some(u=>u.id===id)?unitPath(id):null;
  return (href?link(href,title):`<span>${e(title)}</span>`)+check(id);
 };
 const controls='<div class="tree-controls" hidden><button type="button" data-tree-action="expand">Expand all</button><button type="button" data-tree-action="collapse" class="secondary">Collapse all</button></div>';
 const tree=body=>`<div class="learning-tree">${controls}${body}</div>`;
 const branch=(title,body,id)=>`<details class="curriculum-branch" ${id?`id="${id}"`:''}><summary>${title}</summary><div class="branch-body">${body}</div></details>`;
 const published=['S01','S02','S03','S04','S05','S06'];
 const sectionId=s=>s.id.split('-').at(-1);
 const pending='<span class="availability">Forthcoming</span>';
 const blockContents=m100.blocks.map(b=>b.units.map(id=>{
  const u=m100.units.find(u=>u.id===id);
  const ls=block1Lessons.lessons.filter(l=>l.unit===id);
  return branch(titled(id,id+' · '+u.title),`<p>${e(u.can)}</p>${ls.length?ls.map(l=>branch(titled(l.id,l.title),l.id==='U01-L01'?`<p>${link(lessonPath,'Open lesson')} · All six sections available.</p><ul>${openingSections.sections.map((s,i)=>`<li>${published.includes(sectionId(s))?link(lessonPath+'#'+sectionId(s),s.title):e(s.title)+' · '+pending}${check(s.id)}</li>`).join('')}</ul>`:`<p>${l.hours} study hours · All sections available.</p><ul>${block1Sections.lessons.find(p=>p.id===l.id).sections.map(s=>`<li>${link(lessonUrl(l)+'#'+s.id,s.title)}${check(s.id)}</li>`).join('')}</ul>`)).join(''):`<p>${pending} · ${link('/programme/bridge/lu-m100/#'+id,'Read the unit blueprint')}</p>`}`,id);
 }).join(''));
 const blockTrees=m100.blocks.map((b,i)=>branch(titled(b.id,b.id+' · '+b.title),blockContents[i],b.id));
 const unitBranches=blockTrees.join('');
 const home=m=>'/learn/physics/stage-1/'+m.code.slice(3).toLowerCase()+'/';
 const moduleLink=m=>`<p class="module-home-link">${link(home(m),m.code+' · '+m.title)}</p>`;
 const bridgeLink=`<p class="module-home-link">${link(base,'M100 · Mathematics & Python bridge')}</p>`;
 const degreeBranches=[1,2,3].map(n=>branch('Stage '+n,`<p>${link('/learn/physics/stage-'+n+'/','Stage overview')}</p>${n===1?stage1Modules.map(moduleLink).join(''):`<p>Teaching is forthcoming. ${link('/programme/#stage-'+n,'View proposed modules and pathways')}.</p>`}`)).join('');
 const intro=(title,text)=>`<section class="intro"><p class="eyebrow">LEARNING MATERIALS</p><h1>${title}</h1><p class="lead">${text}</p></section>`;
 const crumbs=[link('/learn/','Learning materials'),link('/learn/preparation/','Preparatory study'),link(base,'M100'),link(base+'b01/','Block 1')];
 const pages=[
 ['/learn/','Learning materials',[link('/','Study desk'),'<span aria-current="page">Learning materials</span>'],intro('A place to study.','Explore the teaching as it becomes available. Read freely, without enrolling.')+`<p>Expand a branch to explore. Available teaching has a link; forthcoming items are plans, not completed lessons. Enrolment and private progress are separate from reading.</p>${tree(branch('Preparatory study',`<p>Optional preparation outside degree credits. ${link('/learn/preparation/','Overview')}</p>`+bridgeLink)+branch('Physics · Degree',`<p>${link('/learn/physics/','Degree learning overview')}</p>`+degreeBranches))}<p>${link('/programme/','Programme blueprint')} explains the planned curriculum, coverage and construction commitments.</p>`],
 ['/learn/preparation/','Preparatory study',[link('/learn/','Learning materials'),'<span aria-current="page">Preparatory study</span>'],intro('Preparatory study','Build the foundations you need before starting the degree.')+`<p>M100 is optional and outside the 360-credit degree. ${link(base,'Explore M100 teaching')}.</p>`+bridgeLink],
 [base,m100.title,[link('/learn/','Learning materials'),link('/learn/preparation/','Preparatory study'),'<span aria-current="page">M100</span>'],intro(m100.title,'Calculate, explain and check—then connect mathematics with transparent Python work.')+`<p>Optional bridge · 30 internal credits / 300 hours for the full module. All 19 lessons of Block 1 are available, with practice notebooks, iCMA 41 and TMA 01. Blocks 2 and 3 are being developed. Enrolment is open through the <a href="#study-planner">module planner</a>; later-block teaching and assessments remain forthcoming.</p><p>${link(lessonPath+'#S01','Start with the first teaching section')} · ${link('/programme/bridge/lu-m100/','Full module blueprint and assessment plan')}</p>`+`<nav class="programme-nav" aria-label="Module navigation"><a href="#study-planner">Planner</a><a href="#materials">Learning materials</a></nav><section id="study-planner" class="programme-section" data-planner="LU-M100"><h2>Module planner</h2><p>Loading your planner…</p></section><section id="materials"><h2>Learning materials</h2>${tree(unitBranches)}</section>`],
 [base+'b01/','Calculate and express relationships',[...crumbs.slice(0,3),'<span aria-current="page">Block 1</span>'],intro('Calculate and express relationships','Four units build reliable arithmetic, algebra and short learner-written programs.')+`<p>80 unit study hours, including 14 Python hours and the one-hour iCMA 41. TMA 01 has a separate six-hour allocation.</p>`+tree(blockContents[0])],
 ['/learn/physics/','Physics degree learning',[link('/learn/','Learning materials'),'<span aria-current="page">Physics degree</span>'],intro('Physics degree','Three stages, from foundations to independent investigation.')+`<p>Degree teaching is forthcoming. The optional M100 bridge has its own ${link('/learn/preparation/','preparatory study area')}.</p>`+tree(degreeBranches)],
 ];
 for(const m of stage1Modules)pages.push([home(m),m.title,[link('/learn/','Learning materials'),link('/learn/physics/stage-1/','Stage 1'),e(m.code)],intro(e(m.code+' · '+m.title),e(m.purpose))+`<p>30 internal credits · 300 hours</p><h2>Module planner</h2><p>Enrolment and a timetable will become available when this module is ready to begin.</p><h2>Learning materials</h2><p>Teaching materials are forthcoming. ${link(m.path,'Explore the full module blueprint')}.</p>`]);
 for(const n of [1,2,3])pages.push(['/learn/physics/stage-'+n+'/',`Stage ${n}`,[link('/learn/','Learning materials'),link('/learn/physics/','Physics degree'),`<span aria-current="page">Stage ${n}</span>`],intro('Stage '+n,'Teaching materials will appear here as they are released.')+`<p>${link('/programme/#stage-'+n,'Stage curriculum blueprint')} · No stage teaching is published yet.</p>`+(n===1?tree(stage1Modules.map(moduleLink).join('')):'' )]);
 for(const u of m100.units.slice(0,4))pages.push([unitPath(u.id),u.title,[...crumbs,`<span aria-current="page">${u.id}</span>`],intro(u.title,e(u.can))+`<p>${u.hours} planned study hours · ${link('/programme/bridge/lu-m100/#'+u.id,'Unit blueprint')}.</p>`+tree(block1Lessons.lessons.filter(l=>l.unit===u.id).map(l=>branch(titled(l.id,l.id+' · '+l.title),`<p>${e(l.purpose)}</p><p>${l.id==='U01-L01'?link(lessonPath,'Open lesson · All six sections available'):link(lessonUrl(l),'Open lesson · All sections available')}</p>`)).join(''))]);
 pages.push([lessonPath,'Signed quantities and ordered calculations',[...crumbs,link(unitPath('U01'),'Unit 1'),'<span aria-current="page">Lesson 1</span>'],intro('Signed quantities and ordered calculations','Start with familiar arithmetic, then build a dependable way of explaining and checking it.')+`<p>Full lesson: 4 hours · All six sections available, including a downloadable Python practice notebook.</p>`+published.map(id=>fs.readFileSync(root+'content/m100-u01-l01-'+id.toLowerCase()+'.html','utf8')).join('')+`<nav class="lesson-pagination" aria-label="Previous and next"><a href="${unitPath('U01')}">← Unit overview</a><a href="/learn/preparation/m100/b01/u01/l02/">Next: Fractions, decimals and named values →</a></nav><p class="small">Original LibraUni teaching · Published 26 September 2026. ${link('/programme/bridge/lu-m100/#opening-sections','Lesson design and section blueprint')}.</p>`]);
 // Generate navigation destinations from the approved hierarchy, without inventing teaching.
 const modules=[{base,blocks:m100.blocks,units:m100.units,lessons:block1Lessons.lessons,blueprint:'/programme/bridge/lu-m100/'},...stage1Modules.map(m=>({base:home(m),blocks:stageBlocks[m.code],units:({'LU-M101':m101Units,'LU-M102':m102Units,'LU-P101':p101Units,'LU-A101':a101Units}[m.code]).units,lessons:[],blueprint:m.path}))];
 const addPage=(path,title,parent,items,label,description)=>{
  extraRails.set(path,{title:label,items,back:parent});
  if(pages.some(p=>p[0]===path))return;
  pages.push([path,title,[link('/learn/','Learning materials'),link(parent,'Parent page'),e(title)],intro(e(title),e(description||'Teaching materials are forthcoming.'))+`<p class="availability">Teaching materials forthcoming · This is a curriculum outline.</p>`+items.map(item=>`<p>${link(item.href,item.title)}</p>`).join('')]);
 };
 for(const m of modules){
  extraRails.set(m.base,{title:'Module blocks',items:m.blocks.map(b=>({title:b.title,href:m.base+b.id.toLowerCase()+'/'})),back:m.base===base?'/learn/preparation/':'/learn/physics/stage-1/'});
  for(const b of m.blocks){
   const bp=m.base+b.id.toLowerCase()+'/';
   const units=m.units.filter(u=>u.block===b.id||b.units?.includes(u.id));
   addPage(bp,b.title,m.base,units.map(u=>({title:u.title,href:bp+u.id.toLowerCase()+'/'})),'Block units',b.purpose);
   for(const u of units){
    const up=bp+u.id.toLowerCase()+'/';const lessons=m.lessons.filter(l=>l.unit===u.id);
    addPage(up,u.title,bp,lessons.map(l=>({title:l.title,href:up+l.id.split('-').at(-1).toLowerCase()+'/'})),'Unit lessons',u.can||u.purpose);
    for(const l of lessons){const lp=up+l.id.split('-').at(-1).toLowerCase()+'/';if(lp!==lessonPath)addPage(lp,l.title,up,[],'Lesson sections',l.purpose);}
   }
  }
 }
 const designPath=base+'b01/design/';
 const allPlans=[{id:'U01-L01',unit:'U01',title:block1Lessons.lessons[0].title,minutes:240,sections:openingSections.sections},...block1Sections.lessons];
 const sectionPlan=s=>`<section class="unit-card" id="${s.id}"><p class="eyebrow">${e(s.id)} · ${s.minutes} MINUTES · BLUEPRINT</p><h3>${e(s.title)}</h3><p>${e(s.scope)}</p><dl>${[['Practice / assignment',s.activity||s.practice],['Expected evidence',s.deliverable||'Explained working and corrections; published formative practice.'],['Feedback',s.feedback],['Visual support',s.visuals],['Handover',s.handover]].map(([k,v])=>`<dt>${k}</dt><dd>${e(v)}</dd>`).join('')}</dl><p class="small">Prerequisites: ${e(s.requires.join(', ')||'Guided orientation')}. Allocation in minutes (explanation / mathematics / Python / application / review): ${s.allocationMinutes.join(' / ')}.</p></section>`;
 pages.push([designPath,'Block 1 · Complete teaching and assessment blueprint',[link(base,'M100'),link(base+'b01/','Block 1'),'Design'],intro('Block 1: the complete route','Four units, 19 lessons, section plans and assessment specifications.')+`<p>80 unit hours, including 14 Python hours and iCMA 41. TMA 01 adds its existing six hours. This is the design reference for the published Block 1 teaching. All 19 lessons and both assignments now have separate teaching pages. Publication does not create learner records or completion marks.</p><p>Each practice task is formative unless labelled iCMA or TMA. Practice evidence may be brought to a tutorial; it is not an extra formal submission. Optional targeted backup replaces comparable practice where appropriate; extra remediation is recorded honestly. Existing personal calendar dates are unchanged.</p>`+`<h2>Units and workload</h2><ul>${m100.units.slice(0,4).map(u=>`<li>${link(unitPath(u.id),u.id+' · '+u.title)} · ${u.hours} hours · ${allPlans.filter(l=>l.unit===u.id).length} lessons</li>`).join('')}</ul>`+allPlans.map(l=>`<details class="curriculum-branch" id="${l.id}"><summary>${e(l.id+' · '+l.title)} · ${l.minutes/60} hours</summary><div class="branch-body">${l.sections.map(sectionPlan).join('')}</div></details>`).join('')+`<h2>Formal assignments</h2>`+block1Assessments.map(a=>`<section class="unit-card" id="${a.id}"><h3>${e(a.title)}</h3><p>${e(a.status)}. Baseline deadline: week ${a.week}; your personal planner controls actual dates.</p><p>${e(a.includedIn)}.</p><p>${e(a.format)}</p>${a.parts.map(([name,marks,topic,evidence,source])=>`<h4>${e(name+' · '+topic+' · '+marks+' marks')}</h4><p>${e(evidence)} Preparation: ${e(source)}.</p>`).join('')}<h4>Submission</h4><p>${e(a.submission)}</p><h4>Marking and feedback</h4><p>${e(a.marking)}</p><h4>Independent work</h4><p>${e(a.independence)}</p></section>`).join('')]);
 for(const page of pages){
  if(page[0]===base+'b01/')page[3]+=`<p>${link(designPath,'Complete section and assignment blueprint')}</p>`;
  const plan=block1Sections.lessons.find(l=>lessonUrl(block1Lessons.lessons.find(x=>x.id===l.id))===page[0]);
  if(plan){
   const lesson=block1Lessons.lessons.find(l=>l.id===plan.id),index=block1Lessons.lessons.indexOf(lesson),next=block1Lessons.lessons[index+1],prev=block1Lessons.lessons[index-1];
   page[2]=[...crumbs,link(unitPath(plan.unit),'Unit '+Number(plan.unit.slice(1))),'<span aria-current="page">Lesson '+Number(plan.id.split('-')[1].slice(1))+'</span>'];
   page[3]=intro(e(lesson.title),e(lesson.purpose))+teaching(root,plan,lesson,check)+`<nav class="lesson-pagination" aria-label="Previous and next">${prev?link(lessonUrl(prev),'← '+prev.title):''}${next?link(lessonUrl(next),next.title+' →'):link(base+'assessments/tma01/','TMA 01 →')}</nav>`;
   extraRails.set(page[0],{title:'In this lesson',items:plan.sections.map(s=>({title:s.title,href:'#'+s.id})),back:unitPath(plan.unit)});
  }
 }
 for(const [path,title,crumb,body] of pages){
  let learningBody=body;
  if(path===lessonPath){
   learningBody=learningBody.replace(/<input[^>]*data-study-id="[^"]*"[^>]*>/g,'');
   for(const id of published)learningBody=learningBody.replace(new RegExp('(<section id="'+id+'"[\\s\\S]*?)(</section>)'),'$1<p class="section-read"><label>Mark section as read'+check('U01-L01-'+id)+'</label></p>$2');
  }
  let railTitle,railItems,back;
  if(path===lessonPath){railTitle='In this lesson';railItems=openingSections.sections.map(s=>({title:s.title,href:'#'+sectionId(s)}));back=unitPath('U01');}
  else if(path===base){railTitle='Module blocks';railItems=m100.blocks.map(b=>({title:b.title,href:b.id==='B01'?base+'b01/':'#'+b.id}));back='/learn/preparation/';}
  else if(path===base+'b01/'){railTitle='Block units';railItems=m100.blocks[0].units.map(id=>({title:m100.units.find(u=>u.id===id).title,href:unitPath(id)}));back=base;}
  else if(m100.units.slice(0,4).some(u=>path===unitPath(u.id))){const u=m100.units.find(u=>path===unitPath(u.id));railTitle='Unit lessons';railItems=block1Lessons.lessons.filter(l=>l.unit===u.id).map(l=>({title:l.title,href:l.id==='U01-L01'?lessonPath:'#'+l.id}));back=base+'b01/';}
  else {const m=stage1Modules.find(m=>home(m)===path);if(m){railTitle='Module blocks';railItems=stageBlocks[m.code].map(b=>({title:b.title,href:m.path+'#'+b.id}));back='/learn/physics/stage-1/';}}
  if(extraRails.has(path)){const rail=extraRails.get(path);railTitle=rail.title;railItems=rail.items;back=rail.back;}
  if(railItems)learningBody=`<div class="lesson-layout"><aside class="lesson-sidebar"><details class="lesson-navigation" open><summary>${railTitle}<span data-current-section></span></summary><nav aria-label="${railTitle}"><h2>${railTitle}</h2><ol>${railItems.map((item,i)=>`<li><a href="${item.href}"><span class="section-number">${String(i+1).padStart(2,'0')}</span><span>${e(item.title)}</span></a></li>`).join('')}</ol>${railItems.length?'':'<p class="small">Not yet published.</p>'}<a class="lesson-back" href="${back}">← ${path===lessonPath?'Unit overview':'Up one level'}</a></nav></details></aside><article class="lesson-reading">${learningBody}</article></div>`;

  let html=shell(title,crumb,learningBody).replace('curriculum design and module preview.','learning materials.').replace('</head>','<link rel="stylesheet" href="/src/learning.css"></head>').replace('</body>','<script type="module" src="/src/learning.js"></script><script type="module" src="/src/study-ui.js"></script></body>');
  if(railItems)html=html.replace('class="programme-page"','class="programme-page lesson-page"').replace('</body>','<script type="module" src="/src/lesson-navigation.js"></script></body>');
  if(path===base)html=html.replace('</body>','<script type="module" src="/src/planner.js"></script></body>');
  fs.mkdirSync(root+path.slice(1),{recursive:true});fs.writeFileSync(root+path.slice(1)+'index.html',html);
 }
}
