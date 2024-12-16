const net = require('net');
const logger = require('../logger');
const { SERVER } = require('../../config/constants');

const isPortInUse = async (port) => {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => resolve(true))
      .once('listening', () => {
        server.close();
        resolve(false);
      })
      .listen(port);
  });
};

const findAvailablePort = async (startPort = SERVER.DEFAULT_PORT) => {
  let port = startPort;
  while (await isPortInUse(port)) {
    logger.info(`Port ${port} is in use, trying next port`);
    port++;
  }
  return port;
};

module.exports = { findAvailablePort };