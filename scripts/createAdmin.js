require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const logger = require('../utils/logger');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000
    });
    
    const existingAdmin = await User.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      logger.info('El usuario admin ya existe');
      process.exit(0);
    }

    const admin = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123'
    });

    await admin.save();
    logger.info('Usuario admin creado exitosamente');
    logger.info('Username: admin');
    logger.info('Password: admin123');
    process.exit(0);
  } catch (error) {
    logger.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();