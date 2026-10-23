import fs from 'node:fs';
import {m101Unit8Lessons as lessons} from '../curriculum/m101-released.js';
const home='/learn/physics/stage-1/m101/',block=home+'b03/',unit=block+'u08/';
const path=l=>unit+l.id.split('-').at(-1).toLowerCase()+'/';
export const m101Unit8Paths=[block,unit,...lessons.map(path)];
export function addM101Unit8({root,pages,extraRails,link}){
 const read=n=>fs.readFileSync(root+'content/m101/'+n+'.html','utf8');
 const wrap=s=>'<div data-search-status="available" class="teaching-reading m101-u8">'+s+'</div><link rel="stylesheet" href="/src/m101-unit8.css">';
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 pages.find(p=>p[0]===block)[3]=wrap(read('block3'))+'<section><h2>Block units</h2>'+[['u08','Accumulation and the fundamental theorem'],['u09','Choosing an integration method'],['u10','Integral models, signs and dimensions'],['u11','Numerical integration and trustworthy checks']].map(([id,t],i)=>'<p>Unit '+(i+8)+': '+link(block+id+'/',t)+(i?' · Outline':' · Available')+'</p>').join('')+'</section>'+nav(link(home+'b02/','← Block 2'),'Unit 8: '+link(unit,'Begin accumulation →'));
 pages.find(p=>p[0]===unit)[3]=wrap(read('unit8'))+'<section><h2>Unit lessons</h2>'+lessons.map((l,i)=>'<p>'+link(path(l),'Lesson '+(i+1)+' · '+l.title)+' · Available</p>').join('')+'<p>'+link(unit+'l05/#M101-U08-L05-S03','Unit exercises')+' · '+link(unit+'l05/#M101-U08-L05-S04','Conclusion and reference')+' · '+link('/teaching/m101/M101-Unit-8-Reference.pdf','Download reference PDF')+'</p></section>'+nav(link(block,'← Block 3'),link(path(lessons[0]),'Start Lesson 1 →'));
 for(const [i,l] of lessons.entries()){
 const lp=pages.find(p=>p[0]===path(l)),fragment=read('unit8-lesson'+(i+1));
 lp[1]='M101 · Unit 8 · Lesson '+(i+1)+' · '+l.title;
 lp[3]=wrap(fragment)+nav(link(i?path(lessons[i-1]):unit,i?'← '+lessons[i-1].title:'← Unit 8 introduction'),i+1<lessons.length?link(path(lessons[i+1]),'Next: '+lessons[i+1].title+' →'):link(unit,'Return to Unit 8 →'));
 extraRails.set(path(l),{title:'In this lesson',back:unit,items:[...[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]})),{href:'#references',title:'Further reading and context'}]});
 }
 const mp=pages.find(p=>p[0]===home);mp[3]=mp[3].replace('Unit 8 remains an outline.','Unit 8 is available.');mp[3]+='<section><h2>From rates to accumulated quantities</h2><p>'+link(unit,'Unit 8')+' · Five lessons, cumulative exercises, rectangle-sum notebook and reference resources available. Units 9–11 remain outlines.</p></section>';
 const prev=pages.find(p=>p[0]===home+'b02/u07/l04/');prev[3]=prev[3].replace('Its teaching remains a future release.','Its five lessons and closing resources are now available.');prev[3]+='<p>'+link(unit,'Continue to Unit 8 →')+'</p>';
}
