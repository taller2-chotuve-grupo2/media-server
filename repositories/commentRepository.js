const Comment = require('../models').Comment

async function createComment (data) {
  var result = Comment.create(data)
  return result
}

async function getOneById (id) {
  var comment = Comment.findOne({
    where: {
      id: id
    }
  })

  return comment
}

async function countCommentsForUsername (username) {
  return await Comment.count({
    where: {
      owner: username
    }
  })
}

exports.countCommentsForUsername = countCommentsForUsername
exports.createComment = createComment
exports.getOneById = getOneById
