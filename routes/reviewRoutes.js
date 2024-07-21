const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const isAuthenticated = require('../middleware/auth');

router.post('/', isAuthenticated, reviewController.createReview);
router.get('/:id', reviewController.getReviewsAndInfoById);
router.delete('/:reviewId', isAuthenticated, reviewController.deleteReview);

module.exports = router;
