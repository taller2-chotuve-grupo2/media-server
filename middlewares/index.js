exports.auth = (req, res, next) => {
  const authorizedHeader = '123'
  if (req.headers.authorization === authorizedHeader) {
    next()
  } else {
    res.sendStatus(403)
  }
}
