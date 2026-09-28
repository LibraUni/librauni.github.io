// Equal axis scales match the static SVG: x = 45 + (x + 1)39,
// y = 35 + (6 - y)39. No storage or learner records are used.
for (const lab of document.querySelectorAll('[data-vector-lab]')) {
  const slider = lab.querySelector('input');
  const scaled = lab.querySelector('[data-scaled]');
  const resultant = lab.querySelector('[data-resultant]');
  const text = n => String(n === 0 ? 0 : n).replace('-', '−');
  const update = () => {
    const k = Number(slider.value);
    const x = 2 - k, y = 1 + 2 * k;
    const px = 45 + (x + 1) * 39, py = 35 + (6 - y) * 39;
    for (const arrow of [scaled, resultant]) {
      arrow.setAttribute('x2', px);
      arrow.setAttribute('y2', py);
    }
    scaled.hidden = k === 0;
    scaled.style.display = k === 0 ? 'none' : '';
    const label = lab.querySelector('[data-scaled-label]');
    label.setAttribute('x', 45 + ((2 + x) / 2 + 1) * 39 + 10);
    label.setAttribute('y', 35 + (6 - (1 + y) / 2) * 39);
    label.textContent = k === 0 ? 'k b = 0' : 'k b';
    const sumLabel = lab.querySelector('[data-resultant-label]');
    sumLabel.setAttribute('x', px + 12);
    sumLabel.setAttribute('y', py - 12);
    lab.querySelector('output').textContent = text(k);
    const description = `k = ${text(k)}; k b = ⟨${text(-k)}, ${text(2 * k)}⟩ m; a + k b = ⟨${text(x)}, ${text(y)}⟩ m.`;
    lab.querySelector('[role="status"]').textContent = description;
    lab.querySelector('svg desc').textContent = description + ' The first arrow remains a = ⟨2, 1⟩ m.';
  };
  slider.addEventListener('input', update);
  lab.querySelector('[data-reset]').addEventListener('click', () => { slider.value = '1'; update(); });
  update();
  lab.querySelector('fieldset').hidden = false;
}
