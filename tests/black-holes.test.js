import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {load} from 'cheerio';
import {runInNewContext} from 'node:vm';
import {C,horizonRadius,clockRate,tidalDifference,lightSlope,lightPath} from '../src/black-hole-models.js';
const close=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<tol,`${a} vs ${b}`);
test('Schwarzschild scales and observer domains',()=>{
 close(horizonRadius(1)/1000,2.9533393820668787,1e-8);
 close(clockRate(4/3),.5);close(clockRate(4),Math.sqrt(.75));
 assert.equal(clockRate(1),null);assert.equal(clockRate(.75),null);
 close(horizonRadius(100)/horizonRadius(10),10);
 close(tidalDifference(10,1)/tidalDifference(100,1),100);
 close(tidalDifference(10,1)/tidalDifference(10,2),8);
 for(const bad of [0,-1,NaN,Infinity]){assert.throws(()=>horizonRadius(bad));assert.throws(()=>clockRate(bad));}
});
test('radial null paths preserve the causal boundary and converge',()=>{
 close(lightSlope(1,1),0);assert.ok(lightSlope(.75,1)<0);assert.ok(lightSlope(2,1)>0);
 for(const x of [.5,.75,1,1.01,2,4])for(const d of [-1,1]){
  const p=lightPath(x,d);assert.ok(p.every(q=>q.every(Number.isFinite)));
  for(let i=1;i<p.length;i++){
   assert.ok(p[i][1]>p[i-1][1]);
   if(d===-1||x<1)assert.ok(p[i][0]<p[i-1][0]);
   else if(x===1)close(p[i][0],1);
   else assert.ok(p[i][0]>p[i-1][0]);
  }
 }
 for(const d of [-1,1]){
  const p=lightPath(2,d,{step:.01,duration:.3}).at(-1)[0];
  const q=lightPath(2,d,{step:.0025,duration:.3}).at(-1)[0];close(p,q,1e-8);
 }
 // Independent analytic antiderivative of dT/dx for outgoing paths.
 const F=x=>x+2*Math.sqrt(x)+2*Math.log(Math.abs(Math.sqrt(x)-1));
 const end=lightPath(2,1,{duration:3}).at(-1);close(F(end[0])-F(2),end[1],1e-8);
});
test('exploration links to real modules, keeps shared controls and supplies static content',()=>{
 const root=new URL('../',import.meta.url),read=p=>readFileSync(new URL(p,root),'utf8');
 const $=load(read('explore/black-holes/index.html'));assert.equal($('h1').length,1);
 const ids=$('[id]').map((i,e)=>$(e).attr('id')).get();assert.equal(ids.length,new Set(ids).size);
 $('a[href^="/"]').each((i,e)=>{const path=$(e).attr('href').split('#')[0];assert.ok(existsSync(new URL('.'+path+'index.html',root)),path);});
 $('a[href^="#"]').each((i,e)=>assert.ok(ids.includes($(e).attr('href').slice(1))));
 assert.equal($('body>header #theme-toggle').length,1);assert.equal($('script[src="/src/theme.js"]').length,1);
 assert.equal($('script[src="/src/main.js"],script[src="/src/study-ui.js"]').length,0);
 assert.ok($('noscript').text().includes('both radial directions'));
 assert.equal($('button[data-experiment]').length,3);
 assert.ok(read('index.html').includes('href="/explore/black-holes/"'));
 assert.ok(read('vite.config.js').includes("'./explore/black-holes/index.html'"));
 assert.ok($.text().includes('These are alternatives.'));
});

test('shared theme starts successfully on the exploration before the laboratory entry runs',()=>{
 const html=readFileSync(new URL('../explore/black-holes/index.html',import.meta.url),'utf8');
 const $=load(html), themeMeta=$('meta[name="theme-color"]');
 const handlers={};
 const control={setAttribute(){},removeAttribute(){},addEventListener(type,fn){handlers[type]=fn;}};
 const meta=themeMeta.length?{content:themeMeta.attr('content')}:null;
 const document={documentElement:{dataset:{}},querySelector(selector){return selector==='#theme-toggle'?control:selector==='meta[name="theme-color"]'?meta:null;}};
 const source=readFileSync(new URL('../src/theme.js',import.meta.url),'utf8').replace(/^import .*;$/gm,'');
 assert.doesNotThrow(()=>runInNewContext(source,{document,window:{addEventListener(){}},localStorage:{setItem(){}}}));
 assert.equal(meta.content,'#F7F4ED');
 handlers.click();assert.equal(meta.content,'#14232C');
 assert.equal(document.documentElement.dataset.theme,'dark');
});

test('laboratory starts, responds to all experiments and resets its controls',()=>{
 const $=load(readFileSync(new URL('../explore/black-holes/index.html',import.meta.url),'utf8'));
 const nodes=new Map();
 function node(el){
  if(nodes.has(el))return nodes.get(el);
  const q=$(el),handlers={},n={value:q.val(),disabled:q.is('[disabled]'),hidden:q.is('[hidden]'),textContent:q.text(),innerHTML:q.html(),dataset:{experiment:q.attr('data-experiment'),radius:q.attr('data-radius')},setAttribute(k,v){q.attr(k,v);},addEventListener(k,fn){handlers[k]=fn;},emit(k){handlers[k]();}};
  nodes.set(el,n);return n;
 }
 const document={hidden:false,getElementById(id){return node($('#'+id)[0]);},querySelectorAll(selector){return $(selector).toArray().map(node);},addEventListener(){}};
 const observer=class{observe(){}};
 const source=readFileSync(new URL('../src/black-holes.js',import.meta.url),'utf8').replace(/^import .*;$/gm,'');
 runInNewContext(source,{document,C,horizonRadius,clockRate,tidalDifference,lightPath,matchMedia:()=>({matches:false,addEventListener(){}}),IntersectionObserver:observer,cancelAnimationFrame(){},requestAnimationFrame(){return 1;}});
 const get=id=>document.getElementById(id);
 assert.equal(get('radius').disabled,false);assert.equal(get('result').textContent,'Can escape');
 const click=selector=>node($(selector)[0]).emit('click');
 click('[data-radius="0.75"]');assert.equal(get('result').textContent,'Cannot escape');
 click('[data-experiment="clocks"]');assert.equal(get('result').textContent,'No hovering clock');
 get('radius').value='4';get('radius').emit('input');assert.equal(get('result').textContent,'0.866 ×');
 get('lab-play').emit('click');assert.equal(get('lab-play').textContent,'Pause clock comparison');
 get('lab-play').emit('click');assert.equal(get('lab-play').textContent,'Play clock comparison');
 click('[data-experiment="tides"]');const initial=get('result').textContent;
 get('mass').value='1000000';get('mass').emit('input');assert.notEqual(get('result').textContent,initial);assert.equal(get('lab-play').hidden,true);
 get('lab-reset').emit('click');assert.equal(get('radius').value,2);assert.equal(get('mass').value,10);
 click('[data-experiment="light"]');assert.equal(get('result').textContent,'Can escape');assert.equal(get('lab-play').hidden,false);
});
