import fs from 'node:fs';
const home='/learn/physics/stage-1/m101/',block=home+'b02/',unit=block+'u04/',lesson=unit+'l01/';
export const m101Unit4Paths=[block,unit,lesson];
export function addM101Unit4({root,pages,extraRails,link}){
 const read=name=>fs.readFileSync(root+'content/m101/'+name+'.html','utf8');
 const wrap=body=>'<div data-search-status="available" class="teaching-reading m101-u4">'+body+'</div><link rel="stylesheet" href="/src/m101-unit4.css">';
 const nav=(a,b)=>'<nav class="lesson-pagination" aria-label="Reading sequence">'+a+b+'</nav>';
 const bp=pages.find(p=>p[0]===block);
 const links=extraRails.get(block).items.map(u=>'<p>Unit '+Number(u.unitId.slice(1))+': '+link(u.href,u.title)+'</p>').join('');
 bp[3]=wrap(read('block2'))+'<section><h2>Block units</h2><p>Unit 4’s introduction and Lesson 1 are available. Later teaching is in preparation.</p>'+links+'</section>'+nav(link(home+'b01/','← Block 1'),'Unit 4: '+link(unit,'Functions, limits and continuity →'));
 const up=pages.find(p=>p[0]===unit);
 up[3]=wrap(read('unit4'))+'<section><h2>Unit lessons</h2><p>'+link(lesson,'Lesson 1 · Functions and their domains')+' · Available</p><p>Later lessons, unit exercises and reference resources are in preparation.</p></section>'+nav(link(block,'← Block 2 introduction'),link(lesson,'Start Lesson 1 →'));
 const lp=pages.find(p=>p[0]===lesson),fragment=read('unit4-lesson1');
 lp[1]='M101 · Unit 4 · Lesson 1 · Functions and their domains';
 lp[3]=wrap(fragment)+nav(link(unit,'← Unit 4 introduction'),link(unit,'Return to Unit 4 →'));
 extraRails.set(lesson,{title:'In this lesson',back:unit,items:[...[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2]})),{href:'#references',title:'Further reading and context'}]});
 const module=pages.find(p=>p[0]===home);
 module[3]+='<section><h2>Beginning Block 2</h2><p>'+link(block,'Change and local behaviour')+' opens with '+link(unit,'Unit 4: Functions, limits and continuity')+'. The introductions and '+link(lesson,'Lesson 1')+' are available; later teaching remains in preparation.</p></section>';
 const tma=pages.find(p=>p[0]===home+'assessments/tma01/');
 if(tma)tma[3]=tma[3].replace('Unit 4 outline →','Unit 4 introduction →');
}
