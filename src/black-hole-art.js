// Original illustrative artwork, not a ray-traced physical model.
const $=id=>document.getElementById(id);
const canvas=$('black-hole-art'),ctx=canvas.getContext('2d');if(ctx){canvas.parentElement.classList.add('ready');$('art-motion').hidden=false;}const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,visible=true,phase=0,last=0,request=0,w=0,h=0;
let seed=301;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};const stars=Array.from({length:140},()=>({x:rand(),y:rand(),r:.3+rand()*.8,a:.12+rand()*.45}));
// The broad upper/lower arcs echo the approved logo's lensed-disc silhouette.
// Their shapes and flow are illustrative, not calculated photon trajectories.
function draw(){
 if(!ctx||!w||!h)return;
 ctx.clearRect(0,0,w,h);
 for(const star of stars){ctx.fillStyle=`rgba(200,218,221,${star.a*.65})`;ctx.beginPath();ctx.arc(star.x*w,star.y*h,star.r,0,Math.PI*2);ctx.fill();}
 const x=w*(w<550?.5:.60),y=h*.46,r=Math.min(w*(w<550?.19:.16),h*.235);
 ctx.save();ctx.translate(x,y);
 const midline=r*.10;
 const aura=ctx.createRadialGradient(0,midline,r*.7,0,midline,r*2.65);
 aura.addColorStop(0,'#efba5d20');aura.addColorStop(.48,'#bc6b2520');aura.addColorStop(1,'#bc6b2500');
 ctx.fillStyle=aura;ctx.fillRect(-r*3,-r*3,r*6,r*6);
 // The shadow and arcs share their reflection axis; the shadow meets the inner crown.
 ctx.fillStyle='#030a10';ctx.beginPath();ctx.arc(0,midline,r*1.15,0,Math.PI*2);ctx.fill();
 const gold=ctx.createLinearGradient(-r*2.5,0,r*2.5,0);
 gold.addColorStop(0,'#a04e1600');gold.addColorStop(.17,'#c77b35');gold.addColorStop(.38,'#ffe6ae');gold.addColorStop(.55,'#fff3cf');gold.addColorStop(.76,'#dba059');gold.addColorStop(1,'#a04e1600');
 function arch(q,lower=false){
  const radius=r*(1+q*.27),reflect=v=>lower?2*midline-v:v;
  ctx.beginPath();ctx.moveTo(-radius*2.45,r*.10);
  ctx.bezierCurveTo(-radius*1.35,reflect(r*.04),-radius*1.10,reflect(r*.06),-radius*.91,reflect(-radius*.43));
  ctx.bezierCurveTo(-radius*.57,reflect(-radius*1.25),radius*.54,reflect(-radius*1.25),radius*.91,reflect(-radius*.43));
  ctx.bezierCurveTo(radius*1.10,reflect(r*.06),radius*1.35,reflect(r*.04),radius*2.45,r*.10);
 }
 ctx.strokeStyle=gold;ctx.lineWidth=r*.08;ctx.shadowColor='#ed9a3c';ctx.shadowBlur=r*.19;
 ctx.globalAlpha=.38;arch(.15);ctx.stroke();arch(.15,true);ctx.stroke();ctx.shadowBlur=0;
 for(let i=0;i<42;i++){
  const q=i/41;ctx.globalAlpha=(.16+.56*Math.sin(q*Math.PI))*(.88+.12*Math.sin(phase*.7+q*20));
  ctx.lineWidth=Math.max(.45,r*.007);arch(q);ctx.stroke();arch(q,true);ctx.stroke();
 }
 for(const lower of [false,true]){
  ctx.save();ctx.strokeStyle='#fff0c5';ctx.lineWidth=Math.max(.7,r*.012);
  ctx.shadowColor='#ffbc62';ctx.shadowBlur=6;ctx.globalAlpha=.65;
  ctx.setLineDash([r*.15,r*.62,r*.04,r*.91]);ctx.lineDashOffset=-phase*r*.16;
  arch(.42,lower);ctx.stroke();ctx.restore();
 }
 ctx.globalAlpha=1;
 const discGlow=ctx.createLinearGradient(0,-r*.13,0,r*.32);
 discGlow.addColorStop(0,'#f2ba6c00');discGlow.addColorStop(.48,'#f6c77f30');discGlow.addColorStop(.56,'#ffe8b6b0');discGlow.addColorStop(.68,'#e3a44c25');discGlow.addColorStop(1,'#f2ba6c00');
 ctx.fillStyle=discGlow;ctx.beginPath();ctx.ellipse(0,r*.11,r*2.5,r*.21,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle=gold;
 for(let i=0;i<54;i++){
  const q=i/53,rx=r*(1.17+q*1.31),ry=r*(.09+q*.12);
  ctx.globalAlpha=.12+.42*(1-q);ctx.lineWidth=Math.max(.5,r*.006);
  ctx.beginPath();ctx.ellipse(0,r*.08,rx,ry,0,0,Math.PI);ctx.stroke();
 }
 for(let i=0;i<30;i++){
  const a=phase*(.12+(i%4)*.025)+i*2.39996,rx=r*(1.2+(i%9)/9*1.2),ry=r*(.09+(i%9)/9*.12);
  if(Math.sin(a)<0)continue;
  ctx.globalAlpha=.3+(i%3)*.16;ctx.strokeStyle='#ffecc4';ctx.lineWidth=Math.max(.6,r*.008);
  ctx.beginPath();ctx.ellipse(0,r*.08,rx,ry,0,a,a+.065);ctx.stroke();
 }
 ctx.restore();
}
function resize(){const rect=canvas.getBoundingClientRect();w=rect.width;h=rect.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx?.setTransform(d,0,0,d,0,0);draw();}
function loop(t){request=0;if(paused||document.hidden||!visible)return;if(!last||t-last>=32){phase+=last?Math.min((t-last)/1000,.06):0;last=t;draw();}request=requestAnimationFrame(loop);}
function sync(){cancelAnimationFrame(request);request=0;last=0;$('art-motion').setAttribute('aria-pressed',String(paused));$('art-motion').innerHTML=paused?'Play motion <span aria-hidden="true">▷</span>':'Pause motion <span aria-hidden="true">Ⅱ</span>';if(!paused&&!document.hidden&&visible)request=requestAnimationFrame(loop);draw();}
$('art-motion').addEventListener('click',()=>{paused=!paused;sync();});reduced.addEventListener('change',e=>{paused=e.matches;sync();});document.addEventListener('visibilitychange',sync);new ResizeObserver(resize).observe(canvas);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(canvas);resize();sync();
