const expect = require('chai').expect
const resourceService = require('../services/resourceService.js')
const dataCreator = require('../dataCreator/dataCreator.js')

describe('resourceService', () => {
  beforeEach('Generate Test Data', async () => {
    await dataCreator.seedAll()
  })

  afterEach('clean data', async () => {
    await dataCreator.cleanTables()
  })

  context('Upload', () => {
    it('returns resource id if upload is ok', async function () {
      const data = {
        id: '0800-R1CH4RD-555'
      }
      const result = await resourceService.upload(data)
      return expect(result).to.be.eql('0800-R1CH4RD-555')
    })
  })

  context('getById', () => {
    it('should get a resource by id', async function () {
      const result = await resourceService.getById('1')
      return expect(result.id).to.be.eql('1')
    })

    it('should return null if resource not found', async function () {
      const result = await resourceService.getById('bad_id')
      return expect(result).to.be.null
    })
  })

  context('Integration tests', () => {
    context('With resourceRepository', () => {
      it('should get a resource by id', async function () {
        const result = await resourceService.getById('1')
        return expect(result.id).to.be.eql('1')
      })

      it('returns id if upload is ok', async function () {
        const data = {
          id: '5',
          name: 'My first name',
          path: 'www.richard.com',
          size: '1MB',
          owner: 'RICHARDINHO',
          title: 'REPEATED TITLE',
          description: 'ASDASD',
          location: 'Argentina',
          visibility: 'Public'
        }
        const result = await resourceService.upload(data)
        return expect(result).to.eql(data.id)
      })
    })
  })
})
