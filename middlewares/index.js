const paths = require('../config/path-config')
const config = require('../config/index')
const axios = require('axios').default

const authHeader = {
  headers: {
    authorization: config.common.token
  }
}

exports.auth = async (req, res, next) => {
  axios.post(paths[config.common.environment].auth_sv, {
    token: req.headers.authorization,
    admin: true
  }, authHeader).then(() => {
    next()
  }).catch(() => {
    res.sendStatus(401)
  })
}
