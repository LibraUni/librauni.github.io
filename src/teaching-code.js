// Opt in only blocks containing Python source, never output or mixed transcripts.
document.querySelectorAll('.teaching-reading pre > code.language-python').forEach((code, index) => {
  const pre = code.parentElement;
  const controls = document.createElement('div');
  controls.className = 'code-copy-controls';
  const button = document.createElement('button');
  button.type = 'button';
  const copyIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="1.5"/><path d="M16 4H4v13"/></svg>';
  button.innerHTML = copyIcon;
  button.title = 'Copy code';
  button.setAttribute('aria-label', `Copy Python code block ${index + 1}`);
  const status = document.createElement('span');
  status.setAttribute('role', 'status');
  controls.append(button, status);
  const box = document.createElement('div');
  box.className = 'copyable-code';
  pre.before(box);
  box.append(pre, controls);
  let reset;
  button.addEventListener('click', async () => {
    clearTimeout(reset);
    status.textContent = '';
    button.innerHTML = copyIcon;
    const text = code.textContent;
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      // Local reading files and restrictive browsers may need this fallback.
      const field = document.createElement('textarea');
      field.value = text;
      field.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.append(field);
      field.select();
      try { copied = document.execCommand('copy'); } catch { /* Offer selection below. */ }
      field.remove();
      button.focus({preventScroll: true});
    }
    if (copied) {
      status.textContent = 'Copied';
      button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
      button.title = 'Copied';
      reset = setTimeout(() => { status.textContent = ''; button.innerHTML = copyIcon; button.title = 'Copy code'; }, 3000);
    } else {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Code selected. Use your browser’s Copy command.';
    }
  });
});
