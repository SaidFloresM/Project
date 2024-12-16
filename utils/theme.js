const { THEME } = require('../config/constants');

const theme = {
  init() {
    this.darkModeToggle = document.getElementById('darkModeToggle');
    this.html = document.documentElement;
    this.initDarkMode();
    this.bindEvents();
  },

  initDarkMode() {
    const prefersDark = window.matchMedia(THEME.SYSTEM_PREF_QUERY).matches;
    const savedPreference = localStorage.getItem(THEME.STORAGE_KEY);
    const isDarkMode = savedPreference !== null ? savedPreference === 'true' : prefersDark;
    
    this.setTheme(isDarkMode);
  },

  bindEvents() {
    this.darkModeToggle?.addEventListener('click', () => {
      const isDark = this.html.classList.toggle('dark');
      this.setTheme(isDark);
    });

    window.matchMedia(THEME.SYSTEM_PREF_QUERY).addEventListener('change', (e) => {
      if (localStorage.getItem(THEME.STORAGE_KEY) === null) {
        this.setTheme(e.matches);
      }
    });
  },

  setTheme(isDark) {
    this.html.classList.toggle('dark', isDark);
    localStorage.setItem(THEME.STORAGE_KEY, isDark);
    this.updateIcon(isDark);
  },

  updateIcon(isDark) {
    const icon = this.darkModeToggle?.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-moon', 'fa-sun');
      icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
    }
  }
};

export default theme;