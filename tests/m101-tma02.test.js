import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('content/m101/tma02.html'),$=load(source);
test('TMA02 has five stable question groups, 100 marks and the approved six hours',()=>{
 const plan=JSON.parse(read('docs/m101-tma02-plan.json'));
 assert.equal(plan.questions.length,5);
 assert.equal(plan.questions.reduce((s,q)=>s+q.marks,0),100);
 assert.equal(plan.questions.reduce((s,q)=>s+q.minutes,0)+15+40,360);
 for(const q of plan.questions){
  const section=$('#M101-TMA02-'+q.id);
  assert.equal(section.length,1);
  assert.deepEqual([...section.text().matchAll(/\[(\d+)\]/g)].map(m=>Number(m[1])),q.parts);
  assert.equal(q.parts.reduce((a,b)=>a+b,0),q.marks);
 }
});
test('TMA02 public package is accessible questions and criteria, not a solution or submission service',()=>{
 const ids=$('[id]').map((i,e)=>$(e).attr('id')).get();
 assert.equal(new Set(ids).size,ids.length);
 assert.equal($('section.chapter').length,8);
 assert.equal($('figure').length,2);
 assert.equal($('math').length,57);
 assert.equal($('script,iframe,form,input,textarea').length,0);
 assert.equal($('img:not([alt]),svg:not([role="img"])').length,0);
 for(const a of $('a[href^="#"]'))assert.equal($(($(a).attr('href'))).length,1);
 assert.doesNotMatch(source,/\{\{|\[\[|worked solution|answerKey|PRIVATE_/i);
 for(const element of $('p')){
  const copy=$(element).clone();copy.find('math').remove();assert.doesNotMatch(copy.text(),/[{}]/);
 }
 assert.match(source,/private tutoring conversation/);
 assert.match(source,/no upload or automatic marking control/);
 const offline=read('public/assessments/m101/tma02/M101-TMA02-Questions.html'), off=load(offline);
 assert.equal(off('img[src^="data:image/png;base64,"]').length,1);
 assert.equal(off('script,link').length,0);
 assert.match(offline,/NIST distribution notice/);
 for(let i=1;i<=5;i++)assert.equal(off('#M101-TMA02-Q0'+i).text(),$('#M101-TMA02-Q0'+i).text());
});
test('TMA02 availability is linked without releasing Unit 8',()=>{
 const path='learn/physics/stage-1/m101/';
 for(const file of ['index.html','b02/index.html','assessments/index.html','b02/u07/l04/index.html'])assert.match(read(path+file),/href="\/learn\/physics\/stage-1\/m101\/assessments\/tma02\/"/);
 assert.match(read(path+'assessments/tma02/index.html'),/data-search-status="available"/);
 assert.match(read(path+'assessments/tma02/index.html'),/aria-current="page">TMA 02/);
 assert.match(read(path+'b03/u08/index.html'),/data-search-status="outline"/);
});
