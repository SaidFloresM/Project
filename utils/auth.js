const jwt = require('jsonwebtoken');
const { AUTH } = require('../config/constants');
const logger = require('./logger');

const generateToken = (userId) => {
  try {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: AUTH.JWT_EXPIRY }
    );
  } catch (error) {
    logger.error('Error generating token:', error);
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    logger.error('Error verifying token:', error);
    throw error;
  }
};

const setCookie = (res, token) => {
  res.cookie(AUTH.COOKIE_NAME, token, AUTH.COOKIE_OPTIONS);
};

const clearCookie = (res) => {
  res.clearCookie(AUTH.COOKIE_NAME);
};

module.exports = {
  generateToken,
  verifyToken,
  setCookie,
  clearCookie
};