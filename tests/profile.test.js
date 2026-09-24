import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyProfile,validateProfile,tutorBrief} from '../src/profile-data.js';
test('profile allows optional fields, bounds data and rejects active image content',()=>{
 const p=emptyProfile();assert.equal(validateProfile(p),p);
 for(const bad of [{...p,name:'x'.repeat(121)},{...p,photo:'https://example.org/tracker'},{...p,photo:'data:image/svg+xml,<svg/>'},{...p,personalisation:'yes'},{...p,extra:'unknown'}])assert.throws(()=>validateProfile(bad));
 assert.equal(validateProfile({...p,photo:'data:image/jpeg;base64,YWJj'}).photo,'data:image/jpeg;base64,YWJj');
});
test('tutor summary contains supplied context and preference but excludes photograph',()=>{
 const p={...emptyProfile(),academic:'Example qualification',photo:'data:image/jpeg;base64,YWJj',personalisation:false};
 const text=tutorBrief(p);assert.ok(text.includes(p.academic));assert.ok(text.includes('Do not use'));assert.ok(!text.includes(p.photo));
});
