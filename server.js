require('dotenv').config();
const express = require('express');
const logger = require('./utils/logger');
const { findAvailablePort } = require('./config/server/portManager');
const configureMiddleware = require('./config/server/middleware');
const configureRoutes = require('./config/server/routes');
const errorHandler = require('./config/server/errorHandler');
const connectDB = require('./config/database');

const startServer = async () => {
  try {
    const app = express();

    // Configure middleware
    configureMiddleware(app);

    // Connect to database
    await connectDB();

    // Configure routes
    configureRoutes(app);

    // Error handling
    errorHandler(app);

    // Find available port
    const port = await findAvailablePort(process.env.PORT || 3000);

    // Start server
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (error) {
    logger.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();