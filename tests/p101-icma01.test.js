import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {markIcma01} from '../src/p101-icma01.js';
test('P101 checkpoint distinguishes unanswered, wrong and correct choices',()=>{
 assert.deepEqual(markIcma01([]),Array(10).fill(null));
 assert.deepEqual(markIcma01([0,1,2,1,2,0,1,2,0,1]),Array(10).fill(true));
 assert.deepEqual(markIcma01([1,2,0,2,0,1,2,0,1,2]),Array(10).fill(false));
 assert.deepEqual(markIcma01([null,undefined,-1,3,1.5,'0',NaN,Infinity,{},[]]),Array(10).fill(null));
 assert.deepEqual(markIcma01([0,0]),[true,false,...Array(8).fill(null)]);
});
test('P101 checkpoint key agrees with visible feedback and no record side effects',()=>{
 const html=readFileSync(new URL('../content/p101/unit3-lesson5.html',import.meta.url),'utf8');
 const answers=[...html.matchAll(/<strong>Answer ([ABC])\.<\/strong>/g)].map(m=>'ABC'.indexOf(m[1]));
 assert.equal(answers.length,10);assert.deepEqual(markIcma01(answers),Array(10).fill(true));
 const js=readFileSync(new URL('../src/p101-icma01.js',import.meta.url),'utf8');
 assert.doesNotMatch(js,/localStorage|sessionStorage|fetch\(|XMLHttpRequest|sendBeacon/);
});
