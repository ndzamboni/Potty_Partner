const { Comment, Users, Review } = require('../models');

exports.createComment = async (req, res) => {
  try {
    const { reviewId, userId, content } = req.body;

    const newComment = await Comment.create({
      review_id: reviewId,
      user_id: userId,
      content: content,
    });

    return res.status(201).json({ message: 'Comment created successfully', comment: newComment });
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

    const comments = await Comment.findAll({
      where: { review_id: reviewId },
      include: [{ model: Users, attributes: ['username'] }]
    });

    res.render('comments/list', { comments, user: req.user });
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

    await comment.destroy();
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
