// Módulo para la navegación del formulario
export const FormNavigation = {
  init() {
    this.setupNavigation();
    this.setupScrollSpy();
  },

  setupNavigation() {
    const navItems = document.querySelectorAll('.form-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    });
  },

  setupScrollSpy() {
    const sections = document.querySelectorAll('.form-section');
    const navItems = document.querySelectorAll('.form-nav-item');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          navItems.forEach(item => {
            item.classList.toggle('active', 
              item.getAttribute('data-target') === targetId);
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
  }
};