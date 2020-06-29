var express = require('express')
var router = express.Router()
const resourceService = require('../services/resourceService.js')
const reactionService = require('../services/reactionService.js')
const commentService = require('../services/commentService.js')
const resourceRepository = require('../repositories/resourceRepository.js')
const reactionHelpers = require('../helpers/reactions_helpers.js')
const commentHelpers = require('../helpers/comments_helpers.js')

const getResources = async (req, res) => {
  try {
    const resources = await resourceService.getAllByDate(req.query, resourceRepository)
    res.status(200)
    return res.send(resources)
  } catch (e) {
    res.status(404)
    return res.send('ERROR IN GET RESOURCES')
  }
}

router.get('/', getResources)

router.get('/paged-results', async function (req, res) {
  const pagedResult = await resourceService.getPagedResult(req.query)
  return res.status(200).send(pagedResult)
})

router.get('/:id/', async function (req, res) {
  const id = req.params.id
  const resource = await resourceService.getById(id, resourceRepository)
  if (!resource) {
    return res.sendStatus(404)
  }
  return res.status(200).send(resource.toJSON())
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
  var resource = await resourceService.getById(id, resourceRepository)

  var reactions = await resource.getReactions()

  var reactionList = reactionHelpers.buildReactionsList(reactions)
  return res.status(200).send(reactionList)
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
