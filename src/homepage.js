import {wave, combinedAmplitude, clockRatio, probabilityDensity} from './homepage-models.js';
const $ = id => document.getElementById(id);
const ns = 'http://www.w3.org/2000/svg';
const svgNode = (name, attrs, text) => {const e=document.createElementNS(ns,name);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;return e;};
document.querySelectorAll('.lab button, .lab input').forEach(el=>el.disabled=false);
const palette={mint:'#91cdbf',lilac:'#b7aecf',gold:'#e7c685',grid:'#29414b',text:'#c0ced1'};
let mode='waves';
const configs={
 waves:{min:0,max:360,step:1,value:90,label:'Phase difference',minLabel:'0° · in step',maxLabel:'360° · in step again',category:'WAVES & SUPERPOSITION',title:'Can two waves<br>make no wave?',description:'Slide one wave out of step with the other. Watch their peaks reinforce—or cancel—each other.',prompt:'Try 180°. Where did the wave go?',name:'TWO WAVES. ONE RESULT.',unit:'Displacement / A',resultLabel:'Combined amplitude',note:'Ideal model: two equal-amplitude sine waves with the same wavelength and frequency, added at each position. The graph is a snapshot, not a movie.',legend:'<span><i class="line one"></i>Wave 1</span><span><i class="line two"></i>Wave 2</span><span><i class="line sum"></i>Their sum</span>'},
 relativity:{min:0,max:99,step:1,value:60,label:'Relative speed',minLabel:'0 · at rest',maxLabel:'0.99c · near light speed',category:'SPECIAL RELATIVITY',title:'Whose second<br>is it, anyway?',description:'Choose a constant relative speed. Compare the time a moving clock records during ten seconds in the observer’s frame.',prompt:'Try 80% of light speed. Ten seconds becomes six.',name:'ONE INTERVAL. TWO CLOCK READINGS.',unit:'Moving clock / observer time',resultLabel:'Moving clock, per 10 observer seconds',note:'Ideal model: constant-speed inertial motion, with no gravity or turnaround. c is the speed of light. We compare two events on the moving clock’s path; this is not a complete twin-paradox trip.',legend:'<span><i class="line sum"></i>Clock-rate ratio</span><span><i class="line one"></i>Your chosen speed</span>'},
 quantum:{min:1,max:5,step:1,value:1,label:'Quantum state',minLabel:'n = 1 · lowest energy',maxLabel:'n = 5',category:'QUANTUM MECHANICS',title:'Where might<br>a particle be?',description:'Choose an energy state. The curve shows the probability density for finding a particle at different positions inside an ideal box.',prompt:'Try n = 2. A zero appears in the middle.',name:'A PARTICLE. A BOX. POSSIBILITIES.',unit:'Probability density × L',resultLabel:'Energy relative to the lowest state',note:'Ideal model: a particle in a one-dimensional box of width L with impenetrable walls. Each state has a definite energy, proportional to the square of its state number. Area under the curve gives probability; this is not a particle trajectory.',legend:'<span><i class="line sum"></i>Probability density</span><span>Area under curve = 1</span>'}
};
function chart(){
 const c=configs[mode],v=Number($('parameter').value),grid=$('plot-grid'),curves=$('plot-curves'),labels=$('plot-labels');
 grid.replaceChildren();curves.replaceChildren();labels.replaceChildren();
 const box={l:49,r:654,t:19,b:262},xmin=0,xmax=mode==='waves'?2:1,ymin=mode==='waves'?-2.2:0,ymax=mode==='relativity'?1.08:2.2;
 const X=x=>box.l+(x-xmin)/(xmax-xmin)*(box.r-box.l),Y=y=>box.b-(y-ymin)/(ymax-ymin)*(box.b-box.t);
 const small=$('plot').getBoundingClientRect().width<420;
 const labelSize=small?24:14;
 const txt=(x,y,t,anchor='middle')=>labels.append(svgNode('text',{x,y,fill:palette.text,'font-size':labelSize,'font-family':'system-ui, sans-serif','text-anchor':anchor},t));
 const ys=mode==='waves'?[-2,-1,0,1,2]:mode==='relativity'?(small?[0,.5,1]:[0,.25,.5,.75,1]):[0,.5,1,1.5,2];
 for(const y of ys){grid.append(svgNode('line',{x1:box.l,x2:box.r,y1:Y(y),y2:Y(y),stroke:y===0?'#547079':palette.grid,'stroke-width':1}));txt(38,Y(y)+4,String(y),'end');}
 for(let i=0;i<=4;i++){let x=xmax*i/4;grid.append(svgNode('line',{x1:X(x),x2:X(x),y1:box.t,y2:box.b,stroke:palette.grid}));txt(X(x),284,String(x));}
 txt((box.l+box.r)/2,306,mode==='waves'?'Position / wavelength':mode==='relativity'?'Relative speed / c':'Position / L');
 const curve=(fn,color,width,dash)=>{let d='';for(let i=0;i<=400;i++){const x=xmax*i/400;const y=fn(x);d+=(i?'L':'M')+X(x).toFixed(2)+','+Y(y).toFixed(2);}const a={d,fill:'none',stroke:color,'stroke-width':width,'stroke-linejoin':'round','stroke-linecap':'round'};if(dash)a['stroke-dasharray']=dash;curves.append(svgNode('path',a));return d;};
 if(mode==='waves'){
  curve(x=>wave(x),palette.mint,1.8);curve(x=>wave(x,v),palette.lilac,1.8,'6 5');curve(x=>wave(x)+wave(x,v),palette.gold,3.2);
  $('parameter-value').textContent=v+'°';$('parameter').setAttribute('aria-valuetext',v+' degrees');
  const a=combinedAmplitude(v).toFixed(2);$('result').innerHTML=a+'<span> × A</span>';$('plot-title').textContent='Wave superposition';$('plot-desc').textContent=`Two equal waves ${v} degrees apart combine to an amplitude of ${a} times either wave. At 180 degrees their displacements cancel.`;
 }else if(mode==='relativity'){
  curve(x=>Math.sqrt(Math.max(0,1-x*x)),palette.gold,3.2);
  const b=v/100,r=clockRatio(b);curves.append(svgNode('path',{d:`M${X(b)} ${Y(0)}V${Y(r)}H${X(0)}`,fill:'none',stroke:palette.mint,'stroke-dasharray':'4 5','stroke-width':1.5}));curves.append(svgNode('circle',{cx:X(b),cy:Y(r),r:6,fill:palette.mint,stroke:'#10212b','stroke-width':2}));
  $('parameter-value').textContent=b.toFixed(2)+'c';$('parameter').setAttribute('aria-valuetext',v+' percent of the speed of light');$('result').innerHTML=(10*r).toFixed(2)+'<span> seconds</span>';$('plot-title').textContent='Relativistic clock-rate ratio';$('plot-desc').textContent=`At ${v} percent of light speed, the moving clock records ${(10*r).toFixed(2)} seconds during ten observer-frame seconds. The ratio falls from one towards zero as speed approaches light speed.`;
 }else{
  const d=curve(x=>probabilityDensity(x,v),palette.gold,3);const fill=svgNode('path',{d:d+`L${X(1)},${Y(0)}L${X(0)},${Y(0)}Z`,fill:'#e7c68520',stroke:'none'});curves.prepend(fill);
  for(const x of [0,1])curves.append(svgNode('line',{x1:X(x),x2:X(x),y1:Y(0),y2:Y(2.2),stroke:'#91cdbf','stroke-width':3}));
  $('parameter-value').textContent='n = '+v;$('parameter').setAttribute('aria-valuetext','Quantum state '+v);$('result').innerHTML=(v*v)+'<span> × E₁</span>';$('plot-title').textContent='Particle in a box probability density';$('plot-desc').textContent=`State ${v} has ${v} probability-density peaks and ${v-1} interior zeros. Its energy is ${v*v} times the lowest-state energy. The total area under the curve is one.`;
 }
}
function setMode(next){mode=next;const c=configs[mode];for(const key of ['min','max','step','value'])$('parameter')[key]=c[key];for(const [id,key]of [['slider-label','label'],['min-label','minLabel'],['max-label','maxLabel'],['lab-category','category'],['lab-description','description'],['plot-name','name'],['plot-unit','unit'],['result-label','resultLabel'],['model-note','note']])$(id).textContent=c[key];$('lab-title').innerHTML=c.title;$('experiment-prompt').innerHTML='<span aria-hidden="true">↳</span> '+c.prompt;$('legend').innerHTML=c.legend;document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));chart();}
$('parameter').addEventListener('input',chart);$('reset').addEventListener('click',()=>setMode(mode));document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));setMode('waves');new ResizeObserver(chart).observe($('plot'));

// Original animated artwork, deliberately labelled as an illustration, not a GR simulation.
const canvas=$('cosmos'),ctx=canvas.getContext('2d');if(ctx){canvas.parentElement.classList.add('canvas-ready');$('motion').hidden=false;}const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,visible=true,phase=0,last=0,request=0,w=0,h=0;
let seed=301;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};const stars=Array.from({length:140},()=>({x:rand(),y:rand(),r:.3+rand()*.8,a:.12+rand()*.45}));
function draw(){if(!ctx||!w||!h)return;ctx.clearRect(0,0,w,h);for(const s of stars){ctx.fillStyle=`rgba(200,218,221,${s.a})`;ctx.beginPath();ctx.arc(s.x*w,s.y*h,s.r,0,Math.PI*2);ctx.fill();}
 const x=w*.51,y=h*.45,r=Math.min(w*.21,h*.23);
 const glow=ctx.createRadialGradient(x,y,r*.6,x,y,r*2.5);glow.addColorStop(0,'#efc98912');glow.addColorStop(.5,'#6baaa215');glow.addColorStop(1,'#10212b00');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
 ctx.save();ctx.translate(x,y);ctx.rotate(-.27);
 // Faint instrument-like construction lines.
 ctx.strokeStyle='#98bfb31b';ctx.lineWidth=.6;for(const rr of [r*1.65,r*2.15]){ctx.beginPath();ctx.ellipse(0,0,rr,rr*.8,0,0,Math.PI*2);ctx.stroke();}
 for(let i=0;i<85;i++){const q=i/84,rx=r*(1.13+q*1.28),ry=rx*(.24+.025*Math.sin(q*7));ctx.beginPath();ctx.ellipse(0,0,rx,ry,0,Math.PI,Math.PI*2);ctx.strokeStyle=`rgba(${215+Math.round(q*25)},${170+Math.round(q*35)},${102+Math.round(q*37)},${.07+.20*(1-q)})`;ctx.lineWidth=.7;ctx.stroke();}
 const ring=ctx.createRadialGradient(0,0,r*.85,0,0,r*1.15);ring.addColorStop(0,'#070f17');ring.addColorStop(.46,'#0a1119');ring.addColorStop(.68,'#d9b980');ring.addColorStop(.75,'#f4dfad');ring.addColorStop(.79,'#b99459aa');ring.addColorStop(1,'#b9945900');ctx.fillStyle=ring;ctx.beginPath();ctx.arc(0,0,r*1.15,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#09131d';ctx.beginPath();ctx.arc(0,0,r*.975,0,Math.PI*2);ctx.fill();
 for(let i=0;i<94;i++){const q=i/93,rx=r*(1.05+q*1.4),ry=rx*(.24+.025*Math.sin(q*7));ctx.beginPath();ctx.ellipse(0,0,rx,ry,0,0,Math.PI);ctx.strokeStyle=`rgba(239,${184+Math.round(q*34)},${114+Math.round(q*37)},${.08+.29*(1-q)})`;ctx.lineWidth=.85;ctx.stroke();}
 for(let i=0;i<36;i++){let a=phase*(.18+(i%5)*.018)+i*2.39996,rx=r*(1.13+(i%11)/11*1.24),ry=rx*.25,px=Math.cos(a)*rx,py=Math.sin(a)*ry;if(py<0&&Math.hypot(px,py)<r)continue;ctx.fillStyle=`rgba(250,218,157,${.2+(i%4)*.13})`;ctx.beginPath();ctx.arc(px,py,.8+(i%3)*.4,0,Math.PI*2);ctx.fill();}
 ctx.restore();
 // Small sight lines and a quiet annotation.
 ctx.strokeStyle='#87b2aa66';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(x+r*.95,y-r*.4);ctx.lineTo(x+r*1.65,y-r*.95);ctx.lineTo(x+r*2.08,y-r*.95);ctx.stroke();ctx.fillStyle='#b8cecb';ctx.font='8px system-ui';ctx.fillText('FOLLOW YOUR CURIOSITY',x+r*.97,y-r*1.16);
}
function resize(){const rect=canvas.getBoundingClientRect();w=rect.width;h=rect.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx?.setTransform(d,0,0,d,0,0);draw();}
function loop(t){request=0;if(paused||document.hidden||!visible)return;if(!last||t-last>=32){phase+=last?Math.min((t-last)/1000,.06):0;last=t;draw();}request=requestAnimationFrame(loop);}
function sync(){cancelAnimationFrame(request);request=0;last=0;$('motion').setAttribute('aria-pressed',String(paused));$('motion').innerHTML=paused?'Play motion <span aria-hidden="true">▷</span>':'Pause motion <span aria-hidden="true">Ⅱ</span>';document.body.classList.toggle('motion-paused',paused);if(!paused&&!document.hidden&&visible)request=requestAnimationFrame(loop);draw();}
$('motion').addEventListener('click',()=>{paused=!paused;sync();});reduced.addEventListener('change',e=>{paused=e.matches;sync();});document.addEventListener('visibilitychange',sync);new ResizeObserver(resize).observe(canvas);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(canvas);resize();sync();
