const button=document.getElementById('copy-brief');
const brief=document.getElementById('setup-brief');
const status=document.getElementById('copy-status');
if(button&&navigator.clipboard){
 button.hidden=false;
 button.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(brief.value);status.textContent='Copied. Paste this into your agent.';}
  catch{brief.focus();brief.select();status.textContent='Select and copy the text using your keyboard or device menu.';}
 });
}
