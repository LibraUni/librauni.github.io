import fs from 'node:fs';
import {p101Block4Lessons} from '../curriculum/p101-block4-lessons.js';
const home='/learn/physics/stage-1/p101/',block=home+'b04/',unit=block+'u11/';
const lessons=p101Block4Lessons.lessons.filter(l=>l.unit==='U11');
const path=l=>unit+l.id.split('-').at(-1).toLowerCase()+'/';
export const p101Unit11Paths=[block,unit,unit+'reference/',...lessons.map(path)];
export function addP101Unit11({root,pages,extraRails,link}){
 pages.find(p=>p[0]===home)[3]+='<section><h2>Fields, circuits and microscopic evidence</h2><p>'+link(block,'Block 4 introduction')+' · '+link(unit,'Unit 11 · Fields, potentials and accumulated work')+' is available with five lessons, exercises, a checked notebook and reference resources. Units 12 and 13 remain in preparation.</p></section>';
 const read=n=>fs.readFileSync(root+'content/p101/'+n+'.html','utf8');
 const wrap=s=>'<div data-search-status="available" class="teaching-reading p101-u11">'+s+'</div><link rel="stylesheet" href="/src/p101-unit11.css">';
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 pages.find(p=>p[0]===block)[3]=wrap(read('block4'))+nav(link(home+'b03/u10/','← Unit 10'),'Unit 11: '+link(unit,'Fields, potentials and accumulated work →'));
 for(const l of p101Block4Lessons.lessons.filter(l=>l.unit!=='U11')) {
 const up=block+l.unit.toLowerCase()+'/';
 pages.find(p=>p[0]===up+l.id.split('-').at(-1).toLowerCase()+'/')[3]='<p class="eyebrow">P101 · Block 4 · '+l.unit+' · Lesson plan</p><h1>'+l.title+'</h1><p>'+l.purpose+'</p><p>'+l.scope+'</p><p>'+l.hours+' planned hours, including '+l.pythonHours+' hours of Python. Teaching is in preparation.</p>'+nav(link(up,'← Unit outline'),'');
 }
 pages.find(p=>p[0]===unit)[3]=wrap(read('unit11'))+'<section><h2>Unit lessons</h2>'+lessons.map((l,i)=>'<p>'+link(path(l),'Lesson '+(i+1)+' · '+l.title)+' · Available</p>').join('')+'<p>'+link(unit+'l05/#P101-U11-L05-S02','Cumulative exercises and solutions')+' · '+link(unit+'reference/','Web reference')+' · '+link('/teaching/p101/u11/P101-Unit-11-Reference.pdf','Reference PDF')+' · '+link('/teaching/p101/u11/P101-Unit-11-Offline.zip','Offline reading and notebook pack')+'</p></section>'+nav(link(block,'← Block 4 introduction'),link(path(lessons[0]),'Start Lesson 1 →'));
 for(const [i,l] of lessons.entries()){
 const lp=pages.find(p=>p[0]===path(l)),fragment=read('unit11-lesson'+(i+1));
 lp[1]='P101 · Unit 11 · Lesson '+(i+1)+' · '+l.title;
 lp[3]=wrap(fragment)+nav(link(i?path(lessons[i-1]):unit,i?'← '+lessons[i-1].title:'← Unit 11 introduction'),i+1<lessons.length?link(path(lessons[i+1]),'Next: '+lessons[i+1].title+' →'):link(unit,'Return to Unit 11 →'));
 extraRails.set(path(l),{title:'In this lesson',back:unit,items:[...[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]})),{href:'#references',title:'Further reading and context'}]});
 }
 pages.push([unit+'reference/','P101 · Unit 11 reference',[],wrap(read('unit11-reference'))+nav(link(unit+'l05/','← Closing lesson and exercises'),link(unit,'Unit overview →'))]);
 extraRails.set(unit+'reference/',{title:'Unit reference',back:unit,items:[]});
}
