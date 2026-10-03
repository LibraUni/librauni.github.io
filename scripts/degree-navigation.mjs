import {moduleMotif,subjectFor} from './module-presentation.mjs';
import {stage1Modules} from '../curriculum/stage1.js';
// Later stages retain the existing programme blueprint, including its six options.
const later=[
 [2,'P201','Core physics: motion, matter & fields',60],
 [2,'M201','Mathematical methods for physics',30],
 [2,'X201','Experimental & computational investigations',30],
 [3,'P301','Electromagnetism & radiation',30],
 [3,'P302','Quantum physics & matter',30],
 [3,'R300','Independent physics project',30],
 [3,'A301','Stars & exoplanets',30,true],
 [3,'A302','Cosmology & the evolving universe',30,true],
 [3,'C301','Computational physics',30,true],
 [3,'T301','Dynamics, chaos & stochastic systems',30,true],
 [3,'T302','Continuum physics & fluids',30,true],
 [3,'P303','Statistical physics & condensed matter',30,true],
];
export const degreeModules=[...stage1Modules.map(m=>({code:m.code.slice(3),title:m.title,stage:1,credits:30})),...later.map(([stage,code,title,credits,option])=>({stage,code,title,credits,option}))].map(m=>({...m,href:`/learn/physics/stage-${m.stage}/${m.code.toLowerCase()}/`}));
// Short catalogue descriptions; Stage 1 uses the approved module purposes.
const catalogueDescriptions={
 P201:'Motion, matter and fields: the connected foundations of core physics.',
 M201:'Mathematical tools for describing and solving physical problems.',
 X201:'Investigate physical questions through experiments and computation.',
 P301:'Explore electric and magnetic fields, waves and radiation.',
 P302:'Explore quantum descriptions of the physical world and matter.',
 R300:'Bring your learning together in an independent physics investigation.',
 A301:'Investigate stars and planetary systems beyond our own.',
 A302:'Explore the structure and evolution of the universe.',
 C301:'Use computation to model and investigate physical systems.',
 T301:'Explore dynamics, chaotic behaviour and random processes.',
 T302:'Study matter and fluids through continuous models.',
 P303:'Connect statistical descriptions with the properties of matter.'
};
export function stageList(modules,e){
 return [1,2,3].filter(n=>modules.some(m=>m.stage===n)).map(n=>`<section class="module-stage" id="stage-${n}"><p class="eyebrow">${['','FOUNDATIONS','DEEPEN YOUR UNDERSTANDING','INDEPENDENT INVESTIGATION'][n]}</p><h2>Stage ${n}</h2>${n===3?'<p class="small">Three core modules and one specialist option.</p>':''}<ul class="module-list">${modules.filter(m=>m.stage===n).map(m=>{
  const available=['M101','P101'].includes(m.code);
  const description=stage1Modules.find(x=>x.code==='LU-'+m.code)?.purpose||catalogueDescriptions[m.code]||'';
  return `<li><a class="module-card" data-subject="${subjectFor(m.code)}" href="${m.href}"><span class="module-code">${e(m.code)}${moduleMotif(m.code)}</span><span class="module-body"><strong class="module-title">${e(m.title)}</strong>${description?`<span class="module-description">${e(description)}</span>`:''}<span class="module-status${available?' available':''}">${m.option?'Specialist option · ':''}${available?(m.code==='M101'?'Introduction &amp; complete Unit 1 available':'Introduction &amp; complete Unit 1 available'):m.stage===1?'Module outline · Teaching forthcoming':'Provisional outline · Teaching forthcoming'}</span></span><span class="module-arrow" aria-hidden="true">→</span></a></li>`;
 }).join('')}</ul></section>`).join('');
}
export function degreeSidebar(path,hierarchy,rails,e){
 const anchor=(href,label)=>`<a href="${href}"${href===path?' aria-current="page"':path.startsWith(href)&&href!=='/learn/'?' class="navigation-ancestor"':''}>${e(label)}</a>`;
 function children(m){
  const h=hierarchy.find(h=>h.base===m.href);if(!h||!path.startsWith(m.href))return '';
  return '<ol>'+h.blocks.map(b=>{
   const bp=m.href+b.id.toLowerCase()+'/';let nested='';
   if(path.startsWith(bp))nested='<ol>'+h.units.filter(u=>u.block===b.id||b.units?.includes(u.id)).map(u=>{
    const up=bp+u.id.toLowerCase()+'/';let ls='';
    if(path.startsWith(up))ls='<ol>'+h.lessons.filter(l=>l.unit===u.id).map(l=>{
     const lp=up+l.id.split('-').at(-1).toLowerCase()+'/';
     const sections=path===lp?(rails.get(lp)?.items||[]).filter(s=>s.href.startsWith('#')):[];
     return '<li>'+anchor(lp,'Lesson '+Number(l.id.split('-').at(-1).slice(1))+' · '+l.title)+(sections.length?'<ol class="section-links">'+sections.map((s,i)=>'<li>'+anchor(s.href,s.title)+'</li>').join('')+'</ol>':'')+'</li>';
    }).join('')+'</ol>';
    return '<li>'+anchor(up,'Unit '+Number(u.id.slice(1))+' · '+u.title)+ls+'</li>';
   }).join('')+'</ol>';
   return '<li>'+anchor(bp,'Block '+Number(b.id.slice(1))+' · '+b.title)+nested+'</li>';
  }).join('')+'</ol>';
 }
 return `<details class="lesson-navigation degree-navigation" open><summary><span class="sidebar-toggle-label"><span class="sidebar-show">Show sidebar</span><span class="sidebar-hide">Hide sidebar</span></span><span data-current-section></span></summary><nav aria-label="Learning materials"><h2>${anchor('/learn/','Learning materials')}</h2>${path.match(/\/l\d+\/$/)?'<a class="current-lesson-link" href="#lesson-start">Back to this lesson ↑</a>':''}<ol class="degree-navigation-tree">${[1,2,3].map(n=>`<li class="navigation-stage">${anchor('/learn/physics/stage-'+n+'/','Stage '+n)}<ol>${degreeModules.filter(m=>m.stage===n).map(m=>'<li class="navigation-module'+(path.startsWith(m.href)?' is-current-module':'')+'">'+anchor(m.href,m.code+' · '+m.title)+children(m)+'</li>').join('')}</ol></li>`).join('')}</ol></nav></details>`;
}
