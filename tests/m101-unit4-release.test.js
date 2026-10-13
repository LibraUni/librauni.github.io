import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('M101 Unit4 publishes four reviewed lessons and closing resources with hidden feedback',()=>{
 for(const p of ['b02/','b02/u04/','b02/u04/l01/'])assert.match(read('learn/physics/stage-1/m101/'+p+'index.html'),/data-search-status="available"/);
 const lesson=read('content/m101/unit4-lesson1.html');
 assert.equal((lesson.match(/class="chapter"/g)||[]).length,5);
 assert.equal((lesson.match(/class="activity"/g)||[]).length,8);
 assert.doesNotMatch(lesson,/<details open|data-study-id|<mi>&<\/mi>|\[\[FIG/);
 for(const n of [2,3,4]){const s=read('content/m101/unit4-lesson'+n+'.html');assert.doesNotMatch(s,/<details open|data-study-id|\[\[FIG/);assert.match(read('learn/physics/stage-1/m101/b02/u04/l0'+n+'/index.html'),/data-search-status="available"/);}
 const closing=read('content/m101/unit4-lesson4.html');assert.equal((closing.match(/class="exercise"/g)||[]).length,12);
 for(const ext of ['pdf','py','ipynb']){const file=ext==='pdf'?'Reference':'Investigation';assert.ok(fs.statSync(new URL('../public/teaching/m101/M101-Unit-4-'+file+'.'+ext,import.meta.url)).size>100);}
 assert.match(read('learn/physics/stage-1/m101/b02/u05/index.html'),/data-search-status="outline"/);
 assert.match(read('content/m101/unit4.html'),/All four lessons, the unit exercises, the Python investigation and the reference resources are available/);
 const ids=[...lesson.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
});
