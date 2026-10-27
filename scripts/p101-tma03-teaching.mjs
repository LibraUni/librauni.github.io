import fs from 'node:fs';
const home='/learn/physics/stage-1/p101/',assessment=home+'assessments/tma03/';
export const p101Tma03Path=assessment;
export function addP101Tma03({root,pages,extraRails,link}){
 const fragment=fs.readFileSync(root+'content/p101/tma03.html','utf8'),closing=home+'b03/u10/l05/';
 pages.push([assessment,'P101 · TMA 03 · Patterns, light and the limits of a record',[],
 '<div data-search-status="available" class="teaching-reading p101-tma03">'+fragment+'</div><link rel="stylesheet" href="/src/p101-tma03.css"><nav class="lesson-pagination" aria-label="Reading sequence">'+link(closing,'← Block 3 review and iCMA03')+link(home+'b04/u11/','Next unit outline: Fields, potentials and accumulated work →')+'</nav>']);
 const index=pages.find(p=>p[0]===home+'assessments/');
 index[3]=index[3].replace('Later assessments remain in preparation.','TMA 03 is also available after Units 8–10. The EMA remains in preparation.');
 index[3]+='<section><h2>Block 3 assessment</h2><p>'+link(assessment,'TMA 03 · Patterns, light and the limits of a record')+' · Questions and public marking criteria after Units 8–10; six separate assessment hours.</p></section>';
 const module=pages.find(p=>p[0]===home);
 module[3]=module[3].replace('The separate TMA03 remains in preparation.','The separate TMA03 is available after Unit 10.');
 module[3]+='<section><h2>Block 3 assessment</h2><p>'+link(assessment,'TMA 03 · Questions and marking criteria')+' · Available after Units 8–10; six separate hours.</p></section>';
 pages.find(p=>p[0]===home+'b03/')[3]+='<p>'+link(assessment,'After Block 3: TMA03 · 6 hours')+'</p>';
 const last=pages.find(p=>p[0]===closing);last[3]=last[3].replace(link(home+'b03/u10/','Return to Unit 10 →'),link(assessment,'Next: TMA03 →'));
 extraRails.set(assessment,{title:'TMA03',back:home,items:[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2].replace(/<[^>]*>/g,'')}))});
}
