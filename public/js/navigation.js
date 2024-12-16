// Navigation functionality
const initNavigation = () => {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        if (item.href === window.location.href) {
            item.classList.add('active');
        }
    });
};

export { initNavigation };