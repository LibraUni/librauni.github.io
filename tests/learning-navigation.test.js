import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=new URL('../',import.meta.url);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(f=>f.isDirectory()?walk(path.join(dir,f.name)):[path.join(dir,f.name)]);}
test('every generated module descendant has complete ancestor breadcrumbs and direct child sidebar links',()=>{
 const files=walk(new URL('../learn/',import.meta.url).pathname);let checked=0;
 for(const file of files){
  const route='/'+path.relative(root.pathname,file).replace(/index.html$/,'');
  const match=route.match(/^(\/learn\/(?:preparation|physics\/stage-\d+)\/[a-z]\d+\/)((?:[bul]\d+\/)*)$/);
  if(!match)continue;
  const html=fs.readFileSync(file,'utf8');
  const crumb=html.match(/<nav class="breadcrumb"[^>]*>(.*?)<\/nav>/s)?.[1];assert.ok(crumb,route);
  const parts=match[2].split('/').filter(Boolean);
  let ancestor=match[1];
  for(const part of parts){assert.ok(crumb.includes(`href="${ancestor}"`),`${route} missing ${ancestor}`);ancestor+=part+'/';}
  assert.equal((crumb.match(/aria-current="page"/g)||[]).length,1,route);
  assert.ok(!crumb.includes('Parent page'),route);
  if(parts.length){const last=parts.at(-1);assert.ok(crumb.includes(`>${{b:'Block',u:'Unit',l:'Lesson'}[last[0]]} ${Number(last.slice(1))}</span>`),route);}
  const sidebar=html.match(/<aside class="lesson-sidebar">(.*?)<\/aside>/s)?.[1];assert.ok(sidebar,route);
  assert.ok(sidebar.includes('Learning materials'),route);
  for(const [,href] of sidebar.matchAll(/href="([^"]+)"/g)){
   if(href.startsWith('#'))assert.ok(html.includes(`id="${href.slice(1)}"`),route);
   else assert.ok(fs.existsSync(new URL('.'+href+'index.html',root)),href);
  }
  assert.ok(sidebar.includes('/learn/physics/stage-3/p303/'),route);
  checked++;
 }
 assert.ok(checked>50);
});
