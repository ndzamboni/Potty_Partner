const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

router.get('/about', (req, res) => {
    res.render('about', { user: req.user });
});

router.get('/contact', (req, res) => {
    res.render('contact', { user: req.user });
});

router.get('/profile', (req, res) => {
    res.render('user/profile', { user: req.user });
});
module.exports = router;
