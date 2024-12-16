const logger = require('../logger');
const connectDB = require('../../config/database/connection');
const { findAvailablePort } = require('./portManager');
const { SERVER } = require('../../config/constants');

const setupServer = async (app, configureExpress, configureRoutes, errorHandler) => {
  try {
    // Configure Express
    configureExpress(app);

    // Connect to MongoDB
    await connectDB();

    // Configure Routes
    configureRoutes(app);

    // Error handler
    app.use(errorHandler);

    // Find available port
    const port = await findAvailablePort(SERVER.DEFAULT_PORT);
    
    // Start server
    const server = app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });

    // Handle server errors
    server.on('error', (error) => {
      logger.error('Server error:', error);
      process.exit(1);
    });

    return server;
  } catch (error) {
    logger.error('Server setup failed:', error);
    throw error;
  }
};

module.exports = { setupServer };