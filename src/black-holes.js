import './black-hole-art.js';
import {C,horizonRadius,clockRate,tidalDifference,lightPath} from './black-hole-models.js';
const $=id=>document.getElementById(id), plot=$('bh-plot');
let mode='light',x=2,mass=10,playing=false,phase=0,request=0,last=0,visible=false;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const fmt=v=>v>=1e6||v<.01?v.toExponential(2):v.toLocaleString('en',{maximumFractionDigits:2});
const text=(x,y,s,extra='')=>`<text x="${x}" y="${y}" fill="#c4d7da" ${extra.includes('font-size=')?'':'font-size="13"'} ${extra}>${s}</text>`;
const line=(x1,y1,x2,y2,color='#37515d',extra='')=>`<path d="M${x1},${y1}L${x2},${y2}" stroke="${color}" fill="none" ${extra}/>`;
const circle=(x,y,r,color)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
let paths=[];
function lightDiagram(){
 const px=v=>65+v*98,py=t=>380-t*65;
 let s='<rect x="65" y="36" width="98" height="344" fill="#e2ae6614"/>';
 for(let i=0;i<=6;i++)s+=line(px(i),36,px(i),380)+text(px(i),403,i,'text-anchor="middle"');
 for(let i=0;i<=5;i++)s+=line(65,py(i),653,py(i))+text(51,py(i)+4,i,'text-anchor="end"');
 s+=line(px(1),32,px(1),380,'#e6bf82','stroke-dasharray="4 5"')+text(px(1)+9,25,'HORIZON','font-weight="600"')+text(350,440,'Radius / horizon radius →','text-anchor="middle"')+text(16,230,'Time (horizon light-crossing units) →','transform="rotate(-90 16 230)" text-anchor="middle"');
 for(const [i,p]of paths.entries()){
  const d=p.map(([r,t],j)=>(j?'L':'M')+px(r).toFixed(2)+','+py(t).toFixed(2)).join('');
  s+=`<path d="${d}" fill="none" stroke="${i?'#9bd9dc':'#ecc58c'}" stroke-width="3" ${i?'stroke-dasharray="8 5"':''}/>`;
  if(playing||phase>0){const target=phase%5;const point=p.find(v=>v[1]>=target)||p.at(-1);s+=circle(px(point[0]),py(point[1]),6,i?'#9bd9dc':'#ffe4b7');}
 }
 s+=circle(px(x),380,6,'#ffffff')+text(Math.min(px(x)+10,550),365,'Emission point');return s;
}
function clockDiagram(){
 const ratio=clockRate(x),elapsed=playing||phase>0?(phase%15)*4:60;
 let s='';
 for(const [cx,name,rate,color]of [[190,'Faraway clock',1,'#9bd9dc'],[505,'Hovering clock',ratio,'#ecc58c']]){
  s+=`<circle cx="${cx}" cy="175" r="100" fill="#18333e" stroke="${color}" stroke-width="2"/>`;
  for(let n=0;n<12;n++){const a=n*Math.PI/6;s+=line(cx+Math.sin(a)*86,175-Math.cos(a)*86,cx+Math.sin(a)*94,175-Math.cos(a)*94,'#b1c8ce');}
  if(rate!==null){const a=elapsed*rate/60*Math.PI*2;s+=line(cx,175,cx+Math.sin(a)*76,175-Math.cos(a)*76,color,'stroke-width="4"')+circle(cx,175,5,color);s+=text(cx,327,`${(elapsed*rate).toFixed(1)} seconds`,'text-anchor="middle" font-size="23"');}
  else s+=text(cx,180,'Cannot hover','text-anchor="middle"');
  s+=text(cx,47,name,'text-anchor="middle" font-size="18"');
 }
 s+=text(350,383,ratio===null?'No stationary observer exists here.':`Nearby / faraway elapsed time = ${ratio.toFixed(3)}`,'text-anchor="middle"');
 return s;
}
function tideDiagram(){
 const px=l=>75+(l-1)*80,py=l=>370-(l+10)*15;
 let s='';
 for(let l=-10;l<=10;l+=4)s+=line(75,py(l),635,py(l))+text(62,py(l)+4,`10<tspan baseline-shift="super" font-size="10">${l}</tspan>`,'text-anchor="end"');
 for(let l=1;l<=8;l++)s+=line(px(l),50,px(l),370)+text(px(l),397,`10<tspan baseline-shift="super" font-size="10">${l}</tspan>`,'text-anchor="middle"');
 let d='';for(let l=1;l<=8.001;l+=.05)d+=(d?'L':'M')+px(l).toFixed(2)+','+py(Math.log10(tidalDifference(10**l,x))).toFixed(2);
 s+=`<path d="${d}" fill="none" stroke="#ecc58c" stroke-width="3"/>`;
 const point=[px(Math.log10(mass)),py(Math.log10(tidalDifference(mass,x)))];s+=circle(...point,7,'#9bd9dc')+text(350,438,'Black-hole mass / solar mass (log scale)','text-anchor="middle"')+text(18,215,'Tidal difference / m s⁻² (log scale)','transform="rotate(-90 18 215)" text-anchor="middle"')+text(86,30,`Across 2 metres · at ${x.toFixed(2)} horizon radii`);
 return s;
}
const config={
 light:{label:'EXPERIMENT 01 · LIGHT',title:'Give the torch a chance.',intro:'Start outside. Move the emission point onto the horizon, then inside. Can the outward beam still reach a larger radius?',name:'LIGHT’S POSSIBLE FUTURES',kind:'A spacetime diagram',caption:'Figure BH.1 · Follow each line upwards into the future. Gold: initially outward light. Dashed blue: inward light. These are paths in spacetime, not a picture of bent beams in space.',try:'↳ Try exactly 1. Why does the outward path become vertical?'},
 clocks:{label:'EXPERIMENT 02 · CLOCKS',title:'One minute. Two clocks.',intro:'Compare a clock held above the horizon with one infinitely far away. Move the nearby clock closer. What happens when it can no longer hover?',name:'SAME INTERVAL · DIFFERENT ELAPSED TIMES',kind:'Ideal stationary clocks',caption:'Figure BH.1 · Blue: a stationary clock infinitely far away. Gold: a clock held at the selected radius. The static view compares 60 faraway seconds; Play runs a repeating, accelerated comparison.',try:'↳ Try 4 horizon radii. Predict the nearby elapsed time for one distant minute.'},
 tides:{label:'EXPERIMENT 03 · TIDES',title:'A bigger hole. A gentler edge?',intro:'Keep the position at the horizon and increase the mass. Compare the differential acceleration across a two-metre radial separation.',name:'THE STRETCH BETWEEN NEIGHBOURS',kind:'Both axes use powers of ten',caption:'Figure BH.1 · The curve compares different black-hole masses at the selected number of horizon radii. The dot marks your chosen mass. It shows relative radial acceleration across 2 m, not the deformation of a body.',try:'↳ Set the position to 1, then increase the mass. A bigger horizon can have weaker tides.'}
};
function draw(){const title=mode==='light'?'Radial light paths':mode==='clocks'?'Comparison of stationary clocks':'Radial tidal differences by black-hole mass';plot.innerHTML=`<title id="plot-title">${title}</title><desc id="plot-desc">${$('result-detail').textContent} ${config[mode].caption}</desc>`+(mode==='light'?lightDiagram():mode==='clocks'?clockDiagram():tideDiagram());}
function update(){
 x=Number($('radius').value);mass=Number($('mass').value);paths=[lightPath(x,1),lightPath(x,-1)];
 $('radius-value').textContent=`${x.toFixed(2)} horizon radii`;$('mass-value').textContent=mass.toLocaleString('en')+' Suns';
 const km=horizonRadius(mass)/1000, r=clockRate(x);
 $('result-label').textContent=mode==='light'?'OUTWARD LIGHT':mode==='clocks'?'NEARBY / FARAWAY CLOCK RATE':'RADIAL TIDAL DIFFERENCE';
 $('result').textContent=mode==='light'?(x>1?'Can escape':x===1?'Stays on the horizon':'Cannot escape'):mode==='clocks'?(r===null?'No hovering clock':r.toFixed(3)+' ×'):fmt(tidalDifference(mass,x))+' m/s²';
 $('result-detail').textContent=mode==='light'?`${x>1?'Its radius increases.':x===1?'The outward ray remains at the horizon; the inward ray falls in.':'Both radial light directions lead to smaller radii.'} Horizon radius: ${fmt(km)} km. One graph time unit: ${fmt(horizonRadius(mass)/C)} s.`:mode==='clocks'?(r===null?'Holding a clock at this radius is impossible. This does not mean a falling observer’s watch stops.':`For 60 seconds far away, the nearby clock records ${(60*r).toFixed(2)} seconds. Position: ${fmt(x*km)} km from the centre.`):`Across 2 metres at ${fmt(x*km)} km from the centre. Compare at fixed horizon-radius multiples: a mass ten times larger gives a tidal difference 100 times smaller.`;
 draw();
}
function sync(){cancelAnimationFrame(request);request=0;last=0;$('lab-play').textContent=(playing?'Pause':'Play')+(mode==='clocks'?' clock comparison':' light paths');$('lab-play').setAttribute('aria-pressed',String(playing));$('lab-play').hidden=mode==='tides';if(playing&&visible&&!document.hidden)request=requestAnimationFrame(loop);draw();}
function loop(t){request=0;if(!playing||!visible||document.hidden)return;if(!last||t-last>=32){phase+=last?Math.min((t-last)/1000,.1):0;last=t;draw();}request=requestAnimationFrame(loop);}
function setMode(next){mode=next;playing=false;phase=0;const c=config[mode];for(const [id,key]of [['experiment-label','label'],['experiment-title','title'],['experiment-intro','intro'],['plot-name','name'],['plot-kind','kind'],['diagram-caption','caption'],['try-it','try']])$(id).textContent=c[key];document.querySelectorAll('[data-experiment]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.experiment===mode)));$('animation-note').textContent=mode==='tides'?'A static comparison. Move the controls to explore.':mode==='clocks'?'15 animation seconds represent 60 faraway seconds; repeats.':'Five diagram time units per loop; slowed for exploration.';update();sync();}
for(const input of [$('radius'),$('mass')])input.addEventListener('input',()=>{phase=0;update();});
document.querySelectorAll('[data-radius]').forEach(b=>b.addEventListener('click',()=>{$('radius').value=b.dataset.radius;phase=0;update();}));
document.querySelectorAll('[data-experiment]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.experiment)));
$('lab-play').addEventListener('click',()=>{playing=!playing;sync();});$('lab-reset').addEventListener('click',()=>{$('radius').value=2;$('mass').value=10;phase=0;playing=false;update();sync();});
reduce.addEventListener('change',()=>{playing=false;sync();});document.addEventListener('visibilitychange',sync);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe($('laboratory'));
document.querySelectorAll('.laboratory [disabled]').forEach(el=>el.disabled=false);setMode('light');
