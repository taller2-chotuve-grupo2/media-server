const config = require('.').common.database

module.exports = {
  local: {
    dialect: 'sqlite',
    storage: './db.sqlite'
  },
  development: {
    uri: config.uri,
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    dialect: 'postgres',
    logging: false
  },
  testing: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  },
  production: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    dialect: 'postgres',
    logging: false
  }
}
