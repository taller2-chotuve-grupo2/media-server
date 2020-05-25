const Resource = require('../models').Resource

async function createResource (resourceData) {
  const result = await Resource.create(resourceData)
  return result
}

async function getOneByTitle (title) {
  const result = await Resource.findOne({
    where: {
      title: title
    }
  })
  return result
}

async function getOneById (id) {
  const result = await Resource.findOne({
    where: {
      id: id
    }
  })
  return result
}

exports.createResource = createResource
exports.getOneByTitle = getOneByTitle
exports.getOneById = getOneById
