async function upload (resourceData, repository) {
  var aux = await repository.getOneByTitle(resourceData.title)
  if (aux) {
    return false
  }
  aux = await repository.createResource(resourceData)
  if (!aux) {
    return false
  }
  return true
}

async function getById (id, repository) {
  var resource = await repository.getOneById(id)
  return resource
}

exports.upload = upload
exports.getById = getById
