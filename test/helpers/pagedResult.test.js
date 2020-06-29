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
      return expect((await resourceHelpers.getPagedResult()).hasPrevious).to.be.a('boolean')
    })

    it('Should respond to hasNext', async () => {
      return expect((await resourceHelpers.getPagedResult()).hasNext).to.be.a('boolean')
    })

    it('Should respond to pageNumber', async () => {
      return expect((await resourceHelpers.getPagedResult()).pageNumber).to.be.a('number')
    })

    it('Should respond to totalPages', async () => {
      return expect((await resourceHelpers.getPagedResult()).totalPages).to.be.a('number')
    })

    it('Should respond to totalResults', async () => {
      return expect((await resourceHelpers.getPagedResult()).totalResults).to.be.a('number')
    })

    it('Should respond to result', async () => {
      return expect((await resourceHelpers.getPagedResult()).result).to.be.a('array')
    })
  })

  context('Functionality', async () => {
    it('Should contain Resources as result if any', async () => {
      var pagedResult = await resourceHelpers.getPagedResult()
      expect(pagedResult.result[0].title).to.eql('RICHARD VIDEO')
      return expect(pagedResult.result).not.to.be.empty
    })
  })
})
