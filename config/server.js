const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { findAvailablePort } = require('./portManager');

const configureServer = async () => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // View engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', 'views'));

  return app;
};

const setupRoutes = (app) => {
  app.use('/', require('../routes/index'));
  app.use('/auth', require('../routes/auth'));
  app.use('/vales', require('../routes/vales'));
  app.use('/nominas', require('../routes/nominas'));
  app.use('/custodios', require('../routes/custodios'));
  app.use('/workshop-orders', require('../routes/workshopOrders'));

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { error: 'Error interno del servidor' });
  });
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = {
  configureServer,
  setupRoutes,
  connectDB
};