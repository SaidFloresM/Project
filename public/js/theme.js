const theme = {
  init() {
    this.darkModeToggle = document.getElementById('darkModeToggle');
    this.html = document.documentElement;
    this.initDarkMode();
    this.bindEvents();
  },

  initDarkMode() {
    // Check system preference first
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedPreference = localStorage.getItem('darkMode');
    
    // Use saved preference if exists, otherwise use system preference
    const isDarkMode = savedPreference !== null ? savedPreference === 'true' : prefersDark;
    
    this.html.classList.toggle('dark', isDarkMode);
    this.updateIcon(isDarkMode);
  },

  bindEvents() {
    this.darkModeToggle?.addEventListener('click', () => {
      const isDark = this.html.classList.toggle('dark');
      localStorage.setItem('darkMode', isDark);
      this.updateIcon(isDark);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('darkMode') === null) {
        this.html.classList.toggle('dark', e.matches);
        this.updateIcon(e.matches);
      }
    });
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