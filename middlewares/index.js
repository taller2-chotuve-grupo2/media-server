exports.auth = (req, res, next) => {
  const authorization = 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
  if (req.headers.authorization === authorization) {
    next()
  } else {
    res.sendStatus(401)
  }
}
