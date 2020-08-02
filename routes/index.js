var express = require('express')
var router = express.Router()
var resource = require('./resource')
var owners = require('./owners')
var { auth } = require('../middlewares')

router.get('/', function (req, res) {
  return res.send('Richard')
})

router.get('/health', function (req, res) {
  return res.send('OK')
})

router.use('/docs', express.static('docs'))

router.use('/resource', auth, resource)
router.use('/owners', auth, owners)

module.exports = router
