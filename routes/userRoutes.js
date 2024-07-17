const express = require('express');
const { updateUserPrivacy } = require('../controllers/userController');
const router = express.Router();

router.get('/profile', (req, res) => {
  console.log('Rendering user profile for user:', req.user);
  res.render('user/profile', { user: req.user });
  console.log('User profile rendered');
});
router.post('/update-privacy', updateUserPrivacy);

module.exports = router;
