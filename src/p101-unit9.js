for (const box of document.querySelectorAll('[data-wave-explorer]')) {
 const phase=box.querySelector('[data-phase]'),time=box.querySelector('[data-time]');
 function draw(){const d=Number(phase.value),t=Number(time.value),curves=[[],[],[]];
 for(let i=0;i<=400;i++){const x=2*i/400,a=3*Math.cos(Math.PI*x-2*Math.PI*t),b=3*Math.cos(Math.PI*x-2*Math.PI*t+d);[a,b,a+b].forEach((v,j)=>curves[j].push(`${i?'L':'M'}${80+315*x},${160-100*v/6}`));}
 box.querySelectorAll('[data-curve]').forEach((p,i)=>{p.setAttribute('d',curves[i].join(' '));p.setAttribute('fill','none');p.setAttribute('stroke-width','3');});
 const amp=2*3*Math.abs(Math.cos(d/2));box.querySelector('[data-readout]').textContent=`Time ${t.toFixed(2)} s; phase difference ${d.toFixed(3)} rad; exact resultant amplitude ${amp.toFixed(3)} mm. At x = 0 m, sum ${(3*Math.cos(-2*Math.PI*t)+3*Math.cos(-2*Math.PI*t+d)).toFixed(3)} mm.`;
 }
 phase.addEventListener('change',draw);time.addEventListener('input',draw);box.querySelector('[data-reset]').addEventListener('click',()=>{phase.value='0';time.value='0';draw();});box.hidden=false;draw();
}
