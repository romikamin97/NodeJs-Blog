const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')

const loginController = require('../controllers/login')
const { profileController, submitPostController } = require('../controllers/profile')
const logoutController = require('../controllers/logout')
const authorizeUser = require('../middleware/authorization')

/**
 * GET /
 * HOME
*/
router.get('', async (req, res) => {
  try {
    const locals = {
      title: 'NodeJs Blog',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
      isLoggedIn: req.session.loggedIn
    }

    const perPage = 10
    const page = req.query.page || 1

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec()

    const count = await Post.countDocuments({})
    const nextPage = parseInt(page) + 1
    const hasNextPage = nextPage <= Math.ceil(count / perPage)

    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null
    })
  } catch (error) {
    console.log('Failled to query and render latest posts')
  }
})

/**
 * GET /
 * Post :id
*/
router.get('/post/:id', async (req, res) => {
  try {
    const slug = req.params.id

    const data = await Post.findById({ _id: slug })

    const locals = {
      title: data.title,
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }

    res.render('post', {
      locals,
      data,
      currentRoute: `/post/${slug}`
    })
  } catch (error) {
    console.log(error)
  }
})

/**
 * POST /
 * Post - searchTerm
*/
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: 'Seach',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }

    const searchTerm = req.body.searchTerm
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '')
    const searchPredicates = [
      { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      { user: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
    ]
    if (!isNaN(Date.parse(searchTerm))) {
      const date = new Date(searchTerm + ' UTC')

      const nextday = new Date()
      nextday.setDate(date.getDate() + 1)
      searchPredicates.push({ createdAt: { $gte: date, $lt: nextday } })
    }

    const data = await Post.find({
      $or: searchPredicates
    })

    res.render('search', {
      data,
      locals
    })
  } catch (error) {
    console.log(error)
  }
})

/**
 * POST /
 * Signup
*/
async function signupController (req, res) {
  const { username, password, cpassword } = req.body
  const user = await User.findOne({
    username
  })
  if (user) {
    return res.status(401).json({ message: 'Username is already in use' })
  }
  if (password !== cpassword) {
    return res.status(401).json({ message: 'Passwords do not match' })
  }
  const userToSave = new User({ username, password })
  await userToSave.save().then(function (_) {
    res.status(204).redirect('/')
  }).catch(function (err) {
    console.log('err saving to db')
    res.status(500).json({ message: 'Server error: ' + err }).send()
  })
}
router.post('/signup', signupController)

/*
 * POST /
 * login
 */
router.post('/login', loginController)

/*
 * POST /
 * logout
 */
router.get('/logout', authorizeUser, logoutController)

/**
 * GET /
 * About
*/
router.get('/about', (req, res) => {
  res.render('about', {
    currentRoute: '/about'
  })
})

/**
 * GET /
 * Profile
*/
router.get('/profile', authorizeUser, profileController)

/**
 * POST /
 * Submit post
*/
router.post('/profile/submit-post', authorizeUser, submitPostController)

module.exports = router
