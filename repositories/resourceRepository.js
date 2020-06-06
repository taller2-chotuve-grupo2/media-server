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

async function getAllByDate (limit) {
  const resources = await Resource.findAll({
    limit: limit,
    order: [
      ['createdAt', 'DESC']
    ]
  })
  if (resources.length === 0) {
    throw Error('NO RESOURCES')
  }
  return resources.map(r => r.toJSON())
}

exports.getAllByDate = getAllByDate
exports.createResource = createResource
exports.getOneByTitle = getOneByTitle
exports.getOneById = getOneById
