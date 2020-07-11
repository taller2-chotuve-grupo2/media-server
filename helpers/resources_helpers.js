// const { query } = require('winston')

const Resource = require('../models').Resource
const Op = require('../models').Sequelize.Op

async function getPagedResult (pageSize = 10, pageNumber = 1, query = null) {
  const whereCondition = {}
  if (query) {
    if (query.visibility){
      whereCondition.visibility = query.visibility
    }
    if (query.owner){
      whereCondition.owner = query.owner
    }
    if (query.title){
      whereCondition.title = { [Op.substring]: query.title }
    }
  }
  console.log(whereCondition)
  console.log(query)

  var count = await Resource.count({
    where: whereCondition
  })

  var totalPages = count > 0 ? Math.ceil(count / pageSize.toPrecision(2)) : 1
  if (pageNumber > totalPages) {
    pageNumber = totalPages
  }

  var result = await Resource.findAndCountAll({
    where: whereCondition,
    order: [
      ['createdAt', 'DESC']
    ],
    offset: (pageNumber - 1) * pageSize,
    limit: pageSize
  })

  return {
    hasPrevious: (pageNumber > 1),
    hasNext: (pageNumber < totalPages),
    pageNumber: pageNumber,
    totalPages: totalPages,
    totalResults: result.count,
    result: result.rows.map(r => r.toJSON())
  }
}

exports.getPagedResult = getPagedResult
