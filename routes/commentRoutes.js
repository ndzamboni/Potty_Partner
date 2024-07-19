const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const isAuthenticated = require('../middleware/auth');

router.post('/', isAuthenticated, commentController.createComment);
router.get('/:reviewId', commentController.getCommentsByReviewId);
router.delete('/:commentId', isAuthenticated, commentController.deleteComment);

module.exports = router;
