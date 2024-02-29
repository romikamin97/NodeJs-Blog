const Post = require('../models/post')
const Comment = require('../models/comment')

async function postController (req, res) {
  try {
    const postId = req.params.id
    const isLoggedIn = req.session.loggedIn

    const postData = await Post.findById({ _id: postId })

    if (!postData) {
      res.status(404).send()
    }
    const commentsData = await Comment.find({ postId }).sort({ createdAt: -1 })

    const locals = {
      postData,
      commentsData,
      isLoggedIn
    }

    res.render('post', {
      locals,
      currentRoute: `/post/${postId}`
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

async function postCommentController (req, res) {
  try {
    const postId = req.params.id
    console.log(postId)
    const commentToSave = new Comment({ content: req.body.commentContent, user: req.session.username, postId })

    await commentToSave.save().then(function (_) {
      res.status(204).redirect('/post/' + postId)
    }).catch(function (err) {
      console.log('err saving to db')
      res.status(500).json({ message: 'Server error: ' + err }).send()
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { postController, postCommentController }
