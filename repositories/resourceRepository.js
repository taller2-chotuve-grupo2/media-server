// const { Sequelize } = require('../models')

const Resource = require('../models').Resource
const Comment = require('../models').Comment
const Op = require('../models').Sequelize.Op

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
    },
    include: [{
      model: Comment
    }]
  })
  return result
}

async function getAllByDate (query) {
  const whereCondition = {}
  if (query.title) {
    whereCondition.title = { [Op.substring]: query.title }
  }
  const resources = await Resource.findAll({
    limit: query.limit,
    where: whereCondition,
    order: [
      ['createdAt', 'DESC']
    ]
  })
  if (resources.length === 0) {
    throw Error('NO RESOURCES')
  }
  return resources.map(r => r.toJSON())
}

async function patchResource (resource, dataToPatch) {
  // Path, thumbnail?
  resource.name = dataToPatch.name
  resource.size = dataToPatch.size
  resource.title = dataToPatch.title
  resource.description = dataToPatch.description
  resource.location = dataToPatch.location
  resource.visibility = dataToPatch.visibility
  resource.thumbnail = dataToPatch.thumbnail

  resource.save()
}

async function deleteResource (resourceId) {
  return await Resource.destroy({
    where: {
      id: resourceId
    }
  })
}

exports.deleteResource = deleteResource
exports.getAllByDate = getAllByDate
exports.createResource = createResource
exports.getOneByTitle = getOneByTitle
exports.getOneById = getOneById
exports.patchResource = patchResource
