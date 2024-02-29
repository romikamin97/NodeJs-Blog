const User = require('../models/user')
const Post = require('../models/post')

async function profileController (req, res) {
  try {
    console.log(req.session.username)
    const searchPredicates = [{ user: req.session.username }]

    const data = await Post.find({
      $or: searchPredicates
    })

    res.render('profile', {
      locals: { isLoggedIn: req.session.loggedIn },
      currentRoute: '/profile',
      data
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = profileController
