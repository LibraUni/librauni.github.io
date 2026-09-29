for(const button of document.querySelectorAll('[data-copy-brief]')){
 const brief=document.getElementById(button.dataset.copyBrief);
 const status=document.getElementById(button.dataset.copyStatus);
 if(!brief||!status||!navigator.clipboard)continue;
 button.hidden=false;
 button.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(brief.value);status.textContent='Copied. Paste this into your agent.';}
  catch{brief.focus();brief.select();status.textContent='Select and copy the text using your keyboard or device menu.';}
 });
}
