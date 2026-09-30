import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {resolveVector} from '../src/m101-angle-lab.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const base='learn/physics/stage-1/m101/b01/u01/';
test('Lesson 4 releases with semantic maths, accessible static practice and bounded availability',()=>{
 const html=read(base+'l04/index.html');
 assert.doesNotMatch(html,/Teaching materials forthcoming|__\w+__|data-study-id|src="\/src\/study-ui.js"|\\\[|\\\(/);
 for(let i=1;i<=6;i++)assert.ok(html.includes(`id="M101-U01-L04-S0${i}"`));
 for(let i=25;i<=31;i++)assert.ok(html.includes(`id="m101-u01-fig-${i}"`));
 assert.equal((html.match(/class="activity"/g)||[]).length,8);
 assert.equal((html.match(/class="example"/g)||[]).length,7);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length);
 for(const [,hash] of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(hash),hash);
 for(const element of ['math','msqrt','mfrac'])assert.match(html,new RegExp('<'+element));
 assert.match(html,/Discussion and static alternative/);
 assert.match(html,/m101-angle-lab.js/);
 assert.match(read(base+'index.html'),/Lessons 1–4 are available. Lesson 5/);
 assert.match(read(base+'l03/index.html'),/Next: Resolving and reconstructing components/);
 assert.match(read(base+'l05/index.html'),/Teaching materials forthcoming/);
 for(const [,asset] of html.matchAll(/src="(\/teaching\/[^\"]+)"/g))assert.ok(fs.existsSync(new URL('../public'+asset,import.meta.url)));
});
test('Angle explorer preserves signs, quadrants, magnitudes and zero cases',()=>{
 for(const [a,x,y] of [[0,4,0],[90,0,4],[180,-4,0],[270,0,-4],[360,4,0],[30,2*Math.sqrt(3),2],[150,-2*Math.sqrt(3),2],[210,-2*Math.sqrt(3),-2]]){
  const v=resolveVector(4,a);assert.ok(Math.abs(v.x-x)<1e-10);assert.ok(Math.abs(v.y-y)<1e-10);
 }
 for(let a=0;a<=360;a++)for(const l of [0,.5,2,5]){const v=resolveVector(l,a);assert.ok(Math.abs(v.x*v.x+v.y*v.y-l*l)<1e-10);}
 assert.deepEqual(resolveVector(0,127),{x:0,y:0});
});
