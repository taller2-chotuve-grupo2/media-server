var express = require('express')
var router = express.Router()
const resourceService = require('../services/resourceService.js')
const resourceRepository = require('../repositories/resourceRepository.js')

router.get('/:id', async function (req, res) {
  const id = req.params.id
  const resource = await resourceService.getById(id, resourceRepository)
  if (!resource) {
    return res.sendStatus(404)
  }
  return res.sendStatus(200)
})

router.post('/', async function (req, res) {
  const data = req.body
  const result = await resourceService.upload(data, resourceRepository)
  if (result) {
    return res.sendStatus(200)
  }
  return res.sendStatus(400)
})

module.exports = router
