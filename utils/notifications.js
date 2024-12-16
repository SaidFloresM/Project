const initNotifications = () => {
  const notifications = document.querySelectorAll('.notification');
  
  notifications.forEach(notification => {
    notification.addEventListener('click', () => {
      const link = notification.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });
  });
};

module.exports = { initNotifications };