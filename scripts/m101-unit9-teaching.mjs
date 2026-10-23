import fs from 'node:fs';
import {m101Unit9Lessons as lessons} from '../curriculum/m101-released.js';
const home='/learn/physics/stage-1/m101/',block=home+'b03/',unit=block+'u09/';
const path=l=>unit+l.id.split('-').at(-1).toLowerCase()+'/';
export const m101Unit9Paths=[unit,...lessons.map(path)];
export function addM101Unit9({root,pages,extraRails,link}){
 const read=n=>fs.readFileSync(root+'content/m101/'+n+'.html','utf8');
 const wrap=s=>'<div data-search-status="available" class="teaching-reading m101-u9">'+s+'</div><link rel="stylesheet" href="/src/m101-unit9.css">';
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 pages.find(p=>p[0]===unit)[3]=wrap(read('unit9'))+'<section><h2>Unit lessons</h2>'+lessons.map((l,i)=>'<p>'+link(path(l),'Lesson '+(i+1)+' · '+l.title)+' · Available</p>').join('')+'<p>'+link(unit+'l06/#M101-U09-L06-S03','Unit exercises')+' · '+link(unit+'l06/#M101-U09-L06-S04','Conclusion and reference')+' · '+link('/teaching/m101/M101-Unit-9-Reference.pdf','Download reference PDF')+'</p></section>'+nav(link(block,'← Block 3'),link(path(lessons[0]),'Start Lesson 1 →'));
 for(const [i,l] of lessons.entries()){
 const lp=pages.find(p=>p[0]===path(l)),fragment=read('unit9-lesson'+(i+1));
 lp[1]='M101 · Unit 9 · Lesson '+(i+1)+' · '+l.title;
 lp[3]=wrap(fragment)+nav(link(i?path(lessons[i-1]):unit,i?'← '+lessons[i-1].title:'← Unit 9 introduction'),i+1<lessons.length?link(path(lessons[i+1]),'Next: '+lessons[i+1].title+' →'):link(unit,'Return to Unit 9 →'));
 extraRails.set(path(l),{title:'In this lesson',back:unit,items:[...[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]})),{href:'#references',title:'Further reading and context'}]});
 }
 const bp=pages.find(p=>p[0]===block);bp[3]=bp[3].replace(link(unit,'Choosing an integration method')+' · Outline',link(unit,'Choosing an integration method')+' · Available');
 const mp=pages.find(p=>p[0]===home);mp[3]=mp[3].replace('Units 9–11 remain outlines.','Unit 9 is also available; Units 10–11 remain outlines.');mp[3]+='<section><h2>Choosing an integration method</h2><p>'+link(unit,'Unit 9')+' · Six lessons, mixed exercises, a two-part checking notebook and reference resources available.</p></section>';
}
