var express = require('express')
var router = express.Router()
const resourceService = require('../services/resourceService.js')
const reactionService = require('../services/reactionService.js')
const resourceRepository = require('../repositories/resourceRepository.js')
const reactionHelpers = require('../helpers/reactions_helpers.js')

router.get('/:id', async function (req, res) {
  const id = req.params.id
  const resource = await resourceService.getById(id, resourceRepository)
  if (!resource) {
    return res.sendStatus(404)
  }
  return res.status(200).send({
    id: resource.id,
    name: resource.name,
    path: resource.path,
    size: resource.size,
    owner: resource.owner,
    title: resource.title,
    description: resource.description,
    location: resource.location,
    visibility: resource.visibility
  })
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

module.exports = router
