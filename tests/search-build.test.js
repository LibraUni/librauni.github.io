import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,readdir,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {gunzipSync} from 'node:zlib';
import {buildSearch} from '../scripts/build-search.mjs';
const page=(status,text)=>`<html lang="en"><head><title>Fixture</title></head><body><main><article class="lesson-reading" data-search-status="${status}"><h1>Test</h1><p>${text}</p><aside class="worked-example">workedexamplesentinel</aside><details><summary>Windows setup</summary>setupinstructionsentinel</details><details><summary>Hint</summary>secretfeedbacktoken</details></article></main></body></html>`;
async function fragments(root){
 const dir=join(root,'pagefind/fragment');
 return Promise.all((await readdir(dir)).map(async f=>JSON.parse(gunzipSync(await readFile(join(dir,f))).toString().replace(/^pagefind_dcd/,''))));
}
test('real indexing excludes private/feedback text and rebuilds additions, edits and deletions',async()=>{
 const root=await mkdtemp(join(tmpdir(),'librauni-search-'));
 async function put(path,html){await mkdir(join(root,path),{recursive:true});await writeFile(join(root,path,'index.html'),html);}
 try{
  await put('learn/physics/stage-1/p101/b01/u01/l01',page('available','oldpassagetoken'));
  await put('learn/physics/stage-1/p101/b01/u02',page('outline','futureoutlinetoken'));
  await put('programme/archive/m100',page('available','archivetoken'));
  await put('journal',page('available','privatesentineltoken'));
  const first=await buildSearch(root);
  assert.equal(first.length,3);assert.equal(first.filter(p=>p.status==='available').length,1);
  let all=JSON.stringify(await fragments(root));
  assert.match(all,/oldpassagetoken/);assert.match(all,/workedexamplesentinel/);assert.match(all,/setupinstructionsentinel/);assert.match(all,/futureoutlinetoken/);assert.match(all,/archivetoken/);
  assert.doesNotMatch(all,/privatesentineltoken|secretfeedbacktoken/);
  await put('learn/physics/stage-1/p101/b01/u01/l01',page('available','revisedpassagetoken'));
  await put('learn/physics/stage-1/p101/b01/u01/l02',page('available','newlessontoken'));
  await rm(join(root,'learn/physics/stage-1/p101/b01/u02'),{recursive:true});
  await buildSearch(root);
  all=JSON.stringify(await fragments(root));
  assert.match(all,/newlessontoken/);assert.match(all,/revisedpassagetoken/);
  assert.doesNotMatch(all,/oldpassagetoken|futureoutlinetoken|privatesentineltoken|secretfeedbacktoken/);
 }finally{await rm(root,{recursive:true,force:true});}
});
