import test from 'node:test';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
import {prepareSearchPage} from '../scripts/search-index.mjs';
const lesson='/learn/physics/stage-1/p101/b01/u01/l01/';
const fixture=`<!doctype html><html lang="en"><head><title>Test lesson</title></head><body><header>Chrome sentinel</header><main><aside class="lesson-sidebar">Navigation sentinel</aside><article class="lesson-reading" data-search-status="available"><h1>Lesson 1<br>Measurement</h1><section id="P101-S01"><h2>Units</h2><p>Question sentinel</p><aside class="worked-example">Worked example sentinel</aside><details><summary>Hint</summary><p>Solution sentinel</p></details><pre><code>print(42)</code></pre></section></article></main></body></html>`;
test('search allows only public curriculum and teaching routes',()=>{
 for(const url of ['/','/journal/','/profile/','/evidence/','/content/drafts/','/private/'])assert.equal(prepareSearchPage(fixture,url),null);
});
test('search preserves section links, readable titles, questions and worked examples while excluding feedback',()=>{
 const result=prepareSearchPage(fixture,lesson),$=load(result.html);
 assert.deepEqual(result.metadata,{title:'Lesson 1 Measurement',location:'P101 · Unit 1 · Lesson 1',kind:'Lesson',status:'available',module:'P101'});
 assert.equal($('#P101-S01').length,1);
 assert.ok($('h2').attr('id').startsWith('P101-S01-search-'));
 assert.equal($('details').attr('data-pagefind-ignore'),'all');
 assert.equal($('.worked-example').attr('data-pagefind-ignore'),undefined);
 assert.equal($('pre code').text(),'print(42)');
 assert.equal($('[data-pagefind-body]').length,1);
});
test('availability must be explicit and archives cannot become available teaching',()=>{
 assert.throws(()=>prepareSearchPage(fixture.replace('data-search-status="available"',''),lesson),/Missing search availability/);
 const outline=fixture.replace('data-search-status="available"','data-search-status="outline"');
 assert.equal(prepareSearchPage(outline,lesson).metadata.status,'outline');
 assert.equal(prepareSearchPage(fixture,'/programme/archive/m100/b01/u01/l01/').metadata.status,'archive');
 assert.equal(prepareSearchPage(fixture,'/programme/stage-1/lu-p101/').metadata.status,'outline');
 assert.throws(()=>prepareSearchPage(outline.replace('<h1>','<div class="teaching-reading"></div><h1>'),lesson),/Teaching missing availability/);
});
