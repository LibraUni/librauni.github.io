import test from 'node:test';
import assert from 'node:assert/strict';
import {fields,emptyProfile,validateProfile,readProfile,clearLegacyProfileDrafts} from '../src/profile-data.js';
test('profile accepts only the four optional bounded fields',()=>{
 const p=emptyProfile();assert.equal(validateProfile(p),p);
 assert.deepEqual(Object.keys(fields),['name','surname','location','languages']);
 for(const bad of [{...p,name:'x'.repeat(121)},{...p,surname:'x'.repeat(121)},{...p,photo:''},{...p,academic:''},{...p,personalisation:true},{...p,extra:'unknown'}])assert.throws(()=>validateProfile(bad));
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
