export function resolveVector(length, degrees) {
 const radians=degrees*Math.PI/180;
 const clean=n=>Math.abs(n)<1e-12?0:n;
 return {x:clean(length*Math.cos(radians)),y:clean(length*Math.sin(radians))};
}
const host=typeof document==='undefined'?null:document.querySelector('.m101-l04 .l04-explorer');
if(host){
 const angle=host.querySelector('#l04-angle'),length=host.querySelector('#l04-length');
 const set=(name,attrs)=>{const el=host.querySelector(name);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,String(v));};
 function update(){
  const a=Number(angle.value),l=Number(length.value),{x,y}=resolveVector(l,a);
  const px=240+34*x,py=230-34*y;
  set('[data-vector]',{x2:px,y2:py,visibility:l?'visible':'hidden'});
  set('[data-x]',{x2:px,visibility:x?'visible':'hidden'});
  set('[data-y]',{x1:px,x2:px,y2:py,visibility:y?'visible':'hidden'});
  set('[data-circle]',{r:34*l});set('[data-zero]',{visibility:l?'hidden':'visible'});
  const points=Array.from({length:73},(_,i)=>{const t=a*i/72*Math.PI/180;return `${240+47*Math.cos(t)} ${230-47*Math.sin(t)}`;});
  set('[data-angle-arc]',{d:'M'+points.join(' L'),visibility:l&&a?'visible':'hidden'});
  set('[data-angle-label]',{visibility:l?'visible':'hidden',x:240+70*Math.cos(a/2*Math.PI/180),y:230-70*Math.sin(a/2*Math.PI/180)});
  const message=`Magnitude ${l} m; angle setting ${a}° anticlockwise from positive x; x-component ${x.toFixed(2)} m; y-component ${y.toFixed(2)} m.${l?'':' Zero vector: no direction.'}`;
  host.querySelector('#l04-values').textContent=message;
  host.querySelector('#l04-explore-d').textContent=message;
  angle.setAttribute('aria-valuetext',`${a} degrees anticlockwise from positive x`);
  length.setAttribute('aria-valuetext',`${l} metres`);
 }
 angle.addEventListener('input',update);length.addEventListener('input',update);
 host.querySelector('#l04-reset').addEventListener('click',()=>{angle.value='30';length.value='4';update();});
 host.querySelector('.l04-controls').hidden=false;update();
}
