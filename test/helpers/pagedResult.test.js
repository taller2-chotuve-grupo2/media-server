const expect = require('chai').expect
const dataCreator = require('../../dataCreator/dataCreator.js')
const resourceHelpers = require('../../helpers/resources_helpers.js')

describe('resourcePagedResult', () => {
  beforeEach('Generate Test Data', async () => {
    await dataCreator.seedAll()
  })

  afterEach('clean data', async () => {
    await dataCreator.cleanTables()
  })

  context('Result content', async () => {
    it('Should respond to hasPrevious', async () => {
      return expect(resourceHelpers.getPagedResult().hasPrevious).to.be.a('boolean')
    })

    it('Should respond to hasNext', async () => {
      return expect(resourceHelpers.getPagedResult().hasNext).to.be.a('boolean')
    })

    it('Should respond to pageNumber', async () => {
      return expect(resourceHelpers.getPagedResult().pageNumber).to.be.a('number')
    })

    it('Should respond to result', async () => {
      return expect(resourceHelpers.getPagedResult().result).to.be.a('array')
    })
  })
})
