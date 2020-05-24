const expect = require('chai').expect
const resourceRepository = require('../repositories/resourceRepository.js')

describe('resourceRepository', () => {
  it('should save a video', async function () {
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
    var result = await resourceRepository.createResource(data)
    return expect(result.dataValues.name).to.be.eql(data.name)
  })

  it('should return a video by title', async function () {
    const data = {
      name: 'My first name',
      path: 'www.richard.com',
      size: '1MB',
      owner: 'RICHARDINHO',
      title: 'RICHARD VIDEO',
      description: 'ASDASD',
      location: 'Argentina',
      visibility: 'Public'
    }
    var result = await resourceRepository.createResource(data)
    if (result) {
      result = await resourceRepository.getOneByTitle(data.title)
    }
    return expect(result.dataValues.title).to.be.eql(data.title)
  })
})
