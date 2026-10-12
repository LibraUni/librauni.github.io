import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('M101 Unit4 publishes only the opening and first lesson with hidden feedback',()=>{
 for(const p of ['b02/','b02/u04/','b02/u04/l01/'])assert.match(read('learn/physics/stage-1/m101/'+p+'index.html'),/data-search-status="available"/);
 const lesson=read('content/m101/unit4-lesson1.html');
 assert.equal((lesson.match(/class="chapter"/g)||[]).length,5);
 assert.equal((lesson.match(/class="activity"/g)||[]).length,8);
 assert.doesNotMatch(lesson,/<details open|data-study-id|<mi>&<\/mi>|\[\[FIG/);
 for(const n of [2,3,4])assert.ok(!fs.existsSync(new URL('../content/m101/unit4-lesson'+n+'.html',import.meta.url)));
 assert.match(read('learn/physics/stage-1/m101/b02/u05/index.html'),/data-search-status="outline"/);
 assert.match(read('content/m101/unit4.html'),/Only this introduction and Lesson 1 are available/);
 const ids=[...lesson.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
});
