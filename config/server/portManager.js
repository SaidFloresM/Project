const net = require('net');
const logger = require('../../utils/logger');

const isPortAvailable = async (port) => {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        server.close();
        resolve(true);
      })
      .listen(port);
  });
};

const findAvailablePort = async (startPort = 3000) => {
  let port = startPort;
  while (!(await isPortAvailable(port))) {
    logger.info(`Port ${port} is in use, trying next port`);
    port++;
  }
  return port;
};

module.exports = { findAvailablePort };