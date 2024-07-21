const { Comment, Users, Review, Restroom } = require('../models');

exports.createComment = async (req, res) => {
  try {
    const { reviewId, userId, content } = req.body;
    console.log('req.body===>>>', req.body);


    const newComment = await Comment.create({
      review_id: reviewId,
      user_id: userId,
      content: content,
    });

    return res.redirect(`/comments/${reviewId}`);
  } catch (error) {
    console.error('Error creating comment:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.newCommentForm = (req, res) => {
  const { reviewId } = req.params;
  res.render('comments/new', { reviewId, user: req.user });
};

exports.getCommentsByReviewId = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByPk(reviewId, {
      include: [
        { model: Users, attributes: ['username'] },
        { model: Restroom }
      ]
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const comments = await Comment.findAll({
      where: { review_id: reviewId },
      include: [{ model: Users, attributes: ['username'] }]
    });

    const reviewData = review.get({ plain: true });
    const commentsData = comments.map(comment => comment.get({ plain: true }));

    res.render('comments/list', { review: reviewData, comments: commentsData, user: req.user });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const reviewId = comment.review_id;
    await comment.destroy();

    return res.redirect(`/comments/${reviewId}`);
  } catch (error) {
    console.error('Error deleting comment:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
