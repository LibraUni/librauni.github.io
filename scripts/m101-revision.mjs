import fs from 'node:fs';
export function addM101Revision({root,pages,extraRails,link}){
 const home='/learn/physics/stage-1/m101/',revision=home+'revision/';
 const manifest=JSON.parse(fs.readFileSync(root+'content/m101/revision/manifest.json','utf8'));
 for(const p of manifest){
  const content=fs.readFileSync(root+'content/m101/revision/'+p.fragment+'.html','utf8');
  pages.push([p.route,'M101 · '+p.title,[],content+'<nav class="lesson-pagination" aria-label="Revision resources">'+link(home,'← M101 module')+(p.route===revision?link(revision+'record/','Revision record →'):link(revision,'← Revision materials'))+'</nav>'+(p.route===revision?'<script type="module" src="/src/m101-revision-copy.js"></script>':'')]);
  extraRails.set(p.route,{title:'Revision resources',back:home,items:manifest.map(m=>({href:m.route,title:m.title}))});
 }
 const listing='<section id="m101-revision-resources"><h2>Revision and public specimen</h2><p>'+link(revision+'policy/','M101 completion policy')+' · Adopted 29 October 2026 for future assessed attempts.</p><p>'+link(revision,'Revision: methods, meaning and checks')+' · Six sessions, diagnostic, targeted repair and retention check within the existing 12-hour allocation.</p><p>'+link(revision+'record/','Revision record')+' · Print or use alongside your notebook; the page does not save or submit work.</p><p>'+link(revision+'specimen/','Public specimen examination')+' · '+link(revision+'specimen/guide/','Specimen marking guide')+' · '+link(revision+'specimen/clarifications/','Marking clarifications')+' · '+link(revision+'reference/','Examination reference sheet')+'</p><p>The full specimen sitting and correction use their separate assessment allocation. These are practice resources and do not award module marks.</p></section>';
 pages.find(p=>p[0]===home)[3]+=listing;
 pages.find(p=>p[0]===home+'assessments/')[3]+=listing;
}
