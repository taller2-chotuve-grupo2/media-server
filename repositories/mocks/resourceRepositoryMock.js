function getOneByTitle (title) {
  return null
}

function getOneById (id) {
  return ({
    id: id,
    name: 'Mocked answer'
  })
}

function createResource (data) {
  return true
}

exports.getOneByTitle = getOneByTitle
exports.getOneById = getOneById
exports.createResource = createResource