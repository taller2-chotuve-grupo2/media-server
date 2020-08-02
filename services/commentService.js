const commentRepository = require('../repositories/commentRepository.js')

async function commentResource (resource, commentData) {
  var comment = await commentRepository.createComment(commentData)

  await resource.addComment(comment)
  await resource.save()
  // await comment.setResource(resource)

  return comment
}

async function getCommentById (id) {
  var comment = await commentRepository.getOneById(id)

  return comment
}

async function getCommentCountForUsername (username) {
  if (username === null || username === undefined) {
    return 0
  }

  return await commentRepository.countCommentsForUsername(username)
}

exports.getCommentCountForUsername = getCommentCountForUsername
exports.commentResource = commentResource
exports.getCommentById = getCommentById
