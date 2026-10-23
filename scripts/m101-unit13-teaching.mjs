import fs from 'node:fs';
import {m101Unit13Lessons as lessons} from '../curriculum/m101-released.js';
const home='/learn/physics/stage-1/m101/',block=home+'b04/',unit=block+'u13/';
const path=l=>unit+l.id.split('-').at(-1).toLowerCase()+'/';
export const m101Unit13Paths=[unit,...lessons.map(path)];
export function addM101Unit13({root,pages,extraRails,link}){
 const read=n=>fs.readFileSync(root+'content/m101/'+n+'.html','utf8');
 const wrap=s=>'<div data-search-status="available" class="teaching-reading m101-u13">'+s+'</div><link rel="stylesheet" href="/src/m101-unit13.css">';
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 pages.find(p=>p[0]===unit)[3]=wrap(read('unit13'))+'<section><h2>Unit lessons</h2>'+lessons.map((l,i)=>'<p>'+link(path(l),'Lesson '+(i+1)+' · '+l.title)+' · Available</p>').join('')+'<p>'+link(unit+'l04/#M101-U13-L04-S03','Unit exercises')+' · '+link(unit+'l04/#M101-U13-L04-S04','Conclusion and reference')+' · '+link('/teaching/m101/M101-Unit-13-Reference.pdf','Download reference PDF')+'</p></section>'+nav(link(block,'← Block 4'),link(path(lessons[0]),'Start Lesson 1 →'));
 for(const [i,l] of lessons.entries()){
 const lp=pages.find(p=>p[0]===path(l)),fragment=read('unit13-lesson'+(i+1));
 lp[1]='M101 · Unit 13 · Lesson '+(i+1)+' · '+l.title;
 lp[3]=wrap(fragment)+nav(link(i?path(lessons[i-1]):unit,i?'← '+lessons[i-1].title:'← Unit 13 introduction'),i+1<lessons.length?link(path(lessons[i+1]),'Next: '+lessons[i+1].title+' →'):link(unit,'Return to Unit 13 →'));
 extraRails.set(path(l),{title:'In this lesson',back:unit,items:[...[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]})),{href:'#references',title:'Further reading and context'}]});
 }
 const bp=pages.find(p=>p[0]===block);bp[3]=bp[3].replace('Teaching materials forthcoming · This is a curriculum outline.','Both units are available with complete teaching, formative practice and reference resources.');bp[3]=bp[3].replace(link(unit,'Connecting mathematical representations')+' · Outline',link(unit,'Connecting mathematical representations')+' · Available');
 const mp=pages.find(p=>p[0]===home);mp[3]+='<section><h2>Connecting mathematical representations</h2><p>'+link(unit,'Unit 13')+' · Four lessons, cumulative exercises, a synthesis checkpoint and notebook and reference resources available.</p></section>';
}
