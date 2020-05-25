const expect = require('chai').expect
const resourceService = require('../services/resourceService.js')
const resourceRepositoryMock = require('../repositories/mocks/resourceRepositoryMock.js')
const resourceRepositoryFailingMock = require('../repositories/mocks/resourceRepositoryFailingMock.js')

describe('resourceService', () => {
  it('returns true if everything is ok', async function () {
    const data = {
      id: '0800-R1CH4RD-555'
    }
    const result = await resourceService.upload(data, resourceRepositoryMock)
    return expect(result).to.be.true
  })

  it('returns false if video upload fails', async function () {
    const data = {
      name: 'Bad video'
    }
    const result = await resourceService.upload(data, resourceRepositoryFailingMock)
    return expect(result).to.be.false
  })
})
