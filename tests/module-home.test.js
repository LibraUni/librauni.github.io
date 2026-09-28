import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {modules} from '../curriculum/schedules.js';
import {degreeModules} from '../scripts/degree-navigation.mjs';
import {studyOverview} from '../src/study-dashboard.js';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('degree catalogue lists every module by stage without collapsed content or prototype references',()=>{
 const index=read('learn/index.html');const content=index.split('<article class="lesson-reading">')[1].split('</article>')[0];
 assert.ok(!content.includes('<details'));assert.ok(!index.includes('data-study-id'));
 for(const m of degreeModules){assert.ok(content.includes('href="'+m.href+'"'));assert.ok(existsSync(new URL('..'+m.href+'index.html',import.meta.url)));}
 for(const file of readdirSync(new URL('../learn/',import.meta.url),{recursive:true}).filter(f=>f.endsWith('.html'))){const html=read('learn/'+file);assert.doesNotMatch(html,/M100|preparatory|\/preparation\//i,file);assert.ok(html.includes('degree-navigation'),file);}
});
test('prototype remains readable in the blueprint archive with enrolment and record writes closed',()=>{
 const home=read('programme/archive/m100/index.html');assert.ok(home.includes('Prototype archive'));assert.doesNotMatch(home,/data-planner|data-study-id|src\/study-ui/);
 assert.equal(modules[0].enrollable,false);assert.equal(modules[0].archived,true);
 assert.deepEqual(studyOverview(modules,{'LU-M100':{status:'enrolled'}},'2026-09-28'),{next:[],assessments:[]});
 for(const file of readdirSync(new URL('../programme/archive/m100/',import.meta.url),{recursive:true}).filter(f=>f.endsWith('.html'))){assert.doesNotMatch(read('programme/archive/m100/'+file),/src\/assessment.js|src\/planner.js|data-study-id/);}
 assert.ok(!existsSync(new URL('../learn/preparation/',import.meta.url)));
});
