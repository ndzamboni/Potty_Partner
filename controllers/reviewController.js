const { sequelize } = require('../config/connection');
const { Users, Restroom, Review } = require('../models');
const { getOrCreateRestroom } = require('../utils/getOrCreateRestroom');

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

console.log('Users:', Users);
console.log('Restroom:', Restroom);
console.log('Review:', Review);

// Create a new review
exports.createReview = async (req, res) => {
    try {
      const { placeId, userId, rating, comment } = req.body;
      const restroom = await getOrCreateRestroom(placeId);
  
      const newReview = await Review.create({
        restroom_id: restroom.id,
        user_id: userId,
        cleanliness: rating.cleanliness,
        accessibility: rating.accessibility,
        privacy_security: rating.privacy_security,
        convenience: rating.convenience,
        customer_only_use: rating.customer_only_use,
        content: comment,
      });
  
      return res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
      console.error('Error creating review:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

// Get reviews and restroom info
exports.getReviewsAndInfoById = async (req, res) => {
  console.log('Users:', Users);
  console.log('Restroom:', Restroom);
  console.log('Review:', Review);
  try {
    const { id } = req.params; // Get id from params
    console.log(`Fetching restroom with id: ${id}`);
    
    // Fetch the restroom by id
    const restroom = await Restroom.findOne({ where: { id } });
    console.log(`Restroom query result: ${JSON.stringify(restroom)}`);
    
    if (!restroom) {
      console.log('Restroom not found');
      return res.status(404).json({ message: 'Restroom not found' });
    }

    // Fetch the reviews for the restroom
    const reviews = await Review.findAll({
      where: { restroom_id: id },
      include: [{ model: Users, attributes: ['username'] }]
    });
    console.log(`Reviews query result: ${JSON.stringify(reviews)}`);

    res.render('reviews/list', { searchResult: restroom, reviews, user: req.user });
  } catch (error) {
    console.error('Error fetching reviews:', error.message, error.stack);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.rating = rating;
        review.comment = comment;
        await review.save();

        return res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        console.error('Error updating review:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await review.destroy();

        return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};