import fs from 'node:fs';
const home='/learn/physics/stage-1/m101/',assessment=home+'assessments/tma03/';
export function addM101Tma03({root,pages,extraRails,link}){
 const fragment=fs.readFileSync(root+'content/m101/tma03.html','utf8');
 const closing=home+'b03/u11/l04/';
 pages.push([assessment,'M101 · TMA 03 · Accumulation, methods and numerical evidence',[],
  '<div data-search-status="available" class="teaching-reading m101-tma03">'+fragment+'</div><link rel="stylesheet" href="/src/m101-tma03.css"><nav class="lesson-pagination" aria-label="Reading sequence">'+link(closing,'← Block 3 review and iCMA 03')+link(home+'b04/u12/','Next unit outline: Validation, sensitivity and competing answers →')+'</nav>']);
 const index=pages.find(p=>p[0]===home+'assessments/');
 index[3]=index[3].replace('TMA 02 is also available after Block 2; later assessments remain in preparation.','TMA 02 is available after Block 2 and TMA 03 after Block 3. The final examination remains in preparation.');
 index[3]+='<section><h2>Block 3 assessment</h2><p>'+link(assessment,'TMA 03 · Accumulation, methods and numerical evidence')+' · Questions and marking criteria available after Units 8–11; six separate assessment hours.</p></section>';
 pages.find(p=>p[0]===home)[3]+='<section><h2>Block 3 assessment</h2><p>'+link(assessment,'TMA 03 · Questions and marking criteria')+' · Available after Units 8–11; six separate assessment hours.</p></section>';
 pages.find(p=>p[0]===home+'b03/')[3]+='<p>'+link(assessment,'After Block 3: TMA 03 · 6 hours')+'</p>';
 const last=pages.find(p=>p[0]===closing);
 last[3]=last[3].replace(link(home+'b03/u11/','Return to Unit 11 →'),link(assessment,'Next: TMA 03 →'));
 extraRails.set(assessment,{title:'TMA 03',back:home,items:[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2].replace(/<[^>]*>/g,'')}))});
}
