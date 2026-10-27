import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('P101 TMA03 keeps its approved scope, marks and six hours',()=>{
 const plan=JSON.parse(read('docs/p101-tma03-plan.json'));
 assert.equal(plan.questions.length,5);
 assert.equal(plan.questions.reduce((s,q)=>s+q.marks,0),100);
 assert.equal(plan.minutes.total,360);
 assert.equal(plan.questions.reduce((s,q)=>s+q.minutes,0)+plan.minutes.reading+plan.minutes.checkingPackaging,360);
 for(const q of plan.questions)assert.equal(q.parts.reduce((a,b)=>a+b,0),q.marks);
 const html=read('content/p101/tma03.html');
 assert.equal((html.match(/id="P101-TMA03-Q\d\d"/g)||[]).length,5);
 assert.equal([...html.matchAll(/<strong>\[(\d+)\]<\/strong>/g)].reduce((s,m)=>s+Number(m[1]),0),100);
 assert.doesNotMatch(html,/<form\b|<input\b|<details\b/);
 assert.match(html,/six separate assessment hours/);
 assert.match(html,/private tutoring conversation/);
});
test('assessment route, downloads and block handover are available',()=>{
 const page=read('learn/physics/stage-1/p101/assessments/tma03/index.html');
 assert.match(page,/data-search-status="available"/);
 assert.match(page,/p101-tma03\.css/);
 for(const route of ['index.html','assessments/index.html','b03/index.html','b03/u10/l05/index.html'])assert.match(read('learn/physics/stage-1/p101/'+route),/assessments\/tma03\//);
 assert.doesNotMatch(read('learn/physics/stage-1/p101/b04/u11/index.html'),/data-search-status="available"/);
 for(const name of ['P101-TMA03-data.zip','P101-TMA03-Questions.html','signal.csv','README.txt'])assert.ok(fs.statSync(new URL('../public/assessments/p101/tma03/'+name,import.meta.url)).size>50);
});
test('source signal preserves groups, identifiers and nonchronological times',()=>{
 const rows=read('public/assessments/p101/tma03/signal.csv').trim().split('\n');
 assert.equal(rows[0],'sample,group,time_s,raw_au,control_au');assert.equal(rows.length,12);
 const data=rows.slice(1).map(s=>s.split(','));
 assert.equal(new Set(data.map(r=>r[0])).size,11);
 assert.equal(data.filter(r=>r[1]==='regular').length,9);assert.equal(data.filter(r=>r[1]==='extra').length,2);
 assert.equal(Number(data.at(-2)[2]),0.5);assert.equal(Number(data.at(-1)[2]),1.5);
 assert.ok(data.every(r=>r.slice(2).every(v=>Number.isFinite(Number(v)))));
});
