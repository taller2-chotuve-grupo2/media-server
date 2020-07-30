// const { Sequelize } = require('../models')

// const { query } = require('winston')

const Resource = require('../models').Resource
const Comment = require('../models').Comment
const Reaction = require('../models').Reaction
const Op = require('../models').Sequelize.Op

const resourceHelpers = require('../helpers/resources_helpers.js')
// const { Sequelize } = require('../models')
// const { where } = require('sequelize')

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

  await resource.save()
}

async function deleteResource (resourceId) {
  return await Resource.destroy({
    where: {
      id: resourceId
    }
  })
}

async function getPagedResult (pageSize, pageNumber, queryTitle) {
  if (pageSize) {
    pageSize = parseInt(pageSize, 10)
  }
  if (pageNumber) {
    pageNumber = parseInt(pageNumber, 10)
  }
  return await resourceHelpers.getPagedResult(pageSize, pageNumber, queryTitle)
}

async function getFeed () {
  const result = await Resource.findAll({
    attributes: ['id', 'owner', 'createdAt', 'thumbnail']
  })

  async function elementWithCounts (element) {
    const elementJson = element.toJSON()
    const likesCount = await Reaction.count({
      where: {
        ResourceId: element.id,
        status: 'Me gusta'
      }
    })
    const dislikesCount = await Reaction.count({
      where: {
        ResourceId: element.id,
        status: 'No me gusta'
      }
    })
    const commentsCount = await Comment.count({
      where: {
        ResourceId: element.id
      }
    })
    elementJson.likesCount = likesCount
    elementJson.dislikesCount = dislikesCount
    elementJson.commentsCount = commentsCount
    return elementJson
  }

  const resultJson = await Promise.all(result.map(async (el) => elementWithCounts(el)))

  console.log(resultJson)

  return resultJson
}

exports.getFeed = getFeed
exports.getPagedResult = getPagedResult
exports.deleteResource = deleteResource
exports.getAllByDate = getAllByDate
exports.createResource = createResource
exports.getOneByTitle = getOneByTitle
exports.getOneById = getOneById
exports.patchResource = patchResource
