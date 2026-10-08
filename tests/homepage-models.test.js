import assert from 'node:assert/strict';
import {wave,combinedAmplitude,clockRatio,probabilityDensity} from '../src/homepage-models.js';
let checks=0;
const near=(actual,expected,tolerance=1e-10)=>{assert.ok(Math.abs(actual-expected)<tolerance,`${actual} differs from ${expected}`);checks++;};
near(combinedAmplitude(0),2);near(combinedAmplitude(90),Math.SQRT2);near(combinedAmplitude(180),0);near(combinedAmplitude(360),2);
for(let i=0;i<=100;i++){const x=i/50;near(wave(x)+wave(x,180),0);near(wave(x,360),wave(x));}
// Pythagorean triples independently give known proper-time ratios.
near(clockRatio(0),1);near(clockRatio(.6),.8);near(clockRatio(.8),.6);
for(let i=0;i<99;i++){assert.ok(clockRatio(i/100)>clockRatio((i+1)/100));checks++;}
for(const b of [-.01,1,1.01,NaN,Infinity]){assert.throws(()=>clockRatio(b),RangeError);checks++;}
for(let n=1;n<=5;n++){
 near(probabilityDensity(0,n),0);near(probabilityDensity(1,n),0);
 for(let k=1;k<n;k++)near(probabilityDensity(k/n,n),0);
 let area=0;const dx=1/10000;
 for(let i=0;i<10000;i++)area+=probabilityDensity((i+.5)*dx,n)*dx;
 near(area,1,1e-9);
 for(const x of [.17,.29,.43])near(probabilityDensity(x,n),probabilityDensity(1-x,n));
}
for(const n of [0,-1,1.5]){assert.throws(()=>probabilityDensity(.3,n),RangeError);checks++;}
console.log(`${checks} numerical checks passed: wave cancellation/periodicity; known clock ratios and limits; normalized quantum states, nodes and symmetry.`);
