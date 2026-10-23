// Original LibraUni teaching interaction. No storage or learner records.
for (const panel of document.querySelectorAll('[data-capacity-explorer]')) {
  const slider = panel.querySelector('input');
  const output = panel.querySelector('output');
  const update = () => {
    const c = Number(slider.value);
    const t = (300 * 80 + c * 20) / (300 + c);
    output.textContent = `Cooler capacity ${c} J/K; final temperature ${t.toFixed(1)} °C; energy received ${Math.round(c * (t - 20))} J.`;
  };
  slider.addEventListener('input', update);
  panel.querySelector('[data-reset]').addEventListener('click', () => { slider.value = '900'; update(); });
  panel.hidden = false;
  update();
}
