const logger = require('../../utils/logger');

const errorHandler = (app) => {
  app.use((err, req, res, next) => {
    logger.error('Application error:', err);
    res.status(500).render('error', {
      error: 'Ha ocurrido un error en el servidor'
    });
  });
};

module.exports = errorHandler;