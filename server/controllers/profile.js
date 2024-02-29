const User = require("../models/User")
const Post = require('../models/Post');

async function profileController(req, res) {
    try {
        console.log(req.session.username)
        let searchPredicates = [{ user: req.session.username }]

        const data = await Post.find({
            $or: searchPredicates
        });


        res.render('Profile', {
            locals: {isLoggedIn: req.session.loggedIn},
            currentRoute: '/profile',
            data
        });

    } catch (error) {
        console.log(error);
    }

}

module.exports = profileController;