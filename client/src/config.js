const config = {
  SHORT_DOMAIN: process.env.REACT_APP_SHORT_DOMAIN || 's.ly',
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.REACT_APP_API_URL || '/api'
};

export default config;
