const express = require('express')
const router = express.Router()
const Post = require('../models/post')

const loginController = require('../controllers/login')
const { profileController, submitPostController, deletePostController, editPostController } = require('../controllers/profile')
const logoutController = require('../controllers/logout')
const authorizeUser = require('../middleware/authorization')
const signupController = require('../controllers/signup')
const { postController, postCommentController } = require('../controllers/post')
const searchController = require('../controllers/search')

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

    const perPage = 5
    const page = req.query.page || 1

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec()

    const count = await Post.countDocuments({})
    const nextPage = parseInt(page) + 1
    const prevPage = nextPage - 2
    const hasNextPage = nextPage <= Math.ceil(count / perPage)
    const haPrevPage = prevPage > 0

    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage: haPrevPage ? prevPage : null
    })
  } catch (error) {
    console.log('Failled to query and render latest posts')
  }
})

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
router.post('/search', searchController)

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
