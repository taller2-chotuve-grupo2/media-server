var express = require('express')
var router = express.Router()

router.get('/:id', function (req, res) {
  if (req.params.id === '1') {
    return res.sendStatus(200)
  } else {
    return res.sendStatus(404)
  }
})

router.post('/', function (req, res) {
  return res.sendStatus(200)
})

module.exports = router
