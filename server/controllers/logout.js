const User = require("../models/User")
const Post = require('../models/Post');

async function logoutController(req, res) {
    try {
        console.log("logging out")
        res.clearCookie('token', { path: '/' });
        res.redirect('/')

    } catch (error) {
        console.error(error);
    }

}

module.exports = logoutController;