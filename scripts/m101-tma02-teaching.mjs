import fs from 'node:fs';
const home='/learn/physics/stage-1/m101/',assessment=home+'assessments/tma02/';
export function addM101Tma02({root,pages,extraRails,link}){
 const fragment=fs.readFileSync(root+'content/m101/tma02.html','utf8');
 const closing=home+'b02/u07/l04/';
 pages.push([assessment,'M101 · TMA 02 · Change, approximation and evidence',[],
  '<div data-search-status="available" class="teaching-reading m101-tma02">'+fragment+'</div><link rel="stylesheet" href="/src/m101-tma02.css"><nav class="lesson-pagination" aria-label="Reading sequence">'+link(closing,'← Block 2 review and iCMA 02')+link(home+'b03/u08/','Next unit outline: Accumulation and the fundamental theorem →')+'</nav>']);
 const index=pages.find(p=>p[0]===home+'assessments/');
 index[3]=index[3].replace('Later assessments remain in preparation.','TMA 02 is also available after Block 2; later assessments remain in preparation.').replace('TMA 02 has a separate six-hour allocation; its questions and submission are not released here.','TMA 02 has a separate six-hour allocation. '+link(assessment,'TMA 02 · Change, approximation and evidence')+' · Questions and marking criteria available.');
 pages.find(p=>p[0]===home)[3]+='<section><h2>Block 2 assessment</h2><p>'+link(assessment,'TMA 02 · Questions and marking criteria')+' · Available after Units 4–7; six separate assessment hours.</p></section>';
 const block=pages.find(p=>p[0]===home+'b02/');
 block[3]=block[3].replace('TMA 02 remains in preparation.','TMA 02 is available with a separate six-hour allocation.');
 block[3]+='<p>'+link(assessment,'After Block 2: TMA 02 · 6 hours')+'</p>';
 const last=pages.find(p=>p[0]===closing);
 last[3]=last[3].replace(link(home+'assessments/','Assessment availability →'),link(assessment,'Next: TMA 02 →'));
 extraRails.set(assessment,{title:'TMA 02',back:home,items:[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2].replace(/<[^>]*>/g,'')}))});
}
