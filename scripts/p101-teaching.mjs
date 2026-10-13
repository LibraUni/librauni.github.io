import {unitLink} from './unit-link.mjs';
import fs from 'node:fs';
import {p101Block1Lessons} from '../curriculum/p101-block1-lessons.js';
import {p101Block2Lessons} from '../curriculum/p101-block2-lessons.js';
export const p101Home='/learn/physics/stage-1/p101/';
const unit=p101Home+'b01/u01/';
const lesson=unit+'l01/';
const unit2=p101Home+'b01/u02/';
const unit3=p101Home+'b01/u03/';
const block2=p101Home+'b02/';
const unit4=block2+'u04/';
export const p101U04LessonCount=3;
export const p101TeachingPaths=[...[2,3,4,5].filter(n=>n<=p101U04LessonCount).map(n=>unit4+'l0'+n+'/'),block2,unit4,unit4+'l01/',p101Home,p101Home+'orientation/',p101Home+'assessments/',p101Home+'assessments/tma01/',unit,lesson,unit+'l02/',unit+'l03/',unit+'l04/',unit+'l05/',unit+'l06/',unit2,unit2+'l01/',unit2+'l02/',unit2+'l03/',unit2+'l04/',unit2+'l05/',unit3,unit3+'l01/',unit3+'l02/',unit3+'l03/',unit3+'l04/',unit3+'l05/'];
export function addP101Teaching({root,pages,extraRails,link}){
 const read=name=>'<div data-search-status="available" class="teaching-reading p101-reading">'+fs.readFileSync(root+'content/p101/'+name+'.html','utf8')+'</div>';
 const notice='';
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 const module=pages.find(p=>p[0]===p101Home);
 module[3]=notice+read('module')+nav(link(p101Home+'orientation/','Practical orientation'),link(unit,'Begin Unit 1 →'))+'<section><h2>Module blocks</h2><p>Complete Units 1 and 2 teaching, exercises and reference resources are available. Complete Unit 3 teaching, exercises, formative iCMA 01 and reference resources are also available. TMA 01 is available after Block 1. Block 2 and Unit 4 introductions and Unit 4 Lesson 1 are available; later teaching remains in preparation.</p><p><a href="/learn/physics/stage-1/p101/assessments/tma01/">TMA 01 · Questions and submission guidance</a></p>'+extraRails.get(p101Home).items.map(b=>'<p>'+link(b.href,b.title)+'</p>').join('')+'</section>';
 const u=pages.find(p=>p[0]===unit);
 u[3]=notice+read('unit')+nav(link(p101Home,'← Module introduction'),link(lesson,'Start Lesson 1 →'))+'<section><h2>Unit lessons</h2>'+p101Block1Lessons.lessons.filter(l=>l.unit==='U01').map((l,i)=>'<p>'+link(unit+l.id.split('-').at(-1).toLowerCase()+'/',`Lesson ${i+1} · ${l.title}`)+(i<6?' · Available':' · Lesson plan; teaching in preparation')+'</p>').join('')+'<p>All six lessons are available. <a href="/learn/physics/stage-1/p101/b01/u01/l06/#P101-U01-L06-S03">Unit exercises</a> · <a href="/learn/physics/stage-1/p101/b01/u01/l06/#P101-U01-L06-S05">On-page reference</a> · <a href="/teaching/p101/P101-Unit-1-Reference.pdf" download>Printable reference PDF</a>.</p></section>';
 const l=pages.find(p=>p[0]===lesson);l[3]=notice+read('lesson')+nav(link(unit,'← Unit introduction'),link(unit+'l02/','Lesson 2 →'));
 const fragment=fs.readFileSync(root+'content/p101/lesson.html','utf8');
 const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U01-L01-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
 extraRails.set(lesson,{title:'In this lesson',back:unit,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 pages.push([p101Home+'orientation/','P101 · Practical orientation',[],notice+read('orientation')+nav(link(p101Home,'← Module introduction'),link(unit,'Unit 1 →'))]);
 extraRails.set(p101Home+'orientation/',{title:'Practical orientation',back:p101Home,items:[]});
 const block=pages.find(p=>p[0]===p101Home+'b01/');
 block[3]=notice+'<h1>Measure, model and compute</h1><p>Quantities become models; measurements supply evidence; computation helps us compare the two. Begin with Unit 1 and continue through the block’s natural sequence.</p>'+extraRails.get(p101Home+'b01/').items.map(item=>'<p>'+unitLink({id:item.unitId,...item},link)+(item.unitId==='U01'?' · Complete Unit 1 teaching and reference resources available':item.unitId==='U02'?' · Complete Unit 2 teaching and reference resources available':item.unitId==='U03'?' · Complete Unit 3 teaching, iCMA 01 and reference resources available':' · Outline')+'</p>').join('');
 const lesson2=unit+'l02/';
 const secondFragment=fs.readFileSync(root+'content/p101/lesson2.html','utf8');
 pages.find(p=>p[0]===lesson2)[3]=read('lesson2')+nav(link(lesson,'← Lesson 1'),link(unit+'l03/','Lesson 3 →'));
 const secondSections=[...secondFragment.matchAll(/<section class="chapter" id="(P101-U01-L02-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
 extraRails.set(lesson2,{title:'In this lesson',back:unit,items:[...secondSections,{href:'#references',title:'Further reading and context'}]});
 const lesson3=unit+'l03/';
 const thirdFragment=fs.readFileSync(root+'content/p101/lesson3.html','utf8');
 pages.find(p=>p[0]===lesson3)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-l3">'+thirdFragment+'</div>'+nav(link(lesson2,'← Lesson 2'),link(unit+'l04/','Lesson 4 →'));
 const thirdSections=[...thirdFragment.matchAll(/<section class="chapter" id="(P101-U01-L03-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
 extraRails.set(lesson3,{title:'In this lesson',back:unit,items:[...thirdSections,{href:'#references',title:'Further reading and context'}]});
 const lesson4=unit+'l04/';
 const fourthFragment=fs.readFileSync(root+'content/p101/lesson4.html','utf8');
 pages.find(p=>p[0]===lesson4)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-l4">'+fourthFragment+'</div>'+nav(link(lesson3,'← Lesson 3'),link(unit+'l05/','Lesson 5 →'));
 const fourthSections=[...fourthFragment.matchAll(/<section class="chapter" id="(P101-U01-L04-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
 extraRails.set(lesson4,{title:'In this lesson',back:unit,items:[...fourthSections,{href:'#references',title:'Further reading and context'}]});
 const lesson5=unit+'l05/';
 const fifthFragment=fs.readFileSync(root+'content/p101/lesson5.html','utf8');
 pages.find(p=>p[0]===lesson5)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-l5">'+fifthFragment+'</div>'+nav(link(lesson4,'← Lesson 4'),link(unit+'l06/','Lesson 6 · Unit review →'));
 const fifthSections=[...fifthFragment.matchAll(/<section class="chapter" id="(P101-U01-L05-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
 extraRails.set(lesson5,{title:'In this lesson',back:unit,items:[...fifthSections,{href:'#references',title:'Further reading and context'}]});
 const lesson6=unit+'l06/';
 const sixthFragment=fs.readFileSync(root+'content/p101/lesson6.html','utf8');
 pages.find(p=>p[0]===lesson6)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-l6">'+sixthFragment+'</div>'+nav(link(lesson5,'← Lesson 5'),link(p101Home+'b01/u02/','Next: Unit 2 →'));
 const sixthSections=[...sixthFragment.matchAll(/<section class="chapter" id="(P101-U01-L06-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
 extraRails.set(lesson6,{title:'In this lesson',back:unit,items:[...sixthSections,{href:'#references',title:'Further reading and context'}]});
 for(const planned of p101Block1Lessons.lessons){
  const path=p101Home+'b01/'+planned.unit.toLowerCase()+'/'+planned.id.split('-').at(-1).toLowerCase()+'/';
  if(path===lesson||path===lesson2||path===lesson3||path===lesson4||path===lesson5||path===lesson6)continue;
  const page=pages.find(p=>p[0]===path);
  page[3]=notice+'<p class="eyebrow">P101 · Block 1 · '+planned.unit+' · Lesson plan</p><h1>'+planned.title+'</h1><p>'+planned.purpose+'</p><p>'+planned.scope+'</p><p>'+planned.hours+' planned hours, including '+planned.pythonHours+' hours of Python. Teaching is in preparation.</p>'+nav(link(p101Home+'b01/'+planned.unit.toLowerCase()+'/',planned.unit==='U02'?'← Unit introduction':'← Unit outline'),'');
 }
 {
  const wrap=name=>'<div data-search-status="available" class="teaching-reading p101-reading p101-u2">'+fs.readFileSync(root+'content/p101/'+name+'.html','utf8')+'</div>';
  const lessonPath=unit2+'l01/';
  pages.find(p=>p[0]===unit2)[3]=wrap('unit2')+nav(link(unit+'l06/','← Unit 1 closing lesson'),link(lessonPath,'Start Lesson 1 →'))+'<section><h2>Unit lessons</h2>'+p101Block1Lessons.lessons.filter(l=>l.unit==='U02').map((l,i)=>'<p>'+link(unit2+l.id.split('-').at(-1).toLowerCase()+'/',`Lesson ${i+1} · ${l.title}`)+(i<5?' · Available':' · Lesson plan')+'</p>').join('')+'<p>All five lessons are available. <a href="'+unit2+'l05/#P101-U02-L05-S05">Unit exercises</a> · <a href="'+unit2+'l05/#P101-U02-L05-S06">On-page reference</a> · <a href="/teaching/p101/P101-Unit-2-Reference.pdf" download>Printable reference PDF</a>.</p></section>';
  pages.find(p=>p[0]===lessonPath)[3]=wrap('unit2-lesson1')+nav(link(unit2,'← Unit 2 introduction'),link(unit2+'l02/','Lesson 2 →'));
  const sectionFragment=fs.readFileSync(root+'content/p101/unit2-lesson1.html','utf8');
  const unit2Sections=[...sectionFragment.matchAll(/<section class="chapter" id="(P101-U02-L01-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(lessonPath,{title:'In this lesson',back:unit2,items:[...unit2Sections,{href:'#references',title:'Further reading and context'}]});
 }

 {
  const path=unit2+'l02/';
  const fragment=fs.readFileSync(root+'content/p101/unit2-lesson2.html','utf8');
  pages.find(p=>p[0]===path)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-u2 p101-u2-l2">'+fragment+'</div>'+nav(link(unit2+'l01/','← Lesson 1'),link(unit2+'l03/','Lesson 3 →'));
  const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U02-L02-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(path,{title:'In this lesson',back:unit2,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 }

 {
  const path=unit2+'l03/';
  const fragment=fs.readFileSync(root+'content/p101/unit2-lesson3.html','utf8');
  pages.find(p=>p[0]===path)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-u2 p101-u2-l3">'+fragment+'</div>'+nav(link(unit2+'l02/','← Lesson 2'),link(unit2+'l04/','Lesson 4 →'));
  const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U02-L03-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(path,{title:'In this lesson',back:unit2,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 }

 {
  const path=unit2+'l04/';
  const fragment=fs.readFileSync(root+'content/p101/unit2-lesson4.html','utf8');
  pages.find(p=>p[0]===path)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-u2 p101-u2-l4">'+fragment+'</div>'+nav(link(unit2+'l03/','← Lesson 3'),link(unit2+'l05/','Lesson 5 · Unit review →'));
  const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U02-L04-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(path,{title:'In this lesson',back:unit2,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 }

 {
  const path=unit2+'l05/';
  const fragment=fs.readFileSync(root+'content/p101/unit2-lesson5.html','utf8');
  pages.find(p=>p[0]===path)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-u2 p101-u2-l5">'+fragment+'</div>'+nav(link(unit2+'l04/','← Lesson 4'),link(unit3,'Unit 3 introduction →'));
  const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U02-L05-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(path,{title:'In this lesson',back:unit2,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 }


 {
  const wrap=name=>'<div data-search-status="available" class="teaching-reading p101-reading p101-u3">'+fs.readFileSync(root+'content/p101/'+name+'.html','utf8')+'</div>';
  const path=unit3+'l01/';
  pages.find(p=>p[0]===unit3)[3]=wrap('unit3')+nav(link(unit2+'l05/','← Unit 2 closing lesson'),link(path,'Start Lesson 1 →'))+'<section><h2>Unit lessons</h2>'+p101Block1Lessons.lessons.filter(l=>l.unit==='U03').map((l,i)=>'<p>'+link(unit3+l.id.split('-').at(-1).toLowerCase()+'/',`Lesson ${i+1} · ${l.title}`)+(i<5?' · Available':' · Lesson plan; teaching in preparation')+'</p>').join('')+'<p><a href="'+unit3+'l05/#P101-U03-L05-S04">Unit exercises</a> · <a href="'+unit3+'l05/#P101-U03-L05-S05">Formative iCMA 01</a> · <a href="'+unit3+'l05/#P101-U03-L05-S06">On-page reference</a> · <a href="/teaching/p101/P101-Unit-3-Reference.pdf" download>Reference PDF</a></p></section>';
  pages.find(p=>p[0]===path)[3]=wrap('unit3-lesson1')+nav(link(unit3,'← Unit 3 introduction'),link(unit3+'l02/','Lesson 2 →'));
  const fragment=fs.readFileSync(root+'content/p101/unit3-lesson1.html','utf8');
  const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U03-L01-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(path,{title:'In this lesson',back:unit3,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 }


 {
  const path=unit3+'l02/';
  const fragment=fs.readFileSync(root+'content/p101/unit3-lesson2.html','utf8');
  pages.find(p=>p[0]===path)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-u3 p101-u3-l2">'+fragment+'</div>'+nav(link(unit3+'l01/','← Lesson 1'),link(unit3+'l03/','Lesson 3 →'));
  const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U03-L02-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(path,{title:'In this lesson',back:unit3,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 }


 {
  const path=unit3+'l03/';
  const fragment=fs.readFileSync(root+'content/p101/unit3-lesson3.html','utf8');
  pages.find(p=>p[0]===path)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-u3 p101-u3-l3">'+fragment+'</div>'+nav(link(unit3+'l02/','← Lesson 2'),link(unit3+'l04/','Lesson 4 →'));
  const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U03-L03-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(path,{title:'In this lesson',back:unit3,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 }


 {
  const path=unit3+'l04/';
  const fragment=fs.readFileSync(root+'content/p101/unit3-lesson4.html','utf8');
  pages.find(p=>p[0]===path)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-u3 p101-u3-l4">'+fragment+'</div>'+nav(link(unit3+'l03/','← Lesson 3'),link(unit3+'l05/','Lesson 5 · Unit review →'));
  const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U03-L04-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(path,{title:'In this lesson',back:unit3,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 }

 {
  const path=unit3+'l05/';
  const fragment=fs.readFileSync(root+'content/p101/unit3-lesson5.html','utf8');
  pages.find(p=>p[0]===path)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-u3 p101-u3-l5">'+fragment+'</div><link rel="stylesheet" href="/src/p101-unit3-lesson5.css">'+nav(link(unit3+'l04/','← Lesson 4'),link(p101Home+'assessments/tma01/','Next: TMA 01 →'))+'<script type="module" src="/src/p101-icma01.js"></script>';
  const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U03-L05-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(path,{title:'In this lesson',back:unit3,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 }

 const assessment=p101Home+'assessments/tma01/';
 pages.push([p101Home+'assessments/','P101 · Assessments',[], '<div data-search-status="available"><h1>P101 assessments</h1><p>After Units 1–3, complete the separate six-hour TMA 01.</p><p>'+link(assessment,'TMA 01 · Can the evidence support the model?')+'</p><p>Later assessments remain in preparation.</p></div>']);
 pages.push([assessment,'P101 · TMA 01',[], '<div data-search-status="available" class="teaching-reading p101-reading p101-tma01">'+fs.readFileSync(root+'content/p101/tma01.html','utf8')+'</div>'+nav(link(unit3+'l05/','← Unit 3 closing lesson'),link(p101Home+'b02/u04/','Unit 4 introduction →'))]);
 block[3]+='<p>'+link(assessment,'After Block 1: TMA 01 · 6 hours')+'</p>';
 extraRails.set(assessment,{title:'TMA 01',back:p101Home,items:[]});


 // Block 2 blueprint precedes teaching: later lessons remain explicit outlines.
 for(const planned of p101Block2Lessons.lessons){
  const up=block2+planned.unit.toLowerCase()+'/';
  const path=up+planned.id.split('-').at(-1).toLowerCase()+'/';
  pages.find(p=>p[0]===path)[3]='<p class="eyebrow">P101 · Block 2 · '+planned.unit+' · Lesson plan</p><h1>'+planned.title+'</h1><p>'+planned.purpose+'</p><p>'+planned.scope+'</p><p>'+planned.hours+' planned hours, including '+planned.pythonHours+' hours of Python. Teaching is in preparation.</p>'+nav(link(up,'← Unit overview'),'');
 }
 const wrap4=name=>'<div data-search-status="available" class="teaching-reading p101-reading p101-u4">'+fs.readFileSync(root+'content/p101/'+name+'.html','utf8')+'</div>';
 pages.find(p=>p[0]===block2)[3]=wrap4('block2')+nav(link(assessment,'← TMA 01'),'Unit 4: '+link(unit4,'Begin interactions, diagrams and motion →'))+'<section><h2>Block units</h2>'+extraRails.get(block2).items.map(item=>'<p>'+unitLink({id:item.unitId,...item},link)+(item.unitId==='U04'?' · Introduction and Lesson 1 available':' · Outline; teaching in preparation')+'</p>').join('')+'</section>';
 pages.find(p=>p[0]===unit4)[3]=wrap4('unit4')+nav(link(block2,'← Block 2 introduction'),link(unit4+'l01/','Start Lesson 1 →'))+'<section><h2>Unit lessons</h2>'+p101Block2Lessons.lessons.filter(l=>l.unit==='U04').map((l,i)=>'<p>'+link(unit4+l.id.split('-').at(-1).toLowerCase()+'/',`Lesson ${i+1} · ${l.title}`)+(i<p101U04LessonCount?' · Available':' · Lesson plan; teaching in preparation')+'</p>').join('')+'</section>';
 const first4=unit4+'l01/';
 pages.find(p=>p[0]===first4)[3]=wrap4('unit4-lesson1')+nav(link(unit4,'← Unit 4 introduction'),link(unit4+'l02/','Lesson 2 →'));
 const fragment4=fs.readFileSync(root+'content/p101/unit4-lesson1.html','utf8');
 const sections4=[...fragment4.matchAll(/<section class="chapter" id="(P101-U04-L01-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
 extraRails.set(first4,{title:'In this lesson',back:unit4,items:[...sections4,{href:'#references',title:'Further reading and context'}]});

 for(let n=2;n<=p101U04LessonCount;n++){
  const path=unit4+'l0'+n+'/';
  const fragment=fs.readFileSync(root+'content/p101/unit4-lesson'+n+'.html','utf8');
  pages.find(p=>p[0]===path)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-u4 p101-u4-new">'+fragment+'</div><link rel="stylesheet" href="/src/p101-unit4-completion.css">'+nav(link(unit4+'l0'+(n-1)+'/','← Lesson '+(n-1)),n<5?link(unit4+'l0'+(n+1)+'/','Lesson '+(n+1)+(n+1<=p101U04LessonCount?' →':' plan →')):link(unit4,'← Unit 4 overview'));
  const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U04-L0\d-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(path,{title:'In this lesson',back:unit4,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 }

}
