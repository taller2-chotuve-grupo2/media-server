'use strict';

module.exports = {
  env: 'production',
  db: process.env.MONGOHQ_URL || process.env.MONGOHQ_URI,
  port: process.env.PORT || 4000,
};