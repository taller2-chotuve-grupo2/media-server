const expect = require('chai').expect
const resourceService = require('../services/resourceService.js')

describe('resourceService', () => {
  it('returns true if everything is ok', () => {
    return expect(resourceService.upload()).to.be.true
  })
})
