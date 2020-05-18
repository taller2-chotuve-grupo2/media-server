var express = require('express')
var router = express.Router()

router.get('/:id', function (req, res) {
  return res.sendStatus(401)
})

module.exports = router
