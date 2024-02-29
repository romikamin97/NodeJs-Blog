const User = require('../models/user')

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

module.exports = signupController
