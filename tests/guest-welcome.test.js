import test from 'node:test';
import assert from 'node:assert/strict';
import {guestWelcomeTarget as target} from '../src/guest-welcome.js';
const memory=()=>{const map=new Map();return {getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)}};
test('other accounts land on the guide once and can then browse public teaching',()=>{
 const store=memory(),guest={uid:'guest'};
 assert.equal(target(guest,false,'/learn/',store),'/enjoy/');
 assert.equal(target(guest,false,'/enjoy/',store),null);
 assert.equal(target(guest,false,'/learn/physics/stage-1/m101/',store),null);
 assert.equal(target(null,false,'/',store),null);
 assert.equal(target(guest,false,'/',store),'/enjoy/');
 assert.equal(target({uid:'different'},false,'/',store),'/enjoy/');
});
test('owner and signed-out visitors are not redirected; guide aliases do not loop',()=>{
 assert.equal(target({uid:'owner'},true,'/',memory()),null);
 assert.equal(target(null,false,'/learn/',memory()),null);
 for(const path of ['/enjoy','/enjoy/','/enjoy/index.html'])assert.equal(target({uid:'guest'},false,path,memory()),null);
 assert.equal(target({uid:'guest'},false,'/',undefined),null);
});
