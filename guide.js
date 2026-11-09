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
    themeToggle.textContent = dark ? '☀ Light Mode' : '◐ Dark Mode';
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

const translateToggle = document.getElementById('translate-toggle');
const translateHelp = document.getElementById('translate-help');

if (translateToggle && translateHelp) {
  function closeTranslateHelp() {
    translateHelp.hidden = true;
    translateToggle.setAttribute('aria-expanded', 'false');
  }

  translateToggle.addEventListener('click', event => {
    event.stopPropagation();
    translateHelp.hidden = !translateHelp.hidden;
    translateToggle.setAttribute('aria-expanded', String(!translateHelp.hidden));
  });

  document.addEventListener('click', event => {
    if (!translateHelp.hidden && !translateHelp.contains(event.target)) {
      closeTranslateHelp();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !translateHelp.hidden) {
      closeTranslateHelp();
      translateToggle.focus();
    }
  });
}

document.querySelectorAll('code, .site-logo').forEach(element => {
  element.setAttribute('translate', 'no');
  element.classList.add('notranslate');
});

window.addEventListener('pageshow', () => {
  document.querySelectorAll('details').forEach(section => {
    section.open = false;
  });
});
