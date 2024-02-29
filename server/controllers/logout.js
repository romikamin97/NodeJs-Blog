async function logoutController (req, res) {
  try {
    res.clearCookie('token', { path: '/' })
    res.redirect('/')
  } catch (error) {
    console.error(error)
  }
}

module.exports = logoutController
