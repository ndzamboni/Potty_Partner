const express = require('express');
const { updateUserPrivacy } = require('../controllers/userController');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');

router.get('/profile', isAuthenticated,  (req, res) => {
  console.log('Rendering user profile for user:', req.user);
  res.render('user/profile', { user: req.user });
  console.log('User profile rendered');
});
router.post('/update-privacy', isAuthenticated, updateUserPrivacy);

module.exports = router;
