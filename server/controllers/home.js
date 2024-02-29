const Post = require('../models/post')

async function homeController (req, res) {
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
}

module.exports = homeController
