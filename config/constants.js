module.exports = {
  DB: {
    CONNECTION_TIMEOUT: 10000,
    SOCKET_TIMEOUT: 45000,
    MAX_POOL_SIZE: 10
  },

  SERVER: {
    DEFAULT_PORT: 3000,
    PORT_RETRY_DELAY: 1000
  },

  AUTH: {
    JWT_EXPIRY: '24h',
    COOKIE_NAME: 'token',
    COOKIE_OPTIONS: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    }
  },

  VALIDATION: {
    PASSWORD_MIN_LENGTH: 6,
    USERNAME_MIN_LENGTH: 3,
    MAX_FILE_SIZE: 5 * 1024 * 1024 // 5MB
  }
};