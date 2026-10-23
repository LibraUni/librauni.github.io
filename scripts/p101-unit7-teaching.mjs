import fs from 'node:fs';
import {p101Block2Lessons} from '../curriculum/p101-block2-lessons.js';
const home='/learn/physics/stage-1/p101/',block=home+'b02/',unit=block+'u07/';
const lessons=p101Block2Lessons.lessons.filter(l=>l.unit==='U07');
const path=l=>unit+l.id.split('-').at(-1).toLowerCase()+'/';
export const p101Unit7Paths=[unit,unit+'reference/',...lessons.map(path)];
export function addP101Unit7({root,pages,extraRails,link}){
 const read=n=>fs.readFileSync(root+'content/p101/'+n+'.html','utf8');
 const wrap=s=>'<div data-search-status="available" class="teaching-reading p101-u7">'+s+'</div><link rel="stylesheet" href="/src/p101-unit7.css"><script type="module" src="/src/p101-unit7.js"></script>';
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 pages.find(p=>p[0]===unit)[3]=wrap(read('unit7'))+'<section><h2>Unit lessons</h2>'+lessons.map((l,i)=>'<p>'+link(path(l),'Lesson '+(i+1)+' · '+l.title)+' · Available</p>').join('')+'<p>'+link(unit+'l05/#P101-U07-L05-S02','Cumulative exercises and solutions')+' · '+link(unit+'l05/#P101-U07-L05-S03','Formative iCMA 02')+' · '+link(unit+'reference/','Web reference')+' · '+link('/teaching/p101/u07/P101-Unit-7-Reference.pdf','Reference PDF')+' · '+link('/teaching/p101/u07/P101-Unit-7-Offline.zip','Offline reading and notebook pack')+'</p></section>'+nav(link(block+'u06/l05/','← Unit 6 closing lesson'),link(path(lessons[0]),'Start Lesson 1 →'));
 for(const [i,l] of lessons.entries()){
 const lp=pages.find(p=>p[0]===path(l)),fragment=read('unit7-lesson'+(i+1));
 lp[1]='P101 · Unit 7 · Lesson '+(i+1)+' · '+l.title;
 lp[3]=wrap(fragment)+(i===4?'<script type="module" src="/src/p101-icma02.js"></script>':'')+nav(link(i?path(lessons[i-1]):unit,i?'← '+lessons[i-1].title:'← Unit 7 introduction'),i+1<lessons.length?link(path(lessons[i+1]),'Next: '+lessons[i+1].title+' →'):link(unit,'Return to Unit 7 →'));
 extraRails.set(path(l),{title:'In this lesson',back:unit,items:[...[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]})),{href:'#references',title:'Further reading and context'}]});
 }
 pages.push([unit+'reference/','P101 · Unit 7 reference',[],wrap(read('unit7-reference'))+nav(link(unit+'l05/','← Closing lesson and exercises'),link(unit,'Unit overview →'))]);
 extraRails.set(unit+'reference/',{title:'Unit reference',back:unit,items:[]});
}
