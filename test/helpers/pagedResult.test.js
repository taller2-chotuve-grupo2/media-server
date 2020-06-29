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
      return expect(pagedResult.result).not.to.be.empty
    })

    it('Should contain the specified number of results per page', async () => {
      var pagedResult = await resourceHelpers.getPagedResult(1)
      return expect(pagedResult.result).to.have.lengthOf(1)
    })

    it('Should send true in hasNext if it there is a next page', async () => {
      var pagedResult = await resourceHelpers.getPagedResult(1)
      return expect(pagedResult.hasNext).to.be.true
    })

    it('Should send false in hasNext if it there is no next page', async () => {
      var pagedResult = await resourceHelpers.getPagedResult(1, 2)
      return expect(pagedResult.hasNext).to.be.false
    })

    it('Should send true in hasPrevious if it there is a previous page', async () => {
      var pagedResult = await resourceHelpers.getPagedResult(1, 2)
      return expect(pagedResult.hasPrevious).to.be.true
    })

    it('Should send false in hasPrevious if it there is no previous page', async () => {
      var pagedResult = await resourceHelpers.getPagedResult(1, 1)
      return expect(pagedResult.hasPrevious).to.be.false
    })

    it('Should return results ordered by creation date', async () => {
      var pagedResult = await resourceHelpers.getPagedResult(2)
      expect(pagedResult.result[1].title).to.eql('RICHARD VIDEO')
      return expect(pagedResult.result[0].title).to.eql('RICHARD SECOND VIDEO')
    })

    it('Should return results matching title', async () => {
      var pagedResult = await resourceHelpers.getPagedResult(50, 1, 'RICHARD SECOND VIDEO')
      expect(pagedResult.result[0].title).to.eql('RICHARD SECOND VIDEO')
      expect(pagedResult.totalResults).to.eql(1)
      return expect(pagedResult.result).to.have.lengthOf(1)
    })
  })
})
