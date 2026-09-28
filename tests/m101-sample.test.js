import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const path='learn/physics/stage-1/m101/b01/u01/l01/';
test('M101 sample is discoverable but cannot mark progress or imply production release',()=>{
 const html=read(path+'index.html');
 assert.match(html,/Test lesson · temporary sample/);
 assert.match(html,/noindex/);
 assert.doesNotMatch(html,/data-study-id|src="\/src\/study-ui.js"|data-planner/);
 assert.match(html,/Actual units will end with exercises covering the entire unit/);
 assert.match(html,/class="licence-link"/);
 assert.match(read('learn/physics/stage-1/m101/b01/u01/index.html'),/href="\/learn\/physics\/stage-1\/m101\/b01\/u01\/l01\/"/);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length);
 for(const [,hash] of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(hash),hash);
 for(const [,asset] of html.matchAll(/src="(\/teaching-samples\/[^\"]+)"/g))assert.ok(fs.existsSync(new URL('../public'+asset,import.meta.url)));
 assert.equal((html.match(/class="exercise"/g)||[]).length,5);
});
