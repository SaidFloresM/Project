const { darkMode } = require('../../config/theme');

const initDarkMode = () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const html = document.documentElement;
  const icon = darkModeToggle?.querySelector('i');

  const applyDarkMode = (isDark) => {
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

  // Check saved preference
  const savedPreference = localStorage.getItem('darkMode') === 'true';
  applyDarkMode(savedPreference);

  // Toggle handler
  darkModeToggle?.addEventListener('click', () => {
    applyDarkMode(!html.classList.contains('dark'));
  });
};

module.exports = { initDarkMode };