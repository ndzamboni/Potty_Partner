const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => {
    const message = req.query.message || null;
    const error = req.query.error || null;
    res.render('auth/login', { message, error });
});


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/logout', authController.logout);

module.exports = router;
