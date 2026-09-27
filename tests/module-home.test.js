import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {modules} from '../curriculum/schedules.js';
import {schedule,newPlan} from '../src/schedule.js';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('learning index stops at modules and homes contain teaching and planner in the correct place',()=>{
 const index=read('learn/index.html');assert.ok(!index.includes('data-study-id'));assert.ok(index.includes('href="/learn/preparation/m100/"'));
 for(const code of ['m101','p101','m102','a101']){assert.ok(index.includes('/learn/physics/stage-1/'+code+'/'));assert.ok(read('learn/physics/stage-1/'+code+'/index.html').includes('Module planner'));}
 const home=read('learn/preparation/m100/index.html');assert.ok(home.includes('data-planner="LU-M100"'));assert.ok(home.includes('data-study-id="U01-L01-S01"'));assert.ok(!read('programme/bridge/lu-m100/index.html').includes('data-planner="LU-M100"'));
 const row=schedule(modules[0],newPlan(modules[0],'2026-09-27')).find(r=>r.id==='U01');assert.equal(row.path,'/learn/preparation/m100/');assert.equal(row.blueprintPath+row.outline,'/programme/bridge/lu-m100/#U01');
});
