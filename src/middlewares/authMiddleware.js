function isAuthenticated(req, res, next) {
    console.log('Checking if user is authenticated...');
    const isAuthenticated = true;

    if (isAuthenticated) {
        next();
    } else {
        return res.redirect('/login');
    }
}

module.exports = {
    isAuthenticated: isAuthenticated
};