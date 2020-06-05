const paths = require('../config/path-config')
const config = require('../config/index')
const request = require('request')

exports.auth = (req, res, next) => {
  request.post(paths[config.common.environment].auth_sv, { json: { token: 'value' } }, (error, response, body) => {
    if (response.statusCode == 200) {
      next()
    } else {
      res.sendStatus(401)
    }
  })

  // console.log(asd);
  // const authorization = 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
  // if (req.headers.authorization === authorization) {
  //   next()
  // } else {
  //   res.sendStatus(401)
  // }
}
