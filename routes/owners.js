var express = require('express')
var router = express.Router()
const resourceService = require('../services/resourceService.js')
const reactionService = require('../services/reactionService.js')
const commentService = require('../services/commentService.js')

router.get('/:username', async function (req, res) {
  const username = req.params.username
  const resourceCount = await resourceService.getResourceCountForUsername(username)
  const commentCount = await commentService.getCommentCountForUsername(username)
  const likesCount = await reactionService.getLikesCountForUsername(username)
  const dislikesCount = await reactionService.getDislikesCountForUsername(username)
  return res.status(200).send({
    resources: resourceCount,
    comments: commentCount,
    likes: likesCount,
    dislikes: dislikesCount
  })
})

module.exports = router
