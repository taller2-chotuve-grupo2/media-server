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

async function deleteResourceById (id) {
  return await resourceRepository.deleteResource(id)
}

async function getPagedResult (query) {
  return await resourceRepository.getPagedResult(query.pageSize, query.pageNumber, query)
}

async function getFeed (queryParams = null) {
  return await resourceRepository.getFeed(queryParams)
}

async function updateOwnerToResources (lastUsername, newUsername) {
  if (newUsername === null || newUsername === undefined) {
    return false
  }

  return await resourceRepository.updateOwner(lastUsername, newUsername)
}

async function getResourceCountForUsername (username) {
  if (username === null || username === undefined) {
    return 0
  }

  return await resourceRepository.countResourcesForUsername(username)
}

exports.getResourceCountForUsername = getResourceCountForUsername
exports.updateOwnerToResources = updateOwnerToResources
exports.getPagedResult = getPagedResult
exports.getFeed = getFeed
exports.deleteResourceById = deleteResourceById
exports.patchResourceById = patchResourceById
exports.getAllByDate = getAllByDate
exports.upload = upload
exports.getById = getById
