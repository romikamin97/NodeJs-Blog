const Post = require('../models/post')

async function profileController (req, res) {
  try {
    const searchPredicates = [{ user: req.session.username }]

    const data = await Post.find({
      $or: searchPredicates
    })

    res.render('profile', {
      locals: { isLoggedIn: req.session.loggedIn, username: req.session.username },
      currentRoute: '/profile',
      data
    })
  } catch (error) {
    console.log(error)
  }
}

async function submitPostController (req, res) {
  try {
    const username = req.session.username
    const { postTitle, postContent } = req.body
    const postToSave = new Post({ title: postTitle, body: postContent, user: username })

    await postToSave.save().then(function (_) {
      res.status(204).redirect('/profile')
    }).catch(function (err) {
      console.log('err saving to db')
      res.status(500).json({ message: 'Server error: ' + err }).send()
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

async function deletePostController (req, res) {
  try {
    console.log('deleting post')
    const postId = req.params.id
    await Post.deleteOne({ _id: postId })
    res.status(204).redirect('/profile')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { profileController, submitPostController, deletePostController }
