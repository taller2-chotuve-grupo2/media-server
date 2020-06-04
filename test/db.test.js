const models = require('../models')
const config = require('../config')
const dataCreator = require('../dataCreator/dataCreator.js')

describe('Database tests', function () {
  it('should connect to database', async () => {
    await models.sequelize.authenticate()
  })
})

before('set env', () => {
  config.common.environment = 'testing'
})

beforeEach('set env', async () => {
  await models.sequelize.sync()
})

// Clean tables before each test in any context
beforeEach('clean data', async () => {
  await dataCreator.cleanTables()
})
