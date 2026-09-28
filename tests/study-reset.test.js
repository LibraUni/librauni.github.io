import test from 'node:test';
import assert from 'node:assert/strict';
import {clearRetiredStudyDrafts} from '../src/study-reset.js';
test('reset removes retired study drafts once and preserves profile and later work',()=>{
 const storage={'librauni:planner:owner':'old','librauni:academic-journal:owner':'old','librauni:assessment:owner':'old','librauni:profile:v4:owner':'profile','librauni-theme':'dark'};
 Object.defineProperties(storage,{getItem:{value:k=>storage[k]},removeItem:{value:k=>delete storage[k]},setItem:{value:(k,v)=>storage[k]=v}});
 clearRetiredStudyDrafts(storage);assert.equal(storage['librauni:planner:owner'],undefined);assert.equal(storage['librauni:academic-journal:owner'],undefined);assert.equal(storage['librauni:assessment:owner'],undefined);assert.equal(storage['librauni:profile:v4:owner'],'profile');assert.equal(storage['librauni-theme'],'dark');
 storage['librauni:planner:owner']='new';clearRetiredStudyDrafts(storage);assert.equal(storage['librauni:planner:owner'],'new');
});
