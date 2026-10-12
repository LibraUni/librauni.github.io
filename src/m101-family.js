// Original fixed two-variable family; no learner records or network requests.
for (const lab of document.querySelectorAll('[data-param-lab]')) {
  const slider = lab.querySelector('[data-param-slider]');
  const point = lab.querySelector('[data-family-point]');
  const readout = lab.querySelector('[data-param-readout]');
  const update = () => {
    const t = Number(slider.value);
    const x = 6 - 2 * t;
    const y = t;
    point.setAttribute('cx', String(58 + 42 * (x + 1)));
    point.setAttribute('cy', String(310 - 42 * (y + 1)));
    lab.querySelector('svg').setAttribute('aria-label', `Solution line x plus two y equals six. Highlighted point: ${x}, ${y}; parameter ${t}.`);
    readout.textContent = `Parameter: ${t}. Coordinates: (${x}, ${y}). First left-hand side: ${x + 2 * y}. Second left-hand side: ${2 * x + 4 * y}.`;
  };
  slider.addEventListener('input', update);
  lab.querySelector('[data-param-reset]').addEventListener('click', () => { slider.value = '1'; update(); });
  lab.querySelector('[data-param-controls]').hidden = false;
  update();
}
