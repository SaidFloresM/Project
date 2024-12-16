const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
};

const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, '');
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const generateRandomString = (length = 10) => {
  return Math.random().toString(36).substring(2, length + 2);
};

module.exports = {
  formatDate,
  formatCurrency,
  sanitizeInput,
  validateEmail,
  generateRandomString
};