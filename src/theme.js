const control = document.querySelector('#theme-toggle');
function syncThemeControl() {
  const dark = document.documentElement.dataset.theme === 'dark';
  control.textContent = dark ? 'Light mode' : 'Dark mode';
  control.setAttribute('aria-pressed', String(dark));
  document.querySelector('meta[name="theme-color"]').content = dark ? '#14232C' : '#F7F4ED';
}
syncThemeControl();
control.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('librauni-theme', theme); } catch {}
  syncThemeControl();
});
