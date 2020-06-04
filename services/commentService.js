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

exports.commentResource = commentResource
exports.getCommentById = getCommentById
