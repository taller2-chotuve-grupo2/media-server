const Resource = require('../models').Resource

async function getPagedResult () {
  var result = await Resource.findAndCountAll({
    limit: 3
  })

  return {
    hasPrevious: false,
    hasNext: true,
    pageNumber: 1,
    totalPages: 1,
    totalResults: result.count,
    result: result.rows
  }
}

exports.getPagedResult = getPagedResult
