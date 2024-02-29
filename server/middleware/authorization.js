const authorizeUser = async (req, res, next) => {
  if (!req.session.loggedIn) {
    res.status(401).send()
  } else {
    next()
  }
}

module.exports = authorizeUser
