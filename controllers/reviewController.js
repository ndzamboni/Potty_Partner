const { Review, Users, Restroom, Comment } = require('../models');
const { getOrCreateRestroom } = require('../utils/getOrCreateRestroom');

exports.createReview = async (req, res) => {
  try {
    const { placeId, rating, comment } = req.body;
    const userId = req.user.id;
    const customerOnlyUse = req.body.rating.customer_only_use === 'on';

    const restroom = await getOrCreateRestroom(placeId);

    // Check if the user has already left a review for this restroom
    const existingReview = await Review.findOne({
      where: {
        restroom_id: restroom.id,
        user_id: userId
      }
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this restroom.' });
    }

    const newReview = await Review.create({
      restroom_id: restroom.id,
      user_id: req.user.id,
      cleanliness: rating.cleanliness,
      accessibility: rating.accessibility,
      privacy_security: rating.privacy_security,
      convenience: rating.convenience,
      customer_only_use: customerOnlyUse ? true : false,
      content: comment,
    });
    console.log('inserted review:', newReview);
    res.render('reviews/list', { searchResult: restroom, reviews: [newReview], user: req.user, userHasReviewed: true });

  } catch (error) {
    console.error('Error creating review:', error);
    return res.status(500).json({ message: 'Server error' });
  }
  

  //   return res.status(201).json({ message: 'Review created successfully', review: newReview });
  // } catch (error) {
  //   console.error('Error creating review:', error);
  //   return res.status(500).json({ message: 'Server error' });
  // }
};


exports.getReviewsAndInfoById = async (req, res) => {
  try {
    const { id } = req.params;

    const restroom = await Restroom.findByPk(id);
    if (!restroom) {
      return res.status(404).json({ message: 'Restroom not found' });
    }

    const reviews = await Review.findAll({
      where: { restroom_id: id },
      include: [{ model: Users, attributes: ['username'] }]
    });

    let userHasReviewed = false;
    if (req.user) {
      userHasReviewed = reviews.some(review => review.user_id === req.user.id);
    }
    console.log ('Reviews:', reviews);
    res.render('reviews/list', { searchResult: restroom, reviews, user: req.user, userHasReviewed });
  } catch (error) {
    console.error('Error fetching reviews:', error.message, error.stack);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await review.destroy();
    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
