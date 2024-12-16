// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

if (darkModeToggle) {
  const icon = darkModeToggle.querySelector('i');
  
  // Check saved preference
  if (localStorage.getItem('darkMode') === 'true') {
    html.classList.add('dark');
    icon?.classList.replace('fa-moon', 'fa-sun');
  }

  // Toggle dark mode
  darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    
    if (html.classList.contains('dark')) {
      icon?.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('darkMode', 'true');
    } else {
      icon?.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('darkMode', 'false');
    }
  });
}