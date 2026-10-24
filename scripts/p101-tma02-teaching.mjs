import fs from 'node:fs';
const home='/learn/physics/stage-1/p101/',assessment=home+'assessments/tma02/';
export const p101Tma02Path=assessment;
export function addP101Tma02({root,pages,extraRails,link}){
 const fragment=fs.readFileSync(root+'content/p101/tma02.html','utf8'),closing=home+'b02/u07/l05/';
 pages.push([assessment,'P101 · TMA 02 · Systems, balances and model tests',[],
 '<div data-search-status="available" class="teaching-reading p101-tma02">'+fragment+'</div><link rel="stylesheet" href="/src/p101-tma02.css"><nav class="lesson-pagination" aria-label="Reading sequence">'+link(closing,'← Block 2 review and iCMA 02')+link(home+'b03/u08/','Next unit outline: Oscillations and phase →')+'</nav>']);
 const index=pages.find(p=>p[0]===home+'assessments/');
 index[3]=index[3].replace('Later assessments remain in preparation.','TMA 02 is also available after Units 4–7. Later assessments remain in preparation.');
 index[3]+='<section><h2>Block 2 assessment</h2><p>'+link(assessment,'TMA 02 · Systems, balances and model tests')+' · Questions and marking criteria after Units 4–7; six separate assessment hours.</p></section>';
 pages.find(p=>p[0]===home)[3]=pages.find(p=>p[0]===home)[3].replace('TMA 02 remains in preparation.','TMA 02 questions and marking criteria are available after Unit 7.');
 pages.find(p=>p[0]===home)[3]+='<section><h2>Block 2 assessment</h2><p>'+link(assessment,'TMA 02 · Questions and marking criteria')+' · Available after Units 4–7; six separate hours.</p></section>';
 pages.find(p=>p[0]===home+'b02/')[3]+='<p>'+link(assessment,'After Block 2: TMA 02 · 6 hours')+'</p>';
 const last=pages.find(p=>p[0]===closing);last[3]=last[3].replace(link(home+'b02/u07/','Return to Unit 7 →'),link(assessment,'Next: TMA 02 →'));
 extraRails.set(assessment,{title:'TMA 02',back:home,items:[...fragment.matchAll(/<section class="chapter" id="([^"]+)"><h2>(.*?)<\/h2>/g)].map(m=>({href:'#'+m[1],title:m[2].replace(/<[^>]*>/g,'')}))});
}
