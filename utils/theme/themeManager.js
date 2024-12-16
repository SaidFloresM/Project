const applyTheme = (isDark) => {
  const html = document.documentElement;
  const icon = document.querySelector('#darkModeToggle i');

  if (isDark) {
    html.classList.add('dark');
    icon?.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('darkMode', 'true');
  } else {
    html.classList.remove('dark');
    icon?.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('darkMode', 'false');
  }
};

module.exports = { applyTheme };