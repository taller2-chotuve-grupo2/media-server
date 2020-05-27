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

  it('should return a video by id', async function () {
    const data = {
      id: '1'
    }
    var result = await resourceRepository.createResource(data)
    if (result) {
      result = await resourceRepository.getOneById(data.id)
    }
    return expect(result.dataValues.id).to.be.eql(data.id)
  })

  it('should return null if get by id fails', async function () {
    const result = await resourceRepository.getOneById('RICHARD')
    return expect(result).to.be.null
  })
})