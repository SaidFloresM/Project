exports.formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
};

exports.formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

exports.getStatusIndicator = (status) => {
  const indicators = {
    'pendiente': '🔴',
    'en_proceso': '🟡',
    'completado': '🟢'
  };
  return indicators[status] || '⚪';
};