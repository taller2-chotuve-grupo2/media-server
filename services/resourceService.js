const resourceRepository = require('../repositories/resourceRepository.js')

async function upload (resourceData) {
  try {
    var aux = await resourceRepository.createResource(resourceData)
    if (!aux) {
      return null
    }
    return aux.id
  } catch (e) {
    return null
  }
}

async function getById (id) {
  var resource = await resourceRepository.getOneById(id)
  return resource
}

async function getAllByDate (query) {
  return await resourceRepository.getAllByDate(query)
}

async function patchResourceById (id, dataToPatch) {
  var resource = await getById(id)
  if (!resource) {
    return null
  }

  await resourceRepository.patchResource(resource, dataToPatch)

  await resource.reload()

  return resource
}

exports.patchResourceById = patchResourceById
exports.getAllByDate = getAllByDate
exports.upload = upload
exports.getById = getById
