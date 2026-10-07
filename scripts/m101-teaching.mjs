import fs from 'node:fs';
import {m101Unit1Lessons,m101Unit2Lessons} from '../curriculum/m101-released.js';
export const m101Home='/learn/physics/stage-1/m101/';
export const m101Unit=m101Home+'b01/u01/';
export const m101Lesson=m101Unit+'l01/';
export const m101Lesson2=m101Unit+'l02/';
export const m101Lesson3=m101Unit+'l03/';
export const m101Lesson4=m101Unit+'l04/';
export const m101Lesson5=m101Unit+'l05/';
export const m101TeachingPaths=[m101Home,m101Unit,m101Lesson,m101Lesson2,m101Lesson3,m101Lesson4,m101Lesson5,m101Home+'b01/u02/',m101Home+'b01/u02/l01/'];
export function addM101Teaching({root,pages,extraRails,link}){
 const reading=name=>'<div data-search-status="available" class="teaching-reading'+(name==='lesson4'?' m101-l04':name==='lesson5'?' m101-l05':'')+'">'+fs.readFileSync(root+'content/m101/'+name+'.html','utf8')+'</div>';
 const pagination=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 const module=pages.find(p=>p[0]===m101Home);
 const blocks=extraRails.get(m101Home).items;
 module[3]=reading('module')+pagination('',link(m101Unit,'Begin Unit 1 →'))+'<section id="materials"><h2>Module blocks</h2><p>The introduction and Unit 1 Lessons 1–4 are available. Further teaching is in preparation.</p>'+blocks.map(b=>'<p>'+link(b.href,b.title)+'</p>').join('')+'</section><section><h2>Module planner</h2><p>Enrolment and a timetable will become available when the module is ready to begin.</p></section>';
 const unit=pages.find(p=>p[0]===m101Unit);
 unit[3]=reading('unit')+pagination(link(m101Home,'← Module introduction'),link(m101Lesson,'Start Lesson 1 →'))+'<section id="unit-lessons"><h2>Unit lessons</h2><p>Lessons 1–4 are available. Lesson 5, the complete unit exercise set and reference resources are in preparation.</p>'+m101Unit1Lessons.map((l,i)=>'<p>'+link(m101Unit+l.id.split('-').at(-1).toLowerCase()+'/',`Lesson ${i+1} · ${l.title}`)+(i>3?' · Outline; teaching in preparation':' · Available')+'</p>').join('')+'</section>';
 let body=reading('lesson');
 const aliases={'lesson-opening':['coordinates'],'M101-U01-L01-S01':['m101-u01-s01','m101-u01-s01-01'],'M101-U01-L01-S02':['m101-u01-s01-02'],'M101-U01-L01-S07':['opening-conclusion','lesson-exercises']};
 for(const [id,old] of Object.entries(aliases))body=body.replace(`id="${id}">`,`id="${id}">`+old.map(a=>`<span class="legacy-anchor" id="${a}" aria-hidden="true"></span>`).join(''));
 body='<p class="small">3 hours including the Unit 1 introduction, activities and feedback.</p>'+body+pagination(link(m101Unit,'← Unit 1 introduction'),link(m101Unit+'l02/','Next: Adding and scaling vectors →'));
 const existing=pages.find(p=>p[0]===m101Lesson);
 existing[1]='M101 · Lesson 1 · Coordinates, position and displacement';existing[3]=body;
 const fragment=fs.readFileSync(root+'content/m101/lesson.html','utf8');
 const items=[...fragment.matchAll(/<section class="chapter" id="(M101-U01-L01-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
 items.push({href:'#references',title:'Further reading and context'});
 extraRails.set(m101Lesson,{title:'In this lesson',back:m101Unit,items});
 const second=pages.find(p=>p[0]===m101Lesson2);
 second[1]='M101 · Lesson 2 · Adding and scaling vectors';
 second[3]='<p class="small">4 hours including explanation, written activities and feedback.</p>'+reading('lesson2')+pagination(link(m101Lesson,'← Coordinates, position and displacement'),link(m101Unit+'l03/','Next: Magnitude and unit vectors →'));
 const secondFragment=fs.readFileSync(root+'content/m101/lesson2.html','utf8');
 const secondItems=[...secondFragment.matchAll(/<section class="chapter" id="(M101-U01-L02-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
 secondItems.push({href:'#references',title:'Further reading and context'});
 extraRails.set(m101Lesson2,{title:'In this lesson',back:m101Unit,items:secondItems});
 {
  const path=m101Unit+'l03/';
  const third=pages.find(p=>p[0]===path);
  third[1]='M101 · Lesson 3 · Magnitude and unit vectors';
  third[3]='<p class="small">4 hours including explanation, written activities and feedback.</p>'+reading('lesson3')+pagination(link(m101Lesson2,'← Adding and scaling vectors'),link(m101Unit+'l04/','Next: Resolving and reconstructing components →'));
  const fragment3=fs.readFileSync(root+'content/m101/lesson3.html','utf8');
  const items3=[...fragment3.matchAll(/<section class="chapter" id="(M101-U01-L03-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  items3.push({href:'#references',title:'Further reading and context'});
  extraRails.set(path,{title:'In this lesson',back:m101Unit,items:items3});
 }
 const fourth=pages.find(p=>p[0]===m101Lesson4);
 fourth[1]='M101 · Lesson 4 · Resolving and reconstructing components';
 fourth[3]='<p class="small">4 hours including explanation, activities and feedback.</p>'+reading('lesson4')+pagination(link(m101Lesson3,'← Magnitude and unit vectors'),link(m101Unit+'l05/','Next lesson outline: Vector fluency and unit review →'))+'<link rel="stylesheet" href="/src/m101-lesson4.css"><script type="module" src="/src/m101-angle-lab.js"></script>';
 const fourthFragment=fs.readFileSync(root+'content/m101/lesson4.html','utf8');
 const fourthItems=[...fourthFragment.matchAll(/<section class="chapter" id="(M101-U01-L04-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
 fourthItems.push({href:'#references',title:'Further reading and context'});
 extraRails.set(m101Lesson4,{title:'In this lesson',back:m101Unit,items:fourthItems});
 {
  const fifth=pages.find(p=>p[0]===m101Lesson5);
  fifth[1]='M101 · Lesson 5 · Vector fluency and unit review';
  fifth[3]='<p class="small">3 hours including unit exercises, feedback and reference work.</p>'+reading('lesson5')+pagination(link(m101Lesson4,'← Resolving and reconstructing components'),link(m101Home+'b01/u02/','Next unit outline: Products, projections and orientation →'))+'<link rel="stylesheet" href="/src/m101-lesson5.css">';
  const fragment5=fs.readFileSync(root+'content/m101/lesson5.html','utf8');
  const items5=[...fragment5.matchAll(/<section class="chapter" id="(M101-U01-L05-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  items5.push({href:'#references',title:'Further reading and context'});
  extraRails.set(m101Lesson5,{title:'In this lesson',back:m101Unit,items:items5});
  fourth[3]=fourth[3].replace('Next lesson outline: Vector fluency and unit review','Next: Vector fluency and unit review');
  unit[3]=unit[3].replace('Lessons 1–4 are available. Lesson 5, the complete unit exercise set and reference resources are in preparation.','All five lessons, the complete unit exercise set and reference PDF are available.').replace(' · Outline; teaching in preparation',' · Available');
  module[3]=module[3].replace('The introduction and Unit 1 Lessons 1–4 are available. Further teaching is in preparation.','The introduction and all five Unit 1 lessons are available, including the unit exercises and reference PDF. Further teaching is in preparation.');
 }
 const block=pages.find(p=>p[0]===m101Home+'b01/');
 block[3]=block[3].replace('Teaching materials forthcoming · This is a curriculum outline.','Unit 1 is available with all five lessons, unit exercises and reference resources. Further block teaching is in preparation.');
 for(const page of pages){
  if(page[0]==='/learn/physics/')page[3]=page[3].replace('Degree teaching is forthcoming.','M101’s introduction and complete first unit are available; further degree teaching is in preparation.');
  if(page[0]==='/learn/physics/stage-1/')page[3]=page[3].replace('No stage teaching is published yet.','M101’s introduction and complete first unit are available.');
 }

 const unit2=m101Home+'b01/u02/';
 const unit2Lesson=unit2+'l01/';
 const wrap2=name=>'<div data-search-status="available" class="teaching-reading m101-u2">'+fs.readFileSync(root+'content/m101/'+name+'.html','utf8')+'</div><link rel="stylesheet" href="/src/m101-unit2.css">';
 const u2=pages.find(p=>p[0]===unit2);
 u2[3]=wrap2('unit2')+pagination(link(m101Lesson5,'← Unit 1 closing lesson'),link(unit2Lesson,'Start Lesson 1 →'))+'<section><h2>Unit lessons</h2><p>The introduction and Lesson 1 are available. Later lessons and unit-closing resources remain in preparation.</p>'+m101Unit2Lessons.map((l,i)=>'<p>'+link(unit2+l.id.split('-').at(-1).toLowerCase()+'/',`Lesson ${i+1} · ${l.title}`)+(i===0?' · Available':' · Lesson plan')+'</p>').join('')+'</section>';
 const l1=pages.find(p=>p[0]===unit2Lesson);
 l1[1]='M101 · Unit 2 · Lesson 1 · Scalar products and angles';
 l1[3]=wrap2('unit2-lesson1')+pagination(link(unit2,'← Unit 2 introduction'),link(unit2+'l02/','Lesson 2 plan →'));
 const u2fragment=fs.readFileSync(root+'content/m101/unit2-lesson1.html','utf8');
 const u2items=[...u2fragment.matchAll(/<section class="chapter" id="(M101-U02-L01-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
 extraRails.set(unit2Lesson,{title:'In this lesson',back:unit2,items:[...u2items,{href:'#references',title:'Further reading and context'}]});
 for(const planned of m101Unit2Lessons.slice(1)){
  const path=unit2+planned.id.split('-').at(-1).toLowerCase()+'/';
  pages.find(p=>p[0]===path)[3]='<section data-search-status="outline"><p class="eyebrow">M101 · Unit 2 · Lesson plan</p><h1>'+planned.title+'</h1><p>'+planned.purpose+'</p><p>'+planned.scope+'</p><p>'+planned.hours+' planned study hours. Teaching is in preparation.</p></section>'+pagination(link(unit2,'← Unit 2 introduction'),'');
 }
 pages.find(p=>p[0]===m101Lesson5)[3]=pages.find(p=>p[0]===m101Lesson5)[3].replace('Next unit outline: Products, projections and orientation','Next: Products, projections and orientation');
 module[3]=module[3].replace('Further teaching is in preparation.','The Unit 2 introduction and Lesson 1 are also available; later teaching remains in preparation.');
 block[3]=block[3].replace('Further block teaching is in preparation.','The Unit 2 introduction and Lesson 1 are also available; later block teaching remains in preparation.');

}
