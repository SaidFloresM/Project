const mongoose = require('mongoose');
const logger = require('../../utils/logger');
const { DB } = require('../constants');

const connectWithRetry = async (uri, options, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const conn = await mongoose.connect(uri, options);
      return conn;
    } catch (error) {
      if (attempt === maxRetries) throw error;
      logger.warn(`Connection attempt ${attempt} failed, retrying in 2s...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MongoDB URI is not defined');
    }

    const options = {
      serverSelectionTimeoutMS: DB.CONNECTION_TIMEOUT,
      socketTimeoutMS: DB.SOCKET_TIMEOUT,
      maxPoolSize: DB.MAX_POOL_SIZE
    };

    const conn = await connectWithRetry(process.env.MONGO_URI, options);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    throw error;
  }
};

module.exports = connectDB;