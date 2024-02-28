const User = require("../models/User")

async function loginController(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = user.generateAuthToken();
        
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false });
        res.status(204).redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = loginController;