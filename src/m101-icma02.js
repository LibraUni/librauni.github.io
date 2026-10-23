// Formative feedback only. No network, persistence or submission.
export const answerKey = Object.freeze([0,1,2,0,1,2,0,1,2,0]);
export function markIcma02(choices) {
  return answerKey.map((answer,i)=>Number.isInteger(choices[i]) && choices[i]>=0 && choices[i]<=2 ? choices[i]===answer : null);
}
export function initIcma02(root) {
  if (!root) return;
  const questions=[...root.querySelectorAll('.icma-question')],total=root.querySelector('.icma-total');
  root.querySelector('.icma-controls').hidden=false;
  root.querySelector('[data-check-icma]').addEventListener('click',()=>{
    const choices=questions.map(q=>{const x=q.querySelector('input:checked');return x?Number(x.value):null;});
    const results=markIcma02(choices),answered=results.filter(x=>x!==null).length;
    questions.forEach((q,i)=>{
      q.querySelector('[data-item-feedback]').textContent=results[i]===null?'Not answered. Choose an option when ready.':results[i]?'Correct selection. Compare your reasoning below.':'Revisit this selection using the worked discussion.';
      if(results[i]!==null)q.querySelector('details').open=true;
    });
    total.textContent=`${results.filter(x=>x===true).length} correct out of ${answered} answered; ${10-answered} unanswered. Use the reasoning to make corrections. No pass threshold or completion award.`;
  });
  questions.forEach(q=>q.addEventListener('change',()=>{
    q.querySelector('[data-item-feedback]').textContent='';
    total.textContent='Choices changed. Check selected answers again when ready.';
  }));
  root.querySelector('[data-reset-icma]').addEventListener('click',()=>{
    root.querySelectorAll('input').forEach(i=>i.checked=false);
    root.querySelectorAll('details').forEach(d=>d.open=false);
    root.querySelectorAll('[data-item-feedback]').forEach(e=>e.textContent='');
    total.textContent='Choices reset. Nothing was submitted or saved.';
  });
}
if(typeof document!=='undefined')initIcma02(document.querySelector('#m101-icma02'));
