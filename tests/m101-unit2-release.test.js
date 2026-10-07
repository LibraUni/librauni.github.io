import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const base='learn/physics/stage-1/m101/b01/u02/';
test('M101 Unit 2 opens only its approved introduction and first lesson',()=>{
 const intro=read(base+'index.html'),lesson=read(base+'l01/index.html');
 for(const page of [intro,lesson]){
  assert.match(page,/data-search-status="available"/);
  assert.doesNotMatch(page,/Local review edition|M101-Unit-2-.*?\.html|src="assets\/|data-study-id/);
  const ids=[...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
  for(const [,id] of page.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(id),id);
 }
 assert.equal((lesson.match(/class="activity"/g)||[]).length,8);
 assert.equal((lesson.match(/class="example"/g)||[]).length,8);
 assert.equal((lesson.match(/<math /g)||[]).length,184);
 assert.equal((lesson.match(/<details>/g)||[]).length,11);
 for(let i=1;i<=7;i++)assert.ok(lesson.includes('id="M101-U02-L01-S0'+i+'"'));
 assert.match(lesson,/src\/m101-unit2.css/);
 assert.match(lesson,/Lesson 2 plan/);
 for(let i=2;i<=5;i++){
  const outline=read(base+'l0'+i+'/index.html');
  assert.match(outline,/data-search-status="outline"/);
  assert.doesNotMatch(outline,/class="teaching-reading/);
 }
 assert.match(read('learn/physics/stage-1/m101/b01/u01/l05/index.html'),/Next: Products, projections and orientation/);
});
