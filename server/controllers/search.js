const Post = require('../models/post')

async function searchController (req, res) {
  try {
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
      data
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = searchController
