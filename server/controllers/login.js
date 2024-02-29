const User = require('../models/user')

async function loginController (req, res) {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).send('<script>alert("Invalid username or password"); window.location.href=document.referrer;</script>')
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).send('<script>alert("Invalid username or password"); window.location.href=document.referrer;</script>')
    }

    const token = user.generateAuthToken()

    res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false })
    res.status(204).redirect('/')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = loginController
