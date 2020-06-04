// const paths = require('../config/path-config')
// const config = require('../config/index')

exports.auth = (req, res, next) => {
  const authorization = 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
  if (req.headers.authorization === authorization) {
    next()
  } else {
    res.sendStatus(401)
  }
}
