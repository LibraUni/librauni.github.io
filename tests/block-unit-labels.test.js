import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {assertBlockUnitLabels} from '../scripts/unit-link.mjs';
const root=new URL('../',import.meta.url).pathname;
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(f=>f.isDirectory()?walk(path.join(dir,f.name)):[path.join(dir,f.name)]);}
test('every existing module and archive block labels its unit links',()=>{
 let blocks=0;
 for(const file of [...walk(root+'learn'),...walk(root+'programme/archive')]){
  if(!/\/b\d+\/index.html$/.test(file))continue;
  const route='/'+path.relative(root,file).replace(/index.html$/,'');
  const body=fs.readFileSync(file,'utf8').match(/<article class="lesson-reading"[^>]*>([\s\S]*?)<\/article>/)?.[1];
  assert.ok(body,route);assertBlockUnitLabels(route,body);blocks++;
 }
 assert.ok(blocks>=20);
});
test('future modules and custom renderers cannot omit or restart unit numbering',()=>{
 const route='/learn/physics/stage-2/new201/b03/';
 const link=`<a href="${route}u12/">Future unit</a>`;
 assert.doesNotThrow(()=>assertBlockUnitLabels(route,'<p>Unit 12: '+link+'</p>'));
 assert.throws(()=>assertBlockUnitLabels(route,'<p>'+link+'</p>'),/must have the prefix/);
 assert.throws(()=>assertBlockUnitLabels(route,'<p>Unit 1: '+link+'</p>'),/must have the prefix/);
 assert.throws(()=>assertBlockUnitLabels(route,'<p>No units</p>'),/no labelled unit links/);
});
