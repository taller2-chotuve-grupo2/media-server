var express = require('express')
var router = express.Router()
const resourceService = require('../services/resourceService.js')
const reactionService = require('../services/reactionService.js')
const commentService = require('../services/commentService.js')
const resourceRepository = require('../repositories/resourceRepository.js')
const commentHelpers = require('../helpers/comments_helpers.js')
// const reactionHelpers = require('../helpers/reactions_helpers.js')

router.get('/', async function (req, res) {
  console.log(req.query)
  const pagedResult = await resourceService.getPagedResult(req.query)
  if (pagedResult.totalResults === 0) {
    return res.status(404).send(pagedResult)
  }
  return res.status(200).send(pagedResult)
})

router.get('/:id/', async function (req, res) {
  const id = req.params.id
  const userQuery = req.query.username
  const resource = await resourceService.getById(id, resourceRepository)
  if (!resource) {
    return res.sendStatus(404)
  }

  var reactions = await reactionService.getReactionsInformation(id, userQuery)

  var jResource = resource.toJSON()

  jResource.likes = reactions.likes
  jResource.dislikes = reactions.dislikes
  if (reactions.userReaction){
    jResource.userReaction = reactions.userReaction.status
  }
  else{
    jResource.userReaction = null
  }

  return res.status(200).send(jResource)
})

router.post('/', async function (req, res) {
  const data = req.body
  const resourceId = await resourceService.upload(data, resourceRepository)
  if (resourceId) {
    return res.status(200).send({
      id: resourceId
    })
  }
  return res.sendStatus(400)
})

router.post('/:id/reaction', async function (req, res) {
  const id = req.params.id
  const data = req.body
  if (!data.owner) {
    return res.status(400).send({
      message: 'Must have an owner'
    })
  }

  const resource = await resourceService.getById(id, resourceRepository)
  if (!resource) {
    return res.sendStatus(400)
  }

  var result = await reactionService.reactToResource(resource, data)
  if (!result) {
    return res.sendStatus(400)
  }

  return res.sendStatus(200)
})

router.get('/:id/reaction', async function (req, res) {
  const id = req.params.id
  const userQuery = req.query.username

  var reactions = await reactionService.getReactionsInformation(id, userQuery)

  return res.status(200).send(reactions)
})

router.post('/:id/comment', async function (req, res) {
  const id = req.params.id
  var data = req.body
  const resource = await resourceService.getById(id, resourceRepository)
  if (!resource) {
    return res.sendStatus(400)
  }

  const comment = await commentService.commentResource(resource, data)
  if (!comment) {
    return res.sendStatus(400)
  }
  return res.sendStatus(200)
})

router.get('/:id/comment', async function (req, res) {
  const id = req.params.id
  var resource = await resourceService.getById(id, resourceRepository)
  if (!resource) {
    return res.sendStatus(400)
  }
  var comments = await resource.getComments()

  var commentList = commentHelpers.buildCommentsList(comments)
  return res.status(200).send(commentList)
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id
  const dataToPatch = req.body

  var resource = await resourceService.patchResourceById(id, dataToPatch)

  if (!resource) {
    return res.status(404).send({
      message: 'Resource not found'
    })
  }

  return res.status(200).send(resource.toJSON())
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id

  var result = await resourceService.deleteResourceById(id)

  if (!result) {
    return res.status(404).send({
      message: 'Resource not found'
    })
  }

  return res.sendStatus(200)
})

module.exports = router
