const express = require('express');
const { updateUserPrivacy } = require('../controllers/api/userController');
const router = express.Router();

router.post('/update-privacy', updateUserPrivacy);

module.exports = router;
