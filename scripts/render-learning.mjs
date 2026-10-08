import {presentOverview,subjectFor} from './module-presentation.mjs';
import {unitLink,assertBlockUnitLabels} from './unit-link.mjs';
import {addP101Teaching,p101TeachingPaths} from './p101-teaching.mjs';
import {p101Block1Lessons} from '../curriculum/p101-block1-lessons.js';
import {degreeModules,degreeSidebar,stageList} from './degree-navigation.mjs';
import {addM101Teaching,m101TeachingPaths} from './m101-teaching.mjs';
import {m101Lessons} from '../curriculum/m101-released.js';
import {prototypeLessons,prototypePlans} from '../curriculum/m100-prototype.js';
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
 const base='/programme/archive/m100/';
 const lessons=[...block1Lessons.lessons,...prototypeLessons];
 const teachingPlans=[...block1Sections.lessons,...prototypePlans];
 const stageBlocks={ 'LU-M101':m101Blocks.blocks,'LU-P101':p101Blocks.blocks,'LU-M102':m102Blocks.blocks,'LU-A101':a101Blocks.blocks };

 const blockPath=id=>base+id.toLowerCase()+'/';
 const unitPath=id=>blockPath(m100.blocks.find(b=>b.units.includes(id)).id)+id.toLowerCase()+'/';
 const lessonUrl=l=>unitPath(l.unit)+l.id.split('-').at(-1).toLowerCase()+'/';
 const extraRails=new Map();
 const lessonPath=unitPath('U01')+'l01/';
 const check=id=>''; // Archived prototype is read-only.
 const titled=(id,title)=>{
  const lesson=lessons.find(l=>l.id===id);
  const href=m100.blocks.some(b=>b.id===id)?blockPath(id):lesson?lessonUrl(lesson):m100.units.some(u=>u.id===id)?unitPath(id):null;
  const unit=m100.units.find(u=>u.id===id);
  return (unit?unitLink({id:unit.id,title:unit.title,href},link):href?link(href,title):`<span>${e(title)}</span>`)+check(id);
 };
 const controls='<div class="tree-controls" hidden><button type="button" data-tree-action="expand">Expand all</button><button type="button" data-tree-action="collapse" class="secondary">Collapse all</button></div>';
 const tree=body=>`<div class="learning-tree">${controls}${body}</div>`;
 const branch=(title,body,id)=>`<details class="curriculum-branch" ${id?`id="${id}"`:''}><summary>${title}</summary><div class="branch-body">${body}</div></details>`;
 const published=['S01','S02','S03','S04','S05','S06'];
 const sectionId=s=>s.id.split('-').at(-1);
 const pending='<span class="availability">Forthcoming</span>';
 const blockContents=m100.blocks.map(b=>b.units.map(id=>{
  const u=m100.units.find(u=>u.id===id);
  const ls=lessons.filter(l=>l.unit===id);
  return branch(titled(id,id+' · '+u.title),`<p>${e(u.can)}</p>${ls.length?ls.map(l=>branch(titled(l.id,l.title),l.id==='U01-L01'?`<p>${link(lessonPath,'Open lesson')} · All six sections available.</p><ul>${openingSections.sections.map((s,i)=>`<li>${published.includes(sectionId(s))?link(lessonPath+'#'+sectionId(s),s.title):e(s.title)+' · '+pending}${check(s.id)}</li>`).join('')}</ul>`:`<p>${l.hours} study hours · All sections available.</p><ul>${teachingPlans.find(p=>p.id===l.id).sections.map(s=>`<li>${link(lessonUrl(l)+'#'+s.id,s.title)}${check(s.id)}</li>`).join('')}</ul>`)).join(''):`<p>${pending} · ${link('/programme/bridge/lu-m100/#'+id,'Read the unit blueprint')}</p>`}`,id);
 }).join(''));
 const blockTrees=m100.blocks.map((b,i)=>branch(titled(b.id,b.id+' · '+b.title),blockContents[i],b.id));
 const unitBranches=blockTrees.join('');
 const home=m=>'/learn/physics/stage-1/'+m.code.slice(3).toLowerCase()+'/';
 const moduleLink=m=>`<p class="module-home-link">${link(home(m),m.code+' · '+m.title)}</p>`;
 const bridgeLink=`<p class="module-home-link">${link(base,'M100 · Mathematics & Python bridge')}</p>`;
 const degreeBranches=[1,2,3].map(n=>branch('Stage '+n,`<p>${link('/learn/physics/stage-'+n+'/','Stage overview')}</p>${n===1?stage1Modules.map(moduleLink).join(''):`<p>Teaching is forthcoming. ${link('/programme/#stage-'+n,'View proposed modules and pathways')}.</p>`}`)).join('');
 const intro=(title,text)=>`<section class="intro"><p class="eyebrow">LEARNING MATERIALS</p><h1>${title}</h1><p class="lead">${text}</p></section>`;
 const crumbs=[link('/programme/','Programme blueprint'),link('/programme/archive/m100/','Prototype archive'),link(base,'M100'),link(base+'b01/','Block 1')];
 const pages=[
 ['/learn/','Learning materials',[link('/study/','Student Home'),'<span aria-current="page">Learning materials</span>'],intro('Learning materials','Physics, from foundations to independent investigation.')+stageList(degreeModules,e)],
 [base,m100.title,[link('/programme/','Programme blueprint'),'<span aria-current="page">M100 archive</span>'],intro('M100 · Prototype archive','An early experiment, preserved to show how the teaching has developed.')+`<p>This retired test module is outside the degree. Browse its original teaching and assessment questions as a historical reference.</p><p>${link('/programme/bridge/lu-m100/','Original module blueprint')}</p><section id="materials"><h2>Archived materials</h2>${tree(unitBranches)}</section><section><h2>Archived assessments</h2><ul>${['icma41','tma01','icma42','tma02','icma43','tma03','ema-final'].map(id=>`<li>${link(base+'assessments/'+id+'/',id.toUpperCase())}</li>`).join('')}</ul></section>`],
 [base+'b01/','Calculate and express relationships',[...crumbs.slice(0,3),'<span aria-current="page">Block 1</span>'],intro('Calculate and express relationships','Four units build reliable arithmetic, algebra and short learner-written programs.')+`<p>80 unit study hours, including 14 Python hours and the one-hour iCMA 41. TMA 01 has a separate six-hour allocation.</p>`+tree(blockContents[0])],
 ['/learn/physics/','Physics degree learning',[link('/learn/','Learning materials'),'<span aria-current="page">Physics degree</span>'],intro('Physics degree','Three stages, from foundations to independent investigation.')+stageList(degreeModules,e)],
 ];
 for(const m of stage1Modules)pages.push([home(m),m.title,[link('/learn/','Learning materials'),link('/learn/physics/stage-1/','Stage 1'),e(m.code)],intro(e(m.code+' · '+m.title),e(m.purpose))+`<p>30 internal credits · 300 hours</p><h2>Module planner</h2><p>Enrolment and a timetable will become available when this module is ready to begin.</p><h2>Learning materials</h2><p>Teaching materials are forthcoming. ${link(m.path,'Explore the full module blueprint')}.</p>`]);
 for(const n of [1,2,3])pages.push(['/learn/physics/stage-'+n+'/',`Stage ${n}`,[link('/learn/','Learning materials'),`<span aria-current="page">Stage ${n}</span>`],intro('Stage '+n,'Explore the modules in this stage.')+stageList(degreeModules.filter(m=>m.stage===n),e)]);
 for(const m of degreeModules.filter(m=>m.stage>1))pages.push([m.href,m.title,[link('/learn/','Learning materials'),link('/learn/physics/stage-'+m.stage+'/','Stage '+m.stage),`<span aria-current="page">${e(m.code)}</span>`],intro(e(m.code+' · '+m.title),m.option?'Specialist option · Choose one within Stage 3.':'Physics degree · Stage '+m.stage)+`<p>${m.credits} internal credits · ${m.credits*10} planned study hours</p><p class="availability">Teaching forthcoming. The module outline is provisional.</p><p>${link('/programme/#stage-'+m.stage,'Module scope in the programme blueprint')}</p>`]);
 for(const u of m100.units)pages.push([unitPath(u.id),u.title,[...crumbs.slice(0,3),link(blockPath(m100.blocks.find(b=>b.units.includes(u.id)).id),'Block '+Number(m100.blocks.find(b=>b.units.includes(u.id)).id.slice(1))),`<span aria-current="page">${u.id}</span>`],intro(u.title,e(u.can))+`<p>${u.hours} planned study hours · ${link('/programme/bridge/lu-m100/#'+u.id,'Unit blueprint')}.</p>`+tree(lessons.filter(l=>l.unit===u.id).map(l=>branch(titled(l.id,l.id+' · '+l.title),`<p>${e(l.purpose)}</p><p>${l.id==='U01-L01'?link(lessonPath,'Open lesson · All six sections available'):link(lessonUrl(l),'Open lesson · All sections available')}</p>`)).join(''))]);
 pages.push([lessonPath,'Signed quantities and ordered calculations',[...crumbs,link(unitPath('U01'),'Unit 1'),'<span aria-current="page">Lesson 1</span>'],intro('Signed quantities and ordered calculations','Start with familiar arithmetic, then build a dependable way of explaining and checking it.')+`<p>Full lesson: 4 hours · All six sections available, including a downloadable Python practice notebook.</p>`+published.map(id=>fs.readFileSync(root+'content/m100-u01-l01-'+id.toLowerCase()+'.html','utf8')).join('')+`<nav class="lesson-pagination" aria-label="Previous and next"><a href="${unitPath('U01')}">← Unit overview</a><a href="/programme/archive/m100/b01/u01/l02/">Next: Fractions, decimals and named values →</a></nav><p class="small">Original LibraUni teaching · Published 26 September 2026. ${link('/programme/bridge/lu-m100/#opening-sections','Lesson design and section blueprint')}.</p>`]);
 // Generate navigation destinations from the approved hierarchy, without inventing teaching.
 const modules=[{base,blocks:m100.blocks,units:m100.units,lessons:lessons,blueprint:'/programme/bridge/lu-m100/'},...stage1Modules.map(m=>({base:home(m),blocks:stageBlocks[m.code],units:({'LU-M101':m101Units,'LU-M102':m102Units,'LU-P101':p101Units,'LU-A101':a101Units}[m.code]).units,lessons:m.code==='LU-M101'?m101Lessons:m.code==='LU-P101'?p101Block1Lessons.lessons:[],blueprint:m.path}))];
 const addPage=(path,title,parent,items,label,description)=>{
  extraRails.set(path,{title:label,items,back:parent});
  if(pages.some(p=>p[0]===path))return;
  pages.push([path,title,[link('/learn/','Learning materials'),link(parent,'Parent page'),e(title)],intro(e(title),e(description||'Teaching materials are forthcoming.'))+`<p class="availability">Teaching materials forthcoming · This is a curriculum outline.</p>`+items.map(item=>`<p>${item.unitId?unitLink({id:item.unitId,...item},link):link(item.href,item.title)}</p>`).join('')]);
 };
 for(const m of modules){
  extraRails.set(m.base,{title:'Module blocks',items:m.blocks.map(b=>({title:b.title,href:m.base+b.id.toLowerCase()+'/'})),back:m.base===base?'/programme/':'/learn/physics/stage-1/'});
  for(const b of m.blocks){
   const bp=m.base+b.id.toLowerCase()+'/';
   const units=m.units.filter(u=>u.block===b.id||b.units?.includes(u.id));
   addPage(bp,b.title,m.base,units.map(u=>({unitId:u.id,title:u.title,href:bp+u.id.toLowerCase()+'/'})),'Block units',b.purpose);
   for(const u of units){
    const up=bp+u.id.toLowerCase()+'/';const lessons=m.lessons.filter(l=>l.unit===u.id);
    addPage(up,u.title,bp,lessons.map(l=>({title:l.title,href:up+l.id.split('-').at(-1).toLowerCase()+'/'})),'Unit lessons',u.can||u.purpose);
    for(const l of lessons){const lp=up+l.id.split('-').at(-1).toLowerCase()+'/';if(lp!==lessonPath)addPage(lp,l.title,up,[],'Lesson sections',l.purpose);}
   }
  }
 }
 const designPath=base+'b01/design/';
 const allPlans=[{id:'U01-L01',unit:'U01',title:lessons[0].title,minutes:240,sections:openingSections.sections},...block1Sections.lessons];
 const sectionPlan=s=>`<section class="unit-card" id="${s.id}"><p class="eyebrow">${e(s.id)} · ${s.minutes} MINUTES · BLUEPRINT</p><h3>${e(s.title)}</h3><p>${e(s.scope)}</p><dl>${[['Practice / assignment',s.activity||s.practice],['Expected evidence',s.deliverable||'Explained working and corrections; published formative practice.'],['Feedback',s.feedback],['Visual support',s.visuals],['Handover',s.handover]].map(([k,v])=>`<dt>${k}</dt><dd>${e(v)}</dd>`).join('')}</dl><p class="small">Prerequisites: ${e(s.requires.join(', ')||'Guided orientation')}. Allocation in minutes (explanation / mathematics / Python / application / review): ${s.allocationMinutes.join(' / ')}.</p></section>`;
 pages.push([designPath,'Block 1 · Complete teaching and assessment blueprint',[link(base,'M100'),link(base+'b01/','Block 1'),'Design'],intro('Block 1: the complete route','Four units, 19 lessons, section plans and assessment specifications.')+`<p>80 unit hours, including 14 Python hours and iCMA 41. TMA 01 adds its existing six hours. This is the design reference for the published Block 1 teaching. All 19 lessons and both assignments now have separate teaching pages. Publication does not create learner records or completion marks.</p><p>Each practice task is formative unless labelled iCMA or TMA. Practice evidence may be brought to a tutorial; it is not an extra formal submission. Optional targeted backup replaces comparable practice where appropriate; extra remediation is recorded honestly. Existing personal calendar dates are unchanged.</p>`+`<h2>Units and workload</h2><ul>${m100.units.slice(0,4).map(u=>`<li>${link(unitPath(u.id),u.id+' · '+u.title)} · ${u.hours} hours · ${allPlans.filter(l=>l.unit===u.id).length} lessons</li>`).join('')}</ul>`+allPlans.map(l=>`<details class="curriculum-branch" id="${l.id}"><summary>${e(l.id+' · '+l.title)} · ${l.minutes/60} hours</summary><div class="branch-body">${l.sections.map(sectionPlan).join('')}</div></details>`).join('')+`<h2>Formal assignments</h2>`+block1Assessments.map(a=>`<section class="unit-card" id="${a.id}"><h3>${e(a.title)}</h3><p>${e(a.status)}. Baseline deadline: week ${a.week}; your personal planner controls actual dates.</p><p>${e(a.includedIn)}.</p><p>${e(a.format)}</p>${a.parts.map(([name,marks,topic,evidence,source])=>`<h4>${e(name+' · '+topic+' · '+marks+' marks')}</h4><p>${e(evidence)} Preparation: ${e(source)}.</p>`).join('')}<h4>Submission</h4><p>${e(a.submission)}</p><h4>Marking and feedback</h4><p>${e(a.marking)}</p><h4>Independent work</h4><p>${e(a.independence)}</p></section>`).join('')]);
 for(const page of pages){
  const bi=m100.blocks.findIndex(b=>blockPath(b.id)===page[0]);if(bi>0)page[3]=intro(e(m100.blocks[bi].title),e(m100.blocks[bi].purpose))+'<p>Compact prototype teaching · available for browsing and practice.</p>'+tree(blockContents[bi]);
  if(page[0]===base+'b01/')page[3]+=`<p>${link(designPath,'Complete section and assignment blueprint')}</p>`;
  const plan=teachingPlans.find(l=>lessonUrl(lessons.find(x=>x.id===l.id))===page[0]);
  if(plan){
   const lesson=lessons.find(l=>l.id===plan.id),index=lessons.indexOf(lesson),next=lessons[index+1],prev=lessons[index-1];
   page[2]=[...crumbs.slice(0,3),link(blockPath(m100.blocks.find(b=>b.units.includes(plan.unit)).id),'Block '+Number(m100.blocks.find(b=>b.units.includes(plan.unit)).id.slice(1))),link(unitPath(plan.unit),'Unit '+Number(plan.unit.slice(1))),'<span aria-current="page">Lesson '+Number(plan.id.split('-')[1].slice(1))+'</span>'];
   page[3]=intro(e(lesson.title),e(lesson.purpose))+teaching(root,plan,lesson,check)+`<nav class="lesson-pagination" aria-label="Previous and next">${prev?link(lessonUrl(prev),'← '+prev.title):''}${next?link(lessonUrl(next),next.title+' →'):link(base+'assessments/ema-final/','EMA →')}</nav>`;
   extraRails.set(page[0],{title:'In this lesson',items:plan.sections.map(s=>({title:s.title,href:'#'+s.id})),back:unitPath(plan.unit)});
  }
 }
 addM101Teaching({root,pages,extraRails,link});
 addP101Teaching({root,pages,extraRails,link});
 // One breadcrumb rule for every module, block, unit and lesson, including future pages.
 for(const page of pages){
  const module=modules.find(m=>page[0].startsWith(m.base));
  if(!module)continue;
  const rootCrumbs=module.base===base
   ? [link('/programme/','Programme blueprint')]
   : [link('/learn/','Learning materials'),link('/learn/physics/','Physics degree'),link('/learn/physics/stage-1/','Stage 1')];
  const code=module.base.split('/').filter(Boolean).at(-1).toUpperCase();
  const parts=page[0].slice(module.base.length).split('/').filter(Boolean);
  const chain=[{href:module.base,label:code}];
  let href=module.base;
  for(const part of parts){
   href+=part+'/';
   const kind={b:'Block',u:'Unit',l:'Lesson'}[part[0]];
   chain.push({href,label:kind&&/^[bul]\d+$/.test(part)?kind+' '+Number(part.slice(1)):part[0].toUpperCase()+part.slice(1)});
  }
  page[2]=[...rootCrumbs,...chain.map((item,i)=>i===chain.length-1?`<span aria-current="page">${e(item.label)}</span>`:link(item.href,item.label))];
 }
 for(const [path,title,crumb,body] of pages){
  assertBlockUnitLabels(path,body);
  let learningBody=presentOverview(path,body,modules,e);
  if(path===lessonPath){
   learningBody=learningBody.replace(/<input[^>]*data-study-id="[^"]*"[^>]*>/g,'');
   for(const id of published)learningBody=learningBody.replace(new RegExp('(<section id="'+id+'"[\\s\\S]*?)(</section>)'),'$1<p class="section-read"><label>Mark section as read'+check('U01-L01-'+id)+'</label></p>$2');
  }
  let railTitle,railItems,back;
  if(path===lessonPath){railTitle='In this lesson';railItems=openingSections.sections.map(s=>({title:s.title,href:'#'+sectionId(s)}));back=unitPath('U01');}
  if(extraRails.has(path)){const rail=extraRails.get(path);railTitle=rail.title;railItems=rail.items;back=rail.back;}
  if(path.startsWith('/learn/'))learningBody=`<div class="lesson-layout"><aside class="lesson-sidebar">${degreeSidebar(path,modules,extraRails,e)}</aside><article class="lesson-reading" id="lesson-start" tabindex="-1" data-subject="${subjectFor(path.split('/')[4]?.toUpperCase()||'P')}">${learningBody}</article></div>`;
  else if(railItems)learningBody=`<div class="lesson-layout"><aside class="lesson-sidebar"><details class="lesson-navigation" open><summary><span class="sidebar-toggle-label"><span class="sidebar-show">Show sidebar</span><span class="sidebar-hide">Hide sidebar</span></span><span data-current-section></span></summary><nav aria-label="${railTitle}"><h2>${railTitle}</h2><ol>${railItems.map((item,i)=>`<li><a href="${item.href}"><span class="section-number">${String(i+1).padStart(2,'0')}</span><span>${e(item.title)}</span></a></li>`).join('')}</ol>${railItems.length?'':'<p class="small">Not yet published.</p>'}<a class="lesson-back" href="${back}">← ${path===lessonPath?'Unit overview':'Up one level'}</a></nav></details></aside><article class="lesson-reading" id="lesson-start" tabindex="-1" data-subject="${subjectFor(path.split('/')[4]?.toUpperCase()||'P')}">${learningBody}</article></div>`;

  const searchStatus=path.startsWith('/programme/archive/')?'archive':body.includes('data-search-status="available"')?'available':'outline';
  learningBody=learningBody.replace('data-subject="',`data-search-status="${searchStatus}" data-subject="`);
  let html=shell(title,crumb,learningBody).replace('curriculum design and module preview.','learning materials.').replace('</head>','<link rel="stylesheet" href="/src/learning.css"></head>').replace('</body>','<script type="module" src="/src/learning.js"></script><script type="module" src="/src/study-ui.js"></script></body>');
  if(railItems||path.startsWith('/learn/'))html=html.replace('class="programme-page"','class="programme-page lesson-page"').replace('</body>','<script type="module" src="/src/lesson-navigation.js"></script></body>');
  if(m101TeachingPaths.includes(path)||p101TeachingPaths.includes(path))html=html.replace('</body>','<script type="module" src="/src/teaching-code.js"></script></body>').replace('</head>','<link rel="stylesheet" href="/src/teaching.css"></head>').replace('<script type="module" src="/src/study-ui.js"></script>','');
  if(path==='/learn/physics/stage-1/m101/b01/u01/l02/')html=html.replace('</body>','<script type="module" src="/src/m101-vector-lab.js"></script></body>');
  if(path==='/learn/physics/stage-1/m101/b01/u01/l01/')html=html.replace('</body>','<script src="/m101-legacy-links.js"></script></body>');
  if(path.startsWith('/learn/physics/stage-1/p101/'))html=html.replace('<script type="module" src="/src/study-ui.js"></script>','').replace('</head>','<link rel="stylesheet" href="/src/p101.css"></head>');
  if(path==='/learn/')html=html.replace('<a class="button-link" href="/learn/">Learning materials</a>','');
  if(path.startsWith(base))html=html.replace(/<script type="module" src="\/src\/study-ui.js"><\/script>/g,'').replaceAll('LEARNING MATERIALS','PROTOTYPE ARCHIVE').replace(/<p class="section-read">[\s\S]*?<\/p>/g,'');
  fs.mkdirSync(root+path.slice(1),{recursive:true});fs.writeFileSync(root+path.slice(1)+'index.html',html);
 }
}
