import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Unit6 complete release has five lessons, linked closure and initially hidden solutions',()=>{
 for(let n=1;n<=5;n++){
  assert.match(read(`learn/physics/stage-1/p101/b02/u06/l0${n}/index.html`),/data-search-status="available"/);
  assert.doesNotMatch(read(`content/p101/unit6-lesson${n}.html`),/<details[^>]*\bopen\b/);
 }
 assert.equal((read('content/p101/unit6-lesson5.html').match(/id="p101-u06-exercise-/g)||[]).length,12);
 for(const f of ['Reference.pdf','Collisions.ipynb','Collisions.py','Energy.ipynb','Energy.py'])assert.ok(fs.statSync(new URL('../public/teaching/p101/u06/P101-Unit-6-'+f,import.meta.url)).size>100);
 assert.match(read('learn/physics/stage-1/p101/b02/u06/reference/index.html'),/data-search-status="available"/);
 assert.doesNotMatch(read('learn/physics/stage-1/p101/b03/u08/index.html'),/data-search-status="available"/);
});
test('Unit6 preserves all earlier P101 teaching',()=>{
 for(const [p,hash] of Object.entries(JSON.parse(read('docs/p101-u06-plan.json')).preservation))assert.equal(crypto.createHash('sha256').update(read(p)).digest('hex'),hash,p);
});
