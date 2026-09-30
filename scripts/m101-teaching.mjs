import fs from 'node:fs';
import {m101Unit1Lessons} from '../curriculum/m101-released.js';
export const m101Home='/learn/physics/stage-1/m101/';
export const m101Unit=m101Home+'b01/u01/';
export const m101Lesson=m101Unit+'l01/';
export const m101Lesson2=m101Unit+'l02/';
export const m101Lesson3=m101Unit+'l03/';
export const m101TeachingPaths=[m101Home,m101Unit,m101Lesson,m101Lesson2,m101Lesson3];
export function addM101Teaching({root,pages,extraRails,link}){
 const reading=name=>'<div class="teaching-reading">'+fs.readFileSync(root+'content/m101/'+name+'.html','utf8')+'</div>';
 const pagination=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 const module=pages.find(p=>p[0]===m101Home);
 const blocks=extraRails.get(m101Home).items;
 module[3]=reading('module')+pagination('',link(m101Unit,'Begin Unit 1 →'))+'<section id="materials"><h2>Module blocks</h2><p>The introduction and Unit 1 Lessons 1–3 are available. Further teaching is in preparation.</p>'+blocks.map(b=>'<p>'+link(b.href,b.title)+'</p>').join('')+'</section><section><h2>Module planner</h2><p>Enrolment and a timetable will become available when the module is ready to begin.</p></section>';
 const unit=pages.find(p=>p[0]===m101Unit);
 unit[3]=reading('unit')+pagination(link(m101Home,'← Module introduction'),link(m101Lesson,'Start Lesson 1 →'))+'<section id="unit-lessons"><h2>Unit lessons</h2><p>Lessons 1–3 are available. Lessons 4–5, the complete unit exercise set and reference resources are in preparation.</p>'+m101Unit1Lessons.map((l,i)=>'<p>'+link(m101Unit+l.id.split('-').at(-1).toLowerCase()+'/',`Lesson ${i+1} · ${l.title}`)+(i>2?' · Outline; teaching in preparation':' · Available')+'</p>').join('')+'</section>';
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
  third[3]='<p class="small">4 hours including explanation, written activities and feedback.</p>'+reading('lesson3')+pagination(link(m101Lesson2,'← Adding and scaling vectors'),link(m101Unit+'l04/','Next lesson outline: Resolving and reconstructing components →'));
  const fragment3=fs.readFileSync(root+'content/m101/lesson3.html','utf8');
  const items3=[...fragment3.matchAll(/<section class="chapter" id="(M101-U01-L03-S\d+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]}));
  items3.push({href:'#references',title:'Further reading and context'});
  extraRails.set(path,{title:'In this lesson',back:m101Unit,items:items3});
 }
 const block=pages.find(p=>p[0]===m101Home+'b01/');
 block[3]=block[3].replace('Teaching materials forthcoming · This is a curriculum outline.','Unit 1 Lessons 1–3 are available. Further block teaching is in preparation.');
 for(const page of pages){
  if(page[0]==='/learn/physics/')page[3]=page[3].replace('Degree teaching is forthcoming.','M101’s introduction and first three lessons are available; further degree teaching is in preparation.');
  if(page[0]==='/learn/physics/stage-1/')page[3]=page[3].replace('No stage teaching is published yet.','M101’s introduction and first three lessons are available.');
 }
}
