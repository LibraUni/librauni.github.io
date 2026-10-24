import fs from 'node:fs';
import {p101Block3Lessons} from '../curriculum/p101-block3-lessons.js';
const home='/learn/physics/stage-1/p101/',block=home+'b03/',unit=block+'u10/';
const lessons=p101Block3Lessons.lessons.filter(l=>l.unit==='U10');
const path=l=>unit+l.id.split('-').at(-1).toLowerCase()+'/';
export const p101Unit10Paths=[unit,unit+'reference/',...lessons.map(path)];
export function addP101Unit10({root,pages,extraRails,link}){
 pages.find(p=>p[0]===home)[3]+='<section><h2>Oscillations, waves and light</h2><p>'+link(unit,'Unit 10 · Light, images and observational limits')+' completes the three-unit Block 3 teaching, with cumulative exercises, formative iCMA03 and reference resources. The separate TMA03 remains in preparation.</p></section>';
 pages.find(p=>p[0]===block)[3]+='<section><h2>Block closing resources</h2><p>Unit 10: '+link(unit,'Light, images and observational limits')+' · '+link(unit+'l05/#P101-U10-L05-S03','Formative iCMA03')+'</p></section>';
 const read=n=>fs.readFileSync(root+'content/p101/'+n+'.html','utf8');
 const wrap=s=>'<div data-search-status="available" class="teaching-reading p101-u10">'+s+'</div><link rel="stylesheet" href="/src/p101-unit10.css"><script type="module" src="/src/p101-unit10.js"></script>';
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 pages.find(p=>p[0]===unit)[3]=wrap(read('unit10'))+'<section><h2>Unit lessons</h2>'+lessons.map((l,i)=>'<p>'+link(path(l),'Lesson '+(i+1)+' · '+l.title)+' · Available</p>').join('')+'<p>'+link(unit+'l05/#P101-U10-L05-S02','Cumulative exercises and solutions')+' · '+link(unit+'reference/','Web reference')+' · '+link('/teaching/p101/u10/P101-Unit-10-Reference.pdf','Reference PDF')+' · '+link('/teaching/p101/u10/P101-Unit-10-Offline.zip','Offline reading and notebook pack')+'</p></section>'+nav(link(block+'u09/','← Unit 9'),link(path(lessons[0]),'Start Lesson 1 →'));
 for(const [i,l] of lessons.entries()){
 const lp=pages.find(p=>p[0]===path(l)),fragment=read('unit10-lesson'+(i+1));
 lp[1]='P101 · Unit 10 · Lesson '+(i+1)+' · '+l.title;
 lp[3]=wrap(fragment)+nav(link(i?path(lessons[i-1]):unit,i?'← '+lessons[i-1].title:'← Unit 10 introduction'),i+1<lessons.length?link(path(lessons[i+1]),'Next: '+lessons[i+1].title+' →'):link(unit,'Return to Unit 10 →'));
 extraRails.set(path(l),{title:'In this lesson',back:unit,items:[...[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]})),{href:'#references',title:'Further reading and context'}]});
 }
 pages.push([unit+'reference/','P101 · Unit 10 reference',[],wrap(read('unit10-reference'))+nav(link(unit+'l05/','← Closing lesson and exercises'),link(unit,'Unit overview →'))]);
 extraRails.set(unit+'reference/',{title:'Unit reference',back:unit,items:[]});
}
