var express = require('express')
var router = express.Router()
var resource = require('./resource')

router.get('/', function (req, res) {
  return res.send('Richard')
})

router.get('/health', function (req, res) {
  return res.send('OK')
})

router.use('/docs', express.static('docs'))

router.use('/resource', resource)

module.exports = router
