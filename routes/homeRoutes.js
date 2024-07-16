const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;
