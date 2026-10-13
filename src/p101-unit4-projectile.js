// Original static parameter exploration; no animation, storage or network calls.
export function projectileState(h, ux, uy, g = 9.8) {
  const tf = (uy + Math.sqrt(uy * uy + 2 * g * h)) / g;
  const top = h + uy * uy / (2 * g);
  const points = Array.from({length:101}, (_, i) => {
    const t = tf * i / 100;
    return [ux * t, i === 100 ? 0 : h + uy * t - .5 * g * t * t];
  });
  return {tf, top, range:ux * tf, points};
}
const controls = typeof document === 'undefined' ? null : document.getElementById('projectile-controls');
if (controls) {
  const inputs = ['ux','uy','h'].map(k => document.getElementById('proj-'+k));
  function update() {
    const [ux,uy,h] = inputs.map(e => Number(e.value));
    for (const e of inputs) document.getElementById(e.id+'-value').textContent = String(Number(e.value));
    const s = projectileState(h,ux,uy);
    document.getElementById('projectile-live-path').setAttribute('d',s.points.map(([x,y],i)=>(i?'L':'M')+(65+23*x).toFixed(3)+' '+(392-23*y).toFixed(3)).join(' '));
    document.getElementById('projectile-live-end').setAttribute('cx',String(65+23*s.range));
    document.getElementById('u4f28d').textContent = `Current model: height ${h} metres, horizontal velocity ${ux} metres per second, upward velocity ${uy} metres per second; uniform gravity 9.8 metres per second squared. Flight time ${s.tf.toFixed(3)} seconds, maximum height ${s.top.toFixed(3)} metres, range ${s.range.toFixed(3)} metres. The separate table retains default values.`;
    document.getElementById('proj-result').textContent = s.tf === 0 ? 'No positive-duration airborne interval: the object starts at the floor with zero upward velocity.' : `Flight time ${s.tf.toFixed(3)} s; maximum height ${s.top.toFixed(3)} m; range ${s.range.toFixed(3)} m.`;
  }
  inputs.forEach(e=>e.addEventListener('input',update));
  document.getElementById('proj-reset').addEventListener('click',()=>{inputs.forEach((e,i)=>e.value=[6,4.9,4.9][i]);update()});
  controls.hidden=false;
}
