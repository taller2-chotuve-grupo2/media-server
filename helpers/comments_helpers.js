function buildCommentsList (comments) {
  var finalList = []
  comments.forEach(comment => {
    finalList.push(comment.dataValues)
  })

  return finalList
}

exports.buildCommentsList = buildCommentsList
