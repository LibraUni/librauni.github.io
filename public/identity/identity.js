const button = document.querySelector('#theme');
function updateLabel(){const dark=document.documentElement.dataset.theme==='dark';button.setAttribute('aria-pressed',String(dark));button.textContent=dark?'Light mode':'Dark mode';}
updateLabel();
button.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('librauni-theme',theme)}catch{}updateLabel();});
