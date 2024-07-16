const { Review, Users, Restroom } = require('../models/Users');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { restroomId, userId, rating, comment } = req.body;

        const newReview = await Review.create({
            restroomId,
            userId,
            rating,
            comment
        });

        return res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get all reviews for a specific restroom
exports.getReviewsByRestroom = async (req, res) => {
    try {
        const { restroomId } = req.params;

        const reviews = await Review.findAll({
            where: { restroomId },
            include: [{ model: User, attributes: ['username'] }]
        });

        return res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ message: 'Server error' });
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