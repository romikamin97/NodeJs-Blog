const express = require('express')
const router = express.Router()
const Post = require('../models/post')

const loginController = require('../controllers/login')
const { profileController, submitPostController, deletePostController, editPostController } = require('../controllers/profile')
const logoutController = require('../controllers/logout')
const authorizeUser = require('../middleware/authorization')
const signupController = require('../controllers/signup')
const { postController, postCommentController } = require('../controllers/post')

/**
 * GET /
 * HOME
*/
router.get('', async (req, res) => {
  try {
    const locals = {
      title: 'NodeJs Blog',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
      isLoggedIn: req.session.loggedIn,
      username: req.session.username
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
router.get('/post/:id', postController)

/**
 * Post /
 * Submit a comment to a post
*/
router.post('/post/:id/submit-comment', postCommentController)

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

/**
 * POST /
 * Delete post
*/
router.post('/profile/delete-post/:id', authorizeUser, deletePostController)

/**
 * POST /
 * Edit post
*/
router.post('/profile/edit-post/:id', authorizeUser, editPostController)

module.exports = router
