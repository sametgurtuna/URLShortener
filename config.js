module.exports = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  BASE_URL: process.env.BASE_URL || 'http://localhost:3001',
  SHORT_DOMAIN: process.env.SHORT_DOMAIN || 's.ly', // Kısa domain
  DATABASE_PATH: process.env.DATABASE_PATH || './database.sqlite'
};
