async function upload (resourceData, repository) {
  var aux = await repository.getOneByTitle(resourceData.title)
  if (aux) {
    return null
  }
  aux = await repository.createResource(resourceData)
  if (!aux) {
    return null
  }
  return aux.id
}

async function getById (id, repository) {
  var resource = await repository.getOneById(id)
  return resource
}

async function getAllByDate (query, repository) {
  return await repository.getAllByDate(query)
}

exports.getAllByDate = getAllByDate
exports.upload = upload
exports.getById = getById
