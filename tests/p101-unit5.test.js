import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {p101U05LessonCount} from '../scripts/p101-teaching.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Unit 5 release includes all lessons and closing resources with feedback initially hidden',()=>{
 assert.equal(p101U05LessonCount,5);
 for(let n=1;n<=5;n++){
  const page=read(`learn/physics/stage-1/p101/b02/u05/l0${n}/index.html`);
  assert.match(page,/data-search-status="available"/);assert.doesNotMatch(read(`content/p101/unit5-lesson${n}.html`),/<details[^>]*\bopen\b/);
 }
 assert.equal((read('content/p101/unit5-lesson5.html').match(/id="p101-u05-exercise-/g)||[]).length,10);
 for(const file of ['P101-Unit-5-Reference.pdf','P101-Unit-5-Scaling.ipynb','P101-Unit-5-Investigation.ipynb'])assert.ok(fs.statSync(new URL('../public/teaching/p101/u05/'+file,import.meta.url)).size>100);
 assert.match(read('learn/physics/stage-1/p101/b02/u05/reference/index.html'),/data-search-status="available"/);
});
test('Unit 5 release preserves every earlier P101 teaching fragment',()=>{
 const plan=JSON.parse(read('docs/p101-u05-plan.json'));
 for(const [file,hash] of Object.entries(plan.preservation))assert.equal(crypto.createHash('sha256').update(read(file)).digest('hex'),hash,file);
});
