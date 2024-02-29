const router = require('express').Router()

const loginController = require('../controllers/login')
const { profileController, submitPostController, deletePostController, editPostController } = require('../controllers/profile')
const logoutController = require('../controllers/logout')
const authorizeUser = require('../middleware/authorization')
const signupController = require('../controllers/signup')
const { postController, postCommentController } = require('../controllers/post')
const searchController = require('../controllers/search')
const homeController = require('../controllers/home')

/**
 * GET /
 * HOME
*/
router.get('', homeController)

/**
 * GET /
 * About
*/
router.get('/about', (req, res) => {
  res.render('about')
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
