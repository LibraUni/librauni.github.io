// Original illustrative artwork, not a ray-traced physical model.
const $=id=>document.getElementById(id);
const canvas=$('black-hole-art'),ctx=canvas.getContext('2d');if(ctx){canvas.parentElement.classList.add('ready');$('art-motion').hidden=false;}const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,visible=true,phase=0,last=0,request=0,w=0,h=0;
let seed=301;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};const stars=Array.from({length:140},()=>({x:rand(),y:rand(),r:.3+rand()*.8,a:.12+rand()*.45}));
function draw(){if(!ctx||!w||!h)return;ctx.clearRect(0,0,w,h);for(const s of stars){ctx.fillStyle=`rgba(200,218,221,${s.a})`;ctx.beginPath();ctx.arc(s.x*w,s.y*h,s.r,0,Math.PI*2);ctx.fill();}
 const x=w*.60,y=h*.46,r=Math.min(w*.23,h*.24);
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
 ctx.strokeStyle='#87b2aa66';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(x+r*.95,y-r*.4);ctx.lineTo(x+r*1.65,y-r*.95);ctx.lineTo(x+r*2.08,y-r*.95);ctx.stroke();ctx.fillStyle='#b8cecb';ctx.font='8px system-ui';ctx.fillText('THE QUESTION CONTINUES',x+r*.97,y-r*1.16);
}
function resize(){const rect=canvas.getBoundingClientRect();w=rect.width;h=rect.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx?.setTransform(d,0,0,d,0,0);draw();}
function loop(t){request=0;if(paused||document.hidden||!visible)return;if(!last||t-last>=32){phase+=last?Math.min((t-last)/1000,.06):0;last=t;draw();}request=requestAnimationFrame(loop);}
function sync(){cancelAnimationFrame(request);request=0;last=0;$('art-motion').setAttribute('aria-pressed',String(paused));$('art-motion').innerHTML=paused?'Play motion <span aria-hidden="true">▷</span>':'Pause motion <span aria-hidden="true">Ⅱ</span>';if(!paused&&!document.hidden&&visible)request=requestAnimationFrame(loop);draw();}
$('art-motion').addEventListener('click',()=>{paused=!paused;sync();});reduced.addEventListener('change',e=>{paused=e.matches;sync();});document.addEventListener('visibilitychange',sync);new ResizeObserver(resize).observe(canvas);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(canvas);resize();sync();
