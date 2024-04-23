const jwt = require('jsonwebtoken');

const generateToken = (userId, username) => {
    return jwt.sign({ userId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.username = decoded.username;
        next();
    } catch (error) {
        console.log('Error:', error.message);
        return res.redirect('/');
    }
};
module.exports = { generateToken, isAuthenticated };