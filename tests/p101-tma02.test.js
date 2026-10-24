import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('P101 TMA02 keeps its approved scope, marks and six hours',()=>{
 const plan=JSON.parse(read('docs/p101-tma02-plan.json'));
 assert.equal(plan.questions.length,5);
 assert.equal(plan.questions.reduce((s,q)=>s+q.marks,0),100);
 assert.equal(plan.minutes.total,360);
 assert.equal(plan.questions.reduce((s,q)=>s+q.minutes,0)+plan.minutes.reading+plan.minutes.checkingPackaging,360);
 for(const q of plan.questions)assert.equal(q.parts.reduce((a,b)=>a+b,0),q.marks);
 const html=read('content/p101/tma02.html');
 assert.equal((html.match(/id="P101-TMA02-Q\d\d"/g)||[]).length,5);
 assert.equal([...html.matchAll(/<strong>\[(\d+)\]<\/strong>/g)].reduce((s,m)=>s+Number(m[1]),0),100);
 assert.doesNotMatch(html,/<form\b|<input\b|<details\b/);
 assert.match(html,/six separate assessment hours/);
 assert.match(html,/private tutoring conversation/);
});
test('assessment route, downloads and block handover are available',()=>{
 const page=read('learn/physics/stage-1/p101/assessments/tma02/index.html');
 assert.match(page,/data-search-status="available"/);
 assert.match(page,/p101-tma02\.css/);
 for(const route of ['index.html','assessments/index.html','b02/index.html','b02/u07/l05/index.html'])assert.match(read('learn/physics/stage-1/p101/'+route),/assessments\/tma02\//);
 assert.doesNotMatch(read('learn/physics/stage-1/p101/b03/u08/index.html'),/data-search-status="available"/);
 for(const name of ['P101-TMA02-data.zip','P101-TMA02-Questions.html','motion.csv','README.txt'])assert.ok(fs.statSync(new URL('../public/assessments/p101/tma02/'+name,import.meta.url)).size>50);
});
test('source record preserves independent repeated-time runs',()=>{
 const lines=read('public/assessments/p101/tma02/motion.csv').trim().split('\n');
 assert.equal(lines[0],'run,time_s,position_m');assert.equal(lines.length,8);
 const rows=lines.slice(1).map(s=>s.split(',').map(Number));
 assert.equal(rows.filter(r=>r[1]===2.4).length,2);assert.notEqual(rows[3][2],rows[4][2]);
 assert.equal(new Set(rows.map(r=>r[0])).size,7);
 assert.ok(rows.every(r=>r.every(Number.isFinite)&&r[1]>=0&&r[1]<=4));
});
