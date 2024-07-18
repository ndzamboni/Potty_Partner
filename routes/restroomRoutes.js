const express = require('express');
const router = express.Router();
const restroomController = require('../controllers/restroomController');

// Route to handle search form submission
router.get('/searchResults', restroomController.getPlace);

router.get('/nearby', restroomController.getNearby);

module.exports = router;