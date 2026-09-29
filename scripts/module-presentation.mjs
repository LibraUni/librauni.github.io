// Original vector motifs are visual orientation, not teaching figures or measured data.
export const subjectFor=code=>({M:'mathematics',A:'astronomy',C:'computation',X:'investigation',R:'investigation',T:'physics',P:'physics'}[code[0]]||'physics');
export function moduleMotif(code){
 const subject=subjectFor(code);
 const shapes={
 mathematics:'<path d="M20 72H140M35 82V12M35 72L115 24M115 24L101 27M115 24L110 38"/><path class="motif-soft" d="M115 24V72H35"/>',
 physics:'<path class="motif-soft" d="M15 48H145"/><path d="M15 48C30 4 45 4 60 48S90 92 105 48S135 4 145 32"/>',
 astronomy:'<ellipse cx="80" cy="48" rx="62" ry="28" transform="rotate(-20 80 48)"/><circle cx="70" cy="51" r="9"/><circle cx="126" cy="18" r="4"/>',
 computation:'<path class="motif-soft" d="M25 20H135M25 48H135M25 76H135M25 20V76M62 20V76M98 20V76M135 20V76"/><path d="M25 76L62 48L98 48L135 20"/><circle cx="62" cy="48" r="4"/><circle cx="98" cy="48" r="4"/>',
 investigation:'<path d="M25 75L55 57L82 50L110 24L140 16"/><path class="motif-soft" d="M25 62V86M55 45V69M82 37V63M110 14V34M140 6V26"/>'
 };
 return `<svg class="module-motif" viewBox="0 0 160 96" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[subject]}</svg>`;
}
export function presentOverview(path,body,modules,e){
 const m=modules.find(m=>path.startsWith(m.base));if(!m||!path.startsWith('/learn/'))return body;
 const block=m.blocks.find(b=>path===m.base+b.id.toLowerCase()+'/');
 const unit=m.units.find(u=>path.endsWith('/'+u.id.toLowerCase()+'/'));
 const children=path===m.base?m.blocks.map(b=>({href:m.base+b.id.toLowerCase()+'/',label:'Block '+Number(b.id.slice(1)),description:b.purpose||''})):block?m.units.filter(u=>u.block===block.id||block.units?.includes(u.id)).map(u=>({href:path+u.id.toLowerCase()+'/',label:'Unit '+Number(u.id.slice(1)),description:u.purpose||u.can||''})):unit?m.lessons.filter(l=>l.unit===unit.id).map(l=>({href:path+l.id.split('-').at(-1).toLowerCase()+'/',label:'Lesson '+Number(l.id.split('-').at(-1).slice(1)),description:l.purpose||''})):[];
 for(const child of children){
  const escaped=child.href.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const re=new RegExp(`<p>((?:Unit \\d+: )?<a href="${escaped}">[\\s\\S]*?<\\/a>)([^<]*)<\\/p>`,'g');
  body=body.replace(re,(_,link,suffix)=>`<div class="overview-item"><p>${link.startsWith('Unit ')||link.includes('>'+child.label+' ·')?'':e(child.label)+': '}${link}${suffix}</p>${child.description?`<p class="overview-description">${e(child.description)}</p>`:''}</div>`);
 }
 if(path===m.base||block?.id==='B01'){
  const code=m.base.split('/').filter(Boolean).at(-1).toUpperCase();
  body=body.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)/,`$1<figure class="overview-motif">${moduleMotif(code)}<figcaption>${e(code)} · ${subjectFor(code)}</figcaption></figure>`);
 }
 return body;
}
