const configureRoutes = (app) => {
  app.use('/', require('../../routes/index'));
  app.use('/auth', require('../../routes/authRoutes'));
  app.use('/vales', require('../../routes/vales'));
  app.use('/nominas', require('../../routes/nominas'));
  app.use('/custodios', require('../../routes/custodios'));
  app.use('/workshop-orders', require('../../routes/workshopOrders'));
};

module.exports = configureRoutes;