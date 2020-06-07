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

exports.getAllByDate = getAllByDate
exports.createResource = createResource
exports.getOneByTitle = getOneByTitle
exports.getOneById = getOneById
