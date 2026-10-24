// P101 formative checkpoint: local feedback only; no storage or submission.
export const answerKey = Object.freeze([1, 1, 0, 2, 2, 0, 1, 2]);
export function markIcma03(choices) {
  return answerKey.map((answer, i) => {
    const choice = choices[i];
    if (!Number.isInteger(choice) || choice < 0 || choice > 2) return null;
    return choice === answer;
  });
}
export function initIcma03(root) {
  if (!root) return;
  const questions = [...root.querySelectorAll('.icma-question')];
  const total = root.querySelector('.icma-total');
  root.querySelector('.icma-controls').hidden = false;
  root.querySelector('[data-check-icma]').addEventListener('click', () => {
    const choices = questions.map(q => {
      const selected = q.querySelector('input:checked');
      return selected ? Number(selected.value) : null;
    });
    const results = markIcma03(choices);
    const answered = results.filter(r => r !== null).length;
    const correct = results.filter(r => r === true).length;
    questions.forEach((q, i) => {
      q.querySelector('[data-item-feedback]').textContent = results[i] === null
        ? 'Not answered. Choose one option when ready.'
        : results[i] ? 'Correct selection. Compare your reasoning below.'
          : 'Revisit this selection. The reasoning below explains the answer.';
      if (results[i] !== null) q.querySelector('details').open = true;
    });
    total.textContent = `${correct} correct out of ${answered} answered; ${8 - answered} unanswered. Use the reasoning to make a correction. No pass threshold or completion award.`;
  });
  root.querySelector('[data-reset-icma]').addEventListener('click', () => {
    questions.forEach(q => {
      q.querySelectorAll('input').forEach(input => { input.checked = false; });
      q.querySelector('details').open = false;
      q.querySelector('[data-item-feedback]').textContent = '';
    });
    total.textContent = 'Attempt reset. No answers selected.';
    questions[0].querySelector('input').focus();
  });
  questions.forEach(q => q.addEventListener('change', () => {
    q.querySelector('[data-item-feedback]').textContent = '';
    total.textContent = 'Choices changed. Check selected answers again when ready.';
  }));
}
if (typeof document !== 'undefined') initIcma03(document.querySelector('#p101-icma03'));
