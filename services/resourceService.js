function upload (videoData, repository) {
  var aux = repository.getOneByTitle(videoData)
  if (!aux) {
    return false
  }
  return true
}

exports.upload = upload
