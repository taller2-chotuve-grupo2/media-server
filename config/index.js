require('dotenv').config()

const config = {
  common: {
    database: {
      url: process.env.NODE_API_DB_URL,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3030,
    token: process.env.AUTH_TOKEN || '123'
  }
}

module.exports = config
