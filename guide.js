const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  let dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  try {
    const savedTheme = localStorage.getItem('mt-theme');

    if (savedTheme !== null) {
      dark = savedTheme === 'dark';
    }
  } catch {}

  function applyTheme() {
    document.body.classList.toggle('dark', dark);
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.textContent = dark ? '☀ Light Mode' : '◐ Dark mode';
  }

  themeToggle.addEventListener('click', () => {
    dark = !dark;
    applyTheme();

    try {
      localStorage.setItem('mt-theme', dark ? 'dark' : 'light');
    } catch {}
  });

  applyTheme();
}

window.addEventListener('pageshow', () => {
  document.querySelectorAll('details').forEach(section => {
    section.open = false;
  });
});
