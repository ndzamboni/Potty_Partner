const express = require('express');
const router = express.Router();
const restroomController = require('../controllers/api/restroomController');

router.get('/nearby', restroomController.getRestroomsNearby);

module.exports = router;