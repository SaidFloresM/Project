const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const configureMiddleware = (app) => {
  // Basic middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../../public')));

  // View engine setup
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../../views'));
};

module.exports = configureMiddleware;