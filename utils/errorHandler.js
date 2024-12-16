const logger = require('./logger');

exports.handleError = (error, res, message, view = 'error', isApi = false) => {
  logger.error(`${message}:`, error);
  
  if (isApi) {
    return res.status(500).json({ 
      success: false, 
      error: message 
    });
  }
  
  if (view === 'error') {
    return res.status(500).render('error', { error: message });
  }
  
  res.status(400).render(view, {
    error: message,
    data: res.locals.data || {}
  });
};