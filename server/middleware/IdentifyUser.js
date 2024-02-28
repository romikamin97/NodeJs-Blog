const User = require("../models/User")

const identifyUser = async (req, res, next) => {
    try {
        req.session = { loggedIn : false};
        token = req.cookies.token;
        if (token) {
            const token = req.cookies.token;
            const user = await User.findByToken(token);
            req.session.loggedIn = true;
            req.session.username = user.username;
        }
        next();
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

module.exports = identifyUser;