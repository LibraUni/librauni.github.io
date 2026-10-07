import {unitLink} from './unit-link.mjs';
import fs from 'node:fs';
import {p101Block1Lessons} from '../curriculum/p101-block1-lessons.js';
export const p101Home='/learn/physics/stage-1/p101/';
const unit=p101Home+'b01/u01/';
const lesson=unit+'l01/';
const unit2=p101Home+'b01/u02/';
export const p101TeachingPaths=[p101Home,p101Home+'orientation/',unit,lesson,unit+'l02/',unit+'l03/',unit+'l04/',unit+'l05/',unit+'l06/',unit2,unit2+'l01/',unit2+'l02/'];
export function addP101Teaching({root,pages,extraRails,link}){
 const read=name=>'<div data-search-status="available" class="teaching-reading p101-reading">'+fs.readFileSync(root+'content/p101/'+name+'.html','utf8')+'</div>';
 const notice='';
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 const module=pages.find(p=>p[0]===p101Home);
 module[3]=notice+read('module')+nav(link(p101Home+'orientation/','Practical orientation'),link(unit,'Begin Unit 1 →'))+'<section><h2>Module blocks</h2><p>Complete Unit 1 teaching and resources, the Unit 2 introduction and Unit 2 Lessons 1–2 are available. Later teaching remains in preparation.</p>'+extraRails.get(p101Home).items.map(b=>'<p>'+link(b.href,b.title)+'</p>').join('')+'</section>';
 const u=pages.find(p=>p[0]===unit);
 u[3]=notice+read('unit')+nav(link(p101Home,'← Module introduction'),link(lesson,'Start Lesson 1 →'))+'<section><h2>Unit lessons</h2>'+p101Block1Lessons.lessons.filter(l=>l.unit==='U01').map((l,i)=>'<p>'+link(unit+l.id.split('-').at(-1).toLowerCase()+'/',`Lesson ${i+1} · ${l.title}`)+(i<6?' · Available':' · Lesson plan; teaching in preparation')+'</p>').join('')+'<p>All six lessons are available. <a href="/learn/physics/stage-1/p101/b01/u01/l06/#P101-U01-L06-S03">Unit exercises</a> · <a href="/learn/physics/stage-1/p101/b01/u01/l06/#P101-U01-L06-S05">On-page reference</a> · <a href="/teaching/p101/P101-Unit-1-Reference.pdf" download>Printable reference PDF</a>.</p></section>';
 const l=pages.find(p=>p[0]===lesson);l[3]=notice+read('lesson')+nav(link(unit,'← Unit introduction'),link(unit+'l02/','Lesson 2 →'));
 const fragment=fs.readFileSync(root+'content/p101/lesson.html','utf8');
 const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U01-L01-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
 extraRails.set(lesson,{title:'In this lesson',back:unit,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 pages.push([p101Home+'orientation/','P101 · Practical orientation',[],notice+read('orientation')+nav(link(p101Home,'← Module introduction'),link(unit,'Unit 1 →'))]);
 extraRails.set(p101Home+'orientation/',{title:'Practical orientation',back:p101Home,items:[]});
 const block=pages.find(p=>p[0]===p101Home+'b01/');
 block[3]=notice+'<h1>Measure, model and compute</h1><p>Quantities become models; measurements supply evidence; computation helps us compare the two. Begin with Unit 1 and continue through the block’s natural sequence.</p>'+extraRails.get(p101Home+'b01/').items.map(item=>'<p>'+unitLink({id:item.unitId,...item},link)+(item.unitId==='U01'?' · Complete Unit 1 teaching and reference resources available':item.unitId==='U02'?' · Introduction and Lessons 1–2 available':' · Outline')+'</p>').join('');
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
  pages.find(p=>p[0]===unit2)[3]=wrap('unit2')+nav(link(unit+'l06/','← Unit 1 closing lesson'),link(lessonPath,'Start Lesson 1 →'))+'<section><h2>Unit lessons</h2>'+p101Block1Lessons.lessons.filter(l=>l.unit==='U02').map((l,i)=>'<p>'+link(unit2+l.id.split('-').at(-1).toLowerCase()+'/',`Lesson ${i+1} · ${l.title}`)+(i<2?' · Available':' · Lesson plan')+'</p>').join('')+'</section>';
  pages.find(p=>p[0]===lessonPath)[3]=wrap('unit2-lesson1')+nav(link(unit2,'← Unit 2 introduction'),link(unit2+'l02/','Lesson 2 →'));
  const sectionFragment=fs.readFileSync(root+'content/p101/unit2-lesson1.html','utf8');
  const unit2Sections=[...sectionFragment.matchAll(/<section class="chapter" id="(P101-U02-L01-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(lessonPath,{title:'In this lesson',back:unit2,items:[...unit2Sections,{href:'#references',title:'Further reading and context'}]});
 }

 {
  const path=unit2+'l02/';
  const fragment=fs.readFileSync(root+'content/p101/unit2-lesson2.html','utf8');
  pages.find(p=>p[0]===path)[3]='<div data-search-status="available" class="teaching-reading p101-reading p101-u2 p101-u2-l2">'+fragment+'</div>'+nav(link(unit2+'l01/','← Lesson 1'),link(unit2+'l03/','Lesson 3 plan →'));
  const sections=[...fragment.matchAll(/<section class="chapter" id="(P101-U02-L02-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  extraRails.set(path,{title:'In this lesson',back:unit2,items:[...sections,{href:'#references',title:'Further reading and context'}]});
 }

}
