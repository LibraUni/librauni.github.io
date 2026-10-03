import './search.css';
import {matchesTitle} from './search-titles.js';

const actions=document.querySelector('.header-actions');
if(actions)mountSearch(actions);

function mountSearch(actions){
 const trigger=document.createElement('button');
 trigger.type='button';trigger.className='search-trigger';
 trigger.setAttribute('aria-label','Search learning materials');
 trigger.setAttribute('aria-haspopup','dialog');
 trigger.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span>Search materials…</span><kbd>⌘ K</kbd>';
 trigger.querySelector('kbd').textContent=/Mac|iPhone|iPad/.test(navigator.platform)?'⌘ K':'Ctrl K';
 actions.prepend(trigger);
 const dialog=document.createElement('dialog');
 dialog.className='search-dialog';dialog.setAttribute('aria-labelledby','search-title');
 dialog.innerHTML=`<div class="search-heading"><h2 id="search-title">Search learning materials</h2><button type="button" class="search-close" aria-label="Close search">×</button></div>
 <form class="search-form" role="search"><label for="learning-search">Words, topics or module codes</label><div class="search-input-row"><input id="learning-search" type="search" placeholder="Try vectors or uncertainty" autocomplete="off" spellcheck="false" enterkeyhint="search"><button type="submit">Search</button></div>
 <div class="search-filters"><label><input type="checkbox" name="titles" aria-describedby="search-title-help"> Titles only</label><label class="search-module-label" for="search-module">Module <select id="search-module" aria-label="Module"><option value="">All modules</option></select></label></div><p class="search-help" id="search-title-help">Titles only matches a word or phrase in a lesson, unit or higher-level page title.</p></form>
 <p class="search-status" role="status" aria-live="polite">Search available lessons and introductions.</p><ol class="search-results" aria-label="Search results"></ol><button type="button" class="search-more" hidden>Show more results</button>`;
 document.body.append(dialog);
 const input=dialog.querySelector('input[type="search"]');
 const form=dialog.querySelector('form');
 const status=dialog.querySelector('.search-status');
 const results=dialog.querySelector('.search-results');
 const more=dialog.querySelector('.search-more');
 const module=dialog.querySelector('select');
 let enginePromise,cataloguePromise,timer,request=0,allResults=[],shown=0,returnFocus;
 async function catalogue(){
  if(!cataloguePromise)cataloguePromise=fetch('/pagefind/manifest.json',{cache:'no-cache'}).then(response=>{
   if(!response.ok)throw new Error('Could not load titles');
   return response.json();
  }).catch(error=>{cataloguePromise=undefined;throw error;});
  return cataloguePromise;
 }
 async function engine(){
  if(!enginePromise){
   const path='/pagefind/pagefind.js';
   enginePromise=import(/* @vite-ignore */path).then(async api=>{
    const filters=await api.filters();
    for(const name of Object.keys(filters.module||{}).sort().filter(name=>![...module.options].some(option=>option.value===name))){
     const option=document.createElement('option');option.value=name;option.textContent=name;module.append(option);
    }
    return api;
   }).catch(error=>{enginePromise=undefined;throw error;});
  }
  return enginePromise;
 }
 function open(){
  if(dialog.open){input.focus();return;}
  returnFocus=document.activeElement;dialog.showModal();input.focus();
  if(input.value.trim()&&!results.children.length)search();
 }
 function close(){dialog.close();}
 trigger.addEventListener('click',open);
 dialog.querySelector('.search-close').addEventListener('click',close);
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}});
 dialog.addEventListener('close',()=>{clearTimeout(timer);request++;returnFocus?.focus();});
 document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();open();}});
 async function appendResults(token){
  const next=allResults.slice(shown,shown+8);
  const data=await Promise.all(next.map(result=>result.data()));
  if(token!==request||!dialog.open)return;
  for(const page of data){
   const li=document.createElement('li');
   const context=document.createElement('p');context.className='search-result-context';
   const label='Available';
   context.textContent=[page.meta.location,label].filter(Boolean).join(' · ');li.append(context);
   const title=document.createElement('a');title.href=safeUrl(page.url);title.textContent=page.meta.title;title.className='search-result-title';li.append(title);
   const sections=(page.sub_results||[]).filter(section=>section.url.includes('#')).slice(0,3);
   if(sections.length){
    for(const section of sections){
     const a=document.createElement('a');a.href=safeUrl(section.url);a.textContent=section.title;a.className='search-section';li.append(a);
     li.append(excerpt(section.excerpt));
    }
   }else li.append(excerpt(page.excerpt));
   results.append(li);
  }
  shown+=data.length;more.hidden=shown>=allResults.length;
  status.textContent=allResults.length?`${allResults.length} matching ${allResults.length===1?'page':'pages'}. Showing ${shown}.`:'No results. Try another word or phrase, or turn off Titles only.';
 }
 async function search(){
  clearTimeout(timer);const token=++request;
  results.replaceChildren();more.hidden=true;shown=0;allResults=[];
  const query=input.value.trim();
  if(!query){status.textContent='Search available lessons and introductions.';return;}
  status.textContent='Searching…';
  try{
   const titlesOnly=form.elements.titles.checked;
   // Load title metadata independently: title matching must not depend on body hits.
   let found;
   if(titlesOnly){
    const records=await catalogue();
    if(token!==request||!dialog.open)return;
    if(module.options.length===1){
     for(const name of [...new Set(records.map(record=>record.module))].sort()){
      const option=document.createElement('option');option.value=name;option.textContent=name;module.append(option);
     }
    }
    found={results:records.filter(record=>(!module.value||record.module===module.value)&&matchesTitle(query,record)).map(record=>({data:async()=>({url:record.url,meta:{...record,title:matchesTitle(query,{title:record.title})?record.title:record.pageTitle},excerpt:'',sub_results:[]})}))};
   }else{
    const api=await engine();
    if(token!==request||!dialog.open)return;
    const filters={status:'available'};
    if(module.value)filters.module=module.value;
    found=await api.search(query,{filters});
   }
   if(token!==request||!dialog.open)return;
   allResults=found.results;await appendResults(token);
  }catch{
   if(token===request)status.textContent='Search could not load. Check your connection and try Search again. You can still browse Learning materials.';
  }
 }
 input.addEventListener('input',()=>{clearTimeout(timer);request++;results.replaceChildren();more.hidden=true;status.textContent=input.value.trim()?'Searching…':'Search available lessons and introductions.';timer=setTimeout(search,180);});
 form.addEventListener('submit',event=>{event.preventDefault();search();});
 form.addEventListener('change',event=>{if(event.target!==input)search();});
 more.addEventListener('click',async()=>{more.disabled=true;try{await appendResults(request);}catch{status.textContent='Could not load more results. Please try again.';}finally{more.disabled=false;}});
 results.addEventListener('click',event=>{if(event.target.closest('a'))close();});
 dialog.addEventListener('keydown',event=>{
  if(event.key==='Escape'){event.preventDefault();close();return;}
  if(!['ArrowDown','ArrowUp'].includes(event.key)||event.target.tagName==='SELECT')return;
  const links=[...results.querySelectorAll('a')];if(!links.length)return;
  const current=links.indexOf(document.activeElement);
  if(document.activeElement!==input&&current<0)return;
  event.preventDefault();
  if(event.key==='ArrowUp'&&current<=0)input.focus();
  else links[Math.min(links.length-1,Math.max(0,current+(event.key==='ArrowDown'?1:-1)))].focus();
 });
}
function safeUrl(value){
 const url=new URL(value,location.origin);
 return url.origin===location.origin&&url.pathname.startsWith('/learn/')&&!/\/m100\//i.test(url.pathname)?url.pathname+url.search+url.hash:'/learn/';
}
function excerpt(html=''){
 const p=document.createElement('p');p.className='search-excerpt';
 // Pagefind supplies highlight markup; copy only text and <mark>, never arbitrary HTML.
 const parsed=new DOMParser().parseFromString(html,'text/html');
 function copy(node,parent){
  if(node.nodeType===Node.TEXT_NODE)parent.append(document.createTextNode(node.textContent));
  else if(node.nodeType===Node.ELEMENT_NODE){
   const target=node.tagName==='MARK'?document.createElement('mark'):parent;
   if(target!==parent)parent.append(target);
   for(const child of node.childNodes)copy(child,target);
  }
 }
 for(const node of parsed.body.childNodes)copy(node,p);
 return p;
}
