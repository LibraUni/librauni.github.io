import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('content/m101/tma03.html'),$=load(source),plan=JSON.parse(read('docs/m101-tma03-plan.json'));
test('TMA03 complete question/part budget is 100 marks and six separate hours',()=>{
 assert.equal(plan.questions.length,5);
 assert.equal(plan.questions.reduce((a,q)=>a+q.marks,0),100);
 assert.equal(plan.questions.reduce((a,q)=>a+q.minutes,0)+plan.minutes.reading+plan.minutes.checkingPackaging,360);
 for(const q of plan.questions){
  const el=$('#M101-TMA03-'+q.id);
  assert.equal(el.length,1);
  assert.deepEqual([...el.text().matchAll(/\[(\d+)\]/g)].map(m=>+m[1]),q.parts);
  assert.equal(q.parts.reduce((a,b)=>a+b,0),q.marks);
 }
});
test('TMA03 questions and accessible offline copy exclude private answers and controls',()=>{
 const ids=$('[id]').map((i,e)=>$(e).attr('id')).get();
 assert.equal(new Set(ids).size,ids.length);
 assert.equal($('section.chapter').length,8);
 assert.equal($('figure').length,2);
 assert.ok($('math').length>=40);
 assert.equal($('img:not([alt]),svg:not([role="img"]),script,form,input,iframe').length,0);
 for(const a of $('a[href^="#"]'))assert.equal($($(a).attr('href')).length,1);
 assert.doesNotMatch(source,/\{\{|\[\[|PRIVATE_M101_TMA03|guide-Q0|model\.py|subject-checks/i);
 assert.match(source,/private tutoring conversation/);
 assert.match(source,/no upload or automatic marking control/);
 const off=load(read('public/assessments/m101/tma03/M101-TMA03-Questions.html'));
 assert.equal(off('img[src^="data:image/jpeg;base64,"]').length,1);
 assert.equal(off('script,link').length,0);
 for(let i=1;i<=5;i++)assert.equal(off('#M101-TMA03-Q0'+i).text(),$('#M101-TMA03-Q0'+i).text());
 assert.match(off.text(),/Public domain/);
});
test('TMA03 availability joins assessment/block/closing navigation without releasing Unit12',()=>{
 const path='learn/physics/stage-1/m101/';
 for(const f of ['index.html','b03/index.html','assessments/index.html','b03/u11/l04/index.html'])assert.match(read(path+f),/href="\/learn\/physics\/stage-1\/m101\/assessments\/tma03\/"/);
 assert.match(read(path+'assessments/tma03/index.html'),/data-search-status="available"/);
 assert.match(read(path+'assessments/tma03/index.html'),/aria-current="page">TMA 03/);
 assert.doesNotMatch(read(path+'b04/u12/index.html'),/data-search-status="available"/);
});
