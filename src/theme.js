import './header-account.js';
const control = document.querySelector('#theme-toggle');
control.setAttribute('role','switch');
control.setAttribute('aria-label','Dark mode');
control.removeAttribute('aria-pressed');
control.innerHTML = `<span class="theme-thumb" aria-hidden="true"></span><svg class="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></svg><svg class="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/><path d="M18 2v4m-2-2h4"/></svg>`;
function syncThemeControl() {
  const dark = document.documentElement.dataset.theme === 'dark';
  control.setAttribute('aria-checked', String(dark));
  control.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#14232C' : '#F7F4ED';
}
function setTheme(dark){
 document.documentElement.dataset.theme=dark?'dark':'light';
 try { localStorage.setItem('librauni-theme', dark?'dark':'light'); } catch {}
 syncThemeControl();
}
syncThemeControl();
control.addEventListener('click', () => setTheme(document.documentElement.dataset.theme !== 'dark'));
control.addEventListener('keydown',event=>{
 if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
  event.preventDefault();setTheme(event.key==='ArrowRight');
 }
});
window.addEventListener('storage',event=>{
 if(event.key==='librauni-theme'){
  document.documentElement.dataset.theme=event.newValue==='dark'?'dark':'light';
  syncThemeControl();
 }
});
