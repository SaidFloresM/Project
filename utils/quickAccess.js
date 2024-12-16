const initQuickAccess = () => {
  const quickAccessLinks = document.querySelectorAll('.quick-access-link');
  
  quickAccessLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateX(10px)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateX(0)';
    });
  });
};

module.exports = { initQuickAccess };