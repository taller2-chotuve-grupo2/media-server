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

exports.createResource = createResource
exports.getOneByTitle = getOneByTitle
