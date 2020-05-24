const models = require('../models')
const config = require('../config')

describe('Database tests', function () {
  it('should connect to database', async () => {
    await models.sequelize.authenticate()
  })
})

before('set env', () => {
  config.common.environment = 'testing'
})

beforeEach('set env', async () => {
  models.sequelize.sync()
})
