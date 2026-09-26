import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyProfile,validateProfile,tutorBrief,readProfile} from '../src/profile-data.js';
test('profile allows optional fields, bounds data and rejects active image content',()=>{
 const p=emptyProfile();assert.equal(validateProfile(p),p);
 for(const bad of [{...p,name:'x'.repeat(121)},{...p,photo:'https://example.org/tracker'},{...p,photo:'data:image/svg+xml,<svg/>'},{...p,personalisation:'yes'},{...p,extra:'unknown'}])assert.throws(()=>validateProfile(bad));
 assert.equal(validateProfile({...p,photo:'data:image/jpeg;base64,YWJj'}).photo,'data:image/jpeg;base64,YWJj');
});
test('tutor summary contains supplied context and preference but excludes photograph',()=>{
 const p={...emptyProfile(),academic:'Example qualification',photo:'data:image/jpeg;base64,YWJj',personalisation:false};
 const text=tutorBrief(p);assert.ok(text.includes(p.academic));assert.ok(text.includes('Do not use'));assert.ok(!text.includes(p.photo));
});

test('legacy profiles and recovered drafts keep context while removing pronouns',()=>{
 const {surname,...base}=emptyProfile();
 const legacy={...base,schemaVersion:1,name:'Test learner',pronouns:'they/them',academic:'Existing background'};
 const migrated=readProfile(legacy);
 assert.equal(migrated.surname,'');assert.equal(migrated.academic,legacy.academic);
 assert.equal(migrated.schemaVersion,2);assert.ok(!('pronouns' in migrated));
 assert.equal(legacy.pronouns,'they/them');assert.equal(legacy.schemaVersion,1);
 assert.throws(()=>readProfile({...legacy,extra:'unexpected'}));
 assert.throws(()=>readProfile({...legacy,pronouns:42}));
 const current={...migrated,surname:'Example'};
 assert.equal(readProfile(current),current);
 assert.match(tutorBrief(current),/Surname\nExample/);
 assert.throws(()=>validateProfile({...current,surname:'x'.repeat(121)}));
});
