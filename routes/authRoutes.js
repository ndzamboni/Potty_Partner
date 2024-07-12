const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => {
    res.render('auth/login-register');
  });
  
  router.get('/register', (req, res) => {
    res.render('auth/login-register');
  });
  
  router.post('/login', (req, res) => {
    // Handle login logic
  });
  
  router.post('/register', (req, res) => {
    // Handle registration logic
  });
  
  module.exports = router;

module.exports = router;