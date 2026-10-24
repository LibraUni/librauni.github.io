// Original finite sampling exploration. No animation or persistence.
const host=document.querySelector('#p101-u08-sampler');
if(host){
 let fs=20,phi=0;
 const coord=(t,x)=>`${(65+600*t/2).toFixed(3)},${(140-85*x).toFixed(3)}`;
 function update(){
  host.querySelectorAll('[data-rate]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.rate)===fs));
  host.querySelectorAll('[data-phase]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.phase)===phi));
  const sample=Array.from({length:2*fs+1},(_,n)=>({t:n/fs,x:Math.cos(4*Math.PI*n/fs+phi)}));
  const path=Array.from({length:801},(_,n)=>{const t=n/400;return(n?'L':'M')+coord(t,Math.cos(4*Math.PI*t+phi));}).join(' ');
  const dots=sample.map(({t,x})=>{const [cx,cy]=coord(t,x).split(',');return `<circle cx="${cx}" cy="${cy}" r="4" fill="#a66a32"/>`;}).join('');
  host.querySelector('#u8-sampling-plot').innerHTML=`<div class="diagram" tabindex="0" role="group" aria-label="Sampling plot; scroll sideways if needed"><svg viewBox="0 0 720 300" role="img" aria-labelledby="u8-plot-title u8-plot-desc"><title id="u8-plot-title">A 2 Hz displacement model sampled at ${fs} samples per second</title><desc id="u8-plot-desc">Continuous green line is the known model; brown dots are samples. The table below provides the first nine sample values. Time spans zero to two seconds, displacement minus one to plus one centimetre.</desc><path d="M65 40V245 M65 140H675" fill="none" stroke="#52656b"/><text x="12" y="25">Displacement / cm</text><text x="22" y="60">1</text><text x="22" y="145">0</text><text x="15" y="230">−1</text><text x="60" y="265">0</text><text x="360" y="265">1</text><text x="660" y="265">2</text><text x="515" y="290">Time / s</text><path d="${path}" fill="none" stroke="#28695e" stroke-width="2"/>${dots}</svg></div>`;
  host.querySelector('#u8-sampling-table').innerHTML='<table><caption>First nine samples (or the full record if shorter)</caption><thead><tr><th>Time / s</th><th>Displacement / cm</th></tr></thead><tbody>'+sample.slice(0,9).map(p=>`<tr><td>${p.t.toFixed(4)}</td><td>${(Math.abs(p.x)<1e-10?0:p.x).toFixed(4)}</td></tr>`).join('')+'</tbody></table>';
  host.querySelector('#u8-sampling-status').textContent=`${fs} samples/s; ${(fs/2).toFixed(1)} samples per cycle; phase ${phi===0?'0':'π/2'} rad. ${sample.length} timestamps from 0 to 2 s. `+(fs===3?'At phase zero the samples also match a 1 Hz cosine.':fs===4&&phi!==0?'All samples lie at zero crossings despite the continuing motion.':'Compare markers with the known curve.');
 }
 host.querySelectorAll('[data-rate]').forEach(b=>b.addEventListener('click',()=>{fs=Number(b.dataset.rate);update();}));
 host.querySelectorAll('[data-phase]').forEach(b=>b.addEventListener('click',()=>{phi=Number(b.dataset.phase);update();}));
 host.querySelector('#u8-reset').addEventListener('click',()=>{fs=20;phi=0;update();});update();
}
