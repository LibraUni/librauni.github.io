import fs from 'node:fs';
import {p101Block3Lessons} from '../curriculum/p101-block3-lessons.js';
const home='/learn/physics/stage-1/p101/',block=home+'b03/',unit=block+'u08/';
const lessons=p101Block3Lessons.lessons.filter(l=>l.unit==='U08');
const path=l=>unit+l.id.split('-').at(-1).toLowerCase()+'/';
export const p101Unit8Paths=[block,unit,unit+'reference/',...lessons.map(path)];
export function addP101Unit8({root,pages,extraRails,link}){
 const read=n=>fs.readFileSync(root+'content/p101/'+n+'.html','utf8');
 const wrap=s=>'<div data-search-status="available" class="teaching-reading p101-u8">'+s+'</div><link rel="stylesheet" href="/src/p101-unit8.css"><script type="module" src="/src/p101-unit8.js"></script>';
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 pages.find(p=>p[0]===block)[3]=wrap(read('block3'))+nav(link(home+'b02/u07/','← Unit 7'),'Unit 8: '+link(unit,'Oscillation and sampled signals →'));
 for(const l of p101Block3Lessons.lessons.filter(l=>l.unit!=='U08')) {
 const up=block+l.unit.toLowerCase()+'/';
 pages.find(p=>p[0]===up+l.id.split('-').at(-1).toLowerCase()+'/')[3]='<p class="eyebrow">P101 · Block 3 · '+l.unit+' · Lesson plan</p><h1>'+l.title+'</h1><p>'+l.purpose+'</p><p>'+l.scope+'</p><p>'+l.hours+' planned hours, including '+l.pythonHours+' hours of Python. Teaching is in preparation.</p>'+nav(link(up,'← Unit outline'),'');
 }
 pages.find(p=>p[0]===unit)[3]=wrap(read('unit8'))+'<section><h2>Unit lessons</h2>'+lessons.map((l,i)=>'<p>'+link(path(l),'Lesson '+(i+1)+' · '+l.title)+' · Available</p>').join('')+'<p>'+link(unit+'l05/#P101-U08-L05-S02','Cumulative exercises and solutions')+' · '+link(unit+'reference/','Web reference')+' · '+link('/teaching/p101/u08/P101-Unit-8-Reference.pdf','Reference PDF')+' · '+link('/teaching/p101/u08/P101-Unit-8-Offline.zip','Offline reading and notebook pack')+'</p></section>'+nav(link(block,'← Block 3 introduction'),link(path(lessons[0]),'Start Lesson 1 →'));
 for(const [i,l] of lessons.entries()){
 const lp=pages.find(p=>p[0]===path(l)),fragment=read('unit8-lesson'+(i+1));
 lp[1]='P101 · Unit 8 · Lesson '+(i+1)+' · '+l.title;
 lp[3]=wrap(fragment)+nav(link(i?path(lessons[i-1]):unit,i?'← '+lessons[i-1].title:'← Unit 8 introduction'),i+1<lessons.length?link(path(lessons[i+1]),'Next: '+lessons[i+1].title+' →'):link(unit,'Return to Unit 8 →'));
 extraRails.set(path(l),{title:'In this lesson',back:unit,items:[...[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]})),{href:'#references',title:'Further reading and context'}]});
 }
 pages.push([unit+'reference/','P101 · Unit 8 reference',[],wrap(read('unit8-reference'))+nav(link(unit+'l05/','← Closing lesson and exercises'),link(unit,'Unit overview →'))]);
 extraRails.set(unit+'reference/',{title:'Unit reference',back:unit,items:[]});
}
