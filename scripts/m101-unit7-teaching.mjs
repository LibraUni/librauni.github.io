import fs from 'node:fs';
import {m101Unit7Lessons as lessons} from '../curriculum/m101-released.js';
const home='/learn/physics/stage-1/m101/',block=home+'b02/',unit=block+'u07/';
const path=l=>unit+l.id.split('-').at(-1).toLowerCase()+'/';
export const m101Unit7Paths=[unit,...lessons.map(path)];
export function addM101Unit7({root,pages,extraRails,link}){
 const read=n=>fs.readFileSync(root+'content/m101/'+n+'.html','utf8');
 const wrap=s=>'<div data-search-status="available" class="teaching-reading m101-u7">'+s+'</div><link rel="stylesheet" href="/src/m101-unit7.css">';
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 const closing=unit+'l04/';
 const up=pages.find(p=>p[0]===unit);
 up[3]=wrap(read('unit7'))+'<section><h2>Unit lessons</h2>'+lessons.map((l,i)=>'<p>'+link(path(l),'Lesson '+(i+1)+' · '+l.title)+' · Available</p>').join('')+'<p>'+link(closing+'#M101-U07-L04-S02','Unit exercises')+' · '+link(closing+'#M101-U07-L04-S03','Block 2 review')+' · '+link(closing+'#M101-U07-L04-S04','iCMA 02')+' · '+link('/teaching/m101/M101-Unit-7-Reference.pdf','Download reference PDF')+'</p></section>'+nav(link(block,'← Block 2'),link(path(lessons[0]),'Start Lesson 1 →'));
 for(const [i,l] of lessons.entries()){
  const lp=pages.find(p=>p[0]===path(l)),fragment=read('unit7-lesson'+(i+1));
  lp[1]='M101 · Unit 7 · Lesson '+(i+1)+' · '+l.title;
  lp[3]=wrap(fragment)+nav(link(i?path(lessons[i-1]):unit,i?'← '+lessons[i-1].title:'← Unit 7 introduction'),i+1<lessons.length?link(path(lessons[i+1]),'Next: '+lessons[i+1].title+' →'):link(home+'assessments/','Assessment availability →'))+(i===3?'<script type="module" src="/src/m101-icma02.js"></script>':'');
  extraRails.set(path(l),{title:'In this lesson',back:unit,items:[...[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]})),{href:'#references',title:'Further reading and context'}]});
 }
 const bp=pages.find(p=>p[0]===block);
 bp[3]=bp[3].replace('Unit 7 remains an outline.','Unit 7 is available with all four lessons, exercises, numerical investigations, iCMA 02 and reference resources. Block 2 teaching is complete; TMA 02 remains in preparation.');
 const mp=pages.find(p=>p[0]===home);
 mp[3]+='<section><h2>Local approximation and numerical evidence</h2><p>'+link(unit,'Unit 7')+' · Four lessons and closing resources available. '+link(closing+'#M101-U07-L04-S03','Review Block 2')+'. Unit 8 remains an outline.</p></section>';
 const previous=pages.find(p=>p[0]===block+'u06/l05/');
 previous[3]=previous[3].replace(link(block+'u06/','Return to Unit 6 →'),link(unit,'Next: Unit 7 →'));
 const assessments=pages.find(p=>p[0]===home+'assessments/');
 assessments[3]+='<section><h2>After Block 2</h2><p>'+link(closing+'#M101-U07-L04-S04','iCMA 02 · Formative checkpoint')+' is available. TMA 02 has a separate six-hour allocation; its questions and submission are not released here.</p></section>';
}
