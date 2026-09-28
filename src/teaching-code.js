// Opt in only blocks containing Python source, never output or mixed transcripts.
document.querySelectorAll('.teaching-reading pre > code.language-python').forEach((code, index) => {
  const pre = code.parentElement;
  const controls = document.createElement('div');
  controls.className = 'code-copy-controls';
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Copy code';
  button.setAttribute('aria-label', `Copy Python code block ${index + 1}`);
  const status = document.createElement('span');
  status.setAttribute('role', 'status');
  controls.append(button, status);
  pre.before(controls);
  let reset;
  button.addEventListener('click', async () => {
    clearTimeout(reset);
    status.textContent = '';
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
      reset = setTimeout(() => { status.textContent = ''; }, 3000);
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
