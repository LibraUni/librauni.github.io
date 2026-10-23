import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
import {m101Unit7Lessons} from '../curriculum/m101-released.js';
import {answerKey,markIcma02} from '../src/m101-icma02.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('M101 Unit7 sequence, workload, feedback and future boundary',()=>{
 assert.deepEqual(m101Unit7Lessons.map(l=>l.hours),[3,3,4,4]);
 const all=m101Unit7Lessons.map((l,i)=>{
  const s=read('content/m101/unit7-lesson'+(i+1)+'.html'),$=load(s);
  assert.equal($('h1').text(),l.title);
  assert.doesNotMatch(s,/<details open|data-study-id|\[\[INCLUDE|<mi>&<\/mi>/);
  const ids=$('[id]').map((_,e)=>$(e).attr('id')).get();
  assert.equal(ids.length,new Set(ids).size);
  assert.ok($('math').length>20);
  assert.match(read('learn/physics/stage-1/m101/b02/u07/l0'+(i+1)+'/index.html'),/data-search-status="available"/);
  return s;
 }).join('\n');
 for(const [type,count] of [['figure',9],['example',8],['activity',19],['exercise',12]]){
  const ids=[...all.matchAll(new RegExp('id="m101-u07-'+type+'-(\\d+)"','g'))].map(m=>+m[1]);
  assert.deepEqual(ids,Array.from({length:count},(_,i)=>i+1));
 }
 assert.equal((all.match(/Worked solution to Exercise 7\./g)||[]).length,12);
 assert.equal((all.match(/Hint for Exercise 7\./g)||[]).length,12);
 assert.match(read('learn/physics/stage-1/m101/b04/u13/index.html'),/data-search-status="available"/);
 assert.match(read('learn/physics/stage-1/m101/b02/index.html'),/Block 2 teaching is complete/);
 assert.match(read('learn/physics/stage-1/m101/assessments/index.html'),/TMA 02.*Questions and marking criteria available/);
});
test('iCMA02 key, unattempted and invalid responses, feedback remain formative',()=>{
 assert.deepEqual(answerKey,[0,1,2,0,1,2,0,1,2,0]);
 assert.deepEqual(markIcma02(answerKey),Array(10).fill(true));
 assert.deepEqual(markIcma02(answerKey.map(k=>(k+1)%3)),Array(10).fill(false));
 assert.deepEqual(markIcma02([]),Array(10).fill(null));
 assert.deepEqual(markIcma02(['0',-1,3,NaN,Infinity,null,undefined,0.5,{},[]]),Array(10).fill(null));
 const $=load(read('content/m101/unit7-lesson4.html'));
 assert.equal($('.icma-question').length,10);
 $('.icma-question').each((i,e)=>{
  assert.equal($(e).find('input[type=radio]').length,3);
  assert.equal($(e).find('details').attr('open'),undefined);
  assert.ok($(e).find('details').text().includes('Correct choice: '+String.fromCharCode(65+answerKey[i])));
 });
 assert.ok($('.icma-controls').is('[hidden]'));
 assert.doesNotMatch(read('src/m101-icma02.js'),/fetch\(|localStorage|sessionStorage|firebase/);
});
test('Unit7 fresh notebooks, code and synced reference are complete',()=>{
 for(const stem of ['Differences','Step-Size']){
  const nb=JSON.parse(read('public/teaching/m101/M101-Unit-7-'+stem+'.ipynb'));
  const script=read('public/teaching/m101/M101-Unit-7-'+stem+'.py');
  assert.equal(nb.nbformat,4);
  assert.equal(new Set(nb.cells.map(c=>c.id)).size,nb.cells.length);
  for(const c of nb.cells.filter(c=>c.cell_type==='code')){
   assert.equal(c.execution_count,null);assert.deepEqual(c.outputs,[]);
   if(!c.source.join('').startsWith('# Add'))assert.ok(script.includes(c.source.join('')));
  }
 }
 const ref=JSON.parse(read('content/m101/unit7-reference.json'));
 assert.equal(ref.rows.length,11);assert.equal(ref.version,'1.0');
 const $=load(read('content/m101/unit7-lesson4.html'));
 for(const [,topic] of ref.rows)assert.ok($('table').text().includes(topic));
 assert.ok($('pre code').toArray().some(e=>$(e).text()===ref.code));
 assert.ok(read('public/teaching/m101/M101-Unit-7-Reference.pdf').startsWith('%PDF-'));
});
