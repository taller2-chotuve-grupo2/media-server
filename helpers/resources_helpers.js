function getPagedResult () {
  return {
    hasPrevious: false,
    hasNext: true,
    pageNumber: 1,
    result: []
  }
}

exports.getPagedResult = getPagedResult
