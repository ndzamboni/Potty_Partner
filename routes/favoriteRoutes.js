const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const isAuthenticated = require('../middleware/auth');

router.post('/', isAuthenticated, favoriteController.addFavorite);
router.delete('/:restroomId', isAuthenticated, favoriteController.removeFavorite);
router.get('/', isAuthenticated, favoriteController.getFavorites);

module.exports = router;
