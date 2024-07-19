module.exports = function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login?message=This content is for registered users only! Please login or register to view.');
};
