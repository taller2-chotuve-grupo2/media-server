const expect = require('chai').expect
const resourceService = require('../services/resourceService.js')
const resourceRepositoryMockFalse = require('../repositories/mocks/resourceRepositoryMockFalse.js')
const resourceRepositoryMockTrue = require('../repositories/mocks/resourceRepositoryMockTrue.js')

describe('resourceService', () => {
  it('returns true if everything is ok', () => {
    const data = {
      name: 'My first name',
      path: 'www.richard.com',
      size: '1MB',
      owner: 'RICHARDINHO',
      title: 'REPEATED TITLE',
      description: 'ASDASD',
      location: 'Argentina',
      visibility: 'Public'
    }
    return expect(resourceService.upload(data, resourceRepositoryMockTrue)).to.be.true
  })

  it('returns false if video upload fails', () => {
    const data = {
      name: 'My first name',
      path: 'www.richard.com',
      size: '1MB',
      owner: 'RICHARDINHO',
      title: 'REPEATED TITLE',
      description: 'ASDASD',
      location: 'Argentina',
      visibility: 'Public'
    }
    return expect(resourceService.upload(data, resourceRepositoryMockFalse)).to.be.false
  })
})
