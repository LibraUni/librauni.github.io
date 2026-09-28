// Reading position is navigation only; it never writes completion or learner records.
const panel=document.querySelector('.lesson-navigation');
const list=panel.querySelector('ol');
const links=[...list.querySelectorAll('a')].filter(a=>a.pathname===location.pathname&&a.hash&&document.getElementById(a.hash.slice(1)));
const sections=links.map(a=>document.getElementById(a.hash.slice(1)));
const compact=matchMedia('(max-width: 900px)');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let current=-1,scheduled=false;
function responsive(){panel.open=!compact.matches;}
responsive();compact.addEventListener('change',responsive);
function update(){
 scheduled=false;
 if(!links.length)return;
 const line=compact.matches?100:160;
 let index=0;
 sections.forEach((section,i)=>{if(section.getBoundingClientRect().top<=line)index=i;});
 if(innerHeight+scrollY>=document.documentElement.scrollHeight-3)index=sections.length-1;
 if(index===current)return;current=index;
 links.forEach((a,i)=>{if(i===index)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
 panel.querySelector('[data-current-section]').textContent=String(index+1).padStart(2,'0')+' / '+String(links.length).padStart(2,'0');
 const active=links[index],box=list.getBoundingClientRect(),item=active.getBoundingClientRect();
 if(item.top<box.top||item.bottom>box.bottom)list.scrollTop+=item.top-box.top-list.clientHeight/2+item.height/2;
}
function queue(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
links.forEach(a=>a.addEventListener('click',event=>{
 event.preventDefault();const target=document.getElementById(a.hash.slice(1));
 if(compact.matches)panel.open=false;
 for(let p=target;p;p=p.parentElement)if(p.matches('details.curriculum-branch'))p.open=true;
 history.pushState(null,'',a.hash);
 target.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
 const heading=target.querySelector('h2,summary');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
 queue();
}));
addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);addEventListener('hashchange',queue);
new ResizeObserver(queue).observe(document.querySelector('.lesson-reading'));
update();

// Keep the current page visible within the continuous navigation tree.
const pageLink=panel.querySelector('[aria-current="page"]');
if(pageLink&&list.contains(pageLink))list.scrollTop=Math.max(0,pageLink.offsetTop-list.offsetTop-list.clientHeight/3);
