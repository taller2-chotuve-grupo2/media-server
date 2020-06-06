const paths = require('../config/path-config')
const config = require('../config/index')
const axios = require('axios').default

const authHeader = {
  authorization: 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
}

exports.auth = async (req, res, next) => {
  console.log(paths[config.common.environment].auth_sv)
  axios.post(paths[config.common.environment].auth_sv, {
    token: req.headers.authorization
  }, authHeader).then(() => {
    next()
  }).catch(() => {
    res.sendStatus(401)
  })
}