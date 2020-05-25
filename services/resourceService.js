async function upload (videoData, repository) {
  var aux = await repository.getOneByTitle(videoData)
  if (!aux) {
    return false
  }
  return true
}

exports.upload = upload
