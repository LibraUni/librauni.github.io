import fs from 'node:fs';
import {m101Unit4Lessons as lessons} from '../curriculum/m101-released.js';
const home='/learn/physics/stage-1/m101/',block=home+'b02/',unit=block+'u04/';
const path=l=>unit+l.id.split('-').at(-1).toLowerCase()+'/';
export const m101Unit4Paths=[block,unit,...lessons.map(path)];
export function addM101Unit4({root,pages,extraRails,link}){
 const read=name=>fs.readFileSync(root+'content/m101/'+name+'.html','utf8');
 const wrap=(body,n)=>'<div data-search-status="available" class="teaching-reading m101-u4'+(n>1?' m101-u4-new':'')+'">'+body+'</div><link rel="stylesheet" href="/src/m101-unit4.css">'+(n>1?'<link rel="stylesheet" href="/src/m101-unit4-completion.css">':'');
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 const complete=lessons.length===4;
 const availability=complete?'Unit 4 is available, including all four lessons, unit exercises and reference resources.':'Unit 4’s introduction and Lessons 1–'+lessons.length+' are available. Later teaching is in preparation.';
 const bp=pages.find(p=>p[0]===block);
 const links=extraRails.get(block).items.map(u=>'<p>Unit '+Number(u.unitId.slice(1))+': '+link(u.href,u.title)+'</p>').join('');
 bp[3]=wrap(read('block2'))+'<section><h2>Block units</h2><p>'+availability+' Later units remain outlines.</p>'+links+'</section>'+nav(link(home+'b01/','← Block 1'),'Unit 4: '+link(unit,'Functions, limits and continuity →'));
 const up=pages.find(p=>p[0]===unit);
 up[3]=wrap(read('unit4'))+'<section><h2>Unit lessons</h2>'+lessons.map((l,i)=>'<p>'+link(path(l),'Lesson '+(i+1)+' · '+l.title)+' · Available</p>').join('')+(complete?'<p>'+link(path(lessons.at(-1))+'#M101-U04-L04-S05','Unit exercises and conclusion')+' · '+link(path(lessons.at(-1))+'#M101-U04-L04-S06','Unit reference')+' · '+link('/teaching/m101/M101-Unit-4-Reference.pdf','Download reference PDF')+'</p>':'<p>Later teaching and closing resources remain in preparation.</p>')+'</section>'+nav(link(block,'← Block 2 introduction'),link(path(lessons[0]),'Start Lesson 1 →'));
 for(const [i,l] of lessons.entries()){
  const n=i+1,lp=pages.find(p=>p[0]===path(l)),fragment=read('unit4-lesson'+n);
  lp[1]='M101 · Unit 4 · Lesson '+n+' · '+l.title;
  lp[3]=wrap(fragment,n)+nav(link(i?path(lessons[i-1]):unit,i?'← '+lessons[i-1].title:'← Unit 4 introduction'),i+1<lessons.length?link(path(lessons[i+1]),'Next: '+lessons[i+1].title+' →'):link(unit,'Return to Unit 4 →'));
  extraRails.set(path(l),{title:'In this lesson',back:unit,items:[...[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]})),{href:'#references',title:'Further reading and context'}]});
 }
 const module=pages.find(p=>p[0]===home);
 module[3]+='<section><h2>Beginning Block 2</h2><p>'+link(block,'Change and local behaviour')+' opens with '+link(unit,'Unit 4: Functions, limits and continuity')+'. '+availability+'</p></section>';
 const tma=pages.find(p=>p[0]===home+'assessments/tma01/');
 if(tma)tma[3]=tma[3].replace('Unit 4 outline →','Unit 4 introduction →');
}
