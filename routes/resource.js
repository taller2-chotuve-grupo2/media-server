var express = require('express')
var router = express.Router()
const resourceService = require('../services/resourceService.js')
const resourceRepository = require('../repositories/resourceRepository.js')

router.get('/:id', function (req, res) {
  if (req.params.id === '1') {
    return res.sendStatus(200)
  } else {
    return res.sendStatus(404)
  }
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
