import fs from 'node:fs';
import {m101Unit5Lessons as lessons} from '../curriculum/m101-released.js';
const home='/learn/physics/stage-1/m101/',block=home+'b02/',unit=block+'u05/';
const path=l=>unit+l.id.split('-').at(-1).toLowerCase()+'/';
export const m101Unit5Paths=[unit,...lessons.map(path)];
export function addM101Unit5({root,pages,extraRails,link}){
 const read=n=>fs.readFileSync(root+'content/m101/'+n+'.html','utf8');
 const wrap=s=>'<div data-search-status="available" class="teaching-reading m101-u5">'+s+'</div><link rel="stylesheet" href="/src/m101-unit5.css">';
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 const up=pages.find(p=>p[0]===unit);
 up[3]=wrap(read('unit5'))+'<section><h2>Unit lessons</h2>'+lessons.map((l,i)=>'<p>'+link(path(l),'Lesson '+(i+1)+' · '+l.title)+' · Available</p>').join('')+(lessons.length===6?'<p>'+link(unit+'l06/#M101-U05-L06-S04','Unit exercises')+' · '+link(unit+'l06/#M101-U05-L06-S05','Conclusion and reference')+' · '+link('/teaching/m101/M101-Unit-5-Reference.pdf','Download reference PDF')+'</p>':'<p>Local development: remaining lessons and closing resources are in preparation.</p>')+'</section>'+nav(link(block,'← Block 2'),link(path(lessons[0]),'Start Lesson 1 →'));
 for(const [i,l] of lessons.entries()){
 const lp=pages.find(p=>p[0]===path(l)),fragment=read('unit5-lesson'+(i+1));
 lp[1]='M101 · Unit 5 · Lesson '+(i+1)+' · '+l.title;
 lp[3]=wrap(fragment)+nav(link(i?path(lessons[i-1]):unit,i?'← '+lessons[i-1].title:'← Unit 5 introduction'),i+1<lessons.length?link(path(lessons[i+1]),'Next: '+lessons[i+1].title+' →'):link(unit,'Return to Unit 5 →'));
 extraRails.set(path(l),{title:'In this lesson',back:unit,items:[...[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]})),{href:'#references',title:'Further reading and context'}]});
 }
 const bp=pages.find(p=>p[0]===block);bp[3]=bp[3].replace('Later units remain outlines.',lessons.length===6?'Unit 5 is also available, including all six lessons and closing resources. Units 6–7 remain outlines.':'Unit 5 is in local development. Units 6–7 remain outlines.');
 const mp=pages.find(p=>p[0]===home);mp[3]+='<section><h2>Derivatives and differentiation methods</h2><p>'+link(unit,'Unit 5')+' · '+(lessons.length===6?'Six lessons, cumulative exercises, Python investigation and reference resources available.':'Local development in progress.')+'</p></section>';
}
