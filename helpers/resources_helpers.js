const Resource = require('../models').Resource

async function getPagedResult (pageSize = 1, pageNumber = 1) {
  var count = await Resource.count()

  var totalPages = count > 0 ? Math.ceil(count / pageSize.toPrecision(2)) : 1
  if (pageNumber > totalPages) {
    pageNumber = totalPages
  }

  var result = await Resource.findAndCountAll({
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
