import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {projectileState} from '../src/p101-unit4-projectile.js';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
test('projectile explorer has correct independent benchmark and degenerate floor case',()=>{
 const s=projectileState(4.9,6,0);near(s.tf,1);near(s.range,6);near(s.top,4.9);
 const z=projectileState(0,9,0);near(z.tf,0);assert.ok(z.points.every(([x,y])=>x===0&&y===0));
});
test('projectile controls preserve vertical independence and floor event across their ranges',()=>{
 for(const h of [0,.49,4.9])for(const uy of [0,.49,4.9,9.8])for(const ux of [0,3,6,9]){
  const s=projectileState(h,ux,uy);near(h+uy*s.tf-4.9*s.tf*s.tf,0);
  near(s.range,ux*s.tf);near(s.top,h+uy*uy/19.6);
  assert.ok(s.range<=24&&s.top<=14.01);
  for(let i=0;i<s.points.length;i++){const [x,y]=s.points[i],t=s.tf*i/100;near(x,ux*t);near(y,h+uy*t-4.9*t*t);assert.ok(y>=-1e-10);}
 }
 const a=projectileState(4.9,3,4.9),b=projectileState(4.9,9,4.9);near(a.tf,b.tf);near(a.top,b.top);near(b.range,3*a.range);
});
test('P101 Unit 4 published opening and Lesson 1 remain byte-identical',()=>{
 const plan=JSON.parse(fs.readFileSync(new URL('../docs/p101-u04-completion-plan.json',import.meta.url)));
 for(const [file,hash] of Object.entries(plan.preservation))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(new URL('../content/p101/'+file,import.meta.url))).digest('hex'),hash,file);
});
test('Unit 4 closing resources exist while Unit 5 has no published teaching',()=>{
 const content=fs.readFileSync(new URL('../content/p101/unit4-lesson5.html',import.meta.url),'utf8');
 assert.equal((content.match(/class="exercise"/g)||[]).length,12);assert.doesNotMatch(content,/<details[^>]*\bopen\b/);
 for(const file of ['P101-Unit-4-reference.pdf','P101-U04-projectile.ipynb','P101-U04-projectile-investigation.zip'])assert.ok(fs.statSync(new URL('../public/teaching/p101/u04/'+file,import.meta.url)).size>100);
 for(let n=1;n<=5;n++){const page=fs.readFileSync(new URL(`../learn/physics/stage-1/p101/b02/u05/l0${n}/index.html`,import.meta.url),'utf8');assert.doesNotMatch(page,/data-search-status="available"/);assert.match(page,/Teaching is in preparation/);}
});
