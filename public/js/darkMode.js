const initDarkMode = () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const html = document.documentElement;
  const icon = darkModeToggle?.querySelector('i');

  // Check for saved dark mode preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Apply initial theme
  if (isDarkMode) {
    html.classList.add('dark');
    icon?.classList.replace('fa-moon', 'fa-sun');
  }

  // Toggle theme
  darkModeToggle?.addEventListener('click', () => {
    html.classList.toggle('dark');
    
    if (html.classList.contains('dark')) {
      icon?.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('darkMode', 'true');
    } else {
      icon?.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('darkMode', 'false');
    }
  });
};

export { initDarkMode };