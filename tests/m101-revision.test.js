import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
const manifest=JSON.parse(fs.readFileSync('content/m101/revision/manifest.json','utf8'));
test('M101 revision publication has only seven public resource inputs and hosted dependencies',()=>{
 assert.deepEqual(manifest.map(m=>m.fragment),['revision','record','specimen','guide','clarifications','reference','policy']);
 for(const m of manifest){const raw=fs.readFileSync('content/m101/revision/'+m.fragment+'.html','utf8');assert(!/file:\/\/|m101-final-private|PRIVATE-Marking|M101-FE-A|M101-Specimen-Calibration/.test(raw));const $=load(raw);$('a[href]').each((_,a)=>assert.match($(a).attr('href'),/^(#|\/learn\/physics\/stage-1\/m101\/)/));}
});
test('Revision attempts and feedback remain separated; workload includes R1 timing adjustment',()=>{
 const $=load(fs.readFileSync('content/m101/revision/revision.html','utf8'));
 assert.equal($('.task').length,25);assert.equal($('details[open]').length,0);assert.equal($('[id^="m101-r-retrieval-"]').length,6);
 assert.equal($('details[data-search-ignore]').length,$('details').length);
 for(let i=1;i<=3;i++)assert.equal($('#m101-r-fig-'+i).closest('details').length,1);
 assert.match($('#session-1 .minutes').text(),/reading 12 · practice 28/);assert.match($('#start').text(),/720 minutes =12 hours/);
});
test('Specimen marking guide directs learners to the public clarifications',()=>{
 const $=load(fs.readFileSync('content/m101/revision/guide.html','utf8'));
 assert($('a[href="/learn/physics/stage-1/m101/revision/specimen/clarifications/"]').length);
 assert(!$.text().includes('40/100 is the proposed'));
});
