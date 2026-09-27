import test from 'node:test';
import assert from 'node:assert/strict';
import {fields,emptyProfile,validateProfile,readProfile,clearLegacyProfileDrafts} from '../src/profile-data.js';
test('profile accepts optional background fields and a bounded JPEG photo',()=>{
 const p=emptyProfile();assert.equal(validateProfile(p),p);
 assert.ok(Object.keys(fields).includes('academic'));assert.equal(p.personalisation,false);
 for(const bad of [{...p,name:'x'.repeat(121)},{...p,surname:'x'.repeat(121)},{...p,photo:'https://example.org/tracker.jpg'},{...p,academic:'x'.repeat(6001)},{...p,personalisation:'yes'},{...p,extra:'unknown'}])assert.throws(()=>validateProfile(bad));
 assert.equal(validateProfile({...p,surname:'Example'}).surname,'Example');
});
test('retired profiles never reintroduce deleted information',()=>{
 for(const schemaVersion of [1,2]){
  assert.deepEqual(readProfile({schemaVersion,name:'Old name',about:'Deleted biography',photo:'old photo'}),emptyProfile());
 }
 assert.throws(()=>readProfile({schemaVersion:99}));
});
test('old or invalid browser drafts are purged without removing current drafts or study records',()=>{
 const values=new Map([['librauni:profile:old',JSON.stringify({data:{schemaVersion:2,academic:'Deleted'}})],['librauni:profile:broken','{'],['librauni:profile:current',JSON.stringify({data:emptyProfile()})],['librauni:note:test','Study note']]);
 const storage={get length(){return values.size},key:i=>[...values.keys()][i],getItem:k=>values.get(k),removeItem:k=>values.delete(k)};
 clearLegacyProfileDrafts(storage);
 assert.deepEqual([...values.keys()],['librauni:profile:current','librauni:note:test']);
});

test('minimal existing profile gains blank fields without mutating the saved record',()=>{
 const old={schemaVersion:3,name:'Example',surname:'Student',location:'',languages:''};
 const before=structuredClone(old),upgraded=readProfile(old);
 assert.deepEqual(old,before);assert.equal(upgraded.schemaVersion,4);
 assert.equal(upgraded.name,'Example');assert.equal(upgraded.academic,'');assert.equal(upgraded.photo,'');
 assert.equal(validateProfile({...upgraded,photo:'data:image/jpeg;base64,YWJj'}).photo,'data:image/jpeg;base64,YWJj');
});
