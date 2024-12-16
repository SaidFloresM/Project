const { setupServer } = require('./startup');
const { setupProcessErrorHandlers } = require('./errorHandlers');
const { findAvailablePort } = require('./portManager');

module.exports = {
  setupServer,
  setupProcessErrorHandlers,
  findAvailablePort
};