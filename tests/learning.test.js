import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
test('curriculum expand/collapse affects navigation branches without exposing feedback',()=>{
 let callback;
 const branches=[{open:false},{open:false}];
 const feedback={open:false};
 const controls={hidden:true,addEventListener:(_,fn)=>callback=fn};
 const tree={querySelector:()=>controls,querySelectorAll:selector=>{
  assert.equal(selector,'details.curriculum-branch');return branches;
 }};
 const context={document:{querySelectorAll:()=>[tree],getElementById:()=>null},location:{hash:''},window:{addEventListener:()=>{}}};
 vm.runInNewContext(fs.readFileSync(new URL('../src/learning.js',import.meta.url),'utf8'),context);
 assert.equal(controls.hidden,false);
 for(const [action,expected] of [['expand',true],['collapse',false]]){
  callback({target:{closest:()=>({dataset:{treeAction:action}})}});
  assert.ok(branches.every(b=>b.open===expected));assert.equal(feedback.open,false);
 }
});
