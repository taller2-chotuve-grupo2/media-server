const Resource = require('../models').Resource
const Op = require('../models').Sequelize.Op

async function getPagedResult (pageSize = 1, pageNumber = 1, queryTitle = null) {
  const whereCondition = {}
  if (queryTitle) {
    whereCondition.title = { [Op.substring]: queryTitle }
  }

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
    result: result.rows
  }
}

exports.getPagedResult = getPagedResult
