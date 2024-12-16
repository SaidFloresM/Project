const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const configureExpress = (app) => {
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // View engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', 'views'));
};

module.exports = configureExpress;