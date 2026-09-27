// Curriculum controls never open exercise feedback or write progress records.
for (const tree of document.querySelectorAll('.learning-tree')) {
 const controls=tree.querySelector('.tree-controls');
 if(!controls)continue;
 controls.hidden=false;
 controls.addEventListener('click',event=>{
  const button=event.target.closest('button[data-tree-action]');
  if(!button)return;
  const open=button.dataset.treeAction==='expand';
  for(const branch of tree.querySelectorAll('details.curriculum-branch'))branch.open=open;
 });
}
// Reveal a linked target if it sits in a collapsed branch.
function revealTarget(){
 let id;
 try { id=decodeURIComponent(location.hash.slice(1)); } catch { return; }
 const target=document.getElementById(id);
 if(!target)return;
 for(let p=target.parentElement;p;p=p.parentElement)if(p.matches('details.curriculum-branch'))p.open=true;
}
revealTarget();
window.addEventListener('hashchange',revealTarget);


for(const input of document.querySelectorAll("[data-scale-input]")){input.addEventListener("input",()=>{const k=Number(input.value);input.closest(".scaling-lab").querySelector("[data-scale-output]").textContent=`Input ×${k}; direct output ×${k}; inverse output ×${(1/k).toPrecision(3)}; inverse-square output ×${(1/k**2).toPrecision(3)}.`;});}
