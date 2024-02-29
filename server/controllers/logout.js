const User = require('../models/user')
const Post = require('../models/post')

async function logoutController (req, res) {
  try {
    console.log('logging out')
    res.clearCookie('token', { path: '/' })
    res.redirect('/')
  } catch (error) {
    console.error(error)
  }
}

module.exports = logoutController
